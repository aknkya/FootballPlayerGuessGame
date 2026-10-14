'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Flame, Volume2, VolumeX, Home, Clapperboard, Globe } from 'lucide-react';
import { Language } from '@/types/movie';

interface CinemaScoreBoardProps {
  score: number;
  streak: number;
  highStreak: number;
  currentRound: number;
  totalRounds: number;
  hearts: number;
  comboMultiplier: number;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onReturnMenu: () => void;
  language: Language;
  onToggleLanguage: () => void;
}

export const CinemaScoreBoard: React.FC<CinemaScoreBoardProps> = ({
  score,
  streak,
  highStreak,
  currentRound,
  totalRounds,
  hearts,
  comboMultiplier,
  soundEnabled,
  onToggleSound,
  onReturnMenu,
  language,
  onToggleLanguage,
}) => {
  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="w-full max-w-4xl mx-auto flex flex-wrap items-center justify-between gap-2 mb-3 px-2"
    >
      {/* SOL: Logo ve Dil Değiştirici Buton */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-fuchsia-300 font-black text-xs">
          <Clapperboard className="w-3.5 h-3.5 text-fuchsia-400" />
          <span className="hidden sm:inline">
            {language === 'tr' ? 'Kötü Anlatılmış Filmler' : 'Badly Explained Movies'}
          </span>
        </div>

        {/* Dil Değiştirici Buton */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onToggleLanguage}
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-fuchsia-500/30 text-xs font-bold text-stone-200 transition-all cursor-pointer"
          title={language === 'tr' ? "Switch to English" : "Türkçe'ye Geç"}
        >
          <Globe className="w-3.5 h-3.5 text-fuchsia-400" />
          <span>{language === 'tr' ? '🇬🇧 EN' : '🇹🇷 TR'}</span>
        </motion.button>
      </div>

      {/* SAĞ PANEL: Canlar, Çarpan, Skor, Seri, Tur, Ses ve Menü */}
      <div className="flex items-center gap-1.5 bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-1.5 sm:px-3 sm:py-1.5 shadow-xl">
        {/* Canlar (3 Can) */}
        <div
          className="flex items-center gap-1 bg-white/[0.06] px-2 py-1 rounded-xl"
          title={language === 'tr' ? `Kalan Can: ${hearts}/3` : `Remaining Lives: ${hearts}/3`}
        >
          {[1, 2, 3].map((h) => {
            const hasHeart = h <= hearts;
            return (
              <motion.span
                key={h}
                initial={false}
                animate={{
                  scale: hasHeart ? [1, 1.25, 1] : 0.8,
                  opacity: hasHeart ? 1 : 0.25,
                }}
                transition={{ duration: 0.25 }}
                className={`text-xs ${hasHeart ? 'drop-shadow-[0_0_8px_rgba(244,63,94,0.7)]' : 'grayscale'}`}
              >
                ❤️
              </motion.span>
            );
          })}
        </div>

        {/* Kombo Çarpanı */}
        {comboMultiplier > 1 && (
          <motion.div
            initial={{ scale: 0, x: -6 }}
            animate={{ scale: 1, x: 0 }}
            className="flex items-center gap-0.5 bg-gradient-to-r from-orange-500/25 to-amber-500/20 border border-orange-500/40 px-2 py-1 rounded-xl shadow-lg shadow-orange-950/40"
            title={language === 'tr' ? `${comboMultiplier}x Kombo Çarpanı!` : `${comboMultiplier}x Combo Multiplier!`}
          >
            <Flame className="w-3.5 h-3.5 text-orange-400 animate-pulse" />
            <span className="font-black text-orange-300 text-xs leading-none">
              x{comboMultiplier}
            </span>
          </motion.div>
        )}

        {/* Puan */}
        <motion.div
          key={score}
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          className="flex items-center gap-1 bg-white/[0.06] px-2.5 py-1 rounded-xl"
          title={language === 'tr' ? 'Toplam Puan' : 'Total Score'}
        >
          <Trophy className="w-3.5 h-3.5 text-yellow-400" />
          <span className="font-black text-fuchsia-300 text-xs sm:text-sm leading-none">
            {score}
          </span>
        </motion.div>

        {/* Seri */}
        <div
          className="flex items-center gap-1 bg-white/[0.06] px-2.5 py-1 rounded-xl"
          title={`${language === 'tr' ? 'Seri' : 'Streak'}: ${streak} (${
            language === 'tr' ? 'En İyi' : 'Best'
          }: ${highStreak})`}
        >
          <Flame
            className={`w-3.5 h-3.5 transition-colors ${
              streak > 0 ? 'text-orange-400 animate-pulse' : 'text-stone-600'
            }`}
          />
          <span className="font-black text-stone-200 text-xs sm:text-sm leading-none">
            {streak}
          </span>
        </div>

        {/* Tur (Seans) */}
        <div
          className="flex items-center gap-1 bg-white/[0.06] px-2 py-1 rounded-xl"
          title={language === 'tr' ? 'Seans İlerlemesi' : 'Session Progress'}
        >
          <span className="font-black text-stone-300 text-xs leading-none">
            {currentRound}/{totalRounds}
          </span>
        </div>

        {/* Ses */}
        <button
          onClick={onToggleSound}
          className="p-1.5 rounded-xl bg-white/[0.06] text-stone-400 hover:text-white transition-all cursor-pointer"
          title={
            soundEnabled
              ? language === 'tr'
                ? 'Sesi Kapat'
                : 'Mute Sound'
              : language === 'tr'
              ? 'Sesi Aç'
              : 'Unmute Sound'
          }
        >
          {soundEnabled ? (
            <Volume2 className="w-3.5 h-3.5" />
          ) : (
            <VolumeX className="w-3.5 h-3.5 text-stone-600" />
          )}
        </button>

        {/* Menü */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onReturnMenu}
          className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-gradient-to-r from-fuchsia-600/80 to-pink-600/80 hover:from-fuchsia-500 hover:to-pink-500 text-white text-xs font-black shadow-lg shadow-fuchsia-950/50 cursor-pointer transition-all"
        >
          <Home className="w-3.5 h-3.5" />
          <span>{language === 'tr' ? 'Menü' : 'Menu'}</span>
        </motion.button>
      </div>
    </motion.header>
  );
};
