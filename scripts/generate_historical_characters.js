const fs = require('fs');
const path = require('path');

const historicalCharacters = [
  {
    id: "mustafa-kemal-ataturk",
    name: "Mustafa Kemal Atatürk",
    aliases: ["Atatürk", "Gazi Mustafa Kemal", "Mustafa Kemal Paşa", "Gazi"],
    category: "Lider & Devlet Adamı",
    era: "20. Yüzyıl",
    nationality: "Türkiye",
    years: "1881 - 1938",
    title: "Türkiye Cumhuriyeti'nin Kurucusu ve İlk Cumhurbaşkanı",
    difficulty: "kolay",
    clues: [
      "Çocukluğunda matematik öğretmeninin adaş olması sebebiyle kendisine ikinci adını verdiği söylenir.",
      "Çanakkale Savaşı'nda Conkbayırı'ndaki tarihi emri ve Trablusgarp'taki direnişiyle askeri dehasını kanıtladı.",
      "19 Mayıs 1919'da Bandırma Vapuru ile Samsun'a ayak basarak kurtuluş meşalesini yaktı.",
      "Harf Devrimi, kadınlara seçme-seçilme hakkı ve laiklik gibi köklü inkılaplarla modern bir cumhuriyet kurdu.",
      "'Yurtta sulh, cihanda sulh' ve 'Ne mutlu Türk'üm diyene!' vecizelerinin sahibi, Türkiye Cumhuriyeti'nin kurucu lideri."
    ]
  },
  {
    id: "albert-einstein",
    name: "Albert Einstein",
    aliases: ["Einstein"],
    category: "Bilim & Fizik",
    era: "Modern Çağ",
    nationality: "Almanya",
    years: "1879 - 1955",
    title: "Teorik Fizikçi & Nobel Fizik Ödülü Sahibi",
    difficulty: "kolay",
    clues: [
      "Çocukken geç konuştuğu söylenir; ilk patent memurluğu yaparken bilimsel devrim niteliğindeki makalelerini yazdı.",
      "Kuantum teorisinin temellerinden biri olan 'Fotoelektrik Etki' açıklamasıyla 1921 Nobel Fizik Ödülü'nü aldı.",
      "Zaman ve uzayın mutlak olmadığını, gözlemcinin hareketine bağlı olarak bükülebildiğini kanıtladı.",
      "Kütle ile enerjinin birbirine denk olduğunu gösteren tarihin en meşhur formülünü (E = mc²) buldu.",
      "Dağınık saçları, dil çıkardığı ikonik fotoğrafı ve İzafiyet Teorisi ile bilinen dahi fizikçi."
    ]
  },
  {
    id: "nikola-tesla",
    name: "Nikola Tesla",
    aliases: ["Tesla"],
    category: "Bilim & Mucit",
    era: "Sanayi Devrimi",
    nationality: "Sırbistan",
    years: "1856 - 1943",
    title: "Elektrik Mühendisi, Fizikçi ve Fütürist",
    difficulty: "kolay",
    clues: [
      "Güvercinlere olan sıra dışı sevgisi ve 3 sayısına olan takıntısıyla bilinen eksantrik bir mucitti.",
      "Niagara Şelalesi'nde dünyanın ilk büyük hidroelektrik santralinin kurulmasını sağladı.",
      "Thomas Edison ile elektrik akımının türü üzerine tarihe geçen 'Akımlar Savaşı'nı yürüttü.",
      "Radyonun asıl patent sahibi sayılmış, kablosuz elektrik aktarımı ve deprem makineleri üzerine çalışmıştır.",
      "Alternatif Akım (AC) sistemini insanlığa armağan eden, Tesla Bobini'nin yaratıcısı dahi mucit."
    ]
  },
  {
    id: "fatih-sultan-mehmed",
    name: "Fatih Sultan Mehmed",
    aliases: ["II. Mehmed", "Fatih", "Mehmed II", "Sultan Mehmed"],
    category: "Lider & Hükümdar",
    era: "Orta Çağ / Yeni Çağ",
    nationality: "Osmanlı İmparatorluğu",
    years: "1432 - 1481",
    title: "7. Osmanlı Padişahı & İstanbul Fatihi",
    difficulty: "kolay",
    clues: [
      "Rumca, Arapça, Farsça, Latince ve İbranice dahil 6'dan fazla dil bilen geniş bir kütüphaneye sahip bir entelektüeldi.",
      "Top döküm ustası Urban ile bizzat tasarladığı devasa 'Şahi' toplarını döktürerek surları dövdü.",
      "Kuşatma sırasında bir gecede donanmaya ait 72 gemiyi karadan kızaklarla Haliç'e indirtti.",
      "1453 yılında 21 yaşındayken Doğu Roma (Bizans) İmparatorluğu'na son vererek bir çağı kapatıp yeni bir çağ açtı.",
      "İstanbul'u fetheden ve 'Fatih' ile 'Kayser-i Rum' unvanlarını alan Osmanlı padişahı."
    ]
  },
  {
    id: "leonardo-da-vinci",
    name: "Leonardo da Vinci",
    aliases: ["Da Vinci", "Leonardo"],
    category: "Sanat & Polimat",
    era: "Rönesans",
    nationality: "İtalya",
    years: "1452 - 1519",
    title: "Rönesans Polimatı, Ressam, Mühendis ve Anatomist",
    difficulty: "kolay",
    clues: [
      "Yazılarını sol eliyle ve yalnızca aynadan okunabilecek şekilde tersten (ayna yazısı) yazma alışkanlığı vardı.",
      "Döneminin yüzyıllarca ötesinde helikopter, denizaltı, zırhlı tank ve paraşüt eskizleri çizdi.",
      "İnsan anatomisini anlamak için gizlice kadavraları inceleyip kusursuz oranları gösteren 'Vitruvius Adamı'nı çizdi.",
      "Milano'daki bir manastırın duvarına meşhur 'Son Akşam Yemeği' freskini yaptı.",
      "Louvre Müzesi'nde sergilenen esrarengiz gülümsemeli 'Mona Lisa' tablosunun yaratıcısı Rönesans dehası."
    ]
  },
  {
    id: "isaac-newton",
    name: "Isaac Newton",
    aliases: ["Newton", "Sir Isaac Newton"],
    category: "Bilim & Fizik",
    era: "Aydınlanma Çağı",
    nationality: "İngiltere",
    years: "1643 - 1727",
    title: "Fizikçi, Matematikçi, Astronom ve Teolog",
    difficulty: "kolay",
    clues: [
      "Bilimsel çalışmalarının yanında gizlice simya, cıva deneyleri ve kutsal metinlerin şifreleriyle ilgilendi.",
      "Beyaz ışığın prizmadan geçirildiğinde renk tayfına ayrıldığını göstererek modern optiği başlattı.",
      "Matematikte kalkülüs (türev ve integral) dalını bağımsız olarak geliştiren isimlerden biriydi.",
      "Hareketin üç temel yasasını açıkladığı 'Principia' eseri klasik fiziğin kutsal kitabı sayıldı.",
      "Ağaçtan düşen bir elmanın ilhamıyla Evrensel Kütle Çekim Yasası'nı formüle eden efsanevi bilim insanı."
    ]
  },
  {
    id: "marie-curie",
    name: "Marie Curie",
    aliases: ["Madam Curie", "Maria Sklodowska"],
    category: "Bilim & Kimya",
    era: "Modern Çağ",
    nationality: "Polonya / Fransa",
    years: "1867 - 1934",
    title: "Fizikçi ve Kimyager, Çifte Nobel Ödüllü Bilim İnsanı",
    difficulty: "kolay",
    clues: [
      "Not defterleri ve laboratuvar önlüğü bugün bile yüksek radyasyon yaydığı için kurşun kaplı kutularda saklanmaktadır.",
      "I. Dünya Savaşı sırasında cephede yaralı askerleri tedavi etmek için mobil röntgen araçları ('Küçük Curieler') tasarladı.",
      "Doğduğu vatanının onuruna 'Polonyum' ve ışıma özelliğinden dolayı 'Radyum' elementlerini keşfetti.",
      "Tarihte iki farklı bilim dalında (Fizik ve Kimya) Nobel Ödülü kazanan ilk ve tek kişidir.",
      "Radyoaktivite terimini literatüre sokan ve Nobel kazanan ilk kadın bilim insanı."
    ]
  },
  {
    id: "buyuk-iskender",
    name: "Büyük İskender",
    aliases: ["İskender", "Alexander the Great", "III. Aleksandros"],
    category: "Lider & Komutan",
    era: "Antik Çağ",
    nationality: "Makedonya",
    years: "MÖ 356 - MÖ 323",
    title: "Makedonya Kralı ve Antik Dünyanın En Büyük Fatihi",
    difficulty: "kolay",
    clues: [
      "Gençliğinde yalnızca kendisinin ehlileştirebildiği vahşi atı Bukefalos ile tüm seferlere katıldı.",
      "Felsefenin büyük ustası Aristoteles'ten birebir eğitim alarak felsefe ve doğa bilimlerine ilgi duydu.",
      "Frigya'da 'bu düğümü çözen Asya'nın hakimi olur' denilen efsanevi Gordion düğümünü kılıcıyla kesip attı.",
      "Gaugamela Savaşı'nda Pers Kralı III. Darius'u yenerek Akamenid İmparatorluğu'nu haritadan sildi.",
      "Yunanistan'dan Hindistan sınırlarına kadar fetihler yapan ve 32 yaşında namağlup ölen antik fatih."
    ]
  },
  {
    id: "jul-sezar",
    name: "Jül Sezar",
    aliases: ["Julius Caesar", "Sezar", "Gaius Julius Caesar"],
    category: "Lider & Komutan",
    era: "Antik Çağ",
    nationality: "Roma",
    years: "MÖ 100 - MÖ 44",
    title: "Roma Diktatörü ve Askeri Komutan",
    difficulty: "kolay",
    clues: [
      "Gençken Akdenizli korsanlar tarafından kaçırıldığında fidyesinin çok az olduğunu söyleyip fidyeyi iki katına çıkarttırmıştı.",
      "Rubicon Nehri'ni geçerken söylediği 'Zarlar atıldı' (Alea iacta est) sözüyle Roma iç savaşını başlattı.",
      "Zela Savaşı sonrasında Roma Senatosu'na gönderdiği mektupta sadece 'Veni, vidi, vici' (Geldim, gördüm, yendim) yazdı.",
      "Takvim reformuyla Jülyen takvimini kurdu ve Temmuz ayına (July) kendi adını verdi.",
      "Mart'ın İdusu'nda senatoda suikaste uğrarken 'Sen de mi Brutus?' dediği rivayet edilen Roma diktatörü."
    ]
  },
  {
    id: "kleopatra",
    name: "Kleopatra",
    aliases: ["VII. Kleopatra", "Cleopatra"],
    category: "Lider & Kraliçe",
    era: "Antik Çağ",
    nationality: "Antik Mısır",
    years: "MÖ 69 - MÖ 30",
    title: "Ptolemaios Hanedanı'nın Son Aktif Firavunu",
    difficulty: "kolay",
    clues: [
      "Aslen Mısır yerlisi değil, Büyük İskender'in generallerinden gelen Makedon-Yunan kökenli Ptolemaios soyundandı.",
      "Halkının dilini öğrenen ilk hanedan üyesiydi ve 9 farklı dili akıcı şekilde konuşabiliyordu.",
      "Jül Sezar'ın sarayına gizlice bir halının içine sarılarak girdiği meşhur hikayesiyle bilinir.",
      "Sezar'dan sonra Marcus Antonius ile hem aşk hem siyasi ittifak kurarak Roma'ya karşı mücadele etti.",
      "Güzelliği, siyasi zekası ve bir engerek yılanı zehriyle intihar ettiği efsanesiyle bilinen son Mısır Kraliçesi."
    ]
  },
  {
    id: "napolyon-bonapart",
    name: "Napolyon Bonapart",
    aliases: ["Napolyon", "Napoleon Bonaparte", "I. Napoléon"],
    category: "Lider & İmparator",
    era: "Yeni Çağ",
    nationality: "Fransa",
    years: "1769 - 1821",
    title: "Fransız İmparatoru ve Komutan",
    difficulty: "kolay",
    clues: [
      "Aslen Korsika adasında doğmuştu ve Fransızcayı hayatı boyunca belirgin bir İtalyan aksanıyla konuştu.",
      "Kendi hazırlattığı 'Medeni Kanun' (Code Civil) bugün modern kıta Avrupası hukukunun temelini oluşturur.",
      "Notre Dame Katedrali'ndeki taç giyme töreninde Papa'nın elinden tacı alıp kendi başına kendisi taktı.",
      "1812 yılında Rusya'ya yaptığı seferde kış şartları ve yakılmış toprak taktiği yüzünden ordusunun büyük kısmını kaybetti.",
      "1815'te Waterloo Savaşı'nda yenilerek Saint Helena adasına sürülen, elini ceketinin içine sokan pozuyla ünlü imparator."
    ]
  },
  {
    id: "cengiz-han",
    name: "Cengiz Han",
    aliases: ["Temuçin", "Genghis Khan", "Çinggis Kaan"],
    category: "Lider & Hükümdar",
    era: "Orta Çağ",
    nationality: "Moğolistan",
    years: "1162 - 1227",
    title: "Moğol İmparatorluğu'nun Kurucusu ve Büyük Kağan",
    difficulty: "kolay",
    clues: [
      "Doğduğunda avucunda pıhtılaşmış bir kan damlasıyla doğduğuna inanılır; asıl adı Temuçin'dir.",
      "Göçebe boyları liyakat esasına göre birleştirip posta teşkilatı (Örtöö) ve Yasa kanunlarını kurdu.",
      "Bugün dünya genelinde milyonlarca erkeğin onun genetik soyundan geldiği bilimsel olarak kanıtlanmıştır.",
      "Mezarının gizli kalması için onu gömen askerlerin ve onları gören herkesin öldürüldüğü söylenir.",
      "Pasifik Okyanusu'ndan Doğu Avrupa'ya uzanan tarihin en büyük bitişik kara imparatorluğunu kuran Moğol fatihi."
    ]
  },
  {
    id: "galileo-galilei",
    name: "Galileo Galilei",
    aliases: ["Galileo"],
    category: "Bilim & Astronomi",
    era: "Rönesans",
    nationality: "İtalya",
    years: "1564 - 1642",
    title: "Astronom, Fizikçi ve Modern Bilimin Babası",
    difficulty: "kolay",
    clues: [
      "Pisa Katedrali'ndeki avizenin salınımını nabzıyla ölçerek sarkaç periyotlarının sabitliğini keşfetti.",
      "Kendi geliştirdiği teleskopla Ay'daki kraterleri ve Güneş lekelerini inceledi.",
      "Jüpiter'in etrafında dönen dört büyük uyduyu (Io, Europa, Ganymede, Callisto) keşfetti.",
      "Güneş merkezli evren modelini savunduğu için Engizisyon Mahkemesi tarafından yargılandı ve ev hapsine mahkum edildi.",
      "Mahkemeden çıkarken fısıldadığı iddia edilen 'Yine de dönüyor!' (E pur si muove) sözüyle özdeşleşen gökbilimci."
    ]
  },
  {
    id: "charles-darwin",
    name: "Charles Darwin",
    aliases: ["Darwin"],
    category: "Bilim & Biyoloji",
    era: "19. Yüzyıl",
    nationality: "İngiltere",
    years: "1809 - 1882",
    title: "Doğa Bilimci ve Biyolog",
    difficulty: "kolay",
    clues: [
      "Aslında ilahiyat eğitimi almıştı ancak doğa tarihi tutkusu onu HMS Beagle gemisine bindirdi.",
      "Galapagos Adaları'ndaki ispinoz kuşlarının gaga yapılarındaki farklılıkları gözlemleyerek hipotezini kurdu.",
      "Böcekçil bitkiler ve yer solucanlarının toprak oluşumuna etkileri üzerine de öncü kitaplar yazdı.",
      "Çevresel koşullara en iyi uyum sağlayanların hayatta kaldığı 'Doğal Seçilim' mekanizmasını ortaya koydu.",
      "1859'da yayımladığı 'Türlerin Kökeni' eseriyle modern Evrim Teorisini kuran doğa bilimci."
    ]
  },
  {
    id: "sokrates",
    name: "Sokrates",
    aliases: ["Socrates"],
    category: "Felsefe & Düşünür",
    era: "Antik Çağ",
    nationality: "Yunanistan / Antik Atina",
    years: "MÖ 470 - MÖ 399",
    title: "Antik Yunan Filozofu, Batı Felsefesinin Kurucusu",
    difficulty: "kolay",
    clues: [
      "Hayatı boyunca tek bir satır bile yazı veya kitap yazmadı; fikirlerini Platon'un diyaloglarından öğreniyoruz.",
      "Annesi ebe olduğu için kendisi de zihinlerdeki doğruları açığa çıkaran 'Doğurtma Yöntemi'ni (Mayötik) kullandı.",
      "Karşısındakini sürekli soru sorarak çelişkilerini fark ettirdiği meşhur 'Sokratik Yöntem'i geliştirdi.",
      "Atina gençliğini yoldan çıkarmak ve şehrin tanrılarına inanmamak suçlamasıyla idama mahkum edildi.",
      "Zehirli baldıran otu şerbetini içerek ölen ve 'Bildiğim tek şey hiçbir şey bilmediğimdir' diyen filozof."
    ]
  },
  {
    id: "aristoteles",
    name: "Aristoteles",
    aliases: ["Aristo", "Aristotle"],
    category: "Felsefe & Mantık",
    era: "Antik Çağ",
    nationality: "Yunanistan / Antik Makedonya",
    years: "MÖ 384 - MÖ 322",
    title: "Filozof, Mantık Biliminin Kurucusu ve Polimat",
    difficulty: "orta",
    clues: [
      "Platon'un Atina'daki Akademisi'nde tam yirmi yıl boyunca öğrencilik ve hocalık yaptı.",
      "Derslerini öğrencileriyle yürüyerek anlattığı için kurduğu ekole 'Gezinenler' (Peripatetikler) dendi.",
      "İslam felsefe geleneğinde kendisine duyulan büyük saygıdan ötürü 'Muallim-i Evvel' (İlk Öğretmen) olarak anıldı.",
      "Büyük İskender'in çocukluk yıllarındaki özel öğretmenliğini üstlendi.",
      "Mantık, etik, politika ve biyolojiyi sınıflandıran, Platon'un 'idealar'ına karşı gerçek dünyayı savunan antik filozof."
    ]
  },
  {
    id: "william-shakespeare",
    name: "William Shakespeare",
    aliases: ["Shakespeare", "Avon'un Ozanı"],
    category: "Edebiyat & Tiyatro",
    era: "Rönesans / Elizabeth Dönemi",
    nationality: "İngiltere",
    years: "1564 - 1616",
    title: "Şair, Oyun Yazarı ve Tiyatro Oyuncusu",
    difficulty: "kolay",
    clues: [
      "İngiliz diline 1700'den fazla yeni kelime ve yüzlerce deyim kazandırdığı hesaplanmaktadır.",
      "Londra'daki meşhur 'The Globe' tiyatrosunun kurucu ortaklarından ve baş yazarlarındandı.",
      "Yazdığı 154 sone aşk, kıskançlık ve ölüm temalarıyla dünya edebiyatının zirveleri arasındadır.",
      "İki düşman ailenin çocuklarının trajik aşkını anlattığı 'Romeo ve Juliet'i kaleme aldı.",
      "Elinde kurukafayla 'Olmak ya da olmamak, işte bütün mesele bu' diyen Hamlet karakterinin yaratıcısı."
    ]
  },
  {
    id: "wolfgang-amadeus-mozart",
    name: "Wolfgang Amadeus Mozart",
    aliases: ["Mozart"],
    category: "Müzik & Sanat",
    era: "Klasik Dönem",
    nationality: "Avusturya",
    years: "1756 - 1791",
    title: "Besteci ve Müzik Dahisi",
    difficulty: "kolay",
    clues: [
      "Henüz 5 yaşındayken klavye başında ilk bestelerini yapmaya başlamış bir harika çocuktu (wunderkind).",
      "Vatikan'daki Sistina Şapeli'nde notaları gizli tutulan eseri tek bir dinleyişte hafızasına kazıyıp kopyaladı.",
      "Mehter marşından esinlenerek yazdığı 'Rondo alla Turca' (Türk Marşı) eseri günümüzde halen çok popülerdir.",
      "Saray Şairi Da Ponte ile birlikte 'Saraydan Kız Kaçırma', 'Don Giovanni' ve 'Figaro'nun Düğünü' operalarını besteledi.",
      "Yalnızca 35 yaşında arkasında gizemli 'Requiem' ağıtını yarım bırakarak hayata veda eden müzik dehası."
    ]
  },
  {
    id: "ludwig-van-beethoven",
    name: "Ludwig van Beethoven",
    aliases: ["Beethoven"],
    category: "Müzik & Sanat",
    era: "Klasik / Romantik Dönem",
    nationality: "Almanya",
    years: "1770 - 1827",
    title: "Besteci ve Piyanist",
    difficulty: "kolay",
    clues: [
      "3. Senfonisi 'Eroica'yı başlangıçta Napolyon'a ithaf etmiş, Napolyon imparatorluğunu ilan edince ithafı öfkeyle yırtmıştır.",
      "Piyanoda tuşların titreşimini hissedebilmek için piyanonun gövdesine tahta bir çubuk dayayıp dişleriyle tutardı.",
      "Ömrünün son yıllarında neredeyse tamamen sağır olmasına rağmen başyapıtlarını bestelemeye devam etti.",
      "Kaderin kapıyı çalışını simgeleyen 'Da-da-da-daaa' motifiyle başlayan 5. Senfoni'nin bestecisidir.",
      "Bugün Avrupa Birliği marşı olarak kullanılan 'Neşeye Övgü'yü içeren 9. Senfoni'nin sağır müzik dehası."
    ]
  },
  {
    id: "vincent-van-gogh",
    name: "Vincent van Gogh",
    aliases: ["Van Gogh"],
    category: "Sanat & Resim",
    era: "Post-Empresyonizm",
    nationality: "Hollanda",
    years: "1853 - 1890",
    title: "Post-Empresyonist Ressam",
    difficulty: "kolay",
    clues: [
      "Yaşadığı süre boyunca 2000'den fazla eser üretmesine rağmen yalnızca bir tek tablo satabildiği bilinir.",
      "Kardeşi Theo'ya yazdığı yüzlerce mektup, bugün onun psikolojisini ve sanat felsefesini anlamamızı sağlar.",
      "Ressam Paul Gauguin ile yaşadığı şiddetli bir tartışmanın ardından sol kulağının bir kısmını kesti.",
      "Akıl hastanesinde kaldığı sırada penceresinden gördüğü gökyüzünü dönen girdaplarla tuvale aktardı.",
      "'Yıldızlı Gece', 'Ayçiçekleri' ve sarı renk takıntısıyla tanınan efsanevi Hollandalı ressam."
    ]
  },
  {
    id: "mimar-sinan",
    name: "Mimar Sinan",
    aliases: ["Koca Sinan", "Sinan"],
    category: "Mimarlık & Sanat",
    era: "Osmanlı / Klasik Dönem",
    nationality: "Osmanlı İmparatorluğu",
    years: "1488 - 1588",
    title: "Osmanlı Başmimarı ve Mühendis",
    difficulty: "kolay",
    clues: [
      "Devşirme olarak yeniçeri ocağına katılmış, ordu seferlerinde Prut Nehri üzerine 13 günde kurduğu köprüyle parlamıştır.",
      "Eserlerinde deprem sarsıntılarını emecek esnek harçlar ve akustik için kubbelerde boş küpler kullandı.",
      "Kendi kariyerini 'Çıraklık, Kalfalık ve Ustalık' olmak üzere üç büyük eserle özetledi.",
      "Şehzade Camii'ni çıraklık, Süleymaniye Camii'ni ise kalfalık eseri olarak adlandırdı.",
      "Edirne'deki 'Selimiye Camii'ni ustalık eseri olarak inşa eden ve yaklaşık 100 yıl yaşayan büyük Osmanlı başmimarı."
    ]
  },
  {
    id: "ibn-i-sina",
    name: "İbn-i Sina",
    aliases: ["Avicenna", "Ebu Ali el-Hüseyin bin Abdullah bin Sina"],
    category: "Bilim & Tıp",
    era: "İslam'ın Altın Çağı",
    nationality: "Buhara / İran-Türk Dünyası",
    years: "980 - 1037",
    title: "Tabip, Filozof, Astronom ve Polimat",
    difficulty: "orta",
    clues: [
      "Henüz 16 yaşındayken dönemin en zorlu tıp vakalarını tedavi etmeye başladı ve Samani hükümdarını iyileştirdi.",
      "Ruhsal hastalıkların müzik ve telkinle tedavi edilebileceğini savunan ilk hekimlerdendi.",
      "Mikropların gözle görülmeyen minik varlıklar olduğunu ve hastalıkların su ve havayla yayıldığını öne sürdü.",
      "Batı dünyasında 'Avicenna' olarak tanındı ve yazdığı tıp ansiklopedisi Avrupa üniversitelerinde yüzyıllarca okutuldu.",
      "'El-Kanun fi't-Tıbb' (Tıbbın Kanunu) kitabının yazarı olan İslam dünyasının tıp hükümdarı."
    ]
  },
  {
    id: "mevlana-celaleddin-i-rumi",
    name: "Mevlana Celaleddin-i Rumi",
    aliases: ["Mevlana", "Rumi", "Celaleddin Rumi"],
    category: "Felsefe & Edebiyat",
    era: "Orta Çağ / Selçuklu Dönemi",
    nationality: "Horasan / Anadolu Selçuklu",
    years: "1207 - 1273",
    title: "Sufi Mistik, Şair ve Düşünür",
    difficulty: "kolay",
    clues: [
      "Belh şehrinden Moğol istilası sebebiyle göç edip ailesiyle birlikte Anadolu Selçuklu Devleti'nin başkenti Konya'ya yerleşti.",
      "Gezgin derviş Şems-i Tebrizi ile karşılaşması hayatında büyük bir mistik dönüşüme yol açtı.",
      "Ölüm gecesini Tanrı'ya kavuşma anı olarak gördüğü için bu geceye 'Düğün Gecesi' anlamına gelen 'Şeb-i Arus' dendi.",
      "Ney ve ilahi eşliğinde dönerek yapılan sema ayininin ve Mevlevilik öğretisinin manevi kaynağıdır.",
      "'Gel, gel, ne olursan ol yine gel' çağrısıyla ve 25 bin beyitlik 'Mesnevi' eseriyle bilinen evrensel mutasavvıf."
    ]
  },
  {
    id: "kanuni-sultan-suleyman",
    name: "Kanuni Sultan Süleyman",
    aliases: ["Kanuni", "Muhteşem Süleyman", "I. Süleyman", "Süleyman the Magnificent"],
    category: "Lider & Hükümdar",
    era: "Yeni Çağ / 16. Yüzyıl",
    nationality: "Osmanlı İmparatorluğu",
    years: "1494 - 1566",
    title: "10. Osmanlı Padişahı & Halife",
    difficulty: "kolay",
    clues: [
      "Hürrem Sultan'a duyduğu büyük aşkla 'Muhibbi' mahlasını kullanarak divan edebiyatının en güzel şiirlerini yazdı.",
      "1526'da Mohaç Ovası'nda Macar ordusunu 2 saat gibi inanılmaz kısa bir sürede mağlup etti.",
      "Batı dünyasında ihtişamından dolayı 'Muhteşem' (The Magnificent), Doğu'da ise adaletinden dolayı bu unvanla anıldı.",
      "46 yıl süren saltanatıyla Osmanlı tahtında en uzun süre hüküm süren padişah oldu.",
      "Osmanlı'nın zirve dönemini yöneten, kanunnameleriyle meşhur 10. padişah."
    ]
  },
  {
    id: "piri-reis",
    name: "Piri Reis",
    aliases: ["Muhiddin Piri"],
    category: "Kaşif & Coğrafya",
    era: "Yeni Çağ / 16. Yüzyıl",
    nationality: "Osmanlı İmparatorluğu",
    years: "1465 - 1554",
    title: "Osmanlı Kaptanı, Haritacı ve Denizci",
    difficulty: "orta",
    clues: [
      "Amcası efsanevi denizci Kemal Reis'in yanında Akdeniz'de korsanlık ve kaptanlık yaparak yetişti.",
      "Akdeniz limanlarını, sığlıklarını ve rüzgarlarını en ince ayrıntısına kadar anlatan 'Kitab-ı Bahriye'yi yazdı.",
      "Çizdiği haritada Antarktika kıtasını buzullarla kaplanmadan önceki topoğrafyasıyla gösterdiği iddia edilerek gizem yarattı.",
      "1513'te ceylan derisi üzerine çizdiği ve Güney Amerika kıyılarını hayret verici bir doğrulukla gösteren haritasıyla ünlendi.",
      "Topkapı Sarayı'nda tesadüfen bulunan ilk dünya haritasıyla bilim dünyasını sarsan ünlü Osmanlı amirali."
    ]
  },
  {
    id: "hezarfen-ahmed-celebi",
    name: "Hezarfen Ahmed Çelebi",
    aliases: ["Hezarfen", "Ahmed Çelebi"],
    category: "İlginç Figür & Havacılık",
    era: "17. Yüzyıl",
    nationality: "Osmanlı İmparatorluğu",
    years: "1609 - 1640",
    title: "Erken Dönem Havacılık Öncüsü ve Bilgini",
    difficulty: "kolay",
    clues: [
      "Lakabı Farsça'da 'bin fenli' yani 'binbir hüneri olan, çok bilgili kimse' anlamına gelir.",
      "İsmail Cevheri gibi antik İslam alimlerinin kanat denemelerini ve kuşların kanat anatomisini yıllarca inceledi.",
      "Sarayburnu'nda kendisini izleyen padişah IV. Murad'dan bir kese altın ödül aldı ancak sonra Cezayir'e sürüldü.",
      "Hakkındaki tek ve en detaylı yazılı kayıt seyyah Evliya Çelebi'nin Seyahatname eserinde yer alır.",
      "Suni kanatlarla Galata Kulesi'nden Boğaz'ı aşarak Üsküdar Doğancılar Meydanı'na uçtuğu rivayet edilen figür."
    ]
  },
  {
    id: "thomas-edison",
    name: "Thomas Edison",
    aliases: ["Edison", "Thomas Alva Edison"],
    category: "Mucit & Sanayi",
    era: "Sanayi Devrimi",
    nationality: "ABD",
    years: "1847 - 1931",
    title: "Amerikalı Mucit ve İş İnsanı",
    difficulty: "kolay",
    clues: [
      "Çocukken öğretmenleri tarafından 'algısı çok yavaş, kafası karışık' denilerek okuldan uzaklaştırılmıştı.",
      "1093 adet patent alarak tarihin en üretken endüstriyel mucitlerinden ve Menio Park Sihirbazı olarak anıldı.",
      "Sesi ilk kez kaydedip tekrar çalabilen cihaz olan 'Fonograf'ı icat ederek dünya çapında ün kazandı.",
      "'Dehanın yüzde biri ilham, yüzde doksan dokuzu terdir' sözünün sahibidir.",
      "Uzun ömürlü karbon filamanı geliştirerek elektrik ampulünü ticari olarak evlere sokan mucit."
    ]
  },
  {
    id: "alexander-graham-bell",
    name: "Alexander Graham Bell",
    aliases: ["Graham Bell", "Bell"],
    category: "Mucit & Teknoloji",
    era: "19. Yüzyıl",
    nationality: "İskoçya / ABD",
    years: "1847 - 1922",
    title: "Mucit, Bilim İnsanı ve Ses Eğitmeni",
    difficulty: "kolay",
    clues: [
      "Annesi ve eşi işitme engelliydi; bu sebeple hayatı boyunca işitme engellilerin eğitimi ve akustikle ilgilendi.",
      "Vurulan ABD Başkanı James Garfield'ın vücudundaki kurşunun yerini tespit etmek için ilkel bir metal dedektörü yaptı.",
      "Patent ofisine rakibi Elisha Gray'den sadece 2 saat önce başvurduğu için asıl mucit olarak tescillendi.",
      "Tarihteki ilk cihaz görüşmesinde asistanına 'Bay Watson, buraya gelin, sizi görmek istiyorum' dedi.",
      "1876 yılında sesi elektrik telleri üzerinden aktaran telefonu icat eden mucit."
    ]
  },
  {
    id: "alan-turing",
    name: "Alan Turing",
    aliases: ["Turing"],
    category: "Bilim & Bilgisayar",
    era: "20. Yüzyıl",
    nationality: "İngiltere",
    years: "1912 - 1954",
    title: "Matematikçi, Kriptolog ve Bilgisayar Biliminin Babası",
    difficulty: "kolay",
    clues: [
      "Koşuculukta olimpiyat seviyesinde bir maratoncuydu; toplantılara bazen 40 kilometre koşarak giderdi.",
      "Bir makinenin insan gibi düşünüp düşünemediğini anlamak için adını taşıyan ünlü testi tasarladı.",
      "II. Dünya Savaşı sırasında Bletchley Park'ta Nazi Almanyası'nın 'Enigma' şifrelerini kırmak için çalıştı.",
      "Geliştirdiği elektromekanik 'Bombe' makinesi sayesinde müttefiklerin savaşı en az iki yıl erken bitirmesini sağladı.",
      "Modern bilgisayar biliminin ve yapay zekanın kurucusu sayılan, siyanürlü elmayla trajik biçimde ölen dahi."
    ]
  },
  {
    id: "stephen-hawking",
    name: "Stephen Hawking",
    aliases: ["Hawking"],
    category: "Bilim & Kozmoloji",
    era: "Modern Çağ",
    nationality: "İngiltere",
    years: "1942 - 2018",
    title: "Teorik Fizikçi, Kozmolog ve Yazar",
    difficulty: "kolay",
    clues: [
      "Galileo Galilei'nin 300. ölüm yıl dönümünde doğmuş ve Albert Einstein'ın 139. doğum gününde vefat etmiştir.",
      "21 yaşında yakalandığı ALS hastalığı nedeniyle doktorlar ona yalnızca birkaç yıl ömür biçmişti.",
      "Karadeliklerin tamamen kara olmadığını, radyasyon yayarak yavaşça buharlaştığını (Kendi adıyla anılan ışıma) kanıtladı.",
      "Yanak kasıyla kontrol ettiği konuşma sentezleyicisi ve tekerlekli sandalyesiyle simgeleşti.",
      "Milyonlarca satan 'Zamanın Kısa Tarihi' kitabının yazarı olan efsanevi astrofizikçi."
    ]
  },
  {
    id: "aziz-sancar",
    name: "Aziz Sancar",
    aliases: ["Sancar", "Prof. Dr. Aziz Sancar"],
    category: "Bilim & Biyokimya",
    era: "Günümüz",
    nationality: "Türkiye",
    years: "1946 - Günümüz",
    title: "Biyokimyager, Moleküler Biyolog ve Nobel Ödüllü Bilim İnsanı",
    difficulty: "kolay",
    clues: [
      "Mardin'in Savur ilçesinde sekiz çocuklu okuma yazma bilmeyen bir ailenin çocuğu olarak dünyaya geldi.",
      "Gençliğinde başarılı bir kaleciydi ve bir dönem Türkiye Genç Milli Takımı seçmelerine davet edildi.",
      "Biyolojik saatin (sirkadiyen ritim) moleküler mekanizmaları ve kanser tedavisi üzerine önemli keşifler yaptı.",
      "Hücrelerin hasar gören DNA'ları nasıl onardığını ve genetik bilgiyi nasıl koruduğunu haritalandırdı.",
      "2015 Nobel Kimya Ödülü'nü kazanarak Türkiye'ye fen bilimlerinde ilk Nobel'i getiren bilim insanı."
    ]
  },
  {
    id: "ali-kuscu",
    name: "Ali Kuşçu",
    aliases: ["Kuşçuzade Alaeddin Ali"],
    category: "Bilim & Astronomi",
    era: "15. Yüzyıl / Rönesans Dönemi",
    nationality: "Timur İmparatorluğu / Osmanlı",
    years: "1403 - 1474",
    title: "Astronom, Matematikçi ve Kelam Alimi",
    difficulty: "orta",
    clues: [
      "Babası Timur İmparatoru ve astronom Uluğ Bey'in doğancıbaşısı (kuşçusu) olduğu için bu lakapla anıldı.",
      "Semerkant Gözlemevi'nde dönemin en gelişmiş yıldız kataloğu olan Zic-i Uluğ Bey'in hazırlanmasına liderlik etti.",
      "Dünya'nın eğikliğini ve Ay'ın safhalarını o devirde hayret verici bir hassasiyetle hesapladı.",
      "Fatih Sultan Mehmed'in daveti üzerine İstanbul'a gelip Ayasofya Medresesi'nin başmüderrisi oldu.",
      "İstanbul'un enlem ve boylamını belirleyen, Fatih devrinin en büyük matematik ve astronomi dehası."
    ]
  },
  {
    id: "arsimet",
    name: "Arşimet",
    aliases: ["Archimedes"],
    category: "Bilim & Matematik",
    era: "Antik Çağ",
    nationality: "Antik Yunan / Sicilya (Siracusa)",
    years: "MÖ 287 - MÖ 212",
    title: "Matematikçi, Fizikçi, Mühendis ve Astronom",
    difficulty: "kolay",
    clues: [
      "Romalılar memleketi Siracusa'yı kuşattığında geliştirdiği dev aynalarla gemileri yaktığı rivayet edilir.",
      "Kaldıraç mekanizmasını açıklarken 'Bana bir dayanak noktası verin, dünyayı yerinden oynatayım' demiştir.",
      "Bir Roma askeri tarafından öldürülmeden önce son sözünün 'Çemberlerimi bozmayın!' olduğu söylenir.",
      "Kralın altın tacında hile olup olmadığını su dolu bir leğene girdiğinde taşan suyu fark ederek anladı.",
      "Hamamdan çıplak fırlayıp sokaklarda 'Eureka! Eureka!' (Buldum!) diye bağırarak Suyun Kaldırma Kuvveti'ni bulan bilgin."
    ]
  },
  {
    id: "pisagor",
    name: "Pisagor",
    aliases: ["Pythagoras"],
    category: "Matematik & Felsefe",
    era: "Antik Çağ",
    nationality: "Antik Yunan / Sisam",
    years: "MÖ 570 - MÖ 495",
    title: "Matematikçi, Filozof ve Mistisizm Öncüsü",
    difficulty: "kolay",
    clues: [
      "Kurduğu gizemli dini tarikatta bakla yemeyi kesinlikle yasaklamış ve ruh göçüne (reenkarnasyon) inanmıştı.",
      "'Evrendeki her şey sayılardan ibarettir' diyerek matematiği evrenin dili olarak gören ilk düşünürdür.",
      "Demirci ustalarının çekiç seslerini dinleyerek müzikteki tel uzunlukları ve notalar arasındaki matematiksel oranı buldu.",
      "Gök cisimlerinin dönerken kulağımızın duyamadığı muazzam bir melodi çıkardığını ('Kürelerin Müziği') öne sürdü.",
      "Bir dik üçgende hipotenüsün karesinin dik kenarların kareleri toplamına eşit olduğunu gösteren ünlü teoremin sahibi."
    ]
  },
  {
    id: "kristof-kolomb",
    name: "Kristof Kolomb",
    aliases: ["Kolomb", "Christopher Columbus"],
    category: "Kaşif & Denizci",
    era: "Yeni Çağ / 15. Yüzyıl",
    nationality: "Ceneviz (İtalya) / İspanya",
    years: "1451 - 1506",
    title: "Kaşif ve Denizci",
    difficulty: "kolay",
    clues: [
      "İspanya Kralı Ferdinand ve Kraliçe Isabella'yı seferini finanse etmeleri için yıllarca ikna etmeye çalıştı.",
      "Santa Maria, Pinta ve Nina adını taşıyan üç küçük gemiyle Atlantik Okyanusu'nu aştı.",
      "Ömrünün sonuna kadar ulaştığı yerlerin Asya (Hindistan kıyıları) olduğuna inandı, bu yüzden yerlilere 'Hintli' (Indian) dedi.",
      "Bir masada yumurtanın sivri ucunu hafifçe kırarak dik durmasını sağladığı meşhur kıssasıyla anılır.",
      "1492 yılında Amerika kıtasına ayak basarak Yeni Dünya'nın kapılarını açan ünlü Cenovalı kaşif."
    ]
  },
  {
    id: "marco-polo",
    name: "Marco Polo",
    aliases: ["Polo"],
    category: "Kaşif & Gezgin",
    era: "Orta Çağ / 13. Yüzyıl",
    nationality: "Venedik Cumhuriyeti",
    years: "1254 - 1324",
    title: "Tüccar, Seyyah ve Yazar",
    difficulty: "orta",
    clues: [
      "İpek Yolu boyunca babası ve amcasıyla çıktığı yolculuk tam 24 yıl sürdü.",
      "Moğol hükümdarı Kubilay Han'ın sarayında 17 yıl kalarak hanın özel elçisi ve danışmanı olarak görev yaptı.",
      "Geri döndükten sonra Cenevizlilerle yapılan bir savaşta esir düşüp hapishaneye atıldı.",
      "Hapishanedeki hücre arkadaşı Rustichello'ya doğu dünyasının zenginliklerini anlattırarak kitaplaştırdı.",
      "Avrupa'ya porselen, kömür ve kağıt paranın varlığını ilk anlatan 'Dünyanın Tasviri' kitabının Venedikli seyyahı."
    ]
  },
  {
    id: "evliya-celebi",
    name: "Evliya Çelebi",
    aliases: ["Derviş Mehmed Zilli"],
    category: "Gezgin & Yazar",
    era: "17. Yüzyıl",
    nationality: "Osmanlı İmparatorluğu",
    years: "1611 - 1682",
    title: "Osmanlı Seyyahı ve Tarihçi",
    difficulty: "kolay",
    clues: [
      "Rüyasında Hz. Muhammed'i gördüğünde heyecandan 'Şefaat ya Resulallah' yerine 'Seyahat ya Resulallah' dediğini anlatır.",
      "Osmanlı sarayında hafız ve müezzin olarak padişah IV. Murad'ın meclislerinde yer aldı.",
      "Tam 50 yıl boyunca at sırtında Osmanlı coğrafyasını, Avrupa'yı, Kafkasları ve Mısır'ı gezdi.",
      "Gittiği yerlerin dillerini, geleneklerini, canavarlarını ve mizahi fıkralarını eşsiz bir üslupla kaleme aldı.",
      "10 ciltlik devasa 'Seyahatname' eseriyle Türk edebiyatının ve tarihinin en büyük gezgini."
    ]
  },
  {
    id: "yuri-gagarin",
    name: "Yuri Gagarin",
    aliases: ["Gagarin"],
    category: "Uzay & Havacılık",
    era: "20. Yüzyıl / Soğuk Savaş",
    nationality: "Sovyetler Birliği (SSCB)",
    years: "1934 - 1968",
    title: "Kozmonot ve Uzaya Çıkan İlk İnsan",
    difficulty: "kolay",
    clues: [
      "Kısa boyu (1.57 m) sayesinde küçük Vostok kapsülüne mükemmel uyum sağladığı için adaylar arasından seçildi.",
      "Fırlatılma anında telsizden haykırdığı 'Poyekhali!' (Haydi gidelim!) sözü uzay tarihinin efsanesi oldu.",
      "Dünya etrafındaki yörüngesini 108 dakikada tamamlayıp paraşütle bir köy tarlasına iniş yaptı.",
      "Yörüngeden Dünya'ya bakarken 'Dünya mavi ve ne kadar harika, ona zarar vermeyin' demiştir.",
      "12 Nisan 1961'de Vostok 1 aracıyla uzaya çıkan ve Dünya'yı uzaydan gören ilk insan."
    ]
  },
  {
    id: "neil-armstrong",
    name: "Neil Armstrong",
    aliases: ["Armstrong"],
    category: "Uzay & Havacılık",
    era: "20. Yüzyıl / Soğuk Savaş",
    nationality: "ABD",
    years: "1930 - 2012",
    title: "Astronot ve Ay'a Ayak Basan İlk İnsan",
    difficulty: "kolay",
    clues: [
      "Kore Savaşı'nda savaş pilotu olarak görev yapmış, daha sonra roket uçak X-15 ile atmosfer sınırında uçmuştu.",
      "Gemini 8 görevinde uzayda kontrolden çıkıp saniyede bir tur dönen mekiği soğukkanlılığıyla kurtardı.",
      "Apollo 11'in 'Eagle' (Kartal) iniş modülünü Ay yüzeyindeki kraterlerden elle kumanda ederek güvenle indirdi.",
      "Ay yüzeyinde Buzz Aldrin ile birlikte yaklaşık iki buçuk saat yürüyüş yaptı ve deneyler kurdu.",
      "'İnsan için küçük, insanlık için dev bir adım' sözüyle 1969'da Ay'a ilk ayak basan astronot."
    ]
  },
  {
    id: "jeanne-d-arc",
    name: "Jeanne d'Arc",
    aliases: ["Orleans Bakiresi", "Joan of Arc"],
    category: "Tarihi Kahraman & Komutan",
    era: "Orta Çağ / Yüzyıl Savaşları",
    nationality: "Fransa",
    years: "1412 - 1431",
    title: "Fransa'nın Koruyucu Azizesi ve Halk Kahramanı",
    difficulty: "orta",
    clues: [
      "Okuma yazma bilmeyen bir köylü kızıydı; Aziz Mikail ve Azize Katerina'dan ilahi mesajlar aldığını iddia etti.",
      "Erkek zırhı giyip saçlarını kestirerek Veliaht Prens VII. Charles'ı ordunun başına geçmeye ikna etti.",
      "İngiliz kuşatması altındaki stratejik Orleans şehrini inanılmaz bir cesaretle 9 günde kurtardı.",
      "Burgonyalılar tarafından yakalanıp İngilizlere satıldı ve cadılık ve sapkınlık suçlamasıyla yargılandı.",
      "Henüz 19 yaşındayken Rouen meydanında bir direkte diri diri yakılan 'Orleans Bakiresi'."
    ]
  },
  {
    id: "grigori-rasputin",
    name: "Grigori Rasputin",
    aliases: ["Rasputin"],
    category: "İlginç Karakter & Mistik",
    era: "20. Yüzyıl Başı",
    nationality: "Rusya İmparatorluğu",
    years: "1869 - 1916",
    title: "Sibirya Kökenli Mistik, Keşiş ve Çar Danışmanı",
    difficulty: "orta",
    clues: [
      "Sibirya'nın Pokrovskoye köyünden çıkıp hipnotik bakışları ve dini karizmasıyla Çarlık sarayına kadar yükseldi.",
      "Çareviç Aleksey'in hemofili kaynaklı kanamalarını gizemli biçimde durdurarak Çariçe Aleksandra'nın mutlak güvenini kazandı.",
      "I. Dünya Savaşı sırasında Çar Nikolay cephedeyken bakanların atanmasında perde arkasındaki tek güç haline geldi.",
      "Öldürülmesi sırasında siyanürlü pastaları yediği, defalarca vurulduğu ve en son donmuş nehre atılarak öldüğü anlatılır.",
      "Rus Çarlığı'nın yıkılış sürecine damga vuran, ölmesi adeta imkansız efsanesiyle bilinen 'Deli Keşiş'."
    ]
  },
  {
    id: "mahatma-gandhi",
    name: "Mahatma Gandhi",
    aliases: ["Gandhi", "Mohandas Karamchand Gandhi"],
    category: "Lider & Felsefe",
    era: "20. Yüzyıl",
    nationality: "Hindistan",
    years: "1869 - 1948",
    title: "Hindistan Bağımsızlık Hareketi'nin Ruhani ve Siyasi Lideri",
    difficulty: "kolay",
    clues: [
      "Londra'da hukuk eğitimi aldı ve genç bir avukatken Güney Afrika'daki ırk ayrımcılığına karşı ilk mücadelelerini verdi.",
      "Kendisine Rabindranath Tagore tarafından verilen 'Mahatma' unvanı Sanskritçe'de 'Yüce Ruh' anlamına gelir.",
      "İngiliz tekstilini boykot etmek için kendi kıyafetlerini geleneksel çıkrıkta (çarkha) bizzat kendisi dokudu.",
      "İngiliz tuz vergisine karşı halkıyla birlikte okyanusa doğru 390 kilometrelik meşhur 'Tuz Yürüyüşü'nü yaptı.",
      "Şiddetsiz direniş (Satyagraha) felsefesiyle Hindistan'ı bağımsızlığa kavuşturan lider."
    ]
  },
  {
    id: "winston-churchill",
    name: "Winston Churchill",
    aliases: ["Churchill", "Sir Winston Churchill"],
    category: "Lider & Devlet Adamı",
    era: "20. Yüzyıl / II. Dünya Savaşı",
    nationality: "İngiltere",
    years: "1874 - 1965",
    title: "Birleşik Krallık Başbakanı ve Tarihçi",
    difficulty: "kolay",
    clues: [
      "Gençliğinde Boer Savaşı'nda esir düşmüş ancak hapisten kaçarak İngiltere'de ulusal kahraman olmuştur.",
      "I. Dünya Savaşı'ndaki Gelibolu (Çanakkale) hezimetinin ardından Donanma Bakanlığı görevinden istifa etmek zorunda kaldı.",
      "Siyasetçiliğinin yanında usta bir yazardı ve 1953 yılında Nobel Edebiyat Ödülü'ne layık görüldü.",
      "Ağzından hiç düşmeyen purosu, iki parmağıyla yaptığı 'Zafer' (V) işareti ve kriz anındaki cesur konuşmalarıyla tanındı.",
      "Halkına 'Kan, ter ve gözyaşından başka vaat edecek bir şeyim yok' diyerek Hitler'e direnen İngiliz başbakanı."
    ]
  },
  {
    id: "abraham-lincoln",
    name: "Abraham Lincoln",
    aliases: ["Lincoln"],
    category: "Lider & Devlet Adamı",
    era: "19. Yüzyıl",
    nationality: "ABD",
    years: "1809 - 1865",
    title: "16. ABD Başkanı",
    difficulty: "kolay",
    clues: [
      "Gençliğinde lisanslı bir güreşçiydi ve çıktığı yaklaşık 300 müsabakadan yalnızca birini kaybetmişti.",
      "Uzun boyu, karakteristik silindir şapkası ve dürüstlüğünden dolayı 'Dürüst Abe' lakabıyla anılırdı.",
      "Amerikan İç Savaşı sırasında Birliği (Kuzey'i) dağılmaktan kurtararak ülkenin bölünmesini engelledi.",
      "Gettysburg Konuşması'nda 'Halkın, halk tarafından, halk için yönetimi' tanımını tarihe kazıdı.",
      "Köleliği tamamen kaldıran Emancipation Proclamation'ı imzalayan ve Ford Tiyatrosu'nda suikast sonucu öldürülen ABD başkanı."
    ]
  },
  {
    id: "che-guevara",
    name: "Che Guevara",
    aliases: ["Che", "Ernesto Guevara"],
    category: "Tarihi Figür & Devrimci",
    era: "20. Yüzyıl / Soğuk Savaş",
    nationality: "Arjantin / Küba",
    years: "1928 - 1967",
    title: "Doktor, Gerilla Lideri ve Devrimci",
    difficulty: "kolay",
    clues: [
      "Asıl mesleği tıp doktorluğuydu; gençliğinde bir motosikletle Latin Amerika'yı baştan başa gezdi.",
      "Bu gezideki anıları daha sonra 'Motosiklet Günlükleri' adıyla kitaplaştırıldı ve dünya görüşünü şekillendirdi.",
      "Meksika'da Fidel Castro ile tanışarak 'Granma' yatıyla Küba Devrimi'ni başlatmak üzere yola çıktı.",
      "Devrim sonrasında Küba Sanayi Bakanlığı ve Merkez Bankası Başkanlığı yaptı ancak tekrar gerilla savaşına döndü.",
      "Yıldızlı siyah beresi ve Alberto Korda tarafından çekilen ikonik fotoğrafıyla bir küresel sembole dönüşen figür."
    ]
  },
  {
    id: "konfucyus",
    name: "Konfüçyüs",
    aliases: ["Kong Fuzi", "Confucius"],
    category: "Felsefe & Düşünür",
    era: "Antik Çağ",
    nationality: "Antik Çin (Lu Devleti)",
    years: "MÖ 551 - MÖ 479",
    title: "Çinli Filozof, Öğretmen ve Siyaset Teorisyeni",
    difficulty: "orta",
    clues: [
      "Çin'de İlkbahar ve Sonbahar döneminde yaşadı ve adalet bakanlığı gibi devlet görevlerinde bulundu.",
      "Felsefesinin merkezine erdem, aileye saygı (Filial Piety) ve toplumsal ahlak kurallarını koydu.",
      "Öğrencileriyle yaptığı diyaloglar ve ahlaki öğütleri 'Konuşmalar' (Analektler) adlı kitapta toplandı.",
      "'Sana yapılmasını istemediğin şeyi sen de başkasına yapma' altın kuralını Batı'dan yüzlerce yıl önce söyledi.",
      "Öğretileri iki bin yılı aşkın süre boyunca Çin İmparatorluğu'nun resmi devlet felsefesi olan düşünür."
    ]
  },
  {
    id: "michelangelo",
    name: "Michelangelo",
    aliases: ["Michelangelo Buonarroti"],
    category: "Sanat & Heykel",
    era: "Rönesans",
    nationality: "İtalya (Floransa)",
    years: "1475 - 1564",
    title: "Rönesans Heykeltıraşı, Ressamı ve Mimarı",
    difficulty: "kolay",
    clues: [
      "Kendisini hiçbir zaman bir ressam olarak görmemiş, her zaman 'Ben sadece bir heykeltıraşım' demiştir.",
      "Mermerin içindeki heykeli gördüğünü ve sadece fazlalıkları yontarak onu serbest bıraktığını söylerdi.",
      "Vatikan'daki Sistina Şapeli'nin dev tavan fresklerini 4 yıl boyunca iskele üstünde sırtüstü yatarak tek başına boyadı.",
      "Meryem Ana'nın kucağındaki İsa'yı tasvir eden eşsiz 'Pieta' heykelini henüz 24 yaşındayken tamamladı.",
      "Mermerden oyduğu 5 metrelik çıplak devasa 'Davut' (David) heykeli ve 'Adem'in Yaratılışı' tablosunun yaratıcısı."
    ]
  },
  {
    id: "fyodor-dostoyevski",
    name: "Fyodor Dostoyevski",
    aliases: ["Dostoyevski"],
    category: "Edebiyat & Roman",
    era: "19. Yüzyıl",
    nationality: "Rusya",
    years: "1821 - 1881",
    title: "Rus Romancı, Düşünür ve Psikolojik Edebiyat Ustası",
    difficulty: "kolay",
    clues: [
      "Çarlık aleyhtarı fikirleri sebebiyle idama mahkum edilmiş, kurşuna dizilmek üzereyken son saniyede affedilip Sibirya'ya sürülmüştür.",
      "Kumar borçlarını ödeyebilmek için 26 gün gibi inanılmaz kısa bir sürede 'Kumarbaz' romanını tamamladı.",
      "Karakterlerinin derin iç hesaplaşmaları ve vicdan azaplarıyla psikolojik realizmin zirvesi kabul edilir.",
      "Raskolnikov adlı yoksul bir öğrencinin tefeci kadını baltayla öldürmesini ve ardından çektiği vicdan azabını anlattı.",
      "'Suç ve Ceza', 'Karamazov Kardeşler' ve 'Budala' gibi dünya edebiyatının dev yapıtlarının yazarı."
    ]
  },
  {
    id: "alexander-fleming",
    name: "Alexander Fleming",
    aliases: ["Fleming", "Sir Alexander Fleming"],
    category: "Bilim & Tıp",
    era: "20. Yüzyıl",
    nationality: "İskoçya",
    years: "1881 - 1955",
    title: "Bakteriyolog ve Farmakolog",
    difficulty: "orta",
    clues: [
      "I. Dünya Savaşı'nda sahra hastanelerinde görev yaparken antiseptiklerin derin yaralardaki bakterileri öldüremediğini fark etti.",
      "Tatilden döndüğünde laboratuvarındaki kirli petri kaplarında yeşilimsi bir küf mantarının ürediğini gördü.",
      "Küfün etrafındaki stafilokok bakterilerinin eridiğini ve öldüğünü fark ederek durumu dikkatle inceledi.",
      "Bulduğu maddeye 'Penicillium notatum' mantarının adından esinlenerek isim verdi.",
      "Tarihteki ilk gerçek antibiyotik olan 'Penisilin'i keşfederek milyonlarca insanın hayatını kurtaran bilim insanı."
    ]
  },
  {
    id: "wright-kardesler",
    name: "Wright Kardeşler",
    aliases: ["Orville ve Wilbur Wright", "Wright Brothers", "Orville Wright"],
    category: "Mucit & Havacılık",
    era: "20. Yüzyıl Başı",
    nationality: "ABD",
    years: "1867 / 1871 - 1912 / 1948",
    title: "Havacılık Öncüleri ve İlk Motorlu Uçağın Mucitleri",
    difficulty: "kolay",
    clues: [
      "Havacılıktan önce Ohio'da bir bisiklet tamir ve üretim atölyesi işletiyorlardı.",
      "Kuşların uçarken kanatlarını nasıl büktüklerini gözlemleyerek uçağın dengesini sağlayan 'kanat bükme' sistemini buldular.",
      "Denemelerini rüzgarın elverişli ve kum tepelerinin yumuşak olduğu Kitty Hawk (Kuzey Carolina) sahilinde yaptılar.",
      "İlk başarılı motorlu ve kontrollü uçuşları yalnızca 12 saniye sürdü ve 36 metre mesafe katetti.",
      "17 Aralık 1903'te 'Flyer 1' adlı uçakla tarihin ilk motorlu ve insanlı kontrollü uçuşunu gerçekleştiren kardeşler."
    ]
  }
];

// Dosya kontrolü ve yazma
const outputPath = path.join(__dirname, '..', 'src', 'data', 'tarihi-karakterler.json');
fs.writeFileSync(outputPath, JSON.stringify(historicalCharacters, null, 2), 'utf-8');
console.log(`Başarıyla oluşturuldu: ${historicalCharacters.length} tarihi karakter kaydedildi -> ${outputPath}`);
