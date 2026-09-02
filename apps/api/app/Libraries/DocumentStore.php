<?php

namespace App\Libraries;

/**
 * Content-addressed blob store.
 *
 * The path is derived from the SHA-256 of the bytes, fanned two characters at a
 * time (aa/bb/<sha256>.pdf) because a hundred thousand files in one directory is
 * a filesystem that stops answering. Consequences that fall out for free: the
 * same document attached to four notices is stored once, re-mirroring an
 * unchanged file costs nothing, and a stored file can always be checked against
 * what we said it was.
 *
 * Writes are atomic — temporary name, then rename — so a half-written file is
 * never readable under a hash promising complete content.
 */
final class DocumentStore
{
    public const MAX_BYTES = 41943040; // 40 MB

    public const ALLOWED = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'zip', 'jpg', 'jpeg', 'png'];

    public function __construct(private string $root = WRITEPATH . 'documents') {}

    public function pathFor(string $sha256, string $ext = 'pdf'): string
    {
        $ext = strtolower(preg_replace('/[^a-z0-9]/i', '', $ext) ?: 'bin');

        return sprintf('%s/%s/%s.%s', substr($sha256, 0, 2), substr($sha256, 2, 2), $sha256, $ext);
    }

    public function absolute(string $relative): string
    {
        return rtrim($this->root, '/') . '/' . ltrim($relative, '/');
    }

    public function exists(string $relative): bool
    {
        return is_file($this->absolute($relative));
    }

    /** @return array{sha256:string,path:string,size:int,deduped:bool} */
    public function put(string $bytes, string $ext = 'pdf'): array
    {
        $sha  = hash('sha256', $bytes);
        $rel  = $this->pathFor($sha, $ext);
        $abs  = $this->absolute($rel);

        if (is_file($abs)) {
            return ['sha256' => $sha, 'path' => $rel, 'size' => strlen($bytes), 'deduped' => true];
        }

        @mkdir(dirname($abs), 0775, true);
        $tmp = $abs . '.' . bin2hex(random_bytes(6)) . '.tmp';
        file_put_contents($tmp, $bytes);
        rename($tmp, $abs);

        return ['sha256' => $sha, 'path' => $rel, 'size' => strlen($bytes), 'deduped' => false];
    }

    public function read(string $relative): ?string
    {
        $abs = $this->absolute($relative);

        return is_file($abs) ? (string) file_get_contents($abs) : null;
    }

    public static function signingKey(): string
    {
        return (string) (env('files.signingKey') ?: env('auth.jwtSecret'));
    }

    /**
     * A link is bound to one document, one user and one expiry, all three
     * covered by the same HMAC, so it cannot be re-pointed at another document
     * or handed to someone else by editing the query string.
     */
    public static function sign(int $docId, int $userId, int $expires): string
    {
        return hash_hmac('sha256', implode('|', [$docId, $userId, $expires]), self::signingKey());
    }

    public static function verify(int $docId, int $userId, int $expires, string $given): bool
    {
        if ($expires < time()) {
            return false;
        }

        // Constant time. A timing side channel on an HMAC is a forgeable link.
        return hash_equals(self::sign($docId, $userId, $expires), $given);
    }
}
