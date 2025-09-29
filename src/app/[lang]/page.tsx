import { getDictionary, Locale } from '@/lib/dictionaries';
import { HeroSection } from '@/components/sections/hero';
import { FeaturesSection } from '@/components/sections/features';

export default async function Home({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const dictionary = await getDictionary(lang);

  return (
    <div className="flex min-h-[100dvh] flex-col">
      <HeroSection dictionary={dictionary} lang={lang} />
      <FeaturesSection dictionary={dictionary} />
    </div>
  );
}
