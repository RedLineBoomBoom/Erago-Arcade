const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const boxartsDir = path.join(rootDir, 'public/images/boxarts');

const visualsFiles = [
  'src/data/triviaVisualsData.ts',
  'src/data/triviaVisualsBatch2.ts',
  'src/data/triviaVisualsBatch3.ts',
  'src/data/triviaVisualsBatch4.ts',
  'src/data/triviaVisualsBatch5.ts'
];

const auditPath = fs.existsSync(path.join(rootDir, 'scratch/all_boxarts_audit.json'))
  ? path.join(rootDir, 'scratch/all_boxarts_audit.json')
  : 'C:/Users/RLBB/.gemini/antigravity/brain/abc0881f-a471-4e26-844e-d1ce5ad5c170/scratch/all_boxarts_audit.json';
const auditList = JSON.parse(fs.readFileSync(auditPath, 'utf8'));

const map = {};
for (const item of auditList) {
  const id = item.id;
  for (const ext of ['png', 'jpg', 'jpeg', 'webp']) {
    const p = path.join(boxartsDir, `${id}.${ext}`);
    if (fs.existsSync(p) && fs.statSync(p).size > 5000) {
      map[id] = `/images/boxarts/${id}.${ext}`;
      break;
    }
  }
}

console.log('Total mapped items on disk:', Object.keys(map).length);

let totalUpdated = 0;
for (const rel of visualsFiles) {
  const full = path.join(rootDir, rel);
  let content = fs.readFileSync(full, 'utf8');
  let count = 0;
  for (const [id, url] of Object.entries(map)) {
    const regex = new RegExp(`boxArtImageUrl:\\s*['"][^'"]*${id}\\.[a-zA-Z0-9]+['"]`, 'g');
    const target = `boxArtImageUrl: '${url}'`;
    const before = content;
    content = content.replace(regex, target);
    if (content !== before) count++;
  }
  fs.writeFileSync(full, content, 'utf8');
  console.log(`${rel} updated entries: ${count}`);
  totalUpdated += count;
}
console.log(`Total file updates: ${totalUpdated}`);
