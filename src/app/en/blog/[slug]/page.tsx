import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogPostPage from "@/components/BlogPostPage";
import { getPosts, getPost, postPath, alternateSlug, coverImage, buildPostLd } from "@/lib/blog";

const siteUrl = "https://www.banana.mk";

export const dynamicParams = false;

export function generateStaticParams() {
  return getPosts("en").map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost("en", slug);
  if (!post) return {};

  const mkSlug = alternateSlug(post.id, "mk");
  return {
    title: post.metaTitle,
    description: post.metaDescription,
    alternates: {
      canonical: postPath("en", post.slug),
      languages: {
        "en-US": postPath("en", post.slug),
        ...(mkSlug ? { "mk-MK": postPath("mk", mkSlug) } : {}),
        "x-default": mkSlug ? postPath("mk", mkSlug) : postPath("en", post.slug),
      },
    },
    openGraph: {
      type: "article",
      locale: "en_US",
      url: postPath("en", post.slug),
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
  const post = getPost("en", slug);
  if (!post) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildPostLd("en", post, siteUrl)) }}
      />
      <BlogPostPage lang="en" slug={slug} />
    </>
  );
}
