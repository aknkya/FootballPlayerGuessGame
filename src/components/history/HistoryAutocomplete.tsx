'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Send, X, AlertCircle, Landmark, Flag } from 'lucide-react';
import { HistoricalCharacter } from '@/types/historicalFigure';
import { normalizeText, getHistoricalFlag } from '@/utils/normalize';

interface HistoryAutocompleteProps {
  characters: HistoricalCharacter[];
  onGuess: (char: HistoricalCharacter | string) => void;
  onGiveUp: () => void;
  disabled?: boolean;
  isShaking: boolean;
  wrongGuesses: string[];
}

export const HistoryAutocomplete: React.FC<HistoryAutocompleteProps> = ({
  characters,
  onGuess,
  onGiveUp,
  disabled = false,
  isShaking,
  wrongGuesses,
}) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Filtreleme: İsim ve takma adlar üzerinden normalize edilmiş arama
  const filteredCharacters = useMemo(() => {
    if (!query.trim()) return [];
    const norm = normalizeText(query);
    if (!norm) return [];

    return characters.filter((c) => {
      if (normalizeText(c.name).includes(norm)) return true;
      return c.aliases.some((alias) => normalizeText(alias).includes(norm));
    });
  }, [characters, query]);

  // Dışarı tıklayınca dropdown kapatma
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Tuş kontrolleri
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || filteredCharacters.length === 0) {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleSubmit();
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredCharacters.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredCharacters.length) % filteredCharacters.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredCharacters[selectedIndex]) {
        handleSelect(filteredCharacters[selectedIndex]);
      } else {
        handleSubmit();
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const handleSelect = (character: HistoricalCharacter) => {
    setQuery('');
    setIsOpen(false);
    onGuess(character);
  };

  const handleSubmit = () => {
    if (!query.trim() || disabled) return;
    onGuess(query.trim());
    setQuery('');
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className="w-full max-w-2xl mx-auto my-3 relative px-2">
      {/* Arama ve Tahmin Giriş Kutusu */}
      <motion.div
        animate={isShaking ? { x: [-10, 10, -8, 8, -4, 4, 0] } : {}}
        transition={{ duration: 0.4 }}
        className="relative"
      >
        <div className="relative flex items-center">
          <div className="absolute left-4 text-amber-500/80 pointer-events-none">
            <Search className="w-5 h-5" />
          </div>

          <input
            ref={inputRef}
            type="text"
            value={query}
            disabled={disabled}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
              setSelectedIndex(0);
            }}
            onFocus={() => {
              if (query.trim()) setIsOpen(true);
            }}
            onKeyDown={handleKeyDown}
            placeholder={disabled ? 'Tur bitti...' : 'Tarihi karakteri tahmin et (örn. Atatürk, Einstein, Fatih...)'}
            className="w-full pl-12 pr-28 py-3.5 bg-stone-900/90 border-2 border-amber-500/30 rounded-2xl text-stone-100 placeholder-stone-400 text-sm sm:text-base focus:outline-none focus:border-amber-400 focus:ring-4 focus:ring-amber-500/20 shadow-xl shadow-black/70 backdrop-blur-md transition-all disabled:opacity-50"
          />

          {/* Temizle Butonu */}
          {query && !disabled && (
            <button
              onClick={() => {
                setQuery('');
                setIsOpen(false);
                inputRef.current?.focus();
              }}
              className="absolute right-24 text-stone-400 hover:text-stone-200 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          {/* Tahmin Gönder Butonu */}
          <button
            onClick={handleSubmit}
            disabled={!query.trim() || disabled}
            className="absolute right-2.5 px-4 py-2 bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 text-stone-950 font-black text-xs sm:text-sm rounded-xl flex items-center gap-1.5 shadow-md shadow-amber-900/40 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-all active:scale-95"
          >
            <span>Dene</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </motion.div>

      {/* Otomatik Tamamlama Açılır Listesi */}
      <AnimatePresence>
        {isOpen && filteredCharacters.length > 0 && !disabled && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 left-2 right-2 mt-1.5 max-h-72 overflow-y-auto bg-stone-900/95 border border-amber-500/40 rounded-2xl shadow-2xl shadow-black/80 backdrop-blur-xl divide-y divide-amber-900/20"
          >
            {filteredCharacters.slice(0, 8).map((char, index) => {
              const isSelected = index === selectedIndex;
              const flag = getHistoricalFlag(char.nationality);

              return (
                <div
                  key={char.id}
                  onClick={() => handleSelect(char)}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`flex items-center justify-between px-4 py-3 cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-amber-950/60 text-amber-200'
                      : 'text-stone-200 hover:bg-stone-800/60'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-xl shrink-0" title={char.nationality}>{flag}</span>
                    <div className="truncate">
                      <div className="font-bold text-sm text-stone-100 flex items-center gap-2">
                        <span>{char.name}</span>
                        <span className="text-[10px] font-medium text-amber-400/90 bg-amber-950/50 border border-amber-700/30 px-1.5 py-0.5 rounded-full">
                          {char.era}
                        </span>
                      </div>
                      <div className="text-xs text-stone-400 truncate">
                        {char.title} ({char.years})
                      </div>
                    </div>
                  </div>

                  <span className="text-[11px] font-semibold text-stone-400 shrink-0 ml-2 hidden sm:inline">
                    {char.category}
                  </span>
                </div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hatalı Tahminler Listesi ve Pes Etme Butonu */}
      <div className="flex items-center justify-between gap-2 mt-3 px-1">
        <div className="flex flex-wrap items-center gap-1.5">
          {wrongGuesses.length > 0 && (
            <>
              <span className="text-xs text-rose-400/90 font-bold flex items-center gap-1 mr-1">
                <AlertCircle className="w-3.5 h-3.5" /> Yanlışlar:
              </span>
              {wrongGuesses.map((guess, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 text-xs font-semibold bg-rose-950/50 border border-rose-600/30 text-rose-300 rounded-lg line-through decoration-rose-500/70"
                >
                  {guess}
                </span>
              ))}
            </>
          )}
        </div>

        {!disabled && (
          <button
            onClick={onGiveUp}
            className="text-xs text-stone-400 hover:text-amber-400 underline decoration-stone-600 hover:decoration-amber-400 transition-colors cursor-pointer shrink-0 ml-auto py-1"
          >
            Cevabı Gör (Pas Geç)
          </button>
        )}
      </div>
    </div>
  );
};
