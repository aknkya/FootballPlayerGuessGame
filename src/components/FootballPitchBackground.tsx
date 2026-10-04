import React from 'react';

export const FootballPitchBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden bg-[#06180e]">
      {/* Stadyum projektör / ışık huzmesi efekti */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[400px] bg-emerald-500/10 blur-[130px] rounded-full" />
      <div className="absolute top-0 right-1/4 w-[600px] h-[400px] bg-emerald-400/10 blur-[140px] rounded-full" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-emerald-600/10 blur-[160px] rounded-full" />

      {/* Çim dokusu çizgileri */}
      <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px]" />

      {/* Futbol Sahası Çizgileri SVG */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10">
        <svg
          viewBox="0 0 1000 650"
          className="w-[1200px] max-w-none text-emerald-400 stroke-current fill-none stroke-[2]"
        >
          {/* Dış Saha Çizgisi */}
          <rect x="50" y="50" width="900" height="550" rx="10" />

          {/* Orta Saha Çizgisi */}
          <line x1="500" y1="50" x2="500" y2="600" />

          {/* Orta Saha Çemberi ve Noktası */}
          <circle cx="500" cy="325" r="90" />
          <circle cx="500" cy="325" r="5" className="fill-current" />

          {/* Sol Ceza Sahası */}
          <rect x="50" y="165" width="165" height="320" />
          <rect x="50" y="240" width="60" height="170" />
          <path d="M 215 275 A 75 75 0 0 1 215 375" />
          <circle cx="170" cy="325" r="4" className="fill-current" />

          {/* Sağ Ceza Sahası */}
          <rect x="785" y="165" width="165" height="320" />
          <rect x="890" y="240" width="60" height="170" />
          <path d="M 785 275 A 75 75 0 0 0 785 375" />
          <circle cx="830" cy="325" r="4" className="fill-current" />

          {/* Korner Yayları */}
          <path d="M 50 70 A 20 20 0 0 1 70 50" />
          <path d="M 930 50 A 20 20 0 0 1 950 70" />
          <path d="M 50 580 A 20 20 0 0 0 70 600" />
          <path d="M 930 600 A 20 20 0 0 0 950 580" />
        </svg>
      </div>
    </div>
  );
};
