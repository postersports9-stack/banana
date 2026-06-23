import type { Metadata } from "next";
import WebStorePage from "@/components/WebStorePage";
import { translations } from "@/lib/translations";

export const metadata: Metadata = {
  title: "Изработка на интернет продавница | Онлајн продажба",
  description:
    "Изработка на интернет продавница со интегрирано плаќање и управување со производи. Продавајте онлајн 24/7 со пониски трошоци. Побарајте бесплатна понуда.",
  alternates: {
    canonical: "/izrabotka-na-web-prodavnica",
    languages: {
      "mk-MK": "/izrabotka-na-web-prodavnica",
      "en-US": "/en/web-store",
      "x-default": "/izrabotka-na-web-prodavnica",
    },
  },
  openGraph: {
    type: "website",
    locale: "mk_MK",
    url: "/izrabotka-na-web-prodavnica",
    siteName: "Banana",
    title: "Изработка на интернет продавница | Онлајн продажба",
    description:
      "Изработка на интернет продавница со интегрирано плаќање и управување со производи. Продавајте онлајн 24/7 со пониски трошоци.",
  },
};

// FAQ structured data, built from the same dictionary the page renders, so the
// answers stay in sync with what users see.
const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: translations.mk.webStorePage.faq.items.map((item) => ({
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
      <WebStorePage lang="mk" />
    </>
  );
}
