"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type FallingPatternProps = {
  className?: string;
  duration?: number;
  blurIntensity?: string;
  density?: number;
};

function StaticLines({
  n,
  blurIntensity,
  color,
  opacityWrap,
}: {
  n: number;
  blurIntensity: string;
  color: string;
  opacityWrap: number;
}) {
  const lines = Array.from({ length: n }, (_, i) => i);
  return (
    <div className="absolute inset-0" style={{ filter: `blur(${blurIntensity})`, opacity: opacityWrap }}>
      {lines.map((i) => (
        <div
          key={i}
          className="absolute top-0 w-px"
          style={{
            left: `${(i + 0.5) * (100 / n)}%`,
            height: "120%",
            background: `linear-gradient(to bottom, transparent, ${color}, transparent)`,
            opacity: 0.4,
          }}
        />
      ))}
    </div>
  );
}

/**
 * Еле заметный tech-фон: вертикальные штрихи.
 * При `prefers-reduced-motion` — статичные линии (без движения).
 */
export function FallingPattern({
  className,
  duration = 100,
  blurIntensity = "0.5rem",
  density = 1.4,
}: FallingPatternProps) {
  const reduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const n = Math.max(10, Math.round(14 * density));
  const lines = Array.from({ length: n }, (_, i) => i);
  const color = "rgb(var(--primary) / 0.35)";

  if (reduceMotion) {
    return (
      <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden>
        <StaticLines n={n} blurIntensity={blurIntensity} color={color} opacityWrap={0.12} />
      </div>
    );
  }

  if (!mounted) {
    return null;
  }

  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden>
      <div className="absolute inset-0 opacity-[0.12]" style={{ filter: `blur(${blurIntensity})` }}>
        {lines.map((i) => (
          <motion.div
            key={i}
            className="absolute top-0 w-px"
            style={{
              left: `${(i + 0.5) * (100 / n)}%`,
              height: "120%",
              background: `linear-gradient(to bottom, transparent, ${color}, transparent)`,
              opacity: 0.42,
            }}
            initial={{ y: "-15%" }}
            animate={{ y: "15%" }}
            transition={{
              duration: duration + (i % 7) * 6,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "linear",
              delay: (i / n) * 12,
            }}
          />
        ))}
      </div>
    </div>
  );
}
