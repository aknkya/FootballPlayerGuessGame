export type Position = 'Kaleci' | 'Defans' | 'Orta Saha' | 'Forvet';
export type Difficulty = 'kolay' | 'orta' | 'zor';
export type Status = 'aktif' | 'emekli';

export interface Player {
  id: string;
  wikidataId: string;
  name: string;
  aliases: string[];
  nationality: string;
  league: string;
  club: string;
  position: Position;
  birthYear: number;
  shirtNumber: number;
  difficulty: Difficulty;
  status: Status;
  retirementYear: number | null;
  clues: string[];
}

export interface GuessRecord {
  guessedName: string;
  isCorrect: boolean;
  timestamp: number;
}
