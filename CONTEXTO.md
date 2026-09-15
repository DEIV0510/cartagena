# CONTEXTO - ever-correa
> Actualizado: 2026-09-15 - Sesion Claude Code (reactivacion + fix rutas)

## Cliente y proposito

Landing page turistica para **My Tours Cartagena**, operadora de **Ever Correa**
(carpeta original: `LANDING EVER CORREEA`).

- **Negocio:** My Tours Cartagena - tours y experiencias en Colombia.
- **Catalogo:** tours, islas, barcos, chivas rumberas, Medellin, alojamientos.
- **Enfoque:** mobile-first, catalogo con precios, cierre por WhatsApp
  (carrito -> mensaje automatico con servicios, precios, total aproximado).
- **Aviso comercial:** pagos con tarjeta recargo 6%.
- Datos de contacto (WhatsApp, Instagram) viven en `CONFIG` de `assets/js/data.js`;
  no se transcriben aqui.

### Relacion con `evert-3` - NO son el mismo cliente

Nombres parecidos ("Ever" / "Evert") pero dos clientes distintos:

| | `ever-correa` (este) | `evert-3` |
|---|---|---|
| Negocio | My Tours Cartagena (turismo) | EA Capital S.A.S. (financiero) |
| Proyecto Cloudflare | `mytourscartagena` | `eacapitalangeles` |
| Dominio | mytourscartagena.pages.dev | eacapitalangeles.pages.dev |

No comparten codigo, assets ni proyecto Cloudflare. **No mezclar.**

## Estado actual (verificado 2026-09-15)

- **URL de produccion:** https://mytourscartagena.pages.dev - **HTTP 200, landing real ACTIVA.**
  Title confirmado: `My Tours Cartagena · Tours y experiencias en Colombia`.
- **Historial de suspension:** el sitio estuvo suspendido (aviso "Sitio en mantenimiento",
  `noindex`) desde ~19/06/2026. El **2026-09-15 se reactivo** corriendo `deploy.ps1`
  (deploy `6691f63b`, 64 archivos, rama `main`). Causa de la suspension original
  (impago del cliente) **sigue sin confirmar por transcript** - preguntar a Diego si
  hace falta saber el motivo exacto.
- **Rutas hardcodeadas CORREGIDAS en esta sesion** (2026-09-15): `deploy.ps1` y
  `suspend.ps1` apuntaban a `C:\Users\diego\Desktop\LANDINGS PAGE\LANDING EVER CORREEA`
  (no existe tras clonar/mover el repo). Ambos scripts ahora usan:
  ```powershell
  $root = Split-Path -Parent $MyInvocation.MyCommand.Path
  ```
  Ya son portables, funcionan desde cualquier ubicacion del repo. **Este pendiente
  del CONTEXTO anterior queda resuelto.**
- Sin dominio propio; se usa `.pages.dev` gratuito.
- Sin tokens/claves en el repo; despliegue depende de sesion OAuth de `wrangler`
  en la maquina (verificado activa: cuenta `diegoortizgo@gmail.com`, account ID
  `716b72b511427b1a8c73843627c8a018`).

## Stack y estructura

Sitio **estatico** (HTML + CSS + JS vanilla, una sola pagina, sin build step).

```
index.html                -> estructura de la pagina
assets/css/styles.css     -> estilos (paleta derivada del logo)
assets/js/data.js         -> CATALOGO: CONFIG (WhatsApp, Instagram), CATEGORIES, productos, precios, IMG_POOL
assets/js/app.js          -> logica: filtros, modal, carrito, formulario, mensaje de WhatsApp
assets/img/               -> ~50 imagenes (isla-*, barco-*, playa-*, chiva-*, med-*, city-*, aloj-*, gallery-*, hero-*)
Catalogo.txt              -> catalogo crudo del cliente (fuente de verdad, NO se publica)
Logo/                     -> logos originales PNG (fuente, NO se publica)
Informacion.txt           -> vacio (pendiente)
server.js                 -> preview local Node (puerto 5206)
deploy.ps1                -> construye dist/ y publica landing real [RUTA CORREGIDA 2026-09-15]
suspend.ps1               -> publica aviso de mantenimiento [RUTA CORREGIDA 2026-09-15]
_suspended/               -> aviso "Sitio en mantenimiento" (index.html + 404.html) [encoding roto, ver Pendientes]
dist/                     -> salida de build (index.html + 404.html + assets/)
README.md                 -> guia de uso tecnica
```

**Como se sirve:** `deploy.ps1` reconstruye `dist/` copiando solo `index.html` y
`assets/`, duplica `index.html` como `404.html` (fallback SPA), crea el proyecto
Pages si no existe, despliega con `wrangler pages deploy` a `--branch=main`.
Quedan fuera `Catalogo.txt`, `server.js`, `README.md`, `Logo/`.

## Decisiones importantes

- **Precios tal cual `Catalogo.txt`**: `price` (actual) y `oldPrice` (anterior,
  tachado). Sin precio -> `price: null` -> ficha muestra "Consultar precio".
  No se inventan valores.
- **Imagenes de banco libre** (LoremFlickr / Creative Commons) con marca de
  atribucion en una esquina. Reemplazables manteniendo el mismo nombre de archivo.
- **Todo el contenido editable centralizado en `assets/js/data.js`** (WhatsApp,
  Instagram, categorias, productos, precios, imagenes). No tocar el HTML para
  cambios de catalogo.
- **404.html = index.html** para que cualquier ruta sirva la landing.
- **Suspension no destructiva:** se publica un aviso encima, se restaura con un
  solo comando (`deploy.ps1`). El aviso lleva `noindex`.
- `deploy.ps1` crea el proyecto de Pages si no existe -> idempotente.

## Pendientes / proximos pasos

- [ ] **Confirmar con Diego el motivo/estado de pago** que origino la suspension
      de junio 2026 (no crítico para operar, solo para historial).
- [ ] `_suspended/index.html` tiene acentos y emoji rotos por encoding
      ("PÃ¡gina", "ðŸ› ï¸"): reguardar en UTF-8 antes de volver a usarlo (solo
      importa si se necesita suspender de nuevo).
- [ ] Reemplazar imagenes de banco libre por fotos reales del operador (quita
      marca de atribucion, mejora conversion).
- [ ] Evaluar dominio propio (hoy solo `.pages.dev`).
- [ ] `Informacion.txt` vacio: completar con brief del cliente o eliminar.
- [x] ~~Corregir rutas hardcodeadas en deploy.ps1/suspend.ps1~~ - **RESUELTO 2026-09-15**.
- [x] ~~Confirmar estado real del sitio~~ - **RESUELTO 2026-09-15: reactivado y verificado 200 OK**.

## Como retomar el trabajo (en cualquier maquina/sesion nueva)

Requisitos: **Node.js** (solo preview local) y **wrangler** con sesion Cloudflare
iniciada.

```powershell
# 1. Comprobar sesion de Cloudflare
wrangler whoami
# si no hay sesion:
wrangler login

# 2. Ver el sitio en local
cd "C:\Users\diego\OneDrive\Desktop\Landing Page\landing-pages\projects\ever-correa"
node server.js          # -> http://localhost:5206
#    (o doble clic en index.html; funciona sin internet salvo la fuente de Google)

# 3. Publicar cambios (rutas ya corregidas, funciona desde cualquier ubicacion)
powershell -ExecutionPolicy Bypass -File deploy.ps1
#    -> https://mytourscartagena.pages.dev

# 4. SUSPENDER por impago (publica aviso de mantenimiento, no borra nada)
powershell -ExecutionPolicy Bypass -File suspend.ps1

# 5. REACTIVAR tras el pago
powershell -ExecutionPolicy Bypass -File deploy.ps1

# Equivalente manual de deploy:
wrangler pages deploy dist --project-name=mytourscartagena --branch=main --commit-dirty=true
```

Para cambios de contenido frecuentes (precios, WhatsApp, categorias, productos,
imagenes): editar **`assets/js/data.js`** y correr `deploy.ps1` de nuevo.

**Verificar tras cada deploy:**
```powershell
curl -s -o /dev/null -w "%{http_code}`n" https://mytourscartagena.pages.dev
```
Debe devolver `200`. Avisar URL al usuario e indicar Ctrl+F5 (cache).
