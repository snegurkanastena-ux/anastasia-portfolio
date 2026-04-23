"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { CSSProperties, MouseEvent as ReactMouseEvent } from "react";
import { createElement, useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import "./MagicBento.css";

const DEFAULT_PARTICLE = 6;

export type MagicBentoCardProps = {
  children: React.ReactNode;
  className?: string;
  as?: "article" | "div";
  enableStars?: boolean;
  enableBorderGlow?: boolean;
  clickEffect?: boolean;
  particleCount?: number;
  disableAnimations?: boolean;
};

/**
 * Плашка с radial border-glow по курсору, лёгкие «звёзды» и ripple по клику.
 * Без GSAP / без фиолетового glow — цвет через `rgb(var(--primary))`.
 */
export function MagicBentoCard({
  children,
  className = "",
  as = "article",
  enableStars = true,
  enableBorderGlow = true,
  clickEffect = true,
  particleCount = DEFAULT_PARTICLE,
  disableAnimations = false,
}: MagicBentoCardProps) {
  const rootRef = useRef<HTMLElement | null>(null);
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number; size: number }>>([]);
  const rippleSeq = useRef(0);
  const uid = useId();

  const starPositions = useMemo(
    () =>
      Array.from({ length: Math.min(particleCount, 10) }, (_, i) => ({
        left: 10 + ((i * 19) % 72),
        top: 14 + ((i * 27) % 58),
        delay: i * 0.14,
        dx: ((i * 3) % 5) - 2,
        dy: ((i * 5) % 5) - 2,
      })),
    [particleCount],
  );

  const updateGlow = useCallback(
    (e: ReactMouseEvent) => {
      if (disableAnimations) return;
      const el = rootRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width) * 100;
      const y = ((e.clientY - r.top) / r.height) * 100;
      el.style.setProperty("--mb-glow-x", `${x}%`);
      el.style.setProperty("--mb-glow-y", `${y}%`);
      el.style.setProperty("--mb-glow-intensity", "1");
    },
    [disableAnimations],
  );

  const clearGlow = useCallback(() => {
    const el = rootRef.current;
    if (!el) return;
    el.style.setProperty("--mb-glow-intensity", "0");
  }, []);

  const handleClick = useCallback(
    (e: ReactMouseEvent) => {
      if (disableAnimations || !clickEffect) return;
      const el = rootRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      const maxDistance = Math.max(
        Math.hypot(x, y),
        Math.hypot(x - r.width, y),
        Math.hypot(x, y - r.height),
        Math.hypot(x - r.width, y - r.height),
      );
      const size = maxDistance * 2;
      const id = rippleSeq.current++;
      setRipples((prev) => [...prev, { id, x, y, size }]);
    },
    [disableAnimations, clickEffect],
  );

  const removeRipple = useCallback((id: number) => {
    setRipples((prev) => prev.filter((r) => r.id !== id));
  }, []);

  const baseClass = [
    "magic-bento-card",
    enableBorderGlow && !disableAnimations ? "magic-bento-card--border-glow" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return createElement(
    as,
    {
      ref: rootRef,
      className: baseClass,
      onMouseMove: updateGlow,
      onMouseLeave: clearGlow,
      onClick: handleClick,
    },
    <>
      {enableStars && !disableAnimations
        ? starPositions.map((s, i) => (
            <span
              key={`${uid}-star-${i}`}
              className="magic-bento-star"
              style={
                {
                  left: `${s.left}%`,
                  top: `${s.top}%`,
                  animationDelay: `${s.delay}s`,
                  "--mb-dx": `${s.dx}px`,
                  "--mb-dy": `${s.dy}px`,
                } as CSSProperties
              }
            />
          ))
        : null}
      <div className="magic-bento-card__inner flex h-full flex-col">{children}</div>
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            className="magic-bento-ripple"
            style={{
              width: ripple.size,
              height: ripple.size,
              left: ripple.x,
              top: ripple.y,
              marginLeft: -ripple.size / 2,
              marginTop: -ripple.size / 2,
            }}
            initial={{ scale: 0, opacity: 0.55 }}
            animate={{ scale: 1, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.78, ease: [0.22, 1, 0.36, 1] }}
            onAnimationComplete={() => removeRipple(ripple.id)}
          />
        ))}
      </AnimatePresence>
    </>,
  );
}

export type MagicBentoSectionSpotlightProps = {
  children: React.ReactNode;
  enabled?: boolean;
  disableAnimations?: boolean;
};

/** Мягкий spotlight по секции (внутри bounds), не трогает `document.body`. */
export function MagicBentoSectionSpotlight({
  children,
  enabled = true,
  disableAnimations = false,
}: MagicBentoSectionSpotlightProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [spot, setSpot] = useState({ x: 0, y: 0, active: false });

  useEffect(() => {
    if (!enabled || disableAnimations) return;

    const onMove = (e: MouseEvent) => {
      const el = wrapRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      if (
        e.clientX < rect.left ||
        e.clientX > rect.right ||
        e.clientY < rect.top ||
        e.clientY > rect.bottom
      ) {
        setSpot((s) => ({ ...s, active: false }));
        return;
      }
      setSpot({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [enabled, disableAnimations]);

  return (
    <div ref={wrapRef} className="magic-bento-section">
      {enabled && !disableAnimations ? (
        <div className="magic-bento-spotlight" aria-hidden>
          <div
            className="magic-bento-spotlight__blob"
            style={{
              left: spot.x,
              top: spot.y,
              opacity: spot.active ? 1 : 0,
            }}
          />
        </div>
      ) : null}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
