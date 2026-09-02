<?php

use CodeIgniter\HTTP\ResponseInterface;

if (! function_exists('problem')) {
    /**
     * RFC 9457 application/problem+json. Always a machine-readable `reason`,
     * and where relevant an `upgrade_to`, so the front end renders the exact
     * upsell instead of a generic error.
     */
    function problem(int $status, string $reason, string $detail, array $extra = []): ResponseInterface
    {
        return service('response')
            ->setStatusCode($status)
            ->setContentType('application/problem+json')
            ->setBody(json_encode(array_merge([
                'type'   => 'https://tenderhub.lk/problems/' . $reason,
                'title'  => ucfirst(str_replace('_', ' ', $reason)),
                'status' => $status,
                'reason' => $reason,
                'detail' => $detail,
            ], $extra), JSON_UNESCAPED_SLASHES));
    }
}

if (! function_exists('envelope')) {
    /**
     * Success is { data, meta }. meta.now carries server time on EVERY payload,
     * so the browser never uses its own clock to compute a countdown — a
     * deadline is the one thing this product cannot get wrong.
     */
    function envelope(mixed $data, array $meta = []): array
    {
        return ['data' => $data, 'meta' => array_merge(['now' => date('c')], $meta)];
    }
}
