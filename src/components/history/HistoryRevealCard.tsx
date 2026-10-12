'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { HistoricalCharacter } from '@/types/historicalFigure';
import { getHistoricalFlag } from '@/utils/normalize';
import { Trophy, CheckCircle2, XCircle, ArrowRight, Landmark, Calendar, Globe, Sparkles } from 'lucide-react';

interface HistoryRevealCardProps {
  character: HistoricalCharacter;
  isWon: boolean;
  pointsEarned: number;
  revealedCount: number;
  onNext: () => void;
}

export const HistoryRevealCard: React.FC<HistoryRevealCardProps> = ({
  character,
  isWon,
  pointsEarned,
  revealedCount,
  onNext,
}) => {
  const flag = getHistoricalFlag(character.nationality);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: 'spring', damping: 20, stiffness: 260 }}
      className="w-full max-w-2xl mx-auto my-6 overflow-hidden rounded-3xl border-2 border-amber-500/50 bg-gradient-to-b from-stone-900/95 via-stone-950/95 to-amber-950/40 shadow-2xl shadow-amber-950/50 backdrop-blur-xl relative"
    >
      {/* Parlama Efekti */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-60 h-60 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Durum Başlığı */}
      <div
        className={`py-4 px-6 text-center font-black tracking-wider text-lg sm:text-xl flex items-center justify-center gap-2 ${
          isWon
            ? 'bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600 text-stone-950 shadow-lg shadow-amber-600/30'
            : 'bg-gradient-to-r from-rose-700 via-red-600 to-rose-700 text-white shadow-lg shadow-rose-700/30'
        }`}
      >
        {isWon ? (
          <>
            <CheckCircle2 className="w-6 h-6 animate-bounce" />
            <span>HARİKA! TARİHİ BİLDİN!</span>
            <span className="ml-2 text-sm bg-black/30 px-3 py-1 rounded-full font-black text-amber-900">
              +{pointsEarned} Puan
            </span>
          </>
        ) : (
          <>
            <XCircle className="w-6 h-6" />
            <span>ARANAN TARİHİ ŞAHSİYET:</span>
          </>
        )}
      </div>

      {/* Ana Gövde */}
      <div className="p-6 sm:p-8 space-y-6">
        {/* Karakter Adı ve Başlık */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/70 border border-amber-600/30 text-amber-300 text-xs font-bold">
            <span className="text-base">{flag}</span>
            <span>{character.nationality}</span>
            <span>•</span>
            <span>{character.era}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-stone-100 tracking-tight flex items-center justify-center gap-2">
            <span>{character.name}</span>
          </h2>

          <p className="text-sm sm:text-base font-semibold text-amber-400">
            {character.title}
          </p>

          <p className="text-xs text-stone-400 font-medium">
            Yaşadığı Dönem: <span className="text-stone-300 font-bold">{character.years}</span>
          </p>
        </div>

        {/* Bilgi Rozetleri Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <div className="bg-stone-900/80 border border-amber-900/40 p-3 rounded-2xl text-center">
            <div className="text-xs text-stone-400 font-bold flex items-center justify-center gap-1">
              <Landmark className="w-3.5 h-3.5 text-amber-400" />
              <span>Alan / Kategori</span>
            </div>
            <div className="text-sm font-extrabold text-stone-200 mt-1 truncate">
              {character.category}
            </div>
          </div>

          <div className="bg-stone-900/80 border border-amber-900/40 p-3 rounded-2xl text-center">
            <div className="text-xs text-stone-400 font-bold flex items-center justify-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              <span>Dönem</span>
            </div>
            <div className="text-sm font-extrabold text-stone-200 mt-1 truncate">
              {character.era}
            </div>
          </div>

          <div className="col-span-2 sm:col-span-1 bg-stone-900/80 border border-amber-900/40 p-3 rounded-2xl text-center">
            <div className="text-xs text-stone-400 font-bold flex items-center justify-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>İpucu Başarısı</span>
            </div>
            <div className="text-sm font-extrabold text-amber-300 mt-1">
              {isWon ? `${revealedCount}. İpucunda Bildin` : 'Pas Geçildi'}
            </div>
          </div>
        </div>

        {/* En İkonik İpucu / Özet */}
        <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-800/30 text-stone-300 text-xs sm:text-sm italic text-center">
          "{character.clues[character.clues.length - 1]}"
        </div>

        {/* Sonraki Karakter Butonu */}
        <button
          onClick={onNext}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600 hover:from-amber-500 hover:to-yellow-400 text-stone-950 font-black text-base sm:text-lg shadow-xl shadow-amber-900/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Sıradaki Tarihi Şahsiyete Geç</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </motion.div>
  );
};
