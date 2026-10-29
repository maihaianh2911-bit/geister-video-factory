// Static local ES-module dependency graph for independent scene cache keys.
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const acorn = require('acorn');
const root = path.resolve(process.argv[2]);
const entries = JSON.parse(process.argv[3]);
const cache = new Map();
function visit(file, active = new Set()) {
  file = path.resolve(file);
  const relative = path.relative(root, file).split(path.sep).join('/');
  if (!relative.startsWith('src/') || relative.includes('../') || path.extname(file) !== '.js') throw new Error('Scene dependencies must be local src/*.js modules');
  if (cache.has(file)) return cache.get(file);
  if (active.has(file)) throw new Error('Cyclic scene imports are unsupported');
  active = new Set(active); active.add(file);
  const source = fs.readFileSync(file, 'utf8');
  const ast = acorn.parse(source, { ecmaVersion: 'latest', sourceType: 'module' });
  const result = { [relative]: crypto.createHash('sha256').update(source).digest('hex') };
  function walk(node) {
    if (!node || typeof node !== 'object') return;
    if (node.type === 'ImportExpression' || node.type === 'CallExpression' && node.callee.type === 'Identifier' && ['require', 'eval', 'Function'].includes(node.callee.name)) throw new Error('Dynamic dependencies are unsupported for scene modules');
    if (node.type === 'NewExpression' && node.callee.type === 'Identifier' && node.callee.name === 'Function') throw new Error('Dynamic code is unsupported');
    if (['ImportDeclaration', 'ExportNamedDeclaration', 'ExportAllDeclaration'].includes(node.type) && node.source) {
      const spec = node.source.value;
      if (typeof spec !== 'string' || !spec.startsWith('.')) throw new Error('Only static relative imports are supported');
      Object.assign(result, visit(path.resolve(path.dirname(file), spec), active));
    }
    for (const value of Object.values(node)) {
      if (Array.isArray(value)) value.forEach(walk);
      else if (value && typeof value === 'object') walk(value);
    }
  }
  walk(ast);
  cache.set(file, result);
  return result;
}
try { process.stdout.write(JSON.stringify(entries.map(entry => visit(path.resolve(root, entry))))); }
catch (error) { console.error(String(error.message || error)); process.exit(1); }
