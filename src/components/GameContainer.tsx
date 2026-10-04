'use client';

import React, { useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { Player, Difficulty } from '@/types/player';
import { StartMenu } from './StartMenu';
import { ScoreBoard } from './ScoreBoard';
import { ClueCard } from './ClueCard';
import { PlayerAutocomplete } from './PlayerAutocomplete';
import { PlayerRevealCard } from './PlayerRevealCard';
import { FootballPitchBackground } from './FootballPitchBackground';
import { sounds } from '@/utils/audio';
import { isPlayerMatch } from '@/utils/normalize';
import rawPlayersData from '@/data/oyuncular.json';

const allPlayers: Player[] = rawPlayersData as Player[];

export const GameContainer: React.FC = () => {
  // Ekran durumu: 'menu' (başlama menüsü) veya 'playing' (oyun ekranı)
  const [viewMode, setViewMode] = useState<'menu' | 'playing'>('menu');

  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | 'tum'>('tum');
  const [activeDeck, setActiveDeck] = useState<Player[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [revealedCount, setRevealedCount] = useState(1);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [highStreak, setHighStreak] = useState(0);
  const [totalGames, setTotalGames] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [gameState, setGameState] = useState<'playing' | 'won' | 'lost'>('playing');
  const [isShaking, setIsShaking] = useState(false);
  const [wrongGuesses, setWrongGuesses] = useState<string[]>([]);
  const [roundPoints, setRoundPoints] = useState(0);

  // LocalStorage'dan kayıtlı skorları yükle
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedHighScore = localStorage.getItem('futbol_high_score');
      const savedHighStreak = localStorage.getItem('futbol_high_streak');
      const savedTotalGames = localStorage.getItem('futbol_total_games');

      if (savedHighScore) setHighScore(parseInt(savedHighScore, 10) || 0);
      if (savedHighStreak) setHighStreak(parseInt(savedHighStreak, 10) || 0);
      if (savedTotalGames) setTotalGames(parseInt(savedTotalGames, 10) || 0);
    }
  }, []);

  // Skor güncellendiğinde yüksek skor kontrolü ve kaydı
  const updateScoreAndStats = useCallback((addedPoints: number, isWin: boolean) => {
    setScore((prevScore) => {
      const newScore = prevScore + addedPoints;
      if (newScore > highScore) {
        setHighScore(newScore);
        if (typeof window !== 'undefined') {
          localStorage.setItem('futbol_high_score', newScore.toString());
        }
      }
      return newScore;
    });

    if (isWin) {
      setStreak((prevStreak) => {
        const nextStreak = prevStreak + 1;
        if (nextStreak > highStreak) {
          setHighStreak(nextStreak);
          if (typeof window !== 'undefined') {
            localStorage.setItem('futbol_high_streak', nextStreak.toString());
          }
        }
        return nextStreak;
      });
    } else {
      setStreak(0);
    }

    setTotalGames((prev) => {
      const next = prev + 1;
      if (typeof window !== 'undefined') {
        localStorage.setItem('futbol_total_games', next.toString());
      }
      return next;
    });
  }, [highScore, highStreak]);

  // Zorluğa göre oyuncu havuzu oluştur ve karıştır
  const filterAndShuffle = useCallback((diff: Difficulty | 'tum') => {
    let pool = [...allPlayers];
    if (diff !== 'tum') {
      pool = pool.filter((p) => p.difficulty === diff);
    }
    // Fisher-Yates karıştırma
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    setActiveDeck(pool);
    setCurrentIndex(0);
    setRevealedCount(1);
    setGameState('playing');
    setWrongGuesses([]);
  }, []);

  // Oyuna Başla butonu
  const handleStartGame = () => {
    sounds.playWhistle();
    setScore(0);
    setStreak(0);
    filterAndShuffle(selectedDifficulty);
    setViewMode('playing');
  };

  // Menüye Dön
  const handleReturnMenu = () => {
    setViewMode('menu');
  };

  const currentPlayer: Player | undefined = activeDeck[currentIndex];

  const handleToggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    sounds.enabled = next;
  };

  // Konfeti patlaması
  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 110,
        spread: 75,
        origin: { y: 0.6 },
        colors: ['#10b981', '#34d399', '#f59e0b', '#fbbf24', '#ffffff'],
      });
    } catch {
      // ignore
    }
  };

  // İpucu açma
  const handleRevealNext = () => {
    if (revealedCount < 5 && gameState === 'playing') {
      sounds.playClueUnlock();
      setRevealedCount((prev) => prev + 1);
    }
  };

  // Tahmin yapma
  const handleGuess = (guess: Player | string) => {
    if (!currentPlayer || gameState !== 'playing') return;

    let isMatch = false;
    let guessDisplay = '';

    if (typeof guess === 'string') {
      guessDisplay = guess;
      isMatch = isPlayerMatch(guess, currentPlayer.name, currentPlayer.aliases);
    } else {
      guessDisplay = guess.name;
      isMatch = guess.id === currentPlayer.id;
    }

    if (isMatch) {
      // Doğru Tahmin! GOOOL!
      sounds.playGoal();
      triggerConfetti();

      // Puan hesabı:
      const basePoints = Math.max(100, 600 - revealedCount * 100);
      const streakBonus = streak * 25;
      const totalEarned = basePoints + streakBonus;

      setRoundPoints(totalEarned);
      updateScoreAndStats(totalEarned, true);
      setGameState('won');
    } else {
      // Yanlış Tahmin!
      sounds.playMiss();
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);

      if (!wrongGuesses.includes(guessDisplay)) {
        setWrongGuesses((prev) => [...prev, guessDisplay]);
      }

      // Otomatik sonraki ipucunu aç
      if (revealedCount < 5) {
        setRevealedCount((prev) => prev + 1);
      } else {
        // 5 ipucu da açıktı ve hala bilemedi -> Kaybetti
        sounds.playWhistle();
        setRoundPoints(0);
        updateScoreAndStats(0, false);
        setGameState('lost');
      }
    }
  };

  // Pes Etme
  const handleGiveUp = () => {
    if (gameState !== 'playing') return;
    sounds.playWhistle();
    setRoundPoints(0);
    updateScoreAndStats(0, false);
    setGameState('lost');
  };

  // Sıradaki oyuncuya geç
  const handleNextPlayer = () => {
    sounds.playWhistle();
    if (currentIndex + 1 < activeDeck.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Deste bitti, yeniden karıştır
      filterAndShuffle(selectedDifficulty);
    }
    setRevealedCount(1);
    setGameState('playing');
    setWrongGuesses([]);
  };

  return (
    <div className="min-h-screen relative flex flex-col justify-between py-6 px-4 md:px-8 text-white select-none">
      <FootballPitchBackground />

      <main className="flex-1 flex flex-col items-center justify-center max-w-4xl mx-auto w-full">
        {/* Ekran 1: Başlama Menüsü */}
        {viewMode === 'menu' ? (
          <StartMenu
            selectedDifficulty={selectedDifficulty}
            onSelectDifficulty={(diff) => setSelectedDifficulty(diff)}
            onStartGame={handleStartGame}
            highScore={highScore}
            highStreak={highStreak}
            totalGames={totalGames}
            soundEnabled={soundEnabled}
            onToggleSound={handleToggleSound}
          />
        ) : (
          /* Ekran 2: Oyun Alanı */
          currentPlayer && (
            <div className="w-full flex flex-col items-center">
              {/* Skor Tablosu ve Ayarlar */}
              <ScoreBoard
                score={score}
                streak={streak}
                highStreak={highStreak}
                currentRound={currentIndex + 1}
                totalRounds={activeDeck.length}
                soundEnabled={soundEnabled}
                onToggleSound={handleToggleSound}
                selectedDifficulty={selectedDifficulty}
                onSelectDifficulty={(diff) => {
                  setSelectedDifficulty(diff);
                  filterAndShuffle(diff);
                }}
                onReturnMenu={handleReturnMenu}
              />

              {gameState === 'playing' ? (
                <div className="w-full space-y-6">
                  {/* İpuçları Listesi */}
                  <ClueCard
                    clues={currentPlayer.clues}
                    revealedCount={revealedCount}
                    onRevealNext={handleRevealNext}
                    isGameOver={false}
                  />

                  {/* Otomatik Tamamlamalı Tahmin Kutusu */}
                  <PlayerAutocomplete
                    players={allPlayers}
                    onGuess={handleGuess}
                    onGiveUp={handleGiveUp}
                    disabled={false}
                    isShaking={isShaking}
                    wrongGuesses={wrongGuesses}
                  />
                </div>
              ) : (
                /* Futbolcu Açılma / Sonuç Kartı Ekranı */
                <PlayerRevealCard
                  player={currentPlayer}
                  isWon={gameState === 'won'}
                  pointsEarned={roundPoints}
                  revealedCount={revealedCount}
                  onNext={handleNextPlayer}
                />
              )}
            </div>
          )
        )}
      </main>

      {/* Alt Bilgi */}
      <footer className="text-center text-xs text-emerald-400/60 mt-8 py-2">
        ⚽ Futbolcu Tahmin Oyunu • 20 Efsane Futbolcu • Next.js & Tailwind CSS
      </footer>
    </div>
  );
};
