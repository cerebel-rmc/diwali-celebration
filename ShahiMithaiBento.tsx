import React, { useState } from 'react';
import { Gift, Sparkles, Check, Bell } from 'lucide-react';
import { ScrollReveal } from '../hooks/useScrollAnimations';
import { soundEngine } from '../utils/soundEffects';
import { triggerFestiveBurst } from './FestiveParticleCanvas';

export interface MithaiItem {
  id: string;
  hindi: string;
  name: string;
  tagline: string;
  profile: string;
  accent: string;
}

export const SHAHI_MITHAI_LIST: MithaiItem[] = [
  {
    id: 'kaju-katli',
    hindi: 'चाँदी वर्क काजू कतली',
    name: 'Chandi-Vark Kaju Katli',
    tagline: 'Royal Cashew & Silver-Leaf Diamonds',
    profile:
      'Silky slow-ground Goan cashew fudge cut into auspicious diamonds and crowned with pure edible silver leaf.',
    accent: '#FFFDF5',
  },
  {
    id: 'motichoor-ladoo',
    hindi: 'केसरिया मोतीचूर लड्डू',
    name: 'Shahi Motichoor Ladoo',
    tagline: 'Saffron & Pistachio Golden Pearls',
    profile:
      'Delicate micro-pearls of roasted gram flour steeped in Kashmiri saffron syrup and studded with green pistachios.',
    accent: '#FF7A00',
  },
  {
    id: 'kesar-jalebi',
    hindi: 'गरमा-गरम केसर जलेबी',
    name: 'Crisp Kesar Jalebi',
    tagline: 'Saffron-Drenched Golden Spirals',
    profile:
      'Crisp, lacy concentric coils fried in pure desi ghee and dipped in warm saffron-cardamom nectar.',
    accent: '#F5C542',
  },
  {
    id: 'gulab-jamun',
    hindi: 'इलायची गुलाब जामुन',
    name: 'Kala & Shahi Gulab Jamun',
    tagline: 'Rosewater & Cardamom Khoya Spheres',
    profile:
      'Melt-in-the-mouth caramelized milk solids simmered gently in fragrant Kannauj rosewater and green cardamom.',
    accent: '#D81B60',
  },
  {
    id: 'mawa-gujiya',
    hindi: 'शाही मावा गुजिया (करंजी)',
    name: 'Mawa Dry-Fruit Gujiya',
    tagline: 'Hand-Pleated Festive Crescent Pastries',
    profile:
      'Golden flaky pastry crescents generously stuffed with sweetened khoya, roasted almonds, raisins, and nutmeg.',
    accent: '#F5C542',
  },
  {
    id: 'pista-barfi',
    hindi: 'पिस्ता बादाम केसर बर्फी',
    name: 'Kesar Pista Badam Barfi',
    tagline: 'Emerald Pistachio & Almond Milk Fudge',
    profile:
      'Rich artisanal milk fudge layered with crushed Iranian pistachios, toasted almond slivers, and aromatic mace.',
    accent: '#00C49A',
  },
];

interface ShahiMithaiBentoProps {
  selectedMithaiIds: string[];
  onToggleMithai: (id: string) => void;
}

export const ShahiMithaiBento: React.FC<ShahiMithaiBentoProps> = ({
  selectedMithaiIds,
  onToggleMithai,
}) => {
  const [aartiSpinning, setAartiSpinning] = useState(false);

  const handleMithaiClick = (item: MithaiItem, e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleMithai(item.id);
    soundEngine.playRangoliChime();
    triggerFestiveBurst({
      type: 'sparkler',
      x: e.clientX,
      y: e.clientY,
    });
  };

  const handlePerformAarti = (e: React.MouseEvent) => {
    e.stopPropagation();
    setAartiSpinning(true);
    soundEngine.playTempleBell(1.0);
    setTimeout(() => soundEngine.playTempleBell(1.2), 450);
    setTimeout(() => soundEngine.playTempleBell(1.4), 900);
    triggerFestiveBurst({
      type: 'petals',
      x: e.clientX,
      y: e.clientY,
    });
    setTimeout(() => setAartiSpinning(false), 3200);
  };

  const renderMithaiIllustration = (id: string) => {
    switch (id) {
      case 'kaju-katli':
        return (
          <svg viewBox="0 0 140 100" className="w-28 h-20 overflow-visible">
            {/* Brass Plate Base */}
            <ellipse cx="70" cy="68" rx="52" ry="18" fill="#1E122B" stroke="#F5C542" strokeWidth="1.5" />
            {/* Diamond Kaju Katli Pieces with Silver Leaf Shimmer */}
            <polygon
              points="42,56 70,38 98,56 70,74"
              fill="url(#kajuGrad)"
              stroke="#FFFDF5"
              strokeWidth="1.5"
            />
            <polygon
              points="50,48 70,35 90,48 70,61"
              fill="url(#silverVark)"
              opacity="0.85"
            />
            <path d="M68,43 Q72,46 69,50" stroke="#FF7A00" strokeWidth="1.5" fill="none" />
            <defs>
              <linearGradient id="kajuGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#FFF9F0" />
                <stop offset="100%" stopColor="#E6D2B5" />
              </linearGradient>
              <linearGradient id="silverVark" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="50%" stopColor="#CBD5E1" />
                <stop offset="100%" stopColor="#94A3B8" />
              </linearGradient>
            </defs>
          </svg>
        );

      case 'motichoor-ladoo':
        return (
          <svg viewBox="0 0 140 100" className="w-28 h-20 overflow-visible">
            <ellipse cx="70" cy="70" rx="50" ry="16" fill="#1E122B" stroke="#F5C542" strokeWidth="1.5" />
            {[
              { cx: 52, cy: 58, r: 17 },
              { cx: 88, cy: 58, r: 17 },
              { cx: 70, cy: 46, r: 19 },
            ].map((l, idx) => (
              <g key={idx}>
                <circle
                  cx={l.cx}
                  cy={l.cy}
                  r={l.r}
                  fill="url(#ladooGrad)"
                  stroke="#F5C542"
                  strokeWidth="1.2"
                />
                {/* Pistachio Garnish */}
                <ellipse cx={l.cx} cy={l.cy - 6} rx="4" ry="2.2" fill="#00C49A" />
                <circle cx={l.cx - 5} cy={l.cy + 2} r="1.5" fill="#FFFDF5" />
                <circle cx={l.cx + 5} cy={l.cy + 3} r="1.5" fill="#FFFDF5" />
              </g>
            ))}
            <defs>
              <radialGradient id="ladooGrad" cx="35%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#F5C542" />
                <stop offset="60%" stopColor="#FF7A00" />
                <stop offset="100%" stopColor="#C84B00" />
              </radialGradient>
            </defs>
          </svg>
        );

      case 'kesar-jalebi':
        return (
          <svg viewBox="0 0 140 100" className="w-28 h-20 overflow-visible">
            <ellipse cx="70" cy="70" rx="50" ry="16" fill="#1E122B" stroke="#F5C542" strokeWidth="1.5" />
            {/* Concentric Jalebi Coil */}
            <path
              d="M70,52 m-4,0 a 4,4 0 1,0 8,0 a 9,9 0 1,0 -18,0 a 15,15 0 1,0 30,0 a 22,22 0 1,0 -44,0"
              fill="none"
              stroke="url(#jalebiGrad)"
              strokeWidth="6"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="jalebiGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#FFFDF5" />
                <stop offset="40%" stopColor="#F5C542" />
                <stop offset="100%" stopColor="#FF5500" />
              </linearGradient>
            </defs>
          </svg>
        );

      case 'gulab-jamun':
        return (
          <svg viewBox="0 0 140 100" className="w-28 h-20 overflow-visible">
            {/* Brass Katori Bowl */}
            <path
              d="M26,56 Q70,92 114,56 Z"
              fill="#2B163D"
              stroke="#F5C542"
              strokeWidth="2"
            />
            <circle cx="56" cy="50" r="16" fill="url(#jamunGrad)" />
            <circle cx="84" cy="50" r="16" fill="url(#jamunGrad)" />
            {/* Rose Petal & Pistachio Slivers */}
            <ellipse cx="56" cy="42" rx="4.5" ry="2.2" fill="#D81B60" />
            <ellipse cx="84" cy="42" rx="4" ry="2" fill="#00C49A" />
            <defs>
              <radialGradient id="jamunGrad" cx="35%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#C85A32" />
                <stop offset="55%" stopColor="#6E1E0A" />
                <stop offset="100%" stopColor="#3B0B04" />
              </radialGradient>
            </defs>
          </svg>
        );

      case 'mawa-gujiya':
        return (
          <svg viewBox="0 0 140 100" className="w-28 h-20 overflow-visible">
            <ellipse cx="70" cy="70" rx="50" ry="16" fill="#1E122B" stroke="#F5C542" strokeWidth="1.5" />
            {/* Pleated Crescent Gujiya */}
            <path
              d="M34,62 C38,26 102,26 106,62 Q70,70 34,62 Z"
              fill="#F5C542"
              stroke="#FFFDF5"
              strokeWidth="2"
              strokeDasharray="5 2"
            />
            <ellipse cx="70" cy="48" rx="6" ry="3" fill="#00C49A" />
          </svg>
        );

      case 'pista-barfi':
      default:
        return (
          <svg viewBox="0 0 140 100" className="w-28 h-20 overflow-visible">
            <ellipse cx="70" cy="70" rx="50" ry="16" fill="#1E122B" stroke="#F5C542" strokeWidth="1.5" />
            <rect
              x="44"
              y="34"
              width="52"
              height="32"
              rx="6"
              fill="url(#pistaGrad)"
              stroke="#FFFDF5"
              strokeWidth="1.5"
            />
            <circle cx="70" cy="50" r="6" fill="#F5C542" />
            <defs>
              <linearGradient id="pistaGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#00C49A" />
                <stop offset="100%" stopColor="#007A5E" />
              </linearGradient>
            </defs>
          </svg>
        );
    }
  };

  return (
    <section
      id="shahi-mithai"
      className="relative py-20 sm:py-28 px-4 sm:px-8 max-w-[1320px] mx-auto"
    >
      <ScrollReveal className="text-center max-w-3xl mx-auto mb-12">
        <span className="inline-block text-xs sm:text-sm uppercase tracking-[0.22em] text-[#F5C542] font-semibold mb-3">
          शाही मिठाई एवं महा-आरती · Festive Delicacies &amp; Puja Ritual
        </span>
        <h2
          className="font-display text-gold-shimmer mb-4"
          style={{ fontSize: 'clamp(2rem, 3.5vw + 0.5rem, 3.25rem)' }}
        >
          Curate Your Shahi Diwali Mithai Thali
        </h2>
        <p className="text-[#D4C4B4] text-sm sm:text-base leading-relaxed">
          No Deepavali is complete without sharing artisanal <span className="text-[#F5C542]">Mithai</span>. Click your favorite delicacies below to add them to your festive gift box (included in your greeting card below!), or perform the interactive <span className="text-[#FF7A00]">Lakshmi-Ganesh Maha-Aarti</span>.
        </p>
      </ScrollReveal>

      {/* Interactive Maha-Aarti Banner Card */}
      <ScrollReveal className="mb-12">
        <div className="royal-glass rounded-3xl p-6 sm:p-8 border border-[#F5C542]/40 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="flex items-center gap-5">
            {/* Animated Clockwise Circular Aarti Thali */}
            <div
              onClick={handlePerformAarti}
              title="Click to perform clockwise Maha-Aarti!"
              className="relative w-24 h-24 rounded-full bg-[#09060E]/85 border-2 border-[#F5C542]/50 flex items-center justify-center shrink-0 cursor-pointer shadow-[0_0_30px_rgba(245,197,66,0.3)]"
            >
              {/* Central Sacred Shubh-Labh Lotus */}
              <div className="text-center">
                <span className="block text-xs text-[#D81B60] font-bold">शुभ लाभ</span>
                <span className="font-display text-xl text-[#F5C542]">ॐ श्रीं</span>
              </div>

              {/* Orbiting Brass Aarti Lamp */}
              <div
                className={`absolute inset-0 transition-transform ${
                  aartiSpinning ? 'animate-[spin_1.1s_linear_infinite]' : ''
                }`}
              >
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-gradient-to-br from-[#FFFDF5] via-[#F5C542] to-[#FF7A00] shadow-[0_0_20px_#FF7A00] flex items-center justify-center">
                  <span className="text-xs">🪔</span>
                </div>
              </div>
            </div>

            <div>
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#F5C542] font-semibold mb-1">
                <span>लक्ष्मी-गणेश महा-आरती · Interactive Puja Altar</span>
              </div>
              <h3 className="font-display text-xl sm:text-2xl text-[#FFF9F0] mb-1">
                Perform Virtual Clockwise Maha-Aarti &amp; Ring the Puja Ghanti
              </h3>
              <p className="text-xs sm:text-sm text-[#D4C4B4] max-w-2xl">
                Click the Aarti button to circle the sacred golden lamp around the{' '}
                <span className="text-[#F5C542]">Om Shreem Mahalakshmi</span> emblem accompanied by resonant brass temple bells and a marigold petal shower.
              </p>
            </div>
          </div>

          <button
            onClick={handlePerformAarti}
            className="shrink-0 px-6 py-3.5 rounded-full bg-gradient-to-r from-[#D81B60] via-[#FF7A00] to-[#F5C542] text-[#FFFDF5] font-bold text-xs sm:text-sm uppercase tracking-wider shadow-[0_0_25px_rgba(216,27,96,0.5)] hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-2"
          >
            <Bell className={`w-4 h-4 ${aartiSpinning ? 'animate-bounce' : ''}`} />
            <span>{aartiSpinning ? 'Performing Maha-Aarti...' : 'Perform Maha-Aarti & Chime'}</span>
          </button>
        </div>
      </ScrollReveal>

      {/* 3-Column Shahi Mithai Bento Grid (Max 3 data points per card + click interaction) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SHAHI_MITHAI_LIST.map((mithai, idx) => {
          const isSelected = selectedMithaiIds.includes(mithai.id);
          return (
            <ScrollReveal
              key={mithai.id}
              delay={(idx % 3) * 100}
              direction="up"
            >
              <div
                onClick={(e) => handleMithaiClick(mithai, e)}
                className={`group royal-glass royal-glass-hover rounded-3xl p-6 cursor-pointer transition-all flex flex-col justify-between h-full relative overflow-hidden ${
                  isSelected
                    ? 'border-[#F5C542] shadow-[0_0_35px_rgba(245,197,66,0.25)]'
                    : ''
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-semibold text-[#F5C542]">
                      {mithai.hindi}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold transition-all ${
                        isSelected
                          ? 'bg-[#00C49A]/20 text-[#00C49A] border border-[#00C49A]/40'
                          : 'bg-white/5 text-[#9A8678]'
                      }`}
                    >
                      {isSelected ? (
                        <>
                          <Check className="w-3 h-3" /> In Gift Thali
                        </>
                      ) : (
                        <>+ Add to Thali</>
                      )}
                    </span>
                  </div>

                  {/* Custom SVG Mithai Platter */}
                  <div className="my-2 py-4 rounded-2xl bg-[#09060E]/65 border border-white/5 group-hover:border-[#F5C542]/30 flex items-center justify-center transition-all group-hover:scale-[1.02]">
                    {renderMithaiIllustration(mithai.id)}
                  </div>

                  {/* Data Point 2: Dish Name & Tagline */}
                  <h3 className="font-display text-xl text-[#FFF9F0] group-hover:text-[#F5C542] transition-colors mt-3">
                    {mithai.name}
                  </h3>
                  <p className="font-serif-editorial italic text-sm text-[#F5C542] mb-2">
                    {mithai.tagline}
                  </p>

                  {/* Data Point 3: 2-line flavor profile */}
                  <p className="text-xs sm:text-sm text-[#D4C4B4] leading-relaxed line-clamp-2">
                    {mithai.profile}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                  <span className="text-[#9A8678] flex items-center gap-1.5">
                    <Gift className="w-3.5 h-3.5 text-[#F5C542]" />
                    <span>Festive Gift Box</span>
                  </span>
                  <span className="text-[#F5C542] font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{isSelected ? 'Selected' : 'Select Sweet'}</span>
                  </span>
                </div>
              </div>
            </ScrollReveal>
          );
        })}
      </div>
    </section>
  );
};
