'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Sparkles, Scroll, Compass } from 'lucide-react';

interface HistoryClueCardProps {
  clues: string[];
  revealedCount: number;
  onRevealNext: () => void;
  isGameOver: boolean;
}

const historyDifficultyMeta = [
  { level: '1. İpucu (Gizemli Detay)', badge: '🔴 Çok Zor', points: 500, icon: '📜' },
  { level: '2. İpucu (Tarihi Olay)', badge: '🟠 Zor', points: 400, icon: '🔍' },
  { level: '3. İpucu (Dönüm Noktası)', badge: '🟡 Orta', points: 300, icon: '⚖️' },
  { level: '4. İpucu (Büyük Miras)', badge: '🟢 Kolay', points: 200, icon: '💡' },
  { level: '5. İpucu (İkonik An & Söz)', badge: '⭐ En Kolay', points: 100, icon: '👑' },
];

export const HistoryClueCard: React.FC<HistoryClueCardProps> = ({
  clues,
  revealedCount,
  onRevealNext,
  isGameOver,
}) => {
  const visibleClues = clues.slice(0, revealedCount);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-3">
      {/* Üst Bilgi Barı: Kademeler ve İpucu İsteme Butonu */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-2 py-1">
        {/* Sol Taraf: 5 Kademeli Antik Mühür İlerleme Göstergesi */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-black tracking-wider text-amber-400 uppercase flex items-center gap-1">
            <Scroll className="w-3.5 h-3.5" /> İPUCU:
          </span>
          <div className="flex items-center gap-1.5">
            {[0, 1, 2, 3, 4].map((step) => {
              const isRevealed = step < revealedCount;
              return (
                <div
                  key={step}
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black transition-all duration-300 ${
                    isRevealed
                      ? 'bg-gradient-to-br from-amber-400 to-yellow-600 text-stone-950 shadow-md shadow-amber-500/40 ring-2 ring-amber-300/40 scale-105'
                      : 'bg-stone-900/80 text-stone-500 border border-amber-900/30'
                  }`}
                  title={`${step + 1}. İpucu (${historyDifficultyMeta[step].points} Puan)`}
                >
                  {isRevealed ? historyDifficultyMeta[step].icon : step + 1}
                </div>
              );
            })}
          </div>
          <span className="text-xs font-bold text-amber-300/80 ml-1">
            ({revealedCount}/5)
          </span>
        </div>

        {/* Sağ Taraf: Yeni İpucu Açma Butonu */}
        {revealedCount < 5 && !isGameOver && (
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onRevealNext}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-700 hover:from-amber-500 hover:to-yellow-500 text-stone-950 text-xs font-extrabold shadow-lg shadow-amber-900/40 border border-amber-300/40 cursor-pointer transition-all"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Sıradaki İpucunu Aç</span>
            <span className="text-[10px] bg-black/25 text-stone-900 px-1.5 py-0.5 rounded-full font-black">
              -{100} Puan
            </span>
          </motion.button>
        )}
      </div>

      {/* İpuçları Listesi */}
      <div className="space-y-2.5">
        <AnimatePresence>
          {visibleClues.map((clue, index) => {
            const meta = historyDifficultyMeta[index];
            const isLatest = index === revealedCount - 1;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.3 }}
                className={`relative overflow-hidden rounded-2xl border p-3.5 sm:p-4 backdrop-blur-md transition-all ${
                  isLatest
                    ? 'border-amber-400/60 bg-gradient-to-r from-stone-900/90 via-amber-950/40 to-stone-900/90 shadow-xl shadow-amber-950/50'
                    : 'border-amber-900/30 bg-stone-900/75 text-stone-300'
                }`}
              >
                {/* Sol Tarafta Rozet ve Puan */}
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-base">{meta.icon}</span>
                    <span className="text-xs font-black tracking-wide text-amber-300">
                      {meta.level}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-950/70 border border-amber-700/40 text-amber-200">
                      {meta.badge}
                    </span>
                  </div>

                  {isLatest && !isGameOver && (
                    <div className="flex items-center gap-1 text-[11px] font-black text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded-lg border border-amber-500/20">
                      <Sparkles className="w-3 h-3 text-amber-400 animate-spin" />
                      <span>Mevcut Değer: {meta.points} P</span>
                    </div>
                  )}
                </div>

                {/* İpucu Metni */}
                <p className="text-sm sm:text-base font-medium text-stone-100 leading-relaxed pl-1">
                  {clue}
                </p>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};
