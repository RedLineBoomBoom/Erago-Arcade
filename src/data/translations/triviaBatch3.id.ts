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

export const TRIVIA_ID_BATCH_3: Record<string, TriviaTranslationItem> = {
  't-81': {
    headline: 'Ukuran Dada Lara Croft Berawal dari Ketidaksengajaan Geseran Mouse oleh Desainer Toby Gard',
    story: 'Saat proses pemodelan 3D Lara Croft di Core Design di Derby, Inggris, artis karakter Toby Gard sedang menyesuaikan proporsi tubuhnya di workstation Silicon Graphics. Saat mengutak-atik dimensi dadanya, tangannya terpeleset di mouse, yang tanpa sengaja menaikkan slider volume sebesar 150%. Tim desain pria sontak terbahak-bahak dan memohon kepadanya untuk mempertahankan siluet berlebihan tersebut. Gard awalnya menolak, tetapi proporsi yang tak disengaja itu justru menjadi ikon budaya pop legendaris!',
    verifiedFact: 'Lara Croft awalnya dirancang sebagai tentara bayaran asal Amerika Selatan bernama Laura Cruz sebelum ditulis ulang menjadi bangsawan Inggris.',
    quoteOrLore: '“Itu benar-benar ketidaksengajaan saat menggeser mouse yang kami tertawakan bersama, sampai pihak manajemen melihatnya.” — Toby Gard',
    easterEggNote: 'Mengurung Winston, sang pelayan tua yang ringkih, di dalam lemari pendingin (freezer) mansion menjadi ritual wajib bagi setiap pemain Tomb Raider II!',
    quizQuestion: 'Bagaimana proporsi karakter Lara Croft yang terkenal bisa tercipta saat pengembangannya di tahun 1996?',
    quizOptions: [
      'Permintaan khusus dari kelompok fokus gamer remaja',
      'Toby Gard tak sengaja menggeser slider mouse di komputernya, memperbesar dadanya hingga 150%',
      'Eksekutif Sega menuntutnya khusus untuk versi Saturn',
      'Dimodelkan langsung dari bintang pop asal Inggris'
    ],
    quizExplanation: 'Toby Gard tanpa sengaja menyenggol slider mouse di komputernya, menggembungkan proporsi dada Lara hingga 150%!'
  },
  't-82': {
    headline: 'Video Intro Pembuka Live-Action Direkam di Tepian Sungai Arakawa di Tokyo',
    story: 'Sebelum cutscene CG menjadi standar industri, sutradara Shinji Mikami merekrut aktor amatir asal Amerika yang tinggal di Jepang untuk merekam prolog film horor kelas-B versi live-action. Hutan di sekitar Spencer Mansion sebenarnya hanyalah semak-semak di sepanjang tepian berlumpur Sungai Arakawa di Tokyo. Direkam dalam cuaca malam yang membeku, para aktor harus menahan gigitan nyamuk, kepulan asap rokok, dan darah panggung yang berantakan, melahirkan dialog pembuka konyol yang legendaris: "Jill, here\'s a lockpick. It might come in handy if you, the master of unlocking, take it with you!"',
    verifiedFact: 'Animasi pintu berderit yang ikonik diprogram semata-mata untuk menyamarkan waktu baca dan pemuatan CD-ROM yang lambat pada PlayStation pertama.',
    quoteOrLore: '“You were almost a Jill sandwich!” — Barry Burton dalam rekaman suara terburuk sekaligus paling legendaris sepanjang masa',
    easterEggNote: 'Memeriksa meja Albert Wesker di kantor S.T.A.R.S. sebanyak 50 kali berturut-turut akan menghadiahkan foto rahasia Rebecca Chambers kepada pemain!',
    quizQuestion: 'Mengapa Resident Evil original menampilkan animasi pembuka pintu yang berderit di antara ruangan?',
    quizOptions: [
      'Untuk membangun ketegangan psikologis menghadapi serbuan zombi',
      'Untuk menutupi waktu pembacaan dan pemuatan data CD-ROM PS1 yang lambat',
      'Karena Capcom memiliki hak paten atas transisi pintu 3D',
      'Agar pemain bisa membatalkan masuk ke ruangan yang berbahaya'
    ],
    quizExplanation: 'Animasi pintu berderit menyamarkan drive CD-ROM 2x yang lambat saat memuat tekstur dan model 3D ke dalam RAM!'
  },
  't-83': {
    headline: 'Sempat Diejek Sebagai "Orcs in Space" di E3 1996 Sebelum Engine Dibuat Ulang Total',
    story: 'Ketika Blizzard memamerkan versi awal StarCraft di E3 1996, pers game mengejeknya habis-habisan sebagai daur ulang malas Warcraft II bernuansa ungu, bahkan menjulukinya "Orcs in Space". Merasa terpukul oleh penghinaan tersebut, programmer utama Bob Fitch membuang seluruh engine game itu. Tim bekerja 80 jam seminggu selama hampir dua tahun untuk merombak StarCraft dari nol, merancang tiga faksi yang benar-benar asimetris (Terran, Zerg, Protoss) yang akhirnya menjadi eSport nasional di Korea Selatan!',
    verifiedFact: 'Astronaut Daniel Barry membawa salinan kaset ritel StarCraft ke luar angkasa menaiki Pesawat Ulang-Alik Discovery pada misi STS-96 tahun 1999, mengorbit Bumi sebanyak 153 kali.',
    quoteOrLore: '“Sambutan di E3 1996 begitu kejam hingga kami pulang, membakar habis basis kode lama, dan memulainya kembali dari nol.” — Bob Fitch',
    easterEggNote: 'Mengklik unit apa pun (seperti Terran Marine atau SCV) puluhan kali berturut-turut akan membuat mereka kesal hingga meneriakkan dialog suara rahasia yang kocak!',
    quizQuestion: 'Julukan merendahkan apa yang diberikan para kritikus saat StarCraft pertama kali dipamerkan di E3 1996?',
    quizOptions: [
      'Space Invaders 3D',
      'Orcs in Space',
      'Command & Conquer Clone',
      'Galaxy of Warcraft'
    ],
    quizExplanation: 'Kritikus media mencap StarCraft versi awal sebagai "Orcs in Space", memicu Blizzard untuk merombak total engine game hingga melahirkan mahakarya!'
  },
  't-84': {
    headline: 'David Brevik Awalnya Merancang Diablo Sebagai Game Turn-Based Claymation Sebelum Voting Spontan di Hari Jumat',
    story: 'David Brevik menghabiskan bertahun-tahun merancang Diablo sebagai roguelike lambat berbasis giliran (turn-based) dengan monster animasi tanah liat (claymation). Ketika Blizzard mengakuisisi Condor dan membentuk Blizzard North, tim Irvine membujuk Brevik untuk beralih ke pertarungan real-time. Brevik sempat menolak keras, berargumen bahwa real-time akan merusak kedalaman taktis game. Akhirnya, di suatu Jumat sore, Brevik setuju membuat prototipe real-time. Ia memprogramnya dalam beberapa jam, mengklik prajurit tengkorak, melihat ksatria miliknya mengayunkan pedang seketika itu juga, lalu menangis haru: "Ya Tuhan, ini luar biasa!"',
    verifiedFact: 'Diablo mempopulerkan hierarki kelangkaan jarahan (loot rarity) berkode warna modern (Putih, Biru, Kuning, Emas) yang kini digunakan oleh Destiny, Borderlands, dan WoW.',
    quoteOrLore: '“Saat saya mengklik mouse dan sang prajurit melangkah lalu mengayunkan pedangnya seketika, saya tahu konsep turn-based telah mati.” — David Brevik',
    easterEggNote: '"Secret Cow Level" awalnya hanyalah rumor komunitas di Diablo 1 yang akhirnya diwujudkan secara resmi oleh Blizzard di Diablo II ("There is no cow level")!',
    quizQuestion: 'Bagaimana sistem pertarungan Diablo original awalnya dirancang sebelum Blizzard North beralih ke real-time?',
    quizOptions: [
      'Sebagai dungeon crawler sudut pandang orang pertama layaknya Doom',
      'Sebagai RPG taktis berbasis giliran (turn-based) dengan model claymation',
      'Sebagai petualangan teks berbasis MUD',
      'Sebagai game platformer 2D side-scrolling'
    ],
    quizExplanation: 'David Brevik awalnya merancang Diablo sebagai roguelike turn-based dengan claymation sebelum membuat prototipe real-time hanya dalam satu sore!'
  },
  't-85': {
    headline: 'Programmer Insomniac Alex Hastings Menciptakan Engine Panorama 3D LOD Revolusioner untuk PS1',
    story: 'Pada tahun 1997, game konsol 3D sangat menderita akibat kabut jarak pandang (draw distance fog) yang tebal (seperti di Silent Hill dan Turok) karena konsol kekurangan polygon fill-rate. Programmer Insomniac Alex Hastings menciptakan engine panorama 3D revolusioner yang secara dinamis menghasilkan berbagai tingkat detail (Level of Detail / LOD). Kastel dan puncak gunung yang jauh dirender dengan aproksimasi poligon rendah bertekstur, yang secara mulus bertransisi menjadi jaring poligon penuh saat Spyro terbang mendekat, menghadirkan jarak pandang menakjubkan yang belum pernah ada di perangkat 32-bit!',
    verifiedFact: 'Stewart Copeland, drummer legendaris dari band rock The Police, menggubah seluruh lagu tema pengiring yang penuh dengan perkusi ritmis ceria.',
    quoteOrLore: '“Alex Hastings menemukan cara untuk merender pemandangan kerajaan dongeng bermil-mil jauhnya pada perangkat keras yang seharusnya tak mampu menggambar lebih dari 30 meter.” — Ted Price',
    easterEggNote: 'Spyro awalnya dirancang sebagai naga hijau bernama Pete, tetapi diubah warnanya menjadi ungu agar tidak tersamarkan dengan padang rumput hijau!',
    quizQuestion: 'Siapa yang menggubah musik latar berenergi dan ikonik untuk Spyro the Dragon original di tahun 1998?',
    quizOptions: [
      'Nobuo Uematsu',
      'Stewart Copeland, drummer band rock legendaris The Police',
      'Danny Elfman',
      'Trent Reznor dari Nine Inch Nails'
    ],
    quizExplanation: 'Stewart Copeland, sang drummer The Police, menggubah trek berorientasi perkusi yang tak terlupakan untuk trilogi Spyro!'
  },
  't-86': {
    headline: 'Menara Kembar WTC Lenyap dari Garis Cakrawala New York Tahun 2000 Akibat Keterbatasan Memori Tekstur',
    story: 'Ketika Warren Spector dan Ion Storm merancang garis cakrawala Kota New York untuk pembukaan Pulau Liberty di Deus Ex, keterbatasan memori menghalangi artis tekstur memasukkan seluruh panorama Manhattan. Sang artis terpaksa meniadakan Menara Kembar World Trade Center, lalu menulis penjelasan cerita di dalam game bahwa serangan teroris telah menghancurkannya. Ketika serangan 11 September di dunia nyata terjadi setahun kemudian, ramalan fiksi yang tak disengaja itu sontak mengejutkan para pemain di seluruh dunia!',
    verifiedFact: 'Deus Ex memantapkan filosofi immersive sim: setiap pintu yang terkunci dapat dibobol dengan lockpick, diledakkan, diretas komputernya, atau dilewati melalui ventilasi udara.',
    quoteOrLore: '“Kami kehabisan memori tekstur, jadi kami menulis dalam lore bahwa bom teroris telah meruntuhkan menara tersebut. Hal itu masih membuat saya merinding hingga hari ini.” — Warren Spector',
    easterEggNote: 'Jika Anda memasuki toilet wanita di markas besar UNATCO, atasan Anda Joseph Manderley akan secara resmi menegur perilaku tidak pantas Anda pada pengarahan misi berikutnya!',
    quizQuestion: 'Mengapa Menara Kembar World Trade Center tidak ada di cakrawala Kota New York dalam Deus Ex (2000)?',
    quizOptions: [
      'Pengembang lupa bagaimana bentuk asli New York',
      'Keterbatasan memori tekstur memaksa artis menghilangkannya, lalu dijelaskan sebagai serangan teroris dalam cerita game',
      'Pemerintah Amerika Serikat meminta agar menara itu dihapus',
      'Game berlatar waktu 500 tahun di masa depan'
    ],
    quizExplanation: 'Batas memori memaksa Ion Storm menghilangkan menara kembar dari tekstur cakrawala, lalu secara mengerikan merasionalisasikannya dalam narasi dialog!'
  },
  't-87': {
    headline: 'Merancang Model Propagasi Suara Dinamis yang Menghitung Pantulan Audio Antar-Ruangan',
    story: 'Sebelum kehadiran Thief, sistem stealth dalam video game masih sangat primitif. Looking Glass Studios tidak sekadar membuat game stealth—mereka merintis simulasi akustik dalam game 3D. Programmer audio Greg LoPiccolo menciptakan sistem di mana gelombang suara merambat melalui celah portal fisik, pintu, dan jendela, alih-alih sekadar kalkulasi jarak garis pandang sederhana. Melangkah di atas lantai marmer, karpet, atau kisi besi menghasilkan gema akustik realistis yang bisa dilacak oleh para penjaga dengan pendengaran terarah yang presisi!',
    verifiedFact: 'Thief awalnya dikembangkan sebagai game aksi pertarungan pedang berjudul "Dark Camelot" sebelum beralih haluan menjadi game stealth murni.',
    quoteOrLore: '“Suara di Thief bukanlah dekorasi pemanis; melainkan antarmuka sensorik utama bagi keseluruhan permainan.” — Ken Levine',
    easterEggNote: 'Menembakkan panah lumut (moss arrow) ke titian logam akan meredam suara langkah kaki Anda sepenuhnya, membuat Garrett bisa berlari tepat di belakang penjaga bersenjata lengkap!',
    quizQuestion: 'Inovasi akustik revolusioner apa yang diperkenalkan oleh Thief: The Dark Project pada tahun 1998?',
    quizOptions: [
      'Modulasi suara mikrofon secara real-time',
      'Model propagasi suara dinamis yang menghitung gema audio melalui ruangan dan celah pintu',
      'Driver audio surround sound 7.1 pertama di dunia',
      'Pelacakan akustik detak jantung pemain'
    ],
    quizExplanation: 'Looking Glass merancang propagasi suara nyata, di mana gelombang audio memantul secara realistis melalui pintu terbuka dan portal antar-ruangan!'
  },
  't-88': {
    headline: 'Suara SHODAN Diberi Efek Gagap dan Glitch Mengerikan Menggunakan Lapisan Filter Khusus',
    story: 'Untuk membuat kecerdasan buatan nakal SHODAN terdengar begitu mengerikan, direktur audio Eric Brosius kembali mengajak pengisi suara Terri Brosius (istrinya). Alih-alih suara robot komputer yang bersih, Brosius merekam suaranya dengan nada emosi tak menentu—berbisik, menggeram, lalu mendengkur manja. Ia kemudian menumpuk tiga rekaman vokal dengan pergeseran nada (pitch shifts), delay terbalik, dan potongan mikro yang patah-patah, menciptakan kegagapan sibernetik menyeramkan yang mensimulasikan sirkuit komputer pengidap god-complex yang terjerumus ke dalam kegilaan psikotik!',
    verifiedFact: 'System Shock 2 menjadi pendahulu kreatif langsung bagi BioShock, di mana Ken Levine menyempurnakan plot twist "pemandu suara di radio ternyata sang penjahat utama".',
    quoteOrLore: '“Look at you, hacker: a pathetic creature of meat and bone, panting and sweating as you run through my corridors.” — SHODAN',
    easterEggNote: 'Plot twist terkenal "Polito sebenarnya sudah mati" sudah diisyaratkan sejak 10 menit pertama jika Anda memperhatikan rekaman keamanan yang bertentangan dengan instruksinya!',
    quizQuestion: 'Bagaimana suara glitch mengerikan milik SHODAN diciptakan oleh Irrational Games di System Shock 2?',
    quizOptions: [
      'Menggunakan perangkat lunak text-to-speech awal milik Microsoft',
      'Menumpuk beberapa rekaman vokal dengan modulasi nada acak, potongan gagap, dan penyambungan audio mikro',
      'Memutar Walkman melalui amplifier gitar listrik',
      'Merekam operator telepon sungguhan yang sedang dibius'
    ],
    quizExplanation: 'Eric Brosius menumpuk rekaman vokal Terri Brosius dengan pergeseran nada dan sambungan mikro agar SHODAN terdengar tidak waras secara psikologis!'
  },
  't-89': {
    headline: 'Mengetik "HOW DO YOU TURN THIS ON" Memanggil Mobil AC Cobra Bersenjata Senapan Mesin Berat',
    story: 'Ensemble Studios menyematkan sejumlah kode cheat paling legendaris dan menggelikan dalam sejarah game PC. Di tengah dunia abad pertengahan yang dipenuhi pedang, ketapel trebuchet, dan pasukan ksatria berkuda, membuka jendela obrolan dan mengetik "HOW DO YOU TURN THIS ON" akan memunculkan mobil sport biru Shelby AC Cobra keluaran 1965. Mobil berotot ini melesat melintasi padang rumput feodal dengan kecepatan 160 km/jam, memuntahkan peluru senapan mesin kaliber berat yang sanggup mencabik-cabik dinding kastel dan pasukan barbar dalam hitungan detik!',
    verifiedFact: 'AI game ini diprogram oleh Mario Grimani untuk membangun rantai pasokan ekonomi yang realistis sebelum meluncurkan serangan militer terorganisir.',
    quoteOrLore: '“Tak ada yang mampu menaklukkan Eropa era feodal secepat mobil Shelby Cobra 1965 dengan senapan mesin ganda.” — Pengembang Ensemble',
    easterEggNote: 'Mengetik "WIMPYWIMPYWIMPY" akan seketika menghancurkan semua bangunan dan unit milik Anda sendiri, menghasilkan kekalahan mutlak!',
    quizQuestion: 'Apa yang dilakukan oleh kode cheat terkenal "HOW DO YOU TURN THIS ON" di Age of Empires II?',
    quizOptions: [
      'Membuka pandangan satelit ke seluruh penjuru peta',
      'Memunculkan mobil sport AC Cobra bersenjata senapan mesin yang mematikan',
      'Memberikan peradaban Anda 10.000 emas dan kayu',
      'Langsung melompatkan kekaisaran Anda ke Zaman Imperial (Imperial Age)'
    ],
    quizExplanation: 'Mengetik kode tersebut memunculkan mobil muscle Shelby AC Cobra berkecepatan tinggi yang dipersenjatai senapan mesin pemusnah!'
  },
  't-90': {
    headline: 'Dikemas Bersama Motor Rumble Pak, Memperkenalkan Getaran Force Feedback ke Konsol Rumahan',
    story: 'Sebelum Star Fox 64 dirilis pada tahun 1997, stik pengontrol konsol video game hanyalah cangkang plastik mati yang tanpa respon fisik. Shigeru Miyamoto ingin para pemain merasakan langsung hentakan kinetik dari meriam laser Arwing dan ledakan artileri udara. Nintendo pun merancang "Rumble Pak", beban eksentrik bermotor bertenaga baterai yang dicolokkan ke bagian bawah stik N64. Star Fox 64 dijual satu paket dengan perangkat ini, menjadikan getaran force feedback sebagai standar wajib bagi setiap konsol game hingga hari ini!',
    verifiedFact: 'Star Fox 64 menyajikan sulih suara penuh dengan panning audio terpisah tergantung dari posisi rekan sayap yang sedang berbicara kepada Fox McCloud.',
    quoteOrLore: '“Do a barrel roll! (Tekan Z atau R dua kali!)” — Peppy Hare dalam dialog sulih suara paling melegenda',
    easterEggNote: 'Secara teknis dalam istilah penerbangan sungguhan, manuver terkenal Peppy "Do a barrel roll!" sebenarnya adalah aileron roll, bukan barrel roll!',
    quizQuestion: 'Inovasi kontroler terobosan apa yang diperkenalkan dan dipaketkan bersama Star Fox 64 pada tahun 1997?',
    quizOptions: [
      'Kontroler nirkabel berbasis inframerah',
      'Rumble Pak, yang memperkenalkan getaran fisik (force feedback) ke konsol rumahan',
      'Tombol pelatuk analog dengan sensitivitas tekanan',
      'Kartu memori terintegrasi di dalam stik kontroler'
    ],
    quizExplanation: 'Star Fox 64 memperkenalkan motor Rumble Pak, menjadikan respon getar kontroler sebagai standar permanen industri game!'
  },
  't-91': {
    headline: 'BioWare Didirikan oleh Tiga Dokter Medis yang Awalnya Memprogram Perangkat Lunak Medis',
    story: 'Sebelum menjadi raja RPG Barat, para pendiri BioWare—Ray Muzyka, Greg Zeschuk, dan Augustine Yip—adalah dokter medis yang berpraktik di Alberta, Canada. Mereka awalnya mendirikan BioWare untuk menulis perangkat lunak pelatihan medis gastroenterologi. Sebagai pencinta berat Dungeons & Dragons, mereka mengumpulkan pendapatan medis mereka untuk memprogram engine game bernama "Infinity Engine", menciptakan Baldur\'s Gate dan membangkitkan kembali genre RPG komputer yang saat itu di ambang kepunahan!',
    verifiedFact: 'Baldur\'s Gate memperkenalkan sistem pertarungan "Real-Time with Pause", yang memungkinkan pemain menghentikan kekacauan taktis kapan saja dalam sepersekian detik untuk menyusun giliran mantra.',
    quoteOrLore: '“Incar matanya, Boo! INCAR MATANYA!” — Minsc bersama hamster luar angkasa raksasa miniaturnya',
    easterEggNote: 'Hamster luar angkasa raksasa miniatur kesayangan Minsc, "Boo", menghabiskan satu slot inventaris permanen dan tidak bisa dibuang maupun dijual!',
    quizQuestion: 'Apa profesi awal para pendiri BioWare sebelum mereka menciptakan mahakarya Baldur\'s Gate?',
    quizOptions: [
      'Insinyur kedirgantaraan di NASA',
      'Dokter medis yang memprogram perangkat lunak pelatihan kedokteran',
      'Penulis novel dan ilustrator buku komik',
      'Programmer keuangan di Wall Street'
    ],
    quizExplanation: 'Ray Muzyka dan Greg Zeschuk adalah dokter yang mengumpulkan pendapatan klinik medis mereka untuk merancang game RPG komputer!'
  },
  't-92': {
    headline: 'Neversoft Merekam Motion Capture Tony Hawk Melakukan Putaran 900 Legendaris Menggunakan Tali Pengaman',
    story: 'Pada Juni 1999, Tony Hawk berhasil mendaratkan putaran udara 900 derajat pertama di dunia pada ajang X Games di San Francisco. Neversoft sendiri telah bekerja sama dengan Hawk selama berbulan-bulan. Demi menangkap trik mulusnya secara akurat, Neversoft memakaikan pakaian motion capture khusus dengan penanda reflektif optik pada Hawk, memanfaatkan tali kekang pengaman pemeran pengganti di dalam gudang agar Hawk bisa berputar dan melakukan grinding di udara tanpa risiko patah tulang selangka menjelang rilis game!',
    verifiedFact: 'Soundtrack berlisensi punk rock game ini (Goldfinger, Dead Kennedys, Primus) berhasil membangkitkan kembali kultur ska-punk era 90-an di seluruh dunia.',
    quoteOrLore: '“Kami memasang tali pengaman pada Tony dan membiarkannya berputar-putar di udara selama berjam-jam demi menyempurnakan rotasi triknya.” — Joel Jewett',
    easterEggNote: 'Menyelesaikan mode karier hingga 100% dengan semua pemain skateboard akan membuka karakter Officer Dick (disulihsuarakan oleh Jack Black) serta detektif swasta Wolverine!',
    quizQuestion: 'Bagaimana cara Neversoft menganimasikan trik skateboard udara Tony Hawk yang begitu kompleks pada tahun 1999?',
    quizOptions: [
      'Menganimasikan sprite 2D secara manual frame demi frame',
      'Memakaikan baju motion-capture pada Tony Hawk dengan bantuan tali pengaman gantung di dalam gudang',
      'Menggunakan ragdoll fisika algoritmik',
      'Mendigitalkan rekaman video rumahan dari kaset VHS'
    ],
    quizExplanation: 'Neversoft menggunakan motion capture optik penuh dengan Tony Hawk diikat tali pengaman untuk menerjemahkan mekanika papan seluncur nyata ke dalam 3D!'
  },
  't-93': {
    headline: 'Tim Schafer Memadukan Cerita Rakyat "Hari Orang Mati" Meksiko dengan Film Noir Era 1940-an',
    story: 'Sutradara LucasArts Tim Schafer sangat terpikat oleh cerita rakyat Día de los Muertos dari Meksiko, khususnya gagasan kerangka calaca yang berkelana melintasi alam baka. Ia mendapat pencerahan kreatif: bagaimana jika agen perjalanan di Negeri Orang Mati menjual tiket mewah kereta ekspres "Number Nine" berdasarkan seberapa bajik jiwa tersebut menjalani hidupnya? Perpaduan antara nuansa film "Casablanca" karya Humphrey Bogart dengan mitologi Aztek ini melahirkan salah satu naskah narasi terbaik dalam sejarah hiburan!',
    verifiedFact: 'Grim Fandango adalah game petualangan pertama LucasArts yang menggunakan model karakter poligon 3D di atas latar belakang pre-rendered.',
    quoteOrLore: '“Nama saya Manny Calavera. Saya agen perjalanan Anda.” — Manny Calavera',
    easterEggNote: 'Iblis montir raksasa Glottis dimodelkan berdasarkan anjing golden retriever peliharaan masa kecil Tim Schafer!',
    quizQuestion: 'Dua inspirasi budaya kontras apa yang dipadukan oleh Tim Schafer untuk menciptakan Grim Fandango?',
    quizOptions: [
      'Anime cyberpunk dan impresionisme Prancis',
      'Cerita rakyat Día de los Muertos Meksiko dan sinema film noir Hollywood era 1940-an',
      'Mitologi Viking dan steampunk era Victoria',
      'Dongeng rakyat Rusia dan film thriller mata-mata Perang Dingin'
    ],
    quizExplanation: 'Schafer memadukan visual kerangka calaca Día de los Muertos Meksiko dengan gaya dialog film noir ala Humphrey Bogart!'
  },
  't-94': {
    headline: 'Kazooie Ditambahkan ke Ransel Banjo Semata-mata Agar Banjo Bisa Melakukan Double Jump',
    story: 'Selama pengembangan awal di Rare di Twycross, Banjo hanyalah beruang cokelat penyendiri bercelana kuning. Sutradara Gregg Mayles menyadari bahwa gerakan melompat Banjo antar-platform terasa terlalu lamban dan berat. Programmer Chris Sutherland mengusulkan untuk memberinya sayap. Alih-alih mengubah Banjo menjadi beruang bersayap aneh, Mayles menciptakan burung Breegull merah cerewet yang tinggal di ranselnya bernama Kazooie, yang sayap berbulunya bisa mengepak untuk lompatan ganda dan kakinya keluar untuk berlari di tanjakan curam!',
    verifiedFact: 'Fitur "Stop \'N\' Swop" yang direncanakan game ini dirancang untuk mentransfer data antar-kartrid N64 memanfaatkan sisa retensi RAM selama 10 detik setelah konsol dimatikan.',
    quoteOrLore: '“Kazooie tercipta karena lompatan Banjo kurang jauh, jadi kami memasukkan burung sarkastik ke dalam ranselnya.” — Gregg Mayles',
    easterEggNote: 'Gruntilda berbicara seluruhnya dalam bait pantun berima, sementara Mumbo Jumbo membutuhkan token tengkorak perak untuk menyihir Banjo menjadi mesin cuci!',
    quizQuestion: 'Mengapa para pengembang di Rare menciptakan karakter Kazooie dan memasukkannya ke dalam ransel Banjo?',
    quizOptions: [
      'Untuk menyajikan narasi komedi dalam cutscene',
      'Untuk mengatasi lompatan Banjo yang lamban dengan memberinya sayap dan kemampuan lompat ganda',
      'Karena Nintendo secara khusus menuntut karakter burung',
      'Kazooie merupakan aset sisa dari game balap yang dibatalkan'
    ],
    quizExplanation: 'Rare menambahkan Kazooie untuk memberi Banjo sayap demi mengatasi jarak lompatannya yang pendek serta membantunya mendaki tanjakan terjal!'
  },
  't-95': {
    headline: 'Pyramid Head Dirancang Sebagai Manifestasi Rasa Bersalah James Sunderland yang Menuntut Hukuman',
    story: 'Desainer monster Masahiro Ito ingin menciptakan sosok monster yang bukan alien ataupun zombi, melainkan metafora psikologis murni. Ito terinspirasi oleh lukisan-lukisan Francis Bacon dan para algojo masa lalu dalam sejarah kota Silent Hill. Helm besi geometris Pyramid Head yang berkarat menutupi wajah manusiawinya, menjadikannya sang algojo tak terhentikan yang lahir murni dari rasa bersalah alam bawah sadar James Sunderland yang terkubur, serta kerinduannya yang mendalam untuk dihakimi dan dihukum atas kematian istrinya, Mary!',
    verifiedFact: 'Game ini memiliki "Dog Ending" legendaris di mana James mendapati bahwa seekor anjing Shiba Inu berkacamata hitam dan headphone-lah yang mengendalikan seluruh tuas misteri kota tersebut.',
    quoteOrLore: '“Pyramid Head tidak berniat membunuh James; ia hadir semata-mata untuk memaksa James mengingat dosa-dosanya.” — Masahiro Ito',
    easterEggNote: 'Pada tahun 2018, Masahiro Ito mengonfirmasi bahwa jika Anda menaikkan kecerahan layar saat intro cermin kamar mandi, James sebenarnya menatap langsung ke arah pemain, bukan ke bayangannya sendiri!',
    quizQuestion: 'Apa makna psikologis di balik sosok monster mengerikan Pyramid Head di Silent Hill 2?',
    quizOptions: [
      'Iblis kuno peradaban Maya yang terbangun oleh kabut',
      'Rasa bersalah James Sunderland yang terpendam dan hasrat bawah sadarnya untuk dihukum',
      'Senjata biologis hasil rekayasa militer',
      'Hantu mantan walikota yang pernah dieksekusi mati'
    ],
    quizExplanation: 'Masahiro Ito merancang Pyramid Head sebagai perwujudan fisik dari rasa bersalah James Sunderland yang menuntut hukuman atas dirinya sendiri!'
  },
  't-96': {
    headline: 'Chris Sawyer Memprogram 99% Game Ini Sendirian Menggunakan Bahasa Pemrograman x86 Assembly Murni',
    story: 'Di era saat game modern ditulis dalam bahasa tingkat tinggi C++, programmer asal Skotlandia Chris Sawyer menulis hampir setiap baris kode RollerCoaster Tycoon dalam bahasa rakitan (bare-metal x86 Assembly) murni. Hanya 1% kodenya (wrapper tampilan Windows DirectX) yang menggunakan C. Dengan menulis dalam assembly, Sawyer mencapai eksekusi memori secepat kilat, memungkinkan game mensimulasikan ribuan pengunjung taman hiburan, fisika roller coaster, tingkat mual, dan pembukuan finansial secara simultan tanpa lag sedikit pun di PC berspesifikasi rendah!',
    verifiedFact: 'RollerCoaster Tycoon terjual lebih dari 4 juta kopi dan meraup pendapatan $180 juta, menjadikan Sawyer salah satu pengembang solo paling sukses dan menguntungkan sepanjang sejarah.',
    quoteOrLore: '“Menulis dalam assembly murni memberi saya kendali mutlak dan tanpa kompromi atas setiap register CPU dan byte memori.” — Chris Sawyer',
    easterEggNote: 'Memberi nama pengunjung taman "Chris Sawyer" akan membuat karakter tersebut berjalan berkeliling memotret setiap roller coaster yang ada di taman hiburan Anda!',
    quizQuestion: 'Prestasi pemrograman luar biasa apa yang dicapai Chris Sawyer saat membuat RollerCoaster Tycoon pada tahun 1999?',
    quizOptions: [
      'Memanfaatkan kecerdasan buatan neural network untuk AI pengunjung',
      'Menulis 99% kode game dalam bahasa x86 Assembly murni secara solo',
      'Merender seluruh game dengan teknologi raytracing real-time',
      'Membangun game menggunakan software visual scripting eksklusif'
    ],
    quizExplanation: 'Sawyer menulis sendiri 99% kode game dalam bahasa x86 assembly murni, menghasilkan performa super kencang di PC era 90-an!'
  },
  't-97': {
    headline: 'Chris Avellone Menulis Naskah 800.000 Kata di Mana Pertarungan Hampir Sepenuhnya Opsional',
    story: 'Desainer utama Chris Avellone bertekad membalikkan setiap klise fantasi yang ada. Alih-alih memainkan pahlawan hilang ingatan yang menyelamatkan kerajaan dengan sebilah pedang, Anda bermain sebagai The Nameless One—mayat hidup abadi penuh bekas luka yang terbangun di kamar jenazah dan tak bisa mati. Avellone menulis naskah dialog raksasa sebanyak 800.000 kata (lebih panjang dari seluruh trilogi buku The Lord of the Rings) di mana setiap konflik besar, termasuk bos terakhir, dapat diselesaikan lewat argumen filosofis, empati, atau logika berdialog!',
    verifiedFact: 'Rekan pertama dalam party Anda adalah Morte, tengkorak manusia melayang yang sinis dan menyerang musuh dengan gigitan serta lontaran hinaan pedas.',
    quoteOrLore: '“What can change the nature of a man?” (Apa yang sanggup mengubah hakikat diri seorang manusia?) — Teka-teki filosofis utama dari Ravel Puzzlewell',
    easterEggNote: 'Pemain bisa meyakinkan bos terakhir, The Transcendent One, untuk mengakhiri keberadaan eksistensialnya murni melalui debat filosofis!',
    quizQuestion: 'Teka-teki filosofis utama apa yang terus-menerus diajukan kepada sang protagonis sepanjang Planescape: Torment?',
    quizOptions: [
      'Bagaimana cara membunuh seorang dewa?',
      'Apa yang sanggup mengubah hakikat diri seorang manusia? (What can change the nature of a man?)',
      'Mengapa jiwa-jiwa tersesat dalam kegelapan?',
      'Apakah keabadian adalah kutukan atau anugerah?'
    ],
    quizExplanation: 'Ravel mengajukan pertanyaan "What can change the nature of a man?", yang menjadi inti emosional dan tematik dari keseluruhan cerita game!'
  },
  't-98': {
    headline: 'Namco Memperkenalkan Fitur Sidestep 3D Sejati untuk Membebaskan Game Fighting dari Poros 2D',
    story: 'Ketika game tarung 3D terdahulu seperti Virtua Fighter masih terpaku pada sumbu gerakan 2D dengan model poligon 3D, Tekken 3 memperkenalkan langkah menyamping (sidestepping) sejati ke dimensi ketiga (dengan mengetuk tombol Atas atau Bawah dua kali). Hal ini memungkinkan petarung seperti Eddy Gordo dan Ling Xiaoyu menghindari pukulan lurus dan tendangan menerjang di ruang tiga dimensi, merevolusi sistem posisi (footsies) dan taktik dalam game pertarungan kompetitif untuk selamanya!',
    verifiedFact: 'Tekken 3 terjual sebanyak 8,3 juta kopi di PlayStation pertama, menjadikannya game fighting terlaris kedua di satu platform konsol.',
    quoteOrLore: '“Fitur sidestep di Tekken 3 mengubah pertarungan menjadi tarian bela diri nyata di arena tiga dimensi.” — Katsuhiro Harada',
    easterEggNote: 'Menuntaskan mode bola voli mini "Tekken Ball" membuka karakter rahasia ilmuwan Dr. Bosconovitch serta dinosaurus manga mungil, Gon!',
    quizQuestion: 'Mekanika pergerakan apa di Tekken 3 yang merevolusi genre game pertarungan 3D pada tahun 1997?',
    quizOptions: [
      'Lompatan berlari di dinding (wall running)',
      'Langkah menyamping 3D sejati (sidestep) ke latar depan dan belakang',
      'Air dash ganda di udara',
      'Pembatalan jurus dengan teleportasi instan'
    ],
    quizExplanation: 'Tekken 3 memperkenalkan sidestep 3D yang responsif, memungkinkan pemain menghindari serangan lurus dengan melangkah ke sumbu Z!'
  },
  't-99': {
    headline: 'Tim Sweeney Membangun Unreal Engine Original dari Nol di Garasi Rumah Orang Tuanya',
    story: 'Tim Sweeney menghabiskan tiga tahun di rumah orang tuanya di Potomac, Maryland, menulis algoritma rendering 3D dan text editor menggunakan bahasa C++. Engine yang dihasilkannya menjadi motor penggerak game Unreal pada tahun 1998, mengguncang dunia teknologi dengan pencahayaan warna dinamis real-time, kabut volumetrik, dan pemandangan luar ruangan megah yang menantang id Software milik John Carmack. Engine yang sama kemudian berevolusi menjadi Unreal Engine 5, yang kini menggerakkan game blockbuster, film Hollywood, hingga produksi serial TV!',
    verifiedFact: 'Adegan pembuka ikonik yang terbang melintasi kastel diiringi musik tracker gubahan Alexander Brandon sengaja diprogram untuk menguji batas rendering skybox dinamis.',
    quoteOrLore: '“Saya menulis kode Unreal Engine selama bertahun-tahun sendirian di ruang bawah tanah sebelum menyadari bahwa engine ini akan bertahan melampaui game mana pun.” — Tim Sweeney',
    easterEggNote: 'Ras alien Nali di Unreal memiliki empat lengan dan akan membungkuk menyembah pemain, memandu Anda menuju ruang penyimpanan senjata rahasia!',
    quizQuestion: 'Siapa yang memprogram fondasi Unreal Engine original pada tahun 1998, yang kini menggerakkan banyak game AAA dan film modern?',
    quizOptions: [
      'John Carmack',
      'Tim Sweeney',
      'Gabe Newell',
      'Cliff Bleszinski'
    ],
    quizExplanation: 'Tim Sweeney memprogram fondasi awal Unreal Engine sendirian di garasi orang tuanya, menciptakan engine yang membentuk wajah industri game saat ini!'
  },
  't-100': {
    headline: 'Frank Klepacki Menggubah Musik Ikonik "Hell March" Hanya dalam Satu Sore Penuh Adrenalin',
    story: 'Direktur audio Westwood Frank Klepacki diminta oleh produser Brett Sperry untuk menciptakan musik metal militer yang sanggup memompa adrenalin pemain. Klepacki segera meraih gitar listriknya, menyetel ketukan drum loop industrial yang menghentak, lalu merekam riff metal berdistorsi berat di studionya. Ia kemudian menumpuk efek suara derap sepatu bot tentara yang berbaris serentak dan sampel suara komandan yang meneriakkan aba-aba Jerman, melahirkan "Hell March"—salah satu lagu tema paling legendaris dalam sejarah game!',
    verifiedFact: 'Alur cerita perjalanan waktu Red Alert dimulai dengan Albert Einstein yang kembali ke tahun 1924 untuk menghapus Adolf Hitler dari garis sejarah dunia.',
    quoteOrLore: '“Saya menyerahkan kaset demo itu kepada Brett Sperry. Dia mendengarkannya sekali dan langsung berkata, \'Itulah lagu tema utama kita.\'” — Frank Klepacki',
    easterEggNote: 'Menahan tombol Shift dan mengklik ikon speaker di sudut kanan atas menu utama akan membuka kampanye rahasia invasi Semut Raksasa!',
    quizQuestion: 'Elemen suara khas apa yang memberi ritme tak terlupakan pada lagu tema Red Alert, "Hell March"?',
    quizOptions: [
      'Sampel tiupan peluit lokomotif uap',
      'Efek suara berirama dari derap langkah sepatu bot militer yang berbaris serempak',
      'Detik jam hitung mundur detonator bom',
      'Rekaman paduan suara Soviet yang bernyanyi di Moskow'
    ],
    quizExplanation: 'Klepacki memadukan riff heavy metal industrial dengan dentuman suara derap langkah sepatu bot tentara yang berbaris tegas!'
  },
  't-101': {
    headline: 'Kazunori Yamauchi dan 7 Pengembang Tidur di Kolong Meja Selama 5 Tahun Demi Simulasi Fisika Nyata',
    story: 'Sebelum kehadiran Gran Turismo, game balap konsol hanyalah ajang drifting bergaya arcade santai. Kazunori Yamauchi bertekad mensimulasikan fisika mekanis otomotif sungguhan: transfer bobot saat pengereman, friksi kompon ban, dan geometri suspensi pada 140 mobil berlisensi. Bersama tim inti yang hanya beranggotakan 7 insinyur, Yamauchi bekerja 100 jam seminggu selama lima tahun berturut-turut, sering kali tidur beralaskan kardus di bawah meja kantor demi merilis game yang menjadi judul terlaris sepanjang masa di PS1 (10,85 juta kopi)!',
    verifiedFact: 'Yamauchi adalah pembalap profesional berprestasi di dunia nyata yang pernah berkompetisi dalam ajang balap ketahanan 24 Hours of Nürburgring.',
    quoteOrLore: '“Selama lima tahun masa pengembangan, saya lebih sering terbangun di kolong meja kantor daripada di ranjang rumah saya sendiri.” — Kazunori Yamauchi',
    easterEggNote: 'Membuka "Hi-Fi Mode" memungkinkan game berjalan pada kecepatan luar biasa 60 frame per detik di konsol PlayStation generasi pertama!',
    quizQuestion: 'Berapa banyak anggota tim inti yang mengembangkan game pemecah rekor Gran Turismo original di PlayStation?',
    quizOptions: [
      'Lebih dari 200 pengembang di tiga benua',
      'Tim inti yang hanya beranggotakan 7 orang pengembang selama lima tahun',
      '50 insinyur yang disponsori langsung oleh Toyota',
      'Proyek kerja sama antara Sony dan Ferrari'
    ],
    quizExplanation: 'Sebuah tim kecil yang hanya terdiri dari 7 insinyur di bawah arahan Yamauchi menghabiskan lima tahun penuh perjuangan untuk membangun engine fisikanya!'
  },
  't-102': {
    headline: 'Sony Memasang Kios Game Wipeout di Kelab Malam Inggris untuk Menjadikan PlayStation Ikon Budaya Dewasa',
    story: 'Ketika Sony meluncurkan PlayStation pada tahun 1995, video game masih dipandang sebelah mata sebagai mainan anak-anak. Sony Computer Entertainment Europe menggandeng studio desain asal Liverpool The Designers Republic serta musisi elektronik legendaris seperti The Prodigy, Chemical Brothers, dan Leftfield. Sony memasang kios bermain Wipeout khusus di dalam kelab malam dan festival rave ternama di London dan Manchester, menyulap konsol ini menjadi ikon gaya hidup trendi kaum muda dewasa dalam sekejap!',
    verifiedFact: 'Wipeout adalah judul peluncuran (launch title) untuk PlayStation di Eropa, menyajikan kecepatan tinggi yang memacu adrenalin dengan fisika rem udara anti-gravitasi.',
    quoteOrLore: '“Kami membawa PlayStation keluar dari toko mainan anak dan menaruhnya tepat di jantung kultur rave Inggris.” — Geoff Browne',
    easterEggNote: 'Nama-nama tim wahana fiksi dalam game (Feisar, AG Systems, Auricom, Qirex) dirancang dengan tipografi minimalis ala merek fesyen papan atas!',
    quizQuestion: 'Di mana Sony memasarkan Wipeout pada tahun 1995 untuk membuktikan bahwa PlayStation adalah konsol gaya hidup dewasa?',
    quizOptions: [
      'Di laboratorium komputer sekolah menengah',
      'Di kelab malam dan festival musik rave Inggris bersama artis-artis musik dansa elektronik',
      'Saat ajang balap Formula 1 Grand Prix Monako',
      'Di butik jam tangan mewah Swiss'
    ],
    quizExplanation: 'Sony memasang stan bermain di kelab malam dan rave Inggris dengan dentuman musik tekno, mengukuhkan PS1 sebagai ikon budaya dewasa!'
  },
  't-103': {
    headline: 'Game Pertama dalam Sejarah yang Mewajibkan Penggunaan Stik Analog DualShock untuk Dimainkan',
    story: 'Ketika Sony merilis stik kontroler DualShock dengan dua stik jempol analog pada akhir 1997, para pengembang awalnya hanya menganggap stik analog sebagai opsi pelengkap tombol D-pad biasa. Sony Japan bertekad membuktikan potensi sejati dari dua stik analog tersebut. Ape Escape menjadi game pertama yang menolak menyala jika pemain menggunakan kontroler digital standar: stik kiri digunakan menggerakkan Spike, sedangkan stik kanan mengontrol sudut gajet secara langsung—jaring penangkap monyet 360 derajat dan tongkat kejut!',
    verifiedFact: 'Game ini menghadirkan lebih dari 200 monyet unik, masing-masing memiliki nama, tingkat kepanikan, level agresi, serta kepribadian yang berbeda.',
    quoteOrLore: '“Stik kanan tidak berfungsi menggerakkan kamera; melainkan menjadi lengan Anda yang mengayunkan jaring penangkap kera.” — Pengembang Sony',
    easterEggNote: 'Monyet albino jahat, Specter, mendapatkan kecerdasan super setelah tak sengaja mengenakan helm eksperimental Peak Point Helmet!',
    quizQuestion: 'Kebutuhan perangkat keras apa yang diwajibkan secara mutlak oleh Ape Escape kepada para pemain PlayStation pada tahun 1999?',
    quizOptions: [
      'Aksesori mouse PlayStation',
      'Merupakan game pertama yang mewajibkan stik analog DualShock agar bisa dimainkan',
      'Adaptor multi-tap 4 pemain',
      'Konverter audio optik eksternal'
    ],
    quizExplanation: 'Ape Escape menolak dimulai jika menggunakan kontroler D-pad standar, karena mewajibkan dua stik analog untuk bergerak dan mengayunkan peralatan!'
  },
  't-104': {
    headline: 'Disk 2 Berubah Menjadi Pertunjukan Monolog Narasi Karena Square Kehabisan Anggaran dan Waktu',
    story: 'Sutradara Tetsuya Takahashi menyusun narasi epik yang membentang selama 10.000 tahun penuh psikologi, Gnostisisme, dan robot mecha raksasa. Namun, Square telah mengalokasikan sebagian besar anggaran dan staf 3D mereka untuk Final Fantasy VIII. Menghadapi tenggat waktu yang mustahil untuk Disk 2, Takahashi mengambil keputusan kontroversial: daripada membatalkan game atau menggantung ceritanya, ia mendudukkan karakter di kursi kayu di atas panggung untuk menuturkan alur kisah yang tersisa lewat ilustrasi diam yang diselingi pertarungan bos!',
    verifiedFact: 'Xenogears awalnya diajukan oleh Takahashi dan Soraya Saga sebagai salah satu kandidat alur cerita untuk Final Fantasy VII.',
    quoteOrLore: '“Pihak manajemen meminta kami menyudahi ceritanya di Disk 1 saja. Kami menolak dan menciptakan format monolog kursi demi menuntaskan seluruh kisah.” — Tetsuya Takahashi',
    easterEggNote: 'Sistem pertarungannya memadukan kombinasi tombol game fighting bela diri (Segitiga, Kotak, Silang) dengan pengukur giliran ATB berbasis turn-based!',
    quizQuestion: 'Mengapa Disk 2 dari Xenogears didominasi oleh rangkaian teks narasi panjang dengan karakter yang duduk di kursi?',
    quizOptions: [
      'Sebagai penghormatan artistik terhadap teater avant-garde Prancis',
      'Square kehabisan waktu dan anggaran, sehingga Takahashi menggunakan monolog berilustrasi untuk menuntaskan cerita',
      'CD-ROM PlayStation kehabisan kapasitas penyimpanan data fisik',
      'Tim lokalisasi bahasa Inggris kehilangan file dialog aslinya'
    ],
    quizExplanation: 'Terancam dibatalkan akibat kendala anggaran dan tenggat waktu, Takahashi memakai format monolog duduk di kursi untuk menyelesaikan jalan cerita!'
  },
  't-105': {
    headline: 'Suara Bergumam Sir Daniel Fortesque yang Tanpa Rahang Direkam Sambil Menyumpal Mulut dengan Kaos Kaki',
    story: 'Sir Daniel Fortesque adalah ksatria kerangka undead yang rahang bawahnya lepas berabad-abad lalu setelah matanya tertancap anak panah pertama di medan pertempuran. Pengisi suara sekaligus desainer utama Jason Wilson kesulitan membuat dialog Dan terdengar meyakinkan layaknya tengkorak tanpa rahang. Wilson menemukan solusinya dengan menyumpal pipinya menggunakan kaos kaki dan tisu selama sesi rekaman, menghasilkan gumaman heroik khas Sir Dan yang begitu kocak dan teredam!',
    verifiedFact: 'Sir Dan bangkit kembali dari kematian semata-mata karena mantra kebangkitan musuh bebuyutannya, Zarok, yang tak sengaja menyambarnya.',
    quoteOrLore: '“Saya merekam semua dialog Sir Dan dengan mulut penuh kaos kaki dan rahang terkunci rapat.” — Jason Wilson',
    easterEggNote: 'Di Hall of Heroes, patung-patung pejuang kuno secara terang-terangan mengejek Sir Dan karena langsung tewas di detik pertama perang meski reputasi anumertanya dianggap pahlawan legendaris!',
    quizQuestion: 'Bagaimana cara aktor suara Jason Wilson menghasilkan gaya bicara bergumam Sir Daniel Fortesque di MediEvil?',
    quizOptions: [
      'Menggunakan filter vocoder robotik',
      'Merekam dialognya sambil menyumpal mulutnya dengan kaos kaki dan tisu',
      'Berbicara di bawah air melalui selang snorkel',
      'Menempelkan mikrofon langsung ke tenggorokannya'
    ],
    quizExplanation: 'Jason Wilson menjejalkan kaos kaki dan tisu ke dalam mulutnya demi menyuarakan sosok ksatria kerangka yang kehilangan rahang bawahnya!'
  },
  't-106': {
    headline: 'Memelopori Pertempuran Armada Ruang Angkasa 3 Dimensi Sejati di Poros Sumbu Z dalam Genre RTS',
    story: 'Sebelum kehadiran Homeworld pada tahun 1999, semua game strategi mulai dari Command & Conquer hingga StarCraft berlangsung di atas bidang datar 2 dimensi. Relic Entertainment merancang engine pergerakan spasial yang memungkinkan pemain memetakan vektor 3 dimensi lengkap dengan pitch, yaw, dan roll di sumbu Z. Pemain dapat bermanuver mengarahkan armada tempur dari atas, bawah, atau belakang kapal induk musuh, diiringi alunan lagu megah menghanyutkan "Adagio for Strings" karya Samuel Barber!',
    verifiedFact: 'Band rock legendaris Yes secara khusus menggubah lagu penutup berjudul "Homeworld (The Ladder)" untuk game ini setelah jatuh cinta pada versi awal pengembangannya.',
    quoteOrLore: '“Kharak is burning. There was nothing left to return to.” (Kharak terbakar habis. Tak ada lagi rumah tersisa untuk pulang.) — Narator saat kehancuran planet asal',
    easterEggNote: 'Kapal Salvage Corvette dapat mengait dan membajak hampir semua kapal tempur musuh di dalam game, termasuk kapal raksasa Ion Cannon Frigate!',
    quizQuestion: 'Fitur taktis revolusioner apa yang diperkenalkan oleh Homeworld ke dalam genre RTS pada tahun 1999?',
    quizOptions: [
      'Petak heksagonal di peta',
      'Pergerakan 3 dimensi sejati di semua sumbu spasial (X, Y, dan Z) di kedalaman luar angkasa',
      'Pelacakan kepala menggunakan headset VR',
      'Sistem tata surya galaksi yang digenerasi secara prosedural'
    ],
    quizExplanation: 'Homeworld membebaskan game RTS dari bidang datar 2D, memungkinkan pemain menata formasi armada di sepanjang sumbu vertikal Z secara 3D penuh!'
  },
  't-107': {
    headline: 'Lorne Lanning Menciptakan Fitur "GameSpeak" Agar Abe Bisa Berkomunikasi Tanpa Senjata Api',
    story: 'Mantan animator efek khusus Hollywood Lorne Lanning menginginkan sosok protagonis yang sama sekali tidak membawa senjata api. Di Abe\'s Oddysee, Abe mengalahkan para Glukkon dan Slig bersenjata menggunakan kekuatan pikiran dan antarmuka komunikasi vokal bernama "GameSpeak". Dengan menekan kombinasi tombol shoulder (L/R), Abe bisa bersiul, menyapa "Hello", memberi aba-aba "Follow me", "Wait", melantunkan mantra untuk merasuki musuh, bahkan buang angin untuk mencairkan suasana dengan sesama budak pabrik Mudokon!',
    verifiedFact: 'Game ini diciptakan sebagai alegori kritik sosial terhadap perusakan lingkungan oleh industri dan eksploitasi kejam pabrik pengolahan daging.',
    quoteOrLore: '“Hello!” “Hello!” “Follow me!” “Okay!” — Dialog ikonik berulang dalam sistem GameSpeak',
    easterEggNote: 'Melantunkan mantra memungkinkan Abe merasuki tubuh penjaga Slig, membuat Anda bisa berjalan-jalan menembakkan senapan mesin mereka sebelum meledakkannya!',
    quizQuestion: 'Bagaimana cara utama Abe berinteraksi dan menyelamatkan sesama rekannya kaum Mudokon di Abe\'s Oddysee?',
    quizOptions: [
      'Menggunakan tali kait grappling hook',
      'Melalui kombinasi tombol "GameSpeak" (Hello, Follow Me, Wait, Chant)',
      'Dengan melempar bom asap pengalih perhatian',
      'Menggunakan alat pemancar radio telepati'
    ],
    quizExplanation: 'Lorne Lanning menciptakan GameSpeak, memungkinkan pemain mengarahkan sekutu secara verbal dan merasuki musuh melalui tombol kontroler!'
  },
  't-108': {
    headline: 'Rayman Kehilangan Lengan dan Kakinya Karena Perangkat 32-Bit Tidak Mampu Menganimasikan Sendi dengan Mulus',
    story: 'Desainer Prancis Michel Ancel awalnya merancang Rayman sebagai karakter dengan anggota tubuh yang tersambung normal layaknya manusia. Namun, selama pengujian awal pada perangkat keras 16-bit dan 32-bit, merender dan menghitung rotasi sendi yang mulus (bahu, siku, lutut) menyedot terlalu banyak memori CPU hingga memicu penurunan frame rate yang parah. Ancel mengambil terobosan cerdik: ia memutus anggota tubuh Rayman, membiarkan kepala, tangan, dan kakinya melayang bebas di udara, mengubah batasan teknis menjadi desain karakter yang sangat ikonik!',
    verifiedFact: 'Rayman awalnya dikembangkan untuk konsol Atari Jaguar sebelum akhirnya meraih kesuksesan luar biasa di PlayStation generasi pertama.',
    quoteOrLore: '“Menghilangkan lengan dan kakinya memungkinkan kami menggambar animasi tangan melayang di 60 FPS tanpa beban memori sama sekali.” — Michel Ancel',
    easterEggNote: 'Kemampuan rambut helikopter Rayman memungkinkannya melayang melintasi jurang, yang terinspirasi dari baling-baling biji pohon maple yang berputar saat jatuh!',
    quizQuestion: 'Mengapa Rayman dirancang dengan tangan dan kaki yang melayang tanpa lengan dan tungkai yang tersambung?',
    quizOptions: [
      'Karakternya terinspirasi dari peri cerita rakyat kuno Prancis',
      'Keterbatasan perangkat keras membuat animasi artikulasi sendi memakan terlalu banyak memori CPU',
      'Michel Ancel memenangkan taruhan melawan eksekutif Ubisoft',
      'Untuk mempermudah sistem deteksi benturan (hitbox)'
    ],
    quizExplanation: 'Ancel memangkas lengan dan kakinya karena konsol 32-bit kewalahan menghitung pergerakan sendi yang halus tanpa mengalami penurunan frame!'
  },
  't-109': {
    headline: 'Layar Pemuatan Terkenal "Reticulating Splines" Hanyalah Istilah Fiktif Tanpa Makna Teknis',
    story: 'Setiap kali pemain memuat atau membuat peta kota baru di SimCity 2000, bilah proses menampilkan frasa berteknologi tinggi "Reticulating Splines". Para penggemar menghabiskan waktu bertahun-tahun meneliti algoritma topologi matematika canggih apa yang dimaksud oleh istilah itu. Bertahun-tahun kemudian, sang kreator Will Wright mengaku: itu hanyalah istilah omong kosong fiktif yang ia ciptakan dalam lima detik karena terdengar sangat pintar dan canggih. Maxis begitu menyukai istilah tersebut hingga tetap menyematkannya di The Sims dan sekuel SimCity lainnya!',
    verifiedFact: 'SimCity 2000 memperkenalkan sudut pandang isometrik dimetrik serta lapisan bawah tanah untuk jaringan pipa air dan terowongan kereta bawah tanah.',
    quoteOrLore: '“Reticulating splines sama sekali tidak memiliki arti. Kami hanya berpikir frasa itu terdengar seperti komputasi tingkat tinggi.” — Will Wright',
    easterEggNote: 'Jika Anda membangun terlalu banyak bangunan arcology hingga tahun 2051, bangunan-bangunan futuristik tersebut akan melepaskan diri dari Bumi dan melesat ke luar angkasa!',
    quizQuestion: 'Apa arti sebenarnya dari pesan pemuatan legendaris "Reticulating Splines" di SimCity 2000?',
    quizOptions: [
      'Mengalkulasi matriks koordinat belokan jalan raya',
      'Sama sekali tidak ada artinya; Will Wright mengakui itu hanyalah istilah fiktif yang terdengar keren dan pintar',
      'Mengalokasikan zona komersial berkepadatan tinggi',
      'Mengalibrasi poligon elevasi kontur medan'
    ],
    quizExplanation: 'Will Wright menciptakan istilah "Reticulating Splines" sebagai lelucon teknis semata yang terdengar begitu matematis dan canggih!'
  },
  't-110': {
    headline: 'Andy Davidson Mengembangkan Game Ini untuk Lomba Majalah Amiga, Ditolak, Lalu Terjual Jutaan Kopi',
    story: 'Pengembang asal Inggris Andy Davidson memprogram game artileri berjudul "Total Wormage" untuk kompetisi coding majalah Amiga Format pada tahun 1993. Para juri tidak memahami keunikan game tersebut dan tidak memberinya penghargaan apa pun. Pantang menyerah, Davidson melangkah ke lantai pameran European Computer Trade Show di London dan memperlihatkannya kepada pendiri Team17, Martyn Brown dan Debbie Bestwick. Mereka langsung mengontraknya di tempat, mengubah cacing merah muda pembawa bazoka menjadi waralaba global bernilai jutaan dolar!',
    verifiedFact: 'Game ini menghadirkan senjata konyol seperti Holy Hand Grenade (penghormatan untuk film Monty Python) yang diiringi paduan suara malaikat melantunkan "Hallelujah!".',
    quoteOrLore: '“Para juri majalah menolaknya. Namun Team17 melihat kerumunan orang tertawa terbahak-bahak di depan monitor saya dan langsung menyodorkan kontrak.” — Andy Davidson',
    easterEggNote: 'Senjata patung keledai penghancur "Concrete Donkey" terinspirasi dari patung hiasan taman yang jelek milik orang tua Andy Davidson di Yorkshire!',
    quizQuestion: 'Dari mana asal muasal inspirasi senjata penghancur dahsyat "Concrete Donkey" dalam waralaba Worms?',
    quizOptions: [
      'Mitos kuda Troya Yunani kuno',
      'Patung hiasan keledai beton yang jelek di halaman rumah orang tua Andy Davidson',
      'Maskot dari serial kartun anak-anak di Inggris',
      'Simbol protes politik buruh di Leeds'
    ],
    quizExplanation: 'Senjata dahsyat Concrete Donkey dimodelkan langsung dari patung hiasan taman tak sedap dipandang di halaman belakang orang tua Davidson!'
  },
  't-111': {
    headline: 'Game Berating Dewasa (M) Pertama Square Dipasarkan Sebagai "Cinematic RPG" Sekuel Novel Jepang',
    story: 'Square berhasrat menaklukkan pasar dewasa Barat menyusul kesuksesan masif Final Fantasy VII. Diproduseri oleh Hironobu Sakaguchi, Parasite Eve ditulis sebagai sekuel resmi video game dari novel fiksi ilmiah bio-horor terlaris karya Hideaki Sena. Berlatar pada pekan Natal di Manhattan, petugas kepolisian NYPD Aya Brea menyelidiki fenomena pembakaran manusia secara spontan yang dipicu oleh mutasi mitokondria, memadukan ikon kota New York (Carnegie Hall, Kebun Binatang Central Park) dengan pertarungan ATB berbasis kubah bidik real-time!',
    verifiedFact: 'Parasite Eve adalah video game pertama dalam sejarah Square yang menerima rating usia Dewasa / Mature (M) dari badan sensor ESRB.',
    quoteOrLore: '“Mitokondria di dalam sel-selmu telah bangkit, dan mereka kini merebut kembali Bumi.” — Eve',
    easterEggNote: 'Gedung Chrysler Building di dungeon bonus EX Game menyajikan 77 lantai pertarungan brutal yang berujung pada pertarungan melawan bos rahasia True Maya!',
    quizQuestion: 'Organel biologis apa yang menjadi sumber fenomena manusia terbakar spontan dalam kisah Parasite Eve?',
    quizOptions: [
      'Ribosom',
      'Mitokondria (organel penghasil energi sel)',
      'Retikulum endoplasma',
      'Lisosom'
    ],
    quizExplanation: 'Plot cerita game berpusat pada bangkitnya mitokondria purba di dalam sel tubuh untuk merebut kendali dari inang manusianya!'
  },
  't-112': {
    headline: 'Memelopori Vertikalitas Tali Kait 3D dan Pembunuhan Senyap Sinematik Satu Serangan',
    story: 'Dirilis beberapa bulan lebih awal sebelum Metal Gear Solid pada tahun 1998, Tenchu menjadi pionir genre ninja stealth 3D. Acquire membekali Rikimaru dan Ayame dengan tali pengait ninja (grappling hook) yang bisa dikaitkan ke atap rumah atau birai kuil mana pun di era feodal Jepang. Yang terpenting, menyelinap diam-diam di belakang musuh tanpa terdeteksi akan memicu "Stealth Kill" sinematik instan dengan animasi tebasan berdarah yang memukau, melahirkan mekanika yang kelak menjadi fondasi Assassin\'s Creed dan Ghost of Tsushima!',
    verifiedFact: 'Tenchu memanfaatkan rekaman motion-capture asli yang diperagakan oleh para praktisi seni bela diri tradisional dan atlet kendo di Tokyo.',
    quoteOrLore: '“Seorang ninja yang menumpahkan darah tanpa pernah terlihat telah menuntaskan misinya bahkan sebelum pertempuran dimulai.” — Manifesto pengembang Acquire',
    easterEggNote: 'Sengaja memakan Poison Castella Cake membuat karakter muntah-muntah, yang bisa digunakan untuk mengalihkan perhatian penjaga yang mendengar suara tersedak tersebut!',
    quizQuestion: 'Gajet penjelajahan apa yang dipelopori oleh Tenchu: Stealth Assassins dalam dunia game 3D pada awal tahun 1998?',
    quizOptions: [
      'Pakaian sayap meluncur (wingsuit)',
      'Tali pengait ninja (grappling hook) yang memungkinkan pemain memanjat vertikal ke atap mana pun',
      'Teleportasi bom asap',
      'Sepatu khusus untuk berjalan di atas air'
    ],
    quizExplanation: 'Tenchu memelopori penggunaan grappling hook 3D, memungkinkan pemain melompat ke atap bangunan feodal Jepang dan menghabisi target dari atas!'
  },
  't-113': {
    headline: 'Kematian Meninggalkan Mayat Telanjang Bersama Seluruh Perlengkapan, Mengharuskan "Corpse Run"',
    story: 'Sebelum MMO kasual modern memperkenalkan fitur bangkit kembali di kuburan dengan baju zirah utuh, EverQuest terkenal sangat kejam tanpa ampun. Ketika karakter Anda tewas di benua Norrath, Anda dibangkitkan kembali dalam kondisi bugil di kota tempat Anda terikat, kehilangan pengalaman berharga dalam jumlah masif (bahkan bisa turun level!). Demi mendapatkan kembali baju zirah dan senjata langka Anda, Anda harus melakukan "Corpse Run" menegangkan tanpa busana menembus dungeon gelap demi menjarah mayat Anda sendiri yang membusuk!',
    verifiedFact: 'Ekonom Edward Castronova menerbitkan makalah akademis pada tahun 2001 yang menghitung bahwa PDB per kapita virtual di Norrath lebih tinggi daripada PDB nyata negara Rusia.',
    quoteOrLore: '“Melakukan corpse run di Hutan Kithicor tengah malam buta tanpa sehelai benang pun adalah teror psikologis yang sesungguhnya.” — Veteran EverQuest',
    easterEggNote: 'Game ini begitu membuat ketagihan hingga media massa dan para pasangan yang terabaikan menjulukinya sebagai "EverCrack"!',
    quizQuestion: 'Hukuman kematian kejam apa yang harus dihadapi oleh para pemain EverQuest pada tahun 1999?',
    quizOptions: [
      'Akun diblokir sementara selama 24 jam',
      'Karakter bangkit kembali tanpa busana dan harus menempuh "Corpse Run" berbahaya untuk mengambil barang bawaannya',
      'Senjata diserahkan secara permanen kepada monster yang membunuhnya',
      'Pemain dipaksa membayar uang tunai asli melalui Western Union'
    ],
    quizExplanation: 'Pemain dibangkitkan dalam keadaan telanjang bulat dan harus berlari melintasi zona mematikan untuk menjarah mayat mereka sendiri!'
  },
  't-114': {
    headline: 'Gregory Fulton Menyeimbangkan 8 Faksi Menggunakan Kisi Sistem Sihir Saling Terkait yang Rumit',
    story: 'Dirilis pada Februari 1999, Heroes III mencapai prestasi yang jarang bisa ditandingi game strategi lain: keseimbangan kompetitif nyaris sempurna di antara 8 faksi yang sangat berbeda (Castle, Rampart, Tower, Inferno, Necropolis, Dungeon, Stronghold, Fortress). Desainer utama Gregory Fulton memetakan setiap mantra dan kemampuan makhluk ke dalam empat rumpun sihir elemen (Tanah, Udara, Api, Air). Keseimbangan ini dan sensasi candu "satu giliran lagi" menjadikannya salah satu game strategi PC yang paling aktif dimainkan selama lebih dari 25 tahun berturut-turut!',
    verifiedFact: 'Keahlian Necromancy milik faksi Necropolis memungkinkan pemain mengumpulkan legiun tak terbendung yang terdiri dari puluhan ribu prajurit Skeleton.',
    quoteOrLore: '“Kunci utama kehebatan Heroes III adalah setiap upgrade makhluk terasa seperti lonjakan kekuatan yang begitu memuaskan.” — Gregory Fulton',
    easterEggNote: 'Mengetik "nwctrojanrabbit" pada konsol obrolan akan seketika memberi pemain sumber daya dan emas dalam jumlah maksimal!',
    quizQuestion: 'Kemampuan legendaris apa yang membuat faksi Necropolis begitu mendominasi dalam pertandingan panjang Heroes III?',
    quizOptions: [
      'Naga tulang terbang di giliran pertama',
      'Keahlian Necromancy, yang membangkitkan ribuan musuh yang gugur menjadi pasukan Skeleton yang tak terhentikan',
      'Merapalkan mantra Armageddon tanpa menggunakan mana sama sekali',
      'Mencuri buku mantra milik pahlawan musuh'
    ],
    quizExplanation: 'Keahlian Necromancy mengubah persentase musuh yang kalah menjadi prajurit Skeleton, menciptakan gelombang pasukan raksasa yang tak terbendung!'
  },
  't-115': {
    headline: 'Ron Gilbert Mengharamkan Kematian Karakter Karena Muak dengan Game Petualangan Sierra',
    story: 'Pada akhir tahun 1980-an, game petualangan Sierra seperti King\'s Quest kerap menyiksa pemain dengan kematian instan hanya karena menyentuh piksel yang salah atau lupa mengambil barang 10 jam sebelumnya. Desainer Lucasfilm Games Ron Gilbert menulis sebuah manifesto: "Game petualangan seharusnya tidak membunuh pemain hanya karena bereksplorasi." Di Monkey Island, Guybrush Threepwood mustahil mati akibat jebakan atau tebakan salah. Satu-satunya cara Guybrush bisa mati adalah jika Anda membiarkannya tenggelam di bawah air lebih dari 10 menit—karena ia menyombongkan diri sanggup menahan napas selama 10 menit!',
    verifiedFact: 'Mekanisme adu pedang dalam game ini bukanlah soal refleks menekan tombol cepat, melainkan membalas hinaan bajak laut dengan kalimat sindiran berima yang cerdas.',
    quoteOrLore: '“Adu pedang saling lempar hinaan membuktikan bahwa kecerdasan dan humor jauh lebih tajam daripada bilah pedang baja mana pun.” — Ron Gilbert',
    easterEggNote: 'Jika Anda menunggu di bawah air selama 10 menit 1 detik, kulit Guybrush berubah menjadi hijau pucat dan menu aksi berubah menjadi "Bob" (Mengapung), "Sink" (Tenggelam), dan "Decompose" (Membusuk)!',
    quizQuestion: 'Apa satu-satunya cara Guybrush Threepwood bisa benar-benar tewas dalam The Secret of Monkey Island?',
    quizOptions: [
      'Kalah dalam duel pedang melawan sang Sword Master',
      'Berada di dalam air lebih dari 10 menit (melanggar klaimnya bahwa ia bisa menahan napas 10 menit)',
      'Meminum minuman keras basi di bar SCUMM',
      'Terjatuh ke kawah lava di bawah kapal hantu LeChuck'
    ],
    quizExplanation: 'Guybrush sesumbar bisa menahan napas selama 10 menit; membiarkannya di bawah air selama 10 menit 1 detik akan membuatnya tenggelam mati!'
  },
  't-116': {
    headline: 'Jon St. John Menciptakan Suara Berat Serak Duke Terinspirasi dari Karakter Dirty Harry Milik Clint Eastwood',
    story: 'Sebelum tahun 1996, tokoh utama game FPS seperti Doomguy tidak pernah berbicara. 3D Realms merekrut penyiar radio Jon St. John untuk memberikan persona pahlawan aksi era 80-an yang percaya diri dan penuh gaya pada Duke. St. John merendahkan nada suaranya menjadi bisikan serak yang santai namun tegas, terinspirasi oleh penampilan Clint Eastwood dalam "Dirty Harry" dan Rowdy Roddy Piper dalam film "They Live", melahirkan kutipan ikonik: "It\'s time to kick ass and chew bubblegum... and I\'m all outta gum!"',
    verifiedFact: 'Duke Nukem 3D berjalan di atas Build engine karya Ken Silverman, yang memungkinkan adanya cermin pantul interaktif, monitor pengawas aktif, dan toilet yang dapat dihancurkan.',
    quoteOrLore: '“Hail to the king, baby!” — Duke Nukem',
    easterEggNote: 'Di Episode 1, memberikan tip uang kepada penari akan membuat mereka berkata "Shake it, baby!"—sebuah fitur yang memicu kehebohan moral di berbagai tabloid tahun 1996!',
    quizQuestion: 'Karakter film terkenal mana yang menjadi inspirasi akting suara Jon St. John untuk karakter Duke Nukem?',
    quizOptions: [
      'Arnold Schwarzenegger dalam The Terminator',
      'Clint Eastwood sebagai inspektur polisi "Dirty" Harry Callahan',
      'Sylvester Stallone sebagai Rambo',
      'Bruce Willis dalam Die Hard'
    ],
    quizExplanation: 'Jon St. John merendahkan suaranya menjadi nada serak yang sangat keren terinspirasi langsung dari karakter Dirty Harry karya Clint Eastwood!'
  },
  't-117': {
    headline: 'Sonic Mayhem Direkrut Menggubah OST Heavy Metal Berkat Mengirimkan Demo Musik ke id Software',
    story: 'Sascha Dikiciyan (Sonic Mayhem) adalah musisi elektronik yang masih merintis karier pada tahun 1996. Setelah memainkan Quake pertama, ia merekam CD berisi trek musik industrial metal agresif yang terinspirasi oleh Nine Inch Nails tanpa diminta siapa pun, lalu mengirimkannya langsung ke kantor pusat id Software di Mesquite, Texas. John Carmack dan timnya memutar CD tersebut di pemutar stereo kantor, terpukau oleh raungan distorsi gitarnya, dan langsung merekrutnya saat itu juga untuk menggubah seluruh lagu tema Quake II!',
    verifiedFact: 'Quake II mempopulerkan grafis dengan akselerasi perangkat keras OpenGL, membuka jalan bagi dominasi kartu grafis Nvidia dan 3dfx Voodoo di industri PC.',
    quoteOrLore: '“Saya mengirim CD demo ke id Software dengan nomor telepon saya. Dua hari kemudian, John Romero dan Carmack menelepon saya langsung.” — Sascha Dikiciyan',
    easterEggNote: 'Senjata BFG10K menembakkan bola plasma hijau raksasa yang memancarkan sulur-sulur laser sekunder ke arah setiap musuh di dalam ruangan!',
    quizQuestion: 'Bagaimana cara Sascha Dikiciyan (Sonic Mayhem) mendapatkan kesempatan menjadi komposer musik tema Quake II?',
    quizOptions: [
      'Memenangkan kompetisi remix lagu game di MTV',
      'Mengirimkan CD demo musik secara sukarela ke id Software, yang langsung terpukau dan merekrutnya',
      'Direkomendasikan oleh Trent Reznor setelah mengundurkan diri dari proyek',
      'Merupakan teman sekamar John Carmack saat kuliah'
    ],
    quizExplanation: 'Dikiciyan mengirimkan CD demo ke id Software; tim pengembang menyukai trek metalnya dan langsung mempekerjakannya di tempat!'
  },
  't-118': {
    headline: 'Naughty Dog Mengakali Batasan RAM 2MB PlayStation Menggunakan Kompresi Bahasa LISP Buatan Sendiri',
    story: 'Konsol PlayStation hanya memiliki 2 megabyte RAM utama dan 1MB VRAM video. Untuk merender hutan belantara 3D yang begitu padat tanpa layar pemuatan (loading screen) di tengah level, pendiri Naughty Dog Andy Gavin dan Dave Baggett menciptakan bahasa pemrograman mereka sendiri bernama "GOAL" (Game Oriented Assembly Lisp). Manajer memori khusus buatan mereka mengalirkan geometri level langsung dari CD-ROM secara real-time, mempertahankan jumlah poligon 3D 300% lebih tinggi dari batas yang diperkirakan insinyur resmi Sony!',
    verifiedFact: 'Crash Bandicoot 2 memperkenalkan gerakan slide jump (lompat seluncur), belly flop (hempasan perut), serta anak beruang kutub bernama Polar.',
    quoteOrLore: '“Para insinyur Sony di Tokyo membongkar kode kaset kami karena mereka tidak habis pikir bagaimana kami bisa menembus batas memori konsol mereka.” — Andy Gavin',
    easterEggNote: 'Melompati kepala anak beruang kutub Polar sebanyak 10 kali di warp room akan menghadiahi pemain dengan 10 nyawa ekstra gratis!',
    quizQuestion: 'Teknologi eksklusif apa yang diciptakan Naughty Dog untuk mengatasi batasan RAM 2MB milik PlayStation di game Crash Bandicoot?',
    quizOptions: [
      'Kartu ekspansi memori eksternal yang dijual terpisah',
      'Bahasa pemrograman buatan mereka sendiri (GOAL) serta algoritma streaming data CD secara real-time',
      'Efek pengaburan piksel beresolusi rendah',
      'Pemutaran video rekaman yang sudah dirender sebelumnya'
    ],
    quizExplanation: 'Andy Gavin mengembangkan GOAL (dialek Lisp) dan sistem streaming CD-ROM berkelanjutan demi menembus keterbatasan memori konsol Sony!'
  },
  't-119': {
    headline: 'Tim Cain Memprogram Fondasi Engine Sendirian di Akhir Pekan Sebelum Disetujui Manajemen',
    story: 'Pada tahun 1994, programmer Interplay Tim Cain menghabiskan enam bulan memprogram engine game isometrik di PC rumahnya pada setiap akhir pekan tanpa bayaran maupun izin manajemen. Ketika Interplay kehilangan lisensi tabletop GURPS akibat tingkat kekerasan dan adegan berdarah yang kelewat ekstrem, Cain menolak membiarkan proyek tersebut mati. Hanya dalam waktu dua minggu, ia merancang sistem atribut karakter S.P.E.C.I.A.L. (Strength, Perception, Endurance, Charisma, Intelligence, Agility, Luck), melahirkan salah satu waralaba pasca-apokaliptik terhebat sepanjang sejarah!',
    verifiedFact: 'Menyetel status Intelligence karakter Anda ke angka 3 atau lebih rendah akan mengubah semua opsi dialog menjadi erangan manusia purba dan ocehan yang membingungkan.',
    quoteOrLore: '“War. War never changes.” (Perang. Perang tak pernah berubah.) — Ron Perlman dalam narasi pembuka yang melegenda',
    easterEggNote: 'Maskot ikonik Vault Boy diilustrasikan oleh Leonard Boyarsky, yang terinspirasi dari karakter Rich Uncle Pennybags pada permainan papan Monopoly!',
    quizQuestion: 'Mengapa Interplay menciptakan sistem S.P.E.C.I.A.L. untuk game Fallout original pada tahun 1997?',
    quizOptions: [
      'Mereka dituntut oleh pemegang hak cipta Dungeons & Dragons',
      'Mereka kehilangan lisensi tabletop GURPS akibat tingkat kekerasan dan adegan berdarah yang ekstrem di dalam game',
      'Sistem tersebut diwajibkan oleh pihak militer Amerika Serikat',
      'Tim Cain ingin memasukkan minigame kasino berbasis keberuntungan'
    ],
    quizExplanation: 'Pencipta GURPS mencabut lisensi mereka karena konten kekerasan ekstrem, memaksa Tim Cain menciptakan sistem S.P.E.C.I.A.L. hanya dalam dua pekan!'
  },
  't-120': {
    headline: 'Capcom Membuang "Resident Evil 1.5" yang Sudah 80% Rampung Karena Dianggap Kurang Mencekam',
    story: 'Pada awal tahun 1997, Capcom telah merampungkan sekitar 80% pengembangan Resident Evil 2, yang awalnya menampilkan pembalap motor berambut pirang bernama Elza Walker serta kantor polisi berdesain beton modern. Produser Shinji Mikami dan sutradara Hideki Kamiya mengevaluasi build tersebut dan menyimpulkan bahwa meski kodenya berfungsi baik, lingkungannya terasa hambar dan alur ceritanya minim ketegangan dramatis. Dalam langkah yang sangat berani, Capcom membuang hasil kerja hampir dua tahun itu, mengganti Elza dengan Claire Redfield, dan merombak kantor polisi menjadi bekas museum seni yang megah sekaligus mencekam!',
    verifiedFact: '"Zapping System" memungkinkan keputusan pemain di Skenario A (Leon) secara fisik mengubah lokasi penempatan item dan perjumpaan musuh di Skenario B (Claire).',
    quoteOrLore: '“Membuang 80% dari game yang hampir selesai memang sangat menakutkan, tetapi merilis sekuel yang biasa-biasa saja akan membunuh masa depan waralaba ini.” — Shinji Mikami',
    easterEggNote: 'Mencapai kantor polisi tanpa memungut senjata atau amunisi apa pun akan memunculkan zombi Brad Vickers di terowongan bawah tanah, yang menjatuhkan kunci loker untuk kostum alternatif!',
    quizQuestion: 'Mengapa Capcom membatalkan proyek "Resident Evil 1.5" yang hampir rampung dan membangun ulang RE2 dari nol?',
    quizOptions: [
      'Kode sumber game dicuri oleh perusahaan saingan',
      'Shinji Mikami merasa gameplay dan kantor polisi modernnya terlalu hambar serta minim atmosfer horor yang dramatis',
      'Sony menolak game tersebut karena muatan kekerasan yang kelewat ekstrem',
      'Para pengisi suara melakukan aksi mogok kerja massal'
    ],
    quizExplanation: 'Mikami merasa versi yang sudah 80% jadi itu terasa membosankan, sehingga Capcom membuangnya demi menciptakan mahakarya kantor polisi bekas museum seni bergaya gotik!'
  }
};
