import { useEffect, useCallback, useRef } from "react";

const MATRIX_CHARS = "0123456789ABCDEFabcdef@#$%&*!?<>{}[]";
const RIPPLE_RINGS = 5;
const CHARS_PER_RING = 8;

interface RippleChar {
  x: number;
  y: number;
  char: string;
  opacity: number;
  delay: number;
  ring: number;
}

const DigitalRipple = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ripplesRef = useRef<{ chars: RippleChar[]; startTime: number }[]>([]);
  const rafRef = useRef<number>(0);
  const isAnimatingRef = useRef(false);

  const spawnRipple = useCallback((x: number, y: number) => {
    const chars: RippleChar[] = [];
    for (let ring = 0; ring < RIPPLE_RINGS; ring++) {
      const radius = (ring + 1) * 30;
      for (let i = 0; i < CHARS_PER_RING; i++) {
        const angle = (i / CHARS_PER_RING) * Math.PI * 2 + Math.random() * 0.5;
        chars.push({
          x: x + Math.cos(angle) * radius,
          y: y + Math.sin(angle) * radius,
          char: MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)],
          opacity: 1,
          delay: ring * 80,
          ring,
        });
      }
    }
    ripplesRef.current.push({ chars, startTime: performance.now() });

    if (!isAnimatingRef.current) {
      isAnimatingRef.current = true;
      rafRef.current = requestAnimationFrame(animate);
    }
  }, []);

  const animate = useCallback((time: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let hasActive = false;

    ripplesRef.current = ripplesRef.current.filter((ripple) => {
      const elapsed = time - ripple.startTime;
      let anyVisible = false;

      ripple.chars.forEach((c) => {
        const charElapsed = elapsed - c.delay;
        if (charElapsed < 0) {
          anyVisible = true;
          return;
        }
        const duration = 800;
        const progress = charElapsed / duration;
        if (progress >= 1) return;

        anyVisible = true;
        hasActive = true;

        const fade = 1 - progress;
        const scale = 1 + progress * 0.5;
        const spreadX = c.x + (c.x - canvas.width / 2) * progress * 0.3;
        const spreadY = c.y + (c.y - canvas.height / 2) * progress * 0.3;

        ctx.save();
        ctx.globalAlpha = fade * 0.9;
        ctx.font = `${14 * scale}px 'Space Mono', monospace`;
        ctx.fillStyle = `hsl(120, 100%, ${50 + progress * 20}%)`;
        ctx.shadowColor = "hsl(120, 100%, 50%)";
        ctx.shadowBlur = 8 + progress * 12;
        ctx.fillText(c.char, spreadX, spreadY);
        ctx.restore();
      });

      return anyVisible;
    });

    if (hasActive) {
      rafRef.current = requestAnimationFrame(animate);
    } else {
      isAnimatingRef.current = false;
    }
  }, []);

  useEffect(() => {
    const handleInteraction = (e: MouseEvent | TouchEvent) => {
      const point = "touches" in e ? e.touches[0] : e;
      if (point) {
        spawnRipple(point.clientX, point.clientY);
      }
    };

    window.addEventListener("click", handleInteraction, { passive: true });
    window.addEventListener("touchstart", handleInteraction, { passive: true });

    return () => {
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
      cancelAnimationFrame(rafRef.current);
    };
  }, [spawnRipple]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[9998] pointer-events-none"
      aria-hidden="true"
    />
  );
};

export default DigitalRipple;
