// ParticlesBackground.jsx
import { useEffect, useRef } from "react";

export default function ParticlesBackground({
  count = 120,
  speed = 0.4,
  connect = true,
  color = "rgba(255,255,255,0.8)",
  trails = false, // set true if you want motion trails
}) {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const dpr = Math.max(1, window.devicePixelRatio || 1);

    const getSize = () => {
      // Size to the PARENT (the banner section), not the window
      const parent = canvas.parentElement; // your <section>
      const rect = parent.getBoundingClientRect();
      return { w: Math.max(1, Math.floor(rect.width)), h: Math.max(1, Math.floor(rect.height)) };
    };

    const resizeToParent = () => {
      const { w, h } = getSize();
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    // Initial size
    resizeToParent();

    // Observe parent size changes (more reliable than window resize for sections)
    const ro = new ResizeObserver(resizeToParent);
    ro.observe(canvas.parentElement);

    // Init particles within section bounds
    const { w: W, h: H } = getSize();
    particlesRef.current = Array.from({ length: count }, () => {
      const angle = Math.random() * Math.PI * 2;
      const s = speed * (0.5 + Math.random());
      return {
        x: Math.random() * W,
        y: Math.random() * H,
        vx: Math.cos(angle) * s,
        vy: Math.sin(angle) * s,
      };
    });

    const lineMaxDist = 120;

    const tick = () => {
      const { w, h } = getSize();

      if (trails) {
        // fade previous frame slightly (on transparent canvas)
        ctx.globalCompositeOperation = "destination-out";
        ctx.fillStyle = "rgba(0,0,0,0.08)";
        ctx.fillRect(0, 0, w, h);
        ctx.globalCompositeOperation = "source-over";
      } else {
        // no trails: clear fully
        ctx.clearRect(0, 0, w, h);
      }

      const parts = particlesRef.current;

      if (connect) {
        ctx.beginPath();
        for (let i = 0; i < parts.length; i++) {
          for (let j = i + 1; j < parts.length; j++) {
            const dx = parts[i].x - parts[j].x;
            const dy = parts[i].y - parts[j].y;
            const d2 = dx * dx + dy * dy;
            if (d2 < lineMaxDist * lineMaxDist) {
              const alpha = 1 - Math.sqrt(d2) / lineMaxDist;
              ctx.strokeStyle = `rgba(255,255,255,${0.25 * alpha})`;
              ctx.moveTo(parts[i].x, parts[i].y);
              ctx.lineTo(parts[j].x, parts[j].y);
            }
          }
        }
        ctx.stroke();
      }

      ctx.fillStyle = color;
      for (const p of parts) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.6, 0, Math.PI * 2);
        ctx.fill();

        p.x += p.vx;
        p.y += p.vy;

        // wrap within section bounds
        if (p.x < -2) p.x = w + 2;
        if (p.x > w + 2) p.x = -2;
        if (p.y < -2) p.y = h + 2;
        if (p.y > h + 2) p.y = -2;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, [count, speed, connect, color, trails]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-10 pointer-events-none"
      aria-hidden="true"
    />
  );
}
