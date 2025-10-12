import Link from 'next/link';
import { MessageSquare, Code, Github, Shield, Cpu, Network, Gauge } from 'lucide-react';

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
    const communityFeatures = [
        {
            icon: <MessageSquare className="h-8 w-8 text-primary" />,
            title: dictionary.features.cards.discord.title,
            description: dictionary.features.cards.discord.description,
            href: 'https://discord.gg/6Pv8KBza',
            cta: dictionary.features.cards.discord.cta,
        },
        {
            icon: <Code className="h-8 w-8 text-primary" />,
            title: dictionary.features.cards.sdk.title,
            description: dictionary.features.cards.sdk.description,
            href: 'https://github.com/ryzespace-SDK',
            cta: dictionary.features.cards.sdk.cta,
        },
        {
            icon: <Github className="h-8 w-8 text-primary" />,
            title: dictionary.features.cards.github.title,
            description: dictionary.features.cards.github.description,
            href: 'https://github.com/ryzespace',
            cta: dictionary.features.cards.github.cta,
        },
    ];

    const technicalFeatures = [
        {
            icon: <Shield className="h-8 w-8 text-primary" />,
            title: "Bezpieczeństwo i Izolacja",
            description: "Wykorzystujemy konteneryzację i najnowsze techniki sandboksingu, aby zapewnić pełną izolację zasobów i bezpieczeństwo Twoich danych.",
        },
        {
            icon: <Cpu className="h-8 w-8 text-primary" />,
            title: "Dostęp do Mocy Obliczeniowej",
            description: "Udostępniaj i korzystaj z mocy obliczeniowej dla złożonych zadań, takich jak renderowanie grafiki 3D, uczenie maszynowe czy analiza danych.",
        },
        {
            icon: <Network className="h-8 w-8 text-primary" />,
            title: "Zdecentralizowana Sieć",
            description: "Działamy w oparciu o zdecentralizowaną architekturę, w której zasoby użytkowników są rozproszone i zarządzane w sieci. Eliminujemy pojedyncze punkty awarii bez użycia blockchaina.",
        },
        {
            icon: <Gauge className="h-8 w-8 text-primary" />,
            title: "Elastyczność i Skalowalność",
            description: "RyzeSpace pozwala na dynamiczne skalowanie zasobów w zależności od potrzeb, oferując elastyczność nieosiągalną w tradycyjnych modelach.",
        },
    ];

    return (
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-background">
            <div className="container mx-auto px-4 md:px-6">
                {/* Sekcja Misji */}
                <div className="mx-auto max-w-4xl text-center mb-16 md:mb-24">
                    <h2 className="font-headline text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                        Nasza Misja
                    </h2>
                    <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
                        <p>
                            W erze cyfrowej miliardy urządzeń dysponują ogromną, niewykorzystaną mocą obliczeniową.
                            Serwery, komputery i macierze danych często pracują na ułamek swoich możliwości.
                            RyzeSpace powstało, aby przekształcić to marnotrawstwo w nową, zdecentralizowaną gospodarkę zasobów.
                        </p>
                        <p className="font-medium text-foreground">
                            Naszą misją jest stworzenie otwartej, bezpiecznej i wydajnej platformy, która połączy dostawców
                            niewykorzystanej mocy z użytkownikami, którzy jej potrzebują. Budujemy rynek, na którym każdy może
                            zarabiać na swoich zasobach lub uzyskać dostęp do potężnej infrastruktury za ułamek kosztów
                            tradycyjnych rozwiązań chmurowych.
                        </p>
                    </div>
                </div>

                {/* Sekcja Kluczowych Cech */}
                <div className="mb-16">
                    <h3 className="font-headline text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-4">
                        Kluczowe Cechy
                    </h3>
                    <p className="text-center text-muted-foreground text-lg max-w-3xl mx-auto mb-12">
                        Odkryj fundamenty, na których budujemy przyszłość współdzielenia zasobów.
                        Każda funkcja została zaprojektowana z myślą o bezpieczeństwie, wydajności i decentralizacji.
                    </p>

                    <div className="mx-auto mt-12 grid max-w-6xl items-start gap-8 sm:grid-cols-2 lg:grid-cols-4 md:gap-6">
                        {technicalFeatures.map((feature, index) => (
                            <Card
                                key={index}
                                className="flex h-full transform-gpu flex-col bg-card transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/20"
                            >
                                <CardHeader>
                                    <div className="mb-4 rounded-lg bg-primary/10 w-fit p-3">
                                        {feature.icon}
                                    </div>
                                    <CardTitle className="font-headline text-xl">
                                        {feature.title}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="flex flex-grow flex-col">
                                    <CardDescription className="flex-grow leading-relaxed">
                                        {feature.description}
                                    </CardDescription>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Sekcja Społeczności */}
                <div className="mt-24">
                    <h3 className="font-headline text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-4">
                        Dołącz do Społeczności
                    </h3>
                    <p className="text-center text-muted-foreground text-lg max-w-3xl mx-auto mb-12">
                        Bądź częścią rewolucji w świecie współdzielenia zasobów. Poznaj narzędzia i dołącz do naszej rosnącej społeczności.
                    </p>

                    <div className="mx-auto mt-12 grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:grid-cols-3 md:gap-12">
                        {communityFeatures.map((feature, index) => (
                            <Card
                                key={index}
                                className="flex h-full transform-gpu flex-col bg-card transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/20"
                            >
                                <CardHeader>
                                    <div className="mb-4 rounded-lg bg-primary/10 w-fit p-3">
                                        {feature.icon}
                                    </div>
                                    <CardTitle className="font-headline text-2xl">
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
            </div>
        </section>
    );
};