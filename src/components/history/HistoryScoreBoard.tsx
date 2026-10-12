'use client';

import React from 'react';
import Link from 'next/link';
import { Trophy, Flame, Volume2, VolumeX, Award, Home, Compass } from 'lucide-react';

interface HistoryScoreBoardProps {
  score: number;
  streak: number;
  highStreak: number;
  currentRound: number;
  totalRounds: number;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onReturnMenu: () => void;
}

export const HistoryScoreBoard: React.FC<HistoryScoreBoardProps> = ({
  score,
  streak,
  highStreak,
  currentRound,
  totalRounds,
  soundEnabled,
  onToggleSound,
  onReturnMenu,
}) => {
  return (
    <header className="w-full max-w-4xl mx-auto flex items-center justify-between mb-2.5 px-2">
      {/* SOL: Futbol Moduna Geçiş Linki */}
      <Link
        href="/"
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-900/80 hover:bg-stone-800 border border-amber-900/40 text-amber-300 hover:text-white text-xs font-bold transition-all shadow-md"
        title="Futbolcu Tahmin Oyununa Geç"
      >
        <span>⚽ Futbol Modu</span>
      </Link>

      {/* SAĞ ÜST PANEL: Skor, Seri, Tur, Ses ve Menü */}
      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 bg-stone-900/90 backdrop-blur-md border border-amber-500/30 rounded-2xl p-1.5 sm:px-3 sm:py-1.5 shadow-xl shadow-black/70">
        
        {/* Toplam Puan */}
        <div className="flex items-center gap-1 bg-black/60 border border-amber-500/20 px-2.5 py-1 rounded-xl" title="Toplam Puan">
          <Trophy className="w-3.5 h-3.5 text-amber-400" />
          <span className="font-black text-amber-300 text-xs sm:text-sm leading-none">{score}</span>
        </div>

        {/* Galibiyet Serisi */}
        <div className="flex items-center gap-1 bg-black/60 border border-amber-500/20 px-2.5 py-1 rounded-xl" title={`Seri: ${streak} (En İyi: ${highStreak})`}>
          <Flame className={`w-3.5 h-3.5 ${streak > 0 ? 'text-amber-500 animate-pulse' : 'text-stone-500'}`} />
          <span className="font-black text-stone-100 text-xs sm:text-sm leading-none">
            {streak}
          </span>
        </div>

        {/* Tur Sayısı */}
        <div className="flex items-center gap-1 bg-black/60 border border-amber-500/20 px-2 py-1 rounded-xl" title="Mevcut Tur">
          <Award className="w-3.5 h-3.5 text-amber-400" />
          <span className="font-black text-stone-200 text-xs leading-none">
            {currentRound}/{totalRounds}
          </span>
        </div>

        {/* Ses Butonu */}
        <button
          onClick={onToggleSound}
          aria-label="Ses Butonu"
          className="p-1.5 rounded-xl bg-black/60 border border-amber-500/20 text-amber-400 hover:text-amber-200 hover:bg-stone-800 transition-all cursor-pointer"
          title={soundEnabled ? 'Sesi Kapat' : 'Sesi Aç'}
        >
          {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-amber-400" /> : <VolumeX className="w-3.5 h-3.5 text-stone-500" />}
        </button>

        {/* Menü Butonu */}
        <button
          onClick={onReturnMenu}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 text-stone-950 border border-amber-300/40 text-xs font-black shadow-md shadow-amber-950/60 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          title="Ana Menüye Dön"
        >
          <Home className="w-3.5 h-3.5" />
          <span>Menü</span>
        </button>

      </div>
    </header>
  );
};
