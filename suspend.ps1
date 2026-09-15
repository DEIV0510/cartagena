# =========================================================
#  SUSPENDER la landing -> publica el aviso de mantenimiento
#  (no toca la landing real; restaura con deploy.ps1)
#  Uso:  powershell -ExecutionPolicy Bypass -File suspend.ps1
# =========================================================
$ErrorActionPreference = 'Stop'
$root    = Split-Path -Parent $MyInvocation.MyCommand.Path
$dir     = Join-Path $root '_suspended'
$project = 'mytourscartagena'

# el aviso también responde en rutas desconocidas
Copy-Item (Join-Path $dir 'index.html') (Join-Path $dir '404.html') -Force

Write-Host "==> Publicando AVISO DE MANTENIMIENTO en Cloudflare..." -ForegroundColor Yellow
wrangler pages deploy "$dir" --project-name=$project --branch=main --commit-dirty=true

Write-Host "==> Landing SUSPENDIDA. Para reactivarla cuando te paguen: deploy.ps1" -ForegroundColor Green
Write-Host "    Sitio: https://$project.pages.dev" -ForegroundColor Green
