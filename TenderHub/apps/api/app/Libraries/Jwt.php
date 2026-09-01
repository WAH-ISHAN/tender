<?php

namespace App\Libraries;

use Firebase\JWT\JWT as FirebaseJwt;
use Firebase\JWT\Key;
use RuntimeException;

/**
 * HS256, 15-minute access tokens. Deliberately small: user, org, role, group,
 * status, plan, display name. Entitlements are re-read server-side on every
 * request, so a downgrade or a suspension takes effect within fifteen minutes
 * rather than whenever a long-lived token happens to expire.
 */
final class Jwt
{
    public const TTL = 900; // 15 minutes

    public static function secret(): string
    {
        $secret = (string) (env('auth.jwtSecret') ?? '');

        // Fail loudly. Signing production tokens with a framework default is
        // the kind of thing nobody notices until it is being exploited.
        if (strlen($secret) < 32) {
            throw new RuntimeException('auth.jwtSecret is missing or shorter than 32 characters.');
        }

        return $secret;
    }

    public static function issue(array $claims, int $ttl = self::TTL): string
    {
        $now = time();

        return FirebaseJwt::encode(array_merge($claims, [
            'iss' => 'tenderhub.lk',
            'iat' => $now,
            'nbf' => $now,
            'exp' => $now + $ttl,
        ]), self::secret(), 'HS256');
    }

    public static function parse(string $token): ?array
    {
        try {
            return (array) FirebaseJwt::decode($token, new Key(self::secret(), 'HS256'));
        } catch (\Throwable) {
            return null;
        }
    }
}
