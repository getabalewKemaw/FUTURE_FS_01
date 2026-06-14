import { useEffect, useRef } from "react";

/**
 * Lightweight canvas-based dotted/grid background.
 * - Single <canvas>, no libraries.
 * - Replaces heavy 3D + multi-PNG layers.
 * - Mouse-reactive parallax (subtle).
 * - Honors prefers-reduced-motion.
 */
const DottedBackground = ({
  density = 1,            // dots per cell — 1 is a good default
  cellSize = 36,          // grid spacing in px
  baseColor = "15,23,32",
  accentColor = "6,182,212",
  opacity = 0.16,         // base dot opacity
  drift = 0.15,           // base parallax drift speed
  className = "",
}) => {
  const canvasRef = useRef(null);
  const rafRef = useRef(0);
  const targetRef = useRef({ x: 0, y: 0, tx: 0, ty: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    let dpr = Math.min(window.devicePixelRatio || 1, 1.75);
    let width = 0;
    let height = 0;
    let cols = 0;
    let rows = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(width / cellSize) + 2;
      rows = Math.ceil(height / cellSize) + 2;
    };

    const handleMove = (e) => {
      const x = (e.clientX || e.touches?.[0]?.clientX || 0) / window.innerWidth;
      const y = (e.clientY || e.touches?.[0]?.clientY || 0) / window.innerHeight;
      targetRef.current.tx = (x - 0.5) * 2;
      targetRef.current.ty = (y - 0.5) * 2;
    };

    const onResize = () => resize();
    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("mousemove", handleMove, { passive: true });
    window.addEventListener("touchmove", handleMove, { passive: true });

    resize();

    // Seeded random for stable, non-jittery pattern
    let seed = 12345;
    const rand = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };

    const render = (t) => {
      // Smooth lerp toward target
      const tg = targetRef.current;
      tg.x += (tg.tx - tg.x) * 0.05;
      tg.y += (tg.ty - tg.y) * 0.05;

      const time = reduceMotion ? 0 : t * 0.0001 * drift;

      ctx.clearRect(0, 0, width, height);

      // Soft vignette gradient
      const grad = ctx.createRadialGradient(
        width * 0.5, height * 0.25, 0,
        width * 0.5, height * 0.5, Math.max(width, height) * 0.7
      );
      grad.addColorStop(0, "rgba(6,182,212,0.06)");
      grad.addColorStop(1, "rgba(2,6,23,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const cx = (i - 0.5) * cellSize + tg.x * 14;
          const cy = (j - 0.5) * cellSize + tg.y * 14;

          // Skip some dots for a "textured" feel
          const r = rand();
          const skip = r > 0.18 + density * 0.04;
          if (skip) continue;

          // Tiny breathing scale
          const breath = reduceMotion ? 1 : 0.85 + 0.3 * Math.sin(time * 4 + i * 0.6 + j * 0.9);
          const radius = (1.1 + r * 1.2) * breath;

          // A few dots are accent color
          const isAccent = r > 0.96;
          ctx.fillStyle = isAccent
            ? `rgba(${accentColor},${opacity * 1.6})`
            : `rgba(${baseColor},${opacity})`;

          ctx.beginPath();
          ctx.arc(cx, cy, radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      rafRef.current = requestAnimationFrame(render);
    };

    rafRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("touchmove", handleMove);
    };
  }, [density, cellSize, baseColor, accentColor, opacity, drift]);

  return (
    <div
      aria-hidden
      className={`pointer-events-none fixed inset-0 -z-10 overflow-hidden ${className}`}
    >
      {/* Subtle radial color wash behind the dots */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(6,182,212,0.10),transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_80%_100%,rgba(139,92,246,0.08),transparent_70%)]" />
      <canvas
        ref={canvasRef}
        className="block w-full h-full"
        style={{ contain: "strict" }}
      />
    </div>
  );
};

export default DottedBackground;
