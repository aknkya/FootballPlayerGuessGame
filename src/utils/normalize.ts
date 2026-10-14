/**
 * Metinleri arama ve eşleştirme için Türkçe/İngilizce karakter duyarsız olarak normalize eder
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
 * Girilen tahminin film adı (Türkçe/İngilizce) veya alternatif isimlerle eşleşip eşleşmediğini kontrol eder
 */
export function isMovieMatch(
  input: string,
  targetTitles: string | string[],
  aliases: string[] = []
): boolean {
  const normInput = normalizeText(input);
  if (!normInput) return false;

  const titleList = Array.isArray(targetTitles) ? targetTitles : [targetTitles];

  for (const t of titleList) {
    if (normalizeText(t) === normInput) return true;
  }

  return aliases.some((alias) => normalizeText(alias) === normInput);
}

// Geriye dönük uyumluluk
export const isPlayerMatch = isMovieMatch;
