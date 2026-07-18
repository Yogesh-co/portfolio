import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import MagneticButton from './MagneticButton';
import ProfileMosaic from './ProfileMosaic';

export default function Hero() {
  const sectionRef = useRef(null);
  const nameRef = useRef(null);
  const titleRef = useRef(null);
  const taglineRef = useRef(null);
  const ctaRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({ delay: 0.25 });

    // Name character animation
    const nameEl = nameRef.current;
    if (nameEl) {
      const text = 'ALEX CHEN';
      nameEl.innerHTML = '';
      const chars = text.split('').map((char) => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.style.display = 'inline-block';
        span.style.willChange = 'transform, opacity';
        nameEl.appendChild(span);
        return span;
      });

      tl.from(chars, {
        y: 80,
        opacity: 0,
        rotateX: 50,
        duration: 1,
        stagger: 0.04,
        ease: 'power3.out',
        transformOrigin: 'bottom center',
      }, 0);
    }

    // Title fade up with blur
    tl.from(titleRef.current, {
      y: 30,
      opacity: 0,
      filter: 'blur(10px)',
      duration: 1,
      ease: 'power3.out',
    }, 0.3);

    // Tagline fade up
    tl.from(taglineRef.current, {
      y: 30,
      opacity: 0,
      filter: 'blur(10px)',
      duration: 1,
      ease: 'power3.out',
    }, 0.5);

    // CTA buttons
    tl.from(ctaRef.current?.children ? Array.from(ctaRef.current.children) : [], {
      y: 20,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out',
    }, 0.7);

  }, { scope: sectionRef });

  // Parallax on mouse move
  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const moveX = (clientX / innerWidth - 0.5) * 20;
    const moveY = (clientY / innerHeight - 0.5) * 20;

    const parallaxEls = sectionRef.current?.querySelectorAll('.hero-parallax');
    if (parallaxEls) {
      gsap.to(parallaxEls, {
        x: moveX,
        y: moveY,
        duration: 1,
        ease: 'power2.out',
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center px-6 md:px-12 lg:px-24 overflow-hidden"
      onMouseMove={handleMouseMove}
      aria-label="Hero section"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Text Content */}
        <div className="order-2 lg:order-1 text-center lg:text-left">
          <div className="overflow-hidden mb-4">
            <h1
              ref={nameRef}
              className="font-heading text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-pure-white glow-text hero-parallax"
              style={{ perspective: '1000px' }}
            >
              ALEX CHEN
            </h1>
          </div>

          <p
            ref={titleRef}
            className="font-heading text-xl md:text-2xl lg:text-3xl font-light text-pure-white/70 tracking-wide mb-6"
          >
            Full Stack Developer
          </p>

          <p
            ref={taglineRef}
            className="font-body text-base md:text-lg text-pure-white/40 max-w-md mx-auto lg:mx-0 mb-10 leading-relaxed"
          >
            Crafting exceptional digital experiences through clean code,
            thoughtful design, and relentless attention to detail.
          </p>

          <div ref={ctaRef} className="flex flex-wrap gap-4 justify-center lg:justify-start">
            <MagneticButton
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              id="hero-cta-projects"
            >
              View Projects
            </MagneticButton>
            <MagneticButton
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-pure-white text-pure-black border-pure-white hover:bg-transparent hover:text-pure-white"
              id="hero-cta-contact"
            >
              Get in Touch
            </MagneticButton>
          </div>
        </div>

        {/* Profile Mosaic */}
        <div className="order-1 lg:order-2 flex justify-center lg:justify-end hero-parallax">
          <ProfileMosaic />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <span className="font-body text-xs tracking-[0.3em] uppercase">Scroll</span>
        <div className="w-px h-8 bg-pure-white/30 animate-pulse" />
      </div>
    </section>
  );
}
