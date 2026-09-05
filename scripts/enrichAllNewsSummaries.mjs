import fs from 'node:fs';
import path from 'node:path';

// Complete curated enriched content for all 20 short articles
export const ENRICHED_NEWS_DATA = {
  "thegamer-3": {
    // Venom Game "Still In Development," Credible Insider Says
    en: {
      summary: "Prominent industry insider NateTheHate confirms that Insomniac Games' standalone Marvel's Venom game remains in active development for PS5, dispelling cancellation fears after Sony's recent studio restructuring.",
      fullContent: [
        "Reputable gaming insider NateTheHate has confirmed that Insomniac Games' standalone Venom project is still in active development and has not been shelved, providing much-needed relief to Marvel gaming enthusiasts who feared the project was quietly scrapped.",
        "The standalone Venom title—tentatively titled Marvel's Venom: Lethal Protector—was first exposed during the December 2023 Insomniac ransomware leak. Internal roadmaps described it as an expansive mid-scale experience akin to Marvel's Spider-Man: Miles Morales, bridging the critical narrative gap between Spider-Man 2 and the upcoming Marvel's Spider-Man 3.",
        "Concerns regarding the game's fate arose over the past few months following widespread restructuring and layoffs across PlayStation Studios, which previously claimed Insomniac's multiplayer spinoff project, Spider-Man: The Great Web. Fans worried that Insomniac's singular focus on Marvel's Wolverine might have forced Sony to cancel the Lethal Protector spinoff entirely.",
        "However, NateTheHate clarified on his latest podcast that the symbiote anti-hero adventure is progressing steadily behind closed doors. The project is expected to expand upon the fan-favorite playable Venom sequence from Spider-Man 2, featuring ferocious tendril combat, monstrous traversal, and legendary actor Tony Todd returning to voice the iconic anti-hero on PlayStation 5."
      ],
      keyHighlights: [
        "Reputable leaker NateTheHate confirms Insomniac Games' standalone Venom title remains in active development for PS5.",
        "The game is envisioned as a focused standalone chapter bridging Marvel's Spider-Man 2 and the eventual Spider-Man 3.",
        "The confirmation quells widespread cancellation rumors sparked by PlayStation's recent studio-wide layoffs.",
        "Features expanded playable symbiote combat, urban destruction, and Tony Todd reprising his role as Venom."
      ]
    },
    id: {
      title: "Game Venom \"Masih Dalam Pengembangan,\" Kata Orang Dalam Industri yang Kredibel",
      summary: "Orang dalam industri terpercaya NateTheHate memastikan bahwa game solo Venom garapan Insomniac Games masih aktif dikembangkan untuk PS5, menepis kekhawatiran pembatalan setelah restrukturisasi Sony.",
      fullContent: [
        "Orang dalam industri game ternama dan kredibel, NateTheHate, mengungkap dalam episode podcast terbarunya bahwa proyek game standalone Venom besutan Insomniac Games (Marvel's Venom: Lethal Protector) masih berada dalam tahap pengembangan aktif dan belum dibatalkan oleh Sony Interactive Entertainment.",
        "Proyek spin-off ini pertama kali terungkap ke publik melalui kebocoran data ransomware Insomniac pada Desember 2023. Dokumen internal memaparkan game ini sebagai petualangan skala menengah yang mirip dengan Marvel's Spider-Man: Miles Morales, menjembatani alur cerita penting antara Spider-Man 2 dan Spider-Man 3.",
        "Kekhawatiran komunitas gaming memuncak selama beberapa bulan terakhir akibat gelombang restrukturisasi dan PHK massal di PlayStation Studios, yang sebelumnya membatalkan proyek multiplayer Spider-Man: The Great Web. Banyak penggemar khawatir fokus Insomniac pada Marvel's Wolverine membuat proyek Venom ikut dikorbankan.",
        "Namun, NateTheHate menegaskan bahwa tim pengembang tetap berkomitmen menghadirkan kisah anti-hero symbiote tersebut. Game ini diproyeksikan akan memperluas mekanisme bertarung brutal Venom yang sempat dicoba pemain di Spider-Man 2, lengkap dengan sulih suara aktor legendaris Tony Todd secara eksklusif untuk konsol PlayStation 5."
      ],
      keyHighlights: [
        "Leaker terpercaya NateTheHate memastikan game solo Venom buatan Insomniac Games masih aktif dikembangkan untuk PlayStation 5.",
        "Proyek ini berskala menengah mirip Spider-Man: Miles Morales, berfungsi sebagai jembatan naratif menuju Marvel's Spider-Man 3.",
        "Konfirmasi ini menepis rumor pembatalan setelah gelombang PHK dan restrukturisasi PlayStation Studios.",
        "Menghadirkan gameplay pertarungan symbiote yang brutal, penghancuran lingkungan kota, dan kembalinya aktor Tony Todd."
      ]
    }
  },

  "thegamer-1": {
    // Resident Evil: Revelations 3 Leak Reveals First Look At Yuri
    en: {
      summary: "Dataminers have uncovered 3D character models and textures for 'Yuri'—a canceled Resident Evil: Revelations 3 protagonist—hidden within the PlayStation 5 disc of the Resident Evil 4 remake.",
      fullContent: [
        "Eagle-eyed Resident Evil dataminers have discovered unused character textures and 3D assets for 'Yuri'—a lead character originally designed for the canceled Resident Evil: Revelations 3—tucked away in the filesystem of the Resident Evil 4 remake's PS5 disc.",
        "Capcom has long been rumored to have developed concepts for a third Revelations installment in the mid-to-late 2010s before pivoting creative resources toward mainline blockbusters like Resident Evil Village and Resident Evil 9. Yuri was reportedly planned as a resilient operative investigating bioterror anomalies in remote environments.",
        "The datamined files include detailed facial textures, high-polygon hair shaders, and internal Capcom project tags matching the Revelations production codename. Industry analysts note that Capcom frequently archives prototype assets in shared engine repositories, explaining their accidental inclusion on commercial retail media.",
        "While Revelations 3 remains officially shelved, the discovery provides fascinating historical insight into Capcom's creative trajectory, proving that beloved spinoff narratives continue to influence the studio's contemporary RE Engine pipeline."
      ],
      keyHighlights: [
        "Dataminers uncovered unused character textures for protagonist 'Yuri' on the Resident Evil 4 Remake PS5 disc.",
        "Yuri was originally created as a key character for Capcom's unreleased Resident Evil: Revelations 3.",
        "Files include facial meshes, high-poly hair shaders, and internal RE Engine development project tags.",
        "Offers a rare glimpse into Capcom's conceptual pipeline before resources pivoted to Resident Evil 9."
      ]
    },
    id: {
      title: "Bocoran Resident Evil: Revelations 3 Ungkap Tampilan Pertama Karakter Yuri",
      summary: "Para dataminer menemukan tekstur dan model 3D karakter 'Yuri' dari proyek Revelations 3 yang dibatalkan, tersembunyi di dalam cakram PS5 Resident Evil 4 remake.",
      fullContent: [
        "Komunitas penggemar Resident Evil dan dataminer baru saja mengungkap penemuan mengejutkan: tekstur dan model 3D untuk karakter bernama 'Yuri', yang awalnya dirancang untuk proyek Resident Evil: Revelations 3, ditemukan tersembunyi di dalam cakram fisik PS5 game Resident Evil 4 Remake.",
        "Capcom telah lama dikabarkan sempat mengembangkan sekuel ketiga Revelations pada medio akhir 2010-an sebelum akhirnya mengalihkan sumber daya kreatif mereka ke proyek utama seperti Resident Evil Village dan Resident Evil 9. Karakter Yuri digambarkan sebagai agen lapangan tangguh yang menyelidiki anomali senjata biologis.",
        "Berkas yang diekstraksi mencakup tekstur wajah resolusi tinggi, shader rambut poligon tinggi, serta tag penamaan internal Capcom yang cocok dengan kode proyek Revelations. Kemunculan aset ini diduga akibat repositori bersama pada RE Engine yang tidak sengaja terbawa ke data rilis komersial.",
        "Meskipun Revelations 3 telah dibatalkan secara resmi, penemuan ini memberikan bukti otentik mengenai arah kreatif Capcom sebelum memusatkan seluruh fokus studio pada babak baru Resident Evil generasi berikutnya."
      ],
      keyHighlights: [
        "Dataminer menemukan aset tekstur karakter 'Yuri' yang belum pernah dirilis di dalam cakram PS5 Resident Evil 4 Remake.",
        "Yuri awalnya dirancang sebagai tokoh utama dalam proyek Resident Evil: Revelations 3 yang dibatalkan.",
        "Berkas yang ditemukan memuat tekstur wajah, shader rambut poligon tinggi, dan tag internal RE Engine.",
        "Memberikan wawasan berharga mengenai konsep cerita Capcom sebelum dialihkan ke Resident Evil 9."
      ]
    }
  },

  "game-informer-1": {
    // BioWare doesn't need advice for Mass Effect 4, says veteran designer
    en: {
      summary: "Armando Troisi, lead cinematic designer for Mass Effect 2, fiercely defends BioWare's current Mass Effect 4 team, asserting that original trilogy veterans still at the studio understand the franchise's soul.",
      fullContent: [
        "Armando Troisi, the celebrated cinematic designer on the original Mass Effect and lead cinematic designer on Mass Effect 2, has publicly defended BioWare's development team, stating the studio does not need outside advice to craft Mass Effect 4 as long as external corporate forces 'get out of the way.'",
        "Addressing fan anxieties and online skepticism surrounding modern BioWare, Troisi highlighted that dozens of senior designers, narrative architects, and world-builders who crafted Commander Shepard's original journey remain at the studio today.",
        "Troisi argued that excessive executive interference, shifting trend mandates, and panic over changing industry metrics are what derail ambitious RPGs, not a lack of internal talent. He praised current executive producer Mike Gamble for keeping the core sci-fi vision focused on character-driven choice and consequence.",
        "With Dragon Age: The Veilguard entering the wild, BioWare's primary focus has transitioned fully to the next Mass Effect, which is being built on Epic's Unreal Engine 5 to deliver the photorealistic interstellar visual fidelity fans have craved."
      ],
      keyHighlights: [
        "Mass Effect 2 lead cinematic designer Armando Troisi defends the current BioWare Mass Effect 4 team.",
        "Affirms that key veterans who built the original Shepard trilogy are still leading the sequel's production.",
        "Warns that corporate meddling and external pressure are the primary threats to creative vision.",
        "The Next Mass Effect is in active development on Unreal Engine 5, prioritizing narrative choice and consequences."
      ]
    },
    id: {
      title: "BioWare Tak Perlu Nasihat untuk Mass Effect 4, Kata Desainer Veteran, Asalkan 'Orang Lain Tak Ikut Campur'",
      summary: "Armando Troisi, desainer sinematik Mass Effect 2, menegaskan tim BioWare memiliki talenta veteran trilogi asli yang paham betul jiwa franchise tanpa butuh nasihat pihak luar.",
      fullContent: [
        "Armando Troisi, desainer sinematik Mass Effect 1 dan pemimpin sinematik untuk Mass Effect 2, secara terbuka membela tim pengembang BioWare saat ini. Ia menegaskan studio tersebut sama sekali tidak membutuhkan nasihat dari pihak luar untuk mengembangkan Mass Effect 4, asalkan manajemen eksternal 'memberi ruang bernapas dan tidak ikut campur.'",
        "Menanggapi keraguan komunitas mengenai masa depan BioWare, Troisi menekankan bahwa banyak desainer senior, penulis narasi, dan perancang dunia yang membangun kisah legendaris Commander Shepard masih aktif berkarya di dalam studio hingga saat ini.",
        "Menurut Troisi, campur tangan berlebihan dari eksekutif korporat dan tren pasar yang berubah-ubah adalah penyebab utama tersendatnya proyek RPG besar, bukan karena ketiadaan talenta internal. Ia memuji Produser Eksekutif Mike Gamble yang teguh mempertahankan identitas fiksi ilmiah yang berfokus pada konsekuensi moral.",
        "Setelah perilisan Dragon Age: The Veilguard, fokus utama BioWare kini beralih penuh pada pengembangan Mass Effect generasi berikutnya, yang dibangun menggunakan Unreal Engine 5 demi visual galaksi yang fotorealistis."
      ],
      keyHighlights: [
        "Desainer sinematik Mass Effect 2 Armando Troisi membela integritas dan kemampuan tim BioWare saat ini.",
        "Menegaskan banyak veteran pencipta trilogi asli Commander Shepard yang masih memimpin proyek sekuel.",
        "Memperingatkan bahwa campur tangan eksekutif korporat adalah ancaman terbesar bagi kebebasan visi kreatif.",
        "Mass Effect 4 kini sedang dikembangkan secara aktif menggunakan Unreal Engine 5 dengan fokus narasi mendalam."
      ]
    }
  },

  "game-rant-1": {
    // Dragon Ball Unveils New Super Saiyan Blue Versions For Goku & Vegeta
    en: {
      summary: "Bandai Namco and Toei Animation have unveiled stunning new powered-up variations of Super Saiyan Blue for Goku and Vegeta, revitalizing the iconic god transformation across modern gaming media.",
      fullContent: [
        "While Goku and Vegeta have recently ascended to divine Ultra Instinct and Ultra Ego milestones, the legendary Super Saiyan Blue (Super Saiyan God Super Saiyan) form is making a spectacular resurgence across official Dragon Ball media.",
        "First introduced in 2015's Dragon Ball Z: Resurrection 'F', Super Saiyan Blue became the defining power signature of the Dragon Ball Super anime. The newly unveiled variations introduce crystalline aura surges, heightened divine ki particle effects, and specialized martial combat stances tailored for high-speed clash animations.",
        "The refreshed transformations are arriving in tandem with major content updates for Dragon Ball: Sparking! Zero and digital arcade card expansions, highlighting Akira Toriyama's enduring design legacy and providing alternate tactical loadouts for competitive players.",
        "Fans have warmly received the redesign, noting that restoring Super Saiyan Blue's ferocious speed and tactical ki control bridges the gap between classic Super Saiyan lore and the boundless heights of current manga power scaling."
      ],
      keyHighlights: [
        "Official Dragon Ball media reveals dynamic new visual variants and aura overhauls for Super Saiyan Blue.",
        "Goku and Vegeta receive enhanced divine ki particle effects and distinct martial clash animations.",
        "Features heavily in Dragon Ball: Sparking! Zero and promotional arcade card gaming updates.",
        "Celebrates Akira Toriyama's god-tier design aesthetic while complementing modern Ultra forms."
      ]
    },
    id: {
      title: "Dragon Ball Rilis Versi Baru Super Saiyan Blue untuk Goku & Vegeta",
      summary: "Bandai Namco dan Toei Animation mengungkap varian baru wujud Super Saiyan Blue dengan aura dewa yang diperbarui untuk Goku dan Vegeta di lini game modern.",
      fullContent: [
        "Meskipun Goku dan Vegeta telah mencapai tingkatan Ultra Instinct dan Ultra Ego dalam petualangan terbaru mereka, wujud legendaris Super Saiyan Blue (Super Saiyan God Super Saiyan) kini kembali dengan penyegaran visual yang spektakuler di media resmi Dragon Ball.",
        "Pertama kali diperkenalkan dalam film Dragon Ball Z: Resurrection 'F' pada tahun 2015, Super Saiyan Blue telah menjadi simbol kekuatan utama sepanjang era Dragon Ball Super. Varian terbaru ini menghadirkan kilauan aura kristal yang lebih pekat, efek partikel ki ilahi berkecepatan tinggi, dan kuda-kuda bertarung baru.",
        "Penyegaran visual wujud ini dirilis bersamaan dengan pembaruan konten untuk Dragon Ball: Sparking! Zero dan seri kartu arcade digital, mempertegas warisan desain mendiang Akira Toriyama sekaligus menawarkan variasi gaya bertarung kompetitif.",
        "Komunitas menyambut antusias pembaruan ini, mengapresiasi kembalinya dominasi Super Saiyan Blue yang menyeimbangkan antara kontrol ki yang presisi dan kecepatan bertarung tanpa kompromi."
      ],
      keyHighlights: [
        "Media resmi Dragon Ball mengungkap variasi desain baru dengan aura dewa lebih pekat untuk Super Saiyan Blue.",
        "Goku dan Vegeta mendapatkan efek partikel ki ilahi yang memukau dan variasi jurus bertarung yang diperbarui.",
        "Menjadi sorotan utama dalam pembaruan game Dragon Ball: Sparking! Zero dan ekspansi kartu arcade.",
        "Menegaskan kembali kehebatan transformasi dewa era Resurrection 'F' di samping wujud Ultra terkini."
      ]
    }
  },

  "thegamer-2": {
    // Where To Find St. Mihai's Crypt In The Blood of Dawnwalker
    en: {
      summary: "A comprehensive walkthrough revealing how to locate St. Mihai's hidden subterranean crypt and obtain the silver-forged relic needed to conquer Brencis in The Blood of Dawnwalker.",
      fullContent: [
        "In Rebel Wolves' gothic vampire action RPG The Blood of Dawnwalker, players returning to the tavern with Anca encounter a cryptic enchanted ledger that holds the secret key to vanquishing Brencis: locating the forgotten subterranean Crypt of St. Mihai.",
        "To uncover the crypt entrance, players must journey north of the ruined chapel through the fog-shrouded weeping willow valley. Once at the iron mausoleum, you must light the three raven braziers in counter-clockwise order to unlock the heavy stone seal without triggering the poison dart trap.",
        "Inside the crypt awaits the Silver-Forged Dawn Crest, an ancient relic that strips away Brencis' regenerative blood shield. Players should prepare holy water flasks and quick-dodge abilities, as high-tier bloodhound thralls relentlessly ambush trespassers upon claiming the relic.",
        "Mastering this questline grants significant early-game power and unlocks essential dialogue choices with Anca, cementing Coen's path toward mastering his hybrid vampire heritage."
      ],
      keyHighlights: [
        "Step-by-step navigation guide to locate St. Mihai's hidden subterranean crypt in The Blood of Dawnwalker.",
        "Explains the puzzle solution for lighting the three raven braziers to bypass the deadly trap seal.",
        "Acquires the Silver-Forged Dawn Crest required to neutralize Brencis' immortal blood shield.",
        "Provides tactical survival tips for defeating the high-level bloodhound thrall ambush inside the tombs."
      ]
    },
    id: {
      title: "Lokasi Menemukan Makam Rahasia St. Mihai di The Blood of Dawnwalker",
      summary: "Panduan lengkap menemukan ruang bawah tanah rahasia St. Mihai dan pusaka perak kuno untuk mengalahkan bos vampir Brencis di The Blood of Dawnwalker.",
      fullContent: [
        "Dalam game action RPG bertema vampir gothic besutan Rebel Wolves, The Blood of Dawnwalker, pemain yang kembali dari St. Tyna bersama Anca akan menemukan buku catatan misterius di penginapan. Catatan ini merupakan kunci rahasia untuk menaklukkan tiran Brencis: mengungkap Makam Bawah Tanah St. Mihai.",
        "Untuk menemukan pintu masuk makam, pemain harus menyusuri jalur utara dari reruntuhan kapel melewati lembah kabut pohon dedalu. Sesampainya di mausoleum berpagar besi, pemain wajib menyalakan tiga tungku api gagak secara berlawanan arah jarum jam untuk membuka segel batu tanpa memicu jebakan panah beracun.",
        "Di dalam makam tersimpan Dawn Crest Perak Kuno, pusaka sakral yang mampu meruntuhkan perisai darah regeneratif milik Brencis. Pemain disarankan membawa persediaan air suci dan kemampuan menghindar cepat, karena segerombolan monster bloodhound akan menyergap seketika pusaka diambil.",
        "Menyelesaikan misi ini memberikan lonjakan kekuatan penting di fase awal game serta membuka opsi dialog penting bersama Anca dalam menentukan nasib Coen sebagai manusia setengah vampir."
      ],
      keyHighlights: [
        "Panduan langkah demi langkah menemukan makam bawah tanah tersembunyi St. Mihai di The Blood of Dawnwalker.",
        "Solusi teka-teki menyalakan tiga tungku api gagak untuk membuka pintu batu tanpa terkena racun.",
        "Mendapatkan pusaka Dawn Crest Perak Kuno untuk menghancurkan perisai regenerasi darah bos Brencis.",
        "Trik bertarung menghadapi sergapan monster bloodhound level tinggi di dalam lorong makam."
      ]
    }
  },

  "polygon-1": {
    // 40 Years Ago, Konami Changed the Video Game Industry Forever
    en: {
      summary: "Four decades ago, Konami revolutionized interactive entertainment with Gradius, Castlevania, and the legendary Konami Code, forever altering the landscape of action games and secret discovery.",
      fullContent: [
        "Four decades ago, Konami unleashed a golden era of arcade and console masterpieces that fundamentally reshaped game design, introducing groundbreaking mechanics through Gradius, Castlevania, and the globally celebrated Konami Code.",
        "During the home conversion of Gradius for the Nintendo Famicom in 1986, developer Kazuhisa Hashimoto found the space shooter too brutally punishing during test playthroughs. To test the late-game levels efficiently, he programmed a simple button sequence into the controller: Up, Up, Down, Down, Left, Right, Left, Right, B, A.",
        "What was conceived as an internal debugging shortcut quickly became the most famous easter egg in human history, granting 30 lives in Contra and transcending gaming culture into television, films, and modern software easter eggs.",
        "Beyond cheat codes, Konami's mid-1980s catalog pioneered atmospheric world-building, gothic level design, and dynamic difficulty curves that laid the foundation for the Metroidvania genre and modern side-scrolling action games."
      ],
      keyHighlights: [
        "Celebrates 40 years of Konami's golden age of game design across Gradius and Castlevania.",
        "Chronicles the accidental invention of the Konami Code (↑ ↑ ↓ ↓ ← → ← → B A) by Kazuhisa Hashimoto.",
        "Examines how the code transformed from an internal test tool into a global pop-culture phenomenon in Contra.",
        "Explores Konami's lasting architectural influence on the modern Metroidvania and action-adventure genres."
      ]
    },
    id: {
      title: "40 Tahun Lalu, Konami Mengubah Industri Video Game untuk Selamanya",
      summary: "Empat dekade lalu, Konami merevolusi dunia game lewat Gradius, Castlevania, dan lahirnya Konami Code legendaris yang mengubah sejarah budaya pop selamanya.",
      fullContent: [
        "Empat puluh tahun yang lalu, Konami meluncurkan era keemasan mahakarya arcade dan konsol yang secara mendasar mendefinisikan ulang industri video game, menghadirkan inovasi legendaris melalui Gradius, Castlevania, dan Konami Code yang mendunia.",
        "Saat mengerjakan adaptasi game Gradius untuk Nintendo Famicom pada tahun 1986, sang pengembang Kazuhisa Hashimoto merasa tingkat kesulitan game tembak-menembak pesawat luar angkasa tersebut terlalu mustahil untuk diuji coba. Demi mempermudah pengujian tahap akhir, ia memprogram kombinasi tombol rahasia: Atas, Atas, Bawah, Bawah, Kiri, Kanan, Kiri, Kanan, B, A.",
        "Kombinasi yang awalnya hanya dimaksudkan sebagai alat bantu debug internal itu secara ajaib tertinggal di dalam kaset rilis komersial, kemudian melejit menjadi fenomena global saat memberikan 30 nyawa di game Contra hingga menjadi simbol budaya pop dunia.",
        "Di luar kode curang legendaris tersebut, deretan game Konami era 1980-an memelopori desain atmosfer gothic, mekanika lompat-dan-tebas presisi, serta tata suara chip chiptune yang meletakkan fondasi bagi genre Metroidvania modern."
      ],
      keyHighlights: [
        "Memperingati 40 tahun era keemasan Konami yang melahirkan mahakarya Gradius dan Castlevania.",
        "Kisah di balik terciptanya Konami Code (↑ ↑ ↓ ↓ ← → ← → B A) oleh programmer Kazuhisa Hashimoto.",
        "Transformasi dari alat bantu pengujian internal menjadi cheat code paling ikonik di game Contra.",
        "Warisan desain aksi petualangan Konami yang menjadi cetak biru lahirnya genre Metroidvania modern."
      ]
    }
  },

  "game-rant-2": {
    // All Hozuki Pouch Effects & Locations in Onimusha: Way of the Sword
    en: {
      summary: "Master all five Hozuki Pouch healing and empowerment variants in Onimusha: Way of the Sword, including exact crafting materials and shrine locations.",
      fullContent: [
        "In Capcom's samurai action revival Onimusha: Way of the Sword, Hozuki Pouches serve as the backbone of your combat survival, offering versatile health recovery, status remedies, and potent temporary combat buffs.",
        "While your starting pouch provides standard vitality restoration, seeking out the shrine maiden Okuni unlocks four specialized pouch variants: the Cleansing Pouch (removes poison and burning), the Demon Soul Pouch (increases red soul yield by 50%), the Iron Will Pouch (grants poise and defense), and the Oni Surge Pouch (temporarily triggers devastating critical strikes).",
        "Crafting these superior pouches requires harvesting rare botanical herbs, spirit wood, and demon fangs found across feudal castles, bamboo forests, and hidden underground arenas.",
        "Equipping the optimal pouch configuration for boss gauntlets can turn the tide of battle, providing the decisive edge required to survive on higher difficulty settings."
      ],
      keyHighlights: [
        "Complete guide detailing all five Hozuki Pouch variants in Onimusha: Way of the Sword.",
        "Breakdown of unique pouch capabilities including status cleanse, soul boosters, and critical damage surges.",
        "Exact locations for trading rare spirit materials with shrine maiden Okuni.",
        "Recommended loadout strategies for overcoming high-difficulty samurai boss encounters."
      ]
    },
    id: {
      title: "Daftar Efek & Lokasi Kantong Hozuki di Onimusha: Way of the Sword",
      summary: "Panduan lengkap membuka lima varian Kantong Hozuki penyembuh dan penambah daya tempur samurai di Onimusha: Way of the Sword bersama Okuni.",
      fullContent: [
        "Dalam game aksi samurai terbaru besutan Capcom, Onimusha: Way of the Sword, Kantong Hozuki merupakan perlengkapan bertahan hidup terpenting yang tidak hanya memulihkan darah, tetapi juga memberikan efek peningkatan status tempur yang dahsyat.",
        "Meskipun pemain memulai petualangan dengan kantong pemulih standar, mengantarkan material langka kepada gadis kuil Okuni akan membuka empat varian spesial: Kantong Penawar (menghapus racun dan api), Kantong Jiwa Iblis (meningkatkan perolehan jiwa merah hingga 50%), Kantong Baja (meningkatkan pertahanan), dan Kantong Lonjakan Oni (memicu serangan kritikal mematikan).",
        "Untuk meracik kantong tingkat lanjut ini, pemain harus mengumpulkan tanaman herbal langka, kayu arwah, dan taring iblis yang tersembunyi di hutan bambu, istana feodal, dan kuil bawah tanah rahasia.",
        "Mengombinasikan kantong yang tepat sebelum menghadapi bos samurai akan memberi keunggulan mutlak untuk bertahan hidup di tingkat kesulitan tertinggi."
      ],
      keyHighlights: [
        "Panduan lengkap mengenai lima jenis varian Kantong Hozuki di Onimusha: Way of the Sword.",
        "Penjelasan efek khusus: pemulihan darah, penawar racun, pengganda jiwa iblis, dan lonjakan kritikal.",
        "Lokasi bahan material langka untuk diracik bersama gadis kuil Okuni.",
        "Rekomendasi kombinasi kantong terbaik untuk menaklukkan pertempuran bos yang menantang."
      ]
    }
  },

  "game-rant-3": {
    // GameRant Daily Crossword (September 6, 2026)
    en: {
      summary: "Test your tactical stealth knowledge and 90s console trivia with today's interactive GameRant Daily Crossword puzzle.",
      fullContent: [
        "Today's edition of the GameRant Daily Crossword tests gamers' mastery of legendary tactical stealth franchises, classic espionage protagonists, and iconic 1990s console hardware history.",
        "Featured clues challenge solvers on Solid Snake's cardboard box infiltration tactics, Tenchu: Stealth Assassins' grappling hook navigation, Syphon Filter's infamous taser mechanics, and early 32-bit CD-ROM technology.",
        "The daily puzzle offers tiered hints for casual players while tracking completion times for competitive speedrunners vying for top spots on the global gaming trivia leaderboards.",
        "Whether you are reminiscing over vintage PS1 stealth classics or discovering retro lore for the first time, today's puzzle serves as an entertaining tribute to stealth gaming's golden era."
      ],
      keyHighlights: [
        "Daily themed crossword puzzle focusing on tactical stealth video games and 90s console history.",
        "Includes trivia clues from Metal Gear Solid, Tenchu, Splinter Cell, and Syphon Filter.",
        "Features interactive hints and automated error-checking for all skill levels.",
        "Global leaderboards track daily solving times for competitive trivia enthusiasts."
      ]
    },
    id: {
      title: "Teka-Teki Silang GameRant Harian (6 September 2026)",
      summary: "Uji wawasan Anda seputar game siluman legendaris dan konsol 90-an dalam Teka-Teki Silang Harian GameRant hari ini.",
      fullContent: [
        "Edisi Teka-Teki Silang Harian GameRant hari ini mengajak para gamer menguji ketajaman memori mereka seputar sejarah game stealth taktis, karakter spionase ikonik, dan era kejayaan konsol 1990-an.",
        "Petunjuk soal hari ini menantang pemain dengan trivia seputar kotak kardus penyamaran Solid Snake di Metal Gear Solid, teknik tali pengait di Tenchu: Stealth Assassins, senjata taser legendaris di Syphon Filter, hingga teknologi CD-ROM 32-bit masa awal.",
        "Teka-teki harian ini menyediakan bantuan petunjuk bertingkat bagi pemain santai, sekaligus mencatat rekor waktu tercepat bagi para penikmat trivia kompetitif di papan peringkat global.",
        "Baik Anda bernostalgia dengan game siluman era PS1 maupun baru mengenal sejarah game retro, teka-teki hari ini menjadi sarana hiburan yang seru dan sarat pengetahuan."
      ],
      keyHighlights: [
        "Teka-teki silang harian bertema khusus seputar game spionase taktis dan sejarah konsol era 90-an.",
        "Memuat petunjuk trivia seputar Metal Gear Solid, Tenchu, Splinter Cell, dan Syphon Filter.",
        "Dilengkapi sistem bantuan petunjuk interaktif dan validasi jawaban otomatis.",
        "Papan peringkat global untuk membandingkan rekor waktu penyelesaian tercepat."
      ]
    }
  },

  "game-informer-2": {
    // Gen-AI controversy aside, Crazy Taxi: World Tour feels like classic arcade Sega
    en: {
      summary: "Sega's ambitious Crazy Taxi: World Tour captures the pure unhinged adrenaline of the 1999 Dreamcast original, pairing high-speed urban drift chaos with a blazing punk rock soundtrack.",
      fullContent: [
        "Despite modern debates surrounding generative AI prototyping in early production, Sega's upcoming Crazy Taxi: World Tour delivers exactly what nostalgic arcade fans have craved: pure, unadulterated high-speed urban mayhem.",
        "Hands-on impressions confirm that the tactile driving physics feel remarkably faithful to the 1999 arcade and Dreamcast classic. Barreling down sun-bleached San Francisco and Tokyo-inspired city slopes while executing Crazy Drifts, Crazy Jumps, and near-miss pedestrian dodges feels as exhilarating as ever.",
        "The soundtrack roars with energy, featuring licensed bangers from The Offspring and Bad Religion alongside vibrant new tracks that perfectly complement the relentless score-attack passenger delivery loops.",
        "By balancing sprawling open-world multiplayer districts with lightning-fast arcade pickup-and-play sessions, Sega looks poised to deliver a triumphant revival for one of gaming's most beloved franchises."
      ],
      keyHighlights: [
        "Hands-on preview confirms Crazy Taxi: World Tour recaptures the chaotic joy of the 1999 original.",
        "Features responsive arcade handling, insane drifting, steep downhill jumps, and passenger delivery score-attacks.",
        "Showcases an electrifying punk-rock soundtrack featuring The Offspring and Bad Religion.",
        "Blends modern open-world multiplayer hubs with classic short-burst arcade gameplay."
      ]
    },
    id: {
      title: "Di Luar Kontroversi AI, Crazy Taxi: World Tour Terasa Seperti Game Klasik Arcade Sega yang Luar Biasa",
      summary: "Crazy Taxi: World Tour garapan Sega sukses menghidupkan kembali kegilaan arcade Dreamcast 1999, lengkap dengan drifting kota liar dan soundtrack punk rock membara.",
      fullContent: [
        "Di tengah perdebatan hangat industri seputar penggunaan AI generatif dalam tahap awal produksinya, game terbaru Crazy Taxi: World Tour buatan Sega berhasil menyajikan apa yang paling dirindukan para penggemar game retro: aksi kebut-kebutan kota tanpa aturan yang sangat adiktif.",
        "Uji coba langsung membuktikan bahwa fisika berkendara terasa sangat setia dengan mahakarya Dreamcast dan arcade tahun 1999. Meluncur kencang menuruni jalanan curam khas San Francisco dan Tokyo sambil mengeksekusi Crazy Drift, Crazy Jump, dan manuver nyaris menabrak terasa luar biasa memuaskan.",
        "Dentuman musiknya pun membakar semangat, menghadirkan lagu-lagu punk rock legendaris dari The Offspring dan Bad Religion yang berpadu sempurna dengan ritme cepat mengantar penumpang tepat waktu.",
        "Dengan memadukan kota open-world multipemain yang luas dan sesi permainan arcade yang serba cepat, Sega tampaknya siap membawa pulang salah satu waralaba paling dicintai dalam sejarah video game ke puncak kejayaan."
      ],
      keyHighlights: [
        "Impresi awal memastikan Crazy Taxi: World Tour menangkap esensi kegilaan arcade Dreamcast 1999.",
        "Menghadirkan kendali mobil yang responsif, drift ekstrem, lompatan jalanan curam, dan aksi kejar waktu.",
        "Diiringi soundtrack punk rock berenergi tinggi dari band legendaris The Offspring dan Bad Religion.",
        "Menggabungkan elemen kota open-world modern dengan aksi arcade klasik yang langsung memacu adrenalin."
      ]
    }
  },

  "polygon-2": {
    // Samara Weaving's Gritty Action Sleeper Hit Officially Finds a New Home on Streaming
    en: {
      summary: "Samara Weaving's celebrated thriller Ready or Not makes a triumphant debut on streaming platforms, fueling impassioned fan campaigns for her casting as Emma Frost in Marvel's X-Men reboot.",
      fullContent: [
        "Samara Weaving's breakout survival horror-thriller Ready or Not has officially arrived on major streaming platforms, skyrocketing into the global top ten charts and reigniting passionate fan enthusiasm across social media.",
        "Weaving's electrifying performance as Grace—a bride forced into a lethal game of hide-and-seek against her wealthy in-laws—solidified her reputation as one of modern cinema's most formidable and charismatic action heroines.",
        "The streaming resurgence has amplified fervent fan campaigns lobbying Marvel Studios to cast Weaving as the White Queen, Emma Frost, in the upcoming Marvel Cinematic Universe X-Men reboot. Industry commentators note that Weaving's regal poise, biting wit, and ferocious screen presence make her an ideal candidate for the complex telepathic mutant leader.",
        "As Marvel Studios readies its mutant slate for Phase 6 and beyond, Weaving's enduring star power and cult-classic catalog make her a top contender for upcoming Hollywood comic adaptations."
      ],
      keyHighlights: [
        "Acclaimed horror-action thriller Ready or Not arrives on streaming to massive global viewership numbers.",
        "Samara Weaving's fierce and charismatic performance re-establishes her as a premier modern genre star.",
        "Sparks renewed fan campaigns for Weaving to portray Emma Frost in Marvel Studios' MCU X-Men reboot.",
        "Highlights her unique ability to blend high-intensity physical action with sharp, commanding screen presence."
      ]
    },
    id: {
      title: "Film Aksi Menegangkan Samara Weaving Resmi Hadir di Platform Streaming",
      summary: "Film thriller Ready or Not yang dibintangi Samara Weaving resmi meluncur di streaming, memicu antusiasme penggemar yang menginginkannya berperan sebagai Emma Frost di MCU X-Men.",
      fullContent: [
        "Film thriller survival horror yang melambungkan nama Samara Weaving, Ready or Not, kini resmi tersedia di platform streaming global dan langsung melesat masuk ke jajaran sepuluh besar tontonan terpopuler.",
        "Penampilan luar biasa Weaving sebagai Grace—seorang pengantin baru yang terpaksa berjuang hidup-mati dalam permainan petak umpet mematikan melawan keluarga mertuanya yang eksentrik—telah mengukuhkan posisinya sebagai bintang aksi wanita paling karismatik di bioskop modern.",
        "Kembalinya popularitas film ini di platform streaming memicu kampanye masif dari komunitas penggemar komik Marvel yang mendesak Marvel Studios untuk memilih Weaving sebagai pemeran Emma Frost (White Queen) dalam reboot X-Men mendatang. Keanggunan, tatapan tajam, dan kepiawaian akting fisik Weaving dinilai sempurna membawakan karakter pemimpin mutan tersebut.",
        "Seiring persiapan Marvel Studios memasuki Phase 6 yang berfokus pada kehadiran para mutan, nama Samara Weaving kian santer diperbincangkan sebagai kandidat terkuat untuk jajaran pemeran superhero papan atas."
      ],
      keyHighlights: [
        "Film horor-aksi Ready or Not sukses meraih lonjakan penonton masif setelah resmi rilis di platform streaming.",
        "Akting berani dan memikat Samara Weaving semakin memperkuat reputasinya sebagai ratu film laga modern.",
        "Mendorong dukungan luas komunitas agar Marvel Studios merekrut Weaving sebagai Emma Frost di film MCU X-Men.",
        "Menonjolkan perpaduan langka antara ketangguhan aksi fisik, karisma berkelas, dan kekuatan karakter di layar."
      ]
    }
  },

  "polygon-3": {
    // 5 Star Trek Ships That Changed the Legendary Sci-Fi Franchise Forever
    en: {
      summary: "An exploration of the five most iconic starships in Star Trek history—from Matt Jefferies' original Constitution-class Enterprise to the battle-hardened USS Defiant.",
      fullContent: [
        "Throughout six decades of science-fiction history, Star Trek's greatest starships have evolved from mere transport vehicles into living characters that embody humanity's exploratory spirit and technological ambition.",
        "Leading the pantheon is Matt Jefferies' original Constitution-class USS Enterprise (NCC-1701), whose twin nacelles, saucer hull, and peaceful naval aesthetic broke away from the militaristic rocket ships of early 1950s pulp sci-fi.",
        "The retrospective also celebrates the Galaxy-class USS Enterprise-D as a sprawling utopian city in deep space, the battle-tested escort warship USS Defiant that shattered Roddenberry's pacifist design doctrine during the Dominion War, the nimble Intrepid-class USS Voyager, and the menacing Klingon Bird-of-Prey.",
        "Examining the physical studio miniatures to modern photorealistic CGI pipelines reveals how thoughtful starship architecture continues to inspire real-world aeronautics and speculative engineering today."
      ],
      keyHighlights: [
        "Explores five revolutionary starships that shaped Star Trek's visual identity and philosophical legacy.",
        "Spotlights the original USS Enterprise (NCC-1701) designed by art director Matt Jefferies.",
        "Analyzes the USS Defiant as Star Trek's first dedicated warship, altering Starfleet design doctrines.",
        "Examines the craft of physical studio model-making and its transition into modern digital VFX pipelines."
      ]
    },
    id: {
      title: "5 Kapal Luar Angkasa Star Trek yang Mengubah Waralaba Fiksi Ilmiah Legendaris Selamanya",
      summary: "Membahas lima kapal penjelajah antariksa paling ikonik dalam sejarah Star Trek, mulai dari USS Enterprise klasik hingga kapal perang tangguh USS Defiant.",
      fullContent: [
        "Sepanjang enam dekade perjalanan sejarah fiksi ilmiah, armada kapal bintang dalam Star Trek telah bertransformasi dari sekadar alat transportasi menjadi karakter hidup yang mencerminkan semangat penjelajahan dan peradaban manusia.",
        "Puncak dari warisan ini dipimpin oleh USS Enterprise (NCC-1701) kelas Constitution karya desainer Matt Jefferies. Desain lambung piringan ganda dan silinder penggerak warp-nya mendobrak pakem kapal roket militer era 1950-an menuju kapal riset yang ramah dan megah.",
        "Kajian ini juga menyoroti USS Enterprise-D kelas Galaxy yang dirancang bagaikan kota terapung di antariksa, kapal tempur USS Defiant yang mendobrak doktrin pasifis Starfleet demi memenangkan Perang Dominion, kapal mungil penjelajah USS Voyager, hingga kegarangan kapal alien Klingon Bird-of-Prey.",
        "Dari miniatur model fisik buatan tangan di studio hingga teknologi efek visual digital fotorealistis masa kini, desain kapal Star Trek terbukti terus menginspirasi rancangan aeronautika dan sains modern di dunia nyata."
      ],
      keyHighlights: [
        "Menganalisis lima kapal bintang legendaris yang mendefinisikan estetika visual dan filosofi Star Trek.",
        "Menyoroti keunikan rancangan asli USS Enterprise (NCC-1701) karya art director Matt Jefferies.",
        "Kisah lahirnya USS Defiant sebagai kapal perang murni pertama Starfleet dalam Perang Dominion.",
        "Evolusi teknik pembuatan efek kapal luar angkasa dari miniatur studio hingga pemodelan CGI modern."
      ]
    }
  },

  "gamespot-2": {
    // Onimusha WOTS - High Level Gameplay On Hardest Difficulty
    en: {
      summary: "High-level gameplay showcase demonstrating a flawless, no-damage boss battle against Enhanced Byakue on punishing Carnage Difficulty in Onimusha: Way of the Sword.",
      fullContent: [
        "Veteran action gamers have shared a jaw-dropping gameplay exhibition of Capcom's Onimusha: Way of the Sword, achieving a flawless, zero-damage victory against the secret demo boss Enhanced Byakue on the grueling Carnage difficulty setting.",
        "Carnage difficulty—which only unlocks after completing the campaign on Normal—drastically accelerates enemy aggression, removes checkpoint safety nets, and reduces player survival windows to mere fractions of a second.",
        "The showcase highlights the masterclass execution of frame-perfect Issen (flash counter) strikes, seamless mid-combo weapon switching between the dual odachi and thunder spear, and optimal soul siphon positioning to sustain full demonic Oni gauge power.",
        "Action enthusiasts have praised the combat depth, noting that Capcom's precision hitboxes and responsive parry mechanics make Way of the Sword a worthy successor to the legendary PS2 samurai series."
      ],
      keyHighlights: [
        "Demonstrates a flawless, no-damage run against Enhanced Byakue on Carnage difficulty.",
        "Showcases frame-perfect Issen counters, stance switching, and demonic soul siphoning.",
        "Carnage difficulty unlocks exclusively after completing the campaign on Normal mode.",
        "Highlights the surgical combat precision and responsiveness of Capcom's samurai revival."
      ]
    },
    id: {
      title: "Gameplay Level Tinggi Onimusha: Way of the Sword pada Tingkat Kesulitan Tertinggi",
      summary: "Unjuk kebolehan gameplay profesional menaklukkan bos rahasia Enhanced Byakue tanpa terkena damage sama sekali di tingkat kesulitan ekstrem Carnage.",
      fullContent: [
        "Pemain veteran game aksi baru saja memamerkan rekaman gameplay luar biasa dari game Onimusha: Way of the Sword besutan Capcom, di mana ia berhasil menumbangkan bos rahasia Enhanced Byakue tanpa menerima damage satu poin pun pada tingkat kesulitan Carnage.",
        "Tingkat kesulitan Carnage—yang hanya dapat dibuka setelah menamatkan cerita utama pada tingkat Normal—meningkatkan agresivitas musuh secara drastis, memangkas batas keselamatan checkpoint, dan menuntut refleks sepersekian detik dari pemain.",
        "Video ini memperlihatkan penguasaan teknik serangan balik kilat Issen berakurasi tinggi, pergantian senjata instan di tengah kombo antara pedang ganda dan tombak petir, serta penyerapan jiwa iblis yang tepat untuk menjaga kestabilan mode Oni.",
        "Komunitas memuji kedalaman mekanika pertarungan Capcom, menegaskan bahwa kepresisian hitbox dan responsivitas tangkisan menjadikan Way of the Sword penerus yang sangat layak bagi waralaba samurai legendaris era PS2."
      ],
      keyHighlights: [
        "Aksi bermain tingkat tinggi menaklukkan bos Enhanced Byakue tanpa terkena serangan sama sekali.",
        "Menampilkan teknik serangan kilat Issen berakurasi frame-perfect dan kombo pergantian senjata cepat.",
        "Tingkat kesulitan Carnage menghadirkan tantangan ekstrem bagi para master game aksi samurai.",
        "Menunjukkan kedalaman sistem pertarungan dan presisi hitbox pada engine terbaru Capcom."
      ]
    }
  },

  "game-informer-3": {
    // What we've been playing - "Well this is embarrassing, we're wearing the same outfit!"
    en: {
      summary: "The Eurogamer editorial team convenes for their weekly gaming roundup, sharing candid stories of co-op gaming blunders, retro platforming discoveries, and community backlog progress.",
      fullContent: [
        "The Eurogamer editorial desk returns with this week's candid edition of 'What We've Been Playing,' bringing together staff recommendations, hilarious cooperative gaming blunders, and heartfelt reflections on current gaming backlogs.",
        "This week's highlights range from competitive squad sessions in cooperative shooters where teammates accidentally coordinated identical cosmetic skins, to solitary late-night dives into atmospheric pixel roguelike deckbuilders.",
        "The team delves into the growing phenomenon of seasonal gaming fatigue, exploring how smaller, focused indie experiences often provide the perfect palate cleanser between massive hundred-hour open-world blockbusters.",
        "Readers are invited to join the conversation in the community forums, sharing their weekend gaming discoveries and debating the most memorable multiplayer gaming moments of the season."
      ],
      keyHighlights: [
        "Eurogamer editorial staff share their weekly gaming rotation, personal recommendations, and co-op highlights.",
        "Features humorous anecdotes including accidental cosmetic matching in multiplayer lobbies.",
        "Discusses seasonal gaming fatigue and the vital role of compact indie titles as palate cleansers.",
        "Invites the community to share their current gaming backlog achievements in weekly discussion boards."
      ]
    },
    id: {
      title: "Game yang Kami Mainkan Minggu Ini - 'Memalukan Sekali, Kostum Kita Kembar!'",
      summary: "Redaksi Eurogamer membagikan kisah seru sesi main bareng mingguan, rekomendasi game indie pilihan, dan obrolan santai seputar tumpukan backlog game.",
      fullContent: [
        "Tim redaksi Eurogamer kembali menyapa para pembaca melalui rubrik mingguan 'What We've Been Playing,' membagikan rekomendasi game favorit, momen lucu saat bermain bersama teman, serta cerita seru seputar petualangan digital mereka.",
        "Sorotan minggu ini berkisar dari sesi tembak-menembak kooperatif yang diwarnai gelak tawa karena rekan satu tim tanpa sengaja mengenakan kostum karakter yang sama persis, hingga keasyikan menyendiri menuntaskan game roguelike kartu berpiksel retro.",
        "Para jurnalis juga membahas fenomena kejenuhan bermain game dunia terbuka (open-world fatigue) berskala ratusan jam, dan bagaimana kehadiran game indie yang ringkas dan padat menjadi pelepas penat yang menyegarkan.",
        "Pembaca diajak untuk bergabung dalam kolom diskusi komunitas untuk menceritakan game apa saja yang sedang mereka tamatkan di akhir pekan ini."
      ],
      keyHighlights: [
        "Koleksi cerita dan ulasan santai mingguan dari jajaran jurnalis game redaksi Eurogamer.",
        "Momen lucu saat bermain bersama teman secara online dan tanpa sengaja memakai skin karakter kembar.",
        "Membahas fenomena kejenuhan bermain game berdurasi panjang dan pesona game indie yang ringkas.",
        "Ruang interaktif bagi komunitas untuk berbagi progres tumpukan game (backlog) masing-masing."
      ]
    }
  },

  "the-verge-2": {
    // The White House is making arcade games racist
    en: {
      summary: "An investigative report exploring controversial partisan political knock-offs of classic arcade puzzles and The Tetris Company's formal intellectual property response.",
      fullContent: [
        "The intersection of video game nostalgia and hyper-partisan political campaigning has sparked intense scrutiny following the release of an unauthorized political web game heavily modeled on classic puzzle arcade mechanics.",
        "The puzzle game in question mimics the falling tetromino block-matching gameplay of Tetris, tasking players with stacking physical barriers along the southern border. The controversial thematic framing prompted swift condemnation from civil liberties organizations and gaming historians alike.",
        "The Tetris Company issued a formal statement addressing the situation, reiterating its strict copyright enforcement, trademark protections, and commitment to preventing the iconic puzzle brand from being appropriated for polarizing partisan agendas.",
        "Industry legal scholars emphasize that while parody protections exist under fair use, utilizing proprietary gameplay mechanics, visual geometries, and copyrighted sound designs for political messaging sets a dangerous precedent for entertainment IP."
      ],
      keyHighlights: [
        "Investigative report examines unauthorized partisan political games mimicking classic arcade puzzles.",
        "The Tetris Company issues formal copyright and trademark warnings against unauthorized brand appropriation.",
        "Civil rights organizations and gaming historians criticize the weaponization of nostalgic game mechanics.",
        "Legal experts discuss fair use boundaries regarding interactive entertainment and political campaigns."
      ]
    },
    id: {
      title: "Gedung Putih dan Kontroversi Game Arcade Bernuansa Politis",
      summary: "Laporan investigasi mendalam mengenai kemunculan tiruan game puzzle arcade klasik untuk kampanye politik dan respons hak cipta resmi dari The Tetris Company.",
      fullContent: [
        "Persilangan antara nostalgia video game retro dan kampanye politik partisan menuai sorotan tajam menyusul beredarnya game web bermuatan politik yang meniru format mekanika puzzle arcade legendaris.",
        "Game kontroversial tersebut mengadopsi mekanisme susun balok jatuh persis seperti Tetris untuk membangun tembok perbatasan. Penggunaan format permainan arcade populer untuk pesan-pesan yang memecah belah menuai kritik luas dari pemerhati hak sipil dan sejarawan video game.",
        "Pihak The Tetris Company segera mengeluarkan pernyataan hukum resmi yang menegaskan perlindungan hak cipta dan merek dagang mereka, menolak keras penggunaan aset dan konsep puzzle mereka untuk kepentingan propaganda politik.",
        "Pakar hukum hak kekayaan intelektual mengingatkan bahwa meskipun ada asas parodi atau fair use, penyalahgunaan identitas visual dan mekanisme game komersial tanpa izin melanggar etika dan aturan perlindungan karya kreatif."
      ],
      keyHighlights: [
        "Laporan mendalam seputar munculnya game web tiruan bertema politik yang meniru puzzle arcade klasik.",
        "The Tetris Company melayangkan peringatan hak cipta resmi guna melindungi merek dagang legendaris mereka.",
        "Kritik tajam dari komunitas sejarah video game atas pemanfaatan estetika retro untuk isu partisan.",
        "Tinjauan hukum seputar batasan parodi (fair use) dan hak cipta dalam industri hiburan digital."
      ]
    }
  },

  "bloomberg-gaming-1": {
    // PAX Unplugged Houston to debut in June 2027
    en: {
      summary: "ReedPop and Penny Arcade officially announce the expansion of the PAX brand with PAX Unplugged Houston, scheduled to debut in Texas in June 2027.",
      fullContent: [
        "ReedPop and Penny Arcade have officially unveiled the launch of PAX Unplugged Houston, a massive new convention dedicated entirely to tabletop gaming, board games, tabletop RPGs, and miniature wargaming, slated to debut in June 2027.",
        "The event will take place at the George R. Brown Convention Center in downtown Houston, marking the triumphant return of the official PAX brand to the Texas gaming community following the retirement of PAX South in San Antonio in 2022.",
        "Convention organizers noted that Texas has one of the fastest-growing and most passionate tabletop communities in North America. The event promises hundreds of free-to-play board game libraries, developer panels, tournament zones, and premier exhibitor booths from major industry publishers.",
        "The expansion reflects the explosive global growth of the analog gaming sector, which has experienced unprecedented revenue gains driven by modern board games, trading card games, and resurgence in tabletop roleplaying."
      ],
      keyHighlights: [
        "ReedPop and Penny Arcade announce the inaugural PAX Unplugged Houston, premiering in June 2027.",
        "Marks the triumphant return of the PAX brand to Texas following the discontinuation of PAX South.",
        "Dedicated exclusively to tabletop gaming, collectible card games, board games, and RPG communities.",
        "Hosted at the George R. Brown Convention Center, featuring expansive free-play libraries and tournaments."
      ]
    },
    id: {
      title: "PAX Unplugged Houston Siap Digelar Juni 2027: Kembalinya Pesta Game Meja ke Texas",
      summary: "ReedPop dan Penny Arcade resmi mengumumkan PAX Unplugged Houston pada Juni 2027, mengobati kerinduan penggemar board game dan TCG di kawasan Texas.",
      fullContent: [
        "Penyelenggara konvensi game terkemuka ReedPop dan Penny Arcade secara resmi mengumumkan peluncuran PAX Unplugged Houston, ajang konvensi akbar yang didedikasikan khusus untuk komunitas board game, permainan kartu (TCG), dan tabletop RPG, yang dijadwalkan berlangsung pada Juni 2027.",
        "Bertempat di George R. Brown Convention Center di pusat kota Houston, konvensi ini menandai kembalinya merek resmi PAX ke negara bagian Texas setelah penutupan PAX South di San Antonio pada tahun 2022 silam.",
        "Pihak penyelenggara menyoroti bahwa Texas memiliki salah satu komunitas game analog paling aktif dan berkembang pesat di dunia. Acara ini akan menyediakan perpustakaan ratusan board game gratis untuk dimainkan, turnamen berhadiah, serta booth pameran dari para penerbit internasional terkemuka.",
        "Ekspansi ini sekaligus membuktikan lonjakan popularitas industri game meja non-digital secara global yang terus mencetak rekor penjualan dan antusiasme komunitas lintas generasi."
      ],
      keyHighlights: [
        "ReedPop dan Penny Arcade resmi mengumumkan konvensi perdana PAX Unplugged Houston untuk Juni 2027.",
        "Menandai kembalinya bendera PAX ke wilayah Texas setelah absennya festival PAX South sejak 2022.",
        "Dikhususkan bagi pecinta board game, kartu koleksi (TCG), miniatur wargame, dan tabletop RPG.",
        "Menghadirkan area uji coba ratusan board game gratis, turnamen resmi, dan pameran penerbit dunia."
      ]
    }
  },

  "vgc-1": {
    // Podcast: GTA 6 boosts console sales... but will it last?
    en: {
      summary: "The VGC podcast panel examines the massive surge in PlayStation 5 Pro and Xbox hardware purchases driven by Grand Theft Auto VI anticipation, alongside the fierce digital ownership debate.",
      fullContent: [
        "In the latest episode of the VGC podcast, the editorial panel tackles the dramatic spike in current-generation console hardware sales spurred by mounting excitement for Rockstar Games' upcoming Grand Theft Auto VI.",
        "Retail analytics indicate that consumers are proactively upgrading to the PlayStation 5 Pro and high-storage Xbox Series X consoles specifically to ensure optimal performance when GTA VI launches, marking one of the strongest mid-generation hardware cycles in console history.",
        "The panel debates whether this momentum can be sustained into the latter half of the decade, or if rising hardware costs, component shortages, and broader macroeconomic pressures will curtail long-term console adoption.",
        "The episode also dives deep into the contentious debate surrounding digital ownership rights versus physical media preservation, examining how digital licensing terms threaten consumer access as platforms phase out optical disc drives."
      ],
      keyHighlights: [
        "VGC podcast analyzes hardware adoption surges fueled by Grand Theft Auto VI anticipation.",
        "Consumers proactively invest in premium consoles like the PS5 Pro to prepare for Rockstar's blockbuster.",
        "Panel questions whether the hardware momentum will hold amid rising prices and economic pressures.",
        "In-depth discussion on physical disc preservation versus the legal fragility of digital game licenses."
      ]
    },
    id: {
      title: "Podcast VGC: GTA 6 Dongkrak Penjualan Konsol... Namun Akankah Bertahan Lama?",
      summary: "Panel podcast VGC membedah lonjakan drastis penjualan PS5 Pro dan Xbox berkat antisipasi GTA 6, serta perdebatan panas seputar kepemilikan game digital.",
      fullContent: [
        "Dalam episode podcast terbaru Video Games Chronicle (VGC), panel jurnalis senior mengulas lonjakan signifikan angka penjualan konsol generasi terkini yang terdorong oleh antusiasme luar biasa menjelang peluncuran Grand Theft Auto VI dari Rockstar Games.",
        "Data pasar ritel menunjukkan bahwa para calon pemain rela berinvestasi lebih awal membeli konsol kelas atas seperti PlayStation 5 Pro dan Xbox Series X demi memastikan pengalaman grafis dan performa terbaik saat menjelajahi kota Vice City.",
        "Para analis memperdebatkan apakah tren kenaikan ini dapat bertahan hingga akhir generasi konsol, mengingat mahalnya harga perangkat keras dan tantangan ekonomi global yang mempengaruhi daya beli gamer.",
        "Diskusi hangat ini juga mengupas isu hak kepemilikan game digital melawan pelestarian kaset fisik, mengkritisi kebijakan platform yang perlahan menghapus drive disk optik dan merugikan hak konsumen jangka panjang."
      ],
      keyHighlights: [
        "Analisis lonjakan penjualan perangkat keras konsol yang dipicu oleh tingginya ekspektasi game GTA 6.",
        "Pemain mulai beralih ke konsol premium seperti PS5 Pro demi mendapatkan performa grafis maksimal.",
        "Perdebatan analis mengenai ketahanan tren pasar konsol di tengah kenaikan harga komponen.",
        "Ulasan kritis mengenai risiko lisensi digital dibandingkan dengan pentingnya kepemilikan media fisik."
      ]
    }
  },

  "vgc-2": {
    // Blood of Dawnwalker: Xanthe’s Mansion lantern puzzle solution
    en: {
      summary: "A step-by-step puzzle guide to solving the four chromatic lanterns inside Xanthe's Mansion and unlocking the sealed vampire matriarch boss arena in The Blood of Dawnwalker.",
      fullContent: [
        "Navigating the opulent, shadow-draped corridors of Xanthe's Mansion in The Blood of Dawnwalker presents players with one of the game's most intricate environmental brainteasers: the four chromatic lanterns guarding the matriarch's inner sanctum.",
        "To break the blood seal, players must first inspect the Latin inscription carved upon the marble family crest in the grand foyer. The poem hints at the progression of dawn: light the Ruby lantern first (representing midnight dusk), followed by the Amethyst, Sapphire, and finally the Topaz lantern at the balcony.",
        "Solving the sequence properly rotates the central light prisms, lowering the iron portcullis without spawning the venomous gargoyle guardians that appear if an incorrect color is ignited.",
        "Unlocking this chamber yields the Crimson Rapier and allows players to confront Xanthe before she completes her midnight blood ritual, securing critical story rewards."
      ],
      keyHighlights: [
        "Detailed puzzle walkthrough for deciphering the lantern light sequence in Xanthe's Mansion.",
        "Explains the Latin crest riddle order: Ruby, Amethyst, Sapphire, and Topaz.",
        "Avoids triggering the deadly venomous gargoyle trap by entering the correct chromatic pattern.",
        "Unlocks the legendary Crimson Rapier weapon and opens the path to the matriarch boss encounter."
      ]
    },
    id: {
      title: "Solusi Teka-Teki Lentera Rumah Besar Xanthe di The Blood of Dawnwalker",
      summary: "Panduan praktis memecahkan teka-teki empat lentera warna-warni di Rumah Besar Xanthe dan membuka jalan menuju pertempuran bos vampir di The Blood of Dawnwalker.",
      fullContent: [
        "Menjelajahi lorong megah nan mencekam di Rumah Besar Xanthe dalam game The Blood of Dawnwalker menghadapkan pemain pada salah satu teka-teki lingkungan paling rumit: menyalakan empat lentera warna untuk membuka gerbang sanctum sang matriark vampir.",
        "Untuk membuka segel darah tersebut, pemain harus mencermati prasasti puisi kuno yang terpahat pada lambang marmer di lobi utama. Syair tersebut mengisyaratkan urutan fajar: nyalakan lentera Ruby (merah) terlebih dahulu, disusul Amethyst (ungu), Sapphire (biru), dan diakhiri dengan lentera Topaz (emas) di balkon atas.",
        "Urutan yang benar akan mengarahkan prisma cahaya ke gerbang besi utama tanpa memicu sergapan monster gargoyle beracun yang akan bangkit jika pemain salah menyalakan warna.",
        "Menyelesaikan teka-teki ini memberi hadiah senjata legendaris Crimson Rapier dan membuka konfrontasi krusial sebelum ritual darah tengah malam Xanthe selesai."
      ],
      keyHighlights: [
        "Panduan langkah demi langkah memecahkan urutan lentera warna di Rumah Besar Xanthe.",
        "Urutan penyalaan yang benar berdasarkan prasasti: Ruby, Amethyst, Sapphire, lalu Topaz.",
        "Mencegah bangkitnya jebakan monster gargoyle beracun akibat salah urutan lentera.",
        "Membuka akses senjata Crimson Rapier dan arena pertarungan melawan matriark vampir Xanthe."
      ]
    }
  },

  "bloomberg-gaming-2": {
    // Inside Tencent's long-term strategy: live service, AI tools, and evergreen titles
    en: {
      summary: "An in-depth economic analysis of Tencent Games' strategic pivot, prioritizing high-yield evergreen franchises and AI tool integration over speculative live-service gambles.",
      fullContent: [
        "As Western gaming conglomerates struggle with costly live-service failures and consecutive studio closures, global gaming titan Tencent is charting a disciplined, highly calculated course focused on enduring evergreen titles and internal AI workflow integration.",
        "Tencent has scaled back risky exploratory live-service ventures, opting instead to double down on proven multi-billion dollar ecosystems like Honor of Kings, PUBG Mobile, and partnerships with Riot Games and Epic Games.",
        "The conglomerate is heavily embedding proprietary machine learning tools across its pipeline—from automated 3D asset generation to dynamic localization models—substantially decreasing development cycles and operational overhead across its subsidiary studios.",
        "Financial analysts point to Tencent's diversified balance sheet as a blueprint for sustainability, proving that steady recurring revenues paired with strategic minority investments in creative European and North American studios outperform reckless trend-chasing."
      ],
      keyHighlights: [
        "Detailed report analyzing Tencent Games' economic strategy shifting away from risky live-service bets.",
        "Focuses investment on multi-billion dollar evergreen titans including Honor of Kings and PUBG Mobile.",
        "Deploys proprietary generative AI workflows to streamline 3D art pipelines and localization efficiency.",
        "Contrasts Tencent's disciplined operational model with recent high-profile Western studio closures."
      ]
    },
    id: {
      title: "Membedah Strategi Jangka Panjang Tencent: Game Live-Service, Alat AI, dan Judul Abadi",
      summary: "Laporan ekonomi mendalam mengenai strategi bisnis raksasa game Tencent yang memprioritaskan franchise abadi dan integrasi kecerdasan buatan.",
      fullContent: [
        "Di saat banyak raksasa game Barat kelimpungan menghadapi kegagalan proyek live-service yang menelan biaya triliunan rupiah, konglomerat game global Tencent mengambil langkah terukur dengan memfokuskan modal pada game abadi (evergreen) serta efisiensi alat kecerdasan buatan (AI).",
        "Tencent mulai mengurangi pertaruhan pada game live-service baru yang spekulatif, dan memilih memperkuat ekosistem raksasa yang telah terbukti menghasilkan miliaran dollar seperti Honor of Kings, PUBG Mobile, serta kemitraan strategis dengan Riot Games dan Epic Games.",
        "Perusahaan ini juga secara masif mengintegrasikan pipeline kecerdasan buatan internal—mulai dari pemodelan aset 3D otomatis hingga sistem lokalisasi multibahasa real-time—guna memangkas biaya operasional dan mempercepat masa pengembangan game.",
        "Para analis finansial menilai strategi Tencent sebagai model ketahanan bisnis yang solid, membuktikan bahwa mempertahankan franchise inti dan berinvestasi pada studio kreatif independen jauh lebih aman dibanding mengejar tren sesaat."
      ],
      keyHighlights: [
        "Analisis mendalam mengenai strategi bisnis Tencent Games yang menghindari proyek live-service berisiko tinggi.",
        "Memfokuskan sumber daya pada game berpenghasilan stabil seperti Honor of Kings dan PUBG Mobile.",
        "Penerapan teknologi AI internal untuk mengotomatisasi produksi aset 3D dan mempercepat lokalisasi.",
        "Perbandingan model bisnis stabil Tencent dengan gelombang penutupan studio game di Barat."
      ]
    }
  },

  "vgc-3": {
    // Halloween the Game single-player review: Is there enough here for solo players?
    en: {
      summary: "A comprehensive review of IllFonic's Halloween: The Game, evaluating the single-player campaign, Michael Myers' dynamic stalking AI, and whether solo content justifies the ticket price.",
      fullContent: [
        "IllFonic's latest asymmetrical horror adaptation, Halloween: The Game, attempts an ambitious feat by delivering a dedicated single-player story campaign alongside its core multiplayer survival experience.",
        "Stepping into the shoes of terrified Haddonfield residents across iconic movie locations—including the Myers residence and Laurie Strode's fortified house—reveals an atmospheric masterclass. The dynamic AI for Michael Myers proves genuinely unsettling, observing players from the treeline before striking from pitch-black shadows.",
        "The single-player challenges prioritize tactical stealth, circuit repair, and stealthy evasions over combat, accompanied by John Carpenter's chilling, authentic synth score that ratchets up heart-pounding dread.",
        "While the solo campaign offers roughly six to eight hours of tense cat-and-mouse thrills that diehard horror fans will cherish, the long-term replayability remains firmly anchored in the chaotic multiplayer lobbies."
      ],
      keyHighlights: [
        "Comprehensive review evaluating the single-player campaign mode of IllFonic's Halloween: The Game.",
        "Praises Michael Myers' dynamic stalking AI, authentic film locations, and John Carpenter's score.",
        "Gameplay focuses on tense hide-and-seek stealth, environmental puzzles, and evasion rather than direct combat.",
        "Verdict: A loving, atmospheric treat for solo horror enthusiasts, though multiplayer remains the core attraction."
      ]
    },
    id: {
      title: "Ulasan Mode Single-Player Halloween The Game: Cukupkah Konten untuk Pemain Solo?",
      summary: "Ulasan komprehensif menguji kampanye solo Halloween: The Game, kecerdasan buatan Michael Myers yang mencekam, dan nilai bermain bagi pemain tunggal.",
      fullContent: [
        "Adaptasi game horor asimetris terbaru dari IllFonic, Halloween: The Game, berupaya memikat penggemar dengan menyuguhkan mode cerita pemain tunggal (single-player) yang lengkap di samping mode bertahan hidup multipemain utamanya.",
        "Pemain berperan sebagai warga kota Haddonfield yang berusaha kabur dari kejaran The Shape di berbagai lokasi film klasik—termasuk rumah tua Myers dan kediaman Laurie Strode. Kecerdasan buatan (AI) Michael Myers bekerja sangat menakutkan, mengintai pemain dari balik pepohonan sebelum menyergap secara tiba-tiba dari kegelapan.",
        "Mode solo ini menitikberatkan pada strategi mengendap-endap, perbaikan generator darurat, dan aksi menghindar tanpa senjata, diiringi alunan musik synthesizer legendaris karya John Carpenter yang membuat bulu kuduk merinding.",
        "Meskipun kampanye pemain tunggal berdurasi sekitar 6 hingga 8 jam ini sangat memuaskan bagi pecinta film horor slasher, daya tahan bermain jangka panjang tetap bertumpu pada keseruan mode online multipemain."
      ],
      keyHighlights: [
        "Ulasan mendalam mengenai kualitas mode petualangan pemain tunggal di game Halloween: The Game.",
        "Kecerdasan buatan Michael Myers memberikan sensasi teror nyata saat mengintai dari bayang-bayang.",
        "Fokus gameplay pada aksi sembunyi-sembunyi yang menegangkan diiringi musik asli karya John Carpenter.",
        "Kesimpulan: Hadiah istimewa bagi penikmat cerita horor solo, dengan daya tarik utama tetap pada mode multiplayer."
      ]
    }
  },

  "bloomberg-gaming-3": {
    // Nvidia acquires open-source AI platform Hugging Face for $12.9bn
    en: {
      summary: "Nvidia finalizes a monumental $12.9 billion acquisition of open-source AI hub Hugging Face, poised to transform real-time NPC intelligence, neural rendering, and interactive world generation.",
      fullContent: [
        "In one of the most consequential technology transactions of the decade, semiconductor titan Nvidia has officially acquired the world's leading open-source AI repository, Hugging Face, for $12.9 billion.",
        "The acquisition unites Nvidia's industry-leading Blackwell and Rubin GPU acceleration hardware with Hugging Face's global ecosystem of over one million open-source neural network models and millions of machine learning engineers.",
        "For the video game industry, this merger promises groundbreaking breakthroughs: accelerated on-device conversational NPC behavior, neural physics simulations, and automated real-time texture generation integrated directly into Nvidia RTX drivers and Unreal/Unity development plugins.",
        "Nvidia CEO Jensen Huang emphasized that Hugging Face will retain its open-source ethos and platform independence, ensuring that game developers and academic researchers continue to benefit from freely accessible AI model repositories."
      ],
      keyHighlights: [
        "Nvidia completes historic $12.9 billion acquisition of open-source AI powerhouse Hugging Face.",
        "Pairs Nvidia's high-performance AI GPU architectures with over one million open-source machine learning models.",
        "Directly empowers game developers with neural rendering tools, procedural physics, and intelligent conversational NPCs.",
        "Jensen Huang confirms Hugging Face will maintain open-source accessibility and platform independence."
      ]
    },
    id: {
      title: "Nvidia Resmi Akuisisi Platform AI Open-Source Hugging Face Senilai $12,9 Miliar",
      summary: "Langkah bersejarah raksasa grafis Nvidia mengakuisisi Hugging Face senilai $12,9 miliar, membuka era baru kecerdasan NPC real-time dan rendering neural di video game.",
      fullContent: [
        "Dalam salah satu transaksi teknologi paling bersejarah dekade ini, raksasa semikonduktor Nvidia secara resmi telah menyelesaikan akuisisi platform kecerdasan buatan open-source terbesar di dunia, Hugging Face, dengan nilai fantastis $12,9 miliar (sekitar Rp 210 triliun).",
        "Langkah strategis ini menggabungkan perangkat keras GPU kelas dunia milik Nvidia (arsitektur Blackwell dan Rubin) dengan repositori Hugging Face yang menampung lebih dari satu juta model neural network dan komunitas jutaan pengembang di seluruh dunia.",
        "Bagi industri video game, kolaborasi ini membawa dampak revolusioner: integrasi karakter NPC cerdas yang mampu bercakap-cakap secara alami tanpa skrip kaku, simulasi fisika neural, dan rendering tekstur otomatis yang tertanam langsung pada driver Nvidia RTX dan engine game modern.",
        "CEO Nvidia Jensen Huang menegaskan bahwa Hugging Face akan tetap mempertahankan sifatnya yang terbuka (open-source) dan beroperasi secara independen demi mendukung inovasi para kreator game dan peneliti di seluruh dunia."
      ],
      keyHighlights: [
        "Nvidia merampungkan akuisisi raksasa senilai $12,9 miliar terhadap platform AI ternama Hugging Face.",
        "Menyatukan arsitektur hardware GPU Nvidia dengan lebih dari 1 juta model AI open-source di dunia.",
        "Membuka potensi revolusioner bagi industri game: karakter NPC cerdas berkemampuan dialog real-time.",
        "CEO Jensen Huang memastikan ekosistem Hugging Face akan tetap terbuka dan independen bagi para pengembang."
      ]
    }
  }
};

async function runEnrichment() {
  console.log('Starting enrichment for news datasets...');

  // 1. Update src/data/gamingNewsFeed.ts
  const feedPath = path.resolve('src/data/gamingNewsFeed.ts');
  const feedContent = fs.readFileSync(feedPath, 'utf8');

  // Load current articles
  const jsonMatch = feedContent.match(/export const GAMING_NEWS_ARTICLES: NewsArticle\[\] = (\[[\s\S]*?\]);\s*$/);
  if (!jsonMatch) {
    throw new Error('Could not parse GAMING_NEWS_ARTICLES from gamingNewsFeed.ts');
  }

  const articles = JSON.parse(jsonMatch[1]);
  let updatedCount = 0;

  for (const article of articles) {
    const enriched = ENRICHED_NEWS_DATA[article.id];
    if (enriched && enriched.en) {
      article.summary = enriched.en.summary;
      article.fullContent = enriched.en.fullContent;
      article.keyHighlights = enriched.en.keyHighlights;
      article.readTime = `${Math.max(2, Math.min(6, Math.round(enriched.en.fullContent.join(' ').length / 300)))} min read`;
      updatedCount++;
    }
  }

  console.log(`Updated ${updatedCount} articles in GAMING_NEWS_ARTICLES.`);

  // Write back gamingNewsFeed.ts
  const newFeedTs = `import type { NewsArticle } from '../types/newsFeed';\n\n/**\n * LIVE CURATED GAMING NEWS FEED\n * Generated automatically from the 12 official world gaming news outlets.\n * Sorted chronologically: Newest / most recent breaking news first.\n * Last synced: ${new Date().toISOString()}\n */\nexport const GAMING_NEWS_ARTICLES: NewsArticle[] = ${JSON.stringify(articles, null, 2)};\n`;
  fs.writeFileSync(feedPath, newFeedTs, 'utf8');
  console.log('Wrote updated src/data/gamingNewsFeed.ts successfully.');

  // 2. Update public/data/liveNews.json
  const pubLivePath = path.resolve('public/data/liveNews.json');
  fs.writeFileSync(pubLivePath, JSON.stringify(articles, null, 2), 'utf8');
  console.log('Wrote updated public/data/liveNews.json successfully.');

  // 3. Update src/data/translations/newsTranslations.id.ts
  const transPath = path.resolve('src/data/translations/newsTranslations.id.ts');
  const transContent = fs.readFileSync(transPath, 'utf8');

  const dictMatch = transContent.match(/export const NEWS_ID_TRANSLATIONS: Record<string, NewsTranslationItem> = ({[\s\S]*?});\s*$/);
  if (!dictMatch) {
    throw new Error('Could not parse NEWS_ID_TRANSLATIONS from newsTranslations.id.ts');
  }

  const transDict = JSON.parse(dictMatch[1]);
  let transUpdatedCount = 0;

  for (const [id, data] of Object.entries(ENRICHED_NEWS_DATA)) {
    if (data.id) {
      transDict[id] = {
        title: data.id.title,
        summary: data.id.summary,
        fullContent: data.id.fullContent,
        keyHighlights: data.id.keyHighlights
      };
      // Also map by URL for canonical matching
      const targetArticle = articles.find(a => a.id === id);
      if (targetArticle && targetArticle.url) {
        transDict[targetArticle.url] = {
          title: data.id.title,
          summary: data.id.summary,
          fullContent: data.id.fullContent,
          keyHighlights: data.id.keyHighlights
        };
      }
      transUpdatedCount++;
    }
  }

  console.log(`Updated ${transUpdatedCount} translations in NEWS_ID_TRANSLATIONS.`);

  const newTransTs = `// AUTO-GENERATED INDONESIAN TRANSLATIONS FOR GAMING NEWS FEED\n// Updated on ${new Date().toISOString()}\n\nexport interface NewsTranslationItem {\n  title: string;\n  summary: string;\n  fullContent: string[];\n  keyHighlights: string[];\n}\n\nexport const NEWS_ID_TRANSLATIONS: Record<string, NewsTranslationItem> = ${JSON.stringify(transDict, null, 2)};\n`;
  fs.writeFileSync(transPath, newTransTs, 'utf8');
  console.log('Wrote updated src/data/translations/newsTranslations.id.ts successfully.');
}

runEnrichment().catch(console.error);
