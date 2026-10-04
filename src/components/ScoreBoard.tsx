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
  onSelectDifficulty: (d: Difficulty | 'tum') => void;
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
  selectedDifficulty,
  onSelectDifficulty,
  onReturnMenu,
}) => {
  return (
    <header className="w-full max-w-4xl mx-auto mb-4">
      {/* İnce ve Kompakt TV Maç Yayını Stili Skor Barı */}
      <div className="bg-emerald-950/80 backdrop-blur-md border border-emerald-500/30 rounded-2xl px-3 py-2 shadow-lg shadow-black/50 flex flex-wrap items-center justify-between gap-2.5">
        
        {/* Sol Taraf: Menü Butonu & Zorluk Seçimi */}
        <div className="flex items-center gap-2">
          {/* Menüye Dönüş Butonu */}
          <button
            onClick={onReturnMenu}
            className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-black/50 hover:bg-emerald-800/40 border border-emerald-500/30 text-emerald-300 hover:text-white text-xs font-bold transition-all cursor-pointer"
            title="Ana Menüye Dön"
          >
            <Home className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">Menü</span>
          </button>

          {/* Zorluk Hapları */}
          <div className="flex items-center gap-1 bg-black/40 p-1 rounded-xl border border-white/5 text-[11px]">
            {(['tum', 'kolay', 'orta', 'zor'] as const).map((diff) => (
              <button
                key={diff}
                onClick={() => onSelectDifficulty(diff)}
                className={`px-2.5 py-0.5 rounded-lg font-bold capitalize transition-all cursor-pointer ${
                  selectedDifficulty === diff
                    ? 'bg-emerald-500 text-white shadow-sm'
                    : 'text-emerald-300/70 hover:text-white hover:bg-emerald-900/30'
                }`}
              >
                {diff === 'tum' ? 'Tümü' : diff}
              </button>
            ))}
          </div>
        </div>

        {/* Sağ Taraf: Canlı Skorlar & Ses */}
        <div className="flex items-center gap-2 text-xs">
          {/* Toplam Puan */}
          <div className="flex items-center gap-1.5 bg-black/40 border border-emerald-500/20 px-3 py-1 rounded-xl">
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-[10px] text-emerald-400 font-bold hidden sm:inline">PUAN:</span>
            <span className="font-black text-amber-300 text-sm leading-none">{score}</span>
          </div>

          {/* Galibiyet Serisi */}
          <div className="flex items-center gap-1.5 bg-black/40 border border-emerald-500/20 px-3 py-1 rounded-xl">
            <Flame className={`w-3.5 h-3.5 ${streak > 0 ? 'text-orange-500 animate-pulse' : 'text-gray-500'}`} />
            <span className="text-[10px] text-emerald-400 font-bold hidden sm:inline">SERİ:</span>
            <span className="font-black text-white text-sm leading-none">
              {streak} <span className="text-[10px] font-normal text-gray-400">(En: {highStreak})</span>
            </span>
          </div>

          {/* Tur */}
          <div className="flex items-center gap-1.5 bg-black/40 border border-emerald-500/20 px-3 py-1 rounded-xl">
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
            {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-gray-500" />}
          </button>
        </div>

      </div>
    </header>
  );
};
