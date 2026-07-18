import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export default function Loader({ onComplete }) {
  const loaderRef = useRef(null);
  const counterRef = useRef(null);
  const nameRef = useRef(null);
  const [counter, setCounter] = useState(0);

  useGSAP(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        if (onComplete) onComplete();
      },
    });

    // Counter animation
    tl.to({}, {
      duration: 2,
      onUpdate: function() {
        const progress = Math.round(this.progress() * 100);
        setCounter(progress);
      },
      ease: 'power2.inOut',
    });

    // Split name into characters and animate
    const nameEl = nameRef.current;
    if (nameEl) {
      const text = 'ALEX CHEN';
      nameEl.innerHTML = '';
      const chars = text.split('').map((char) => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.style.display = 'inline-block';
        span.style.opacity = '0';
        span.style.transform = 'translateY(100%)';
        nameEl.appendChild(span);
        return span;
      });

      tl.to(chars, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.04,
        ease: 'power3.out',
      }, 0.3);
    }

    // Pause briefly
    tl.to({}, { duration: 0.5 });

    // Curtain wipe up
    tl.to(loaderRef.current, {
      yPercent: -100,
      duration: 1,
      ease: 'power4.inOut',
    });

  }, { scope: loaderRef });

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[9999] bg-pure-black flex items-center justify-center"
      style={{ willChange: 'transform' }}
      aria-label="Loading"
      role="progressbar"
      aria-valuenow={counter}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      {/* Name */}
      <h1
        ref={nameRef}
        className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-pure-white"
        style={{ perspective: '1000px', overflow: 'hidden' }}
      >
        ALEX CHEN
      </h1>

      {/* Counter */}
      <div
        ref={counterRef}
        className="absolute bottom-8 right-8 font-mono text-7xl md:text-9xl font-bold text-pure-white/10"
      >
        {String(counter).padStart(3, '0')}
      </div>

      {/* Subtle top line */}
      <div className="absolute top-0 left-0 w-full h-px bg-pure-white/5" />
    </div>
  );
}
