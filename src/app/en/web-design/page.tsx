import type { Metadata } from "next";
import WebDesignPage from "@/components/WebDesignPage";
import { translations } from "@/lib/translations";

export const metadata: Metadata = {
  title: "Website Development | Custom web design",
  description:
    "Custom website development — no ready-made templates. Modern, fast and responsive websites that drive success. Request a free quote.",
  alternates: {
    canonical: "/en/web-design",
    languages: {
      "mk-MK": "/web-dizajn",
      "en-US": "/en/web-design",
      "x-default": "/web-dizajn",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/en/web-design",
    siteName: "Banana",
    title: "Website Development | Custom web design",
    description:
      "Custom website development — no ready-made templates. Modern, fast and responsive websites that drive success.",
  },
};

// FAQ structured data, built from the same dictionary the page renders.
const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: translations.en.webDesignPage.faq.items.map((item) => ({
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
      <WebDesignPage lang="en" />
    </>
  );
}
