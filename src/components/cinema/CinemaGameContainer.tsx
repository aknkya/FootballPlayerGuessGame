'use client';

import React, { useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { MovieItem, MovieType, Language } from '@/types/movie';
import { CinemaStartMenu } from './CinemaStartMenu';
import { CinemaScoreBoard } from './CinemaScoreBoard';
import { CinemaClueCard } from './CinemaClueCard';
import { CinemaAutocomplete } from './CinemaAutocomplete';
import { CinemaRevealCard } from './CinemaRevealCard';
import { CinemaBackground } from './CinemaBackground';
import { sounds } from '@/utils/audio';
import { isMovieMatch } from '@/utils/normalize';
import rawMovieData from '@/data/kotu-anlatilmis-filmler.json';

const allMovies: MovieItem[] = rawMovieData as unknown as MovieItem[];
// Şimdilik sadece global (yabancı) yapımlar oyuna alınıyor, yerli yapımlar JSON'da saklanıyor
const playableMovies: MovieItem[] = allMovies.filter((m) => m.origin === 'yabanci');

export const CinemaGameContainer: React.FC = () => {
  const [viewMode, setViewMode] = useState<'menu' | 'playing'>('menu');
  const [selectedType, setSelectedType] = useState<MovieType | 'tum'>('tum');
  const [language, setLanguage] = useState<Language>('tr');

  const [activeDeck, setActiveDeck] = useState<MovieItem[]>([]);
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

  // LocalStorage kayıtları yükle (Skorlar & Dil tercihi)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedLang = localStorage.getItem('cinema_language') as Language;
      if (savedLang === 'tr' || savedLang === 'en') setLanguage(savedLang);

      const savedHighScore = localStorage.getItem('sinema_high_score');
      const savedHighStreak = localStorage.getItem('sinema_high_streak');
      const savedTotalGames = localStorage.getItem('sinema_total_games');

      if (savedHighScore) setHighScore(parseInt(savedHighScore, 10) || 0);
      if (savedHighStreak) setHighStreak(parseInt(savedHighStreak, 10) || 0);
      if (savedTotalGames) setTotalGames(parseInt(savedTotalGames, 10) || 0);
    }
  }, []);

  // Dil Değiştirici
  const handleToggleLanguage = useCallback(() => {
    setLanguage((prev) => {
      const next = prev === 'tr' ? 'en' : 'tr';
      if (typeof window !== 'undefined') {
        localStorage.setItem('cinema_language', next);
      }
      return next;
    });
  }, []);

  // Skor ve istatistikleri güncelle
  const updateScoreAndStats = useCallback((addedPoints: number, isWin: boolean) => {
    setScore((prevScore) => {
      const newScore = prevScore + addedPoints;
      if (newScore > highScore) {
        setHighScore(newScore);
        if (typeof window !== 'undefined') {
          localStorage.setItem('sinema_high_score', newScore.toString());
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
            localStorage.setItem('sinema_high_streak', nextStreak.toString());
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
        localStorage.setItem('sinema_total_games', next.toString());
      }
      return next;
    });
  }, [highScore, highStreak]);

  // Oyunu Başlat
  const startGame = useCallback(() => {
    let pool = [...playableMovies];

    if (selectedType !== 'tum') {
      pool = pool.filter((m) => m.type === selectedType);
    }

    // Karıştır (Fisher-Yates)
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }

    setActiveDeck(pool);
    setCurrentIndex(0);
    setRevealedCount(1);
    setScore(0);
    setStreak(0);
    setGameState('playing');
    setWrongGuesses([]);
    setIsShaking(false);
    setViewMode('playing');
  }, [selectedType]);

  const currentMovie = activeDeck[currentIndex] || null;

  // Sıradaki ipucunu aç
  const handleRevealNext = () => {
    if (revealedCount < 5 && gameState === 'playing') {
      setRevealedCount((prev) => prev + 1);
      if (soundEnabled) sounds.playClueUnlock();
    }
  };

  // Tahmin yapıldığında
  const handleGuess = (guessInput: MovieItem | string) => {
    if (gameState !== 'playing' || !currentMovie) return;

    let guessedTitle = '';
    if (typeof guessInput === 'string') {
      guessedTitle = guessInput;
    } else {
      guessedTitle = guessInput.title[language] || guessInput.title.tr;
    }

    // Hem Türkçe hem İngilizce başlık ve tüm takma adlar üzerinden eşleşme kontrolü
    const isMatch = isMovieMatch(
      guessedTitle,
      [currentMovie.title.tr, currentMovie.title.en],
      currentMovie.aliases
    );

    if (isMatch) {
      const basePoints = Math.min(500, revealedCount * 100);
      const streakBonus = streak * 25;
      const totalEarned = basePoints + streakBonus;

      setRoundPoints(totalEarned);
      setGameState('won');
      updateScoreAndStats(totalEarned, true);

      if (soundEnabled) sounds.playGoal();

      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#d946ef', '#ec4899', '#f43f5e', '#fbbf24', '#ffffff'],
        });
      } catch {
        // ignore
      }
    } else {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);

      if (!wrongGuesses.includes(guessedTitle)) {
        setWrongGuesses((prev) => [...prev, guessedTitle]);
      }

      if (soundEnabled) sounds.playMiss();

      if (revealedCount < 5) {
        setRevealedCount((prev) => prev + 1);
      } else {
        if (soundEnabled) sounds.playWhistle();
        setRoundPoints(0);
        updateScoreAndStats(0, false);
        setGameState('lost');
      }
    }
  };

  // Pas geç
  const handleGiveUp = () => {
    if (gameState !== 'playing' || !currentMovie) return;
    setGameState('lost');
    setRoundPoints(0);
    updateScoreAndStats(0, false);
    if (soundEnabled) sounds.playWhistle();
  };

  // Sonraki filme geç
  const handleNextMovie = () => {
    if (currentIndex + 1 < activeDeck.length) {
      setCurrentIndex((prev) => prev + 1);
      setRevealedCount(1);
      setGameState('playing');
      setWrongGuesses([]);
      setIsShaking(false);
    } else {
      setViewMode('menu');
    }
  };

  return (
    <div className="relative min-h-screen text-stone-100 flex flex-col font-sans selection:bg-fuchsia-500/30 selection:text-white">
      <CinemaBackground />

      <div className="relative z-10 flex-1 flex flex-col p-3 sm:p-5 max-w-5xl mx-auto w-full">
        {viewMode === 'menu' ? (
          <CinemaStartMenu
            onStartGame={startGame}
            selectedType={selectedType}
            onSelectType={setSelectedType}
            highScore={highScore}
            highStreak={highStreak}
            totalGames={totalGames}
            language={language}
            onToggleLanguage={handleToggleLanguage}
          />
        ) : (
          <>
            <CinemaScoreBoard
              score={score}
              streak={streak}
              highStreak={highStreak}
              currentRound={currentIndex + 1}
              totalRounds={activeDeck.length}
              soundEnabled={soundEnabled}
              onToggleSound={() => setSoundEnabled((prev) => !prev)}
              onReturnMenu={() => setViewMode('menu')}
              language={language}
              onToggleLanguage={handleToggleLanguage}
            />

            <main className="flex-1 flex flex-col items-center justify-center space-y-4 w-full my-auto">
              {currentMovie && (
                <>
                  <CinemaClueCard
                    clues={currentMovie.clues[language] || currentMovie.clues.tr}
                    revealedCount={revealedCount}
                    onRevealNext={handleRevealNext}
                    isGameOver={gameState !== 'playing'}
                    language={language}
                  />

                  {gameState !== 'playing' ? (
                    <CinemaRevealCard
                      movie={currentMovie}
                      isWon={gameState === 'won'}
                      pointsEarned={roundPoints}
                      revealedCount={revealedCount}
                      onNext={handleNextMovie}
                      language={language}
                    />
                  ) : (
                    <CinemaAutocomplete
                      movies={playableMovies}
                      onGuess={handleGuess}
                      onGiveUp={handleGiveUp}
                      disabled={gameState !== 'playing'}
                      isShaking={isShaking}
                      wrongGuesses={wrongGuesses}
                      language={language}
                    />
                  )}
                </>
              )}
            </main>
          </>
        )}
      </div>
    </div>
  );
};
