import type { Transition, Variants } from "framer-motion";

/** Единый motion language: спокойный easing, без spring-«пружин» в shell */
export const easeEditorial: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const transitionBase: Transition = {
  duration: 0.32,
  ease: easeEditorial,
};

export const transitionFast: Transition = {
  duration: 0.22,
  ease: easeEditorial,
};

export const transitionSlower: Transition = {
  duration: 0.4,
  ease: easeEditorial,
};

export const transitionPageOverlay: Transition = {
  duration: 0.28,
  ease: easeEditorial,
};

export const fadeInUp: Variants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0, transition: transitionBase },
  exit: { opacity: 0, y: 4, transition: transitionFast },
};

export const fade: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: transitionBase },
  exit: { opacity: 0, transition: transitionFast },
};
