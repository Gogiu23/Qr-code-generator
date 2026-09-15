"use client";
import Link from "next/link";
import LegalHeader from "@/components/LegalHeader";
import DecorativeQr from "@/components/illustrations/DecorativeQr";
import { useLocale } from "@/lib/i18n/LocaleContext";
import { getUi } from "@/lib/i18n/ui";
import { Blocks, renderInline } from "@/lib/i18n/articleBlocks";
import { HOW_IT_WORKS_POST_CONTENT } from "@/content/blog/comoFuncionaUnQr";

export default function HowItWorksPost() {
  const { locale } = useLocale();
  const t = getUi(locale);
  const c = HOW_IT_WORKS_POST_CONTENT[locale];

  return (
    <>
      <LegalHeader active="/blog" />
      <main className="flex-1 px-4 py-10 max-w-2xl mx-auto w-full">
        <Link
          href="/blog"
          className="mb-3 inline-block text-xs font-semibold text-primary hover:underline"
        >
          {t.common.backToBlog}
        </Link>
        <article className="bg-surface rounded-2xl shadow-sm border border-ink/10 p-6 sm:p-8 text-sm leading-relaxed text-ink">
          <h1 className="text-2xl font-bold mb-2">{c.title}</h1>
          <p className="text-ink/60 mb-8 text-xs">
            {t.common.updated}: {c.updated}
          </p>

          <p className="mb-4">{renderInline(c.intro)}</p>

          <h2 className="text-lg font-semibold mt-8 mb-2">{c.anatomyHeading}</h2>
          <p className="mb-4">{renderInline(c.anatomyIntro)}</p>

          <div className="my-8 bg-page rounded-2xl border border-secondary p-6 flex flex-col sm:flex-row items-center gap-6">
            <DecorativeQr size={170} seed={9} className="shrink-0" />
            <ol className="list-decimal pl-4 space-y-2 text-xs text-ink/80">
              {c.diagramItems.map((item, i) => (
                <li key={i}>{renderInline(item)}</li>
              ))}
            </ol>
          </div>

          <ul className="list-disc pl-5 mb-4 space-y-2">
            {c.detailedList.map((item, i) => (
              <li key={i}>{renderInline(item)}</li>
            ))}
          </ul>

          <Blocks blocks={c.blocks} />

          <div className="mt-10 bg-page rounded-2xl border border-secondary p-5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-sm font-semibold">{c.ctaText}</p>
            <Link
              href="/"
              className="shrink-0 text-xs font-semibold bg-accent text-ink hover:bg-accent/90 px-4 py-2 rounded-lg transition"
            >
              {t.common.goToGenerator}
            </Link>
          </div>
        </article>
      </main>
    </>
  );
}
