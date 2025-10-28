'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, defaultLanguage, getTranslation } from '@/lib/i18n';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: ReturnType<typeof getTranslation>;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(defaultLanguage);
  const [t, setT] = useState(getTranslation(defaultLanguage));

  useEffect(() => {
    const saved = localStorage.getItem('language') as Language;
    if (saved && ['en', 'pl', 'ru', 'de'].includes(saved)) {
      setLanguageState(saved);
      setT(getTranslation(saved));
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    setT(getTranslation(lang));
    localStorage.setItem('language', lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
