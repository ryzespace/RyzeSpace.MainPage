'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { Locale } from '@/lib/dictionaries';

type Language = {
  code: Locale;
  name: string;
  flag: string;
};

const languages: Language[] = [
  { code: 'en', name: 'English', flag: '/images/flags/gb.svg' },
  { code: 'pl', name: 'Polski', flag: '/images/flags/pl.svg' },
  { code: 'de', name: 'Deutsch', flag: '/images/flags/de.svg' },
  { code: 'es', name: 'Español', flag: '/images/flags/es.svg' },
  { code: 'fr', name: 'Français', flag: '/images/flags/fr.svg' },
  { code: 'ru', name: 'Русский', flag: '/images/flags/ru.svg' },
];

export function LanguageSwitcher({ lang }: { lang: Locale }) {
  const pathname = usePathname();
  const currentLanguage = languages.find((l) => l.code === lang);

  const getRedirectedPath = (locale: string) => {
    if (!pathname) return '/';
    const segments = pathname.split('/');
    segments[1] = locale;
    return segments.join('/');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center gap-2 rounded-full"
        >
          {currentLanguage && (
            <Image
              src={currentLanguage.flag}
              alt={currentLanguage.name}
              width={20}
              height={15}
              className="h-auto w-5"
            />
          )}
          <span className="uppercase">{lang}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((language) => (
          <DropdownMenuItem key={language.code} asChild>
            <Link
              href={getRedirectedPath(language.code)}
              className="flex items-center gap-2"
            >
              <Image
                src={language.flag}
                alt={language.name}
                width={20}
                height={15}
                className="h-auto w-5"
              />
              <span>{language.name}</span>
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
