const fs = require('fs');
const path = require('path');

const jsonPath = path.join(__dirname, '../src/data/kotu-anlatilmis-filmler.json');
const movies = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

const COUNTRIES = {
  TR: { name: { tr: "Türkiye", en: "Turkey" }, code: "TR", flag: "🇹🇷" },
  US: { name: { tr: "Amerika Birleşik Devletleri", en: "United States" }, code: "US", flag: "🇺🇸" },
  GB: { name: { tr: "Birleşik Krallık", en: "United Kingdom" }, code: "GB", flag: "🇬🇧" },
  KR: { name: { tr: "Güney Kore", en: "South Korea" }, code: "KR", flag: "🇰🇷" },
  ES: { name: { tr: "İspanya", en: "Spain" }, code: "ES", flag: "🇪🇸" },
  DE: { name: { tr: "Almanya", en: "Germany" }, code: "DE", flag: "🇩🇪" },
  FR: { name: { tr: "Fransa", en: "France" }, code: "FR", flag: "🇫🇷" },
  IT: { name: { tr: "İtalya", en: "Italy" }, code: "IT", flag: "🇮🇹" },
  JP: { name: { tr: "Japonya", en: "Japan" }, code: "JP", flag: "🇯🇵" },
  NZ: { name: { tr: "Yeni Zelanda", en: "New Zealand" }, code: "NZ", flag: "🇳🇿" },
  AU: { name: { tr: "Avustralya", en: "Australia" }, code: "AU", flag: "🇦🇺" },
};

const SPECIFIC_COUNTRIES = {
  // Turkish (Yerli)
  "gora": "TR",
  "ask-i-memnu": "TR",
  "hababam-sinifi": "TR",
  "tosun-pasa": "TR",
  "sut-kardesler": "TR",
  "copculer-krali": "TR",
  "saban-oglu-saban": "TR",
  "kibar-feyzo": "TR",
  "ezel": "TR",
  "kurtlar-vadisi": "TR",
  "leyla-ile-mecnun": "TR",
  "avrupa-yakasi": "TR",
  "behzat-c": "TR",
  "kardes-payi": "TR",
  "vizontele": "TR",
  "babam-ve-oglum": "TR",

  // United Kingdom
  "harry-potter": "GB",
  "sherlock": "GB",
  "peaky-blinders": "GB",
  "black-mirror": "GB",

  // South Korea
  "parasite": "KR",
  "squid-game": "KR",

  // Spain
  "la-casa-de-papel": "ES",

  // Germany
  "dark": "DE",

  // France
  "amelie": "FR",
  "leon-the-professional": "FR",

  // Italy
  "life-is-beautiful": "IT",

  // Japan
  "spirited-away": "JP",

  // New Zealand / UK / US
  "yuzuklerin-efendisi": "NZ",

  // Australia
  "mad-max-fury-road": "AU",
};

const updatedMovies = movies.map((m) => {
  const code = SPECIFIC_COUNTRIES[m.id] || "US";
  const country = COUNTRIES[code];
  const origin = code === "TR" ? "yerli" : "yabanci";

  return {
    id: m.id,
    title: m.title,
    aliases: m.aliases,
    type: m.type,
    origin,
    country,
    genre: m.genre,
    year: m.year,
    imdbScore: m.imdbScore,
    directorOrCreator: m.directorOrCreator,
    cast: m.cast,
    emojis: m.emojis,
    clues: m.clues,
  };
});

fs.writeFileSync(jsonPath, JSON.stringify(updatedMovies, null, 2), 'utf8');

const yerliCount = updatedMovies.filter(m => m.origin === 'yerli').length;
const yabanciCount = updatedMovies.filter(m => m.origin === 'yabanci').length;

console.log(`Updated kotu-anlatilmis-filmler.json successfully!`);
console.log(`Total: ${updatedMovies.length}`);
console.log(`Yerli Yapımlar: ${yerliCount}`);
console.log(`Yabancı Yapımlar: ${yabanciCount}`);
