import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { getDictionary, Locale } from '@/lib/dictionaries';

export default async function LangLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  const dictionary = await getDictionary(lang);

  return (
    <div className="font-body antialiased">
      <div className="container mx-auto px-4 md:px-6">
        <Header dictionary={dictionary} lang={lang} />
      </div>
      <main>{children}</main>
      <Footer dictionary={dictionary} lang={lang} />
    </div>
  );
}
