const fs = require('fs');
const path = require('path');
const https = require('https');

// Load SteamDB mappings
const STEAM_DB_PATH = path.resolve(__dirname, '../src/utils/steamDbResolver.ts');
const steamDbContent = fs.readFileSync(STEAM_DB_PATH, 'utf8');

// Parse STEAM_DB_MAP from steamDbResolver.ts
const mapMatch = steamDbContent.match(/export const STEAM_DB_MAP: Record<string, \{ appId: number; name: string \}> = ({[\s\S]*?});\n\n\/\*\*/);
if (!mapMatch) {
  console.error('Could not parse STEAM_DB_MAP from steamDbResolver.ts');
  process.exit(1);
}
// eslint-disable-next-line @typescript-eslint/no-implied-eval
const STEAM_DB_MAP = new Function('return (' + mapMatch[1] + ')')();
// Use STEAM_DB_MAP entries directly for syncing

const BOXARTS_DIR = path.resolve(__dirname, '../public/images/boxarts');
const CHARS_DIR = path.resolve(__dirname, '../public/images/characters');

if (!fs.existsSync(BOXARTS_DIR)) fs.mkdirSync(BOXARTS_DIR, { recursive: true });
if (!fs.existsSync(CHARS_DIR)) fs.mkdirSync(CHARS_DIR, { recursive: true });

function downloadFromSteamCdn(url, destPath) {
  return new Promise((resolve) => {
    try {
      const file = fs.createWriteStream(destPath);
      https.get(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        },
        timeout: 8000
      }, (res) => {
        if (res.statusCode !== 200) {
          file.close();
          fs.unlink(destPath, () => {});
          return resolve(false);
        }
        res.pipe(file);
        file.on('finish', () => {
          file.close(() => {
            const size = fs.existsSync(destPath) ? fs.statSync(destPath).size : 0;
            if (size > 1000) resolve(true);
            else {
              fs.unlink(destPath, () => {});
              resolve(false);
            }
          });
        });
      }).on('error', () => {
        file.close();
        fs.unlink(destPath, () => {});
        resolve(false);
      });
    } catch {
      resolve(false);
    }
  });
}

async function run() {
  console.log('================================================================');
  console.log(' STEAMDB ASSET SYNC PIPELINE (https://steamdb.info/)');
  console.log(' Mengambil alternatif gambar resmi via Steam Akamai & Cloudflare CDN');
  console.log('================================================================\n');

  let boxArtSuccess = 0;
  let heroSuccess = 0;
  let skipped = 0;

  for (const [itemId, entry] of Object.entries(STEAM_DB_MAP)) {
    if (!entry || !entry.appId) {
      skipped++;
      continue;
    }

    const appId = entry.appId;
    console.log(`[${itemId}] SteamDB App ID: ${appId} (${entry.name})`);

    // Primary Akamai Steam CDN URLs
    const boxUrl = `https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/${appId}/library_600x900_2x.jpg`;
    const heroUrl = `https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/${appId}/library_hero.jpg`;

    const boxDest = path.join(BOXARTS_DIR, `${itemId}.jpg`);
    const charDest = path.join(CHARS_DIR, `${itemId}.jpg`);

    const bOk = await downloadFromSteamCdn(boxUrl, boxDest);
    const hOk = await downloadFromSteamCdn(heroUrl, charDest);

    if (bOk) {
      console.log(`  ✓ Box Art berhasil diunduh dari Steam CDN: ${boxDest}`);
      boxArtSuccess++;
    }

    if (hOk) {
      console.log(`  ✓ Hero Image berhasil diunduh dari Steam CDN: ${charDest}`);
      heroSuccess++;
    }
  }

  console.log('\n================================================================');
  console.log(' HASIL SINKRONISASI STEAMDB');
  console.log(` Box Art Baru Tersimpan:  ${boxArtSuccess} kaset`);
  console.log(` Hero Banner Tersimpan:   ${heroSuccess} karakter`);
  console.log(` Kaset Tanpa Steam ID:    ${skipped} kaset (menggunakan arsip lokal/retro)`);
  console.log('================================================================');
}

run();
