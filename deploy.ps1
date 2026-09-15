# =========================================================
#  Deploy My Tours Cartagena -> Cloudflare Pages
#  Proyecto: mytourscartagena  (https://mytourscartagena.pages.dev)
#  Uso:  powershell -ExecutionPolicy Bypass -File deploy.ps1
# =========================================================
$ErrorActionPreference = 'Stop'
$root    = Split-Path -Parent $MyInvocation.MyCommand.Path
$dist    = Join-Path $root 'dist'
$project = 'mytourscartagena'

Write-Host "==> Construyendo carpeta de publicacion (dist)..." -ForegroundColor Cyan
if (Test-Path $dist) { Remove-Item $dist -Recurse -Force }
New-Item -ItemType Directory -Force -Path $dist | Out-Null

# Solo los archivos del sitio (sin Catalogo.txt, server.js, README, Logo/ fuente)
Copy-Item (Join-Path $root 'index.html') $dist
Copy-Item (Join-Path $root 'assets')     $dist -Recurse

# SPA/404 fallback -> sirve la landing en cualquier ruta
Copy-Item (Join-Path $root 'index.html') (Join-Path $dist '404.html')

Write-Host "==> Verificando proyecto en Cloudflare Pages..." -ForegroundColor Cyan
$exists = $false
try {
  $list = (wrangler pages project list 2>&1 | Out-String)
  if ($list -match [regex]::Escape($project)) { $exists = $true }
} catch {}
if (-not $exists) {
  Write-Host "==> Creando proyecto '$project'..." -ForegroundColor Yellow
  wrangler pages project create $project --production-branch=main
}

Write-Host "==> Publicando en Cloudflare Pages..." -ForegroundColor Cyan
wrangler pages deploy "$dist" --project-name=$project --branch=main --commit-dirty=true

Write-Host "==> Listo. Sitio: https://$project.pages.dev" -ForegroundColor Green
