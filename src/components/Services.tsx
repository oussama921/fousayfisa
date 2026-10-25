import Image from "next/image";
import { work } from "@/data/works";
import type { Dict } from "@/i18n";

const images = ["garden-04", "bath-02", "panel-02", "planter-02", "relief-02", "interior-02"];

export function Services({ t }: { t: Dict }) {
  return (
    <section id="services" className="bg-sand py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-terracotta">{t.services.eyebrow}</p>
            <h2 className="mt-4 max-w-xl font-display text-4xl leading-tight font-medium tracking-tight sm:text-5xl">
              {t.services.title}
            </h2>
          </div>
          <p className="max-w-sm text-ink-soft">
            {t.services.lead}
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((img, i) => {
            const s = { n: String(i + 1).padStart(2, "0"), ...t.services.items[i] };
            const w = work(t, img);
            return (
              <article
                key={s.n}
                className="group overflow-hidden rounded-3xl bg-paper shadow-sm ring-1 ring-grout transition hover:-translate-y-1 hover:shadow-xl hover:shadow-ink/10"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={w.src}
                    alt={w.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 rounded-lg bg-paper/90 px-2.5 py-1 font-display text-sm font-semibold backdrop-blur">
                    {s.n}
                  </span>
                </div>
                <div className="p-7">
                  <h3 className="font-display text-2xl font-medium">{s.title}</h3>
                  <p className="mt-3 leading-relaxed text-ink-soft">{s.text}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
