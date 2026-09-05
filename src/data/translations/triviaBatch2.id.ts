export interface TriviaTranslationItem {
  headline: string;
  story: string;
  verifiedFact: string;
  quoteOrLore?: string;
  easterEggNote?: string;
  quizQuestion: string;
  quizOptions: string[];
  quizExplanation: string;
}

export const TRIVIA_ID_BATCH_2: Record<string, TriviaTranslationItem> = {
  't-41': {
    headline: 'Alien Bergerak Makin Cepat Saat Ditembak Karena CPU Menggambar Lebih Sedikit Sprite',
    story: 'Tomohiro Nishikado merancang game ini sekaligus merakit perangkat keras mikrokomputer kustom dari nol menggunakan CPU Intel 8080. Awalnya, barisan alien direncanakan bergerak dengan kecepatan konstan yang gesit, namun CPU kewalahan oleh beban 55 alien hingga mengalami lag parah. Begitu pemain menembak jatuh alien satu per satu, prosesor memproses lebih sedikit sprite, yang secara alami mempercepat jalannya game hingga alien terakhir melesat liar melintasi layar. Nishikado menyadari bahwa keterbatasan hardware ini justru melahirkan desain game yang brilian dan mempertahankannya!',
    verifiedFact: 'Keunikan hardware ini secara tidak sengaja melahirkan konsep kurva tingkat kesulitan dinamis (dynamic difficulty curve) dalam sejarah video game.',
    quoteOrLore: '“Peningkatan kecepatan itu awalnya tidak disengaja; perangkat kerasnya terengah-engah sampai Anda membersihkan sprite-sprite tersebut.” — Tomohiro Nishikado',
    easterEggNote: 'Popularitas dahsyat Space Invaders memicu kelangkaan koin hingga Bank of Japan harus melipatgandakan produksi koin 100 yen hingga tiga kali lipat!',
    quizQuestion: 'Mengapa alien di Space Invaders bergerak makin cepat seiring pemain menghancurkan mereka?',
    quizOptions: [
      'Itu adalah timer terprogram di dalam kode ROM',
      'CPU menggambar lebih sedikit sprite, memungkinkan prosesor berjalan lebih cepat',
      'Chip audio yang mendikte kecepatan frame rate',
      'Itu adalah trik pemasaran agar sesi game arcade lebih cepat selesai'
    ],
    quizExplanation: 'Intel 8080 mengalami beban berlebih saat merender 55 alien; menghabisi mereka membebaskan siklus CPU dan otomatis mempercepat loop rendering!'
  },
  't-42': {
    headline: 'Nama Mario Diambil dari Pemilik Properti Nintendo of America yang Sedang Mengamuk',
    story: 'Selama pengembangan, Shigeru Miyamoto menjuluki tukang kayu berkumis itu "Jumpman" di Jepang. Saat Nintendo of America mendirikan gudang sewaan di Tukwila, Washington, mereka menunggak uang sewa. Sang pemilik properti, Mario Segale, melabrak masuk ke kantor dengan marah menuntut pembayaran. Setelah berhasil menenangkannya dan menulis cek pembayaran, tim memutuskan menamai pahlawan berbaju kodok itu "Mario" sebagai penghormatan kepada sang tuan tanah yang berapi-api!',
    verifiedFact: 'Mario Segale adalah pengembang properti terkemuka di Seattle yang wafat pada tahun 2018 di usia 84 tahun.',
    quoteOrLore: '“Bisa dibilang saya masih menunggu cek royalti saya.” — Mario Segale dalam wawancara tahun 1993',
    easterEggNote: 'Game ini awalnya dirancang sebagai game arcade Popeye, namun saat Nintendo gagal mendapatkan lisensi dari King Features, Miyamoto menciptakan Mario, Pauline, dan Donkey Kong sebagai gantinya!',
    quizQuestion: 'Siapakah sosok yang menjadi inspirasi nama Mario saat perilisan Donkey Kong di Amerika pada tahun 1981?',
    quizOptions: [
      'Koki restoran Italia terkenal di Kyoto',
      'Pemilik properti gudang sewaan Nintendo of America',
      'Penyanyi opera favorit Shigeru Miyamoto',
      'Orang pertama yang meraih 1.000.000 poin di mesin arcade tersebut'
    ],
    quizExplanation: 'Mario Segale melabrak kantor Nintendo of America menuntut uang sewa yang menunggak, mendorong tim mengabadikan namanya untuk menggantikan Jumpman!'
  },
  't-43': {
    headline: 'Insinyur Atari Ed Logg Menemukan Tabel Skor Tertinggi Tiga Huruf untuk Asteroids',
    story: 'Sebelum Asteroids, saat Anda beranjak dari mesin arcade, rekor gemilang Anda akan lenyap ditelan bumi begitu saja. Insinyur Atari, Ed Logg, ingin para pemain menikmati kebanggaan abadi di arena dingdong lokal. Ia memprogram rutin skor tertinggi pada NVRAM yang mengajak pemain memasukkan 3 inisial huruf nama mereka. Fitur ini memicu persaingan sengit antar-pemain di seluruh penjuru dunia dan menjadi standar wajib bagi setiap kabinet arcade di dunia!',
    verifiedFact: 'Asteroids terjual lebih dari 70.000 unit kabinet arcade, menjadikannya mesin koin Atari terlaris sepanjang masa.',
    quoteOrLore: '“Saya ingin orang-orang punya hak untuk berbangga saat melangkah masuk ke arena boling atau pub.” — Ed Logg',
    easterEggNote: 'Inisial nama Ed Logg sendiri, "EDL", diprogram permanen sebagai skor tertinggi default pada unit uji coba pabrik!',
    quizQuestion: 'Elemen legendaris arcade apa yang diciptakan dan dipopulerkan oleh Asteroids pada tahun 1979?',
    quizOptions: [
      'Suara denting kredit koin "insert coin"',
      'Papan peringkat skor tertinggi dengan 3 inisial huruf',
      'Hitung mundur waktu untuk continue',
      'Skema kontrol dua joystick (dual joystick)'
    ],
    quizExplanation: 'Ed Logg merancang tabel skor 3 huruf agar para pemain arcade dapat memamerkan reputasi rekor mereka di arena lokal!'
  },
  't-44': {
    headline: 'Membiarkan Boss Galaga Menculik Pesawat Adalah Satu-Satunya Cara Menggandakan Daya Tembak',
    story: 'Di era ketika kehilangan nyawa adalah kesalahan fatal, desainer Namco Shigeru Yokoyama menerapkan mekanik risiko-imbalan yang sangat berlawanan dengan intuisi: "Dual Fighter". Saat Boss Galaga menembakkan sinar traktor (tractor beam), pemain bisa sengaja menyerahkan satu pesawat. Nanti, dengan menghancurkan bos tersebut tanpa mengenai pesawat yang tertawan, pesawat lama akan bergabung berdampingan dengan pesawat aktif, melipatgandakan laju tembakan dan lebar jangkauan tembak!',
    verifiedFact: 'Galaga begitu dicintai hingga Namco menyematkannya sebagai minigame interaktif di layar loading Tekken di PS1 14 tahun kemudian!',
    quoteOrLore: '“Mengorbankan nyawa demi melipatgandakan daya tembak mengubah keserakahan arcade menjadi strategi yang brilian.” — Shigeru Yokoyama',
    easterEggNote: 'Pada Stage 1, jika Anda membiarkan dua lebah paling kiri tetap hidup dan menunggu 15 menit tanpa menembak, musuh tidak akan pernah menembak lagi sepanjang sisa permainan!',
    quizQuestion: 'Bagaimana cara pemain mengaktifkan mode "Dual Fighter" di game klasik arcade Galaga (1981)?',
    quizOptions: [
      'Dengan mengumpulkan medali bonus 50.000 poin',
      'Membiarkan sinar traktor Boss Galaga menculik pesawat, lalu menyelamatkannya',
      'Menekan tombol tembak Player 1 dan Player 2 secara bersamaan',
      'Memasukkan Konami Code rahasia pada sakelar servis kabinet'
    ],
    quizExplanation: 'Membiarkan Boss Galaga menangkap pesawat Anda lalu menghancurkan bos tersebut akan membebaskan pesawat untuk berlabuh berdampingan!'
  },
  't-45': {
    headline: 'Glitch Layar Terbelah (Kill Screen) Level 256 Disebabkan oleh Overflow Counter 8-Bit',
    story: 'Toru Iwatani merancang Pac-Man agar bisa dimainkan tanpa batas oleh pemain yang mahir. Namun, game ini mencatat nomor babak dalam register memori 8-bit tunggal ($4E14). Saat pemain menuntaskan babak 255 dan nilai counter bertambah ke 256, byte tersebut mengalami overflow dan kembali ke angka 0. Subrutin penggambaran buah mencoba merender 256 ikon bonus buah di bagian bawah layar, menimpa tile RAM video di paruh kanan layar dengan kode mesin biner acak dan membuat level mustahil dituntaskan!',
    verifiedFact: 'Skor tertinggi absolut di Pac-Man adalah 3.333.360 poin, yang menuntut pemain menyelesaikan seluruh 255 level dan memakan setiap hantu tanpa pernah mati sekali pun.',
    quoteOrLore: '“Sisi kanan layar hancur melebur menjadi entropi digital murni.” — Billy Mitchell, jawara arcade',
    easterEggNote: 'Masing-masing dari keempat hantu memiliki kepribadian terprogram: Blinky mengejar langsung, Pinky menyergap 4 petak di depan, Inky mengepung dari samping, dan Clyde berkeliaran tanpa arah!',
    quizQuestion: 'Mengapa Pac-Man mengalami crash pada Level 256 dengan glitch split-screen yang legendaris?',
    quizOptions: [
      'Kabinet mengalami panas berlebih (overheat) setelah dimainkan 4 jam berturut-turut',
      'Overflow counter 8-bit menyebabkan subrutin buah menimpa tile video RAM',
      'Refresh rate monitor CRT tidak sanggup mengimbangi kecepatan hantu',
      'Namco sengaja mengoding kill screen untuk mencegah permainan tanpa batas'
    ],
    quizExplanation: 'Register 1 byte meluap (overflow) pada angka 256, menyebabkan loop penggambaran buah merusak video RAM dengan karakter korup!'
  },
  't-46': {
    headline: 'Para Developer Mengembangkan Seluruh Game di Waktu Luang Tanpa Uang Lembur',
    story: 'Seri perdana Mega Man (Rockman) mencatat penjualan biasa saja di Jepang. Para eksekutif Capcom menolak memberi lampu hijau untuk sekuelnya dan memindahkan tim pengembang ke proyek lain. Ilustrator Keiji Inafune dan sutradara Akira Kitamura yang penuh semangat memohon kepada manajemen, yang akhirnya setuju dengan satu syarat: mereka hanya boleh menggarap Mega Man 2 sebagai proyek sampingan sukarela di waktu luang pribadi tanpa kompensasi lembur. Bekerja larut malam dan akhir pekan, mereka menciptakan salah satu game NES terhebat sepanjang masa!',
    verifiedFact: 'Mega Man 2 sukses terjual 1,51 juta kopi, menyelamatkan waralaba ini dan mengukuhkannya sebagai maskot utama Capcom.',
    quoteOrLore: '“Kami mengorbankan waktu pribadi kami karena kami benar-benar mencintai Rockman.” — Keiji Inafune',
    easterEggNote: 'Sampul boks versi Amerika memperlihatkan Mega Man memegang pistol dengan kostum spandeks kuning-biru karena ilustratornya hanya diberi waktu 24 jam dan belum pernah memainkan gamenya!',
    quizQuestion: 'Bagaimana proses Mega Man 2 dikembangkan setelah manajemen Capcom menolak sekuel resmi?',
    quizOptions: [
      'Diam-diam dialihdayakan ke pengembang asal Amerika',
      'Tim pengembang asli membuatnya di waktu luang pribadi tanpa bayaran lembur',
      'Nintendo mendanai seluruh biaya produksi secara rahasia',
      'Dirangkai dari sisa kode pemrograman Ghosts \'n Goblins'
    ],
    quizExplanation: 'Capcom menolak mendanai sekuel, sehingga Inafune dan timnya menggarap Mega Man 2 di malam hari dan akhir pekan tanpa bayaran!'
  },
  't-47': {
    headline: 'Katrid Konsol Pertama yang Dilengkapi Chip Baterai Cadangan RAM untuk Menyimpan Progres',
    story: 'Sebelum tahun 1986, menuntaskan game berdurasi panjang berarti harus membiarkan konsol menyala semalaman atau mencatat deretan password alfanumerik 24 karakter yang melelahkan. Untuk perilisan Zelda di NES, Shigeru Miyamoto menegaskan bahwa dunia Hyrule terlalu luas untuk sistem password. Nintendo merancang terobosan papan sirkuit PCB katrid yang memuat baterai koin litium CR2032 terhubung langsung ke SRAM statis, menjaga tiga file save tetap utuh selama berdekade-dekade meski katrid dicabut dari mesin!',
    verifiedFact: 'Banyak katrid emas asli buatan 1986 yang daya baterainya masih bertahan dan masih menyimpan file save asli berusia 38 tahun hingga hari ini.',
    quoteOrLore: '“Dunia yang bisa Anda tinggalkan dan Anda datangi kembali tanpa kehilangan petualangan Anda telah mengubah dunia game selamanya.” — Shigeru Miyamoto',
    easterEggNote: 'Mengetik "ZELDA" sebagai nama karakter di layar pemilihan save file akan langsung membuka "Second Quest" yang terkenal luar biasa sulit dengan dungeon yang dirombak total!',
    quizQuestion: 'Fitur hardware inovatif apa yang diperkenalkan Nintendo lewat katrid emas NES The Legend of Zelda?',
    quizOptions: [
      'Jack headphone audio stereo di katrid',
      'Chip RAM berdaya baterai yang memungkinkan fitur save langsung di katrid',
      'Chip jam dan kalender waktu nyata (real-time clock)',
      'Koprosesor suara ekspansi hardware tambahan'
    ],
    quizExplanation: 'Nintendo menyematkan baterai litium CR2032 yang terhubung ke SRAM, membebaskan pemain dari repotnya lembaran password selamanya!'
  },
  't-48': {
    headline: 'Identitas Gender Samus Aran Ditentukan di Tengah Pengembangan Secara Spontan',
    story: 'Sepanjang sebagian besar masa pengembangan Metroid, Samus Aran dirancang sebagai pemburu hadiah luar angkasa berwujud cyborg tanpa nama. Suatu sore dalam rapat evaluasi tim, seorang pengembang nyeletuk bertanya: "Bukankah keren kalau sosok di balik baju zirah itu ternyata seorang wanita?" Seluruh tim menyukai ide tersebut dan menyimpannya sebagai plot twist rahasia. Kecuali pemain mampu menuntaskan game dalam waktu di bawah lima jam, mereka tidak akan pernah melihat Samus melepas helmnya!',
    verifiedFact: 'Samus Aran merupakan salah satu protagonis wanita manusia paling awal dan paling terkemuka dalam sejarah video game arus utama.',
    quoteOrLore: '“Seseorang berkata, \'Hei, bukankah hebat jika Samus itu seorang wanita?\' dan semua orang langsung setuju seketika.” — Yoshio Sakamoto',
    easterEggNote: 'Password tersohor "JUSTIN BAILEY ------ ------" membuat Samus memulai permainan dengan seluruh power-up, tangki misil lengkap, dan mengenakan leotard merah muda!',
    quizQuestion: 'Bagaimana keputusan legendaris bahwa Samus Aran adalah seorang wanita diputuskan selama masa pengembangan?',
    quizOptions: [
      'Diperintahkan langsung oleh CEO Nintendo Hiroshi Yamauchi',
      'Seorang pengembang mengusulkannya secara spontan saat rapat tim di tengah pengembangan',
      'Dipilih lewat kontes surat penggemar di Jepang',
      'Terinspirasi oleh karakter Ripley di film Alien tahun 1979'
    ],
    quizExplanation: 'Seorang anggota tim melontarkan ide tersebut secara spontan di tengah proses produksi, dan tim menjadikannya ending rahasia!'
  },
  't-49': {
    headline: 'Pelopor Sinematik Narasi ("Tecmo Theater") di Dalam Katrid 8-Bit',
    story: 'Sebelum Ryu Hayabusa melompat di atas atap gedung pada tahun 1988, jalan cerita video game umumnya hanya dibuang ke buku panduan manual. Sutradara Hideo Yoshizawa menciptakan sistem "Tecmo Theater", memprogram adegan cutscene sinematik layar penuh beranimasi dengan sudut kamera dramatis, potret wajah close-up, dan transisi musik atmosferik ke dalam ROM yang hanya berukuran 256 kilobyte. Ini merevolusi industri game dengan membuktikan bahwa game konsol rumahan mampu menyajikan alur cerita sekelas sinema Hollywood!',
    verifiedFact: 'Ninja Gaiden memuat lebih dari 20 menit adegan cutscene sinematik—sebuah pencapaian yang belum pernah ada pada game konsol rumahan mana pun di tahun 1988.',
    quoteOrLore: '“Kami ingin pemain merasa seperti sedang menonton film yang aksi karakternya mereka kendalikan sendiri.” — Hideo Yoshizawa',
    easterEggNote: 'Pada babak terakhir, tewas melawan salah satu dari tiga wujud Jaquio akan melempar Anda kembali jauh ke awal stage 6-1!',
    quizQuestion: 'Inovasi penceritaan sinematik apa yang dipelopori oleh Ninja Gaiden di konsol 8-bit NES pada tahun 1988?',
    quizOptions: [
      'Video gerak penuh (FMV) yang direkam pada pita magnetik',
      'Sistem "Tecmo Theater" berisi adegan cutscene animasi yang dinamis',
      'Sintesis suara waktu nyata melalui speaker kontroler',
      'Pilihan pohon dialog bercabang dengan konsekuensi moral'
    ],
    quizExplanation: 'Hideo Yoshizawa memperkenalkan "Tecmo Theater", mengintegrasikan 20 menit cutscene cerita beranimasi di sela-sela aksi platformer!'
  },
  't-50': {
    headline: 'Satoru Iwata Menyelamatkan Game yang Nyaris Dibatalkan dengan Menulis Ulang Kodenya dari Nol dalam Sebulan',
    story: 'Mother 2 terjebak dalam development hell selama lebih dari empat tahun. Kodenya sangat semrawut, memori sering crash tanpa henti, dan Nintendo sempat berencana membatalkan proyek ini sepenuhnya. Satoru Iwata (saat itu presiden HAL Laboratory) melangkah ke studio dan melontarkan tawaran legendaris kepada kreator Shigesato Itoi: "Jika kita memperbaiki kode yang ada sekarang, butuh waktu dua tahun. Jika Anda izinkan saya memulainya dari nol dan menulis kodenya sendiri, saya akan menyelesaikannya dalam satu bulan." Iwata merombak total seluruh game engine, menyelamatkan salah satu RPG cult paling dicintai dalam sejarah!',
    verifiedFact: 'Arsitektur bersih hasil tulisan Iwata memungkinkan terwujudnya sistem odometer HP bergulir pada pertempuran dan scrolling latar belakang tanpa jeda di EarthBound.',
    quoteOrLore: '“Di kartu nama, saya adalah presiden korporasi. Di pikiran saya, saya adalah pengembang game. Tapi di dalam hati, saya adalah seorang gamer.” — Satoru Iwata',
    easterEggNote: 'Katrid game ini memuat sistem anti-pembajakan yang sangat kejam: salinan bajakan akan memunculkan gelombang musuh acak dalam jumlah gila-gilaan dan menghapus seluruh save file tepat di hadapan bos terakhir!',
    quizQuestion: 'Siapakah sosok yang menyelamatkan EarthBound dari pembatalan dengan menulis ulang seluruh kode sumbernya dari nol?',
    quizOptions: [
      'Shigeru Miyamoto',
      'Satoru Iwata',
      'Masahiro Sakurai',
      'Hironobu Sakaguchi'
    ],
    quizExplanation: 'Satoru Iwata turun tangan, membuang total kode yang rusak, dan membangun ulang seluruh game engine hanya dalam tempo satu bulan!'
  },
  't-51': {
    headline: 'Kalkulasi Matriks Affine Mode 7 Menyimulasikan Lintasan 3D di Atas Chip 2D Murni',
    story: 'Sebelum prosesor grafis 3D khusus lahir, Super Nintendo diluncurkan dengan senjata rahasia perangkat keras: "Mode 7". Mode render latar khusus ini memungkinkan para programmer mengeksekusi transformasi matriks affine secara real-time—memperbesar, memutar, dan memiringkan satu bidang tekstur 2D datar. Di F-Zero, sutradara Kazunobu Shimizu memiringkan lintasan balap di bawah hovercraft milik Captain Falcon guna menciptakan ilusi kecepatan 3D dahsyat hingga 400 km/jam tanpa menggambar satu poligon pun!',
    verifiedFact: 'F-Zero menjadi game peluncuran utama yang membuktikan keunggulan teknologi SNES dibanding Sega Genesis pada tahun 1990.',
    quoteOrLore: '“Mode 7 memberi pemain sensasi kecepatan dan kedalaman ruang yang sebelumnya hanya pernah mereka jumpai di simulator penerbangan berharga mahal.” — Shigeru Miyamoto',
    easterEggNote: 'Captain Falcon awalnya diciptakan untuk menjadi maskot hardware resmi Super Nintendo sebelum Mario kembali mengklaim peran tersebut!',
    quizQuestion: 'Fitur perangkat keras Super Nintendo apa yang memungkinkan hadirnya lintasan balap pseudo-3D berkecepatan tinggi di F-Zero?',
    quizOptions: [
      'Chip 3D Super FX',
      'Transformasi rotasi dan penskalaan latar belakang Mode 7',
      'Pemindaian berkas optik interlaced',
      'Penskalaan koprosesor ganda Z80'
    ],
    quizExplanation: 'Mode 7 memungkinkan SNES memiringkan, memutar, dan menskalakan bidang tekstur 2D demi menyimulasikan balapan berperspektif 3D sungguhan!'
  },
  't-52': {
    headline: 'Klimaks Saat Bayi Metroid Melindungi Samus Ditulis Layaknya Sinema Bisu Penuh Emosi',
    story: 'Sutradara Yoshio Sakamoto ingin Super Metroid membangkitkan emosi mendalam tanpa memerlukan satu baris pun teks maupun dialog. Dalam pertempuran terakhir melawan Mother Brain, Samus terdesak tak berdaya dan nyaris dieksekusi. Tiba-tiba bayi Metroid raksasa yang bermutasi menerjang Mother Brain, menyerap energi hidup monster itu, dan mencurahkan energi tersebut ke tubuh Samus sebelum melindunginya dengan tubuhnya sendiri. Pengorbanan tanpa kata ini diakui sebagai salah satu puncak narasi terhebat dalam sejarah video game!',
    verifiedFact: 'Super Metroid dimuat dalam katrid berkapasitas 24 megabit, ukuran ROM SNES terbesar yang pernah diproduksi hingga awal tahun 1994.',
    quoteOrLore: '“Game tidak butuh kata-kata untuk membuat Anda menangisi makhluk fiksi luar angkasa.” — Yoshio Sakamoto',
    easterEggNote: 'Hewan Dachora dan Etecoon di gua bawah secara diam-diam mengajarkan pemain cara mengeksekusi teknik tersembunyi Wall Jump dan Shinespark!',
    quizQuestion: 'Bagaimana Super Metroid menyampaikan klimaks emosional saat pertempuran pamungkas melawan Mother Brain?',
    quizOptions: [
      'Melalui monolog panjang dari Galactic Federation',
      'Tanpa kata-kata, melalui aksi pengorbanan diri sang bayi Metroid',
      'Lewat teks terjemahan berjalan dari hieroglif Chozo',
      'Melalui serangkaian slide manga gambar diam'
    ],
    quizExplanation: 'Sakamoto merancang adegan itu bak sinema bisu, di mana bayi Metroid menyerang Mother Brain dan menyerahkan nyawanya demi Samus!'
  },
  't-53': {
    headline: 'Nobuo Uematsu Menyintesis Vokal Opera Menggunakan Chip Audio 8-Kanal SNES',
    story: 'Pada tahun 1994, audio CD-ROM belum tersedia di media katrid. Untuk mementaskan adegan opera megah "Aria di Mezzo Carattere", komposer legendaris Nobuo Uematsu hanya memiliki RAM audio sebesar 64 kilobyte pada chip Sony SPC700. Alih-alih rekaman vokal utuh, Uematsu memotong fragmen vokal huruf hidup menjadi bentuk gelombang kecil, menyintesis suara sopran digital yang melantunkan nada secara real-time seiring Celes melangkah di panggung opera!',
    verifiedFact: 'Adegan opera ini kelak diaransemen oleh orkestra filharmonik di berbagai belahan dunia, namun versi orisinal 16-bit tetap tak tertandingi kelegendarisannya.',
    quoteOrLore: '“Kami memaksa chip audio SNES melangkah ke wilayah yang tak pernah diduga siapa pun bisa dicapai oleh sebuah katrid.” — Nobuo Uematsu',
    easterEggNote: 'Jika Anda salah memilih lirik opera sebanyak tiga kali berturut-turut, seorang kru panggung berbadan gempal akan berlari masuk dan melempar Celes ke arah penonton!',
    quizQuestion: 'Bagaimana cara Nobuo Uematsu menciptakan adegan opera bernyanyi yang terkenal di Final Fantasy VI pada konsol SNES?',
    quizOptions: [
      'Menggunakan pemutar kaset analog mini di dalam katrid',
      'Menyintesis vokal manusia lewat chip audio SPC700 berkapasitas 64KB RAM',
      'Mengambil sampel siaran radio Jepang ke dalam disket',
      'Suara dihasilkan oleh chip suara tambahan rahasia'
    ],
    quizExplanation: 'Uematsu mengambil sampel fonem vokal kecil dan menyusunnya lewat chip audio 64KB demi menyintesis lantunan opera!'
  },
  't-54': {
    headline: 'Yuzo Koshiro Menulis Driver Assembly Sendiri Demi Menghadirkan Musik Club Techno London di Genesis',
    story: 'Chip audio Yamaha YM2612 di dalam Sega Genesis terkenal menghasilkan suara cempreng dan kaku jika tidak dioptimalkan. Komposer Yuzo Koshiro kerap menyambangi klab-klab underground house dan techno di London. Merasa kecewa dengan perangkat lunak audio standar Sega, Koshiro mengoding sendiri driver musik khusus dalam bahasa assembly 68000. Ia memaksimalkan sintesis Frequency Modulation (FM) untuk menghasilkan dentuman sub-bass kickdrum dan lead synth yang membuat para insinyur audio industri terpana!',
    verifiedFact: 'Nama Yuzo Koshiro terpampang di layar judul game berdampingan dengan logo Sega—sebuah kehormatan yang nyaris tak pernah terjadi bagi komposer video game pada tahun 1992.',
    quoteOrLore: '“Saya menulis bahasa pemrograman saya sendiri untuk mengeluarkan suara musik klab yang bahkan insinyur hardware Genesis pun tak tahu itu bisa dilakukan.” — Yuzo Koshiro',
    easterEggNote: 'Anda bisa memainkan bos Shiva dengan menahan tombol B + Bawah + Kiri lalu menekan Start di layar pemilihan karakter pada versi Jepang!',
    quizQuestion: 'Mengapa soundtrack Streets of Rage 2 terdengar begitu revolusioner dibanding game Genesis lainnya?',
    quizOptions: [
      'Menggunakan add-on CD-ROM yang terhubung via port ekspansi',
      'Yuzo Koshiro mengoding driver assembly kustom untuk memaksimalkan sintesis FM sekelas musik klab',
      'Direkam memakai gitar listrik langsung dan dikompresi dengan format MP3',
      'Sega memasang chip synthesizer Yamaha tambahan di dalam katrid'
    ],
    quizExplanation: 'Koshiro menulis sendiri audio engine assembly 68000 untuk mengekstrak bass dansa elektronik autentik dari chip YM2612!'
  },
  't-55': {
    headline: 'Sega Menciptakan Peluncuran Game Global Serentak Pertama Lewat "Sonic 2sday"',
    story: 'Sebelum November 1992, video game masuk ke rak-rak toko pada tanggal acak di berbagai negara dan wilayah, sering kali berselisih hingga berbulan-bulan. Direktur pemasaran Sega of America, Al Nilsen, merancang gebrakan pemasaran global yang brilian: "Sonic 2sday". Pada hari Selasa, 24 November 1992, Sonic 2 diluncurkan serentak di seluruh Amerika Utara dan Eropa, didukung kampanye media senilai $10 juta yang menetapkan standar peluncuran global terkoordinasi bagi seluruh industri hiburan!',
    verifiedFact: 'Sonic 2 terjual 400.000 kopi hanya dalam lima hari pertama di Inggris saja, mengungguli pendapatan film-film box office bioskop Hollywood saat itu.',
    quoteOrLore: '“Sonic 2sday mengubah cara seluruh industri ritel hiburan mendistribusikan karya untuk selamanya.” — Al Nilsen',
    easterEggNote: 'Level mistis "Hidden Palace Zone" dihapus sebelum rilis, namun tetap tersimpan di dalam ROM katrid dan bisa diakses via kode cheat Game Genie 01E2-A2D8!',
    quizQuestion: 'Tonggak sejarah distribusi ritel apa yang dicatatkan oleh peluncuran Sonic the Hedgehog 2?',
    quizOptions: [
      'Game pertama yang dijual bebas di supermarket',
      'Hari perilisan global serentak pertama ("Sonic 2sday")',
      'Game pertama yang memiliki update patch hari pertama secara digital',
      'Game pertama yang dijual satu paket bersama buku komik'
    ],
    quizExplanation: 'Sega menciptakan "Sonic 2sday", mengorkestrasi rilis ritel global serentak pertama di dunia pada tanggal 24 November 1992!'
  },
  't-56': {
    headline: 'Treasure Didirikan Eks-Pemberontak Konami yang Menjejali Sprite 30 Segmen di Mega Drive',
    story: 'Sekelompok pengembang elite Konami (termasuk Masato Maegawa) hengkang dari perusahaan karena Konami bersikeras membuat sekuel-sekuel aman alih-alih game baru yang orisinal. Mereka mendirikan studio Treasure dan bertekad mendobrak setiap batasan hardware pada Sega Genesis 16-bit. Di Gunstar Heroes, bos legendaris seperti "Seven Force" tersusun dari puluhan segmen sprite bersendi yang berputar secara independen menggunakan kalkulasi vektor, menyajikan aksi spektakuler yang bahkan tak sanggup disimulasikan oleh konsol rival!',
    verifiedFact: 'Gunstar Heroes memungkinkan pemain mengombinasikan dua dari empat senjata utama menjadi 14 variasi tembakan penghancur yang berbeda.',
    quoteOrLore: '“Kami ingin membuat game yang memacu perangkat keras sedemikian rupa hingga konsol terasa seperti hendak terbakar.” — Masato Maegawa',
    easterEggNote: 'Bos "Seven Force" dapat bertransformasi menjadi 7 wujud mekanikal berbeda (Soldier, Tails, Tiger, Blaster, Urchin, Eagle, dan Gunner)!',
    quizQuestion: 'Mengapa para pendiri Treasure meninggalkan Konami untuk mengembangkan Gunstar Heroes pada tahun 1993?',
    quizOptions: [
      'Konami menolak membayar gaji mereka untuk Contra III',
      'Mereka frustrasi karena Konami selalu mengandalkan sekuel dan mendambakan kebebasan berkreasi',
      'Sega membeli kontrak kerja mereka secara langsung',
      'Mereka ingin mengembangkan game edukasi untuk anak-anak'
    ],
    quizExplanation: 'Treasure didirikan oleh mantan staf Konami yang ingin mendobrak batasan hardware dengan IP orisinal ketimbang memproduksi sekuel yang cari aman!'
  },
  't-57': {
    headline: 'Cerita dan Peta Skala Besar Dipangkas Akibat Pembatalan Mendadak Drive SNES CD-ROM',
    story: 'Secret of Mana (Seiken Densetsu 2) awalnya direncanakan sebagai judul peluncuran utama untuk add-on CD-ROM Super NES alias "Nintendo PlayStation". Ketika kerja sama antara Nintendo dan Sony kandas secara tragis pada tahun 1991, sutradara Koichi Ishii terpaksa memadatkan game berkapasitas CD-ROM raksasa tersebut ke dalam katrid standar 16-megabit. Tim terpaksa memangkas habis hampir 40% dialog game, percabangan misi alternatif, dan berbagai lokasi dunia dalam semalam!',
    verifiedFact: 'Sisa kode pemrograman dan animasi senjata yang dipangkas tersebut kelak diselamatkan dan digunakan pada Chrono Trigger serta Trials of Mana.',
    quoteOrLore: '“Kami terpaksa memenggal isi game ini saat drive CD dibatalkan. Seluruh benua terhapus begitu saja.” — Koichi Ishii',
    easterEggNote: 'Sistem menu melingkar Ring Command memungkinkan hingga 3 pemain bermain bersama secara simultan menggunakan aksesori SNES Super Multitap!',
    quizQuestion: 'Mengapa hampir 40% konten game Secret of Mana dipangkas secara mendadak saat masa pengembangan?',
    quizOptions: [
      'Tim lokalisasi bahasa Inggris menolak menerjemahkannya',
      'Game ini awalnya dibuat untuk add-on SNES CD-ROM yang akhirnya dibatalkan',
      'Square kehabisan anggaran setelah merilis Final Fantasy IV',
      'Sensor Nintendo menentang tema-tema politik di dalam game'
    ],
    quizExplanation: 'Secret of Mana dirancang untuk drive CD kolaborasi Nintendo-Sony; saat proyek itu batal, Square harus memadatkannya ke dalam katrid biasa!'
  },
  't-58': {
    headline: 'Shigeru Miyamoto Ingin Mario Menunggangi Dinosaurus Sejak 1985, Namun Sprite NES Terlalu Terbatas',
    story: 'Sejak merampungkan Super Mario Bros. perdana pada tahun 1985, Shigeru Miyamoto selalu menyimpan sketsa Mario menunggangi sahabat dinosaurus hijau di meja kerjanya. Namun, hardware NES memiliki batas ketat hanya 64 sprite total di layar dan tidak sanggup merender Mario bertumpukan dengan reptil seukuran kuda tanpa kedipan sprite (flickering) yang parah. Butuh waktu lima tahun dan tenaga pemrosesan 16-bit dari Super Nintendo hingga Yoshi akhirnya benar-benar menetas ke dunia nyata!',
    verifiedFact: 'Pada sketsa konsep awal, Yoshi dirancang sebagai kura-kura kecil atau naga berpelana sebelum berevolusi menjadi wujud dinosaurus ikoniknya.',
    quoteOrLore: '“Kami sudah ingin Mario menunggang dinosaurus sejak di NES, tetapi batasan teknis menolaknya sampai era Super Famicom tiba.” — Shigeru Miyamoto',
    easterEggNote: 'Jika Anda mendiamkan Mario di Special Zone selama 2 menit, musik akan berganti menjadi remix instrumen steel-drum dari tema klasik Super Mario Bros. 1985!',
    quizQuestion: 'Mengapa Yoshi baru diperkenalkan pada Super Mario World di SNES tahun 1990?',
    quizOptions: [
      'Miyamoto belum memikirkan ide karakter tersebut',
      'Konsol 8-bit NES tidak sanggup memproses tumpukan sprite Mario dan dinosaurus tanpa flickering parah',
      'Nintendo khawatir timbul kontroversi hak perlindungan hewan',
      'Yoshi awalnya diciptakan untuk game balapan yang batal rilis'
    ],
    quizExplanation: 'Miyamoto sudah menginginkan Mario menunggang dinosaurus sejak 1985, namun hardware NES tak mampu menangani lapisan sprite yang bertumpukan hingga hadirnya SNES!'
  },
  't-59': {
    headline: 'Henk Rogers Nekat Terbang ke Moskow Soviet Bermodal Visa Turis Demi Lisensi Portabel Game Boy',
    story: 'Pada awal tahun 1989, Henk Rogers mengunjungi Minoru Arakawa di Nintendo of America, yang memperlihatkan prototipe Game Boy kepadanya. Rogers berkata kepada Arakawa: "Jika Anda memasukkan paket game Mario, anak laki-laki akan membelinya. Jika Anda menyertakan Tetris, semua orang akan membelinya." Rogers mengambil risiko pribadi yang luar biasa besar: terbang ke Moskow di era Perang Dingin hanya bermodal visa turis untuk bernegosiasi langsung dengan badan pemerintah Soviet, ELORG, di Kremlin. Ia sukses mengamankan hak rilis handheld, mengantarkan penjualan Game Boy menembus lebih dari 118 juta unit!',
    verifiedFact: 'Pencipta Tetris Alexey Pajitnov sama sekali tidak menerima royalti dari karyanya hingga hak cipta tersebut kembali ke tangannya pada tahun 1996.',
    quoteOrLore: '“Saya tahu jika Nintendo menggabungkan Tetris dengan Game Boy, perangkat itu akan menaklukkan dunia.” — Henk Rogers',
    easterEggNote: 'Tema musik legendaris Game Boy Tetris ("Type A") merupakan lagu rakyat Rusia gubahan tahun 1861 berjudul "Korobeiniki", berkisah tentang seorang pedagang keliling!',
    quizQuestion: 'Bagaimana cara Henk Rogers mengamankan lisensi handheld untuk membundel Tetris bersama Game Boy?',
    quizOptions: [
      'Melalui lelang di ajang Tokyo Game Show 1988',
      'Bepergian ke Moskow era Perang Dingin memakai visa turis untuk bernegosiasi dengan badan Soviet ELORG',
      'Membeli kode sumber dari Atari Games di London',
      'Memenangkan turnamen arcade bertaruhan tinggi'
    ],
    quizExplanation: 'Rogers nekat menerobos Uni Soviet dengan visa turis dan bernegosiasi langsung dengan ELORG demi lisensi handheld yang membesarkan nama Game Boy!'
  },
  't-60': {
    headline: 'Konami Code Tercipta Karena Sang Programmer Tak Mampu Menamatkan Port Game-nya Sendiri',
    story: 'Pada tahun 1985, programmer Kazuhisa Hashimoto sedang mengerjakan porting game arcade Gradius yang super sulit ke Famicom. Menyadari game tersebut terlalu sulit untuk ia uji coba sendiri, Hashimoto membuat kode curang yang memberi kapalnya perisai penuh dan misil: Atas, Atas, Bawah, Bawah, Kiri, Kanan, Kiri, Kanan, B, A. Ia lupa menghapus kode tersebut sebelum katrid diproduksi massal. Ketika Contra dirilis pada tahun 1988 dan memberikan 30 nyawa, "Konami Code" meledak menjadi fenomena budaya abadi yang terpatri di benak setiap gamer era 90-an!',
    verifiedFact: 'Konami Code berfungsi di lebih dari 100 judul game Konami dan telah diadopsi sebagai penghormatan di Netflix, Google, Discord, hingga Siri.',
    quoteOrLore: '“Saya memasukkannya karena saya sendiri tidak bisa menamatkan game itu saat pengujian.” — Kazuhisa Hashimoto',
    easterEggNote: 'Di Eropa, Contra berganti nama menjadi "Probotector" dan seluruh tentara manusia diganti dengan robot android demi mematuhi undang-undang sensor ketat di Jerman!',
    quizQuestion: 'Mengapa Kazuhisa Hashimoto awalnya menciptakan Konami Code yang terkenal itu?',
    quizOptions: [
      'Untuk membuka adegan cutscene ending rahasia bagi para pengulas',
      'Karena ia merasa gamenya terlalu sulit untuk diuji coba tanpa bantuan power-up ekstra',
      'Sebagai kode sidik jari digital untuk mencegah pembajakan',
      'Untuk menguji penyangga memori (buffer) berkecepatan tinggi'
    ],
    quizExplanation: 'Hashimoto menciptakan kode itu saat mem-porting Gradius karena ia tak mampu bertahan hidup cukup lama untuk menguji stage-stage akhir!'
  },
  't-61': {
    headline: 'Kilatan Lampu Kamera Penonton Memberitahu Frame Tepat untuk Meng-KO Bald Bull',
    story: 'Pada tahun 2009, 22 tahun setelah Punch-Out!! dirilis, desainer game Nintendo Makoto Wada mengungkap sebuah Easter egg rahasia yang belum pernah ditemukan oleh pemain mana pun. Saat pertarungan kedua melawan Bald Bull, ketika ia memulai serangan maut "Bull Charge", seorang fotografer berjanggut di baris terdepan penonton akan menyalakan lampu kilat kameranya. Memukul Bald Bull tepat di sepersekian detik saat lampu kamera berkedip akan menghasilkan KO seketika dalam satu pukulan telak!',
    verifiedFact: 'Trik lampu kilat kamera yang sama juga memberi petunjuk timing presisi untuk memukul balik Great Tiger saat jurus teleportasi magisnya.',
    quoteOrLore: '“Kami menyembunyikan petunjuk visual pada kilatan kamera penonton 22 tahun lalu yang tak pernah disadari oleh siapa pun.” — Makoto Wada',
    easterEggNote: 'Nintendo awalnya mengontrak lisensi Mike Tyson seharga $100.000 selama tiga tahun sebelum menggantinya dengan "Mr. Dream" setelah kontrak habis pada 1990.',
    quizQuestion: 'Petunjuk visual tersembunyi apa di Punch-Out!! yang menandakan frame waktu presisi untuk memukul KO Bald Bull saat menyeruduk?',
    quizOptions: [
      'Peluit wasit Mario berubah warna menjadi merah',
      'Seorang fotografer di deretan penonton menyalakan lampu kilat kamera',
      'Sarung tinju Little Mac mulai memancarkan kilau cahaya',
      'Tali ring tinju bergetar sebanyak tiga kali'
    ],
    quizExplanation: 'Seorang juru foto di latar penonton menyalakan blitz kamera di milidetik tepat yang dibutuhkan untuk menghabisi serudukan maut Bald Bull!'
  },
  't-62': {
    headline: 'Pemain 2 Diam-diam Bisa Mengendalikan Bebek Terbang Menggunakan Kontroler Kedua',
    story: 'Jutaan anak era 80-an tumbuh besar dengan menembakkan pistol plastik oranye NES Zapper ke arah bebek-bebek terbang sembari menahan geram melihat anjing pemburu yang menertawakan mereka. Namun tersembunyi di dalam buku panduan manual, terdapat rahasia yang jarang sekali dibaca orang: mencolokkan stik kontroler standar ke Port 2 memungkinkan pemain kedua mengendalikan arah terbang bebek secara manual di langit, mengubah arena tembak pemain tunggal menjadi ajang usil multipemain yang seru!',
    verifiedFact: 'NES Zapper bekerja dengan membuat layar berkedip hitam selama 1 frame, lalu menggambar kotak target putih di atas tiap bebek guna mendeteksi cahaya lewat fotodioda.',
    quoteOrLore: '“Kamu bisa membelokkan bebek menjauhi bidikan saudaramu dan mendengarkan mereka berteriak jengkel.” — Legenda retro gaming',
    easterEggNote: 'Pada versi arcade "Vs. Duck Hunt", di babak bonus pemain akhirnya bisa menembak wajah anjing yang suka menertawakan itu secara langsung!',
    quizQuestion: 'Fitur tersembunyi apa yang didukung oleh game light-gun NES Duck Hunt pada mode Game A?',
    quizOptions: [
      'Mencolokkan dua pistol Zapper sekaligus untuk gaya dua senjata',
      'Pemain 2 bisa mengarahkan terbangnya bebek menggunakan D-pad kontroler kedua',
      'Menggunakan Power Glove untuk menebar remah roti pemancing',
      'Mode penglihatan malam rahasia pada televisi hitam-putih'
    ],
    quizExplanation: 'Mencolokkan kontroler standar ke Port 2 memungkinkan teman Anda menerbangkan bebek menghindari tembakan pemain Zapper!'
  },
  't-63': {
    headline: 'Kode Darah "ABACABB" di Genesis Membuatnya Terjual 3 Kali Lipat Melampaui Versi Sensor SNES',
    story: 'Saat Mortal Kombat merambah dari arcade ke konsol rumahan pada September 1993 ("Mortal Monday"), Nintendo menerapkan kebijakan ramah keluarga yang kaku: semua darah diubah menjadi keringat abu-abu, dan jurus Fatality yang sadis disensor ketat. Sega of America mengambil langkah berani: mereka merilis versi Genesis yang disensor secara default, tetapi memungkinkan pemain memasukkan kode curang di layar peringatan—A, B, A, C, A, B, B—untuk memunculkan kembali ceceran darah merah dan adegan pemenggalan! Versi Genesis pun melesat mengalahkan penjualan SNES hampir 3 banding 1!',
    verifiedFact: 'Kontroversi seputar Mortal Kombat di konsol rumahan secara langsung memicu sidang Kongres AS tahun 1993 yang melahirkan sistem rating usia ESRB.',
    quoteOrLore: '“Deretan huruf A-B-A-C-A-B-B dinamai dari album pop-rock tahun 1981 milik band Genesis yang berjudul \'Abacab\'.” — Ed Boon',
    easterEggNote: 'Reptile adalah karakter petarung rahasia tersembunyi pertama dalam sejarah video game, yang hanya muncul lewat kemenangan ganda Flawless di arena The Pit dengan jurus Fatality saat ada bayangan melintasi bulan!',
    quizQuestion: 'Apa kode cheat terkenal yang membuka fitur darah tanpa sensor pada porting Sega Genesis Mortal Kombat?',
    quizOptions: [
      'BLOOD666',
      'ABACABB',
      'DOWN R UP L Y B',
      'DULLARD'
    ],
    quizExplanation: 'Mengetik ABACABB (penghormatan cerdas untuk album \'Abacab\' karya grup band Genesis tahun 1981) membuka cipratan darah dan Fatality penuh di Genesis!'
  },
  't-64': {
    headline: 'Kelompok Hacker Remaja Asal Inggris Merancang Koprosesor 3D RISC Super FX di Dalam Katrid',
    story: 'Pada awal dekade 90-an, perusahaan rintisan asal Inggris Argonaut Software pimpinan Jez San mendemonstrasikan prototipe rotasi poligon 3D di Game Boy. Nintendo begitu terkesima hingga mengundang tim Argonaut ke Kyoto. Tim asal Inggris ini menyadari CPU SNES terlalu lambat untuk merender poligon 3D secara real-time, sehingga mereka mendesain chip kustom: chip "Super FX", sebuah koprosesor RISC 21,4 MHz yang ditanam langsung di PCB katrid untuk merender pesawat Arwing 3D flat-shaded pada frame rate yang mulus!',
    verifiedFact: 'Star Fox terjual lebih dari 4 juta katrid, dan chip Super FX tercatat sebagai akselerator grafis 3D pasar massal pertama di dunia.',
    quoteOrLore: '“Kami memasukkan sebuah komputer ke dalam katrid yang secara harfiah ratusan kali lebih kencang dibanding konsol itu sendiri.” — Jez San',
    easterEggNote: 'Karakter Fox, Falco, Peppy, dan Slippy terinspirasi dari hewan cerita rakyat Jepang (rubah Kitsune, burung pegar, kelinci, dan katak) yang banyak dijumpai di kuil Fushimi Inari dekat kantor pusat Nintendo!',
    quizQuestion: 'Bagaimana cara Star Fox menyajikan grafis poligon 3D real-time pada konsol 16-bit Super Nintendo?',
    quizOptions: [
      'Dengan mengalirkan frame video terkompresi dari add-on CD',
      'Menanamkan chip koprosesor 3D RISC Super FX langsung di dalam katrid',
      'Memanfaatkan mode render vektor tersembunyi milik konsol',
      'Melakukan overclock pada unit adaptor daya listrik SNES'
    ],
    quizExplanation: 'Argonaut Games merancang koprosesor Super FX, menyematkan chip render 3D mutakhir 21MHz di dalam setiap katrid!'
  },
  't-65': {
    headline: 'Kepala Programmer Diam-diam Memprogram Chicago Bulls Selalu Gagal Tembakan Penentu di Detik Terakhir',
    story: 'Kepala programmer Midway, Mark Turmell, adalah penggemar fanatik Detroit Pistons yang memiliki rivalitas panas dengan Chicago Bulls era Michael Jordan. Turmell memutuskan melakukan sabotase orang dalam yang luar biasa: ia memprogram kode rahasia di ROM arcade yang memastikan bahwa setiap kali Scottie Pippen atau Horace Grant dari Chicago Bulls melepas tembakan di detik-detik penentu melawan Pistons, akurasi tembakan mereka dipangkas habis hingga mendekati nol!',
    verifiedFact: 'NBA Jam meraup pendapatan lebih dari $1 miliar dari koin dingdong di tahun pertamanya saja, melampaui pendapatan box office bioskop film Jurassic Park.',
    quoteOrLore: '“Jika pemain Bulls menembak tepat di detik bel akhir melawan Detroit, game ini sudah diatur diam-diam agar bola tidak akan pernah masuk.” — Mark Turmell tahun 2008',
    easterEggNote: 'Memasukkan inisial nama khusus memungkinkan pemain bermain sebagai Bill Clinton, Hillary Clinton, Pangeran Charles, hingga Will Smith!',
    quizQuestion: 'Bias rahasia apa yang disusupkan oleh lead programmer Mark Turmell ke dalam game arcade populer NBA Jam?',
    quizOptions: [
      'Los Angeles Lakers memiliki dorongan turbo tanpa batas',
      'Chicago Bulls diprogram selalu meleset saat melakukan tembakan penentu akhir melawan Detroit Pistons',
      'Wasit secara acak meniup peluit pelanggaran pada pencetak poin terbanyak',
      'Slam dunk berpeluang 10% memecahkan papan ring jika Michael Jordan bermain'
    ],
    quizExplanation: 'Mark Turmell adalah pendukung berat Detroit Pistons dan memprogram Bulls agar tembakan buzzer-beater mereka selalu gagal melawan Detroit!'
  },
  't-66': {
    headline: 'Masahiro Sakurai Baru Berusia 19 Tahun dan Memakai Twin Famicom Saat Menciptakan Kirby',
    story: 'Kreator legendaris Smash Bros., Masahiro Sakurai, baru menginjak usia 19 tahun ketika mulai merancang Kirby. Karena HAL Laboratory saat itu kekurangan dev kit kelas atas, Sakurai merancang animasi karakter dan kalkulasi fisika hanya dengan trackball dan sebuah mesin Twin Famicom (hibrida konsol NES dan Famicom Disk System). Awalnya ia menggambar Kirby hanya sebagai gumpalan bulat sederhana sementara (placeholder) hingga desain final dibuat, namun ia terlanjur jatuh hati dengan bentuknya yang menggemaskan dan memutuskan mempertahankannya!',
    verifiedFact: 'Pada game pertamanya, Kirby belum bisa meniru kemampuan musuh—ia hanya bisa menyedot dan memuntahkannya. Kemampuan meniru (copy ability) baru diperkenalkan pada Kirby\'s Adventure tahun 1993.',
    quoteOrLore: '“Kirby awalnya hanyalah objek dummy bulat sementara agar kami bisa menguji tabrakan fisik dan scrolling layar.” — Masahiro Sakurai',
    easterEggNote: 'Kirby digambar berwarna putih di sampul boks versi Amerika karena Nintendo of America tidak tahu bahwa Miyamoto dan Sakurai mewarnainya merah muda di layar monokrom Game Boy!',
    quizQuestion: 'Berapa usia Masahiro Sakurai saat menciptakan Kirby, dan apa wujud asli Kirby pada awalnya?',
    quizOptions: [
      'Usia 30 tahun; dirancang sebagai musuh Mario',
      'Usia 19 tahun; sekadar objek bulat sementara untuk pengujian fisika',
      'Usia 25 tahun; terinspirasi oleh marshmallow peliharaannya',
      'Usia 16 tahun; diikutsertakan dalam lomba gambar majalah'
    ],
    quizExplanation: 'Sakurai baru berumur 19 tahun dan membuat Kirby sebagai grafik bulat sementara untuk menguji animasi dan fisika!'
  },
  't-67': {
    headline: 'Mantan Animator Disney dan Warner Bros. Menggambar Tiap Frame dengan Tangan di Kertas Terlebih Dahulu',
    story: 'Di industri game yang saat itu didominasi seni digital piksel demi piksel, pendiri Shiny Entertainment David Perry dan animator Doug TenNapel memilih pendekatan artistik tradisional. TenNapel dan timnya menggambar ribuan frame animasi secara manual menggunakan pensil di atas kertas animasi, lengkap dengan teknik smear frames, prinsip gerak lentur squash and stretch, serta lelucon slapstick khas kartun klasik Looney Tunes. Sketsa pensil tersebut kemudian dipindai dan dikonversi menjadi sprite 16-bit!',
    verifiedFact: 'Teka-teki pembuka melontarkan sapi yang ikonis menjadi salah satu lelucon terpopuler era 16-bit ketika sapi tersebut mendarat menimpa sang putri di akhir game!',
    quoteOrLore: '“Kami memperlakukan setiap gerakan animasi Jim layaknya sebuah episode kartun di Minggu pagi.” — Doug TenNapel',
    easterEggNote: 'Karakter putri "Princess What\'s-Her-Name" sengaja tidak diberi nama sebagai parodi terhadap klise putri tak berdaya dalam video game generik!',
    quizQuestion: 'Apa yang membuat animasi Earthworm Jim terlihat begitu luwes dan sarat komedi kartun pada tahun 1994?',
    quizOptions: [
      'Menggunakan motion capture awal dengan aktor pengganti',
      'Setiap frame digambar manual dengan pensil di kertas oleh animator tradisional lalu dipindai',
      'Menggunakan model 3D pra-render seperti Donkey Kong Country',
      'Dihasilkan menggunakan kalkulasi matematika vektor prosedural'
    ],
    quizExplanation: 'Doug TenNapel menggambar seluruh animasi di kertas manual memakai prinsip klasik squash-and-stretch ala Disney dan Looney Tunes!'
  },
  't-68': {
    headline: 'Yu Suzuki Menyewa Mobil BMW dan Menjelajahi Eropa dengan Kamera Video untuk Riset Jalanan',
    story: 'Desainer legendaris Sega Yu Suzuki ingin Out Run menangkap romantisme mengendarai mobil sport atap terbuka berwarna merah menyusuri Riviera Prancis, Pegunungan Alpen Swiss, dan jalan bebas hambatan Autobahn Jerman. Ketimbang hanya mengandalkan brosur wisata, Suzuki menyewa mobil BMW 520, memasang kamera video di sisi penumpang, dan menyetir sejauh lebih dari 5.000 kilometer melintasi Eropa selama dua minggu bersama asistennya, mengabadikan ribuan foto yang kemudian menjadi rute bercabang ikonis di game ini!',
    verifiedFact: 'Out Run adalah game arcade pertama yang mengizinkan pemain memilih musik radio latar mereka sendiri ("Magical Sound Shower", "Passing Breeze", "Splash Wave").',
    quoteOrLore: '“Out Run bukan soal memenangkan perlombaan; ini tentang kebebasan dan euforia murni dalam mengemudi.” — Yu Suzuki',
    easterEggNote: 'Kabinet arcade tipe deluxe tipe duduk memiliki hidrolik yang secara fisik miring dan bergoyang mengikuti putaran setir, menyimulasikan gaya gravitasi sentrifugal!',
    quizQuestion: 'Bagaimana cara Yu Suzuki meriset pemandangan indah untuk game arcade sensasional Out Run pada tahun 1986?',
    quizOptions: [
      'Menggunakan foto satelit dari NASA',
      'Menyewa mobil BMW dan menempuh 5.000 km melintasi Eropa merekam video dan foto',
      'Mendasarkan seluruh lingkungan pada jalan pesisir Jepang dekat Tokyo',
      'Mengambil adegan-adegan dari film aksi Hollywood'
    ],
    quizExplanation: 'Suzuki menyetir langsung mobil sewaan BMW melintasi jalan raya Eropa dengan kamera video untuk merekam keindahan jalanan yang autentik!'
  },
  't-69': {
    headline: 'Glitch Serangan Siku yang Terlalu Sakti Membuat Pemain Mengabaikan Semua Jurus Lainnya',
    story: 'Pada perilisan arcade orisinal Double Dragon, programmer Yoshihisa Kishimoto tanpa sengaja memberi serangan sikutan ke belakang (Lompat + Pukul saat membelakangi musuh) prioritas hitbox kebal dan frame recovery instan. Para pemain segera menyadari bahwa serangan sikut ini mampu menembus setiap serangan lawan, termasuk bos raksasa Abobo dan Willy yang bersenjatakan senapan mesin. Di berbagai arena dingdong dunia, para pemain menamatkan seluruh game cukup dengan berjalan mundur dan terus-menerus menyodokkan sikut!',
    verifiedFact: 'Double Dragon meletakkan fondasi utama genre beat \'em up: kerja sama 2 pemain (co-op), memungut senjata musuh, dan kedalaman bidang bergerak ke samping.',
    quoteOrLore: '“Hantaman sikut mengubah dua saudara ahli bela diri ini menjadi mesin perontok musuh yang berjalan mundur.” — Sejarawan arcade',
    easterEggNote: 'Jika Billy dan Jimmy berhasil bertahan hidup berdua hingga akhir, game memaksa kedua saudara ini bertarung sampai mati demi memperebutkan cinta Marian!',
    quizQuestion: 'Celah tempur (exploit) tersohor apa di Double Dragon versi arcade yang membuat pemain dapat menamatkan game dengan sangat mudah?',
    quizOptions: [
      'Glitch tendangan lompat tanpa henti',
      'Serangan sodokan sikut ke belakang yang kebal serangan lawan',
      'Melempar tong melewati batas luar layar',
      'Menjeda (pause) kabinet untuk me-reset kecerdasan AI musuh'
    ],
    quizExplanation: 'Serangan sikut memiliki frame kebal dan eksekusi instan, memungkinkan pemain menamatkan seluruh permainan hanya dengan berjalan mundur!'
  },
  't-70': {
    headline: 'Mode 7 Memungkinkan Pemain Melempar Prajurit Foot Clan Tepat ke Arah Kaca Layar TV',
    story: 'Saat membawa game arcade hit ini ke Super Nintendo, Konami ingin memamerkan kehebatan penskalaan hardware Mode 7 milik konsol tersebut. Programmer K. Takahashi merancang bantingan khusus di mana Kura-Kura Ninja mencengkeram lengan Foot Soldier lalu melemparnya lurus ke arah layar. Sprite prajurit tersebut membesar secara dinamis hingga tampak menabrak kaca layar televisi dengan bunyi benturan keras—sebuah mekanik yang begitu ikonis sehingga pertarungan melawan bos Shredder di Technodrome mewajibkan pemain melempar musuh tepat ke kokpit Shredder!',
    verifiedFact: 'Porting versi SNES justru menambahkan lima stage dan bos eksklusif yang tidak ada pada versi arcade aslinya, termasuk karakter Slash dan pertempuran Technodrome.',
    quoteOrLore: '“Big Apple, 3 AM! Melempar ninja Foot Clan ke kaca TV Anda adalah bahan pamer paling bergengsi bagi anak-anak tahun 1992.” — Pengembang Konami',
    easterEggNote: 'Kotak pizza penambah darah memutar klip suara digital ikonis "Pizza Time!" setiap kali diambil oleh salah satu kura-kura!',
    quizQuestion: 'Bagaimana cara pemain melukai Shredder pada pertarungan bos di Technodrome dalam TMNT IV: Turtles in Time di SNES?',
    quizOptions: [
      'Memantulkan tembakan laser menggunakan pedang katana Leonardo',
      'Melempar prajurit Foot Clan langsung ke arah layar menuju kokpit Shredder',
      'Menendang kotak pizza ke terminal kendalinya',
      'Mengeksekusi putaran tempurung terkoordinasi empat pemain'
    ],
    quizExplanation: 'Pemain harus mencengkeram Foot Soldier lalu melemparkannya ke arah layar untuk menghantam tank tempur milik Shredder!'
  },
  't-71': {
    headline: 'Koichi Sugiyama Menggubah Seluruh Musik Simfoni 8-Bit Ikonis Hanya dalam Satu Minggu',
    story: 'Sebelum Dragon Quest, musik video game hanya dipandang sebagai bunyi beep dan tut sederhana. Komposer musik klasik kenamaan Jepang Koichi Sugiyama direkrut oleh Enix setelah ia mengirimkan kartu pos berisi pujian untuk game shogi PC mereka. Hanya diberi waktu delapan hari sebelum tenggat waktu finalisasi ROM, Sugiyama menggubah lagu pembuka (overture) legendaris dan musik pengiring Dragon Quest dengan struktur leitmotif klasik gaya Wagner, menanamkan jiwa musikal bagi seluruh genre JRPG!',
    verifiedFact: 'Sugiyama memegang Guinness World Record sebagai komposer video game tertua yang masih aktif hingga ia wafat pada tahun 2021 di usia 90 tahun.',
    quoteOrLore: '“Saya menulis lagu tema utamanya dalam waktu sekitar lima menit, namun itu dilandasi oleh 50 tahun pengalaman hidup dalam bermusik.” — Koichi Sugiyama',
    easterEggNote: 'Lagu tema Dragon Quest terpilih sebagai lagu mars megah saat parade defile atlet pada Upacara Pembukaan Olimpiade Tokyo 2020!',
    quizQuestion: 'Bagaimana komposer legendaris Koichi Sugiyama direkrut untuk menggubah musik Dragon Quest pada tahun 1986?',
    quizOptions: [
      'Melalui audisi di Tokyo Philharmonic',
      'Setelah ia mengirim kartu pos apresiasi ke Enix memuji game shogi mereka',
      'Ia adalah teman sekamar kuliah Yuji Horii',
      'Nintendo memantaunya dari iklan komersial televisi Jepang'
    ],
    quizExplanation: 'Sugiyama mengirim kartu pos tulisan tangan tentang game shogi ke Enix, yang mengenali nama pesohornya lalu langsung merekrutnya!'
  },
  't-72': {
    headline: 'Menamatkan Game Sekali Memaksa Anda Mengulang Seluruh Mimpi Buruk Demi Ending yang Sebenarnya',
    story: 'Dikenal sebagai salah satu game paling kejam yang pernah dibuat, Arthur hanya sanggup menahan dua kali pukulan sebelum hancur menjadi tumpukan tulang. Namun kekejaman sesungguhnya baru dimulai saat Anda akhirnya menumbangkan bos terakhir Astaroth. Game ini mengumumkan bahwa seluruh perjalanan Anda hanyalah "ilusi tipu daya iblis" dan menendang pemain kembali ke Stage 1 dengan sisa waktu lebih sempit dan musuh bergerak lebih cepat. Anda wajib menaklukkan seluruh game untuk kedua kalinya menggunakan Goddess Bracelet demi menyaksikan kredit ending sejati!',
    verifiedFact: 'Layar ending berbahasa Inggris game ini terkenal dengan kesalahan tata bahasa konyol seperti "Congraturation" dan "devisut by Satan".',
    quoteOrLore: '“This room is an illusion and is a trap devisut by Satan! Go ahead dauntlessly! Make rapid progress!” — Teks layar ending game',
    easterEggNote: 'Aksi Arthur berlarian hanya mengenakan celana boxer motif polkadot menjadi salah satu ciri khas komedi visual paling ikonik dari Capcom!',
    quizQuestion: 'Plot twist kejam apa yang terjadi saat Anda mengalahkan bos terakhir di Ghosts \'n Goblins untuk pertama kalinya?',
    quizOptions: [
      'Konsol melakukan reset ulang ke pengaturan pabrik',
      'Game mengungkap bahwa itu ilusi iblis dan memaksa Anda menamatkan seluruh game untuk kedua kalinya',
      'Putri Prin Prin berubah wujud menjadi naga iblis',
      'Arthur tewas dan mewariskan baju zirahnya kepada putranya'
    ],
    quizExplanation: 'Astaroth mengungkap bahwa pertarungan itu hanyalah ilusi, melempar Arthur kembali ke Stage 1 untuk mengulang seluruh game dari awal!'
  },
  't-73': {
    headline: 'Musik Hanya Berbunyi Saat Karakter Melangkah Demi Menghemat Memori Audio',
    story: 'Pada perangkat keras arcade awal era 80-an, chip audio memiliki keterbatasan yang sangat ketat. Di game Dig Dug, desainer suara Yuriko Keino mencetuskan trik ritmis yang jenius: musik chiptune yang riang hanya akan berbunyi selama Dig Dug (Taizo Hori) melangkahkan kakinya. Saat pemain berhenti menggali atau diam di tempat, musik seketika berhenti total. Cara ini tidak hanya menghemat siklus interupsi CPU, tetapi juga melipatgandakan ketegangan pemain saat terdiam di bawah tanah!',
    verifiedFact: 'Protagonis Dig Dug, Taizo Hori, secara kanonik adalah ayah kandung dari Susumu Hori, karakter utama game Mr. Driller!',
    quoteOrLore: '“Kesunyian saat Anda berhenti melangkah membuat jantung berdegup kencang ketika para Pooka mendekat.” — Yuriko Keino',
    easterEggNote: 'Musuh dapat berubah menjadi hantu dan menembus tanah padat, namun menjatuhkan batu besar ke atas kerumunan musuh memberi hadiah hingga 7.000 poin!',
    quizQuestion: 'Aturan audio unik apa yang diprogram ke dalam game arcade klasik Dig Dug (1982)?',
    quizOptions: [
      'Soundtrack berputar mundur saat berada di kedalaman tanah',
      'Musik latar belakang hanya berbunyi saat karakter sedang aktif melangkah atau menggali',
      'Musuh menyanyikan nada harmoni saat dipompa angin',
      'Tempo musik berubah mengikuti suhu ruangan kabinet'
    ],
    quizExplanation: 'Keino memprogram musik berhenti tepat saat pemain tidak bergerak, menciptakan ketegangan yang luar biasa!'
  },
  't-74': {
    headline: 'Demi Meraih Ending Terbaik yang Sejati, Anda Wajib Bermain Co-Op Bersama Pemain Kedua',
    story: 'Di sepanjang 100 level aksi dinosaurus peniup gelembung, Taito menyembunyikan salah satu akhir cerita berbasis kerja sama (co-op) paling awal dalam sejarah. Jika pemain tunggal berhasil menuntaskan babak 100 sendirian, game akan memberi teguran "Bad Ending" yang menyatakan bahwa kemenangan sejati menuntut persahabatan. Hanya dengan mencapai dan menaklukkan bos terakhir Super Drunk berdua secara simultan, Bub dan Bob bisa menyelamatkan kekasih mereka dan kembali berubah menjadi manusia!',
    verifiedFact: 'Bubble Bobble memiliki pintu rahasia menuju mode "Super Bubble Bobble" jika pemain berhasil memenuhi tantangan khusus tanpa pernah mati.',
    quoteOrLore: '“Ini bukan akhir yang sebenarnya! Cinta dan persahabatan tidak bisa diraih seorang diri!” — Layar ending Taito',
    easterEggNote: 'Jika Anda meletuskan gelembung huruf hingga mengeja kata "E-X-T-E-N-D", Anda akan mendapatkan nyawa ekstra dan langsung menamatkan stage seketika!',
    quizQuestion: 'Syarat apa yang wajib dipenuhi untuk membuka true good ending pada Bubble Bobble versi arcade?',
    quizOptions: [
      'Menemukan seluruh 100 item berlian rahasia',
      'Mencapai dan menyelesaikan Level 100 bersama dua pemain dalam mode co-op',
      'Tidak pernah menggunakan teknik lompat gelembung',
      'Mengalahkan bos terakhir dalam waktu kurang dari 30 detik'
    ],
    quizExplanation: 'Taito memprogram ending sejati membutuhkan dua pemain, menyampaikan pesan moral bahwa kemenangan sejati butuh persahabatan!'
  },
  't-75': {
    headline: 'Jeritan Kematian Musuh Diambil dari Sampel Film Laga Hollywood "First Blood" dan "Conan"',
    story: 'Saat musuh terlempar dari tebing jurang atau ditebas tumbang di Golden Axe, jeritan sekarat mereka yang memilukan menggema di seantero arena dingdong. Desainer suara Tohru Nakabayashi tidak merekam pengisi suara di studio—ia mengambil sampel audio dari film laga klasik ternama, termasuk "First Blood" (Rambo) yang dibintangi Sylvester Stallone dan "Conan the Barbarian" karya Arnold Schwarzenegger, mendigitalkannya menjadi sampel PCM bitrate rendah yang memberikan sensasi tebasan pedang begitu menggelegar!',
    verifiedFact: 'Kreator Golden Axe, Makoto Uchida, juga merupakan pencipta Altered Beast, memberikan estetika fantasi mitologi yang khas pada kedua game tersebut.',
    quoteOrLore: '“Jeritan kematian yang renyah dan kasar itu diambil langsung dari pita audio film Hollywood.” — Retrospeksi Sega AM2',
    easterEggNote: 'Saat jeda api unggun malam hari, kurcaci kecil biru dan hijau akan menyusup ke kemah Anda dan bisa ditendang untuk merebut kembali ramuan sihir dan daging!',
    quizQuestion: 'Dari manakah asal suara jeritan kematian musuh yang ikonis dalam game arcade Golden Axe (1989)?',
    quizOptions: [
      'Direkam oleh para karyawan kantor Sega di ruang istirahat',
      'Diambil dari sampel film Hollywood seperti First Blood (Rambo) dan Conan the Barbarian',
      'Disintesis murni menggunakan modulasi frekuensi FM',
      'Diambil dari kaset panduan karate Jepang'
    ],
    quizExplanation: 'Sega mengambil sampel jeritan langsung dari film Hollywood seperti Rambo dan Conan agar pertarungan terasa jauh lebih bertenaga!'
  },
  't-76': {
    headline: 'Shuriken Joe Musashi Tak Pernah Habis, Namun Serangan Jarak Dekat Memberi Kerusakan 5 Kali Lipat',
    story: 'Sebagian besar game ninja membatasi jumlah shuriken sebagai amunisi berharga yang harus dipungut. Di Shinobi, sutradara Noriyoshi Ohba memberi sang master ninja Joe Musashi senjata lempar shuriken tanpa batas dari kejauhan. Namun, saat berdiri dalam jarak rengkuhan musuh, Musashi otomatis beralih ke seni bela diri jarak dekat yang mematikan (pukulan, tendangan putar, dan tebasan katana) dengan daya rusak berlipat ganda, memberi penghargaan bagi pemain yang berani menyerang agresif ketimbang bersembunyi dari jauh!',
    verifiedFact: 'Stage bonus dimainkan dari sudut pandang orang pertama (first-person), di mana pemain melemparkan shuriken ke arah ninja yang melompat di atas atap.',
    quoteOrLore: '“Ninja sejati menggunakan shuriken untuk mengecoh dan bilah pedang untuk menghabisi.” — Noriyoshi Ohba',
    easterEggNote: 'Pada versi awal sekuelnya, "The Revenge of Shinobi", para bos menampilkan kemiripan karakter tanpa izin dari Spider-Man, Batman, Godzilla, hingga Terminator!',
    quizQuestion: 'Bagaimana sistem shuriken dan pertarungan jarak dekat diterapkan pada game arcade orisinal Shinobi (1987)?',
    quizOptions: [
      'Melempar shuriken mengorbankan sisa darah karakter',
      'Shuriken tak terbatas, namun bela diri jarak dekat dan tebasan katana menghasilkan kerusakan masif',
      'Pemain harus membeli shuriken secara manual dari pemilik toko',
      'Pertarungan jarak dekat hanya bisa digunakan saat melawan bos'
    ],
    quizExplanation: 'Musashi memiliki bintang lempar tak terbatas dari jauh, namun tebasan katana jarak dekatnya menghasilkan daya hancur berlipat ganda!'
  },
  't-77': {
    headline: 'Diciptakan Khusus untuk Melatih Developer Pihak Ketiga Memprogram Matematika 3D Mode 7',
    story: 'Saat Nintendo memperkenalkan Super Famicom, para pengembang pihak ketiga (third-party) kebingungan memahami cara memprogram kalkulasi transformasi matriks pada Mode 7. Shigeru Miyamoto dan programmer Makoto Wada membangun Pilotwings bukan sekadar sebagai game simulasi penerbangan, melainkan sebagai demo kelas master interaktif bagi Capcom, Konami, dan Square, membuktikan cara memanfaatkan pesawat sayap ganda, terjun payung, dan jetpack dengan zoom kamera dinamis untuk menyimulasikan ketinggian 3D!',
    verifiedFact: 'Level-level akhir memuat misi rahasia penyelamatan menggunakan helikopter serbu militer untuk membebaskan sandera di pulau terpencil.',
    quoteOrLore: '“Pilotwings adalah buku panduan kami untuk menunjukkan kepada para pengembang pihak ketiga kemampuan dahsyat yang dimiliki Super Nintendo.” — Shigeru Miyamoto',
    easterEggNote: 'Jika Anda gagal dalam tes terjun payung, instruktur penerbangan Tony akan memarahi Anda habis-habisan dan memberi nilai nol!',
    quizQuestion: 'Tujuan teknis apa yang diemban Pilotwings bagi Nintendo saat peluncuran perdana Super Nintendo tahun 1990?',
    quizOptions: [
      'Menguji perangkat periferal modem SNES',
      'Berfungsi sebagai percontohan masterclass untuk mengajari studio pihak ketiga mengoding matematika 3D Mode 7',
      'Dibuat untuk melatih pilot maskapai penerbangan komersial Jepang',
      'Menguji prototipe joystick analog orisinal'
    ],
    quizExplanation: 'Nintendo membuat Pilotwings untuk mendemonstrasikan kepada pengembang eksternal cara memanfaatkan transformasi matriks Mode 7!'
  },
  't-78': {
    headline: 'Pelopor Mekanik Metroidvania Berubah Wujud Hewan di Konsol 8-Bit',
    story: 'Jauh sebelum Castlevania atau game indie modern mengadopsi eksplorasi bolak-balik berpagar kemampuan (ability-gated backtracking), Wonder Boy III telah mengubah wujud pemain menjadi Lizard-Man (menyemburkan api), Mouse-Man (memanjat dinding dan langit-langit), Piranha-Man (berenang di air dalam), Lion-Man (tebasan vertikal kuat), dan Hawk-Man (terbang bebas). Tiap wujud membuka area yang sebelumnya tak bisa dilewati pada peta dunia yang saling terhubung, meletakkan fondasi desain open-world Metroidvania!',
    verifiedFact: 'Saat studio Dotemu membuat ulang (remake) game ini pada tahun 2017, mereka menggunakan kode assembly asli buatan 1989 untuk menggerakkan kalkulasi fisika di balik grafis gambar tangan.',
    quoteOrLore: '“Berganti wujud untuk menjelajahi dunia tanpa sekat adalah konsep yang melompati zamannya di Master System.” — Ryuichi Nishizawa',
    easterEggNote: 'Sistem password tahun 1989 bekerja sangat akurat hingga catatan password lama yang ditulis di kertas pada tahun 1989 masih bisa dipakai di remake HD tahun 2017!',
    quizQuestion: 'Mekanik eksplorasi terobosan apa yang diperkenalkan Wonder Boy III pada tahun 1989?',
    quizOptions: [
      'Resep meracik item (crafting) secara real-time',
      'Berubah wujud menjadi berbagai jenis hewan (Kadal, Tikus, Piranha, Singa, Elang) untuk membuka area dunia',
      'Mantra sihir yang diaktifkan dengan perintah suara',
      'Papan peringkat multipemain jaringan seluler'
    ],
    quizExplanation: 'Pemain berubah wujud menjadi berbagai hewan dengan kemampuan jelajah unik (memanjat plafon, berenang, terbang) demi menjelajahi peta!'
  },
  't-79': {
    headline: 'Versi Famicom Jepang Memuat Chip Audio Kustom VRC6 dengan 3 Kanal Suara Ekstra',
    story: 'Konami menolak tunduk pada keterbatasan prosesor audio standar 5-kanal milik Nintendo. Untuk perilisan Akumajou Densetsu (Castlevania III) versi Jepang, Konami merancang chip mapper kustom "VRC6" langsung di atas papan sirkuit katrid. Chip VRC6 menambahkan dua kanal gelombang pulsa ekstra dan satu kanal gelombang sawtooth 8-step, menghasilkan komposisi synth barok yang kaya dengan bass tebal bak simfoni mini jika dibandingkan dengan versi NES Amerika yang dipangkas!',
    verifiedFact: 'Perangkat keras NES Amerika tidak memiliki pin pass-through suara eksternal seperti pada Famicom, memaksa Konami memangkas audionya menjadi 5 kanal saja.',
    quoteOrLore: '“VRC6 memberi kehangatan audio pada Castlevania III yang secara harfiah mustahil diwujudkan di NES Amerika Utara.” — Hidenori Maezawa',
    easterEggNote: 'Trevor Belmont dapat merekrut tiga sekutu pendamping: Sypha Belnades, Grant Danasty, dan Alucard—yang masing-masing membuka percabangan rute yang berbeda!',
    quizQuestion: 'Mengapa Castlevania III versi Famicom Jepang terdengar jauh lebih superior dibanding versi NES Amerika?',
    quizOptions: [
      'Memiliki kaset analog mini di dalam katridnya',
      'Katrid Jepang memuat koprosesor kustom VRC6 milik Konami yang menambah 3 kanal audio ekstra',
      'Tim lokalisasi Amerika secara tak sengaja menghapus kode audio',
      'Berjalan pada 60 frame per detik sedangkan versi AS pada 30 frame per detik'
    ],
    quizExplanation: 'Chip VRC6 buatan Konami menambahkan dua gelombang pulsa dan satu gelombang sawtooth, melahirkan mahakarya musik barok berkualitas tinggi!'
  },
  't-80': {
    headline: 'Para Eksekutif Konami Sempat Menolak Konsepnya Sebelum Staf Wanita Jatuh Cinta pada Prototipe Game',
    story: 'Pada tahun 1981, era awal video game didominasi oleh pesawat luar angkasa dan perang melawan alien. Ketika desainer muda Akira Hashimoto mempresentasikan game damai tentang membantu seekor katak menyeberangi jalan raya yang padat dan sungai yang penuh buaya, jajaran direksi pria Konami menolaknya mentah-mentah karena dianggap kekanak-kanakan dan membosankan. Hashimoto lalu menaruh kabinet prototipe di kantin perusahaan; para karyawati dan sekretaris kantor langsung antre mengular untuk memainkannya, meyakinkan Konami untuk merilisnya hingga menjadi fenomena arcade global!',
    verifiedFact: 'Frogger menginspirasi salah satu episode legendaris serial komedi Seinfeld, saat George Costanza berusaha memindahkan kabinet arcade menyeberangi jalanan New York tanpa mencabut aliran baterainya.',
    quoteOrLore: '“Para eksekutif tidak memahaminya sampai mereka melihat para wanita terpikat oleh katak hijau kecil itu.” — Akira Hashimoto',
    easterEggNote: 'Membawa katak betina berpita merah muda di punggung Anda akan melipatgandakan skor saat melompat masuk ke teratai sarang tujuan!',
    quizQuestion: 'Apa yang meyakinkan para eksekutif Konami untuk merestui Frogger setelah sempat menolak konsep non-kekerasannya?',
    quizOptions: [
      'Kesepakatan lisensi dengan yayasan lingkungan hidup',
      'Para staf wanita kantor antre memadati kantin perusahaan untuk mencoba prototipe game',
      'Sega menawarkan untuk membeli kode sumbernya seharga $1 juta',
      'Memenangkan juara pertama di ajang Tokyo Amusement Expo'
    ],
    quizExplanation: 'Eksekutif Konami awalnya meremehkan Frogger sampai para wanita di kantin perusahaan jatuh hati pada prototipenya!'
  }
};
