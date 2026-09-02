import { getDb } from "./db";

export function handleWorkspaceAction(path: string[], method: string, body: any, tokenUser?: any): { status: number; body: any } {
  const db = getDb();
  if (!db) {
    return { status: 500, body: { status: 500, reason: "database_error", detail: "Database connection unavailable." } };
  }

  const segment = path.join("/");
  const now = new Date().toISOString();
  const userId = tokenUser?.id ?? 1;

  // ---------------------------------------------------------------------------
  // 1. TENDER ACTIONS & STAGE TRANSITIONS
  // ---------------------------------------------------------------------------
  
  // Submit for Approval (Stage 0 -> 1)
  const matchSubmit = segment.match(/authority\/tenders\/(\d+)\/submit-for-approval/);
  if (matchSubmit && method === "POST") {
    const id = Number(matchSubmit[1]);
    db.prepare("UPDATE procurements SET stage_idx = 1, submitted_by = ?, updated_at = ? WHERE id = ?").run(userId, now, id);
    return { status: 200, body: { data: { id, stage_idx: 1, status: "approval" }, meta: { now } } };
  }

  // Approve Tender (Stage 1 with Separation of Duties Check)
  const matchApprove = segment.match(/authority\/tenders\/(\d+)\/approve/);
  if (matchApprove && method === "POST") {
    const id = Number(matchApprove[1]);
    const proc = db.prepare(`
      SELECT pr.*, n.estimated_value, o.approval_threshold 
      FROM procurements pr
      LEFT JOIN notices n ON n.id = pr.notice_id
      LEFT JOIN organisations o ON o.id = pr.org_id
      WHERE pr.id = ?
    `).get(id) as any;

    if (proc) {
      const threshold = Number(proc.approval_threshold ?? 50000000);
      const estVal = Number(proc.estimated_value ?? 0);
      const isCreator = proc.created_by === userId;

      // Invariant: Above threshold, creator CANNOT approve own tender
      if (isCreator && estVal > threshold) {
        return {
          status: 403,
          body: {
            status: 403,
            reason: "self_approval",
            detail: `You created this tender valued at Rs. ${estVal.toLocaleString()}, which exceeds the organisation threshold of Rs. ${threshold.toLocaleString()}. A different officer must approve it.`,
            remedy: "Ask an authorised approver to sign off.",
          },
        };
      }

      db.prepare("UPDATE procurements SET approved_by = ?, approved_at = ?, updated_at = ? WHERE id = ?").run(userId, now, now, id);
      return { status: 200, body: { data: { id, approved_by: userId, approved_at: now }, meta: { now } } };
    }
  }

  // Publish Tender (Stage 1 -> 2)
  const matchPublish = segment.match(/authority\/tenders\/(\d+)\/publish/);
  if (matchPublish && method === "POST") {
    const id = Number(matchPublish[1]);
    db.prepare("UPDATE procurements SET stage_idx = 2, published_by = ?, published_at = ?, updated_at = ? WHERE id = ?").run(userId, now, now, id);
    db.prepare("UPDATE notices SET status = 'published', published_at = ?, updated_at = ? WHERE id = (SELECT notice_id FROM procurements WHERE id = ?)").run(now, now, id);
    return { status: 200, body: { data: { id, stage_idx: 2, status: "published" }, meta: { now } } };
  }

  // Opening Ceremony: Start (First Officer)
  const matchStartOpening = segment.match(/authority\/tenders\/(\d+)\/opening\/start/);
  if (matchStartOpening && method === "POST") {
    const id = Number(matchStartOpening[1]);
    const proc = db.prepare("SELECT * FROM procurements WHERE id = ?").get(id) as any;
    if (proc?.stage_idx >= 4) {
      return { status: 409, body: { status: 409, reason: "already_opened", detail: "This tender has already been opened." } };
    }

    db.prepare("UPDATE procurements SET opened_by_a = ?, opening_started_at = ?, updated_at = ? WHERE id = ?").run(userId, now, now, id);
    return { status: 200, body: { data: { id, opened_by_a: userId, opening_started_at: now }, meta: { now } } };
  }

  // Opening Ceremony: Countersign (Second Distinct Officer)
  const matchCountersign = segment.match(/authority\/tenders\/(\d+)\/opening\/countersign/);
  if (matchCountersign && method === "POST") {
    const id = Number(matchCountersign[1]);
    const proc = db.prepare(`
      SELECT pr.*, n.opening_at
      FROM procurements pr
      LEFT JOIN notices n ON n.id = pr.notice_id
      WHERE pr.id = ?
    `).get(id) as any;

    if (!proc?.opened_by_a) {
      return { status: 409, body: { status: 409, reason: "not_started", detail: "The opening ceremony has not been started yet." } };
    }

    // Invariant: Must be a different officer
    if (proc.opened_by_a === userId) {
      return {
        status: 403,
        body: {
          status: 403,
          reason: "same_officer",
          detail: "The officer who started the opening ceremony cannot countersign it. Dual control requires two distinct officers.",
          remedy: "Ask a second authorised officer to sign in and countersign.",
        },
      };
    }

    // Invariant: Cannot open before published opening time
    if (proc.opening_at && new Date(now).getTime() < new Date(proc.opening_at).getTime()) {
      return {
        status: 409,
        body: {
          status: 409,
          reason: "too_early",
          detail: `The opening ceremony cannot be concluded before the published opening time of ${proc.opening_at}.`,
          opens_at: proc.opening_at,
        },
      };
    }

    // Flip stage to Opened (4), record opened_by_b, and unlock submissions
    db.prepare("UPDATE procurements SET stage_idx = 4, opened_by_b = ?, opened_at = ?, updated_at = ? WHERE id = ?").run(userId, now, now, id);
    db.prepare("UPDATE submissions SET status = 'opened', updated_at = ? WHERE procurement_id = ?").run(now, id);

    const openedBids = db.prepare("SELECT * FROM submissions WHERE procurement_id = ?").all(id);
    return { status: 200, body: { data: openedBids, meta: { now, opened: true } } };
  }

  // Issue Addendum (Date Extension)
  const matchAddendum = segment.match(/authority\/tenders\/(\d+)\/addenda/);
  if (matchAddendum && method === "POST") {
    const id = Number(matchAddendum[1]);
    const { title, reason, new_closing_at } = body ?? {};
    
    if (new_closing_at) {
      db.prepare("UPDATE notices SET closing_at = ?, updated_at = ? WHERE id = (SELECT notice_id FROM procurements WHERE id = ?)").run(new_closing_at, now, id);
    }

    const count = db.prepare("SELECT count(*) as c FROM addenda WHERE procurement_id = ?").get(id) as any;
    const addendumNo = (count?.c ?? 0) + 1;

    db.prepare(`
      INSERT INTO addenda (procurement_id, addendum_no, title, reason, new_closing_at, issued_by, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(id, addendumNo, title ?? `Addendum No. ${addendumNo}`, reason ?? "Extension of submission deadline", new_closing_at ?? null, userId, now);

    return { status: 200, body: { data: { addendum_no: addendumNo, new_closing_at }, meta: { now } } };
  }

  // ---------------------------------------------------------------------------
  // 2. ADMIN PAYMENTS & ORGANISATION ACTIONS
  // ---------------------------------------------------------------------------
  
  // Confirm Payment (One Transaction Activation)
  const matchConfirmPay = segment.match(/admin\/payments\/(\d+)\/confirm/);
  if (matchConfirmPay && method === "POST") {
    const payId = Number(matchConfirmPay[1]);
    const pay = db.prepare("SELECT * FROM payments WHERE id = ?").get(payId) as any;

    if (pay) {
      const renewsAt = new Date(Date.now() + 365 * 86400000).toISOString().split("T")[0];
      db.prepare("UPDATE payments SET state = 'confirmed', reviewed_by = ?, reviewed_at = ?, updated_at = ? WHERE id = ?").run(userId, now, now, payId);
      db.prepare("UPDATE organisations SET plan = 'business', sub_status = 'active', renews_at = ?, updated_at = ? WHERE id = ?").run(renewsAt, now, pay.org_id);

      return { status: 200, body: { data: { id: payId, state: "confirmed", renews_at: renewsAt }, meta: { now } } };
    }
  }

  // Reject Payment
  const matchRejectPay = segment.match(/admin\/payments\/(\d+)\/reject/);
  if (matchRejectPay && method === "POST") {
    const payId = Number(matchRejectPay[1]);
    const { reason: rejectReason } = body ?? {};
    db.prepare("UPDATE payments SET state = 'rejected', reject_reason = ?, reviewed_by = ?, reviewed_at = ?, updated_at = ? WHERE id = ?").run(rejectReason ?? "Slip unverified on bank statement.", userId, now, payId);
    return { status: 200, body: { data: { id: payId, state: "rejected" }, meta: { now } } };
  }

  // Verify Organisation
  const matchVerifyOrg = segment.match(/admin\/organisations\/(\d+)\/verify/);
  if (matchVerifyOrg && method === "POST") {
    const orgId = Number(matchVerifyOrg[1]);
    db.prepare("UPDATE organisations SET verify_state = 'verified', verified_at = ?, updated_at = ? WHERE id = ?").run(now, now, orgId);
    return { status: 200, body: { data: { id: orgId, verify_state: "verified" }, meta: { now } } };
  }

  // ---------------------------------------------------------------------------
  // 3. BIDDER SUBSCRIPTION CLAIM
  // ---------------------------------------------------------------------------
  if (segment === "subscription/claim" && method === "POST") {
    const { amount, bank, slip_ref, paid_on, channel, term } = body ?? {};
    db.prepare(`
      INSERT INTO payments (org_id, user_id, plan, term, amount, method, bank, slip_ref, paid_on, channel, state, created_at, updated_at)
      VALUES (?, ?, 'business', ?, ?, 'bank_transfer', ?, ?, ?, ?, 'claimed', ?, ?)
    `).run(1, userId, term ?? "Annual", Number(amount ?? 24000), bank ?? "Commercial Bank PLC", slip_ref ?? "TXN-MANUAL", paid_on ?? now.split("T")[0], channel ?? "WhatsApp", now, now);

    return { status: 200, body: { data: { state: "claimed", message: "Claim submitted. Staff review in progress." }, meta: { now } } };
  }

  return { status: 200, body: { data: { ok: true }, meta: { now } } };
}
