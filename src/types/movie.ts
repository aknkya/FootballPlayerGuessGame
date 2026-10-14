export type MovieType = 'film' | 'dizi';
export type MovieOrigin = 'yerli' | 'yabanci';
export type Language = 'tr' | 'en';

export interface LocalizedString {
  tr: string;
  en: string;
}

export interface CountryInfo {
  name: LocalizedString;
  code: string;
  flag: string;
}

export interface MovieItem {
  id: string;
  title: LocalizedString;
  aliases: string[];
  type: MovieType;
  origin: MovieOrigin;
  country: CountryInfo;
  genre: LocalizedString;
  year: string;
  imdbScore: number;
  directorOrCreator: string;
  cast: string[];
  emojis: string;
  clues: {
    tr: string[];
    en: string[];
  };
}

