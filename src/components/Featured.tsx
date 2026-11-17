import Image from "next/image";
import { work } from "@/data/works";
import type { Dict } from "@/i18n";
import { Tesserae } from "./Tesserae";

export function Featured({ t }: { t: Dict }) {
  const main = work(t, "bath-01");
  const side = [work(t, "bath-03"), work(t, "bath-05")];

  return (
    <section className="grout-dark relative overflow-hidden bg-ink py-24 text-paper lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-ochre">{t.featured.eyebrow}</p>
          <h2 className="mt-4 font-display text-4xl leading-tight font-medium tracking-tight sm:text-5xl">
            {t.featured.title}
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-paper/75">
            {t.featured.text}
          </p>
          <ul className="mt-10 space-y-4 border-t border-paper/15 pt-8 text-paper/80">
            {t.featured.facts.map(([k, v]) => (
              <li key={k} className="flex items-baseline gap-6">
                <span className="w-24 shrink-0 text-sm font-semibold uppercase tracking-wider text-ochre">{k}</span>
                <span>{v}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="relative col-span-3 aspect-[16/9] overflow-hidden rounded-2xl">
            <Image src={main.src} alt={main.title} fill sizes="(max-width: 1024px) 100vw, 55vw" className="object-cover" />
          </div>
          {side.map((w, i) => (
            <div
              key={w.src}
              className={`relative h-44 overflow-hidden sm:h-60 rounded-2xl ${i === 0 ? "col-span-2" : "col-span-1"}`}
            >
              <Image src={w.src} alt={w.title} fill sizes="(max-width: 1024px) 60vw, 35vw" className="object-cover" />
            </div>
          ))}
        </div>
      </div>
      <Tesserae seed={21} rows={1} palette="cool" className="absolute bottom-0 left-0 opacity-70" />
    </section>
  );
}
