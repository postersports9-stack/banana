import type { Metadata } from "next";
import PortfolioPage from "@/components/PortfolioPage";

export const metadata: Metadata = {
  title: "Портфолио | Изработени веб страни и продавници — Banana Studio",
  description:
    "Портфолио на Banana Studio — веб страни и онлајн продавници изработени за реални клиенти. Филтрирајте по индустрија и тип на проект.",
  alternates: {
    canonical: "/portfolio",
    languages: {
      "mk-MK": "/portfolio",
      "en-US": "/en/portfolio",
      "x-default": "/portfolio",
    },
  },
  openGraph: {
    type: "website",
    locale: "mk_MK",
    url: "/portfolio",
    siteName: "Banana",
    title: "Портфолио | Изработени веб страни и продавници — Banana Studio",
    description:
      "Портфолио на Banana Studio — веб страни и онлајн продавници изработени за реални клиенти.",
  },
};

export default function Page() {
  return <PortfolioPage lang="mk" />;
}
