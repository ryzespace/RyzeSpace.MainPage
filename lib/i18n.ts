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
            marketplace: 'Marketplace',
            pricing: 'Calculator',
            about: 'About Us',
            contact: 'Contact',
            login: 'Log In',
            register: 'Sign Up',
            dashboard: 'Dashboard'
        },
        hero: {
            title: 'Server Resource Marketplace',
            subtitle: 'Buy, Sell, and Manage Computing Power',
            description:
                'Join the next-generation marketplace for server resources. Rent, sell, or moderate cloud infrastructure in real time.',
            cta: 'Start Trading',
            learnMore: 'Learn More'
        },
        about: {
            title: 'About Our Platform',
            subtitle: 'Empowering Cloud Collaboration',
            description:
                'Our marketplace connects buyers and sellers of computing resources. Whether you want to rent extra capacity or offer your own servers — we make it simple, secure, and scalable.',
            mission: 'Our Mission',
            missionText:
                'To create an open, decentralized platform for fair exchange of computing resources.',
            vision: 'Our Vision',
            visionText:
                'A connected world where infrastructure is efficiently shared and owned by the community.'
        },
        features: {
            title: 'Platform Features',
            subtitle: 'For Buyers, Sellers & Moderators',
            feature1Title: 'Resource Marketplace',
            feature1Desc: 'Buy or sell CPU, RAM, and storage on demand.',
            feature2Title: 'Dynamic Pricing',
            feature2Desc: 'Flexible market-based pricing for all resources.',
            feature3Title: 'Moderation Tools',
            feature3Desc: 'Ensure fair play and secure resource management.',
            feature4Title: 'Multi-Role System',
            feature4Desc: 'Act as a buyer, seller, or moderator simultaneously.',
            feature5Title: 'Escrow & Security',
            feature5Desc: 'Secure transactions with smart escrow protection.',
            feature6Title: '24/7 Support',
            feature6Desc: 'Our support team is always available for you.'
        },
        marketplace: {
            title: 'Marketplace',
            subtitle: 'Explore Available Resources',
            buy: 'Buy Resources',
            sell: 'Sell Your Capacity',
            manage: 'Manage My Offers',
            viewOrders: 'View Orders',
            addOffer: 'Add Offer',
            editOffer: 'Edit Offer',
            removeOffer: 'Remove Offer',
            balance: 'Current Balance',
            revenue: 'Total Earnings',
            purchaseHistory: 'Purchase History'
        },
        moderator: {
            title: 'Moderator Panel',
            subtitle: 'Manage Reports and Marketplace Integrity',
            reports: 'User Reports',
            flaggedOffers: 'Flagged Offers',
            bannedUsers: 'Banned Users',
            actions: 'Moderation Actions',
            approve: 'Approve',
            reject: 'Reject',
            restore: 'Restore'
        },
        calculator: {
            title: 'Server Cost Calculator',
            subtitle: 'Estimate or Set Your Resource Price',
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
            description:
                'The first marketplace for renting and selling server resources. Secure. Transparent. Global.',
            rights: 'All rights reserved.',
            privacyPolicy: {
                title: 'Privacy Policy',
                content: `
We value your privacy. This Privacy Policy explains how we collect, use, and protect your personal information.
Information we collect may include your name, email address, and usage data. We use this data to improve our services,
communicate with you, and ensure secure transactions. We do not share your personal data with third parties without your consent.
By using our services, you consent to this Privacy Policy.
                `
            },
            termsOfService: {
                title: 'Terms of Service',
                content: `
By accessing or using our platform, you agree to comply with these Terms of Service. You must be at least 18 years old.
Users are responsible for maintaining the confidentiality of their accounts. Unauthorized use is prohibited. We reserve the right
to modify, suspend, or terminate services at any time. Continued use constitutes acceptance of the updated Terms.
                `
            }
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
        },
        dashboard: {
            title: 'My Dashboard',
            myResources: 'My Resources',
            myOrders: 'My Orders',
            mySales: 'My Sales',
            manageAccount: 'Account Settings',
            switchRole: 'Switch Role',
            notifications: 'Notifications',
            revenue: 'Revenue',
            expenses: 'Expenses'
        }
    },

    pl: {
        header: {
            features: 'Funkcje',
            marketplace: 'Marketplace',
            pricing: 'Kalkulator',
            about: 'O Nas',
            contact: 'Kontakt',
            login: 'Zaloguj',
            register: 'Zarejestruj',
            dashboard: 'Panel'
        },
        hero: {
            title: 'Platforma Wynajmu Zasobów Serwerowych',
            subtitle: 'Kupuj, Sprzedawaj i Moderuj Moc Obliczeniową',
            description:
                'Dołącz do nowoczesnej platformy, która łączy dostawców i użytkowników zasobów serwerowych. Wynajmuj, sprzedawaj lub moderuj infrastrukturę w czasie rzeczywistym.',
            cta: 'Rozpocznij Handel',
            learnMore: 'Dowiedz się więcej'
        },
        about: {
            title: 'O Platformie',
            subtitle: 'Wspólna Przyszłość Chmury',
            description:
                'Marketplace, który łączy kupujących i sprzedających zasoby obliczeniowe. Udostępniaj moc CPU, RAM lub dysk i zarabiaj, gdy inni jej potrzebują.',
            mission: 'Nasza Misja',
            missionText:
                'Tworzyć otwartą, zdecentralizowaną platformę wymiany zasobów obliczeniowych.',
            vision: 'Nasza Wizja',
            visionText:
                'Świat, w którym infrastruktura jest współdzielona efektywnie i bez pośredników.'
        },
        features: {
            title: 'Funkcje Platformy',
            subtitle: 'Dla Kupujących, Sprzedających i Moderatorów',
            feature1Title: 'Marketplace Zasobów',
            feature1Desc: 'Kupuj lub sprzedawaj CPU, RAM i przestrzeń dyskową na żądanie.',
            feature2Title: 'Dynamiczne Ceny',
            feature2Desc: 'Elastyczne ceny oparte na rynku i popycie.',
            feature3Title: 'Narzędzia Moderacyjne',
            feature3Desc: 'Dbaj o bezpieczeństwo i uczciwość wymiany.',
            feature4Title: 'System Wielorólkowy',
            feature4Desc: 'Bądź jednocześnie kupującym, sprzedawcą lub moderatorem.',
            feature5Title: 'Bezpieczne Transakcje',
            feature5Desc: 'System escrow i pełne szyfrowanie płatności.',
            feature6Title: 'Wsparcie 24/7',
            feature6Desc: 'Pomoc techniczna dostępna o każdej porze.'
        },
        marketplace: {
            title: 'Marketplace',
            subtitle: 'Przeglądaj i Zarządzaj Zasobami',
            buy: 'Kup zasoby',
            sell: 'Sprzedaj zasoby',
            manage: 'Zarządzaj ofertami',
            viewOrders: 'Zobacz zamówienia',
            addOffer: 'Dodaj ofertę',
            editOffer: 'Edytuj ofertę',
            removeOffer: 'Usuń ofertę',
            balance: 'Saldo konta',
            revenue: 'Przychody',
            purchaseHistory: 'Historia zakupów'
        },
        moderator: {
            title: 'Panel Moderatora',
            subtitle: 'Zarządzaj zgłoszeniami i integralnością rynku',
            reports: 'Zgłoszenia użytkowników',
            flaggedOffers: 'Zgłoszone oferty',
            bannedUsers: 'Zbanowani użytkownicy',
            actions: 'Działania moderacyjne',
            approve: 'Zatwierdź',
            reject: 'Odrzuć',
            restore: 'Przywróć'
        },
        calculator: {
            title: 'Kalkulator Kosztów',
            subtitle: 'Oszacuj lub ustal cenę zasobu',
            cpu: 'Rdzenie CPU',
            ram: 'RAM (GB)',
            storage: 'Dysk (GB)',
            bandwidth: 'Transfer (TB)',
            estimated: 'Szacowany koszt miesięczny',
            calculate: 'Oblicz'
        },
        contact: {
            title: 'Kontakt',
            subtitle: 'Skontaktuj się z nami',
            newsletter: 'Zapisz się do newslettera',
            newsletterDesc: 'Otrzymuj aktualizacje i oferty',
            emailPlaceholder: 'Wpisz swój email',
            subscribe: 'Zapisz się',
            contactForm: 'Formularz kontaktowy',
            name: 'Imię',
            surname: 'Nazwisko',
            email: 'Email',
            message: 'Wiadomość',
            send: 'Wyślij wiadomość'
        },
        footer: {
            description:
                'Pierwszy marketplace do wynajmu i sprzedaży zasobów serwerowych. Bezpieczny. Transparentny. Globalny.',
            rights: 'Wszelkie prawa zastrzeżone.',
            privacyPolicy: {
                title: 'Polityka Prywatności',
                content: `
Dbamy o Twoją prywatność. Niniejsza Polityka Prywatności wyjaśnia, w jaki sposób gromadzimy, wykorzystujemy i chronimy Twoje dane osobowe.
Informacje, które zbieramy, mogą obejmować imię, adres e-mail i dane dotyczące korzystania z platformy. Wykorzystujemy je w celu
poprawy usług, komunikacji z użytkownikami oraz zapewnienia bezpiecznych transakcji. Nie udostępniamy danych osobowych osobom trzecim bez Twojej zgody.
Korzystając z naszej platformy, wyrażasz zgodę na tę Politykę Prywatności.
                `
            },
            termsOfService: {
                title: 'Regulamin',
                content: `
Korzystając z naszej platformy, zgadzasz się przestrzegać niniejszego Regulaminu. Użytkownik musi mieć co najmniej 18 lat.
Użytkownicy są odpowiedzialni za zachowanie poufności swoich kont. Zabronione jest nieautoryzowane korzystanie z platformy.
Zastrzegamy sobie prawo do modyfikacji, zawieszenia lub zakończenia usług w dowolnym czasie. Kontynuacja korzystania oznacza akceptację zmienionego Regulaminu.
                `
            }
        },
        auth: {
            login: 'Zaloguj się',
            register: 'Zarejestruj',
            email: 'Email',
            password: 'Hasło',
            confirmPassword: 'Potwierdź hasło',
            orContinue: 'Lub kontynuuj z',
            hasAccount: 'Masz już konto?',
            noAccount: 'Nie masz konta?',
            forgotPassword: 'Zapomniałeś hasła?'
        },
        dashboard: {
            title: 'Mój Panel',
            myResources: 'Moje zasoby',
            myOrders: 'Moje zamówienia',
            mySales: 'Moje sprzedaże',
            manageAccount: 'Ustawienia konta',
            switchRole: 'Zmień rolę',
            notifications: 'Powiadomienia',
            revenue: 'Przychody',
            expenses: 'Wydatki'
        }
    },

    // RUSSIAN TRANSLATION
    ru: {
        header: {
            features: 'Функции',
            marketplace: 'Маркетплейс',
            pricing: 'Калькулятор',
            about: 'О нас',
            contact: 'Контакт',
            login: 'Войти',
            register: 'Регистрация',
            dashboard: 'Панель'
        },
        hero: {
            title: 'Маркетплейс серверных ресурсов',
            subtitle: 'Покупка, продажа и управление вычислительной мощностью',
            description: 'Присоединяйтесь к современному маркетплейсу серверных ресурсов. Арендуйте, продавайте или модерируйте инфраструктуру в реальном времени.',
            cta: 'Начать торговлю',
            learnMore: 'Узнать больше'
        },
        about: {
            title: 'О платформе',
            subtitle: 'Объединяя облачные возможности',
            description: 'Наш маркетплейс соединяет покупателей и продавцов вычислительных ресурсов. Арендуйте дополнительную мощность или предлагайте свои серверы — это просто, безопасно и масштабируемо.',
            mission: 'Наша миссия',
            missionText: 'Создать открытую, децентрализованную платформу для честного обмена вычислительными ресурсами.',
            vision: 'Наше видение',
            visionText: 'Связанный мир, где инфраструктура эффективно распределяется и принадлежит сообществу.'
        },
        features: {
            title: 'Функции платформы',
            subtitle: 'Для покупателей, продавцов и модераторов',
            feature1Title: 'Маркетплейс ресурсов',
            feature1Desc: 'Покупайте или продавайте CPU, RAM и хранилище по требованию.',
            feature2Title: 'Динамическое ценообразование',
            feature2Desc: 'Гибкие рыночные цены для всех ресурсов.',
            feature3Title: 'Инструменты модерации',
            feature3Desc: 'Обеспечьте честную игру и безопасное управление ресурсами.',
            feature4Title: 'Система мульти-ролей',
            feature4Desc: 'Действуйте как покупатель, продавец или модератор одновременно.',
            feature5Title: 'Эскроу и безопасность',
            feature5Desc: 'Безопасные транзакции с защитой эскроу.',
            feature6Title: 'Поддержка 24/7',
            feature6Desc: 'Наша служба поддержки всегда доступна.'
        },
        marketplace: {
            title: 'Маркетплейс',
            subtitle: 'Изучите доступные ресурсы',
            buy: 'Купить ресурсы',
            sell: 'Продать ресурсы',
            manage: 'Управлять предложениями',
            viewOrders: 'Посмотреть заказы',
            addOffer: 'Добавить предложение',
            editOffer: 'Редактировать предложение',
            removeOffer: 'Удалить предложение',
            balance: 'Баланс',
            revenue: 'Доход',
            purchaseHistory: 'История покупок'
        },
        moderator: {
            title: 'Панель модератора',
            subtitle: 'Управление жалобами и целостностью рынка',
            reports: 'Жалобы пользователей',
            flaggedOffers: 'Помеченные предложения',
            bannedUsers: 'Заблокированные пользователи',
            actions: 'Действия модерации',
            approve: 'Одобрить',
            reject: 'Отклонить',
            restore: 'Восстановить'
        },
        calculator: {
            title: 'Калькулятор стоимости сервера',
            subtitle: 'Оцените или установите цену ресурса',
            cpu: 'Ядра CPU',
            ram: 'RAM (ГБ)',
            storage: 'Хранилище (ГБ)',
            bandwidth: 'Трафик (ТБ)',
            estimated: 'Оценочная месячная стоимость',
            calculate: 'Рассчитать'
        },
        contact: {
            title: 'Связаться с нами',
            subtitle: 'Мы будем рады услышать вас',
            newsletter: 'Подписка на рассылку',
            newsletterDesc: 'Получайте последние новости и предложения',
            emailPlaceholder: 'Введите ваш email',
            subscribe: 'Подписаться',
            contactForm: 'Форма связи',
            name: 'Имя',
            surname: 'Фамилия',
            email: 'Email',
            message: 'Сообщение',
            send: 'Отправить'
        },
        footer: {
            description: 'Первый маркетплейс для аренды и продажи серверных ресурсов. Безопасно. Прозрачно. Глобально.',
            rights: 'Все права защищены.',
            privacyPolicy: {
                title: 'Политика конфиденциальности',
                content: `
Мы ценим вашу конфиденциальность. Эта Политика конфиденциальности объясняет, как мы собираем, используем и защищаем вашу личную информацию.
Собранные данные могут включать имя, адрес электронной почты и данные об использовании. Мы используем эти данные для улучшения услуг,
связи с пользователями и обеспечения безопасных транзакций. Мы не передаем ваши личные данные третьим лицам без вашего согласия.
                `
            },
            termsOfService: {
                title: 'Условия обслуживания',
                content: `
Используя нашу платформу, вы соглашаетесь соблюдать эти Условия обслуживания. Пользователю должно быть не менее 18 лет.
Пользователи несут ответственность за сохранность своих учетных данных. Несанкционированное использование запрещено. Мы оставляем за собой право
изменять, приостанавливать или прекращать предоставление услуг в любое время. Продолжение использования означает согласие с обновленными условиями.
                `
            }
        },
        auth: {
            login: 'Войти',
            register: 'Регистрация',
            email: 'Email',
            password: 'Пароль',
            confirmPassword: 'Подтвердите пароль',
            orContinue: 'Или продолжить с',
            hasAccount: 'Уже есть аккаунт?',
            noAccount: 'Нет аккаунта?',
            forgotPassword: 'Забыли пароль?'
        },
        dashboard: {
            title: 'Моя панель',
            myResources: 'Мои ресурсы',
            myOrders: 'Мои заказы',
            mySales: 'Мои продажи',
            manageAccount: 'Настройки аккаунта',
            switchRole: 'Сменить роль',
            notifications: 'Уведомления',
            revenue: 'Доход',
            expenses: 'Расходы'
        }
    },

    // GERMAN TRANSLATION
    de: {
        header: {
            features: 'Funktionen',
            marketplace: 'Marktplatz',
            pricing: 'Rechner',
            about: 'Über uns',
            contact: 'Kontakt',
            login: 'Einloggen',
            register: 'Registrieren',
            dashboard: 'Dashboard'
        },
        hero: {
            title: 'Marktplatz für Serverressourcen',
            subtitle: 'Kaufen, Verkaufen und Verwalten von Rechenleistung',
            description: 'Treten Sie dem modernen Marktplatz für Serverressourcen bei. Mieten, verkaufen oder moderieren Sie Cloud-Infrastruktur in Echtzeit.',
            cta: 'Handel starten',
            learnMore: 'Mehr erfahren'
        },
        about: {
            title: 'Über unsere Plattform',
            subtitle: 'Cloud-Zusammenarbeit ermöglichen',
            description: 'Unser Marktplatz verbindet Käufer und Verkäufer von Rechenressourcen. Mieten Sie zusätzliche Kapazität oder bieten Sie Ihre eigenen Server an – einfach, sicher und skalierbar.',
            mission: 'Unsere Mission',
            missionText: 'Eine offene, dezentrale Plattform für den fairen Austausch von Rechenressourcen schaffen.',
            vision: 'Unsere Vision',
            visionText: 'Eine vernetzte Welt, in der Infrastruktur effizient geteilt und von der Gemeinschaft besessen wird.'
        },
        features: {
            title: 'Plattformfunktionen',
            subtitle: 'Für Käufer, Verkäufer & Moderatoren',
            feature1Title: 'Ressourcen-Marktplatz',
            feature1Desc: 'CPU, RAM und Speicher nach Bedarf kaufen oder verkaufen.',
            feature2Title: 'Dynamische Preisgestaltung',
            feature2Desc: 'Flexible marktbasierte Preise für alle Ressourcen.',
            feature3Title: 'Moderationstools',
            feature3Desc: 'Sichern Sie faire Nutzung und Ressourcenverwaltung.',
            feature4Title: 'Multi-Rollen-System',
            feature4Desc: 'Gleichzeitig als Käufer, Verkäufer oder Moderator agieren.',
            feature5Title: 'Treuhand & Sicherheit',
            feature5Desc: 'Sichere Transaktionen mit Smart Escrow.',
            feature6Title: '24/7 Support',
            feature6Desc: 'Unser Support-Team ist jederzeit für Sie verfügbar.'
        },
        marketplace: {
            title: 'Marktplatz',
            subtitle: 'Verfügbare Ressourcen erkunden',
            buy: 'Ressourcen kaufen',
            sell: 'Kapazität verkaufen',
            manage: 'Meine Angebote verwalten',
            viewOrders: 'Bestellungen ansehen',
            addOffer: 'Angebot hinzufügen',
            editOffer: 'Angebot bearbeiten',
            removeOffer: 'Angebot entfernen',
            balance: 'Kontostand',
            revenue: 'Einnahmen',
            purchaseHistory: 'Kaufhistorie'
        },
        moderator: {
            title: 'Moderator Panel',
            subtitle: 'Berichte und Marktplatzintegrität verwalten',
            reports: 'Benutzerberichte',
            flaggedOffers: 'Markierte Angebote',
            bannedUsers: 'Gesperrte Benutzer',
            actions: 'Moderationsaktionen',
            approve: 'Genehmigen',
            reject: 'Ablehnen',
            restore: 'Wiederherstellen'
        },
        calculator: {
            title: 'Serverkostenrechner',
            subtitle: 'Schätzen oder Preis für Ressourcen festlegen',
            cpu: 'CPU-Kerne',
            ram: 'RAM (GB)',
            storage: 'Speicher (GB)',
            bandwidth: 'Bandbreite (TB)',
            estimated: 'Geschätzte monatliche Kosten',
            calculate: 'Berechnen'
        },
        contact: {
            title: 'Kontakt',
            subtitle: 'Wir freuen uns auf Ihre Nachricht',
            newsletter: 'Newsletter abonnieren',
            newsletterDesc: 'Erhalten Sie die neuesten Updates und Angebote',
            emailPlaceholder: 'Geben Sie Ihre E-Mail ein',
            subscribe: 'Abonnieren',
            contactForm: 'Kontaktformular',
            name: 'Vorname',
            surname: 'Nachname',
            email: 'Email',
            message: 'Nachricht',
            send: 'Nachricht senden'
        },
        footer: {
            description: 'Der erste Marktplatz für die Vermietung und den Verkauf von Serverressourcen. Sicher. Transparent. Global.',
            rights: 'Alle Rechte vorbehalten.',
            privacyPolicy: {
                title: 'Datenschutz-Bestimmungen',
                content: `
Wir schätzen Ihre Privatsphäre. Diese Datenschutzrichtlinie erklärt, wie wir Ihre persönlichen Daten sammeln, verwenden und schützen.
Gesammelte Informationen können Name, E-Mail-Adresse und Nutzungsdaten umfassen. Wir verwenden diese Daten zur Verbesserung unserer Dienste,
zur Kommunikation mit Ihnen und zur Gewährleistung sicherer Transaktionen. Wir geben Ihre persönlichen Daten ohne Ihre Zustimmung nicht an Dritte weiter.
                `
            },
            termsOfService: {
                title: 'Nutzungsbedingungen',
                content: `
Durch den Zugriff auf oder die Nutzung unserer Plattform erklären Sie sich mit diesen Nutzungsbedingungen einverstanden. Sie müssen mindestens 18 Jahre alt sein.
Benutzer sind für die Vertraulichkeit ihrer Konten verantwortlich. Unbefugte Nutzung ist untersagt. Wir behalten uns das Recht vor,
Dienste jederzeit zu ändern, auszusetzen oder einzustellen. Die fortgesetzte Nutzung gilt als Akzeptanz der aktualisierten Bedingungen.
                `
            }
        },
        auth: {
            login: 'Einloggen',
            register: 'Registrieren',
            email: 'Email',
            password: 'Passwort',
            confirmPassword: 'Passwort bestätigen',
            orContinue: 'Oder fortfahren mit',
            hasAccount: 'Sie haben bereits ein Konto?',
            noAccount: 'Sie haben kein Konto?',
            forgotPassword: 'Passwort vergessen?'
        },
        dashboard: {
            title: 'Mein Dashboard',
            myResources: 'Meine Ressourcen',
            myOrders: 'Meine Bestellungen',
            mySales: 'Meine Verkäufe',
            manageAccount: 'Kontoeinstellungen',
            switchRole: 'Rolle wechseln',
            notifications: 'Benachrichtigungen',
            revenue: 'Einnahmen',
            expenses: 'Ausgaben'
        }
    }
} as const;

export function getTranslation(lang: Language) {
    return translations[lang] || translations.en;
}
