'use client'

import { useMemo, useState } from "react";
import SiteNav from "@/components/site/SiteNav";
import SiteFooter from "@/components/site/SiteFooter";
import QuoteModal, { useQuoteModalState } from "@/components/site/QuoteModal";
import { translations, type Lang, type PortfolioProject } from "@/lib/translations";

// Portfolio / case-study listing. Rendered by both locale routes: `/portfolio`
// passes lang="mk", `/en/portfolio` passes lang="en". All copy + project data
// comes from the dictionary (src/lib/translations.ts). The industry list and
// package checkboxes are derived from the projects array, so adding a project
// updates the filters automatically. Filtering is client-side: free-text search
// AND a single industry AND any of the checked packages.

// Card media: shows the screenshot mockup once `project.image` points at a real
// file, otherwise falls back to the client logo, and finally to a wordmark —
// same broken-image pattern as the clients marquee.
function ProjectMedia({ project }: { project: PortfolioProject }) {
  const [shotBroken, setShotBroken] = useState(false);
  const [logoBroken, setLogoBroken] = useState(false);
  const showShot = project.image !== "" && !shotBroken;

  return (
    <div className="relative shrink-0 w-full md:w-2/5 aspect-square self-start flex items-center justify-center overflow-hidden rounded-card">
      {showShot ? (
        <img
          src={project.image}
          alt={project.imageAlt}
          loading="lazy"
          decoding="async"
          onError={() => setShotBroken(true)}
          className="w-full h-full object-cover"
        />
      ) : logoBroken ? (
        <span className="px-6 text-center font-headline-lg text-xl font-bold uppercase tracking-tighter text-black/40">
          {project.name}
        </span>
      ) : (
        <img
          src={project.logo}
          alt={project.name}
          loading="lazy"
          decoding="async"
          onError={() => setLogoBroken(true)}
          className="max-h-16 w-auto object-contain opacity-70"
        />
      )}
    </div>
  );
}

export default function PortfolioPage({ lang }: { lang: Lang }) {
  const t = translations[lang];
  const p = t.portfolioPage;
  const { open, openModal, closeModal } = useQuoteModalState();

  const [query, setQuery] = useState("");
  const [activeIndustry, setActiveIndustry] = useState<string | null>(null);
  const [activePackages, setActivePackages] = useState<string[]>([]);

  // Facets derived from the data. Counts are totals over the full set (not
  // recomputed per active filter) so the numbers stay stable and predictable.
  const industries = useMemo(() => {
    const m = new Map<string, number>();
    p.projects.forEach((pr) => m.set(pr.industry, (m.get(pr.industry) ?? 0) + 1));
    return [...m.entries()]
      .map(([label, count]) => ({ label, count }))
      .sort((a, b) => a.label.localeCompare(b.label, lang));
  }, [p.projects, lang]);

  const packages = useMemo(() => {
    const m = new Map<string, number>();
    p.projects.forEach((pr) => pr.packages.forEach((pk) => m.set(pk, (m.get(pk) ?? 0) + 1)));
    return [...m.entries()]
      .map(([label, count]) => ({ label, count }))
      .sort((a, b) => a.label.localeCompare(b.label, lang));
  }, [p.projects, lang]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return p.projects.filter((pr) => {
      const matchesQuery =
        !q ||
        [pr.name, pr.industry, ...pr.bullets, ...pr.packages].some((s) =>
          s.toLowerCase().includes(q)
        );
      const matchesIndustry = !activeIndustry || pr.industry === activeIndustry;
      const matchesPackages =
        activePackages.length === 0 || pr.packages.some((pk) => activePackages.includes(pk));
      return matchesQuery && matchesIndustry && matchesPackages;
    });
  }, [p.projects, query, activeIndustry, activePackages]);

  const hasFilters = query.trim() !== "" || activeIndustry !== null || activePackages.length > 0;
  const togglePackage = (label: string) =>
    setActivePackages((prev) =>
      prev.includes(label) ? prev.filter((x) => x !== label) : [...prev, label]
    );
  const clearAll = () => {
    setQuery("");
    setActiveIndustry(null);
    setActivePackages([]);
  };

  return (
    <>
      <SiteNav lang={lang} onQuoteClick={openModal} />

      {/* Body */}
      <main className="bg-surface px-margin-mobile md:px-margin-desktop py-12 md:py-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8 lg:gap-12">
          {/* Sidebar: search + industries */}
          <aside className="lg:sticky lg:top-20 self-start flex flex-col gap-8">
            <div>
              <h2 className="mb-4 font-label-bold text-label-bold uppercase tracking-widest text-on-background">
                {p.searchLabel}
              </h2>
              <div className="relative">
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={p.searchPlaceholder}
                  aria-label={p.searchLabel}
                  className="w-full rounded-btn border border-black/15 bg-white py-3 pl-4 pr-11 font-body-md text-on-background placeholder:text-on-surface-variant/60 transition-colors focus:border-black focus:outline-none focus:ring-2 focus:ring-banana"
                />
                <span className="material-symbols-outlined pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant">
                  search
                </span>
              </div>
            </div>

            <div>
              <h2 className="mb-4 font-label-bold text-label-bold uppercase tracking-widest text-on-background">
                {p.industriesTitle}
              </h2>
              <ul className="flex flex-col">
                <li>
                  <button
                    type="button"
                    onClick={() => setActiveIndustry(null)}
                    className={`flex w-full items-center justify-between border-b border-black/10 py-2.5 text-left font-body-md transition-colors ${
                      activeIndustry === null
                        ? "font-semibold text-black"
                        : "text-on-surface-variant hover:text-black"
                    }`}
                  >
                    <span>{p.allIndustries}</span>
                    <span className="text-sm">{p.projects.length}</span>
                  </button>
                </li>
                {industries.map((ind) => (
                  <li key={ind.label}>
                    <button
                      type="button"
                      onClick={() =>
                        setActiveIndustry((prev) => (prev === ind.label ? null : ind.label))
                      }
                      className={`flex w-full items-center justify-between border-b border-black/10 py-2.5 text-left font-body-md transition-colors ${
                        activeIndustry === ind.label
                          ? "font-semibold text-black"
                          : "text-on-surface-variant hover:text-black"
                      }`}
                    >
                      <span>{ind.label}</span>
                      <span className="text-sm">{ind.count}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Results column */}
          <div className="flex flex-col gap-8">
            {/* Package checkboxes */}
            <div className="flex flex-col gap-4 border-b border-black/10 pb-6">
              <h2 className="font-label-bold text-label-bold uppercase tracking-widest text-on-background">
                {p.packagesTitle}
              </h2>
              <div className="flex flex-wrap gap-x-6 gap-y-3">
                {packages.map((pk) => {
                  const checked = activePackages.includes(pk.label);
                  return (
                    <label
                      key={pk.label}
                      className="group inline-flex cursor-pointer select-none items-center gap-2"
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => togglePackage(pk.label)}
                        className="peer sr-only"
                      />
                      <span className="flex h-5 w-5 items-center justify-center rounded border border-black/30 transition-colors peer-checked:border-black peer-checked:bg-banana peer-focus-visible:ring-2 peer-focus-visible:ring-banana">
                        {checked && (
                          <span className="material-symbols-outlined text-base text-black">check</span>
                        )}
                      </span>
                      <span className="font-body-md text-on-background group-hover:text-black">
                        {pk.label}
                      </span>
                      <span className="rounded-full border border-black/15 px-2 py-0.5 font-label-bold text-xs text-on-surface-variant">
                        {pk.count}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Result count + clear */}
            <div className="flex items-center justify-between">
              <p className="font-body-md text-on-surface-variant">
                {filtered.length} {p.resultsLabel}
              </p>
              {hasFilters && (
                <button
                  type="button"
                  onClick={clearAll}
                  className="inline-flex items-center gap-1 font-label-bold text-sm text-on-background underline-offset-4 hover:text-black hover:underline"
                >
                  <span className="material-symbols-outlined text-base">close</span>
                  {p.clearFilters}
                </button>
              )}
            </div>

            {/* Cards */}
            {filtered.length === 0 ? (
              <div className="rounded-card border border-dashed border-black/20 py-20 text-center">
                <p className="font-body-lg text-on-surface-variant">{p.noResults}</p>
              </div>
            ) : (
              <div className="flex flex-col divide-y divide-black/10 border-t border-black/10">
                {filtered.map((pr) => (
                  <article
                    key={pr.name}
                    className="group flex flex-col gap-6 py-8 md:flex-row md:gap-8 md:py-10"
                  >
                    <ProjectMedia project={pr} />
                    <div className="flex flex-1 flex-col gap-3">
                      <div className="flex flex-col gap-0.5">
                        <span className="font-label-bold text-xs uppercase tracking-wider text-on-surface-variant">
                          {pr.packages.join(", ")}
                        </span>
                        <span className="font-label-bold text-xs uppercase tracking-wider text-on-surface-variant">
                          {pr.industry}
                        </span>
                      </div>
                      <h3 className="font-headline-lg text-2xl font-semibold uppercase tracking-[-0.04em] text-on-background">
                        {pr.name}
                      </h3>
                      <a
                        href={pr.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex w-fit items-center gap-1 break-all font-body-md text-on-surface-variant hover:text-black"
                      >
                        <span className="material-symbols-outlined text-base text-banana [-webkit-text-stroke:0.4px_black]">
                          link
                        </span>
                        {pr.url.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                      </a>
                      <ol className="mt-1 flex flex-col gap-2">
                        {pr.bullets.map((b, i) => (
                          <li key={b} className="flex gap-3 font-body-md text-on-surface-variant">
                            <span className="shrink-0 font-semibold text-black">{i + 1}.</span>
                            <span>{b}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <SiteFooter lang={lang} onQuoteClick={openModal} accentBorder={false} />

      <QuoteModal open={open} onClose={closeModal} lang={lang} />
    </>
  );
}
