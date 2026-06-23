import type { Metadata } from "next";
import PortfolioPage from "@/components/PortfolioPage";

export const metadata: Metadata = {
  title: "Portfolio | Websites & online stores we've built — Banana Studio",
  description:
    "Banana Studio portfolio — websites and online stores built for real clients. Filter by industry and project type.",
  alternates: {
    canonical: "/en/portfolio",
    languages: {
      "mk-MK": "/portfolio",
      "en-US": "/en/portfolio",
      "x-default": "/portfolio",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/en/portfolio",
    siteName: "Banana",
    title: "Portfolio | Websites & online stores we've built — Banana Studio",
    description:
      "Banana Studio portfolio — websites and online stores built for real clients.",
  },
};

export default function Page() {
  return <PortfolioPage lang="en" />;
}
