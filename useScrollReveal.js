import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function useScrollReveal(options = {}) {
  const ref = useRef(null);

  const {
    y = 60,
    opacity = 0,
    duration = 1,
    delay = 0,
    ease = 'power3.out',
    start = 'top 85%',
    stagger = 0,
    once = true,
  } = options;

  useGSAP(() => {
    const el = ref.current;
    if (!el) return;

    const targets = stagger ? el.children : el;

    gsap.from(targets, {
      y,
      opacity,
      duration,
      delay,
      ease,
      stagger: stagger || undefined,
      scrollTrigger: {
        trigger: el,
        start,
        toggleActions: once ? 'play none none none' : 'play none none reverse',
      },
    });
  }, { scope: ref });

  return ref;
}
