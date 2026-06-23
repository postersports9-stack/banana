'use client'

import SiteNav from "@/components/site/SiteNav";
import SiteFooter from "@/components/site/SiteFooter";
import QuoteModal, { useQuoteModalState } from "@/components/site/QuoteModal";
import { translations, type Lang } from "@/lib/translations";

// Dedicated SEO service landing page. Rendered by both locale routes:
// `/seo-optimizacija` passes lang="mk", `/en/seo` passes lang="en". Section flow
// mirrors the reference (qwerty.mk SEO page) re-skinned in the banana theme and
// shares its structure with WebDesignPage — all copy comes from the dictionary.
export default function SeoPage({ lang }: { lang: Lang }) {
  const t = translations[lang];
  const p = t.seoPage;
  const { open, openModal, closeModal } = useQuoteModalState();

  return (
    <>
      <SiteNav lang={lang} onQuoteClick={openModal} />

      {/* Hero */}
      <header className="relative w-full overflow-hidden bg-black text-white px-margin-mobile md:px-margin-desktop pt-32 pb-28 md:pt-40 md:pb-36">
        <div className="relative z-10 max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 lg:gap-gutter items-center">
          {/* Left: copy */}
          <div className="flex flex-col items-start gap-6 max-w-xl">
            <span className="inline-block text-banana font-label-bold text-sm uppercase tracking-[0.1em]">
              {p.hero.eyebrow}
            </span>
            <h1 className="text-4xl md:text-6xl font-semibold tracking-[-0.04em] leading-[1.05]">
              <span className="text-white">{p.hero.titleLine1}</span>{" "}
              <span className="text-banana">{p.hero.titleHighlight}</span>
            </h1>
            <p className="font-headline-lg text-xl md:text-2xl text-white/90 font-medium tracking-tight">
              {p.hero.subtitle}
            </p>
            <p className="font-body-lg text-white/60">
              {p.hero.body}
            </p>
            <button type="button" onClick={openModal} className="inline-flex items-center justify-center rounded-md bg-banana text-black font-bold text-sm uppercase tracking-tighter px-8 py-3 border-2 border-transparent hover:bg-white hover:text-black hover:border-white transition-all duration-300 cursor-pointer">
              {p.hero.cta}
            </button>
          </div>

          {/* Right: yellow blob + search/ranking dashboard illustration */}
          <div className="relative w-full flex justify-center lg:justify-end" aria-hidden="true">
            <svg viewBox="0 0 420 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-md h-auto">
              {/* yellow blob */}
              <path d="M214 34c74-14 150 22 158 96 7 64-22 96 8 158 24 50-30 86-104 92-80 7-168 4-208-46-38-48-44-118-14-170 28-48 86-66 160-130z" fill="var(--color-banana)" />
              {/* dashboard card */}
              <g>
                <rect x="64" y="118" width="248" height="176" rx="16" fill="#fff" stroke="#111" strokeWidth="3" />
                <path d="M64 152h248" stroke="#111" strokeWidth="3" />
                <circle cx="88" cy="135" r="5.5" fill="var(--color-banana)" stroke="#111" strokeWidth="2" />
                <circle cx="107" cy="135" r="5.5" fill="#fff" stroke="#111" strokeWidth="2" />
                <circle cx="126" cy="135" r="5.5" fill="#fff" stroke="#111" strokeWidth="2" />
                {/* search bar */}
                <rect x="150" y="128" width="150" height="14" rx="7" fill="#f1efe9" />
                {/* ascending ranking bars */}
                <rect x="94" y="244" width="28" height="30" rx="4" fill="#e6e3db" />
                <rect x="134" y="226" width="28" height="48" rx="4" fill="#e6e3db" />
                <rect x="174" y="204" width="28" height="70" rx="4" fill="var(--color-banana)" stroke="#111" strokeWidth="2" />
                <rect x="214" y="182" width="28" height="92" rx="4" fill="#111" />
                {/* trend line + arrow tip */}
                <path d="M100 236l40-18 40-22 46-26" stroke="#111" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M214 170h12v12" stroke="#111" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </g>
              {/* magnifying glass — overlaps bottom-right corner */}
              <g>
                <circle cx="296" cy="284" r="42" fill="#FFE99A" stroke="#111" strokeWidth="6" />
                <path d="M280 284l11 11 21-23" stroke="#111" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
                <line x1="327" y1="315" x2="360" y2="348" stroke="#111" strokeWidth="8" strokeLinecap="round" />
              </g>
            </svg>
          </div>
        </div>
      </header>

      {/* Value block */}
      <section className="w-full py-24 md:py-28 px-margin-mobile md:px-margin-desktop bg-white overflow-hidden">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-gutter items-center">
          <div className="flex flex-col gap-6">
            <h2 className="font-headline-xl text-headline-lg-mobile md:text-headline-lg font-bold text-on-background tracking-tighter">
              {p.value.heading}
            </h2>
            {p.value.paragraphs.map((para) => (
              <p key={para} className="font-body-lg text-black/70 leading-relaxed">
                {para}
              </p>
            ))}
          </div>
          <div className="bg-[#242625] rounded-2xl p-8 md:p-10">
            <ul className="flex flex-col gap-5">
              {p.value.bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-banana text-3xl shrink-0">check_circle</span>
                  <span className="font-headline-lg text-lg font-semibold text-white tracking-tight">{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 3-step process */}
      <section className="w-full py-24 md:py-28 px-margin-mobile md:px-margin-desktop bg-white" id="process">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <span className="inline-block bg-black text-banana rounded-md px-4 py-1 font-label-bold text-label-bold uppercase tracking-widest mb-4">
              {p.process.badge}
            </span>
            <h2 className="font-headline-xl text-headline-lg-mobile md:text-headline-lg font-bold text-on-background uppercase tracking-tighter mb-4">
              {p.process.heading}
            </h2>
            <p className="font-body-md text-on-surface-variant">{p.process.intro}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter max-w-5xl mx-auto">
            {p.process.steps.map((step) => (
              <div key={step.num} className="relative bg-white bg-diagonal-lines border border-black rounded-xl p-8 flex flex-col gap-4">
                <span className="font-headline-xl text-5xl font-bold text-banana [-webkit-text-stroke:1px_black] leading-none">{step.num}</span>
                <h3 className="font-headline-lg text-xl font-semibold uppercase tracking-[-0.04em] text-on-background">{step.title}</h3>
                <p className="font-body-md text-on-surface-variant">{step.desc}</p>
              </div>
            ))}
          </div>
          <p className="mt-10 text-center font-label-bold text-sm text-on-surface-variant uppercase tracking-wider">
            {p.process.timelineNote}
          </p>
        </div>
      </section>

      {/* Benefits grid */}
      <section className="w-full py-24 md:py-28 px-margin-mobile md:px-margin-desktop bg-black text-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="font-headline-xl text-headline-lg-mobile md:text-headline-lg font-bold text-white uppercase tracking-tighter mb-4">
              {p.benefits.heading}
            </h2>
            <p className="font-body-md text-white/60">{p.benefits.intro}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
            {p.benefits.cards.map((card) => (
              <div key={card.title} className="bg-[#242625] bg-diagonal-lines-light rounded-2xl p-8 flex flex-col items-center text-center gap-4">
                <span className="material-symbols-outlined text-banana text-5xl">{card.icon}</span>
                <h3 className="font-headline-lg text-lg font-bold tracking-[-0.04em] text-white">{card.title}</h3>
                <p className="font-body-md text-sm text-white/70">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ accordion — native details/summary */}
      <section className="w-full py-24 md:py-28 px-margin-mobile md:px-margin-desktop bg-surface" id="faq">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="font-label-bold text-label-bold text-banana uppercase tracking-widest mb-4">{p.faq.eyebrow}</p>
            <h2 className="font-headline-xl text-headline-lg-mobile md:text-headline-lg font-bold text-on-background uppercase tracking-tighter">
              {p.faq.heading}
            </h2>
          </div>
          <div className="flex flex-col gap-4">
            {p.faq.items.map((item) => (
              <details key={item.q} className="group bg-white border border-black rounded-xl px-6 py-5 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex items-center justify-between gap-4 cursor-pointer list-none">
                  <span className="font-headline-lg text-lg font-semibold tracking-tight text-on-background">{item.q}</span>
                  <span className="material-symbols-outlined text-banana text-2xl shrink-0 transition-transform duration-200 group-open:rotate-180 [-webkit-text-stroke:0.5px_black]">expand_more</span>
                </summary>
                <p className="mt-4 font-body-md text-on-surface-variant leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="w-full py-24 md:py-32 px-margin-mobile md:px-margin-desktop bg-black border-t border-white/10" id="contact">
        <div className="max-w-6xl mx-auto">
          <div className="relative bg-black bg-diagonal-lines-light border border-white/10 rounded-2xl overflow-hidden px-6 py-16 sm:px-10 md:px-16 md:py-24">
            <div className="absolute -top-28 -right-28 w-96 h-96 pointer-events-none opacity-20" aria-hidden="true">
              <svg viewBox="0 0 200 200" className="w-full h-full" fill="none" stroke="var(--color-banana)" strokeWidth="1.5">
                <circle cx="100" cy="100" r="90" strokeDasharray="6 10"></circle>
                <circle cx="100" cy="100" r="60" strokeDasharray="6 10"></circle>
                <circle cx="100" cy="100" r="30"></circle>
              </svg>
            </div>
            <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center gap-8">
              <span className="inline-block bg-banana text-black rounded-md px-4 py-1 font-label-bold text-label-bold uppercase tracking-widest">
                {p.finalCta.badge}
              </span>
              <h2 className="font-headline-xl text-headline-lg-mobile md:text-headline-lg lg:text-5xl font-medium text-white tracking-tight leading-[1.15]">
                {p.finalCta.heading}
              </h2>
              <button type="button" onClick={openModal} className="group inline-flex items-center justify-center rounded-lg bg-banana text-black font-label-bold text-label-bold uppercase tracking-tighter px-10 py-4 border-2 border-banana hover:bg-white hover:text-black hover:border-white transition-all duration-200 mt-2 cursor-pointer">
                {p.finalCta.button}
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
