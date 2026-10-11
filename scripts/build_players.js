const fs = require('fs');
const path = require('path');

const batch1 = require('./players_data_1');
const batch2 = require('./players_data_2');
const batch3 = require('./players_data_3');
const batch4 = require('./players_data_4');

const allPlayers = [...batch1, ...batch2, ...batch3, ...batch4];

console.log(`Total players loaded: ${allPlayers.length}`);

if (allPlayers.length !== 100) {
  throw new Error(`Expected 100 players, got ${allPlayers.length}`);
}

const validPositions = ['Kaleci', 'Defans', 'Orta Saha', 'Forvet'];
const validStatuses = ['aktif', 'emekli'];
const ids = new Set();

allPlayers.forEach((player, idx) => {
  const num = idx + 1;
  if (!player.id) throw new Error(`Player #${num} missing id`);
  if (ids.has(player.id)) throw new Error(`Duplicate id: ${player.id}`);
  ids.add(player.id);

  if (!player.wikidataId) throw new Error(`Player #${num} (${player.name}) missing wikidataId`);
  if (!player.name) throw new Error(`Player #${num} missing name`);
  if (!Array.isArray(player.aliases) || player.aliases.length === 0) {
    throw new Error(`Player #${num} (${player.name}) invalid aliases`);
  }
  if (!player.nationality) throw new Error(`Player #${num} (${player.name}) missing nationality`);
  if (!player.league) throw new Error(`Player #${num} (${player.name}) missing league`);
  if (!player.club) throw new Error(`Player #${num} (${player.name}) missing club`);
  if (!validPositions.includes(player.position)) {
    throw new Error(`Player #${num} (${player.name}) invalid position: ${player.position}`);
  }
  if (typeof player.birthYear !== 'number') {
    throw new Error(`Player #${num} (${player.name}) invalid birthYear`);
  }
  if (typeof player.shirtNumber !== 'number') {
    throw new Error(`Player #${num} (${player.name}) invalid shirtNumber`);
  }
  if (player.difficulty !== 'kolay') {
    throw new Error(`Player #${num} (${player.name}) difficulty must be 'kolay', got: ${player.difficulty}`);
  }
  if (!validStatuses.includes(player.status)) {
    throw new Error(`Player #${num} (${player.name}) invalid status: ${player.status}`);
  }
  if (player.status === 'aktif' && player.retirementYear !== null) {
    throw new Error(`Player #${num} (${player.name}) active player must have null retirementYear`);
  }
  if (player.status === 'emekli' && typeof player.retirementYear !== 'number') {
    throw new Error(`Player #${num} (${player.name}) retired player must have number retirementYear`);
  }
  if (!Array.isArray(player.clues) || player.clues.length !== 5) {
    throw new Error(`Player #${num} (${player.name}) must have exactly 5 clues, got ${player.clues?.length}`);
  }

  // Check name leaks in clues
  const nameParts = player.name.split(' ').filter(p => p.length > 2);
  player.clues.forEach((clue, cIdx) => {
    nameParts.forEach(part => {
      // Exclude generic parts or common words if any
      const regex = new RegExp(`\\b${part}\\b`, 'i');
      if (regex.test(clue)) {
        console.warn(`[Warning] Name part "${part}" might be leaking in player #${num} (${player.name}) clue ${cIdx + 1}: "${clue}"`);
      }
    });
  });
});

const jsonString = JSON.stringify(allPlayers, null, 2);

// Target file paths
const targets = [
  path.join(__dirname, '..', 'src', 'data', 'oyuncular.json'),
  path.join(__dirname, '..', 'public', 'oyuncular.json'),
  path.join(__dirname, '..', 'oyuncular.json')
];

targets.forEach(targetPath => {
  fs.writeFileSync(targetPath, jsonString, 'utf-8');
  console.log(`Saved to ${targetPath}`);
});

console.log('Successfully validated and written 100 players JSON dataset!');
