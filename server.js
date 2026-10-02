// Product API for the Freesia demo shop. Behind the shared load balancer it gets /api/*, and sample-shop's page
// loads its products from here. No dependencies.
const http = require("node:http");

const PORT = Number(process.env.PORT) || 8080;

const products = [
  { id: 1, name: "프리지아 꽃다발", price: 32000, emoji: "💐" },
  { id: 2, name: "드라이플라워 화병", price: 18000, emoji: "🏺" },
  { id: 3, name: "꽃 일러스트 엽서 세트", price: 6000, emoji: "💌" },
  { id: 4, name: "향기 캔들", price: 21000, emoji: "🕯️" },
  { id: 5, name: "미니 화분", price: 12000, emoji: "🪴" },
  { id: 6, name: "선물 포장", price: 3000, emoji: "🎁" },
];

const json = (res, status, body) =>
  res.writeHead(status, { "Content-Type": "application/json; charset=utf-8", "X-Served-By": "shop-api" }).end(JSON.stringify(body));

function handle(req, res) {
  const path = new URL(req.url, "http://localhost").pathname;
  if (req.method !== "GET" && req.method !== "HEAD") {
    res.writeHead(405, { Allow: "GET, HEAD" }).end();
  } else if (path === "/api/health") {
    json(res, 200, { status: "ok" });
  } else if (path === "/api/products") {
    json(res, 200, products);
  } else {
    json(res, 404, { error: "not_found" });
  }
}

const server = http.createServer(handle);

if (require.main === module) {
  server.listen(PORT, () => console.log(`shop-api listening on ${PORT}`));
  // ECS stops tasks with SIGTERM; close cleanly so in-flight requests finish.
  process.on("SIGTERM", () => server.close(() => process.exit(0)));
}

module.exports = { server };
