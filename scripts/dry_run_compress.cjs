const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const IMAGES_DIR = path.join(__dirname, '..', 'public', 'images');

function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);
  files.forEach((file) => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
    } else {
      arrayOfFiles.push(fullPath);
    }
  });
  return arrayOfFiles;
}

(async () => {
  const allFiles = getAllFiles(IMAGES_DIR);
  let totalOrigBytes = 0;
  let totalNewBytes = 0;
  let processedCount = 0;

  for (const filePath of allFiles) {
    const ext = path.extname(filePath).toLowerCase();
    if (!['.png', '.jpg', '.jpeg'].includes(ext)) continue;

    const stats = fs.statSync(filePath);
    if (stats.size < 150 * 1024) continue; // Only optimize files > 150 KB

    totalOrigBytes += stats.size;
    processedCount++;

    try {
      let pipeline = sharp(filePath);
      const metadata = await pipeline.metadata();

      if (ext === '.png') {
        if (metadata.width > 900 || metadata.height > 900) {
          pipeline = pipeline.resize(900, 900, { fit: 'inside', withoutEnlargement: true });
        }
        pipeline = pipeline.png({ quality: 80, compressionLevel: 9, palette: true });
      } else {
        if (metadata.width > 1024 || metadata.height > 1024) {
          pipeline = pipeline.resize(1024, 1024, { fit: 'inside', withoutEnlargement: true });
        }
        pipeline = pipeline.jpeg({ quality: 80, mozjpeg: true });
      }

      const buf = await pipeline.toBuffer();
      // Only accept if smaller
      if (buf.length < stats.size) {
        totalNewBytes += buf.length;
      } else {
        totalNewBytes += stats.size;
      }
    } catch (err) {
      console.error(`Error processing ${filePath}:`, err.message);
      totalNewBytes += stats.size;
    }
  }

  const origMB = totalOrigBytes / (1024 * 1024);
  const newMB = totalNewBytes / (1024 * 1024);
  const savedMB = origMB - newMB;
  const percent = ((savedMB / origMB) * 100).toFixed(1);

  console.log(`\n--- DRY RUN RESULTS ---`);
  console.log(`Files to compress (> 150 KB): ${processedCount} files`);
  console.log(`Original size of these files: ${origMB.toFixed(2)} MB`);
  console.log(`Estimated new size:          ${newMB.toFixed(2)} MB`);
  console.log(`Estimated Total Saved:       ${savedMB.toFixed(2)} MB (${percent}% saved!)`);
})();
