import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

// Single source of truth for the production origin. Swap here if the domain
// changes — metadataBase resolves all relative canonical/OG/sitemap URLs.
const siteUrl = "https://banana.mk";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Banana — Веб дизајн студио | Изработка на веб страни Македонија",
    template: "%s | Banana — Веб дизајн студио",
  },
  description:
    "Banana — веб дизајн студио од Македонија. Изработка на веб страни, веб сајт и интернет продавници. Веб дизајн, редизајн и SEO оптимизација (izrabotka na web strana, veb strana).",
  applicationName: "Banana",
  // Keyword set: requested brand + service terms in Latin and Cyrillic. Note
  // "web strana" and "veb strana" both transliterate to "веб страна".
  keywords: [
    "Banana",
    "banana mk",
    "web strana",
    "webstrana",
    "web sajt",
    "vebsajt",
    "veb strana",
    "Банана",
    "банана мк",
    "веб страна",
    "вебстрана",
    "веб сајт",
    "вебсајт",
    "изработка на веб страни",
    "веб дизајн",
    "веб дизајн Македонија",
    "интернет продавници",
    "веб дизајн студио",
    "izrabotka na web strana",
    "SEO оптимизација",
  ],
  authors: [{ name: "Banana", url: siteUrl }],
  creator: "Banana",
  publisher: "Banana",
  category: "technology",
  alternates: {
    canonical: "/",
    languages: {
      "mk-MK": "/",
      "en-US": "/en",
      "x-default": "/",
    },
  },
  openGraph: {
    type: "website",
    locale: "mk_MK",
    alternateLocale: "en_US",
    url: siteUrl,
    siteName: "Banana",
    title: "Banana — Веб дизајн студио | Изработка на веб страни Македонија",
    description:
      "Веб дизајн студио од Македонија. Изработка на веб страни, веб сајт и интернет продавници кои носат успех.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Banana — Веб дизајн студио",
    description:
      "Изработка на веб страни, веб сајт и интернет продавници. Веб дизајн Македонија.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

// Organization + WebSite structured data. Mirrors the schema.org graph that
// strong local competitors expose, so Google can attach the brand to the
// "Banana" / "banana mk" queries and build a knowledge entity.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "Banana",
      alternateName: "Banana веб дизајн студио",
      url: siteUrl,
      logo: `${siteUrl}/logo-nav.webp`,
      image: `${siteUrl}/logo-nav.webp`,
      description:
        "Веб дизајн студио од Македонија. Изработка на веб страни, веб сајт и интернет продавници.",
      email: "bananaecommerce.mk@gmail.com",
      areaServed: "MK",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Скопје",
        addressCountry: "MK",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Banana",
      description:
        "Веб дизајн и изработка на веб страна, веб сајт, интернет продавница — Скопје, Македонија.",
      publisher: { "@id": `${siteUrl}/#organization` },
      inLanguage: "mk-MK",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="mk"
      className={`${montserrat.variable} antialiased`}
    >
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
        {/* Warm up the Spline CDN connection. No full-scene preload: the robot
            is desktop-only and lazy-loaded, so preloading the multi-MB scene
            would waste bandwidth on mobile where it never mounts. */}
        <link rel="preconnect" href="https://prod.spline.design" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://prod.spline.design" />
      </head>
      <body className="font-body-md text-body-md bg-black text-on-surface overflow-x-hidden selection:bg-primary-container selection:text-on-primary-container">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
