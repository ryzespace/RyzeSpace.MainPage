import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['pl', 'en', 'ru', 'de'],
  defaultLocale: 'pl'
});

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
};
