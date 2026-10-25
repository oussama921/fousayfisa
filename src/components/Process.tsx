import Image from "next/image";
import { work } from "@/data/works";
import type { Dict } from "@/i18n";

export function Process({ t }: { t: Dict }) {
  const w = work(t, "relief-07");

  return (
    <section id="process" className="py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-16 px-5 sm:px-8 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="relative aspect-square overflow-hidden rounded-[2rem] shadow-2xl shadow-ink/15">
            <Image src={w.src} alt={t.process.imgAlt} fill sizes="(max-width: 1024px) 90vw, 45vw" className="object-cover" />
          </div>
          <div className="absolute -bottom-6 -right-4 rounded-2xl bg-paper px-6 py-5 shadow-xl ring-1 ring-grout sm:-right-8">
            <p className="font-display text-3xl font-semibold text-terracotta">{t.process.badge}</p>
            <p className="text-sm text-stone">{t.process.badgeSub}</p>
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-terracotta">{t.process.eyebrow}</p>
          <h2 className="mt-4 font-display text-4xl leading-tight font-medium tracking-tight sm:text-5xl">
            {t.process.title}
          </h2>
          <ol className="mt-12 space-y-2">
            {t.process.steps.map((s, i) => (
              <li key={s.title} className="group flex gap-6 rounded-2xl p-5 transition hover:bg-sand">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-ink font-display text-lg font-semibold text-paper transition group-hover:rotate-6 group-hover:bg-terracotta">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-display text-xl font-medium">{s.title}</h3>
                  <p className="mt-2 leading-relaxed text-ink-soft">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
