'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Flame, RotateCcw, Home, Share2, Check, Sparkles, Star, Clapperboard, Award } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Language, MovieItem } from '@/types/movie';

export interface RoundHistoryItem {
  movie: MovieItem;
  isWon: boolean;
  revealedCount: number;
  points: number;
  comboMultiplier: number;
}

interface CinemaReportCardProps {
  score: number;
  highScore: number;
  history: RoundHistoryItem[];
  onPlayAgain: () => void;
  onReturnMenu: () => void;
  language: Language;
}

export const CinemaReportCard: React.FC<CinemaReportCardProps> = ({
  score,
  highScore,
  history,
  onPlayAgain,
  onReturnMenu,
  language,
}) => {
  const [copied, setCopied] = useState(false);

  const totalWon = history.filter((h) => h.isWon).length;
  const isNewHighScore = score > 0 && score >= highScore;

  // Rütbe Belirleme (Cinema Rank Tier)
  const getRank = () => {
    if (score >= 2200) {
      return {
        badge: '🏆',
        title: language === 'tr' ? 'Oscar Canavarı & Sinema Efsanesi' : 'Academy Award Legend',
        desc: language === 'tr' ? 'Sinema dünyasının zirvesindesin! Her yapımı gözün kapalı biliyorsun.' : 'You stand at the pinnacle of cinema! Unstoppable movie mastery.',
        color: 'from-amber-400 via-yellow-400 to-orange-500',
        textColor: 'text-yellow-300',
        borderColor: 'border-yellow-500/40',
      };
    }
    if (score >= 1500) {
      return {
        badge: '🥇',
        title: language === 'tr' ? 'Altın Palmiye Yönetmeni' : 'Palme d\'Or Director',
        desc: language === 'tr' ? 'Üstün bir sinema vizyonun var, ipuçlarını ustalıkla çözdün!' : 'Outstanding cinematic vision! You solved clues like a seasoned auteur.',
        color: 'from-fuchsia-400 via-pink-500 to-rose-500',
        textColor: 'text-fuchsia-300',
        borderColor: 'border-fuchsia-500/40',
      };
    }
    if (score >= 800) {
      return {
        badge: '🥈',
        title: language === 'tr' ? 'Sinefil & Festival Seyircisi' : 'Cult Cinephile',
        desc: language === 'tr' ? 'Filmlerden iyi anlıyorsun, birkaç ipucu daha azla zirveye çıkabilirsin.' : 'Solid cinema knowledge! With a few fewer clues, you could reach the summit.',
        color: 'from-cyan-400 via-blue-500 to-indigo-500',
        textColor: 'text-cyan-300',
        borderColor: 'border-cyan-500/40',
      };
    }
    return {
      badge: '🍿',
      title: language === 'tr' ? 'B-Movie Figüranı' : 'B-Movie Extra',
      desc: language === 'tr' ? 'Sinema dünyasında daha yolun başındasın, bir seans daha yapıp kendini göster!' : 'Just getting started in cinema! Play another session and claim your glory.',
      color: 'from-stone-400 via-stone-500 to-stone-600',
      textColor: 'text-stone-300',
      borderColor: 'border-stone-500/40',
    };
  };

  const rank = getRank();

  // Wordle Tarzı Skor Kopyalama (Share to Clipboard)
  const handleShare = () => {
    const summaryLines = history
      .map((h, i) => {
        if (!h.isWon) return `${i + 1}. ❌ Film Kaçtı (0P)`;
        const clueIcon = h.revealedCount === 1 ? '🟩 1. İpucu' : h.revealedCount <= 3 ? '🟨' : '🟧';
        const comboText = h.comboMultiplier > 1 ? ` 🔥x${h.comboMultiplier}` : '';
        return `${i + 1}. ${clueIcon} (${h.points}P${comboText})`;
      })
      .join('\n');

    const shareText =
      language === 'tr'
        ? `🎬 KÖTÜ ANLATILMIŞ FİLMLER — SİNEMA KARNEM\n` +
          `🏆 Skor: ${score}P | Doğru: ${totalWon}/5\n` +
          `🎖️ Rütbe: ${rank.badge} ${rank.title}\n\n` +
          `${summaryLines}\n\n` +
          `Beni geçebilir misin? 👉 https://badly-explained-movies.vercel.app`
        : `🎬 BADLY EXPLAINED MOVIES — REPORT CARD\n` +
          `🏆 Score: ${score}P | Correct: ${totalWon}/5\n` +
          `🎖️ Rank: ${rank.badge} ${rank.title}\n\n` +
          `${summaryLines}\n\n` +
          `Can you beat my score? 👉 https://badly-explained-movies.vercel.app`;

    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: 'spring', damping: 20, stiffness: 220 }}
      className="w-full max-w-xl mx-auto my-auto p-5 sm:p-7 rounded-3xl bg-stone-900/90 border border-white/10 backdrop-blur-2xl shadow-2xl relative overflow-hidden text-center"
    >
      {/* Arka plan parıltısı */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-40 bg-fuchsia-500/20 rounded-full blur-3xl pointer-events-none" />

      {/* Rütbe Rozeti */}
      <motion.div
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.2, type: 'spring', damping: 12 }}
        className="w-20 h-20 mx-auto rounded-3xl bg-white/[0.05] border border-white/15 flex items-center justify-center text-4xl shadow-2xl relative mb-3"
      >
        <span>{rank.badge}</span>
        {isNewHighScore && (
          <div className="absolute -top-2 -right-2 bg-gradient-to-r from-amber-400 to-orange-500 text-black text-[9px] font-black px-2 py-0.5 rounded-full shadow-lg">
            REKOR!
          </div>
        )}
      </motion.div>

      {/* Üst Başlık & Rütbe */}
      <div className="space-y-1 mb-4">
        <div className="text-[11px] font-black tracking-widest text-stone-400 uppercase flex items-center justify-center gap-1.5">
          <Clapperboard className="w-3.5 h-3.5 text-fuchsia-400" />
          <span>{language === 'tr' ? 'Seans Tamamlandı!' : 'Session Complete!'}</span>
        </div>
        <h2 className={`text-2xl sm:text-3xl font-black bg-gradient-to-r ${rank.color} bg-clip-text text-transparent`}>
          {rank.title}
        </h2>
        <p className="text-xs text-stone-400 max-w-sm mx-auto leading-relaxed">
          {rank.desc}
        </p>
      </div>

      {/* İstatistik Kutuları */}
      <div className="grid grid-cols-3 gap-2.5 mb-5">
        <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/[0.06] text-center">
          <div className="text-[10px] text-stone-400 font-semibold mb-0.5">
            {language === 'tr' ? 'Toplam Skor' : 'Total Score'}
          </div>
          <div className="text-xl sm:text-2xl font-black text-fuchsia-300">
            {score}P
          </div>
        </div>

        <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/[0.06] text-center">
          <div className="text-[10px] text-stone-400 font-semibold mb-0.5">
            {language === 'tr' ? 'Doğru Yapım' : 'Correct'}
          </div>
          <div className="text-xl sm:text-2xl font-black text-emerald-400">
            {totalWon} / 5
          </div>
        </div>

        <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/[0.06] text-center">
          <div className="text-[10px] text-stone-400 font-semibold mb-0.5">
            {language === 'tr' ? 'Başarı Oranı' : 'Accuracy'}
          </div>
          <div className="text-xl sm:text-2xl font-black text-amber-300">
            %{Math.round((totalWon / 5) * 100)}
          </div>
        </div>
      </div>

      {/* 5 Filmin Özeti */}
      <div className="space-y-1.5 mb-6 text-left">
        <div className="text-[10px] font-black text-stone-400 uppercase tracking-wider px-1">
          {language === 'tr' ? 'Seans Dökümü' : 'Session Breakdown'}
        </div>
        <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
          {history.map((h, i) => {
            const title = h.movie.title[language] || h.movie.title.tr;
            return (
              <div
                key={i}
                className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.05] text-xs"
              >
                <div className="flex items-center gap-2 truncate pr-2">
                  <span className="font-bold text-stone-500 text-[11px] w-4">{i + 1}.</span>
                  <span className="text-sm">{h.movie.emojis.split(' ')[0] || '🎬'}</span>
                  <span className="font-bold text-stone-200 truncate">{title}</span>
                </div>
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  {h.isWon ? (
                    <>
                      <span className="text-[10px] font-black text-fuchsia-400 bg-fuchsia-500/10 px-1.5 py-0.5 rounded">
                        {h.revealedCount}. {language === 'tr' ? 'İpucu' : 'Clue'}
                      </span>
                      {h.comboMultiplier > 1 && (
                        <span className="text-[10px] font-black text-orange-400 flex items-center gap-0.5">
                          <Flame className="w-3 h-3" />
                          x{h.comboMultiplier}
                        </span>
                      )}
                      <span className="font-black text-emerald-400">+{h.points}P</span>
                    </>
                  ) : (
                    <span className="text-[11px] font-bold text-rose-400">
                      {language === 'tr' ? 'Kaçtı (0P)' : 'Missed'}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Aksiyon Butonları */}
      <div className="space-y-2">
        {/* Skor Paylaş Butonu */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleShare}
          className="w-full py-3.5 rounded-2xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/10 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer transition-all"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-300">
                {language === 'tr' ? 'Karne Panoya Kopyalandı!' : 'Report Card Copied!'}
              </span>
            </>
          ) : (
            <>
              <Share2 className="w-4 h-4 text-fuchsia-400" />
              <span>{language === 'tr' ? 'Skorunu Kopyala & Paylaş' : 'Share Report Card'}</span>
            </>
          )}
        </motion.button>

        {/* Tekrar Oyna & Menü */}
        <div className="grid grid-cols-2 gap-2">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onPlayAgain}
            className="py-3.5 rounded-2xl bg-gradient-to-r from-fuchsia-600 via-pink-600 to-rose-600 hover:from-fuchsia-500 hover:to-pink-500 text-white font-black text-xs sm:text-sm shadow-xl shadow-fuchsia-950/40 flex items-center justify-center gap-2 cursor-pointer transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            <span>{language === 'tr' ? 'Yeni Seans' : 'New Session'}</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onReturnMenu}
            className="py-3.5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-stone-300 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer transition-all"
          >
            <Home className="w-4 h-4" />
            <span>{language === 'tr' ? 'Menüye Dön' : 'Main Menu'}</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};
