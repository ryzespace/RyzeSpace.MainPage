'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Card } from '@/components/ui/card';
import { Target, Eye } from 'lucide-react';

export function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-24 sm:py-32 bg-accent/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            {t.about.title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t.about.subtitle}
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          <p className="text-lg text-center text-muted-foreground leading-relaxed">
            {t.about.description}
          </p>

          <div className="grid md:grid-cols-2 gap-8 pt-8">
            <Card className="p-8 space-y-4 border-2 hover:border-primary transition-colors group">
              <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Target className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-2xl font-bold">{t.about.mission}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {t.about.missionText}
              </p>
            </Card>

            <Card className="p-8 space-y-4 border-2 hover:border-primary transition-colors group">
              <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Eye className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-2xl font-bold">{t.about.vision}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {t.about.visionText}
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
