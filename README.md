# 🎬 Kötü Anlatılmış Filmler & Diziler (Badly Explained Movies)

> **Efsane film ve dizilerin konuları en absürt, komik ve ironik şekilde özetlendi. 5 aşamalı ipucu zinciriyle doğru yapımı tahmin edebilir misin?**  
> *Iconic movies and TV shows summarized in the most absurd and hilarious ways. Can you guess the title with a 5-step clue chain?*

---

## 🌟 Öne Çıkan Özellikler / Features

- **🧩 5 Aşamalı İpucu Zinciri (100P - 500P)**:
  1. 🧩 **1. İpucu (100P) — Emoji Şifresi:** Filme dair ipucu veren ikonik emoji dizilimi.
  2. 💬 **2. İpucu (200P) — Efsane Replik:** Sinema tarihine kazınan unutulmaz replikler.
  3. 🤪 **3. İpucu (300P) — Kötü Anlatılmış Konu:** Filmin konusunun en saçma, komik ve çarpık özeti.
  4. ⚠️ **4. İpucu (400P) — İronik Detay & Uyarı:** Komik detaylar, sahne uyarıları ve spoilerlar.
  5. 🎬 **5. İpucu (500P) — Başroller & Künye:** Yönetmen, başrol oyuncuları ve yapım yılı.

- **🌐 Tam İki Dilli Deneyim (TR / EN)**:
  - Oyun içi tek tıkla Türkçe ve İngilizce arasında geçiş.
  - 100 yapımın tamamı için hem Türkçe hem de İngilizce özel olarak yazılmış başlıklar, ipuçları, replikler ve açıklamalar.

- **📦 100 Efsane Yapımlık Dev Havuz**:
  - **76 Efsane Film:** *The Godfather, Pulp Fiction, Fight Club, The Matrix, Interstellar, Inception, Titanic, Shrek, Gladiator, Star Wars, Harry Potter, Jurassic Park, Oppenheimer, Barbie, Dune...*
  - **24 Kült Dizi:** *Breaking Bad, Game of Thrones, Stranger Things, Friends, The Office, Sherlock, Peaky Blinders, Squid Game, La Casa de Papel, Dark, Succession, The Sopranos...*
  - **🇹🇷 Yeşilçam & Türk Sineması/Dizileri:** *Hababam Sınıfı, Tosun Paşa, Süt Kardeşler, Çöpçüler Kralı, Şaban Oğlu Şaban, Kibar Feyzo, G.O.R.A., Ezel, Kurtlar Vadisi, Leyla ile Mecnun, Avrupa Yakası, Behzat Ç., Aşk-ı Memnu, Babam ve Oğlum...*

- **⚡ Akıllı Arama & Otomatik Tamamlama (Autocomplete)**:
  - Türkçe karakter ve aksan duyarsız filtreleme (örn. `lotr`, `şrek`, `kurtlar`, `godfather`, `yildizlararasi`).
  - Filmlerin hem Türkçe hem İngilizce isimleri ve yaygın takma adlarıyla (alias) arama desteği.

- **🎨 Sinematik Neon Arayüz**:
  - Framer Motion akıcı kart geçişleri, neon ışık parıltıları ve parçacık efektleri.
  - Yanlış tahminde sarsılma (shake) efekti, doğru tahminde ekranı kaplayan konfeti patlaması (`canvas-confetti`).
  - Özel yapım reveal kartı (yıl, IMDb puanı, tür, yönetmen, başroller ve kötü anlatılmış konu alıntısı).

- **🔊 Web Audio API Ses Efektleri**:
  - Harici ses dosyası yüklemeye gerek kalmadan sentezlenen film makarası, doğru tahmin alkışı, yanlış tahmin uyarısı ve ipucu açılma sesleri.
  - Sağ üstten tek tıkla ses açma/kapatma.

- **📊 Rekor ve Seri Takibi (LocalStorage)**:
  - En yüksek skor, en uzun doğru serisi ve toplam oynanan oyun istatistikleri tarayıcıda kalıcı olarak saklanır.

---

## 🛠️ Teknoloji Yığını (Tech Stack)

| Kategori | Teknoloji |
| :--- | :--- |
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router, Turbopack) |
| **Kütüphane** | [React 19](https://react.dev/) |
| **Dil** | [TypeScript](https://www.typescriptlang.org/) |
| **Stil & Tasarım** | [Tailwind CSS 4](https://tailwindcss.com/) |
| **Animasyonlar** | [Framer Motion](https://www.framer.com/motion/) |
| **İkonlar** | [Lucide React](https://lucide.dev/) |
| **Kutlama Efekti** | [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti) |
| **Ses Motoru** | Web Audio API (Native Sintetizör) |

---

## 🚀 Kurulum & Çalıştırma (Getting Started)

Projeyi yerel ortamınızda çalıştırmak için:

```bash
# Bağımlılıkları yükleyin
npm install

# Geliştirme sunucusunu başlatın
npm run dev

# Üretim derlemesi (Production Build)
npm run build
npm run start
```

Tarayıcınızda açın: **[http://localhost:3000](http://localhost:3000)**

---

## 📂 Proje Yapısı (Project Structure)

```text
├── src/
│   ├── app/
│   │   ├── layout.tsx                # Ana HTML şablonu, fontlar ve başlık
│   │   ├── page.tsx                  # Ana oyun sayfası (CinemaGameContainer)
│   │   └── sinema/page.tsx           # /sinema rotası
│   ├── components/cinema/
│   │   ├── CinemaGameContainer.tsx   # Ana oyun mantığı ve durum yönetimi
│   │   ├── CinemaStartMenu.tsx       # Başlangıç menüsü, mod seçimi ve Nasıl Oynanır
│   │   ├── CinemaClueCard.tsx        # 5 aşamalı ipucu zinciri kartı
│   │   ├── CinemaAutocomplete.tsx    # Akıllı arama ve tahmin girdi alanı
│   │   ├── CinemaRevealCard.tsx      # Film sonuç ve künye kartı
│   │   ├── CinemaScoreBoard.tsx      # Üst bilgi, skor, seri ve dil anahtarı
│   │   └── CinemaBackground.tsx      # Sinematik neon arka plan ve parçacıklar
│   ├── data/
│   │   └── kotu-anlatilmis-filmler.json # 100 adet iki dilli film/dizi verisi
│   ├── types/
│   │   └── movie.ts                  # MovieItem, CountryInfo, Language tipleri
│   └── utils/
│       ├── audio.ts                  # Web Audio API ses efektleri
│       └── normalize.ts              # Türkçe karakter folding ve eşleştirme
└── scripts/
    ├── build-100-movies.js           # 100 filmlik veri setini derleme ve doğrulama
    └── add-country-info.js           # Ülke ve yerli/yabancı bilgilerini ekleme
```

---

## 📄 Lisans / License

Bu proje açık kaynaklıdır ve [MIT](LICENSE) lisansı altında sunulmaktadır.
