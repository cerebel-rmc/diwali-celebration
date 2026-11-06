import React, { useState } from 'react';
import { Sparkles, Copy, Check, Send, Heart, Gift } from 'lucide-react';
import { ScrollReveal } from '../hooks/useScrollAnimations';
import { RangoliZoneColors } from './RangoliAndCrackerStudio';
import { SHAHI_MITHAI_LIST } from './ShahiMithaiBento';
import { soundEngine } from '../utils/soundEffects';
import { triggerFestiveBurst } from './FestiveParticleCanvas';

interface GreetingCardStudioProps {
  rangoliColors: RangoliZoneColors;
  selectedMithaiIds: string[];
  litDiyasCount: number;
}

const BLESSING_TEMPLATES = [
  {
    label: '✨ Prosperity & Light',
    sanskrit: 'शुभं करोति कल्याणमारोग्यं धनसंपदा ।',
    message:
      'May the sacred golden glow of a thousand Diyas illuminate your life with endless joy, good health, wisdom, and boundless prosperity. Shubh Deepavali!',
  },
  {
    label: '🪷 Mahalakshmi Grace',
    sanskrit: 'ॐ श्रीं ह्रीं श्रीं कमले कमलालये प्रसीद प्रसीद ।',
    message:
      'May Goddess Lakshmi and Lord Ganesha bless your home with auspicious beginnings, harmony, and sweet abundance throughout the New Year.',
  },
  {
    label: '🌸 Warm Family Wishes',
    sanskrit: 'दीपोत्सव की हार्दिक शुभकामनाएँ ।',
    message:
      'Sending you a box full of sweet Kaju Katli, vibrant Rangoli colors, and sparkling skies. May every moment of this festival bring warmth to your family!',
  },
  {
    label: '🪔 Peace & Renewal',
    sanskrit: 'तमसो मा ज्योतिर्गमय ।',
    message:
      'As every clay lamp dispels the darkest Amavasya night, may hope, peace, and radiant inspiration fill every corner of your heart this Diwali.',
  },
];

const CARD_THEMES = [
  {
    id: 'kundan',
    name: 'Royal Kundan Gold',
    bg: 'from-[#1F112E] via-[#130D1C] to-[#09060E]',
    border: 'border-[#F5C542]/60',
    accent: '#F5C542',
  },
  {
    id: 'kumkum',
    name: 'Kumkum Sindoor Velvet',
    bg: 'from-[#3B0D24] via-[#1D0A1B] to-[#09060E]',
    border: 'border-[#D81B60]/65',
    accent: '#D81B60',
  },
  {
    id: 'peacock',
    name: 'Vrindavan Emerald',
    bg: 'from-[#082C29] via-[#0F1B29] to-[#09060E]',
    border: 'border-[#00C49A]/60',
    accent: '#00C49A',
  },
];

export const GreetingCardStudio: React.FC<GreetingCardStudioProps> = ({
  rangoliColors,
  selectedMithaiIds,
  litDiyasCount,
}) => {
  const [recipient, setRecipient] = useState('Dear Family & Friends');
  const [sender, setSender] = useState('With Warm Festive Love');
  const [selectedTemplateIdx, setSelectedTemplateIdx] = useState(0);
  const [customMessage, setCustomMessage] = useState(BLESSING_TEMPLATES[0].message);
  const [themeId, setThemeId] = useState('kundan');
  const [copied, setCopied] = useState(false);
  const [cardSparkling, setCardSparkling] = useState(false);

  const activeTheme = CARD_THEMES.find((t) => t.id === themeId) || CARD_THEMES[0];
  const activeTemplate = BLESSING_TEMPLATES[selectedTemplateIdx];

  const selectedSweets = SHAHI_MITHAI_LIST.filter((m) =>
    selectedMithaiIds.includes(m.id)
  );

  const handleTemplateSelect = (idx: number) => {
    setSelectedTemplateIdx(idx);
    setCustomMessage(BLESSING_TEMPLATES[idx].message);
    soundEngine.playSparklerClick();
  };

  const handleCelebrateCard = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCardSparkling(true);
    soundEngine.playTempleBell(1.15);
    soundEngine.playFireworkBurst();
    triggerFestiveBurst({ type: 'grand' });
    setTimeout(() => setCardSparkling(false), 1800);
  };

  const handleCopyGreeting = (e: React.MouseEvent) => {
    e.stopPropagation();
    const sweetsText =
      selectedSweets.length > 0
        ? `\n🍬 Festive Mithai Box: ${selectedSweets.map((s) => s.name).join(', ')}`
        : '';
    const fullText = `🪔✨ SHUBH DEEPAVALI ✨🪔\n${activeTemplate.sanskrit}\n\nTo: ${recipient}\n\n"${customMessage}"${sweetsText}\n🪔 Sacred Diyas Lit: ${litDiyasCount}/7\n\n— ${sender}`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(fullText).catch(() => {});
    }
    setCopied(true);
    soundEngine.playRangoliChime();
    triggerFestiveBurst({
      type: 'petals',
      x: e.clientX,
      y: e.clientY,
    });
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <section
      id="shubh-sandesh"
      className="relative py-20 sm:py-28 px-4 sm:px-8 max-w-[1320px] mx-auto"
    >
      <ScrollReveal className="text-center max-w-3xl mx-auto mb-14">
        <span className="inline-block text-xs sm:text-sm uppercase tracking-[0.22em] text-[#F5C542] font-semibold mb-3">
          शुभ संदेश पत्रिका · Personalized Blessing Studio
        </span>
        <h2
          className="font-display text-gold-shimmer mb-4"
          style={{ fontSize: 'clamp(2rem, 3.5vw + 0.5rem, 3.25rem)' }}
        >
          Craft &amp; Send Your Royal Diwali Greeting
        </h2>
        <p className="text-[#D4C4B4] text-sm sm:text-base leading-relaxed">
          Your custom-painted <span className="text-[#F5C542]">Rangoli Mandala</span> and hand-picked{' '}
          <span className="text-[#FF7A00]">Shahi Mithai Box</span> are automatically woven into your royal invitation card below.
        </p>
      </ScrollReveal>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left 5 Columns: Composer Controls */}
        <ScrollReveal direction="left" className="lg:col-span-5">
          <div className="royal-glass rounded-3xl p-6 sm:p-8 h-full flex flex-col justify-between border border-[#F5C542]/30 space-y-5">
            <div className="space-y-5">
              <div>
                <label
                  htmlFor="recipient-input"
                  className="block text-xs uppercase tracking-wider text-[#F5C542] font-semibold mb-2"
                >
                  To (Recipient Name)
                </label>
                <input
                  id="recipient-input"
                  type="text"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  placeholder="e.g., Priya, Rohan & Family"
                  className="w-full px-4 py-3 rounded-xl bg-[#09060E]/80 border border-[#F5C542]/30 focus:border-[#F5C542] focus:outline-none text-sm text-[#FFF9F0]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#F5C542] font-semibold mb-2">
                  Choose Auspicious Blessing Preset
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {BLESSING_TEMPLATES.map((tpl, idx) => (
                    <button
                      key={tpl.label}
                      type="button"
                      onClick={() => handleTemplateSelect(idx)}
                      className={`px-3 py-2 rounded-xl text-xs font-medium text-left border transition-all cursor-pointer ${
                        selectedTemplateIdx === idx
                          ? 'bg-[#F5C542]/20 border-[#F5C542] text-[#FFF9F0]'
                          : 'bg-[#09060E]/60 border-white/10 text-[#D4C4B4] hover:border-white/30'
                      }`}
                    >
                      {tpl.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label
                  htmlFor="blessing-textarea"
                  className="block text-xs uppercase tracking-wider text-[#F5C542] font-semibold mb-2"
                >
                  Personalize Your Diwali Message
                </label>
                <textarea
                  id="blessing-textarea"
                  rows={3}
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#09060E]/80 border border-[#F5C542]/30 focus:border-[#F5C542] focus:outline-none text-sm text-[#FFF9F0] leading-relaxed resize-none"
                />
              </div>

              <div>
                <label
                  htmlFor="sender-input"
                  className="block text-xs uppercase tracking-wider text-[#F5C542] font-semibold mb-2"
                >
                  From (Your Name / Family)
                </label>
                <input
                  id="sender-input"
                  type="text"
                  value={sender}
                  onChange={(e) => setSender(e.target.value)}
                  placeholder="e.g., Aarav & Family"
                  className="w-full px-4 py-3 rounded-xl bg-[#09060E]/80 border border-[#F5C542]/30 focus:border-[#F5C542] focus:outline-none text-sm text-[#FFF9F0]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#F5C542] font-semibold mb-2">
                  Royal Card Foil Theme
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {CARD_THEMES.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setThemeId(t.id)}
                      className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                        themeId === t.id
                          ? 'border-[#FFFDF5] bg-white/15 text-[#FFF9F0]'
                          : 'border-white/10 bg-[#09060E]/60 text-[#9A8678]'
                      }`}
                    >
                      {t.name.split(' ')[1]}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={handleCelebrateCard}
                className="flex-1 py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#FF7A00] via-[#F5C542] to-[#FF9E2C] text-[#09060E] font-bold text-xs sm:text-sm uppercase tracking-wider shadow-[0_0_24px_rgba(245,197,66,0.4)] hover:scale-[1.02] active:scale-98 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Ignite &amp; Shower Petals</span>
              </button>

              <button
                type="button"
                onClick={handleCopyGreeting}
                className="py-3.5 px-4 rounded-xl bg-[#09060E]/90 border border-[#F5C542]/45 hover:border-[#F5C542] text-[#FFF9F0] font-semibold text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-[#00C49A]" />
                    <span className="text-[#00C49A]">Copied Blessing!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-[#F5C542]" />
                    <span>Copy Card Text</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* Right 7 Columns: Live Royal Greeting Card Preview */}
        <ScrollReveal direction="right" delay={120} className="lg:col-span-7">
          <div
            onClick={handleCelebrateCard}
            title="Click the Royal Card to trigger a celebratory Marigold & Firework shower!"
            className={`relative h-full rounded-3xl p-7 sm:p-10 bg-gradient-to-br ${
              activeTheme.bg
            } border-2 ${
              activeTheme.border
            } shadow-[0_25px_80px_rgba(0,0,0,0.85)] flex flex-col justify-between overflow-hidden cursor-pointer transition-transform duration-500 ${
              cardSparkling ? 'scale-[1.02] shadow-[0_0_60px_rgba(245,197,66,0.5)]' : ''
            }`}
          >
            {/* Intricate Brass Filigree Corners */}
            <div className="pointer-events-none absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-[#F5C542]/60 rounded-tl-xl" />
            <div className="pointer-events-none absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-[#F5C542]/60 rounded-tr-xl" />
            <div className="pointer-events-none absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-[#F5C542]/60 rounded-bl-xl" />
            <div className="pointer-events-none absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-[#F5C542]/60 rounded-br-xl" />

            {/* Top Sacred Shloka & Diya Emblem */}
            <div className="text-center relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#09060E]/65 border border-[#F5C542]/40 text-xs text-[#F5C542] font-semibold mb-4">
                <span>🪔</span>
                <span>{activeTemplate.sanskrit}</span>
                <span>🪔</span>
              </div>

              <p className="text-xs uppercase tracking-[0.22em] text-[#D4C4B4] mb-1">
                Auspicious Festival Greetings To
              </p>
              <h3 className="font-display text-2xl sm:text-4xl text-gold-shimmer mb-4">
                {recipient || 'Dear Family & Friends'}
              </h3>
            </div>

            {/* Centerpiece Live Preview of User's Custom Rangoli Mandala */}
            <div className="relative z-10 my-2 flex flex-col items-center">
              <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full p-2 bg-[#09060E]/55 border border-[#F5C542]/35 shadow-[0_0_40px_rgba(255,122,0,0.25)] flex items-center justify-center">
                <svg
                  viewBox="0 0 400 400"
                  className="w-full h-full animate-[spin_45s_linear_infinite]"
                >
                  <circle
                    cx="200"
                    cy="200"
                    r="182"
                    fill={rangoliColors.outerScallop}
                    fillOpacity="0.3"
                    stroke={rangoliColors.outerScallop}
                    strokeWidth="4"
                  />
                  <circle
                    cx="200"
                    cy="200"
                    r="146"
                    fill={rangoliColors.peacockRing}
                  />
                  {Array.from({ length: 8 }).map((_, i) => (
                    <polygon
                      key={i}
                      points="200,68 232,140 200,165 168,140"
                      fill={rangoliColors.kalashDiamond}
                      transform={`rotate(${i * 45} 200 200)`}
                    />
                  ))}
                  {Array.from({ length: 12 }).map((_, i) => (
                    <path
                      key={i}
                      d="M200,88 C220,115 220,145 200,175 C180,145 180,115 200,88 Z"
                      fill={rangoliColors.outerLotus}
                      transform={`rotate(${i * 30 + 15} 200 200)`}
                    />
                  ))}
                  <circle
                    cx="200"
                    cy="200"
                    r="72"
                    fill={rangoliColors.innerChakra}
                  />
                  {Array.from({ length: 8 }).map((_, i) => (
                    <path
                      key={i}
                      d="M200,136 C214,155 214,178 200,196 C186,178 186,155 200,136 Z"
                      fill={rangoliColors.innerLotus}
                      transform={`rotate(${i * 45} 200 200)`}
                    />
                  ))}
                  <circle cx="200" cy="200" r="28" fill={rangoliColors.binduCore} />
                </svg>
              </div>

              {/* Message Body */}
              <blockquote className="mt-5 max-w-xl text-center font-serif-editorial italic text-lg sm:text-xl text-[#FFF9F0] leading-relaxed px-2">
                &ldquo;{customMessage}&rdquo;
              </blockquote>
            </div>

            {/* Included Mithai Gift Box & Lit Diyas Badges + Sender Signature */}
            <div className="relative z-10 mt-6 pt-5 border-t border-[#F5C542]/25 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#09060E]/75 border border-[#F5C542]/35 text-xs text-[#F5C542]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{litDiyasCount}/7 Altar Diyas Lit</span>
                </span>
                {selectedSweets.length > 0 && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#09060E]/75 border border-[#00C49A]/40 text-xs text-[#00C49A]">
                    <Gift className="w-3.5 h-3.5" />
                    <span>
                      {selectedSweets.map((s) => s.name.split(' ').slice(-2).join(' ')).join(' · ')}
                    </span>
                  </span>
                )}
              </div>

              <div className="text-center sm:text-right">
                <span className="block text-[10px] uppercase tracking-[0.2em] text-[#9A8678]">
                  Sent With Blessings By
                </span>
                <span className="font-serif-editorial text-lg font-bold text-[#F5C542] flex items-center justify-center sm:justify-end gap-1.5">
                  <Heart className="w-3.5 h-3.5 text-[#D81B60] fill-[#D81B60]" />
                  <span>{sender || 'With Warm Festive Love'}</span>
                </span>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
