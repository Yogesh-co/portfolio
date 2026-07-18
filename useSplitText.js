import { useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function useSplitText(options = {}) {
  const ref = useRef(null);
  const charsRef = useRef([]);

  const {
    duration = 0.8,
    stagger = 0.03,
    ease = 'power3.out',
    delay = 0,
    scrollTrigger: useScrollTrigger = true,
    start = 'top 80%',
    y = 40,
    fromOpacity = 0,
    rotateX = 45,
  } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const text = el.textContent;
    el.innerHTML = '';
    el.style.overflow = 'hidden';
    
    const chars = text.split('').map((char) => {
      const span = document.createElement('span');
      span.textContent = char === ' ' ? '\u00A0' : char;
      span.style.display = 'inline-block';
      span.style.willChange = 'transform, opacity';
      el.appendChild(span);
      return span;
    });

    charsRef.current = chars;
  }, []);

  useGSAP(() => {
    const chars = charsRef.current;
    if (!chars.length) return;

    const animConfig = {
      y,
      opacity: fromOpacity,
      rotateX,
      duration,
      stagger,
      delay,
      ease,
      transformOrigin: 'bottom center',
    };

    if (useScrollTrigger) {
      animConfig.scrollTrigger = {
        trigger: ref.current,
        start,
        toggleActions: 'play none none none',
      };
    }

    gsap.from(chars, animConfig);
  }, { scope: ref, dependencies: [charsRef.current.length] });

  return ref;
}
