# RyzeSpace - Strona Główna

Witaj w repozytorium głównej strony internetowej RyzeSpace! Ta aplikacja stanowi wizytówkę naszego startupu, prezentując nasze usługi, misję i sposób, w jaki dążymy do innowacji.

## Opis Projektu

RyzeSpace to startup technologiczny, który koncentruje się na [tutaj wstaw krótki opis misji/dziedziny startupu, np. "tworzeniu innowacyjnych rozwiązań w dziedzinie X" lub "upraszczaniu procesów Y"]. Nasza strona główna ma za zadanie przedstawić naszą ofertę, zbudować zaufanie i umożliwić łatwy kontakt z nami.

## Kluczowe Funkcjonalności Strony

*   **Sekcje informacyjne**: Prezentacja misji, wizji, usług i wartości RyzeSpace.
*   **Formularz kontaktowy**: Umożliwia użytkownikom łatwe wysyłanie zapytań i wiadomości.
*   **Integracja z dostawcami autoryzacji**: Możliwość logowania/rejestracji za pomocą kont GitHub i Google (dzięki NextAuth.js).
*   **Responsywny design**: Strona dostosowuje się do różnych rozmiarów ekranów (desktop, tablet, mobile).
*   **Wsparcie dla wielu języków**: (Jeśli dotyczy, w przeciwnym razie usuń)

## Technologie Użyte w Projekcie

*   **Next.js**: Framework React do budowania aplikacji webowych z renderowaniem po stronie serwera (SSR) i generowaniem statycznych stron (SSG).
*   **React**: Biblioteka JavaScript do budowania interfejsów użytkownika.
*   **Tailwind CSS**: Utility-first CSS framework do szybkiego stylizowania.
*   **NextAuth.js**: Biblioteka do obsługi autoryzacji i uwierzytelniania.
*   **TypeScript**: Język programowania zapewniający typowanie statyczne.
*   **Nodemailer**: (Używany w backendzie do wysyłki e-maili z formularza kontaktowego).

## Jak uruchomić projekt lokalnie

Aby uruchomić projekt na swoim komputerze, wykonaj poniższe kroki:

1.  **Sklonuj repozytorium:**
    ```bash
    git clone https://github.com/TwojaOrganizacja/RyzeSpace.MainPage.git
    cd RyzeSpace.MainPage
    ```

2.  **Zainstaluj zależności:**
    ```bash
    npm install
    # lub
    yarn install
    ```

3.  **Skonfiguruj zmienne środowiskowe:**
    Utwórz plik `.env.local` w katalogu głównym projektu i dodaj następujące zmienne (przykładowe wartości):

    ```env
    # NextAuth.js
    GITHUB_ID=YOUR_GITHUB_CLIENT_ID
    GITHUB_SECRET=YOUR_GITHUB_CLIENT_SECRET
    GOOGLE_ID=YOUR_GOOGLE_CLIENT_ID
    GOOGLE_SECRET=YOUR_GOOGLE_CLIENT_SECRET
    NEXTAUTH_SECRET=YOUR_NEXTAUTH_SECRET_RANDOM_STRING

    # Contact Form (dla backendu, jeśli używasz SMTP)
    ZIMBRA_HOST=your.smtp.host.com
    ZIMBRA_USER=your_email@domain.com
    ZIMBRA_PASS=your_email_password
    CONTACT_RECEIVER=receiver_email@domain.com
    ```
    _Pamiętaj, aby zastąpić `YOUR_...` swoimi rzeczywistymi kluczami i danymi._

4.  **Uruchom serwer deweloperski:**
    ```bash
    npm run dev
    # lub
    yarn dev
    ```

    Aplikacja będzie dostępna pod adresem `http://localhost:3000`.

## Wdrażanie (Deployment)

Projekt jest przygotowany do wdrożenia na platformach takich jak Vercel, Netlify lub innych hostujących aplikacje Next.js.

## Kontakt

Masz pytania lub sugestie? Skontaktuj się z nami:
*   [Tutaj wstaw adres e-mail lub link do strony kontaktowej]
*   [Tutaj wstaw link do strony internetowej RyzeSpace]

---
© 2024 RyzeSpace. Wszelkie prawa zastrzeżone.
