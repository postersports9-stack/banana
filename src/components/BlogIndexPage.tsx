'use client'

import Link from "next/link";
import SiteNav from "@/components/site/SiteNav";
import SiteFooter from "@/components/site/SiteFooter";
import QuoteModal, { useQuoteModalState } from "@/components/site/QuoteModal";
import { translations, type Lang } from "@/lib/translations";
import { getPosts, postPath, coverImage, blogUI } from "@/lib/blog";

// Blog index — the "Информации" / "Blog" landing page. Rendered by both locale
// routes (`/informacii` -> mk, `/en/blog` -> en). Shares the section flow and
// banana theme with the service pages; the post list comes from the blog data
// module so the nav dropdown, sitemap and these cards stay in sync.
export default function BlogIndexPage({ lang }: { lang: Lang }) {
  const t = translations[lang];
  const ui = blogUI[lang];
  const posts = getPosts(lang);
  const { open, openModal, closeModal } = useQuoteModalState();

  return (
    <>
      <SiteNav lang={lang} onQuoteClick={openModal} />

      {/* Hero */}
      <header className="relative w-full overflow-hidden bg-black text-white px-margin-mobile md:px-margin-desktop pt-32 pb-20 md:pt-40 md:pb-24">
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center gap-6">
          <span className="inline-block text-banana font-label-bold text-sm uppercase tracking-[0.1em]">
            {ui.indexEyebrow}
          </span>
          <h1 className="text-4xl md:text-6xl font-semibold tracking-[-0.04em] leading-[1.05]">
            <span className="text-white">{ui.indexTitle}</span>{" "}
            <span className="text-banana">{ui.indexTitleHighlight}</span>
          </h1>
          <p className="font-body-lg text-white/60 max-w-2xl">{ui.indexSubtitle}</p>
        </div>
      </header>

      {/* Post list — single column, horizontal cards on larger screens */}
      <section className="w-full py-20 md:py-24 px-margin-mobile md:px-margin-desktop bg-surface">
        <div className="max-w-4xl mx-auto flex flex-col gap-gutter">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={postPath(lang, post.slug)}
              className="group grid grid-cols-1 sm:grid-cols-[260px_1fr] md:grid-cols-[320px_1fr] bg-white border border-black/10 rounded-2xl overflow-hidden hover:border-black/30 hover:shadow-xl transition-all duration-200"
            >
              <div className="aspect-[3/2] sm:aspect-auto sm:h-full overflow-hidden bg-zinc-100">
                <img
                  src={coverImage(post.cover)}
                  alt={post.imageAlt}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                />
              </div>
              <div className="flex flex-col gap-3 p-6 md:p-8">
                <div className="flex items-center gap-3 text-[11px] uppercase tracking-wider font-semibold">
                  <span className="bg-black text-banana rounded px-2 py-0.5">{post.category}</span>
                  <span className="text-black/40">{post.readingTime}</span>
                </div>
                <h2 className="font-headline-lg text-xl md:text-2xl font-bold text-on-background tracking-tight leading-snug group-hover:text-black/70 transition-colors">
                  {post.title}
                </h2>
                <p className="font-body-md text-on-surface-variant leading-relaxed">{post.excerpt}</p>
                <span className="mt-auto inline-flex items-center gap-1 pt-2 font-label-bold text-sm font-semibold text-black">
                  {ui.readMore}
                  <span className="material-symbols-outlined text-base transition-transform group-hover:translate-x-1">arrow_forward</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Final CTA — reuses the shared home CTA copy */}
      <section className="w-full py-24 md:py-32 px-margin-mobile md:px-margin-desktop bg-black border-t border-white/10" id="contact">
        <div className="max-w-6xl mx-auto">
          <div className="relative bg-black bg-diagonal-lines-light border border-white/10 rounded-2xl overflow-hidden px-6 py-16 sm:px-10 md:px-16 md:py-24">
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

      <SiteFooter lang={lang} onQuoteClick={openModal} accentBorder={false} />

      <QuoteModal open={open} onClose={closeModal} lang={lang} />
    </>
  );
}
