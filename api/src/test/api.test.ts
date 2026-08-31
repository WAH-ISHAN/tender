import http from 'http';
import app from '../index';

const testServer = http.createServer(app);
const PORT = 4099;

async function runTests() {
  testServer.listen(PORT, async () => {
    console.log(`\n🧪 Running Automated Backend API Test Suite on http://localhost:${PORT}...\n`);
    let passed = 0;
    let failed = 0;

    const assert = (condition: boolean, testName: string) => {
      if (condition) {
        console.log(`  ✅ PASS: ${testName}`);
        passed++;
      } else {
        console.error(`  ❌ FAIL: ${testName}`);
        failed++;
      }
    };

    try {
      // 1. Health check
      const healthRes = await fetch(`http://localhost:${PORT}/health`).then(r => r.json());
      assert(healthRes.status === 'UP', 'GET /health returns UP');

      // 2. Tenders listing
      const tendersRes = await fetch(`http://localhost:${PORT}/api/v1/tenders`).then(r => r.json());
      assert(tendersRes.success === true && tendersRes.data.length > 0, `GET /api/v1/tenders returns ${tendersRes.data?.length} tenders`);

      // 3. Filter by keyword
      const searchRes = await fetch(`http://localhost:${PORT}/api/v1/tenders?q=solar`).then(r => r.json());
      assert(searchRes.data.length === 1 && searchRes.data[0].categoryId === 'solar', 'GET /api/v1/tenders?q=solar returns matching item');

      // 4. Tender detail by ID
      const detailRes = await fetch(`http://localhost:${PORT}/api/v1/tenders/MOE-2026-SP-01`).then(r => r.json());
      assert(detailRes.success === true && detailRes.data.entity === 'Ministry of Education', 'GET /api/v1/tenders/:id returns tender detail');

      // 5. Categories
      const catRes = await fetch(`http://localhost:${PORT}/api/v1/categories`).then(r => r.json());
      assert(catRes.success === true && catRes.data.length >= 7, `GET /api/v1/categories returns ${catRes.data?.length} categories`);

      // 6. Locations
      const locRes = await fetch(`http://localhost:${PORT}/api/v1/locations`).then(r => r.json());
      assert(locRes.success === true && locRes.data.length === 9, 'GET /api/v1/locations returns 9 provinces');

      // 7. Stats
      const statsRes = await fetch(`http://localhost:${PORT}/api/v1/stats`).then(r => r.json());
      assert(statsRes.data.liveNotices === 366, 'GET /api/v1/stats returns 366 live notices');

      // 8. Auth Login
      const loginRes = await fetch(`http://localhost:${PORT}/api/v1/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'ishan@example.com', password: 'password123' })
      }).then(r => r.json());
      assert(loginRes.success === true && loginRes.data.user.email === 'ishan@example.com', 'POST /api/v1/auth/login logs in user');

      console.log(`\n=========================================`);
      console.log(`🎉 TEST SUMMARY: ${passed} Passed, ${failed} Failed`);
      console.log(`=========================================\n`);

    } catch (err) {
      console.error('Test error:', err);
    } finally {
      testServer.close();
      process.exit(failed > 0 ? 1 : 0);
    }
  });
}

runTests();
