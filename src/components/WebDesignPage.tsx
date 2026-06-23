'use client'

import SiteNav from "@/components/site/SiteNav";
import SiteFooter from "@/components/site/SiteFooter";
import QuoteModal, { useQuoteModalState } from "@/components/site/QuoteModal";
import { translations, type Lang } from "@/lib/translations";

// Dedicated website-development service landing page. Rendered by both locale
// routes: `/web-dizajn` passes lang="mk", `/en/web-design` passes lang="en".
// Section flow mirrors the reference (qwerty.mk) re-skinned in the banana theme.
// All copy comes from the dictionary. Service-overview cards and testimonials
// are intentionally omitted here — they already live on the home page.
export default function WebDesignPage({ lang }: { lang: Lang }) {
  const t = translations[lang];
  const p = t.webDesignPage;
  const { open, openModal, closeModal } = useQuoteModalState();

  return (
    <>
      <SiteNav lang={lang} onQuoteClick={openModal} />

      {/* Hero */}
      <header className="relative w-full overflow-hidden bg-black text-white px-margin-mobile md:px-margin-desktop pt-24 pb-20 md:pt-28 md:pb-24">
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

          {/* Right: yellow browser + lamp illustration */}
          <div className="relative w-full flex justify-center lg:justify-end" aria-hidden="true">
            <svg viewBox="0 0 420 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-md h-auto">
              {/* yellow blob */}
              <path d="M214 34c74-14 150 22 158 96 7 64-22 96 8 158 24 50-30 86-104 92-80 7-168 4-208-46-38-48-44-118-14-170 28-48 86-66 160-130z" fill="var(--color-banana)" />
              {/* desk lamp */}
              <g stroke="#111" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
                <ellipse cx="322" cy="338" rx="48" ry="11" fill="#111" stroke="none" />
                <path d="M322 338V302" />
                <path d="M322 302l-46-72" />
                <path d="M276 230l36-46" />
                <path d="M312 184a17 17 0 0 1 30 16l-19 31a17 17 0 0 1-30-16z" fill="#FFE99A" />
              </g>
              {/* browser window */}
              <g>
                <rect x="74" y="116" width="252" height="184" rx="16" fill="#fff" stroke="#111" strokeWidth="3" />
                <path d="M74 150h252" stroke="#111" strokeWidth="3" />
                <circle cx="98" cy="133" r="5.5" fill="var(--color-banana)" stroke="#111" strokeWidth="2" />
                <circle cx="117" cy="133" r="5.5" fill="#fff" stroke="#111" strokeWidth="2" />
                <circle cx="136" cy="133" r="5.5" fill="#fff" stroke="#111" strokeWidth="2" />
                <rect x="162" y="126" width="150" height="14" rx="7" fill="#f1efe9" />
                {/* content */}
                <rect x="94" y="172" width="96" height="64" rx="10" fill="var(--color-banana)" />
                <rect x="206" y="172" width="100" height="11" rx="5.5" fill="#e6e3db" />
                <rect x="206" y="191" width="78" height="11" rx="5.5" fill="#e6e3db" />
                <rect x="206" y="216" width="100" height="11" rx="5.5" fill="#111" />
                <rect x="94" y="252" width="120" height="11" rx="5.5" fill="#e6e3db" />
                <rect x="94" y="271" width="80" height="11" rx="5.5" fill="#e6e3db" />
                {/* Aa tile */}
                <rect x="238" y="246" width="68" height="40" rx="10" fill="#111" />
                <text x="272" y="273" textAnchor="middle" fontFamily="var(--font-montserrat)" fontSize="20" fontWeight="700" fill="var(--color-banana)">Aa</text>
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
