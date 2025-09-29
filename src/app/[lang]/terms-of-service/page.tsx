import { getDictionary, Locale } from '@/lib/dictionaries';

export default async function TermsOfServicePage({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const dictionary = await getDictionary(lang);

  return (
    <div className="container mx-auto min-h-[calc(100vh-14rem)] max-w-4xl px-4 py-12 md:px-6 lg:py-16">
      <article className="prose prose-lg dark:prose-invert">
        <h1 className="font-headline">{dictionary.terms.title}</h1>
        <p>{dictionary.terms.content}</p>
        <p>1. Introduction...</p>
        <p>2. User Accounts...</p>
        <p>3. Prohibited Activities...</p>
        <p>4. Termination...</p>
      </article>
    </div>
  );
}
