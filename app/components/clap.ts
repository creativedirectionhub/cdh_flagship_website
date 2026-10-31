// A short slate clap, synthesized. Only ever called from a tap or click.
export function clapSound() {
  try {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new AC();
    const len = Math.floor(ctx.sampleRate * 0.09);
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 6);
    const src = ctx.createBufferSource(); src.buffer = buf;
    const bp = ctx.createBiquadFilter(); bp.type = "bandpass"; bp.frequency.value = 2200; bp.Q.value = 0.7;
    const g = ctx.createGain(); g.gain.value = 0.35;
    src.connect(bp).connect(g).connect(ctx.destination);
    const o = ctx.createOscillator(); const og = ctx.createGain();
    o.frequency.setValueAtTime(160, ctx.currentTime); o.frequency.exponentialRampToValueAtTime(60, ctx.currentTime + 0.08);
    og.gain.setValueAtTime(0.25, ctx.currentTime); og.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
    o.connect(og).connect(ctx.destination);
    src.start(); o.start(); o.stop(ctx.currentTime + 0.12);
    setTimeout(() => ctx.close(), 400);
  } catch { /* no audio, no problem */ }
}
