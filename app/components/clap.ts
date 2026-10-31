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

function ctxOrNull(): AudioContext | null {
  try {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    return new AC();
  } catch { return null; }
}

// Tape tearing off the roll: crackly noise with a rising sweep.
export function ripSound() {
  const ctx = ctxOrNull(); if (!ctx) return;
  try {
    const dur = 0.34, len = Math.floor(ctx.sampleRate * dur);
    const buf = ctx.createBuffer(1, len, ctx.sampleRate); const d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) { const crackle = Math.random() < 0.18 ? 1 : 0.25; d[i] = (Math.random() * 2 - 1) * crackle * Math.min(1, i / (len * 0.08)) * Math.pow(1 - i / len, 1.4); }
    const src = ctx.createBufferSource(); src.buffer = buf;
    const bp = ctx.createBiquadFilter(); bp.type = "bandpass"; bp.Q.value = 1.1;
    bp.frequency.setValueAtTime(900, ctx.currentTime); bp.frequency.exponentialRampToValueAtTime(3400, ctx.currentTime + dur);
    const g = ctx.createGain(); g.gain.value = 0.32;
    src.connect(bp).connect(g).connect(ctx.destination); src.start();
    setTimeout(() => ctx.close(), 700);
  } catch { /* fine */ }
}

// Pressing tape onto the wall: a soft thump with a little smack.
export function slapSound() {
  const ctx = ctxOrNull(); if (!ctx) return;
  try {
    const o = ctx.createOscillator(); const og = ctx.createGain();
    o.frequency.setValueAtTime(120, ctx.currentTime); o.frequency.exponentialRampToValueAtTime(45, ctx.currentTime + 0.12);
    og.gain.setValueAtTime(0.5, ctx.currentTime); og.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.16);
    o.connect(og).connect(ctx.destination); o.start(); o.stop(ctx.currentTime + 0.18);
    const len = Math.floor(ctx.sampleRate * 0.05); const buf = ctx.createBuffer(1, len, ctx.sampleRate); const d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 4);
    const s = ctx.createBufferSource(); s.buffer = buf; const lp = ctx.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = 1800;
    const g = ctx.createGain(); g.gain.value = 0.35; s.connect(lp).connect(g).connect(ctx.destination); s.start();
    setTimeout(() => ctx.close(), 500);
  } catch { /* fine */ }
}

// Peeling a strip up off the wall: a short, lower tear.
export function peelSound() {
  const ctx = ctxOrNull(); if (!ctx) return;
  try {
    const dur = 0.2, len = Math.floor(ctx.sampleRate * dur);
    const buf = ctx.createBuffer(1, len, ctx.sampleRate); const d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * (Math.random() < 0.25 ? 1 : 0.2) * Math.pow(1 - i / len, 2);
    const src = ctx.createBufferSource(); src.buffer = buf;
    const bp = ctx.createBiquadFilter(); bp.type = "bandpass"; bp.Q.value = 1.4;
    bp.frequency.setValueAtTime(2600, ctx.currentTime); bp.frequency.exponentialRampToValueAtTime(700, ctx.currentTime + dur);
    const g = ctx.createGain(); g.gain.value = 0.28;
    src.connect(bp).connect(g).connect(ctx.destination); src.start();
    setTimeout(() => ctx.close(), 500);
  } catch { /* fine */ }
}
