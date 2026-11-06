import React, { useState } from 'react';
import { Palette, Sparkles, RotateCcw, Shuffle, Flame, Zap } from 'lucide-react';
import { ScrollReveal } from '../hooks/useScrollAnimations';
import { soundEngine } from '../utils/soundEffects';
import { triggerFestiveBurst } from './FestiveParticleCanvas';

export interface RangoliZoneColors {
  outerScallop: string;
  peacockRing: string;
  kalashDiamond: string;
  outerLotus: string;
  innerChakra: string;
  innerLotus: string;
  binduCore: string;
}

const GULAL_SWATCHES = [
  { name: 'Kumkum Magenta', hex: '#D81B60' },
  { name: 'Kundan Gold', hex: '#F5C542' },
  { name: 'Marigold Saffron', hex: '#FF7A00' },
  { name: 'Peacock Emerald', hex: '#00C49A' },
  { name: 'Royal Neel', hex: '#7C4DFF' },
  { name: 'Sindoor Coral', hex: '#FF3D00' },
  { name: 'Gulabi Rose', hex: '#FF4081' },
  { name: 'Chandan Ivory', hex: '#FFF9F0' },
];

const RANGOLI_PRESETS: { name: string; colors: RangoliZoneColors }[] = [
  {
    name: 'Royal Kundan',
    colors: {
      outerScallop: '#D81B60',
      peacockRing: '#FF7A00',
      kalashDiamond: '#F5C542',
      outerLotus: '#D81B60',
      innerChakra: '#00C49A',
      innerLotus: '#FF7A00',
      binduCore: '#FFF9F0',
    },
  },
  {
    name: 'Vrindavan Peacock',
    colors: {
      outerScallop: '#00C49A',
      peacockRing: '#7C4DFF',
      kalashDiamond: '#F5C542',
      outerLotus: '#00C49A',
      innerChakra: '#FF4081',
      innerLotus: '#F5C542',
      binduCore: '#FFF9F0',
    },
  },
  {
    name: 'Kumkum Sindoor',
    colors: {
      outerScallop: '#FF3D00',
      peacockRing: '#D81B60',
      kalashDiamond: '#FF7A00',
      outerLotus: '#F5C542',
      innerChakra: '#D81B60',
      innerLotus: '#FF3D00',
      binduCore: '#F5C542',
    },
  },
];

interface RangoliAndCrackerStudioProps {
  rangoliColors: RangoliZoneColors;
  onChangeRangoliColors: React.Dispatch<React.SetStateAction<RangoliZoneColors>>;
}

export const RangoliAndCrackerStudio: React.FC<RangoliAndCrackerStudioProps> = ({
  rangoliColors,
  onChangeRangoliColors,
}) => {
  const [selectedColor, setSelectedColor] = useState<string>('#F5C542');
  const [bouncingZone, setBouncingZone] = useState<keyof RangoliZoneColors | null>(null);
  const [cornerDiyasLit, setCornerDiyasLit] = useState<boolean>(true);
  const [slowSpin, setSlowSpin] = useState<boolean>(false);

  // Interactive Cracker Playground State
  const [activeCracker, setActiveCracker] = useState<
    'anar' | 'chakri' | 'phuljhari' | 'rocket' | null
  >('anar');
  const [crackerIgnited, setCrackerIgnited] = useState<boolean>(false);

  const handleZoneClick = (
    zone: keyof RangoliZoneColors,
    e: React.MouseEvent<SVGElement>
  ) => {
    e.stopPropagation();
    onChangeRangoliColors((prev) => ({
      ...prev,
      [zone]: selectedColor,
    }));
    setBouncingZone(zone);
    soundEngine.playRangoliChime();
    triggerFestiveBurst({
      type: 'petals',
      x: e.clientX,
      y: e.clientY,
    });
    setTimeout(() => {
      setBouncingZone((prev) => (prev === zone ? null : prev));
    }, 480);
  };

  const handleRandomizeRangoli = (e: React.MouseEvent) => {
    e.stopPropagation();
    const pick = () =>
      GULAL_SWATCHES[Math.floor(Math.random() * GULAL_SWATCHES.length)].hex;
    onChangeRangoliColors({
      outerScallop: pick(),
      peacockRing: pick(),
      kalashDiamond: pick(),
      outerLotus: pick(),
      innerChakra: pick(),
      innerLotus: pick(),
      binduCore: pick(),
    });
    soundEngine.playFireworkBurst();
    triggerFestiveBurst({
      type: 'sparkler',
      x: e.clientX,
      y: e.clientY,
    });
  };

  const handleIgniteCracker = (
    type: 'anar' | 'chakri' | 'phuljhari' | 'rocket',
    e: React.MouseEvent
  ) => {
    e.stopPropagation();
    setActiveCracker(type);
    setCrackerIgnited(true);
    soundEngine.playFireworkBurst();
    triggerFestiveBurst({
      type: type === 'anar' || type === 'phuljhari' ? 'sparkler' : 'firework',
      x: e.clientX,
      y: e.clientY - 30,
    });
  };

  return (
    <section
      id="rangoli-studio"
      className="relative py-20 sm:py-28 px-4 sm:px-8 max-w-[1320px] mx-auto"
    >
      <ScrollReveal className="text-center max-w-3xl mx-auto mb-14">
        <span className="inline-block text-xs sm:text-sm uppercase tracking-[0.22em] text-[#F5C542] font-semibold mb-3">
          रंगोली कला एवं आतिशबाज़ी · Interactive Art &amp; Sparkler Studio
        </span>
        <h2
          className="font-display text-gold-shimmer mb-4"
          style={{ fontSize: 'clamp(2rem, 3.5vw + 0.5rem, 3.25rem)' }}
        >
          Paint Sacred Rangoli &amp; Sparkle Eco-Atishbazi
        </h2>
        <p className="text-[#D4C4B4] text-sm sm:text-base leading-relaxed">
          Select a vibrant <span className="text-[#D81B60] font-semibold">Gulal pigment</span> below and click any ring of the geometric lotus mandala to fill it with color, or ignite traditional <span className="text-[#F5C542] font-semibold">Anar, Chakri &amp; Phuljhari</span> sparklers.
        </p>
      </ScrollReveal>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left 7 Columns: Interactive Rangoli Mandala Studio */}
        <ScrollReveal direction="left" className="lg:col-span-7 h-full">
          <div className="royal-glass rounded-3xl p-6 sm:p-8 h-full flex flex-col justify-between border border-[#F5C542]/35 relative overflow-hidden">
            {/* Top Studio Header & Presets */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#D81B60]/20 border border-[#D81B60]/50 flex items-center justify-center text-[#F5C542]">
                  <Palette className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display text-xl text-[#FFF9F0]">
                    Sanskar Bharti Rangoli Canvas
                  </h3>
                  <p className="text-xs text-[#9A8678]">
                    Click any concentric petal ring on the mandala to paint
                  </p>
                </div>
              </div>

              {/* Preset & Action Buttons */}
              <div className="flex flex-wrap items-center gap-2">
                {RANGOLI_PRESETS.map((preset) => (
                  <button
                    key={preset.name}
                    onClick={(e) => {
                      e.stopPropagation();
                      onChangeRangoliColors(preset.colors);
                      soundEngine.playRangoliChime();
                    }}
                    className="px-2.5 py-1 rounded-lg bg-[#09060E]/75 border border-[#F5C542]/25 hover:border-[#F5C542] text-[11px] text-[#D4C4B4] hover:text-[#FFF9F0] transition-all cursor-pointer"
                  >
                    {preset.name}
                  </button>
                ))}
                <button
                  onClick={handleRandomizeRangoli}
                  className="px-3 py-1 rounded-lg bg-gradient-to-r from-[#D81B60] to-[#FF7A00] text-white text-xs font-semibold flex items-center gap-1 hover:opacity-95 transition-all cursor-pointer shadow-[0_0_15px_rgba(216,27,96,0.4)]"
                  title="Randomize Rangoli Colors"
                >
                  <Shuffle className="w-3.5 h-3.5" />
                  <span>Surprise</span>
                </button>
              </div>
            </div>

            {/* Interactive SVG Mandala Canvas Stage */}
            <div className="relative my-2 py-4 rounded-2xl bg-[#09060E]/75 border border-[#F5C542]/20 flex items-center justify-center overflow-hidden">
              {/* 4 Corner Glowing Diyas on the Rangoli */}
              {cornerDiyasLit &&
                [
                  'top-3 left-3',
                  'top-3 right-3',
                  'bottom-3 left-3',
                  'bottom-3 right-3',
                ].map((pos, i) => (
                  <div
                    key={i}
                    onClick={(e) => {
                      e.stopPropagation();
                      soundEngine.playDiyaIgnite(i);
                      triggerFestiveBurst({
                        type: 'sparkler',
                        x: e.clientX,
                        y: e.clientY,
                      });
                    }}
                    title="Click Corner Rangoli Diya for blessing sparks!"
                    className={`absolute ${pos} w-11 h-11 rounded-full bg-[#FF7A00]/15 border border-[#F5C542]/40 flex items-center justify-center cursor-pointer shadow-[0_0_20px_rgba(255,122,0,0.45)] hover:scale-110 transition-transform`}
                  >
                    <Flame className="w-5 h-5 text-[#F5C542] fill-[#FF7A00] animate-flame" />
                  </div>
                ))}

              <svg
                viewBox="0 0 400 400"
                className={`w-72 h-72 sm:w-88 sm:h-88 select-none cursor-pointer drop-shadow-[0_0_28px_rgba(245,197,66,0.22)] ${
                  slowSpin ? 'animate-[spin_28s_linear_infinite]' : ''
                }`}
              >
                {/* Zone 1: Outer 16-Petal Sanskar Bharti Scallop Border */}
                <g
                  onClick={(e) => handleZoneClick('outerScallop', e)}
                  className={`transition-transform hover:opacity-95 ${
                    bouncingZone === 'outerScallop' ? 'animate-ring-bounce' : ''
                  }`}
                >
                  <circle
                    cx="200"
                    cy="200"
                    r="182"
                    fill={rangoliColors.outerScallop}
                    fillOpacity="0.22"
                    stroke={rangoliColors.outerScallop}
                    strokeWidth="3"
                    strokeDasharray="6 4"
                  />
                  {Array.from({ length: 16 }).map((_, i) => (
                    <g key={i} transform={`rotate(${i * 22.5} 200 200)`}>
                      <path
                        d="M200,12 C214,28 214,48 200,62 C186,48 186,28 200,12 Z"
                        fill={rangoliColors.outerScallop}
                        stroke="#FFFDF5"
                        strokeWidth="1.2"
                      />
                      <circle cx="200" cy="24" r="2.8" fill="#FFFDF5" />
                    </g>
                  ))}
                </g>

                {/* Zone 2: 12-Fold Peacock Feather Arch Ring */}
                <g
                  onClick={(e) => handleZoneClick('peacockRing', e)}
                  className={bouncingZone === 'peacockRing' ? 'animate-ring-bounce' : ''}
                >
                  <circle
                    cx="200"
                    cy="200"
                    r="146"
                    fill={rangoliColors.peacockRing}
                    stroke="#FFFDF5"
                    strokeWidth="1.8"
                  />
                  {Array.from({ length: 12 }).map((_, i) => (
                    <g key={i} transform={`rotate(${i * 30} 200 200)`}>
                      <circle
                        cx="200"
                        cy="68"
                        r="8"
                        fill="#09060E"
                        stroke="#FFFDF5"
                        strokeWidth="1.2"
                      />
                      <circle
                        cx="200"
                        cy="68"
                        r="4"
                        fill={rangoliColors.outerScallop}
                      />
                    </g>
                  ))}
                </g>

                {/* Zone 3: 8-Point Ashtalakshmi Star / Kalash Diamond */}
                <g
                  onClick={(e) => handleZoneClick('kalashDiamond', e)}
                  className={bouncingZone === 'kalashDiamond' ? 'animate-ring-bounce' : ''}
                >
                  {Array.from({ length: 8 }).map((_, i) => (
                    <g key={i} transform={`rotate(${i * 45} 200 200)`}>
                      <polygon
                        points="200,68 232,140 200,165 168,140"
                        fill={rangoliColors.kalashDiamond}
                        stroke="#09060E"
                        strokeWidth="1.5"
                      />
                    </g>
                  ))}
                </g>

                {/* Zone 4: 12-Petal Blooming Mahalakshmi Lotus Ring */}
                <g
                  onClick={(e) => handleZoneClick('outerLotus', e)}
                  className={bouncingZone === 'outerLotus' ? 'animate-ring-bounce' : ''}
                >
                  {Array.from({ length: 12 }).map((_, i) => (
                    <g key={i} transform={`rotate(${i * 30 + 15} 200 200)`}>
                      <path
                        d="M200,88 C220,115 220,145 200,175 C180,145 180,115 200,88 Z"
                        fill={rangoliColors.outerLotus}
                        stroke="#FFFDF5"
                        strokeWidth="1.4"
                      />
                    </g>
                  ))}
                </g>

                {/* Zone 5: Sacred Geometric Inner Chakra */}
                <g
                  onClick={(e) => handleZoneClick('innerChakra', e)}
                  className={bouncingZone === 'innerChakra' ? 'animate-ring-bounce' : ''}
                >
                  <circle
                    cx="200"
                    cy="200"
                    r="76"
                    fill={rangoliColors.innerChakra}
                    stroke="#FFFDF5"
                    strokeWidth="2"
                  />
                  <circle
                    cx="200"
                    cy="200"
                    r="66"
                    fill="none"
                    stroke="#09060E"
                    strokeWidth="2"
                    strokeDasharray="5 5"
                  />
                </g>

                {/* Zone 6: 8-Petal Inner Kamal */}
                <g
                  onClick={(e) => handleZoneClick('innerLotus', e)}
                  className={bouncingZone === 'innerLotus' ? 'animate-ring-bounce' : ''}
                >
                  {Array.from({ length: 8 }).map((_, i) => (
                    <g key={i} transform={`rotate(${i * 45} 200 200)`}>
                      <path
                        d="M200,136 C214,155 214,178 200,196 C186,178 186,155 200,136 Z"
                        fill={rangoliColors.innerLotus}
                        stroke="#FFFDF5"
                        strokeWidth="1.2"
                      />
                    </g>
                  ))}
                </g>

                {/* Zone 7: Central Surya Bindu Medallion */}
                <g
                  onClick={(e) => handleZoneClick('binduCore', e)}
                  className={bouncingZone === 'binduCore' ? 'animate-ring-bounce' : ''}
                >
                  <circle
                    cx="200"
                    cy="200"
                    r="28"
                    fill={rangoliColors.binduCore}
                    stroke="#09060E"
                    strokeWidth="2"
                  />
                  <circle cx="200" cy="200" r="12" fill="#FF7A00" />
                  <circle cx="200" cy="200" r="5" fill="#FFFDF5" />
                </g>
              </svg>
            </div>

            {/* Gulal Pigment Swatch Bar & Toggles */}
            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between text-xs text-[#D4C4B4]">
                <span className="font-semibold uppercase tracking-wider text-[#F5C542]">
                  Select Gulal Pigment Swatch:
                </span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setCornerDiyasLit((prev) => !prev);
                    }}
                    className="text-xs text-[#F5C542] hover:underline cursor-pointer"
                  >
                    {cornerDiyasLit ? '🪔 Corner Diyas: ON' : '🪔 Corner Diyas: OFF'}
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSlowSpin((prev) => !prev);
                    }}
                    className="text-xs text-[#00C49A] hover:underline cursor-pointer"
                  >
                    {slowSpin ? '🌀 Spin: ON' : '🌀 Spin: OFF'}
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                {GULAL_SWATCHES.map((swatch) => {
                  const isSelected = selectedColor === swatch.hex;
                  return (
                    <button
                      key={swatch.hex}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedColor(swatch.hex);
                        soundEngine.playSparklerClick();
                      }}
                      title={swatch.name}
                      className={`group flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-white/15 border-2 border-[#FFFDF5] scale-105 shadow-[0_0_16px_rgba(245,197,66,0.45)] text-[#FFF9F0]'
                          : 'bg-[#09060E]/70 border border-white/15 text-[#D4C4B4] hover:border-white/40'
                      }`}
                    >
                      <span
                        className="w-4 h-4 rounded-full border border-white/40 shrink-0"
                        style={{ backgroundColor: swatch.hex }}
                      />
                      <span className="hidden sm:inline">{swatch.name.split(' ')[0]}</span>
                    </button>
                  );
                })}

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onChangeRangoliColors(RANGOLI_PRESETS[0].colors);
                  }}
                  className="ml-auto px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-xs text-[#9A8678] hover:text-[#FFF9F0] flex items-center gap-1 cursor-pointer"
                  title="Reset Rangoli"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Right 5 Columns: Interactive Eco-Atishbazi (Firecracker Simulator) */}
        <ScrollReveal direction="right" delay={120} className="lg:col-span-5 h-full">
          <div className="royal-glass rounded-3xl p-6 sm:p-8 h-full flex flex-col justify-between border border-[#F5C542]/35 relative overflow-hidden">
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[#FF7A00]/20 border border-[#FF7A00]/50 flex items-center justify-center text-[#F5C542]">
                    <Zap className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl text-[#FFF9F0]">
                      Eco-Atishbazi Sparkler Stage
                    </h3>
                    <p className="text-xs text-[#9A8678]">
                      Click any traditional cracker below to ignite
                    </p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-[#00C49A]/20 border border-[#00C49A]/40 text-[#00C49A] text-[11px] font-semibold">
                  Zero-Smoke Digital
                </span>
              </div>

              {/* 4 Cracker Selector Tabs */}
              <div className="grid grid-cols-2 gap-2.5 mb-5">
                {[
                  {
                    id: 'anar',
                    title: '🎇 Anar Fountain',
                    sub: 'Golden Flowerpot',
                  },
                  {
                    id: 'chakri',
                    title: '🌀 Zameen Chakri',
                    sub: 'Spinning Ground Wheel',
                  },
                  {
                    id: 'phuljhari',
                    title: '✨ Phuljhari Wand',
                    sub: 'Hand Sparkler Star',
                  },
                  {
                    id: 'rocket',
                    title: '🚀 Sky Atishbazi',
                    sub: 'Aerial Starburst',
                  },
                ].map((c) => {
                  const isCurrent = activeCracker === c.id;
                  return (
                    <button
                      key={c.id}
                      onClick={(e) =>
                        handleIgniteCracker(
                          c.id as 'anar' | 'chakri' | 'phuljhari' | 'rocket',
                          e
                        )
                      }
                      className={`p-3 rounded-2xl text-left border transition-all cursor-pointer ${
                        isCurrent
                          ? 'bg-gradient-to-br from-[#FF7A00]/25 to-[#D81B60]/25 border-[#F5C542] shadow-[0_0_20px_rgba(245,197,66,0.25)]'
                          : 'bg-[#09060E]/60 border-white/10 hover:border-[#F5C542]/40'
                      }`}
                    >
                      <div className="text-xs sm:text-sm font-bold text-[#FFF9F0]">
                        {c.title}
                      </div>
                      <div className="text-[11px] text-[#9A8678]">{c.sub}</div>
                    </button>
                  );
                })}
              </div>

              {/* Cracker Animation Stage */}
              <div
                onClick={(e) =>
                  handleIgniteCracker(activeCracker || 'anar', e)
                }
                title="Click stage to ignite extra sparks!"
                className="relative h-64 rounded-2xl bg-[#09060E]/90 border border-[#F5C542]/25 flex flex-col items-center justify-center p-4 cursor-pointer overflow-hidden group"
              >
                {/* Ambient Stage Glow */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-45 transition-opacity"
                  style={{
                    background:
                      'radial-gradient(circle at 50% 60%, rgba(255, 122, 0, 0.35), rgba(216, 27, 96, 0.15), transparent 72%)',
                  }}
                />

                {/* ANAR FOUNTAIN STAGE */}
                {activeCracker === 'anar' && (
                  <svg viewBox="0 0 200 180" className="w-48 h-48 overflow-visible">
                    {/* Erupting Golden Fountain Sparks */}
                    {[
                      { d: 'M100,95 Q70,35 35,20', color: '#F5C542' },
                      { d: 'M100,95 Q85,25 65,10', color: '#FFFDF5' },
                      { d: 'M100,95 Q100,15 100,5', color: '#FF7A00' },
                      { d: 'M100,95 Q115,25 135,10', color: '#FFFDF5' },
                      { d: 'M100,95 Q130,35 165,20', color: '#D81B60' },
                    ].map((arc, i) => (
                      <path
                        key={i}
                        d={arc.d}
                        fill="none"
                        stroke={arc.color}
                        strokeWidth="3"
                        strokeDasharray="4 6"
                        className="animate-pulse"
                      />
                    ))}
                    {[42, 68, 100, 132, 158, 82, 118].map((sx, idx) => (
                      <circle
                        key={idx}
                        cx={sx}
                        cy={18 + (idx % 3) * 14}
                        r="3.5"
                        fill={idx % 2 === 0 ? '#FFFDF5' : '#F5C542'}
                        className="animate-ping"
                        style={{ animationDuration: `${0.9 + idx * 0.15}s` }}
                      />
                    ))}
                    {/* Conical Foil-Wrapped Anar Body */}
                    <polygon
                      points="100,92 132,162 68,162"
                      fill="url(#anarConeGrad)"
                      stroke="#F5C542"
                      strokeWidth="2"
                    />
                    <polygon
                      points="84,126 116,126 122,140 78,140"
                      fill="#F5C542"
                    />
                    <circle cx="100" cy="92" r="7" fill="#FFFDF5" className="animate-ping" />
                    <defs>
                      <linearGradient id="anarConeGrad" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#D81B60" />
                        <stop offset="50%" stopColor="#FF7A00" />
                        <stop offset="100%" stopColor="#7C4DFF" />
                      </linearGradient>
                    </defs>
                  </svg>
                )}

                {/* ZAMEEN CHAKRI STAGE */}
                {activeCracker === 'chakri' && (
                  <svg viewBox="0 0 200 180" className="w-48 h-48 overflow-visible">
                    <g
                      className="animate-chakri"
                      style={{ transformOrigin: '100px 90px' }}
                    >
                      <circle
                        cx="100"
                        cy="90"
                        r="68"
                        fill="none"
                        stroke="#F5C542"
                        strokeWidth="3.5"
                        strokeDasharray="10 8"
                      />
                      <circle
                        cx="100"
                        cy="90"
                        r="50"
                        fill="none"
                        stroke="#00C49A"
                        strokeWidth="4"
                        strokeDasharray="12 6"
                      />
                      <circle
                        cx="100"
                        cy="90"
                        r="32"
                        fill="none"
                        stroke="#D81B60"
                        strokeWidth="4.5"
                        strokeDasharray="8 6"
                      />
                      {Array.from({ length: 8 }).map((_, i) => (
                        <line
                          key={i}
                          x1="100"
                          y1="90"
                          x2={100 + Math.cos((i * Math.PI) / 4) * 76}
                          y2={90 + Math.sin((i * Math.PI) / 4) * 76}
                          stroke="#FFFDF5"
                          strokeWidth="2"
                          strokeDasharray="4 4"
                        />
                      ))}
                      <circle cx="100" cy="90" r="14" fill="#FFFDF5" stroke="#FF7A00" strokeWidth="3" />
                    </g>
                  </svg>
                )}

                {/* PHULJHARI HAND SPARKLER STAGE */}
                {activeCracker === 'phuljhari' && (
                  <svg viewBox="0 0 200 180" className="w-48 h-48 overflow-visible">
                    {/* Stick */}
                    <line
                      x1="40"
                      y1="155"
                      x2="135"
                      y2="55"
                      stroke="#D4C4B4"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                    {/* Radiating Starburst */}
                    <g transform="translate(125, 65)">
                      {Array.from({ length: 16 }).map((_, i) => {
                        const angle = (i * Math.PI * 2) / 16;
                        const len = i % 2 === 0 ? 48 : 28;
                        return (
                          <line
                            key={i}
                            x1="0"
                            y1="0"
                            x2={Math.cos(angle) * len}
                            y2={Math.sin(angle) * len}
                            stroke={i % 2 === 0 ? '#FFFDF5' : '#F5C542'}
                            strokeWidth="2.5"
                            strokeDasharray="3 3"
                          />
                        );
                      })}
                      <circle cx="0" cy="0" r="10" fill="#FFFDF5" className="animate-ping" />
                      <circle cx="0" cy="0" r="14" fill="#F5C542" opacity="0.7" />
                    </g>
                  </svg>
                )}

                {/* SKY ROCKET ATISHBAZI STAGE */}
                {activeCracker === 'rocket' && (
                  <svg viewBox="0 0 200 180" className="w-48 h-48 overflow-visible">
                    <g transform="translate(100, 72)">
                      {Array.from({ length: 20 }).map((_, i) => {
                        const angle = (i * Math.PI * 2) / 20;
                        return (
                          <g key={i}>
                            <line
                              x1="0"
                              y1="0"
                              x2={Math.cos(angle) * 65}
                              y2={Math.sin(angle) * 65}
                              stroke={
                                i % 3 === 0
                                  ? '#D81B60'
                                  : i % 3 === 1
                                  ? '#00C49A'
                                  : '#F5C542'
                              }
                              strokeWidth="2.2"
                              strokeDasharray="4 4"
                            />
                            <circle
                              cx={Math.cos(angle) * 65}
                              cy={Math.sin(angle) * 65}
                              r="3.2"
                              fill="#FFFDF5"
                              className="animate-ping"
                            />
                          </g>
                        );
                      })}
                      <circle cx="0" cy="0" r="9" fill="#FFFDF5" />
                    </g>
                  </svg>
                )}

                <span className="relative z-10 mt-1 text-[11px] font-semibold uppercase tracking-widest text-[#F5C542] group-hover:scale-105 transition-transform">
                  {crackerIgnited
                    ? '✨ Sparkling! Click stage for more bursts ✨'
                    : 'Click stage or buttons above to ignite!'}
                </span>
              </div>
            </div>

            {/* Bottom Grand Firework Trigger */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                soundEngine.playFireworkBurst();
                triggerFestiveBurst({ type: 'grand' });
              }}
              className="mt-5 w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-[#FF7A00] via-[#F5C542] to-[#D81B60] text-[#09060E] font-bold text-sm uppercase tracking-wider shadow-[0_0_24px_rgba(255,122,0,0.45)] hover:shadow-[0_0_36px_rgba(245,197,66,0.75)] hover:scale-[1.02] active:scale-98 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 fill-[#09060E]" />
              <span>Ignite Full-Screen Grand Atishbazi</span>
            </button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
