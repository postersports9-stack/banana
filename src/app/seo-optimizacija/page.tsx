import type { Metadata } from "next";
import SeoPage from "@/components/SeoPage";
import { translations } from "@/lib/translations";

export const metadata: Metadata = {
  title: "SEO оптимизација во Македонија | Подобро рангирање на Google",
  description:
    "SEO оптимизација за подобро рангирање на Google. Привлечете повеќе органска посета и клиенти со долгорочни SEO резултати. Побарајте бесплатна понуда.",
  alternates: {
    canonical: "/seo-optimizacija",
    languages: {
      "mk-MK": "/seo-optimizacija",
      "en-US": "/en/seo",
      "x-default": "/seo-optimizacija",
    },
  },
  openGraph: {
    type: "website",
    locale: "mk_MK",
    url: "/seo-optimizacija",
    siteName: "Banana",
    title: "SEO оптимизација во Македонија | Подобро рангирање на Google",
    description:
      "SEO оптимизација за подобро рангирање на Google. Привлечете повеќе органска посета и клиенти со долгорочни SEO резултати.",
  },
};

// FAQ structured data, built from the same dictionary the page renders, so the
// answers stay in sync with what users see.
const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: translations.mk.seoPage.faq.items.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <SeoPage lang="mk" />
    </>
  );
}
