import { NextIntlClientProvider } from "next-intl";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

export const dynamic = "force-dynamic";

export default async function LocaleLayout({ children, params: { locale } }) {
  let messages = {};
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch {}

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <Header />
      {children}
      <Footer />
      <ScrollToTop />
    </NextIntlClientProvider>
  );
}
