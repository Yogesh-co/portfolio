import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ProjectCard({ project, index, onClick }) {
  const cardRef = useRef(null);

  useGSAP(() => {
    // Card slide up reveal
    gsap.from(cardRef.current, {
      y: 80,
      opacity: 0,
      duration: 1,
      delay: index * 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: cardRef.current,
        start: 'top 88%',
      },
    });

    // Image mask reveal and zoom animation
    const img = cardRef.current.querySelector('.project-img');
    const mask = cardRef.current.querySelector('.project-img-wrapper');
    if (mask && img) {
      gsap.fromTo(mask, 
        { clipPath: 'inset(100% 0 0 0)' },
        {
          clipPath: 'inset(0% 0 0 0)',
          duration: 1.4,
          ease: 'power4.inOut',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 85%',
          }
        }
      );
      gsap.fromTo(img,
        { scale: 1.25, filter: 'blur(10px) brightness(0.3)' },
        {
          scale: 1,
          filter: 'blur(0px) brightness(0.85)',
          duration: 1.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 85%',
          }
        }
      );
    }
  }, { scope: cardRef });

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 12;

    gsap.to(card, {
      rotateY: x,
      rotateX: -y,
      duration: 0.5,
      ease: 'power2.out',
    });

    const img = card.querySelector('.project-img');
    if (img) {
      gsap.to(img, {
        scale: 1.05,
        filter: 'brightness(1)',
        duration: 0.6,
        ease: 'power2.out',
      });
    }
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.8,
      ease: 'elastic.out(1, 0.5)',
    });

    const img = cardRef.current.querySelector('.project-img');
    if (img) {
      gsap.to(img, {
        scale: 1,
        filter: 'brightness(0.85)',
        duration: 0.8,
        ease: 'power2.out',
      });
    }
  };

  return (
    <article
      ref={cardRef}
      className="group relative glass rounded-2xl overflow-hidden cursor-pointer hover-lift border border-pure-white/5 bg-pure-black/20"
      style={{ perspective: '1000px', transformStyle: 'preserve-3d', willChange: 'transform' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      id={`project-card-${project.slug}`}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick?.()}
    >
      {/* Image area */}
      <div className="relative h-64 md:h-80 overflow-hidden bg-pure-black border-b border-pure-white/5 project-img-wrapper" style={{ clipPath: 'inset(100% 0 0 0)' }}>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-pure-black/90 z-10" />
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover project-img"
          style={{ transformOrigin: 'center center', filter: 'brightness(0.85)' }}
        />
        
        {/* Year badge */}
        <div className="absolute top-4 right-4 z-20 px-3 py-1 rounded-full bg-pure-white/10 backdrop-blur-sm text-xs font-mono text-pure-white/60 border border-pure-white/10">
          {project.year}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 md:p-8">
        <p className="font-mono text-xs text-pure-white/30 tracking-wider uppercase mb-2">
          {project.subtitle}
        </p>
        <h3 className="font-heading text-2xl md:text-3xl font-bold text-pure-white mb-3 group-hover:text-pure-white/90 transition-colors">
          {project.title}
        </h3>
        <p className="font-body text-sm text-pure-white/40 leading-relaxed mb-6 line-clamp-2">
          {project.description}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tech.slice(0, 4).map((t) => (
            <span key={t} className="px-3 py-1 rounded-full border border-pure-white/5 bg-pure-white/5 text-xs font-mono text-pure-white/40">
              {t}
            </span>
          ))}
          {project.tech.length > 4 && (
            <span className="px-3 py-1 text-xs font-mono text-pure-white/30">
              +{project.tech.length - 4}
            </span>
          )}
        </div>

        {/* Links */}
        <div className="flex items-center gap-4">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-pure-white/40 hover:text-pure-white transition-colors flex items-center gap-2"
            onClick={(e) => e.stopPropagation()}
            id={`project-github-${project.slug}`}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            GitHub
          </a>
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-pure-white/40 hover:text-pure-white transition-colors flex items-center gap-2"
            onClick={(e) => e.stopPropagation()}
            id={`project-live-${project.slug}`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>
            Live Demo
          </a>
        </div>
      </div>
    </article>
  );
}
