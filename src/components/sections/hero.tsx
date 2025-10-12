import type { Dictionary, Locale } from '@/lib/dictionaries';
import { Users, ChevronDown } from 'lucide-react';

type HeroSectionProps = {
    dictionary: Dictionary;
    lang: Locale;
};

export const HeroSection = ({ dictionary, lang }: HeroSectionProps) => {
    return (
        <section className="relative w-full min-h-screen flex items-center">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] py-12 md:py-20">
                    <div className="relative z-10 mx-auto max-w-3xl text-center">
                        <div className="mb-8 flex justify-center">
                            <div className="inline-flex items-center justify-center rounded-full bg-primary/10 p-4 backdrop-blur-sm">
                                <Users className="h-10 w-10 text-primary md:h-12 md:w-12" />
                            </div>
                        </div>
                        <h1 className="animate-fade-in-up font-headline text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
                            {dictionary.hero.title}
                        </h1>
                        <p
                            className="mx-auto mt-6 max-w-2xl animate-fade-in-up text-lg md:text-xl text-muted-foreground [animation-delay:0.2s] leading-relaxed"
                            style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}
                        >
                            {dictionary.hero.subtitle}
                        </p>
                    </div>

                    {/* Opcjonalny wskaźnik przewijania */}
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                        <ChevronDown className="h-8 w-8 text-muted-foreground/50" />
                    </div>
                </div>
            </div>

            {/* Opcjonalny gradient na dole dla płynnego przejścia */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background/20 to-transparent pointer-events-none" />
        </section>
    );
};