'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import confetti from 'canvas-confetti';
import { HistoricalCharacter, CharacterDifficulty } from '@/types/historicalFigure';
import { HistoryStartMenu } from './HistoryStartMenu';
import { HistoryScoreBoard } from './HistoryScoreBoard';
import { HistoryClueCard } from './HistoryClueCard';
import { HistoryAutocomplete } from './HistoryAutocomplete';
import { HistoryRevealCard } from './HistoryRevealCard';
import { HistoryBackground } from './HistoryBackground';
import { sounds } from '@/utils/audio';
import { isPlayerMatch } from '@/utils/normalize';
import rawHistoryData from '@/data/tarihi-karakterler.json';

const allCharacters: HistoricalCharacter[] = rawHistoryData as HistoricalCharacter[];

export const HistoryGameContainer: React.FC = () => {
  const [viewMode, setViewMode] = useState<'menu' | 'playing'>('menu');
  const [selectedCategory, setSelectedCategory] = useState<string>('tum');
  const [selectedDifficulty, setSelectedDifficulty] = useState<CharacterDifficulty | 'tum'>('tum');

  const [activeDeck, setActiveDeck] = useState<HistoricalCharacter[]>([]);
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
      const savedHighScore = localStorage.getItem('tarih_high_score');
      const savedHighStreak = localStorage.getItem('tarih_high_streak');
      const savedTotalGames = localStorage.getItem('tarih_total_games');

      if (savedHighScore) setHighScore(parseInt(savedHighScore, 10) || 0);
      if (savedHighStreak) setHighStreak(parseInt(savedHighStreak, 10) || 0);
      if (savedTotalGames) setTotalGames(parseInt(savedTotalGames, 10) || 0);
    }
  }, []);

  // Skor ve istatistikleri güncelle
  const updateScoreAndStats = useCallback((addedPoints: number, isWin: boolean) => {
    setScore((prevScore) => {
      const newScore = prevScore + addedPoints;
      if (newScore > highScore) {
        setHighScore(newScore);
        if (typeof window !== 'undefined') {
          localStorage.setItem('tarih_high_score', newScore.toString());
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
            localStorage.setItem('tarih_high_streak', nextStreak.toString());
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
        localStorage.setItem('tarih_total_games', next.toString());
      }
      return next;
    });
  }, [highScore, highStreak]);

  // Kategoriye ve zorluğa göre deste oluşturup karıştırma
  const startGame = useCallback(() => {
    let pool = [...allCharacters];

    if (selectedCategory === 'bilim') {
      pool = pool.filter(c => 
        c.category.includes('Bilim') || 
        c.category.includes('Mucit') || 
        c.category.includes('Uzay') || 
        c.category.includes('Matematik')
      );
    } else if (selectedCategory === 'lider') {
      pool = pool.filter(c => 
        c.category.includes('Lider') || 
        c.category.includes('Komutan') || 
        c.category.includes('Hükümdar') || 
        c.category.includes('Kraliçe') || 
        c.category.includes('İmparator') || 
        c.category.includes('Devlet')
      );
    } else if (selectedCategory === 'sanat') {
      pool = pool.filter(c => 
        c.category.includes('Sanat') || 
        c.category.includes('Felsefe') || 
        c.category.includes('Edebiyat') || 
        c.category.includes('Müzik') || 
        c.category.includes('Mimarlık')
      );
    }

    if (selectedDifficulty !== 'tum') {
      pool = pool.filter(c => c.difficulty === selectedDifficulty);
    }

    // Karıştır (Fisher-Yates)
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }

    setActiveDeck(pool);
    setCurrentIndex(0);
    setRevealedCount(1);
    setGameState('playing');
    setWrongGuesses([]);
    setIsShaking(false);
    setViewMode('playing');
  }, [selectedCategory, selectedDifficulty]);

  const currentCharacter = activeDeck[currentIndex] || null;

  // Sıradaki ipucunu aç
  const handleRevealNext = () => {
    if (revealedCount < 5 && gameState === 'playing') {
      setRevealedCount((prev) => prev + 1);
      if (soundEnabled) sounds.playClueUnlock();
    }
  };

  // Tahmin yapıldığında
  const handleGuess = (guessInput: HistoricalCharacter | string) => {
    if (gameState !== 'playing' || !currentCharacter) return;

    let guessedName = typeof guessInput === 'string' ? guessInput : guessInput.name;

    const isMatch = isPlayerMatch(
      guessedName,
      currentCharacter.name,
      currentCharacter.aliases
    );

    if (isMatch) {
      // Doğru tahmin! Puan hesapla
      const basePoints = Math.max(100, 600 - revealedCount * 100);
      const streakBonus = streak * 25;
      const totalEarned = basePoints + streakBonus;

      setRoundPoints(totalEarned);
      setGameState('won');
      updateScoreAndStats(totalEarned, true);

      if (soundEnabled) sounds.playGoal();

      // Konfeti patlat
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#f59e0b', '#fbbf24', '#d97706', '#ffffff']
        });
      } catch {
        // ignore
      }
    } else {
      // Hatalı tahmin!
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);

      if (!wrongGuesses.includes(guessedName)) {
        setWrongGuesses((prev) => [...prev, guessedName]);
      }

      if (soundEnabled) sounds.playMiss();

      // Otomatik sonraki ipucunu aç (Futbol modundaki gibi)
      if (revealedCount < 5) {
        setRevealedCount((prev) => prev + 1);
      } else {
        // 5 ipucu da açıktı ve yine bilemedi -> Kaybetti
        if (soundEnabled) sounds.playWhistle();
        setRoundPoints(0);
        updateScoreAndStats(0, false);
        setGameState('lost');
      }
    }
  };

  // Pas geç / Cevabı gör
  const handleGiveUp = () => {
    if (gameState !== 'playing' || !currentCharacter) return;
    setGameState('lost');
    setRoundPoints(0);
    updateScoreAndStats(0, false);
    if (soundEnabled) sounds.playWhistle();
  };

  // Sonraki karaktere geç
  const handleNextCharacter = () => {
    if (currentIndex + 1 < activeDeck.length) {
      setCurrentIndex((prev) => prev + 1);
      setRevealedCount(1);
      setGameState('playing');
      setWrongGuesses([]);
      setIsShaking(false);
    } else {
      // Deste bitti, menüye dön
      setViewMode('menu');
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between relative overflow-x-hidden text-stone-100 p-2 sm:p-4">
      <HistoryBackground />

      {viewMode === 'menu' ? (
        <HistoryStartMenu
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          selectedDifficulty={selectedDifficulty}
          onSelectDifficulty={setSelectedDifficulty}
          onStartGame={startGame}
          highScore={highScore}
          highStreak={highStreak}
          totalGames={totalGames}
          soundEnabled={soundEnabled}
          onToggleSound={() => setSoundEnabled((prev) => !prev)}
        />
      ) : (
        <div className="w-full flex flex-col items-center flex-1">
          {/* Üst Skor Tablosu */}
          <HistoryScoreBoard
            score={score}
            streak={streak}
            highStreak={highStreak}
            currentRound={currentIndex + 1}
            totalRounds={activeDeck.length}
            soundEnabled={soundEnabled}
            onToggleSound={() => setSoundEnabled((prev) => !prev)}
            onReturnMenu={() => setViewMode('menu')}
          />

          {currentCharacter && (
            <div className="w-full max-w-4xl flex flex-col items-center flex-1 justify-center py-2">
              {/* İpucu Kartları */}
              <HistoryClueCard
                clues={currentCharacter.clues}
                revealedCount={revealedCount}
                onRevealNext={handleRevealNext}
                isGameOver={gameState !== 'playing'}
              />

              {/* Tahmin Kutusu veya Karakter Açıklama Kartı */}
              {gameState === 'playing' ? (
                <HistoryAutocomplete
                  characters={allCharacters}
                  onGuess={handleGuess}
                  onGiveUp={handleGiveUp}
                  disabled={gameState !== 'playing'}
                  isShaking={isShaking}
                  wrongGuesses={wrongGuesses}
                />
              ) : (
                <HistoryRevealCard
                  character={currentCharacter}
                  isWon={gameState === 'won'}
                  pointsEarned={roundPoints}
                  revealedCount={revealedCount}
                  onNext={handleNextCharacter}
                />
              )}
            </div>
          )}
        </div>
      )}

      {/* Alt Bilgi */}
      <footer className="text-center text-[11px] text-stone-500 py-2">
        Tarihi Karakter Tahmin Oyunu • Bilim, Liderlik ve Felsefe Dolu 50 Karakter
      </footer>
    </div>
  );
};
