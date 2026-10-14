const fs = require('fs');
const path = require('path');

// 100 perfectly tuned, highly contextual, unmistakable emoji sequences
const ENHANCED_EMOJIS = {
  // Global Classics & Cult Movies
  "shrek": "🟢 🧅 🫏 🏰 👸 🐉",
  "titanic": "🚢 🧊 🎻 🎨 💎 🌊",
  "yuzuklerin-efendisi": "💍 🌋 🧙‍♂️ 🏹 🧝 👁️",
  "john-wick": "🐶 🚗 ✏️ 🔫 🩸 🏨",
  "inception": "🌀 💤 😴 🏙️ 🚂 🪙",
  "the-matrix": "🕶️ 🔴 💊 🔵 🥋 💻",
  "breaking-bad": "🧪 🚐 🍗 🎩 💵 🛎️",
  "gora": "🛸 👽 🪐 🤖 🥩 🔥",
  "interstellar": "🌽 🚀 🕳️ ⌚ 🌊 🪐",
  "ask-i-memnu": "🏰 💔 💍 🍷 🌿 👰",
  "the-godfather": "🌹 🐴 🔫 🍊 🍝 🇮🇹",
  "pulp-fiction": "🍔 💼 💉 🕺 💃 🔫",
  "fight-club": "🧼 🥊 🩸 👥 🏙️ 💥",
  "forrest-gump": "🍫 🪶 🏃‍♂️ 👟 🦐 🏓",
  "the-dark-knight": "🦇 🃏 🤡 🪙 🏥 💥",
  "the-shawshank-redemption": "🔨 ♟️ 🌧️ 🌊 📖 🏖️",
  "gladiator": "⚔️ 🛡️ 🌾 🐅 👑 🏟️",
  "star-wars-iv": "🌌 🗡️ 🤖 🚀 🪐 🦹",
  "harry-potter": "⚡ 👓 🧙‍♂️ 🦉 🚂 🏰",
  "jurassic-park": "🦖 🦟 🧬 🚙 🏝️ 🥼",
  "back-to-the-future": "⚡ 🚗 🔥 🛹 🎸 🕰️",
  "the-lion-king": "🦁 👑 🌅 🐗 🦝 🪨",
  "home-alone": "🏠 🎄 😱 👦 🕷️ 🍕",
  "terminator-2": "🤖 🏍️ 🕶️ 🦾 🏭 👍",
  "pirates-of-the-caribbean": "🏴‍☠️ 🦜 🪙 ⛵ 🧭 💀",
  "spider-man": "🕷️ 🕸️ 🍕 🌧️ 💋 🎭",
  "avengers-endgame": "🧤 💎 ⏳ 🔨 🛡️ 💥",
  "iron-man": "🤖 🦾 🍔 🕶️ 💥 🚀",
  "the-silence-of-the-lambs": "🦋 🍷 🥩 🪪 🎭 🕳️",
  "se7en": "🌧️ 📖 🍝 📦 🔫 🏜️",
  "the-shining": "🏨 ❄️ 🪓 🚪 🩸 👭",
  "parasite": "🪨 🏠 🌧️ 🪜 🍜 🔪",
  "avatar": "👽 🔵 🏹 🪐 🐉 🌳",
  "joker": "🤡 💄 🕺 🚬 📺 🔫",
  "the-truman-show": "👶 📺 👁️ 🎥 🌊 🚪",
  "good-will-hunting": "🧹 🧮 🧠 🍎 🛋️ 🚗",
  "django-unchained": "⛓️ 🤠 🐎 🔫 🩸 🏰",
  "inglourious-basterds": "🪓 🥛 🍰 📽️ 🔥 🇩🇪",
  "the-wolf-of-wall-street": "📈 💵 💊 🚁 🍾 🦍",
  "cast-away": "✈️ 🏝️ 🏐 🥥 🦷 📦",
  "saving-private-ryan": "🪖 🏖️ 🚢 🩸 📿 🎖️",
  "up": "🎈 🏠 👴 👦 🐕 🗺️",
  "finding-nemo": "🐠 🌊 🤿 🦈 🐢 🦷",
  "toy-story": "🤠 🚀 🧸 👦 📦 🦖",
  "monsters-inc": "🚪 👁️ 💙 👧 🧦 ⚡",
  "coco": "🎸 💀 🏵️ 🐕 👵 🇲🇽",
  "ratatouille": "🐀 👨‍🍳 🍲 🍷 🥖 🗼",
  "wall-e": "🤖 🗑️ 🌱 🤍 🚀 🪐",
  "spirited-away": "🐉 🐷 ♨️ 🎭 🚂 🌊",
  "la-la-land": "🎹 💃 🕺 🌆 🎺 🎬",
  "whiplash": "🥁 🩸 ⏱️ 🤬 🪑 🎺",
  "eternal-sunshine": "🧠 ❄️ 📼 🧡 💙 🏖️",
  "amelie": "🥄 🍮 📸 💌 🚲 🗼",
  "the-grand-budapest-hotel": "🏨 🎀 🍰 🎿 🎨 🚂",
  "leon-the-professional": "🕶️ 🥛 🪴 🔫 👧 💣",
  "scarface": "🇨🇺 👃 💼 🔫 🐅 💥",
  "oppenheimer": "👨‍🔬 ⚛️ 💣 💥 🇺🇸 🍄",
  "barbie": "💖 👠 🛼 🐴 💅 🏖️",
  "dune": "🏜️ 🪱 👁️ 🗡️ 🛸 🪐",
  "mad-max-fury-road": "🔥 🚗 🎸 🏜️ 🥛 💀",
  "shutter-island": "🏝️ 🧠 ⛈️ 🏥 🚬 🌊",
  "the-prestige": "🎩 🕊️ ⚡ 👯 🗝️ 🌊",
  "memento": "📸 🖋️ 🧠 🚗 🩸 ⏱️",
  "kill-bill-vol-1": "🥋 🗡️ 🟡 🩸 👘 🦶",
  "catch-me-if-you-can": "👨‍✈️ ✈️ 💳 🏨 🏃‍♂️ 👮",
  "the-green-mile": "⚡ 🪑 🐭 💡 🪰 😢",
  "12-angry-men": "🏛️ 👨‍⚖️ 🔪 🌧️ ⏳ 🗳️",
  "american-psycho": "👔 🪪 🪓 🩸 🎧 💼",
  "dead-poets-society": "🏫 📚 🪑 📜 🕯️ 👨‍🏫",
  "life-is-beautiful": "🚲 👨‍👦 🚂 🪖 🎖️ 🚜",

  // Top Global Series
  "game-of-thrones": "👑 🗡️ 🐉 ❄️ 🐺 🧟",
  "stranger-things": "🚲 👧 🧇 💡 🩸 👾",
  "friends": "🛋️ ☕ 🦃 🎸 🚪 ☔",
  "the-office": "📄 👔 ☕ 🍮 🌶️ 🏆",
  "sherlock": "🕵️‍♂️ 🧥 🎻 📱 🔍 🇬🇧",
  "peaky-blinders": "🧢 🔪 🚬 🥃 🐎 🇬🇧",
  "squid-game": "🦑 🟢 🔴 👧 🍪 💰",
  "la-casa-de-papel": "🎭 🔴 💶 🖨️ 👓 🏛️",
  "black-mirror": "🪞 📱 👁️ 🤖 🐝 🐷",
  "dark": "🧥 ☢️ 🕰️ 🕳️ 🌧️ 🇩🇪",
  "better-call-saul": "⚖️ 👔 💼 🚗 🏜️ 💵",
  "the-sopranos": "🦆 🛋️ 🥩 🔫 👔 🇮🇹",
  "narcos": "🛩️ 🌿 💵 🔫 🇨🇴 🧔",
  "chernobyl": "☢️ 💥 🥽 ⛏️ 📉 🇺🇦",
  "the-last-of-us": "🍄 🧟 🎒 🦒 🎸 ❄️",
  "succession": "📰 🚁 🛥️ 💼 🍾 👑",

  // Turkish Cult Movies & Series
  "hababam-sinifi": "🏫 🔔 👴 🚬 🏃‍♂️ 🕳️",
  "tosun-pasa": "🏜️ 👳‍♂️ 📜 🛁 🍉 ⚔️",
  "sut-kardesler": "👻 🥛 🏰 🌙 🕯️ 👮",
  "copculer-krali": "🧹 🗑️ 🪟 🌸 🎤 👮",
  "saban-oglu-saban": "💎 🕵️‍♂️ 🍗 🕯️ 🔪 🎶",
  "kibar-feyzo": "🌾 💰 🚽 ✍️ ⚖️ 🏙️",
  "ezel": "🎲 🎰 🗡️ 🩸 🧔 📿",
  "kurtlar-vadisi": "🐺 🗡️ 🕶️ 🔫 👔 🇹🇷",
  "leyla-ile-mecnun": "🚢 👋 🍵 🐎 👴 🌊",
  "avrupa-yakasi": "🏢 🧣 ☕ 💅 🛋️ 🎭",
  "behzat-c": "🚔 🚗 🍺 🚬 📻 🔫",
  "kardes-payi": "🔧 💧 🚗 🚀 👨‍🔧 ⛽",
  "vizontele": "📺 📡 🚲 🏔️ 📻 📽️",
  "babam-ve-oglum": "🌾 🚜 📸 👨‍👦 🪖 😢"
};

// 1. Update kotu-anlatilmis-filmler.json
const jsonPath = path.join(__dirname, '../src/data/kotu-anlatilmis-filmler.json');
const movies = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

let updatedCount = 0;
movies.forEach(m => {
  if (ENHANCED_EMOJIS[m.id]) {
    m.emojis = ENHANCED_EMOJIS[m.id];
    m.clues.tr[0] = ENHANCED_EMOJIS[m.id];
    m.clues.en[0] = ENHANCED_EMOJIS[m.id];
    updatedCount++;
  } else {
    console.warn(`Missing enhanced emojis for: ${m.id}`);
  }
});

fs.writeFileSync(jsonPath, JSON.stringify(movies, null, 2), 'utf8');
console.log(`Updated ${updatedCount} movies with hyper-contextual emojis in kotu-anlatilmis-filmler.json`);

// 2. Also update chunk files
const chunkFiles = ['chunk0.js', 'chunk1.js', 'chunk2.js', 'chunk3.js', 'chunk4.js'];
chunkFiles.forEach(cf => {
  const cPath = path.join(__dirname, 'movies', cf);
  if (!fs.existsSync(cPath)) return;
  const chunk = require(cPath);
  chunk.forEach(m => {
    if (ENHANCED_EMOJIS[m.id]) {
      m.emojis = ENHANCED_EMOJIS[m.id];
      if (m.clues && m.clues.tr) m.clues.tr[0] = ENHANCED_EMOJIS[m.id];
      if (m.clues && m.clues.en) m.clues.en[0] = ENHANCED_EMOJIS[m.id];
    }
  });
  const content = `// ${cf}\nmodule.exports = ${JSON.stringify(chunk, null, 2)};\n`;
  fs.writeFileSync(cPath, content, 'utf8');
  console.log(`Updated emojis in ${cf}`);
});
