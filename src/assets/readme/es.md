# Plantilla Angular para Landing Page (SSR + Prerender)

Plantilla inicial moderna de Angular 21 para crear landing pages rapidas con
**prerender SSR**, **TailwindCSS** y **despliegue en GitHub Pages**.

Esta plantilla esta optimizada para sitios estaticos donde las paginas se renderizan
**en tiempo de compilacion** para SEO y rendimiento.

---

# Caracteristicas principales

- Angular **21**
- **Prerender SSR** durante la compilacion
- **Angular sin zones**
- El estado usado en los `class` bindings de HTML debe exponerse como **signals**
- Prioriza **Angular Signal Forms** como enfoque principal al crear formularios nuevos
- **OnPush change detection by default**
- **TailwindCSS v4**
- Usa las **theme CSS variables** compartidas desde `src/styles/_theme.scss` para colores,
  superficies, espaciado, radios y movimiento
- **Despliegue en GitHub Pages**
- **Formato con Prettier**
- Estructura de proyecto limpia y minima

El proyecto compila ambas salidas:

```
dist/app/browser
dist/app/server
```

Pero el despliegue usa la **salida prerenderizada del navegador**, lo que la hace ideal
para hosting estatico.

---

# Estructura del proyecto

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

La configuracion SSR esta en:

```
app.config.server.ts
app.routes.server.ts
```

---

# Desarrollo

Inicia el servidor de desarrollo:

```
npm start
```

o

```
ng serve
```

La aplicacion se ejecuta en [http://localhost:4200](http://localhost:4200)

El modo desarrollo funciona como una SPA normal de Angular.

---

# Compilacion

Compila el proyecto:

```
npm run build
```

Esto genera:

```
dist/app/browser
dist/app/server
```

Las paginas se **prerenderizan en tiempo de compilacion** usando Angular SSR.

---

# Ejecutar el servidor SSR (opcional)

La plantilla incluye un servidor Node para SSR:

```
npm run serve:ssr:app
```

Esto ejecuta:

```
node dist/app/server/server.mjs
```

Para la mayoria de las landing pages esto **no es necesario**, porque el HTML
prerenderizado ya se genera durante la compilacion.

---

# Configuracion de prerender

Todas las rutas se prerenderizan por defecto:

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

Esto hace que Angular genere HTML estatico para cada ruta durante la compilacion.

---

# TailwindCSS

Tailwind esta configurado mediante:

```
.postcssrc.json
```

Tailwind deberia usarse tanto como sea posible para el trabajo cotidiano de UI.

Prefiere utilidades de Tailwind para:

- layout
- spacing
- typography
- colors
- borders
- sizing
- responsive behavior

Usa SCSS solo cuando Tailwind no sea la herramienta adecuada, por ejemplo para:

- estilos complejos especificos de componentes
- design tokens y mixins compartidos
- estados o selectores avanzados
- pequenas cantidades de estilos globales

Los estilos globales estan en:

```
src/styles.scss
```

---

# Iconos

Esta plantilla incluye **Material Symbols Outlined** y deben usarse como conjunto
de iconos por defecto en todo el proyecto.

Se cargan en:

```
src/index.html
```

Usa iconos directamente en HTML asi:

```html
<span class="material-symbols-outlined" aria-hidden="true">arrow_forward</span>
```

Para botones accesibles, el icono debe seguir siendo decorativo y el boton debe
tener una etiqueta de texto o un `aria-label`:

```html
<button type="button" aria-label="Open menu">
	<span class="material-symbols-outlined" aria-hidden="true">menu</span>
</button>
```

---

# Traducciones e idiomas

Las traducciones de la UI estan actualmente en:

```text
src/app/app.translates.ts
```

Los metadatos de idioma estan en:

```text
src/app/feature/language/language.type.ts
src/app/feature/language/language.interface.ts
src/app/feature/language/language.const.ts
src/app/feature/language/language.service.ts
```

Al anadir o actualizar traducciones:

- manten los codigos de idioma alineados con `LanguageCode`
- actualiza `LANGUAGES` al anadir o renombrar un idioma soportado
- guarda el texto traducido y las etiquetas de idioma como caracteres UTF-8 reales,
  no escapados ni re-codificados con mojibake
- manten estables las cadenas fuente en ingles salvo que vayas a actualizar todas las traducciones

---

# Convenciones SCSS

Usa SCSS de forma alineada con los valores por defecto modernos de Angular:

- Manten la mayoria de los estilos dentro del archivo `.scss` del componente.
- Usa `src/styles.scss` solo para estilos realmente globales como resets, tokens,
  tipografia y capas utilitarias.
- Prefiere variables CSS para colores, espaciado y temas que puedan cambiar en tiempo de ejecucion.
- Usa funciones de SCSS como `@use`, mixins y parciales para facilitar la autoria y
  compartir design tokens.
- Evita el anidamiento profundo de selectores. Manten los selectores simples y locales al componente.
- Evita `::ng-deep` y `ViewEncapsulation.None` salvo que haya una razon clara de integracion.
- Prefiere class bindings en las plantillas antes que inline style bindings pesados.

Division recomendada:

```text
src/styles.scss           -> punto de entrada global
src/app/**/**/*.scss      -> estilos locales de componentes
src/styles/_theme.scss    -> variables CSS compartidas del tema
```

---

# Environments

Esta plantilla incluye archivos `environment` de Angular y pueden usarse para
distintas configuraciones de ejecucion, como desarrollo local y builds de produccion.

Archivos disponibles:

```text
src/environments/environment.ts
src/environments/environment.prod.ts
```

Casos de uso tipicos:

- URLs base de API
- feature flags
- interruptores de analitica
- configuracion de servicios externos

Los builds de produccion sustituyen `environment.ts` por `environment.prod.ts`
mediante los file replacements de Angular.

Limita los archivos `environment` a configuracion publica del frontend. No guardes
secretos en ellos.

---

# Despliegue

El despliegue se gestiona automaticamente con **GitHub Actions**.

Workflow:

```
.github/workflows/deploy.yml
```

Pasos:

1. Instalar dependencias
2. Compilar la app Angular
3. Copiar `CNAME`
4. Enviar la salida del build a `gh-pages`

La carpeta desplegada es:

```
dist/app/browser
```

---

# Dominio

Dominio personalizado que debes ajustar a tu propio dominio para que funcione correctamente;
cualquier subdominio de `*.itkamianets.com` sirve si todavia no esta en uso dentro de nuestra organizacion de GitHub.

```
ngx.itkamianets.com
```

Configurado mediante:

```
CNAME
```

---

# Estilo de codigo

El formato se gestiona con:

- `.editorconfig`
- `.prettierrc`

Convenciones principales:

- **tabs**
- **single quotes**
- **100 character line width**

---

# Uso de IA

Si usas IA fuera del IDE y no lee automaticamente las instrucciones del repositorio,
copia primero el contenido de `AGENTS.md` dentro del prompt/contexto.

Eso garantiza que la IA siga las mismas reglas especificas del proyecto que Codex usa dentro del IDE.

---

# Scripts NPM

Iniciar desarrollo:

```
npm start
```

Compilar proyecto:

```
npm run build
```

Ejecutar servidor SSR:

```
npm run serve:ssr:app
```

---

# Requisitos

Entorno recomendado:

```
Node.js 20+
npm 11+
```

---

# Guia de estructura de codigo

## Paginas

Las paginas de la aplicacion deben crearse dentro de:

```text
src/app/pages/
```

Cada pagina debe tener su propia carpeta y su propio archivo de componente.

Ejemplo:

```text
src/app/pages/home/home.component.ts
src/app/pages/about/about.component.ts
```

Genera un componente de pagina con Angular CLI:

```bash
ng generate component pages/home
```

o mas corto:

```bash
ng g c pages/home
```

Las paginas deben cargarse de forma diferida desde `src/app/app.routes.ts`.

Ejemplo de configuracion de rutas:

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

## Estructura de features para modulos conectados al back-end

Si una parte de la app necesita su propia logica de negocio e integracion con back-end,
crea una carpeta de feature dedicada dentro de:

```text
src/app/feature/
```

Cada feature debe mantener su propia estructura interna.

Ejemplo:

```text
src/app/feature/user/
src/app/feature/user/components/
src/app/feature/user/directives/
src/app/feature/user/interfaces/
src/app/feature/user/pages/
src/app/feature/user/pipes/
src/app/feature/user/services/
```

Ubicacion de ejemplo para un servicio:

```text
src/app/feature/user/services/user.service.ts
```

Comandos CLI sugeridos:

Crear pagina de feature:

```bash
ng g c feature/user/pages/user-profile
```

Crear componente de feature:

```bash
ng g c feature/user/components/user-card
```

Crear directiva de feature:

```bash
ng g d feature/user/directives/user-focus
```

Crear pipe de feature:

```bash
ng g p feature/user/pipes/user-name
```

Crear servicio de feature:

```bash
ng g s feature/user/services/user
```

Las interfaces normalmente se crean manualmente:

```text
src/app/feature/user/interfaces/user.interface.ts
src/app/feature/user/interfaces/user-response.interface.ts
```

Para features pequenas y concretas, tambien son validos archivos colocados juntos como
`feature/language/language.type.ts`, `language.interface.ts`, `language.const.ts` y
`language.service.ts` cuando esa estructura mantiene el feature mas simple.

---

## Codigo compartido generico

El codigo reutilizable generico que no esta ligado a un feature especifico puede vivir directamente bajo `src/app`.

Ejemplos de carpetas compartidas:

```text
src/app/components/
src/app/directives/
src/app/interfaces/
src/app/pipes/
src/app/services/
```

Ubicacion de ejemplo para un pipe compartido:

```text
src/app/pipes/phone.pipe.ts
```

Comandos CLI sugeridos:

Crear componente compartido:

```bash
ng g c components/page-header
```

Crear directiva compartida:

```bash
ng g d directives/autofocus
```

Crear pipe compartido:

```bash
ng g p pipes/phone
```

Crear servicio compartido:

```bash
ng g s services/api
```

Las interfaces normalmente se crean manualmente:

```text
src/app/interfaces/api-response.interface.ts
src/app/interfaces/select-option.interface.ts
```

---

## Resumen de desarrollo

Usa estas ubicaciones por defecto:

- `src/app/pages` - paginas de nivel app con carga diferida
- `src/app/feature/<name>` - codigo especifico del feature con logica de negocio/back-end
- `src/app/components`, `directives`, `pipes`, `services`, `interfaces` - codigo compartido generico

# Crear un proyecto nuevo a partir de esta plantilla

Clona el repositorio base en una carpeta nueva con el nombre de tu proyecto
(sustituye `PROJECT_NAME` por el nombre de tu proyecto):

```bash
git clone https://github.com/IT-Kamianets/ngx-default.git PROJECT_NAME
cd PROJECT_NAME
npm i
npm run start
```

### Que hacen estos comandos

- `git clone https://github.com/IT-Kamianets/ngx-default.git PROJECT_NAME`
  Descarga el repositorio plantilla y crea una carpeta local llamada `PROJECT_NAME`.
- `cd PROJECT_NAME`
  Abre la carpeta del proyecto recien creada.
- `npm i`
  Instala todas las dependencias del proyecto desde `package.json`.
- `npm run start`
  Inicia el servidor local de desarrollo.

Despues, abre la URL local que aparezca en la terminal, normalmente [http://localhost:4200](http://localhost:4200)

## Inicializa tu propio repositorio git

Si quieres empezar desde cero en lugar de conservar el historial git de la plantilla,
elimina la carpeta `.git`, inicializa un repositorio nuevo y crea el primer commit.

Ejemplo:

```bash
rm -rf .git
git init
git remote add origin https://github.com/IT-Kamianets/PROJECT_NAME.git
git add .
git commit -m "chore(init): bootstrap project from ngx-default template"
```

`git remote add origin ...` conecta tu repositorio local con el repositorio remoto de GitHub
para que futuros `git push` y `git pull` sepan donde vive tu proyecto principal.

Usa tambien un mensaje Conventional Commit para el primer commit. Un valor por defecto razonable es:

```text
chore(init): bootstrap project from ngx-default template
```

# Licencia

MIT
