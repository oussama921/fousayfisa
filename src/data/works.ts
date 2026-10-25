import type { Dict } from "@/i18n";
import raw from "./works.json";

export const categoryIds = ["garden", "bath", "panel", "planter", "relief", "interior"] as const;
export type Category = (typeof categoryIds)[number];

export type Work = {
  key: string;
  src: string;
  category: Category;
  width: number;
  height: number;
  title: string;
};

export type CategoryInfo = { id: Category; label: string; blurb: string };

const base = raw.map((w) => ({
  ...w,
  key: w.src.replace("/works/", "").replace(".jpg", ""),
  category: w.category as Category,
}));

export const localizedWorks = (t: Dict): Work[] =>
  base.map((w) => ({ ...w, title: t.titles[w.key as keyof Dict["titles"]] ?? "" }));

export const localizedCategories = (t: Dict): CategoryInfo[] =>
  categoryIds.map((id) => ({ id, ...t.categories[id] }));

export const work = (t: Dict, key: string): Work => {
  const found = localizedWorks(t).find((w) => w.key === key);
  if (!found) throw new Error(`Unknown work: ${key}`);
  return found;
};
