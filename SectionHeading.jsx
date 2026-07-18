import { useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SectionHeading({ children, className = '', tag = 'h2' }) {
  const ref = useRef(null);
  const Tag = tag;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const text = el.textContent;
    el.innerHTML = '';
    
    const chars = text.split('').map((char) => {
      const span = document.createElement('span');
      span.textContent = char === ' ' ? '\u00A0' : char;
      span.style.display = 'inline-block';
      span.style.willChange = 'transform, opacity';
      el.appendChild(span);
      return span;
    });

    el._chars = chars;
  }, [children]);

  useGSAP(() => {
    const el = ref.current;
    if (!el || !el._chars) return;

    gsap.from(el._chars, {
      y: 60,
      opacity: 0,
      rotateX: 40,
      duration: 0.8,
      stagger: 0.025,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 82%',
        toggleActions: 'play none none none',
      },
    });
  }, { scope: ref });

  return (
    <Tag
      ref={ref}
      className={`font-heading text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-pure-white ${className}`}
      style={{ perspective: '1000px', overflow: 'hidden' }}
    >
      {children}
    </Tag>
  );
}
