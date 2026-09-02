<?php

namespace App\Libraries\Payments;

/**
 * InvoiceGenerator
 * Generates structured HTML and printable tax invoices / receipts.
 */
class InvoiceGenerator
{
    /**
     * Renders a compliant VAT/SSCL Tax Invoice HTML string.
     */
    public static function generateHtml(array $order, array $org): string
    {
        $invNo    = 'INV-' . strtoupper($order['order_id']);
        $date     = date('d M Y', strtotime($order['created_at'] ?? 'now'));
        $amount   = number_format((float) $order['amount'], 2);
        $planName = ucfirst($order['plan']) . ' Subscription (TenderHub National Procurement)';
        
        $orgName  = htmlspecialchars($org['name'] ?? 'Registered Subscriber');
        $orgRegNo = htmlspecialchars($org['reg_no'] ?? 'N/A');
        $orgEmail = htmlspecialchars($org['contact_email'] ?? '');

        return <<<HTML
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Tax Invoice {$invNo}</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #111827; margin: 0; padding: 40px; }
        .header { display: flex; justify-content: space-between; border-bottom: 2px solid #0055B8; padding-bottom: 20px; }
        .brand { font-size: 24px; font-weight: 900; color: #0055B8; }
        .meta { text-align: right; font-size: 13px; color: #4B5563; }
        .billing-grid { display: grid; grid-template-columns: 1fr 1fr; margin-top: 30px; gap: 20px; }
        .box { background: #F8FAFC; border: 1px solid #E2E8F0; padding: 16px; border-radius: 8px; font-size: 13px; }
        .box h4 { margin: 0 0 8px 0; color: #1E293B; }
        table { width: 100%; border-collapse: collapse; margin-top: 30px; }
        th { background: #F1F5F9; text-align: left; padding: 12px; font-size: 12px; text-transform: uppercase; color: #475569; }
        td { padding: 12px; border-bottom: 1px solid #E2E8F0; font-size: 14px; }
        .total-row { font-size: 18px; font-weight: 700; text-align: right; margin-top: 20px; }
        .badge { display: inline-block; padding: 4px 10px; background: #DCFCE7; color: #15803D; border-radius: 999px; font-weight: 600; font-size: 12px; }
        .footer { margin-top: 60px; font-size: 11px; color: #94A3B8; text-align: center; }
    </style>
</head>
<body>
    <div class="header">
        <div>
            <div class="brand">TENDERHUB SRI LANKA</div>
            <div style="font-size: 12px; color: #64748B; margin-top: 4px;">National Procurement Gateway</div>
            <div style="font-size: 12px; color: #64748B;">TenderHub Pvt Ltd · Colombo 03 · VAT: 104882910-7000</div>
        </div>
        <div class="meta">
            <h2 style="margin: 0; color: #0F172A;">TAX INVOICE</h2>
            <div style="font-weight: 600; margin-top: 4px;">{$invNo}</div>
            <div>Date: {$date}</div>
            <div style="margin-top: 6px;"><span class="badge">PAID</span></div>
        </div>
    </div>

    <div class="billing-grid">
        <div class="box">
            <h4>Billed To:</h4>
            <strong>{$orgName}</strong><br>
            BRN: {$orgRegNo}<br>
            Email: {$orgEmail}
        </div>
        <div class="box">
            <h4>Payment Details:</h4>
            Gateway: PayHere Online Checkout<br>
            Currency: LKR (Sri Lankan Rupee)<br>
            Status: Confirmed
        </div>
    </div>

    <table>
        <thead>
            <tr>
                <th>Description</th>
                <th>Period</th>
                <th style="text-align: right;">Amount (LKR)</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td><strong>{$planName}</strong><br><span style="font-size: 12px; color: #64748B;">Full Access to National Gazettes, Live Workspaces, and Instant Bidder Alerts</span></td>
                <td>1 Year</td>
                <td style="text-align: right; font-family: monospace;">Rs. {$amount}</td>
            </tr>
        </tbody>
    </table>

    <div class="total-row">
        Total Paid: Rs. {$amount} LKR
    </div>

    <div class="footer">
        This is a computer-generated tax invoice and requires no physical signature.<br>
        TenderHub (Pvt) Ltd · www.tenderhub.lk · support@tenderhub.lk
    </div>
</body>
</html>
HTML;
    }
}
