export const languages = {
  en: 'English',
  pl: 'Polski',
  ru: 'Русский',
  de: 'Deutsch'
} as const;

export type Language = keyof typeof languages;

export const defaultLanguage: Language = 'en';

export const translations = {
  en: {
    header: {
      features: 'Features',
      pricing: 'Calculator',
      about: 'About Us',
      contact: 'Contact',
      login: 'Log In',
      register: 'Sign Up'
    },
    hero: {
      title: 'Enterprise Server Resources',
      subtitle: 'On Demand',
      description: 'Scale your infrastructure instantly with our cloud-based server rental platform. Pay only for what you use.',
      cta: 'Get Started',
      learnMore: 'Learn More'
    },
    about: {
      title: 'About Us',
      subtitle: 'Building the Future of Cloud Infrastructure',
      description: 'We provide cutting-edge server rental solutions for businesses of all sizes. Our platform offers flexibility, reliability, and performance at competitive prices.',
      mission: 'Our Mission',
      missionText: 'To democratize access to enterprise-grade computing resources.',
      vision: 'Our Vision',
      visionText: 'A world where every business has the infrastructure it needs to succeed.'
    },
    features: {
      title: 'Features',
      subtitle: 'Everything You Need',
      feature1Title: 'Instant Deployment',
      feature1Desc: 'Deploy servers in seconds with our automated infrastructure.',
      feature2Title: 'Flexible Scaling',
      feature2Desc: 'Scale resources up or down based on your needs.',
      feature3Title: '99.9% Uptime',
      feature3Desc: 'Enterprise-grade reliability you can count on.',
      feature4Title: 'Global Network',
      feature4Desc: 'Deploy across multiple regions worldwide.',
      feature5Title: 'Advanced Security',
      feature5Desc: 'Military-grade encryption and DDoS protection.',
      feature6Title: '24/7 Support',
      feature6Desc: 'Expert support team available around the clock.'
    },
    calculator: {
      title: 'Server Calculator',
      subtitle: 'Estimate Your Monthly Costs',
      cpu: 'CPU Cores',
      ram: 'RAM (GB)',
      storage: 'Storage (GB)',
      bandwidth: 'Bandwidth (TB)',
      estimated: 'Estimated Monthly Cost',
      calculate: 'Calculate'
    },
    contact: {
      title: 'Get In Touch',
      subtitle: 'We\'d Love to Hear From You',
      newsletter: 'Subscribe to Newsletter',
      newsletterDesc: 'Get the latest updates and offers',
      emailPlaceholder: 'Enter your email',
      subscribe: 'Subscribe',
      contactForm: 'Contact Form',
      name: 'First Name',
      surname: 'Last Name',
      email: 'Email',
      message: 'Message',
      send: 'Send Message'
    },
    footer: {
      description: 'Enterprise server resources on demand. Scale your infrastructure instantly.',
      product: 'Product',
      company: 'Company',
      support: 'Support',
      rights: 'All rights reserved.'
    },
    auth: {
      login: 'Log In',
      register: 'Sign Up',
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      orContinue: 'Or continue with',
      hasAccount: 'Already have an account?',
      noAccount: 'Don\'t have an account?',
      forgotPassword: 'Forgot password?'
    }
  },
  pl: {
    header: {
      features: 'Funkcje',
      pricing: 'Kalkulator',
      about: 'O Nas',
      contact: 'Kontakt',
      login: 'Zaloguj',
      register: 'Zarejestruj'
    },
    hero: {
      title: 'Zasoby Serwerowe',
      subtitle: 'Na Żądanie',
      description: 'Skaluj swoją infrastrukturę natychmiast z naszą platformą wynajmu serwerów. Płać tylko za to, czego używasz.',
      cta: 'Rozpocznij',
      learnMore: 'Dowiedz się więcej'
    },
    about: {
      title: 'O Nas',
      subtitle: 'Budujemy Przyszłość Infrastruktury Chmurowej',
      description: 'Zapewniamy najnowocześniejsze rozwiązania wynajmu serwerów dla firm każdej wielkości. Nasza platforma oferuje elastyczność, niezawodność i wydajność w konkurencyjnych cenach.',
      mission: 'Nasza Misja',
      missionText: 'Demokratyzacja dostępu do zasobów obliczeniowych klasy korporacyjnej.',
      vision: 'Nasza Wizja',
      visionText: 'Świat, w którym każda firma ma infrastrukturę potrzebną do sukcesu.'
    },
    features: {
      title: 'Funkcje',
      subtitle: 'Wszystko Czego Potrzebujesz',
      feature1Title: 'Natychmiastowe Wdrożenie',
      feature1Desc: 'Wdróż serwery w sekundach dzięki naszej zautomatyzowanej infrastrukturze.',
      feature2Title: 'Elastyczne Skalowanie',
      feature2Desc: 'Skaluj zasoby w górę lub w dół według potrzeb.',
      feature3Title: '99.9% Dostępności',
      feature3Desc: 'Niezawodność klasy korporacyjnej, na której możesz polegać.',
      feature4Title: 'Globalna Sieć',
      feature4Desc: 'Wdrażaj w wielu regionach na całym świecie.',
      feature5Title: 'Zaawansowane Bezpieczeństwo',
      feature5Desc: 'Szyfrowanie klasy militarnej i ochrona DDoS.',
      feature6Title: 'Wsparcie 24/7',
      feature6Desc: 'Zespół ekspertów dostępny przez całą dobę.'
    },
    calculator: {
      title: 'Kalkulator Serwerów',
      subtitle: 'Oszacuj Swoje Miesięczne Koszty',
      cpu: 'Rdzenie CPU',
      ram: 'RAM (GB)',
      storage: 'Dysk (GB)',
      bandwidth: 'Transfer (TB)',
      estimated: 'Szacunkowy Koszt Miesięczny',
      calculate: 'Oblicz'
    },
    contact: {
      title: 'Skontaktuj Się',
      subtitle: 'Chętnie Cię Wysłuchamy',
      newsletter: 'Zapisz się do newslettera',
      newsletterDesc: 'Otrzymuj najnowsze aktualizacje i oferty',
      emailPlaceholder: 'Wprowadź swój email',
      subscribe: 'Zapisz się',
      contactForm: 'Formularz Kontaktowy',
      name: 'Imię',
      surname: 'Nazwisko',
      email: 'Email',
      message: 'Wiadomość',
      send: 'Wyślij Wiadomość'
    },
    footer: {
      description: 'Zasoby serwerowe na żądanie. Skaluj swoją infrastrukturę natychmiast.',
      product: 'Produkt',
      company: 'Firma',
      support: 'Wsparcie',
      rights: 'Wszelkie prawa zastrzeżone.'
    },
    auth: {
      login: 'Zaloguj',
      register: 'Zarejestruj',
      email: 'Email',
      password: 'Hasło',
      confirmPassword: 'Potwierdź Hasło',
      orContinue: 'Lub kontynuuj z',
      hasAccount: 'Masz już konto?',
      noAccount: 'Nie masz konta?',
      forgotPassword: 'Zapomniałeś hasła?'
    }
  },
  ru: {
    header: {
      features: 'Функции',
      pricing: 'Калькулятор',
      about: 'О Нас',
      contact: 'Контакты',
      login: 'Войти',
      register: 'Регистрация'
    },
    hero: {
      title: 'Серверные Ресурсы',
      subtitle: 'По Требованию',
      description: 'Масштабируйте вашу инфраструктуру мгновенно с нашей платформой аренды серверов. Платите только за то, что используете.',
      cta: 'Начать',
      learnMore: 'Узнать Больше'
    },
    about: {
      title: 'О Нас',
      subtitle: 'Строим Будущее Облачной Инфраструктуры',
      description: 'Мы предоставляем передовые решения для аренды серверов для бизнеса любого масштаба. Наша платформа предлагает гибкость, надежность и производительность по конкурентным ценам.',
      mission: 'Наша Миссия',
      missionText: 'Демократизация доступа к вычислительным ресурсам корпоративного уровня.',
      vision: 'Наше Видение',
      visionText: 'Мир, где у каждого бизнеса есть инфраструктура, необходимая для успеха.'
    },
    features: {
      title: 'Функции',
      subtitle: 'Все Что Вам Нужно',
      feature1Title: 'Мгновенное Развертывание',
      feature1Desc: 'Развертывайте серверы за секунды с нашей автоматизированной инфраструктурой.',
      feature2Title: 'Гибкое Масштабирование',
      feature2Desc: 'Масштабируйте ресурсы вверх или вниз в зависимости от ваших потребностей.',
      feature3Title: '99.9% Доступность',
      feature3Desc: 'Надежность корпоративного уровня, на которую можно положиться.',
      feature4Title: 'Глобальная Сеть',
      feature4Desc: 'Развертывание в нескольких регионах по всему миру.',
      feature5Title: 'Продвинутая Безопасность',
      feature5Desc: 'Шифрование военного уровня и защита от DDoS.',
      feature6Title: 'Поддержка 24/7',
      feature6Desc: 'Команда экспертов доступна круглосуточно.'
    },
    calculator: {
      title: 'Калькулятор Серверов',
      subtitle: 'Рассчитайте Ежемесячные Расходы',
      cpu: 'Ядра CPU',
      ram: 'RAM (ГБ)',
      storage: 'Хранилище (ГБ)',
      bandwidth: 'Трафик (ТБ)',
      estimated: 'Ориентировочная Ежемесячная Стоимость',
      calculate: 'Рассчитать'
    },
    contact: {
      title: 'Свяжитесь с Нами',
      subtitle: 'Мы Будем Рады Услышать Вас',
      newsletter: 'Подписаться на рассылку',
      newsletterDesc: 'Получайте последние обновления и предложения',
      emailPlaceholder: 'Введите ваш email',
      subscribe: 'Подписаться',
      contactForm: 'Контактная Форма',
      name: 'Имя',
      surname: 'Фамилия',
      email: 'Email',
      message: 'Сообщение',
      send: 'Отправить Сообщение'
    },
    footer: {
      description: 'Серверные ресурсы по требованию. Масштабируйте вашу инфраструктуру мгновенно.',
      product: 'Продукт',
      company: 'Компания',
      support: 'Поддержка',
      rights: 'Все права защищены.'
    },
    auth: {
      login: 'Войти',
      register: 'Регистрация',
      email: 'Email',
      password: 'Пароль',
      confirmPassword: 'Подтвердите Пароль',
      orContinue: 'Или продолжить с',
      hasAccount: 'Уже есть аккаунт?',
      noAccount: 'Нет аккаунта?',
      forgotPassword: 'Забыли пароль?'
    }
  },
  de: {
    header: {
      features: 'Funktionen',
      pricing: 'Rechner',
      about: 'Über Uns',
      contact: 'Kontakt',
      login: 'Anmelden',
      register: 'Registrieren'
    },
    hero: {
      title: 'Unternehmens-Server-Ressourcen',
      subtitle: 'Auf Abruf',
      description: 'Skalieren Sie Ihre Infrastruktur sofort mit unserer cloudbasierten Server-Mietplattform. Zahlen Sie nur für das, was Sie nutzen.',
      cta: 'Loslegen',
      learnMore: 'Mehr Erfahren'
    },
    about: {
      title: 'Über Uns',
      subtitle: 'Die Zukunft der Cloud-Infrastruktur Gestalten',
      description: 'Wir bieten hochmoderne Server-Mietlösungen für Unternehmen jeder Größe. Unsere Plattform bietet Flexibilität, Zuverlässigkeit und Leistung zu wettbewerbsfähigen Preisen.',
      mission: 'Unsere Mission',
      missionText: 'Demokratisierung des Zugangs zu Rechenressourcen auf Unternehmensniveau.',
      vision: 'Unsere Vision',
      visionText: 'Eine Welt, in der jedes Unternehmen die Infrastruktur hat, die es zum Erfolg braucht.'
    },
    features: {
      title: 'Funktionen',
      subtitle: 'Alles Was Sie Brauchen',
      feature1Title: 'Sofortige Bereitstellung',
      feature1Desc: 'Stellen Sie Server in Sekunden mit unserer automatisierten Infrastruktur bereit.',
      feature2Title: 'Flexible Skalierung',
      feature2Desc: 'Skalieren Sie Ressourcen nach Ihren Bedürfnissen hoch oder runter.',
      feature3Title: '99.9% Verfügbarkeit',
      feature3Desc: 'Unternehmenszuverlässigkeit, auf die Sie sich verlassen können.',
      feature4Title: 'Globales Netzwerk',
      feature4Desc: 'Bereitstellung in mehreren Regionen weltweit.',
      feature5Title: 'Erweiterte Sicherheit',
      feature5Desc: 'Militärische Verschlüsselung und DDoS-Schutz.',
      feature6Title: '24/7 Support',
      feature6Desc: 'Expertenteam rund um die Uhr verfügbar.'
    },
    calculator: {
      title: 'Server-Rechner',
      subtitle: 'Schätzen Sie Ihre Monatlichen Kosten',
      cpu: 'CPU-Kerne',
      ram: 'RAM (GB)',
      storage: 'Speicher (GB)',
      bandwidth: 'Bandbreite (TB)',
      estimated: 'Geschätzte Monatliche Kosten',
      calculate: 'Berechnen'
    },
    contact: {
      title: 'Kontakt Aufnehmen',
      subtitle: 'Wir Würden Uns Freuen, Von Ihnen Zu Hören',
      newsletter: 'Newsletter Abonnieren',
      newsletterDesc: 'Erhalten Sie die neuesten Updates und Angebote',
      emailPlaceholder: 'E-Mail eingeben',
      subscribe: 'Abonnieren',
      contactForm: 'Kontaktformular',
      name: 'Vorname',
      surname: 'Nachname',
      email: 'E-Mail',
      message: 'Nachricht',
      send: 'Nachricht Senden'
    },
    footer: {
      description: 'Unternehmens-Server-Ressourcen auf Abruf. Skalieren Sie Ihre Infrastruktur sofort.',
      product: 'Produkt',
      company: 'Unternehmen',
      support: 'Support',
      rights: 'Alle Rechte vorbehalten.'
    },
    auth: {
      login: 'Anmelden',
      register: 'Registrieren',
      email: 'E-Mail',
      password: 'Passwort',
      confirmPassword: 'Passwort Bestätigen',
      orContinue: 'Oder fortfahren mit',
      hasAccount: 'Bereits ein Konto?',
      noAccount: 'Noch kein Konto?',
      forgotPassword: 'Passwort vergessen?'
    }
  }
};

export function getTranslation(lang: Language) {
  return translations[lang] || translations.en;
}
