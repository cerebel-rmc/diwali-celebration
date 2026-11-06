import React, { useState } from 'react';
import { Sparkles, CheckCircle2 } from 'lucide-react';
import { ScrollReveal } from '../hooks/useScrollAnimations';
import { soundEngine } from '../utils/soundEffects';
import { triggerFestiveBurst } from './FestiveParticleCanvas';

interface DiwaliElementCard {
  id: string;
  sanskritTitle: string;
  title: string;
  symbolism: string;
  description: string;
  actionLabel: string;
  activatedLabel: string;
  accentColor: string;
  burstType: 'sparkler' | 'firework' | 'petals' | 'coins';
}

const DIWALI_ELEMENTS: DiwaliElementCard[] = [
  {
    id: 'panch-aarti',
    sanskritTitle: 'अखण्ड दीप एवं पंच आरती',
    title: 'Mitti Diyas & Panch-Aarti',
    symbolism: 'Knowledge Over Ignorance',
    description:
      'Earthen lamps filled with pure ghee dispel the darkness of Amavasya and awaken inner spiritual light.',
    actionLabel: 'Click to Ignite 5-Wick Aarti',
    activatedLabel: 'Panch-Aarti Flames Blazing!',
    accentColor: '#FF7A00',
    burstType: 'sparkler',
  },
  {
    id: 'lakshmi-paduka',
    sanskritTitle: 'लक्ष्मी चरण पादुका एवं कमल',
    title: 'Lakshmi Charan Paduka',
    symbolism: 'Auspicious Arrival of Grace',
    description:
      'Sacred lotus footprints drawn with rice flour and kumkum at the threshold welcome Goddess Lakshmi home.',
    actionLabel: 'Click to Illuminate Footsteps',
    activatedLabel: 'Lakshmi Paduka Illuminated!',
    accentColor: '#D81B60',
    burstType: 'petals',
  },
  {
    id: 'kuber-kalash',
    sanskritTitle: 'मंगल कलश एवं शुभ-लाभ मुद्रा',
    title: 'Mangal Kalash & Mudras',
    symbolism: 'Immortal Nectar & Prosperity',
    description:
      'A brass vessel crowned with mango leaves, coconut, and Swastika invoking Lord Dhanvantari and Kubera.',
    actionLabel: 'Click to Shower Gold Mudras',
    activatedLabel: 'Suvarna Mudra Showered!',
    accentColor: '#F5C542',
    burstType: 'coins',
  },
  {
    id: 'eco-atishbazi',
    sanskritTitle: 'फुलझड़ी, अनार एवं ज़मीन चकरी',
    title: 'Phuljhari, Anar & Chakri',
    symbolism: 'Jubilant Skies & Celebration',
    description:
      'Dazzling hand sparklers, spinning ground wheels, and golden flowerpots expressing collective festive joy.',
    actionLabel: 'Click to Spin Chakri & Sparkle',
    activatedLabel: 'Chakri Spinning in Full Glory!',
    accentColor: '#00C49A',
    burstType: 'firework',
  },
  {
    id: 'rangoli-alpona',
    sanskritTitle: 'संस्कार भारती रंगोली एवं अल्पना',
    title: 'Sacred Rangoli & Alpona',
    symbolism: 'Cosmic Symmetry & Hospitality',
    description:
      'Intricate geometric lotus mandalas crafted from vibrant gulal pigments and flower petals in the courtyard.',
    actionLabel: 'Click to Bloom Lotus Mandala',
    activatedLabel: 'Mandala Petals in Full Bloom!',
    accentColor: '#D81B60',
    burstType: 'petals',
  },
  {
    id: 'akash-kandil',
    sanskritTitle: 'आकाशदीप एवं उत्सव कंदील',
    title: 'Akashdeep & Festive Kandil',
    symbolism: 'Guiding Ancestral Stars',
    description:
      'Lanterns suspended high above balconies and courtyards to light the heavens during Kartik month.',
    actionLabel: 'Click to Ascend Sky Kandil',
    activatedLabel: 'Akashdeep Glowing Aloft!',
    accentColor: '#FF7A00',
    burstType: 'sparkler',
  },
  {
    id: 'bandhanwar-toran',
    sanskritTitle: 'वंदनवार तोरण एवं पूजा घंटी',
    title: 'Marigold Toran & Temple Bell',
    symbolism: 'Fragrant Threshold Welcome',
    description:
      'Fresh marigold garlands, auspicious mango leaves, and brass bells adorning every home entrance.',
    actionLabel: 'Click to Ring Puja Ghanti',
    activatedLabel: 'Auspicous Bell Reverberating!',
    accentColor: '#F5C542',
    burstType: 'petals',
  },
  {
    id: 'shahi-mithai-bhog',
    sanskritTitle: 'शाही मिठाई एवं नैवेद्य थाली',
    title: 'Naivedya Mithai & Dry Fruits',
    symbolism: 'Sweetness in Every Relationship',
    description:
      'Silver-leaf Kaju Katli, saffron Motichoor Ladoo, and cardamom sweets shared with family and neighbors.',
    actionLabel: 'Click to Offer Festive Bhog',
    activatedLabel: 'Sacred Bhog Offered with Love!',
    accentColor: '#00C49A',
    burstType: 'sparkler',
  },
];

export const SacredDiwaliElements: React.FC = () => {
  const [activeStates, setActiveStates] = useState<Record<string, number>>({});

  const handleElementClick = (item: DiwaliElementCard, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveStates((prev) => ({
      ...prev,
      [item.id]: (prev[item.id] || 0) + 1,
    }));

    if (item.id === 'bandhanwar-toran' || item.id === 'lakshmi-paduka') {
      soundEngine.playTempleBell(1.1);
    } else if (item.id === 'eco-atishbazi') {
      soundEngine.playFireworkBurst();
    } else {
      soundEngine.playRangoliChime();
    }

    triggerFestiveBurst({
      type: item.burstType,
      x: e.clientX,
      y: e.clientY,
    });
  };

  const renderElementArtwork = (id: string, isActivated: boolean, clickCount: number) => {
    switch (id) {
      case 'panch-aarti':
        return (
          <svg viewBox="0 0 120 90" className="w-24 h-20 overflow-visible">
            {/* 5 Flames for Panch-Aarti */}
            {[24, 42, 60, 78, 96].map((fx, i) => (
              <g
                key={i}
                className={isActivated ? 'animate-flame' : ''}
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                <path
                  d={`M${fx},${isActivated ? 12 : 24} C${fx - 6},28 ${fx - 6},38 ${fx},44 C${
                    fx + 6
                  },38 ${fx + 6},28 ${fx},${isActivated ? 12 : 24} Z`}
                  fill={isActivated ? '#FF7A00' : '#F5C542'}
                  opacity={isActivated ? 1 : 0.65}
                />
                {isActivated && (
                  <circle cx={fx} cy={34} r="3.5" fill="#FFFDF5" />
                )}
              </g>
            ))}
            {/* Brass Panch-Aarti Lamp Tray & Pedestal */}
            <path
              d="M14,45 Q60,64 106,45 L98,42 Q60,52 22,42 Z"
              fill="#F5C542"
              stroke="#FFFDF5"
              strokeWidth="1"
            />
            <path d="M52,55 L68,55 L74,78 L46,78 Z" fill="#D87A18" stroke="#F5C542" />
          </svg>
        );

      case 'lakshmi-paduka':
        return (
          <svg viewBox="0 0 120 90" className="w-24 h-20 overflow-visible">
            {/* Blooming Lotus Base */}
            <circle
              cx="60"
              cy="45"
              r={isActivated ? 38 : 30}
              fill="rgba(216, 27, 96, 0.22)"
              stroke="#F5C542"
              strokeWidth="1"
              strokeDasharray="3 3"
              className="transition-all duration-500"
            />
            {/* Left & Right Sacred Footprints (Charan Paduka) */}
            <g
              className="transition-transform duration-500"
              style={{ transform: isActivated ? 'scale(1.12)' : 'scale(1)', transformOrigin: '60px 45px' }}
            >
              {/* Left Foot */}
              <path
                d="M44,32 C38,32 36,44 39,54 C41,62 39,68 45,70 C50,71 52,64 51,55 C50,45 50,32 44,32 Z"
                fill={isActivated ? '#D81B60' : '#9E1946'}
                stroke="#F5C542"
                strokeWidth="1.4"
              />
              {[38, 42, 46, 50, 53].map((tx, idx) => (
                <circle
                  key={idx}
                  cx={tx}
                  cy={27 - (idx === 1 || idx === 2 ? 2 : 0)}
                  r="2"
                  fill="#F5C542"
                />
              ))}
              {/* Right Foot */}
              <path
                d="M76,26 C70,26 70,39 69,49 C68,58 70,65 75,64 C81,62 79,56 81,48 C84,38 82,26 76,26 Z"
                fill={isActivated ? '#D81B60' : '#9E1946'}
                stroke="#F5C542"
                strokeWidth="1.4"
              />
              {[67, 70, 74, 78, 82].map((tx, idx) => (
                <circle
                  key={idx}
                  cx={tx}
                  cy={21 - (idx === 2 || idx === 3 ? 2 : 0)}
                  r="2"
                  fill="#F5C542"
                />
              ))}
            </g>
          </svg>
        );

      case 'kuber-kalash':
        return (
          <svg viewBox="0 0 120 90" className="w-24 h-20 overflow-visible">
            {/* Mango Leaves */}
            <path d="M60,26 Q38,14 30,28 Q45,34 60,28 Z" fill="#00C49A" />
            <path d="M60,26 Q82,14 90,28 Q75,34 60,28 Z" fill="#00C49A" />
            {/* Sacred Coconut (Shree Phal) */}
            <ellipse cx="60" cy="22" rx="12" ry="14" fill="#A85226" stroke="#F5C542" strokeWidth="1.2" />
            {/* Brass Kalash Pot */}
            <path
              d="M44,32 L76,32 L72,40 C86,48 86,72 68,78 L52,78 C34,72 34,48 48,40 Z"
              fill="#F5C542"
              stroke="#FFFDF5"
              strokeWidth="1.2"
            />
            {/* Auspicious Swastika Emblem */}
            <path
              d="M60,48 L60,64 M52,56 L68,56 M60,48 L66,48 M60,64 L54,64 M52,56 L52,50 M68,56 L68,62"
              stroke="#D81B60"
              strokeWidth="2.4"
              strokeLinecap="round"
              fill="none"
            />
            {/* Floating Gold Mudra Coins when clicked */}
            {isActivated && (
              <g>
                <circle cx="28" cy="48" r="5" fill="#FFFDF5" stroke="#F5C542" strokeWidth="1.5" />
                <circle cx="92" cy="44" r="5" fill="#FFFDF5" stroke="#F5C542" strokeWidth="1.5" />
                <circle cx="32" cy="68" r="4" fill="#F5C542" />
                <circle cx="88" cy="66" r="4" fill="#F5C542" />
              </g>
            )}
          </svg>
        );

      case 'eco-atishbazi':
        return (
          <svg viewBox="0 0 120 90" className="w-24 h-20 overflow-visible">
            {/* Spinning Zameen Chakri */}
            <g
              className={isActivated ? 'animate-chakri' : ''}
              style={{ transformOrigin: '42px 52px' }}
            >
              <circle
                cx="42"
                cy="52"
                r="22"
                fill="none"
                stroke="#00C49A"
                strokeWidth="3"
                strokeDasharray="6 4"
              />
              <circle
                cx="42"
                cy="52"
                r="13"
                fill="none"
                stroke="#F5C542"
                strokeWidth="2.5"
                strokeDasharray="4 4"
              />
              <circle cx="42" cy="52" r="5" fill="#D81B60" />
            </g>
            {/* Conical Anar Flowerpot Fountain */}
            <path
              d="M74,76 L98,76 L89,44 L83,44 Z"
              fill="#D81B60"
              stroke="#F5C542"
              strokeWidth="1.4"
            />
            {/* Fountain Sparks */}
            <path
              d="M86,42 Q76,20 68,14 M86,42 Q86,14 86,8 M86,42 Q96,20 104,14"
              stroke={isActivated ? '#FFFDF5' : '#F5C542'}
              strokeWidth={isActivated ? '2.5' : '1.6'}
              strokeDasharray="3 3"
              fill="none"
            />
          </svg>
        );

      case 'rangoli-alpona':
        return (
          <svg
            viewBox="0 0 120 90"
            className="w-24 h-20 overflow-visible transition-transform duration-700"
            style={{ transform: `rotate(${clickCount * 45}deg)` }}
          >
            {Array.from({ length: 8 }).map((_, i) => (
              <g key={i} transform={`rotate(${i * 45} 60 45)`}>
                <path
                  d="M60,12 C67,24 67,34 60,42 C53,34 53,24 60,12 Z"
                  fill={
                    isActivated
                      ? i % 2 === 0
                        ? '#D81B60'
                        : '#00C49A'
                      : i % 2 === 0
                      ? '#FF7A00'
                      : '#F5C542'
                  }
                  stroke="#FFFDF5"
                  strokeWidth="0.8"
                />
              </g>
            ))}
            <circle cx="60" cy="45" r="9" fill="#F5C542" stroke="#FFFDF5" strokeWidth="1.5" />
          </svg>
        );

      case 'akash-kandil':
        return (
          <svg
            viewBox="0 0 120 90"
            className={`w-24 h-20 overflow-visible transition-transform duration-500 ${
              isActivated ? '-translate-y-2 scale-110' : ''
            }`}
          >
            <polygon
              points="60,8 86,32 74,62 46,62 34,32"
              fill="url(#kandilGrad)"
              stroke="#F5C542"
              strokeWidth="1.5"
            />
            <circle cx="60" cy="38" r="9" fill="#FFFDF5" opacity="0.9" />
            <line x1="48" y1="62" x2="44" y2="82" stroke="#00C49A" strokeWidth="2" />
            <line x1="60" y1="62" x2="60" y2="86" stroke="#F5C542" strokeWidth="2.5" />
            <line x1="72" y1="62" x2="76" y2="82" stroke="#D81B60" strokeWidth="2" />
            <defs>
              <linearGradient id="kandilGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#D81B60" />
                <stop offset="50%" stopColor="#FF7A00" />
                <stop offset="100%" stopColor="#F5C542" />
              </linearGradient>
            </defs>
          </svg>
        );

      case 'bandhanwar-toran':
        return (
          <svg
            viewBox="0 0 120 90"
            className={`w-24 h-20 overflow-visible ${isActivated ? 'animate-toran-ring' : ''}`}
          >
            <line x1="12" y1="18" x2="108" y2="18" stroke="#F5C542" strokeWidth="2.5" />
            {[24, 48, 72, 96].map((x, idx) => (
              <circle
                key={idx}
                cx={x}
                cy="24"
                r="7"
                fill={idx % 2 === 0 ? '#FF7A00' : '#F5C542'}
              />
            ))}
            {/* Brass Temple Bell */}
            <line x1="60" y1="18" x2="60" y2="38" stroke="#F5C542" strokeWidth="2" />
            <path
              d="M44,64 L76,64 L70,40 C70,34 50,34 50,40 Z"
              fill="#F5C542"
              stroke="#FFFDF5"
              strokeWidth="1.2"
            />
            <circle cx="60" cy="68" r="5" fill={isActivated ? '#FFFDF5' : '#FF7A00'} />
          </svg>
        );

      case 'shahi-mithai-bhog':
      default:
        return (
          <svg viewBox="0 0 120 90" className="w-24 h-20 overflow-visible">
            {/* Brass Thali Plate */}
            <ellipse
              cx="60"
              cy="58"
              rx="46"
              ry="18"
              fill="#2B163D"
              stroke="#F5C542"
              strokeWidth="2"
            />
            {/* Kaju Katli Diamonds */}
            <polygon
              points="40,48 52,40 64,48 52,56"
              fill="#FFFDF5"
              stroke="#D4C4B4"
              strokeWidth="1"
            />
            {/* Motichoor Ladoos */}
            <circle cx="74" cy="48" r="10" fill="#FF7A00" stroke="#F5C542" strokeWidth="1" />
            <circle cx="58" cy="60" r="10" fill="#F5C542" stroke="#FF7A00" strokeWidth="1" />
            <circle cx="42" cy="58" r="9" fill="#D81B60" stroke="#F5C542" strokeWidth="1" />
          </svg>
        );
    }
  };

  return (
    <section
      id="sacred-elements"
      className="relative py-20 sm:py-28 px-4 sm:px-8 max-w-[1320px] mx-auto"
    >
      <ScrollReveal className="text-center max-w-3xl mx-auto mb-14">
        <span className="inline-block text-xs sm:text-sm uppercase tracking-[0.2em] text-[#F5C542] font-semibold mb-3">
          दीपावली के पावन प्रतीक · Interactive Sacred Symbols
        </span>
        <h2
          className="font-display text-gold-shimmer mb-4"
          style={{ fontSize: 'clamp(2rem, 3.5vw + 0.5rem, 3.25rem)' }}
        >
          Every Sacred Element of Deepavali
        </h2>
        <p className="text-[#D4C4B4] text-sm sm:text-base leading-relaxed">
          From the earthen <span className="text-[#F5C542]">Mitti ka Diya</span> and auspicious{' '}
          <span className="text-[#D81B60]">Lakshmi Charan Paduka</span> to spinning{' '}
          <span className="text-[#00C49A]">Zameen Chakris</span> and fragrant{' '}
          <span className="text-[#FF7A00]">Marigold Torans</span> — click any element card below to awaken its festive animation and sound chime.
        </p>
      </ScrollReveal>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
        {DIWALI_ELEMENTS.map((item, idx) => {
          const clickCount = activeStates[item.id] || 0;
          const isActivated = clickCount > 0;

          return (
            <ScrollReveal
              key={item.id}
              delay={(idx % 4) * 90}
              direction="up"
              className="h-full"
            >
              <div
                onClick={(e) => handleElementClick(item, e)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleElementClick(item, e as unknown as React.MouseEvent);
                  }
                }}
                className={`group h-full royal-glass royal-glass-hover rounded-2xl p-6 flex flex-col justify-between cursor-pointer relative overflow-hidden transition-all ${
                  isActivated
                    ? 'border-[#F5C542]/65 shadow-[0_0_35px_rgba(245,197,66,0.2)]'
                    : ''
                }`}
              >
                {/* Top Corner Accent Glow */}
                <div
                  className="pointer-events-none absolute -top-12 -right-12 w-32 h-32 rounded-full opacity-25 group-hover:opacity-50 transition-opacity"
                  style={{
                    background: `radial-gradient(circle, ${item.accentColor} 0%, transparent 70%)`,
                  }}
                />

                <div>
                  {/* Header Badge & Click Counter */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-semibold tracking-wider text-[#F5C542]">
                      {item.sanskritTitle}
                    </span>
                    {isActivated && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono-num px-2 py-0.5 rounded-full bg-[#F5C542]/20 text-[#FFFDF5] border border-[#F5C542]/40">
                        <CheckCircle2 className="w-3 h-3 text-[#00C49A]" />
                        {clickCount}x
                      </span>
                    )}
                  </div>

                  {/* Interactive SVG Artwork Stage */}
                  <div className="my-3 py-3 rounded-xl bg-[#09060E]/55 border border-white/5 group-hover:border-[#F5C542]/30 flex items-center justify-center transition-colors">
                    {renderElementArtwork(item.id, isActivated, clickCount)}
                  </div>

                  <span className="block text-[11px] uppercase tracking-[0.14em] text-[#9A8678] font-semibold mb-1">
                    {item.symbolism}
                  </span>

                  <h3 className="font-serif-editorial text-xl font-bold text-[#FFF9F0] group-hover:text-[#F5C542] transition-colors mb-2">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#D4C4B4] leading-relaxed mb-4">
                    {item.description}
                  </p>
                </div>

                {/* Click Action Pill */}
                <div
                  className={`mt-auto w-full py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                    isActivated
                      ? 'bg-gradient-to-r from-[#FF7A00]/25 to-[#F5C542]/25 text-[#F5C542] border border-[#F5C542]/45'
                      : 'bg-white/5 text-[#FFF9F0] group-hover:bg-[#F5C542] group-hover:text-[#09060E]'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 shrink-0" />
                  <span>{isActivated ? item.activatedLabel : item.actionLabel}</span>
                </div>
              </div>
            </ScrollReveal>
          );
        })}
      </div>
    </section>
  );
};
