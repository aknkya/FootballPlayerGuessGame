# 🎬 Badly Explained Movies & TV Shows

> **Iconic movies and TV shows summarized in the most absurd, hilarious, and ironic ways. Can you identify the title through a 5-step clue chain before running out of lives?**

---

## 🌟 Key Features

- **🧩 5-Step Inverted Clue Chain (500 pts → 100 pts)**:
  - 🧩 **Clue 1 (500 pts) — Emoji Cipher:** An iconic emoji sequence hinting at the plot and characters.
  - 💬 **Clue 2 (400 pts) — Legendary Quote:** Memorable quotes etched into cinema history.
  - 🤪 **Clue 3 (300 pts) — Badly Explained Plot:** The most ridiculous, hilarious, and twisted plot summary.
  - ⚠️ **Clue 4 (200 pts) — Ironic Detail & Warning:** Quirky trivia, scene warnings, and tongue-in-cheek spoilers.
  - 🎬 **Clue 5 (100 pts) — Cast & Credits:** Director, lead cast members, and release year.
  - *Risk vs. Reward: Guessing early yields maximum points, while revealing more clues makes guessing easier but lowers the base reward!*

- **❤️ 3-Heart Life System & Combo Multipliers**:
  - Test your cinema intuition with 3 lives per session.
  - Maintain a winning streak to activate score multipliers (up to **2.5x** combo bonus).
  - Every mistake costs a life — choose your guesses wisely!

- **🏆 End-of-Session Report Card & Cinema Ranks**:
  - 5-movie intense sessions with comprehensive performance analytics.
  - Earn cinematic prestige ranks ranging from *Casual Popcorn Muncher* to *Academy Award Legend*.
  - One-click score card sharing to challenge friends with your performance.

- **🌐 Seamless Bilingual Experience (EN / TR)**:
  - Instant one-click toggle between English and Turkish.
  - All 100 titles feature hand-crafted titles, clues, quotes, and descriptions in both English and Turkish.

- **📦 Massive Pool of 100 Iconic Titles**:
  - **76 Legendary Movies:** *The Godfather, Pulp Fiction, Fight Club, The Matrix, Interstellar, Inception, Titanic, Shrek, Gladiator, Star Wars, Harry Potter, Jurassic Park, Oppenheimer, Barbie, Dune...*
  - **24 Cult TV Series:** *Breaking Bad, Game of Thrones, Stranger Things, Friends, The Office, Sherlock, Peaky Blinders, Squid Game, Money Heist (La Casa de Papel), Dark, Succession, The Sopranos...*
  - **🇹🇷 Turkish Cinema & Cult Classics:** *Hababam Sınıfı, Tosun Paşa, Süt Kardeşler, Çöpçüler Kralı, Şaban Oğlu Şaban, Kibar Feyzo, G.O.R.A., Ezel, Kurtlar Vadisi, Leyla ile Mecnun, Avrupa Yakası, Behzat Ç., Aşk-ı Memnu, Babam ve Oğlum...*

- **⚡ Smart Search & Autocomplete**:
  - Fast, diacritic- and accent-insensitive search engine (e.g., `lotr`, `şrek`, `godfather`, `yildizlararasi`).
  - Searchable by English titles, localized titles, and common international aliases.

- **🎨 Cinematic Neon UI**:
  - Fluid card transitions powered by Framer Motion, neon glows, and atmospheric ambient particles.
  - Shake animations on wrong guesses and full-screen confetti bursts (`canvas-confetti`) on correct solutions.
  - Rich reveal card displaying release year, IMDb rating, genres, director, lead actors, and the badly explained plot quote.

- **🔊 Web Audio API Synthesized Sound Effects**:
  - Pure Web Audio API sound synthesis with zero external audio assets: vintage clapperboard sound, clue unlock chime, wrong guess buzzer, suspense stingers, and victory fanfare.
  - Quick audio mute/unmute toggle in the top bar.

- **📊 High Score & Streak Tracking (LocalStorage)**:
  - High score, longest winning streak, and total games played are stored persistently in the browser.

---

## 🛠️ Tech Stack

| Category | Technology |
| :--- | :--- |
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router, Turbopack) |
| **UI Library** | [React 19](https://react.dev/) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS 4](https://tailwindcss.com/) |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Celebration Effects** | [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti) |
| **Audio Engine** | Web Audio API (Native Procedural Synthesizer) |

---

## 🚀 Getting Started

### Prerequisites

- Node.js (version 18.18.0 or newer recommended)
- npm, yarn, or pnpm

### Installation

Clone the repository and install the dependencies:

```bash
git clone https://github.com/aknkya/badly-explained-movies.git
cd badly-explained-movies
npm install
```

### Running Locally

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to start playing.

### Production Build

To create an optimized production build:

```bash
npm run build
npm run start
```

---

## 📂 Project Structure

```text
├── src/
│   ├── app/
│   │   ├── layout.tsx                # Root layout, fonts, and metadata
│   │   ├── page.tsx                  # Main game page (CinemaGameContainer)
│   │   └── sinema/page.tsx           # /sinema route redirect
│   ├── components/cinema/
│   │   ├── CinemaGameContainer.tsx   # Core game state management, round logic, and session flow
│   │   ├── CinemaStartMenu.tsx       # Start screen, game mode selection, and How to Play modal
│   │   ├── CinemaClueCard.tsx        # 5-step clue chain presentation card
│   │   ├── CinemaAutocomplete.tsx    # Intelligent fuzzy search and guess input field
│   │   ├── CinemaRevealCard.tsx      # Movie reveal and credits summary card
│   │   ├── CinemaReportCard.tsx      # End-of-session performance report card and tier badges
│   │   ├── CinemaScoreBoard.tsx      # Top bar with hearts, combo multiplier, score, and language switch
│   │   └── CinemaBackground.tsx      # Ambient neon lighting and floating particles
│   ├── data/
│   │   └── kotu-anlatilmis-filmler.json # Bilingual movie & TV series database (100 entries)
│   ├── types/
│   │   └── movie.ts                  # MovieItem, CountryInfo, and Language TypeScript interfaces
│   └── utils/
│       ├── audio.ts                  # Web Audio API sound synthesis effects
│       └── normalize.ts              # Diacritic folding and fuzzy title matching
└── scripts/
    ├── build-100-movies.js           # Dataset build and verification script
    └── add-country-info.js           # Country and origin metadata enrichment script
```

---

## 📄 License

This project is open source and available under the [MIT](LICENSE) License.
