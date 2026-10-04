'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Player } from '@/types/player';
import { getCountryFlag } from '@/utils/normalize';
import { Trophy, CheckCircle2, XCircle, ArrowRight, Shield, Award, Calendar, MapPin } from 'lucide-react';

interface PlayerRevealCardProps {
  player: Player;
  isWon: boolean;
  pointsEarned: number;
  revealedCount: number;
  onNext: () => void;
}

export const PlayerRevealCard: React.FC<PlayerRevealCardProps> = ({
  player,
  isWon,
  pointsEarned,
  revealedCount,
  onNext,
}) => {
  const flag = getCountryFlag(player.nationality);
  const currentYear = new Date().getFullYear();
  const age = player.status === 'emekli' && player.retirementYear 
    ? `${player.retirementYear - player.birthYear} yaşında bıraktı` 
    : `${currentYear - player.birthYear} yaşında`;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: 'spring', damping: 20, stiffness: 260 }}
      className="w-full max-w-2xl mx-auto my-6 overflow-hidden rounded-3xl border-2 border-emerald-400/60 bg-gradient-to-b from-slate-900/95 via-emerald-950/95 to-slate-950/95 shadow-2xl shadow-emerald-500/20 backdrop-blur-xl relative"
    >
      {/* Parlama Efekti */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-60 h-60 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />

      {/* Durum Başlığı (GOOOL veya KAÇTI) */}
      <div
        className={`py-4 px-6 text-center font-black tracking-wider text-xl flex items-center justify-center gap-2 ${
          isWon
            ? 'bg-gradient-to-r from-emerald-600 via-green-500 to-emerald-600 text-white shadow-lg shadow-emerald-600/30'
            : 'bg-gradient-to-r from-rose-700 via-red-600 to-rose-700 text-white shadow-lg shadow-rose-700/30'
        }`}
      >
        {isWon ? (
          <>
            <CheckCircle2 className="w-6 h-6 animate-bounce" />
            <span>GOOOOOOL! BİLDİN!</span>
            <span className="ml-2 text-sm bg-black/30 px-3 py-1 rounded-full font-extrabold text-amber-300">
              +{pointsEarned} Puan
            </span>
          </>
        ) : (
          <>
            <XCircle className="w-6 h-6" />
            <span>DÜDÜK ÇALDI! ARANAN FUTBOLCU:</span>
          </>
        )}
      </div>

      <div className="p-6 md:p-8">
        {/* Futbolcu Kart Başlığı */}
        <div className="flex flex-col md:flex-row items-center gap-6 pb-6 border-b border-white/10">
          {/* İkonik Forma Rozeti */}
          <div className="relative group">
            <div className="w-28 h-32 rounded-2xl bg-gradient-to-br from-emerald-500 via-green-600 to-emerald-800 p-1 shadow-xl shadow-emerald-700/40 flex flex-col items-center justify-center text-white border-2 border-emerald-300">
              <span className="text-[10px] uppercase font-black tracking-widest text-emerald-100">
                {player.club}
              </span>
              <span className="text-5xl font-black my-0.5 tracking-tighter drop-shadow-md">
                {player.shirtNumber}
              </span>
              <span className="text-[11px] font-bold text-emerald-200 uppercase">
                {player.position}
              </span>
            </div>
            {/* Rozet altındaki durum */}
            <span
              className={`absolute -bottom-2 left-1/2 -translate-x-1/2 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border shadow-md uppercase ${
                player.status === 'aktif'
                  ? 'bg-emerald-500 text-white border-emerald-300'
                  : 'bg-amber-500 text-black border-amber-300'
              }`}
            >
              {player.status === 'aktif' ? 'Aktif' : 'Emekli'}
            </span>
          </div>

          {/* Futbolcu Bilgileri */}
          <div className="flex-1 text-center md:text-left space-y-2">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="text-2xl">{flag}</span>
              <h2 className="text-3xl font-black text-white tracking-tight">{player.name}</h2>
            </div>

            {/* Takma İsimler / Aliases */}
            {player.aliases.length > 0 && (
              <p className="text-xs text-emerald-300/80 font-medium">
                Bilinen Diğer İsimleri: <span className="text-white font-semibold">{player.aliases.join(', ')}</span>
              </p>
            )}

            {/* İstatistik Çipleri */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-1 text-xs">
              <span className="px-2.5 py-1 rounded-lg bg-emerald-950/80 border border-emerald-500/30 text-emerald-200 font-semibold flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                {player.club} ({player.league})
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-emerald-950/80 border border-emerald-500/30 text-emerald-200 font-semibold flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                {player.nationality}
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-emerald-950/80 border border-emerald-500/30 text-emerald-200 font-semibold flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                {player.birthYear} ({age})
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-emerald-950/80 border border-emerald-500/30 text-amber-300 font-semibold flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                Zorluk: {player.difficulty.toUpperCase()}
              </span>
            </div>
          </div>
        </div>

        {/* İpucu Özeti */}
        <div className="mt-5 space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400">
            Tüm İpuçları ve Gerçekler:
          </h4>
          <div className="space-y-1.5 text-xs text-gray-300 max-h-44 overflow-y-auto pr-1">
            {player.clues.map((clue, idx) => (
              <div
                key={idx}
                className={`p-2 rounded-xl flex items-start gap-2 border ${
                  idx < revealedCount
                    ? 'bg-emerald-950/50 border-emerald-500/30 text-emerald-100 font-medium'
                    : 'bg-black/30 border-white/5 text-gray-400'
                }`}
              >
                <span className="font-black text-emerald-400">{idx + 1}.</span>
                <span>{clue}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Sıradaki Oyuncu Butonu */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={onNext}
            className="w-full md:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 hover:from-emerald-400 hover:to-green-400 text-white font-black tracking-wider text-base shadow-xl shadow-emerald-600/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>SIRADAKİ FUTBOLCUYA GEÇ</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
