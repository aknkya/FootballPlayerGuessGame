const fs = require('fs');
const path = require('path');

// 1. Update src/data/kotu-anlatilmis-filmler.json
const jsonPath = path.join(__dirname, '../src/data/kotu-anlatilmis-filmler.json');
const movies = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

movies.forEach(m => {
  m.clues.tr[0] = m.emojis;
  m.clues.en[0] = m.emojis;
});

fs.writeFileSync(jsonPath, JSON.stringify(movies, null, 2), 'utf8');
console.log(`Updated kotu-anlatilmis-filmler.json - all 100 movies have pure emojis in clue 0.`);

// 2. Also clean the chunk files in scripts/movies
const chunkFiles = ['chunk0.js', 'chunk1.js', 'chunk2.js', 'chunk3.js', 'chunk4.js'];

chunkFiles.forEach(cf => {
  const cPath = path.join(__dirname, 'movies', cf);
  if (!fs.existsSync(cPath)) return;
  const chunk = require(cPath);
  chunk.forEach(m => {
    if (m.clues && m.clues.tr && m.clues.tr[0]) {
      m.clues.tr[0] = m.emojis;
    }
    if (m.clues && m.clues.en && m.clues.en[0]) {
      m.clues.en[0] = m.emojis;
    }
  });
  const content = `// ${cf}\nmodule.exports = ${JSON.stringify(chunk, null, 2)};\n`;
  fs.writeFileSync(cPath, content, 'utf8');
  console.log(`Cleaned ${cf}`);
});
