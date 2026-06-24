import type { MetadataRoute } from "next";
import { getPosts, postPath } from "@/lib/blog";

const siteUrl = "https://www.banana.mk";

// Homepage, service pages, portfolio and the blog (index + every post, both
// locales). Blog routes are derived from the data module so new posts appear
// here automatically (a sitemap must not list pages that 404).
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const blogRoutes: MetadataRoute.Sitemap = (["mk", "en"] as const).flatMap((lang) => [
    {
      url: `${siteUrl}${lang === "mk" ? "/informacii" : "/en/blog"}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: lang === "mk" ? 0.8 : 0.7,
    },
    ...getPosts(lang).map((post) => ({
      url: `${siteUrl}${postPath(lang, post.slug)}`,
      lastModified: new Date(post.dateModified),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ]);
  return [
    {
      url: siteUrl,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteUrl}/en`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/web-dizajn`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/en/web-design`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/izrabotka-na-web-prodavnica`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/en/web-store`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/seo-optimizacija`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/en/seo`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/portfolio`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/en/portfolio`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...blogRoutes,
  ];
}
