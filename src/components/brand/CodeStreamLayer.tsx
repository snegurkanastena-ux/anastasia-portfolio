"use client";

const FRAGMENTS = [
  "ctx.signal · renderTree · motion.spring",
  "vector.embed · latent.sort · batch.norm",
  "route.prefetch · edge.cache · stream.chunk",
  "schema.validate · token.mask · policy.allow",
  "layout.grid · type.safe · theme.class",
  "prompt.refine · diff.apply · review.pass",
];

/**
 * Статичный tech-слой (mono, низкий контраст). Без анимации — не второй движущийся фон.
 */
export function CodeStreamLayer() {
  return (
    <div className="code-stream-root" aria-hidden>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[38%] bg-gradient-to-t from-background via-background/40 to-transparent dark:from-background dark:via-background/35" />
      <div className="code-stream-fade pointer-events-none absolute inset-[-8%] flex justify-between gap-8 sm:gap-10">
        {FRAGMENTS.map((text, i) => (
          <div
            key={i}
            className="code-stream-column w-[11ch] font-mono text-editorial-xs leading-snug text-primary/14 dark:text-primary/10"
          >
            <p>{text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
