# مواصفات الباك إند - تطبيق "دري فري - Dreefree"

> **تاريخ الإنشاء:** 2026-06-28  
> **إصدار المستند:** 1.0  
> **الغرض:** توثيق كامل لمتطلبات الباك إند المستخلصة من تحليل واجهة المستخدم (فرونت إند) لمشروع توصيل الطلبات في فلسطين (غزة).

---

## جدول المحتويات

1. [نظرة عامة عن المشروع](#1-نظرة-عامة-عن-المشروع)
2. [هندسة النظام (System Architecture)](#2-هندسة-النظام-system-architecture)
3. [المصادقة والصلاحيات (Authentication & Authorization)](#3-المصادقة-والصلاحيات-authentication--authorization)
4. [تصميم قاعدة البيانات (Database Design)](#4-تصميم-قاعدة-البيانات-database-design)
5. [مواصفات API كاملة](#5-مواصفات-api-كاملة)
6. [تدفق الطلب (Order Flow)](#6-تدفق-الطلب-order-flow)
7. [المدفوعات (Payments)](#7-المدفوعات-payments)
8. [الخرائط والمواقع (Maps & Locations)](#8-الخرائط-والمواقع-maps--locations)
9. [الإشعارات الفورية (Push Notifications)](#9-الإشعارات-الفورية-push-notifications)
10. [رفع وتخزين الملفات (File Storage)](#10-رفع-وتخزين-الملفات-file-storage)
11. [الأمان (Security)](#11-الأمان-security)
12. [المتغيرات البيئية (Environment Variables)](#12-المتغيرات-البيئية-environment-variables)
13. [معالجة الأخطاء والتحقق (Error Handling & Validation)](#13-معالجة-الأخطاء-والتحقق-error-handling--validation)
14. [هيكل مجلدات الباك إند المقترح](#14-هيكل-مجلدات-الباك-إند-المقترح)
15. [خارطة طريق التنفيذ](#15-خارطة-طريق-التنفيذ)

---

## 1. نظرة عامة عن المشروع

### 1.1 وصف التطبيق

تطبيق توصيل متكامل يربط العملاء بمقدمي خدمات التوصيل في فلسطين (غزة بشكل أساسي). يتيح التطبيق للمستخدمين:

- طلب توصيل الطرود، الهدايا، المستندات، المشتريات، وطلبات المطاعم
- تصفح المتاجر والمطاعم وعرض المنتجات
- إتمام عملية الشراء خطوة بخطوة
- تتبع الطلب مباشر (Live Tracking)
- إدارة الملف الشخصي وسجل الطلبات

### 1.2 الجمهور المستهدف

- **الموقع:** فلسطين (قطاع غزة)
- **اللغة:** العربية (RTL)
- **العملة:** شيكل (₪)

### 1.3 ستاك التكنولوجيا (الفرونت إند)

| التقنية | الإصدار | الاستخدام |
|---------|---------|-----------|
| Next.js | 16.2.9 | Framework |
| React | 19.2.4 | UI Library |
| TypeScript | ~5.8 | لغة البرمجة |
| Tailwind CSS | v4 | التصميم |
| Zustand | 5.0.14 | إدارة الحالة المحلية (مع persist) |
| TanStack Query | 5.101.1 | إدارة حالة السيرفر (Server State) |
| Axios | 1.18.1 | HTTP Client |
| next-auth | 5.0.0-beta.31 | المصادقة (Credentials + JWT) |
| Firebase | 12.15.0 | الإشعارات (FCM) |
| @react-google-maps/api | 2.20.8 | الخرائط |
| next-themes | 0.4.6 | الوضع الليلي |

### 1.4 نقطة نهاية API

```
baseURL: http://localhost:3001/api
```

قابلة للتغيير عبر المتغير البيئي `NEXT_PUBLIC_API_URL`.

---

## 2. هندسة النظام (System Architecture)

### 2.1 النمط المعماري

```
[Next.js Frontend :3000]
       ↕ HTTP/REST (JSON)
[Backend API :3001]
       ↕
[Database (PostgreSQL)]
       ↕
[Storage (Cloudinary / Local)]
       ↕
[Firebase Cloud Messaging]
       ↕
[Google Maps API]
```

### 2.2 تدفق المصادقة

```
1. المستخدم يدخل رقم الهاتف + كلمة المرور
2. NextAuth API route → POST /auth/login (خارجي)
3. الباك إند يتحقق من صحة البيانات → يُرجع JWT token + user data
4. NextAuth يُنشئ JWT session (encode)
5. الـ Axios interceptor: يحمل التوكن من localStorage (auth-token)
6. كل طلب API → Bearer token في الـ Header
7. عند 401 → يُحذف التوكن ويُعاد التوجيه إلى /login
```

### 2.3 آلية جلب البيانات

- **TanStack Query** يدير حالة السيرفر (caching, refetching, pagination)
- **Zustand** يدير الحالة المحلية (السلة، المفضلة، الفلاتر، الطلبات) مع persist إلى localStorage
- وقت انتهاء الصلاحية (staleTime): 5 دقائق
- إعادة المحاولة (retry): مرة واحدة
- لا إعادة جلب عند تغيير التبويب (refetchOnWindowFocus: false)

### 2.4 علاقة الفرونت إند بالباك إند

```
المصادقة:
  - NextAuth (CredentialsProvider) ← POST /auth/login → Backend
  - Axios interceptor ← Bearer token → Backend

البيانات:
  - React Query hooks ← apiClient (Axios) ← endpoints.ts → Backend API
  - الـ hooks تستخدم حالياً mock data مؤقتاً

الإشعارات:
  - Firebase SDK (client-side) → getToken() → يُرسل التوكن إلى Backend
  - Backend يُرسل الإشعارات عبر FCM

الخرائط:
  - Google Maps API (client-side) ← NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
  - Backend يحتاج endpoint لعكس الترميز (reverse geocoding)
```

---

## 3. المصادقة والصلاحيات (Authentication & Authorization)

### 3.1 أنواع المستخدمين (Roles)

| الدور | الوصف | الصلاحيات |
|-------|-------|-----------|
| `customer` | عميل يطلب توصيل | إنشاء طلبات، عرض السلة، إدارة الملف الشخصي |
| `restaurant_owner` | صاحب متجر/مطعم | إدارة المنتجات، عرض الطلبات الواردة |
| `driver` | مندوب توصيل | استلام الطلبات، تحديث حالة الطلب، تتبع |
| `admin` | مدير النظام | إدارة المستخدمين، المتاجر، التقارير |

### 3.2 تدفق التسجيل

1. المستخدم يملأ النموذج: `الاسم`، `رقم الهاتف`، `كلمة المرور`، `تأكيد كلمة المرور`
2. التحقق من صحة البيانات (رقم الهاتف فريد، كلمة المرور ≥ 6 أحرف)
3. `POST /auth/register` → إنشاء المستخدم → إرسال رمز تحقق SMS (اختياري)
4. التوجيه إلى صفحة تسجيل الدخول

### 3.3 تدفق تسجيل الدخول

1. `POST /auth/login` → التحقق من رقم الهاتف + كلمة المرور
2. إرجاع `{ token, user }`:
   ```json
   {
     "token": "jwt_token_here",
     "user": {
       "id": "uuid",
       "name": "كريم مروان",
       "phone": "0591234567",
       "avatar": "https://...",
       "role": "customer"
     }
   }
   ```
3. NextAuth يُشفر user.id في JWT session
4. الـ Axios client يخزن `token` في localStorage `auth-token`

### 3.4 نهاية صلاحية التوكن

- JWT access token: 24 ساعة
- NextAuth session: متزامن مع JWT
- عند 401: يُحذف التوكن ويعيد التوجيه إلى `/login`

### 3.5 واجهات المصادقة المطلوبة

```
POST   /auth/login        ← تسجيل الدخول
POST   /auth/register     ← تسجيل جديد
GET    /auth/me           ← جلب بيانات المستخدم الحالي (من التوكن)
POST   /auth/refresh      ← تحديث التوكن (اختياري)
POST   /auth/forgot-password  ← إعادة تعيين كلمة المرور (اختياري)
```

### 3.6 Middleware المطلوب

```typescript
// مثال للـ middleware
authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return 401;
  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    next();
  } catch {
    return 401;
  }
}

roleMiddleware(...roles: string[]) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) return 403;
    next();
  };
}
```

---

## 4. تصميم قاعدة البيانات (Database Design)

### 4.1 جدول المستخدمين (Users)

```sql
CREATE TABLE users (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name            VARCHAR(100) NOT NULL,
  phone           VARCHAR(15) UNIQUE NOT NULL,  -- رقم فلسطيني: +970XXXXXXXXX
  email           VARCHAR(255),
  password_hash   VARCHAR(255) NOT NULL,
  avatar          VARCHAR(500),                  -- رابط الصورة
  role            ENUM('customer', 'restaurant_owner', 'driver', 'admin') DEFAULT 'customer',
  is_active       BOOLEAN DEFAULT true,
  fcm_token       TEXT,                           -- Firebase Cloud Messaging token
  created_at      TIMESTAMP DEFAULT NOW(),
  updated_at      TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_users_phone ON users(phone);
CREATE INDEX idx_users_role ON users(role);
```

### 4.2 جدول عناوين المستخدمين (User Addresses)

```sql
CREATE TABLE user_addresses (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  label           VARCHAR(50) NOT NULL,           -- "المنزل"، "المكتب"
  address         TEXT NOT NULL,                   -- النص الكامل للعنوان
  lat             DECIMAL(10, 7),                 -- خط العرض
  lng             DECIMAL(10, 7),                 -- خط الطول
  is_default      BOOLEAN DEFAULT false,
  created_at      TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_addresses_user ON user_addresses(user_id);
```

### 4.3 جدول إعدادات المستخدمين (User Settings)

```sql
CREATE TABLE user_settings (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  language        ENUM('ar', 'en') DEFAULT 'ar',
  theme           ENUM('light', 'dark', 'system') DEFAULT 'light',
  notifications   BOOLEAN DEFAULT true,
  created_at      TIMESTAMP DEFAULT NOW(),
  updated_at      TIMESTAMP DEFAULT NOW()
);
```

### 4.4 جدول إحصائيات المستخدمين (User Stats)

```sql
CREATE TABLE user_stats (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  total_orders    INTEGER DEFAULT 0,
  completed_orders INTEGER DEFAULT 0,
  total_spent     DECIMAL(10, 2) DEFAULT 0.00,
  reward_points   INTEGER DEFAULT 0,
  created_at      TIMESTAMP DEFAULT NOW(),
  updated_at      TIMESTAMP DEFAULT NOW()
);
```

### 4.5 جدول مناطق التوصيل (Delivery Areas)

```sql
CREATE TABLE delivery_areas (
  id              VARCHAR(50) PRIMARY KEY,        -- 'gaza', 'rimal', 'nuseirat', etc.
  name            VARCHAR(100) NOT NULL,           -- "مدينة غزة"، "النصيرات"
  name_en         VARCHAR(100),                   -- "Gaza City"
  lat             DECIMAL(10, 7),                 -- مركز المنطقة
  lng             DECIMAL(10, 7),
  is_active       BOOLEAN DEFAULT true
);

-- البيانات الأولية المطلوبة
INSERT INTO delivery_areas (id, name, name_en) VALUES
  ('gaza', 'مدينة غزة', 'Gaza City'),
  ('rimal', 'الرمال', 'Rimal'),
  ('naser', 'النصر', 'Naser'),
  ('jabalia', 'جباليا', 'Jabalia'),
  ('lahia', 'بيت لاهيا', 'Beit Lahia'),
  ('hanoun', 'بيت حانون', 'Beit Hanoun'),
  ('maghazi', 'المغازي', 'Maghazi'),
  ('bureij', 'البريج', 'Bureij'),
  ('nuseirat', 'النصيرات', 'Nuseirat'),
  ('deir_balah', 'دير البلح', 'Deir al-Balah'),
  ('khan_younis', 'خانيونس', 'Khan Younis'),
  ('rafah', 'رفح', 'Rafah');
```

### 4.6 جدول التصنيفات (Categories)

```sql
CREATE TABLE categories (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name            VARCHAR(100) NOT NULL,           -- "شاورما"، "برجر"، "حلويات"
  name_en         VARCHAR(100),
  icon            VARCHAR(50),                     -- Material Symbol name
  sort_order      INTEGER DEFAULT 0,
  created_at      TIMESTAMP DEFAULT NOW()
);

-- البيانات الأولية
INSERT INTO categories (name, sort_order) VALUES
  ('الكل', 0),
  ('شاورما', 1),
  ('مشويات', 2),
  ('بيتزا', 3),
  ('برجر', 4),
  ('حلويات', 5),
  ('مشروبات', 6),
  ('أكل عربي', 7);
```

### 4.7 جدول المتاجر / المطاعم (Stores / Restaurants)

```sql
CREATE TABLE stores (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id        UUID REFERENCES users(id) ON DELETE SET NULL,
  name            VARCHAR(200) NOT NULL,
  tags            VARCHAR(300),                    -- "شاورما • مشويات • سندويشات"
  description     TEXT,
  address         TEXT NOT NULL,
  area_id         VARCHAR(50) REFERENCES delivery_areas(id),
  lat             DECIMAL(10, 7),
  lng             DECIMAL(10, 7),
  image           VARCHAR(500) NOT NULL,           -- صورة الغلاف
  logo            VARCHAR(500) NOT NULL,           -- الشعار
  rating          DECIMAL(2, 1) DEFAULT 0.0,       -- 0.0 - 5.0
  rating_count    INTEGER DEFAULT 0,
  delivery_fee    DECIMAL(10, 2) DEFAULT 0.00,
  delivery_time   VARCHAR(50),                     -- "15-20 دقيقة"
  is_open         BOOLEAN DEFAULT true,
  is_active       BOOLEAN DEFAULT true,
  created_at      TIMESTAMP DEFAULT NOW(),
  updated_at      TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_stores_area ON stores(area_id);
CREATE INDEX idx_stores_rating ON stores(rating DESC);
CREATE INDEX idx_stores_name ON stores(name);
```

### 4.8 جدول المنتجات (Products)

```sql
CREATE TABLE products (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id        UUID NOT NULL REFERENCES stores(id) ON DELETE CASCADE,
  name            VARCHAR(200) NOT NULL,
  description     TEXT,
  price           DECIMAL(10, 2) NOT NULL,
  image           VARCHAR(500) NOT NULL,
  category        VARCHAR(100),                    -- تصنيف داخلي للمتجر
  is_best_seller  BOOLEAN DEFAULT false,
  rating          DECIMAL(2, 1) DEFAULT 0.0,
  rating_count    INTEGER DEFAULT 0,
  sort_order      INTEGER DEFAULT 0,
  is_active       BOOLEAN DEFAULT true,
  created_at      TIMESTAMP DEFAULT NOW(),
  updated_at      TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_products_store ON products(store_id);
CREATE INDEX idx_products_category ON products(store_id, category);
```

### 4.9 جدول مقاسات المنتجات (Product Sizes)

```sql
CREATE TABLE product_sizes (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id      UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  label           VARCHAR(50) NOT NULL,            -- "صغير"، "وسط"، "كبير"
  price_adjustment DECIMAL(10, 2) DEFAULT 0.00,   -- الفرق في السعر
  sort_order      INTEGER DEFAULT 0,
  is_active       BOOLEAN DEFAULT true
);
```

### 4.10 جدول إضافات المنتجات (Product Extras)

```sql
CREATE TABLE product_extras (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id      UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  group_type      ENUM('sauce', 'drink', 'complement') NOT NULL,
  name            VARCHAR(100) NOT NULL,
  price           DECIMAL(10, 2) DEFAULT 0.00,
  is_active       BOOLEAN DEFAULT true
);
```

### 4.11 جدول الطلبات (Orders)

```sql
CREATE TABLE orders (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number    VARCHAR(20) UNIQUE NOT NULL,     -- "DF-7829"
  customer_id     UUID NOT NULL REFERENCES users(id),
  driver_id       UUID REFERENCES users(id) ON DELETE SET NULL,
  store_id        UUID REFERENCES stores(id) ON DELETE SET NULL,
  status          ENUM(
    'pending',              -- قيد الانتظار
    'searching_for_driver', -- جاري البحث عن سائق
    'accepted',             -- تم قبول الطلب
    'preparing',            -- قيد التحضير
    'picked_up',            -- تم الاستلام من المتجر
    'in_transit',           -- في الطريق
    'delivered',            -- تم التوصيل
    'cancelled'             -- ملغي
  ) DEFAULT 'pending',

  -- بيانات المستلم
  recipient_name   VARCHAR(100) NOT NULL,
  recipient_phone  VARCHAR(15) NOT NULL,
  floor            VARCHAR(10),
  apartment        VARCHAR(10),
  delivery_instructions TEXT,
  leave_at_door    BOOLEAN DEFAULT false,
  direct_handoff   BOOLEAN DEFAULT false,

  -- المواقع
  pickup_address   TEXT NOT NULL,
  pickup_lat       DECIMAL(10, 7),
  pickup_lng       DECIMAL(10, 7),
  delivery_address TEXT NOT NULL,
  delivery_lat     DECIMAL(10, 7),
  delivery_lng     DECIMAL(10, 7),
  area_id          VARCHAR(50) REFERENCES delivery_areas(id),

  -- المالية
  subtotal         DECIMAL(10, 2) NOT NULL,
  delivery_fee     DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
  discount         DECIMAL(10, 2) DEFAULT 0.00,
  promo_code       VARCHAR(50),
  total            DECIMAL(10, 2) NOT NULL,

  -- الدفع
  payment_method   ENUM('cod', 'card', 'bop', 'jawwal', 'paypal', 'cash') NOT NULL,
  payment_status   ENUM('pending', 'paid', 'failed', 'refunded') DEFAULT 'pending',
  payment_proof    VARCHAR(500),                   -- رابط صورة إيصال الدفع

  -- التوصيل
  estimated_delivery TIMESTAMP,
  delivered_at     TIMESTAMP,
  driver_rating    INTEGER CHECK (driver_rating >= 1 AND driver_rating <= 5),
  driver_comment   TEXT,

  -- العلاقات
  notes           TEXT,

  created_at      TIMESTAMP DEFAULT NOW(),
  updated_at      TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_orders_customer ON orders(customer_id);
CREATE INDEX idx_orders_driver ON orders(driver_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_store ON orders(store_id);
CREATE INDEX idx_orders_area ON orders(area_id);
CREATE INDEX idx_orders_created ON orders(created_at DESC);
```

### 4.12 جدول عناصر الطلب (Order Items) - Snapshot

```sql
CREATE TABLE order_items (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id        UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id      UUID REFERENCES products(id) ON DELETE SET NULL,
  product_name    VARCHAR(200) NOT NULL,           -- Snapshot: اسم المنتج وقت الطلب
  product_image   VARCHAR(500),
  price           DECIMAL(10, 2) NOT NULL,         -- سعر الوحدة وقت الطلب
  quantity        INTEGER NOT NULL DEFAULT 1,
  size            VARCHAR(50),                     -- "صغير"، "وسط"، "كبير"
  extras          JSONB,                           -- [{"name": "صلصة حارة", "price": 1.50}]
  meta            TEXT,                            -- Notes or special requests
  subtotal        DECIMAL(10, 2) NOT NULL          -- price * quantity + extras
);

CREATE INDEX idx_order_items_order ON order_items(order_id);
```

### 4.13 جدول المفضلة (Wishlist)

```sql
CREATE TABLE wishlist (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  product_id      UUID REFERENCES products(id) ON DELETE CASCADE,
  store_id        UUID REFERENCES stores(id) ON DELETE CASCADE,
  created_at      TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, product_id),                    -- لا يمكن تكرار نفس المنتج
  CHECK (product_id IS NOT NULL OR store_id IS NOT NULL)
);

CREATE INDEX idx_wishlist_user ON wishlist(user_id);
```

### 4.14 جدول أكواد الخصم (Promo Codes)

```sql
CREATE TABLE promo_codes (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code            VARCHAR(50) UNIQUE NOT NULL,
  description     TEXT,
  discount_type   ENUM('percentage', 'fixed') NOT NULL,
  discount_value  DECIMAL(10, 2) NOT NULL,         -- 20 = 20% أو 10.00 = 10 شيكل
  min_order       DECIMAL(10, 2) DEFAULT 0.00,
  max_uses        INTEGER,                         -- null = غير محدود
  current_uses    INTEGER DEFAULT 0,
  expires_at      TIMESTAMP,
  is_active       BOOLEAN DEFAULT true,
  created_at      TIMESTAMP DEFAULT NOW()
);
```

### 4.15 جدول تقييمات المتاجر (Store Reviews)

```sql
CREATE TABLE store_reviews (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id        UUID NOT NULL REFERENCES stores(id) ON DELETE CASCADE,
  user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  order_id        UUID REFERENCES orders(id) ON DELETE SET NULL,
  rating          INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment         TEXT,
  created_at      TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, order_id)                        -- تقييم واحد لكل طلب
);

CREATE INDEX idx_reviews_store ON store_reviews(store_id);
```

### 4.16 مخطط العلاقات (ERD Summary)

```
users ──< user_addresses
users ──< user_settings
users ──< user_stats
users ──< wishlist
users ──< orders (as customer)
users ──< orders (as driver)
users ──< store_reviews
users ──< stores (as owner)

stores ──< products
stores ──< store_reviews
stores ──< orders

products ──< product_sizes
products ──< product_extras
products ──< wishlist
products ──< order_items

orders ──< order_items
orders >── delivery_areas

delivery_areas ──< stores
delivery_areas ──< orders
```

---

## 5. مواصفات API كاملة

### 5.1 قاعدة API

```
Base URL: /api
Content-Type: application/json
Auth: Bearer token (via Authorization header)
Timeout: 15 ثانية
```

### 5.2 معيار الاستجابة الموحد

**نجاح:**
```json
{
  "success": true,
  "data": { ... },
  "message": "تمت العملية بنجاح"
}
```

**خطأ:**
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "رقم الهاتف موجود مسبقاً",
    "details": [
      { "field": "phone", "message": "رقم الهاتف مسجل بالفعل" }
    ]
  }
}
```

**قائمة متضمنة (Pagination):**
```json
{
  "success": true,
  "data": [ ... ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "totalPages": 8
  }
}
```

### 5.3 قائمة endpoints كاملة

---

#### 5.3.1 المصادقة (Auth)

##### `POST /api/auth/register`

إنشاء حساب جديد.

**Request Body:**
```json
{
  "name": "محمد أحمد",
  "phone": "0591234567",
  "password": "********",
  "passwordConfirm": "********"
}
```

**Validation:**
- `name`: مطلوب، 2-100 حرف
- `phone`: مطلوب، رقم فلسطيني صحيح (يبدأ بـ 059)
- `password`: مطلوب، 6 أحرف على الأقل
- `passwordConfirm`: يجب أن يطابق password

**Response (201):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "محمد أحمد",
    "phone": "0591234567"
  },
  "message": "تم إنشاء الحساب بنجاح"
}
```

---

##### `POST /api/auth/login`

تسجيل الدخول.

**Request Body:**
```json
{
  "phone": "0591234567",
  "password": "********"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "token": "jwt_token",
    "user": {
      "id": "uuid",
      "name": "كريم مروان",
      "phone": "0591234567",
      "avatar": "https://example.com/avatar.jpg",
      "role": "customer"
    }
  }
}
```

---

##### `GET /api/auth/me`

جلب بيانات المستخدم الحالي. (يتطلب مصادقة)

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "كريم مروان",
    "phone": "0591234567",
    "avatar": "https://example.com/avatar.jpg",
    "email": "user@example.com",
    "role": "customer",
    "createdAt": "2026-01-15T10:30:00Z"
  }
}
```

---

#### 5.3.2 المستخدمين (Users)

##### `GET /api/users/profile`

جلب الملف الشخصي الكامل. (يتطلب مصادقة)

**Response (200):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "name": "كريم مروان",
      "phone": "0591234567",
      "avatar": "https://example.com/avatar.jpg",
      "email": "user@example.com",
      "role": "customer"
    },
    "stats": {
      "totalOrders": 47,
      "completedOrders": 42,
      "totalSpent": 1250.00,
      "rewardPoints": 1200
    },
    "addresses": [
      { "id": "uuid", "label": "المنزل", "address": "غزة، الرمال...", "lat": 31.5, "lng": 34.5, "isDefault": true }
    ],
    "settings": {
      "language": "ar",
      "theme": "light",
      "notifications": true
    }
  }
}
```

---

##### `PUT /api/users/profile`

تحديث الملف الشخصي. (يتطلب مصادقة)

**Request Body:**
```json
{
  "name": "كريم مروان الجديد",
  "phone": "0597654321",
  "email": "new@email.com"
}
```

---

##### `POST /api/users/avatar`

رفع صورة الملف الشخصي. (يتطلب مصادقة, multipart/form-data)

**Request:** FormData مع حقل `avatar`

**Response (200):**
```json
{
  "success": true,
  "data": { "avatar": "https://example.com/avatars/new-avatar.jpg" }
}
```

---

##### `GET /api/users/addresses`

جلب العناوين المحفوظة. (يتطلب مصادقة)

**Query Params:** `?page=1&limit=20`

---

##### `POST /api/users/addresses`

إضافة عنوان جديد. (يتطلب مصادقة)

**Request Body:**
```json
{
  "label": "المنزل",
  "address": "غزة، الرمال، شارع الشهداء، عمارة ٤٥",
  "lat": 31.5244,
  "lng": 34.4518,
  "isDefault": false
}
```

---

##### `GET /api/users/stats`

جلب إحصائيات المستخدم. (يتطلب مصادقة)

**Response (200):**
```json
{
  "success": true,
  "data": {
    "totalOrders": 47,
    "completedOrders": 42,
    "totalSpent": 1250.00,
    "rewardPoints": 1200
  }
}
```

---

##### `GET /api/users/settings`

جلب الإعدادات. (يتطلب مصادقة)

##### `PUT /api/users/settings`

تحديث الإعدادات. (يتطلب مصادقة)

**Request Body:**
```json
{
  "language": "ar",
  "theme": "dark",
  "notifications": true
}
```

---

##### `POST /api/users/fcm-token`

تحديث توكن FCM للإشعارات. (يتطلب مصادقة)

**Request Body:**
```json
{
  "fcm_token": "firebase_token_here"
}
```

---

#### 5.3.3 المناطق والتصنيفات (Areas & Categories)

##### `GET /api/areas`

قائمة مناطق التوصيل.

**Response (200):**
```json
{
  "success": true,
  "data": [
    { "id": "gaza", "name": "مدينة غزة" },
    { "id": "rimal", "name": "الرمال" }
    // ... 12 منطقة
  ]
}
```

---

##### `GET /api/categories`

قائمة التصنيفات.

**Response (200):**
```json
{
  "success": true,
  "data": [
    { "id": "uuid", "name": "الكل", "icon": null, "sortOrder": 0 },
    { "id": "uuid", "name": "شاورما", "icon": null, "sortOrder": 1 }
    // ...
  ]
}
```

---

#### 5.3.4 المتاجر (Stores / Restaurants)

##### `GET /api/restaurants`

قائمة المتاجر مع إمكانية الفلترة.

**Query Params:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `areaId` | string | فلترة حسب المنطقة (مثال: `gaza`, `nuseirat`) |
| `search` | string | بحث في اسم المتجر والـ tags |
| `category` | string | فلترة حسب التصنيف |
| `sort` | enum | `nearest` (افتراضي), `rated`, `fastest` |
| `page` | integer | رقم الصفحة (default: 1) |
| `limit` | integer | عدد النتائج (default: 20) |

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "name": "مطعم جنين",
      "tags": "شاورما • مشويات • سندويشات",
      "address": "شارع النصيرات الرئيسي",
      "rating": 4.8,
      "ratingCount": 1245,
      "distance": "0.8 كم",
      "deliveryTime": "15-20 دقيقة",
      "deliveryFee": 3.00,
      "isOpen": true,
      "isNearest": true,
      "image": "https://...",
      "logo": "https://...",
      "areaId": "nuseirat"
    }
  ],
  "pagination": { "page": 1, "limit": 20, "total": 50, "totalPages": 3 }
}
```

---

##### `GET /api/restaurants/:id`

تفاصيل المتجر.

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "مطعم جنين",
    "tags": "شاورما • مشويات • سندويشات",
    "description": "مطعم فلسطيني أصيل...",
    "address": "شارع النصيرات الرئيسي",
    "areaId": "nuseirat",
    "lat": 31.45,
    "lng": 34.39,
    "image": "https://...",
    "logo": "https://...",
    "rating": 4.8,
    "ratingCount": 1245,
    "deliveryFee": 3.00,
    "deliveryTime": "15-20 دقيقة",
    "isOpen": true,
    "categories": ["شاورما", "مشويات"],
    "products": [ /* Product[] */ ],
    "reviews": [ /* StoreReview[] */ ]
  }
}
```

---

##### `GET /api/restaurants/:id/products`

منتجات المتجر.

**Query Params:** `?category=شاورما&page=1&limit=50`

---

##### `GET /api/restaurants/:id/categories`

تصنيفات المتجر الداخلية.

---

##### `GET /api/restaurants/:id/reviews`

تقييمات المتجر.

**Query Params:** `?page=1&limit=10`

---

#### 5.3.5 المنتجات (Products)

##### `GET /api/products/:id`

تفاصيل المنتج.

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "storeId": "uuid",
    "storeName": "مطعم جنين",
    "name": "لفافة دجاج بالزعتر والبهارات",
    "description": "لفافة دجاج مشوي على الفحم مع مزيج من الزعتر...",
    "price": 32.00,
    "image": "https://...",
    "category": "شاورما",
    "rating": 4.7,
    "ratingCount": 320,
    "sizes": [
      { "id": "uuid", "label": "صغير", "priceAdjustment": 0 },
      { "id": "uuid", "label": "وسط", "priceAdjustment": 5 },
      { "id": "uuid", "label": "كبير", "priceAdjustment": 10 }
    ],
    "extras": {
      "sauces": [
        { "id": "s1", "name": "صلصة طحينية", "price": 2.00 },
        { "id": "s2", "name": "صلصة حارة", "price": 1.50 }
      ],
      "drinks": [
        { "id": "d1", "name": "عصير ليمون", "price": 5.00 }
      ],
      "complements": [
        { "id": "c1", "name": "بطاطس مقلية", "price": 6.00 }
      ]
    }
  }
}
```

---

#### 5.3.6 المفضلة (Wishlist)

##### `GET /api/wishlist`

جلب قائمة المفضلة. (يتطلب مصادقة)

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "لفافة دجاج",
      "image": "https://...",
      "price": "32.00",
      "storeName": "مطعم جنين"
    }
  ]
}
```

---

##### `POST /api/wishlist/toggle`

إضافة/إزالة من المفضلة. (يتطلب مصادقة)

**Request Body:**
```json
{
  "productId": "uuid",
  "storeId": "uuid"   // optional
}
```

**Response:**
```json
{
  "success": true,
  "data": { "isFavorited": true }
}
```

---

#### 5.3.7 الطلبات (Orders)

##### `POST /api/orders`

إنشاء طلب جديد. (يتطلب مصادقة)

**Request Body:**
```json
{
  "storeId": "uuid",
  "recipientName": "أحمد علي",
  "recipientPhone": "0597654321",
  "floor": "3",
  "apartment": "7",
  "deliveryInstructions": "اتصل عند الوصول",
  "leaveAtDoor": false,
  "directHandoff": true,
  "pickupAddress": "ساحة السرايا المركزية",
  "pickupLat": 31.504,
  "pickupLng": 34.459,
  "deliveryAddress": "غزة، الرمال، شارع الشهداء",
  "deliveryLat": 31.524,
  "deliveryLng": 34.451,
  "areaId": "rimal",
  "paymentMethod": "cash",
  "promoCode": "SAVE20",
  "notes": "يرجى السرعة",
  "items": [
    {
      "productId": "uuid",
      "quantity": 2,
      "size": "وسط",
      "extras": [
        { "name": "صلصة حارة", "price": 1.50 }
      ],
      "meta": "بدون بصل"
    }
  ]
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "orderNumber": "DF-7829",
    "status": "pending",
    "total": 72.50,
    "estimatedDelivery": "2026-06-28T13:30:00Z",
    "createdAt": "2026-06-28T12:00:00Z"
  }
}
```

**Business Logic:**
1. التحقق من توفر المتجر والمنتجات
2. حساب الإجمالي (subtotal + deliveryFee + extras - discount)
3. التحقق من صحة كود الخصم (إن وجد)
4. إنشاء الطلب بحالة `pending`
5. البحث عن سائق متاح ← تغيير الحالة إلى `searching_for_driver`
6. إرسال إشعار للسائق المناسب
7. إرجاع بيانات الطلب

---

##### `GET /api/orders`

جلب طلبات المستخدم. (يتطلب مصادقة)

**Query Params:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `status` | string | `active` = الطلبات النشطة, `past` = السابقة, `history` = السجل |
| `month` | string | فلترة حسب الشهر (لصفحة السجل) |
| `page` | integer | |
| `limit` | integer | |

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "orderNumber": "DF-7829",
      "status": "in_transit",
      "statusIcon": "local_shipping",
      "store": { "id": "uuid", "name": "مطعم جنين", "image": "https://..." },
      "items": "٢ وجبة شاورما + مشروبات",
      "total": 72.50,
      "eta": "١٢ دقيقة",
      "progress": 65,
      "driver": { "name": "عمر", "phone": "0591111111" },
      "date": "اليوم",
      "time": "١٠:٣٠ ص",
      "createdAt": "2026-06-28T10:00:00Z"
    }
  ],
  "pagination": { "page": 1, "limit": 20, "total": 15, "totalPages": 1 }
}
```

---

##### `GET /api/orders/:id`

تفاصيل الطلب. (يتطلب مصادقة)

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "orderNumber": "DF-7829",
    "status": "in_transit",
    "customer": { "id": "uuid", "name": "كريم مروان", "phone": "0591234567" },
    "driver": { "id": "uuid", "name": "عمر", "phone": "0591111111", "rating": 4.9, "vehicle": "دراجة هوندا SH 150i (بيضاء)" },
    "store": { "id": "uuid", "name": "مطعم جنين", "image": "https://...", "logo": "https://..." },
    "items": [
      { "productName": "شاورما دجاج", "quantity": 2, "size": "وسط", "extras": [...], "price": 32.00, "subtotal": 64.00 }
    ],
    "pickupAddress": "ساحة السرايا المركزية",
    "deliveryAddress": "غزة، الرمال، شارع الشهداء",
    "recipientName": "أحمد علي",
    "recipientPhone": "0597654321",
    "subtotal": 64.00,
    "deliveryFee": 5.00,
    "discount": 0,
    "total": 69.00,
    "paymentMethod": "cash",
    "paymentStatus": "pending",
    "estimatedDelivery": "2026-06-28T13:30:00Z",
    "deliveredAt": null,
    "timeline": [
      { "id": 1, "label": "تم الطلب", "timestamp": "2026-06-28T12:00:00Z", "done": true, "current": false },
      { "id": 2, "label": "التجهيز", "timestamp": null, "done": false, "current": false },
      { "id": 3, "label": "جاري الشحن", "timestamp": null, "done": false, "current": true },
      { "id": 4, "label": "تم التوصيل", "timestamp": null, "done": false, "current": false }
    ],
    "createdAt": "2026-06-28T12:00:00Z"
  }
}
```

---

##### `GET /api/orders/:id/tracking`

بيانات التتبع المباشر. (يتطلب مصادقة)

**Response (200):**
```json
{
  "success": true,
  "data": {
    "orderId": "uuid",
    "status": "in_transit",
    "eta": "١٢ دقيقة",
    "estimatedArrival": "12:45 م",
    "driverLocation": { "lat": 31.5244, "lng": 34.4518 },
    "pickupLocation": { "lat": 31.504, "lng": 34.459 },
    "deliveryLocation": { "lat": 31.524, "lng": 34.451 },
    "progress": 65,
    "timeline": [
      { "id": 1, "label": "تم قبول الطلب", "icon": "check_circle", "active": true, "current": false },
      { "id": 2, "label": "الاستلام من المتجر", "icon": "store", "active": true, "current": false },
      { "id": 3, "label": "تم الاستلام", "icon": "inventory_2", "active": true, "current": false },
      { "id": 4, "label": "في الطريق إليك", "icon": "local_shipping", "active": true, "current": true },
      { "id": 5, "label": "تم التسليم", "icon": "check_circle", "active": false, "current": false }
    ]
  }
}
```

---

##### `PUT /api/orders/:id/status`

تحديث حالة الطلب. (يتطلب مصادقة - للسائق أو المشرف فقط)

**Request Body:**
```json
{
  "status": "picked_up"   // or "in_transit", "delivered", "cancelled"
}
```

**Business Logic:**
- `pending` → `searching_for_driver` (تلقائي)
- `searching_for_driver` → `accepted` (عند قبول السائق)
- `accepted` → `preparing` (المتجر يبدأ التحضير)
- `preparing` → `picked_up` (السائق استلم الطلب)
- `picked_up` → `in_transit` (السائق في الطريق)
- `in_transit` → `delivered` (تم التوصيل)
- أي حالة → `cancelled` (ممكن)

---

##### `POST /api/orders/:id/rating`

تقييم السائق بعد التوصيل. (يتطلب مصادقة)

**Request Body:**
```json
{
  "rating": 5,
  "comment": "سائق ممتاز، تعامل راقي"
}
```

---

##### `POST /api/orders/:id/reorder`

إعادة الطلب. (يتطلب مصادقة)

يقوم بنسخ آخر طلب مع نفس العناصر.

---

##### `GET /api/orders/:id/invoice`

فاتورة الطلب (PDF أو رابط).

---

##### `POST /api/orders/:id/payment-proof`

رفع صورة إيصال الدفع. (يتطلب مصادقة, multipart/form-data)

---

#### 5.3.8 أكواد الخصم (Promo Codes)

##### `POST /api/promo-codes/validate`

التحقق من صحة كود الخصم. (يتطلب مصادقة)

**Request Body:**
```json
{
  "code": "SAVE20",
  "subtotal": 64.00
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "code": "SAVE20",
    "discountType": "percentage",
    "discountValue": 20,
    "discountAmount": 12.80,
    "newTotal": 51.20
  }
}
```

**Error (كود غير صالح):**
```json
{
  "success": false,
  "error": { "code": "INVALID_PROMO", "message": "كود الخصم غير صالح أو منتهي الصلاحية" }
}
```

---

### 5.4 ملخص كودات الخطأ الموحدة

| الكود | المعنى | HTTP Status |
|-------|--------|-------------|
| `VALIDATION_ERROR` | خطأ في التحقق من صحة البيانات | 400 |
| `UNAUTHORIZED` | غير مصرح (لا يوجد توكن) | 401 |
| `FORBIDDEN` | صلاحية غير كافية | 403 |
| `NOT_FOUND` | المورد غير موجود | 404 |
| `CONFLICT` | تعارض (مثل: رقم الهاتف موجود) | 409 |
| `INVALID_PROMO` | كود خصم غير صالح | 400 |
| `RATE_LIMITED` | تجاوز الحد المسموح | 429 |
| `INTERNAL_ERROR` | خطأ داخلي في الخادم | 500 |

---

## 6. تدفق الطلب (Order Flow)

### 6.1 الخطوات الكاملة من وجهة نظر المستخدم

```
1. HomeScreen → اختيار خدمة (طعام/تسوق) → Restaurants
2. Restaurants → اختيار متجر → StoreDetails
3. StoreDetails → اختيار منتج → ProductDetailsPage
4. ProductDetailsPage → اختيار مقاس + إضافات + كمية → إضافة للسلة
5. Cart → مراجعة السلة + إدخال كود خصم + اختيار طريقة دفع
6. RecipientDetailsPage → إدخال بيانات المستلم
7. PickupLocationPage → اختيار موقع الرفع (خريطة)
8. LocationPicker → اختيار موقع التوصيل (خريطة)
9. OrderSummary → مراجعة كاملة للطلب
10. PaymentMethods → اختيار طريقة الدفع + رفع إيصال (إن لزم)
11. OrderConfirmed → تأكيد الطلب + البحث عن سائق
12. LiveTrackingPage/OrderTracking → تتبع الطلب
13. DeliveryCompletedScreen → تقييم السائق
```

### 6.2 آلة الحالات (State Machine)

```
                    ┌─────────────┐
                    │   pending   │
                    └──────┬──────┘
                           │
                    ┌──────▼──────────┐
                    │searching_for_   │
                    │    driver       │
                    └──────┬──────────┘
                           │
                    ┌──────▼──────┐
                    │  accepted   │◄──── driver accepts
                    └──────┬──────┘
                           │
                    ┌──────▼──────┐
                    │  preparing  │◄──── store prepares
                    └──────┬──────┘
                           │
                    ┌──────▼──────┐
                    │  picked_up  │◄──── driver picks up
                    └──────┬──────┘
                           │
                    ┌──────▼──────┐
                    │ in_transit  │◄──── driver en route
                    └──────┬──────┘
                           │
                    ┌──────▼──────┐
                    │  delivered  │◄──── delivered to customer
                    └─────────────┘

                    All states ──► cancelled
```

### 6.3 إشعارات كل مرحلة

| الحالة | الإشعار للمستخدم | الإشعار للسائق | الإشعار للمتجر |
|--------|-------------------|----------------|----------------|
| `searching_for_driver` | "جاري البحث عن سائق..." | — | — |
| `accepted` | "تم قبول الطلب - الكابتن عمر في الطريق" | — | "طلب جديد" |
| `preparing` | "المتجر يجهز طلبك" | "انتظر حتى تجهيز الطلب" | — |
| `picked_up` | "تم استلام الطلب من المتجر" | — | — |
| `in_transit` | "المندوب في الطريق إليك - ETA 12 دقيقة" | — | — |
| `delivered` | "تم التوصيل بنجاح - قيم التجربة" | "تم التوصيل بنجاح" | "تم توصيل الطلب" |
| `cancelled` | "تم إلغاء الطلب" | "تم إلغاء الطلب" | "تم إلغاء الطلب" |

### 6.4 المهلات (Timeouts)

- البحث عن سائق: 5 دقائق ← إذا لم يتم العثور على سائق، يُعلم المستخدم
- تحضير الطلب: 30 دقيقة (يختلف حسب المتجر)
- إتمام الدفع: 10 دقائق ← إلغاء الطلب تلقائياً

---

## 7. المدفوعات (Payments)

### 7.1 طرق الدفع المدعومة

| المعرف | الاسم | النوع | يتطلب إيصال؟ |
|--------|------|-------|-------------|
| `cod` | نقداً عند الاستلام | Cash | لا |
| `card` | بطاقة ائتمان / فيزا | Card | لا |
| `bop` | حساب بنك فلسطين | Bank Transfer | نعم (صورة إيصال) |
| `jawwal` | جوال بي (Jawwal Pay) | Mobile Wallet | نعم (صورة إيصال) |
| `paypal` | PayPal | Online Payment | نعم (صورة إيصال) |
| `cash` | الدفع نقداً بالكامل (مقدم) | Cash | لا |

### 7.2 تدفق الدفع

**طريقة الدفع المسبق (BOP, Jawwal, PayPal):**
1. المستخدم يختار طريقة الدفع
2. تظهر تفاصيل الحساب (رقم الحساب، رقم المحفظة)
3. المستخدم يقوم بالتحويل خارجياً
4. المستخدم يرفع صورة الإيصال (صور الدفع)
5. `POST /api/orders/:id/payment-proof`
6. الحالة ← `payment_status: pending` (بانتظار المراجعة)
7. المشرف يراجع الإيصال ويؤكد الدفع

**طريقة الدفع عند الاستلام (COD, Cash):**
1. المستخدم يختار طريقة الدفع
2. `payment_status: pending`
3. يتم الدفع عند استلام الطلب
4. السائق يؤكد استلام المبلغ ← `payment_status: paid`

### 7.3 معلومات الحسابات (Sensitive - للتكوين فقط)

```
- بنك فلسطين: رقم الحساب XX
- جوال بي: الرقم XX
- بايبال: البريد الإلكتروني XX
```

(يجب أن تكون في متغيرات بيئية، وليس في الكود)

---

## 8. الخرائط والمواقع (Maps & Locations)

### 8.1 متطلبات Google Maps

- **API Key:** `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`
- **المكتبات المطلوبة:** `places`
- **المنطقة (Region):** `PS` (فلسطين)
- **اللغة:** `ar` (العربية)

### 8.2 الوظائف المطلوبة من الباك إند

#### `POST /api/locations/geocode`

ترجمة عنوان نصي إلى إحداثيات (Forward Geocoding).

**Request Body:**
```json
{
  "address": "غزة، الرمال، شارع الشهداء"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "lat": 31.5244,
    "lng": 34.4518,
    "formattedAddress": "شارع الشهداء، الرمال، غزة",
    "areaId": "rimal"
  }
}
```

#### `POST /api/locations/reverse-geocode`

ترجمة إحداثيات إلى عنوان (Reverse Geocoding).

**Request Body:**
```json
{
  "lat": 31.5244,
  "lng": 34.4518
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "formattedAddress": "شارع الشهداء، الرمال، غزة",
    "areaId": "rimal"
  }
}
```

#### `GET /api/locations/saved`

قائمة المواقع المحفوظة للمستخدم. (يتطلب مصادقة)

#### `POST /api/locations/saved`

حفظ موقع جديد للمستخدم. (يتطلب مصادقة)

---

## 9. الإشعارات الفورية (Push Notifications)

### 9.1 الإعداد

- استخدام **Firebase Cloud Messaging (FCM)**
- التكامل مع `firebase` SDK في الفرونت إند
- توكن FCM يُخزن في جدول `users.fcm_token`

### 9.2 أنواع الإشعارات

| الحدث | العنوان | المحتوى | المستلم |
|-------|---------|---------|---------|
| طلب جديد | "طلب جديد 📦" | "لديك طلب جديد من كريم - شاورما 2x" | Driver |
| تم قبول الطلب | "تم قبول طلبك ✅" | "الكابتن عمر سيقوم بتوصيل طلبك" | Customer |
| تم التوصيل | "تم التوصيل 🎉" | "تم توصيل طلبك بنجاح - قيم التجربة" | Customer |
| تغيير الحالة | "تحديث الطلب" | "طلبك الآن في الطريق إليك" | Customer |
| إشعار عام | "عرض خاص 🎁" | "خصم 20% على أول طلب" | All Users |

### 9.3 Endpoint

#### `POST /api/notifications/send`

إرسال إشعار (للمشرف فقط).

**Request Body:**
```json
{
  "userId": "uuid",
  "title": "عرض خاص",
  "body": "خصم 20% على أول طلب",
  "data": {
    "type": "promo",
    "url": "/offers/1"
  }
}
```

### 9.4 تنسيق الإشعار (FCM Payload)

```json
{
  "to": "fcm_token",
  "notification": {
    "title": "تم قبول طلبك ✅",
    "body": "الكابتن عمر سيقوم بتوصيل طلبك",
    "sound": "default"
  },
  "data": {
    "type": "order_status",
    "orderId": "uuid",
    "status": "accepted",
    "click_action": "FLUTTER_NOTIFICATION_CLICK"
  }
}
```

---

## 10. رفع وتخزين الملفات (File Storage)

### 10.1 أنواع الملفات المطلوبة

| النوع | الاستخدام | الصيغ المسموحة | الحد الأقصى |
|-------|-----------|----------------|-------------|
| صورة شخصية (Avatar) | صورة المستخدم | JPEG, PNG, WebP | 5MB |
| صورة منتج | صور المنتجات | JPEG, PNG, WebP | 10MB |
| صورة متجر | غلاف المتجر وشعار | JPEG, PNG, WebP | 10MB |
| إيصال دفع | صور إيصالات التحويل | JPEG, PNG, PDF | 5MB |

### 10.2 Endpoints

#### `POST /api/upload`

رفع ملف عام. (multipart/form-data)

**Request:** FormData مع حقل `file` + `type` (avatar/product/receipt)

**Response (200):**
```json
{
  "success": true,
  "data": {
    "url": "https://cdn.example.com/uploads/abc123.jpg",
    "filename": "abc123.jpg",
    "size": 2048576
  }
}
```

### 10.3 توصيات التخزين

- **خيار 1:** Cloudinary (متوافق مع إعدادات next.config.ts الحالية)
- **خيار 2:** تخزين محلي + CDN
- **خيار 3:** Supabase Storage / Firebase Storage

---

## 11. الأمان (Security)

### 11.1 المصادقة والصلاحيات

- JWT مع توقيع RS256 أو HS256
- صلاحية التوكن: 24 ساعة
- Refresh token (اختياري): 7 أيام
- معدل الطلبات (Rate Limiting): 100 طلب/دقيقة لكل IP
- قفل الحساب بعد 5 محاولات فاشلة (لمدة 15 دقيقة)

### 11.2 حماية API

```
- جميع endpoints الحساسة تتطلب Bearer token
- التحقق من الصلاحية (role-based) في كل طلب
- CORS: السماح فقط بـ http://localhost:3000 (وفي الإنتاج: النطاق الفعلي)
- Helmet headers (X-Content-Type-Options, X-Frame-Options, إلخ)
- Input sanitization (منع XSS, SQL Injection)
- Parameterized queries (منع SQL Injection)
```

### 11.3 حماية البيانات

```
- كلمات المرور: bcrypt مع 10 rounds
- التوكن: JWT مع secret قوي (NEXTAUTH_SECRET)
- HTTPS إلزامي في الإنتاج
- عدم تخزين معلومات الدفع الحساسة
- Sanitize جميع المدخلات
- Rate limiting على /auth/login (5 محاولات/دقيقة)
```

### 11.4 Middleware

```typescript
// ترتيب Middleware
1. Rate Limiter
2. CORS
3. Helmet (Security Headers)
4. Body Parser (JSON, URL-encoded)
5. Auth Middleware (يبحث عن Bearer token)
6. Role Middleware (يتحقق من الصلاحية)
7. Validation Middleware (يتحقق من صحة البيانات)
8. Route Handler
9. Error Handler (يلتقط جميع الأخطاء)
```

---

## 12. المتغيرات البيئية (Environment Variables)

### 12.1 الخادم (Server)

```bash
# === الخادم ===
PORT=3001
NODE_ENV=development

# === قاعدة البيانات ===
DATABASE_URL=postgresql://user:password@localhost:5432/dreefree

# === JWT ===
JWT_SECRET=your-jwt-secret-change-in-production
JWT_EXPIRES_IN=24h

# === CORS ===
CORS_ORIGIN=http://localhost:3000

# === رفع الملفات ===
UPLOAD_PROVIDER=local    # local | cloudinary
UPLOAD_DIR=./uploads
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# === Firebase (للإشعارات) ===
FIREBASE_PROJECT_ID=
FIREBASE_PRIVATE_KEY=
FIREBASE_CLIENT_EMAIL=

# === Google Maps (للـ Geocoding) ===
GOOGLE_MAPS_API_KEY=

# === معلومات الدفع ===
BOP_ACCOUNT_NUMBER=
JAWWAL_NUMBER=
PAYPAL_EMAIL=
```

### 12.2 متغيرات الفرونت إند المرتبطة

```bash
# هذه المتغيرات في الفرونت إند يجب أن تتطابق مع الباك إند
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET= # يجب أن يتطابق مع JWT_SECRET
```

---

## 13. معالجة الأخطاء والتحقق (Error Handling & Validation)

### 13.1 هيكل معالجة الأخطاء

```typescript
// Error classes
class AppError extends Error {
  statusCode: number;
  code: string;
  details?: any;

  constructor(message: string, statusCode: number, code: string, details?: any) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
  }
}

class ValidationError extends AppError {
  constructor(details: any) {
    super('Validation failed', 400, 'VALIDATION_ERROR', details);
  }
}

class NotFoundError extends AppError {
  constructor(resource: string) {
    super(`${resource} not found`, 404, 'NOT_FOUND');
  }
}

class UnauthorizedError extends AppError {
  constructor() {
    super('Unauthorized', 401, 'UNAUTHORIZED');
  }
}
```

### 13.2 التحقق من صحة البيانات (Validation)

استخدام مكتبة **Zod** (JavaScript/TypeScript) أو **Joi** أو **express-validator**:

```typescript
// مثال باستخدام Zod
import { z } from 'zod';

const registerSchema = z.object({
  name: z.string().min(2).max(100),
  phone: z.string().regex(/^(059|056|058)\d{7}$/, 'رقم الهاتف غير صحيح'),
  password: z.string().min(6, 'كلمة المرور يجب أن تكون 6 أحرف على الأقل'),
  passwordConfirm: z.string(),
}).refine(data => data.password === data.passwordConfirm, {
  message: 'كلمة المرور غير متطابقة',
  path: ['passwordConfirm'],
});

const createOrderSchema = z.object({
  storeId: z.string().uuid(),
  recipientName: z.string().min(3).max(100),
  recipientPhone: z.string().regex(/^(059|056|058)\d{7}$/),
  deliveryAddress: z.string().min(5),
  paymentMethod: z.enum(['cod', 'card', 'bop', 'jawwal', 'paypal', 'cash']),
  items: z.array(z.object({
    productId: z.string().uuid(),
    quantity: z.number().int().min(1),
    size: z.string().optional(),
    extras: z.array(z.object({
      name: z.string(),
      price: z.number().positive(),
    })).optional(),
  })).min(1, 'يجب إضافة عنصر واحد على الأقل'),
});
```

### 13.3 Standard Error Response

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "بيانات غير صالحة",
    "details": [
      { "field": "phone", "message": "رقم الهاتف مطلوب" },
      { "field": "password", "message": "كلمة المرور يجب أن تكون 6 أحرف على الأقل" }
    ]
  }
}
```

---

## 14. هيكل مجلدات الباك إند المقترح

```
backend/
├── src/
│   ├── index.ts                      # نقطة الدخول
│   ├── app.ts                        # إعداد Express/Fastify
│   │
│   ├── config/
│   │   ├── database.ts               # اتصال قاعدة البيانات
│   │   ├── firebase.ts               # Firebase Admin SDK
│   │   ├── env.ts                    # المتغيرات البيئية
│   │   └── cors.ts                   # إعدادات CORS
│   │
│   ├── middleware/
│   │   ├── auth.ts                   # التحقق من JWT
│   │   ├── role.ts                   # التحقق من الصلاحية
│   │   ├── validate.ts              # التحقق من صحة البيانات (Zod)
│   │   ├── rateLimiter.ts           # معدل الطلبات
│   │   ├── errorHandler.ts          # معالجة الأخطاء
│   │   └── upload.ts                # رفع الملفات (Multer)
│   │
│   ├── modules/
│   │   ├── auth/
│   │   │   ├── auth.routes.ts
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.ts
│   │   │   └── auth.validation.ts
│   │   │
│   │   ├── users/
│   │   │   ├── users.routes.ts
│   │   │   ├── users.controller.ts
│   │   │   ├── users.service.ts
│   │   │   └── users.validation.ts
│   │   │
│   │   ├── stores/
│   │   │   ├── stores.routes.ts
│   │   │   ├── stores.controller.ts
│   │   │   ├── stores.service.ts
│   │   │   └── stores.validation.ts
│   │   │
│   │   ├── products/
│   │   │   ├── products.routes.ts
│   │   │   ├── products.controller.ts
│   │   │   ├── products.service.ts
│   │   │   └── products.validation.ts
│   │   │
│   │   ├── orders/
│   │   │   ├── orders.routes.ts
│   │   │   ├── orders.controller.ts
│   │   │   ├── orders.service.ts
│   │   │   ├── orders.validation.ts
│   │   │   └── orders.machine.ts      # State machine
│   │   │
│   │   ├── payments/
│   │   │   ├── payments.routes.ts
│   │   │   ├── payments.controller.ts
│   │   │   └── payments.service.ts
│   │   │
│   │   ├── wishlist/
│   │   │   ├── wishlist.routes.ts
│   │   │   ├── wishlist.controller.ts
│   │   │   └── wishlist.service.ts
│   │   │
│   │   ├── promo-codes/
│   │   │   ├── promo-codes.routes.ts
│   │   │   ├── promo-codes.controller.ts
│   │   │   └── promo-codes.service.ts
│   │   │
│   │   ├── locations/
│   │   │   ├── locations.routes.ts
│   │   │   ├── locations.controller.ts
│   │   │   └── locations.service.ts
│   │   │
│   │   └── notifications/
│   │       ├── notifications.routes.ts
│   │       ├── notifications.controller.ts
│   │       └── notifications.service.ts
│   │
│   ├── shared/
│   │   ├── errors.ts                 # Error classes
│   │   ├── response.ts               # Response helper
│   │   ├── pagination.ts             # Pagination helper
│   │   └── types.ts                  # الأنواع المشتركة
│   │
│   └── utils/
│       ├── jwt.ts                    # دوال JWT
│       ├── hash.ts                   # دوال التشفير (bcrypt)
│       ├── orderId.ts               # توليد رقم الطلب (DF-XXXX)
│       └── firebase.ts              # دوال الإشعارات
│
├── uploads/                          # الملفات المرفوعة (للتخزين المحلي)
│
├── tests/
│   ├── auth.test.ts
│   ├── orders.test.ts
│   └── stores.test.ts
│
├── package.json
├── tsconfig.json
├── .env
├── .env.example
└── README.md
```

---

## 15. خارطة طريق التنفيذ

### المرحلة الأولى: الأساسيات (الأسبوع 1-2)

| الأولوية | المهمة | الوصف |
|----------|--------|-------|
| 🔴 عاجل | إعداد المشروع | إنشاء مشروع Node.js + TypeScript + Express/Fastify |
| 🔴 عاجل | قاعدة البيانات | إنشاء الجداول والعلاقات (PostgreSQL) |
| 🔴 عاجل | المصادقة | POST /auth/login, POST /auth/register, JWT middleware |
| 🔴 عاجل | CRUD المتاجر | GET /restaurants, GET /restaurants/:id |
| 🔴 عاجل | CRUD المنتجات | GET /products/:id, GET /products?storeId= |
| 🔴 عاجل | المناطق والتصنيفات | GET /areas, GET /categories |

### المرحلة الثانية: الطلبات (الأسبوع 3-4)

| الأولوية | المهمة | الوصف |
|----------|--------|-------|
| 🔴 عاجل | إنشاء الطلب | POST /orders مع حساب الإجمالي |
| 🔴 عاجل | حالة الطلب | State machine + تحديث الحالة |
| 🔴 عاجل | قائمة الطلبات | GET /orders مع الفلترة (active/past/history) |
| 🟡 متوسط | تتبع الطلب | GET /orders/:id/tracking |
| 🟡 متوسط | إعادة الطلب | POST /orders/:id/reorder |
| 🟡 متوسط | أكواد الخصم | POST /promo-codes/validate |

### المرحلة الثالثة: الملف الشخصي والمستخدمين (الأسبوع 4-5)

| الأولوية | المهمة | الوصف |
|----------|--------|-------|
| 🟡 متوسط | الملف الشخصي | GET/PUT /users/profile |
| 🟡 متوسط | العناوين | CRUD user_addresses |
| 🟡 متوسط | المفضلة | GET/POST wishlist |
| 🟡 متوسط | الإعدادات | GET/PUT user_settings |
| 🟡 متوسط | الإحصائيات | GET /users/stats |
| 🟢 منخفض | رفع الصور | POST /upload |

### المرحلة الرابعة: المدفوعات والإشعارات (الأسبوع 5-6)

| الأولوية | المهمة | الوصف |
|----------|--------|-------|
| 🟡 متوسط | إيصالات الدفع | POST /orders/:id/payment-proof |
| 🟡 متوسط | تأكيد الدفع | POST /payments/confirm |
| 🟡 متوسط | إشعارات FCM | إرسال الإشعارات عند تغيير الحالة |
| 🟢 منخفض | تحديث توكن FCM | POST /users/fcm-token |
| 🟢 منخفض | Geocoding | POST /locations/geocode + reverse |

### المرحلة الخامسة: التحسين والإطلاق (الأسبوع 6-8)

| الأولوية | المهمة | الوصف |
|----------|--------|-------|
| 🟡 متوسط | الاختبارات | Unit + Integration tests |
| 🟢 منخفض | تقييم السائق | POST /orders/:id/rating |
| 🟢 منخفض | تقييم المتجر | POST /stores/:id/reviews |
| 🟢 منخفض | التوثيق | Swagger/OpenAPI docs |
| 🟢 منخفض | الأداء | Caching, pagination improvements |
| 🟢 منخفض | الإطلاق | Deployment, monitoring, logging |

---

## ملاحظات مهمة

1. **حالة الطلب:** الفرونت إند يستخدم نصوصاً عربية لحالات الطلب (مثل "قيد التجهيز"، "في الطريق"). الباك إند يجب أن يستخدم `enum` باللغة الإنجليزية (مثل `preparing`, `in_transit`) ويُرجعها للفرونت إند التي ستترجمها.

2. **أرقام الهواتف:** جميع الأرقام الفلسطينية تبدأ بـ `059`، `056`، `058` وتتكون من 10 أرقام. يجب التحقق من صحة التنسيق.

3. **العملة:** الشيكل الإسرائيلي (₪) مع منزلتين عشريتين. جميع قيم prices/ totals يجب أن تكون `DECIMAL(10, 2)`.

4. **المسافات (Distance):** الفرونت إند يعرض المسافة كنص مثل "0.8 كم". الباك إند يمكنه حساب المسافة باستخدام إحداثيات GPS (Haversine formula) أو إرجاع نص جاهز.

5. **الصور:** جميع الصور في الموك داتا حالياً من Googleusercontent. الباك إند يجب أن يدعم رفع الصور وتخزينها مع CDN.

6. **توافق NextAuth:** الباك إند يجب أن يعمل مع NextAuth v5. تدفق المصادقة: NextAuth API route → Backend POST /auth/login → JWT token → NextAuth يشفره في session.

7. **التدوين (Logging):** استخدام Winston أو Pino لتسجيل كل الطلبات والأخطاء.
