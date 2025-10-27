// components/Header/menuData.tsx
import { Menu } from "@/types/menu";

export const createMenuData = (t: any, locale: string): Menu[] => [
  {
    id: 1,
    title: t('menu.home'),
    path: `/${locale}#home`,  // ← scroll do sekcji
    newTab: false,
  },
  {
    id: 2,
    title: t('menu.about'),
    path: `/${locale}#about`,  // ← scroll do sekcji
    newTab: false,
  },
  {
    id: 3,
    title: t('menu.support'),
    path: `/${locale}#contact`,  // ← scroll do sekcji
    newTab: false,
  },
];