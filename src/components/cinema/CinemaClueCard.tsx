'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Sparkles, Clapperboard } from 'lucide-react';
import { Language } from '@/types/movie';
import { CinemaEmojiRow } from './CinemaEmojiRow';

interface CinemaClueCardProps {
  clues: string[];
  revealedCount: number;
  onRevealNext: () => void;
  isGameOver: boolean;
  language: Language;
}

export const getCinemaDifficultyMeta = (lang: Language) => [
  {
    level: lang === 'tr' ? 'Emoji Şifresi' : 'Emoji Riddle',
    badge: '🧩',
    points: 500,
    color: 'from-cyan-500/20 to-blue-500/10',
    borderColor: 'border-cyan-500/40',
    glow: 'shadow-cyan-500/20',
  },
  {
    level: lang === 'tr' ? 'Efsane Replik' : 'Iconic Quote',
    badge: '💬',
    points: 400,
    color: 'from-green-500/20 to-emerald-500/10',
    borderColor: 'border-green-500/40',
    glow: 'shadow-green-500/20',
  },
  {
    level: lang === 'tr' ? 'Kötü Anlatılmış Konu' : 'Badly Explained Plot',
    badge: '🤪',
    points: 300,
    color: 'from-fuchsia-500/20 to-purple-500/10',
    borderColor: 'border-fuchsia-500/40',
    glow: 'shadow-fuchsia-500/20',
  },
  {
    level: lang === 'tr' ? 'İronik Detay & Uyarı' : 'Ironic Detail & Warning',
    badge: '⚠️',
    points: 200,
    color: 'from-amber-500/20 to-orange-500/10',
    borderColor: 'border-amber-500/40',
    glow: 'shadow-amber-500/20',
  },
  {
    level: lang === 'tr' ? 'Başroller & Künye' : 'Cast & Cinema Trivia',
    badge: '🎬',
    points: 100,
    color: 'from-rose-500/20 to-red-500/10',
    borderColor: 'border-rose-500/40',
    glow: 'shadow-rose-500/20',
  },
];

export const CinemaClueCard: React.FC<CinemaClueCardProps> = ({
  clues,
  revealedCount,
  onRevealNext,
  isGameOver,
  language,
}) => {
  const visibleClues = clues.slice(0, revealedCount);
  const difficultyMeta = getCinemaDifficultyMeta(language);

  return (
    <div className="w-full max-w-3xl mx-auto space-y-3">
      {/* Üst Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-wrap items-center justify-between gap-3 px-1"
      >
        {/* İlerleme Göstergesi */}
        <div className="flex items-center gap-2">
          <Clapperboard className="w-4 h-4 text-fuchsia-500/60" />
          <div className="flex items-center gap-1">
            {[0, 1, 2, 3, 4].map((step) => {
              const isRevealed = step < revealedCount;
              const meta = difficultyMeta[step];
              return (
                <motion.div
                  key={step}
                  initial={false}
                  animate={{
                    scale: isRevealed ? 1 : 0.85,
                    opacity: isRevealed ? 1 : 0.35,
                  }}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-black transition-all ${
                    isRevealed
                      ? `bg-gradient-to-br ${meta.color} ${meta.borderColor} border shadow-lg ${meta.glow}`
                      : 'bg-white/[0.03] border border-white/[0.06] text-stone-600'
                  }`}
                  title={`${step + 1}. ${meta.level} (${meta.points}P)`}
                >
                  {isRevealed ? meta.badge : step + 1}
                </motion.div>
              );
            })}
          </div>
          <span className="text-[11px] font-bold text-stone-500 ml-1">{revealedCount}/5</span>
        </div>

        {/* İpucu Aç Butonu */}
        {revealedCount < 5 && !isGameOver && (
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={onRevealNext}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-fuchsia-600/80 to-pink-600/80 hover:from-fuchsia-500 hover:to-pink-500 text-white text-xs font-bold shadow-lg shadow-fuchsia-950/40 border border-fuchsia-400/30 cursor-pointer transition-all group"
          >
            <Eye className="w-3.5 h-3.5 group-hover:animate-pulse" />
            <span>{language === 'tr' ? 'Sonraki İpucu' : 'Next Clue'}</span>
            <span className="text-[10px] bg-white/15 px-1.5 py-0.5 rounded-full font-black text-rose-300">
              -100P
            </span>
          </motion.button>
        )}
      </motion.div>

      {/* İpucu Kartları */}
      <div className="space-y-2.5">
        <AnimatePresence mode="popLayout">
          {visibleClues.map((clue, index) => {
            const meta = difficultyMeta[index];
            const isLatest = index === revealedCount - 1;
            const isEmoji = index === 0;
            const isQuote = index === 1;

            return (
              <motion.div
                key={index}
                layout
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ type: 'spring', damping: 22, stiffness: 300 }}
                className={`relative overflow-hidden rounded-2xl border p-4 sm:p-5 backdrop-blur-sm transition-all ${
                  isLatest
                    ? `bg-gradient-to-r ${meta.color} ${meta.borderColor} shadow-xl ${meta.glow}`
                    : 'bg-white/[0.02] border-white/[0.06] opacity-75'
                }`}
              >
                {/* Sol kenar neon aksan */}
                {isLatest && (
                  <motion.div
                    className="absolute left-0 top-0 bottom-0 w-1"
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                    style={{
                      background: `linear-gradient(to bottom, ${
                        index === 0 ? '#06b6d4' :
                        index === 1 ? '#22c55e' :
                        index === 2 ? '#d946ef' :
                        index === 3 ? '#f59e0b' :
                        '#f43f5e'
                      }, transparent)`,
                    }}
                  />
                )}

                {/* Rozet Satırı */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{meta.badge}</span>
                    <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                      {index + 1}. {language === 'tr' ? 'İpucu' : 'Clue'} — {meta.level}
                    </span>
                  </div>

                  {isLatest && !isGameOver && (
                    <motion.div
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center gap-1 text-[10px] font-black text-fuchsia-300/80 bg-white/[0.06] px-2 py-0.5 rounded-lg"
                    >
                      <Sparkles className="w-3 h-3 animate-spin" style={{ animationDuration: '3s' }} />
                      <span>{meta.points}P</span>
                    </motion.div>
                  )}
                </div>

                {/* İpucu İçeriği */}
                {isEmoji ? (
                  <div className="py-1">
                    <CinemaEmojiRow
                      emojiString={clue}
                      language={language}
                      size="lg"
                      showHelperHint={true}
                    />
                  </div>
                ) : (
                  <p
                    className={`text-stone-100 leading-relaxed pl-0.5 ${
                      isQuote
                        ? 'text-sm sm:text-base italic font-semibold text-fuchsia-200 pl-2 border-l-2 border-fuchsia-500/40'
                        : 'text-sm sm:text-base font-medium'
                    }`}
                  >
                    {isQuote && '"'}{clue}{isQuote && '"'}
                  </p>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};
