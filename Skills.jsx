import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'motion/react';
import SectionHeading from './SectionHeading';
import skills from '../data/skills';

gsap.registerPlugin(ScrollTrigger);

const categories = ['Frontend', 'Backend', 'DevOps', 'Design'];

const getSkillIcon = (name) => {
  const iconProps = { className: "w-6 h-6", fill: "none", stroke: "currentColor", strokeWidth: "1.5" };
  
  switch (name) {
    case 'React':
      return (
        <svg viewBox="0 0 24 24" {...iconProps}>
          <ellipse cx="12" cy="12" rx="11" ry="4.2" transform="rotate(30 12 12)" />
          <ellipse cx="12" cy="12" rx="11" ry="4.2" transform="rotate(90 12 12)" />
          <ellipse cx="12" cy="12" rx="11" ry="4.2" transform="rotate(150 12 12)" />
          <circle cx="12" cy="12" r="1.5" fill="currentColor" />
        </svg>
      );
    case 'Next.js':
      return (
        <svg viewBox="0 0 24 24" {...iconProps}>
          <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm3.3 14.5L11 10.7V16H9.5V8h1.2l4.3 5.8V8h1.5v8.5h-1.2z" />
          <path d="M14.7 13.7L10.3 8" />
        </svg>
      );
    case 'TypeScript':
      return (
        <svg viewBox="0 0 24 24" {...iconProps}>
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M9 9h4M11 9v8M15 11h2.5c.8 0 1.5.5 1.5 1.25s-.7 1.25-1.5 1.25c.8 0 1.5.5 1.5 1.25S17.7 17 16.9 17H15v-6z" />
        </svg>
      );
    case 'Tailwind CSS':
      return (
        <svg viewBox="0 0 24 24" {...iconProps}>
          <path d="M12 6.5c-2.4 0-4 1.2-4.8 3.6 1.2-1.6 2.6-2.2 4.2-1.8 1 .2 1.6.9 2.4 1.7 1.2 1.3 2.6 2.8 5.4 2.8 2.4 0 4-1.2 4.8-3.6-1.2 1.6-2.6 2.2-4.2 1.8-1-.2-1.6-.9-2.4-1.7-1.2-1.3-2.6-2.8-5.4-2.8zM4 12.5c-2.4 0-4 1.2-4.8 3.6 1.2-1.6 2.6-2.2 4.2-1.8 1 .2 1.6.9 2.4 1.7 1.2 1.3 2.6 2.8 5.4 2.8 2.4 0 4-1.2 4.8-3.6-1.2 1.6-2.6 2.2-4.2 1.8-1-.2-1.6-.9-2.4-1.7-1.2-1.3-2.6-2.8-5.4-2.8z" />
        </svg>
      );
    case 'Three.js':
      return (
        <svg viewBox="0 0 24 24" {...iconProps}>
          <path d="M12 2L2 22h20L12 2zm0 4.5l6.5 13H5.5L12 6.5z" />
          <path d="M12 11.5L8.5 18h7L12 11.5z" />
        </svg>
      );
    case 'GSAP':
      return (
        <svg viewBox="0 0 24 24" {...iconProps}>
          <path d="M4 12h16M14 6l6 6-6 6M8 6L2 12l6 6" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      );
    case 'Node.js':
      return (
        <svg viewBox="0 0 24 24" {...iconProps}>
          <path d="M12 2L3 7v10l9 5 9-5V7l-9-5z" />
          <path d="M12 2v20M3 7h18M3 17h18" />
        </svg>
      );
    case 'Python':
      return (
        <svg viewBox="0 0 24 24" {...iconProps}>
          <path d="M12 2H9.5a4.5 4.5 0 00-4.5 4.5v1.5H8v-1.5c0-.8.7-1.5 1.5-1.5h3c.8 0 1.5.7 1.5 1.5V11h-4a3.5 3.5 0 00-3.5 3.5V17A4.5 4.5 0 0011 21.5h2.5a4.5 4.5 0 004.5-4.5v-1.5h-3v1.5c0 .8-.7 1.5-1.5 1.5h-3c-.8 0-1.5-.7-1.5-1.5V13h4a3.5 3.5 0 003.5-3.5V7A4.5 4.5 0 0013.5 2.5H12z" />
          <circle cx="8" cy="5.5" r="0.75" fill="currentColor" />
          <circle cx="16" cy="18.5" r="0.75" fill="currentColor" />
        </svg>
      );
    case 'Go':
      return (
        <svg viewBox="0 0 24 24" {...iconProps}>
          <path d="M18 10a4 4 0 10-8 0v4a4 4 0 108 0" />
          <path d="M10 12h8M14 6c-2 0-4 .5-4 1.5s2 1.5 4 1.5S18 8 18 7s-2-1-4-1z" />
        </svg>
      );
    case 'GraphQL':
      return (
        <svg viewBox="0 0 24 24" {...iconProps}>
          <path d="M12 22l8.66-5V7L12 2 3.34 7v10L12 22z" />
          <path d="M12 2v20M3.34 7l17.32 10M3.34 17L20.66 7" />
          <circle cx="12" cy="12" r="3" fill="currentColor" />
        </svg>
      );
    case 'PostgreSQL':
      return (
        <svg viewBox="0 0 24 24" {...iconProps}>
          <path d="M12 3a9 9 0 00-9 9c0 3.3 1.8 6.2 4.5 7.7.8-.5 1.5-1.2 2-2.1.2.1.5.2.8.2 1.2 0 2.2-1 2.2-2.2 0-.2 0-.3-.1-.5 1.3-.2 2.3-1.3 2.3-2.6 0-.8-.4-1.6-1-2 .7-.5 1.2-1.3 1.2-2.3C15 8 13.6 7 12 7c-.6 0-1.1.2-1.5.5C10 5 8.2 3.8 6 3.8M21 12c0-5-4-9-9-9" />
        </svg>
      );
    case 'MongoDB':
      return (
        <svg viewBox="0 0 24 24" {...iconProps}>
          <path d="M12 2c0 0-5 4.5-5 9.5c0 3.6 2.2 6.5 5 7.5c2.8-1 5-3.9 5-7.5C17 6.5 12 2 12 2z" />
          <path d="M12 2v20M9.5 13.5c1.5 1.5 3.5 1.5 5 0" />
        </svg>
      );
    case 'Docker':
      return (
        <svg viewBox="0 0 24 24" {...iconProps}>
          <rect x="8" y="14" width="4" height="4" rx="0.5" />
          <rect x="13" y="14" width="4" height="4" rx="0.5" />
          <rect x="8" y="9" width="4" height="4" rx="0.5" />
          <rect x="13" y="9" width="4" height="4" rx="0.5" />
          <rect x="8" y="4" width="4" height="4" rx="0.5" />
          <path d="M2 19.5C2 15 6 14 8 14h10c2 0 4 1.5 4 4.5S19.5 22 17 22H7c-3 0-5-1.5-5-2.5z" />
        </svg>
      );
    case 'AWS':
      return (
        <svg viewBox="0 0 24 24" {...iconProps}>
          <path d="M3 14c2.5 3 6.5 4.5 10.5 4s7.5-2.5 9-5.5" />
          <path d="M20.5 12.5l2-1.5-2.5-.5M12.5 5c-1.5-.5-3.5-.5-4.5.5-1.2 1.2-1 3.5.5 4.5 1.8 1.2 5 1.5 6-.5 1-2.2-.2-4-2-4.5z" />
        </svg>
      );
    case 'Kubernetes':
      return (
        <svg viewBox="0 0 24 24" {...iconProps}>
          <path d="M12 2l8.5 4v10L12 22l-8.5-6V6L12 2z" />
          <path d="M12 2v20M3.5 16l17-8M3.5 8l17 8" />
          <circle cx="12" cy="12" r="4.5" />
        </svg>
      );
    case 'Git':
      return (
        <svg viewBox="0 0 24 24" {...iconProps}>
          <circle cx="18" cy="18" r="3" />
          <circle cx="6" cy="6" r="3" />
          <circle cx="6" cy="18" r="3" />
          <path d="M6 9v6M6 15c4 0 7-1 9-4M15 11l-3 3M15 11l3 3" />
        </svg>
      );
    case 'Figma':
      return (
        <svg viewBox="0 0 24 24" {...iconProps}>
          <path d="M8.5 10a3.5 3.5 0 110-7h3v7h-3zM15.5 10a3.5 3.5 0 01-3.5-3.5V3h3.5a3.5 3.5 0 110 7zM8.5 17a3.5 3.5 0 110-7h3v3.5a3.5 3.5 0 01-3.5 3.5zM15.5 17a3.5 3.5 0 11-7 0" />
          <path d="M12 10v7a3.5 3.5 0 003.5 3.5H12" />
        </svg>
      );
    case 'Redis':
      return (
        <svg viewBox="0 0 24 24" {...iconProps}>
          <rect x="3" y="3" width="18" height="5" rx="1" />
          <rect x="3" y="10" width="18" height="5" rx="1" />
          <rect x="3" y="17" width="18" height="5" rx="1" />
          <path d="M7 5.5h1M7 12.5h1M7 19.5h1" />
        </svg>
      );
    default:
      return (
        <span className="font-heading text-xs font-bold">
          {name.slice(0, 2).toUpperCase()}
        </span>
      );
  }
};

export default function Skills() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useGSAP(() => {
    cardsRef.current.filter(Boolean).forEach((card, i) => {
      gsap.from(card, {
        y: 50,
        opacity: 0,
        scale: 0.9,
        rotation: (Math.random() - 0.5) * 8,
        duration: 0.7,
        delay: i * 0.03,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      });
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative py-32 md:py-48 px-6 md:px-12 lg:px-24"
      aria-label="Skills section"
    >
      <div className="max-w-6xl mx-auto">
        <SectionHeading>Skills & Tools</SectionHeading>

        <p className="font-body text-lg text-pure-white/40 mt-8 max-w-2xl leading-relaxed">
          A versatile toolkit refined over years of building production applications
          across the full stack.
        </p>

        <div className="mt-16 md:mt-24 space-y-16">
          {categories.map((category) => {
            const categorySkills = skills.filter((s) => s.category === category);
            if (!categorySkills.length) return null;

            return (
              <div key={category}>
                <h3 className="font-heading text-sm tracking-[0.3em] uppercase text-pure-white/30 mb-8">
                  {category}
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {categorySkills.map((skill) => (
                    <motion.div
                      key={skill.name}
                      ref={(el) => (cardsRef.current[skills.indexOf(skill)] = el)}
                      className="glass rounded-xl p-5 flex flex-col items-center gap-3 cursor-default glow-hover group border border-pure-white/5 bg-pure-black/20"
                      whileHover={{
                        y: -10,
                        scale: 1.05,
                        borderColor: 'rgba(255, 255, 255, 0.2)',
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      }}
                      transition={{
                        type: 'spring',
                        stiffness: 300,
                        damping: 15,
                      }}
                      style={{ willChange: 'transform' }}
                    >
                      {/* Monochrome icon */}
                      <div className="w-12 h-12 rounded-lg bg-pure-white/5 flex items-center justify-center text-pure-white/30 group-hover:text-pure-white group-hover:bg-pure-white/10 transition-all duration-300">
                        {getSkillIcon(skill.name)}
                      </div>
                      <span className="font-body text-xs text-pure-white/50 group-hover:text-pure-white/80 transition-colors text-center font-medium">
                        {skill.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
