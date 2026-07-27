'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { LanguageSwitcher } from '@/components/language-switcher';
import { AuthDialog } from '@/components/auth-dialog';
import { useLanguage } from '@/contexts/LanguageContext';
import { ChevronRight, Menu, Server, X } from 'lucide-react';
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetTrigger,
} from '@/components/ui/sheet';

type AuthMode = 'login' | 'register';

export function Header() {
    const { t } = useLanguage();
    const { resolvedTheme } = useTheme();

    const [authOpen, setAuthOpen] = useState(false);
    const [authMode, setAuthMode] = useState<AuthMode>('login');
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };

        handleScroll();
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { id: 'features', label: t.header.features },
        { id: 'calculator', label: t.header.pricing },
        { id: 'about', label: t.header.about },
        { id: 'contact', label: t.header.contact },
    ];

    const scrollToSection = (id: string) => {
        if (id === 'hero') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setMobileMenuOpen(false);
            return;
        }

        const element = document.getElementById(id);
        if (!element) return;

        const headerOffset = 104;
        const top =
            element.getBoundingClientRect().top + window.scrollY - headerOffset;

        window.scrollTo({
            top,
            behavior: 'smooth',
        });

        setMobileMenuOpen(false);
    };

    const openAuth = (mode: AuthMode) => {
        setAuthMode(mode);
        setAuthOpen(true);
        setMobileMenuOpen(false);
    };

    return (
        <>
            <header className="fixed inset-x-0 top-0 z-50">
                <div className="mx-auto w-full max-w-[1440px] px-3 pt-3 sm:px-6 sm:pt-4 lg:px-8">
                    <div
                        className={`relative overflow-hidden rounded-[26px] border transition-all duration-300 ${
                            scrolled
                                ? 'border-border/70 bg-background/84 shadow-[0_18px_40px_-24px_hsl(var(--foreground)/0.22)] backdrop-blur-xl'
                                : 'border-border/55 bg-background/76 shadow-[0_10px_28px_-22px_hsl(var(--foreground)/0.16)] backdrop-blur-lg'
                        }`}
                    >
                        <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />

                        <div className="flex h-[64px] items-center justify-between px-3 sm:h-[68px] sm:px-4 lg:grid lg:h-[74px] lg:grid-cols-[auto_1fr_auto] lg:gap-4 lg:px-6">
                            <button
                                type="button"
                                onClick={() => scrollToSection('hero')}
                                aria-label="Go to homepage"
                                className="flex items-center gap-3"
                            >
                                    <img
                                        src="/logo.png"
                                        alt="RyzeSpace"
                                        width={40}
                                        height={40}
                                    />
                                <span className="text-[15px] font-semibold tracking-tight text-foreground sm:text-base">
                  RyzeSpace
                </span>
                            </button>

                            <nav className="hidden lg:flex items-center justify-center gap-8">
                                {navItems.map((item) => (
                                    <button
                                        key={item.id}
                                        type="button"
                                        onClick={() => scrollToSection(item.id)}
                                        className="group relative py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                                    >
                                        {item.label}
                                        <span className="absolute inset-x-0 -bottom-[2px] h-px origin-left scale-x-0 bg-foreground/60 transition-transform duration-200 group-hover:scale-x-100" />
                                    </button>
                                ))}
                            </nav>

                            <div className="flex items-center gap-1.5 sm:gap-2">
                                <div className="hidden sm:flex items-center gap-1 rounded-2xl border border-border/50 bg-background/40 p-1 lg:rounded-none lg:border-0 lg:bg-transparent lg:p-0">
                                    <ThemeToggle />
                                    <LanguageSwitcher compact />
                                </div>

                                <div className="hidden md:flex lg:hidden items-center">
                                    <Button
                                        onClick={() => openAuth('register')}
                                        className="h-10 rounded-xl px-3.5 shadow-sm"
                                    >
                                        {t.header.register}
                                    </Button>
                                </div>

                                <div className="hidden lg:flex items-center gap-2">
                                    <Button
                                        variant="ghost"
                                        onClick={() => openAuth('login')}
                                        className="rounded-xl px-4 text-sm font-medium text-muted-foreground hover:text-foreground"
                                    >
                                        {t.header.login}
                                    </Button>

                                    <Button
                                        onClick={() => openAuth('register')}
                                        className="rounded-xl px-4 shadow-sm"
                                    >
                                        {t.header.register}
                                        <ChevronRight className="ml-1 h-4 w-4" />
                                    </Button>
                                </div>

                                <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                                    <SheetTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            aria-label="Open navigation menu"
                                            className="rounded-xl border border-border/60 bg-background/40 lg:hidden"
                                        >
                                            <Menu className="h-5 w-5" />
                                        </Button>
                                    </SheetTrigger>

                                    <SheetContent
                                        key={resolvedTheme ?? 'theme'}
                                        side="right"
                                        className="w-[92vw] max-w-[400px] border-l border-border bg-background p-0 shadow-[0_24px_80px_-28px_hsl(var(--foreground)/0.35)] [&>button]:hidden"
                                    >
                                        <div className="flex h-full flex-col bg-background">
                                            <div className="sticky top-0 z-10 border-b border-border bg-background px-4 py-4 sm:px-5">
                                                <div className="flex items-center justify-between gap-4">
                                                    <button
                                                        type="button"
                                                        onClick={() => scrollToSection('hero')}
                                                        className="flex items-center gap-3"
                                                    >
                                                        <div className="flex h-10 w-10 items-center justify-center rounded-[14px] border border-border/70 bg-muted/20 text-primary">
                                                            <Server className="h-5 w-5" />
                                                        </div>
                                                        <span className="text-sm font-semibold tracking-tight">
                              RyzeSpace
                            </span>
                                                    </button>

                                                    <SheetClose asChild>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="rounded-xl"
                                                            aria-label="Close navigation menu"
                                                        >
                                                            <X className="h-5 w-5" />
                                                        </Button>
                                                    </SheetClose>
                                                </div>
                                            </div>

                                            <div className="flex-1 overflow-y-auto px-4 py-4 sm:px-5 sm:py-5">
                                                <div className="overflow-hidden rounded-2xl border border-border bg-muted/20">
                                                    {navItems.map((item, index) => (
                                                        <button
                                                            key={item.id}
                                                            type="button"
                                                            onClick={() => scrollToSection(item.id)}
                                                            className={`group flex h-14 w-full items-center justify-between px-4 text-left transition-colors hover:bg-muted/40 ${
                                                                index !== navItems.length - 1
                                                                    ? 'border-b border-border'
                                                                    : ''
                                                            }`}
                                                        >
                              <span className="text-[15px] font-medium text-foreground">
                                {item.label}
                              </span>
                                                            <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5" />
                                                        </button>
                                                    ))}
                                                </div>

                                                <div className="mt-5 rounded-2xl border border-border bg-muted/20 p-3 sm:p-4">
                                                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-[auto_1fr] sm:items-center">
                                                        <div className="flex items-center justify-start">
                                                            <ThemeToggle />
                                                        </div>

                                                        <div className="min-w-0">
                                                            <LanguageSwitcher />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="border-t border-border bg-background p-4 pb-[calc(1rem+env(safe-area-inset-bottom))] sm:px-5">
                                                <div className="grid gap-2 sm:grid-cols-2">
                                                    <Button
                                                        variant="outline"
                                                        onClick={() => openAuth('login')}
                                                        className="h-11 w-full rounded-xl"
                                                    >
                                                        {t.header.login}
                                                    </Button>

                                                    <Button
                                                        onClick={() => openAuth('register')}
                                                        className="h-11 w-full rounded-xl"
                                                    >
                                                        {t.header.register}
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </SheetContent>
                                </Sheet>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <AuthDialog open={authOpen} onOpenChange={setAuthOpen} mode={authMode} />
        </>
    );
}