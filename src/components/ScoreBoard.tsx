'use client';

import React from 'react';
import { Trophy, Flame, Volume2, VolumeX, Award, Home } from 'lucide-react';
import { Difficulty } from '@/types/player';

interface ScoreBoardProps {
  score: number;
  streak: number;
  highStreak: number;
  currentRound: number;
  totalRounds: number;
  soundEnabled: boolean;
  onToggleSound: () => void;
  selectedDifficulty: Difficulty | 'tum';
  onSelectDifficulty?: (d: Difficulty | 'tum') => void;
  onReturnMenu: () => void;
}

export const ScoreBoard: React.FC<ScoreBoardProps> = ({
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
    <header className="w-full max-w-4xl mx-auto flex items-center justify-end mb-2.5">
      {/* SAĞ ÜST PANEL: Skor, Seri, Tur, Ses ve Menü */}
      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 bg-emerald-950/85 backdrop-blur-md border border-emerald-500/30 rounded-2xl p-1.5 sm:px-3 sm:py-1.5 shadow-xl shadow-black/60">
        
        {/* Toplam Puan */}
        <div className="flex items-center gap-1 bg-black/50 border border-emerald-500/20 px-2.5 py-1 rounded-xl" title="Toplam Puan">
          <Trophy className="w-3.5 h-3.5 text-amber-400" />
          <span className="font-black text-amber-300 text-xs sm:text-sm leading-none">{score}</span>
        </div>

        {/* Galibiyet Serisi */}
        <div className="flex items-center gap-1 bg-black/50 border border-emerald-500/20 px-2.5 py-1 rounded-xl" title={`Seri: ${streak} (En İyi: ${highStreak})`}>
          <Flame className={`w-3.5 h-3.5 ${streak > 0 ? 'text-orange-500 animate-pulse' : 'text-gray-500'}`} />
          <span className="font-black text-white text-xs sm:text-sm leading-none">
            {streak}
          </span>
        </div>

        {/* Tur Sayısı */}
        <div className="flex items-center gap-1 bg-black/50 border border-emerald-500/20 px-2 py-1 rounded-xl" title="Mevcut Tur">
          <Award className="w-3.5 h-3.5 text-emerald-400" />
          <span className="font-black text-white text-xs leading-none">
            {currentRound}/{totalRounds}
          </span>
        </div>

        {/* Ses Butonu */}
        <button
          onClick={onToggleSound}
          aria-label="Ses Butonu"
          className="p-1.5 rounded-xl bg-black/50 border border-emerald-500/20 text-emerald-300 hover:text-white hover:bg-emerald-800/40 transition-all cursor-pointer"
          title={soundEnabled ? 'Sesi Kapat' : 'Sesi Aç'}
        >
          {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-emerald-400" /> : <VolumeX className="w-3.5 h-3.5 text-gray-500" />}
        </button>

        {/* Menü Butonu */}
        <button
          onClick={onReturnMenu}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-500 hover:from-emerald-500 hover:to-green-500 text-white border border-emerald-300/40 text-xs font-black shadow-md shadow-emerald-950/60 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          title="Ana Menüye Dön"
        >
          <Home className="w-3.5 h-3.5" />
          <span>Menü</span>
        </button>

      </div>
    </header>
  );
};
