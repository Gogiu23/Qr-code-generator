"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import LegalHeader from "@/components/LegalHeader";
import DecorativeBarcode from "@/components/illustrations/DecorativeBarcode";
import DecorativeQr from "@/components/illustrations/DecorativeQr";
import { useLocale } from "@/lib/i18n/LocaleContext";
import { getUi } from "@/lib/i18n/ui";
import { Blocks, renderInline } from "@/lib/i18n/articleBlocks";
import { HISTORIA_CONTENT } from "@/content/historia";

export default function HistoriaArticle() {
  const { locale } = useLocale();
  const t = getUi(locale);
  const c = HISTORIA_CONTENT[locale];

  return (
    <>
      <LegalHeader active="/historia" />
      <main className="flex-1 px-4 py-10 max-w-2xl mx-auto w-full">
        <article className="bg-white rounded-2xl shadow-sm border border-[#333333]/10 p-6 sm:p-8 text-sm leading-relaxed text-[#333333]">
          <h1 className="text-2xl font-bold mb-2">{c.title}</h1>
          <p className="text-[#333333]/60 mb-8 text-xs">
            {t.common.updated}: {c.updated}
          </p>

          <p className="mb-4">{renderInline(c.intro)}</p>

          <div className="my-8 bg-[#EAFFD0] rounded-2xl border border-[#95E1D3] p-6 flex flex-col sm:flex-row items-center justify-center gap-5">
            <div className="flex flex-col items-center gap-2">
              <DecorativeBarcode size={140} />
              <span className="text-xs font-bold text-[#333333]/70">
                {c.barcodeCaption}
              </span>
            </div>
            <ArrowRight className="w-6 h-6 text-[#F38181] shrink-0 rotate-90 sm:rotate-0" />
            <div className="flex flex-col items-center gap-2">
              <DecorativeQr size={140} seed={3} />
              <span className="text-xs font-bold text-[#333333]/70">{c.qrCaption}</span>
            </div>
          </div>

          <Blocks blocks={c.blocks} />

          <div className="mt-10 bg-[#EAFFD0] rounded-2xl border border-[#95E1D3] p-5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-sm font-semibold">{c.ctaText}</p>
            <Link
              href="/"
              className="shrink-0 text-xs font-semibold bg-[#FCE38A] text-[#333333] hover:bg-[#FCE38A]/90 px-4 py-2 rounded-lg transition"
            >
              {t.common.goToGenerator}
            </Link>
          </div>
        </article>
      </main>
    </>
  );
}
