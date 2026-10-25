"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { Category, CategoryInfo, Work } from "@/data/works";
import { fill, type Dict } from "@/i18n";

export function Gallery({
  works,
  categories,
  t,
}: {
  works: Work[];
  categories: CategoryInfo[];
  t: Dict["gallery"];
}) {
  const [filter, setFilter] = useState<Category | "all">("all");
  const [open, setOpen] = useState<number | null>(null);
  const [expanded, setExpanded] = useState(false);

  // In "all", deal works round-robin across categories so similar shots don't cluster.
  const mixed = useMemo(() => {
    const groups = categories.map((c) => works.filter((w) => w.category === c.id));
    const out: Work[] = [];
    for (let i = 0; out.length < works.length; i++)
      for (const g of groups) if (g[i]) out.push(g[i]);
    return out;
  }, [works, categories]);

  const filtered = filter === "all" ? mixed : works.filter((w) => w.category === filter);
  const shown = expanded || filter !== "all" ? filtered : filtered.slice(0, 16);

  const step = useCallback(
    (d: number) => setOpen((i) => (i === null ? i : (i + d + shown.length) % shown.length)),
    [shown.length],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, step]);

  const current = open === null ? null : shown[open];
  const label = (id: Category) => categories.find((c) => c.id === id)?.label;

  return (
    <>
      <div className="mt-12 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none]">
        {[{ id: "all" as const, label: t.all }, ...categories].map((c) => {
          const active = filter === c.id;
          return (
            <button
              key={c.id}
              onClick={() => setFilter(c.id)}
              className={`shrink-0 rounded-full border px-5 py-2.5 text-sm font-semibold transition ${
                active
                  ? "border-ink bg-ink text-paper"
                  : "border-grout bg-paper text-ink-soft hover:border-terracotta hover:text-terracotta"
              }`}
            >
              {c.label}
              <span className={`ml-2 text-xs ${active ? "text-paper/60" : "text-stone"}`}>
                {c.id === "all" ? works.length : works.filter((w) => w.category === c.id).length}
              </span>
            </button>
          );
        })}
      </div>

      {filter !== "all" && (
        <p className="mt-6 max-w-xl text-ink-soft">{categories.find((c) => c.id === filter)?.blurb}</p>
      )}

      <div className="mt-10 columns-2 gap-3 sm:gap-4 md:columns-3 lg:columns-4">
        {shown.map((w, i) => (
          <button
            key={w.src}
            onClick={() => setOpen(i)}
            className="group relative mb-3 block w-full overflow-hidden rounded-2xl bg-grout break-inside-avoid sm:mb-4"
          >
            <Image
              src={w.src}
              alt={w.title}
              width={w.width}
              height={w.height}
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="h-auto w-full transition duration-700 group-hover:scale-[1.04]"
            />
            <span className="absolute inset-x-0 bottom-0 flex flex-col items-start bg-gradient-to-t from-ink/80 via-ink/30 to-transparent p-4 pt-12 text-left text-paper opacity-0 transition duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ochre">{label(w.category)}</span>
              <span className="mt-1 font-display text-lg leading-snug">{w.title}</span>
            </span>
          </button>
        ))}
      </div>

      {shown.length < filtered.length && (
        <div className="mt-10 flex justify-center">
          <button
            onClick={() => setExpanded(true)}
            className="rounded-full border border-ink px-7 py-3.5 font-semibold transition hover:bg-ink hover:text-paper"
          >
            {fill(t.showAll, { n: filtered.length })}
          </button>
        </div>
      )}

      {current && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={current.title}
          className="fixed inset-0 z-50 flex flex-col bg-ink/95 backdrop-blur-sm"
          onClick={() => setOpen(null)}
        >
          <div className="flex items-center justify-between px-5 py-4 text-paper sm:px-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ochre">{label(current.category)}</p>
              <p className="font-display text-xl">{current.title}</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm tabular-nums text-paper/60">
                {open! + 1} / {shown.length}
              </span>
              <button
                aria-label={t.close}
                onClick={() => setOpen(null)}
                className="flex size-11 items-center justify-center rounded-full border border-paper/20 text-2xl hover:bg-paper/10"
              >
                ×
              </button>
            </div>
          </div>

          <div className="relative flex-1" onClick={(e) => e.stopPropagation()}>
            <Image
              key={current.src}
              src={current.src}
              alt={current.title}
              fill
              sizes="100vw"
              className="object-contain px-4 pb-6 sm:px-20"
            />
            {[
              { d: -1, label: t.previous, side: "left-3 sm:left-6", glyph: "←" },
              { d: 1, label: t.next, side: "right-3 sm:right-6", glyph: "→" },
            ].map((b) => (
              <button
                key={b.label}
                aria-label={b.label}
                onClick={() => step(b.d)}
                className={`absolute top-1/2 ${b.side} flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-paper/10 text-xl text-paper backdrop-blur hover:bg-terracotta`}
              >
                {b.glyph}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
