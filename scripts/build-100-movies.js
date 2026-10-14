const fs = require('fs');
const path = require('path');

const chunk0 = require('./movies/chunk0.js');
const chunk1 = require('./movies/chunk1.js');
const chunk2 = require('./movies/chunk2.js');
const chunk3 = require('./movies/chunk3.js');
const chunk4 = require('./movies/chunk4.js');

const allMovies = [...chunk0, ...chunk1, ...chunk2, ...chunk3, ...chunk4];

console.log(`Total items collected: ${allMovies.length}`);

// Validation
const ids = new Set();
const errors = [];

allMovies.forEach((m, idx) => {
  if (!m.id) errors.push(`[Item ${idx}] Missing id`);
  if (ids.has(m.id)) errors.push(`[Item ${idx}] Duplicate id: ${m.id}`);
  ids.add(m.id);

  if (!m.title || !m.title.tr || !m.title.en) errors.push(`[${m.id}] Missing title (tr or en)`);
  if (!Array.isArray(m.aliases)) errors.push(`[${m.id}] Missing aliases array`);
  if (!['film', 'dizi'].includes(m.type)) errors.push(`[${m.id}] Invalid type: ${m.type}`);
  if (!m.genre || !m.genre.tr || !m.genre.en) errors.push(`[${m.id}] Missing genre (tr or en)`);
  if (!m.year) errors.push(`[${m.id}] Missing year`);
  if (typeof m.imdbScore !== 'number') errors.push(`[${m.id}] Invalid imdbScore`);
  if (!m.directorOrCreator) errors.push(`[${m.id}] Missing directorOrCreator`);
  if (!Array.isArray(m.cast) || m.cast.length === 0) errors.push(`[${m.id}] Missing cast array`);
  if (!m.emojis) errors.push(`[${m.id}] Missing emojis`);
  if (!m.clues || !Array.isArray(m.clues.tr) || m.clues.tr.length !== 5) {
    errors.push(`[${m.id}] clues.tr must have exactly 5 clues, has: ${m.clues?.tr?.length}`);
  }
  if (!m.clues || !Array.isArray(m.clues.en) || m.clues.en.length !== 5) {
    errors.push(`[${m.id}] clues.en must have exactly 5 clues, has: ${m.clues?.en?.length}`);
  }
});

if (errors.length > 0) {
  console.error('Validation Errors:');
  errors.forEach(e => console.error(' - ' + e));
  process.exit(1);
}

const targetFile = path.join(__dirname, '../src/data/kotu-anlatilmis-filmler.json');
fs.writeFileSync(targetFile, JSON.stringify(allMovies, null, 2), 'utf-8');

const films = allMovies.filter(m => m.type === 'film').length;
const series = allMovies.filter(m => m.type === 'dizi').length;

console.log(`✅ Successfully generated ${allMovies.length} movies/series!`);
console.log(`🎬 Films: ${films}`);
console.log(`📺 Series (Dizi): ${series}`);
console.log(`Target: ${targetFile}`);
