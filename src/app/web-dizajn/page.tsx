import type { Metadata } from "next";
import WebDesignPage from "@/components/WebDesignPage";
import { translations } from "@/lib/translations";

export const metadata: Metadata = {
  title: "Изработка на веб страна | Веб дизајн по ваша мерка",
  description:
    "Изработка на веб страна по ваша мерка — без готови темплејти. Модерни, брзи и респонзивни веб страни што носат успех. Побарајте бесплатна понуда.",
  alternates: {
    canonical: "/web-dizajn",
    languages: {
      "mk-MK": "/web-dizajn",
      "en-US": "/en/web-design",
      "x-default": "/web-dizajn",
    },
  },
  openGraph: {
    type: "website",
    locale: "mk_MK",
    url: "/web-dizajn",
    siteName: "Banana",
    title: "Изработка на веб страна | Веб дизајн по ваша мерка",
    description:
      "Изработка на веб страна по ваша мерка — без готови темплејти. Модерни, брзи и респонзивни веб страни што носат успех.",
  },
};

// FAQ structured data, built from the same dictionary the page renders, so the
// answers stay in sync with what users see.
const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: translations.mk.webDesignPage.faq.items.map((item) => ({
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
      <WebDesignPage lang="mk" />
    </>
  );
}
