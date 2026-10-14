'use client';

import React, { useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { MovieItem, MovieType, Language } from '@/types/movie';
import { CinemaStartMenu } from './CinemaStartMenu';
import { CinemaScoreBoard } from './CinemaScoreBoard';
import { CinemaClueCard } from './CinemaClueCard';
import { CinemaAutocomplete } from './CinemaAutocomplete';
import { CinemaRevealCard } from './CinemaRevealCard';
import { CinemaReportCard, RoundHistoryItem } from './CinemaReportCard';
import { CinemaBackground } from './CinemaBackground';
import { sounds } from '@/utils/audio';
import { isMovieMatch } from '@/utils/normalize';
import rawMovieData from '@/data/kotu-anlatilmis-filmler.json';

const allMovies: MovieItem[] = rawMovieData as unknown as MovieItem[];
// Şimdilik sadece global (yabancı) yapımlar oyuna alınıyor, yerli yapımlar JSON'da saklanıyor
const playableMovies: MovieItem[] = allMovies.filter((m) => m.origin === 'yabanci');

const SESSION_ROUNDS = 5; // 5 filmlik seans

export const CinemaGameContainer: React.FC = () => {
  const [viewMode, setViewMode] = useState<'menu' | 'playing'>('menu');
  const [selectedType, setSelectedType] = useState<MovieType | 'tum'>('tum');
  const [language, setLanguage] = useState<Language>('tr');

  const [activeDeck, setActiveDeck] = useState<MovieItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [revealedCount, setRevealedCount] = useState(1);
  const [hearts, setHearts] = useState(3); // 3 Can
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [highStreak, setHighStreak] = useState(0);
  const [totalGames, setTotalGames] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [gameState, setGameState] = useState<'playing' | 'won' | 'lost' | 'finished'>('playing');
  const [isShaking, setIsShaking] = useState(false);
  const [wrongGuesses, setWrongGuesses] = useState<string[]>([]);
  const [roundPoints, setRoundPoints] = useState(0);
  const [sessionHistory, setSessionHistory] = useState<RoundHistoryItem[]>([]);

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

  // Kombo çarpanını hesapla (Streak'e göre)
  const getMultiplier = (currentStreak: number) => {
    if (currentStreak >= 4) return 2.5;
    if (currentStreak === 3) return 2.0;
    if (currentStreak === 2) return 1.5;
    return 1.0;
  };

  const currentMultiplier = getMultiplier(streak);

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

  // Seansı Başlat (5 Film)
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

    // 5 film seç
    const selectedDeck = pool.slice(0, SESSION_ROUNDS);

    setActiveDeck(selectedDeck);
    setCurrentIndex(0);
    setRevealedCount(1);
    setHearts(3);
    setScore(0);
    setStreak(0);
    setSessionHistory([]);
    setGameState('playing');
    setWrongGuesses([]);
    setIsShaking(false);
    setViewMode('playing');

    if (soundEnabled) sounds.playClapper();
  }, [selectedType, soundEnabled]);

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
      // 1. İpucu: 500P -> 2. İpucu: 400P -> 3. İpucu: 300P -> 4. İpucu: 200P -> 5. İpucu: 100P
      const basePointsMap = [500, 400, 300, 200, 100];
      const basePoints = basePointsMap[revealedCount - 1] || 100;

      // Gelecek streak çarpanı
      const nextStreak = streak + 1;
      const multiplier = getMultiplier(nextStreak);
      const totalEarned = Math.round(basePoints * multiplier);

      setRoundPoints(totalEarned);
      setGameState('won');
      updateScoreAndStats(totalEarned, true);

      // Seans geçmişine kaydet
      setSessionHistory((prev) => [
        ...prev,
        {
          movie: currentMovie,
          isWon: true,
          revealedCount,
          points: totalEarned,
          comboMultiplier: multiplier,
        },
      ]);

      if (soundEnabled) {
        sounds.playCinemaWin();
        if (multiplier > 1) {
          setTimeout(() => sounds.playCombo(nextStreak), 200);
        }
      }

      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#d946ef', '#ec4899', '#f43f5e', '#fbbf24', '#ffffff'],
        });
      } catch {}
    } else {
      // Yanlış Tahmin: 1 Can Azalır
      const remainingHearts = hearts - 1;
      setHearts(remainingHearts);

      if (!wrongGuesses.includes(guessedTitle)) {
        setWrongGuesses((prev) => [...prev, guessedTitle]);
      }

      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);

      if (remainingHearts > 0) {
        // Can kaldı, devam
        if (soundEnabled) sounds.playHeartLoss();
      } else {
        // 3 Can bitti! Film kaçtı
        if (soundEnabled) sounds.playHeartLoss();
        setRoundPoints(0);
        updateScoreAndStats(0, false);
        setGameState('lost');

        setSessionHistory((prev) => [
          ...prev,
          {
            movie: currentMovie,
            isWon: false,
            revealedCount,
            points: 0,
            comboMultiplier: 1.0,
          },
        ]);
      }
    }
  };

  // Pas geç
  const handleGiveUp = () => {
    if (gameState !== 'playing' || !currentMovie) return;
    setHearts(0);
    setGameState('lost');
    setRoundPoints(0);
    updateScoreAndStats(0, false);
    if (soundEnabled) sounds.playHeartLoss();

    setSessionHistory((prev) => [
      ...prev,
      {
        movie: currentMovie,
        isWon: false,
        revealedCount,
        points: 0,
        comboMultiplier: 1.0,
      },
    ]);
  };

  // Sonraki filme geç veya Seansı tamamla
  const handleNextMovie = () => {
    if (currentIndex + 1 < SESSION_ROUNDS && currentIndex + 1 < activeDeck.length) {
      setCurrentIndex((prev) => prev + 1);
      setRevealedCount(1);
      setHearts(3);
      setGameState('playing');
      setWrongGuesses([]);
      setIsShaking(false);
      if (soundEnabled) sounds.playClapper();
    } else {
      // 5 Film tamamlandı! Büyük Final Karnesi
      setGameState('finished');
      if (soundEnabled) sounds.playFinale();
      try {
        confetti({
          particleCount: 150,
          spread: 90,
          origin: { y: 0.5 },
        });
      } catch {}
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
              currentRound={Math.min(currentIndex + 1, SESSION_ROUNDS)}
              totalRounds={SESSION_ROUNDS}
              hearts={hearts}
              comboMultiplier={currentMultiplier}
              soundEnabled={soundEnabled}
              onToggleSound={() => {
                const next = !soundEnabled;
                setSoundEnabled(next);
                sounds.enabled = next;
              }}
              onReturnMenu={() => setViewMode('menu')}
              language={language}
              onToggleLanguage={handleToggleLanguage}
            />

            <main className="flex-1 flex flex-col items-center justify-center space-y-4 w-full my-auto">
              {gameState === 'finished' ? (
                <CinemaReportCard
                  score={score}
                  highScore={highScore}
                  history={sessionHistory}
                  onPlayAgain={startGame}
                  onReturnMenu={() => setViewMode('menu')}
                  language={language}
                />
              ) : currentMovie ? (
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
              ) : null}
            </main>
          </>
        )}
      </div>
    </div>
  );
};
