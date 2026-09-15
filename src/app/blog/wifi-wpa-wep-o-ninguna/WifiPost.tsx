"use client";
import Link from "next/link";
import { Lock, ShieldAlert, Unlock } from "lucide-react";
import LegalHeader from "@/components/LegalHeader";
import { useLocale } from "@/lib/i18n/LocaleContext";
import { getUi } from "@/lib/i18n/ui";
import { Blocks, renderInline } from "@/lib/i18n/articleBlocks";
import { WIFI_POST_CONTENT } from "@/content/blog/wifiWpaWepONinguna";

const CARD_ICONS = [Lock, ShieldAlert, Unlock];
const CARD_STYLES = [
  "bg-page border-secondary",
  "bg-page border-primary/50",
  "bg-page border-accent",
];
const CARD_ICON_COLORS = ["text-ink", "text-primary", "text-ink"];

export default function WifiPost() {
  const { locale } = useLocale();
  const t = getUi(locale);
  const c = WIFI_POST_CONTENT[locale];

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

          <div className="my-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {c.cards.map((card, i) => {
              const Icon = CARD_ICONS[i];
              return (
                <div
                  key={card.label}
                  className={`rounded-2xl border p-5 flex flex-col items-center text-center gap-2 ${CARD_STYLES[i]}`}
                >
                  <Icon className={`w-8 h-8 ${CARD_ICON_COLORS[i]}`} />
                  <span className="text-sm font-bold text-ink">{card.label}</span>
                  <span className="text-xs text-ink/70">{card.caption}</span>
                </div>
              );
            })}
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
