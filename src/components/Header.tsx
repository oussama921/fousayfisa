import { locales, localeNames, type Dict, type Locale } from "@/i18n";
import { site } from "@/lib/site";

function Mark() {
  return (
    <svg viewBox="0 0 24 24" className="size-7" aria-hidden>
      <rect x="1" y="1" width="10" height="10" rx="1.5" className="fill-terracotta" />
      <rect x="13" y="1" width="10" height="10" rx="1.5" className="fill-cobalt" transform="rotate(4 18 6)" />
      <rect x="1" y="13" width="10" height="10" rx="1.5" className="fill-ochre" transform="rotate(-3 6 18)" />
      <rect x="13" y="13" width="10" height="10" rx="1.5" className="fill-ink" />
    </svg>
  );
}

function LanguageSwitch({ lang, label, className = "" }: { lang: Locale; label: string; className?: string }) {
  return (
    <nav aria-label={label} className={`flex rounded-full border border-grout bg-paper p-1 text-xs font-bold ${className}`}>
      {locales.map((l) => (
        <a
          key={l}
          href={`/${l}`}
          hrefLang={l}
          lang={l}
          title={localeNames[l]}
          aria-current={l === lang ? "page" : undefined}
          className={`rounded-full px-2.5 py-1.5 uppercase transition ${
            l === lang ? "bg-ink text-paper" : "text-ink-soft hover:text-terracotta"
          }`}
        >
          {l}
        </a>
      ))}
    </nav>
  );
}

export function Header({ lang, t }: { lang: Locale; t: Dict }) {
  const links = [
    { href: "#services", label: t.nav.services },
    { href: "#work", label: t.nav.work },
    { href: "#process", label: t.nav.process },
    { href: "#contact", label: t.nav.contact },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-grout/70 bg-paper/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
        <a href="#top" className="flex items-center gap-3">
          <Mark />
          <span className="font-display text-xl font-semibold tracking-tight">{site.name}</span>
          <span className="font-arabic hidden text-lg text-terracotta sm:inline">{site.arabicName}</span>
        </a>

        <div className="hidden items-center gap-7 text-sm font-medium lg:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-ink-soft transition hover:text-terracotta">
              {l.label}
            </a>
          ))}
          <LanguageSwitch lang={lang} label={t.nav.language} />
          <a
            href="#contact"
            className="rounded-full bg-ink px-5 py-2.5 text-paper transition hover:bg-terracotta"
          >
            {t.nav.quote}
          </a>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <LanguageSwitch lang={lang} label={t.nav.language} />
          <details className="group relative">
            <summary className="flex size-10 cursor-pointer list-none items-center justify-center rounded-full border border-grout [&::-webkit-details-marker]:hidden">
              <span className="sr-only">{t.nav.menu}</span>
              <svg viewBox="0 0 20 20" className="size-5" aria-hidden>
                <path d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </summary>
            <nav className="absolute right-0 mt-3 flex w-56 flex-col rounded-2xl border border-grout bg-paper p-2 shadow-xl">
              {[...links, { href: "#contact", label: t.nav.quote }].map((l) => (
                <a key={l.label} href={l.href} className="rounded-xl px-4 py-3 text-sm font-medium hover:bg-sand">
                  {l.label}
                </a>
              ))}
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
