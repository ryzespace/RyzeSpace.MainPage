### Dokumentacja API 

Poniższa dokumentacja opisuje wymagania backendowe dla aplikacji frontendowej, w tym endpointy API i mechanizmy autoryzacji.

#### 1. Autoryzacja

Aplikacja frontendowa korzysta z biblioteki NextAuth.js do obsługi autoryzacji. Backend powinien zapewnić obsługę protokołu OAuth 2.0 dla następujących dostawców:

*   **GitHub**
*   **Google**

Frontend będzie przekierowywał użytkownika do odpowiednich stron logowania tych dostawców. Po pomyślnej autoryzacji, backend powinien obsłużyć callback od dostawcy OAuth, wygenerować token JWT i odesłać go do frontendu.

**Wymagane zmienne środowiskowe (po stronie frontendu):**

*   `GITHUB_ID`: Client ID dla aplikacji GitHub.
*   `GITHUB_SECRET`: Client Secret dla aplikacji GitHub.
*   `GOOGLE_ID`: Client ID dla aplikacji Google.
*   `GOOGLE_SECRET`: Client Secret dla aplikacji Google.
*   `NEXTAUTH_SECRET`: Tajny klucz do podpisywania tokenów JWT.

**Struktura tokenu JWT:**

Backend powinien generować token JWT o standardowej strukturze, zawierający co najmniej `sub` (identyfikator użytkownika), `iat` (czas wydania) i `exp` (czas wygaśnięcia).

#### 2. Endpointy API

##### 2.1. Wysłanie wiadomości kontaktowej

*   **Metoda:** `POST`
*   **Endpoint:** `/api/contact`
*   **Opis:** Umożliwia wysłanie wiadomości z formularza kontaktowego.
*   **Ciało żądania (Request Body):**

    ```json
    {
      "name": "string",
      "surname": "string",
      "email": "string (email format)",
      "message": "string"
    }
    ```

*   **Odpowiedź (Success - 200 OK):**

    ```json
    {
      "success": true
    }
    ```

*   **Odpowiedź (Error - 500 Internal Server Error):**

    ```json
    {
      "error": "Failed to send email."
    }
    ```

*   **Logika biznesowa:**

    Backend powinien przyjąć dane z formularza, a następnie wysłać wiadomość e-mail na skonfigurowany adres odbiorcy. W obecnej implementacji frontendowej używany jest do tego serwer SMTP Zimbra, ale backend może zaimplementować dowolny mechanizm wysyłki e-maili (np. integrację z SendGrid, Mailgun itp.).

    **Wymagane zmienne środowiskowe (po stronie frontendu, do dostosowania w backendzie):**

    *   `ZIMBRA_HOST`: Adres serwera SMTP.
    *   `ZIMBRA_USER`: Nazwa użytkownika do serwera SMTP.
    *   `ZIMBRA_PASS`: Hasło do serwera SMTP.
    *   `CONTACT_RECEIVER`: Adres e-mail, na który mają być wysyłane wiadomości.
