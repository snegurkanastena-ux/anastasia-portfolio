"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { RefObject } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import "./TextCursor.css";

export type TextCursorProps = {
  /** Элемент (обычно hero `section`), внутри которого рисуется след; координаты относительно него */
  boundsRef: RefObject<HTMLElement | null>;
  text?: string;
  spacing?: number;
  followMouseDirection?: boolean;
  randomFloat?: boolean;
  exitDuration?: number;
  removalInterval?: number;
  maxPoints?: number;
  /** Не показывать (например при prefers-reduced-motion) */
  disabled?: boolean;
};

/**
 * След из символов за курсором (идея react-bits TextCursor).
 * Слушает `mousemove` на `window` и обновляет след только внутри `boundsRef`, чтобы не перехватывать клики по CTA.
 */
export function TextCursor({
  boundsRef,
  text = "·",
  spacing = 80,
  followMouseDirection = true,
  randomFloat = true,
  exitDuration = 0.3,
  removalInterval = 20,
  maxPoints = 10,
  disabled = false,
}: TextCursorProps) {
  const [trail, setTrail] = useState<
    Array<{
      id: number;
      x: number;
      y: number;
      angle: number;
      randomX?: number;
      randomY?: number;
      randomRotate?: number;
    }>
  >([]);
  const lastMoveTimeRef = useRef(Date.now());
  const idCounter = useRef(0);

  const createRandomData = useCallback(() => {
    if (!randomFloat) return {};
    return {
      randomX: Math.random() * 10 - 5,
      randomY: Math.random() * 10 - 5,
      randomRotate: Math.random() * 10 - 5,
    };
  }, [randomFloat]);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const el = boundsRef.current;
      if (!el || disabled) return;

      const rect = el.getBoundingClientRect();
      if (
        e.clientX < rect.left ||
        e.clientX > rect.right ||
        e.clientY < rect.top ||
        e.clientY > rect.bottom
      ) {
        return;
      }

      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      setTrail((prev) => {
        const newTrail = [...prev];

        if (newTrail.length === 0) {
          newTrail.push({
            id: idCounter.current++,
            x: mouseX,
            y: mouseY,
            angle: 0,
            ...createRandomData(),
          });
        } else {
          const last = newTrail[newTrail.length - 1]!;
          const dx = mouseX - last.x;
          const dy = mouseY - last.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance >= spacing) {
            const rawAngle = (Math.atan2(dy, dx) * 180) / Math.PI;
            const computedAngle = followMouseDirection ? rawAngle : 0;
            const steps = Math.floor(distance / spacing);

            for (let i = 1; i <= steps; i++) {
              const t = (spacing * i) / distance;
              const newX = last.x + dx * t;
              const newY = last.y + dy * t;

              newTrail.push({
                id: idCounter.current++,
                x: newX,
                y: newY,
                angle: computedAngle,
                ...createRandomData(),
              });
            }
          }
        }

        return newTrail.length > maxPoints ? newTrail.slice(newTrail.length - maxPoints) : newTrail;
      });

      lastMoveTimeRef.current = Date.now();
    },
    [boundsRef, disabled, spacing, followMouseDirection, maxPoints, createRandomData],
  );

  useEffect(() => {
    if (disabled) return;
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [disabled, handleMouseMove]);

  useEffect(() => {
    if (disabled) return;
    const interval = setInterval(() => {
      if (Date.now() - lastMoveTimeRef.current > 100) {
        setTrail((prev) => (prev.length > 0 ? prev.slice(1) : prev));
      }
    }, removalInterval);
    return () => clearInterval(interval);
  }, [disabled, removalInterval]);

  if (disabled) return null;

  return (
    <div className="text-cursor-layer" aria-hidden>
      <AnimatePresence>
        {trail.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 1, rotate: item.angle }}
            animate={{
              opacity: 1,
              scale: 1,
              x: randomFloat ? [0, item.randomX ?? 0, 0] : 0,
              y: randomFloat ? [0, item.randomY ?? 0, 0] : 0,
              rotate: randomFloat
                ? [item.angle, item.angle + (item.randomRotate ?? 0), item.angle]
                : item.angle,
            }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{
              opacity: { duration: exitDuration, ease: "easeOut" },
              ...(randomFloat && {
                x: { duration: 2, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" as const },
                y: { duration: 2, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" as const },
                rotate: { duration: 2, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" as const },
              }),
            }}
            className="text-cursor-item"
            style={{ left: item.x, top: item.y }}
          >
            {text}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
