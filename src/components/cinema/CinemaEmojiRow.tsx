'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle } from 'lucide-react';
import { Language } from '@/types/movie';
import { getEmojiDescription, parseEmojiString } from '@/utils/emojiMap';

interface CinemaEmojiRowProps {
  emojiString: string;
  language: Language;
  size?: 'md' | 'lg';
  showHelperHint?: boolean;
  className?: string;
}

export const CinemaEmojiRow: React.FC<CinemaEmojiRowProps> = ({
  emojiString,
  language,
  size = 'lg',
  showHelperHint = false,
  className = '',
}) => {
  const emojis = parseEmojiString(emojiString);
  const [activeTooltipIndex, setActiveTooltipIndex] = useState<number | null>(null);

  const fontSizeClass = size === 'lg' ? 'text-3xl sm:text-4xl' : 'text-2xl sm:text-3xl';
  const paddingClass = size === 'lg' ? 'p-2 sm:p-2.5' : 'p-1.5 sm:p-2';

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      {/* Emojiler Dizilimi */}
      <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2.5 py-2">
        {emojis.map((emoji, idx) => {
          const description = getEmojiDescription(emoji, language);
          const isTouchActive = activeTooltipIndex === idx;

          return (
            <div
              key={idx}
              className="relative group inline-flex items-center justify-center"
              onMouseEnter={() => setActiveTooltipIndex(idx)}
              onMouseLeave={() => setActiveTooltipIndex(null)}
              onClick={() => setActiveTooltipIndex(isTouchActive ? null : idx)}
            >
              {/* Emoji Butonu / Kapsayıcısı */}
              <button
                type="button"
                className={`${fontSizeClass} ${paddingClass} rounded-xl bg-white/[0.03] hover:bg-white/[0.09] border border-white/[0.05] hover:border-fuchsia-500/40 transition-all duration-200 transform hover:scale-125 hover:-translate-y-1 active:scale-95 cursor-pointer shadow-sm hover:shadow-lg hover:shadow-fuchsia-500/20 select-none flex items-center justify-center`}
                title={`${emoji} — ${description}`}
                aria-label={`${emoji}: ${description}`}
              >
                <span className="drop-shadow-md leading-none">{emoji}</span>
              </button>

              {/* Tooltip (Hover & Dokunma Açıklaması) */}
              <AnimatePresence>
                {(activeTooltipIndex === idx) && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.9 }}
                    transition={{ duration: 0.15 }}
                    className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2.5 z-50 pointer-events-none"
                  >
                    <div className="relative bg-stone-900/95 border border-fuchsia-500/50 shadow-2xl shadow-black/80 px-2.5 py-1.5 rounded-xl text-center backdrop-blur-md whitespace-nowrap min-w-max">
                      {/* Üst Başlık & Emoji */}
                      <div className="flex items-center justify-center gap-1.5">
                        <span className="text-sm leading-none">{emoji}</span>
                        <span className="text-xs font-black text-stone-100 tracking-wide">
                          {description}
                        </span>
                      </div>

                      {/* Aşağı Gösteren Ok */}
                      <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[1px] w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-fuchsia-500/50" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Küçük İpucu / Yardımcı Bilgi */}
      {showHelperHint && (
        <div className="flex items-center gap-1.5 mt-1 text-[11px] font-medium text-stone-400/80 bg-white/[0.02] px-2.5 py-1 rounded-full border border-white/[0.05]">
          <HelpCircle className="w-3 h-3 text-cyan-400" />
          <span>
            {language === 'tr'
              ? 'Emojilerin ne anlama geldiğini görmek için üzerlerine gelin'
              : 'Hover or tap on any emoji to reveal its description'}
          </span>
        </div>
      )}
    </div>
  );
};
