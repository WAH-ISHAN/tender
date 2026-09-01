<?php

namespace App\Filters;

use App\Libraries\Jwt;
use CodeIgniter\Filters\FilterInterface;
use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;

/** Is this token valid, unexpired and ours? Claims are attached to the request
 *  so no controller ever re-parses the token. */
class AuthJwt implements FilterInterface
{
    public function before(RequestInterface $request, $arguments = null)
    {
        $header = $request->getHeaderLine('Authorization');
        $token  = str_starts_with($header, 'Bearer ') ? substr($header, 7) : '';

        $claims = $token !== '' ? Jwt::parse($token) : null;

        if ($claims === null) {
            return problem(401, 'unauthenticated', 'Sign in to continue.');
        }

        $request->claims = $claims;
        $request->userId = (int) ($claims['sub'] ?? 0);
        $request->plan   = (string) ($claims['plan'] ?? 'free');

        return null;
    }

    public function after(RequestInterface $request, ResponseInterface $response, $arguments = null) {}
}
