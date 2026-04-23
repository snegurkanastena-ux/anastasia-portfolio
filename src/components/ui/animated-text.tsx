"use client";

import * as React from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

const motionByTag = {
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  h4: motion.h4,
  h5: motion.h5,
  h6: motion.h6,
  p: motion.p,
  span: motion.span,
} as const;

export type AnimatedTextTag = keyof typeof motionByTag;

/** Пресеты под `heading-*` из `globals.css` */
export type AnimatedTextPreset = "hero" | "section" | "subsection" | "none";

const presetText: Record<Exclude<AnimatedTextPreset, "none">, string> = {
  hero: "heading-hero",
  section: "heading-section",
  subsection: "heading-subsection",
};

export interface AnimatedTextProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  text: string;
  /** Интервал между буквами (stagger), сек. */
  duration?: number;
  /** Задержка перед стартом детей, сек. */
  delay?: number;
  /** Смена значения перезапускает анимацию (например `locale`) */
  replayKey?: string | number;
  className?: string;
  textClassName?: string;
  underlineClassName?: string;
  as?: AnimatedTextTag;
  /** Классы градиента подчёркивания (`bg-gradient-to-r …`) — по умолчанию терракотовый акцент сайта */
  underlineGradient?: string;
  underlineHeight?: string;
  underlineOffset?: string;
  preset?: AnimatedTextPreset;
  /** Показать линию под текстом */
  showUnderline?: boolean;
}

const AnimatedText = React.forwardRef<HTMLDivElement, AnimatedTextProps>(
  (
    {
      text,
      duration = 0.04,
      delay = 0.06,
      replayKey,
      className,
      textClassName,
      underlineClassName,
      as = "h1",
      underlineGradient = "from-accent via-accent/85 to-accent/45",
      underlineHeight = "h-0.5",
      underlineOffset = "-bottom-2",
      preset = "none",
      showUnderline = true,
      ...props
    },
    ref,
  ) => {
    const reduceMotion = useReducedMotion();
    const letters = React.useMemo(() => Array.from(text), [text]);
    const presetCls = preset !== "none" ? presetText[preset] : undefined;

    const container: Variants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: duration,
          delayChildren: delay,
        },
      },
    };

    const child: Variants = {
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          type: "spring",
          damping: 14,
          stiffness: 220,
        },
      },
      hidden: {
        opacity: 0,
        y: 14,
        transition: {
          type: "spring",
          damping: 14,
          stiffness: 220,
        },
      },
    };

    const lineVariants: Variants = {
      hidden: {
        width: "0%",
        left: "50%",
      },
      visible: {
        width: "100%",
        left: "0%",
        transition: {
          delay: Math.max(0.12, letters.length * duration + delay * 0.35),
          duration: 0.65,
          ease: [0.22, 1, 0.36, 1],
        },
      },
    };

    if (reduceMotion) {
      return (
        <div ref={ref} className={cn("flex flex-col gap-2", className)} {...props}>
          {React.createElement(
            as,
            { className: cn("text-left text-ink", presetCls, textClassName) },
            text,
          )}
        </div>
      );
    }

    const MotionTag = motionByTag[as];

    return (
      <div ref={ref} className={cn("flex flex-col gap-2", className)} {...props}>
        <div className="relative w-fit max-w-full">
          <MotionTag
            key={replayKey ?? text}
            style={{ overflow: "hidden" }}
            variants={container}
            initial="hidden"
            animate="visible"
            className={cn("block text-left text-ink", presetCls, textClassName)}
          >
            {letters.map((letter, index) => (
              <motion.span key={`${replayKey ?? ""}-${index}`} variants={child} className="inline">
                {letter === " " ? " " : letter}
              </motion.span>
            ))}
          </MotionTag>

          {showUnderline ? (
            <motion.div
              key={`line-${replayKey ?? text}`}
              variants={lineVariants}
              initial="hidden"
              animate="visible"
              className={cn(
                "absolute rounded-none",
                underlineHeight,
                underlineOffset,
                "bg-gradient-to-r",
                underlineGradient,
                underlineClassName,
              )}
            />
          ) : null}
        </div>
      </div>
    );
  },
);

AnimatedText.displayName = "AnimatedText";

export { AnimatedText };
