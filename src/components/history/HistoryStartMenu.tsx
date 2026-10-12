'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Trophy, Flame, Play, HelpCircle, Sparkles, Star, Volume2, VolumeX, Landmark, BookOpen, Compass } from 'lucide-react';
import { CharacterDifficulty } from '@/types/historicalFigure';

interface HistoryStartMenuProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  selectedDifficulty: CharacterDifficulty | 'tum';
  onSelectDifficulty: (d: CharacterDifficulty | 'tum') => void;
  onStartGame: () => void;
  highScore: number;
  highStreak: number;
  totalGames: number;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

const categoryOptions = [
  { id: 'tum', title: 'Tüm Tarih', badge: '50 Şahsiyet', icon: '🏛️', desc: 'Bilimden sanata, imparatorlardan kaşiflere hepsi' },
  { id: 'bilim', title: 'Bilim & Keşif', badge: '19 Deha', icon: '🔬', desc: 'Einstein, Tesla, Newton, Curie, Turing, Sancar...' },
  { id: 'lider', title: 'Liderler & Hükümdarlar', badge: '15 Fatih', icon: '👑', desc: 'Atatürk, Fatih, İskender, Sezar, Cengiz Han...' },
  { id: 'sanat', title: 'Sanat & Düşünürler', badge: '16 Usta', icon: '🎨', desc: 'Da Vinci, Shakespeare, Mozart, Rumi, Van Gogh...' },
];

export const HistoryStartMenu: React.FC<HistoryStartMenuProps> = ({
  selectedCategory,
  onSelectCategory,
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
    <div className="w-full max-w-3xl mx-auto my-auto flex flex-col items-center justify-center space-y-6 py-6 px-3">
      {/* Üst Çubuk: Mod Değiştirici ve Ses Butonu */}
      <div className="w-full flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-stone-900/90 border border-emerald-500/30 text-emerald-400 hover:text-emerald-200 text-xs font-bold transition-all hover:scale-105"
        >
          <span>⚽ Futbol Moduna Geç</span>
        </Link>

        <button
          onClick={onToggleSound}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-900/90 border border-amber-900/40 text-amber-300 hover:text-white text-xs font-bold transition-all cursor-pointer"
        >
          {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-amber-400" /> : <VolumeX className="w-3.5 h-3.5 text-stone-500" />}
          <span>{soundEnabled ? 'Ses Açık' : 'Sessiz'}</span>
        </button>
      </div>

      {/* Başlık Alanı */}
      <div className="text-center space-y-3">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', damping: 15 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-950/80 via-yellow-950/60 to-amber-950/80 border border-amber-500/40 text-amber-300 text-xs sm:text-sm font-black tracking-wide shadow-lg shadow-amber-950/50"
        >
          <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
          <span>TARİHTE BİR ZAMAN YOLCULUĞU</span>
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-stone-100 via-amber-200 to-amber-500 drop-shadow-md"
        >
          KİM BU ŞAHSİYET?
        </motion.h1>

        <p className="text-sm sm:text-base text-stone-300 max-w-lg mx-auto font-medium">
          İpuçlarını takip et; tarihe yön veren imparatorları, dahi bilim insanlarını ve unutulmaz filozofları tahmin et!
        </p>
      </div>

      {/* İstatistikler Paneli */}
      <div className="w-full grid grid-cols-3 gap-2.5 sm:gap-4 max-w-lg">
        <div className="bg-stone-900/80 border border-amber-500/20 rounded-2xl p-3 text-center shadow-lg">
          <div className="flex items-center justify-center gap-1 text-amber-400 text-xs font-bold">
            <Trophy className="w-3.5 h-3.5" />
            <span>En Yüksek</span>
          </div>
          <div className="text-xl sm:text-2xl font-black text-amber-300 mt-1">{highScore}</div>
        </div>

        <div className="bg-stone-900/80 border border-amber-500/20 rounded-2xl p-3 text-center shadow-lg">
          <div className="flex items-center justify-center gap-1 text-orange-400 text-xs font-bold">
            <Flame className="w-3.5 h-3.5" />
            <span>En İyi Seri</span>
          </div>
          <div className="text-xl sm:text-2xl font-black text-stone-100 mt-1">{highStreak}</div>
        </div>

        <div className="bg-stone-900/80 border border-amber-500/20 rounded-2xl p-3 text-center shadow-lg">
          <div className="flex items-center justify-center gap-1 text-stone-400 text-xs font-bold">
            <BookOpen className="w-3.5 h-3.5 text-amber-400" />
            <span>Oyunlar</span>
          </div>
          <div className="text-xl sm:text-2xl font-black text-stone-100 mt-1">{totalGames}</div>
        </div>
      </div>

      {/* Kategori Seçimi */}
      <div className="w-full max-w-xl space-y-2">
        <label className="text-xs font-black tracking-wider text-amber-400 uppercase block pl-1">
          Kategori Seç:
        </label>
        <div className="grid grid-cols-2 gap-2.5">
          {categoryOptions.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden ${
                  isSelected
                    ? 'border-amber-400 bg-gradient-to-r from-amber-950/70 to-stone-900/90 ring-2 ring-amber-400/30 shadow-lg shadow-amber-950/60'
                    : 'border-stone-800 bg-stone-900/60 hover:bg-stone-800/80 text-stone-400'
                }`}
              >
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className="text-lg">{cat.icon}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-black/40 text-amber-300 border border-amber-700/20">
                    {cat.badge}
                  </span>
                </div>
                <div className={`font-black text-xs sm:text-sm ${isSelected ? 'text-amber-200' : 'text-stone-200'}`}>
                  {cat.title}
                </div>
                <div className="text-[11px] text-stone-400 line-clamp-1 mt-0.5">
                  {cat.desc}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Oyuna Başla Butonu */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onStartGame}
        className="w-full max-w-md py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:from-amber-400 hover:to-yellow-400 text-stone-950 font-black text-lg sm:text-xl shadow-2xl shadow-amber-900/50 flex items-center justify-center gap-3 cursor-pointer transition-all"
      >
        <Play className="w-6 h-6 fill-current" />
        <span>Tarihi Tahmine Başla</span>
      </motion.button>

      {/* Nasıl Oynanır Kartı */}
      <div className="w-full max-w-md p-3.5 rounded-2xl bg-stone-900/60 border border-amber-900/30 text-stone-300 text-xs space-y-1 text-center">
        <div className="font-bold text-amber-400 flex items-center justify-center gap-1">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Nasıl Oynanır?</span>
        </div>
        <p className="text-stone-400 leading-relaxed">
          1. İpuçları en zordan en kolaya doğru açılır. 1. ipucunda bilirseniz <strong>500 puan</strong> kazanırsınız. Her yeni ipucu açışınızda kazanacağınız puan 100 puan düşer.
        </p>
      </div>
    </div>
  );
};
