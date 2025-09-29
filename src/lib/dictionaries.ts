import 'server-only';

const dictionaries = {
  en: () => import('@/dictionaries/en.json').then((module) => module.default),
  pl: () => import('@/dictionaries/pl.json').then((module) => module.default),
  fr: () => import('@/dictionaries/fr.json').then((module) => module.default),
  ru: () => import('@/dictionaries/ru.json').then((module) => module.default),
  es: () => import('@/dictionaries/es.json').then((module) => module.default),
  de: () => import('@/dictionaries/de.json').then((module) => module.default),
};

export type Locale = keyof typeof dictionaries;

export const getDictionary = async (locale: Locale) => {
  return dictionaries[locale]();
};

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>;
