"use client";

import { useState } from "react";
import type { CategoryInfo } from "@/data/works";
import { fill, type Dict } from "@/i18n";
import { site } from "@/lib/site";

const field =
  "w-full rounded-xl border border-paper/15 bg-paper/5 px-4 py-3.5 text-paper placeholder:text-paper/40 outline-none transition focus:border-ochre focus:bg-paper/10";

export function Contact({ categories, t }: { categories: CategoryInfo[]; t: Dict["form"] }) {
  const [form, setForm] = useState({ name: "", phone: "", type: categories[0].label, place: "", message: "" });
  const set = (k: keyof typeof form) => (e: { target: { value: string } }) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const body = [
    fill(t.msgHello, { name: form.name || "…" }),
    fill(t.msgProject, { type: form.type }),
    form.place && fill(t.msgLocation, { place: form.place }),
    form.message && `\n${form.message}`,
    form.phone && `\n${fill(t.msgReach, { phone: form.phone })}`,
  ]
    .filter(Boolean)
    .join("\n");

  const whatsapp = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(body)}`;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        window.open(whatsapp, "_blank", "noopener");
      }}
      className="grid gap-4 sm:grid-cols-2"
    >
      <label className="sm:col-span-1">
        <span className="mb-2 block text-sm font-semibold text-paper/70">{t.name}</span>
        <input required value={form.name} onChange={set("name")} className={field} placeholder={t.namePh} />
      </label>
      <label>
        <span className="mb-2 block text-sm font-semibold text-paper/70">{t.phone}</span>
        <input value={form.phone} onChange={set("phone")} className={field} placeholder="+351 …" inputMode="tel" />
      </label>
      <label>
        <span className="mb-2 block text-sm font-semibold text-paper/70">{t.type}</span>
        <select value={form.type} onChange={set("type")} className={`${field} [&>option]:text-ink`}>
          {categories.map((c) => (
            <option key={c.id}>{c.label}</option>
          ))}
          <option>{t.other}</option>
        </select>
      </label>
      <label>
        <span className="mb-2 block text-sm font-semibold text-paper/70">{t.place}</span>
        <input value={form.place} onChange={set("place")} className={field} placeholder={t.placePh} />
      </label>
      <label className="sm:col-span-2">
        <span className="mb-2 block text-sm font-semibold text-paper/70">{t.message}</span>
        <textarea
          rows={4}
          value={form.message}
          onChange={set("message")}
          className={`${field} resize-none`}
          placeholder={t.messagePh}
        />
      </label>
      <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
        <button
          type="submit"
          className="rounded-full bg-terracotta px-7 py-3.5 font-semibold text-paper transition hover:bg-ochre hover:text-ink"
        >
          {t.whatsapp}
        </button>
      </div>
    </form>
  );
}
