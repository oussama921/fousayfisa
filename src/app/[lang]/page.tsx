import { notFound } from "next/navigation";
import { Contact } from "@/components/Contact";
import { Featured } from "@/components/Featured";
import { Gallery } from "@/components/Gallery";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Process } from "@/components/Process";
import { Services } from "@/components/Services";
import { Tesserae } from "@/components/Tesserae";
import { localizedCategories, localizedWorks } from "@/data/works";
import { getDict, hasLocale } from "@/i18n";
import { site } from "@/lib/site";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDict(lang);
  const categories = localizedCategories(t);

  return (
    <>
      <Header lang={lang} t={t} />
      <main className="flex-1">
        <Hero t={t} />
        <Tesserae seed={3} />
        <Services t={t} />
        <Featured t={t} />

        <section id="work" className="py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-terracotta">{t.work.eyebrow}</p>
                <h2 className="mt-4 font-display text-4xl leading-tight font-medium tracking-tight sm:text-5xl">
                  {t.work.title}
                </h2>
              </div>
              <p className="max-w-sm text-ink-soft">{t.work.lead}</p>
            </div>
            <Gallery works={localizedWorks(t)} categories={categories} t={t.gallery} />
          </div>
        </section>

        <Tesserae seed={11} />
        <div className="bg-sand">
          <Process t={t} />
        </div>

        <section id="contact" className="grout-dark relative overflow-hidden bg-ink py-24 text-paper lg:py-32">
          <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-ochre">{t.contact.eyebrow}</p>
              <h2 className="mt-4 font-display text-4xl leading-tight font-medium tracking-tight sm:text-5xl">
                {t.contact.title}
              </h2>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-paper/75">{t.contact.lead}</p>
              <dl className="mt-12 space-y-6">
                {[
                  [t.contact.phone, site.phone, `tel:${site.phone.replace(/\s/g, "")}`],
                  [t.contact.basedIn, t.city, null],
                ].map(([k, v, href]) => (
                  <div key={k} className="flex items-baseline gap-6 border-b border-paper/10 pb-6">
                    <dt className="w-28 shrink-0 text-sm font-semibold uppercase tracking-wider text-ochre">{k}</dt>
                    <dd className="text-lg">
                      {href ? (
                        <a href={href} className="hover:text-ochre">
                          {v}
                        </a>
                      ) : (
                        v
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="rounded-3xl border border-paper/10 bg-paper/[0.03] p-6 sm:p-10">
              <Contact categories={categories} t={t.form} />
            </div>
          </div>
          <span className="font-arabic pointer-events-none absolute -right-6 -bottom-16 text-[12rem] leading-none text-paper/[0.04] select-none">
            {site.arabicName}
          </span>
        </section>
      </main>

      <footer className="bg-ink text-paper/60">
        <Tesserae seed={5} rows={1} className="opacity-80" />
        <div className="mx-auto max-w-7xl px-5 py-8 text-center text-sm sm:px-8">
          <p>
            <span className="font-display text-base font-semibold text-paper">{site.name}</span>
            <span className="font-arabic ml-2 text-ochre">{site.arabicName}</span>
            <span className="ml-3">{t.tagline}</span>
          </p>
        </div>
      </footer>
    </>
  );
}
