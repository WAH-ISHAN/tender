import { DatabaseSync } from "node:sqlite";
import fs from "node:fs";

console.log("=== PART E: ROUTES COUNT & AUDIT IN CONFIG/ROUTES.PHP ===");
const routesFile = fs.readFileSync("E:/tender/TenderHub/apps/api/app/Config/Routes.php", "utf8");
const routeLines = routesFile.split("\n").filter(l => l.includes("$routes->get") || l.includes("$routes->post") || l.includes("$routes->put") || l.includes("$routes->delete") || l.includes("$routes->DEL"));
console.log(`Declared Route Count in Routes.php: ${routeLines.length}`);
console.log("Sample declared routes:");
routeLines.slice(0, 10).forEach(r => console.log(" ", r.trim()));

console.log("\n=== PART F: SECURITY INVARIANTS LIVE ATTACK TESTS (1 to 15) ===");
import { handleWorkspaceAction } from "../src/lib/workspace-mutations.js";
import { getMockResponse } from "../src/lib/mock-data.js";

// Test 1: Self-approval above threshold
const selfApprove = handleWorkspaceAction(["authority", "tenders", "1", "approve"], "POST", {}, { id: 1 });
console.log("Test 1 (Self-approval):", JSON.stringify(selfApprove));

// Test 2: Same-officer opening countersign
const sameOfficer = handleWorkspaceAction(["authority", "tenders", "1", "opening", "countersign"], "POST", {}, { id: 1 });
console.log("Test 2 (Same-officer opening):", JSON.stringify(sameOfficer));

// Test 3: Early opening before opening_at
const earlyOpening = handleWorkspaceAction(["authority", "tenders", "1", "opening", "countersign"], "POST", {}, { id: 2 });
console.log("Test 3 (Early opening check):", JSON.stringify(earlyOpening));

// Test 10: Double submission / Unique constraint on submissions
console.log("Test 10 (Double submission constraint check in DB):");
const db = new DatabaseSync("E:/tender/TenderHub/apps/api/writable/tenderhub.sqlite");
console.log("Submissions for proc 1:", db.prepare("SELECT count(*) as c FROM submissions WHERE procurement_id = 1").get());

// Test 13: Guest paywall omission
const guestNotice = getMockResponse("/api/v1/notices", null).data[0];
console.log("Test 13 (Guest Paywall Field Absence):");
console.log("  buyer in object:", "buyer" in guestNotice);
console.log("  contact_officer in object:", "contact_officer" in guestNotice);
console.log("  document_fee in object:", "document_fee" in guestNotice);
console.log("  locked array:", guestNotice.locked);

