"use client";

import type { ElementType, HTMLAttributes } from "react";
import { TextType } from "@/components/ui/TextType";

type HeadingTextTypeProps<T extends ElementType = "h2"> = {
  as?: T;
  text: string;
  /** Скорость набора (мс на символ). */
  typingSpeed?: number;
  /** Запуск только при появлении в viewport. */
  startOnVisible?: boolean;
  className?: string;
} & Omit<HTMLAttributes<HTMLElement>, "children">;

/**
 * Заголовок с эффектом набора: один раз, без удаления и без loop.
 */
export function HeadingTextType<T extends ElementType = "h2">({
  as,
  text,
  typingSpeed = 72,
  startOnVisible = true,
  className = "",
  ...rest
}: HeadingTextTypeProps<T>) {
  const Tag = (as ?? "h2") as ElementType;
  return (
    <Tag className={className} {...rest}>
      <TextType
        key={text}
        text={text}
        loop={false}
        allowDelete={false}
        typingSpeed={typingSpeed}
        initialDelay={0}
        pauseDuration={0}
        startOnVisible={startOnVisible}
        showCursor
        hideCursorAfterMs={1500}
        cursorCharacter="_"
        cursorClassName="text-primary"
        className="text-[rgb(var(--heading))]"
      />
    </Tag>
  );
}
