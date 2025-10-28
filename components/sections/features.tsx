'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Card } from '@/components/ui/card';
import { Zap, Maximize, Shield, Globe, Lock, Headphones } from 'lucide-react';

export function Features() {
  const { t } = useLanguage();

  const features = [
    {
      icon: Zap,
      title: t.features.feature1Title,
      description: t.features.feature1Desc,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/10',
    },
    {
      icon: Maximize,
      title: t.features.feature2Title,
      description: t.features.feature2Desc,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
    },
    {
      icon: Shield,
      title: t.features.feature3Title,
      description: t.features.feature3Desc,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
    },
    {
      icon: Globe,
      title: t.features.feature4Title,
      description: t.features.feature4Desc,
      color: 'text-cyan-500',
      bgColor: 'bg-cyan-500/10',
    },
    {
      icon: Lock,
      title: t.features.feature5Title,
      description: t.features.feature5Desc,
      color: 'text-red-500',
      bgColor: 'bg-red-500/10',
    },
    {
      icon: Headphones,
      title: t.features.feature6Title,
      description: t.features.feature6Desc,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
    },
  ];

  return (
    <section id="features" className="py-24 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            {t.features.title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t.features.subtitle}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="p-8 space-y-4 border-2 hover:border-primary transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group"
                style={{
                  animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`,
                }}
              >
                <div className={`h-14 w-14 rounded-2xl ${feature.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <Icon className={`h-7 w-7 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-bold">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
