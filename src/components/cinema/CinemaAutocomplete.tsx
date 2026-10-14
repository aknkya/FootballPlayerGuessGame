'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Send, X, AlertCircle } from 'lucide-react';
import { MovieItem, Language } from '@/types/movie';
import { normalizeText } from '@/utils/normalize';

interface CinemaAutocompleteProps {
  movies: MovieItem[];
  onGuess: (movie: MovieItem | string) => void;
  onGiveUp: () => void;
  disabled?: boolean;
  isShaking: boolean;
  wrongGuesses: string[];
  language: Language;
}

export const CinemaAutocomplete: React.FC<CinemaAutocompleteProps> = ({
  movies,
  onGuess,
  onGiveUp,
  disabled = false,
  isShaking,
  wrongGuesses,
  language,
}) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Filtreleme: Hem Türkçe hem İngilizce başlıklar ve takma adlar taranır
  const filteredMovies = useMemo(() => {
    if (!query.trim()) return [];
    const norm = normalizeText(query);
    if (!norm) return [];

    return movies.filter((m) => {
      if (normalizeText(m.title.tr).includes(norm)) return true;
      if (normalizeText(m.title.en).includes(norm)) return true;
      return m.aliases.some((alias) => normalizeText(alias).includes(norm));
    });
  }, [movies, query]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || filteredMovies.length === 0) {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleSubmit();
      }
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredMovies.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredMovies.length) % filteredMovies.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      handleSelect(filteredMovies[selectedIndex]);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const handleSelect = (movie: MovieItem) => {
    onGuess(movie);
    setQuery('');
    setIsOpen(false);
  };

  const handleSubmit = () => {
    if (!query.trim()) return;
    if (filteredMovies.length > 0) {
      handleSelect(filteredMovies[selectedIndex] || filteredMovies[0]);
    } else {
      onGuess(query.trim());
      setQuery('');
      setIsOpen(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-3">
      {/* Input */}
      <motion.div
        animate={isShaking ? { x: [-12, 12, -10, 10, -5, 5, 0] } : {}}
        transition={{ duration: 0.4 }}
        ref={containerRef}
        className="relative"
      >
        <div className="relative flex items-center">
          <div className="absolute left-4 text-fuchsia-500/50 pointer-events-none">
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
            placeholder={
              language === 'tr'
                ? 'Film veya dizi adını yazın...'
                : 'Type a movie or TV series title...'
            }
            className="w-full pl-12 pr-28 py-4 rounded-2xl bg-white/[0.04] border-2 border-fuchsia-500/30 hover:border-fuchsia-400/50 focus:border-fuchsia-500/70 focus:outline-none focus:ring-4 focus:ring-fuchsia-500/10 text-stone-100 placeholder-stone-600 text-sm sm:text-base font-medium shadow-2xl shadow-fuchsia-950/20 backdrop-blur-sm transition-all"
          />

          <div className="absolute right-2 flex items-center gap-1.5">
            {query && (
              <button
                type="button"
                onClick={() => {
                  setQuery('');
                  inputRef.current?.focus();
                }}
                className="p-1.5 text-stone-500 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              disabled={disabled || !query.trim()}
              onClick={handleSubmit}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-fuchsia-600 to-pink-600 hover:from-fuchsia-500 hover:to-pink-500 disabled:opacity-30 disabled:pointer-events-none text-white text-xs font-black shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>{language === 'tr' ? 'Tahmin' : 'Guess'}</span>
              <Send className="w-3.5 h-3.5" />
            </motion.button>
          </div>
        </div>

        {/* Dropdown */}
        <AnimatePresence>
          {isOpen && filteredMovies.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -6, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.98 }}
              transition={{ duration: 0.15 }}
              className="absolute left-0 right-0 mt-2 max-h-56 overflow-y-auto rounded-2xl bg-[#0f0620]/98 border border-fuchsia-500/30 shadow-2xl backdrop-blur-2xl z-50 divide-y divide-white/[0.04]"
            >
              {filteredMovies.map((movie, idx) => {
                const isSelected = idx === selectedIndex;
                const title = movie.title[language] || movie.title.tr;
                const genre = movie.genre[language] || movie.genre.tr;

                return (
                  <button
                    key={movie.id}
                    type="button"
                    onClick={() => handleSelect(movie)}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`w-full text-left px-4 py-3 flex items-center justify-between gap-3 transition-colors cursor-pointer ${
                      isSelected ? 'bg-fuchsia-500/10 text-white' : 'text-stone-400 hover:bg-white/[0.03]'
                    }`}
                  >
                    <div className="flex items-center gap-3 truncate">
                      <span className="text-xl shrink-0">{movie.type === 'film' ? '🎬' : '📺'}</span>
                      <div className="truncate">
                        <div className="font-bold text-sm text-stone-100 truncate">{title}</div>
                        <div className="text-[10px] text-stone-500 truncate">
                          {genre} • {movie.year}
                        </div>
                      </div>
                    </div>
                    <span className="text-[9px] uppercase font-black px-1.5 py-0.5 rounded bg-white/[0.06] text-stone-500 shrink-0">
                      {movie.type === 'film' ? (language === 'tr' ? 'Film' : 'Movie') : (language === 'tr' ? 'Dizi' : 'Series')}
                    </span>
                  </button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Yanlış Tahminler ve Pas Geç */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-1">
        <div className="flex flex-wrap items-center gap-1.5">
          {wrongGuesses.length > 0 && (
            <span className="text-[10px] text-rose-400/70 font-bold flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              <span>{language === 'tr' ? 'Yanlış:' : 'Wrong:'}</span>
            </span>
          )}
          <AnimatePresence>
            {wrongGuesses.map((guess) => (
              <motion.span
                key={guess}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="px-2 py-0.5 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-300/70 text-[10px] font-semibold line-through"
              >
                {guess}
              </motion.span>
            ))}
          </AnimatePresence>
        </div>

        {!disabled && (
          <button
            type="button"
            onClick={onGiveUp}
            className="text-[11px] text-stone-600 hover:text-stone-300 font-medium underline underline-offset-4 cursor-pointer ml-auto transition-colors"
          >
            {language === 'tr' ? 'Cevabı Göster' : 'Show Answer'}
          </button>
        )}
      </div>
    </div>
  );
};
