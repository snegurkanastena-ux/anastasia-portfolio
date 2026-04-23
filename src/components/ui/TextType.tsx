"use client";

import type { HTMLAttributes } from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import "./TextType.css";

export type TextTypeProps = {
  text: string | string[];
  typingSpeed?: number;
  initialDelay?: number;
  pauseDuration?: number;
  deletingSpeed?: number;
  loop?: boolean;
  className?: string;
  showCursor?: boolean;
  hideCursorWhileTyping?: boolean;
  /** Скрыть курсор через N мс после завершения набора (0 = не скрывать). */
  hideCursorAfterMs?: number;
  cursorCharacter?: string;
  cursorClassName?: string;
  cursorBlinkDuration?: number;
  textColors?: string[];
  variableSpeed?: { min: number; max: number };
  onSentenceComplete?: (sentence: string, index: number) => void;
  startOnVisible?: boolean;
  reverseMode?: boolean;
  /** Если false — после полного набора не удалять текст (достаточно с `loop={false}`). */
  allowDelete?: boolean;
} & HTMLAttributes<HTMLSpanElement>;

/**
 * Эффект набора текста (адаптация идеи react-bits TextType).
 * Курсор — CSS-анимация, без GSAP.
 */
export function TextType({
  text,
  typingSpeed = 50,
  initialDelay = 0,
  pauseDuration = 2000,
  deletingSpeed = 30,
  loop = true,
  className = "",
  showCursor = true,
  hideCursorWhileTyping = false,
  hideCursorAfterMs = 0,
  cursorCharacter = "|",
  cursorClassName = "",
  cursorBlinkDuration = 0.5,
  textColors = [],
  variableSpeed,
  onSentenceComplete,
  startOnVisible = false,
  reverseMode = false,
  allowDelete = true,
  ...props
}: TextTypeProps) {
  const reduceMotion = useReducedMotion();
  const [displayedText, setDisplayedText] = useState("");
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(!startOnVisible);
  const [cursorHidden, setCursorHidden] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);

  const textArray = useMemo(() => (Array.isArray(text) ? text : [text]), [text]);

  const getRandomSpeed = useCallback(() => {
    if (!variableSpeed) return typingSpeed;
    const { min, max } = variableSpeed;
    return Math.random() * (max - min) + min;
  }, [variableSpeed, typingSpeed]);

  const getCurrentTextColor = () => {
    if (textColors.length === 0) return undefined;
    return textColors[currentTextIndex % textColors.length];
  };

  const currentFull = textArray[currentTextIndex] ?? "";
  const processedFull = useMemo(
    () => (reverseMode ? currentFull.split("").reverse().join("") : currentFull),
    [currentFull, reverseMode],
  );

  useEffect(() => {
    if (reduceMotion) setIsVisible(true);
  }, [reduceMotion]);

  useEffect(() => {
    if (!reduceMotion) return;
    if (!isVisible) return;
    setDisplayedText(processedFull);
    setCurrentCharIndex(processedFull.length);
    setIsDeleting(false);
  }, [reduceMotion, isVisible, processedFull]);

  useEffect(() => {
    if (reduceMotion) return;
    if (!startOnVisible || !containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setIsVisible(true);
        });
      },
      { threshold: 0.1 },
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [startOnVisible, reduceMotion]);

  useEffect(() => {
    if (reduceMotion) return;
    if (!isVisible) return;

    let timeout: ReturnType<typeof setTimeout> | undefined;
    const processedText = processedFull;

    const executeTypingAnimation = () => {
      if (isDeleting) {
        if (displayedText === "") {
          setIsDeleting(false);
          if (currentTextIndex === textArray.length - 1 && !loop) {
            return;
          }

          onSentenceComplete?.(textArray[currentTextIndex] ?? "", currentTextIndex);

          setCurrentTextIndex((prev) => (prev + 1) % textArray.length);
          setCurrentCharIndex(0);
        } else {
          timeout = setTimeout(() => {
            setDisplayedText((prev) => prev.slice(0, -1));
          }, deletingSpeed);
        }
      } else if (currentCharIndex < processedText.length) {
        timeout = setTimeout(
          () => {
            setDisplayedText((prev) => prev + processedText[currentCharIndex]);
            setCurrentCharIndex((prev) => prev + 1);
          },
          variableSpeed ? getRandomSpeed() : typingSpeed,
        );
      } else if (textArray.length >= 1) {
        if ((!loop && currentTextIndex === textArray.length - 1) || !allowDelete) return;
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, pauseDuration);
      }
    };

    if (currentCharIndex === 0 && !isDeleting && displayedText === "") {
      timeout = setTimeout(executeTypingAnimation, initialDelay);
    } else {
      executeTypingAnimation();
    }

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [
    currentCharIndex,
    displayedText,
    isDeleting,
    typingSpeed,
    deletingSpeed,
    pauseDuration,
    textArray,
    currentTextIndex,
    loop,
    initialDelay,
    isVisible,
    reverseMode,
    variableSpeed,
    onSentenceComplete,
    getRandomSpeed,
    allowDelete,
    reduceMotion,
    processedFull,
  ]);

  const typingDone =
    !isDeleting &&
    currentCharIndex >= processedFull.length &&
    displayedText.length >= processedFull.length;

  useEffect(() => {
    if (!typingDone || hideCursorAfterMs <= 0) return;
    const id = setTimeout(() => setCursorHidden(true), hideCursorAfterMs);
    return () => clearTimeout(id);
  }, [typingDone, hideCursorAfterMs]);

  const shouldHideCursor =
    cursorHidden ||
    (Boolean(hideCursorWhileTyping) &&
      (currentCharIndex < processedFull.length || isDeleting));

  const cursorStyle = {
    animationDuration: `${cursorBlinkDuration * 2}s`,
  } as const;

  return (
    <span
      ref={containerRef}
      className={`text-type ${className}`.trim()}
      aria-live="polite"
      {...props}
    >
      <span className="text-type__content" style={{ color: getCurrentTextColor() }}>
        {displayedText}
      </span>
      {showCursor ? (
        <span
          className={`text-type__cursor ${cursorClassName} ${shouldHideCursor ? "text-type__cursor--hidden" : ""}`.trim()}
          style={cursorStyle}
          aria-hidden
        >
          {cursorCharacter}
        </span>
      ) : null}
    </span>
  );
}
