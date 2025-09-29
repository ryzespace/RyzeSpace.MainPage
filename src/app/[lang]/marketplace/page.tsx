import { getDictionary, Locale } from '@/lib/dictionaries';
import { LoginWall } from '@/components/marketplace/login-wall';
import { Construction } from 'lucide-react';

export default async function MarketplacePage({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const dictionary = await getDictionary(lang);

  // In a real app, you'd check for a user session here.
  const isLoggedIn = true;

  return (
    <div className="container mx-auto min-h-[calc(100vh-14rem)] px-4 py-12 md:px-6 lg:py-24">
      {isLoggedIn ? (
        <div className="space-y-12">
          <div className="text-center">
            <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl">
              {dictionary.marketplace.title}
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              {dictionary.marketplace.subtitle}
            </p>
          </div>
          <div className="flex flex-col items-center justify-center space-y-4 rounded-lg border-2 border-dashed border-muted bg-background p-12 text-center">
            <Construction className="h-16 w-16 text-muted-foreground" />
            <p className="text-xl font-medium text-muted-foreground">
              {dictionary.marketplace.comingSoon}
            </p>
          </div>
        </div>
      ) : (
        <LoginWall dictionary={dictionary} />
      )}
    </div>
  );
}
