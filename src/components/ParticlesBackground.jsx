import { useEffect, useRef } from "react";

export default function ParticlesBackground({
  baseCount = 160,
  speed = 0.22,
  connect = true,
  color = "#ffffff",
  radius = 2,
  linkColor = "#ffffff",
  linkDistance = 140,
  linkOpacity = 0.7,
  lineWidth = 1.6,
  respectReducedMotion = true,
  zIndex = 30,
}) {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const partsRef = useRef([]);
  const sizeRef = useRef({ w: 1, h: 1 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const parent = canvas.parentElement;
    const isMobile = () => window.matchMedia("(max-width: 768px)").matches;
    const prefersReduce = () =>
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const getDpr = () => {
      const raw = window.devicePixelRatio || 1;
      return isMobile() ? Math.min(raw, 1.5) : Math.min(raw, 2);
    };

    const getParentSize = () => {
      const r = parent.getBoundingClientRect();
      return { w: Math.max(1, Math.floor(r.width)), h: Math.max(1, Math.floor(r.height)) };
    };

    const calcCount = () => {
      const { w, h } = sizeRef.current;
      const area = w * h;
      const density = isMobile() ? 28000 : 18000;
      const byArea = Math.round(area / density);
      return Math.max(40, Math.min(byArea, baseCount));
    };

    const resizeToParent = () => {
      const { w, h } = getParentSize();
      sizeRef.current = { w, h };
      const dpr = getDpr();
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resizeToParent();

    let ro;
    try {
      ro = new ResizeObserver(() => requestAnimationFrame(resizeToParent));
      ro.observe(parent);
    } catch {
      window.addEventListener("resize", resizeToParent, { passive: true });
    }

    const initParticles = () => {
      const { w, h } = sizeRef.current;
      const N = calcCount();
      partsRef.current = Array.from({ length: N }, () => {
        const ang = Math.random() * Math.PI * 2;
        const s = speed * (0.5 + Math.random());
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          vx: Math.cos(ang) * s,
          vy: Math.sin(ang) * s,
        };
      });
    };
    initParticles();

    const linksEnabled = !!connect;
    const lineMax = linkDistance;
    let paused = false;

    const onVisibility = () => {
      paused = document.hidden || (respectReducedMotion && prefersReduce());
      if (!paused && !rafRef.current) rafRef.current = requestAnimationFrame(tick);
    };
    document.addEventListener("visibilitychange", onVisibility);

    const tick = () => {
      if (paused) return;
      const { w, h } = sizeRef.current;
      ctx.clearRect(0, 0, w, h);
      const parts = partsRef.current;

      if (linksEnabled) {
        ctx.beginPath();
        ctx.lineWidth = lineWidth;
        for (let i = 0; i < parts.length; i++) {
          for (let j = i + 1; j < parts.length; j++) {
            const dx = parts[i].x - parts[j].x;
            const dy = parts[i].y - parts[j].y;
            const d2 = dx * dx + dy * dy;
            if (d2 < lineMax * lineMax) {
              const a = 1 - Math.sqrt(d2) / lineMax;
              const alpha = Math.max(0, Math.min(1, linkOpacity * a));
              ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
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
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fill();
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -radius) p.x = w + radius;
        if (p.x > w + radius) p.x = -radius;
        if (p.y < -radius) p.y = h + radius;
        if (p.y > h + radius) p.y = -radius;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    onVisibility();
    if (!paused) rafRef.current = requestAnimationFrame(tick);

    let resizeDebounce;
    const reinitOnResize = () => {
      clearTimeout(resizeDebounce);
      resizeDebounce = setTimeout(() => {
        resizeToParent();
        initParticles();
      }, 120);
    };
    window.addEventListener("orientationchange", reinitOnResize);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("orientationchange", reinitOnResize);
      if (ro) ro.disconnect();
      else window.removeEventListener("resize", resizeToParent);
    };
  }, [
    baseCount,
    speed,
    connect,
    color,
    radius,
    linkColor,
    linkDistance,
    linkOpacity,
    lineWidth,
    respectReducedMotion,
    zIndex,
  ]);

  return (
    <canvas
      ref={canvasRef}
      style={{ zIndex }}
      className="absolute inset-0 pointer-events-none"
      aria-hidden="true"
    />
  );
}
