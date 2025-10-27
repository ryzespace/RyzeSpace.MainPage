// src/app/[locale]/layout.tsx
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import type { Metadata } from 'next';
import Header from './components/Header';
import Footer from './components/Footer';
import { Providers } from '../providers';
import "../../styles/index.css";

export async function generateMetadata({
                                         params
                                       }: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = await params;

  const titles = {
    pl: 'RyzeSpace - Najlepsza platforma wynajmu serwerów',
    en: 'RyzeSpace - The Best Server Rental Platform',
    de: 'RyzeSpace - Die beste Server-Vermietungsplattform',
    ru: 'RyzeSpace - Лучшая платформа аренды серверов'
  };

  return {
    title: titles[locale as keyof typeof titles] || titles.pl,
    description: 'RyzeSpace - Twoja platforma wynajmu zasobów serwerowych 24/7',
  };
}

export default async function LocaleLayout({
                                             children,
                                             params
                                           }: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning className="scroll-smooth">
    <body className="dark:bg-black">
    <Providers>
      <NextIntlClientProvider messages={messages}>
        <Header />
        {children}
        <Footer />
      </NextIntlClientProvider>
    </Providers>
    </body>
    </html>
  );
}