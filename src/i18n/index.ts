import en, { type Dict } from "./en";
import fr from "./fr";
import pt from "./pt";

// The first locale is the default: "/" redirects to it.
export const locales = ["pt", "en", "fr"] as const;
export type Locale = (typeof locales)[number];
export type { Dict };

export const localeNames: Record<Locale, string> = { pt: "Português", en: "English", fr: "Français" };

const dicts: Record<Locale, Dict> = { pt, en, fr };

export const hasLocale = (l: string): l is Locale => (locales as readonly string[]).includes(l);
export const getDict = (l: Locale) => dicts[l];

export const fill = (s: string, vars: Record<string, string | number>) =>
  s.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? ""));
