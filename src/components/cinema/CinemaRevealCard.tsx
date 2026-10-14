'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MovieItem, Language } from '@/types/movie';
import { CheckCircle2, XCircle, ArrowRight, Film, Users, Sparkles, Star } from 'lucide-react';

interface CinemaRevealCardProps {
  movie: MovieItem;
  isWon: boolean;
  pointsEarned: number;
  revealedCount: number;
  onNext: () => void;
  language: Language;
}

export const CinemaRevealCard: React.FC<CinemaRevealCardProps> = ({
  movie,
  isWon,
  pointsEarned,
  revealedCount,
  onNext,
  language,
}) => {
  const title = movie.title[language] || movie.title.tr;
  const genre = movie.genre[language] || movie.genre.tr;
  const badPlot = movie.clues[language]?.[2] || movie.clues.tr[2];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: 'spring', damping: 18, stiffness: 200 }}
      className="w-full max-w-2xl mx-auto my-4 overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.03] shadow-2xl backdrop-blur-xl relative"
    >
      {/* Arka plan parıltı */}
      <div
        className={`absolute top-0 right-0 -mr-20 -mt-20 w-60 h-60 rounded-full blur-3xl pointer-events-none ${
          isWon ? 'bg-fuchsia-500/15' : 'bg-rose-500/10'
        }`}
      />

      {/* Durum Başlığı */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className={`py-4 px-6 text-center font-black tracking-wider text-base sm:text-lg flex items-center justify-center gap-2.5 ${
          isWon
            ? 'bg-gradient-to-r from-fuchsia-600/90 via-pink-500/90 to-rose-600/90 text-white'
            : 'bg-gradient-to-r from-rose-800/90 via-red-700/90 to-rose-800/90 text-white'
        }`}
      >
        {isWon ? (
          <>
            <motion.div
              animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.2, 1] }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <CheckCircle2 className="w-6 h-6" />
            </motion.div>
            <span>{language === 'tr' ? 'BİLDİN!' : 'CORRECT!'}</span>
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.4 }}
              className="text-sm bg-white/20 px-3 py-1 rounded-full font-black"
            >
              +{pointsEarned}P
            </motion.span>
          </>
        ) : (
          <>
            <XCircle className="w-5 h-5 opacity-80 text-rose-300" />
            <span>{language === 'tr' ? 'Film Kaçtı! Aranan Yapım:' : 'Missed! The Answer Was:'}</span>
          </>
        )}
      </motion.div>

      {/* İçerik */}
      <div className="p-6 sm:p-8 space-y-5">
        {/* Film Adı ve Emojiler */}
        <motion.div
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center space-y-3"
        >
          {/* Tür ve Ülke rozeti */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.05] border border-white/[0.08] text-stone-400 text-xs font-semibold">
            <span>{movie.type === 'film' ? '🎬' : '📺'}</span>
            <span>{movie.year}</span>
            {movie.country && (
              <>
                <span className="w-1 h-1 rounded-full bg-stone-600" />
                <span>{movie.country.flag} {movie.country.code}</span>
              </>
            )}
            <span className="w-1 h-1 rounded-full bg-stone-600" />
            <span>{genre}</span>
            <span className="w-1 h-1 rounded-full bg-stone-600" />
            <span className="flex items-center gap-0.5 text-yellow-400 font-bold">
              <Star className="w-3 h-3 fill-current" /> {movie.imdbScore}
            </span>
          </div>

          {/* Başlık */}
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            {title}
          </h2>

          {/* Emojiler */}
          <motion.div
            className="text-2xl sm:text-3xl py-1 tracking-[0.3em]"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            {movie.emojis}
          </motion.div>

          {/* Yönetmen */}
          <p className="text-xs text-stone-500 font-medium">
            {language === 'tr' ? 'Yönetmen / Yaratıcı:' : 'Director / Creator:'}{' '}
            <span className="text-stone-300 font-bold">{movie.directorOrCreator}</span>
          </p>
        </motion.div>

        {/* Bilgi Grid */}
        <motion.div
          className="grid grid-cols-3 gap-2.5"
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.45 }}
        >
          <div className="bg-white/[0.03] border border-white/[0.06] p-3 rounded-xl text-center">
            <div className="text-[10px] text-stone-500 font-semibold flex items-center justify-center gap-1 mb-1">
              <Film className="w-3 h-3 text-fuchsia-400/60" />{' '}
              {language === 'tr' ? 'Tür' : 'Genre'}
            </div>
            <div className="text-xs font-bold text-stone-300 truncate">
              {genre.split(' / ')[0]}
            </div>
          </div>
          <div className="bg-white/[0.03] border border-white/[0.06] p-3 rounded-xl text-center">
            <div className="text-[10px] text-stone-500 font-semibold flex items-center justify-center gap-1 mb-1">
              <Users className="w-3 h-3 text-fuchsia-400/60" />{' '}
              {language === 'tr' ? 'Başrol' : 'Lead Cast'}
            </div>
            <div className="text-xs font-bold text-stone-300 truncate" title={movie.cast.join(', ')}>
              {movie.cast[0]}
            </div>
          </div>
          <div className="bg-white/[0.03] border border-white/[0.06] p-3 rounded-xl text-center">
            <div className="text-[10px] text-stone-500 font-semibold flex items-center justify-center gap-1 mb-1">
              <Sparkles className="w-3 h-3 text-fuchsia-400/60" />{' '}
              {language === 'tr' ? 'İpucu' : 'Clues'}
            </div>
            <div className="text-xs font-bold text-fuchsia-300">
              {isWon
                ? language === 'tr'
                  ? `${revealedCount}. İpucunda`
                  : `In ${revealedCount} Clue${revealedCount > 1 ? 's' : ''}`
                : language === 'tr'
                ? 'Pas'
                : 'Skipped'}
            </div>
          </div>
        </motion.div>

        {/* Kötü Anlatılmış Konu Özeti */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="p-4 rounded-xl bg-fuchsia-500/[0.05] border border-fuchsia-500/10 text-stone-400 text-xs sm:text-sm italic text-center leading-relaxed"
        >
          &ldquo;{badPlot}&rdquo;
        </motion.div>

        {/* Sonraki Buton */}
        <motion.button
          whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(217,70,239,0.2)' }}
          whileTap={{ scale: 0.98 }}
          onClick={onNext}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-fuchsia-600 via-pink-600 to-rose-600 hover:from-fuchsia-500 hover:to-pink-500 text-white font-black text-base sm:text-lg shadow-xl shadow-fuchsia-950/50 flex items-center justify-center gap-2 cursor-pointer transition-all border border-fuchsia-400/20 relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
          <span className="relative z-10">
            {language === 'tr' ? 'Sıradaki Yapım' : 'Next Movie'}
          </span>
          <ArrowRight className="w-5 h-5 relative z-10" />
        </motion.button>
      </div>
    </motion.div>
  );
};
