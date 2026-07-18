import { useRef } from 'react';
import gsap from 'gsap';

export default function MagneticButton({ children, className = '', onClick, href, ...props }) {
  const btnRef = useRef(null);
  const textRef = useRef(null);

  const handleMouseMove = (e) => {
    const btn = btnRef.current;
    const text = textRef.current;
    if (!btn) return;

    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(btn, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.4,
      ease: 'power3.out',
    });

    if (text) {
      gsap.to(text, {
        x: x * 0.1,
        y: y * 0.1,
        duration: 0.4,
        ease: 'power3.out',
      });
    }
  };

  const handleMouseLeave = () => {
    gsap.to(btnRef.current, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: 'elastic.out(1, 0.4)',
    });
    if (textRef.current) {
      gsap.to(textRef.current, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: 'elastic.out(1, 0.4)',
      });
    }
  };

  const Component = href ? 'a' : 'button';
  const linkProps = href ? { href, target: '_blank', rel: 'noopener noreferrer' } : {};

  return (
    <Component
      ref={btnRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`relative inline-flex items-center justify-center px-8 py-4 border border-pure-white/20 rounded-full text-pure-white font-body text-sm tracking-wider uppercase transition-all duration-300 hover:bg-pure-white hover:text-pure-black hover:border-pure-white group ${className}`}
      style={{ willChange: 'transform' }}
      {...linkProps}
      {...props}
    >
      <span ref={textRef} className="relative z-10" style={{ willChange: 'transform' }}>
        {children}
      </span>
    </Component>
  );
}
