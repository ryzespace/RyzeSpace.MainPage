import { getDictionary, Locale } from '@/lib/dictionaries';

export default async function RegulationsPage({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const dictionary = await getDictionary(lang);

  return (
    <div className="container mx-auto min-h-[calc(100vh-14rem)] max-w-4xl px-4 py-12 md:px-6 lg:py-16">
      <article className="prose prose-lg dark:prose-invert">
        <h1 className="font-headline">{dictionary.regulations.title}</h1>
        <p>{dictionary.regulations.content}</p>
        <p>1. General Provisions...</p>
        <p>2. Service Specifications...</p>
        <p>3. Payment and Billing...</p>
        <p>4. Compliance...</p>
      </article>
    </div>
  );
}
