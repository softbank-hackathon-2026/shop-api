# shop-api

Freesia 시연용 쇼핑몰의 상품 API입니다. 화면은 [sample-shop](https://github.com/softbank-hackathon-2026/sample-shop)이 맡고, 이 서버는 `/api` 아래만 응답합니다.

Multi-AZ 인프라에서는 공용 로드밸런서가 `/api/*`를 이 서버로, 나머지를 sample-shop으로 보냅니다. sample-shop 화면이 `/api/products`를 불러오므로 같은 주소에서 이 서버의 데이터가 보입니다. 화면 아래 "상품 정보: shop-api"로 확인할 수 있습니다.

- 실행 환경: Node.js 20
- 포트: 8080 (`PORT` 환경변수로 바꿀 수 있음)
- 헬스체크: `GET /api/health` → `{"status": "ok"}`
- 상품 목록: `GET /api/products`
- 응답 헤더 `X-Served-By: shop-api`
- 외부 패키지 없음

## 실행

```bash
npm start
```

## 컨테이너

```bash
docker build -t shop-api .
docker run -p 8080:8080 shop-api
```

## 테스트

```bash
npm test
```
