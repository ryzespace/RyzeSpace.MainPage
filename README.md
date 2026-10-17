# RyzeSpace — Global Server Resource & Compute Marketplace

[English version below](#english-version)

---

## 🇵🇱 Wersja Polska

### 1. O Projekcie
**RyzeSpace** to platforma i giełda zasobów obliczeniowych, zaprojektowana w oparciu o absolutny minimalizm oraz oficjalny system wizualny **Cloudflare (cloudflare.com)**:
- Czysta, profesjonalna estetyka enterprise: charakterystyczny akcent Cloudflare Orange (`#F38020`), wysoki kontrast tekstu, subtelne ramki 1px (`border-neutral-200` / `border-neutral-800`), brak emotek, brak zbędnych elementów.
- Spójne, minimalistyczne sekcje: górny pasek ogłoszeń, pasek nawigacji, sekcja Hero, sekcja *Region: Earth*, porównanie tradycyjnej chmury z RyzeSpace, giełda serwerów bare-metal, ekosystem ról, matryca sieci Anycast oraz formularz kontaktowy z integracją **Resend**.

Platforma łączy deweloperów z centrami danych i dostawcami serwerów dedykowanych, eliminując pośredników przy zachowaniu bezpieczeństwa transakcji dzięki protokołowi **Smart Escrow**.

### 2. Stack Technologiczny
- **Framework:** Vue 3 (Composition API z `<script setup lang="ts">`)
- **Język:** TypeScript (pełne typowanie interfejsów, modeli procesorów i stanu aplikacji)
- **Styling:** Tailwind CSS (minimalistyczny system kolorów Cloudflare, tryb Dark/Light, zerowy clutter)
- **State Management:** Pinia (sklepy dla języków `i18n`, motywu `theme`, rynku `market`, autentykacji `auth`, koszyka `cart` i powiadomień `toast`)
- **Email Service:** Resend API (obsługa powiadomień i formularza kontaktowego)
- **Narzędzie budowania:** Vite (błyskawiczny start, HMR, tree-shaking, optymalizacja pod Lighthouse 100/100)
- **Ikony:** Lucide Vue Next
- **Brak komentarzy w kodzie:** Zero komentarzy we wszystkich plikach kodu źródłowego.
- **Brak emotek:** Wyłącznie czyste symbole tekstowe i wektorowe ikony.

### 3. Główne Sekcje Platformy
1. **Pasek Ogłoszeń & Nawigacja:**
   - Czysty pasek ogłoszeń ze statusem działania sieci Anycast.
   - Pasek nawigacyjny z przełącznikiem 4 języków (EN, PL, DE, RU), 4 walut (USD, EUR, PLN, GBP), trybu Dark/Light oraz logowaniem.
2. **Hero:**
   - Przejrzysty nagłówek, podtytuł, przyciski akcji oraz gwarancja braku karty kredytowej.
3. **Region: Earth:**
   - 3 kluczowe metryki: latencja 4.5x, zasięg < 50ms, 310 mld blokowanych ataków DDoS dziennie.
4. **Porównanie Awarii Tradycyjnej Chmury:**
   - Zestawienie zgłoszeń incydentów (P0/P1) tradycyjnej chmury z gwarancjami RyzeSpace.
5. **Giełda Zasobów Serwerowych (Marketplace):**
   - Filtrowanie po regionach i specyfikacji sprzętowej z natychmiastowym modalem wdrożenia KVM.
6. **Role Ekosystemu:**
   - Zwięzłe panele dla kupujących, dostawców sprzętu oraz moderatorów sieci.
7. **Globalna Sieć Anycast & Kontakt Resend:**
   - Matryca opóźnień ping w węzłach brzegowych oraz bezpośredni formularz kontaktowy zintegrowany z silnikiem Resend.

### 4. Uruchomienie Projektu
```bash
# Instalacja zależności
npm install

# Uruchomienie serwera deweloperskiego
npm run dev

# Zbudowanie zoptymalizowanej wersji produkcyjnej
npm run build

# Podgląd wersji produkcyjnej
npm run preview
```

---

<a name="english-version"></a>
## 🇬🇧 English Version

### 1. About the Project
**RyzeSpace** is a decentralized server resource and compute marketplace built with absolute minimalism, faithfully adhering to the official **Cloudflare (cloudflare.com)** design system:
- Crisp, enterprise aesthetic: signature Cloudflare Orange (`#F38020`), solid typography contrast, 1px subtle borders (`border-neutral-200` / `border-neutral-800`), zero emojis, zero artificial gradient noise, and uncluttered layouts.
- Structured, minimalist sections: Announcement Bar, Navbar, Hero, *Region: Earth* telemetry metrics, Legacy Cloud vs RyzeSpace incident tickets, Bare Metal Compute Marketplace, Multi-Role Ecosystem, Anycast Edge Topology, and Enterprise Contact with **Resend** integration.

The platform directly connects developers with data centers and bare-metal server providers, removing hyperscaler markups while securing transactions via **Smart Escrow** contracts.

### 2. Technology Stack
- **Framework:** Vue 3 (Composition API with `<script setup lang="ts">`)
- **Language:** TypeScript (strictly typed interfaces, pricing matrices, and state models)
- **Styling:** Tailwind CSS (clean Cloudflare palette, Light/Dark modes, zero noise)
- **State Management:** Pinia (stores for `i18n`, `theme`, `market`, `auth`, `cart`, `toast`)
- **Email Service:** Resend API (contact form and telemetry newsletter dispatch)
- **Build Tool:** Vite (sub-second HMR, tree-shaking, Lighthouse 100/100 performance)
- **Icons:** Lucide Vue Next
- **Zero Comments in Code:** Built strictly without any comments in source code files.
- **Zero Emojis:** Pure textual codes and crisp vector icons only.

### 3. Core Sections
1. **Announcement Bar & Navigation:**
   - Top announcement with live Anycast status indicator.
   - Minimalist header with 4-language switcher (EN, PL, DE, RU), 4 currencies (USD, EUR, PLN, GBP), Dark/Light toggle, and auth modal.
2. **Hero:**
   - Crisp typography, action buttons, and no credit card required badge.
3. **Region: Earth:**
   - 3 core metrics: 4.5x faster latency, < 50ms reach for 95% of users, and 310B+ daily DDoS threats mitigated.
4. **Legacy Cloud Incident Comparison:**
   - Side-by-side comparison of legacy cloud incident tickets vs RyzeSpace Anycast guarantees.
5. **Compute Marketplace:**
   - Region and spec filtering with instant automated KVM provisioning.
6. **Multi-Role Ecosystem:**
   - Direct tab views for Compute Buyers, Infrastructure Providers, and Community Moderators.
7. **Global Anycast Network & Resend Contact:**
   - Live edge ping latency matrix and direct enterprise contact form integrated with Resend.

### 4. Getting Started
```bash
# Install dependencies
npm install

# Start local dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```
