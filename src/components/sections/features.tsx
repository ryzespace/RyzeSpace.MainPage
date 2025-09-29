import Link from 'next/link';
import { MessageSquare, Code, Github } from 'lucide-react';

import type { Dictionary } from '@/lib/dictionaries';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

type FeaturesSectionProps = {
  dictionary: Dictionary;
};

export const FeaturesSection = ({ dictionary }: FeaturesSectionProps) => {
  const features = [
    {
      icon: <MessageSquare className="h-8 w-8 text-primary" />,
      title: dictionary.features.cards.discord.title,
      description: dictionary.features.cards.discord.description,
      href: '#',
      cta: dictionary.features.cards.discord.cta,
    },
    {
      icon: <Code className="h-8 w-8 text-primary" />,
      title: dictionary.features.cards.sdk.title,
      description: dictionary.features.cards.sdk.description,
      href: '#',
      cta: dictionary.features.cards.sdk.cta,
    },
    {
      icon: <Github className="h-8 w-8 text-primary" />,
      title: dictionary.features.cards.github.title,
      description: dictionary.features.cards.github.description,
      href: '#',
      cta: dictionary.features.cards.github.cta,
    },
  ];

  return (
    <section id="features" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto mt-12 grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:grid-cols-3 md:gap-12">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="flex h-full transform-gpu flex-col bg-card transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/20"
            >
              <CardHeader>
                {feature.icon}
                <CardTitle className="pt-4 font-headline text-2xl">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-grow flex-col">
                <CardDescription className="flex-grow">
                  {feature.description}
                </CardDescription>
                <div className="mt-6">
                  <Button asChild variant="outline" className="w-full">
                    <Link href={feature.href}>{feature.cta}</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
