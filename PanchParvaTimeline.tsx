import React, { useEffect, useRef, useState } from 'react';
import { Sparkles, Flame, Check } from 'lucide-react';
import { ScrollReveal } from '../hooks/useScrollAnimations';
import { soundEngine } from '../utils/soundEffects';
import { triggerFestiveBurst } from './FestiveParticleCanvas';

interface PanchParvaDay {
  dayNumber: string;
  tithi: string;
  sanskritName: string;
  title: string;
  subtitle: string;
  story: string;
  ritualHighlight: string;
  clickPrompt: string;
  completedPrompt: string;
  accent: string;
  burstType: 'coins' | 'sparkler' | 'petals' | 'firework';
}

const FIVE_DAYS: PanchParvaDay[] = [
  {
    dayNumber: 'DAY 01',
    tithi: 'Kartik Krishna Trayodashi',
    sanskritName: 'धनतेरस · धनत्रयोदशी',
    title: 'Dhanteras (Dhantrayodashi)',
    subtitle: 'Invocation of Lord Dhanvantari, Goddess Lakshmi & Kubera',
    story:
      'Marking the emergence of Lord Dhanvantari from the cosmic ocean bearing the chalice of Amrit (immortal nectar). Homes are purified, decorated with threshold rangolis, and blessed with new gold, silver coins, or brass vessels.',
    ritualHighlight: 'Lighting the Yama Deepam facing south & welcoming Suvarna Mudras',
    clickPrompt: 'Click to Shower Auspicious Gold Mudras',
    completedPrompt: 'Suvarna Kalash Blessed with Gold Mudras!',
    accent: '#F5C542',
    burstType: 'coins',
  },
  {
    dayNumber: 'DAY 02',
    tithi: 'Kartik Krishna Chaturdashi',
    sanskritName: 'नरक चतुर्दशी · छोटी दीपावली',
    title: 'Naraka Chaturdashi (Choti Diwali)',
    subtitle: 'Triumph of Lord Krishna & Satyabhama over Narakasura',
    story:
      'Celebrated with a fragrant dawn Abhyanga Snan using herbal ubtan and sesame oil before sunrise. At dusk, fourteen earthen diyas are lit in every corner of the household to banish negativity and fear.',
    ritualHighlight: 'Igniting 14 protective Chaturdashi Diyas around the courtyard',
    clickPrompt: 'Click to Ignite All 14 Choti Diwali Diyas',
    completedPrompt: 'All 14 Protective Diyas Blazing Bright!',
    accent: '#FF7A00',
    burstType: 'sparkler',
  },
  {
    dayNumber: 'DAY 03',
    tithi: 'Kartik Amavasya (Main Night)',
    sanskritName: 'लक्ष्मी पूजन · मुख्य दीपावली',
    title: 'Lakshmi-Ganesh Puja (Deepavali)',
    subtitle: 'Return of Lord Rama to Ayodhya & Royal Welcome of Mahalakshmi',
    story:
      'On the darkest new-moon night of Kartik Amavasya, millions of clay diyas transform earth into a mirror of the starry cosmos. Families gather for Lakshmi-Ganesh Puja, Sharda/Bahi-Khata worship, and joyous sky Atishbazi.',
    ritualHighlight: 'Evening Maha-Aarti with lotus blooms, conch shells, and silver coins',
    clickPrompt: 'Click to Perform Maha-Aarti & Lotus Shower',
    completedPrompt: 'Shubh Labh Maha-Aarti Completed!',
    accent: '#D81B60',
    burstType: 'petals',
  },
  {
    dayNumber: 'DAY 04',
    tithi: 'Kartik Shukla Pratipada',
    sanskritName: 'गोवर्धन पूजा · अन्नकूट एवं पाड़वा',
    title: 'Govardhan Puja & Annakut',
    subtitle: 'Gratitude to Nature & Lord Krishna Lifting Mount Govardhan',
    story:
      'Honoring Lord Krishna protecting the people of Braj beneath Mount Govardhan. Devotees prepare Annakut (Chhappan Bhog—a mountain of 56 festive vegetarian delicacies) and celebrate Nutan Varsh (New Year) & Padwa.',
    ritualHighlight: 'Offering Chhappan Bhog delicacies & worship of nature and cattle',
    clickPrompt: 'Click to Offer Sacred Annakut Bhog',
    completedPrompt: 'Annakut Chhappan Bhog Offered!',
    accent: '#00C49A',
    burstType: 'sparkler',
  },
  {
    dayNumber: 'DAY 05',
    tithi: 'Kartik Shukla Dwitiya',
    sanskritName: 'भाई दूज · यम द्वितीया (भाऊबीज)',
    title: 'Bhai Dooj (Yama Dwitiya)',
    subtitle: 'Sacred Bond of Protection & Affection Between Siblings',
    story:
      'Inspired by Goddess Yamuna welcoming her brother Yama with a ceremonial tilak and festive feast. Sisters apply an auspicious vermilion kumkum, rice akshat, and sandalwood tilak on their brothers’ foreheads and perform aarti.',
    ritualHighlight: 'Ceremonial Kumkum-Akshat Tilak, coconut offering & sibling blessings',
    clickPrompt: 'Click to Apply Auspicious Kumkum Tilak',
    completedPrompt: 'Sacred Bhai Dooj Tilak & Aarti Blessed!',
    accent: '#F5C542',
    burstType: 'firework',
  },
];

export const PanchParvaTimeline: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [lineProgress, setLineProgress] = useState(0);
  const [blessedDays, setBlessedDays] = useState<Record<number, boolean>>({
    2: true, // Main Diwali pre-highlighted
  });

  useEffect(() => {
    const handleScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalTravel = rect.height - windowHeight * 0.35;
      const scrolled = windowHeight * 0.65 - rect.top;
      const ratio = Math.min(Math.max(scrolled / Math.max(totalTravel, 1), 0), 1);
      setLineProgress(ratio);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const handleDayRitualClick = (idx: number, day: PanchParvaDay, e: React.MouseEvent) => {
    e.stopPropagation();
    setBlessedDays((prev) => ({ ...prev, [idx]: !prev[idx] ? true : true }));

    if (idx === 0 || idx === 2) {
      soundEngine.playTempleBell(1 + idx * 0.1);
    } else if (idx === 4) {
      soundEngine.playFireworkBurst();
    } else {
      soundEngine.playDiyaIgnite(idx);
    }

    triggerFestiveBurst({
      type: day.burstType,
      x: e.clientX,
      y: e.clientY,
    });
  };

  const renderDayMotif = (idx: number, isBlessed: boolean) => {
    switch (idx) {
      case 0:
        // Day 1: Dhanteras Kalash & Gold Coins
        return (
          <svg viewBox="0 0 80 80" className="w-16 h-16 overflow-visible">
            <circle
              cx="40"
              cy="40"
              r="34"
              fill="rgba(245, 197, 66, 0.12)"
              stroke="#F5C542"
              strokeDasharray="3 3"
            />
            <path
              d="M28,32 L52,32 L49,38 C60,44 60,62 46,66 L34,66 C20,62 20,44 31,38 Z"
              fill="#F5C542"
              stroke="#FFFDF5"
              strokeWidth="1.2"
            />
            <ellipse cx="40" cy="24" rx="9" ry="10" fill="#B84B18" stroke="#F5C542" />
            {isBlessed && (
              <g className="animate-pulse">
                <circle cx="18" cy="28" r="4.5" fill="#FFFDF5" stroke="#F5C542" />
                <circle cx="62" cy="28" r="4.5" fill="#FFFDF5" stroke="#F5C542" />
                <circle cx="40" cy="10" r="4" fill="#F5C542" />
              </g>
            )}
          </svg>
        );
      case 1:
        // Day 2: 14 Mini Diyas Ring
        return (
          <svg viewBox="0 0 80 80" className="w-16 h-16 overflow-visible">
            {Array.from({ length: 14 }).map((_, i) => {
              const angle = (Math.PI * 2 * i) / 14;
              const cx = 40 + Math.cos(angle) * 29;
              const cy = 40 + Math.sin(angle) * 29;
              return (
                <circle
                  key={i}
                  cx={cx}
                  cy={cy}
                  r={isBlessed ? 3.2 : 2}
                  fill={isBlessed ? (i % 2 === 0 ? '#FFFDF5' : '#FF7A00') : '#9A8678'}
                />
              );
            })}
            <path
              d="M40,20 C33,31 32,39 40,46 C48,39 47,31 40,20 Z"
              fill={isBlessed ? '#FF7A00' : '#F5C542'}
              className="animate-flame"
            />
            <path d="M24,46 Q40,62 56,46 Z" fill="#D85627" stroke="#F5C542" />
          </svg>
        );
      case 2:
        // Day 3: Lakshmi Kamal Lotus & Shree Emblem
        return (
          <svg viewBox="0 0 80 80" className="w-16 h-16 overflow-visible">
            {[-40, -20, 0, 20, 40].map((rot, i) => (
              <path
                key={i}
                d="M40,14 C48,26 48,42 40,52 C32,42 32,26 40,14 Z"
                fill={isBlessed ? '#D81B60' : '#9E1946'}
                stroke="#F5C542"
                strokeWidth="1"
                transform={`rotate(${rot} 40 52)`}
              />
            ))}
            <circle cx="40" cy="42" r="8" fill="#F5C542" />
            <text
              x="40"
              y="46"
              textAnchor="middle"
              fill="#09060E"
              fontSize="10"
              fontWeight="bold"
            >
              श्री
            </text>
          </svg>
        );
      case 3:
        // Day 4: Govardhan Mountain & Peacock Feather
        return (
          <svg viewBox="0 0 80 80" className="w-16 h-16 overflow-visible">
            <circle
              cx="40"
              cy="40"
              r="32"
              fill="rgba(0, 196, 154, 0.15)"
              stroke="#00C49A"
              strokeWidth="1.2"
            />
            <path
              d="M14,58 L32,28 L46,44 L54,32 L66,58 Z"
              fill="#008B68"
              stroke="#F5C542"
              strokeWidth="1.5"
            />
            <circle cx="40" cy="22" r="5" fill="#F5C542" />
          </svg>
        );
      case 4:
      default:
        // Day 5: Bhai Dooj Ceremonial Tilak & Coconut
        return (
          <svg viewBox="0 0 80 80" className="w-16 h-16 overflow-visible">
            <circle
              cx="40"
              cy="40"
              r="32"
              fill="rgba(245, 197, 66, 0.14)"
              stroke="#F5C542"
              strokeWidth="1.2"
            />
            {/* Ceremonial U-shaped Chandan & Kumkum Tilak */}
            <path
              d="M30,24 Q30,52 40,52 Q50,52 50,24"
              fill="none"
              stroke="#F5C542"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <path
              d="M40,20 C36,32 36,42 40,46 C44,42 44,32 40,20 Z"
              fill="#D81B60"
            />
            <circle cx="40" cy="57" r="3.5" fill="#FFFDF5" />
          </svg>
        );
    }
  };

  return (
    <section
      id="panch-parva"
      ref={sectionRef}
      className="relative py-20 sm:py-28 px-4 sm:px-8 max-w-[1240px] mx-auto"
    >
      <ScrollReveal className="text-center max-w-3xl mx-auto mb-16">
        <span className="inline-block text-xs sm:text-sm uppercase tracking-[0.22em] text-[#F5C542] font-semibold mb-3">
          पंच पर्व · Five Sacred Days of Illumination
        </span>
        <h2
          className="font-display text-gold-shimmer mb-4"
          style={{ fontSize: 'clamp(2rem, 3.5vw + 0.5rem, 3.25rem)' }}
        >
          The Five-Day Odyssey of Deepavali
        </h2>
        <p className="text-[#D4C4B4] text-sm sm:text-base leading-relaxed">
          Scroll down to watch the sacred golden <span className="text-[#F5C542]">Jyoti Thread</span> illuminate each chapter of the five-day festival, and click any day’s ceremonial emblem to perform its auspicious ritual.
        </p>
      </ScrollReveal>

      {/* Vertical Timeline Container */}
      <div className="relative">
        {/* Background Unlit Timeline Track */}
        <div className="absolute left-5 md:left-1/2 top-4 bottom-4 w-[2px] -translate-x-1/2 bg-white/10 rounded-full" />

        {/* Scroll-Animated Liquid Gold Thread */}
        <div
          className="absolute left-5 md:left-1/2 top-4 w-[3px] -translate-x-1/2 bg-gradient-to-b from-[#FFFDF5] via-[#F5C542] to-[#FF7A00] rounded-full shadow-[0_0_18px_#F5C542] transition-all duration-150"
          style={{ height: `calc(${Math.round(lineProgress * 100)}% - 24px)` }}
        >
          {/* Travelling Flame Tip at the bottom of the scroll line */}
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-[#FF7A00] border-2 border-[#FFFDF5] shadow-[0_0_20px_#FF7A00] flex items-center justify-center">
            <Flame className="w-3.5 h-3.5 text-[#FFFDF5] fill-[#FFFDF5]" />
          </div>
        </div>

        {/* 5 Alternating Day Cards */}
        <div className="space-y-12 sm:space-y-16">
          {FIVE_DAYS.map((day, idx) => {
            const isEven = idx % 2 === 0;
            const isBlessed = !!blessedDays[idx];
            const nodeReached = lineProgress >= idx / (FIVE_DAYS.length - 0.5);

            return (
              <div
                key={day.dayNumber}
                className={`relative flex flex-col md:flex-row items-start ${
                  isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                } gap-6 md:gap-12`}
              >
                {/* Center Timeline Node Emblem */}
                <button
                  onClick={(e) => handleDayRitualClick(idx, day, e)}
                  title={`Click to perform ${day.title} ritual!`}
                  className={`absolute left-5 md:left-1/2 -translate-x-1/2 top-6 z-20 w-11 h-11 rounded-full flex items-center justify-center font-mono-num text-xs font-bold transition-all duration-500 cursor-pointer ${
                    nodeReached || isBlessed
                      ? 'bg-gradient-to-br from-[#FFFDF5] via-[#F5C542] to-[#FF7A00] text-[#09060E] scale-110 shadow-[0_0_25px_rgba(245,197,66,0.8)]'
                      : 'bg-[#130D1C] text-[#9A8678] border border-[#F5C542]/35'
                  }`}
                >
                  0{idx + 1}
                </button>

                {/* Card Column */}
                <div className="w-full md:w-[calc(50%-2.75rem)] pl-14 md:pl-0">
                  <ScrollReveal
                    direction={isEven ? 'left' : 'right'}
                    delay={80}
                  >
                    <div
                      onClick={(e) => handleDayRitualClick(idx, day, e)}
                      className={`group royal-glass royal-glass-hover rounded-3xl p-6 sm:p-7 cursor-pointer transition-all relative overflow-hidden ${
                        isBlessed
                          ? 'border-[#F5C542]/65 shadow-[0_15px_50px_rgba(255,122,0,0.18)]'
                          : ''
                      }`}
                    >
                      {/* Top Metadata Row */}
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                        <div className="flex items-center gap-2.5">
                          <span
                            className="px-3 py-1 rounded-full text-xs font-mono-num font-bold uppercase tracking-wider text-[#09060E]"
                            style={{ backgroundColor: day.accent }}
                          >
                            {day.dayNumber}
                          </span>
                          <span className="text-xs font-mono-num text-[#D4C4B4]">
                            {day.tithi}
                          </span>
                        </div>
                        <span className="text-xs font-semibold text-[#F5C542]">
                          {day.sanskritName}
                        </span>
                      </div>

                      {/* Main Content + SVG Motif */}
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div>
                          <h3 className="font-display text-2xl sm:text-3xl text-[#FFF9F0] group-hover:text-[#F5C542] transition-colors mb-1">
                            {day.title}
                          </h3>
                          <p className="font-serif-editorial italic text-base sm:text-lg text-[#F5C542]">
                            {day.subtitle}
                          </p>
                        </div>
                        <div className="shrink-0 p-2 rounded-2xl bg-[#09060E]/60 border border-[#F5C542]/25 group-hover:scale-105 transition-transform">
                          {renderDayMotif(idx, isBlessed)}
                        </div>
                      </div>

                      <p className="text-sm text-[#D4C4B4] leading-relaxed mb-4">
                        {day.story}
                      </p>

                      {/* Ritual Highlight Box */}
                      <div className="p-3.5 rounded-2xl bg-[#09060E]/65 border border-white/10 mb-4 flex items-center gap-2.5 text-xs text-[#FFF9F0]">
                        <Flame className="w-4 h-4 text-[#FF7A00] shrink-0" />
                        <span>
                          <strong className="text-[#F5C542]">Sacred Tradition:</strong>{' '}
                          {day.ritualHighlight}
                        </span>
                      </div>

                      {/* Interactive Ritual Trigger Button */}
                      <div className="flex items-center justify-between pt-2 border-t border-white/10">
                        <span
                          className={`inline-flex items-center gap-1.5 text-xs font-semibold ${
                            isBlessed ? 'text-[#00C49A]' : 'text-[#F5C542]'
                          }`}
                        >
                          {isBlessed ? (
                            <>
                              <Check className="w-4 h-4" />
                              <span>{day.completedPrompt}</span>
                            </>
                          ) : (
                            <>
                              <Sparkles className="w-4 h-4" />
                              <span>{day.clickPrompt}</span>
                            </>
                          )}
                        </span>
                        <span className="text-[11px] uppercase tracking-wider text-[#9A8678] group-hover:text-[#FFF9F0] transition-colors">
                          Tap Card ✨
                        </span>
                      </div>
                    </div>
                  </ScrollReveal>
                </div>

                {/* Spacer for opposite side on desktop */}
                <div className="hidden md:block md:w-[calc(50%-2.75rem)]" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
