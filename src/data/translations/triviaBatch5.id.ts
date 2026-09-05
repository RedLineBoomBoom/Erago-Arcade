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

export const TRIVIA_ID_BATCH_5: Record<string, TriviaTranslationItem> = {
  't-161': {
    headline: 'Kisah Tragis Quest "Bloody Baron" Ditulis oleh Paweł Sasko Terinspirasi Cerita Rakyat Slavia',
    story: 'Rangkaian quest Bloody Baron (Phillip Strenger) dan tragedi rumah tangganya di rawa-rawa Velen diakui luas sebagai salah satu puncak narasi video game. Lead quest designer Paweł Sasko terinspirasi oleh cerita rakyat pedesaan Polandia dan tragedi alkoholisme lintas generasi dalam keluarga. Quest ini tidak memiliki "ending bahagia" yang bersih: setiap cabang pilihan memaksa Geralt dan pemain menghadapi dilema moral yang menyayat hati seputar cinta, kekerasan dalam rumah tangga, dan penebusan dosa!',
    verifiedFact: 'The Witcher 3 meraih lebih dari 250 penghargaan Game of the Year pada tahun 2015, memecahkan rekor dunia pada masa itu.',
    quoteOrLore: '“Kejahatan tetaplah kejahatan, Stregobor. Lebih kecil, lebih besar, atau menengah, semuanya sama saja. Jika aku harus memilih di antara dua kejahatan, aku lebih memilih tidak memilih sama sekali.” — Geralt of Rivia',
    easterEggNote: 'Jika Anda mengeksploitasi pembantaian sapi di White Orchard demi menjual kulitnya untuk uang tak terbatas, monster iblis Chort level 50 "Bovine Defense Force" akan muncul seketika untuk menghabisi Geralt!',
    quizQuestion: 'Monster anti-exploit apa yang akan muncul di The Witcher 3 jika Anda berulang kali membantai sapi di White Orchard demi uang?',
    quizOptions: [
      'Seekor griffin emas',
      'Chort Bovine Defense Force, iblis berlevel tinggi mematikan',
      'Sekawanan serigala gila abadi',
      'Petugas pemeriksa pajak dari Novigrad'
    ],
    quizExplanation: 'CDPR sengaja menyuntikkan patch "Bovine Defense Force Initiative", memunculkan monster Chort level tinggi yang mematikan jika Anda terus-menerus mem-farm sapi demi koin emas!'
  },
  't-162': {
    headline: 'Seluruh Game Diam-Diam Berubah dari Perburuan Manusia Serigala Victoria Menjadi Horor Kosmis Eldritch',
    story: 'Pemasaran awal FromSoftware menggambarkan Bloodborne murni sebagai perburuan monster bernuansa gotik era Victoria dengan mantel panjang, saw cleaver, dan manusia serigala. Namun seiring meningkatnya stat "Insight" pemain, tabir kenyataan mulai terkoyak. Setelah mengalahkan Rom, the Vacuous Spider di Byrgenwerth, bulan darah terbit dan mengungkap sosok raksasa Great Ones ala Lovecraftian (Amygdala) bermata banyak yang bergelantungan di dinding katedral Yharnam—mengubah perburuan serigala menjadi kegilaan kosmis total!',
    verifiedFact: 'Hidetaka Miyazaki menyutradarai Bloodborne bersamaan dengan Dark Souls III, memfokuskan mekanik Bloodborne pada sistem pemulihan darah "rally" yang sangat agresif.',
    quoteOrLore: '“Kita berpikir pada tingkatan yang paling rendah. Yang kita butuhkan adalah lebih banyak mata.” — Master Willem dari Byrgenwerth',
    easterEggNote: 'Memiliki 40 atau lebih stat Insight memungkinkan Anda melihat Amygdala tak kasat mata yang merayap di Cathedral Ward bahkan sebelum fase bulan darah muncul!',
    quizQuestion: 'Perubahan genre drastis apa yang terjadi di tengah permainan Bloodborne setelah mengalahkan Rom the Vacuous Spider?',
    quizOptions: [
      'Berubah menjadi gurun fiksi ilmiah pasca-apokaliptik',
      'Perburuan manusia serigala gotik berubah menjadi horor kosmis eldritch ala Lovecraft',
      'Game berubah menjadi strategi taktis berbasis giliran (turn-based)',
      'Sang Pemburu terbangun di kota Tokyo modern'
    ],
    quizExplanation: 'Peristiwa munculnya bulan darah menyingkap tabir rahasia, memperlihatkan makhluk kosmis raksasa Great Ones yang merayap di arsitektur kota Yharnam!'
  },
  't-163': {
    headline: 'Sekiro Awalnya Dikonsepkan Sebagai Reboot Langsung Serial Siluman Ninja Legendaris Tenchu',
    story: 'FromSoftware memegang hak atas serial klasik Tenchu dan pada tahun 2015 berencana membuat reboot ninja siluman modern. Namun saat sutradara Hidetaka Miyazaki dan desainer Masaru Yamamura mematangkan sistem pertarungan, mereka menyadari mekanik "deflection" (tangkisan pedang ritmis) dan penghancuran postur terlalu cepat serta agresif untuk gaya stealth khas Tenchu. Mereka pun memutuskan menciptakan IP baru seputar Sang Serigala (Wolf) dan Keturunan Ilahi (Divine Heir)!',
    verifiedFact: 'Sekiro memenangkan Game of the Year di The Game Awards 2019 dan dipuji luas sebagai salah satu sistem pertarungan jarak dekat paling presisi dalam sejarah video game.',
    quoteOrLore: '“Keraguan adalah kekalahan.” — Isshin, the Sword Saint',
    easterEggNote: 'Boss "Mist Noble" menjadi lelucon legendaris komunitas, di mana para pemain berpura-pura bahwa boss terlemah dan termudah di game ini adalah monster raksasa yang mustahil dikalahkan!',
    quizQuestion: 'Waralaba ninja klasik apa yang awalnya hendak di-reboot menjadi game Sekiro?',
    quizOptions: [
      'Ninja Gaiden',
      'Tenchu: Stealth Assassins',
      'Shinobi',
      'Bushido Blade'
    ],
    quizExplanation: 'FromSoftware awalnya merancang Sekiro sebagai kebangkitan Tenchu sebelum pertarungan defleksi ritmisnya berkembang menjadi semesta baru!'
  },
  't-164': {
    headline: 'Dibuat Hanya oleh Tiga Orang di Adelaide, Australia dengan Dana Kickstarter Sederhana $57.000',
    story: 'Pada tahun 2014, Ari Gibson, William Pellen, dan David Kazi mengumpulkan dana sederhana sebesar 57.000 dolar Australia lewat Kickstarter untuk membuat game indie tentang serangga. Bekerja di kantor suburban sederhana di Adelaide, Gibson menggambar setiap animasi 2D serangga secara manual dengan tangan, sementara komposer Christopher Larkin menggubah musik orkestra melankolis. Melawan segala keterbatasan, trio ini melahirkan Hallownest—kerajaan bawah tanah raksasa dengan lebih dari 150 jenis musuh unik dan 40 boss, serta terjual jutaan kopi!',
    verifiedFact: 'Ukuran peta dunia game ini menyaingi gabungan Super Metroid dan Castlevania: Symphony of the Night, menghadirkan 16 area bawah tanah luas yang berbeda.',
    quoteOrLore: '“Tiada pengorbanan yang terlalu besar. Tiada pikiran untuk menimbang. Tiada tekad untuk dipatahkan. Tiada suara untuk meratapi penderitaan.” — The Pale King',
    easterEggNote: 'Charm Wayward Compass, yang fungsinya hanya menampilkan posisi wajah Anda di peta, sering dipuji secara bercanda oleh komunitas sebagai charm paling "overpowered" di game!',
    quizQuestion: 'Berapa jumlah developer inti di Team Cherry yang menciptakan dunia Hollow Knight di Adelaide, Australia?',
    quizOptions: [
      'Satu studio berisi 45 insinyur',
      'Tim inti yang hanya beranggotakan tiga orang',
      'Komunitas 100 animator lepas',
      'Dua orang profesor universitas'
    ],
    quizExplanation: 'Team Cherry hanya terdiri dari Ari Gibson, William Pellen, dan David Kazi yang bersama-sama menciptakan mahakarya Metroidvania abadi!'
  },
  't-165': {
    headline: 'Maddy Thorson Memprogram Mekanik Fisika Tersembunyi yang Diam-Diam Mempermudah Pemain',
    story: 'Celeste terkenal dengan tingkat kesulitannya yang brutal namun tetap terasa adil dan memberi kepuasan luar biasa. Lead designer Maddy Thorson mengungkapkan bahwa pergerakan Madeline dipenuhi mekanik toleransi tersembunyi dalam mesin fisikanya: "Coyote Time" memungkinkan Anda tetap melompat beberapa frame setelah melangkah dari tepi jurang ke udara hampa; "Jump Buffering" menyimpan input lompatan sebelum menyentuh tanah; dan "Corner Nudging" secara dinamis menggeser Madeline melewati sudut tajam piksel agar kepalanya tidak terbentur dinding!',
    verifiedFact: 'Lena Raine menggubah soundtrack piano-synth pemenang penghargaan, yang memutar melodi secara terbalik di Mirror Temple untuk menggambarkan rasa cemas Madeline.',
    quoteOrLore: '“Kamu pasti bisa, Madeline. Tarik napas perlahan.” — Mantra utama Celeste',
    easterEggNote: 'Di Chapter 6, jika Anda membalik audio rekaman suara pada sekuens cermin, terdengar suara Madeline yang menjelaskan cara mengendalikan serangan panik (panic attack)!',
    quizQuestion: 'Apa fungsi mekanik "Coyote Time" dalam mesin fisika game precision platformer Celeste?',
    quizOptions: [
      'Membuat Madeline berlari lebih cepat di padang pasir',
      'Memungkinkan pemain melompat selama beberapa frame setelah melangkah keluar dari tepi tebing ke udara kosong',
      'Memanggil hewan pendamping saat pertarungan boss',
      'Memperlambat gravitasi saat animasi kematian'
    ],
    quizExplanation: 'Coyote Time (dinamai dari kartun Wile E. Coyote) memberi pemain sedikit toleransi waktu untuk melompat meski sudah melangkah keluar tebing, mencegah rasa frustrasi akibat jatuh yang tidak adil!'
  },
  't-166': {
    headline: 'Cave Johnson Disuarakan oleh J.K. Simmons, Membawakan Monolog Amarah "Combustible Lemons"',
    story: 'Penulis naskah Valve Erik Wolpaw ingin pendiri Aperture Science, Cave Johnson, terdengar seperti taipan industri tahun 1950-an yang karismatik sekaligus tidak waras. Aktor pemenang Oscar J.K. Simmons mengisi suara pengumuman pengeras suara rekaman Cave. Simmons membawakan monolog ikonik "Lemon Peledak" (Combustible Lemons) dengan kemarahan berapi-api sambil menggebrak meja ("Aku akan menyuruh insinyurku menciptakan lemon peledak yang bisa membakar habis rumahmu!") hingga menjadi salah satu kutipan paling legendaris dalam sejarah gaming!',
    verifiedFact: 'Stephen Merchant, salah satu kreator The Office, mengisi suara Wheatley dan mengimprovisasi puluhan kalimat kepanikan kocak langsung di studio.',
    quoteOrLore: '“Ketika hidup memberimu buah lemon, jangan bikin limun. Paksa hidup mengambil kembali lemon itu! MARAHLAH!” — Cave Johnson',
    easterEggNote: 'Lagu Turret Opera ("Cara Mia Addio") di akhir game dinyanyikan oleh pasukan turret Aperture dan ditulis dalam bahasa Italia oleh Ellen McLain!',
    quizQuestion: 'Siapa yang mengisi suara pendiri eksentrik Aperture Science, Cave Johnson, di Portal 2?',
    quizOptions: [
      'Bryan Cranston',
      'J.K. Simmons',
      'Robin Williams',
      'John Goodman'
    ],
    quizExplanation: 'J.K. Simmons mengisi suara Cave Johnson, membawakan monolog lemon peledak yang legendaris dengan amarah yang luar biasa memukau!'
  },
  't-167': {
    headline: 'Supergiant Merekam 300.000 Kata Dialog Suara Agar Karakter Tidak Pernah Mengulang Kalimat',
    story: 'Dalam game roguelike tradisional, kematian biasanya berarti mendengarkan dialog NPC yang sama berulang-ulang. Penulis naskah Greg Kasavin merancang Hades dengan diagram narasi reaktif yang memuat lebih dari 300.000 kata dialog bersuara dan 30 aktor suara. Game ini memantau ribuan variabel dinamis: senjata apa yang Anda bawa, anugerah (boon) dewa apa yang membunuh Anda, berapa kali Anda berbicara dengan Megaera, hingga ikan apa yang berhasil Anda tangkap. Anda bisa bermain 100 jam tanpa pernah mendengar NPC mengulang satu baris kalimat pun!',
    verifiedFact: 'Hades menjadi video game pertama dalam sejarah yang memenangkan penghargaan bergengsi Hugo Award untuk kategori karya fiksi ilmiah dan fantasi.',
    quoteOrLore: '“Tiada jalan keluar.” — Pesan di layar pembuka Hades',
    easterEggNote: 'Mengelus anjing berkepala tiga Cerberus di antara upaya pelarian menampilkan animasi menggemaskan dan membuka pencapaian (achievement) "Good Boy"!',
    quizQuestion: 'Pencapaian sastra bersejarah apa yang diraih oleh game Hades pada tahun 2021?',
    quizOptions: [
      'Memenangkan Hadiah Pulitzer untuk Kategori Drama',
      'Menjadi video game pertama yang memenangkan Hugo Award untuk Kategori Presentasi Dramatis Terbaik',
      'Dimasukkan ke dalam Kamus Bahasa Inggris Oxford',
      'Diadaptasi menjadi musikal teater Broadway'
    ],
    quizExplanation: 'Hades mencetak sejarah sebagai video game pertama yang memenangkan penghargaan bergengsi Hugo Award berkat struktur narasinya yang luar biasa!'
  },
  't-168': {
    headline: 'Novelis Estonia Robert Kurvitz Menulis 1,2 Juta Kata di Mana Pikiran Anda Bertengkar dengan Dirinya Sendiri',
    story: 'Novelis asal Estonia Robert Kurvitz dan sekelompok seniman di Tallinn menghabiskan waktu bertahun-tahun membangun dunia Revachol. Alih-alih pertarungan fisik, konflik berlangsung di dalam kejiwaan detektif amnesia Harrier Du Bois yang hancur. Kurvitz memetakan 24 aspek psikologis unik (seperti Inland Empire, Shivers, Logic, Electrochemistry) yang terus berdebat satu sama lain dan memotong percakapan, menghasilkan mahakarya sastra interaktif sepanjang 1,2 juta kata!',
    verifiedFact: 'Saat ZA/UM memenangkan Best Narrative di The Game Awards 2019, mereka berterima kasih kepada Karl Marx dan Friedrich Engels atas pendidikan politik mereka.',
    quoteOrLore: '“Sunrise, Parabellum.” — Detektif Harrier Du Bois',
    easterEggNote: 'Anda bisa mati di ruangan paling awal dalam waktu 60 detik jika gagal dalam tes Endurance saat mencoba mengambil dasi Anda yang tersangkut di kipas angin langit-langit!',
    quizQuestion: 'Hal apa yang dapat membunuh detektif Anda di menit pertama Disco Elysium jika stat karakter Anda terlalu lemah?',
    quizOptions: [
      'Tembakan penembak runduk (sniper) dari jendela',
      'Serangan jantung fatal saat berusaha menarik dasi dari kipas angin langit-langit',
      'Meminum air keran yang sudah kedaluwarsa',
      'Tergelincir jatuh di tangga hotel'
    ],
    quizExplanation: 'Jika stat fisik Anda terlalu rapuh, memaksakan diri meraih dasi di kipas angin yang berputar akan memicu serangan jantung fatal!'
  },
  't-169': {
    headline: 'Seluruh Tata Surya Berjalan di Atas Simulasi Gravitasi Newton Real-Time yang Nyata',
    story: 'Di Outer Wilds, pergerakan planet tidak diatur oleh lintasan skrip kaku. Lead designer Alex Beachum memprogram simulasi fisika Newton secara real-time: setiap planet, bulan, komet, hingga pesawat kayu rapuh milik pemain saling memberikan gaya gravitasi nyata. Planet kembar Hourglass Twins terus memindahkan jutaan partikel pasir melintasi ruang angkasa, sementara kerak planet Brittle Hollow retak secara dinamis lalu runtuh ke dalam lubang hitam di intinya!',
    verifiedFact: 'Permainan berlangsung dalam lingkaran waktu 22 menit yang ketat, diakhiri dengan runtuhnya matahari menjadi ledakan supernova.',
    quoteOrLore: '“Alam semesta ada, dan kita ada di dalamnya.” — Naskah kuno bangsa Nomai',
    easterEggNote: 'Memanggang marshmallow di api unggun memiliki simulasi fisika nyata: jika terlalu lama terkena api marshmallow akan terbakar gosong, tetapi dipanggang perlahan akan matang cokelat keemasan sempurna!',
    quizQuestion: 'Berapa lama durasi lingkaran waktu (time loop) sebelum matahari tata surya meledak menjadi supernova di Outer Wilds?',
    quizOptions: [
      '12 menit',
      '22 menit',
      '30 menit',
      '60 menit'
    ],
    quizExplanation: 'Seluruh tata surya berputar dalam siklus waktu 22 menit yang disimulasikan secara matematis sebelum supernova memusnahkan segalanya!'
  },
  't-170': {
    headline: 'Eric Barone Bekerja Sendirian 12 Jam Sehari Selama 4,5 Tahun Demi Menciptakan Seluruh Game',
    story: 'Setelah lulus kuliah ilmu komputer dan bekerja sebagai penjaga bioskop, Eric Barone (ConcernedApe) ingin menciptakan game yang terinspirasi oleh Harvest Moon. Selama empat setengah tahun, Barone bekerja 10 hingga 12 jam sehari, 7 hari seminggu, sendirian di Seattle. Ia menggambar sendiri 10.000 sprite, menggubah 70 lagu, menulis seluruh dialog, serta memprogram engine game dari nol hingga melahirkan game yang terjual lebih dari 30 juta kopi!',
    verifiedFact: 'Barone menggambar ulang seluruh potret karakter dan merombak musiknya sebanyak tiga kali hingga mencapai standar kesempurnaannya.',
    quoteOrLore: '“Kucurahkan segalanya ke dalam Stardew Valley. Aku tak tahu apakah akan ada yang memainkannya, tapi aku harus membuktikan kemampuanku.” — Eric Barone',
    easterEggNote: 'Mengetik [74] pada nama karakter Anda menyebabkan penduduk desa memberikan Prismatic Shard setiap kali mereka menyebut nama Anda, sebuah exploit kode item yang sangat terkenal!',
    quizQuestion: 'Berapa banyak orang yang mengembangkan fenomena game pertanian Stardew Valley yang terjual puluhan juta kopi?',
    quizOptions: [
      'Tim berisi 20 developer indie yang didanai Kickstarter',
      'Hanya satu developer tunggal: Eric Barone (ConcernedApe), yang mengerjakan seluruh seni, musik, kode, dan cerita',
      'Studio kecil berisi 6 sahabat di California',
      'Tim pengembang game seluler asal Jepang'
    ],
    quizExplanation: 'Eric Barone mengembangkan Stardew Valley sendirian selama 4,5 tahun, menciptakan setiap sprite, nada musik, hingga baris kodenya!'
  },
  't-171': {
    headline: 'Moldenhauer Bersaudara Menggadaikan Rumah Demi Menggambar Tinta 50.000 Frame Animasi Manual',
    story: 'Dua bersaudara Chad dan Jared Moldenhauer ingin Cuphead terlihat 100% identik dengan kartun era 1930-an karya Fleischer Studios (seperti Betty Boop dan Popeye). Setiap frame animasi karakter digambar menggunakan pensil di kertas animasi, diberi tinta dan cat air manual dengan tangan, serta diiringi rekaman musik jazz big band asli di studio analog. Saat dana mereka habis, mereka mengambil pertaruhan terbesar: menggadaikan rumah keluarga demi menuntaskan game ini!',
    verifiedFact: 'Cuphead memuat lebih dari 50.000 frame animasi gambar tangan individual dan membutuhkan waktu pengerjaan hampir 7 tahun.',
    quoteOrLore: '“Kami menyadari bahwa untuk membuatnya autentik, tidak ada jalan pintas: setiap frame harus digambar di atas kertas sungguhan.” — Chad Moldenhauer',
    easterEggNote: 'Berbicara dengan kura-kura di dermaga Inkwell Isle Three memungkinkan Anda membuka mode filter rahasia film hitam-putih 2 warna bergaya klasik!',
    quizQuestion: 'Teknik seni apa yang digunakan Studio MDHR untuk menciptakan gaya visual autentik era 1930-an di Cuphead?',
    quizOptions: [
      'Animasi flash vektor digital dengan shader grain film',
      'Menggambar dan memberi tinta pada lebih dari 50.000 frame di kertas dengan teknik animasi tradisional 1930-an',
      'Motion capture dari boneka fisik',
      'Transfer gaya neural kecerdasan buatan (AI)'
    ],
    quizExplanation: 'Setiap frame di Cuphead digambar manual di kertas, ditinta, dan diwarnai dengan cat air menggunakan metode studio Fleischer tahun 1930-an!'
  },
  't-172': {
    headline: 'Larian Merekam 174 Jam Cutscene Sinematik dan Mempekerjakan Koordinator Intimitas',
    story: 'Swen Vincke dan Larian Studios ingin Baldur\'s Gate 3 menghadirkan kebebasan sejati layaknya bermain tabletop Dungeons & Dragons. Selama enam tahun pengembangan, Larian merekam lebih dari 174 jam cutscene sinematik (lebih dari dua kali lipat durasi seluruh serial Game of Thrones) dan menyewa koordinator intimitas teater bersertifikat untuk memandu adegan romansa motion-capture secara profesional, berhasil meraih Game of the Year 2023 dan memecahkan rekor game RPG!',
    verifiedFact: 'Game ini memiliki lebih dari 17.000 variasi ending yang dipengaruhi oleh keputusan anggota tim, kematian karakter, dan hasil quest.',
    quoteOrLore: '“Jika Anda berpikir bisa melakukan sesuatu di tabletop D&D, kami ingin engine game kami menjawab: \'Tentu, lempar dadumu.\'” — Swen Vincke',
    easterEggNote: 'Menggunakan mantra "Speak with Animals" membuka lebih dari 50 dialog bersuara penuh yang unik bersama tupai, sapi, merpati, hingga anjing di penjuru Faerûn!',
    quizQuestion: 'Berapa jam total cutscene sinematik yang direkam oleh Larian Studios untuk Baldur\'s Gate 3?',
    quizOptions: [
      '15 jam',
      '40 jam',
      'Lebih dari 174 jam cutscene sinematik',
      '500 jam'
    ],
    quizExplanation: 'Larian merekam 174 jam cutscene motion-capture sinematik luar biasa guna mengakomodasi seluruh variasi pilihan pemain!'
  },
  't-173': {
    headline: 'Ending E Mengharuskan Pemain Mengorbankan Save File Sungguhan demi Membantu Orang Asing',
    story: 'Yoko Taro merancang ending sejati NieR: Automata (Ending E) sebagai aksi solidaritas kemanusiaan yang tak terlupakan. Dalam pertempuran bullet-hell yang mustahil melawan teks kredit produksi game, pemain akan mati berulang kali hingga armada penyelamat dari pemain sungguhan di seluruh dunia datang melindungi Anda diiringi paduan suara megah "Weight of the World". Sebagai balas budi, game bertanya: "Maukah Anda menghapus seluruh save data Anda selamanya agar data Anda bisa menyelamatkan pemain lain yang sedang berjuang di belahan dunia lain?"',
    verifiedFact: 'Memilih untuk menghapus data benar-benar melenyapkan seluruh save file dari konsol Anda, disertai animasi penghapusan menu yang mengharukan.',
    quoteOrLore: '“Apakah kamu benar-benar bersedia menghapus data simpananmu demi menolong orang asing? Belum tentu mereka akan berterima kasih padamu.” — Pod 153',
    easterEggNote: 'Mengarahkan sudut kamera ke bawah rok 2B akan membuatnya menepis kamera dengan kesal dalam animasi khusus!',
    quizQuestion: 'Pengorbanan pamungkas apa yang diminta kepada pemain pada Ending E sejati NieR: Automata?',
    quizOptions: [
      'Membatalkan langganan PlayStation Plus',
      'Menghapus permanen seluruh save data agar kapalnya dapat melindungi pemain lain di sekuens credit',
      'Mengulang game dari babak prolog pada tingkat kesulitan Hard',
      'Menulis email permintaan maaf kepada Square Enix'
    ],
    quizExplanation: 'Ending E mengajak pemain mengorbankan save file perjuangan mereka agar menjadi perisai bagi pemain lain di seluruh dunia!'
  },
  't-174': {
    headline: 'Hideo Kojima Menyusuri Gurun Vulkanik Islandia Sembari Mendengarkan Low Roar demi Menemukan Konsepnya',
    story: 'Setelah perpisahan hebohnya dengan Konami pada 2015, Hideo Kojima tidak memiliki kantor, engine, maupun tim. Saat berlibur ke Islandia, Kojima mampir ke toko musik di Reykjavik dan mendengar lagu folk-elektronik melankolis dari band Low Roar. Terinspirasi oleh bentang alam pasir vulkanik hitam dan vokal syahdu Low Roar, Kojima merumuskan konsep Sam Porter Bridges yang memikul kargo melintasi Amerika pasca-apokaliptik demi menghubungkan kembali umat manusia!',
    verifiedFact: 'Mendiang vokalis Low Roar, Ryan Karazija, awalnya tidak tahu siapa itu Kojima ketika Sony melisensikan musiknya, yang menyelamatkan band indie tersebut dari kebangkrutan.',
    quoteOrLore: '“Tali menyatukan banyak hal; tongkat menjauhkan ancaman. Sebagian besar game berkisah tentang tongkat. Aku ingin membuat game tentang tali.” — Hideo Kojima',
    easterEggNote: 'Komedian Conan O\'Brien hadir sebagai karakter tersembunyi ("The Wandering MC") yang menghadiahkan tudung berang-berang kepada Sam agar bisa berenang lincah di sungai!',
    quizQuestion: 'Grup musik apa yang menginspirasi atmosfer konsep Death Stranding saat Hideo Kojima berada di Islandia?',
    quizOptions: [
      'Sigur Rós',
      'Low Roar',
      'Björk',
      'Radiohead'
    ],
    quizExplanation: 'Kojima menemukan musik Low Roar di toko kaset Reykjavik, dan lagunya menjadi nyawa emosional utama bagi Death Stranding!'
  },
  't-175': {
    headline: 'Sucker Punch Mengganti Minimap dengan "Guiding Wind" yang Berhembus Meliukkan Rumput dan Daun',
    story: 'Art director Sucker Punch Jason Connell tidak menyukai bagaimana game open-world modern memaksa pemain terus terpaku pada minimap GPS di sudut layar alih-alih menikmati pemandangan. Sucker Punch pun menciptakan "Guiding Wind": mengusap touchpad pada DualShock memanggil hembusan angin yang meliukkan padang rumput ilalang, menggugurkan bunga sakura, dan mengarahkan kepulan asap ke tujuan Jin Sakai, menjaga pemain tetap tenggelam dalam sinema samurai sejati!',
    verifiedFact: 'Sucker Punch menyertakan "Kurosawa Mode" resmi dengan film grain hitam-putih berbobot kontras tinggi dan efek audio angin yang disetujui pihak keluarga Akira Kurosawa.',
    quoteOrLore: '“Guiding Wind membuat Pulau Tsushima terasa hidup, seolah angin itu sendiri adalah mendiang ayah Jin yang menuntun jalannya.” — Jason Connell',
    easterEggNote: 'Membungkuk hormat di depan papan kayu tersembunyi di Tsushima memicu respon alam: kawanan ikan melompat dari air atau kepiting merayap berputar!',
    quizQuestion: 'Bagaimana Ghost of Tsushima memandu pemain menuju lokasi misi tanpa menggunakan minimap di layar?',
    quizOptions: [
      'Garis laser kuning berpendar di tanah',
      '"Guiding Wind", tiupan angin alami yang menggerakkan rumput, dahan pohon, dan dedaunan ke arah tujuan',
      'Burung elang terlatih yang berputar di atas lokasi target',
      'Jejak kaki bercahaya dengan sihir samurai'
    ],
    quizExplanation: 'Mengusap touchpad memanggil hembusan angin Guiding Wind yang menuntun pemain lewat dedaunan dan liukan rumput alami!'
  },
  't-176': {
    headline: 'Arsitektur Brutalis yang Bergeser Terinspirasi dari Gedung 33 Thomas Street di New York',
    story: 'Sutradara Remedy Mikael Kasurinen ingin markas Federal Bureau of Control, "The Oldest House", memancarkan suasana birokrasi paranoid Perang Dingin. Gedung ini dimodelkan langsung dari 33 Thomas Street—gedung pencakar langit telekomunikasi beton brutalis tanpa jendela di Manhattan. Di dalamnya, arsitektur beton monolitik bergeser secara dinamis, dilengkapi tabung pneumatik dan terminal komputer retro era 1960-an, menciptakan keajaiban paranormal ala SCP Foundation!',
    verifiedFact: 'Sekuens labirin "Ashtray Maze" yang memukau diiringi lagu cadas "Take Control" dari band rock Finlandia Poets of the Fall (dengan nama Old Gods of Asgard).',
    quoteOrLore: '“The Oldest House adalah tempat berkumpulnya kekuatan. Bagian dalamnya jauh lebih luas daripada luarnya, dan tempat ini menolak barang elektronik modern.” — Jesse Faden',
    easterEggNote: 'Dokumen rahasia di seluruh biro menyebut tentang peristiwa "Bright Falls A.W.E.", yang secara resmi menegaskan bahwa Control dan Alan Wake berada di semesta yang sama!',
    quizQuestion: 'Gedung pencakar langit Manhattan di dunia nyata mana yang menginspirasi tampilan luar brutalis tanpa jendela The Oldest House di Control?',
    quizOptions: [
      'Empire State Building',
      '33 Thomas Street (gedung beton tanpa jendela AT&T Long Lines Building)',
      'Flatiron Building',
      'One World Trade Center'
    ],
    quizExplanation: 'The Oldest House dimodelkan dari 33 Thomas Street, sebuah monolit beton raksasa tanpa jendela yang nyata di Kota New York!'
  },
  't-177': {
    headline: 'Suara Ekolokasi Mengerikan Para Clicker Diciptakan dari Suara Tenggorokan Aktris Misty Lee',
    story: 'Audio director Naughty Dog Phillip Kovats kesulitan menemukan efek suara untuk monster Clicker tunanetra agar tidak terdengar seperti erangan zombi biasa. Aktris suara Misty Lee berada di bilik rekaman saat Kovats menjelaskan bahwa Clicker memakai ekolokasi untuk "melihat" dalam kegelapan. Lee lalu menutup mulutnya dan mulai membunyikan bagian belakang tenggorokan serta lidahnya pada langit-langit mulut, menghasilkan bunyi klik basah yang serak dan sukses meneror jutaan pemain di seluruh dunia!',
    verifiedFact: 'Infeksi otak Cordyceps di dalam game terinspirasi dari jamur nyata Ophiocordyceps unilateralis yang menginfeksi dan mengendalikan pikiran semut di hutan hujan tropis.',
    quoteOrLore: '“Bertahan dan tetap hidup.” — Ellie',
    easterEggNote: 'Di babak prolog dalam rumah Joel, koran di atas meja wastafel kamar mandi memuat berita wabah jamur parasit, tertanggal beberapa bulan sebelum hari pecahnya infeksi!',
    quizQuestion: 'Bagaimana suara ekolokasi mengerikan para monster Clicker dibuat dalam The Last of Us?',
    quizOptions: [
      'Disintesis dari gesekan garpu plastik pada senar gitar',
      'Diperagakan langsung oleh aktris Misty Lee dengan membunyikan tenggorokan dan langit-langit mulutnya di studio',
      'Mengambil sampel suara lumba-lumba di SeaWorld',
      'Direkam menggunakan alat geiger counter di dekat bijih uranium'
    ],
    quizExplanation: 'Aktris suara Misty Lee mengimprovisasi bunyi tenggorokan serak secara langsung di studio, melahirkan suara khas Clicker yang legendaris!'
  },
  't-178': {
    headline: 'Momen John Marston Menyeberang ke Meksiko Memutar Lagu "Far Away" Jose Gonzalez Secara Real-Time',
    story: 'Ketika John Marston menaiki rakit kayu melintasi Sungai Rio Grande dan menjejakkan kaki di tanah Meksiko saat senja, game menghadirkan momen magis: seluruh suara latar memudar, dan lagu akustik "Far Away" karya musisi indie Swedia José González mengalun lembut saat Anda menunggang kuda menuju Chuparosa. Music supervisor Ivan Pavlovich merancang mesin musik dinamis sehingga lagu hanya terus berputar selama Anda tetap di atas kuda, menciptakan salah satu momen puitis paling membekas dalam sejarah game open-world!',
    verifiedFact: 'Jika pemain turun dari kudanya atau menghunus senjata saat perjalanan tersebut, lagunya akan segera dijeda atau memudar pelan.',
    quoteOrLore: '“Step in front of a runaway train just to see how it feels... Far away, far away.” — José González, "Far Away"',
    easterEggNote: 'Ekspansi "Undead Nightmare" dipuji para kritikus sebagai salah satu DLC horor mandiri terbaik dalam sejarah industri video game!',
    quizQuestion: 'Lagu terkenal apa yang mengalun saat John Marston melintasi perbatasan menuju Meksiko di Red Dead Redemption?',
    quizOptions: [
      '"Hurt" oleh Johnny Cash',
      '"Far Away" oleh José González',
      '"Desperado" oleh The Eagles',
      '"Knockin\' on Heaven\'s Door" oleh Bob Dylan'
    ],
    quizExplanation: 'Balada akustik José González "Far Away" mengalun lembut tanpa jeda saat John Marston memacu kudanya menyongsong senja Meksiko!'
  },
  't-179': {
    headline: 'Unknown Worlds Menghapus Seluruh Senjata Api Mematikan Menyusul Tragedi Sandy Hook 2012',
    story: 'Menyusul penembakan tragis di Sekolah Dasar Sandy Hook pada tahun 2012, direktur Unknown Worlds Charlie Cleveland mengambil keputusan tegas: Subnautica tidak boleh memiliki senjata api mematikan sama sekali. Alih-alih menembaki predator alien dengan shotgun, pemain harus memakai stasis rifle untuk membekukan mereka, propulsion cannon untuk mendorong mereka, atau mengemudikan kapal selam secara senyap menghindari monster Leviathan yang mengerikan, membuktikan bahwa ketegangan bertahan hidup jauh lebih mencekam tanpa senjata api!',
    verifiedFact: 'Reaper Leviathan yang mengerikan menggunakan sistem ekolokasi nyata di dalam game: jika Anda bisa mendengar raungannya, berarti ia bisa melihat Anda.',
    quoteOrLore: '“Kami tidak ingin menyelesaikan masalah dalam game dengan senjata api lagi. Bertahan hidup di lautan tanpa peluru membuat Anda benar-benar menghormati kedalaman samudra.” — Charlie Cleveland',
    easterEggNote: 'Kapal selam Cyclops memiliki sistem alarm kebakaran darurat yang memutar lagu electronic dance berjudul "Abandon Ship" di saat mesinnya meledak terbakar!',
    quizQuestion: 'Mengapa Unknown Worlds Entertainment memutuskan untuk tidak menyertakan senjata api mematikan dalam Subnautica?',
    quizOptions: [
      'Balistika di bawah air terlalu rumit untuk diprogram',
      'Sebagai bentuk protes sadar terhadap kekerasan senjata api menyusul tragedi Sandy Hook',
      'Penerbit game menuntut rating ramah anak PEGI 3',
      'Sisik ikan alien kebal terhadap peluru timah'
    ],
    quizExplanation: 'Charlie Cleveland melarang senjata api mematikan sebagai respon terhadap penembakan Sandy Hook, menghasilkan game bertahan hidup yang bertumpu pada kecerdikan dan strategi menghindar!'
  },
  't-180': {
    headline: 'Lucas Pope Menghabiskan Empat Tahun Membangun Engine 1-Bit Dithering Meniru Komputer Macintosh 1984',
    story: 'Setelah sukses dengan Papers, Please, developer tunggal Lucas Pope ingin merekonstruksi grafis monokrom 1-bit tajam berbobot kontras tinggi khas komputer Macintosh 1984 masa kecilnya ke dalam dunia 3D modern. Pope menulis shader dithering khusus yang mengubah pencahayaan 3D kompleks, percikan ombak lautan, dan anatomi kapal menjadi piksel hitam-putih yang tajam. Pemain menaiki kapal hantu Obra Dinn berbekal jam saku ajaib ("Momento Mortem") untuk mengungkap identitas dan penyebab kematian seluruh 60 awak kapal!',
    verifiedFact: 'Game ini memenangkan penghargaan tertinggi Grand Prize di ajang Independent Games Festival (IGF) pada tahun 2019.',
    quoteOrLore: '“Jam saku ajaib ini memungkinkan Anda membekukan waktu dan menelusuri detik-detik tepat saat seseorang menemui ajalnya.” — Lucas Pope',
    easterEggNote: 'Game ini memungkinkan Anda mengganti profil warna monitor monokrom antara Macintosh klasik, Commodore 1084, IBM 5151, hingga Zenith ZVM 1240!',
    quizQuestion: 'Estetika komputer retro apa yang diciptakan kembali oleh Lucas Pope dalam Return of the Obra Dinn?',
    quizOptions: [
      'Grafis 4 warna CGA sian dan magenta',
      'Dithering monokrom 1-bit yang terinspirasi layar Macintosh awal tahun 1984',
      'Monitor arkade wireframe vektor',
      'Garis scanline video komposit Commodore 64'
    ],
    quizExplanation: 'Lucas Pope mengembangkan shader dithering 1-bit demi menghadirkan kembali estetika monokrom tajam dari monitor Macintosh 1984!'
  },
  't-181': {
    headline: 'Audio Director Martin Stig Andersen Merekam Efek Suara Melalui Tengkorak Manusia Asli',
    story: 'Demi menciptakan lanskap audio yang mencekam dan teredam layaknya mimpi buruk distopia totaliter, audio director Playdead Martin Stig Andersen merasa synthesizer standar terdengar terlalu bersih. Andersen pun memperoleh tengkorak manusia medis asli dari laboratorium. Ia memasang mikrofon kontak pada tulang, menyalurkan audio game lewat transduser elektro-akustik di dalam tengkorak, dan merekam ulang getaran suara yang merambat melalui tulang manusia untuk menghasilkan resonansi konduksi tulang yang mengerikan!',
    verifiedFact: 'Sekuens akhir game yang mengejutkan memperlihatkan sang bocah terserap ke dalam "The Huddle"—gumpalan biomassa daging dari anggota tubuh manusia yang mengamuk menerobos fasilitas.',
    quoteOrLore: '“Memutar audio lewat tengkorak manusia memberikan kehangatan suara yang hampa dan suram, sesuatu yang mustahil dipalsukan oleh equalizer digital mana pun.” — Martin Stig Andersen',
    easterEggNote: 'Memutuskan seluruh 14 bola bercahaya rahasia di dalam bunker membuka ending rahasia di mana Anda mencabut steker utama dari seluruh simulasi!',
    quizQuestion: 'Benda nyata mengejutkan apa yang digunakan komposer Martin Stig Andersen untuk merekam efek suara game Inside?',
    quizOptions: [
      'Lambung kapal selam yang terbengkalai',
      'Tengkorak manusia medis asli yang dipasangi mikrofon kontak untuk konduksi tulang',
      'Lonceng kapal karam dari Laut Baltik',
      'Mesin pencacah daging industri'
    ],
    quizExplanation: 'Andersen menyalurkan audio melalui tengkorak manusia asli demi merekam resonansi getaran tulang yang dingin dan menyeramkan!'
  },
  't-182': {
    headline: 'Dikembangkan oleh Koperasi Pekerja Anarko-Sindikalis di Mana Semua Karyawan Digaji Sama Rata',
    story: 'Pengembang asal Prancis Motion Twin beroperasi sebagai koperasi pekerja setara: tidak ada bos, manajer tingkat menengah, ataupun CEO. Setiap pekerja—dari lead programmer dan seniman hingga staf pemasaran—menerima gaji bulanan yang sama persis dan memiliki hak suara yang setara dalam keputusan kreatif. Ketika Dead Cells menjadi fenomena global berpenghasilan jutaan dolar, keuntungannya dibagi rata kepada seluruh pekerja, membuktikan bahwa model koperasi mandiri bisa sukses besar!',
    verifiedFact: 'Dead Cells memperkenalkan senjata wajan "Vorpan", memungkinkan pemain memukul musuh dengan wajan besi yang memberikan serangan kritikal saat mengenai wajah musuh.',
    quoteOrLore: '“Kami tidak memiliki bos. Semua orang memiliki suara yang sama dan gaji yang setara. Dead Cells lahir dari rasa saling menghargai.” — Manifesto Motion Twin',
    easterEggNote: 'Karakter utama sebenarnya adalah gumpalan lendir homunculus hijau abadi yang memiliki kesadaran dan merasuki mayat tanpa kepala dari para tahanan yang dieksekusi!',
    quizQuestion: 'Struktur organisasi unik apa yang dijalankan oleh Motion Twin, pengembang game Dead Cells?',
    quizOptions: [
      'Anak perusahaan dari konglomerat Jepang',
      'Koperasi pekerja anarko-sindikalis tanpa bos dengan upah setara bagi seluruh staf',
      'Yayasan amal nirlaba bidang pendidikan',
      'Biro kesenian milik pemerintah'
    ],
    quizExplanation: 'Motion Twin beroperasi murni sebagai koperasi pekerja tanpa bos, di mana semua pengembang mendapatkan gaji yang setara!'
  },
  't-183': {
    headline: 'Dibuat Menggunakan GameMaker oleh Dua Pemuda Swedia di Apartemen Sempit',
    story: 'Jonatan Söderström (Cactus) dan Dennis Wedin sempat bangkrut dan tinggal di apartemen sempit di Gothenburg dan Stockholm. Menggunakan software 2D GameMaker, mereka merancang mimpi buruk neon bernuansa tahun 1989 di mana pemain membantai mafia Rusia dalam pertarungan sudut pandang atas (top-down) mematikan satu-serangan sembari mengenakan topeng hewan karet. Didukung soundtrack synthwave hipnotis (Carpenter Brut, Perturbator, Sun Araw), Hotline Miami memicu ledakan estetika pop culture synthwave sepanjang era 2010-an!',
    verifiedFact: 'Game ini begitu fenomenal hingga membuat Devolver Digital menjadikan Dennaton Games mitra indie utama mereka, mendefinisikan citra punk pemberontak Devolver.',
    quoteOrLore: '“Apakah kamu suka menyakiti orang lain?” — Richard the Rooster',
    easterEggNote: 'Mengenakan topeng angsa Rasmus the Swan membuat kepingan puzzle rahasia berpendar dengan warna neon terang di seluruh lokasi kejahatan!',
    quizQuestion: 'Topeng hewan apa yang menyapa pemain di awal Hotline Miami dan melontarkan pertanyaan "Apakah kamu suka menyakiti orang lain?"',
    quizOptions: [
      'Tony the Tiger',
      'Richard the Rooster',
      'Rasmus the Swan',
      'Aubrey the Pig'
    ],
    quizExplanation: 'Topeng ayam jago Richard the Rooster menjadi interogator psikologis misterius nan dingin dalam rangkaian sekuens mimpi surealis!'
  },
  't-184': {
    headline: 'Mematuhi Palet Warna Otentik 54 Warna Hardware NES dengan Hanya Empat Pengecualian',
    story: 'Mantan developer WayForward membentuk Yacht Club Games untuk menciptakan game yang terasa seperti mahakarya NES tahun 1990 yang baru ditemukan. Programmer David D\'Angelo menetapkan batasan hardware yang ketat: seluruh sprite dan latar belakang mematuhi palet 54 warna asli Nintendo Entertainment System. Tim hanya membuat empat pengecualian sengaja dari batasan NES: tampilan layar lebar 16:9, ketiadaan kedipan sprite (zero flickering), lapisan parallax scrolling, serta register audio VRC6 5-channel yang diperluas!',
    verifiedFact: 'Komposer Jake Kaufman menggubah soundtrack game ini di Famitracker, menghasilkan file audio NSF murni yang sepenuhnya kompatibel dengan chip NES.',
    quoteOrLore: '“Kami ingin Shovel Knight terlihat bukan seperti tampilan fisik game NES sebenarnya, melainkan bagaimana kenangan masa kecil Anda mengingatnya.” — Sean Velasco',
    easterEggNote: 'Shovel Knight menjadi karakter indie pertama dalam sejarah yang mendapatkan figur Amiibo fisik resmi dari Nintendo!',
    quizQuestion: 'Batasan hardware autentik apa yang dipatuhi secara ketat oleh Yacht Club Games saat menciptakan Shovel Knight?',
    quizOptions: [
      'Memuat seluruh game ke dalam ukuran file 256KB',
      'Palet warna asli 54 warna konsol NES',
      'Merekam audio ke dalam kaset magnetik 8-track',
      'Membatasi kontrol permainan hanya pada dua tombol kontroler NES'
    ],
    quizExplanation: 'Yacht Club mengunci seluruh aset visual pada palet asli 54 warna milik konsol NES 1985 legendaris!'
  },
  't-185': {
    headline: 'Misi "Effect and Cause" Merender Dua Era Berbeda Secara Bersamaan dalam Waktu Nyata',
    story: 'Dalam misi legendaris "Effect and Cause", Respawn Entertainment melengkapi pilot Jack Cooper dengan sarung tangan penjelajah waktu. Alih-alih memuat era berbeda lewat layar pemuatan (loading screen), programmer Chris Dionne merender fasilitas riset modern yang hancur dan fasilitas utuh 5 tahun sebelumnya secara bersamaan, disusun terpisah jarak 1.000 kaki dalam ruang koordinat 3D. Menekan tombol langsung menteleportasi koordinat Cooper di antara dua dunia aktif tersebut dalam satu frame!',
    verifiedFact: 'Mekanik pergerakan Titanfall 2 (seperti slide-hopping, wall-running, dan momentum pergerakan) diadaptasi ke dalam Apex Legends pada tahun 2019.',
    quoteOrLore: '“Protokol 3: Lindungi Sang Pilot.” — BT-7274',
    easterEggNote: 'BT-7274 memberikan acungan jempol hangat kepada Jack Cooper pada adegan klimaks, yang menjadi salah satu momen paling menyentuh dalam sejarah FPS modern!',
    quizQuestion: 'Bagaimana Respawn Entertainment menciptakan efek perjalanan waktu instan pada misi "Effect and Cause" di Titanfall 2?',
    quizOptions: [
      'Dengan memutar rekaman frame video terkompresi',
      'Dengan merender kedua era waktu sekaligus dalam ruang 3D dan menteleportasi pemain di antara keduanya',
      'Dengan membalik buffer input pemain di RAM',
      'Dengan menukar palet tekstur pada GPU'
    ],
    quizExplanation: 'Kedua era waktu dimuat secara bersamaan dalam ruang koordinat 3D, memungkinkan sarung tangan waktu menteleportasi Jack Cooper seketika tanpa loading!'
  },
  't-186': {
    headline: 'Estetika Visual Terinspirasi Poster Sablon WPA National Park Service Tahun 1930-an',
    story: 'Desainer grafis dan ilustrator Olly Moss bergabung dengan Campo Santo untuk mengarahkan identitas visual Firewatch. Alih-alih mengejar realisme kaku, Moss terinspirasi oleh poster perjalanan taman nasional era 1930-an karya Works Progress Administration (WPA) program New Deal. Seniman lingkungan Jane Ng menerjemahkan karya sablon warna terbatas Moss (siluet berlapis gunung berkabut, senja jingga keemasan, dan deretan pohon pinus) menjadi hutan 3D yang terasa seperti lukisan antik hidup!',
    verifiedFact: 'Rich Sommer (aktor Mad Men) dan Cissy Jones merekam ribuan baris percakapan radio di ruangan studio yang sama demi menangkap kedekatan obrolan yang alami.',
    quoteOrLore: '“Hubungan antara Henry dan Delilah membuktikan bahwa sebuah walkie-talkie genggam sanggup menopang seluruh beban emosional sebuah game.” — Sean Vanaman',
    easterEggNote: 'Pemain bisa mengambil foto menggunakan kamera sekali pakai dalam game, dan Campo Santo sempat menyediakan layanan mencetak serta mengirimkan foto fisik mengkilap asli ke rumah Anda!',
    quizQuestion: 'Gerakan seni bersejarah apa yang menginspirasi palet warna dan poster dalam Firewatch (2016)?',
    quizOptions: [
      'Arsitektur geometris Bauhaus 1920-an',
      'Poster sablon taman nasional program New Deal WPA era 1930-an',
      'Ilustrasi perlombaan antariksa Uni Soviet 1950-an',
      'Pop art era 1970-an'
    ],
    quizExplanation: 'Olly Moss mendasarkan estetika jingga keemasan yang menawan pada poster sablon perjalanan taman nasional WPA era 1930-an!'
  },
  't-187': {
    headline: 'Adegan Lamunan di Pabrik Pengalengan Ikan Memenangkan BAFTA Berkat Narasi Ruang yang Brilian',
    story: 'Creative director Ian Dallas ingin mensimulasikan sensasi psikologis dari disosiasi mental. Dalam kisah Lewis Finch, stik analog kanan pemain secara mekanis memotong kepala ikan di ban berjalan dalam ritme pabrik yang monoton, sementara stik analog kiri secara bersamaan mengendalikan lamunan kerajaan fantasi yang kian meluas di benak Lewis. Saat lamunan kerajaan tersebut membesar dan memenuhi seluruh layar, Lewis kehilangan kontak dengan kenyataan—menciptakan salah satu adegan naratif paling dahsyat dalam sejarah media interaktif!',
    verifiedFact: 'What Remains of Edith Finch memenangkan predikat Best Game di British Academy Games Awards (BAFTA) 2018, mengalahkan Super Mario Odyssey dan Zelda: Breath of the Wild.',
    quoteOrLore: '“Lewis tidak membenci pekerjaannya. Pekerjaan itu hanya tidak membutuhkan cukup banyak bagian dari dirinya.” — Edith Finch',
    easterEggNote: 'Rumah keluarga Finch dirancang tanpa pintu kamar tidur biasa; setiap kamar kerabat yang tertimpa kutukan disegel permanen dan hanya menyisakan lubang intip setelah kematian mereka!',
    quizQuestion: 'Dua tindakan fisik apa yang harus dilakukan pemain secara bersamaan pada adegan pabrik ikan Lewis Finch?',
    quizOptions: [
      'Mengemudikan perahu sembari menembakkan meriam',
      'Memotong ikan dengan satu stik analog sembari mengendalikan lamunan kerajaan fantasi dengan stik lainnya',
      'Mengetik catatan harian sembari berlari dari serigala',
      'Memainkan piano sembari menghindari reruntuhan bata'
    ],
    quizExplanation: 'Pemain memotong ikan berulang-ulang dengan stik kanan sembari bersamaan mengendalikan lamunan kerajaan fantasi yang meluas dengan stik kiri!'
  },
  't-188': {
    headline: 'Insomniac Merekam Dua Versi Suara Penuh untuk Peter Parker: Saat Diam vs. Berayun di Udara',
    story: 'Setiap kali Peter Parker berbicara dengan Bibi May atau Mary Jane lewat earphone-nya, Insomniac Games menyadari bahwa suara yang tenang dan santai saat berayun berkecepatan 80 mil per jam terasa sangat tidak realistis. Lead audio designer Dwight Okahara pun meminta pengisi suara Yuri Lowenthal merekam setiap baris dialog open-world sebanyak dua kali: satu dengan nada bicara santai biasa, dan satu lagi dengan nada terengah-engah seolah tengah berolahraga kardio berat. Engine game menukar kedua trek suara tersebut secara dinamis setiap kali Spider-Man mulai berayun di udara!',
    verifiedFact: 'Mesin ayunan jaring bergantung pada jangkar fisika nyata: setiap helai jaring menempel secara fisik ke tepi gedung pencakar langit atau jembatan nyata.',
    quoteOrLore: '“Jika Spider-Man sedang berayun di antara gedung pencakar langit, suaranya harus terdengar seperti orang yang sedang melakukan latihan kardio berat.” — Yuri Lowenthal',
    easterEggNote: 'Melakukan tos (high-five) dengan pejalan kaki di jalanan Manhattan terkadang membuat warga mengajak Spider-Man berswafoto atau melontarkan lelucon garing!',
    quizQuestion: 'Mengapa Yuri Lowenthal merekam dua rekaman vokal terpisah untuk setiap dialog open-world di Marvel\'s Spider-Man?',
    quizOptions: [
      'Satu dalam bahasa Inggris dan satu dalam bahasa Spanyol',
      'Satu versi santai saat diam dan satu versi terengah-engah saat Spider-Man aktif berayun di udara',
      'Satu untuk Peter Parker dan satu untuk Miles Morales',
      'Satu untuk siang hari dan satu untuk malam hari'
    ],
    quizExplanation: 'Insomniac merekam dua versi vokal penuh: versi santai dan versi terengah-engah yang bertukar secara mulus saat pemain berayun!'
  },
  't-189': {
    headline: 'Guerrilla Mengubah Engine Koridor Linier "Killzone" Menjadi Ekosistem Terbuka yang Hidup',
    story: 'Sebelum melahirkan Horizon, studio asal Belanda Guerrilla Games hanya pernah membuat game shooter linier bernuansa gelap seperti Killzone. Demi menciptakan alam liar pasca-apokaliptik tempat Aloy bertualang, technical director Michiel van der Leeuw merombak Decima Engine dari nol. Mereka memprogram 25 spesies dinosaurus robotik unik lengkap dengan perilaku kawanan, perusakan pelindung armor bertingkat, dan rute wilayah ekologis, sehingga seekor Thunderjaw bisa bertarung melawan kawanan Glinthawk jika saling berpapasan!',
    verifiedFact: 'Hideo Kojima memilih Decima Engine milik Guerrilla untuk menggerakkan Death Stranding, memujinya sebagai mahakarya teknologi rendering.',
    quoteOrLore: '“Bumi ini bukanlah milik kita, melainkan harta titipan yang kita jaga untuk generasi mendatang.” — Elisabet Sobeck',
    easterEggNote: 'Robot raksasa Tallneck berfungsi sebagai menara panjat yang dapat di-override Aloy di kepalanya yang pipih dan melingkar, memancarkan gelombang radar yang membuka peta sekitar!',
    quizQuestion: 'Engine game berkinerja tinggi apa yang dikembangkan oleh Guerrilla Games dan kemudian dibagikan kepada Hideo Kojima untuk Death Stranding?',
    quizOptions: [
      'Unreal Engine 4',
      'Decima Engine',
      'Frostbite Engine',
      'AnvilNext Engine'
    ],
    quizExplanation: 'Guerrilla mengembangkan Decima Engine, yang menggerakkan Horizon Zero Dawn sekaligus mahakarya Death Stranding garapan Kojima!'
  },
  't-190': {
    headline: 'Creative Director Hugo Martin Merancang Pertarungan sebagai Catur Cepat Berkecepatan Tinggi',
    story: 'Di DOOM Eternal, sekadar berlari dan menembak apa pun di depan Anda akan berujung maut seketika. Creative director Hugo Martin merancang alur pertempuran sebagai "catur kilat berkecepatan tinggi dengan shotgun": membunuh dengan Chainsaw menghasilkan amunisi, membakar dengan Flame Belch menjatuhkan serpihan armor, dan Glory Kill memulihkan darah (health). Setiap senjata memiliki fungsi taktis terhadap kelemahan iblis tertentu (seperti merontokkan turret Arachnotron dengan tembakan presisi), memaksa manajemen sumber daya non-stop pada 120 FPS!',
    verifiedFact: 'Engine id Tech 7 dirancang sedemikian rupa hingga sanggup mencapai kecepatan luar biasa 1.000 frame per detik pada perangkat komputer kelas atas.',
    quoteOrLore: '“Melawan segala kejahatan yang bisa dibangkitkan Neraka, segala kekejian yang bisa dihasilkan manusia, kami hanya akan mengirimkan kepada mereka... dirimu. Cakar dan cabik, hingga semuanya tuntas.” — Raja Novik',
    easterEggNote: 'Di dalam Fortress of Doom, kamar pribadi Doom Slayer memiliki PC gaming tempat Anda dapat memainkan game asli DOOM (1993) dan DOOM II secara lengkap tanpa sensor!',
    quizQuestion: 'Sumber daya apa yang dijatuhkan oleh para iblis ketika dibakar menggunakan senjata Flame Belch di DOOM Eternal?',
    quizOptions: [
      'Amunisi plasma',
      'Serpihan pelindung (armor shards)',
      'Paket pemulih darah (health stimpacks)',
      'Sel energi senjata BFG'
    ],
    quizExplanation: 'Membakar iblis menjatuhkan armor, gergaji mesin menjatuhkan amunisi, dan glory kill memulihkan darah dalam segitiga manajemen sumber daya Hugo Martin!'
  },
  't-191': {
    headline: 'Remedy Menyematkan Drama Musikal Rock Live-Action Penuh 20 Menit ke dalam Game',
    story: 'Tiga belas tahun setelah game perdananya, creative director Sam Lake mewujudkan salah satu inovasi paling berani dalam sejarah video game melalui babak "We Sing". Di tengah kegelapan mimpi buruk Kota New York, Alan Wake melangkah ke panggung opera rock live-action berdurasi 20 menit yang dibawakan oleh Old Gods of Asgard (Poets of the Fall) bersama Sam Lake sendiri yang menari mengenakan tuksedo. Diiringi petikan gitar rock menggelegar, lingkungan bergeser mulus antara rekaman video nyata dan gameplay survival horror!',
    verifiedFact: 'Alan Wake 2 memenangkan Best Game Direction, Best Narrative, dan Best Art Direction di The Game Awards 2023.',
    quoteOrLore: '“Tunjukkan padaku sang Juara Cahaya! Kan kutunjukkan padamu sang Pembawa Kegelapan!” — Old Gods of Asgard, "Herald of Darkness"',
    easterEggNote: 'Fitur "Mind Place" memungkinkan agen FBI Saga Anderson menganalisis profil tersangka dan menempelkan bukti pada papan kasus virtual secara real-time!',
    quizQuestion: 'Lagu rock apa yang menjadi sajian utama dalam panggung musikal live-action Alan Wake 2 di The Dark Place?',
    quizOptions: [
      'Take Control',
      'Herald of Darkness',
      'The Poet and the Muse',
      'Children of the Elder God'
    ],
    quizExplanation: 'Old Gods of Asgard membawakan lagu "Herald of Darkness", lengkap dengan koreografi tarian live-action Sam Lake yang mengenakan tuksedo!'
  },
  't-192': {
    headline: 'Setiap Objek Lingkungan dan Musuh di Dunia Bergerak Selaras dengan BPM Musik',
    story: 'Sutradara John Johanas dan Tango Gameworks (terkenal lewat game horor The Evil Within) diam-diam mengembangkan game aksi ritmis bergaya kartun akhir pekan. Johanas merancang game agar setiap elemen—ventilasi uap, ban berjalan pabrik, indikator antarmuka, debu langkah kaki, serangan laser musuh, hingga kombo gitar—bergerak selaras dengan ketukan per menit (BPM) lagu-lagu rock berlisensi dari The Black Keys, Nine Inch Nails, dan The Prodigy!',
    verifiedFact: 'Microsoft dan Bethesda merilis langsung (shadow-drop) Hi-Fi RUSH tanpa pengumuman promosi sebelumnya di siaran langsung Xbox Developer_Direct dan langsung mendulang pujian kritis.',
    quoteOrLore: '“Namaku Chai! Aku ini bintang rock!” — Chai dan kucing robotiknya, 808',
    easterEggNote: 'Kucing robot pendamping Chai, 808, melayang di sisinya dan memancarkan gelombang suara bercahaya yang berfungsi sebagai metronom ketukan irama!',
    quizQuestion: 'Bagaimana cara game aksi ritmis Hi-Fi RUSH pertama kali dirilis ke publik pada Januari 2023?',
    quizOptions: [
      'Setelah kampanye pemasaran jutaan dolar selama 3 tahun',
      'Dirilis mendadak (shadow-drop) di Game Pass dan PC tanpa pengumuman awal pada hari diperkenalkannya',
      'Eksklusif sebagai hadiah pendukung Kickstarter',
      'Sebagai game gratis di peramban web'
    ],
    quizExplanation: 'Bethesda dan Tango Gameworks mengumumkan sekaligus merilis Hi-Fi RUSH secara instan pada hari yang sama tanpa kabar sebelumnya!'
  },
  't-193': {
    headline: 'Memprogram Rantai Makanan Ekologis Alami di Mana Monster Predator Wyvern Saling Memangsa',
    story: 'Dalam transisi waralaba ini ke konsol generasi modern, sutradara Yuya Tokuda dan produser Ryozo Tsujimoto menghapus layar pemuatan antarzona dan merancang jaring makanan yang hidup. Para monster tidak hanya berdiam menunggu pemain: Great Jagras menelan mangsa herbivora utuh lalu kembali menyuapi kawanannya, sementara predator puncak Anjanath aktif memburu Jagras, dan Rathalos akan menukik dari angkasa memicu "Turf War" brutal yang sepenuhnya alami!',
    verifiedFact: 'Monster Hunter: World menjadi video game terlaris nomor satu dalam 45 tahun sejarah Capcom, menembus penjualan lebih dari 25 juta kopi.',
    quoteOrLore: '“Kami tidak hanya membangun arena monster; kami membangun ekosistem di mana para monster menjalani kehidupannya sendiri.” — Yuya Tokuda',
    easterEggNote: 'Babi peliharaan Poogie di Astera bisa dielus mengikuti ketukan musik jingle, dan bisa didandani dengan kostum koki serta lebah yang menggemaskan!',
    quizQuestion: 'Rekor penjualan apa yang dipegang oleh Monster Hunter: World bagi penerbit Capcom?',
    quizOptions: [
      'Game yang paling cepat mendapatkan diskon harga',
      'Video game terlaris nomor satu sepanjang sejarah berdirinya Capcom (lebih dari 25 juta kopi)',
      'Game paling mahal yang pernah diproduksi di Osaka',
      'Game Capcom pertama yang dikembangkan seluruhnya dalam bahasa Inggris'
    ],
    quizExplanation: 'Monster Hunter: World adalah judul terlaris sepanjang sejarah Capcom, melampaui seluruh rekor Resident Evil dan Street Fighter sebelumnya!'
  },
  't-194': {
    headline: 'Mega Crit Memelopori Genre Roguelike Deckbuilder Berkat Analisis Jutaan Metrik Kartu',
    story: 'Developer indie asal Seattle Anthony Giovannetti dan Casey Yano menciptakan subgenre baru yang memicu lahirnya ratusan game serupa. Selama masa early access, Mega Crit membangun sistem analisis otomatis yang memantau persentase kemenangan dan kekalahan setiap kartu dari ribuan sesi permainan komunitas. Jika sebuah kartu dipilih 90% dari waktu atau memiliki rasio kemenangan yang terlalu dominan, kartu tersebut disesuaikan ulang setiap pekan hingga sinergi dan keseimbangan matematisnya sempurna!',
    verifiedFact: 'Keempat karakter di game ini (Ironclad, Silent, Defect, Watcher) masing-masing memiliki mekanik inti kartu yang sepenuhnya unik.',
    quoteOrLore: '“Menyeimbangkan game deckbuilder bukan soal intuisi; melainkan ribuan jam telemetri statistik kartu.” — Anthony Giovannetti',
    easterEggNote: 'Menerima kutukan (curse) dari paus Neow sebagai imbalan boss relic langka adalah strategi berisiko tinggi andalan para speedrunner papan atas!',
    quizQuestion: 'Genre game apa yang dipelopori dan dipopulerkan oleh Mega Crit melalui perilisan Slay the Spire pada tahun 2019?',
    quizOptions: [
      'Battle Royale',
      'Roguelike Deckbuilder',
      'Auto-Battler',
      'Hero Extraction Shooter'
    ],
    quizExplanation: 'Slay the Spire melahirkan sekaligus memantapkan genre roguelike deckbuilder modern yang menginspirasi puluhan judul penerus!'
  },
  't-195': {
    headline: 'Masaru Yamamura Merevolusi Pertarungan Mecha Lewat Mekanik Stagger Khas Soulslike',
    story: 'Sepuluh tahun setelah Armored Core V, FromSoftware kembali ke akarnya dengan menunjuk lead designer Sekiro Masaru Yamamura sebagai sutradara. Yamamura menyuntikkan agresi kinetik Sekiro ke dalam pertarungan robot industri berat melalui sistem stagger "Attitude Control System" (ACS). Dengan menghujani mecha musuh menggunakan tembakan balistik dan roket bahu secara terus-menerus, kestabilan mereka akan runtuh dan memicu korsleting stagger, membuka celah untuk tebasan pedang laser mematikan dari jarak dekat!',
    verifiedFact: 'Armored Core VI terjual lebih dari 3 juta kopi hanya dalam dua bulan pertamanya, melampaui gabungan total penjualan 15 seri Armored Core sebelumnya.',
    quoteOrLore: '“Aku takkan berhenti! Aku akan terbang tinggi! Saksikan aku, Walter!” — Rusty / V.IV saat penyerbuan kapal Xylem',
    easterEggNote: 'Boss pembuka Chapter 1 yang terkenal brutal, "PCA Heavy Combat Helicopter", memaksa pemain berhenti menembak dari kejauhan dan langsung terbang menebasnya dari jarak dekat!',
    quizQuestion: 'Sistem pertarungan apa dari Sekiro yang diadaptasi oleh sutradara Masaru Yamamura ke dalam Armored Core VI?',
    quizOptions: [
      'Serangan mengendap-endap dari balik semak rumput',
      'Meteran stagger Attitude Control System (ACS) yang melumpuhkan musuh saat postur kestabilannya hancur',
      'Mekanik wabah penyakit Dragonrot',
      'Kemampuan bangkit dari kematian dua kali di medan perang'
    ],
    quizExplanation: 'Yamamura mengadaptasi sistem kehancuran postur Sekiro menjadi kelebihan beban ACS robotik untuk menghasilkan serangan kritikal yang dahsyat!'
  },
  't-196': {
    headline: 'Idris Elba Terlibat Langsung Membentuk Sosok Tragis Agen Rahasia Solomon Reed',
    story: 'Untuk ekspansi besar Phantom Liberty yang berlatar di distrik tanpa hukum Dogtown, CD Projekt Red merekrut pemenang Golden Globe Idris Elba untuk memerankan agen rahasia Solomon Reed. Elba tidak hanya menyumbangkan wajah dan suaranya; ia menghabiskan berjam-jam memakai setelan motion-capture di Warsawa, memberikan nuansa mendalam pada sosok agen intelijen FIA yang setia pada tugas namun dibutakan oleh kesetiaannya pada New USA sampai tak sadar bahwa dirinya hanyalah pion yang siap dibuang!',
    verifiedFact: 'Phantom Liberty menyempurnakan salah satu kisah kebangkitan terhebat dalam sejarah industri game, mengubah Cyberpunk dari peluncuran bermasalah pada 2020 menjadi mahakarya yang dipuji luas.',
    quoteOrLore: '“Permainan ini sudah dicurangi sejak awal, V. Tapi kau tetap bermain, karena pilihannya hanyalah tidak berbuat apa-apa.” — Solomon Reed',
    easterEggNote: 'Implan cyberware milik Songbird terinfeksi oleh AI liar dari balik Blackwall, memancarkan korupsi data merah yang mengerikan saat ia menyalurkan kekuatannya!',
    quizQuestion: 'Aktor Hollywood mana yang memerankan agen tidur FIA Solomon Reed di Cyberpunk 2077: Phantom Liberty?',
    quizOptions: [
      'Keanu Reeves',
      'Idris Elba',
      'Giancarlo Esposito',
      'Mads Mikkelsen'
    ],
    quizExplanation: 'Idris Elba membintangi karakter Solomon Reed, mengisi motion capture penuh dan suara untuk kisah spionase bertensi tinggi ini!'
  },
  't-197': {
    headline: 'Developer Tunggal LocalThunk Menciptakan Fenomena Global Ini Meski Jarang Bermain Poker Asli',
    story: 'Developer indie asal Kanada LocalThunk menghabiskan dua tahun memprogram Balatro menggunakan framework Lua ringan bernama LÖVE. Ironisnya, LocalThunk bahkan hampir tidak pernah bermain poker sungguhan; ia justru terinspirasi oleh permainan kartu Big Two (Capsa Banting) dan efek audio-visual mesin slot. Dengan menghadirkan 150 kartu Joker berkekuatan luar biasa yang memutarbalikkan rumus matematika dan memicu rantai pengganda jutaan keping chip, Balatro menjadi sensasi viral terbesar tahun 2024 dan terjual jutaan kopi!',
    verifiedFact: 'Balatro terjual lebih dari 1 juta kopi hanya dalam bulan pertamanya, dan meraih berbagai nominasi Game of the Year.',
    quoteOrLore: '“Aku tidak berniat membuat game judi; aku sedang membangun arena bermain matematis dengan angka-angka yang meledak dan bunyi klik CRT yang memuaskan.” — LocalThunk',
    easterEggNote: 'Garis scanline layar, efek lengkungan monitor CRT, dan aberasi kromatik semuanya dikodekan secara manual dalam GLSL fragment shader oleh LocalThunk!',
    quizQuestion: 'Engine dan framework game indie apa yang digunakan oleh developer tunggal LocalThunk untuk membuat Balatro?',
    quizOptions: [
      'Unreal Engine 5',
      'Framework LÖVE dengan bahasa pemrograman Lua',
      'Unity 3D',
      'Godot Engine'
    ],
    quizExplanation: 'LocalThunk memprogram Balatro memakai framework open-source ringan LÖVE dalam bahasa Lua, menghasilkan mahakarya adiksi matematis!'
  },
  't-198': {
    headline: 'Jake Elliott dan Tamas Kemenczy Menghabiskan Tujuh Tahun Menciptakan Ode Teater Folk Amerika',
    story: 'Dikembangkan dalam lima babak episodik antara tahun 2013 hingga 2020, Kentucky Route Zero dipandang luas sebagai karya sastra realisme magis paling mendalam dalam medium video game. Cardboard Computer membingkai setiap adegan menggunakan teknik tata cahaya panggung teater avant-garde, menelusuri jeratan utang, kemiskinan pedesaan Appalachia, serta gua-gua jalan tol gaib di sepanjang rute bawah tanah rahasia Route Zero, diiringi alunan musik folk memikat dari Junebug dan Johnny!',
    verifiedFact: 'Game ini dinobatkan sebagai Game of the Decade (era 2010-an) oleh berbagai publikasi budaya dan kritikus internasional ternama.',
    quoteOrLore: '“Sebagian orang terlahir di tempat yang salah, dan menghabiskan seluruh hidup mereka untuk berusaha pulang ke rumah.” — Kentucky Route Zero',
    easterEggNote: 'Babak III menyertakan game terminal petualangan berbasis teks lengkap bernama "Colossal Cave Adventure" yang dapat dimainkan di dalam tempat penyulingan bawah tanah!',
    quizQuestion: 'Genre sastra apa yang menginspirasi narasi bawah tanah puitis dalam Kentucky Route Zero?',
    quizOptions: [
      'Hard Science Fiction',
      'Realisme Magis Amerika dan Southern Gothic Appalachia',
      'Hardboiled Detective Noir',
      'Distopia Cyberpunk'
    ],
    quizExplanation: 'Game ini diagungkan sebagai mahakarya realisme magis Amerika, memadukan tembang folk, cerita arwah, dan tata cahaya teater dramatis!'
  },
  't-199': {
    headline: 'Toby Fox Mendapatkan Seluruh Adegan Ending dalam Mimpi Mengigau Saat Sakit Demam pada 2011',
    story: 'Sebelum Toby Fox menulis satu baris kode pun untuk Undertale, ia mengalami mimpi igauan demam yang nyata dan mencekam pada tahun 2011 saat terbaring sakit. Dalam mimpinya, ia menyaksikan adegan klimaks terakhir dari sebuah cerita misterius diiringi alunan musik tertentu. Mimpi igauan itulah yang menjadi fondasi konsep Deltarune. Fox bahkan sengaja membuat Undertale terlebih dahulu demi mengasah keterampilan desain gamenya agar mampu mewujudkan mahakarya sejatinya—Dunia Kegelapan Kris, Susie, dan Ralsei!',
    verifiedFact: 'Boss rahasia Spamton G. Spamton di Chapter 2 menjadi fenomena internet global dengan gaya bicaranya yang kacau bertema tawaran dagang "Big Shot".',
    quoteOrLore: '“Pilihanmu tidak ada artinya... atau benarkah demikian?” — Tema pertanyaan sentral Deltarune',
    easterEggNote: 'Rute "Snowgrave" di Chapter 2 memungkinkan pemain memanipulasi Noelle membekukan musuh dengan IceShock, menyingkap horor psikologis kelam di balik grafis kartun cerianya!',
    quizQuestion: 'Bagaimana Toby Fox merumuskan kisah akhir Deltarune jauh sebelum ia menciptakan Undertale?',
    quizOptions: [
      'Memenangkan kompetisi cerita pendek di sekolahnya',
      'Mengalami langsung seluruh adegan ending dan musiknya dalam mimpi demam pada tahun 2011',
      'Menemukan buku catatan usang yang tertinggal di stasiun kereta',
      'Berdasarkan proyek fangame Mother 3 yang tidak pernah dirilis'
    ],
    quizExplanation: 'Toby Fox melihat gambaran akhir Deltarune saat mengigau demam pada tahun 2011, yang menginspirasinya untuk belajar membuat game!'
  },
  't-200': {
    headline: '200 Katrid Video Game Bersertifikat Merayakan 50 Tahun Sejarah Industri Game',
    story: 'Membentang dari kabinet arkade vektor koin era 1970-an seperti Asteroids dan Space Invaders, melintasi era keemasan perang konsol 8-bit dan 16-bit, revolusi poligon 3D, hingga mahakarya open-world dan permata indie modern, ERAGO ARCADE Master Vault berdiri kokoh sebagai museum digital interaktif yang mengabadikan trik hardware cerdik, glitch tak terduga, dan kejeniusan manusia yang mengubah video game menjadi bentuk seni terbesar di muka bumi!',
    verifiedFact: 'Katrid bersejarah ini menandai rampungnya ekspansi arsip lengkap 200 katrid trivia di ERAGO ARCADE.',
    quoteOrLore: '“Setiap game adalah keajaiban matematika, seni, dan kegigihan manusia melawan batasan teknologi.” — ERAGO ARCADE',
    easterEggNote: 'Membuka katrid ini membuktikan bahwa Anda telah menjelajahi brankas trivia video game terlengkap di jagat web! Teruslah bermain game, dan jangan pernah berhenti berpetualang!',
    quizQuestion: 'Hal apa yang dirayakan oleh katrid penutup t-200 di ERAGO ARCADE?',
    quizOptions: [
      'Penemuan disket floppy',
      'Rampungnya ekspansi 200 katrid yang merayakan 50 tahun sejarah industri video game',
      'Peluncuran konsol PlayStation 6',
      'Kode cheat rahasia di game Donkey Kong'
    ],
    quizExplanation: 'Katrid t-200 menandai tercapainya koleksi agung 200 katrid sejarah video game terverifikasi di brankas ERAGO ARCADE!'
  }
};
