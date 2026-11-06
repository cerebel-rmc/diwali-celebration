import React, { useState } from 'react';
import { Sparkles, Flame, ArrowDown, Wand2 } from 'lucide-react';
import { soundEngine } from '../utils/soundEffects';
import { triggerFestiveBurst } from './FestiveParticleCanvas';

export interface SacredDiyaItem {
  id: number;
  sanskrit: string;
  name: string;
  blessing: string;
  color: string;
  lit: boolean;
}

interface HeroDiyaAltarProps {
  diyas: SacredDiyaItem[];
  onToggleDiya: (id: number, clientX?: number, clientY?: number) => void;
  onLightAllSequential: () => void;
  scrollY: number;
}

const SKY_LANTERNS = [
  { id: 1, left: '7%', top: '18%', size: 48, speed: 0.18, delay: '0s', wish: 'Prosperity' },
  { id: 2, left: '19%', top: '34%', size: 34, speed: 0.28, delay: '1.5s', wish: 'Harmony' },
  { id: 3, left: '84%', top: '16%', size: 52, speed: 0.22, delay: '0.8s', wish: 'Wisdom' },
  { id: 4, left: '76%', top: '38%', size: 38, speed: 0.32, delay: '2.2s', wish: 'Good Health' },
  { id: 5, left: '12%', top: '62%', size: 30, speed: 0.15, delay: '3.1s', wish: 'Happiness' },
  { id: 6, left: '89%', top: '58%', size: 36, speed: 0.25, delay: '1.9s', wish: 'Success' },
];

export const HeroDiyaAltar: React.FC<HeroDiyaAltarProps> = ({
  diyas,
  onToggleDiya,
  onLightAllSequential,
  scrollY,
}) => {
  const [activeBlessing, setActiveBlessing] = useState<string>(
    'Click any terracotta Diya below to ignite its sacred flame & illuminate the Amavasya night'
  );
  const [boostedLantern, setBoostedLantern] = useState<number | null>(null);

  const litCount = diyas.filter((d) => d.lit).length;
  const illuminationRatio = litCount / diyas.length;

  const handleDiyaClick = (diya: SacredDiyaItem, e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleDiya(diya.id, e.clientX, e.clientY);
    setActiveBlessing(`${diya.sanskrit} (${diya.name}) — "${diya.blessing}"`);
  };

  const handleLanternClick = (lanternId: number, wish: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBoostedLantern(lanternId);
    soundEngine.playTempleBell(1.3);
    triggerFestiveBurst({
      type: 'sparkler',
      x: e.clientX,
      y: e.clientY,
    });
    setActiveBlessing(`🏮 Akashdeep Sky Lantern blessed with "${wish}" ascends into the night!`);
    setTimeout(() => setBoostedLantern(null), 1000);
  };

  return (
    <section
      id="hero-altar"
      className="relative min-h-screen w-full flex flex-col items-center justify-between pt-28 sm:pt-32 pb-14 px-4 sm:px-8 overflow-hidden"
    >
      {/* Dynamic Progressive Ambient Illumination Halo based on how many Diyas are lit */}
      <div
        className="pointer-events-none absolute inset-0 transition-all duration-1000"
        style={{
          background: `
            radial-gradient(circle at 50% 62%, rgba(255, 122, 0, ${
              0.08 + illuminationRatio * 0.26
            }) 0%, rgba(216, 27, 96, ${
            0.05 + illuminationRatio * 0.14
          }) 38%, rgba(9, 6, 14, 0.96) 78%)
          `,
        }}
      />

      {/* Scroll-Driven Rotating Sacred Surya Mandala Watermark */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[540px] sm:w-[760px] h-[540px] sm:h-[760px] opacity-20 transition-opacity duration-700"
        style={{
          opacity: 0.12 + illuminationRatio * 0.22,
          transform: `translate(-50%, -44%) rotate(${scrollY * 0.08}deg) scale(${
            1 + illuminationRatio * 0.08
          })`,
        }}
      >
        <svg viewBox="0 0 400 400" className="w-full h-full">
          <defs>
            <radialGradient id="heroMandalaGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFFDF5" />
              <stop offset="45%" stopColor="#F5C542" />
              <stop offset="80%" stopColor="#FF7A00" />
              <stop offset="100%" stopColor="#D81B60" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle
            cx="200"
            cy="200"
            r="185"
            fill="none"
            stroke="url(#heroMandalaGrad)"
            strokeWidth="1.2"
            strokeDasharray="6 6"
          />
          <circle
            cx="200"
            cy="200"
            r="150"
            fill="none"
            stroke="#F5C542"
            strokeWidth="1"
            strokeOpacity="0.5"
          />
          <circle
            cx="200"
            cy="200"
            r="112"
            fill="none"
            stroke="#FF7A00"
            strokeWidth="1.2"
            strokeDasharray="4 8"
          />
          {Array.from({ length: 16 }).map((_, i) => {
            const deg = (360 / 16) * i;
            return (
              <g key={i} transform={`rotate(${deg} 200 200)`}>
                <path
                  d="M200,20 C216,70 216,120 200,165 C184,120 184,70 200,20 Z"
                  fill="none"
                  stroke="url(#heroMandalaGrad)"
                  strokeWidth="1.2"
                />
                <circle cx="200" cy="36" r="3" fill="#F5C542" />
              </g>
            );
          })}
        </svg>
      </div>

      {/* Parallax Floating Akashdeep (Sky Lanterns) — Clickable! */}
      {SKY_LANTERNS.map((lantern) => {
        const parallaxOffset = -scrollY * lantern.speed;
        const isBoosted = boostedLantern === lantern.id;
        return (
          <div
            key={lantern.id}
            onClick={(e) => handleLanternClick(lantern.id, lantern.wish, e)}
            style={{
              left: lantern.left,
              top: lantern.top,
              transform: `translate3d(0, ${parallaxOffset}px, 0) scale(${
                isBoosted ? 1.28 : 1
              })`,
              transition: 'transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)',
            }}
            title={`Click Akashdeep Sky Lantern (${lantern.wish}) to release a blessing spark!`}
            className="hidden sm:block absolute z-10 cursor-pointer group"
          >
            <div
              className="animate-lantern"
              style={{ animationDelay: lantern.delay }}
            >
              <svg
                width={lantern.size}
                height={lantern.size * 1.45}
                viewBox="0 0 60 88"
                className="overflow-visible drop-shadow-[0_0_20px_rgba(255,122,0,0.65)] group-hover:drop-shadow-[0_0_32px_rgba(245,197,66,0.95)] transition-all"
              >
                {/* Warm Outer Glow */}
                <circle
                  cx="30"
                  cy="36"
                  r="28"
                  fill="rgba(255, 122, 0, 0.22)"
                  className="animate-halo"
                />
                {/* Lantern Dome */}
                <path
                  d="M12,18 C12,6 48,6 48,18 L42,52 C42,56 18,56 18,52 Z"
                  fill="url(#lanternGlow)"
                  stroke="#F5C542"
                  strokeWidth="1.2"
                />
                {/* Decorative Ribs */}
                <path
                  d="M22,10 L24,54 M38,10 L36,54"
                  stroke="#D81B60"
                  strokeWidth="0.9"
                  strokeOpacity="0.6"
                />
                {/* Inner Flame Core */}
                <ellipse cx="30" cy="44" rx="7" ry="10" fill="#FFFDF5" opacity="0.85" />
                {/* Hanging Festive Tassels */}
                <line x1="22" y1="55" x2="20" y2="74" stroke="#F5C542" strokeWidth="1.2" />
                <line x1="30" y1="56" x2="30" y2="82" stroke="#D81B60" strokeWidth="1.5" />
                <line x1="38" y1="55" x2="40" y2="74" stroke="#F5C542" strokeWidth="1.2" />
                <circle cx="30" cy="83" r="2.5" fill="#F5C542" />
                <defs>
                  <linearGradient id="lanternGlow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#D81B60" />
                    <stop offset="45%" stopColor="#FF7A00" />
                    <stop offset="100%" stopColor="#FFFDF5" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        );
      })}

      {/* Centerpiece Editorial Typography & Sanskrit Shloka Badge */}
      <div className="relative z-20 max-w-4xl mx-auto text-center flex flex-col items-center mt-2">
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#130D1C]/90 border border-[#F5C542]/35 text-xs sm:text-sm tracking-[0.18em] uppercase text-[#F5C542] font-semibold mb-5 shadow-[0_0_24px_rgba(245,197,66,0.18)]">
          <span className="w-2 h-2 rounded-full bg-[#FF7A00] animate-ping" />
          <span>तमसो मा ज्योतिर्गमय · Lead Us From Darkness To Light</span>
          <span className="w-2 h-2 rounded-full bg-[#F5C542]" />
        </div>

        <h1
          className="font-display text-gold-shimmer tracking-tight leading-[1.06] mb-4 drop-shadow-[0_6px_30px_rgba(255,122,0,0.32)]"
          style={{ fontSize: 'clamp(2.75rem, 6vw + 0.8rem, 5.4rem)' }}
        >
          SHUBH DEEPAVALI
        </h1>

        <p className="font-serif-editorial italic text-xl sm:text-2xl md:text-3xl text-[#FFF9F0]/95 mb-3">
          The Sacred Festival of Lights, Prosperity &amp; New Beginnings
        </p>

        <p className="max-w-2xl text-sm sm:text-base text-[#D4C4B4] leading-relaxed mb-6">
          Ignite the seven sacred clay <span className="text-[#F5C542] font-medium">Diyas</span> on the ceremonial altar below, paint auspicious <span className="text-[#FF7A00] font-medium">Rangoli</span> mandalas, sparkle eco-friendly <span className="text-[#00C49A] font-medium">Atishbazi</span>, and celebrate the triumph of radiant light over darkness.
        </p>

        {/* Dual Action CTA Bar */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 sm:gap-4 mb-6">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onLightAllSequential();
              triggerFestiveBurst({
                type: 'grand',
                x: e.clientX,
                y: e.clientY,
              });
            }}
            className="group relative px-7 py-3.5 rounded-full bg-gradient-to-r from-[#FF7A00] via-[#F5C542] to-[#FF9E2C] text-[#09060E] font-bold text-sm sm:text-base tracking-wide shadow-[0_0_30px_rgba(245,197,66,0.5)] hover:shadow-[0_0_45px_rgba(255,122,0,0.85)] hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-2.5"
          >
            <Flame className="w-5 h-5 fill-[#09060E] transition-transform group-hover:scale-125" />
            <span>
              {litCount < diyas.length
                ? `Ignite All 7 Sacred Diyas (${litCount}/7)`
                : 'Grand Pushpa Varsha & Fireworks!'}
            </span>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              soundEngine.playFireworkBurst();
              triggerFestiveBurst({ type: 'grand' });
            }}
            className="px-6 py-3.5 rounded-full royal-glass border border-[#F5C542]/45 hover:border-[#F5C542] text-[#FFF9F0] font-semibold text-sm sm:text-base hover:bg-[#F5C542]/15 hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-2"
          >
            <Wand2 className="w-4 h-4 text-[#F5C542]" />
            <span>Launch Sky Atishbazi</span>
          </button>

          <a
            href="#panch-parva"
            className="px-5 py-3.5 rounded-full bg-[#130D1C]/70 border border-white/15 hover:border-[#F5C542]/50 text-[#D4C4B4] hover:text-[#FFF9F0] text-sm font-medium transition-all flex items-center gap-2"
          >
            <span>Explore 5 Days</span>
            <ArrowDown className="w-4 h-4 text-[#F5C542]" />
          </a>
        </div>
      </div>

      {/* Interactive 7-Diya Ceremonial Thali Altar */}
      <div className="relative z-20 w-full max-w-5xl mx-auto mt-1">
        {/* Live Blessing Banner */}
        <div className="mx-auto max-w-2xl mb-5 px-4 py-2 rounded-2xl royal-glass text-center border border-[#F5C542]/30">
          <p className="text-xs sm:text-sm text-[#FFF9F0] font-medium flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-[#F5C542] shrink-0" />
            <span>{activeBlessing}</span>
          </p>
        </div>

        {/* Semi-circular Ceremonial Altar Platform */}
        <div className="relative royal-glass rounded-3xl p-5 sm:p-8 border border-[#F5C542]/30 shadow-[0_25px_70px_rgba(0,0,0,0.8)] overflow-hidden">
          {/* Decorative Brass Corner Borders */}
          <div className="pointer-events-none absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-[#F5C542]/50 rounded-tl-lg" />
          <div className="pointer-events-none absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-[#F5C542]/50 rounded-tr-lg" />
          <div className="pointer-events-none absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-[#F5C542]/50 rounded-bl-lg" />
          <div className="pointer-events-none absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-[#F5C542]/50 rounded-br-lg" />

          {/* 7 Interactive Terracotta Diyas Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4 items-end">
            {diyas.map((diya, index) => {
              const isCenter = index === 3;
              return (
                <button
                  key={diya.id}
                  onClick={(e) => handleDiyaClick(diya, e)}
                  className={`group relative flex flex-col items-center p-3 rounded-2xl transition-all duration-500 cursor-pointer focus:outline-none ${
                    isCenter ? 'col-span-2 sm:col-span-4 lg:col-span-1 lg:-translate-y-3' : ''
                  } ${
                    diya.lit
                      ? 'bg-gradient-to-b from-[#FF7A00]/20 via-[#F5C542]/10 to-transparent border border-[#F5C542]/50 shadow-[0_0_30px_rgba(255,122,0,0.28)]'
                      : 'bg-[#09060E]/45 border border-white/10 hover:border-[#F5C542]/40'
                  }`}
                  aria-label={`${diya.lit ? 'Lit' : 'Unlit'} Diya for ${diya.name} (${
                    diya.sanskrit
                  }). Click to ${diya.lit ? 'send blessing sparks' : 'ignite flame'}.`}
                >
                  {/* Number Badge */}
                  <span className="absolute top-2 right-2.5 text-[10px] font-mono-num text-[#9A8678]">
                    0{index + 1}
                  </span>

                  {/* Intricate Hand-Crafted SVG Terracotta Diya & Multi-Layer Flame */}
                  <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center">
                    {/* Radiant Golden Halo when Lit */}
                    {diya.lit && (
                      <div
                        className="absolute -top-2 w-20 h-20 rounded-full pointer-events-none animate-halo"
                        style={{
                          background:
                            'radial-gradient(circle, rgba(255,253,245,0.65) 0%, rgba(245,197,66,0.45) 40%, rgba(255,122,0,0) 72%)',
                        }}
                      />
                    )}

                    <svg
                      viewBox="0 0 120 115"
                      className="w-full h-full overflow-visible"
                    >
                      {/* Unlit Wick Hint */}
                      {!diya.lit && (
                        <g className="opacity-65 group-hover:opacity-100 transition-opacity">
                          <path
                            d="M58,56 Q60,46 62,43"
                            stroke="#D4C4B4"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            fill="none"
                          />
                          <circle
                            cx="62"
                            cy="42"
                            r="3"
                            fill="#FF7A00"
                            className="animate-ping"
                          />
                        </g>
                      )}

                      {/* Multi-Layered Sacred Flame when Lit */}
                      {diya.lit && (
                        <g className="animate-flame">
                          {/* Outer Saffron Flame Aura */}
                          <path
                            d="M60,8 C44,26 42,42 60,55 C78,42 76,26 60,8 Z"
                            fill="url(#outerFlameGrad)"
                          />
                          {/* Middle Kundan Gold Flame */}
                          <path
                            d="M60,15 C49,29 48,42 60,53 C72,42 71,29 60,15 Z"
                            fill="#F5C542"
                          />
                          {/* Inner White-Hot Sparkler Core */}
                          <path
                            d="M60,24 C54,34 54,43 60,51 C66,43 66,34 60,24 Z"
                            fill="#FFFDF5"
                            className="animate-flame-inner"
                          />
                        </g>
                      )}

                      {/* Diya Oil Surface Shimmer */}
                      <ellipse
                        cx="60"
                        cy="58"
                        rx="36"
                        ry="9"
                        fill={diya.lit ? '#FF9E2C' : '#3B2314'}
                        stroke="#F5C542"
                        strokeWidth="1.2"
                      />

                      {/* Carved Terracotta Clay Bowl Body */}
                      <path
                        d="M18,58 Q60,104 102,58 L94,55 Q60,72 26,55 Z"
                        fill="url(#terracottaGrad)"
                        stroke="#F5C542"
                        strokeWidth="1.5"
                      />

                      {/* Traditional Painted Kundan Dots on Diya Rim */}
                      {[32, 46, 60, 74, 88].map((cx, idx) => (
                        <circle
                          key={idx}
                          cx={cx}
                          cy={idx === 2 ? 77 : idx === 1 || idx === 3 ? 74 : 68}
                          r="2.3"
                          fill={diya.lit ? '#FFFDF5' : '#F5C542'}
                        />
                      ))}

                      {/* Diya Pedestal Base */}
                      <path
                        d="M42,84 L78,84 L84,93 L36,93 Z"
                        fill="#8D3218"
                        stroke="#F5C542"
                        strokeWidth="1"
                      />

                      <defs>
                        <linearGradient id="outerFlameGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#FFFDF5" />
                          <stop offset="35%" stopColor="#F5C542" />
                          <stop offset="85%" stopColor="#FF7A00" />
                          <stop offset="100%" stopColor="#D81B60" />
                        </linearGradient>
                        <linearGradient id="terracottaGrad" x1="0" y1="0" x2="1" y2="1">
                          <stop offset="0%" stopColor="#E05A2B" />
                          <stop offset="50%" stopColor="#B83B14" />
                          <stop offset="100%" stopColor="#6E1E08" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>

                  {/* Diya Blessing Name */}
                  <span className="text-xs font-bold tracking-wider uppercase text-[#F5C542] mt-1">
                    {diya.sanskrit}
                  </span>
                  <span className="font-serif-editorial text-base text-[#FFF9F0] font-semibold">
                    {diya.name}
                  </span>
                  <span
                    className={`mt-1 text-[11px] px-2.5 py-0.5 rounded-full font-medium transition-all ${
                      diya.lit
                        ? 'bg-[#F5C542]/20 text-[#FFFDF5] border border-[#F5C542]/40'
                        : 'bg-white/5 text-[#9A8678] group-hover:text-[#D4C4B4]'
                    }`}
                  >
                    {diya.lit ? '✨ Flame Lit' : 'Click to Light'}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Altar Status Bar */}
          <div className="mt-6 pt-4 border-t border-[#F5C542]/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#D4C4B4]">
            <div className="flex items-center gap-2">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#F5C542] shadow-[0_0_10px_#F5C542]" />
              <span>
                Altar Illumination:{' '}
                <strong className="text-[#F5C542] font-mono-num">
                  {Math.round(illuminationRatio * 100)}%
                </strong>{' '}
                ({litCount} of 7 Sacred Blessings Awakened)
              </span>
            </div>
            <div className="text-[#9A8678] italic">
              Tip: Click anywhere in the sky or switch click effects in the top bar for Phuljhari, Fireworks &amp; Petals!
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
