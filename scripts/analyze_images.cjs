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
  console.log(`Found ${allFiles.length} total image files in ${IMAGES_DIR}`);

  const imageStats = [];

  for (const filePath of allFiles) {
    const ext = path.extname(filePath).toLowerCase();
    if (!['.png', '.jpg', '.jpeg', '.webp'].includes(ext)) continue;

    const stats = fs.statSync(filePath);
    const sizeKB = stats.size / 1024;
    const sizeMB = sizeKB / 1024;

    try {
      const metadata = await sharp(filePath).metadata();
      imageStats.push({
        filePath,
        relPath: path.relative(path.join(__dirname, '..'), filePath),
        ext,
        sizeMB,
        sizeKB,
        width: metadata.width,
        height: metadata.height,
        hasAlpha: metadata.hasAlpha,
      });
    } catch (err) {
      console.warn(`Could not read metadata for ${filePath}:`, err.message);
    }
  }

  // Sort descending by size
  imageStats.sort((a, b) => b.sizeMB - a.sizeMB);

  const totalSizeMB = imageStats.reduce((sum, item) => sum + item.sizeMB, 0);
  console.log(`Total Image Size: ${totalSizeMB.toFixed(2)} MB`);

  console.log('\n--- TOP 25 LARGEST IMAGES ---');
  imageStats.slice(0, 25).forEach((item, idx) => {
    console.log(
      `${(idx + 1).toString().padStart(2)}. ${item.sizeMB.toFixed(2).padStart(5)} MB | ${item.width}x${item.height} | ${item.relPath}`
    );
  });

  const greaterThan500KB = imageStats.filter((i) => i.sizeKB > 500);
  const total500KBMb = greaterThan500KB.reduce((sum, i) => sum + i.sizeMB, 0);
  console.log(`\nFiles > 500 KB: ${greaterThan500KB.length} files, totaling ${total500KBMb.toFixed(2)} MB (${((total500KBMb / totalSizeMB) * 100).toFixed(1)}% of total images)`);

  const greaterThan200KB = imageStats.filter((i) => i.sizeKB > 200);
  const total200KBMb = greaterThan200KB.reduce((sum, i) => sum + i.sizeMB, 0);
  console.log(`Files > 200 KB: ${greaterThan200KB.length} files, totaling ${total200KBMb.toFixed(2)} MB (${((total200KBMb / totalSizeMB) * 100).toFixed(1)}% of total images)`);
})();
