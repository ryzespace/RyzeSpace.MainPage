// app/[locale]/layout.tsx
import { NextIntlClientProvider } from "next-intl";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import React from "react";

export const dynamic = "force-dynamic";

export default async function LocaleLayout({
                                             children,
                                             params: { locale },
                                           }: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = (await import(`../../messages/${locale}.json`)).default;

  return (
    <html lang={locale}>
    <body>
    <NextIntlClientProvider locale={locale} messages={messages}>
      <Header />
      <main>{children}</main>
      <Footer />
    </NextIntlClientProvider>
    </body>
    </html>
  );
}