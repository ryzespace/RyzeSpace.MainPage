'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Card } from '@/components/ui/card';
import { Eye, Target, type LucideIcon } from 'lucide-react';

type AboutCardProps = {
    icon: LucideIcon;
    title: string;
    description: string;
};

function AboutCard({ icon: Icon, title, description }: AboutCardProps) {
    return (
        <Card className="group relative overflow-hidden rounded-3xl border border-border/70 bg-background p-6 shadow-[0_12px_32px_-24px_hsl(var(--foreground)/0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-24px_hsl(var(--foreground)/0.22)] sm:p-8">
            <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />

            <div className="space-y-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-border/70 bg-muted/25 text-primary transition-colors duration-300 group-hover:bg-primary/[0.06]">
                    <Icon className="h-5 w-5" />
                </div>

                <div className="space-y-2">
                    <h3 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                        {title}
                    </h3>
                    <p className="text-sm leading-7 text-muted-foreground sm:text-base">
                        {description}
                    </p>
                </div>
            </div>
        </Card>
    );
}

export function About() {
    const { t } = useLanguage();

    return (
        <section id="about" className="relative overflow-hidden bg-background py-24 sm:py-28 lg:py-32">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-t from-primary/5 to-transparent" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
                    <div className="space-y-5">
                        <div className="h-px w-16 bg-primary/40" />

                        <div className="space-y-4">
                            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
                                {t.about.title}
                            </h2>
                            <p className="max-w-xl text-lg leading-8 text-muted-foreground">
                                {t.about.subtitle}
                            </p>
                        </div>
                    </div>

                    <div className="space-y-6 sm:space-y-8">
                        <div className="rounded-3xl border border-border/70 bg-muted/[0.14] p-6 sm:p-8">
                            <p className="text-base leading-8 text-muted-foreground sm:text-lg">
                                {t.about.description}
                            </p>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2 lg:gap-5">
                            <AboutCard
                                icon={Target}
                                title={t.about.mission}
                                description={t.about.missionText}
                            />
                            <AboutCard
                                icon={Eye}
                                title={t.about.vision}
                                description={t.about.visionText}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}