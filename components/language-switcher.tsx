'use client';

import { Check, ChevronDown } from 'lucide-react';
import { DE, GB, PL, RU } from 'country-flag-icons/react/3x2';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

const languages = {
    pl: {
        label: 'Polski',
        short: 'PL',
        Flag: PL,
    },
    en: {
        label: 'English',
        short: 'EN',
        Flag: GB,
    },
    de: {
        label: 'Deutsch',
        short: 'DE',
        Flag: DE,
    },
    ru: {
        label: 'Русский',
        short: 'RU',
        Flag: RU,
    },
} as const;

export type LanguageKey = keyof typeof languages;

type LanguageSwitcherProps = {
    compact?: boolean;
};

export function LanguageSwitcher({
                                     compact = false,
                                 }: LanguageSwitcherProps) {
    const { language, setLanguage } = useLanguage() as {
        language: LanguageKey;
        setLanguage: (value: LanguageKey) => void;
    };

    const current = languages[language] ?? languages.en;
    const CurrentFlag = current.Flag;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className={cn(
                        'h-10 rounded-xl border border-transparent bg-transparent hover:border-border/60 hover:bg-muted/25',
                        compact ? 'gap-2 px-2.5' : 'w-full justify-between px-3'
                    )}
                >
          <span className="flex items-center gap-2">
            <span className="overflow-hidden rounded-[4px] ring-1 ring-border/60">
              <CurrentFlag className="h-4 w-5" />
            </span>

            <span className="text-sm font-medium text-foreground">
              {compact ? current.short : current.label}
            </span>
          </span>

                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                align={compact ? 'end' : 'start'}
                className="min-w-[190px] rounded-xl border-border/70 p-1"
            >
                {(Object.entries(languages) as [
                    LanguageKey,
                    (typeof languages)[LanguageKey]
                ][]).map(([key, item]) => {
                    const Flag = item.Flag;
                    const active = key === language;

                    return (
                        <DropdownMenuItem
                            key={key}
                            onClick={() => setLanguage(key)}
                            className="flex items-center justify-between rounded-lg px-2.5 py-2"
                        >
              <span className="flex items-center gap-3">
                <span className="overflow-hidden rounded-[4px] ring-1 ring-border/60">
                  <Flag className="h-4 w-5" />
                </span>
                <span className="text-sm font-medium">{item.label}</span>
              </span>

                            <Check
                                className={cn(
                                    'h-4 w-4 transition-opacity',
                                    active ? 'opacity-100' : 'opacity-0'
                                )}
                            />
                        </DropdownMenuItem>
                    );
                })}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}