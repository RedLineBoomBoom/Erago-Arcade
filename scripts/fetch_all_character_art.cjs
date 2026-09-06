const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const rootDir = path.resolve(__dirname, '..');
const charsDir = path.join(rootDir, 'public/images/characters');
if (!fs.existsSync(charsDir)) fs.mkdirSync(charsDir, { recursive: true });

// Load SteamDB mappings
const STEAM_DB_PATH = path.join(rootDir, 'src/utils/steamDbResolver.ts');
const steamDbContent = fs.readFileSync(STEAM_DB_PATH, 'utf8');
const mapMatch = steamDbContent.match(/export const STEAM_DB_MAP: Record<string, \{ appId: number; name: string \}> = ({[\s\S]*?});\n\n\/\*\*/);
const STEAM_DB_MAP = new Function('return (' + mapMatch[1] + ')')();

// Load verified wiki results
const wikiMapPath = 'C:/Users/RLBB/.gemini/antigravity/brain/abc0881f-a471-4e26-844e-d1ce5ad5c170/scratch/wiki_characters_found.json';
const wikiFound = fs.existsSync(wikiMapPath) ? JSON.parse(fs.readFileSync(wikiMapPath, 'utf8')) : {};

// 56 Target Items
const targetList = require('C:/Users/RLBB/.gemini/antigravity/brain/abc0881f-a471-4e26-844e-d1ce5ad5c170/scratch/enriched_missing.json');

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
              if (size > 8000) {
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

// Direct local asset overrides where official high-res retro art already exists in public/images/characters
const KNOWN_LOCAL_ASSETS = {
  't-52': 'samus_retro.jpg',
  't-58': 'mario.png',
  't-64': 'fox.png'
};

async function run() {
  console.log('================================================================');
  console.log(' ERAGO ARCADE — CHARACTER ARTWORK PROVISIONING ENGINE');
  console.log(` Processing ${targetList.length} items lacking authentic photos...`);
  console.log('================================================================\n');

  // 1. Deploy t-200 generated AI master character art
  const t200Generated = 'C:/Users/RLBB/.gemini/antigravity/brain/abc0881f-a471-4e26-844e-d1ce5ad5c170/erago_archivist_1788673437851.jpg';
  const t200Dest = path.join(charsDir, 't-200.jpg');
  if (fs.existsSync(t200Generated)) {
    fs.copyFileSync(t200Generated, t200Dest);
    console.log('[t-200] ✓ ERAGO ARCADE Master Archivist artwork deployed:', t200Dest, `(${fs.statSync(t200Dest).size} bytes)`);
  }

  const results = {};

  for (const item of targetList) {
    const id = item.id;
    if (id === 't-200') {
      results[id] = { success: true, file: '/images/characters/t-200.jpg' };
      continue;
    }

    console.log(`\n[${id}] ${item.gameTitle} — ${item.characterName}`);
    let success = false;
    let finalExt = 'jpg';

    // Check direct local high-res retro asset first
    if (KNOWN_LOCAL_ASSETS[id]) {
      const srcName = KNOWN_LOCAL_ASSETS[id];
      const srcPath = path.join(charsDir, srcName);
      if (fs.existsSync(srcPath)) {
        const ext = srcName.split('.').pop();
        const targetDest = path.join(charsDir, `${id}.${ext}`);
        if (srcPath !== targetDest) {
          fs.copyFileSync(srcPath, targetDest);
        }
        console.log(`  ✓ Deployed official retro asset (${srcName}): ${targetDest}`);
        success = true;
        finalExt = ext;
        results[id] = { success: true, file: `/images/characters/${id}.${finalExt}` };
        continue;
      }
    }

    // Strategy A: Steam CDN
    const steam = STEAM_DB_MAP[id];
    if (steam && steam.appId) {
      const candidates = [
        `https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/${steam.appId}/library_hero.jpg`,
        `https://cdn.cloudflare.steamstatic.com/steam/apps/${steam.appId}/library_hero.jpg`,
        `https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/${steam.appId}/capsule_616x353.jpg`,
        `https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/${steam.appId}/header.jpg`,
        `https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/${steam.appId}/library_600x900_2x.jpg`
      ];

      for (const url of candidates) {
        const dest = path.join(charsDir, `${id}.jpg`);
        const res = await downloadFile(url, dest);
        if (res && res.success) {
          console.log(`  ✓ Steam CDN downloaded (${res.size} bytes): ${url}`);
          success = true;
          finalExt = 'jpg';
          break;
        }
        await sleep(100);
      }
    }

    // Strategy B: Wikipedia High-Res Lead Character Artwork
    if (!success && wikiFound[id] && wikiFound[id].img) {
      const wikiUrl = wikiFound[id].img;
      const isPng = wikiUrl.toLowerCase().includes('.png');
      const testExt = isPng ? 'png' : 'jpg';
      const dest = path.join(charsDir, `${id}.${testExt}`);
      const res = await downloadFile(wikiUrl, dest);
      if (res && res.success) {
        console.log(`  ✓ Wikipedia official art downloaded (${res.size} bytes): ${wikiFound[id].title}`);
        success = true;
        finalExt = testExt;
      }
      await sleep(250);
    }

    if (success) {
      results[id] = { success: true, file: `/images/characters/${id}.${finalExt}` };
    } else {
      console.warn(`  ✗ FAILED to acquire photo for ${id}`);
      results[id] = { success: false };
    }
  }

  console.log('\n================================================================');
  console.log(' PROVISIONING SUMMARY');
  const succeeded = Object.values(results).filter(r => r.success).length;
  console.log(` Succeeded: ${succeeded} / ${targetList.length}`);
  console.log('================================================================\n');

  fs.writeFileSync(
    'C:/Users/RLBB/.gemini/antigravity/brain/abc0881f-a471-4e26-844e-d1ce5ad5c170/scratch/provision_results.json',
    JSON.stringify(results, null, 2)
  );

  if (succeeded === targetList.length) {
    console.log('ALL 56 ITEMS PROVISIONED SUCCESSFULLY! Proceeding to update visual batch files...');
  }
}

run();
