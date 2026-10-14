import { Metadata } from 'next';
import { CinemaGameContainer } from '@/components/cinema/CinemaGameContainer';

export const metadata: Metadata = {
  title: 'Kötü Anlatılmış Filmler | Sinema & Dizi Tahmin Oyunu',
  description: 'Efsane film ve dizileri en absürt ve komik şekilde özetlenen ipuçlarından tahmin et!',
};

export default function SinemaPage() {
  return <CinemaGameContainer />;
}
