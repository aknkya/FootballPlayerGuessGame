import { Metadata } from 'next';
import { HistoryGameContainer } from '@/components/history/HistoryGameContainer';

export const metadata: Metadata = {
  title: 'Kim Bu Şahsiyet? | Tarihi Karakter Tahmin Oyunu',
  description: 'Tarihe yön veren liderleri, bilim insanlarını, filozofları ve kaşifleri ipuçlarıyla tahmin et!',
};

export default function TarihPage() {
  return <HistoryGameContainer />;
}
