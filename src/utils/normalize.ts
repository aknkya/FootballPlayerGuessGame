/**
 * Türkçe karakterleri ve aksanları arama için normalize eder
 */
export function normalizeText(text: string): string {
  if (!text) return '';
  return text
    .toLocaleLowerCase('tr-TR')
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // aksanları temizle (é, á, ć vb.)
    .replace(/[^a-z0-9]/g, '') // boşluk ve özel karakterleri kaldır
    .trim();
}

/**
 * Bir oyuncunun ismi veya takma adları girilen tahminle eşleşiyor mu kontrol eder
 */
export function isPlayerMatch(input: string, playerName: string, aliases: string[] = []): boolean {
  const normInput = normalizeText(input);
  if (!normInput) return false;

  const normName = normalizeText(playerName);
  if (normName === normInput) return true;

  return aliases.some(alias => normalizeText(alias) === normInput);
}

/**
 * Ülke adına göre bayrak emojisi döndürür
 */
export function getCountryFlag(country: string): string {
  const flags: Record<string, string> = {
    'Arjantin': '🇦🇷',
    'Portekiz': '🇵🇹',
    'Fransa': '🇫🇷',
    'İtalya': '🇮🇹',
    'Brezilya': '🇧🇷',
    'Romanya': '🇷🇴',
    'Uruguay': '🇺🇾',
    'Norveç': '🇳🇴',
    'Hırvatistan': '🇭🇷',
    'Hollanda': '🇳🇱',
    'Güney Kore': '🇰🇷',
    'İngiltere': '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    'Fildişi Sahili': '🇨🇮',
    'Nijerya': '🇳🇬',
    'Almanya': '🇩🇪',
    'İspanya': '🇪🇸',
    'Belçika': '🇧🇪',
    'Türkiye': '🇹🇷'
  };
  return flags[country] || '⚽';
}
