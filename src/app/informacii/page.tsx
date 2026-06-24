import type { Metadata } from "next";
import BlogIndexPage from "@/components/BlogIndexPage";
import { getPosts, postPath, blogUI } from "@/lib/blog";

const siteUrl = "https://banana.mk";

export const metadata: Metadata = {
  title: "Информации и совети за веб страни, цени и SEO",
  description: blogUI.mk.indexMetaDescription,
  alternates: {
    canonical: "/informacii",
    languages: {
      "mk-MK": "/informacii",
      "en-US": "/en/blog",
      "x-default": "/informacii",
    },
  },
  openGraph: {
    type: "website",
    locale: "mk_MK",
    url: "/informacii",
    siteName: "Banana",
    title: blogUI.mk.indexMetaTitle,
    description: blogUI.mk.indexMetaDescription,
  },
};

// Blog (CollectionPage) structured data — lists the posts so Google can surface
// the section as a content hub.
const blogLd = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: blogUI.mk.indexMetaTitle,
  description: blogUI.mk.indexMetaDescription,
  url: `${siteUrl}/informacii`,
  inLanguage: "mk-MK",
  blogPost: getPosts("mk").map((p) => ({
    "@type": "BlogPosting",
    headline: p.title,
    description: p.excerpt,
    url: `${siteUrl}${postPath("mk", p.slug)}`,
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
      <BlogIndexPage lang="mk" />
    </>
  );
}
