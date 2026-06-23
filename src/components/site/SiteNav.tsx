'use client'

import Link from "next/link";
import { translations, languages, type Lang } from "@/lib/translations";

// Shared sticky site navigation. Rendered by both the home page and the
// service pages. `onQuoteClick` opens the page-owned quote modal; the "Веб
// дизајн" item and its first dropdown card link to the website-development
// service page for the current locale.
export default function SiteNav({
  lang,
  onQuoteClick,
}: {
  lang: Lang;
  onQuoteClick: () => void;
}) {
  const t = translations[lang];
  const currentLang = languages.find((l) => l.code === lang)!;
  const webDesignPath = lang === "mk" ? "/web-dizajn" : "/en/web-design";
  const webStorePath = lang === "mk" ? "/izrabotka-na-web-prodavnica" : "/en/web-store";
  const seoPath = lang === "mk" ? "/seo-optimizacija" : "/en/seo";
  const portfolioPath = lang === "mk" ? "/portfolio" : "/en/portfolio";
  return (
    <nav className="bg-black/70 backdrop-blur-xl backdrop-saturate-150 w-full top-0 sticky z-50 transition-all duration-300 border-b border-white/10">
      <div className="flex justify-between items-center h-16 w-full max-w-max-width mx-auto">
        <Link className="flex items-center h-full pl-2 pr-4 md:pl-4 md:pr-6 border-r border-white/10" href={currentLang.path}>
          <img alt="Banana Studio Logo" className="h-14 w-auto object-contain" src="/logo-nav.webp" />
        </Link>

        <div className="hidden md:flex flex-1 justify-center h-full">
          <div className="flex items-center gap-8 font-label-bold text-sm font-medium tracking-tighter px-4 md:px-8 h-full">
            {/* Web design — dropdown with two service sections */}
            <div className="relative h-full flex items-center group">
              <Link className="text-white hover:text-banana transition-colors flex items-center gap-1 cursor-pointer" href={webDesignPath}>
                {t.nav.webDesign}
                <svg className="w-3 h-3 mt-px transition-transform duration-200 group-hover:rotate-180" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="M2.5 4.5 6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <div className="absolute top-full left-0 pt-4 opacity-0 invisible translate-y-1 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-200 z-50">
                <div className="w-[640px] grid grid-cols-2 gap-3 bg-white rounded-2xl shadow-2xl ring-1 ring-black/5 p-3">
                  <Link href={webDesignPath} className="rounded-xl p-3 hover:bg-black/[0.03] transition-colors">
                    <div className="aspect-[3/2] mb-3 rounded-lg overflow-hidden bg-gradient-to-br from-banana/30 to-banana">
                      <img src="/web-design-card.webp" alt="" className="w-full h-full object-cover" />
                    </div>
                    <h4 className="text-black font-semibold text-sm tracking-tight">{t.nav.webDesignCard1Title}</h4>
                    <p className="mt-1 text-black/55 text-xs font-normal leading-relaxed">{t.nav.webDesignCard1Desc}</p>
                  </Link>
                  <Link href={webStorePath} className="rounded-xl p-3 hover:bg-black/[0.03] transition-colors">
                    <div className="aspect-[3/2] mb-3 rounded-lg overflow-hidden bg-gradient-to-br from-zinc-200 to-zinc-300">
                      <img src="/web-store-card.webp" alt="" className="w-full h-full object-cover" />
                    </div>
                    <h4 className="text-black font-semibold text-sm tracking-tight">{t.nav.webDesignCard2Title}</h4>
                    <p className="mt-1 text-black/55 text-xs font-normal leading-relaxed">{t.nav.webDesignCard2Desc}</p>
                  </Link>
                </div>
              </div>
            </div>

            {/* Resources — blog preview dropdown */}
            <div className="relative h-full flex items-center group">
              <a className="text-white hover:text-banana transition-colors flex items-center gap-1 cursor-pointer" href="#services">
                {t.nav.info}
                <svg className="w-3 h-3 mt-px transition-transform duration-200 group-hover:rotate-180" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="M2.5 4.5 6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <div className="absolute top-full left-0 pt-4 opacity-0 invisible translate-y-1 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-200 z-50">
                <div className="w-[680px] bg-white rounded-2xl shadow-2xl ring-1 ring-black/5 p-3">
                  <div className="flex items-center justify-between px-2 pb-2 mb-1">
                    <span className="text-black/40 text-[11px] uppercase tracking-wider font-semibold">{t.nav.blog}</span>
                    <a href="#services" className="flex items-center gap-1 text-black/60 hover:text-black text-xs font-medium transition-colors">
                      {t.nav.allPosts}
                      <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                        <path d="M4.5 2.5 8 6l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </a>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {t.nav.posts.map((post) => (
                      <a key={post.title} href="#services" className="rounded-xl p-2 hover:bg-black/[0.03] transition-colors">
                        <div className="h-24 mb-2 rounded-lg overflow-hidden bg-gradient-to-br from-zinc-100 to-zinc-200 flex items-center justify-center">
                          <span className="material-symbols-outlined text-3xl text-black/30">image</span>
                        </div>
                        <h4 className="text-black font-semibold text-[13px] leading-snug tracking-tight line-clamp-2">{post.title}</h4>
                        <p className="mt-1 text-black/45 text-[11px] font-normal">{post.meta}</p>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <Link className="text-white hover:text-banana transition-colors" href={seoPath}>{t.nav.seo}</Link>
            <Link className="text-white hover:text-banana transition-colors" href={portfolioPath}>{t.nav.portfolio}</Link>
            <a className="text-white hover:text-banana transition-colors" href="#contact">{t.nav.contact}</a>

            {/* Language switcher — opens on hover, each option links to its locale route */}
            <div className="relative h-full flex items-center group ml-4">
              <button
                type="button"
                aria-haspopup="listbox"
                className="flex items-center gap-2 border border-white/10 rounded-md px-2 py-1 cursor-pointer hover:border-white/30 group-hover:border-white/30 transition-colors"
              >
                <img src={currentLang.flag} alt="" className="w-5 h-5 rounded-full object-cover" />
                <span className="text-white lowercase text-xs">{currentLang.label}</span>
                <svg className="w-3 h-3 text-white/60 transition-transform duration-200 group-hover:rotate-180" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="M2.5 4.5 6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <div className="absolute top-full right-0 pt-3 opacity-0 invisible translate-y-1 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-200 z-50">
                <div role="listbox" className="w-32 bg-black/90 backdrop-blur-xl border border-white/10 rounded-md p-1">
                  {languages.map((l) => (
                    <Link
                      key={l.code}
                      href={l.path}
                      role="option"
                      aria-selected={l.code === lang}
                      className="w-full flex items-center gap-2 px-2 py-1.5 rounded hover:bg-white/10 transition-colors"
                    >
                      <img src={l.flag} alt="" className="w-5 h-5 rounded-full object-cover" />
                      <span className="text-white lowercase text-xs">{l.label}</span>
                      {l.code === lang && (
                        <span className="material-symbols-outlined text-banana text-base ml-auto">check</span>
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden sm:flex items-center h-full px-4 md:px-8 border-l border-white/10">
          <button type="button" onClick={onQuoteClick} className="inline-flex items-center justify-center rounded-lg bg-banana text-black font-label-bold text-label-bold uppercase tracking-tighter px-8 py-3 border-2 border-transparent hover:bg-white hover:text-black transition-all duration-200 cursor-pointer">{t.nav.quote}</button>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden flex items-center justify-center p-4 text-banana border-l border-white/10 h-full">
          <span className="material-symbols-outlined text-3xl">menu</span>
        </button>
      </div>
    </nav>
  );
}
