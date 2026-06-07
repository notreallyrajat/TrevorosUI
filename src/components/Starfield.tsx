import React, { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  baseOpacity: number;
  opacity: number;
  twinkleSpeed: number;
  twinkleOffset: number;
  parallaxFactor: number;
  vx: number;
  vy: number;
}

export const Starfield: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let stars: Star[] = [];
    const starCount = 180;

    // Physics state tracking
    const mouse = { x: 0, y: 0 };
    const prevMouse = { x: 0, y: 0 };
    const smoothMouse = { x: 0, y: 0 };
    const smoothVelocity = { x: 0, y: 0 };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };

    const initStars = () => {
      stars = [];
      const w = canvas.width;
      const h = canvas.height;

      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * w,
          y: Math.random() * h,
          size: Math.random() * 1.25 + 0.35,
          baseOpacity: Math.random() * 0.5 + 0.15,
          opacity: 0,
          twinkleSpeed: Math.random() * 0.015 + 0.005,
          twinkleOffset: Math.random() * Math.PI * 2,
          parallaxFactor: Math.random() * 0.06 + 0.015,
          vx: (Math.random() - 0.5) * 0.03,
          vy: (Math.random() - 0.5) * 0.03,
        });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX - window.innerWidth / 2;
      mouse.y = e.clientY - window.innerHeight / 2;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouse.x = e.touches[0].clientX - window.innerWidth / 2;
        mouse.y = e.touches[0].clientY - window.innerHeight / 2;
      }
    };

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);

    resizeCanvas();

    const animate = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const w = canvas.width;
      const h = canvas.height;

      // 1. Calculate physics offsets and smoothed velocity
      smoothMouse.x += (mouse.x - smoothMouse.x) * 0.05;
      smoothMouse.y += (mouse.y - smoothMouse.y) * 0.05;

      const vx = mouse.x - prevMouse.x;
      const vy = mouse.y - prevMouse.y;

      // Smooth velocity interpolation for fluid momentum
      smoothVelocity.x += (vx - smoothVelocity.x) * 0.05;
      smoothVelocity.y += (vy - smoothVelocity.y) * 0.05;

      prevMouse.x = mouse.x;
      prevMouse.y = mouse.y;

      // Center baseline coordinates for the entire cloud cluster
      const baseX = w / 2 - smoothMouse.x * 0.015;
      const baseY = h / 2 - smoothMouse.y * 0.015;

      // 2. Draw Deformable Central Nebula Cloud (Fluid Puff Simulation)
      ctx.save();
      ctx.globalCompositeOperation = 'screen'; // Additive blending for glowing gaseous fog

      const baseSize = Math.min(w, h) * 0.35;
      
      // Breathing pulses (different speeds and phases for organic asymmetry)
      const pulseCore = Math.sin(time * 0.0006) * 15;
      const pulseLeft = Math.cos(time * 0.0008) * 10;
      const pulseRight = Math.sin(time * 0.0009) * 12;
      const pulseTop = Math.cos(time * 0.0007) * 8;
      const pulseBottom = Math.sin(time * 0.0005) * 10;

      // Slow independent orbital drift for rolling fog simulation
      const driftX = Math.sin(time * 0.0004) * 25;
      const driftY = Math.cos(time * 0.0005) * 18;

      // Puff A: Giant Core (Cosmic Purple-Indigo)
      const cx1 = baseX + driftX;
      const cy1 = baseY + driftY;
      const r1 = baseSize * 1.3 + pulseCore;
      const g1 = ctx.createRadialGradient(cx1, cy1, 0, cx1, cy1, r1);
      g1.addColorStop(0, 'rgba(120, 119, 198, 0.20)');
      g1.addColorStop(0.3, 'rgba(120, 119, 198, 0.09)');
      g1.addColorStop(0.6, 'rgba(99, 102, 241, 0.03)');
      g1.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.beginPath();
      ctx.arc(cx1, cy1, r1, 0, Math.PI * 2);
      ctx.fillStyle = g1;
      ctx.fill();

      // Puff B: Left Cloud Wing (Cyan Accent)
      // Shifts along velocity vector, lagging/stretching out on horizontal motion
      const cx2 = baseX - baseSize * 0.45 + smoothVelocity.x * 1.5 + driftX * 0.8;
      const cy2 = baseY - baseSize * 0.10 + smoothVelocity.y * 0.7 + driftY * 0.8;
      const r2 = baseSize * 0.90 + pulseLeft;
      const g2 = ctx.createRadialGradient(cx2, cy2, 0, cx2, cy2, r2);
      g2.addColorStop(0, 'rgba(6, 182, 212, 0.10)');
      g2.addColorStop(0.4, 'rgba(6, 182, 212, 0.03)');
      g2.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.beginPath();
      ctx.arc(cx2, cy2, r2, 0, Math.PI * 2);
      ctx.fillStyle = g2;
      ctx.fill();

      // Puff C: Right Cloud Wing (Rose-Pink Accent)
      // Shifts asymmetrically to create natural shearing/elongation
      const cx3 = baseX + baseSize * 0.45 + smoothVelocity.x * 0.7 + driftX * 0.5;
      const cy3 = baseY + baseSize * 0.10 + smoothVelocity.y * 1.5 + driftY * 0.5;
      const r3 = baseSize * 0.85 + pulseRight;
      const g3 = ctx.createRadialGradient(cx3, cy3, 0, cx3, cy3, r3);
      g3.addColorStop(0, 'rgba(236, 72, 153, 0.09)');
      g3.addColorStop(0.4, 'rgba(236, 72, 153, 0.03)');
      g3.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.beginPath();
      ctx.arc(cx3, cy3, r3, 0, Math.PI * 2);
      ctx.fillStyle = g3;
      ctx.fill();

      // Puff D: Top Cloud Wing (Soft Violet Accent)
      // Shears perpendicularly (using sideways vectors) to simulate fluid turbulence
      const cx4 = baseX + baseSize * 0.10 - smoothVelocity.y * 1.1 + driftX * 0.6;
      const cy4 = baseY - baseSize * 0.35 + smoothVelocity.x * 1.1 + driftY * 0.6;
      const r4 = baseSize * 0.75 + pulseTop;
      const g4 = ctx.createRadialGradient(cx4, cy4, 0, cx4, cy4, r4);
      g4.addColorStop(0, 'rgba(139, 92, 246, 0.08)');
      g4.addColorStop(0.4, 'rgba(139, 92, 246, 0.02)');
      g4.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.beginPath();
      ctx.arc(cx4, cy4, r4, 0, Math.PI * 2);
      ctx.fillStyle = g4;
      ctx.fill();

      // Puff E: Bottom Cloud Wing (Deep Indigo Accent)
      // Opposite shear deflection to pull the cloud tall/wide depending on current
      const cx5 = baseX - baseSize * 0.10 + smoothVelocity.y * 0.9 + driftX * 0.7;
      const cy5 = baseY + baseSize * 0.35 - smoothVelocity.x * 0.9 + driftY * 0.7;
      const r5 = baseSize * 0.80 + pulseBottom;
      const g5 = ctx.createRadialGradient(cx5, cy5, 0, cx5, cy5, r5);
      g5.addColorStop(0, 'rgba(120, 119, 198, 0.12)');
      g5.addColorStop(0.4, 'rgba(120, 119, 198, 0.03)');
      g5.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.beginPath();
      ctx.arc(cx5, cy5, r5, 0, Math.PI * 2);
      ctx.fillStyle = g5;
      ctx.fill();

      ctx.restore();

      // 3. Draw Parallax Starfield (Rendered on top of the deforming cloud)
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];

        // Drift
        star.x += star.vx;
        star.y += star.vy;

        // Apply smoothed mouse parallax
        let drawX = star.x - smoothMouse.x * star.parallaxFactor;
        let drawY = star.y - smoothMouse.y * star.parallaxFactor;

        // Wrap boundaries
        if (drawX < 0) {
          star.x += w;
          drawX += w;
        } else if (drawX > w) {
          star.x -= w;
          drawX -= w;
        }

        if (drawY < 0) {
          star.y += h;
          drawY += h;
        } else if (drawY > h) {
          star.y -= h;
          drawY -= h;
        }

        // Twinkle pulse
        star.opacity = star.baseOpacity + Math.sin(time * star.twinkleSpeed + star.twinkleOffset) * 0.12;
        star.opacity = Math.max(0.08, Math.min(0.9, star.opacity));

        ctx.beginPath();
        ctx.arc(drawX, drawY, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        pointerEvents: 'none',
        display: 'block',
      }}
    />
  );
};
