import { useRef } from 'react';
import gsap from 'gsap';

export default function Footer() {
  const topBtnRef = useRef(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleMouseMove = (e) => {
    const btn = topBtnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.3;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.3;
    gsap.to(btn, { x, y, duration: 0.3, ease: 'power3.out' });
  };

  const handleMouseLeave = () => {
    gsap.to(topBtnRef.current, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.4)' });
  };

  return (
    <footer className="relative py-16 px-6 md:px-12 lg:px-24 border-t border-pure-white/5" role="contentinfo">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="text-center md:text-left">
          <p className="font-body text-sm text-pure-white/30">
            © {new Date().getFullYear()} Alex Chen. All rights reserved.
          </p>
          <p className="font-body text-xs text-pure-white/15 mt-1">
            Built with React, GSAP & a lot of ☕
          </p>
        </div>

        <button
          ref={topBtnRef}
          onClick={scrollToTop}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="w-12 h-12 rounded-full glass flex items-center justify-center text-pure-white/40 hover:text-pure-white hover:bg-pure-white/10 transition-all duration-300"
          aria-label="Back to top"
          id="back-to-top"
          style={{ willChange: 'transform' }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
          </svg>
        </button>
      </div>
    </footer>
  );
}
