import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogPostPage from "@/components/BlogPostPage";
import { getPosts, getPost, postPath, alternateSlug, coverImage, buildPostLd } from "@/lib/blog";

const siteUrl = "https://banana.mk";

// Only the slugs known at build time are served; anything else 404s.
export const dynamicParams = false;

export function generateStaticParams() {
  return getPosts("mk").map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost("mk", slug);
  if (!post) return {};

  const enSlug = alternateSlug(post.id, "en");
  return {
    title: post.metaTitle,
    description: post.metaDescription,
    alternates: {
      canonical: postPath("mk", post.slug),
      languages: {
        "mk-MK": postPath("mk", post.slug),
        ...(enSlug ? { "en-US": postPath("en", enSlug) } : {}),
        "x-default": postPath("mk", post.slug),
      },
    },
    openGraph: {
      type: "article",
      locale: "mk_MK",
      url: postPath("mk", post.slug),
      siteName: "Banana",
      title: post.metaTitle,
      description: post.metaDescription,
      publishedTime: post.datePublished,
      modifiedTime: post.dateModified,
      images: [coverImage(post.cover)],
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost("mk", slug);
  if (!post) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildPostLd("mk", post, siteUrl)) }}
      />
      <BlogPostPage lang="mk" slug={slug} />
    </>
  );
}
