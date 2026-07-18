import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingParticles from './components/FloatingParticles';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [loading, setLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const cursorGlowRef = useRef(null);
  const appRef = useRef(null);

  // Initialize Lenis smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  // Cursor glow effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (cursorGlowRef.current) {
        gsap.to(cursorGlowRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.8,
          ease: 'power2.out',
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleLoaderComplete = () => {
    setLoading(false);
    setShowContent(true);
  };

  return (
    <div ref={appRef} className="relative min-h-screen bg-pure-black text-pure-white">
      {/* Loading Screen */}
      {loading && <Loader onComplete={handleLoaderComplete} />}

      {/* Cursor glow (desktop only) */}
      <div
        ref={cursorGlowRef}
        className="fixed top-0 left-0 w-[600px] h-[600px] pointer-events-none z-[1] hidden md:block"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)',
          transform: 'translate(-50%, -50%)',
          willChange: 'transform',
        }}
        aria-hidden="true"
      />

      {/* Floating particles background */}
      <FloatingParticles />

      {/* Main Content & Navigation (Rendered after loading completes) */}
      {showContent && (
        <div className="animate-fade-in opacity-0" style={{ animationFillMode: 'forwards' }}>
          <Navbar />
          
          <main>
            <Hero />
            
            {/* Section divider */}
            <div className="w-full flex justify-center py-8">
              <div className="w-px h-24 bg-gradient-to-b from-transparent via-pure-white/10 to-transparent" />
            </div>

            <About />
            
            <div className="w-full flex justify-center py-8">
              <div className="w-px h-24 bg-gradient-to-b from-transparent via-pure-white/10 to-transparent" />
            </div>

            <Projects />
            
            <div className="w-full flex justify-center py-8">
              <div className="w-px h-24 bg-gradient-to-b from-transparent via-pure-white/10 to-transparent" />
            </div>

            <Skills />
            
            <div className="w-full flex justify-center py-8">
              <div className="w-px h-24 bg-gradient-to-b from-transparent via-pure-white/10 to-transparent" />
            </div>

            <Contact />
          </main>

          <Footer />
        </div>
      )}
    </div>
  );
}
