# My Tours Cartagena — Landing page

Landing turística, mobile-first y lista para publicar para **My Tours Cartagena**
(tours, islas, barcos, chivas, Medellín y alojamientos).

## Cómo verla
- **Opción rápida:** doble clic en `index.html` (funciona sin internet, salvo la fuente de Google).
- **Con servidor local:** `node server.js` y abre `http://localhost:5206`.

## Estructura
```
index.html              → estructura de la página
assets/css/styles.css   → estilos (paleta basada en el logo)
assets/js/data.js        → CATÁLOGO (aquí editas productos y precios)
assets/js/app.js         → lógica (filtros, modal, carrito, formulario, WhatsApp)
assets/img/              → logos + imágenes de cada experiencia
```

## Editar contenido frecuente
Todo se edita en **`assets/js/data.js`**:

- **WhatsApp / contacto:** objeto `CONFIG` (línea principal `whatsapp`, alterna, Instagram).
- **Precios:** cada producto tiene `price` (precio actual) y `oldPrice` (precio anterior, se muestra tachado).
  - Sin precio → deja `price: null` y aparecerá **“Consultar precio”** (no se inventan valores).
- **Categorías:** arreglo `CATEGORIES`.
- **Imágenes por producto:** campo `img`; la galería se arma sola con el pool de la categoría (`IMG_POOL`).

## Notas
- Las imágenes son de bancos libres (Flickr Creative Commons vía LoremFlickr) y conservan
  una pequeña marca de atribución en una esquina. Puedes reemplazar cualquier `assets/img/*.jpg`
  por una foto propia manteniendo el mismo nombre de archivo.
- El catálogo se interpretó y organizó a partir de `Catalogo.txt`, separando cada servicio,
  agrupándolo por zona/tipo y respetando los precios (actuales y anteriores) tal como aparecen.
- El botón **Reservar / Continuar** arma un mensaje de WhatsApp con los servicios seleccionados,
  precios, total aproximado y los datos del cliente.

💳 Recuerda: los pagos con tarjeta tienen un recargo del 6%.

## Publicación (Cloudflare Pages)
- **Sitio en vivo:** https://mytourscartagena.pages.dev — **activo** (verificado 2026-09-15, HTTP 200).
- **Proyecto Cloudflare Pages:** `mytourscartagena`
- **Publicar cambios:** `powershell -ExecutionPolicy Bypass -File deploy.ps1`
  - El script arma una carpeta limpia `dist/` (solo `index.html` + `assets/`) y la sube con `wrangler`.
  - Rutas ya son portables (`Split-Path -Parent $MyInvocation.MyCommand.Path`), funciona desde cualquier clon del repo.
- **Suspender (impago):** `powershell -ExecutionPolicy Bypass -File suspend.ps1` — publica aviso de mantenimiento sin borrar nada. Reactivar con `deploy.ps1`.
- Requiere estar autenticado en Cloudflare (`wrangler whoami`).

Detalle completo de historial y pendientes: ver [`CONTEXTO.md`](CONTEXTO.md).
