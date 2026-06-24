'use client'

import Link from "next/link";
import { notFound } from "next/navigation";
import SiteNav from "@/components/site/SiteNav";
import SiteFooter from "@/components/site/SiteFooter";
import QuoteModal, { useQuoteModalState } from "@/components/site/QuoteModal";
import BlogCover from "@/components/BlogCover";
import { translations, languages, type Lang } from "@/lib/translations";
import { getPost, blogBasePath, blogUI } from "@/lib/blog";

// Deterministic date formatter — avoids Intl so server and client render the
// same string (no hydration mismatch). mk: "24.06.2026", en: "24 Jun 2026".
const EN_MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
function formatDate(iso: string, lang: Lang): string {
  const [y, m, d] = iso.split("-");
  if (lang === "mk") return `${d}.${m}.${y}`;
  return `${Number(d)} ${EN_MONTHS[Number(m) - 1]} ${y}`;
}

// A single blog article. Rendered by both locale routes
// (`/informacii/[slug]` -> mk, `/en/blog/[slug]` -> en). Looks up its content
// from the blog data module by slug, mirroring how the service pages look up
// translations by lang. Article/FAQ JSON-LD is emitted by the route file.
export default function BlogPostPage({ lang, slug }: { lang: Lang; slug: string }) {
  const t = translations[lang];
  const ui = blogUI[lang];
  const post = getPost(lang, slug);
  const { open, openModal, closeModal } = useQuoteModalState();

  // Guard for direct imports; the route also guards via notFound() + dynamicParams.
  if (!post) notFound();

  const homePath = languages.find((l) => l.code === lang)!.path;

  return (
    <>
      <SiteNav lang={lang} onQuoteClick={openModal} />

      {/* Hero */}
      <header className="relative w-full overflow-hidden bg-black text-white px-margin-mobile md:px-margin-desktop pt-28 pb-16 md:pt-36 md:pb-20">
        <div className="relative z-10 max-w-3xl mx-auto flex flex-col gap-6">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-xs text-white/50 uppercase tracking-wider font-semibold">
            <Link href={homePath} className="hover:text-banana transition-colors">{ui.home}</Link>
            <span aria-hidden="true">/</span>
            <Link href={blogBasePath(lang)} className="hover:text-banana transition-colors">{ui.blog}</Link>
            <span aria-hidden="true">/</span>
            <span className="text-white/70 normal-case tracking-normal line-clamp-1">{post.category}</span>
          </nav>

          <div className="flex items-center gap-3 text-[11px] uppercase tracking-wider font-semibold">
            <span className="bg-banana text-black rounded px-2 py-0.5">{post.category}</span>
            <span className="text-white/50">{post.readingTime}</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-semibold tracking-[-0.03em] leading-[1.1]">{post.title}</h1>
          <p className="font-body-lg text-white/70 leading-relaxed">{post.intro}</p>

          <p className="text-xs text-white/40 uppercase tracking-wider font-semibold">
            {ui.published} {formatDate(post.datePublished, lang)} · {ui.updated} {formatDate(post.dateModified, lang)}
          </p>
        </div>
      </header>

      {/* Cover */}
      <div className="w-full bg-black px-margin-mobile md:px-margin-desktop pb-2">
        <div className="max-w-4xl mx-auto -mb-16 md:-mb-20 rounded-2xl overflow-hidden ring-1 ring-black/5 shadow-2xl aspect-[3/2] sm:aspect-[2/1]">
          <BlogCover cover={post.cover} />
        </div>
      </div>

      {/* Article body */}
      <section className="w-full bg-surface px-margin-mobile md:px-margin-desktop pt-28 md:pt-32 pb-20 md:pb-24">
        <div className="max-w-3xl mx-auto">
          {/* Key takeaways */}
          <div className="bg-[#242625] rounded-2xl p-7 md:p-8 mb-12">
            <h2 className="font-label-bold text-banana uppercase tracking-widest text-sm mb-5">{ui.takeawaysTitle}</h2>
            <ul className="flex flex-col gap-3">
              {post.keyTakeaways.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-banana text-xl shrink-0">check_circle</span>
                  <span className="font-body-md text-white/90 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Table of contents */}
          <nav aria-label={ui.inThisArticle} className="mb-12 border-l-2 border-banana pl-5">
            <p className="font-label-bold text-on-surface-variant uppercase tracking-widest text-xs mb-3">{ui.inThisArticle}</p>
            <ul className="flex flex-col gap-2">
              {post.sections.map((s, i) => (
                <li key={s.heading}>
                  <a href={`#s-${i}`} className="font-body-md text-sm text-on-background hover:text-black/60 transition-colors">
                    {s.heading}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Sections */}
          <div className="flex flex-col gap-12">
            {post.sections.map((s, i) => (
              <article key={s.heading} id={`s-${i}`} className="scroll-mt-24 flex flex-col gap-4">
                <h2 className="font-headline-lg text-2xl md:text-3xl font-bold text-on-background tracking-tight">{s.heading}</h2>
                {s.paragraphs.map((p) => (
                  <p key={p} className="font-body-lg text-black/70 leading-relaxed">{p}</p>
                ))}
                {s.bullets && (
                  <ul className="flex flex-col gap-3 mt-1">
                    {s.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-3">
                        <span className="material-symbols-outlined text-banana text-xl shrink-0 [-webkit-text-stroke:0.4px_black]">check</span>
                        <span className="font-body-md text-black/70 leading-relaxed">{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            ))}
          </div>

          {/* FAQ */}
          <div className="mt-16">
            <h2 className="font-headline-lg text-2xl md:text-3xl font-bold text-on-background tracking-tight mb-6">{ui.faqTitle}</h2>
            <div className="flex flex-col gap-4">
              {post.faq.map((item) => (
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

          {/* Back link */}
          <div className="mt-14">
            <Link href={blogBasePath(lang)} className="inline-flex items-center gap-2 font-label-bold text-sm font-semibold text-black hover:text-black/60 transition-colors">
              <span className="material-symbols-outlined text-base">arrow_back</span>
              {ui.backToBlog}
            </Link>
          </div>
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
