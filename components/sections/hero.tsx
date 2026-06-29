'use client';

import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import {
    ArrowRight,
    Cpu,
    Globe2,
    ShieldCheck,
    Activity,
    ChevronRight,
} from 'lucide-react';

const metrics = [
    { value: '99.95%', label: 'Availability' },
    { value: '< 90s', label: 'Provisioning' },
    { value: '50+', label: 'Regions' },
];

const infrastructureHighlights = [
    {
        icon: Cpu,
        label: 'Compute',
        value: 'Dedicated & shared profiles',
    },
    {
        icon: Globe2,
        label: 'Network',
        value: 'Low-latency global routing',
    },
    {
        icon: ShieldCheck,
        label: 'Security',
        value: 'Isolated workloads by default',
    },
    {
        icon: Activity,
        label: 'Operations',
        value: 'Continuous monitoring and support',
    },
];

export function Hero() {
    const { t } = useLanguage();

    const scrollToSection = (id: string) => {
        if (id === 'hero') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
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
    };

    return (
        <section
            id="hero"
            className="relative overflow-hidden bg-background pb-20 pt-32 sm:pb-24 sm:pt-36 lg:pb-28 lg:pt-44"
        >
            <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,hsl(var(--muted-foreground)/0.03)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--muted-foreground)/0.03)_1px,transparent_1px)] bg-[size:5rem_5rem]" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />
            <div className="pointer-events-none absolute left-[12%] top-[18%] -z-10 h-72 w-72 rounded-full bg-primary/8 blur-[120px]" />
            <div className="pointer-events-none absolute right-[10%] top-[28%] -z-10 h-80 w-80 rounded-full bg-primary/5 blur-[140px]" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid items-center gap-14 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16">
                    {/* Content */}
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center rounded-full border border-border/70 bg-muted/20 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                            Infrastructure Systems
                        </div>

                        <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                            <span className="block text-foreground">{t.hero.title}</span>
                            <span className="mt-2 block text-foreground/80">
                {t.hero.subtitle}
              </span>
                        </h1>

                        <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">
                            {t.hero.description}
                        </p>

                        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                            <Button
                                size="lg"
                                className="h-12 rounded-xl px-6"
                                onClick={() => scrollToSection('calculator')}
                            >
                                {t.hero.cta}
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>

                            <Button
                                size="lg"
                                variant="outline"
                                className="h-12 rounded-xl px-6"
                                onClick={() => scrollToSection('features')}
                            >
                                {t.hero.learnMore}
                            </Button>
                        </div>

                        <div className="mt-10 grid gap-3 sm:grid-cols-3">
                            {metrics.map((item) => (
                                <div
                                    key={item.label}
                                    className="rounded-2xl border border-border/70 bg-background/80 p-4 shadow-[0_10px_24px_-20px_hsl(var(--foreground)/0.18)]"
                                >
                                    <p className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                                        {item.value}
                                    </p>
                                    <p className="mt-1 text-sm text-muted-foreground">
                                        {item.label}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Side Panel */}
                    <div className="lg:pl-4">
                        <div className="relative overflow-hidden rounded-[28px] border border-border/70 bg-background/90 p-6 shadow-[0_18px_40px_-24px_hsl(var(--foreground)/0.2)] backdrop-blur-sm sm:p-8">
                            <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />

                            <div className="flex items-center justify-between gap-4">
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                                        Deployment Overview
                                    </p>
                                    <h2 className="mt-2 text-xl font-semibold tracking-tight text-foreground">
                                        Production-ready infrastructure
                                    </h2>
                                </div>

                                <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-muted/20 px-3 py-1 text-xs font-medium text-foreground/80">
                                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                                    Online
                                </div>
                            </div>

                            <div className="mt-8 grid gap-3 sm:grid-cols-2">
                                {infrastructureHighlights.map((item) => {
                                    const Icon = item.icon;

                                    return (
                                        <div
                                            key={item.label}
                                            className="rounded-2xl border border-border/70 bg-muted/[0.14] p-4 transition-colors hover:bg-muted/[0.2]"
                                        >
                                            <div className="flex items-start justify-between gap-3">
                                                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border/70 bg-background text-primary">
                                                    <Icon className="h-4 w-4" />
                                                </div>

                                                <ChevronRight className="mt-1 h-4 w-4 text-muted-foreground" />
                                            </div>

                                            <div className="mt-4">
                                                <p className="text-sm font-semibold text-foreground">
                                                    {item.label}
                                                </p>
                                                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                                                    {item.value}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="mt-8 rounded-2xl border border-border/70 bg-muted/[0.12] p-5">
                                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                                    <div>
                                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                                            Provisioning Profile
                                        </p>
                                        <p className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
                                            Balanced performance, predictable scaling
                                        </p>
                                    </div>

                                    <div className="shrink-0">
                                        <p className="text-sm text-muted-foreground">Operational SLA</p>
                                        <p className="text-lg font-semibold text-foreground">99.95%</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* End Side Panel */}
                </div>
            </div>
        </section>
    );
}