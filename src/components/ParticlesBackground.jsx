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
    const canvasRef = useRef(null); // store the canvas element
    const rafRef = useRef(null); // store the requestAnimationFrame ID
    const partsRef = useRef([]); // store the particles
    const sizeRef = useRef({ w: 1, h: 1 }); // store the size of the canvas
    const yawRef = useRef(0); // store the yaw angle
    const isDraggingRef = useRef(false); // store the dragging state
    const lastXRef = useRef(0); // store the last X position

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

        const SENSITIVITY = Math.PI / 900; // radians per px (tweak)

        const onMouseDown = (e) => { isDraggingRef.current = true; lastXRef.current = e.clientX; };
        
        const onMouseMove = (e) => {
            if (!isDraggingRef.current) return;
            const dx = e.clientX - lastXRef.current;
            lastXRef.current = e.clientX;
            yawRef.current += dx * SENSITIVITY; // horizontal drag → yaw rotation
        };

        const endDrag = () => { isDraggingRef.current = false; };

        resizeToParent();

        // canvas has pointer-events:none, so listen on window
        window.addEventListener("mousedown", onMouseDown, { passive: true });
        window.addEventListener("mousemove", onMouseMove, { passive: true });
        window.addEventListener("mouseup", endDrag, { passive: true });
        window.addEventListener("mouseleave", endDrag, { passive: true });
       

        let ro;
        try {
        ro = new ResizeObserver(() => requestAnimationFrame(resizeToParent));
        ro.observe(parent);
        } catch {
        window.addEventListener("resize", resizeToParent, { passive: true });
        }


        // Create particles/nodesgb
        const initParticles = () => {
        const { w, h } = sizeRef.current;
        const N = calcCount();
        partsRef.current = Array.from({ length: N }, () => {
            const rad = Math.random() * Math.PI * 2; // 360 degrees = pi*2 radians
            const s = speed * (0.7 + Math.random());
            return {
            x: Math.random() * w,
            y: Math.random() * h,
            z: Math.random() * w,
            vx: Math.cos(rad) * s, // here s is the scalar multiple of the speed in x-direction
            vy: Math.sin(rad) * s, // here s is the scalar multiple of the speed in y-direction
            };
        });

        };

        initParticles();

        const linksEnabled = !!connect; // ascertain if links are set to true
        const lineMax = linkDistance; // set lineMax as the linkDistance
        let paused = false;

        const onVisibility = () => {
        paused = document.hidden || (respectReducedMotion && prefersReduce());
        if (!paused && !rafRef.current) rafRef.current = requestAnimationFrame(tick);
        };

        document.addEventListener("visibilitychange", onVisibility);

        const tick = () => {
        if (paused) return;
        const { w, h } = sizeRef.current; // get the width and height of the canvas
        const cx = w / 2; // get the center of the canvas width 
        const cy = h / 2; // get the center of the canvas height
        const yaw = yawRef.current || 0; // get the yaw angle
        const cosY = Math.cos(yaw); // get the cosine of the yaw angle
        const sinY = Math.sin(yaw); // get the sine of the yaw angle
        const fov = 900; // tweak 300–800 to taste
        const ZOOM = 1.2; // zoom level

        ctx.clearRect(0, 0, w, h); // clear the canvas

        // smooth easing to target yaw
        // yawRef.current += (targetYawRef.current - yawRef.current) * 0.12;
        ctx.save();

        const parts = partsRef.current; // get the particles

        const proj = new Array(parts.length); // create an array to store the projected coordinates. The array will be the same length as the particles array.
        for (let i = 0; i < parts.length; i++) {
            const p = parts[i]; // get the particle
            // center the particle
            const px = p.x - cx;
            const py = p.y - cy;
            const pz = (p.z ?? 0);

            // rotate around Y axis (3D yaw)
            const x3 = px * cosY + (pz ?? 0) * sinY;
            const z3 = -px * sinY + (pz ?? 0) * cosY;
            const y3 = py;

            // // rotate around X axis (3D pitch)
            // const x3 = px;
            // const z3 = pz * cosY - py * sinY;
            // const y3 = pz * sinY + py * cosY;

            // rotation matrix is defined as 
            // [cos(angle), 0, sin(angle)]
            // [0, 1, 0]
            // [-sin(angle), 0, cos(angle)]
            // reference: https://en.wikipedia.org/wiki/Rotation_matrix

            // perspective project
            const scale = fov / (fov + z3); // scale is the ratio of fov to the sum of fov and z3
            const sx = cx + x3 * scale * ZOOM; // sx is the x coordinate of the projected point
            const sy = cy + y3 * scale * ZOOM; // sy is the y coordinate of the projected point

            proj[i] = { sx, sy, scale, z3 };
            
        }

        // 2) Draw links using projected coordinates
        if (linksEnabled) {
        ctx.beginPath();
        for (let i = 0; i < parts.length; i++) {
            for (let j = i + 1; j < parts.length; j++) {
            const dx = proj[i].sx - proj[j].sx; // the distance between x coordinates of x_1 and x_2
            const dy = proj[i].sy - proj[j].sy; // the distance between y coordinates of y_1 and y_2
            const d2 = dx * dx + dy * dy; // the square of the distance between the two points

            // screen-space link threshold
            if (d2 < lineMax * lineMax) { // exclude links that are too far away from each other
                const d = Math.sqrt(d2);
                const a = 1 - d / lineMax;

                // optional: fade by depth (closer → brighter/thicker)
                const depthFade = 0.5 + 0.5 * Math.min(proj[i].scale, proj[j].scale); // 0.5..1
                const alpha = Math.max(0, Math.min(1, linkOpacity * a * depthFade));
                ctx.strokeStyle = `rgba(255,255,255,${alpha})`;

                // optional: scale line width with depth for nicer perspective
                ctx.lineWidth = lineWidth * (0.6 + 0.4 * (proj[i].scale + proj[j].scale) * 0.5); // scale the line width based on the depth of the particles

                ctx.moveTo(proj[i].sx, proj[i].sy);
                ctx.lineTo(proj[j].sx, proj[j].sy);
            }
            }
        }
        ctx.stroke();
        }

        // 3) Draw particles using projected position/size
        for (let i = 0; i < parts.length; i++) {
        const p = parts[i];
        const { sx, sy, scale } = proj[i];

        ctx.beginPath();
        ctx.arc(sx, sy, Math.max(0.5, radius * scale), 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();

        // update motion in original (world) space
        p.x += p.vx;
        p.y += p.vy;

        // wrap in world space
        if (p.x < -radius) p.x = w + radius;
        if (p.x > w + radius) p.x = -radius;
        if (p.y < -radius) p.y = h + radius;
        if (p.y > h + radius) p.y = -radius;
        }

        ctx.fillStyle = color;
        // for (const p of parts) {
        //     ctx.beginPath();
        //     ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        //     ctx.fill();
        //     p.x += p.vx;
        //     p.y += p.vy;
        //     if (p.x < -radius) p.x = w + radius;
        //     if (p.x > w + radius) p.x = -radius;
        //     if (p.y < -radius) p.y = h + radius;
        //     if (p.y > h + radius) p.y = -radius;
        // }

        ctx.restore();
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
        window.removeEventListener("mousedown", onMouseDown);
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("mouseup", endDrag);
        window.removeEventListener("mouseleave", endDrag);
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
