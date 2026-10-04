'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Sparkles } from 'lucide-react';

interface ClueCardProps {
  clues: string[];
  revealedCount: number;
  onRevealNext: () => void;
  isGameOver: boolean;
}

const clueDifficultyMeta = [
  { level: '1. İpucu (En Zor)', badge: '🔴 Çok Zor', points: 500 },
  { level: '2. İpucu', badge: '🟠 Zor', points: 400 },
  { level: '3. İpucu', badge: '🟡 Orta', points: 300 },
  { level: '4. İpucu', badge: '🟢 Kolay', points: 200 },
  { level: '5. İpucu (İkonik An)', badge: '⭐ En Kolay', points: 100 },
];

export const ClueCard: React.FC<ClueCardProps> = ({
  clues,
  revealedCount,
  onRevealNext,
  isGameOver,
}) => {
  // Sadece şu ana kadar açılmış ipuçlarını alıyoruz
  const visibleClues = clues.slice(0, revealedCount);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-3">
      {/* Üst Bilgi Barı: İlerleme Göstergesi ve İpucu İsteme Butonu */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-2 py-1">
        {/* Sol Taraf: 5 Kademeli Futbol Topu İlerleme Göstergesi */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-black tracking-wider text-emerald-400 uppercase mr-1">
            İPUCU:
          </span>
          <div className="flex items-center gap-1.5">
            {[0, 1, 2, 3, 4].map((step) => {
              const isRevealed = step < revealedCount;
              return (
                <div
                  key={step}
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black transition-all duration-300 ${
                    isRevealed
                      ? 'bg-gradient-to-br from-emerald-400 to-green-600 text-white shadow-md shadow-emerald-500/40 ring-2 ring-emerald-300/40 scale-105'
                      : 'bg-black/50 text-gray-500 border border-white/10'
                  }`}
                  title={`${step + 1}. İpucu (${clueDifficultyMeta[step].points} Puan)`}
                >
                  {isRevealed ? '⚽' : step + 1}
                </div>
              );
            })}
          </div>
          <span className="text-xs font-bold text-emerald-300/80 ml-1">
            ({revealedCount}/5)
          </span>
        </div>

        {/* Sağ Taraf: Yeni İpucu İste Butonu */}
        <div className="flex items-center gap-3">
          <div className="text-xs text-emerald-300/80 font-medium hidden sm:inline-block">
            Şu anki değer: <strong className="text-amber-400 font-extrabold">{clueDifficultyMeta[revealedCount - 1]?.points || 100} Puan</strong>
          </div>

          {revealedCount < 5 && !isGameOver && (
            <button
              onClick={onRevealNext}
              className="px-3.5 py-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/40 text-emerald-300 hover:text-white text-xs font-black flex items-center gap-1.5 transition-all shadow-sm shadow-emerald-950/40 hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5 text-emerald-400" />
              <span>Yeni İpucu İste</span>
              <span className="text-[10px] text-amber-400 bg-black/40 px-1.5 py-0.5 rounded font-extrabold">
                {clueDifficultyMeta[revealedCount]?.points} Puan
              </span>
            </button>
          )}
        </div>
      </div>

      {/* Sadece Açılmış Olan İpucu Kartları */}
      <div className="space-y-3">
        <AnimatePresence initial={false}>
          {visibleClues.map((clue, index) => {
            const meta = clueDifficultyMeta[index];
            const isLatest = index === revealedCount - 1;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: -16, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ type: 'spring', damping: 20, stiffness: 280 }}
                className={`relative overflow-hidden rounded-2xl border transition-all duration-300 backdrop-blur-md ${
                  isLatest
                    ? 'bg-gradient-to-r from-emerald-950/95 via-slate-900/95 to-emerald-950/90 border-emerald-400/60 shadow-xl shadow-emerald-950/70 ring-1 ring-emerald-400/30'
                    : 'bg-gradient-to-r from-slate-950/80 via-emerald-950/80 to-slate-950/80 border-emerald-500/20 shadow-md shadow-black/50 opacity-90'
                }`}
              >
                {/* Sol kenar neon vurgusu */}
                <div
                  className={`absolute left-0 top-0 bottom-0 w-1.5 ${
                    isLatest
                      ? 'bg-gradient-to-b from-emerald-300 via-green-400 to-emerald-500 shadow-[0_0_12px_#34d399]'
                      : 'bg-emerald-600/50'
                  }`}
                />

                <div className="p-4 pl-5">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black uppercase tracking-wider text-emerald-400">
                        {meta.level}
                      </span>
                      <span className="text-[11px] px-2.5 py-0.5 rounded-full font-bold bg-black/40 text-emerald-300 border border-emerald-500/20">
                        {meta.badge}
                      </span>
                      {isLatest && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-400/20 text-emerald-200 font-extrabold uppercase tracking-widest animate-pulse border border-emerald-400/30">
                          Aktif İpucu
                        </span>
                      )}
                    </div>

                    <span className="text-xs font-black text-amber-300 flex items-center gap-1 bg-black/40 px-2.5 py-0.5 rounded-lg border border-amber-500/20">
                      <Sparkles className="w-3 h-3 text-amber-400" />
                      +{meta.points} Puan
                    </span>
                  </div>

                  <p className="text-white text-sm md:text-base font-semibold leading-relaxed">
                    {clue}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};
