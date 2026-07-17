# NestJS ERP Backend

نظام خلفي (Backend) متكامل مبني على NestJS بمعمارية Enterprise، يغطي: المصادقة والصلاحيات، المستخدمين، المنتجات، المخزون، العملاء، وأوامر البيع (Orders).

A production-grade NestJS backend covering Auth & RBAC, Users, Products, Inventory, Customers, and Orders — designed as a solid ERP/B2B starter.

---

## 🇸🇦 نظرة عامة

هذا المشروع مبني بأفضل الممارسات الشائعة في الشركات:

- **NestJS 10 + TypeScript** بمعمارية Modular (كل ميزة في موديول مستقل)
- **TypeORM + PostgreSQL** لإدارة قاعدة البيانات والعلاقات
- **JWT Authentication** + **Role-Based Access Control** (Admin / Manager / Staff)
- **Swagger/OpenAPI** توثيق تلقائي لكل الـ Endpoints
- **Validation** شامل عبر class-validator/class-transformer
- **Global Exception Filter + Logging Interceptor**
- **Rate Limiting** عبر @nestjs/throttler
- **Docker + docker-compose** لتشغيل المشروع وقاعدة البيانات بأمر واحد
- **GitHub Actions CI** لبناء واختبار المشروع تلقائيًا مع كل push
- **Unit + E2E tests** جاهزة كنقطة انطلاق

### الموديولات (Modules)

| الموديول | الوصف |
|---|---|
| `auth` | تسجيل الدخول / إنشاء حساب / إصدار JWT |
| `users` | إدارة المستخدمين والأدوار |
| `products` | كتالوج المنتجات (مناسب لمصنع/شركة تصنيع) |
| `inventory` | تتبع المخزون، حد إعادة الطلب، تنبيهات النقص |
| `customers` | إدارة عملاء B2B |
| `orders` | أوامر البيع مع بنود متعددة وحساب الإجمالي تلقائيًا |

### التشغيل محليًا

```bash
npm install
cp .env.example .env
# عدّل بيانات الاتصال بقاعدة البيانات في .env

npm run start:dev
```

الـ API متاح على: `http://localhost:3000/api/v1`
توثيق Swagger على: `http://localhost:3000/api/docs`

### التشغيل عبر Docker

```bash
docker-compose up --build
```

### تشغيل الاختبارات

```bash
npm run test        # unit tests
npm run test:e2e     # end-to-end tests
npm run test:cov     # تغطية الكود
```

---

## 🇬🇧 Overview

Built following common enterprise conventions:

- **NestJS 10 + TypeScript**, modular architecture (one module per domain)
- **TypeORM + PostgreSQL** for persistence and relations
- **JWT Auth** + **Role-Based Access Control** (Admin / Manager / Staff)
- **Swagger/OpenAPI** auto-generated docs
- **class-validator / class-transformer** for input validation
- **Global exception filter + logging interceptor**
- **Rate limiting** via `@nestjs/throttler`
- **Docker + docker-compose** for one-command local stack
- **GitHub Actions CI** pipeline (lint, build, test) on every push
- **Unit + E2E tests** as a starting point

### Getting started

```bash
npm install
cp .env.example .env
# edit DB credentials in .env

npm run start:dev
```

API base: `http://localhost:3000/api/v1`
Swagger UI: `http://localhost:3000/api/docs`

### Run with Docker

```bash
docker-compose up --build
```

### Tests

```bash
npm run test
npm run test:e2e
npm run test:cov
```

### Project structure

```
src/
  common/          # guards, filters, interceptors, decorators
  config/          # environment configuration
  database/        # TypeORM data source & module
  modules/
    auth/
    users/
    products/
    inventory/
    customers/
    orders/
```

### Roadmap / ideas to extend

- [ ] Invoicing module (PDF generation)
- [ ] Notifications (email/SMS) on low stock or order status change
- [ ] Multi-warehouse inventory support
- [ ] Audit log module
- [ ] Refresh tokens + logout/blacklist

---

## License

MIT
