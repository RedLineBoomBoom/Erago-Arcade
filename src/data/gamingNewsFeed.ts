import type { NewsArticle } from '../types/newsFeed';

export const GAMING_NEWS_ARTICLES: NewsArticle[] = [
  {
    "id": "pcg-1",
    "outletId": "pc-gamer",
    "outletName": "PC Gamer",
    "outletIcon": "🖥️",
    "outletThemeColor": "#E61A24",
    "outletDomain": "pcgamer.com",
    "title": "Nvidia RTX 50-Series GPUs: Architecture Deep Dive, DLSS 4 & Frame Generation Benchmarks",
    "summary": "Analisis mendalam mengenai arsitektur Blackwell generasi berikutnya untuk desktop gaming, peningkatan efisiensi daya, dan kapabilitas AI tensor cores terbaru.",
    "url": "https://www.pcgamer.com/hardware/graphics-cards/nvidia-rtx-5080-review/",
    "imageUrl": "/images/news/pcg-1.jpg",
    "category": "PC & Tech",
    "tag": "Hardware",
    "publishedAt": "25 menit yang lalu",
    "readTime": "4 min read",
    "isHot": true,
    "author": "Jacob Ridley",
    "keyHighlights": [
      "Arsitektur Blackwell menghadirkan Tensor Core generasi ke-5 dengan throughput komputasi AI hingga 2.5x lipat.",
      "DLSS 4 memperkenalkan multi-frame generation real-time yang meminimalisir frame pacing lag dan artifact visual.",
      "VRAM GDDR7 berkecepatan 28 Gbps menghasilkan bandwidth memori lebih dari 1 TB/s untuk gaming resolusi 4K native.",
      "Konsumsi daya TGP dirancang jauh lebih efisien berkat proses fabrikasi kustom TSMC 4NP."
    ],
    "fullContent": [
      "Nvidia secara resmi membuka tirai arsitektur GPU desktop generasi berikutnya berkode Blackwell, yang dipimpin oleh GeForce RTX 5090 dan RTX 5080. Arsitektur ini menandai lompatan terbesar dalam pemrosesan grafis neural sejak perkenalan RTX pertama kali pada 2018.",
      "Salah satu inovasi paling transformatif adalah penyematan memori GDDR7 berkecepatan tinggi dengan bus 512-bit pada varian flagship. Bandwidth yang melampaui 1.7 TB/s memastikan game dengan tekstur resolusi ultra-tinggi dan path tracing intensif tidak lagi mengalami bottleneck transfer data.",
      "Di sektor perangkat lunak, DLSS 4 hadir dengan model transformer generatif multi-frame yang mampu menginterpolasi hingga tiga frame berturut-turut dengan tingkat akurasi piksel yang luar biasa. Hasil benchmark awal pada Cyberpunk 2077 Path Tracing menunjukkan lonjakan performa lebih dari 70% dibanding generasi Ada Lovelace sebelumnya.",
      "Dengan perbaikan efisiensi daya pada node proses TSMC 4NP, Nvidia membuktikan bahwa performa komputasi puncak tidak selalu harus dibayar dengan lonjakan konsumsi listrik yang ekstrem, menjadikannya standar baru dalam ekosistem PC enthusiast."
    ]
  },
  {
    "id": "pcg-2",
    "outletId": "pc-gamer",
    "outletName": "PC Gamer",
    "outletIcon": "🖥️",
    "outletThemeColor": "#E61A24",
    "outletDomain": "pcgamer.com",
    "title": "Steam Spring Sale Record Breaker: Concurrent Players Peak Past 38 Million",
    "summary": "Platform Valve kembali memecahkan rekor jumlah pemain aktif bersamaan berkat diskon besar RPG indie dan perilisan game multiplayer kooperatif viral.",
    "url": "https://www.pcgamer.com/games/steam-breaks-all-time-concurrent-player-record-spring-sale/",
    "imageUrl": "/images/news/steam-deck-os.jpg",
    "category": "PC & Tech",
    "tag": "Steam",
    "publishedAt": "2 jam yang lalu",
    "readTime": "3 min read",
    "author": "Rich Stanton",
    "keyHighlights": [
      "Valve mencatat rekor puncak 38.367.817 pemain online bersamaan di platform Steam.",
      "Judul-judul indie dan RPG aksi kooperatif menyumbang lonjakan traffic terbesar di pembukaan Spring Sale.",
      "Penjualan perangkat keras Steam Deck OLED mengalami kenaikan permintaan tertinggi.",
      "Fitur Steam Families yang baru diresmikan turut mendorong waktu bermain kolektif antar pengguna."
    ],
    "fullContent": [
      "Platform distribusi game PC terbesar di dunia, Steam, kembali menorehkan sejarah baru dengan melampaui angka 38,3 juta pengguna aktif bersamaan (concurrent users) tepat di pembukaan Steam Spring Sale tahun ini.",
      "Angka fantastis ini dipicu oleh kombinasi katalog diskon musiman masif serta ledakan popularitas judul-judul game kooperatif dan indie yang menduduki tangga teratas Steam Charts. Game seperti Helldivers 2, Balatro, dan Manor Lords menjadi magnet utama ribuan komunitas gamer global.",
      "Selain faktor perangkat lunak, adopsi masif perangkat gaming genggam Steam Deck OLED juga memberikan kontribusi signifikan terhadap kenaikan waktu bermain rata-rata, di mana jutaan pemain kini dapat mengakses perpustakaan game mereka kapan pun dan di mana pun.",
      "Valve terus memperkuat infrastruktur jaringannya dengan peluncuran fitur Steam Families terpadu, memudahkan keluarga dan grup sahabat untuk berbagi akses perpustakaan game dengan sistem kontrol orang tua yang semakin fleksibel."
    ]
  },
  {
    "id": "pcg-3",
    "outletId": "pc-gamer",
    "outletName": "PC Gamer",
    "outletIcon": "🖥️",
    "outletThemeColor": "#E61A24",
    "outletDomain": "pcgamer.com",
    "title": "Modders Resurrect Classic 90s FPS With Ray Tracing and Custom Vulkan Renderer",
    "summary": "Komunitas modding merilis port sumber terbuka yang mengintegrasikan full path tracing ke dalam game shooter retro dengan performa 144 FPS mulus.",
    "url": "https://www.pcgamer.com/games/fps/quake-2-rtx-vulkan-ray-tracing-mod-update/",
    "imageUrl": "/images/news/quake2-rtx.jpg",
    "category": "Culture & Reviews",
    "tag": "Modding",
    "publishedAt": "5 jam yang lalu",
    "readTime": "5 min read",
    "author": "Ted Litchfield",
    "keyHighlights": [
      "Port open-source kustom mengintegrasikan full path tracing tanpa mengorbankan gameplay 144 FPS responsif.",
      "Pemanfaatan API Vulkan modern memungkinkan simulasi pantulan cahaya global illumination dan caustics air realistis.",
      "Modifikasi mempertahankan estetika geometri poligon low-poly era 1997.",
      "Kompatibel dengan file data game asli shareware maupun versi retail di Steam dan GOG."
    ],
    "fullContent": [
      "Komunitas modding game retro sekali lagi membuktikan dedikasi tanpa batas mereka dengan meluncurkan proyek remaster berbasis sumber terbuka untuk game shooter klasik era 90-an. Proyek ini membekali engine id Tech legendaris dengan pipeline rendering Vulkan modern.",
      "Melalui integrasi full path tracing, setiap tembakan proyektil plasma dan kobaran api ledakan kini memancarkan pencahayaan dinamis yang memantul secara akurat pada dinding logam dan genangan air beracun di pangkalan militer Strogg.",
      "Yang paling mengesankan, modder berhasil merancang sistem denoiser kustom yang sangat efisien. Alih-alih membebani kartu grafis modern, game dapat berjalan dengan refresh rate 144 FPS hingga 240 FPS yang sangat stabil pada resolusi ultrawide 1440p dan 4K.",
      "Inisiatif pelestarian ini membuktikan bagaimana teknologi grafis mutakhir abad ke-21 dapat memberikan napas baru bagi mahakarya masa lalu tanpa merusak esensi nostalgia dan kecepatan gameplay yang dicintai penggemar."
    ]
  },
  {
    "id": "gs-1",
    "outletId": "gamespot",
    "outletName": "GameSpot",
    "outletIcon": "🎯",
    "outletThemeColor": "#FF1E27",
    "outletDomain": "gamespot.com",
    "title": "Grand Theft Auto VI: Everything We Know About Vice City Map Size & Dual Protagonists",
    "summary": "Rangkuman terlengkap detail resmi Rockstar mengenai radius peta negara bagian Leonida, mekanik fisika cuaca dinamis, dan sistem perampokan interaktif.",
    "url": "https://www.gamespot.com/articles/grand-theft-auto-6-everything-we-know/1100-6500551/",
    "imageUrl": "/images/news/gs-1.jpg",
    "category": "Multiplatform",
    "tag": "GTA VI",
    "publishedAt": "40 menit yang lalu",
    "readTime": "6 min read",
    "isHot": true,
    "author": "Eddie Makuch",
    "keyHighlights": [
      "Peta negara bagian Leonida diproyeksikan 2.5x lebih luas dari San Andreas, mencakup Vice City dan rawa Everglades.",
      "Sistem protagonis ganda Lucia dan Jason menghadirkan dinamika perampokan taktis ala Bonnie & Clyde.",
      "Simulasi kecerdasan buatan (AI) NPC dan media sosial in-game dirancang sangat reaktif terhadap dunia sekitar.",
      "Target rilis resmi dikonfirmasi untuk konsol PlayStation 5 dan Xbox Series X|S."
    ],
    "fullContent": [
      "Grand Theft Auto VI menjadi proyek hiburan paling dinantikan dalam sejarah industri modern. Rockstar Games telah mengonfirmasi bahwa setting permainan berpusat di negara bagian fiktif Leonida, yang mencakup gemerlap lampu neon Vice City hingga alam liar kepulauan tropis.",
      "Pemain akan mengendalikan dua protagonis utama, Lucia dan Jason, dalam narasi kriminal yang sarat emosi dan ketegangan. Hubungan interpersonal kedua karakter akan memengaruhi bagaimana misi perampokan dirancang dan dieksekusi di lapangan.",
      "Teknologi engine RAGE 9 menghadirkan simulasi massa paling kompleks yang pernah dibuat. Kerumunan pejalan kaki di pantai, klub malam, dan jalanan protokol memiliki rutinitas unik serta respons emosional yang diperkaya oleh algoritma pembelajaran mesin.",
      "Dengan integrasi ekosistem media sosial video vertikal di dalam game, GTA VI tidak hanya merefleksikan parodi budaya pop modern, tetapi juga menetapkan standar baru untuk simulasi dunia terbuka interaktif."
    ]
  },
  {
    "id": "gs-2",
    "outletId": "gamespot",
    "outletName": "GameSpot",
    "outletIcon": "🎯",
    "outletThemeColor": "#FF1E27",
    "outletDomain": "gamespot.com",
    "title": "Final Fantasy Remake Project Final Chapter: Square Enix Teases Airship Freedom",
    "summary": "Produser Yoshinori Kitase membagikan visi eksplorasi tanpa batas menggunakan Highwind dan pertempuran skala kolosal di penutup trilogi.",
    "url": "https://www.gamespot.com/articles/final-fantasy-7-remake-part-3-airship-highwind-details/1100-6523990/",
    "imageUrl": "/images/news/ff7-remake.jpg",
    "category": "Multiplatform",
    "tag": "JRPG",
    "publishedAt": "3 jam yang lalu",
    "readTime": "4 min read",
    "author": "Michael Higham",
    "keyHighlights": [
      "Produser Yoshinori Kitase memastikan pemain dapat mengemudikan kapal udara Highwind secara bebas melintasi peta dunia.",
      "Bagian penutup trilogi mengintegrasikan sistem pertempuran yang diperluas dengan Materia legendaris Knights of the Round.",
      "Alur narasi akan menjawab percabangan takdir antara Cloud, Aerith, dan Sephiroth di Northern Crater.",
      "Proses produksi berjalan lebih cepat berkat penyempurnaan aset dan sistem dari Rebirth."
    ],
    "fullContent": [
      "Square Enix mulai membagikan gambaran awal mengenai penutup trilogi epik Final Fantasy VII Remake Project. Setelah petualangan lintas benua di Final Fantasy VII Rebirth, bagian ketiga siap membawa skala eksplorasi ke tingkat yang lebih megah.",
      "Produser Yoshinori Kitase dan Sutradara Naoki Hamaguchi menekankan bahwa kehadiran kapal udara Highwind menjadi fokus utama tim pengembang. Pemain dijanjikan kebebasan penuh untuk terbang menembus awan dan mendarat di berbagai penjuru planet Gaia tanpa jeda pemuatan layar.",
      "Sistem pertarungan Active Time Battle (ATB) juga akan diperluas dengan sinergi tim gabungan dan pemanggilan Summon tingkat tertinggi seperti Knights of the Round, yang digadang-gadang akan menghadirkan sekuens visual paling spektakuler.",
      "Kisah legendaris di Northern Crater dan resolusi nasib para pejuang Avalanche akan diuraikan secara tuntas, menghadirkan jawaban emosional atas misteri garis waktu yang telah diperkenalkan sejak Midgar."
    ]
  },
  {
    "id": "gs-3",
    "outletId": "gamespot",
    "outletName": "GameSpot",
    "outletIcon": "🎯",
    "outletThemeColor": "#FF1E27",
    "outletDomain": "gamespot.com",
    "title": "Top 10 Metroidvania Games of the Decade You Need to Play Right Now",
    "summary": "Daftar kurasi mahakarya eksplorasi non-linear terbaik dari era modern yang menggabungkan desain level brilian dengan soundtrack atmosferik.",
    "url": "https://www.gamespot.com/articles/best-metroidvania-games-ranked/1100-6512345/",
    "imageUrl": "/images/news/hollow-knight.jpg",
    "category": "Culture & Reviews",
    "tag": "Review",
    "publishedAt": "7 jam yang lalu",
    "readTime": "5 min read",
    "author": "Tamoor Hussain",
    "keyHighlights": [
      "Hollow Knight memuncaki daftar berkat desain labirin Hallownest yang tak tertandingi dan lore mendalam.",
      "Metroid Dread dan Prince of Persia: The Lost Crown membuktikan kebangkitan formula aksi eksplorasi kelas AAA.",
      "Judul indie seperti Ori and the Will of the Wisps dan Animal Well mendefinisikan standar visual dan teka-teki baru.",
      "Desain backtrack organik menjadi elemen kunci dalam memberikan kepuasan eksplorasi pemain."
    ],
    "fullContent": [
      "Genre Metroidvania telah mengalami zaman keemasan baru dalam satu dekade terakhir. Dari studio indie beranggotakan segelintir orang hingga publisher raksasa, para kreator terus menyempurnakan seni eksplorasi non-linear.",
      "Berada di posisi puncak, Hollow Knight karya Team Cherry tetap menjadi tolok ukur utama genre ini. Labirin bawah tanah Hallownest yang sunyi dipadukan dengan kontrol pertarungan tajam dan musik orkestra Christopher Larkin menciptakan pengalaman yang tiada duanya.",
      "Di sisi lain, Nintendo dan Ubisoft berhasil membuktikan relevansi genre ini di panggung AAA lewat Metroid Dread dan Prince of Persia: The Lost Crown, menghadirkan animasi 60 FPS mulus dan pertarungan boss yang memacu adrenalin.",
      "Kunci dari kehebatan game-game ini bukan sekadar peta yang luas, melainkan kecerdasan desain level yang membuat momen penemuan kemampuan baru terasa seperti pembuka gerbang rahasia dunia yang mengagumkan."
    ]
  },
  {
    "id": "ign-1",
    "outletId": "ign-sea",
    "outletName": "IGN Southeast Asia",
    "outletIcon": "🔥",
    "outletThemeColor": "#BF1313",
    "outletDomain": "sea.ign.com",
    "title": "Southeast Asian Indie Games Spotlight: 12 Exceptional Titles Coming in 2026",
    "summary": "Kompilasi game buatan developer berbakat dari Indonesia, Malaysia, Singapura, dan Filipina yang siap mencuri perhatian di panggung global.",
    "url": "https://sea.ign.com/games/215689/southeast-asian-indie-games-to-watch-2026",
    "imageUrl": "/images/news/space-unbound.jpg",
    "category": "Multiplatform",
    "tag": "SEA Gaming",
    "publishedAt": "1 jam yang lalu",
    "readTime": "4 min read",
    "isHot": true,
    "author": "Dale Bashir",
    "keyHighlights": [
      "Developer independen dari Indonesia, Malaysia, Filipina, dan Singapura memamerkan inovasi cerita berbasis folklore lokal.",
      "Game petualangan naratif dan pixel-art buatan anak bangsa meraih pengakuan di festival internasional.",
      "Penerbit terkemuka dunia aktif mendanai studio-studio berbakat di kawasan Asia Tenggara.",
      "Kombinasi budaya otentik dengan mekanik modern seperti roguelite dan cozy simulation."
    ],
    "fullContent": [
      "Industri pengembangan game di Asia Tenggara sedang menikmati momentum pertumbuhan paling pesat sepanjang sejarah. Komunitas global kini semakin terpikat oleh keunikan narasi, visual, dan folklore lokal yang diangkat oleh developer dari kawasan ASEAN.",
      "Mengikuti jejak sukses karya seperti A Space for the Unbound dan Coral Island, generasi baru pengembang Indonesia dan negara tetangga menghadirkan proyek-proyek segar yang memadukan kehangatan budaya nusantara dengan gameplay mekanis kelas dunia.",
      "Dukungan dari publisher global seperti Devolver Digital, Kepler Interactive, dan Raw Fury menjadi bukti nyata bahwa kualitas talenta developer Asia Tenggara telah setara dengan studio internasional papan atas.",
      "Mulai dari game petualangan teka-teki bertema mitologi pulau Jawa hingga simulasi kafe cyberpunk di jalanan Manila, 12 judul terpilih ini membuktikan bahwa keberagaman budaya adalah masa depan industri video game dunia."
    ]
  },
  {
    "id": "ign-2",
    "outletId": "ign-sea",
    "outletName": "IGN Southeast Asia",
    "outletIcon": "🔥",
    "outletThemeColor": "#BF1313",
    "outletDomain": "sea.ign.com",
    "title": "Capcom Confirms Monster Hunter Wilds Major Post-Launch Regional Tournament",
    "summary": "Turnamen regional Asia Tenggara resmi diumumkan dengan total hadiah ratusan juta rupiah dan kualifikasi offline di Jakarta, Kuala Lumpur, dan Manila.",
    "url": "https://sea.ign.com/monster-hunter-wilds/214589/monster-hunter-wilds-southeast-asia-tournament-circuit",
    "imageUrl": "/images/news/mh-wilds.jpg",
    "category": "Multiplatform",
    "tag": "Esports",
    "publishedAt": "4 jam yang lalu",
    "readTime": "3 min read",
    "author": "Samantha Phelan",
    "keyHighlights": [
      "Sirkuit kompetisi perburuan waktu (Speedrun Time Attack) resmi hadir di Jakarta, Kuala Lumpur, dan Manila.",
      "Total hadiah turnamen mencapai lebih dari $50.000 dengan trofi fisik eksklusif dari Capcom.",
      "Format pertandingan menguji kerja sama tim 2-hunter dan solo run menghadapi monster Apex paling ganas.",
      "Babak grand final offline akan diselenggarakan di panggung utama festival game Asia."
    ],
    "fullContent": [
      "Capcom secara resmi mengumumkan sirkuit turnamen kompetitif Monster Hunter Wilds khusus untuk kawasan Asia Tenggara. Langkah ini disambut meriah oleh komunitas pemburu monster yang telah lama menantikan panggung esport resmi di wilayah ini.",
      "Turnamen ini mengadopsi format Time Attack Arena, di mana para peserta ditantang untuk menumbangkan monster predator terkuat dalam batas waktu tercepat menggunakan perlengkapan standar yang telah ditentukan secara adil.",
      "Kualifikasi luring (offline) akan diselenggarakan di berbagai kota besar termasuk Jakarta, Kuala Lumpur, Singapura, Bangkok, dan Manila, memberikan wadah bagi komunitas lokal untuk berkumpul dan merayakan kecintaan mereka pada waralaba ini.",
      "Para pemenang dari masing-masing kota akan diterbangkan untuk berlaga di panggung utama Gamescom Asia guna memperebutkan gelar Hunter of the Year dan trofi replika Great Sword berlapis emas."
    ]
  },
  {
    "id": "ign-3",
    "outletId": "ign-sea",
    "outletName": "IGN Southeast Asia",
    "outletIcon": "🔥",
    "outletThemeColor": "#BF1313",
    "outletDomain": "sea.ign.com",
    "title": "The Legend of Zelda Live-Action Movie: Director Wes Ball Shares Production Update",
    "summary": "Sutradara menjanjikan pendekatan visual praktis yang terinspirasi dari karya visual Hayao Miyazaki untuk menghidupkan kerajaan Hyrule di layar lebar.",
    "url": "https://sea.ign.com/the-legend-of-zelda-live-action/213890/zelda-live-action-movie-wes-ball-miyazaki-inspiration",
    "imageUrl": "/images/characters/link_retro.jpg",
    "category": "Culture & Reviews",
    "tag": "Movie News",
    "publishedAt": "8 jam yang lalu",
    "readTime": "4 min read",
    "author": "Alex Stedman",
    "keyHighlights": [
      "Sutradara Wes Ball menekankan sinematografi lanskap alam nyata dan efek praktis.",
      "Estetika visual film banyak terinspirasi dari keajaiban alam karya animasi Hayao Miyazaki.",
      "Shigeru Miyamoto mengawasi langsung penulisan naskah dan perancangan dunia Hyrule.",
      "Komitmen menghadirkan kisah petualangan fantasi murni yang setia pada warisan 40 tahun waralaba."
    ],
    "fullContent": [
      "Proyek film live-action The Legend of Zelda terus menarik sorotan publik. Sutradara Wes Ball (Kingdom of the Planet of the Apes) membagikan kabar terbaru mengenai filosofi visual yang akan diusungnya bersama Nintendo dan Sony Pictures.",
      "Ball menegaskan bahwa adaptasi ini tidak akan mengandalkan layar hijau CGI berlebihan. Sebaliknya, proses syuting akan memanfaatkan lanskap alam nyata di Selandia Baru dan Eropa untuk menghadirkan kerajaan Hyrule yang megah, bernapas, dan memiliki bobot fisik yang meyakinkan.",
      "Inspirasi utama film ini datang dari mahakarya animasi Hayao Miyazaki seperti Princess Mononoke, di mana alam liar digambarkan memiliki jiwa spiritual yang kuat dan penuh rahasia kuno.",
      "Dengan keterlibatan langsung bapak pencipta Zelda, Shigeru Miyamoto, film ini bertujuan untuk memberikan pengalaman sinematik yang memuaskan para penggemar veteran sekaligus memperkenalkan legenda Link dan Putri Zelda kepada generasi penonton baru."
    ]
  },
  {
    "id": "vgc-1",
    "outletId": "vgc",
    "outletName": "VGC",
    "outletIcon": "⚡",
    "outletThemeColor": "#0055FF",
    "outletDomain": "videogameschronicle.com",
    "title": "Nintendo Switch 2: Supply Chain Reports Reveal 12GB RAM and Magnetic Joy-Cons",
    "summary": "Sumber manufaktur di Asia mengonfirmasi spesifikasi memori hardware suksesor Switch yang siap mendukung DLSS hardware upscaling dan backward compatibility penuh.",
    "url": "https://www.videogameschronicle.com/news/nintendo-switch-2-hardware-specs-12gb-ram-magnetic-joy-cons/",
    "imageUrl": "/images/news/vgc-1.jpg",
    "category": "Industry & Business",
    "tag": "Console Scoop",
    "publishedAt": "15 menit yang lalu",
    "readTime": "4 min read",
    "isHot": true,
    "author": "Andy Robinson",
    "keyHighlights": [
      "Laporan rantai pasok manufaktur mengindikasikan memori RAM 12GB LPDDR5X dan storage UFS 3.1 cepat.",
      "Joy-Con generasi baru beralih ke sistem rel magnetik dengan sensor Hall Effect anti-drifting.",
      "Chipset kustom Nvidia Tegra mendukung DLSS Super Resolution untuk visual 4K saat terpasang di dock.",
      "Dukungan penuh backward compatibility untuk game cartridge dan digital Switch orisinal."
    ],
    "fullContent": [
      "Laporan mendalam dari para mitra manufaktur komponen di Taiwan dan Jepang mengungkap detail baru mengenai konsol generasi penerus Nintendo Switch. Perangkat ini dirancang untuk menjembatani mobilitas handheld dengan performa visual modern.",
      "Penyematan memori RAM 12GB LPDDR5X menjadi lonjakan signifikan dibanding pendahulunya yang hanya memiliki 4GB. Kapasitas ini memberikan ruang leluasa bagi para developer pihak ketiga untuk membawa game modern berkelas AAA ke ekosistem Nintendo.",
      "Desain pengendali Joy-Con juga mendapatkan perombakan total. Mekanisme geser fisik digantikan oleh sistem penguncian magnetik presisi tinggi, dipadukan dengan stick analog berteknologi Hall Effect magnetik yang kebal terhadap masalah stick drift secara permanen.",
      "Nintendo juga memastikan bahwa transisi akun Nintendo Account dan seluruh koleksi game pemain saat ini akan berpindah secara mulus berkat fitur kompatibilitas mundur penuh."
    ]
  },
  {
    "id": "vgc-2",
    "outletId": "vgc",
    "outletName": "VGC",
    "outletIcon": "⚡",
    "outletThemeColor": "#0055FF",
    "outletDomain": "videogameschronicle.com",
    "title": "PlayStation Studios Internal Restructuring Focuses Heavily on Single-Player Prestige Hits",
    "summary": "Sony Interactive Entertainment mengalihkan fokus strategi investasinya kembali ke game narrative-driven single player setelah evaluasi inisiatif live-service.",
    "url": "https://www.videogameschronicle.com/news/playstation-studios-restructuring-single-player-focus/",
    "imageUrl": "/images/news/god-of-war.jpg",
    "category": "Industry & Business",
    "tag": "Sony",
    "publishedAt": "2 jam yang lalu",
    "readTime": "5 min read",
    "author": "Chris Scullion",
    "keyHighlights": [
      "Sony Interactive Entertainment mengarahkan kembali fokus anggaran ke game naratif single-player prestige.",
      "Studio-studio utama seperti Santa Monica Studio dan Naughty Dog memimpin pengembangan IP orisinal baru.",
      "Beberapa inisiatif proyek live-service yang belum diumumkan dipangkas demi menjaga standar kualitas.",
      "Model rilis konsol eksklusif berjangka tetap menjadi fondasi penjualan hardware PS5 Pro."
    ],
    "fullContent": [
      "Di bawah kepemimpinan Hermen Hulst dan Hideaki Nishino, Sony Interactive Entertainment melakukan kalibrasi ulang terhadap portofolio pengembangannya di PlayStation Studios.",
      "Setelah beberapa tahun menguji peruntungan di pasar game live-service yang sarat persaingan ketat, Sony memutuskan untuk kembali memperkuat DNA intinya: petualangan sinematik naratif pemain tunggal dengan nilai produksi prestise.",
      "Kemitraan dan pendanaan diperkuat untuk studio-studio andalan seperti Santa Monica Studio, Naughty Dog, Sucker Punch, dan Insomniac Games guna mempercepat peluncuran judul-judul baru yang mampu mengoptimalkan kapabilitas PlayStation 5 Pro.",
      "Langkah strategis ini disambut positif oleh komunitas global yang selalu mengasosiasikan merek PlayStation dengan pengalaman bermain game berkualitas cerita terbaik di industri."
    ]
  },
  {
    "id": "vgc-3",
    "outletId": "vgc",
    "outletName": "VGC",
    "outletIcon": "⚡",
    "outletThemeColor": "#0055FF",
    "outletDomain": "videogameschronicle.com",
    "title": "Konami Silent Hill 2 Remake Success Sparks Greenlight for Multiple Classic Revivals",
    "summary": "Penjualan yang melampaui ekspektasi membuat Konami mempercepat pra-produksi untuk reboot Castlevania dan entri baru franchise horor legendaris.",
    "url": "https://www.videogameschronicle.com/news/silent-hill-2-remake-sales-success-konami-castlevania-revivals/",
    "imageUrl": "/images/news/silent-hill-2.jpg",
    "category": "Industry & Business",
    "tag": "Konami",
    "publishedAt": "6 jam yang lalu",
    "readTime": "3 min read",
    "author": "Andy Robinson",
    "keyHighlights": [
      "Penjualan Silent Hill 2 Remake menembus angka jutaan kopi dalam waktu singkat.",
      "Konami memberikan lampu hijau untuk eksplorasi remake Silent Hill 1 & 3 serta proyek Castlevania modern.",
      "Penerimaan kritis membuktikan besarnya minat pasar terhadap kebangkitan franchise retro legendaris.",
      "Kolaborasi dengan studio pengembang eksternal bertalenta menjadi pilar strategi Konami ke depan."
    ],
    "fullContent": [
      "Kesuksesan kritis dan komersial yang diraih oleh Silent Hill 2 Remake garapan Bloober Team menjadi titik balik monumental bagi strategi video game Konami.",
      "Dengan angka penjualan yang melampaui target internal publisher, manajemen Konami kini secara agresif mengeksplorasi kelanjutan kebangkitan katalog IP legendaris lainnya dari era kejayaan PlayStation 1 dan PlayStation 2.",
      "Sumber dalam mengonfirmasi bahwa pra-produksi untuk remake Silent Hill seri pertama dan ketiga telah memasuki tahap perencanaan, bersamaan dengan rumor kuat mengenai kebangkitan waralaba aksi gothic Castlevania dalam format visual 3D modern.",
      "Didukung oleh antusiasme terhadap Metal Gear Solid Delta: Snake Eater, Konami kini resmi kembali sebagai pemain kunci yang disegani dalam lanskap gaming global."
    ]
  },
  {
    "id": "gi-1",
    "outletId": "game-informer",
    "outletName": "Game Informer",
    "outletIcon": "📖",
    "outletThemeColor": "#0066CC",
    "outletDomain": "gameinformer.com",
    "title": "Exclusive Cover Story: How FromSoftware Reinvents Dark Fantasy World Building",
    "summary": "Wawancara khusus 12 halaman bersama sutradara Hidetaka Miyazaki membahas filosofi arsitektur reruntuhan, narasi tersembunyi item lore, dan misteri boss combat.",
    "url": "https://www.gameinformer.com/feature/2024/06/18/fromsoftware-hidetaka-miyazaki-world-building-philosophy",
    "imageUrl": "/images/news/elden-ring.jpg",
    "category": "Industry & Business",
    "tag": "Cover Story",
    "publishedAt": "1 jam yang lalu",
    "readTime": "7 min read",
    "isHot": true,
    "author": "Marcus Stewart",
    "keyHighlights": [
      "Hidetaka Miyazaki membeberkan filosofi arsitektur reruntuhan kastil dan narasi tersembunyi deskripsi item.",
      "Menjelaskan bagaimana rasa keputusasaan pemain diubah menjadi katarsis kemenangan yang abadi.",
      "Kolaborasi artistik menciptakan ekosistem makhluk mitologi yang terasa bernyawa dan penuh tragedi.",
      "Visi FromSoftware dalam mengeksplorasi genre fiksi ilmiah dan tempo pertarungan baru di masa depan."
    ],
    "fullContent": [
      "Dalam sesi wawancara eksklusif bersama Game Informer, sutradara visioner Hidetaka Miyazaki membagikan wawasan mendalam mengenai metode penciptaan dunia di balik kesuksesan mahakarya FromSoftware.",
      "Menurut Miyazaki, keindahan fantasi gelap bukan terletak pada kengerian monster semata, melainkan pada sisa-sisa kemegahan masa lalu yang telah runtuh. Reruntuhan kastil dan kuil kuno dirancang sedemikian rupa agar setiap batu dan tangga menceritakan peradaban yang pernah berjaya sebelum kehancurannya.",
      "Mengenai tingkat kesulitan yang menjadi ciri khas karyanya, Miyazaki menjelaskan bahwa tantangan ekstrem adalah instrumen psikologis untuk membangun ikatan emosional antara pemain dan avatar mereka. Saat rintangan mustahil akhirnya terlewati, perasaan puas yang dirasakan bersifat universal.",
      "Miyazaki juga memberi sinyal bahwa FromSoftware tidak akan berhenti pada formula yang sudah mapan, melainkan terus mencari terobosan baru dalam desain mekanik dan narasi lingkungan di masa mendatang."
    ]
  },
  {
    "id": "gi-2",
    "outletId": "game-informer",
    "outletName": "Game Informer",
    "outletIcon": "📖",
    "outletThemeColor": "#0066CC",
    "outletDomain": "gameinformer.com",
    "title": "The Lost Cartridges of Akihabara: Retrospective on Rare Famicom Disks",
    "summary": "Petualangan jurnalisme investigasi menelusuri lorong pasar elektronik Tokyo demi menemukan disket prototipe game yang tak pernah dirilis resmi ke publik.",
    "url": "https://www.gameinformer.com/retro/2024/05/12/the-lost-cartridges-of-akihabara-famicom-disk-system-history",
    "imageUrl": "/images/boxarts/t-01.jpg",
    "category": "Culture & Reviews",
    "tag": "Retro Archive",
    "publishedAt": "5 jam yang lalu",
    "readTime": "6 min read",
    "author": "Brian Shea",
    "keyHighlights": [
      "Penelusuran di gang sempit Akihabara mengungkap disket langka Famicom Disk System tahun 1986.",
      "Kisah mesin kios Disk Writer Nintendo yang menjadi pionir distribusi game digital pertama di dunia.",
      "Prototipe game yang dibatalkan berhasil dipulihkan dan diarsipkan secara digital oleh sejarawan.",
      "Tantangan pelestarian fisik media magnetik yang rentan terhadap kerusakan usia dan demagnetisasi."
    ],
    "fullContent": [
      "Menelusuri lorong sempit distrik Akihabara di Tokyo bukan sekadar wisata belanja, melainkan perjalanan arkeologi video game modern. Di balik tumpukan kotak elektronik lawas, tersimpan peninggalan era Famicom Disk System yang mengubah sejarah Nintendo pada tahun 1986.",
      "Famicom Disk System memperkenalkan konsep revolusioner melalui kios Disk Writer di toko mainan Jepang, di mana pemain dapat menulis ulang isi disket kuning mereka dengan game baru seharga 500 yen saja—konsep awal distribusi digital jauh sebelum era internet.",
      "Investigasi kami berhasil menemui para kolektor veteran yang menyimpan disket prototipe yang tak pernah dipasarkan ke publik. Dengan bantuan perangkat keras khusus, kode biner game tersebut berhasil diekstraksi dan diselamatkan dari ancaman pembusukan media magnetik.",
      "Upaya ini menggarisbawahi betapa rapuhnya sejarah awal video game dan mendesaknya gerakan pelestarian arsip digital agar warisan kreativitas para perintis industri tidak hilang ditelan zaman."
    ]
  },
  {
    "id": "gi-3",
    "outletId": "game-informer",
    "outletName": "Game Informer",
    "outletIcon": "📖",
    "outletThemeColor": "#0066CC",
    "outletDomain": "gameinformer.com",
    "title": "Behind the Pixels: The Oral History of id Software and the Doom 1993 Source Code",
    "summary": "John Carmack dan John Romero menceritakan kembali revolusi rendering BSP tree dan bagaimana multiplayer deathmatch mengubah industri selamanya.",
    "url": "https://www.gameinformer.com/classic/2023/12/10/doom-1993-oral-history-john-carmack-john-romero",
    "imageUrl": "/images/news/doom-1993.jpg",
    "category": "Culture & Reviews",
    "tag": "Dev Diaries",
    "publishedAt": "9 jam yang lalu",
    "readTime": "8 min read",
    "author": "Blake Hester",
    "keyHighlights": [
      "Wawancara bersama John Carmack dan John Romero mengenang revolusi algoritma Binary Space Partitioning.",
      "Pelepasan kode sumber DOOM pada 1997 melahirkan gerakan modding global dan port ke berbagai perangkat unik.",
      "Dampak kultural musik metal gubahan Bobby Prince dan arsitektur level non-linear E1M1.",
      "Filosofi arsitektur engine yang bersih menjadi fondasi standar seluruh industri 3D masa kini."
    ],
    "fullContent": [
      "Tiga dekade setelah DOOM pertama kali mengguncang jaringan komputer kantor di seluruh dunia pada Desember 1993, Game Informer duduk bersama para arsitek aslinya: John Carmack dan John Romero.",
      "Carmack mengenang bagaimana penemuan matematika Binary Space Partitioning (BSP) memungkinkan komputer prosesor 486 merender lorong 3D bertekstur secara instan tanpa membuat sistem mengalami crash, sebuah pencapaian yang saat itu dianggap mustahil oleh insinyur Silicon Graphics.",
      "Sementara itu, Romero menguraikan filosofi desain level yang mengutamakan ritme kecepatan, sudut pandang dramatis, dan bahaya lingkungan yang memacu adrenalin. Penemuan mode multiplayer Deathmatch oleh Romero seketika melahirkan kultur esports modern.",
      "Keputusan Carmack untuk merilis seluruh kode sumber DOOM di bawah lisensi GNU pada tahun 1997 menjadi warisan paling abadi, membuka jalan bagi lahirnya komunitas open-source dan membuktikan bahwa kode yang bersih adalah seni yang tak lekang oleh waktu."
    ]
  },
  {
    "id": "tg-1",
    "outletId": "thegamer",
    "outletName": "TheGamer",
    "outletIcon": "🕹️",
    "outletThemeColor": "#6C5CE7",
    "outletDomain": "thegamer.com",
    "title": "Every Mainline Resident Evil Game Ranked From Worst To Absolute Masterpiece",
    "summary": "Penilaian mendalam dari era tank controls mansion Arklay tahun 1996 hingga horor first-person di pegunungan bersalju Eropa timur.",
    "url": "https://www.thegamer.com/resident-evil-games-ranked-worst-to-best/",
    "imageUrl": "/images/news/re4-remake.jpg",
    "category": "Culture & Reviews",
    "tag": "Ranking List",
    "publishedAt": "45 menit yang lalu",
    "readTime": "5 min read",
    "author": "Jade King",
    "keyHighlights": [
      "Resident Evil 4 (2005) dan Remake 2023 bersaing ketat di puncak bersama Resident Evil 2 klasik.",
      "Evolusi dari tank controls kamera statis menuju over-the-shoulder hingga sudut pandang orang pertama.",
      "Analisis bagaimana Capcom bangkit dari kegagalan Resident Evil 6 menuju kebangkitan di Resident Evil 7.",
      "Penilaian komparatif terhadap desain inventaris koper attaché dan ketegangan survival horror."
    ],
    "fullContent": [
      "Sejak Shinji Mikami mengunci pintu Spencer Mansion pada tahun 1996, waralaba Resident Evil telah mengalami beragam transformasi gaya, dari survival horror claustrophobic hingga aksi tembak-menembak penuh ledakan.",
      "Dalam pemeringkatan komprehensif kami, Resident Evil 4 (baik mahakarya 2005 maupun remake brilian 2023) berhasil meraih posisi teratas. Perpaduan tempo aksi yang sempurna, manajemen inventaris attaché case yang adiktif, dan atmosfer desa terpencil Spanyol tetap tak tertandingi.",
      "Resident Evil 2 Remake dan Resident Evil 7: Biohazard menempati jajaran elit berikutnya, membuktikan kemampuan Capcom untuk kembali ke akar kengerian murni saat waralaba sempat kehilangan identitasnya di Resident Evil 6.",
      "Keberhasilan Resident Evil bertahan selama hampir 30 tahun terletak pada keberanian Capcom untuk terus membongkar dan membangun ulang formulanya tanpa meninggalkan rasa tegang ketika peluru di pistol Anda tersisa satu butir saja."
    ]
  },
  {
    "id": "tg-2",
    "outletId": "thegamer",
    "outletName": "TheGamer",
    "outletIcon": "🕹️",
    "outletThemeColor": "#6C5CE7",
    "outletDomain": "thegamer.com",
    "title": "Why Chrono Trigger 1995 Time Travel Mechanic Has Never Been Surpassed",
    "summary": "Esai analisis mekanik mengapa sistem timeline 65,000,000 BC hingga 2300 AD milik Dream Team Square Enix tetap menjadi standar emas narasi interaktif.",
    "url": "https://www.thegamer.com/chrono-trigger-time-travel-mechanic-super-nintendo-analysis/",
    "imageUrl": "/images/news/chrono-trigger.jpg",
    "category": "Culture & Reviews",
    "tag": "Retro Essays",
    "publishedAt": "3 jam yang lalu",
    "readTime": "4 min read",
    "author": "Eric Switzer",
    "keyHighlights": [
      "Karya kolaborasi Dream Team (Sakaguchi, Horii, Toriyama) memadukan 7 era waktu tanpa celah plot.",
      "Tindakan kecil di masa lalu memiliki dampak kausalitas nyata pada dunia masa depan 2300 AD.",
      "Sistem 13 ending berbeda memelopori fitur New Game Plus pertama dalam sejarah JRPG.",
      "Sentuhan musik emosional Yasunori Mitsuda dan Nobuo Uematsu yang melegenda."
    ],
    "fullContent": [
      "Banyak game modern yang mengangkat tema perjalanan waktu, namun hampir tidak ada yang mampu menyamai keanggunan dan keutuhan logika naratif Chrono Trigger yang dirilis untuk Super Nintendo pada 1995.",
      "Diproduksi oleh Dream Team yang terdiri dari Hironobu Sakaguchi (Final Fantasy), Yuji Horii (Dragon Quest), dan master manga Akira Toriyama, game ini menghubungkan tujuh era waktu berbeda—dari zaman prasejarah hingga kiamat masa depan—dengan hukum kausalitas yang kokoh.",
      "Ketika pemain menanam sebutir benih di era Abad Pertengahan, benih itu tumbuh menjadi hutan lebat di era modern berabad-abad kemudian. Mekanisme ini membuat dunia permainan terasa organik dan responsif terhadap pilihan pemain.",
      "Ditambah dengan lahirnya fitur New Game Plus dan 13 akhir cerita yang unik, Chrono Trigger bukan sekadar game RPG terbaik di zamannya, melainkan cetak biru kesempurnaan narasi interaktif yang tak lekang oleh waktu."
    ]
  },
  {
    "id": "tg-3",
    "outletId": "thegamer",
    "outletName": "TheGamer",
    "outletIcon": "🕹️",
    "outletThemeColor": "#6C5CE7",
    "outletDomain": "thegamer.com",
    "title": "Essential Combat Combos and Secret Builds for Elden Ring: Shadow of the Erdtree",
    "summary": "Panduan kombinasi senjata baru Dryleaf Arts dan talisman ofensif untuk mengalahkan boss DLC paling brutal tanpa terkena hit.",
    "url": "https://www.thegamer.com/elden-ring-shadow-of-the-erdtree-best-builds-combos-guide/",
    "imageUrl": "/images/news/er-shadow-erdtree.jpg",
    "category": "Multiplatform",
    "tag": "Guides",
    "publishedAt": "7 jam yang lalu",
    "readTime": "4 min read",
    "author": "Harry Alston",
    "keyHighlights": [
      "Seni bela diri Dryleaf Arts dikombinasikan dengan status poison menghasilkan burst damage fisik masif.",
      "Pemanfaatan Scadutree Fragment secara terarah untuk menahan serangan mematikan boss DLC.",
      "Kombinasi Perfume Bottle dengan Rolling Sparks menciptakan kombo serangan area penghancur poise.",
      "Mekanik Deflecting Hardtear memungkinkan gaya bertarung parry instan ala Sekiro."
    ],
    "fullContent": [
      "Ekspansi Shadow of the Erdtree menghadirkan tingkat kesulitan yang menguji batas kemampuan para veteran Elden Ring di Lands Between. Namun, penambahan delapan kategori senjata baru juga membuka ruang eksperimen build yang sangat kuat.",
      "Salah satu kombinasi paling populer adalah kelas pertarungan tangan kosong Dryleaf Arts. Dengan memasangkan Ash of War Poison Flower Blooms Twice dan talisman Shattered Stone, pemain dapat melancarkan tendangan bertubi-tubi yang mampu merontokkan bar poise boss dalam hitungan detik.",
      "Selain senjata fisik, kehadiran Crystal Tear tipe Deflecting Hardtear mengubah tempo pertempuran secara radikal. Pemain dapat menahan serangan pedang raksasa dengan teknik deflect berpresisi tinggi yang memberikan peningkatan damage serangan balasan (guard counter) hingga 80%.",
      "Panduan ini merinci alokasi atribut status dan lokasi tersembunyi Scadutree Fragment untuk memastikan perjalanan Anda di Realm of Shadow terasa menyenangkan tanpa harus terjebak rasa frustrasi berulang."
    ]
  },
  {
    "id": "poly-1",
    "outletId": "polygon",
    "outletName": "Polygon",
    "outletIcon": "🔷",
    "outletThemeColor": "#ED1B67",
    "outletDomain": "polygon.com",
    "title": "The Unsung Legacy of Neo-Geo: When Arcades Brought Luxury into Living Rooms",
    "summary": "Eksplorasi mendalam era 100 Mega Shock, arsitektur motor ganda SNK MVS, dan bagaimana Metal Slug mendefinisikan standar seni animasi piksel 2D.",
    "url": "https://www.polygon.com/features/2024/2/15/snk-neo-geo-arcade-aes-mvs-history-legacy",
    "imageUrl": "/images/news/metal-slug-3.jpg",
    "category": "Culture & Reviews",
    "tag": "Essays",
    "publishedAt": "2 jam yang lalu",
    "readTime": "6 min read",
    "author": "Chris Plante",
    "keyHighlights": [
      "SNK merilis Neo-Geo AES pada 1990 sebagai sistem konsol rumahan 24-bit yang 100% identik dengan mesin arcade.",
      "Cartridge raksasa berkapasitas 100 Mega Shock menghadirkan sprite piksel 2D spektakuler tanpa tandingan.",
      "Franchise abadi seperti Metal Slug, The King of Fighters, dan Samurai Shodown mendominasi kultur arcade.",
      "Simbol kemewahan gaming legendaris dengan harga rilis konsol $649 dan cartridge individual hingga $300."
    ],
    "fullContent": [
      "Pada tahun 1990, ketika sebagian besar anak-anak berdebat antara Sega Genesis dan Super Nintendo, SNK mengambil langkah berani yang tak tertandingi: mereka membawa perangkat keras mesin arcade murni ke ruang keluarga melalui Neo-Geo Advanced Entertainment System (AES).",
      "Tidak ada kompromi grafis, tidak ada penurunan resolusi sprite. Cartridge Neo-Geo yang berukuran sebesar buku ensiklopedia memuat chip memori raksasa dengan slogan legendaris 100 Mega Shock, memungkinkan animasi piksel paling halus dan mendetail yang pernah disaksikan mata manusia pada masanya.",
      "Serial Metal Slug karya studio Nazca menjadi puncak ekspresi seni piksel 2D. Setiap ledakan tank, reaksi konyol musuh, dan animasi latar belakang digambar dengan tangan bingkai demi bingkai, menciptakan identitas visual yang tetap memesona hingga hari ini.",
      "Meskipun banderol harganya yang mahal menjadikannya barang mewah bagi segelintir orang, warisan teknis Neo-Geo mengukuhkan posisi SNK sebagai salah satu raksasa paling dihormati dalam lembaran sejarah video game dunia."
    ]
  },
  {
    "id": "poly-2",
    "outletId": "polygon",
    "outletName": "Polygon",
    "outletIcon": "🔷",
    "outletThemeColor": "#ED1B67",
    "outletDomain": "polygon.com",
    "title": "Hades II Full Release Preview: Melinoe Spellcraft and Olympus War Mechanics",
    "summary": "Supergiant Games memperluas dunia bawah tanah mitologi Yunani dengan sistem sihir yang jauh lebih dalam dan interaksi karakter kaya nuansa emosional.",
    "url": "https://www.polygon.com/game-reviews/2024/5/8/hades-2-early-access-preview-melinoe-supergiant",
    "imageUrl": "/images/news/hades-2.jpg",
    "category": "Multiplatform",
    "tag": "Previews",
    "publishedAt": "4 jam yang lalu",
    "readTime": "5 min read",
    "author": "Nicole Carpenter",
    "keyHighlights": [
      "Melinoe, adik Zagreus, memperkenalkan gaya bertarung berbasis energi sihir Magick dan casting runes.",
      "Alur petualangan ganda: menyusup ke kedalaman Tartarus menghadapi Chronos atau mendaki ke puncak Gunung Olympus.",
      "Karakterisasi mendalam khas Supergiant Games dengan ilustrasi seni tangan indah gubahan Jen Zee.",
      "Sistem Cauldron Incantations memperluas progression roguelite jauh melampaui pendahulunya."
    ],
    "fullContent": [
      "Menghadapi ekspektasi masif pasca-kesuksesan besar prekuelnya bukanlah tugas mudah, tetapi Supergiant Games membuktikan kepiawaian mereka melalui Hades II. Mengambil sudut pandang Melinoe, Putri Dunia Bawah dan saudara perempuan Zagreus, sekuel ini menghadirkan perubahan dinamis pada formula roguelite.",
      "Berbeda dengan gaya tarung pedang Zagreus yang agresif, Melinoe adalah seorang penyihir terlatih. Ia mengendalikan sumber daya Magick untuk meluncurkan serangan Omega jarak jauh dan menjebak gerombolan musuh dalam lingkaran segel kutukan.",
      "Skala narasi juga berlipat ganda. Melinoe tidak hanya harus menembus kedalaman Tartarus untuk membebaskan keluarganya dari cengkeraman Titan Waktu Chronos, tetapi juga dapat memilih rute ke permukaan bumi demi menyelamatkan puncak Gunung Olympus yang terkepung perang dewa.",
      "Dipadukan dengan komposisi musik rock Mediterania karya Darren Korb dan arahan seni visual menakjubkan Jen Zee, Hades II siap mengukuhkan statusnya sebagai salah satu game aksi terbaik generasi ini."
    ]
  },
  {
    "id": "poly-3",
    "outletId": "polygon",
    "outletName": "Polygon",
    "outletIcon": "🔷",
    "outletThemeColor": "#ED1B67",
    "outletDomain": "polygon.com",
    "title": "How 90s Video Game Sound Chips Shaped Modern Electronic and Synthwave Music",
    "summary": "Dari Yamaha YM2612 di Sega Genesis hingga chip SPC700 Nintendo SNES, para musisi modern menceritakan pesona sampling FM synth yang abadi.",
    "url": "https://www.polygon.com/culture/2023/11/20/video-game-sound-chips-ym2612-spc700-synthwave-influence",
    "imageUrl": "/images/news/streets-of-rage.jpg",
    "category": "Culture & Reviews",
    "tag": "Chiptune Music",
    "publishedAt": "8 jam yang lalu",
    "readTime": "6 min read",
    "author": "Austin Grossman",
    "keyHighlights": [
      "Chip Yamaha YM2612 pada Sega Genesis dengan karakter FM synthesis menjadi fondasi musik synthwave modern.",
      "Chip Sony SPC700 pada Super Nintendo merevolusi teknik sampling audio 16-bit dengan reverb akustik hangat.",
      "Musisi legendaris seperti Yuzo Koshiro membuktikan chip konsol mampu menyaingi synthesizer studio profesional.",
      "Komunitas produser musik masa kini aktif memburu hardware audio retro untuk merekam tekstur suara otentik."
    ],
    "fullContent": [
      "Batasan memori dan keterbatasan perangkat keras di era 16-bit sering kali melahirkan inovasi kreatif terbesar. Hal ini terbukti nyata dalam evolusi musik video game tahun 90-an yang kini menjadi pondasi estetika genre musik modern seperti synthwave, retrowave, dan chiptune.",
      "Chip suara Yamaha YM2612 yang disematkan di dalam konsol Sega Genesis menghasilkan karakter frekuensi modulasi (FM synthesis) yang kasar, renyah, dan menggelegar. Komponis jenius Yuzo Koshiro memanfaatkan karakteristik ini dalam soundtrack Streets of Rage 2, menciptakan tembang club techno yang melampaui zamannya.",
      "Di kubu seberang, Nintendo menggandeng Sony untuk merancang chip SPC700 pada Super Nintendo, menghadirkan kemampuan pemutaran sampel audio 8-channel berpadu dengan efek echo dan reverb hangat yang mendefinisikan musik orkestra fantasi Final Fantasy VI dan Donkey Kong Country.",
      "Kini, generasi baru musisi elektronik dunia secara sadar kembali menggunakan emulasi dan sirkuit perangkat keras konsol era 90-an demi mendapatkan karakter tekstur nada analog yang tidak dapat ditiru oleh plugin software modern."
    ]
  },
  {
    "id": "gr-1",
    "outletId": "gamerant",
    "outletName": "Game Rant",
    "outletIcon": "📢",
    "outletThemeColor": "#F39C12",
    "outletDomain": "gamerant.com",
    "title": "Cyberpunk 2077 Sequel Project Orion: Unreal Engine 5 Shift and Multiplayer Rumors",
    "summary": "CD Projekt Red studio Boston mulai merekrut desainer gameplay senior untuk membangun kembali Night City dengan teknologi Nanite dan Lumen.",
    "url": "https://gamerant.com/cyberpunk-2077-sequel-project-orion-unreal-engine-5-details/",
    "imageUrl": "/images/news/cyberpunk-2077.jpg",
    "category": "Multiplatform",
    "tag": "Cyberpunk",
    "publishedAt": "50 menit yang lalu",
    "readTime": "3 min read",
    "author": "Dalton Cooper",
    "keyHighlights": [
      "CD Projekt Red mendirikan studio baru di Boston untuk memimpin pengembangan sekuel Project Orion.",
      "Migrasi penuh ke Unreal Engine 5 memanfaatkan teknologi pencahayaan Lumen dan geometri Nanite.",
      "Lowongan pekerjaan mengindikasikan kehadiran fitur multiplayer yang terintegrasi mulus di Night City.",
      "Tim pengembang inti ekspansi Phantom Liberty memastikan fokus cerita sinematik tetap terjaga."
    ],
    "fullContent": [
      "CD Projekt Red tengah bergerak maju dengan sekuel ambisius Cyberpunk 2077 yang diberi kode nama Project Orion. Untuk memimpin proyek ini, studio Polandia tersebut telah membuka cabang baru di Boston, Amerika Serikat, yang dipimpin oleh para veteran industri.",
      "Langkah paling krusial dalam suksesi ini adalah keputusan untuk meninggalkan engine internal REDengine dan beralih sepenuhnya ke Unreal Engine 5 karya Epic Games. Migrasi ini diharapkan dapat memangkas waktu produksi dan menghindari kendala optimasi yang sempat terjadi pada masa awal peluncuran Night City.",
      "Melalui teknologi Unreal Engine 5 seperti sistem geometri mikro-poligon Nanite dan pencahayaan global Lumen, Night City generasi baru dijanjikan akan tampil jauh lebih padat, fotorealistik, dan dinamis.",
      "Meskipun rumor mengenai mode multipemain terus berkembang berdasarkan rincian lowongan kerja rekayasa jaringan studio, tim pengembang menegaskan bahwa pengalaman naratif single-player tetap menjadi jantung utama petualangan cyberpunk ini."
    ]
  },
  {
    "id": "gr-2",
    "outletId": "gamerant",
    "outletName": "Game Rant",
    "outletIcon": "📢",
    "outletThemeColor": "#F39C12",
    "outletDomain": "gamerant.com",
    "title": "Hidden Easter Eggs in Castlevania Symphony of the Night Players Still Miss After 28 Years",
    "summary": "Trik rahasia ruangan inverted castle, input mantra rahasia Alucard, dan dialog tersembunyi yang baru dianalisis melalui dekompilasi ROM.",
    "url": "https://gamerant.com/castlevania-symphony-of-the-night-hidden-secrets-easter-eggs/",
    "imageUrl": "/images/news/castlevania-dominus.jpg",
    "category": "Culture & Reviews",
    "tag": "Easter Eggs",
    "publishedAt": "4 jam yang lalu",
    "readTime": "4 min read",
    "author": "Joshua Duckworth",
    "keyHighlights": [
      "Kode nama penyimpanan rahasia X-X!V''Q memberikan Alucard stat LUCK 99 di awal permainan.",
      "Trik glitch dinding di Inverted Castle memungkinkan penyelesaian eksplorasi peta melebihi batas 200.6%.",
      "Mantra rahasia seperti Soul Steal dapat diluncurkan lewat input kombo arah ala Street Fighter tanpa membeli gulungan.",
      "Detail interaksi unik pada bilik pengakuan dosa (confessional booth) dan lukisan kastil Dracula."
    ],
    "fullContent": [
      "Castlevania: Symphony of the Night (1997) karya produser Koji Igarashi secara luas diakui sebagai salah satu game paling berpengaruh dalam sejarah. Namun, hampir tiga dekade setelah peluncurannya, para pemain dan komunitas hacker ROM masih terus menemukan rahasia tersembunyi di dalam kastil Dracula.",
      "Salah satu rahasia paling terkenal adalah input nama profil penyimpanan khusus: memasukkan nama X-X!V''Q akan mengorbankan sebagian besar poin nyawa dan pertahanan Alucard, namun menghadiahkannya dengan nilai LUCK 99, mengubahnya menjadi tantangan bertahan hidup yang seru.",
      "Selain itu, seluruh mantra sihir Alucard—termasuk Soul Steal dan Hellfire—sebenarnya dapat diaktifkan kapan saja menggunakan kombinasi tombol arah d-pad tanpa perlu membeli gulungan sihir mahal dari Master Librarian di perpustakaan kastil.",
      "Analisis dekompilasi kode biner terbaru juga mengungkap rekaman suara percakapan alternatif dan sprite animasi yang belum pernah terpicu secara normal, membuktikan betapa kaya dan padatnya detail yang ditanamkan Konami ke dalam mahakarya PlayStation 1 ini."
    ]
  },
  {
    "id": "gr-3",
    "outletId": "gamerant",
    "outletName": "Game Rant",
    "outletIcon": "📢",
    "outletThemeColor": "#F39C12",
    "outletDomain": "gamerant.com",
    "title": "Xbox Game Pass Lineup: 8 Heavyweight Titles Confirmed for Next Month Rotation",
    "summary": "Microsoft memperkuat katalog langganan dengan penambahan game RPG aksi hari pertama dan judul petualangan indie berpenghargaan tinggi.",
    "url": "https://gamerant.com/xbox-game-pass-new-games-lineup-day-one-additions/",
    "imageUrl": "/images/characters/masterchief_retro.jpg",
    "category": "Multiplatform",
    "tag": "Game Pass",
    "publishedAt": "8 jam yang lalu",
    "readTime": "3 min read",
    "author": "Tyler Shipley",
    "keyHighlights": [
      "Microsoft menambahkan 8 judul terkemuka ke katalog Xbox Game Pass Ultimate.",
      "Perilisan hari pertama (Day-One) mencakup RPG aksi dan judul petualangan indie berpenghargaan.",
      "Ekspansi integrasi katalog EA Play dan keuntungan diskon DLC untuk para pelanggan.",
      "Dukungan penuh cloud gaming memungkinkan streaming langsung di Smart TV dan ponsel tanpa konsol."
    ],
    "fullContent": [
      "Microsoft kembali mempertegas nilai proposisi layanan berlangganannya dengan mengumumkan jajaran game baru yang akan bergabung ke Xbox Game Pass untuk periode bulan mendatang.",
      "Koleksi terbaru ini dipimpin oleh sejumlah rilis perdana hari pertama (Day-One release), memastikan para pelanggan konsol Xbox Series X|S, PC Game Pass, dan Xbox Cloud Gaming dapat langsung menikmati judul-judul premium tanpa biaya pembelian terpisah.",
      "Selain game beranggaran besar, Microsoft terus konsisten memberikan panggung bagi permata indie inovatif yang berhasil memenangkan berbagai penghargaan festival game internasional.",
      "Dengan integrasi cloud server generasi terbaru yang kian stabil dan minim latensi, para gamer kini dapat melanjutkan petualangan mereka di berbagai perangkat mulai dari laptop kerja, tablet genggam, hingga layar televisi pintar ruang tamu secara instan."
    ]
  },
  {
    "id": "kotaku-1",
    "outletId": "kotaku",
    "outletName": "Kotaku",
    "outletIcon": "💭",
    "outletThemeColor": "#FFDF00",
    "outletDomain": "kotaku.com",
    "title": "Speedrunner Demolishes Super Mario 64 120-Star Record With Frame-Perfect BLJs",
    "summary": "Komunitas speedrunning dunia diguncang oleh rekor dunia baru yang memanfaatkan backward long jump glitch dan optimalisasi pergerakan kamera analog.",
    "url": "https://kotaku.com/super-mario-64-120-star-speedrun-world-record-broken-1851234567",
    "imageUrl": "/images/news/mario-64.jpg",
    "category": "Culture & Reviews",
    "tag": "Speedrunning",
    "publishedAt": "35 menit yang lalu",
    "readTime": "3 min read",
    "isHot": true,
    "author": "Luke Plunkett",
    "keyHighlights": [
      "Rekor dunia baru 120 bintang Super Mario 64 berhasil dipecahkan di bawah catatan waktu legendaris.",
      "Pemanfaatan teknik Backward Long Jump (BLJ) frame-perfect menembus tangga tanpa akhir kastil Peach.",
      "Optimalisasi pergerakan di level air Dire, Dire Docks menghemat pecahan detik vital.",
      "Rekor dicapai secara sah di atas konsol Nintendo 64 orisinal dengan stick controller OEM."
    ],
    "fullContent": [
      "Hampir tiga dekade sejak dirilis pada 1996, Super Mario 64 tetap menjadi panggung kompetisi paling prestisius di kancah speedrunning global. Akhir pekan ini, komunitas game menyaksikan momen bersejarah ketika rekor dunia kategori paling bergengsi, 120 Bintang, kembali ditumbangkan.",
      "Pencapaian luar biasa ini diraih melalui eksekusi tanpa cela dari puluhan teknik tingkat tinggi, termasuk manuver Backward Long Jump (BLJ) yang memanfaatkan celah fisika matematis game untuk mengakumulasi kecepatan negatif tak terhingga dalam hitungan milidetik.",
      "Di rute-rute paling berisiko seperti stage Rainbow Ride dan level air Dire, Dire Docks, sang pelari berhasil mempertahankan konsistensi kendali analog sempurna tanpa melakukan satu pun kesalahan fatal sepanjang 100 menit siaran langsung maraton.",
      "Yang membuat rekor ini semakin dihormati adalah verifikasi ketat bahwa run tersebut dijalankan di atas unit konsol fisik Nintendo 64 asli tanpa bantuan emulator atau modifikasi perangkat keras, menjadi bukti mutlak ketangguhan dedikasi manusia."
    ]
  },
  {
    "id": "kotaku-2",
    "outletId": "kotaku",
    "outletName": "Kotaku",
    "outletIcon": "💭",
    "outletThemeColor": "#FFDF00",
    "outletDomain": "kotaku.com",
    "title": "The Wild Story of How a Broken Street Fighter II Bootleg Created Fighting Game Combos",
    "summary": "Insiden Rainbow Edition di arcade bawah tanah Asia dan bagaimana Capcom merespons glitch tersebut dengan menciptakan Super Street Fighter II Turbo.",
    "url": "https://kotaku.com/street-fighter-ii-rainbow-edition-bootleg-combos-history-1850987654",
    "imageUrl": "/images/news/street-fighter.jpg",
    "category": "Culture & Reviews",
    "tag": "Arcade Lore",
    "publishedAt": "3 jam yang lalu",
    "readTime": "5 min read",
    "author": "Ian Walker",
    "keyHighlights": [
      "Modifikasi ROM bajakan Rainbow Edition di arcade Taiwan 1992 memungkinkan jurus Hadoken di udara.",
      "Antusiasme luar biasa pemain arcade memaksa Capcom untuk memperhatikan tren tempo cepat.",
      "Produser Yoshiki Okamoto merespons dengan menciptakan Street Fighter II': Hyper Fighting resmi.",
      "Bug pembatalan animasi (animation cancel) diresmikan menjadi fondasi mekanik kombo seluruh fighting game."
    ],
    "fullContent": [
      "Banyak inovasi terbaik dalam sejarah video game berawal dari kesalahan program atau aksi pembajakan. Salah satu kisah paling legendaris terjadi di kancah arcade awal tahun 90-an ketika modifikasi bajakan bernama Street Fighter II: Rainbow Edition mendadak membanjiri arena game center dunia.",
      "Diprogram oleh peretas tanpa izin di Taiwan, Rainbow Edition mengubah hukum permainan: pemain dapat meluncurkan proyektil Hadoken bertubi-tubi di udara, teleportasi instan, dan mengganti karakter di tengah pertarungan. Meskipun kacau dan tidak seimbang, antrean pemain arcade justru membludak berlipat ganda.",
      "Menghadapi fenomena tersebut, produser Capcom Yoshiki Okamoto tidak sekadar menuntut para pembajak, melainkan menganalisis apa yang membuat para pemain begitu terobsesi. Hasilnya adalah lahirnya Street Fighter II': Hyper Fighting resmi yang mempercepat tempo permainan secara drastis.",
      "Lebih dari itu, sistem input cancel yang awalnya dianggap sebagai kecacatan program dipatenkan oleh Capcom menjadi mekanik rangkaian kombo berurutan—sebuah fondasi baku yang hingga kini menggerakkan setiap game tarung kompetitif di dunia."
    ]
  },
  {
    "id": "kotaku-3",
    "outletId": "kotaku",
    "outletName": "Kotaku",
    "outletIcon": "💭",
    "outletThemeColor": "#FFDF00",
    "outletDomain": "kotaku.com",
    "title": "Why Physical Game Preservation on Optical Discs Faces a Massive 30-Year Rot Crisis",
    "summary": "Museum video game internasional memperingatkan bahaya degradasi disc rot pada koleksi CD-ROM PlayStation 1 dan Sega Saturn yang tak tergantikan.",
    "url": "https://kotaku.com/video-game-preservation-disc-rot-cd-rom-playstation-saturn-1850765432",
    "imageUrl": "/images/boxarts/t-04.jpg",
    "category": "Culture & Reviews",
    "tag": "Preservation",
    "publishedAt": "6 jam yang lalu",
    "readTime": "6 min read",
    "author": "Ethan Gach",
    "keyHighlights": [
      "Fenomena disc rot (oksidasi lapisan aluminium reflektif) mengancam keping CD era PS1 dan Saturn.",
      "Media cakram optik rentan terhadap degradasi lem polimer akibat kelembapan dan fluktuasi suhu.",
      "Ribuan judul game langka terancam hilang permanen jika tidak segera didigitalkan ke repositori arsip.",
      "Seruan mendesak bagi otoritas hak cipta untuk mempermudah izin pelestarian bagi institusi akademis."
    ],
    "fullContent": [
      "Ketika industri video game beralih dari cartridge ke cakram CD-ROM pada pertengahan 1990-an, media optik dipromosikan sebagai medium penyimpanan masa depan yang abadi. Namun tiga puluh tahun kemudian, para kurator museum sejarah menemukan kenyataan pahit: keping CD sedang sekarat.",
      "Fenomena disc rot terjadi ketika lapisan pernis pelindung keping cakram mengalami degradasi mikroskopis, memungkinkan oksigen masuk dan mengoksidasi lapisan aluminium reflektif di dalamnya. Akibatnya, data biner tidak dapat lagi dibaca oleh laser optik, meninggalkan kepingan plastik mati yang tak berharga.",
      "Ribuan judul game unik untuk konsol seperti PlayStation 1, Sega Saturn, PC-Engine CD, dan 3DO yang tidak pernah dirilis ulang di platform digital modern kini berada di ambang kepunahan fisik permanen.",
      "Yayasan pelestarian sejarah seperti Video Game History Foundation terus mendesak perubahan regulasi hukum hak cipta digital agar perpustakaan dan peneliti diizinkan secara hukum untuk mendigitalkan dan mengarsipkan salinan data sebelum cakram-cakram fisik tersebut hancur menjadi debu."
    ]
  },
  {
    "id": "grd-1",
    "outletId": "gamesradar",
    "outletName": "GamesRadar+",
    "outletIcon": "📡",
    "outletThemeColor": "#2D3436",
    "outletDomain": "gamesradar.com",
    "title": "The Witcher 4 Polaris: CD Projekt Teases New School of Witcher and Dynamic Combat",
    "summary": "Game pertama dalam saga baru The Witcher menjanjikan evolusi drastis pada interaksi sihir tanda Witcher dan monster hunting di area bersalju liar.",
    "url": "https://www.gamesradar.com/the-witcher-4-polaris-release-date-news-gameplay/",
    "imageUrl": "/images/news/witcher-3.jpg",
    "category": "Multiplatform",
    "tag": "The Witcher",
    "publishedAt": "1 jam yang lalu",
    "readTime": "4 min read",
    "isHot": true,
    "author": "Dustin Bailey",
    "keyHighlights": [
      "Proyek Polaris menandai awal trilogi baru yang dibangun dengan Unreal Engine 5 di area bersalju fotorealistik.",
      "Medali School of the Lynx mengindikasikan mazhab witcher baru dengan kelincahan fisik dan alkimia unik.",
      "Lebih dari 400 staf pengembang inti kini bekerja penuh waktu untuk produksi game.",
      "Sistem pertarungan pedang dan ekologi monster hunting dirancang ulang agar terasa lebih taktis dan dinamis."
    ],
    "fullContent": [
      "CD Projekt Red secara resmi memasuki tahap produksi penuh untuk babak baru waralaba fantasi terbesarnya melalui proyek berkode nama Polaris, yang akan menjadi pembuka trilogi The Witcher generasi berikutnya.",
      "Petunjuk visual utama berupa medali berbentuk hewan kucing lynx telah memicu gelombang teori di kalangan penggemar. Mazhab School of the Lynx diprediksi akan memperkenalkan pendekatan baru dalam pertempuran berburu monster, mengombinasikan kelincahan akrobatik dengan ramuan alkimia modifikasi genetik.",
      "Didukung oleh kemampuan rendering Unreal Engine 5, dunia liar bersalju di benua utara akan disimulasikan dengan detail topografi yang sangat nyata, di mana jejak kaki di salju tebal dan arah hembusan angin badai akan memengaruhi cara monster mengendus kehadiran pemain.",
      "Sutradara game Sebastian Kalemba menegaskan bahwa timnya bertekad melampaui batasan role-playing yang pernah mereka capai di The Witcher 3: Wild Hunt, memberikan kebebasan eksplorasi yang lebih mendalam dan penuh konsekuensi moral."
    ]
  },
  {
    "id": "grd-2",
    "outletId": "gamesradar",
    "outletName": "GamesRadar+",
    "outletIcon": "📡",
    "outletThemeColor": "#2D3436",
    "outletDomain": "gamesradar.com",
    "title": "Best Retro Gaming Handhelds 2026: From Linux Pocket Emulators to OLED Powerhouses",
    "summary": "Panduan belanja komprehensif menguji layar, tombol d-pad, dan kompatibilitas game dari Game Boy era hingga PlayStation 2 portabel.",
    "url": "https://www.gamesradar.com/best-retro-handhelds-gaming-consoles/",
    "imageUrl": "/images/news/steam-deck-os.jpg",
    "category": "PC & Tech",
    "tag": "Handheld Hardware",
    "publishedAt": "4 jam yang lalu",
    "readTime": "6 min read",
    "author": "Rob Dwiar",
    "keyHighlights": [
      "Handheld Linux berharga terjangkau kini mampu menjalankan emulasi 16-bit hingga Dreamcast dengan layar rasio 4:3 sempurna.",
      "Generasi baru perangkat Android dan x86 berlayar OLED 120Hz mulus melibas game PS2 dan GameCube.",
      "Stick analog Hall Effect magnetik dan baterai 5000mAh menjadi standar baru yang bebas drift.",
      "Sistem operasi open-source seperti Batocera dan JelOS menghadirkan antarmuka arcade elegan."
    ],
    "fullContent": [
      "Pasar konsol genggam retro sedang berada di puncak popularitasnya. Berkat pesatnya kemajuan arsitektur prosesor hemat daya dan layar miniatur berkualitas tinggi, para pencinta game klasik kini dimanjakan oleh pilihan perangkat yang melimpah.",
      "Di kategori ramah kantong, perangkat berbasis Linux dengan layar IPS rasio 4:3 berhasil mencuri hati banyak pemain. Perangkat seharga puluhan dolar ini mampu mengeksekusi perpustakaan Game Boy Advance, SNES, Sega Genesis, hingga PS1 dengan akurasi piksel native yang memikat.",
      "Sementara itu di segmen premium, perangkat portabel Android dan x86 dengan layar OLED berkilau kini sanggup menjalankan emulasi PlayStation 2 dan GameCube pada resolusi 3x hingga 4x native tanpa mengalami stuttering audio.",
      "Inovasi stick magnetik anti-drift dan distribusi sistem operasi kustom yang instan menjadikan tahun ini sebagai waktu paling ideal bagi siapa pun untuk mengantongi ribuan judul mahakarya arcade di saku celana mereka."
    ]
  },
  {
    "id": "grd-3",
    "outletId": "gamesradar",
    "outletName": "GamesRadar+",
    "outletIcon": "📡",
    "outletThemeColor": "#2D3436",
    "outletDomain": "gamesradar.com",
    "title": "Death Stranding 2 On The Beach: Hideo Kojima Breaks Down Puppeteer Mechanic",
    "summary": "Kojima Productions membedah trailer terbaru, koneksi benua baru, serta kendaraan amfibi serbaguna yang akan memfasilitasi logistik pengiriman.",
    "url": "https://www.gamesradar.com/death-stranding-2-on-the-beach-hideo-kojima-interview-gameplay-details/",
    "imageUrl": "/images/news/death-stranding.jpg",
    "category": "Multiplatform",
    "tag": "PlayStation",
    "publishedAt": "7 jam yang lalu",
    "readTime": "4 min read",
    "author": "Jasmine Gould-Wilson",
    "keyHighlights": [
      "Hideo Kojima menguraikan karakter boneka hidup (Puppet) yang menemani perjalanan Sam Porter Bridges.",
      "Kapal markas Magellan memperkenalkan sistem logistik transportasi amfibi melintasi sungai lahar dan gempa bumi.",
      "Peningkatan mekanik pertempuran stealth menghadapi faksi musuh bersenjata pimpinan Higgs.",
      "Evolusi tema cerita dari sekadar menghubungkan dunia menjadi pertanyaan kritis atas konsekuensi konektivitas."
    ],
    "fullContent": [
      "Sutradara auteur Hideo Kojima kembali menghadirkan visi uniknya melalui Death Stranding 2: On The Beach yang akan mendarat eksklusif di konsol PlayStation 5.",
      "Dalam penjelasan terbarunya, Kojima membedah kehadiran karakter boneka gantung animasi stop-motion yang bergantung di pinggang sang kurir legendaris Sam Porter Bridges. Boneka ini tidak hanya berfungsi sebagai elemen naratif jenaka, tetapi juga memberikan peringatan taktis saat anomali tar berbahaya mendekat.",
      "Skala lingkungan juga diperluas drastis di luar perbatasan Amerika. Pemain akan mengarungi daratan benua baru yang rentan terhadap bencana geologis dinamis seperti banjir lahar mendadak, gempa tektonik, dan kebakaran hutan yang secara instan merusak rute pengiriman paket yang telah direncanakan.",
      "Didukung oleh peningkatan visual fotorealistik dari Decima Engine, Death Stranding 2 siap menantang cara pandang pemain mengenai isolasi, kebersamaan, dan masa depan kemanusiaan di era pasca-apokaliptik."
    ]
  },
  {
    "id": "verge-1",
    "outletId": "the-verge",
    "outletName": "The Verge",
    "outletIcon": "⚡",
    "outletThemeColor": "#E01A4F",
    "outletDomain": "theverge.com",
    "title": "SteamOS Official Release for Third-Party Handhelds: Valve Challenges Windows PC Monopoly",
    "summary": "Valve secara resmi memperluas dukungan sistem operasi berbasis Linux Arch miliknya ke perangkat kompetitor seperti Asus ROG Ally dan Lenovo Legion Go.",
    "url": "https://www.theverge.com/2024/11/12/24294528/valve-steamos-third-party-handheld-gaming-pc",
    "imageUrl": "/images/news/steam-deck-os.jpg",
    "category": "PC & Tech",
    "tag": "SteamOS",
    "publishedAt": "20 menit yang lalu",
    "readTime": "4 min read",
    "isHot": true,
    "author": "Sean Hollister",
    "keyHighlights": [
      "Valve mulai mendistribusikan citra installer SteamOS berbasis Arch Linux untuk perangkat genggam pihak ketiga.",
      "Fitur instan sleep/wake dan optimalisasi efisiensi daya TDP mengungguli performa baterai Windows 11 portabel.",
      "Lapisan Proton memungkinkan ribuan judul game Windows berjalan mulus tanpa kompromi performa.",
      "Langkah strategis Valve memperkuat ekosistem Linux terbuka dan menekan dominasi lisensi OS Microsoft."
    ],
    "fullContent": [
      "Valve mengambil langkah berani yang telah lama dinanti oleh komunitas PC gaming portabel: membuka ketersediaan sistem operasi SteamOS secara resmi untuk perangkat keras pihak ketiga seperti Asus ROG Ally, Lenovo Legion Go, dan Ayaneo.",
      "Selama bertahun-tahun, kelemahan terbesar konsol genggam berbasis Windows adalah antarmuka desktop yang kikuk untuk navigasi layar sentuh serta konsumsi baterai yang boros saat mode siaga. SteamOS menyelesaikan kedua masalah tersebut melalui antarmuka konsol terintegrasi dan fitur suspend-and-resume instan yang sempurna.",
      "Kunci keajaiban SteamOS terletak pada Proton, lapisan kompatibilitas berbasis open-source yang mampu menerjemahkan panggilan API DirectX milik Windows ke Vulkan di Linux secara real-time tanpa penurunan frame rate yang berarti.",
      "Dengan hadirnya SteamOS di berbagai perangkat non-Valve, ekosistem PC gaming terbuka kini memiliki alternatif sistem operasi yang solid, mandiri, dan bebas dari ketergantungan lisensi komersial tradisional."
    ]
  },
  {
    "id": "verge-2",
    "outletId": "the-verge",
    "outletName": "The Verge",
    "outletIcon": "⚡",
    "outletThemeColor": "#E01A4F",
    "outletDomain": "theverge.com",
    "title": "OLED Display Breakthroughs in 4K 240Hz Gaming Monitors: Is It Worth The Upgrade?",
    "summary": "Pengujian ketat panel QD-OLED generasi ketiga dalam hal kecerahan puncak HDR, mitigasi burn-in proaktif, dan respon input instan 0.03ms.",
    "url": "https://www.theverge.com/24128910/oled-gaming-monitor-4k-240hz-asus-msi-lg-review",
    "imageUrl": "/images/news/pcg-1.jpg",
    "category": "PC & Tech",
    "tag": "Display Tech",
    "publishedAt": "3 jam yang lalu",
    "readTime": "5 min read",
    "author": "Cameron Faulkner",
    "keyHighlights": [
      "Panel QD-OLED dan WOLED generasi ketiga menghadirkan resolusi 4K native dengan refresh rate 240Hz dan respon 0.03ms.",
      "Susunan subpixel baru berhasil mengatasi masalah color fringing pada rendering teks dokumen.",
      "Garansi pabrikan 3 tahun terhadap risiko burn-in dengan sistem pendingin graphene canggih.",
      "Kecerahan puncak HDR 1000 nits dan rasio kontras tak terhingga menetapkan standar visual baru."
    ],
    "fullContent": [
      "Monitor gaming desktop telah mencapai tonggak pencapaian teknologi paling dramatis dengan hadirnya panel OLED generasi ketiga yang memadukan resolusi tajam 4K (3840x2160) dengan refresh rate super cepat 240Hz.",
      "Dalam pengujian laboratorium kami, waktu respons piksel instan 0.03ms abu-abu-ke-abu-abu (GtG) menghasilkan kejernihan pergerakan objek tanpa jejak ghosting sama sekali, memberikan keunggulan kompetitif yang nyata pada game esports bertempo cepat.",
      "Kekhawatiran lama seputar ketajaman teks dokumen kantor juga telah berhasil diatasi. Pabrikan panel seperti Samsung Display dan LG Display merevisi susunan struktur subpixel mereka sehingga huruf-huruf tipis kini tampak bersih tanpa distorsi garis warna.",
      "Dilengkapi dengan heatsink berbasis graphene dan siklus pembersihan piksel otomatis yang dilindungi garansi burn-in resmi selama tiga tahun, monitor 4K 240Hz OLED ini resmi dinobatkan sebagai mahakarya visual terbaik untuk PC gaming kelas atas."
    ]
  },
  {
    "id": "verge-3",
    "outletId": "the-verge",
    "outletName": "The Verge",
    "outletIcon": "⚡",
    "outletThemeColor": "#E01A4F",
    "outletDomain": "theverge.com",
    "title": "Cloud Gaming Latency Battles: Xbox Cloud vs GeForce NOW Ultimate at 120 FPS",
    "summary": "Pengukuran jaringan serat optik lintas benua untuk membuktikan apakah streaming game jarak jauh sudah benar-benar setara dengan console lokal.",
    "url": "https://www.theverge.com/23891024/geforce-now-ultimate-vs-xbox-cloud-gaming-latency-comparison",
    "imageUrl": "/images/characters/masterchief_retro.jpg",
    "category": "PC & Tech",
    "tag": "Cloud Gaming",
    "publishedAt": "8 jam yang lalu",
    "readTime": "5 min read",
    "author": "Tom Warren",
    "keyHighlights": [
      "Pengujian latensi kamera berkecepatan 240 FPS mengukur selisih respons input stik terhadap tampilan layar.",
      "GeForce NOW tier Ultimate bertenaga rig RTX 4080 di cloud mencatatkan latensi di bawah 35ms.",
      "Xbox Cloud Gaming unggul dalam integrasi katalog game pass instan di browser dan ponsel.",
      "Penyebaran codec AV1 dan konektivitas WiFi 7 berhasil memangkas artefak kompresi gambar."
    ],
    "fullContent": [
      "Impian bermain game kelas AAA di mana saja tanpa perlu membeli perangkat keras komputer ribuan dolar kini semakin mendekati kenyataan sempurna berkat persaingan sengit antara Nvidia GeForce NOW dan Xbox Cloud Gaming.",
      "Menggunakan kamera berkecepatan 240 frame per detik untuk mengukur latensi dari tombol controller hingga piksel di layar berubah (button-to-pixel latency), hasil pengujian kami menunjukkan bahwa tier GeForce NOW Ultimate mampu menembus angka latensi di bawah 35 milidetik—hampir identik dengan konsol fisik rumahan.",
      "Keunggulan tersebut didukung oleh pusat data Nvidia yang ditenagai kartu grafis monster RTX 4080 dengan output streaming 4K 120Hz dan dukungan penuh teknologi Variable Refresh Rate (G-Sync).",
      "Di sisi lain, Xbox Cloud Gaming menawarkan keunggulan tak tertandingi dalam hal kemudahan akses katalog instan ratusan game Game Pass tanpa perlu membeli salinan terpisah, membuktikan bahwa masa depan gaming tanpa instalasi fisik kian dekat di depan mata."
    ]
  },
  {
    "id": "bloom-1",
    "outletId": "bloomberg",
    "outletName": "Bloomberg",
    "outletIcon": "📊",
    "outletThemeColor": "#0017FF",
    "outletDomain": "bloomberg.com",
    "title": "Inside the $180B Video Game Industry: Studio Layoffs, AI Tools, and Project Rescaling",
    "summary": "Investigasi mendalam oleh jurnalis Jason Schreier mengenai bagaimana anggaran game AAA membengkak dan transisi studio ke skala produksi yang lebih ramping.",
    "url": "https://www.bloomberg.com/news/articles/2024-05-15/video-game-industry-reckoning-layoffs-rising-budgets",
    "imageUrl": "/images/news/cyberpunk-2077.jpg",
    "category": "Industry & Business",
    "tag": "Industry Intel",
    "publishedAt": "1 jam yang lalu",
    "readTime": "7 min read",
    "isHot": true,
    "author": "Jason Schreier",
    "keyHighlights": [
      "Anggaran produksi game blockbuster AAA kini rutin melampaui $200 juta dengan siklus 6-7 tahun.",
      "Koreksi pasar pasca-pandemi memaksa publisher global merestrukturisasi studio dan memangkas proyek live-service.",
      "Eksplorasi alat kecerdasan buatan (AI) diuji untuk mempercepat pembuatan aset latar dan pengujian QA.",
      "Kebangkitan game berbiaya menengah (AA) dan indie membuktikan keunggulan model produksi yang ramping."
    ],
    "fullContent": [
      "Industri video game bernilai 180 miliar dolar sedang berada di tengah periode koreksi finansial paling dramatis dalam sejarah modernnya. Investigasi mendalam Bloomberg menelusuri akar penyebab di balik gelombang restrukturisasi yang melanda studio-studio game terbesar dunia.",
      "Faktor pemicu utama adalah eskalasi anggaran produksi yang tak terkendali. Pembuatan satu judul game blockbuster AAA kini rata-rata menelan biaya antara $200 juta hingga $300 juta dengan rentang waktu pengembangan mencapai enam hingga tujuh tahun—sebuah risiko investasi yang sangat berbahaya jika game tersebut gagal di pasar.",
      "Sebagai respons, para petinggi perusahaan mulai meninjau ulang portofolio mereka, membatalkan proyek-proyek game live-service berisiko tinggi, dan menjajaki integrasi teknologi kecerdasan buatan (AI) untuk membantu otomatisasi pengujian bug serta pembuatan aset lingkungan sekunder.",
      "Di tengah turbulensi ini, model pengembangan game skala menengah AA dan kesuksesan game indie seperti Helldivers 2 dan Balatro menjadi mercusuar baru, membuktikan bahwa kreativitas tajam dan anggaran terukur sering kali menghasilkan laba yang jauh lebih sehat daripada proyek megah tanpa batas."
    ]
  },
  {
    "id": "bloom-2",
    "outletId": "bloomberg",
    "outletName": "Bloomberg",
    "outletIcon": "📊",
    "outletThemeColor": "#0017FF",
    "outletDomain": "bloomberg.com",
    "title": "Tencent and Sony Accelerate Stakes in Japanese Game Studios Ahead of Next Hardware Cycle",
    "summary": "Laporan keuangan mengungkapkan aliran investasi strategis korporasi global ke publisher Jepang ternama guna mengamankan hak distribusi eksklusif.",
    "url": "https://www.bloomberg.com/news/articles/2024-03-22/sony-tencent-step-up-investment-in-japan-studios-for-exclusive-gaming-rights",
    "imageUrl": "/images/news/god-of-war.jpg",
    "category": "Industry & Business",
    "tag": "Finances",
    "publishedAt": "4 jam yang lalu",
    "readTime": "5 min read",
    "author": "Takashi Mochizuki",
    "keyHighlights": [
      "Tencent Holdings dan Sony Group memperluas kepemilikan saham minoritas di studio-studio Jepang.",
      "Perebutan hak kekayaan intelektual (IP) anime dan game bernilai tinggi menjelang siklus perangkat keras baru.",
      "Studio ikonik seperti Kadokawa dan FromSoftware menjadi target utama investasi strategis.",
      "Dampak pelemahan nilai tukar Yen memberikan momentum ekspansi berharga bagi studio lokal ke pasar global."
    ],
    "fullContent": [
      "Menjelang pergantian siklus konsol generasi berikutnya, persaingan antara konglomerat teknologi Tencent Holdings dan Sony Group beralih ke jantung industri game di Tokyo dan Osaka. Kedua raksasa tersebut aktif mengakumulasi kepemilikan saham strategis pada studio-studio legendaris Jepang.",
      "Daya tarik utama studio Jepang terletak pada penguasaan kekayaan intelektual (IP) berbasis anime dan game yang memiliki basis penggemar global yang sangat militan. Dari mahakarya Dark Souls hingga franchise RPG legendaris, IP ini dipandang sebagai aset paling tahan uji terhadap fluktuasi tren pasar.",
      "Bagi para publisher Jepang seperti Kadokawa dan Koei Tecmo, kemitraan modal ini memberikan suntikan likuiditas berharga di tengah pelemahan mata uang Yen, memfasilitasi ekspansi infrastruktur mereka ke pasar barat dan seluler.",
      "Analis industri memproyeksikan bahwa gelombang konsolidasi modal ini akan mengamankan hak distribusi eksklusif konten lintas media (transmedia) dalam dekade mendatang, menghubungkan dunia game, film anime, dan serial televisi secara terintegrasi."
    ]
  },
  {
    "id": "bloom-3",
    "outletId": "bloomberg",
    "outletName": "Bloomberg",
    "outletIcon": "📊",
    "outletThemeColor": "#0017FF",
    "outletDomain": "bloomberg.com",
    "title": "Grand Theft Auto VI Budget Expected to Surpass $1 Billion: Financial Return Forecasts",
    "summary": "Para analis Wall Street memproyeksikan pendapatan hari pertama GTA VI dapat melampaui seluruh rekor industri hiburan dalam sejarah modern.",
    "url": "https://www.bloomberg.com/news/articles/2023-12-05/gta-6-trailer-budget-sales-forecast-take-two-interactive",
    "imageUrl": "/images/news/gs-1.jpg",
    "category": "Industry & Business",
    "tag": "Market Analysis",
    "publishedAt": "9 jam yang lalu",
    "readTime": "6 min read",
    "author": "Cecilia D'Anastasio",
    "keyHighlights": [
      "Total biaya pengembangan dan kampanye pemasaran GTA VI diproyeksikan menembus $1 miliar.",
      "Proyeksi pendapatan hari pertama diprediksi melampaui rekor peluncuran produk hiburan mana pun di dunia.",
      "Monetisasi ekosistem GTA Online generasi baru dirancang sebagai mesin pendapatan bernilai miliaran dolar.",
      "Valuasi saham Take-Two Interactive merefleksikan optimisme tinggi para investor institusional."
    ],
    "fullContent": [
      "Laporan analisis keuangan gabungan dari institusi Wall Street memproyeksikan bahwa peluncuran Grand Theft Auto VI oleh Take-Two Interactive akan menjadi peristiwa ekonomi terbesar dalam sejarah industri hiburan modern.",
      "Dengan total biaya produksi dan kampanye pemasaran global yang diperkirakan melampaui 1 miliar dolar, skala investasi ini belum pernah ada tandingannya, bahkan jika dibandingkan dengan film blockbuster termahal Hollywood.",
      "Para analis memperkirakan game ini akan mampu meraup lebih dari 1 miliar dolar dalam 24 jam pertama pembukaan penjualan, melampaui rekor yang sebelumnya dipegang oleh pendahulunya, GTA V, pada tahun 2013 silam.",
      "Selain angka penjualan fisik dan digital di awal rilis, mesin penggerak nilai sesungguhnya terletak pada ekosistem GTA Online baru yang diproyeksikan menghasilkan aliran pendapatan berulang miliaran dolar selama satu dekade ke depan, mengukuhkan posisi waralaba ini sebagai fenomena kultural abadi."
    ]
  }
];
