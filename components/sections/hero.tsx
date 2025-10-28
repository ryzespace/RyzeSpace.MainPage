'use client';

import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowRight, Sparkles } from 'lucide-react';

export function Hero() {
  const { t } = useLanguage();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-accent/20"
    >
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-[40rem] w-[40rem] bg-primary/30 rounded-full blur-[120px] animate-pulse" />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="flex flex-col items-center text-center space-y-8 max-w-5xl mx-auto">
          <div className="inline-flex items-center space-x-2 bg-accent/50 backdrop-blur-sm rounded-full px-4 py-2 border animate-fade-in">
            <Sparkles className="h-4 w-4 text-primary animate-pulse" />
            <span className="text-sm font-medium">Cloud Infrastructure on Demand</span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight animate-slide-up">
            <span className="block">{t.hero.title}</span>
            <span className="block bg-gradient-to-r from-primary via-blue-500 to-cyan-500 bg-clip-text text-transparent animate-gradient">
              {t.hero.subtitle}
            </span>
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-3xl animate-slide-up-delay">
            {t.hero.description}
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 animate-fade-in-delay">
            <Button size="lg" className="text-lg px-8 h-12 group" onClick={() => scrollToSection('calculator')}>
              {t.hero.cta}
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 h-12" onClick={() => scrollToSection('features')}>
              {t.hero.learnMore}
            </Button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 pt-16 w-full max-w-4xl">
            {[
              { value: '99.9%', label: 'Uptime' },
              { value: '50+', label: 'Regions' },
              { value: '10k+', label: 'Customers' },
              { value: '24/7', label: 'Support' },
            ].map((stat, index) => (
              <div
                key={index}
                className="flex flex-col items-center space-y-2 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="h-12 w-6 border-2 border-primary/50 rounded-full flex items-start justify-center p-2">
          <div className="h-2 w-2 bg-primary rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
}
