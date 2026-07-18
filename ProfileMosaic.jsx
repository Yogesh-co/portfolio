import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import profileImg from '../assets/images/profile.jpg';

const tiles = [
  { clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)', x: 0, y: 0, size: 100 },
  { clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)', x: -25, y: -25, size: 55 },
  { clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)', x: 25, y: -25, size: 55 },
  { clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)', x: -25, y: 25, size: 55 },
  { clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)', x: 25, y: 25, size: 55 },
  { clipPath: 'polygon(50% 10%, 90% 50%, 50% 90%, 10% 50%)', x: 0, y: -35, size: 40 },
  { clipPath: 'polygon(50% 10%, 90% 50%, 50% 90%, 10% 50%)', x: 0, y: 35, size: 40 },
];

export default function ProfileMosaic() {
  const containerRef = useRef(null);
  const tilesRef = useRef([]);

  useGSAP(() => {
    const tileEls = tilesRef.current.filter(Boolean);

    tileEls.forEach((tile, i) => {
      gsap.set(tile, {
        x: tiles[i].x,
        y: tiles[i].y,
        scale: 0,
        opacity: 0,
        rotation: 45,
      });
    });

    gsap.to(tileEls, {
      scale: 1,
      opacity: 1,
      rotation: 0,
      duration: 1.2,
      stagger: {
        each: 0.1,
        from: 'center',
      },
      ease: 'power3.out',
      delay: 0.4,
    });
  }, { scope: containerRef });

  const handleMouseMove = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const moveX = (e.clientX - centerX) * 0.02;
    const moveY = (e.clientY - centerY) * 0.02;

    tilesRef.current.forEach((tile, i) => {
      if (tile) {
        gsap.to(tile, {
          x: tiles[i].x + moveX * (i + 1) * 0.3,
          y: tiles[i].y + moveY * (i + 1) * 0.3,
          duration: 0.6,
          ease: 'power2.out',
        });
      }
    });
  };

  return (
    <div
      ref={containerRef}
      className="relative w-72 h-72 md:w-96 md:h-96 lg:w-[28rem] lg:h-[28rem]"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        tilesRef.current.forEach((tile, i) => {
          if (tile) {
            gsap.to(tile, {
              x: tiles[i].x,
              y: tiles[i].y,
              duration: 0.8,
              ease: 'elastic.out(1, 0.6)',
            });
          }
        });
      }}
    >
      {tiles.map((tile, i) => (
        <div
          key={i}
          ref={(el) => (tilesRef.current[i] = el)}
          className="absolute inset-0 flex items-center justify-center"
          style={{
            willChange: 'transform, opacity',
          }}
        >
          <div
            className="overflow-hidden"
            style={{
              clipPath: tile.clipPath,
              width: `${tile.size}%`,
              height: `${tile.size}%`,
            }}
          >
            <img
              src={profileImg}
              alt="Alex Chen"
              className="w-full h-full object-cover"
              style={{
                filter: i === 0 ? 'none' : 'brightness(0.7)',
              }}
            />
          </div>
        </div>
      ))}

      {/* Subtle glow behind */}
      <div className="absolute inset-0 -z-10 blur-3xl bg-pure-white/5 rounded-full scale-75" />
    </div>
  );
}
