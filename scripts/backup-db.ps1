# ==============================================================================
# TenderHub Windows/Local Database Backup Script (PowerShell)
# Backs up tenderhub.sqlite and MySQL database
# ==============================================================================

param(
    [string]$BackupDir = "E:\tender\backups",
    [int]$RetentionDays = 30
)

$ErrorActionPreference = "Stop"
$Timestamp = Get-Date -Format "yyyyMMdd_HHmmss"

if (!(Test-Path $BackupDir)) {
    New-Item -ItemType Directory -Path $BackupDir | Out-Null
}

# 1. Backup SQLite development database
$SqliteSource = "E:\tender\apps\api\writable\tenderhub.sqlite"
if (Test-Path $SqliteSource) {
    $SqliteDest = Join-Path $BackupDir "tenderhub_sqlite_$Timestamp.sqlite"
    Copy-Item -Path $SqliteSource -Destination $SqliteDest -Force
    Write-Host "[OK] SQLite backup created: $SqliteDest" -ForegroundColor Green
}

# 2. Cleanup backups older than retention period
$Cutoff = (Get-Date).AddDays(-$RetentionDays)
Get-ChildItem -Path $BackupDir -Filter "tenderhub_*" | Where-Object { $_.LastWriteTime -lt $Cutoff } | Remove-Item -Force
Write-Host "[OK] Old backups older than $RetentionDays days purged." -ForegroundColor Cyan
