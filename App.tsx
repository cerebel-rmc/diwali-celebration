import React, { useState } from 'react';
import { Sparkles, ArrowUp, Flame, EyeOff, Eye } from 'lucide-react';
import {
  FestiveParticleCanvas,
  ClickAnimationMode,
  triggerFestiveBurst,
} from './components/FestiveParticleCanvas';
import { ToranGarlandHeader } from './components/ToranGarlandHeader';
import { HeroDiyaAltar, SacredDiyaItem } from './components/HeroDiyaAltar';
import { SacredDiwaliElements } from './components/SacredDiwaliElements';
import { PanchParvaTimeline } from './components/PanchParvaTimeline';
import {
  RangoliAndCrackerStudio,
  RangoliZoneColors,
} from './components/RangoliAndCrackerStudio';
import { ShahiMithaiBento } from './components/ShahiMithaiBento';
import { GreetingCardStudio } from './components/GreetingCardStudio';
import { useScrollProgress } from './hooks/useScrollAnimations';
import { soundEngine } from './utils/soundEffects';

const INITIAL_DIYAS: SacredDiyaItem[] = [
  {
    id: 1,
    sanskrit: 'विद्या',
    name: 'Vidya',
    blessing: 'May divine wisdom & clarity illuminate every path you walk.',
    color: '#F5C542',
    lit: true,
  },
  {
    id: 2,
    sanskrit: 'समृद्धि',
    name: 'Samriddhi',
    blessing: 'May auspicious abundance & prosperity flourish in your home.',
    color: '#FF7A00',
    lit: false,
  },
  {
    id: 3,
    sanskrit: 'स्वास्थ्य',
    name: 'Swasthya',
    blessing: 'May vibrant health, energy & longevity bless your family.',
    color: '#00C49A',
    lit: false,
  },
  {
    id: 4,
    sanskrit: 'आनंद',
    name: 'Anand',
    blessing: 'May the supreme joy of Deepavali shine brightly in your heart.',
    color: '#FFFDF5',
    lit: true,
  },
  {
    id: 5,
    sanskrit: 'शांति',
    name: 'Shanti',
    blessing: 'May serene peace & harmony embrace your household.',
    color: '#F5C542',
    lit: false,
  },
  {
    id: 6,
    sanskrit: 'प्रेम',
    name: 'Prem',
    blessing: 'May sweetness & unconditional love bind all your relationships.',
    color: '#D81B60',
    lit: false,
  },
  {
    id: 7,
    sanskrit: 'साहस',
    name: 'Sahas',
    blessing: 'May fearless courage triumph over every shadow of doubt.',
    color: '#FF7A00',
    lit: true,
  },
];

export function App() {
  const { scrollY, progress } = useScrollProgress();

  const [diyas, setDiyas] = useState<SacredDiyaItem[]>(INITIAL_DIYAS);
  const [clickMode, setClickMode] = useState<ClickAnimationMode>('grand');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);

  const [rangoliColors, setRangoliColors] = useState<RangoliZoneColors>({
    outerScallop: '#D81B60',
    peacockRing: '#FF7A00',
    kalashDiamond: '#F5C542',
    outerLotus: '#D81B60',
    innerChakra: '#00C49A',
    innerLotus: '#FF7A00',
    binduCore: '#FFF9F0',
  });

  const [selectedMithaiIds, setSelectedMithaiIds] = useState<string[]>([
    'kaju-katli',
    'motichoor-ladoo',
  ]);

  // Footer Deepmala mini diyas (11 steps)
  const [footerDiyas, setFooterDiyas] = useState<boolean[]>(
    Array.from({ length: 11 }, (_, i) => i % 2 === 0)
  );

  const litCount = diyas.filter((d) => d.lit).length;

  const handleToggleSound = () => {
    setSoundEnabled((prev) => {
      const next = !prev;
      soundEngine.enabled = next;
      if (next) {
        soundEngine.playTempleBell(1.0);
      }
      return next;
    });
  };

  const handleToggleDiya = (id: number, clientX?: number, clientY?: number) => {
    setDiyas((prev) => {
      const updated = prev.map((d) => (d.id === id ? { ...d, lit: true } : d));
      const newLitCount = updated.filter((d) => d.lit).length;
      if (newLitCount === updated.length) {
        soundEngine.playFireworkBurst();
        setTimeout(() => triggerFestiveBurst({ type: 'grand' }), 120);
      } else {
        soundEngine.playDiyaIgnite(id);
      }
      return updated;
    });

    triggerFestiveBurst({
      type: 'sparkler',
      x: clientX,
      y: clientY ? clientY - 18 : undefined,
    });
  };

  const handleLightAllSequential = () => {
    const unlit = diyas.filter((d) => !d.lit);
    if (unlit.length === 0) {
      // All already lit -> trigger grand celebration
      soundEngine.playFireworkBurst();
      triggerFestiveBurst({ type: 'grand' });
      return;
    }

    unlit.forEach((d, idx) => {
      setTimeout(() => {
        setDiyas((prev) =>
          prev.map((item) => (item.id === d.id ? { ...item, lit: true } : item))
        );
        soundEngine.playDiyaIgnite(idx);
        if (idx === unlit.length - 1) {
          soundEngine.playFireworkBurst();
          triggerFestiveBurst({ type: 'grand' });
        }
      }, idx * 220);
    });
  };

  const handleToggleMithai = (id: string) => {
    setSelectedMithaiIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleToggleFooterDiya = (idx: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setFooterDiyas((prev) => prev.map((v, i) => (i === idx ? !v : v)));
    soundEngine.playDiyaIgnite(idx);
    triggerFestiveBurst({
      type: 'sparkler',
      x: e.clientX,
      y: e.clientY - 12,
    });
  };

  return (
    <div className="relative min-h-screen bg-[#09060E] text-[#FFF9F0] selection:bg-[#F5C542]/30">
      {/* Global 2D HTML5 Canvas for Click Animations & Ambient Stardust */}
      <FestiveParticleCanvas
        clickMode={clickMode}
        reducedMotion={reducedMotion}
      />

      {/* Overhead Clickable Marigold Toran & Floating Glass Navigation Header */}
      <ToranGarlandHeader
        litCount={litCount}
        totalDiyas={diyas.length}
        onLightNextOrAll={handleLightAllSequential}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        clickMode={clickMode}
        onChangeClickMode={setClickMode}
        scrollProgress={progress}
      />

      {/* Main Content */}
      <main className="relative z-10">
        {/* 1. Interactive Full-Viewport Hero & 7-Diya Ceremonial Altar */}
        <HeroDiyaAltar
          diyas={diyas}
          onToggleDiya={handleToggleDiya}
          onLightAllSequential={handleLightAllSequential}
          scrollY={scrollY}
        />

        {/* Ornamental Golden Lotus Divider */}
        <div className="max-w-4xl mx-auto px-6 flex items-center gap-4 opacity-60">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#F5C542] to-transparent" />
          <span className="text-[#F5C542] text-sm tracking-[0.3em]">✦ 🪔 ✦</span>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#F5C542] to-transparent" />
        </div>

        {/* 2. All 8 Sacred Elements of Diwali Interactive Bento Grid */}
        <SacredDiwaliElements />

        {/* Ornamental Divider */}
        <div className="max-w-4xl mx-auto px-6 flex items-center gap-4 opacity-60">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#FF7A00] to-transparent" />
          <span className="text-[#FF7A00] text-sm tracking-[0.3em]">✦ 🪷 ✦</span>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#FF7A00] to-transparent" />
        </div>

        {/* 3. The Five Days of Diwali (Panch Parva) Scroll-Animated Timeline */}
        <PanchParvaTimeline />

        {/* Ornamental Divider */}
        <div className="max-w-4xl mx-auto px-6 flex items-center gap-4 opacity-60">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#D81B60] to-transparent" />
          <span className="text-[#D81B60] text-sm tracking-[0.3em]">✦ 🌸 ✦</span>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#D81B60] to-transparent" />
        </div>

        {/* 4. Interactive Sanskar Bharti Rangoli Studio & Eco-Atishbazi Playground */}
        <RangoliAndCrackerStudio
          rangoliColors={rangoliColors}
          onChangeRangoliColors={setRangoliColors}
        />

        {/* Ornamental Divider */}
        <div className="max-w-4xl mx-auto px-6 flex items-center gap-4 opacity-60">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#00C49A] to-transparent" />
          <span className="text-[#00C49A] text-sm tracking-[0.3em]">✦ 🍬 ✦</span>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#00C49A] to-transparent" />
        </div>

        {/* 5. Shahi Mithai Delicacies Bento & Virtual Maha-Aarti */}
        <ShahiMithaiBento
          selectedMithaiIds={selectedMithaiIds}
          onToggleMithai={handleToggleMithai}
        />

        {/* 6. Personalized Diwali Greeting Card & Blessing Studio */}
        <GreetingCardStudio
          rangoliColors={rangoliColors}
          selectedMithaiIds={selectedMithaiIds}
          litDiyasCount={litCount}
        />
      </main>

      {/* Ceremonial Deepmala Footer */}
      <footer className="relative z-10 border-t border-[#F5C542]/20 bg-[#07040B] pt-14 pb-24 px-4 sm:px-8 mt-12">
        <div className="max-w-[1200px] mx-auto text-center">
          {/* Interactive Row of 11 Deepmala Step Diyas */}
          <p className="text-xs uppercase tracking-[0.2em] text-[#9A8678] mb-4">
            दीपमाला · Click the 11 Courtyard Step Diyas Below
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5 mb-10">
            {footerDiyas.map((isLit, idx) => (
              <button
                key={idx}
                onClick={(e) => handleToggleFooterDiya(idx, e)}
                title="Click to toggle Courtyard Diya!"
                className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all cursor-pointer ${
                  isLit
                    ? 'bg-[#FF7A00]/20 border-[#F5C542] shadow-[0_0_18px_rgba(255,122,0,0.5)] scale-110'
                    : 'bg-[#130D1C] border-white/10 opacity-60 hover:opacity-100'
                }`}
              >
                <Flame
                  className={`w-5 h-5 ${
                    isLit
                      ? 'text-[#F5C542] fill-[#FF7A00] animate-flame'
                      : 'text-[#9A8678]'
                  }`}
                />
              </button>
            ))}
          </div>

          {/* Sanskrit Peace Invocation */}
          <p className="font-display text-2xl sm:text-3xl text-gold-shimmer mb-2">
            ॐ सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः
          </p>
          <p className="font-serif-editorial italic text-base sm:text-lg text-[#D4C4B4] mb-6">
            &ldquo;May all beings everywhere be happy, healthy, and illuminated by auspicious light.&rdquo;
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-[#9A8678]">
            <span>Shubh Deepavali · Festival of Lights Interactive Experience</span>
            <span>•</span>
            <button
              onClick={() => setReducedMotion((prev) => !prev)}
              className="inline-flex items-center gap-1.5 text-[#F5C542] hover:underline cursor-pointer"
            >
              {reducedMotion ? (
                <>
                  <Eye className="w-3.5 h-3.5" /> Enable Particle Animations
                </>
              ) : (
                <>
                  <EyeOff className="w-3.5 h-3.5" /> Reduce Motion
                </>
              )}
            </button>
          </div>
        </div>
      </footer>

      {/* Floating Bottom Interactive Click-Mode & Quick Firework Dock */}
      <div className="fixed bottom-4 right-4 z-40 flex items-center gap-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            soundEngine.playFireworkBurst();
            triggerFestiveBurst({ type: 'grand' });
          }}
          className="px-4 py-2.5 rounded-full bg-gradient-to-r from-[#D81B60] via-[#FF7A00] to-[#F5C542] text-[#FFFDF5] font-bold text-xs uppercase tracking-wider shadow-[0_8px_30px_rgba(216,27,96,0.55)] hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
          title="Launch instant celebratory Fireworks & Petal Shower"
        >
          <Sparkles className="w-4 h-4" />
          <span>Sky Burst</span>
        </button>

        {scrollY > 400 && (
          <a
            href="#hero-altar"
            aria-label="Scroll back to top Diya Altar"
            className="w-10 h-10 rounded-full royal-glass border border-[#F5C542]/45 flex items-center justify-center text-[#F5C542] hover:bg-[#F5C542] hover:text-[#09060E] transition-all shadow-lg"
          >
            <ArrowUp className="w-4 h-4" />
          </a>
        )}
      </div>
    </div>
  );
}

export default App;
