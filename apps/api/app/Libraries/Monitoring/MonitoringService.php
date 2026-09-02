<?php

namespace App\Libraries\Monitoring;

/**
 * MonitoringService
 * Initializes Sentry error reporting and captures system health metrics.
 */
class MonitoringService
{
    private static bool $initialized = false;

    public static function init(): void
    {
        if (self::$initialized) {
            return;
        }

        $dsn = getenv('SENTRY_DSN');
        if (! empty($dsn) && function_exists('\Sentry\init')) {
            \Sentry\init([
                'dsn'         => $dsn,
                'environment' => getenv('CI_ENVIRONMENT') ?: 'production',
                'release'     => 'tenderhub@3.0.0',
            ]);
        }

        self::$initialized = true;
    }

    /**
     * Captures an exception to Sentry / system error log.
     */
    public static function captureException(\Throwable $exception): void
    {
        self::init();

        if (function_exists('\Sentry\captureException')) {
            \Sentry\captureException($exception);
        } else {
            log_message('error', '[SENTRY_FALLBACK] ' . $exception->getMessage() . "\n" . $exception->getTraceAsString());
        }
    }

    /**
     * Performs a 360-degree health heartbeat on database, storage, and disk.
     */
    public static function checkHealth(): array
    {
        $status = 'ok';
        $checks = [];

        // 1. Database Connectivity
        try {
            $db = db_connect();
            $db->query('SELECT 1');
            $checks['database'] = ['status' => 'ok', 'message' => 'Connected'];
        } catch (\Throwable $e) {
            $status = 'degraded';
            $checks['database'] = ['status' => 'fail', 'message' => $e->getMessage()];
        }

        // 2. Storage Directory Writable
        $writablePath = WRITEPATH . 'documents';
        if (is_writable($writablePath)) {
            $checks['storage'] = ['status' => 'ok', 'path' => $writablePath];
        } else {
            $status = 'degraded';
            $checks['storage'] = ['status' => 'fail', 'message' => 'Documents directory not writable'];
        }

        // 3. Free Disk Space
        $freeBytes = disk_free_space(ROOTPATH);
        $freeMb    = $freeBytes ? round($freeBytes / 1048576) : 0;
        $checks['disk'] = [
            'status'  => $freeMb > 1000 ? 'ok' : 'warn',
            'free_mb' => $freeMb,
        ];

        return [
            'status'     => $status,
            'timestamp'  => date('c'),
            'checks'     => $checks,
        ];
    }
}
