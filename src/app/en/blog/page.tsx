import type { Metadata } from "next";
import BlogIndexPage from "@/components/BlogIndexPage";
import { getPosts, postPath, blogUI } from "@/lib/blog";

const siteUrl = "https://www.banana.mk";

export const metadata: Metadata = {
  title: "Information & guides on websites, pricing and SEO",
  description: blogUI.en.indexMetaDescription,
  alternates: {
    canonical: "/en/blog",
    languages: {
      "mk-MK": "/informacii",
      "en-US": "/en/blog",
      "x-default": "/informacii",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/en/blog",
    siteName: "Banana",
    title: blogUI.en.indexMetaTitle,
    description: blogUI.en.indexMetaDescription,
  },
};

const blogLd = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: blogUI.en.indexMetaTitle,
  description: blogUI.en.indexMetaDescription,
  url: `${siteUrl}/en/blog`,
  inLanguage: "en-US",
  blogPost: getPosts("en").map((p) => ({
    "@type": "BlogPosting",
    headline: p.title,
    description: p.excerpt,
    url: `${siteUrl}${postPath("en", p.slug)}`,
    datePublished: p.datePublished,
    dateModified: p.dateModified,
  })),
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogLd) }}
      />
      <BlogIndexPage lang="en" />
    </>
  );
}
