"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";

import { ContactChoiceTrigger } from "@/components/brand/ContactChoiceModal";
import { primaryCtaClassNames, secondaryCtaClassNames } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { HeadingTextType } from "@/components/ui/HeadingTextType";
import { TextType } from "@/components/ui/TextType";
import { TestimonialSection, type Testimonial } from "@/components/ui/testimonials";
import { useLocale } from "@/contexts/LocaleContext";
import { transitionBase } from "@/lib/motion";
import { PROJECT_CASES } from "@/lib/site";

const sectionMotion = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-6% 0px" },
  transition: transitionBase,
};

const sectionGap = "mt-10 sm:mt-12 lg:mt-14";

const listContainer = (stagger: boolean) => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger ? 0.045 : 0 },
  },
});

const listItem = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: transitionBase },
};

const cardMediaFrame =
  "flex h-full flex-col overflow-hidden rounded-lg border border-border/20 bg-card transition-[border-color,opacity,transform,box-shadow] duration-300 ease-out hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-[0_6px_32px_rgb(var(--primary)/0.22),0_0_0_1px_rgb(var(--primary)/0.08)]";

const TESTIMONIAL_PHOTOS = [
  "/images/testimonials/ekaterina-salieva.png",
  "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=900&q=80",
] as const;

const HERO_PORTRAIT_SRC = "/images/hero-portrait.png";

function HeroPhotoBlock({ imageAlt, name }: { imageAlt: string; name: string }) {
  const { locale } = useLocale();
  return (
    <figure className="mx-auto w-full max-w-[20rem] lg:mx-0 lg:max-w-none">
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg border-[6px] border-border/25">
        <Image
          src={HERO_PORTRAIT_SRC}
          alt={imageAlt}
          fill
          priority
          quality={95}
          sizes="(max-width: 1024px) 80vw, 380px"
          className="object-cover object-[50%_15%]"
        />
      </div>
      <figcaption className="mt-4 w-full text-center">
        <TextType
          key={`${locale}-hero-name`}
          text={name}
          loop={false}
          allowDelete={false}
          startOnVisible={false}
          typingSpeed={46}
          initialDelay={120}
          pauseDuration={0}
          showCursor
          hideCursorAfterMs={2000}
          cursorCharacter="_"
          cursorClassName="text-[rgb(var(--heading))] opacity-80"
          className="inline-block max-w-full whitespace-nowrap text-center font-signature text-[clamp(1.45rem,2.5vw,1.8rem)] font-semibold leading-tight tracking-tight text-[rgb(var(--heading))]"
          aria-label={name}
        />
      </figcaption>
    </figure>
  );
}


export function HomeContent() {
  const { t, locale } = useLocale();
  const reduceMotion = useReducedMotion();
  const staggerLists = !reduceMotion;

  const featured = [
    {
      id: "melanomusic" as const,
      title: t("home.featuredMelanoTitle"),
      desc: t("home.featuredMelanoDesc"),
    },
    {
      id: "neiroera" as const,
      title: t("home.featuredNeiroTitle"),
      desc: t("home.featuredNeiroDesc"),
    },
    {
      id: "salieva" as const,
      title: t("home.featuredSalievaTitle"),
      desc: t("home.featuredSalievaDesc"),
    },
  ];

  const homeTestimonials = useMemo<Testimonial[]>(
    () => [
      {
        id: 1,
        quote: t("home.testimonial1Quote"),
        name: t("home.testimonial1Name"),
        role: t("home.testimonial1Role"),
        imageSrc: TESTIMONIAL_PHOTOS[0],
      },
      {
        id: 2,
        quote: t("home.testimonial2Quote"),
        name: t("home.testimonial2Name"),
        role: t("home.testimonial2Role"),
        imageSrc: TESTIMONIAL_PHOTOS[1],
      },
      {
        id: 3,
        quote: t("home.testimonial3Quote"),
        name: t("home.testimonial3Name"),
        role: t("home.testimonial3Role"),
        imageSrc: TESTIMONIAL_PHOTOS[2],
      },
    ],
    [t],
  );

  const heroTitle = reduceMotion ? (
    <h1 className="heading-hero max-w-[min(100%,30ch)]" aria-label={t("home.heroTitle")}>{t("home.heroTitle")}</h1>
  ) : (
    <h1 className="heading-hero max-w-[min(100%,30ch)]" aria-label={t("home.heroTitle")}>
      <TextType
        key={`${locale}-hero-h1`}
        text={t("home.heroTitle")}
        loop={false}
        allowDelete={false}
        startOnVisible={false}
        typingSpeed={34}
        initialDelay={0}
        pauseDuration={0}
        showCursor
        hideCursorAfterMs={2000}
        cursorCharacter="_"
        cursorClassName="text-[rgb(var(--heading))] opacity-80"
        className="font-display text-editorial-hero font-normal leading-[1.04] tracking-[-0.038em]"
      />
    </h1>
  );

  return (
    <Container className="pb-10 pt-2 sm:pb-12 sm:pt-3 md:pb-14 lg:pb-16">
      {/* ── HERO ── */}
      <motion.section className="relative isolate overflow-hidden pb-8 pt-2 sm:pb-10 sm:pt-3" {...sectionMotion}>
        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12 lg:gap-x-10 lg:gap-y-4">
          <div className="flex flex-col gap-4 lg:col-span-7">
            {heroTitle}
            <p className="max-w-[min(100%,34ch)] text-editorial-base font-medium leading-snug text-foreground sm:text-editorial-body-lg">
              {t("home.heroSubtitle")}
            </p>
            <div className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
              <Link
                href="/portfolio"
                className={`${primaryCtaClassNames("lg")} h-11 min-h-[2.75rem] min-w-[10.5rem] rounded-lg px-7 text-editorial-sm font-semibold tracking-wide`}
              >
                {t("cta.projects")}
              </Link>
              <ContactChoiceTrigger className={`${secondaryCtaClassNames("lg")} h-11 min-h-[2.75rem] min-w-[10.5rem] px-7 text-editorial-sm`}>
                {t("cta.discuss")}
              </ContactChoiceTrigger>
            </div>
          </div>

          <div className="lg:col-span-5">
            <HeroPhotoBlock imageAlt={t("home.heroPortraitAlt")} name={t("brand.name")} />
          </div>
        </div>
      </motion.section>

      {/* ── ABOUT ── */}
      <motion.section className={`relative border-t border-border/20 pt-8 ${sectionGap}`} {...sectionMotion}>
        <HeadingTextType as="h2" text={t("home.aboutTitle")} typingSpeed={80} className="heading-section" />
        <p className="mt-4 max-w-3xl text-editorial-base font-medium leading-relaxed text-foreground sm:text-editorial-body-lg">
          {t("home.aboutSubtitle")}
        </p>
        <div className="mt-7 sm:mt-8">
          <Link
            href="/services"
            className={`${primaryCtaClassNames("lg")} inline-flex h-11 min-h-[2.75rem] min-w-[12rem] items-center justify-center rounded-lg px-8 text-editorial-sm font-semibold tracking-wide`}
          >
            {t("cta.viewServices")}
          </Link>
        </div>
      </motion.section>

      {/* ── FEATURED ── */}
      <motion.section className={sectionGap} {...sectionMotion}>
        <HeadingTextType as="h2" text={t("home.featuredTitle")} typingSpeed={85} className="heading-section" />
        <motion.div
          className="mt-6 grid grid-cols-1 gap-4 sm:mt-7 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4"
          variants={listContainer(staggerLists)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-6% 0px" }}
        >
          {featured.map((item) => {
            const project = PROJECT_CASES.find((p) => p.id === item.id);
            if (!project || !("href" in project)) return null;
            return (
              <motion.div key={item.id} variants={listItem} className="h-full">
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group ${cardMediaFrame} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary`}
                >
                  <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden bg-muted-surface/35">
                    <Image
                      src={project.coverSrc}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-4 sm:p-5">
                    <h3 className="heading-subsection text-pretty">{item.title}</h3>
                    <p className="mt-2 flex-1 text-editorial-sm leading-relaxed text-foreground sm:text-editorial-base">{item.desc}</p>
                    <span className="mt-4 inline-flex h-9 w-full items-center justify-center rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors duration-200 group-hover:bg-primary-hover">
                      {t("cta.viewProject")}
                    </span>
                  </div>
                </a>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.section>

      {/* ── TESTIMONIALS ── */}
      <motion.section className={sectionGap} {...sectionMotion}>
        <TestimonialSection
          title={t("home.testimonialsTitle")}
          subtitle={t("home.testimonialsSubtitle")}
          testimonials={homeTestimonials}
        />
      </motion.section>

      {/* ── MANIFESTO ── */}
      <motion.section className={sectionGap} {...sectionMotion}>
        <HeadingTextType
          as="p"
          text={t("home.manifesto")}
          typingSpeed={72}
          className="w-full max-w-none text-pretty text-center font-display text-[clamp(1.15rem,2.4vw,1.65rem)] font-normal leading-snug tracking-[-0.02em] text-[rgb(var(--heading))] sm:text-left sm:leading-snug"
        />
      </motion.section>

      {/* ── FINAL CTA ── */}
      <motion.section
        className={`${sectionGap} rounded-lg border border-border/20 bg-[rgb(var(--void))] px-5 py-7 text-foreground sm:px-6 sm:py-8`}
        {...sectionMotion}
      >
        <HeadingTextType as="h2" text={t("home.finalTitle")} typingSpeed={78} className="heading-invert max-w-[min(100%,36ch)]" />
        <p className="mt-4 max-w-xl text-editorial-sm font-medium leading-snug text-foreground opacity-90 sm:text-editorial-base">
          {t("home.finalBody")}
        </p>
        <div className="mt-6 flex max-w-xl flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:items-center">
          <ContactChoiceTrigger
            className={`${primaryCtaClassNames("lg")} h-11 min-h-[2.75rem] w-full justify-center rounded-lg border-transparent px-7 text-editorial-sm sm:w-auto`}
          >
            {t("cta.write")}
          </ContactChoiceTrigger>
          <Link
            href="/portfolio"
            className={`${secondaryCtaClassNames("lg")} h-11 min-h-[2.75rem] w-full px-7 text-editorial-sm sm:w-auto`}
          >
            {t("cta.works")}
          </Link>
        </div>
      </motion.section>
    </Container>
  );
}
