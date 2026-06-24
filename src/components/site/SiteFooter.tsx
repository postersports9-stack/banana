'use client'

import { translations, type Lang } from "@/lib/translations";

// Shared site footer. Rendered by both the home page and the service pages.
// `onQuoteClick` opens the page-owned quote modal.
export default function SiteFooter({
  lang,
  onQuoteClick,
  accentBorder = true,
}: {
  lang: Lang;
  onQuoteClick: () => void;
  // Banana top border that bridges the dark CTA into the footer. Off on pages
  // whose last section is light (e.g. the portfolio), where it reads as a stray
  // connector line instead of an accent.
  accentBorder?: boolean;
}) {
  const t = translations[lang];
  return (
    <footer className={`bg-black w-full${accentBorder ? " border-t-4 border-banana" : ""}`}>
      <div className="max-w-max-width mx-auto px-margin-mobile md:px-margin-desktop py-16 md:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-gutter">
          {/* Brand + socials */}
          <div className="sm:col-span-2 lg:col-span-4 flex flex-col gap-6">
            <img src="/logo-nav.webp" alt="Banana Design Creative Studio" className="h-20 w-auto object-contain self-start" />
            <p className="font-body-md text-sm text-white/60 max-w-xs leading-relaxed">
              {t.footer.brandDesc}
            </p>
            <div className="flex items-center gap-3">
              <a aria-label="Instagram" href="#" className="w-10 h-10 flex items-center justify-center rounded-lg border border-white/15 text-white hover:bg-banana hover:text-black hover:border-banana transition-all duration-200">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path>
                </svg>
              </a>
              <a aria-label="Facebook" href="#" className="w-10 h-10 flex items-center justify-center rounded-lg border border-white/15 text-white hover:bg-banana hover:text-black hover:border-banana transition-all duration-200">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
                </svg>
              </a>
              <a aria-label="LinkedIn" href="#" className="w-10 h-10 flex items-center justify-center rounded-lg border border-white/15 text-white hover:bg-banana hover:text-black hover:border-banana transition-all duration-200">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path>
                </svg>
              </a>
            </div>
          </div>

          {/* Services */}
          <div className="lg:col-span-3">
            <h3 className="font-label-bold text-banana uppercase tracking-widest text-sm mb-6">{t.footer.servicesTitle}</h3>
            <ul className="flex flex-col gap-3 font-body-md text-sm">
              {t.footer.services.map((service) => (
                <li key={service.label}><a className="text-white/60 hover:text-banana transition-colors" href={service.href}>{service.label}</a></li>
              ))}
            </ul>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-2">
            <h3 className="font-label-bold text-banana uppercase tracking-widest text-sm mb-6">{t.footer.navTitle}</h3>
            <ul className="flex flex-col gap-3 font-body-md text-sm">
              {t.footer.nav.map((item) => (
                <li key={item.label}><a className="text-white/60 hover:text-banana transition-colors" href={item.href}>{item.label}</a></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h3 className="font-label-bold text-banana uppercase tracking-widest text-sm mb-6">{t.footer.contactTitle}</h3>
            <ul className="flex flex-col gap-4 font-body-md text-sm">
              <li>
                <a className="flex items-center gap-3 text-white/60 hover:text-banana transition-colors" href="mailto:bananaecommerce.mk@gmail.com">
                  <span className="material-symbols-outlined text-banana text-xl">mail</span>
                  bananaecommerce.mk@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3 text-white/60">
                <span className="material-symbols-outlined text-banana text-xl">location_on</span>
                {t.footer.location}
              </li>
            </ul>
            <button type="button" onClick={onQuoteClick} className="inline-flex items-center justify-center rounded-lg bg-banana text-black font-label-bold text-label-bold uppercase tracking-tighter px-6 py-3 mt-6 border-2 border-banana hover:bg-white hover:text-black hover:border-white transition-all duration-200 cursor-pointer">
              {t.footer.quote}
            </button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-body-md text-xs text-white/40 uppercase tracking-wider text-center md:text-left">
            {t.footer.copyright}
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <a className="text-white/40 hover:text-banana transition-colors uppercase font-bold tracking-wider text-xs" href="#">{t.footer.privacy}</a>
            <a className="text-white/40 hover:text-banana transition-colors uppercase font-bold tracking-wider text-xs" href="#">{t.footer.terms}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
