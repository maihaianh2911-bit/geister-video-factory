import React, { useEffect, useState } from 'react';
import { continueRender, delayRender, Freeze, staticFile, useVideoConfig } from 'remotion';
import { Lottie, LottieAnimationData } from '@remotion/lottie';
import { ThreeCanvas } from '@remotion/three';
import { useThree } from '@react-three/fiber';
import type { PerspectiveCamera } from 'three';

// Optional extra layers a scene can draw besides its SVG: ready-made Lottie animations (public/lottie/*.json)
// and simple 3D scenes. A scene module exports `layers(t)` returning plain descriptors for time t, so scene code
// stays plain JS (no React) and every frame stays a pure function of time. See prompts/scene_system.md "Lottie & 3D".
type Box = { x?: number; y?: number; w?: number; h?: number; z?: 'under' | 'over'; opacity?: number };
export type LottieDesc = Box & { kind: 'lottie'; src: string; time: number; loop?: boolean; flip?: boolean; rotate?: number };
type Vec = [number, number, number];
type Obj = {
  shape: 'sphere' | 'box' | 'torus' | 'cylinder' | 'cone' | 'plane' | 'icosahedron' | 'ring';
  pos?: Vec; rot?: Vec; scale?: number | Vec; color?: string; emissive?: string; emissiveIntensity?: number;
  metalness?: number; roughness?: number; opacity?: number; wireframe?: boolean; args?: number[];
};
type Light = { type: 'ambient' | 'directional' | 'point'; color?: string; intensity?: number; pos?: Vec };
export type ThreeDesc = Box & { kind: 'three'; camera?: { pos?: Vec; fov?: number; lookAt?: Vec }; lights?: Light[]; objects: Obj[] };
export type LayerDesc = LottieDesc | ThreeDesc;

const cache = new Map<string, LottieAnimationData>();

const LottieLayer: React.FC<{ d: LottieDesc }> = ({ d }) => {
  const { fps } = useVideoConfig();
  const [data, setData] = useState<LottieAnimationData | null>(cache.get(d.src) ?? null);
  const [handle] = useState(() => (cache.has(d.src) ? null : delayRender(`Lottie ${d.src}`)));
  useEffect(() => {
    if (cache.has(d.src)) { if (handle !== null) continueRender(handle); return; }
    fetch(staticFile(d.src))
      .then((r) => r.json())
      .then((json) => { cache.set(d.src, json); setData(json); if (handle !== null) continueRender(handle); })
      .catch((e) => { throw new Error(`Lottie ${d.src}: ${e}`); });
  }, [d.src, handle]);
  if (!data) return null;
  const frame = Math.max(0, Math.round(d.time * fps));
  return (
    <div style={box(d, { transform: `${d.flip ? 'scaleX(-1) ' : ''}rotate(${d.rotate ?? 0}deg)` })}>
      <Freeze frame={frame}>
        <Lottie animationData={data} loop={d.loop ?? true} style={{ width: '100%', height: '100%' }} />
      </Freeze>
    </div>
  );
};

const Geometry: React.FC<{ o: Obj }> = ({ o }) => {
  const a = o.args;
  switch (o.shape) {
    case 'box': return <boxGeometry args={(a as [number, number, number]) ?? [1, 1, 1]} />;
    case 'torus': return <torusGeometry args={(a as [number, number, number, number]) ?? [1, 0.3, 32, 96]} />;
    case 'cylinder': return <cylinderGeometry args={(a as [number, number, number, number]) ?? [0.5, 0.5, 1, 48]} />;
    case 'cone': return <coneGeometry args={(a as [number, number, number]) ?? [0.5, 1, 48]} />;
    case 'plane': return <planeGeometry args={(a as [number, number]) ?? [1, 1]} />;
    case 'icosahedron': return <icosahedronGeometry args={(a as [number, number]) ?? [1, 1]} />;
    case 'ring': return <ringGeometry args={(a as [number, number, number]) ?? [0.8, 1, 96]} />;
    default: return <sphereGeometry args={(a as [number, number, number]) ?? [1, 64, 64]} />;
  }
};

// The canvas camera prop only applies once; this sets position/fov/aim on every frame so the camera can move.
const CameraRig: React.FC<{ pos: Vec; fov: number; lookAt: Vec }> = ({ pos, fov, lookAt }) => {
  const camera = useThree((st) => st.camera) as PerspectiveCamera;
  camera.position.set(...pos);
  camera.fov = fov;
  camera.lookAt(...lookAt);
  camera.updateProjectionMatrix();
  return null;
};

const ThreeLayer: React.FC<{ d: ThreeDesc }> = ({ d }) => {
  const w = d.w ?? 1080, h = d.h ?? 1920;
  const cam = d.camera ?? {};
  const lights = d.lights ?? [{ type: 'ambient', intensity: 0.5 }, { type: 'directional', pos: [3, 4, 5], intensity: 1.2 }];
  return (
    <div style={box(d)}>
      <ThreeCanvas
        width={w}
        height={h}
        camera={{ position: cam.pos ?? [0, 0, 5], fov: cam.fov ?? 45 }}
        gl={{ antialias: true, alpha: true, preserveDrawingBuffer: true }}
      >
        {lights.map((l, i) =>
          l.type === 'ambient' ? <ambientLight key={i} color={l.color ?? '#ffffff'} intensity={l.intensity ?? 0.5} />
          : l.type === 'point' ? <pointLight key={i} color={l.color ?? '#ffffff'} intensity={l.intensity ?? 1} position={l.pos ?? [0, 2, 3]} />
          : <directionalLight key={i} color={l.color ?? '#ffffff'} intensity={l.intensity ?? 1} position={l.pos ?? [3, 4, 5]} />,
        )}
        {d.objects.map((o, i) => (
          <mesh key={i} position={o.pos ?? [0, 0, 0]} rotation={o.rot ?? [0, 0, 0]} scale={o.scale ?? 1}>
            <Geometry o={o} />
            <meshStandardMaterial
              color={o.color ?? '#cccccc'}
              emissive={o.emissive ?? '#000000'}
              emissiveIntensity={o.emissiveIntensity ?? 1}
              metalness={o.metalness ?? 0.1}
              roughness={o.roughness ?? 0.6}
              wireframe={o.wireframe ?? false}
              transparent={(o.opacity ?? 1) < 1}
              opacity={o.opacity ?? 1}
            />
          </mesh>
        ))}
        <CameraRig pos={cam.pos ?? [0, 0, 5]} fov={cam.fov ?? 45} lookAt={cam.lookAt ?? [0, 0, 0]} />
      </ThreeCanvas>
    </div>
  );
};

function box(d: Box, extra: React.CSSProperties = {}): React.CSSProperties {
  return { position: 'absolute', left: d.x ?? 0, top: d.y ?? 0, width: d.w ?? 1080, height: d.h ?? 1920, opacity: d.opacity ?? 1, ...extra };
}

export const Layers: React.FC<{ list: LayerDesc[]; z: 'under' | 'over' }> = ({ list, z }) => (
  <>
    {list
      .filter((d) => (d.z ?? 'over') === z && (d.opacity ?? 1) > 0)
      .map((d, i) => (d.kind === 'lottie' ? <LottieLayer key={`${d.src}-${i}`} d={d} /> : d.kind === 'three' ? <ThreeLayer key={`three-${i}`} d={d} /> : null))}
  </>
);
