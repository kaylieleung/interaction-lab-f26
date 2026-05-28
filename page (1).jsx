'use client';

import React, { useState, useEffect, useRef } from 'react';
import * as Tone from 'tone';
import { generate } from './lib/generate';

const QUESTIONS = [
  { id: 'safety_smell', text: 'a smell you associate with safety', hint: 'wet pavement, old books, your grandmother\'s kitchen…' },
  { id: 'lost_sound', text: 'a sound from a place that no longer exists', hint: 'something you can\'t hear again, even if you tried' },
  { id: 'revisit_year', text: 'a year you would revisit, but only briefly', hint: 'a year, or a season inside one' },
  { id: 'avoided_color', text: 'a color you have been avoiding', hint: 'a name, a hex, a feeling — whatever comes first' },
  { id: 'unspoken', text: 'something you would say if no one could hear', hint: 'one sentence' }
];

const ROMAN = ['i', 'ii', 'iii', 'iv', 'v'];

export default function LiminalSpace() {
  const [stage, setStage] = useState('intro');
  const [qIdx, setQIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [input, setInput] = useState('');
  const [blueprint, setBlueprint] = useState(null);
  const [loadingPhrase, setLoadingPhrase] = useState(0);

  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=IBM+Plex+Mono:wght@300;400&display=swap';
    document.head.appendChild(link);
    return () => { try { document.head.removeChild(link); } catch (e) {} };
  }, []);

  useEffect(() => {
    if (stage !== 'generating') return;
    const id = setInterval(() => setLoadingPhrase(p => (p + 1) % 5), 1500);
    return () => clearInterval(id);
  }, [stage]);

  const submitAnswer = () => {
    if (!input.trim()) return;
    const next = { ...answers, [QUESTIONS[qIdx].id]: input.trim() };
    setAnswers(next);
    setInput('');
    if (qIdx < QUESTIONS.length - 1) {
      setQIdx(qIdx + 1);
    } else {
      setStage('generating');
      // Brief pause for atmosphere
      setTimeout(() => {
        const bp = generate(next);
        setBlueprint(bp);
        setStage('ready');
      }, 4500);
    }
  };

  const restart = () => {
    setStage('intro');
    setQIdx(0);
    setAnswers({});
    setInput('');
    setBlueprint(null);
  };

  const AtmosphereBg = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      <div className="absolute rounded-full" style={{ width: '60vw', height: '60vw', left: '-10vw', top: '-15vw', background: 'radial-gradient(circle, #d8c8e0 0%, transparent 65%)', filter: 'blur(40px)', opacity: 0.55, animation: 'drift1 28s ease-in-out infinite alternate' }} />
      <div className="absolute rounded-full" style={{ width: '55vw', height: '55vw', right: '-15vw', top: '20vh', background: 'radial-gradient(circle, #f4d8c8 0%, transparent 65%)', filter: 'blur(50px)', opacity: 0.5, animation: 'drift2 34s ease-in-out infinite alternate' }} />
      <div className="absolute rounded-full" style={{ width: '50vw', height: '50vw', left: '20vw', bottom: '-20vh', background: 'radial-gradient(circle, #c8d8e8 0%, transparent 65%)', filter: 'blur(45px)', opacity: 0.55, animation: 'drift3 40s ease-in-out infinite alternate' }} />
    </div>
  );

  return (
    <div className="w-full min-h-screen relative overflow-hidden" style={{ background: '#f0ece4', fontFamily: 'Fraunces, Georgia, serif', color: '#2a2620' }}>
      <style>{`
        @keyframes drift1 { 0% { transform: translate(0,0); } 100% { transform: translate(8vw, 6vh); } }
        @keyframes drift2 { 0% { transform: translate(0,0); } 100% { transform: translate(-6vw, -4vh); } }
        @keyframes drift3 { 0% { transform: translate(0,0); } 100% { transform: translate(4vw, -8vh); } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slowPulse { 0%, 100% { opacity: 0.4; } 50% { opacity: 0.7; } }
        @keyframes drift-glow-a { 0% { transform: translate(0,0); } 50% { transform: translate(2%, -1.5%); } 100% { transform: translate(0,0); } }
        @keyframes drift-glow-b { 0% { transform: translate(0,0); } 50% { transform: translate(-1.5%, 2%); } 100% { transform: translate(0,0); } }
        @keyframes drift-glow-c { 0% { transform: translate(0,0); } 50% { transform: translate(1%, 1%); } 100% { transform: translate(0,0); } }
        .fade-up { animation: fadeUp 1.2s ease-out forwards; }
        .fade-in { animation: fadeIn 2s ease-out forwards; }
        .grain-overlay { position: absolute; inset: 0; pointer-events: none; opacity: 0.18; mix-blend-mode: multiply; }
        input.dream-input { background: transparent; border: none; border-bottom: 1px solid rgba(42,38,32,0.25); outline: none; font-family: Fraunces, serif; font-style: italic; font-weight: 300; color: #2a2620; width: 100%; padding: 0.5rem 0; font-size: 1.5rem; }
        input.dream-input:focus { border-bottom-color: rgba(42,38,32,0.6); }
        input.dream-input::placeholder { color: rgba(42,38,32,0.3); font-style: italic; }
        .mono { font-family: 'IBM Plex Mono', monospace; font-weight: 300; letter-spacing: 0.05em; }
      `}</style>

      <svg className="grain-overlay" style={{ zIndex: 1 }}>
        <filter id="g"><feTurbulence baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" /><feColorMatrix values="0 0 0 0 0.15  0 0 0 0 0.13  0 0 0 0 0.1  0 0 0 0.55 0"/></filter>
        <rect width="100%" height="100%" filter="url(#g)" />
      </svg>

      {stage === 'intro' && (
        <>
          <AtmosphereBg />
          <div className="relative flex flex-col items-center justify-center min-h-screen px-6" style={{ zIndex: 2 }}>
            <div className="mono text-xs mb-12 fade-in" style={{ opacity: 0.5, letterSpacing: '0.3em' }}>— a place generated only for you —</div>
            <h1 className="fade-up" style={{ fontSize: 'clamp(4rem, 12vw, 9rem)', fontWeight: 300, fontStyle: 'italic', letterSpacing: '-0.02em', lineHeight: 0.95, textAlign: 'center' }}>liminal</h1>
            <p className="fade-up text-center max-w-md mt-8 mono text-sm" style={{ opacity: 0.7, animationDelay: '0.4s', animationFillMode: 'both' }}>
              answer five questions. a space will be drawn from your answers. you can walk inside.
            </p>
            <button onClick={() => setStage('questions')} className="fade-up mono text-sm mt-16 px-6 py-2 transition-all hover:opacity-100" style={{ opacity: 0.7, border: '1px solid rgba(42,38,32,0.3)', borderRadius: 0, animationDelay: '0.8s', animationFillMode: 'both', letterSpacing: '0.2em' }}>
              [ begin ]
            </button>
          </div>
        </>
      )}

      {stage === 'questions' && (
        <>
          <AtmosphereBg />
          <div className="relative flex flex-col items-center justify-center min-h-screen px-6" style={{ zIndex: 2 }}>
            <div className="mono text-xs mb-16 flex gap-4" style={{ opacity: 0.6 }}>
              {ROMAN.map((r, i) => (
                <span key={r} style={{ opacity: i === qIdx ? 1 : i < qIdx ? 0.5 : 0.2, transition: 'opacity 0.6s' }}>{r}.</span>
              ))}
            </div>
            <div key={qIdx} className="w-full max-w-xl fade-up">
              <h2 style={{ fontSize: 'clamp(1.6rem, 3.4vw, 2.6rem)', fontWeight: 300, fontStyle: 'italic', lineHeight: 1.2, marginBottom: '0.6rem', letterSpacing: '-0.01em' }}>
                {QUESTIONS[qIdx].text}
              </h2>
              <p className="mono text-xs mb-8" style={{ opacity: 0.45 }}>{QUESTIONS[qIdx].hint}</p>
              <input
                className="dream-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && submitAnswer()}
                autoFocus
              />
              <div className="flex justify-end mt-6">
                <button onClick={submitAnswer} disabled={!input.trim()} className="mono text-xs px-4 py-2 transition-all" style={{ opacity: input.trim() ? 0.8 : 0.25, border: '1px solid rgba(42,38,32,0.3)', letterSpacing: '0.2em' }}>
                  [ {qIdx < QUESTIONS.length - 1 ? 'next' : 'generate'} ]
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {stage === 'generating' && (
        <>
          <AtmosphereBg />
          <div className="relative flex flex-col items-center justify-center min-h-screen" style={{ zIndex: 2 }}>
            <div style={{ width: 80, height: 80, border: '1px solid rgba(42,38,32,0.2)', borderRadius: '50%', animation: 'slowPulse 3s ease-in-out infinite' }} />
            <div key={loadingPhrase} className="mono text-sm mt-8 fade-in" style={{ opacity: 0.6, letterSpacing: '0.15em' }}>
              {['drawing the walls', 'remembering the smell', 'tuning the room', 'softening the light', 'placing the poem'][loadingPhrase]}…
            </div>
          </div>
        </>
      )}

      {stage === 'ready' && blueprint && (
        <>
          <AtmosphereBg />
          <div className="relative flex flex-col items-center justify-center min-h-screen px-6 py-16" style={{ zIndex: 2 }}>
            <div className="mono text-xs mb-8 fade-in" style={{ opacity: 0.5, letterSpacing: '0.3em' }}>— your space has formed —</div>
            <h2 className="fade-up text-center" style={{ fontSize: 'clamp(2.4rem, 6vw, 4.5rem)', fontWeight: 300, fontStyle: 'italic', letterSpacing: '-0.02em', lineHeight: 1.05 }}>
              {blueprint.name}
            </h2>
            <div className="fade-up max-w-xl mt-12 text-center" style={{ fontWeight: 300, fontSize: '1.1rem', lineHeight: 1.75, opacity: 0.85, animationDelay: '0.3s', animationFillMode: 'both' }}>
              {blueprint.description}
            </div>
            <button onClick={() => setStage('space')} className="fade-up mono text-sm mt-14 px-8 py-3 transition-all hover:opacity-100" style={{ opacity: 0.7, border: '1px solid rgba(42,38,32,0.4)', animationDelay: '0.9s', animationFillMode: 'both', letterSpacing: '0.3em' }}>
              [ enter ]
            </button>
            <p className="mono text-xs mt-6" style={{ opacity: 0.35 }}>headphones recommended · the poem is inside</p>
          </div>
        </>
      )}

      {stage === 'space' && blueprint && <Space blueprint={blueprint} onRestart={restart} />}
    </div>
  );
}

function Space({ blueprint, onRestart }) {
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
  const [entered, setEntered] = useState(false);
  const containerRef = useRef(null);
  const synthsRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    let disposed = false;
    const setup = async () => {
      try {
        await Tone.start();
        if (disposed) return;
        const reverb = new Tone.Reverb({ decay: 14, wet: 0.85 }).toDestination();
        await reverb.generate();
        const filter = new Tone.Filter(500, 'lowpass').connect(reverb);
        const drone = new Tone.PolySynth(Tone.AMSynth, {
          envelope: { attack: 8, decay: 2, sustain: 0.7, release: 12 },
          oscillator: { type: 'sine' },
          modulation: { type: 'sine' },
          harmonicity: 1.5
        }).connect(filter);
        drone.volume.value = -20;
        drone.triggerAttack(blueprint.mood.drone_notes || ['D2', 'A2']);
        const bells = new Tone.MetalSynth({
          envelope: { attack: 0.001, decay: 1.8, release: 3 },
          harmonicity: 5.1, modulationIndex: 24, resonance: 3500, octaves: 1.5
        }).connect(reverb);
        bells.volume.value = -32;
        const bellLoop = new Tone.Loop((time) => {
          if (Math.random() > 0.72) {
            const freqs = [523, 587, 698, 784, 880, 1047, 1175];
            bells.frequency.setValueAtTime(freqs[Math.floor(Math.random() * freqs.length)], time);
            bells.triggerAttackRelease(0.25, time);
          }
        }, '2n').start(0);
        Tone.Transport.bpm.value = blueprint.mood.tempo || 50;
        Tone.Transport.start();
        synthsRef.current = { drone, bells, bellLoop, filter, reverb };
      } catch (e) { console.error('Audio setup failed:', e); }
    };
    setup();
    return () => {
      disposed = true;
      if (synthsRef.current) {
        try {
          synthsRef.current.drone.releaseAll();
          Tone.Transport.stop();
          Tone.Transport.cancel();
          synthsRef.current.bellLoop.dispose();
          synthsRef.current.drone.dispose();
          synthsRef.current.bells.dispose();
          synthsRef.current.filter.dispose();
          synthsRef.current.reverb.dispose();
        } catch (e) {}
      }
    };
  }, [blueprint]);

  useEffect(() => {
    const handleMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      setMouse({ x: Math.max(0, Math.min(1, x)), y: Math.max(0, Math.min(1, y)) });
      if (synthsRef.current?.filter) {
        const target = 350 + (x + y) * 700;
        synthsRef.current.filter.frequency.rampTo(target, 0.4);
      }
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  const palette = blueprint.palette || ['#c8d6e5', '#f4d8c8', '#e8c8d4', '#a8b8c8'];

  return (
    <div ref={containerRef} className="fixed inset-0 overflow-hidden" style={{ background: palette[0], transition: 'opacity 3s', opacity: entered ? 1 : 0, cursor: 'crosshair', zIndex: 50 }}>
      <div className="absolute inset-0" style={{
        background: `radial-gradient(ellipse at ${50 + (mouse.x - 0.5) * 8}% ${50 + (mouse.y - 0.5) * 8}%, ${palette[1]} 0%, ${palette[0]} 40%, ${palette[3] || palette[0]} 100%)`,
        transition: 'background 1.2s ease-out'
      }} />
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice" viewBox="0 0 100 100">
        <defs>
          <filter id="softblur"><feGaussianBlur stdDeviation="3" /></filter>
          <filter id="bigblur"><feGaussianBlur stdDeviation="5" /></filter>
        </defs>
        {blueprint.elements?.map((el, i) => {
          const parallaxX = (mouse.x - 0.5) * (i % 2 === 0 ? 3 : -2);
          const parallaxY = (mouse.y - 0.5) * (i % 2 === 0 ? 2 : -3);
          const cx = el.x * 100 + parallaxX;
          const cy = el.y * 100 + parallaxY;
          const r = el.size * 50;
          const driftClass = i % 3 === 0 ? 'drift-glow-a' : i % 3 === 1 ? 'drift-glow-b' : 'drift-glow-c';
          if (el.type === 'doorway') {
            return (
              <g key={i} style={{ animation: `${driftClass} ${14 + i * 2}s ease-in-out infinite` }}>
                <rect x={cx - r * 0.4} y={cy - r * 0.8} width={r * 0.8} height={r * 1.6} fill={el.hue} opacity="0.35" filter="url(#bigblur)" />
                <rect x={cx - r * 0.25} y={cy - r * 0.6} width={r * 0.5} height={r * 1.2} fill={el.hue} opacity="0.6" filter="url(#softblur)" />
              </g>
            );
          }
          if (el.type === 'shape') {
            return (
              <ellipse key={i} cx={cx} cy={cy} rx={r * 1.2} ry={r * 0.7} fill={el.hue} opacity="0.5" filter="url(#bigblur)"
                style={{ animation: `${driftClass} ${16 + i * 2}s ease-in-out infinite` }} />
            );
          }
          return (
            <circle key={i} cx={cx} cy={cy} r={r} fill={el.hue} opacity={0.55 - i * 0.04} filter="url(#bigblur)"
              style={{ animation: `${driftClass} ${18 + i}s ease-in-out infinite` }} />
          );
        })}
      </svg>
      <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none" viewBox="0 0 100 100">
        <path d="M 5 78 Q 25 70, 45 76 T 95 72" fill="none" stroke={palette[3] || '#888'} strokeWidth="0.12" opacity="0.4" />
        <path d="M 8 22 Q 30 30, 52 26 T 92 28" fill="none" stroke={palette[2] || '#888'} strokeWidth="0.1" opacity="0.35" />
        <path d="M 50 5 Q 48 30, 52 55 T 48 95" fill="none" stroke={palette[3] || '#888'} strokeWidth="0.08" opacity="0.3" />
      </svg>
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, transparent 30%, rgba(20,15,10,0.35) 100%)' }} />
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.22, mixBlendMode: 'multiply' }}>
        <filter id="sg"><feTurbulence baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" /><feColorMatrix values="0 0 0 0 0.1  0 0 0 0 0.08  0 0 0 0 0.06  0 0 0 0.6 0" /></filter>
        <rect width="100%" height="100%" filter="url(#sg)" />
      </svg>
      {blueprint.fragments?.map((f, i) => {
        const dx = f.x - mouse.x;
        const dy = f.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const proximity = Math.max(0, 1 - dist / 0.22);
        return (
          <div key={i} className="absolute pointer-events-none" style={{
            left: `${f.x * 100}%`, top: `${f.y * 100}%`, transform: 'translate(-50%, -50%)',
            opacity: proximity * 0.95, transition: 'opacity 0.5s ease-out',
            color: '#1f1a14', fontFamily: 'Fraunces, serif', fontStyle: 'italic',
            fontWeight: 300, fontSize: '1.05rem', letterSpacing: '0.01em',
            textShadow: '0 0 18px rgba(255,250,240,0.8), 0 0 8px rgba(255,250,240,0.5)',
            maxWidth: '280px', textAlign: 'center', lineHeight: 1.5,
            whiteSpace: 'pre-line'
          }}>
            {f.text}
          </div>
        );
      })}
      <div className="absolute pointer-events-none" style={{
        left: `${mouse.x * 100}%`, top: `${mouse.y * 100}%`,
        width: 140, height: 140, transform: 'translate(-50%, -50%)',
        background: `radial-gradient(circle, ${palette[1]}40 0%, transparent 70%)`,
        borderRadius: '50%', mixBlendMode: 'screen'
      }} />
      <div className="absolute top-6 left-6 mono text-xs" style={{ color: '#1f1a14', opacity: 0.55, letterSpacing: '0.15em', zIndex: 10 }}>
        <div style={{ fontStyle: 'italic', fontFamily: 'Fraunces, serif', fontSize: '0.95rem', marginBottom: '0.2rem' }}>{blueprint.name}</div>
        <div style={{ opacity: 0.7 }}>{blueprint.mood?.key} · {blueprint.mood?.tempo} bpm</div>
      </div>
      <button onClick={onRestart} className="absolute bottom-6 right-6 mono text-xs px-3 py-1.5" style={{ color: '#1f1a14', opacity: 0.4, border: '1px solid rgba(31,26,20,0.3)', letterSpacing: '0.15em', zIndex: 10, background: 'rgba(255,250,240,0.1)' }}>
        [ leave ]
      </button>
      <div className="absolute bottom-6 left-6 mono text-xs" style={{ color: '#1f1a14', opacity: 0.4, letterSpacing: '0.15em', zIndex: 10, maxWidth: '320px', lineHeight: 1.5 }}>
        move slowly. the poem is in pieces.
      </div>
    </div>
  );
}
