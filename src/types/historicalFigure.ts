export type CharacterDifficulty = 'kolay' | 'orta' | 'zor';

export interface HistoricalCharacter {
  id: string;
  name: string;
  aliases: string[];
  category: string;
  era: string;
  nationality: string;
  years: string;
  title: string;
  difficulty: CharacterDifficulty;
  clues: string[];
}
