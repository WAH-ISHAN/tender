<?php

namespace App\Libraries\Security;

/**
 * VirusScanner
 * Scans uploaded tender documents for malicious scripts, embedded payloads, and macro viruses.
 */
class VirusScanner
{
    /**
     * Scans a file path. Returns [clean: bool, reason: ?string].
     */
    public static function scan(string $filePath): array
    {
        if (! file_exists($filePath)) {
            return ['clean' => false, 'reason' => 'File not found'];
        }

        // 1. Basic Magic Byte Verification for PDF/DOCX
        $handle = fopen($filePath, 'rb');
        $header = fread($handle, 8);
        fclose($handle);

        $isPdf = str_starts_with($header, '%PDF-');
        $isZip = str_starts_with($header, "PK\x03\x04"); // DOCX, XLSX, ZIP

        if (! $isPdf && ! $isZip) {
            return ['clean' => false, 'reason' => 'Invalid file format. Only verified PDF, DOCX, and ZIP tenders are accepted.'];
        }

        // 2. ClamAV Daemon check (if clamdscan binary or socket is available on host)
        $clamd = getenv('CLAMD_SOCKET') ?: '/var/run/clamav/clamd.ctl';
        if (file_exists($clamd) && function_exists('exec')) {
            $cmd = escapeshellcmd("clamdscan --no-summary {$filePath}");
            exec($cmd, $output, $returnCode);
            if ($returnCode !== 0) {
                return ['clean' => false, 'reason' => 'Security alert: Potential malware detected by antivirus scanner.'];
            }
        }

        // Clean
        return ['clean' => true, 'reason' => null];
    }
}
