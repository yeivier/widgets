# widgets

Widget de acceso rápido para convertir **Reales brasileños (BRL) ⇄ Pesos chilenos (CLP)**, pensado para el celular.

## Qué es

Una mini app web (PWA) de una sola pantalla:

- Dos campos grandes (BRL y CLP). Escribís en cualquiera de los dos y el otro se actualiza al instante.
- Abre con el teclado numérico listo para tipear (no hay pantallas intermedias ni menús).
- Guarda la última tasa y los últimos montos en el celular, así que **abre al instante** aunque no haya internet en ese momento (se ve la última tasa conocida, marcada como "desactualizada" si corresponde).
- Botón ⇄ para invertir el orden de los campos, y botón de refresco manual para forzar una tasa nueva.

## Cómo instalarlo en la pantalla de inicio (así queda como un "widget" de acceso directo)

1. Andá a la URL publicada del sitio (ver más abajo cómo se publica).
2. **Android (Chrome):** menú ⋮ → "Agregar a pantalla de inicio" → Instalar.
3. **iPhone (Safari):** botón compartir → "Agregar a la pantalla de inicio".

Con eso queda un ícono propio que abre la conversión directamente, sin pasar por el navegador ni cargar pestañas.

## Publicación (GitHub Pages)

El repo incluye un workflow (`.github/workflows/pages.yml`) que publica automáticamente en GitHub Pages en cada push a `main`. Una vez habilitado GitHub Pages en la configuración del repo (Settings → Pages → Source: GitHub Actions), el sitio queda disponible en:

```
https://yeivier.github.io/widgets/
```

No requiere backend ni build: son archivos estáticos (`index.html`, `manifest.json`, `sw.js`, `icon.svg`).

## Tasa de cambio

La tasa se obtiene de APIs públicas gratuitas y sin necesidad de API key (con fallback automático entre ellas si alguna falla):

1. [open.er-api.com](https://www.exchangerate-api.com/docs/free) — actualizada aprox. cada 24 h.
2. [@fawazahmed0/currency-api](https://github.com/fawazahmed0/exchange-api) (vía jsDelivr) — actualizada a diario.
3. Mismo dataset anterior, mirror en `pages.dev` como último respaldo.

**Nota sobre el desfase:** estas fuentes gratuitas se actualizan aproximadamente una vez al día, no en tiempo real tick-a-tick (eso normalmente requiere un proveedor de datos de mercado pago). Es la mejor combinación de "gratis + sin key + confiable" para un uso cotidiano de referencia. Si en algún momento necesitás una tasa realmente en vivo (segundos de desfase), avisá y se puede cambiar la fuente por una de pago (ej. exchangerate-api.com plan pago, CurrencyLayer, etc.), el resto de la app no cambia.

## Estructura

```
index.html   → toda la app (UI + lógica), sin dependencias externas
manifest.json → metadata de instalación como PWA
sw.js         → service worker, cachea el shell para apertura instantánea
icon.svg      → ícono de la app
```
