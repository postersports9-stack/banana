'use client'

import SiteNav from "@/components/site/SiteNav";
import SiteFooter from "@/components/site/SiteFooter";
import QuoteModal, { useQuoteModalState } from "@/components/site/QuoteModal";
import { translations, type Lang } from "@/lib/translations";

// Dedicated online-store (e-commerce) service landing page. Rendered by both
// locale routes: `/izrabotka-na-web-prodavnica` passes lang="mk",
// `/en/web-store` passes lang="en". Section flow mirrors the reference
// (qwerty.mk internet-store page) re-skinned in the banana theme and shares its
// structure with WebDesignPage / SeoPage — all copy comes from the dictionary.
// This page's process has four steps (extra "bank integration" step), so the
// step grid is 4-up instead of the 3-up used on the other service pages.
export default function WebStorePage({ lang }: { lang: Lang }) {
  const t = translations[lang];
  const p = t.webStorePage;
  const { open, openModal, closeModal } = useQuoteModalState();

  // Custom banana-theme spot illustrations — same line-art + banana fill style
  // as the hero scene. Indexed by step / card position (the dictionary order is
  // fixed), so the same art shows in both locales. Kept here, not in the
  // dictionary, because it's presentation, not copy.
  const processArt = [
    // 01 — planning & research: list + magnifier
    <g key="art" fill="none" stroke="#111" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="4" width="19" height="25" rx="3" fill="#fff" />
      <path d="M10 11h9M10 16h9M10 21h5" />
      <circle cx="24" cy="24" r="7" fill="#FFE99A" />
      <path d="M29 29l3 3" />
    </g>,
    // 02 — building the store: browser window with product tile
    <g key="art" fill="none" stroke="#111" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="6" width="28" height="23" rx="3" fill="#fff" />
      <path d="M4 13h28" />
      <circle cx="8.5" cy="9.5" r="1.2" fill="#111" stroke="none" />
      <rect x="8" y="17" width="9" height="8" rx="2" fill="var(--color-banana)" stroke="none" />
      <path d="M21 18h7M21 22.5h5" strokeWidth="2" />
    </g>,
    // 03 — bank integration: credit card
    <g key="art" fill="none" stroke="#111" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="8" width="30" height="20" rx="3" fill="#fff" />
      <path d="M3 14h30" />
      <rect x="8" y="20" width="8" height="4" rx="1" fill="var(--color-banana)" strokeWidth="1.5" />
      <path d="M22 22h6" />
    </g>,
    // 04 — launch & sell: rocket
    <g key="art" fill="none" stroke="#111" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 3c5 3 7 8 7 14l-3 4h-8l-3-4c0-6 2-11 7-14z" fill="#FFE99A" />
      <circle cx="18" cy="13" r="2.6" fill="#fff" />
      <path d="M13 25l-2 6M23 25l2 6M18 25v6" />
    </g>,
  ];
  const benefitArt = [
    // increased profit: upward trend arrow
    <g key="art" fill="none" stroke="#111" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 25l8-8 5 5 10-11" />
      <path d="M22 11h7v7" />
    </g>,
    // low costs: stacked coins
    <g key="art" fill="none" stroke="#111" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="18" cy="11" rx="11" ry="5" fill="#FFE99A" />
      <path d="M7 11v8c0 2.8 4.9 5 11 5s11-2.2 11-5v-8" />
      <path d="M7 19c0 2.8 4.9 5 11 5s11-2.2 11-5" />
    </g>,
    // selling 24/7: clock
    <g key="art" fill="none" stroke="#111" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="18" r="13" fill="#FFE99A" />
      <path d="M18 10v8l5 3" />
    </g>,
    // secure payments: card with check badge
    <g key="art" fill="none" stroke="#111" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="9" width="29" height="19" rx="3" fill="#fff" />
      <path d="M3 15h29" />
      <path d="M8 22h6" />
      <circle cx="25" cy="23" r="5.5" fill="#FFE99A" strokeWidth="2" />
      <path d="M22.6 23l1.7 1.7 2.9-3.2" strokeWidth="2" />
    </g>,
  ];

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

          {/* Right: yellow blob + storefront with product grid + cart illustration */}
          <div className="relative w-full flex justify-center lg:justify-end" aria-hidden="true">
            <svg viewBox="0 0 420 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-md h-auto">
              {/* yellow blob */}
              <path d="M214 34c74-14 150 22 158 96 7 64-22 96 8 158 24 50-30 86-104 92-80 7-168 4-208-46-38-48-44-118-14-170 28-48 86-66 160-130z" fill="var(--color-banana)" />
              {/* storefront window */}
              <g>
                <rect x="60" y="104" width="256" height="190" rx="16" fill="#fff" stroke="#111" strokeWidth="3" />
                <path d="M60 138h256" stroke="#111" strokeWidth="3" />
                <circle cx="84" cy="121" r="5.5" fill="var(--color-banana)" stroke="#111" strokeWidth="2" />
                <circle cx="103" cy="121" r="5.5" fill="#fff" stroke="#111" strokeWidth="2" />
                <circle cx="122" cy="121" r="5.5" fill="#fff" stroke="#111" strokeWidth="2" />
                {/* search bar */}
                <rect x="150" y="114" width="150" height="14" rx="7" fill="#f1efe9" />
                {/* product card 1 */}
                <g>
                  <rect x="78" y="156" width="68" height="116" rx="10" fill="#f7f5ef" stroke="#111" strokeWidth="2" />
                  <rect x="86" y="164" width="52" height="46" rx="6" fill="var(--color-banana)" />
                  <rect x="86" y="220" width="40" height="8" rx="4" fill="#e6e3db" />
                  <rect x="86" y="234" width="52" height="14" rx="7" fill="#111" />
                </g>
                {/* product card 2 — highlighted */}
                <g>
                  <rect x="156" y="156" width="68" height="116" rx="10" fill="#fff" stroke="#111" strokeWidth="2" />
                  <rect x="164" y="164" width="52" height="46" rx="6" fill="#FFE99A" />
                  <rect x="164" y="220" width="40" height="8" rx="4" fill="#e6e3db" />
                  <rect x="164" y="234" width="52" height="14" rx="7" fill="var(--color-banana)" stroke="#111" strokeWidth="2" />
                </g>
                {/* product card 3 */}
                <g>
                  <rect x="234" y="156" width="68" height="116" rx="10" fill="#f7f5ef" stroke="#111" strokeWidth="2" />
                  <rect x="242" y="164" width="52" height="46" rx="6" fill="var(--color-banana)" />
                  <rect x="242" y="220" width="40" height="8" rx="4" fill="#e6e3db" />
                  <rect x="242" y="234" width="52" height="14" rx="7" fill="#111" />
                </g>
              </g>
              {/* shopping cart badge — overlaps bottom-right corner */}
              <g>
                <circle cx="300" cy="288" r="44" fill="#FFE99A" stroke="#111" strokeWidth="6" />
                <g stroke="#111" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M278 270h8l4 6" />
                  <path d="M286 276l6 24h26l6-19h-34" />
                </g>
                <circle cx="296" cy="312" r="4" fill="#111" />
                <circle cx="314" cy="312" r="4" fill="#111" />
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

      {/* 4-step process */}
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter max-w-6xl mx-auto">
            {p.process.steps.map((step, i) => (
              <div key={step.num} className="relative bg-white bg-diagonal-lines border border-black rounded-xl p-8 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="w-16 h-16 rounded-xl bg-banana border border-black flex items-center justify-center">
                    <svg viewBox="0 0 36 36" className="w-9 h-9" aria-hidden="true">{processArt[i]}</svg>
                  </div>
                  <span className="font-headline-xl text-5xl font-bold text-banana [-webkit-text-stroke:1px_black] leading-none">{step.num}</span>
                </div>
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
            {p.benefits.cards.map((card, i) => (
              <div key={card.title} className="bg-[#242625] bg-diagonal-lines-light rounded-2xl p-8 flex flex-col items-center text-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-banana border border-black flex items-center justify-center">
                  <svg viewBox="0 0 36 36" className="w-9 h-9" aria-hidden="true">{benefitArt[i]}</svg>
                </div>
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
