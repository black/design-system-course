// Builds the site into dist/ for Firebase Hosting.
// Run with `npm run build` (Tailwind CSS is compiled first by the npm script).
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const dist = path.join(root, 'dist');

// Only these files and folders are published. Everything else (node_modules,
// config, the Tailwind source css/input.css) stays out of the site.
const include = [
  'index.html',
  'materials.html',
  'css/styles.css',
  'js',
  'thumbs'
];

fs.rmSync(dist, { recursive: true, force: true });

for (const item of include) {
  const from = path.join(root, item);
  const to = path.join(dist, item);
  if (!fs.existsSync(from)) {
    console.error('Missing: ' + item);
    process.exit(1);
  }
  fs.mkdirSync(path.dirname(to), { recursive: true });
  fs.cpSync(from, to, { recursive: true });
}

// Count what was copied
let files = 0, bytes = 0;
(function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(p);
    else { files++; bytes += fs.statSync(p).size; }
  }
})(dist);
console.log('Built dist/: ' + files + ' files, ' + Math.round(bytes / 1024) + ' KB');
