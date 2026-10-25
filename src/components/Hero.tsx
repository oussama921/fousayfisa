import Image from "next/image";
import { work } from "@/data/works";
import type { Dict } from "@/i18n";
import { site } from "@/lib/site";

// Collage laid out like tiles: tight joints, slight hand-set rotation.
const collage = [
  { key: "garden-01", cls: "col-span-4 row-span-2", r: "-0.6deg" },
  { key: "relief-01", cls: "col-span-2 row-span-2", r: "0.8deg" },
  { key: "bath-01", cls: "col-span-3 row-span-2", r: "0.4deg" },
  { key: "panel-01", cls: "col-span-3 row-span-1", r: "-0.5deg" },
  { key: "planter-01", cls: "col-span-3 row-span-1", r: "0.6deg" },
];

export function Hero({ t }: { t: Dict }) {
  return (
    <section id="top" className="grout relative isolate overflow-hidden">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 pb-20 pt-14 sm:px-8 lg:grid-cols-[1fr_1.15fr] lg:items-center lg:gap-16 lg:pb-28 lg:pt-20">
        <div className="settle">
          <p className="mb-6 inline-flex items-center gap-3 rounded-full border border-grout bg-paper px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-stone">
            <span className="size-2 rounded-[2px] bg-terracotta" />
            {t.hero.badge} · {t.city}
          </p>
          <h1 className="font-display text-5xl leading-[1.02] font-medium tracking-tight text-balance sm:text-6xl lg:text-7xl">
            {t.hero.line1}
            <br />
            {t.hero.line2} <em className="font-normal text-terracotta">{t.hero.em}</em>
          </h1>
          <p className="mt-7 max-w-lg text-lg leading-relaxed text-ink-soft">
            {t.hero.lead}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#contact"
              className="rounded-full bg-terracotta px-7 py-3.5 font-semibold text-paper shadow-lg shadow-terracotta/25 transition hover:bg-terracotta-deep"
            >
              {t.hero.cta}
            </a>
            <a
              href="#work"
              className="group inline-flex items-center gap-2 rounded-full px-5 py-3.5 font-semibold text-ink transition hover:text-terracotta"
            >
              {t.hero.see}
              <span aria-hidden className="transition group-hover:translate-x-1">→</span>
            </a>
          </div>
          <dl className="mt-14 grid max-w-md grid-cols-3 gap-6 border-t border-grout pt-6">
            {t.hero.stats.map(([a, b]) => (
              <div key={a}>
                <dt className="font-display text-xl font-semibold">{a}</dt>
                <dd className="mt-1 text-sm text-stone">{b}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative">
          <div className="grid aspect-[6/5] grid-cols-6 grid-rows-4 gap-2 rounded-[28px] bg-grout p-2 shadow-2xl shadow-ink/15 sm:gap-2.5 sm:p-2.5">
            {collage.map((c, i) => {
              const w = work(t, c.key);
              return (
                <div
                  key={c.key}
                  className={`settle relative overflow-hidden rounded-[14px] ${c.cls}`}
                  style={{ ["--r" as string]: c.r, animationDelay: `${150 + i * 110}ms` }}
                >
                  <Image
                    src={w.src}
                    alt={w.title}
                    fill
                    sizes="(max-width: 1024px) 60vw, 35vw"
                    className="object-cover transition duration-700 hover:scale-105"
                    preload={i === 0}
                  />
                </div>
              );
            })}
          </div>
          <span className="font-arabic pointer-events-none absolute -top-20 right-0 -z-10 hidden text-[7rem] leading-none text-terracotta/10 select-none lg:block">
            {site.arabicName}
          </span>
        </div>
      </div>
    </section>
  );
}
