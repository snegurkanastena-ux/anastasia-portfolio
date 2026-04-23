"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Quote } from "lucide-react";
import { HeadingTextType } from "@/components/ui/HeadingTextType";
import { easeEditorial } from "@/lib/motion";
import { cn } from "@/lib/utils";

export type Testimonial = {
  id: number;
  quote: string;
  name: string;
  role: string;
  imageSrc: string;
};

export type TestimonialSectionProps = {
  title: string;
  subtitle: string;
  testimonials: Testimonial[];
  className?: string;
};

const containerVariants = (stagger: boolean) => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: stagger ? 0.1 : 0,
    },
  },
});

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.38,
      ease: easeEditorial,
    },
  },
};

const cardSurface =
  "flex h-full flex-col overflow-hidden rounded-lg border border-border/20 bg-card transition-[border-color,opacity,transform,box-shadow] duration-300 ease-out hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-[0_6px_32px_rgb(var(--primary)/0.22),0_0_0_1px_rgb(var(--primary)/0.08)]";

export function TestimonialSection({ title, subtitle, testimonials, className }: TestimonialSectionProps) {
  const reduceMotion = useReducedMotion();
  const staggerLists = !reduceMotion;

  return (
    <section className={cn("w-full", className)} aria-labelledby="testimonials-heading">
      <div className="text-left">
        <HeadingTextType
          as="h2"
          id="testimonials-heading"
          text={title}
          typingSpeed={90}
          className="heading-section max-w-[20ch]"
        />
        <p className="mt-3 max-w-prose text-editorial-base leading-relaxed text-foreground sm:text-editorial-body-lg">
          {subtitle}
        </p>
      </div>

      {reduceMotion ? (
        <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-2 lg:mt-8 lg:grid-cols-3 lg:gap-4">
          {testimonials.map((item) => (
            <TestimonialCard key={item.id} testimonial={item} />
          ))}
        </div>
      ) : (
        <motion.div
          className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-2 lg:mt-8 lg:grid-cols-3 lg:gap-4"
          variants={containerVariants(staggerLists)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
        >
          {testimonials.map((item) => (
            <motion.div key={item.id} variants={itemVariants} className="flex h-full">
              <TestimonialCard testimonial={item} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </section>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure className={cn(cardSurface, "h-full min-h-[19rem]")}>
      <div className="relative aspect-[5/4] w-full shrink-0 overflow-hidden bg-muted-surface/30">
        <Image
          src={testimonial.imageSrc}
          alt={testimonial.name}
          fill
          className="object-cover object-[50%_20%]"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <div className="flex min-h-0 flex-1 flex-col p-4 sm:p-5">
        <Quote className="mb-2 h-5 w-5 shrink-0 text-primary/90" aria-hidden />
        <blockquote className="flex-1 text-editorial-sm font-medium leading-snug text-foreground sm:text-editorial-base">
          {testimonial.quote}
        </blockquote>
        <figcaption className="mt-4 border-t border-border/20 pt-3">
          <p className="text-editorial-label font-semibold tracking-wide text-[rgb(var(--heading))]">— {testimonial.name}</p>
          <p className="mt-0.5 text-editorial-caption text-muted">{testimonial.role}</p>
        </figcaption>
      </div>
    </figure>
  );
}
