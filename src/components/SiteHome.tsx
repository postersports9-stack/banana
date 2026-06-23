'use client'

import { useRef, useState } from "react";
import Link from "next/link";
import { SplineScene } from "@/components/ui/splite";
import ClientsMarquee from "@/components/ClientsMarquee";
import SiteNav from "@/components/site/SiteNav";
import SiteFooter from "@/components/site/SiteFooter";
import QuoteModal, { useQuoteModalState } from "@/components/site/QuoteModal";
import { useMediaQuery } from "@/hooks/use-media-query";
import { translations, type Lang } from "@/lib/translations";

// Single source of truth for the home page markup. Both locale routes render
// this: `/` passes lang="mk", `/en` passes lang="en". All copy comes from the
// dictionary in src/lib/translations.ts — keep this file free of literal text.
// Nav, footer and the quote modal are shared with the service pages (see
// src/components/site/).
export default function SiteHome({ lang }: { lang: Lang }) {
  const t = translations[lang];
  const portfolioPath = lang === "mk" ? "/portfolio" : "/en/portfolio";
  const containerRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  // The robot is a multi-MB WebGL scene driven by cursor proximity — pointless
  // on touch devices (no hover) and brutal on weaker hardware. Mount it only on
  // desktop; below md the element is not rendered at all.
  const showRobot = useMediaQuery("(min-width: 768px)");
  const [activeReview, setActiveReview] = useState(0);
  const review = t.testimonials.reviews[activeReview];
  // Quote-request modal — state + Escape/scroll-lock live in the shared hook.
  const { open, openModal, closeModal } = useQuoteModalState();
  return (
    <>
      <SiteNav lang={lang} onQuoteClick={openModal} />

      {/* Hero Section */}
      <header
        ref={containerRef}
        className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden px-margin-mobile md:px-margin-desktop bg-black text-white"
        onPointerMove={(e) => {
          // Cache the canvas after the first lookup so we don't run a DOM query
          // on every pointer move across the hero.
          if (!canvasRef.current) {
            canvasRef.current = document.querySelector('canvas');
          }
          canvasRef.current?.dispatchEvent(
            new PointerEvent(e.type, e.nativeEvent)
          );
        }}
      >
        {/* Abstract Tech Background Element */}
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none flex items-center justify-center">
          <svg className="w-full h-full max-w-4xl" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
            <g fill="none" opacity="0.5" stroke="#1c1b1b" strokeWidth="2">
              <circle cx="400" cy="400" r="300" strokeDasharray="10 10"></circle>
              <circle cx="400" cy="400" r="200" strokeDasharray="5 5"></circle>
              <path d="M100 400 H700 M400 100 V700" strokeDasharray="4 8"></path>
            </g>
          </svg>
        </div>
        <div className="relative z-10 w-full max-w-max-width mx-auto flex flex-col md:flex-row items-center gap-gutter">
          {/* Hero Content */}
          <div className="flex-1 flex flex-col items-start gap-8 z-20">
            <div className="inline-block text-banana font-label-bold text-sm uppercase tracking-[0.1em]">
              {t.hero.eyebrow}
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-[4.5rem] font-semibold tracking-[-0.04em] leading-[1.05]">
              <span className="text-white">{t.hero.titleLine1}</span>
              <br />
              <span className="text-banana">{t.hero.titleHighlight}</span>{" "}
              <span className="text-white">{t.hero.titleMid}</span>
              <br />
              <span className="text-white">{t.hero.titleEnd}</span>
            </h1>
            <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full sm:w-auto">
              <button type="button" onClick={openModal} className="inline-flex items-center justify-center rounded-md bg-banana text-black font-bold text-sm uppercase tracking-tighter px-6 py-3 border-2 border-transparent hover:bg-white hover:text-black hover:border-white transition-all duration-300 w-full sm:w-auto cursor-pointer">
                {t.hero.quote}<span className="material-symbols-outlined ml-2 text-base">arrow_forward</span>
              </button>
              <Link className="inline-flex items-center justify-center rounded-md bg-transparent text-white font-bold text-sm uppercase tracking-tighter px-6 py-3 border border-banana/60 hover:bg-banana hover:text-black hover:border-banana hover:scale-105 transition-all duration-100 w-full sm:w-auto" href={portfolioPath}>
                {t.hero.portfolio}
              </Link>
            </div>
          </div>
          {/* Hero Image — desktop only; not mounted on mobile */}
          {showRobot && (
            <div className="flex-1 w-full mt-12 md:mt-0 relative z-10 flex justify-center md:justify-end">
              <div className="relative w-full max-w-lg aspect-square">
                <SplineScene
                  scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                  className="relative z-10 w-full h-full min-h-[400px]"
                />
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Clients Logo Marquee */}
      <ClientsMarquee heading={t.clientsHeading} />

      {/* Services Section */}
      <section className="w-full py-24 md:py-32 px-margin-mobile md:px-margin-desktop bg-surface" id="services">
        <div className="max-w-max-width mx-auto">
          <div className="flex flex-col items-center text-center mb-16 gap-6 mx-auto max-w-4xl">
            <div className="max-w-3xl">
              <h2 className="font-headline-xl text-headline-lg-mobile md:text-headline-lg font-bold text-on-background uppercase tracking-tighter mb-4">
                {t.services.heading}
              </h2>
              <p className="font-body-md text-on-surface-variant max-w-3xl mx-auto">
                {t.services.intro}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 auto-rows-fr gap-gutter max-w-5xl mx-auto">
            {t.services.cards.map((card) => (
              <Link key={card.title} href={card.href} className="group bg-white bg-diagonal-lines border border-black rounded-xl p-8 cursor-pointer hover:shadow-[0_0_25px_rgba(255,225,53,0.45)] transition-all duration-300 flex flex-col h-full text-center items-center">
                <div className="w-16 h-16 bg-white flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-black text-4xl">{card.icon}</span>
                </div>
                <h3 className="font-headline-lg text-2xl font-semibold uppercase tracking-[-0.04em] mb-4 text-on-background">{card.title}</h3>
                <p className="font-body-md text-on-surface-variant">{card.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Split Section */}
      <section className="relative w-full py-12 md:py-16 bg-banana overflow-hidden">
        <div className="w-full max-w-max-width mx-auto px-margin-mobile md:px-margin-desktop">
          {/* Left Side: Title + 2x2 Grid of Flip Cards */}
          <div className="flex flex-col justify-center lg:w-1/2 lg:pr-4 lg:-ml-12">
              <div className="mb-8 text-center lg:text-left">
                <span className="inline-block bg-black text-banana rounded-md px-4 py-1 font-label-bold text-label-bold tracking-widest mb-4">
                  {t.features.badge}
                </span>
                <h2 className="font-headline-xl text-headline-lg-mobile md:text-headline-lg font-bold text-on-background tracking-tighter">
                  {t.features.heading}
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
              {t.features.cards.map((card) => (
                <div key={card.title} className="group h-44 [perspective:1000px]">
                  <div className="relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                    {/* Front */}
                    <div className="absolute inset-0 [backface-visibility:hidden] flex flex-col items-center justify-center text-center p-8 bg-[#242625] rounded-2xl">
                      <div className="mb-6">
                        <span className="material-symbols-outlined text-banana text-6xl">{card.icon}</span>
                      </div>
                      <h4 className="font-headline-lg text-xl font-bold tracking-[-0.04em] text-white">{card.title}</h4>
                    </div>
                    {/* Back */}
                    <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] flex flex-col items-center justify-center text-center p-6 bg-[#242625] rounded-2xl">
                      <h4 className="font-headline-lg text-lg font-bold tracking-[-0.04em] text-banana mb-3">{card.title}</h4>
                      <p className="font-body-md text-sm text-white/80">{card.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
              </div>
              <div className="mt-6 text-center lg:text-right">
                <Link href={portfolioPath} className="inline-flex items-center justify-center rounded bg-white text-black font-semibold text-sm tracking-tight px-6 py-3 hover:bg-black hover:text-white transition-all duration-300">
                  {t.features.cta}
                </Link>
              </div>
            </div>
          </div>
        {/* Right Side: Image — full-bleed to right wall */}
        <div className="relative w-full h-72 mt-12 lg:mt-0 lg:h-auto lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img src="/feature-split-2.webp" alt={t.features.imgAlt} loading="lazy" decoding="async" className="w-full h-full object-cover" />
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full py-24 md:py-32 px-margin-mobile md:px-margin-desktop bg-white" id="testimonials">
        <div className="max-w-max-width mx-auto">
          <div className="text-center mb-16">
            <p className="font-label-bold text-label-bold text-banana uppercase tracking-widest mb-4">{t.testimonials.eyebrow}</p>
            <h2 className="font-headline-xl text-headline-lg-mobile md:text-headline-lg font-bold text-on-background uppercase tracking-tighter max-w-4xl mx-auto">
              {t.testimonials.heading}
            </h2>
          </div>
          <div className="max-w-4xl mx-auto relative bg-white border border-black rounded-xl p-8 md:p-12">
            {/* Giant Quote Mark Background */}
            <div className="absolute right-8 top-8 opacity-5 pointer-events-none">
              <svg className="w-32 md:w-48 h-auto text-black" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"></path>
              </svg>
            </div>
            <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-shrink-0">
                <img alt={review.imageAlt} loading="lazy" decoding="async" className="w-24 h-24 rounded-full border-2 border-black object-contain bg-white p-2" src={review.image} />
              </div>
              <div className="flex-col">
                <h3 className="font-headline-lg text-2xl font-bold uppercase tracking-[-0.04em] mb-2 text-on-background">{review.title}</h3>
                <div className="flex text-banana mb-2">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-2xl">star</span>
                  ))}
                </div>
                <p className="font-label-bold text-sm text-on-surface-variant uppercase tracking-wider mb-6">{review.person} - {review.company}</p>
                <p className="font-body-lg text-on-surface-variant leading-relaxed">
                  {review.quote}
                </p>
              </div>
            </div>
            {/* Pagination — one dot per review */}
            {t.testimonials.reviews.length > 1 && (
              <div className="flex justify-center items-center gap-3 mt-12">
                {t.testimonials.reviews.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveReview(i)}
                    aria-label={`${t.testimonials.showReview} ${i + 1}`}
                    className={
                      i === activeReview
                        ? "w-3 h-3 rounded-full bg-banana border-2 border-black"
                        : "w-3 h-3 rounded-full bg-black hover:bg-banana transition-colors"
                    }
                  ></button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Call-To-Action Section */}
      <section className="w-full py-24 md:py-32 px-margin-mobile md:px-margin-desktop bg-black border-t border-white/10" id="contact">
        <div className="max-w-max-width mx-auto">
          <div className="relative bg-black bg-diagonal-lines-light border border-white/10 rounded-2xl overflow-hidden px-6 py-16 sm:px-10 md:px-16 md:py-24">
            {/* Decorative concentric rings — banana, so visible on black. */}
            <div className="absolute -top-28 -right-28 w-96 h-96 pointer-events-none opacity-20" aria-hidden="true">
              <svg viewBox="0 0 200 200" className="w-full h-full" fill="none" stroke="var(--color-banana)" strokeWidth="1.5">
                <circle cx="100" cy="100" r="90" strokeDasharray="6 10"></circle>
                <circle cx="100" cy="100" r="60" strokeDasharray="6 10"></circle>
                <circle cx="100" cy="100" r="30"></circle>
              </svg>
            </div>
            <div className="absolute -bottom-24 -left-24 w-72 h-72 pointer-events-none opacity-10" aria-hidden="true">
              <svg viewBox="0 0 200 200" className="w-full h-full" fill="none" stroke="var(--color-banana)" strokeWidth="1.5">
                <circle cx="100" cy="100" r="80" strokeDasharray="4 12"></circle>
                <circle cx="100" cy="100" r="45"></circle>
              </svg>
            </div>
            <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center gap-8">
              <span className="inline-block bg-banana text-black rounded-md px-4 py-1 font-label-bold text-label-bold uppercase tracking-widest">
                {t.cta.badge}
              </span>
              <h2 className="font-headline-xl text-headline-lg-mobile md:text-headline-lg lg:text-5xl font-medium text-white tracking-tight leading-[1.15]">
                {t.cta.heading}
              </h2>
              <button type="button" onClick={openModal} className="group inline-flex items-center justify-center rounded-lg bg-banana text-black font-label-bold text-label-bold uppercase tracking-tighter px-10 py-4 border-2 border-banana hover:bg-white hover:text-black hover:border-white transition-all duration-200 mt-2 cursor-pointer">
                {t.cta.button}
                <span className="material-symbols-outlined ml-2 text-base transition-transform group-hover:translate-x-1">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter lang={lang} onQuoteClick={openModal} />

      <QuoteModal open={open} onClose={closeModal} lang={lang} />
    </>
  );
}
