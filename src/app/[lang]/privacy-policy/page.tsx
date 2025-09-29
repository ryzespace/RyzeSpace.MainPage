import { getDictionary, Locale } from '@/lib/dictionaries';

export default async function PrivacyPolicyPage({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const dictionary = await getDictionary(lang);

  return (
    <div className="container mx-auto min-h-[calc(100vh-14rem)] max-w-4xl px-4 py-12 md:px-6 lg:py-16">
      <article className="prose prose-lg dark:prose-invert">
        <h1 className="font-headline">{dictionary.privacy.title}</h1>
        <p>{dictionary.privacy.content}</p>
        <p>1. Information We Collect...</p>
        <p>2. How We Use Your Information...</p>
        <p>3. Data Security...</p>
        <p>4. Your Rights...</p>
      </article>
    </div>
  );
}
