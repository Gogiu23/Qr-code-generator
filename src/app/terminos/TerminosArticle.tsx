"use client";
import LegalHeader from "@/components/LegalHeader";
import { useLocale } from "@/lib/i18n/LocaleContext";
import { getUi } from "@/lib/i18n/ui";
import { Blocks, renderInline } from "@/lib/i18n/articleBlocks";
import { TERMINOS_CONTENT } from "@/content/terminos";

export default function TerminosArticle() {
  const { locale } = useLocale();
  const t = getUi(locale);
  const c = TERMINOS_CONTENT[locale];

  return (
    <>
      <LegalHeader />
      <main className="flex-1 px-4 py-10 max-w-2xl mx-auto w-full">
        <article className="bg-surface rounded-2xl shadow-sm border border-ink/10 p-6 sm:p-8 text-sm leading-relaxed text-ink">
          <h1 className="text-2xl font-bold mb-6">{c.title}</h1>
          <p className="text-ink/60 mb-6 text-xs">
            {t.common.updated}: {c.updated}
          </p>

          <p className="mb-4">{renderInline(c.intro)}</p>

          <Blocks blocks={c.blocks} />
        </article>
      </main>
    </>
  );
}
