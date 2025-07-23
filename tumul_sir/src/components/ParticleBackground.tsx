import React, { useRef, useEffect } from "react";

const PARTICLE_COLORS = [
  "#FFD700", // Gold
  "#A084E8", // Lavender
  "#FF6F00", // Orange
];

const PARTICLE_COUNT = 60;
const PARTICLE_MIN_SIZE = 2;
const PARTICLE_MAX_SIZE = 5;
const PARTICLE_MIN_SPEED = 0.05;
const PARTICLE_MAX_SPEED = 0.2;

function randomBetween(a: number, b: number) {
  return a + Math.random() * (b - a);
}

const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const particles = useRef<any[]>([]);

  // Initialize particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Create particles
    particles.current = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: randomBetween(0, window.innerWidth),
      y: randomBetween(0, window.innerHeight),
      r: randomBetween(PARTICLE_MIN_SIZE, PARTICLE_MAX_SIZE),
      color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
      alpha: randomBetween(0.5, 0.9),
      vx: randomBetween(-PARTICLE_MAX_SPEED, PARTICLE_MAX_SPEED),
      vy: randomBetween(-PARTICLE_MAX_SPEED, PARTICLE_MAX_SPEED),
    }));

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let p of particles.current) {
        // Move
        p.x += p.vx;
        p.y += p.vy;
        // Wrap around edges
        if (p.x < -p.r) p.x = canvas.width + p.r;
        if (p.x > canvas.width + p.r) p.x = -p.r;
        if (p.y < -p.r) p.y = canvas.height + p.r;
        if (p.y > canvas.height + p.r) p.y = -p.r;
        // Draw
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 12;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
      ctx.globalAlpha = 1;
      animationRef.current = requestAnimationFrame(animate);
    }
    animate();
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -1,
        pointerEvents: "none",
      }}
      aria-hidden="true"
    />
  );
};

export default ParticleBackground; 