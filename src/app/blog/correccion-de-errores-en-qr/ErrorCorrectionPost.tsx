"use client";
import Link from "next/link";
import LegalHeader from "@/components/LegalHeader";
import DecorativeQr from "@/components/illustrations/DecorativeQr";
import { useLocale } from "@/lib/i18n/LocaleContext";
import { getUi } from "@/lib/i18n/ui";
import { Blocks, renderInline } from "@/lib/i18n/articleBlocks";
import { ERROR_CORRECTION_POST_CONTENT } from "@/content/blog/correccionDeErrores";

export default function ErrorCorrectionPost() {
  const { locale } = useLocale();
  const t = getUi(locale);
  const c = ERROR_CORRECTION_POST_CONTENT[locale];

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

          <h2 className="text-lg font-semibold mt-8 mb-2">{c.levelsHeading}</h2>
          <ul className="list-disc pl-5 mb-4 space-y-2">
            {c.levelsList.map((item, i) => (
              <li key={i}>{renderInline(item)}</li>
            ))}
          </ul>

          <div className="my-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {c.levels.map((lvl) => (
              <div key={lvl.letter} className="flex flex-col items-center gap-2">
                <DecorativeQr size={110} seed={5} coverPercent={lvl.cover} />
                <span className="text-sm font-bold text-ink">{lvl.letter}</span>
                <span className="text-[11px] text-ink/60">
                  {lvl.percent} {c.recoverableLabel}
                </span>
              </div>
            ))}
          </div>

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
