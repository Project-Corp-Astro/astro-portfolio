import React, { useState, useEffect } from 'react';

const orbitIcons = [
  { src: '/fortune-wheel.png', alt: 'Fortune Wheel' },
  { src: '/astro-staffing.png', alt: 'Moon and Stars' },
  { src: '/parchment.png', alt: 'Parchment' },
  { src: '/planet.png', alt: 'Planet' },
  { src: '/astro-management.png', alt: 'Astrology' },
  { src: '/signature-analysis.png', alt: 'Signature Analysis' },
];

const orbitColors = [
  '#FFE5B4', // Medium Gold
  '#D8BFD8', // Medium Lavender
  '#FFB366', // Medium Orange
  '#87CEEB', // Sky Blue
  '#FFB6C1', // Light Pink
  '#98FB98', // Pale Green
];

const CelestialOrbit = () => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prev => prev + 1);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const getPosition = (radius, offset = 0) => {
    const angle = offset;
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius
    };
  };

  const getFloatOffset = (index) => {
    const floatSpeed = 0.02 + (index * 0.005);
    const floatAmplitude = 8 + (index % 3) * 3;
    return Math.sin(time * floatSpeed) * floatAmplitude;
  };

  // Responsive sizes
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const orbitSize = isMobile ? 440 : 550;
  const centralImgSize = isMobile ? 260 : 350;
  const iconRadius = isMobile ? 200 : 240;
  const iconSize = isMobile ? 80 : 80;
  const iconImgSize = isMobile ? 48 : 48;
  const mobileMarginTop = isMobile ? 'mt-12' : '';

  return (
    <div className={`relative w-[440px] h-[440px] md:w-[550px] md:h-[550px] ${mobileMarginTop}`}>
      {/* Central image in the orbit */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center" style={{ width: centralImgSize, height: centralImgSize }}>
        <img
          src="/fotor-2025070522532.png"
          alt="Central Portrait"
          className="w-full h-full rounded-full object-cover shadow-lg"
          style={{ background: '#222' }}
        />
      </div>

      {/* Floating orbiting icons */}
      {orbitIcons.map((icon, index) => {
        const total = orbitIcons.length;
        // Adjust starting angle to better position the first icon
        const offset = (index / total) * 2 * Math.PI + (Math.PI / 4);
        // Increase radius for better spacing around the image
        const position = getPosition(iconRadius, offset);
        const floatY = getFloatOffset(index);
        const bgColor = orbitColors[index % orbitColors.length];
        return (
          <div
            key={icon.src}
            className="absolute top-1/2 left-1/2 transition-all duration-75 ease-linear"
            style={{
              transform: `translate(-50%, -50%) translate(${position.x}px, ${position.y + floatY}px)`
            }}
          >
            <div
              className="glassmorphism-orbit-icon flex items-center justify-center rounded-full hover:scale-110 transition-transform duration-300 relative"
              style={{ 
                width: iconSize, 
                height: iconSize, 
                background: `linear-gradient(120deg, ${bgColor}cc 60%, ${bgColor}99 100%)`,
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                boxShadow: `0 8px 32px ${bgColor}40, inset 0 1px 0 ${bgColor}80`,
                border: `1px solid ${bgColor}80`,
                overflow: 'hidden',
                borderRadius: '50%',
              }}
            >
              {/* Glossy overlay */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  background: 'linear-gradient(120deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.12) 40%, rgba(255,255,255,0.02) 80%, rgba(255,255,255,0) 100%)',
                  pointerEvents: 'none',
                  zIndex: 1,
                }}
              />
              <img
                src={icon.src}
                alt={icon.alt}
                className="shadow-xl relative z-10"
                style={{ 
                  width: iconImgSize, 
                  height: iconImgSize, 
                  objectFit: 'contain', 
                  background: 'transparent',
                  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CelestialOrbit; 