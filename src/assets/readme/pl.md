# Szablon Angular Landing Page (SSR + Prerender)

Nowoczesny szablon startowy Angular 21 do tworzenia szybkich landing page'y z
**prerenderingiem SSR**, **TailwindCSS** i **wdrożeniem na GitHub Pages**.

Ten szablon jest zoptymalizowany pod statyczne strony landingowe, gdzie strony są
renderowane **w czasie budowania** dla SEO i wydajności.

---

# Najważniejsze cechy

- Angular **21**
- **Prerendering SSR** podczas budowania
- **Angular bez Zone.js**
- Stan używany w powiązaniach klas HTML powinien być udostępniany jako **signals**
- Preferuj **Angular Signal Forms** jako podstawowe podejście przy tworzeniu nowych formularzy
- **OnPush change detection by default**
- **TailwindCSS v4**
- Używaj współdzielonych **zmiennych CSS motywu** z `src/styles/_theme.scss` dla kolorów,
  powierzchni, odstępów, promieni i ruchu
- **Wdrażanie na GitHub Pages**
- **Formatowanie przez Prettier**
- Czysta, minimalistyczna struktura projektu

Projekt buduje oba wyjścia:

```
dist/app/browser
dist/app/server
```

Ale wdrożenie korzysta z **prerenderowanego wyjścia przeglądarki**, co sprawia, że
szablon idealnie nadaje się do hostingu statycznego.

---

# Struktura projektu

```
src/
  app/
    app.component.ts
    app.config.ts
    app.config.server.ts
    app.routes.ts
    app.routes.server.ts
    layouts/
    pages/
  assets/
  environments/
  styles/
  styles.scss
```

Konfiguracja SSR znajduje się w:

```
app.config.server.ts
app.routes.server.ts
```

---

# Rozwój

Uruchom serwer developerski:

```
npm start
```

lub

```
ng serve
```

Aplikacja działa pod adresem [http://localhost:4200](http://localhost:4200)

Tryb developerski działa jak zwykła aplikacja Angular SPA.

---

# Build

Zbuduj projekt:

```
npm run build
```

To generuje:

```
dist/app/browser
dist/app/server
```

Strony są **prerenderowane w czasie budowania** przy użyciu Angular SSR.

---

# Uruchamianie serwera SSR (opcjonalnie)

Szablon zawiera serwer Node dla SSR:

```
npm run serve:ssr:app
```

To uruchamia:

```
node dist/app/server/server.mjs
```

Dla większości landing page'y **nie jest to potrzebne**, ponieważ prerenderowany HTML
jest już generowany podczas budowania.

---

# Konfiguracja prerenderingu

Wszystkie trasy są domyślnie prerenderowane:

```
src/app/app.routes.server.ts
```

```
RenderMode.Prerender
```

```ts
export const serverRoutes: ServerRoute[] = [
	{
		path: '**',
		renderMode: RenderMode.Prerender,
	},
];
```

To sprawia, że Angular generuje statyczny HTML dla każdej trasy podczas budowania.

---

# TailwindCSS

Tailwind jest skonfigurowany przez:

```
.postcssrc.json
```

Tailwind powinien być używany jak najczęściej w codziennej pracy nad UI.

Preferuj klasy użytkowe Tailwinda dla:

- layoutu
- odstępów
- typografii
- kolorów
- obramowań
- rozmiarów
- zachowań responsywnych

Używaj SCSS tylko wtedy, gdy Tailwind nie jest odpowiednim narzędziem, na przykład dla:

- złożonych styli specyficznych dla komponentu
- współdzielonych design tokenów i mixinów
- zaawansowanych stanów lub selektorów
- niewielkiej ilości stylów globalnych

Style globalne znajdują się w:

```
src/styles.scss
```

---

# Ikony

Ten szablon zawiera **Material Symbols Outlined** i powinny być one domyślnym zestawem ikon
w całym projekcie.

Ładowane w:

```
src/index.html
```

Używaj ikon bezpośrednio w HTML w ten sposób:

```html
<span class="material-symbols-outlined" aria-hidden="true">arrow_forward</span>
```

Dla dostępnych przycisków ikona powinna pozostać dekoracyjna, a sam przycisk powinien
mieć etykietę tekstową albo `aria-label`:

```html
<button type="button" aria-label="Open menu">
	<span class="material-symbols-outlined" aria-hidden="true">menu</span>
</button>
```

---

# Tłumaczenia i języki

Tłumaczenia UI znajdują się obecnie w:

```text
src/app/app.translates.ts
```

Metadane językowe znajdują się w:

```text
src/app/feature/language/language.type.ts
src/app/feature/language/language.interface.ts
src/app/feature/language/language.const.ts
src/app/feature/language/language.service.ts
```

Przy dodawaniu lub aktualizacji tłumaczeń:

- utrzymuj kody języków zgodne z `LanguageCode`
- aktualizuj `LANGUAGES` przy dodawaniu lub zmianie nazwy obsługiwanego języka
- zapisuj tekst tłumaczeń i etykiety języków jako prawdziwe znaki UTF-8, a nie w formie
  escapowanej ani ponownie zakodowanego mojibake
- zachowuj stabilność angielskich tekstów źródłowych, chyba że zamierzasz zaktualizować
  każdy wpis tłumaczenia

---

# Konwencje SCSS

Używaj SCSS w sposób zgodny z nowoczesnymi domyślnymi praktykami Angulara:

- Trzymaj większość styli w pliku `.scss` danego komponentu.
- Używaj `src/styles.scss` tylko dla naprawdę globalnych styli, takich jak resety, tokeny,
  typografia i warstwy narzędziowe.
- Preferuj zmienne CSS dla kolorów, odstępów i motywów, które mogą zmieniać się w czasie działania.
- Korzystaj z funkcji SCSS takich jak `@use`, mixiny i partiale dla wygodniejszego pisania
  oraz współdzielonych design tokenów.
- Unikaj głębokiego zagnieżdżania selektorów. Utrzymuj selektory proste i lokalne dla komponentu.
- Unikaj `::ng-deep` i `ViewEncapsulation.None`, chyba że istnieje wyraźny powód integracyjny.
- Preferuj class bindings w szablonach zamiast rozbudowanych inline style bindings.

Rekomendowany podział:

```text
src/styles.scss           -> globalny punkt wejścia
src/app/**/**/*.scss      -> lokalne style komponentów
src/styles/_theme.scss    -> współdzielone zmienne CSS motywu
```

---

# Environments

Ten szablon zawiera pliki `environment` Angulara i można ich używać dla różnych
konfiguracji uruchomieniowych, takich jak lokalny rozwój i buildy produkcyjne.

Dostępne pliki:

```text
src/environments/environment.ts
src/environments/environment.prod.ts
```

Typowe przypadki użycia:

- bazowe adresy URL API
- feature flagi
- przełączniki analityki
- konfiguracja usług zewnętrznych

Buildy produkcyjne podmieniają `environment.ts` na `environment.prod.ts` poprzez
Angular file replacements.

Ogranicz pliki `environment` do publicznej konfiguracji frontendu. Nie przechowuj w nich sekretów.

---

# Wdrażanie

Wdrażanie jest obsługiwane automatycznie przez **GitHub Actions**.

Workflow:

```
.github/workflows/deploy.yml
```

Kroki:

1. Zainstaluj zależności
2. Zbuduj aplikację Angular
3. Skopiuj `CNAME`
4. Wypchnij wynik builda do `gh-pages`

Wdrażany folder to:

```
dist/app/browser
```

---

# Domena

Własna domena, którą należy dostosować do swojej domeny, aby wszystko działało poprawnie;
można użyć dowolnej subdomeny `*.itkamianets.com`, jeśli nie jest jeszcze zajęta
w naszej organizacji GitHub.

```
ngx.itkamianets.com
```

Konfigurowana przez:

```
CNAME
```

---

# Styl kodu

Formatowanie jest obsługiwane przez:

- `.editorconfig`
- `.prettierrc`

Kluczowe konwencje:

- **tabs**
- **single quotes**
- **100 character line width**

---

# Użycie AI

Jeśli korzystasz z AI poza IDE i nie odczytuje ono automatycznie instrukcji repozytorium,
najpierw skopiuj zawartość `AGENTS.md` do promptu lub kontekstu AI.

To gwarantuje, że AI będzie stosować te same zasady specyficzne dla projektu,
których Codex używa w IDE.

---

# Skrypty NPM

Uruchomienie developmentu:

```
npm start
```

Build projektu:

```
npm run build
```

Uruchomienie serwera SSR:

```
npm run serve:ssr:app
```

---

# Wymagania

Rekomendowane środowisko:

```
Node.js 20+
npm 11+
```

---

# Przewodnik po strukturze kodu

## Strony

Strony aplikacji powinny być tworzone w:

```text
src/app/pages/
```

Każda strona powinna mieć własny folder i własny plik komponentu.

Przykład:

```text
src/app/pages/home/home.component.ts
src/app/pages/about/about.component.ts
```

Wygeneruj komponent strony przy użyciu Angular CLI:

```bash
ng generate component pages/home
```

albo krócej:

```bash
ng g c pages/home
```

Strony powinny być lazy-loaded z `src/app/app.routes.ts`.

Przykładowa konfiguracja tras:

```ts
import { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: '',
		loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent),
	},
	{
		path: 'about',
		loadComponent: () => import('./pages/about/about.component').then((m) => m.AboutComponent),
	},
];
```

---

## Struktura feature dla modułów połączonych z back-endem

Jeśli część aplikacji potrzebuje własnej logiki biznesowej i integracji z back-endem,
utwórz dedykowany folder feature w:

```text
src/app/feature/
```

Każdy feature powinien utrzymywać własną wewnętrzną strukturę.

Przykład:

```text
src/app/feature/user/
src/app/feature/user/components/
src/app/feature/user/directives/
src/app/feature/user/interfaces/
src/app/feature/user/pages/
src/app/feature/user/pipes/
src/app/feature/user/services/
```

Przykładowa lokalizacja serwisu:

```text
src/app/feature/user/services/user.service.ts
```

Sugerowane polecenia CLI:

Utwórz stronę feature:

```bash
ng g c feature/user/pages/user-profile
```

Utwórz komponent feature:

```bash
ng g c feature/user/components/user-card
```

Utwórz dyrektywę feature:

```bash
ng g d feature/user/directives/user-focus
```

Utwórz pipe feature:

```bash
ng g p feature/user/pipes/user-name
```

Utwórz serwis feature:

```bash
ng g s feature/user/services/user
```

Interfejsy są zwykle tworzone ręcznie:

```text
src/app/feature/user/interfaces/user.interface.ts
src/app/feature/user/interfaces/user-response.interface.ts
```

Dla małych, skoncentrowanych feature'ów poprawne są również pliki umieszczone obok siebie,
takie jak `feature/language/language.type.ts`, `language.interface.ts`, `language.const.ts`
i `language.service.ts`, kiedy taka struktura upraszcza feature.

---

## Współdzielony kod generyczny

Generyczny kod wielokrotnego użytku, który nie jest powiązany z jednym konkretnym feature,
może znajdować się bezpośrednio w `src/app`.

Przykłady współdzielonych folderów:

```text
src/app/components/
src/app/directives/
src/app/interfaces/
src/app/pipes/
src/app/services/
```

Przykładowa lokalizacja współdzielonego pipe:

```text
src/app/pipes/phone.pipe.ts
```

Sugerowane polecenia CLI:

Utwórz współdzielony komponent:

```bash
ng g c components/page-header
```

Utwórz współdzieloną dyrektywę:

```bash
ng g d directives/autofocus
```

Utwórz współdzielony pipe:

```bash
ng g p pipes/phone
```

Utwórz współdzielony serwis:

```bash
ng g s services/api
```

Interfejsy są zwykle tworzone ręcznie:

```text
src/app/interfaces/api-response.interface.ts
src/app/interfaces/select-option.interface.ts
```

---

## Podsumowanie rozwoju

Domyślnie używaj tych lokalizacji:

- `src/app/pages` - strony aplikacji lazy-loaded
- `src/app/feature/<name>` - kod specyficzny dla feature z logiką biznesową/back-endem
- `src/app/components`, `directives`, `pipes`, `services`, `interfaces` - generyczny kod współdzielony

# Utwórz nowy projekt z tego szablonu

Sklonuj domyślne repozytorium do nowego folderu z nazwą projektu
(zamień `PROJECT_NAME` na nazwę swojego projektu):

```bash
git clone https://github.com/IT-Kamianets/ngx-default.git PROJECT_NAME
cd PROJECT_NAME
npm i
npm run start
```

### Co robią te polecenia

- `git clone https://github.com/IT-Kamianets/ngx-default.git PROJECT_NAME`
  Pobiera repozytorium szablonu i tworzy lokalny folder o nazwie `PROJECT_NAME`.
- `cd PROJECT_NAME`
  Otwiera nowo utworzony folder projektu.
- `npm i`
  Instaluje wszystkie zależności projektu z `package.json`.
- `npm run start`
  Uruchamia lokalny serwer developerski.

Następnie otwórz lokalny adres URL pokazany w terminalu, zwykle [http://localhost:4200](http://localhost:4200)

## Zainicjalizuj własne repozytorium git

Jeśli chcesz zacząć od zera zamiast zachowywać historię git szablonu, usuń istniejący
folder `.git`, zainicjalizuj nowe repozytorium i utwórz pierwszy commit.

Przykład:

```bash
rm -rf .git
git init
git remote add origin https://github.com/IT-Kamianets/PROJECT_NAME.git
git add .
git commit -m "chore(init): bootstrap project from ngx-default template"
```

`git remote add origin ...` łączy lokalne repozytorium ze zdalnym repozytorium GitHub,
aby przyszłe polecenia `git push` i `git pull` wiedziały, gdzie znajduje się główny projekt.

Również dla pierwszego commita użyj komunikatu Conventional Commit. Dobrym domyślnym
wyborem jest:

```text
chore(init): bootstrap project from ngx-default template
```

# Licencja

MIT
