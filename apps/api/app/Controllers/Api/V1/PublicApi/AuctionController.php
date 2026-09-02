<?php

namespace App\Controllers\Api\V1\PublicApi;

/** Same catalogue, kind fixed by the route. Tenders and auctions answer the
 *  same questions — what, where, when does it close, who runs it. */
class AuctionController extends NoticeController
{
    protected string $kind = 'auction';
}
