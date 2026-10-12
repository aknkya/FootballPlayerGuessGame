'use client';

import React from 'react';

export const HistoryBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden bg-[#0c0a09]">
      {/* Radyal Işık Hüzmeleri (Antik Altın & Gece Göğü) */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-gradient-to-b from-amber-500/10 via-amber-700/5 to-transparent rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-20 w-[500px] h-[500px] bg-gradient-to-tr from-amber-900/15 to-transparent rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -right-20 w-[500px] h-[500px] bg-gradient-to-tl from-yellow-700/10 to-transparent rounded-full blur-3xl" />

      {/* Antik Usturlap / Çember Izgarası (Astrolabe / Orbit SVG) */}
      <svg
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] opacity-[0.06] text-amber-300 animate-[spin_180s_linear_infinite]"
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="200" cy="200" r="190" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
        <circle cx="200" cy="200" r="160" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="200" cy="200" r="130" stroke="currentColor" strokeWidth="1" strokeDasharray="8 6" />
        <circle cx="200" cy="200" r="90" stroke="currentColor" strokeWidth="1" />
        <circle cx="200" cy="200" r="40" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
        <line x1="200" y1="0" x2="200" y2="400" stroke="currentColor" strokeWidth="1" />
        <line x1="0" y1="200" x2="400" y2="200" stroke="currentColor" strokeWidth="1" />
        <line x1="60" y1="60" x2="340" y2="340" stroke="currentColor" strokeWidth="0.7" strokeDasharray="5 5" />
        <line x1="340" y1="60" x2="60" y2="340" stroke="currentColor" strokeWidth="0.7" strokeDasharray="5 5" />
      </svg>

      {/* İnce Yıldız/Toz Efektleri */}
      <div 
        className="absolute inset-0 opacity-20 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:24px_24px]"
      />

      {/* Kenar Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(12,10,9,0.85)_100%)]" />
    </div>
  );
};
