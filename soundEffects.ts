// Web Audio API Synthesized Festive Sound Engine (Zero external audio dependencies)

class FestiveSoundEngine {
  private ctx: AudioContext | null = null;
  public enabled: boolean = true;
  private ragaStep: number = 0;
  // Raga Bhupali / Mohanam pentatonic scale frequencies (Sa Re Ga Pa Dha Sa')
  private ragaNotes = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25];

  private getContext(): AudioContext | null {
    if (!this.enabled || typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  // Warm brass temple bell (Puja Ghanti)
  public playTempleBell(pitchMultiplier = 1) {
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const baseFreq = 528 * pitchMultiplier;
    const partials = [1, 2.0, 2.76, 3.8, 5.4];
    const gains = [0.22, 0.12, 0.08, 0.04, 0.02];

    partials.forEach((ratio, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = idx === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(baseFreq * ratio, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(gains[idx], now + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + (2.4 / (idx + 1)));

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 2.5);
    });
  }

  // Lighting a sacred clay Diya
  public playDiyaIgnite(index = 0) {
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const note = this.ragaNotes[index % this.ragaNotes.length];

    // Warm harmonic chord
    [1, 1.25, 1.5, 2].forEach((mult, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = i % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(note * mult * 0.85, now + i * 0.04);
      osc.frequency.exponentialRampToValueAtTime(note * mult, now + 0.28 + i * 0.04);

      gain.gain.setValueAtTime(0.001, now + i * 0.04);
      gain.gain.linearRampToValueAtTime(0.08 / (i + 1), now + 0.06 + i * 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.1 + i * 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + i * 0.04);
      osc.stop(now + 1.3);
    });
  }

  // Subtle crystalline Phuljhari sparkler chime on canvas clicks
  public playSparklerClick() {
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const note = this.ragaNotes[this.ragaStep % this.ragaNotes.length] * 2;
    this.ragaStep++;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(note, now);
    osc.frequency.exponentialRampToValueAtTime(note * 1.12, now + 0.18);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.045, now + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.25);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.26);
  }

  // Rangoli segment coloring melodic chime
  public playRangoliChime() {
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const freq = this.ragaNotes[this.ragaStep % this.ragaNotes.length];
    this.ragaStep++;

    [1, 1.5, 2].forEach((mult, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq * mult, now + idx * 0.03);

      gain.gain.setValueAtTime(0.001, now + idx * 0.03);
      gain.gain.linearRampToValueAtTime(0.07 / (idx + 1), now + idx * 0.03 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.65);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + idx * 0.03);
      osc.stop(now + 0.7);
    });
  }

  // Festive firework / Atishbazi burst sound
  public playFireworkBurst() {
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    // Sparkling arpeggio burst
    const chord = [523.25, 659.25, 783.99, 1046.5, 1318.5];
    chord.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.035);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.92, now + 0.55 + idx * 0.035);

      gain.gain.setValueAtTime(0.001, now + idx * 0.035);
      gain.gain.linearRampToValueAtTime(0.07, now + idx * 0.035 + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.6 + idx * 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + idx * 0.035);
      osc.stop(now + 0.7);
    });
  }
}

export const soundEngine = new FestiveSoundEngine();
