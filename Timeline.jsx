import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import timelineData from '../data/timeline';

gsap.registerPlugin(ScrollTrigger);

export default function Timeline() {
  const containerRef = useRef(null);
  const lineRef = useRef(null);
  const itemsRef = useRef([]);

  useGSAP(() => {
    // Animate the connecting line
    gsap.from(lineRef.current, {
      scaleY: 0,
      transformOrigin: 'top',
      duration: 1.5,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
      },
    });

    // Stagger animate timeline items
    itemsRef.current.filter(Boolean).forEach((item, i) => {
      gsap.from(item, {
        x: -40,
        opacity: 0,
        duration: 0.8,
        delay: i * 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: item,
          start: 'top 85%',
        },
      });
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative">
      {/* Vertical line */}
      <div
        ref={lineRef}
        className="absolute left-0 md:left-8 top-0 bottom-0 w-px bg-pure-white/10"
      />

      <div className="space-y-12">
        {timelineData.map((item, i) => (
          <div
            key={i}
            ref={(el) => (itemsRef.current[i] = el)}
            className="relative pl-8 md:pl-20"
          >
            {/* Dot */}
            <div className="absolute left-0 md:left-8 top-2 -translate-x-1/2 w-3 h-3 rounded-full bg-pure-white/20 border-2 border-pure-white/40" />

            <span className="font-mono text-xs text-pure-white/30 tracking-wider">
              {item.year}
            </span>
            <h4 className="font-heading text-xl md:text-2xl font-bold text-pure-white mt-1">
              {item.role}
            </h4>
            <p className="font-body text-sm text-pure-white/40 mt-1">
              {item.company}
            </p>
            <p className="font-body text-base text-pure-white/50 mt-3 max-w-lg leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
