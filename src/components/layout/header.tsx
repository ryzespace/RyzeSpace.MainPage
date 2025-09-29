'use client';

import Link from 'next/link';
import { Menu, Users } from 'lucide-react';

import type { Dictionary, Locale } from '@/lib/dictionaries';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { LanguageSwitcher } from './language-switcher';
import { RyzeSpaceLogo } from '../ryze-space-logo';

type HeaderProps = {
  dictionary: Dictionary;
  lang: Locale;
};

export function Header({ dictionary, lang }: HeaderProps) {
  const navLinks = [
    { href: '#about', label: dictionary.header.about },
    { href: '#features', label: dictionary.header.features },
    { href: `/${lang}/marketplace`, label: dictionary.header.marketplace },
  ];

  return (
    <header className="relative z-50 my-4 flex h-16 w-full items-center justify-between gap-4 rounded-full border border-primary/20 bg-background/80 px-6 backdrop-blur-sm">
      <div className="flex items-center">
        <Link
          href={`/${lang}`}
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <RyzeSpaceLogo className="h-6 w-auto text-primary" />
          <span className="sr-only">RyzeSpace</span>
        </Link>
      </div>

      <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-foreground/80 transition-colors hover:text-foreground"
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href={`/${lang}`}
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <RyzeSpaceLogo className="h-6 w-auto text-primary" />
              <span className="sr-only">RyzeSpace</span>
            </Link>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-muted-foreground hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>

      <div className="flex items-center justify-end gap-4">
        <LanguageSwitcher lang={lang} />
        <Button
          variant="ghost"
          size="sm"
          className="hidden rounded-full md:inline-flex"
        >
          <Users className="mr-2 h-4 w-4" />
          {dictionary.header.signIn}
        </Button>
      </div>
    </header>
  );
}
