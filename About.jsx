import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeading from './SectionHeading';
import Timeline from './Timeline';

gsap.registerPlugin(ScrollTrigger);

const techStack = [
  'React', 'Next.js', 'TypeScript', 'Node.js',
  'Python', 'Go', 'PostgreSQL', 'MongoDB',
  'Docker', 'AWS', 'GraphQL', 'Redis',
];

export default function About() {
  const sectionRef = useRef(null);
  const bioRef = useRef(null);
  const techRef = useRef(null);

  useGSAP(() => {
    gsap.from(bioRef.current, {
      y: 40,
      opacity: 0,
      filter: 'blur(8px)',
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: bioRef.current,
        start: 'top 85%',
      },
    });

    gsap.from(techRef.current?.children ? Array.from(techRef.current.children) : [], {
      y: 30,
      opacity: 0,
      scale: 0.9,
      duration: 0.6,
      stagger: 0.05,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: techRef.current,
        start: 'top 85%',
      },
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-32 md:py-48 px-6 md:px-12 lg:px-24"
      aria-label="About section"
    >
      <div className="max-w-6xl mx-auto">
        <SectionHeading>About Me</SectionHeading>

        <div className="mt-16 md:mt-24 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Bio */}
          <div ref={bioRef}>
            <p className="font-body text-lg md:text-xl text-pure-white/60 leading-relaxed mb-8">
              I'm a Full Stack Developer with 5+ years of experience building 
              digital products that blend elegant design with robust engineering. 
              I believe the best software is invisible — it simply works, 
              beautifully.
            </p>
            <p className="font-body text-lg md:text-xl text-pure-white/60 leading-relaxed mb-8">
              From enterprise SaaS dashboards to AI-powered creative tools, 
              I specialize in crafting end-to-end solutions that scale. My 
              approach combines Swiss precision in design with a deep passion 
              for clean, maintainable architecture.
            </p>
            <p className="font-body text-base text-pure-white/30 leading-relaxed">
              When I'm not coding, you'll find me exploring generative art, 
              contributing to open source, or experimenting with new frameworks 
              before they hit mainstream.
            </p>
          </div>

          {/* Tech Stack */}
          <div>
            <h3 className="font-heading text-sm tracking-[0.3em] uppercase text-pure-white/40 mb-8">
              Technologies
            </h3>
            <div ref={techRef} className="flex flex-wrap gap-3">
              {techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-5 py-2.5 rounded-full border border-pure-white/10 text-pure-white/60 font-body text-sm hover:border-pure-white/30 hover:text-pure-white transition-all duration-300 hover-lift cursor-default"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="mt-24 md:mt-32">
          <h3 className="font-heading text-sm tracking-[0.3em] uppercase text-pure-white/40 mb-12">
            Experience
          </h3>
          <Timeline />
        </div>
      </div>
    </section>
  );
}
