import type { Dictionary, Locale } from '@/lib/dictionaries';
import { Users } from 'lucide-react';

type HeroSectionProps = {
  dictionary: Dictionary;
  lang: Locale;
};

export const HeroSection = ({ dictionary, lang }: HeroSectionProps) => {
  return (
    <section className="w-full">
      <div className="container mx-auto grid min-h-[calc(80vh-4rem)] items-center justify-center gap-4 px-4 text-center md:px-6">
        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <div className="mb-8 flex justify-center">
            <div className="inline-flex items-center justify-center rounded-full bg-primary/10 p-4">
              <Users className="h-10 w-10 text-primary" />
            </div>
          </div>
          <h1 className="animate-fade-in-up font-headline text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            {dictionary.hero.title}
          </h1>
          <p
            className="mx-auto mt-6 max-w-2xl animate-fade-in-up text-lg text-muted-foreground [animation-delay:0.2s]"
            style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}
          >
            {dictionary.hero.subtitle}
          </p>
        </div>
      </div>
    </section>
  );
};
