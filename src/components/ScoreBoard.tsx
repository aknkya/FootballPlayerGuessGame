'use client';

import React from 'react';
import { Trophy, Flame, Volume2, VolumeX, Award, Home, Shield } from 'lucide-react';
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
  onSelectDifficulty: (d: Difficulty | 'tum') => void;
  onReturnMenu: () => void;
}

const difficultyLabels: Record<Difficulty | 'tum', string> = {
  tum: 'Tümü',
  kolay: 'Kolay',
  orta: 'Orta',
  zor: 'Zor',
};

export const ScoreBoard: React.FC<ScoreBoardProps> = ({
  score,
  streak,
  highStreak,
  currentRound,
  totalRounds,
  soundEnabled,
  onToggleSound,
  selectedDifficulty,
  onReturnMenu,
}) => {
  return (
    <header className="w-full max-w-4xl mx-auto mb-3">
      {/* Üst Bar: Sol taraf minimal logo & mod, Sağ taraf canlı skorlar ve MENÜ butonu */}
      <div className="bg-emerald-950/80 backdrop-blur-md border border-emerald-500/30 rounded-2xl px-3 py-1.5 shadow-lg shadow-black/50 flex items-center justify-between gap-2">
        
        {/* Sol Taraf: Küçük Logo ve Aktif Zorluk Rozeti */}
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shadow-sm text-sm">
            ⚽
          </div>
          <span className="text-[11px] font-extrabold px-2 py-0.5 rounded-lg bg-black/40 text-emerald-300 border border-emerald-500/20 flex items-center gap-1 uppercase tracking-wider">
            <Shield className="w-3 h-3 text-emerald-400" />
            {difficultyLabels[selectedDifficulty]}
          </span>
        </div>

        {/* Sağ Taraf: Skorlar, Ses ve SAĞ ÜSTTEKİ MENÜ BUTONU */}
        <div className="flex items-center gap-2 text-xs">
          {/* Toplam Puan */}
          <div className="flex items-center gap-1 bg-black/40 border border-emerald-500/20 px-2.5 py-1 rounded-xl">
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-black text-amber-300 text-xs sm:text-sm leading-none">{score}</span>
          </div>

          {/* Galibiyet Serisi */}
          <div className="flex items-center gap-1 bg-black/40 border border-emerald-500/20 px-2.5 py-1 rounded-xl">
            <Flame className={`w-3.5 h-3.5 ${streak > 0 ? 'text-orange-500 animate-pulse' : 'text-gray-500'}`} />
            <span className="font-black text-white text-xs sm:text-sm leading-none">
              {streak} <span className="text-[10px] font-normal text-gray-400 hidden sm:inline">(En: {highStreak})</span>
            </span>
          </div>

          {/* Tur */}
          <div className="flex items-center gap-1 bg-black/40 border border-emerald-500/20 px-2.5 py-1 rounded-xl">
            <Award className="w-3.5 h-3.5 text-emerald-400" />
            <span className="font-black text-white text-xs leading-none">
              {currentRound}/{totalRounds}
            </span>
          </div>

          {/* Ses Aç / Kapa */}
          <button
            onClick={onToggleSound}
            aria-label="Ses Butonu"
            className="p-1.5 rounded-xl bg-black/40 border border-emerald-500/20 text-emerald-300 hover:text-white hover:bg-emerald-800/40 transition-all cursor-pointer"
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-emerald-400" /> : <VolumeX className="w-3.5 h-3.5 text-gray-500" />}
          </button>

          {/* SAĞ ÜST MENÜ BUTONU */}
          <button
            onClick={onReturnMenu}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-500 hover:from-emerald-500 hover:to-green-500 text-white border border-emerald-300/40 text-xs font-black shadow-md shadow-emerald-950/60 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            title="Ana Menüye Dön"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Menü</span>
          </button>
        </div>

      </div>
    </header>
  );
};
