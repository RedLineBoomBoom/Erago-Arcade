const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
const crypto = require('crypto');

const rootDir = path.resolve(__dirname, '..');
const boxartsDir = path.join(rootDir, 'public/images/boxarts');
if (!fs.existsSync(boxartsDir)) fs.mkdirSync(boxartsDir, { recursive: true });

// Load SteamDB mappings
const STEAM_DB_PATH = path.join(rootDir, 'src/utils/steamDbResolver.ts');
const steamDbContent = fs.readFileSync(STEAM_DB_PATH, 'utf8');
const mapMatch = steamDbContent.match(/export const STEAM_DB_MAP: Record<string, \{ appId: number; name: string \}> = ({[\s\S]*?});\n\n\/\*\*/);
const STEAM_DB_MAP = new Function('return (' + mapMatch[1] + ')')();

// Load verified wiki results for 126 non-steam / authentic retro games
const wikiPath = path.join(rootDir, 'scratch/complete_wiki_boxarts.json');
const wikiFound = JSON.parse(fs.readFileSync(wikiPath, 'utf8'));

// Load 200 item canonical audit list
const auditPath = fs.existsSync(path.join(rootDir, 'scratch/all_boxarts_audit.json'))
  ? path.join(rootDir, 'scratch/all_boxarts_audit.json')
  : 'C:/Users/RLBB/.gemini/antigravity/brain/abc0881f-a471-4e26-844e-d1ce5ad5c170/scratch/all_boxarts_audit.json';
const auditList = JSON.parse(fs.readFileSync(auditPath, 'utf8'));

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function downloadFile(url, finalDestPath) {
  return new Promise((resolve) => {
    try {
      const tempPath = finalDestPath + '.tmp';
      if (fs.existsSync(tempPath)) {
        try { fs.unlinkSync(tempPath); } catch {}
      }

      const client = url.startsWith('https') ? https : http;
      const file = fs.createWriteStream(tempPath);
      const req = client.get(url, {
        headers: {
          'User-Agent': 'EragoArcadeBot/2.0 (https://eragoarcade.com; dev@eragoarcade.com)',
          'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8'
        },
        timeout: 15000
      }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          file.close();
          try { fs.unlinkSync(tempPath); } catch {}
          return resolve(downloadFile(res.headers.location, finalDestPath));
        }

        if (res.statusCode !== 200) {
          file.close();
          try { fs.unlinkSync(tempPath); } catch {}
          return resolve(false);
        }

        res.pipe(file);
        file.on('finish', () => {
          file.close(() => {
            if (fs.existsSync(tempPath)) {
              const size = fs.statSync(tempPath).size;
              if (size > 5000) {
                const buf = Buffer.alloc(8);
                const fd = fs.openSync(tempPath, 'r');
                fs.readSync(fd, buf, 0, 8, 0);
                fs.closeSync(fd);
                const isJpg = buf[0] === 0xFF && buf[1] === 0xD8 && buf[2] === 0xFF;
                const isPng = buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4E && buf[3] === 0x47;
                const isWebp = buf.toString('ascii', 0, 4) === 'RIFF';
                if (isJpg || isPng || isWebp) {
                  try {
                    if (fs.existsSync(finalDestPath)) fs.unlinkSync(finalDestPath);
                    fs.renameSync(tempPath, finalDestPath);
                    return resolve({ success: true, size, format: isPng ? 'png' : (isWebp ? 'webp' : 'jpg') });
                  } catch (e) {
                    return resolve(false);
                  }
                }
              }
              try { fs.unlinkSync(tempPath); } catch {}
            }
            resolve(false);
          });
        });
      });
      req.on('error', () => {
        file.close();
        try { if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath); } catch {}
        resolve(false);
      });
      req.on('timeout', () => {
        req.destroy();
        file.close();
        try { if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath); } catch {}
        resolve(false);
      });
    } catch {
      resolve(false);
    }
  });
}

function cleanOtherExtensions(id, keepExt) {
  const possibleExts = ['jpg', 'jpeg', 'png', 'webp', 'svg'];
  for (const ext of possibleExts) {
    if (ext === keepExt) continue;
    const p = path.join(boxartsDir, `${id}.${ext}`);
    if (fs.existsSync(p)) {
      try {
        fs.unlinkSync(p);
      } catch {}
    }
  }
}

async function run() {
  console.log('================================================================');
  console.log(' ERAGO ARCADE — COMPREHENSIVE BOX ART REPLACEMENT PIPELINE');
  console.log(' Processing all 200 items with authentic, verified box arts...');
  console.log('================================================================\n');

  // Handle t-200 master cover
  const t200Dest = path.join(boxartsDir, 't-200.jpg');
  const t200Char = path.join(rootDir, 'public/images/characters/t-200.jpg');
  if (fs.existsSync(t200Char)) {
    fs.copyFileSync(t200Char, t200Dest);
    cleanOtherExtensions('t-200', 'jpg');
    console.log('[t-200] ✓ ERAGO ARCADE Master Vault box art deployed');
  }

  const results = {};
  let totalProcessed = 0;

  for (let i = 0; i < auditList.length; i++) {
    const item = auditList[i];
    const id = item.id;
    if (id === 't-200') {
      results[id] = { success: true, file: '/images/boxarts/t-200.jpg' };
      totalProcessed++;
      continue;
    }

    console.log(`[${i + 1}/${auditList.length}] [${id}] ${item.gameTitle} (${item.year}, ${item.platform})`);
    let success = false;
    let finalExt = 'jpg';

    // Priority 1: If verified authentic retro / console / Wikipedia cover exists
    if (wikiFound[id] && wikiFound[id].img) {
      const wikiUrl = wikiFound[id].img;
      const isPng = wikiUrl.toLowerCase().includes('.png');
      const isWebp = wikiUrl.toLowerCase().includes('.webp');
      const testExt = isPng ? 'png' : (isWebp ? 'webp' : 'jpg');
      const dest = path.join(boxartsDir, `${id}.${testExt}`);
      const res = await downloadFile(wikiUrl, dest);
      if (res && res.success) {
        finalExt = res.format;
        cleanOtherExtensions(id, finalExt);
        console.log(`  ✓ Wikipedia authentic box art (${res.size} bytes): ${wikiFound[id].title}`);
        success = true;
      }
      await sleep(150);
    }

    // Priority 2: If modern PC / Steam official release
    if (!success) {
      const steam = STEAM_DB_MAP[id];
      if (steam && steam.appId) {
        const candidates = [
          `https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/${steam.appId}/library_600x900_2x.jpg`,
          `https://cdn.cloudflare.steamstatic.com/steam/apps/${steam.appId}/library_600x900_2x.jpg`,
          `https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/${steam.appId}/library_600x900.jpg`,
          `https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/${steam.appId}/capsule_616x353.jpg`,
          `https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/${steam.appId}/header.jpg`
        ];

        for (const url of candidates) {
          const dest = path.join(boxartsDir, `${id}.jpg`);
          const res = await downloadFile(url, dest);
          if (res && res.success) {
            finalExt = 'jpg';
            cleanOtherExtensions(id, 'jpg');
            console.log(`  ✓ Steam official box art (${res.size} bytes): ${steam.name}`);
            success = true;
            break;
          }
          await sleep(50);
        }
      }
    }

    // Fallback: Check existing local valid file if not duplicate
    if (!success) {
      const exts = ['jpg', 'png', 'webp'];
      for (const e of exts) {
        const p = path.join(boxartsDir, `${id}.${e}`);
        if (fs.existsSync(p) && fs.statSync(p).size > 5000) {
          success = true;
          finalExt = e;
          cleanOtherExtensions(id, finalExt);
          console.log(`  ✓ Using valid existing file: ${id}.${e}`);
          break;
        }
      }
    }

    if (success) {
      results[id] = { success: true, file: `/images/boxarts/${id}.${finalExt}` };
      totalProcessed++;
    } else {
      console.warn(`  ✗ FAILED to acquire box art for ${id} (${item.gameTitle})`);
      results[id] = { success: false };
    }
  }

  console.log('\n================================================================');
  console.log(' BOX ART PROVISIONING SUMMARY');
  const succeeded = Object.values(results).filter(r => r.success).length;
  console.log(` Succeeded: ${succeeded} / ${auditList.length}`);
  console.log('================================================================\n');

  // Write results JSON
  const scratchDir = path.join(rootDir, 'scratch');
  if (!fs.existsSync(scratchDir)) fs.mkdirSync(scratchDir, { recursive: true });
  fs.writeFileSync(
    path.join(scratchDir, 'boxart_provision_results.json'),
    JSON.stringify(results, null, 2)
  );

  // Update visual batch files
  console.log('Updating visual data batch files with accurate boxArtImageUrl paths...');
  const visualsFiles = [
    'src/data/triviaVisualsData.ts',
    'src/data/triviaVisualsBatch2.ts',
    'src/data/triviaVisualsBatch3.ts',
    'src/data/triviaVisualsBatch4.ts',
    'src/data/triviaVisualsBatch5.ts'
  ];

  let totalReplacements = 0;
  visualsFiles.forEach(relPath => {
    const fullPath = path.join(rootDir, relPath);
    let content = fs.readFileSync(fullPath, 'utf8');
    let fileReplacements = 0;

    for (const [id, res] of Object.entries(results)) {
      if (!res.success) continue;
      // Replace any existing boxArtImageUrl for this id: /images/boxarts/{id}.(jpg|svg|png|webp)
      const regex = new RegExp(`boxArtImageUrl:\\s*['"][^'"]*${id}\\.[a-zA-Z0-9]+['"]`, 'g');
      const target = `boxArtImageUrl: '${res.file}'`;
      const before = content;
      content = content.replace(regex, target);
      if (content !== before) {
        fileReplacements++;
        totalReplacements++;
      }
    }

    if (fileReplacements > 0) {
      fs.writeFileSync(fullPath, content, 'utf8');
      console.log(`  ✓ ${relPath}: updated ${fileReplacements} entries`);
    }
  });

  console.log(`\nTotal visual file updates applied: ${totalReplacements}`);
}

run();
