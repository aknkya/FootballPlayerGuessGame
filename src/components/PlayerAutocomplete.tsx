'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Send, X, AlertCircle, Shirt } from 'lucide-react';
import { Player } from '@/types/player';
import { normalizeText, getCountryFlag } from '@/utils/normalize';

interface PlayerAutocompleteProps {
  players: Player[];
  onGuess: (player: Player | string) => void;
  onGiveUp: () => void;
  disabled?: boolean;
  isShaking: boolean;
  wrongGuesses: string[];
}

export const PlayerAutocomplete: React.FC<PlayerAutocompleteProps> = ({
  players,
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
  const filteredPlayers = React.useMemo(() => {
    if (!query.trim()) return [];
    const norm = normalizeText(query);
    if (!norm) return [];

    return players.filter((p) => {
      if (normalizeText(p.name).includes(norm)) return true;
      return p.aliases.some((alias) => normalizeText(alias).includes(norm));
    });
  }, [players, query]);

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

  // Tuş kontrolleri (Yukarı, Aşağı, Enter, Esc)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || filteredPlayers.length === 0) {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleSubmit();
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredPlayers.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredPlayers.length) % filteredPlayers.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const selected = filteredPlayers[selectedIndex];
      if (selected) {
        handleSelectPlayer(selected);
      } else {
        handleSubmit();
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const handleSelectPlayer = (player: Player) => {
    setQuery(player.name);
    setIsOpen(false);
    onGuess(player);
    setQuery('');
  };

  const handleSubmit = () => {
    if (!query.trim() || disabled) return;
    // Eğer listeden bir oyuncuyla tam veya yakın eşleşiyorsa onu gönder
    const matched = filteredPlayers[selectedIndex] || filteredPlayers[0];
    if (matched && normalizeText(matched.name).startsWith(normalizeText(query))) {
      onGuess(matched);
    } else {
      onGuess(query.trim());
    }
    setQuery('');
    setIsOpen(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-3" ref={containerRef}>
      {/* Yanlış Tahminler Çipleri */}
      {wrongGuesses.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 px-2">
          <span className="text-xs font-semibold text-rose-400/90 flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5" />
            Kaçan Şutlar:
          </span>
          {wrongGuesses.map((name, i) => (
            <span
              key={i}
              className="text-xs px-2.5 py-0.5 rounded-full bg-rose-950/70 border border-rose-500/30 text-rose-200 line-through"
            >
              {name}
            </span>
          ))}
        </div>
      )}

      {/* Arama ve Tahmin Alanı */}
      <motion.div
        animate={isShaking ? { x: [-10, 10, -8, 8, -4, 4, 0] } : {}}
        transition={{ duration: 0.4 }}
        className="relative"
      >
        <div
          className={`flex items-center gap-2 p-1.5 rounded-2xl border-2 transition-all duration-300 bg-slate-950/80 backdrop-blur-md ${
            isShaking
              ? 'border-rose-500 shadow-xl shadow-rose-950/70 ring-2 ring-rose-500/40'
              : isOpen
              ? 'border-orange-400 shadow-2xl shadow-orange-500/30 ring-2 ring-orange-400/40'
              : 'border-amber-500/80 hover:border-orange-400 shadow-lg shadow-orange-950/40 hover:shadow-orange-500/25'
          }`}
        >
          {/* Sol Arama İkonu */}
          <div className="pl-3 text-amber-400 flex items-center">
            <Search className="w-5 h-5" />
          </div>

          {/* Otomatik Tamamlama Inputu */}
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
            placeholder="Futbolcu adını yazmaya başla... (örn. Messi, Alex, Hagi, Zidane)"
            className="flex-1 bg-transparent text-white placeholder-gray-400 text-sm md:text-base font-semibold px-2 py-2 outline-none disabled:opacity-50"
          />

          {/* Temizle Butonu */}
          {query && (
            <button
              onClick={() => {
                setQuery('');
                setIsOpen(false);
                inputRef.current?.focus();
              }}
              className="p-1 rounded-lg text-amber-400/70 hover:text-amber-200 hover:bg-orange-950/40 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          {/* Tahmin Gönder Butonu */}
          <button
            onClick={handleSubmit}
            disabled={disabled || !query.trim()}
            className="px-5 py-2.5 rounded-xl font-black text-sm tracking-wide bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-400 text-white shadow-lg shadow-orange-600/40 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2 transition-all cursor-pointer"
          >
            <span>ŞUT ÇEK</span>
            <Send className="w-4 h-4" />
          </button>
        </div>

        {/* Otomatik Tamamlama Dropdown */}
        <AnimatePresence>
          {isOpen && filteredPlayers.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.18 }}
              className="absolute left-0 right-0 top-full mt-2 bg-gradient-to-b from-slate-900/98 to-slate-950/98 border border-orange-500/40 rounded-2xl shadow-2xl shadow-black/90 backdrop-blur-xl overflow-hidden z-50 max-h-72 overflow-y-auto"
            >
              <div className="px-3 py-2 text-[11px] font-extrabold text-amber-400/90 border-b border-white/5 uppercase tracking-wider flex justify-between">
                <span>Eşleşen Futbolcular ({filteredPlayers.length})</span>
                <span className="text-gray-400 font-normal">Seçmek için Enter veya Tıkla</span>
              </div>

              {filteredPlayers.map((player, idx) => {
                const isSelected = idx === selectedIndex;
                const flag = getCountryFlag(player.nationality);

                return (
                  <div
                    key={player.id}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    onClick={() => handleSelectPlayer(player)}
                    className={`px-4 py-2.5 flex items-center justify-between gap-3 cursor-pointer transition-colors ${
                      isSelected
                        ? 'bg-orange-500/20 text-white border-l-4 border-orange-400'
                        : 'text-gray-200 hover:bg-slate-800/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {/* Forma / Numara rozeti */}
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center font-black text-xs text-emerald-300">
                        <span className="flex items-center">
                          <Shirt className="w-3.5 h-3.5 mr-0.5" />
                          {player.shirtNumber}
                        </span>
                      </div>

                      <div>
                        <div className="font-bold text-sm text-white flex items-center gap-1.5">
                          <span>{flag}</span>
                          <span>{player.name}</span>
                          {player.status === 'emekli' && (
                            <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 font-normal">
                              Efsane
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-emerald-300/70 flex items-center gap-2">
                          <span>{player.club}</span>
                          <span>•</span>
                          <span>{player.league}</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-xs px-2 py-0.5 rounded-full font-semibold bg-emerald-950/60 border border-emerald-500/20 text-emerald-300">
                        {player.position}
                      </span>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Pes Et Butonu */}
      <div className="flex justify-end px-1">
        <button
          onClick={onGiveUp}
          disabled={disabled}
          className="text-xs text-emerald-400/60 hover:text-rose-400 hover:underline transition-colors cursor-pointer"
        >
          Cevabı Göster (Pes Et)
        </button>
      </div>
    </div>
  );
};
