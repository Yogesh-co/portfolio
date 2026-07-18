import { useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticButton from './MagneticButton';

gsap.registerPlugin(ScrollTrigger);

const getMetrics = (slug) => {
  switch (slug) {
    case 'nexus-platform':
      return [
        { value: '40%', label: 'Faster Decisions' },
        { value: '99.9%', label: 'Platform Uptime' },
      ];
    case 'cipher-chat':
      return [
        { value: '10k+', label: 'Active Users' },
        { value: 'A+', label: 'Security Grade' },
      ];
    case 'synthwave-studio':
      return [
        { value: '5,000+', label: 'Tracks Produced' },
        { value: '60%', label: 'Time Saved' },
      ];
    case 'terraform-viz':
      return [
        { value: '200+', label: 'DevOps Teams' },
        { value: '70%', label: 'Review Speedup' },
      ];
    default:
      return [];
  }
};

export default function CaseStudy({ project, onClose }) {
  const overlayRef = useRef(null);
  const contentRef = useRef(null);
  const metrics = getMetrics(project.slug);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  useGSAP(() => {
    const tl = gsap.timeline();

    // Animate double curtains sliding up to reveal content
    tl.to('.case-study-curtain', {
      yPercent: -100,
      duration: 0.9,
      ease: 'power3.inOut',
    });

    tl.to('.case-study-curtain-2', {
      yPercent: -100,
      duration: 0.9,
      ease: 'power3.inOut',
    }, 0.1);

    // Make the wrapper container active
    tl.set(overlayRef.current, { opacity: 1, pointerEvents: 'auto' }, 0.45);

    // Animate main content slide in
    tl.from(contentRef.current, {
      y: 60,
      opacity: 0,
      filter: 'blur(10px)',
      duration: 0.8,
      ease: 'power3.out',
    }, 0.5);

    // Reveal banner image wrapper with clip-path
    tl.fromTo('.case-study-banner-wrapper',
      { clipPath: 'inset(100% 0 0 0)' },
      { clipPath: 'inset(0% 0 0 0)', duration: 1.2, ease: 'power4.inOut' },
      0.4
    );

    // Fade in banner image with scale down
    const banner = overlayRef.current.querySelector('.case-study-banner');
    if (banner) {
      tl.fromTo(banner,
        { scale: 1.2, filter: 'blur(5px)' },
        { scale: 1, filter: 'blur(0px)', duration: 1.4, ease: 'power3.out' },
        0.5
      );

      // Create parallax effect on scroll inside the overlay
      gsap.to(banner, {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: '.case-study-banner-wrapper',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
          scroller: overlayRef.current,
        }
      });
    }

    // Stagger character/element reveal in the header
    const title = overlayRef.current.querySelector('.case-study-title');
    if (title) {
      const text = title.textContent;
      title.innerHTML = '';
      const chars = text.split('').map((char) => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.style.display = 'inline-block';
        title.appendChild(span);
        return span;
      });

      tl.from(chars, {
        y: 40,
        opacity: 0,
        rotateX: 30,
        duration: 0.8,
        stagger: 0.02,
        ease: 'power3.out',
      }, 0.65);
    }

    // Fade in text blocks on scroll trigger inside the overlay
    const sections = overlayRef.current.querySelectorAll('.case-study-section');
    sections.forEach((sec) => {
      gsap.from(sec, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sec,
          start: 'top 85%',
          scroller: overlayRef.current,
        }
      });
    });

  }, { scope: overlayRef });

  const handleClose = () => {
    // Prevent multiple clicks
    if (overlayRef.current.style.pointerEvents === 'none') return;
    overlayRef.current.style.pointerEvents = 'none';

    const tl = gsap.timeline({
      onComplete: onClose,
    });

    // Bring curtains back to cover
    tl.to('.case-study-curtain-2', {
      yPercent: 0,
      duration: 0.7,
      ease: 'power3.inOut',
    });

    tl.to('.case-study-curtain', {
      yPercent: 0,
      duration: 0.7,
      ease: 'power3.inOut',
    }, 0.08);

    tl.to(contentRef.current, {
      opacity: 0,
      y: 40,
      duration: 0.5,
      ease: 'power3.in',
    }, 0);
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[200] bg-pure-black overflow-y-auto pointer-events-none opacity-0"
      role="dialog"
      aria-modal="true"
      aria-label={`Case study: ${project.title}`}
    >
      {/* Wipe Curtains */}
      <div className="case-study-curtain fixed inset-0 bg-pure-white z-[250] pointer-events-none" style={{ transform: 'translateY(100%)', willChange: 'transform' }} />
      <div className="case-study-curtain-2 fixed inset-0 bg-pure-black z-[240] pointer-events-none" style={{ transform: 'translateY(100%)', willChange: 'transform' }} />

      {/* Close button (Floating Top Right) */}
      <button
        onClick={handleClose}
        className="fixed top-8 right-8 z-[201] w-14 h-14 rounded-full glass flex items-center justify-center text-pure-white/60 hover:text-pure-white hover:bg-pure-white/10 transition-all duration-300 pointer-events-auto cursor-pointer"
        aria-label="Close case study"
        id="case-study-close"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Main Content Scrollable Container */}
      <div
        ref={contentRef}
        className="max-w-5xl mx-auto px-6 md:px-12 py-32 pointer-events-auto"
      >
        {/* Header */}
        <header className="mb-16">
          <p className="font-mono text-xs text-pure-white/30 tracking-[0.3em] uppercase mb-4">
            {project.subtitle}
          </p>
          <h2 className="case-study-title font-heading text-5xl md:text-8xl font-bold tracking-tighter text-pure-white mb-10 leading-none" style={{ perspective: '1000px' }}>
            {project.title}
          </h2>

          {/* Meta Info Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-y border-pure-white/10 my-12">
            <div>
              <p className="font-mono text-xs text-pure-white/30 uppercase tracking-[0.2em] mb-2">Project</p>
              <p className="font-body text-sm font-semibold text-pure-white">{project.title}</p>
            </div>
            <div>
              <p className="font-mono text-xs text-pure-white/30 uppercase tracking-[0.2em] mb-2">Role</p>
              <p className="font-body text-sm font-semibold text-pure-white">Full-Stack Dev</p>
            </div>
            <div>
              <p className="font-mono text-xs text-pure-white/30 uppercase tracking-[0.2em] mb-2">Timeline</p>
              <p className="font-body text-sm font-semibold text-pure-white">{project.year}</p>
            </div>
            <div>
              <p className="font-mono text-xs text-pure-white/30 uppercase tracking-[0.2em] mb-2">Services</p>
              <p className="font-body text-sm font-semibold text-pure-white">Code & Design</p>
            </div>
          </div>
        </header>

        {/* Cinematic Parallax Banner */}
        <div className="relative w-full h-[50vh] md:h-[60vh] overflow-hidden rounded-3xl mb-24 case-study-banner-wrapper bg-pure-black border border-pure-white/10">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-pure-black/75 z-10" />
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover case-study-banner"
            style={{ transformOrigin: 'center center', filter: 'brightness(0.9)' }}
          />
        </div>

        {/* Narrative Swiss Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 md:gap-24">
          {/* Main story col */}
          <div className="lg:col-span-2 space-y-16">
            <div className="case-study-section">
              <h3 className="font-heading text-sm tracking-[0.3em] uppercase text-pure-white/30 mb-4">
                The Challenge
              </h3>
              <p className="font-body text-lg md:text-xl text-pure-white/60 leading-relaxed font-light">
                {project.challenge}
              </p>
            </div>

            <div className="case-study-section">
              <h3 className="font-heading text-sm tracking-[0.3em] uppercase text-pure-white/30 mb-4">
                The Solution
              </h3>
              <p className="font-body text-lg md:text-xl text-pure-white/60 leading-relaxed font-light">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Sidebar metrics & tech col */}
          <div className="space-y-16">
            {metrics.length > 0 && (
              <div className="case-study-section">
                <h3 className="font-heading text-sm tracking-[0.3em] uppercase text-pure-white/30 mb-6">
                  Key Metrics
                </h3>
                <div className="border border-pure-white/10 rounded-2xl p-6 bg-pure-white/5 space-y-6">
                  {metrics.map((metric, i) => (
                    <div key={metric.label} className={i > 0 ? 'border-t border-pure-white/10 pt-6' : ''}>
                      <span className="block font-heading text-5xl font-bold text-pure-white tracking-tighter">
                        {metric.value}
                      </span>
                      <span className="block font-body text-xs text-pure-white/40 uppercase tracking-[0.15em] mt-1.5 font-semibold">
                        {metric.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="case-study-section">
              <h3 className="font-heading text-sm tracking-[0.3em] uppercase text-pure-white/30 mb-6">
                Technology Stack
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="px-4 py-2 rounded-full border border-pure-white/10 text-xs font-mono text-pure-white/50 bg-pure-white/5"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Links & Closing CTAs */}
        <div className="case-study-section mt-24 pt-12 border-t border-pure-white/10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h4 className="font-heading text-2xl md:text-3xl font-bold text-pure-white tracking-tight">
              Explore the Project
            </h4>
            <p className="font-body text-sm text-pure-white/40 mt-2">
              Browse the code repository or view the interactive deployment.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <MagneticButton href={project.github} className="bg-pure-white text-pure-black border-pure-white hover:bg-transparent hover:text-pure-white" id={`case-study-github-${project.slug}`}>
              View GitHub
            </MagneticButton>
            <MagneticButton href={project.live} id={`case-study-live-${project.slug}`}>
              Live Demo
            </MagneticButton>
          </div>
        </div>

        {/* Bottom Back Button */}
        <div className="mt-20 flex justify-center">
          <button
            onClick={handleClose}
            className="flex items-center gap-3 px-8 py-3.5 rounded-full border border-pure-white/15 hover:border-pure-white/40 hover:bg-pure-white/5 transition-all text-sm font-body tracking-wider uppercase text-pure-white/60 hover:text-pure-white cursor-pointer"
          >
            <svg className="w-4 h-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
            Close Case Study
          </button>
        </div>
      </div>
    </div>
  );
}
