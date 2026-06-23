import type { Metadata } from "next";
import SeoPage from "@/components/SeoPage";
import { translations } from "@/lib/translations";

export const metadata: Metadata = {
  title: "SEO Optimization in Macedonia | Better Google rankings",
  description:
    "SEO optimization for better Google rankings. Attract more organic traffic and clients with long-term SEO results. Request a free quote.",
  alternates: {
    canonical: "/en/seo",
    languages: {
      "mk-MK": "/seo-optimizacija",
      "en-US": "/en/seo",
      "x-default": "/seo-optimizacija",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/en/seo",
    siteName: "Banana",
    title: "SEO Optimization in Macedonia | Better Google rankings",
    description:
      "SEO optimization for better Google rankings. Attract more organic traffic and clients with long-term SEO results.",
  },
};

// FAQ structured data, built from the same dictionary the page renders.
const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: translations.en.seoPage.faq.items.map((item) => ({
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
      <SeoPage lang="en" />
    </>
  );
}
