'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Card } from '@/components/ui/card';
import {
    Zap,
    Maximize,
    Shield,
    Globe,
    Lock,
    Headphones,
    type LucideIcon,
    ArrowUpRight
} from 'lucide-react';

type FeatureItem = {
    icon: LucideIcon;
    titleKey: string;
    descKey: string;
    index: string;
};

export function Features() {
    const { t } = useLanguage();

    const features: FeatureItem[] = [
        {
            icon: Zap,
            titleKey: t.features.feature1Title,
            descKey: t.features.feature1Desc,
            index: '01',
        },
        {
            icon: Maximize,
            titleKey: t.features.feature2Title,
            descKey: t.features.feature2Desc,
            index: '02',
        },
        {
            icon: Shield,
            titleKey: t.features.feature3Title,
            descKey: t.features.feature3Desc,
            index: '03',
        },
        {
            icon: Globe,
            titleKey: t.features.feature4Title,
            descKey: t.features.feature4Desc,
            index: '04',
        },
        {
            icon: Lock,
            titleKey: t.features.feature5Title,
            descKey: t.features.feature5Desc,
            index: '05',
        },
        {
            icon: Headphones,
            titleKey: t.features.feature6Title,
            descKey: t.features.feature6Desc,
            index: '06',
        },
    ];

    return (
        <section id="features" className="relative overflow-hidden bg-background py-24 sm:py-28 lg:py-32">
            {/* Subtelne tło dekoracyjne przypominające siatkę laboratoryjną */}
            <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,hsl(var(--muted-foreground)/0.03)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--muted-foreground)/0.03)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />
            <div className="pointer-events-none absolute left-1/3 top-1/4 -z-10 h-96 w-96 rounded-full bg-primary/5 blur-[128px]" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Nagłówek sekcji */}
                <div className="mb-16 md:mb-20 max-w-3xl">
                    <div className="mb-4 h-px w-16 bg-primary/40" />
                    <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary">
            System Specifications
          </span>
                    <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
                        {t.features.title}
                    </h2>
                    <p className="mt-4 text-lg leading-8 text-muted-foreground">
                        {t.features.subtitle}
                    </p>
                </div>

                {/* Siatka możliwości */}
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
                    {features.map((feature) => {
                        const Icon = feature.icon;
                        return (
                            <Card
                                key={feature.index}
                                className="group relative overflow-hidden rounded-[24px] border border-border/70 bg-background p-6 shadow-[0_12px_32px_-24px_hsl(var(--foreground)/0.18)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-[0_20px_40px_-20px_hsl(var(--foreground)/0.25)] sm:p-8"
                            >
                                {/* Górny akcent na hover */}
                                <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-foreground/5 to-transparent transition-all duration-300 group-hover:via-primary/30" />

                                <div className="flex h-full flex-col justify-between gap-8">
                                    <div className="space-y-6">
                                        {/* Górna linia z indeksem i ikoną */}
                                        <div className="flex items-center justify-between">
                                            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-border/70 bg-muted/20 text-muted-foreground transition-all duration-300 group-hover:border-primary/20 group-hover:bg-primary/[0.05] group-hover:text-primary">
                                                <Icon className="h-5 w-5 transition-transform duration-300 group-hover:scale-105" />
                                            </div>
                                            <span className="text-[11px] font-mono tracking-widest text-muted-foreground/60">
                        [{feature.index}]
                      </span>
                                        </div>

                                        {/* Treść */}
                                        <div className="space-y-2">
                                            <h3 className="text-lg font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary sm:text-xl">
                                                {feature.titleKey}
                                            </h3>
                                            <p className="text-sm leading-7 text-muted-foreground sm:text-base">
                                                {feature.descKey}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Dolna mikro-interakcja (tech-vibe) */}
                                    <div className="flex items-center gap-1.5 pt-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground/60 transition-colors group-hover:text-primary">
                                        <span>Specifications</span>
                                        <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                    </div>
                                </div>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}