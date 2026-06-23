import type { Metadata } from "next";
import WebStorePage from "@/components/WebStorePage";
import { translations } from "@/lib/translations";

export const metadata: Metadata = {
  title: "Online Store Development | Sell online",
  description:
    "Online store development with integrated payments and product management. Sell online 24/7 at lower cost. Request a free quote.",
  alternates: {
    canonical: "/en/web-store",
    languages: {
      "mk-MK": "/izrabotka-na-web-prodavnica",
      "en-US": "/en/web-store",
      "x-default": "/izrabotka-na-web-prodavnica",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/en/web-store",
    siteName: "Banana",
    title: "Online Store Development | Sell online",
    description:
      "Online store development with integrated payments and product management. Sell online 24/7 at lower cost.",
  },
};

// FAQ structured data, built from the same dictionary the page renders.
const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: translations.en.webStorePage.faq.items.map((item) => ({
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
      <WebStorePage lang="en" />
    </>
  );
}
