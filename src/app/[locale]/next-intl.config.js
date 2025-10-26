/** @type {import('next-intl').NextIntlConfig} */
module.exports = {
  locales: ["en", "pl", "ru", "de"], // lista obsługiwanych języków
  defaultLocale: "pl",
  // folder, w którym masz pliki JSON z tłumaczeniami
  messagesDirectory: "./public/locales/messages",
};
