'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Flame, Play, HelpCircle, Sparkles, Shield, Star, Volume2, VolumeX } from 'lucide-react';
import { Difficulty } from '@/types/player';

interface StartMenuProps {
  selectedDifficulty: Difficulty | 'tum';
  onSelectDifficulty: (d: Difficulty | 'tum') => void;
  onStartGame: () => void;
  highScore: number;
  highStreak: number;
  totalGames: number;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

const difficultyOptions: {
  id: Difficulty | 'tum';
  title: string;
  badge: string;
  desc: string;
  color: string;
  borderColor: string;
  icon: string;
}[] = [
  {
    id: 'tum',
    title: 'Tüm Futbolcular',
    badge: 'Karışık (20)',
    desc: 'Aktif ve efsane tüm futbolculardan rastgele',
    color: 'from-emerald-500/20 to-teal-600/20 text-emerald-300',
    borderColor: 'border-emerald-500/40 hover:border-emerald-400',
    icon: '🌍',
  },
  {
    id: 'kolay',
    title: 'Kolay Seviye',
    badge: 'Dünya & Süper Lig',
    desc: 'Messi, Ronaldo, Hagi, Alex, Muslera gibi devler',
    color: 'from-green-500/20 to-emerald-600/20 text-green-300',
    borderColor: 'border-green-500/40 hover:border-green-400',
    icon: '⭐',
  },
  {
    id: 'orta',
    title: 'Orta Seviye',
    badge: 'Büyük 5 Lig',
    desc: 'Vardy, Son, Maldini, Quaresma, Van Dijk',
    color: 'from-amber-500/20 to-yellow-600/20 text-amber-300',
    borderColor: 'border-amber-500/40 hover:border-amber-400',
    icon: '⚡',
  },
  {
    id: 'zor',
    title: 'Zor Seviye',
    badge: 'Nostalji & Ustalar',
    desc: 'Okocha, Juninho gibi efsanevi frikik ve çalım kralları',
    color: 'from-rose-500/20 to-red-600/20 text-rose-300',
    borderColor: 'border-rose-500/40 hover:border-rose-400',
    icon: '🔥',
  },
];

export const StartMenu: React.FC<StartMenuProps> = ({
  selectedDifficulty,
  onSelectDifficulty,
  onStartGame,
  highScore,
  highStreak,
  totalGames,
  soundEnabled,
  onToggleSound,
}) => {
  return (
    <div className="w-full max-w-3xl mx-auto my-auto flex flex-col items-center justify-center space-y-6 py-6 px-2">
      {/* Üst Ses Butonu */}
      <div className="w-full flex justify-end">
        <button
          onClick={onToggleSound}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/40 border border-emerald-500/30 text-emerald-300 hover:text-white hover:bg-emerald-900/40 text-xs font-bold transition-all cursor-pointer"
        >
          {soundEnabled ? (
            <>
              <Volume2 className="w-4 h-4 text-emerald-400" />
              <span>Ses Açık</span>
            </>
          ) : (
            <>
              <VolumeX className="w-4 h-4 text-gray-500" />
              <span>Ses Kapalı</span>
            </>
          )}
        </button>
      </div>

      {/* Başlık ve Logo Alanı */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center space-y-3"
      >
        <div className="relative inline-block">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-emerald-500 via-green-400 to-teal-300 p-0.5 shadow-2xl shadow-emerald-500/40 flex items-center justify-center">
            <div className="w-full h-full bg-[#061e12] rounded-[22px] flex items-center justify-center text-4xl animate-bounce">
              ⚽
            </div>
          </div>
          <span className="absolute -bottom-1 -right-2 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 text-black font-black text-[10px] tracking-widest uppercase shadow-md">
            2026 PRO
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-emerald-100 to-emerald-400 tracking-tight drop-shadow-lg">
          KİM BU FUTBOLCU?
        </h1>
        <p className="text-sm md:text-base text-emerald-300/80 font-medium max-w-md mx-auto">
          İpuçlarını birer birer aç, transferleri ve ikonik anları çöz, futbolcuyu en erken bilip rekor kır!
        </p>
      </motion.div>

      {/* Yüksek Skorlar Paneli */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="w-full grid grid-cols-3 gap-3 p-3 rounded-2xl bg-black/50 border border-emerald-500/30 backdrop-blur-md shadow-xl"
      >
        <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-emerald-950/60 border border-emerald-500/20 text-center">
          <div className="flex items-center gap-1 text-[11px] font-bold text-amber-400 uppercase tracking-wider mb-0.5">
            <Trophy className="w-3.5 h-3.5" />
            <span>En Yüksek Skor</span>
          </div>
          <div className="text-xl md:text-2xl font-black text-amber-300">{highScore}</div>
        </div>

        <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-emerald-950/60 border border-emerald-500/20 text-center">
          <div className="flex items-center gap-1 text-[11px] font-bold text-orange-400 uppercase tracking-wider mb-0.5">
            <Flame className="w-3.5 h-3.5" />
            <span>En İyi Seri</span>
          </div>
          <div className="text-xl md:text-2xl font-black text-white">{highStreak}</div>
        </div>

        <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-emerald-950/60 border border-emerald-500/20 text-center">
          <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-400 uppercase tracking-wider mb-0.5">
            <Star className="w-3.5 h-3.5" />
            <span>Oynanan Tur</span>
          </div>
          <div className="text-xl md:text-2xl font-black text-emerald-200">{totalGames}</div>
        </div>
      </motion.div>

      {/* Zorluk Seviyesi Seçimi */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="w-full space-y-2.5"
      >
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-black uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
            <Shield className="w-4 h-4 text-emerald-400" />
            Zorluk Seviyesi Seç:
          </span>
          <span className="text-[11px] text-emerald-300/70 font-medium">İstediğin modu belirle</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {difficultyOptions.map((opt) => {
            const isSelected = selectedDifficulty === opt.id;
            return (
              <div
                key={opt.id}
                onClick={() => onSelectDifficulty(opt.id)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                  isSelected
                    ? 'bg-gradient-to-r from-emerald-900/90 to-slate-900/90 border-emerald-400 ring-2 ring-emerald-400/40 shadow-lg shadow-emerald-500/20'
                    : `bg-black/40 ${opt.borderColor} hover:bg-emerald-950/40`
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{opt.icon}</span>
                  <div>
                    <div className="font-extrabold text-sm text-white flex items-center gap-2">
                      <span>{opt.title}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-white/10 text-emerald-300 border border-white/10">
                        {opt.badge}
                      </span>
                    </div>
                    <p className="text-xs text-gray-300/80 line-clamp-1 mt-0.5">{opt.desc}</p>
                  </div>
                </div>

                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                    isSelected
                      ? 'border-emerald-400 bg-emerald-500'
                      : 'border-gray-500 bg-transparent'
                  }`}
                >
                  {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* MAÇA BAŞLA Butonu */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="w-full pt-2"
      >
        <button
          onClick={onStartGame}
          className="w-full py-4 px-8 rounded-2xl bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 hover:from-emerald-400 hover:to-green-400 text-white font-black text-lg md:text-xl tracking-wider shadow-2xl shadow-emerald-600/50 hover:shadow-emerald-500/70 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 cursor-pointer group"
        >
          <Play className="w-6 h-6 fill-current group-hover:scale-110 transition-transform" />
          <span>MAÇA BAŞLA</span>
        </button>
      </motion.div>

      {/* Oyun Kuralları Kısa Bilgi */}
      <div className="w-full rounded-2xl bg-black/30 border border-white/5 p-3.5 text-xs text-emerald-300/80 flex items-start gap-2.5">
        <HelpCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
        <div className="space-y-1">
          <span className="font-bold text-white">Nasıl Oynanır?</span>
          <p>
            Her futbolcu için 5 kademeli ipucu bulunur. 1. ipucunda bilirsen <strong>500 Puan</strong>, her ipucu açılışında puan 100 düşer. Yanlış tahminler otomatik olarak yeni ipucu açar.
          </p>
        </div>
      </div>
    </div>
  );
};
