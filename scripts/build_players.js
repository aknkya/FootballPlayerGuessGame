const fs = require('fs');
const path = require('path');

const batch1 = require('./players_data_1');
const batch2 = require('./players_data_2');
const batch3 = require('./players_data_3');
const batch4 = require('./players_data_4');
const batch5 = require('./players_data_5');
const batch6 = require('./players_data_6');
const batch7 = require('./players_data_7');
const batch8 = require('./players_data_8');

const allPlayers = [
  ...batch1,
  ...batch2,
  ...batch3,
  ...batch4,
  ...batch5,
  ...batch6,
  ...batch7,
  ...batch8,
];

console.log(`Toplam yuklenen futbolcu sayisi: ${allPlayers.length}`);

if (allPlayers.length !== 200) {
  throw new Error(`Beklenen 200 futbolcu, yuklenen: ${allPlayers.length}`);
}

const validPositions = ['Kaleci', 'Defans', 'Orta Saha', 'Forvet'];
const validStatuses = ['aktif', 'emekli'];
const validDifficulties = ['kolay', 'orta', 'zor'];
const ids = new Set();
const wikidataIds = new Set();

const diffCounts = { kolay: 0, orta: 0, zor: 0 };
const posCounts = {};
const natCounts = {};

allPlayers.forEach((player, idx) => {
  const num = idx + 1;
  if (!player.id) throw new Error(`Oyuncu #${num} 'id' eksik`);
  if (ids.has(player.id)) throw new Error(`Cakisan id: ${player.id}`);
  ids.add(player.id);

  if (!player.wikidataId) throw new Error(`Oyuncu #${num} (${player.name}) 'wikidataId' eksik`);
  if (wikidataIds.has(player.wikidataId)) {
    console.warn(`[Uyari] Oyuncu #${num} (${player.name}) tekrarlanan wikidataId: ${player.wikidataId}`);
  }
  wikidataIds.add(player.wikidataId);

  if (!player.name) throw new Error(`Oyuncu #${num} 'name' eksik`);
  if (!Array.isArray(player.aliases) || player.aliases.length === 0) {
    throw new Error(`Oyuncu #${num} (${player.name}) 'aliases' gecersiz`);
  }
  if (!player.nationality) throw new Error(`Oyuncu #${num} (${player.name}) 'nationality' eksik`);
  if (!player.league) throw new Error(`Oyuncu #${num} (${player.name}) 'league' eksik`);
  if (!player.club) throw new Error(`Oyuncu #${num} (${player.name}) 'club' eksik`);

  if (!validPositions.includes(player.position)) {
    throw new Error(`Oyuncu #${num} (${player.name}) gecersiz mevkii: ${player.position}`);
  }
  posCounts[player.position] = (posCounts[player.position] || 0) + 1;
  natCounts[player.nationality] = (natCounts[player.nationality] || 0) + 1;

  if (typeof player.birthYear !== 'number') {
    throw new Error(`Oyuncu #${num} (${player.name}) gecersiz dogum yili: ${player.birthYear}`);
  }
  if (typeof player.shirtNumber !== 'number') {
    throw new Error(`Oyuncu #${num} (${player.name}) gecersiz forma numarasi: ${player.shirtNumber}`);
  }
  if (!validDifficulties.includes(player.difficulty)) {
    throw new Error(`Oyuncu #${num} (${player.name}) gecersiz zorluk: ${player.difficulty}`);
  }
  diffCounts[player.difficulty] = (diffCounts[player.difficulty] || 0) + 1;

  if (!validStatuses.includes(player.status)) {
    throw new Error(`Oyuncu #${num} (${player.name}) gecersiz durum: ${player.status}`);
  }
  if (player.status === 'aktif' && player.retirementYear !== null) {
    throw new Error(`Oyuncu #${num} (${player.name}) aktif oyuncunun emeklilik yili null olmali`);
  }
  if (player.status === 'emekli' && typeof player.retirementYear !== 'number') {
    throw new Error(`Oyuncu #${num} (${player.name}) emekli oyuncunun emeklilik yili sayi olmali`);
  }
  if (!Array.isArray(player.clues) || player.clues.length !== 5) {
    throw new Error(`Oyuncu #${num} (${player.name}) tam olarak 5 ipucuna sahip olmali, olan: ${player.clues?.length}`);
  }

  // Clue validation
  player.clues.forEach((clue, cIdx) => {
    if (typeof clue !== 'string' || clue.trim().length === 0) {
      throw new Error(`Oyuncu #${num} (${player.name}) ipucu #${cIdx + 1} bos olamaz`);
    }
  });
});

console.log('\n--- ISTATISTIKLER ---');
console.log('Zorluk Dagilimi:', diffCounts);
console.log('Mevki Dagilimi:', posCounts);
console.log(`Farkli Ulke Sayisi: ${Object.keys(natCounts).length}`);

const jsonString = JSON.stringify(allPlayers, null, 2);

// Target file paths
const targets = [
  path.join(__dirname, '..', 'src', 'data', 'oyuncular.json'),
  path.join(__dirname, '..', 'public', 'oyuncular.json'),
  path.join(__dirname, '..', 'oyuncular.json')
];

targets.forEach(targetPath => {
  fs.writeFileSync(targetPath, jsonString, 'utf-8');
  console.log(`Kaydedildi: ${targetPath}`);
});

console.log('\n200 futbolculuk veri seti basariyla dogrulandi ve olusturuldu!');
