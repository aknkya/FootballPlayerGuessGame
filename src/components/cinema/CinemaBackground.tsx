'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const CinemaBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Ana Gradient: Derin sinema karanlığı */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#08020f] via-[#0e0518] to-[#060210]" />

      {/* Yıldız parıltıları (küçük noktalar) */}
      {Array.from({ length: 40 }).map((_, i) => (
        <motion.div
          key={`star-${i}`}
          className="absolute rounded-full bg-white"
          style={{
            width: Math.random() * 2 + 1,
            height: Math.random() * 2 + 1,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0.1, 0.6, 0.1],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Projektör ışığı — sol üstten */}
      <motion.div
        className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(168,85,247,0.12) 0%, rgba(168,85,247,0.03) 40%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.6, 1, 0.6],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Projektör ışığı — sağ üstten */}
      <motion.div
        className="absolute -top-20 -right-20 w-[500px] h-[500px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(236,72,153,0.10) 0%, rgba(236,72,153,0.02) 40%, transparent 70%)',
        }}
        animate={{
          scale: [1.05, 1, 1.05],
          opacity: [0.5, 0.9, 0.5],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Alt kırmızı parıltı — sahne ışığı */}
      <motion.div
        className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[900px] h-[400px] rounded-full"
        style={{
          background: 'radial-gradient(ellipse, rgba(220,38,38,0.08) 0%, rgba(220,38,38,0.02) 50%, transparent 80%)',
        }}
        animate={{
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Film şeridi kenarları (sol) */}
      <div className="hidden lg:flex flex-col justify-around absolute left-0 top-0 bottom-0 w-10 opacity-[0.08] pointer-events-none bg-gradient-to-r from-white/5 to-transparent">
        {Array.from({ length: 28 }).map((_, i) => (
          <div key={`l-${i}`} className="mx-auto w-5 h-6 rounded-[2px] border border-purple-300/50 bg-black/60" />
        ))}
      </div>

      {/* Film şeridi kenarları (sağ) */}
      <div className="hidden lg:flex flex-col justify-around absolute right-0 top-0 bottom-0 w-10 opacity-[0.08] pointer-events-none bg-gradient-to-l from-white/5 to-transparent">
        {Array.from({ length: 28 }).map((_, i) => (
          <div key={`r-${i}`} className="mx-auto w-5 h-6 rounded-[2px] border border-purple-300/50 bg-black/60" />
        ))}
      </div>

      {/* Vignette efekti */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.7)_100%)]" />
    </div>
  );
};
