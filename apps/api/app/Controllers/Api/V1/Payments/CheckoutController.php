<?php

namespace App\Controllers\Api\V1\Payments;

use App\Controllers\Api\V1\BaseApiController;
use App\Libraries\Payments\PaymentGatewayService;

class CheckoutController extends BaseApiController
{
    /**
     * POST /api/v1/payments/checkout
     * Initiates online card checkout session for subscriptions.
     */
    public function checkout()
    {
        $in = $this->body();
        $rules = [
            'plan'    => 'required|in_list[monthly,annual,single]',
            'gateway' => 'permit_empty|in_list[payhere,stripe]',
        ];

        if (! $this->validateData($in, $rules)) {
            return problem(422, 'validation_failed', 'Select a valid subscription plan.', ['errors' => $this->validator->getErrors()]);
        }

        $plan    = $in['plan'];
        $gateway = $in['gateway'] ?? 'payhere';
        $user    = $this->request->user ?? ['id' => 1, 'email' => 'subscriber@tenderhub.lk', 'name' => 'Subscriber'];
        $orgId   = $this->request->orgId ?? 1;

        // Pricing Matrix (LKR)
        $prices = [
            'monthly' => 15000.00,
            'annual'  => 150000.00,
            'single'  => 5000.00,
        ];

        $amount  = $prices[$plan] ?? 15000.00;
        $orderId = 'SUB-' . date('Ymd') . '-' . bin2hex(random_bytes(4));

        $db = db_connect();
        $db->table('orders')->insert([
            'order_id'   => $orderId,
            'org_id'     => $orgId,
            'user_id'    => $user['id'],
            'plan'       => $plan,
            'amount'     => $amount,
            'currency'   => 'LKR',
            'gateway'    => $gateway,
            'status'     => 'pending',
            'created_at' => date('Y-m-d H:i:s'),
        ]);

        $checkoutData = [
            'order_id'   => $orderId,
            'amount'     => $amount,
            'currency'   => 'LKR',
            'item_name'  => "TenderHub Business Plan ({$plan})",
            'first_name' => explode(' ', $user['name'])[0] ?? 'Subscriber',
            'last_name'  => explode(' ', $user['name'])[1] ?? 'User',
            'email'      => $user['email'],
            'phone'      => '0771234567',
        ];

        if ($gateway === 'stripe') {
            $session = PaymentGatewayService::createStripeSession($checkoutData);
        } else {
            $session = PaymentGatewayService::createPayHereCheckout($checkoutData);
        }

        return $this->ok([
            'order_id'   => $orderId,
            'plan'       => $plan,
            'amount'     => $amount,
            'session'    => $session,
        ]);
    }

    /**
     * POST /api/v1/payments/webhook/payhere
     * Asynchronous payment notification from PayHere gateway.
     */
    public function webhookPayHere()
    {
        $post = $this->request->getPost();
        
        if (! PaymentGatewayService::verifyPayHereWebhook($post)) {
            return $this->response->setStatusCode(400)->setBody('Invalid signature');
        }

        $orderId    = $post['order_id'];
        $statusCode = (int) ($post['status_code'] ?? 0);
        $paymentId  = $post['payment_id'] ?? null;

        $db = db_connect();
        $order = $db->table('orders')->where('order_id', $orderId)->get()->getFirstRow('array');

        if (! $order) {
            return $this->response->setStatusCode(404)->setBody('Order not found');
        }

        // Status 2 = Success in PayHere
        if ($statusCode === 2) {
            $db->transBegin();

            $db->table('orders')->where('order_id', $orderId)->update([
                'status'         => 'paid',
                'gateway_ref'    => $paymentId,
                'paid_at'        => date('Y-m-d H:i:s'),
            ]);

            // Advance organization plan to paid
            $months = $order['plan'] === 'annual' ? 12 : 1;
            $renewsAt = date('Y-m-d H:i:s', strtotime("+{$months} months"));

            $db->table('organisations')->where('id', $order['org_id'])->update([
                'plan'        => 'business',
                'sub_status'  => 'active',
                'renews_at'   => $renewsAt,
                'updated_at'  => date('Y-m-d H:i:s'),
            ]);

            $db->transCommit();
        }

        return $this->response->setStatusCode(200)->setBody('OK');
    }
}
