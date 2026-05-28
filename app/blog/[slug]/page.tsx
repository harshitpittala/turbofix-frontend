import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogPostClient from "./BlogPostClient";
import { blogs, getBlogBySlug } from "@/data/blogs";
import { JsonLd } from "@/components/seo/JsonLd";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return blogs.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const blog = getBlogBySlug(params.slug);
  if (!blog) return { title: "Blog Post Not Found" };

  return {
    title: blog.title,
    description: blog.excerpt,
    keywords: blog.keywords,
    alternates: { canonical: `https://turbofix.in/blog/${blog.slug}` },
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      url: `https://turbofix.in/blog/${blog.slug}`,
      type: "article",
      publishedTime: blog.date,
    },
  };
}

export default function BlogPostPage({ params }: Props) {
  const blog = getBlogBySlug(params.slug);
  if (!blog) notFound();

  const allFaqs = blog.content.flatMap((s) => s.faq || []);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `https://turbofix.in/blog/${blog.slug}#article`,
    headline: blog.title,
    description: blog.excerpt,
    datePublished: blog.date,
    dateModified: blog.date,
    author: {
      "@type": "Organization",
      name: "TurboFix",
      url: "https://turbofix.in",
    },
    publisher: {
      "@type": "Organization",
      name: "TurboFix",
      url: "https://turbofix.in",
      logo: { "@type": "ImageObject", url: "https://turbofix.in/logo.png" },
    },
    url: `https://turbofix.in/blog/${blog.slug}`,
    mainEntityOfPage: { "@type": "WebPage", "@id": `https://turbofix.in/blog/${blog.slug}` },
    keywords: blog.keywords.join(", "),
  };

  const faqSchema = allFaqs.length > 0
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: allFaqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }
    : null;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://turbofix.in" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://turbofix.in/blog" },
      { "@type": "ListItem", position: 3, name: blog.title, item: `https://turbofix.in/blog/${blog.slug}` },
    ],
  };

  return (
    <>
      <JsonLd schema={articleSchema} id={`schema-article-${blog.slug}`} />
      {faqSchema && <JsonLd schema={faqSchema} id={`schema-faq-${blog.slug}`} />}
      <JsonLd schema={breadcrumbSchema} id={`schema-breadcrumb-${blog.slug}`} />
      <BlogPostClient blog={blog} />
    </>
  );
}
