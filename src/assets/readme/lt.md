# Angular nukreipimo puslapio šablonas (SSR + Prerender)

Modernus Angular 21 pradinis šablonas greitiems nukreipimo puslapiams kurti su **SSR prerenderinimu**, **TailwindCSS** ir **GitHub Pages diegimu**.

Šis šablonas optimizuotas statiniams nukreipimo puslapiams, kuriuose puslapiai sugeneruojami **kompiliavimo metu** dėl SEO ir našumo.

---

# Apžvalga

- Angular **21**
- **SSR prerenderinimas** kompiliavimo metu
- **Angular be Zone.js**
- Būsena, naudojama HTML klasių susiejimuose, turi būti pateikta kaip **signals**
- Kurdami naujas formas, kaip pagrindinį sprendimą rinkitės **Angular Signal Forms**
- **OnPush change detection pagal nutylėjimą**
- **TailwindCSS v4**
- Naudokite bendrus **temos CSS kintamuosius** iš `src/styles/_theme.scss` spalvoms, paviršiams, tarpams, kampų apvalinimui ir animacijai
- **GitHub Pages diegimas**
- **Prettier formatavimas**
- Švari minimali projekto struktūra

Projektas sugeneruoja abu:

```
dist/app/browser
dist/app/server
```

Tačiau diegimui naudojama **naršyklės prerenderinta išvestis**, todėl tai puikiai tinka statiniam talpinimui.

---

# Projekto Struktūra

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

SSR konfigūracija yra:

```
app.config.server.ts
app.routes.server.ts
```

---

# Vystymas

Paleiskite vystymo serverį:

```
npm start
```

arba

```
ng serve
```

Programa veikia adresu [http://localhost:4200](http://localhost:4200)

Vystymo režimas veikia kaip įprasta Angular SPA.

---

# Kompiliavimas

Sukompiliuokite projektą:

```
npm run build
```

Tai sugeneruoja:

```
dist/app/browser
dist/app/server
```

Puslapiai yra **prerenderinami kompiliavimo metu** naudojant Angular SSR.

---

# SSR serverio paleidimas (nebūtina)

Šablonas apima Node serverį SSR veikimui:

```
npm run serve:ssr:app
```

Tai paleidžia:

```
node dist/app/server/server.mjs
```

Daugumai nukreipimo puslapių to **nereikia**, nes prerenderintas HTML jau sugeneruotas.

---

# Prerender konfigūracija

Pagal nutylėjimą prerenderinami visi maršrutai:

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

Tai leidžia Angular kompiliavimo metu sugeneruoti statinį HTML kiekvienam maršrutui.

---

# TailwindCSS

Tailwind konfigūruojamas per:

```
.postcssrc.json
```

Tailwind turėtų būti naudojamas kuo dažniau kasdieniams UI darbams.

Tailwind utility klases rinkitės:

- išdėstymui
- tarpams
- tipografijai
- spalvoms
- kraštinėms
- dydžiams
- prisitaikančiam elgesiui

SCSS naudokite tik tada, kai Tailwind nėra tinkamas sprendimas, pavyzdžiui:

- sudėtingam konkretaus komponento stiliui
- bendriems dizaino tokenams ir miksinams
- pažangioms būsenoms ar selektoriams
- nedideliam kiekiui globalių stilių

Globalūs stiliai yra:

```
src/styles.scss
```

---

# Piktogramos

Šiame šablone yra **Material Symbols Outlined**, ir jos turėtų būti naudojamos kaip numatytasis piktogramų rinkinys visame projekte.

Įkeliama čia:

```
src/index.html
```

Piktogramas naudokite tiesiogiai HTML taip:

```html
<span class="material-symbols-outlined" aria-hidden="true">arrow_forward</span>
```

Prieinamiems mygtukams piktogramą palikite dekoratyvinę, o pačiam mygtukui suteikite tekstinę etiketę arba `aria-label`:

```html
<button type="button" aria-label="Open menu">
	<span class="material-symbols-outlined" aria-hidden="true">menu</span>
</button>
```

---

# Vertimai ir Kalbos

UI vertimai šiuo metu yra:

```text
src/app/app.translates.ts
```

Kalbos metaduomenys yra:

```text
src/app/feature/language/language.type.ts
src/app/feature/language/language.interface.ts
src/app/feature/language/language.const.ts
src/app/feature/language/language.service.ts
```

Kai pridedate arba atnaujinate vertimus:

- laikykite kalbų kodus suderintus su `LanguageCode`
- atnaujinkite `LANGUAGES`, kai pridedate arba pervadinate palaikomą kalbą
- vertimų tekstą ir kalbų pavadinimus saugokite kaip tikrus UTF-8 simbolius, o ne escaped ar neteisingai perkoduotą tekstą
- nekeiskite angliškų šaltinių eilučių be reikalo, nebent ketinate atnaujinti kiekvieną vertimo įrašą

---

# SCSS konvencijos

Naudokite SCSS taip, kad tai atitiktų modernius Angular numatytuosius principus:

- Daugumą stilių laikykite komponento `.scss` faile.
- `src/styles.scss` naudokite tik tikrai globaliems stiliams, tokiems kaip resetai, tokenai, tipografija ir utility sluoksniai.
- Spalvoms, tarpams ir temoms, kurios gali keistis vykdymo metu, rinkitės CSS kintamuosius.
- Naudokite SCSS galimybes, tokias kaip `@use`, miksinus ir partials, kad būtų patogiau rašyti ir dalintis dizaino tokenais.
- Venkite gilaus selektorių lizdinimo. Selektoriai turi būti paprasti ir lokalūs komponentui.
- Venkite `::ng-deep` ir `ViewEncapsulation.None`, nebent yra aiški integracijos priežastis.
- Šablonuose rinkitės klasių susiejimus, o ne sudėtingus inline stiliaus susiejimus.

Rekomenduojamas skaidymas:

```text
src/styles.scss           -> globalus įėjimo taškas
src/app/**/**/*.scss      -> komponentų lokalūs stiliai
src/styles/_theme.scss    -> bendri temos CSS kintamieji
```

---

# Environments

Šiame šablone yra Angular environment failai, kuriuos galima naudoti skirtingoms vykdymo aplinkoms, pvz., vietiniam vystymui ir produkciniams buildams.

Galimi failai:

```text
src/environments/environment.ts
src/environments/environment.prod.ts
```

Tipiniai naudojimo atvejai:

- API baziniai URL
- funkcijų vėliavos
- analytics įjungimo / išjungimo nustatymai
- išorinių paslaugų konfigūracija

Produkciniai buildai pakeičia `environment.ts` į `environment.prod.ts` naudojant Angular file replacements.

Environment failuose laikykite tik viešą front-end konfigūraciją. Nelaikykite juose paslapčių.

---

# Diegimas

Diegimas vykdomas automatiškai per **GitHub Actions**.

Workflow:

```
.github/workflows/deploy.yml
```

Žingsniai:

1. Įdiegti priklausomybes
2. Sukompiliuoti Angular programą
3. Nukopijuoti `CNAME`
4. Išsiųsti build išvestį į `gh-pages`

Diegiamas aplankas:

```
dist/app/browser
```

---

# Domenas

Pasirinktinis domenas, kurį turėtumėte pakeisti savo domenu, kad viskas veiktų tinkamai, bet kuriam `*.itkamianets.com` subdomenui, jei jis dar nebuvo naudotas mūsų GitHub organizacijoje.

```
ngx.itkamianets.com
```

Konfigūruota per:

```
CNAME
```

---

# Kodo Stilius

Formatavimą tvarko:

- `.editorconfig`
- `.prettierrc`

Pagrindinės konvencijos:

- **tabuliacija**
- **viengubos kabutės**
- **100 simbolių eilutės plotis**

---

# AI naudojimas

Jei naudojate AI už IDE ribų ir jis automatiškai neperskaito repozitorijos instrukcijų, pirmiausia nukopijuokite `AGENTS.md` turinį į AI užklausą / kontekstą.

Taip užtikrinsite, kad AI laikysis tų pačių projektui skirtų taisyklių, kurių IDE viduje laikosi Codex.

---

# NPM skriptai

Paleisti vystymą:

```
npm start
```

Sukompiliuoti projektą:

```
npm run build
```

Paleisti SSR serverį:

```
npm run serve:ssr:app
```

---

# Reikalavimai

Rekomenduojama aplinka:

```
Node.js 20+
npm 11+
```

---

# Kodo struktūros gidas

## Puslapiai

Programos puslapiai turi būti kuriami čia:

```text
src/app/pages/
```

Kiekvienas puslapis turi turėti savo aplanką ir savo komponento failą.

Pavyzdys:

```text
src/app/pages/home/home.component.ts
src/app/pages/about/about.component.ts
```

Sugeneruokite puslapio komponentą su Angular CLI:

```bash
ng generate component pages/home
```

arba trumpiau:

```bash
ng g c pages/home
```

Puslapiai turi būti tingiai įkraunami iš `src/app/app.routes.ts`.

Maršrutų konfigūracijos pavyzdys:

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

## Feature struktūra moduliams su back-end integracija

Jei kuriai nors programos daliai reikia atskiros verslo logikos ir back-end integracijos, sukurkite atskirą feature aplanką čia:

```text
src/app/feature/
```

Kiekviena feature turi turėti savo vidinę struktūrą.

Pavyzdys:

```text
src/app/feature/user/
src/app/feature/user/components/
src/app/feature/user/directives/
src/app/feature/user/interfaces/
src/app/feature/user/pages/
src/app/feature/user/pipes/
src/app/feature/user/services/
```

Paslaugos vietos pavyzdys:

```text
src/app/feature/user/services/user.service.ts
```

Siūlomos CLI komandos:

Sukurti feature puslapį:

```bash
ng g c feature/user/pages/user-profile
```

Sukurti feature komponentą:

```bash
ng g c feature/user/components/user-card
```

Sukurti feature direktyvą:

```bash
ng g d feature/user/directives/user-focus
```

Sukurti feature pipe:

```bash
ng g p feature/user/pipes/user-name
```

Sukurti feature paslaugą:

```bash
ng g s feature/user/services/user
```

Sąsajos dažniausiai kuriamos rankiniu būdu:

```text
src/app/feature/user/interfaces/user.interface.ts
src/app/feature/user/interfaces/user-response.interface.ts
```

Mažoms koncentruotoms feature taip pat tinka vienoje vietoje laikomi failai, tokie kaip `feature/language/language.type.ts`, `language.interface.ts`, `language.const.ts` ir `language.service.ts`, kai tokia struktūra padeda išlaikyti feature paprastesnę.

---

## Bendras dalijamas kodas

Bendras daugkartinio naudojimo kodas, kuris nėra susietas su viena konkrečia feature, gali būti laikomas tiesiogiai `src/app`.

Bendrų aplankų pavyzdžiai:

```text
src/app/components/
src/app/directives/
src/app/interfaces/
src/app/pipes/
src/app/services/
```

Bendro pipe vietos pavyzdys:

```text
src/app/pipes/phone.pipe.ts
```

Siūlomos CLI komandos:

Sukurti bendrą komponentą:

```bash
ng g c components/page-header
```

Sukurti bendrą direktyvą:

```bash
ng g d directives/autofocus
```

Sukurti bendrą pipe:

```bash
ng g p pipes/phone
```

Sukurti bendrą paslaugą:

```bash
ng g s services/api
```

Sąsajos dažniausiai kuriamos rankiniu būdu:

```text
src/app/interfaces/api-response.interface.ts
src/app/interfaces/select-option.interface.ts
```

---

## Vystymo santrauka

Pagal nutylėjimą naudokite šias vietas:

- `src/app/pages` - programos lygio tingiai įkraunami puslapiai
- `src/app/feature/<name>` - feature specifinis kodas su verslo logika / back-end
- `src/app/components`, `directives`, `pipes`, `services`, `interfaces` - bendras dalijamas kodas

# Sukurkite naują projektą iš šio šablono

Nukopijuokite numatytąjį repozitorijos šabloną į naują aplanką su savo projekto pavadinimu (pakeiskite `PROJECT_NAME` savo projekto pavadinimu):

```bash
git clone https://github.com/IT-Kamianets/ngx-default.git PROJECT_NAME
cd PROJECT_NAME
npm i
npm run start
```

### Ką daro šios komandos

- `git clone https://github.com/IT-Kamianets/ngx-default.git PROJECT_NAME`
  Atsiunčia šablono repozitoriją ir sukuria vietinį aplanką pavadinimu `PROJECT_NAME`.
- `cd PROJECT_NAME`
  Atidaro naujai sukurtą projekto aplanką.
- `npm i`
  Įdiegia visas projekto priklausomybes iš `package.json`.
- `npm run start`
  Paleidžia vietinį vystymo serverį.

Po to atidarykite vietinį URL, parodytą terminale, dažniausiai [http://localhost:4200](http://localhost:4200)

## Inicializuokite savo git repozitoriją

Jei norite pradėti nuo nulio vietoje šablono git istorijos išlaikymo, pašalinkite esamą `.git` aplanką, inicializuokite naują repozitoriją ir sukurkite pirmą commit.

Pavyzdys:

```bash
rm -rf .git
git init
git remote add origin https://github.com/IT-Kamianets/PROJECT_NAME.git
git add .
git commit -m "chore(init): bootstrap project from ngx-default template"
```

`git remote add origin ...` prijungia jūsų vietinį repozitorijų prie nuotolinio GitHub repozitorijaus, kad būsimos `git push` ir `git pull` komandos žinotų, kur yra pagrindinis projektas.

Pirmajam commit taip pat naudokite Conventional Commit žinutę. Tinkamas numatytasis variantas:

```text
chore(init): bootstrap project from ngx-default template
```

# Licencija

MIT
