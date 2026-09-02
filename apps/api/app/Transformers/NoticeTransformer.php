<?php

namespace App\Transformers;

/**
 * THE PAYWALL.
 *
 * One class decides what leaves the server, and it is deliberately the only
 * one. The rule:
 *
 *   A withheld field is NOT SERIALISED. It never reaches the browser in any
 *   form — not blurred, not truncated, not hidden behind CSS, not sitting in a
 *   React props payload. The `locked` array carries only the NAMES of withheld
 *   fields so the interface can render an honest explanation panel in their
 *   place.
 *
 * Two leaks were caught in Rev 3.0 and both were the same shape: a field
 * withheld from the visible page but still present in the payload (JSON-LD in
 * one case, an RSC client-component prop in the other). The standing rule that
 * came out of it — the transformer decides what exists, not the component. A
 * user interface that hides what the payload contains is not confidentiality,
 * it is a leak with a stylesheet over it.
 */
final class NoticeTransformer
{
    /** Always public. The closing date is never masked at any tier: it is the
     *  one thing this product sells, and a bidder who misses a tender because
     *  of us does not come back. */
    private const ALWAYS = [
        'id', 'kind', 'reference', 'slug', 'title', 'sector', 'category', 'district',
        'estimated_value', 'currency', 'closing_at', 'opening_at', 'status',
        'documents_count', 'is_native',
    ];

    private const RELEASE = [
        'guest'    => ['summary_teaser'],
        'free'     => ['summary_teaser', 'summary', 'description_teaser', 'buyer', 'published_at'],
        'paid'     => ['summary_teaser', 'summary', 'description_teaser', 'buyer', 'published_at',
                       'description', 'documents', 'contact_officer', 'contact_phone', 'contact_email',
                       'source_url', 'document_fee', 'bid_security'],
    ];

    private const GATED = [
        'summary', 'description', 'description_teaser', 'buyer', 'published_at', 'documents',
        'contact_officer', 'contact_phone', 'contact_email', 'source_url',
        'document_fee', 'bid_security',
    ];

    public static function tierFor(?array $viewer): string
    {
        if ($viewer === null) {
            return 'guest';
        }

        $plan = $viewer['plan'] ?? 'free';
        if (in_array($plan, ['business', 'publish', 'enterprise', 'staff'], true)
            && ($viewer['sub_status'] ?? 'active') !== 'expired') {
            return 'paid';
        }

        return 'free';
    }

    public static function collection(array $rows, string $tier, array $extra = []): array
    {
        return array_map(static fn (array $r) => self::one($r, $tier, $extra[$r['id']] ?? []), $rows);
    }

    public static function one(array $row, string $tier, array $extra = []): array
    {
        $released = self::RELEASE[$tier] ?? self::RELEASE['guest'];

        $full = [
            'id'              => (int) $row['id'],
            'kind'            => $row['kind'],
            'reference'       => $row['reference'],
            'slug'            => $row['slug'],
            'title'           => $row['title'],
            'sector'          => $row['sector'],
            'category'        => $row['category_name'] ?? null,
            'category_slug'   => $row['category_slug'] ?? null,
            'district'        => $row['district_name'] ?? null,
            'district_slug'   => $row['district_slug'] ?? null,
            'estimated_value' => $row['estimated_value'] !== null ? (float) $row['estimated_value'] : null,
            'currency'        => $row['currency'] ?? 'LKR',
            'closing_at'      => $row['closing_at'],
            'opening_at'      => $row['opening_at'],
            'status'          => self::liveStatus($row),
            'documents_count' => (int) ($row['documents_count'] ?? 0),
            'is_native'       => ! empty($row['org_id']),

            'summary_teaser'  => self::firstLine($row['summary'] ?? ''),
            'summary'         => $row['summary'] ?? null,
            'description'     => $row['description'] ?? null,
            'description_teaser' => self::truncate($row['description'] ?? '', 320),
            'buyer'           => $row['authority_name'] ?? $row['org_name'] ?? null,
            'published_at'    => $row['published_at'] ?? null,
            'contact_officer' => $row['contact_officer'] ?? null,
            'contact_phone'   => $row['contact_phone'] ?? null,
            'contact_email'   => $row['contact_email'] ?? null,
            'source_url'      => $row['source_url'] ?? null,
            'document_fee'    => isset($row['document_fee']) ? (float) $row['document_fee'] : null,
            'bid_security'    => isset($row['bid_security']) ? (float) $row['bid_security'] : null,
            'documents'       => $extra['documents'] ?? [],
        ];

        if (isset($extra['auction'])) {
            $full['auction'] = $extra['auction'];
        }

        $out    = [];
        $locked = [];

        foreach ($full as $key => $value) {
            if (in_array($key, self::ALWAYS, true) || $key === 'category_slug' || $key === 'district_slug' || $key === 'auction') {
                $out[$key] = $value;
                continue;
            }

            if (in_array($key, $released, true)) {
                $out[$key] = $value;
                continue;
            }

            if (in_array($key, self::GATED, true)) {
                $locked[] = $key;
            }
        }

        $out['locked'] = array_values(array_unique($locked));
        $out['tier']   = $tier;

        return $out;
    }

    public static function liveStatus(array $row): string
    {
        if (($row['status'] ?? '') !== 'published') {
            return $row['status'] ?? 'draft';
        }

        $closing = strtotime((string) ($row['closing_at'] ?? '')) ?: 0;
        if ($closing === 0) {
            return 'published';
        }

        $now = time();
        if ($closing < $now) {
            return 'closed';
        }

        return $closing - $now <= 7 * 86400 ? 'closing_soon' : 'live';
    }

    private static function firstLine(string $text): string
    {
        $text = trim(strip_tags($text));
        if ($text === '') {
            return '';
        }
        $parts = preg_split('/(?<=[.!?])\s+/', $text, 2);

        return trim($parts[0] ?? $text);
    }

    private static function truncate(string $text, int $len): string
    {
        $text = trim(strip_tags($text));

        return strlen($text) <= $len ? $text : rtrim(substr($text, 0, $len)) . '…';
    }
}
