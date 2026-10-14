'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Play, Sparkles, Trophy, Flame, HelpCircle, Clapperboard, Star, Globe } from 'lucide-react';
import { MovieType, Language } from '@/types/movie';

interface CinemaStartMenuProps {
  onStartGame: () => void;
  selectedType: MovieType | 'tum';
  onSelectType: (type: MovieType | 'tum') => void;
  highScore: number;
  highStreak: number;
  totalGames: number;
  language: Language;
  onToggleLanguage: () => void;
}

const floatingEmojis = ['🎬', '🍿', '🎞️', '🏆', '🎭', '🎪', '📽️', '🎥'];

export const CinemaStartMenu: React.FC<CinemaStartMenuProps> = ({
  onStartGame,
  selectedType,
  onSelectType,
  highScore,
  highStreak,
  totalGames,
  language,
  onToggleLanguage,
}) => {
  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center min-h-[85vh] py-8 px-4 text-center space-y-5 relative">
      {/* Floating emojiler (dekoratif) */}
      {floatingEmojis.map((emoji, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl sm:text-3xl opacity-[0.06] pointer-events-none select-none"
          style={{
            left: `${10 + ((i * 12) % 80)}%`,
            top: `${5 + ((i * 15) % 75)}%`,
          }}
          animate={{
            y: [0, -15, 0],
            rotate: [0, i % 2 === 0 ? 8 : -8, 0],
          }}
          transition={{
            duration: 4 + i * 0.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {emoji}
        </motion.div>
      ))}

      {/* Dil Değiştirici Buton (Üst Kısım) */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-center gap-2"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onToggleLanguage}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-fuchsia-500/40 text-stone-200 text-xs font-black transition-all cursor-pointer shadow-lg"
          title={language === 'tr' ? 'Switch to English' : "Türkçe'ye Geç"}
        >
          <Globe className="w-4 h-4 text-fuchsia-400" />
          <span>{language === 'tr' ? '🇹🇷 Türkçe (Switch to 🇬🇧 EN)' : '🇬🇧 English (Switch to 🇹🇷 TR)'}</span>
        </motion.button>
      </motion.div>

      {/* Ana Başlık Alanı */}
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', damping: 12, stiffness: 100, delay: 0.15 }}
        className="space-y-4"
      >
        {/* Klaket İkonu */}
        <motion.div
          className="relative inline-flex"
          animate={{ rotate: [0, -3, 3, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="p-5 rounded-3xl bg-gradient-to-br from-fuchsia-600/25 via-purple-600/15 to-pink-600/25 border border-fuchsia-500/30 shadow-2xl shadow-fuchsia-950/50 backdrop-blur-sm">
            <Clapperboard className="w-16 h-16 sm:w-20 sm:h-20 text-fuchsia-400 drop-shadow-[0_0_20px_rgba(217,70,239,0.4)]" />
          </div>
          {/* Yıldız süsü */}
          <motion.div
            className="absolute -top-2 -right-2"
            animate={{ rotate: 360, scale: [1, 1.2, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          >
            <Sparkles className="w-5 h-5 text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.6)]" />
          </motion.div>
        </motion.div>

        {/* Başlık */}
        <div>
          <motion.h1
            className="text-3xl sm:text-5xl font-black tracking-tight leading-tight"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <span className="bg-gradient-to-r from-fuchsia-400 via-pink-400 to-rose-400 bg-clip-text text-transparent">
              {language === 'tr' ? 'KÖTÜ ANLATILMIŞ' : 'BADLY EXPLAINED'}
            </span>
            <br />
            <span className="text-white">
              {language === 'tr' ? 'FİLMLER & DİZİLER' : 'MOVIES & SERIES'}
            </span>
          </motion.h1>

          <motion.p
            className="text-sm sm:text-base text-stone-400 max-w-md mx-auto mt-3 leading-relaxed"
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.45, duration: 0.5 }}
          >
            {language === 'tr' ? (
              <>
                Efsane film ve dizilerin konuları{' '}
                <span className="text-fuchsia-400 font-bold">en absürt ve komik şekilde</span>{' '}
                özetlendi. Bakalım bilebilecek misin?
              </>
            ) : (
              <>
                Iconic movies and series summarized in the{' '}
                <span className="text-fuchsia-400 font-bold">most absurd and hilarious way</span>.{' '}
                Can you guess them all?
              </>
            )}
          </motion.p>
        </div>
      </motion.div>

      {/* İstatistikler */}
      <motion.div
        className="grid grid-cols-3 gap-3 w-full max-w-sm"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.55 }}
      >
        {[
          {
            icon: <Trophy className="w-4 h-4 text-yellow-400" />,
            label: language === 'tr' ? 'Rekor' : 'Best',
            value: `${highScore}P`,
          },
          {
            icon: <Flame className="w-4 h-4 text-orange-400" />,
            label: language === 'tr' ? 'En İyi Seri' : 'Streak',
            value: `${highStreak}`,
          },
          {
            icon: <Star className="w-4 h-4 text-fuchsia-400" />,
            label: language === 'tr' ? 'Oyun' : 'Games',
            value: `${totalGames}`,
          },
        ].map((stat, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05, y: -2 }}
            className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-3 backdrop-blur-sm"
          >
            <div className="flex items-center justify-center gap-1.5 text-[11px] text-stone-400 font-semibold mb-1">
              {stat.icon}
              <span>{stat.label}</span>
            </div>
            <div className="text-lg font-black text-white">{stat.value}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* Kategori Filtresi */}
      <motion.div
        className="w-full max-w-sm space-y-2.5"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.65 }}
      >
        <span className="text-[11px] font-bold text-stone-500 uppercase tracking-widest">
          {language === 'tr' ? 'Kategori Seç' : 'Select Category'}
        </span>
        <div className="grid grid-cols-3 gap-2">
          {[
            { id: 'tum' as const, label: language === 'tr' ? '🍿 Tümü' : '🍿 All' },
            { id: 'film' as const, label: language === 'tr' ? '🎬 Film' : '🎬 Movies' },
            { id: 'dizi' as const, label: language === 'tr' ? '📺 Dizi' : '📺 Series' },
          ].map((cat) => (
            <motion.button
              key={cat.id}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => onSelectType(cat.id)}
              className={`py-2.5 px-3 rounded-xl text-xs font-black transition-all cursor-pointer relative overflow-hidden ${
                selectedType === cat.id
                  ? 'bg-gradient-to-b from-fuchsia-500/30 to-pink-600/20 text-fuchsia-200 border border-fuchsia-500/50 shadow-lg shadow-fuchsia-950/40'
                  : 'bg-white/[0.03] hover:bg-white/[0.06] text-stone-400 border border-white/[0.06]'
              }`}
            >
              <span className="relative z-10">{cat.label}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Başla Butonu */}
      <motion.div
        className="w-full max-w-sm pt-1"
        initial={{ y: 25, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.75 }}
      >
        <motion.button
          whileHover={{ scale: 1.03, boxShadow: '0 0 40px rgba(217,70,239,0.3)' }}
          whileTap={{ scale: 0.97 }}
          onClick={onStartGame}
          className="w-full py-4.5 rounded-2xl bg-gradient-to-r from-fuchsia-600 via-pink-600 to-rose-600 text-white font-black text-lg sm:text-xl shadow-2xl shadow-fuchsia-950/70 flex items-center justify-center gap-3 cursor-pointer transition-all border border-fuchsia-400/30 relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
          <Play className="w-6 h-6 fill-current relative z-10" />
          <span className="relative z-10">
            {language === 'tr' ? 'Oyunu Başlat' : 'Start Guessing'}
          </span>
        </motion.button>
      </motion.div>

      {/* Nasıl Oynanır */}
      <motion.div
        className="w-full max-w-sm"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.85 }}
      >
        <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] text-stone-400 text-xs space-y-2">
          <div className="font-bold text-fuchsia-400/80 flex items-center justify-center gap-1.5 text-[11px] uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{language === 'tr' ? 'Nasıl Oynanır?' : 'How to Play'}</span>
          </div>
          <div className="space-y-1.5 text-[11px] leading-relaxed text-left">
            <p>
              🧩 <strong className="text-stone-300">1. {language === 'tr' ? 'İpucu' : 'Clue'}:</strong>{' '}
              {language === 'tr' ? 'Emoji şifresi (100P)' : 'Emoji riddle (100P)'}
            </p>
            <p>
              💬 <strong className="text-stone-300">2. {language === 'tr' ? 'İpucu' : 'Clue'}:</strong>{' '}
              {language === 'tr' ? 'Efsane replik (200P)' : 'Iconic quote (200P)'}
            </p>
            <p>
              🤪 <strong className="text-stone-300">3. {language === 'tr' ? 'İpucu' : 'Clue'}:</strong>{' '}
              {language === 'tr' ? 'Kötü anlatılmış konu özeti (300P)' : 'Badly explained plot summary (300P)'}
            </p>
            <p>
              ⚠️ <strong className="text-stone-300">4. {language === 'tr' ? 'İpucu' : 'Clue'}:</strong>{' '}
              {language === 'tr' ? 'İronik detay & uyarı (400P)' : 'Ironic detail & warning (400P)'}
            </p>
            <p>
              🎬 <strong className="text-stone-300">5. {language === 'tr' ? 'İpucu' : 'Clue'}:</strong>{' '}
              {language === 'tr' ? 'Başroller & künye (500P)' : 'Cast & cinema trivia (500P)'}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
