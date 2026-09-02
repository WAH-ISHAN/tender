<?php

use CodeIgniter\Router\RouteCollection;

/** @var RouteCollection $routes */

$routes->get('/', static fn () => service('response')
    ->setJSON(['data' => ['service' => 'TenderHub API', 'version' => '3.0'], 'meta' => ['now' => date('c')]]));

$routes->group('api/v1', ['namespace' => 'App\Controllers\Api\V1'], static function ($routes) {

    // ----------------------------------------------------------- public
    $routes->group('', ['namespace' => 'App\Controllers\Api\V1\PublicApi'], static function ($routes) {
        $routes->get('notices', 'NoticeController::index');
        $routes->get('notices/(:segment)', 'NoticeController::show/$1');
        $routes->get('auctions', 'AuctionController::index');
        $routes->get('auctions/(:segment)', 'AuctionController::show/$1');
        $routes->get('awards', 'MiscController::awards');
        $routes->get('stats/summary', 'MiscController::summary');
        $routes->get('taxonomy/(:segment)', 'MiscController::taxonomy/$1');
    });

    // ------------------------------------------------------------- auth
    $routes->group('auth', ['namespace' => 'App\Controllers\Api\V1\Auth', 'filter' => 'throttle:30'], static function ($routes) {
        $routes->post('register', 'AuthController::register');
        $routes->post('login', 'AuthController::login');
        $routes->post('otp/request', 'AuthController::otpRequest');
        $routes->post('otp/verify', 'AuthController::otpVerify');
        $routes->post('refresh', 'AuthController::refresh');
        $routes->post('logout', 'AuthController::logout');
    });

    // ----------------------------------------------- member (the bidder)
    // group:bidder runs BEFORE entitlement:* — a wrong-role caller gets 403,
    // not a 402 upsell for a product they cannot buy.
    $routes->group('me', [
        'namespace' => 'App\Controllers\Api\V1\Member',
        'filter'    => ['auth-jwt', 'tenant', 'group:bidder'],
    ], static function ($routes) {
        $routes->get('subscription', 'MemberController::subscription');
        $routes->post('subscription/claim', 'MemberController::claim');
        $routes->get('bids', 'BidController::index');
        $routes->post('bids', 'BidController::create');
        $routes->post('bids/(:num)/stage', 'BidController::move/$1');
        $routes->get('vault', 'BidController::vault');
    });

    $routes->group('me', [
        'namespace' => 'App\Controllers\Api\V1\Member',
        'filter'    => ['auth-jwt', 'tenant', 'group:bidder', 'entitlement:feed'],
    ], static function ($routes) {
        $routes->get('feed', 'MemberController::feed');
        $routes->get('alert-profiles', 'MemberController::profiles');
        $routes->post('alert-profiles', 'MemberController::createProfile');
        $routes->get('alert-profiles/(:num)/preview', 'MemberController::previewProfile/$1');
    });

    $routes->group('me', [
        'namespace' => 'App\Controllers\Api\V1\Member',
        'filter'    => ['auth-jwt', 'tenant', 'group:bidder', 'entitlement:documents'],
    ], static function ($routes) {
        $routes->get('notices/(:segment)', 'MemberController::notice/$1');
        $routes->get('notices/(:num)/documents/(:num)/url', 'MemberController::documentUrl/$1/$2');
    });

    $routes->group('me', [
        'namespace' => 'App\Controllers\Api\V1\Member',
        'filter'    => ['auth-jwt', 'tenant', 'group:bidder', 'entitlement:esubmission'],
    ], static function ($routes) {
        $routes->post('submissions', 'BidController::lodge');
        $routes->get('submissions/(:num)/receipt', 'BidController::receipt/$1');
        $routes->post('tenders/(:num)/buy-documents', '\App\Controllers\Api\V1\Authority\SaleController::buyDocuments/$1');
    });

    // ----------------------------------- authority (the buy-side workspace)
    $routes->group('authority', [
        'namespace' => 'App\Controllers\Api\V1\Authority',
        'filter'    => ['auth-jwt', 'tenant', 'group:company', 'entitlement:publish'],
    ], static function ($routes) {
        $routes->get('tenders', 'TenderController::index');
        $routes->post('tenders', 'TenderController::create');
        $routes->get('tenders/(:num)', 'TenderController::show/$1');
        $routes->post('tenders/(:num)/submit-for-approval', 'TenderController::submitForApproval/$1');
        $routes->post('tenders/(:num)/approve', 'TenderController::approve/$1');
        $routes->post('tenders/(:num)/publish', 'TenderController::publish/$1');

        $routes->get('tenders/(:num)/documents', 'SaleController::documents/$1');
        $routes->post('tenders/(:num)/documents', 'SaleController::upload/$1');
        $routes->get('tenders/(:num)/documents/(:num)/url', 'SaleController::documentUrl/$1/$2');
        $routes->delete('tenders/(:num)/documents/(:num)', 'SaleController::deleteDocument/$1/$2');
        $routes->get('tenders/(:num)/purchasers', 'SaleController::purchasers/$1');
        $routes->get('tenders/(:num)/clarifications', 'SaleController::clarifications/$1');
        $routes->post('tenders/(:num)/clarifications/(:num)/answer', 'SaleController::answer/$1/$2');
        $routes->get('tenders/(:num)/addenda', 'SaleController::addenda/$1');
        $routes->post('tenders/(:num)/addenda', 'SaleController::issueAddendum/$1');

        $routes->get('tenders/(:num)/submissions', 'OpeningController::submissions/$1');
        $routes->post('tenders/(:num)/opening/start', 'OpeningController::start/$1');
        $routes->post('tenders/(:num)/opening/countersign', 'OpeningController::countersign/$1');

        $routes->get('tenders/(:num)/evaluation', 'EvaluationController::sheet/$1');
        $routes->post('tenders/(:num)/evaluation/coi', 'EvaluationController::declare/$1');
        $routes->post('tenders/(:num)/evaluation/criteria', 'EvaluationController::criteria/$1');
        $routes->post('tenders/(:num)/evaluation/scores', 'EvaluationController::score/$1');

        $routes->get('tenders/(:num)/award', 'AwardController::show/$1');
        $routes->post('tenders/(:num)/award', 'AwardController::create/$1');
        $routes->post('tenders/(:num)/rating', 'AwardController::rate/$1');
        $routes->get('tenders/(:num)/evidence', 'AwardController::evidence/$1');

        $routes->get('suppliers', 'TeamController::suppliers');
        $routes->get('team', 'TeamController::index');
        $routes->post('team/invitations', 'TeamController::invite');
        $routes->put('team/(:num)/role', 'TeamController::changeRole/$1');
        $routes->get('profile', 'TeamController::profile');
        $routes->put('profile', 'TeamController::profile');

        $routes->get('auctions', 'AuctionWorkspaceController::index');
        $routes->post('auctions', 'AuctionWorkspaceController::create');
        $routes->post('auctions/(:num)/publish', 'AuctionWorkspaceController::publish/$1');
        $routes->post('auctions/(:num)/result', 'AuctionWorkspaceController::result/$1');
    });

    // ------------------------------------------------------------ admin
    $routes->group('admin', [
        'namespace' => 'App\Controllers\Api\V1\Admin',
        'filter'    => ['auth-jwt', 'tenant', 'group:staff', 'entitlement:admin'],
    ], static function ($routes) {
        $routes->get('reports/health', 'ReportController::health');
        $routes->get('reports/coverage', 'ReportController::coverage');
        $routes->get('notices', 'ReportController::queue');
        $routes->post('notices/(:num)/publish', 'ReportController::publishNotice/$1');
        $routes->post('notices/(:num)/merge', 'ReportController::merge/$1');
        $routes->get('ingest/sources', 'ReportController::sources');
        $routes->post('ingest/sources/(:num)/run', 'ReportController::runSource/$1');
        $routes->get('organisations', 'ReportController::organisations');
        $routes->post('organisations/(:num)/verify', 'ReportController::verifyOrg/$1');
        $routes->get('payments', 'PaymentController::index');
        $routes->post('payments/(:num)/confirm', 'PaymentController::confirm/$1');
        $routes->post('payments/(:num)/reject', 'PaymentController::reject/$1');
    });

    // ---------------------------------------------------------- partner
    $routes->group('partner', [
        'namespace' => 'App\Controllers\Api\V1\Partner',
        'filter'    => 'api-key',
    ], static function ($routes) {
        $routes->get('notices', 'PartnerController::notices');
        $routes->post('webhooks', 'PartnerController::registerWebhook');
    });

    // The signature IS the authorisation — deliberately no auth filter here.
    $routes->get('files/documents/(:num)', '\App\Controllers\Api\V1\Files\FileController::document/$1');
});
