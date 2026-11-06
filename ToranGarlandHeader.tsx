import React, { useState } from 'react';
import { Volume2, VolumeX, Sparkles, Flame } from 'lucide-react';
import { soundEngine } from '../utils/soundEffects';
import { triggerFestiveBurst, ClickAnimationMode } from './FestiveParticleCanvas';

interface ToranGarlandHeaderProps {
  litCount: number;
  totalDiyas: number;
  onLightNextOrAll: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  clickMode: ClickAnimationMode;
  onChangeClickMode: (mode: ClickAnimationMode) => void;
  scrollProgress: number;
}

export const ToranGarlandHeader: React.FC<ToranGarlandHeaderProps> = ({
  litCount,
  totalDiyas,
  onLightNextOrAll,
  soundEnabled,
  onToggleSound,
  clickMode,
  onChangeClickMode,
  scrollProgress,
}) => {
  const [ringingBellIndex, setRingingBellIndex] = useState<number | null>(null);

  const handleBellClick = (idx: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setRingingBellIndex(idx);
    soundEngine.playTempleBell(0.9 + idx * 0.08);
    triggerFestiveBurst({
      type: 'petals',
      x: e.clientX,
      y: e.clientY + 12,
    });
    setTimeout(() => {
      setRingingBellIndex((prev) => (prev === idx ? null : prev));
    }, 850);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 select-none pointer-events-none">
      {/* Scroll Progress Golden Jyoti Thread at very top */}
      <div className="w-full h-[3px] bg-[#130D1C]/80 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[#FF7A00] via-[#F5C542] to-[#D81B60] shadow-[0_0_12px_#F5C542] transition-all duration-150"
          style={{ width: `${Math.max(scrollProgress * 100, 2)}%` }}
        />
      </div>

      {/* Traditional Marigold & Mango Leaf Toran (Bandhanwar) with Clickable Temple Bells */}
      <div className="relative w-full overflow-hidden h-10 sm:h-12 flex justify-center pointer-events-auto">
        <div className="flex items-start justify-between w-full max-w-[1600px] px-2">
          {Array.from({ length: 8 }).map((_, idx) => {
            const isRinging = ringingBellIndex === idx;
            return (
              <div
                key={idx}
                onClick={(e) => handleBellClick(idx, e)}
                title="Click to ring the auspicious Toran Temple Bell & shower marigold petals!"
                className={`group cursor-pointer flex-1 flex flex-col items-center animate-toran ${
                  isRinging ? 'animate-toran-ring' : ''
                }`}
                style={{ animationDelay: `${idx * 0.35}s` }}
              >
                <svg
                  viewBox="0 0 180 58"
                  className="w-full h-10 sm:h-12 overflow-visible drop-shadow-[0_4px_10px_rgba(255,122,0,0.28)]"
                >
                  {/* Mango Leaves (Ashoka Patta) along top cord */}
                  <line x1="0" y1="2" x2="180" y2="2" stroke="#F5C542" strokeWidth="2" />
                  {[22, 56, 90, 124, 158].map((lx, i) => (
                    <path
                      key={i}
                      d={`M${lx - 7},2 Q${lx},18 ${lx},24 Q${lx},18 ${lx + 7},2 Z`}
                      fill="#008B68"
                      stroke="#00C49A"
                      strokeWidth="0.8"
                    />
                  ))}

                  {/* Hanging Marigold Swag Arc */}
                  <path
                    d="M 4,4 Q 90,46 176,4"
                    fill="none"
                    stroke="#FF7A00"
                    strokeWidth="6"
                    strokeDasharray="1 11"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 10,4 Q 90,42 170,4"
                    fill="none"
                    stroke="#F5C542"
                    strokeWidth="4.5"
                    strokeDasharray="1 11"
                    strokeLinecap="round"
                  />

                  {/* Center Hanging Brass Ghanti (Temple Bell) */}
                  <g className="transition-transform duration-300 group-hover:scale-115">
                    <line x1="90" y1="22" x2="90" y2="36" stroke="#F5C542" strokeWidth="1.5" />
                    <circle cx="90" cy="23" r="4.5" fill="#D81B60" stroke="#F5C542" strokeWidth="1" />
                    {/* Bell dome */}
                    <path
                      d="M83,46 L97,46 L94,36 C94,33 86,33 86,36 Z"
                      fill="url(#bellGold)"
                      stroke="#FFFDF5"
                      strokeWidth="0.6"
                    />
                    <circle
                      cx="90"
                      cy="48.5"
                      r="2.4"
                      fill={isRinging ? '#FFFDF5' : '#FF7A00'}
                    />
                  </g>
                  <defs>
                    <linearGradient id="bellGold" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#FFFDF5" />
                      <stop offset="50%" stopColor="#F5C542" />
                      <stop offset="100%" stopColor="#FF7A00" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            );
          })}
        </div>
      </div>

      {/* Floating Glassmorphic Navigation Bar */}
      <div className="max-w-[1380px] mx-auto px-3 sm:px-6 -mt-1 pointer-events-auto">
        <nav
          aria-label="Main Festive Navigation"
          className="royal-glass rounded-full px-3 sm:px-6 py-2.5 flex items-center justify-between gap-2 shadow-[0_12px_40px_rgba(0,0,0,0.75)]"
        >
          {/* Brand Mark */}
          <a
            href="#hero-altar"
            className="flex items-center gap-2.5 group focus:outline-none"
          >
            <div className="relative w-9 h-9 rounded-full bg-gradient-to-br from-[#2B163D] to-[#130D1C] border border-[#F5C542]/40 flex items-center justify-center shadow-[0_0_16px_rgba(255,122,0,0.35)]">
              <svg viewBox="0 0 36 36" className="w-6 h-6 overflow-visible">
                {/* Flame */}
                <path
                  d="M18 4 C14 11, 13 15, 18 19 C23 15, 22 11, 18 4 Z"
                  fill="#FF7A00"
                  className="animate-flame"
                />
                <path
                  d="M18 7 C15.5 12, 15.5 14.5, 18 17.5 C20.5 14.5, 20.5 12, 18 7 Z"
                  fill="#FFFDF5"
                  className="animate-flame-inner"
                />
                {/* Clay Bowl */}
                <path
                  d="M7 20 Q18 31 29 20 L26 18 Q18 22 10 18 Z"
                  fill="#D85627"
                  stroke="#F5C542"
                  strokeWidth="1.2"
                />
              </svg>
            </div>
            <div>
              <span className="block text-[10px] tracking-[0.22em] uppercase text-[#F5C542] font-semibold leading-none">
                शुभ दीपावली
              </span>
              <span className="font-display text-base sm:text-lg tracking-wide text-[#FFF9F0] group-hover:text-[#F5C542] transition-colors">
                Shubh Deepavali
              </span>
            </div>
          </a>

          {/* Navigation Links (Desktop) */}
          <div className="hidden lg:flex items-center gap-6 text-xs uppercase tracking-[0.13em] font-semibold text-[#D4C4B4]">
            <a href="#hero-altar" className="hover:text-[#F5C542] transition-colors">
              Diya Altar
            </a>
            <a href="#sacred-elements" className="hover:text-[#F5C542] transition-colors">
              All Elements
            </a>
            <a href="#panch-parva" className="hover:text-[#F5C542] transition-colors">
              5 Days
            </a>
            <a href="#rangoli-studio" className="hover:text-[#F5C542] transition-colors">
              Rangoli & Crackers
            </a>
            <a href="#shahi-mithai" className="hover:text-[#F5C542] transition-colors">
              Mithai & Puja
            </a>
            <a href="#shubh-sandesh" className="hover:text-[#F5C542] transition-colors">
              Greetings
            </a>
          </div>

          {/* Interactive Controls: Click Effect Selector + Diyas Counter + Sound + CTA */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Click Animation Mode Pill */}
            <div className="hidden sm:flex items-center bg-[#09060E]/80 border border-[#F5C542]/25 rounded-full p-0.5 text-[11px]">
              {(
                [
                  { id: 'phuljhari', label: '✨ Sparkler' },
                  { id: 'atishbazi', label: '🎆 Firework' },
                  { id: 'pushpa', label: '🌸 Petals' },
                  { id: 'grand', label: '🪔 Grand' },
                ] as { id: ClickAnimationMode; label: string }[]
              ).map((m) => (
                <button
                  key={m.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    onChangeClickMode(m.id);
                    triggerFestiveBurst({
                      type:
                        m.id === 'atishbazi'
                          ? 'firework'
                          : m.id === 'pushpa'
                          ? 'petals'
                          : 'sparkler',
                      x: e.clientX,
                      y: e.clientY,
                    });
                  }}
                  className={`px-2.5 py-1 rounded-full transition-all cursor-pointer font-medium ${
                    clickMode === m.id
                      ? 'bg-gradient-to-r from-[#FF7A00] to-[#F5C542] text-[#09060E] font-bold shadow-[0_0_12px_rgba(245,197,66,0.5)]'
                      : 'text-[#D4C4B4] hover:text-[#FFF9F0]'
                  }`}
                  title={`Set global click animation to ${m.label}`}
                >
                  {m.label}
                </button>
              ))}
            </div>

            {/* Live Diyas Lit Pill */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onLightNextOrAll();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#130D1C]/90 border border-[#F5C542]/40 hover:border-[#F5C542] text-xs font-mono-num text-[#FFF9F0] shadow-[0_0_15px_rgba(255,122,0,0.2)] transition-all cursor-pointer"
              title="Click to light a sacred Diya!"
            >
              <Flame
                className={`w-3.5 h-3.5 ${
                  litCount > 0
                    ? 'text-[#FF7A00] fill-[#F5C542] animate-pulse'
                    : 'text-[#9A8678]'
                }`}
              />
              <span className="text-[#D4C4B4] hidden md:inline">Diyas:</span>
              <span className="text-[#F5C542] font-bold">
                {litCount}/{totalDiyas}
              </span>
            </button>

            {/* Sound Chime Toggle */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleSound();
              }}
              aria-label={soundEnabled ? 'Mute festive chimes' : 'Enable festive chimes'}
              title={
                soundEnabled
                  ? 'Festive Temple Bell & Sparkler Chimes: ON'
                  : 'Festive Temple Bell & Sparkler Chimes: OFF'
              }
              className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all cursor-pointer ${
                soundEnabled
                  ? 'bg-[#F5C542]/15 border-[#F5C542]/50 text-[#F5C542]'
                  : 'bg-[#130D1C]/70 border-white/10 text-[#9A8678]'
              }`}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Primary CTA */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onLightNextOrAll();
                triggerFestiveBurst({
                  type: 'sparkler',
                  x: e.clientX,
                  y: e.clientY,
                });
              }}
              className="px-3.5 sm:px-4 py-1.5 rounded-full bg-gradient-to-r from-[#FF7A00] via-[#F5C542] to-[#FF9E2C] text-[#09060E] font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(245,197,66,0.4)] hover:shadow-[0_0_28px_rgba(245,197,66,0.75)] hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{litCount < totalDiyas ? 'Light a Diya' : 'Celebrate!'}</span>
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};
