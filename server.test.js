const test = require("node:test");
const assert = require("node:assert");
const { server } = require("./server");

test("serves health and products under /api only", async (t) => {
  await new Promise((resolve) => server.listen(0, resolve));
  t.after(() => server.close());
  const base = `http://localhost:${server.address().port}`;

  const health = await fetch(base + "/api/health");
  assert.deepStrictEqual([health.status, await health.json()], [200, { status: "ok" }]);

  const res = await fetch(base + "/api/products");
  assert.strictEqual(res.headers.get("x-served-by"), "shop-api");
  const products = await res.json();
  assert.ok(products.length > 0 && products.every((p) => p.name && p.price && p.emoji));

  // Everything outside /api belongs to the web app on the shared load balancer.
  assert.strictEqual((await fetch(base + "/")).status, 404);
  assert.strictEqual((await fetch(base + "/api/products", { method: "POST" })).status, 405);
});
