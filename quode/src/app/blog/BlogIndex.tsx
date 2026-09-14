"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import LegalHeader from "@/components/LegalHeader";
import { useLocale } from "@/lib/i18n/LocaleContext";
import { BLOG_INDEX_CONTENT } from "@/content/blogIndex";

export default function BlogIndex() {
  const { locale } = useLocale();
  const c = BLOG_INDEX_CONTENT[locale];

  return (
    <>
      <LegalHeader active="/blog" />
      <main className="flex-1 px-4 py-10 max-w-2xl mx-auto text-sm leading-relaxed text-[#333333]">
        <h1 className="text-2xl font-bold mb-2">{c.heading}</h1>
        <p className="text-[#333333]/70 mb-8">{c.intro}</p>

        <div className="space-y-4">
          {c.posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block bg-white rounded-2xl p-5 shadow-sm border border-[#333333]/10 hover:border-[#F38181]/40 transition group"
            >
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#333333]/40 mb-1">
                {post.date}
              </p>
              <h2 className="text-base font-bold text-[#333333] mb-1.5 flex items-center gap-1.5">
                {post.title}
                <ArrowRight className="w-3.5 h-3.5 text-[#F38181] shrink-0 group-hover:translate-x-0.5 transition-transform" />
              </h2>
              <p className="text-[#333333]/70">{post.excerpt}</p>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}
