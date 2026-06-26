# خطة العمل - برومبتات تنفيذ المشروع

> كل برومبت هو مهمة مستقلة بذاتها. نفذها بالترتيب المحدد.

---

## المرحلة الأولى: التصليحات الأساسية (Foundation Fixes)

---

### المهمة 1.1 — إزالة الملفات المكررة وترتيب هيكل المشروع

```
نظف مشروع Next.js من الملفات المكررة وأعد هيكلته.

المشكلة:
- يوجد ملفان متطابقان للمطاعم: `app/(Screens)/RestaurantsPage.tsx` و `app/(Screens)/Restaurants/page.tsx`
- يوجد ملفان متطابقان للمتجر: `app/(Screens)/StoreDetailsPage.tsx` و `app/(Screens)/StoreDetails/page.tsx`
- يوجد ملفان متطابقان للمنتج: `app/(Screens)/ProductDetailsPage.tsx` و `app/(Screens)/ProductDetailsPage/page.tsx`

المطلوب:
1. ملف `RestaurantsPage.tsx` → احذفه. ابقِ `Restaurants/page.tsx` لأنه يتبع Routing Convention.
2. ملف `StoreDetailsPage.tsx` → احذفه. ابقِ `StoreDetails/page.tsx`.
3. ملف `ProductDetailsPage.tsx` → احذفه. ابقِ `ProductDetailsPage/page.tsx`.
4. مجلد `(customer)` → احذفه لأنه فارغ.
5. تأكد من عدم وجود أي import يشير للملفات المحذوفة في أي مكان بالمشروع (استخدم grep).
6. بعد الحذف، شغّل `npm run build` وتأكد من عدم وجود أخطاء.
7. قم بتحديث هيكل `app/(Screens)` ليصبح نظيفاً بدون ملفات مكررة.

ملاحظة: لا تلمس `Component/AdvancedTabBar.tsx` أو `Component/TabBarWrapper.tsx`.
```

---

### المهمة 1.2 — إصلاح مسارات التنقل المعطلة (جزء 1)

```
صلح جميع مسارات التنقل المعطلة في مشروع Next.js.

المشاكل:
1. في `app/(Screens)/(Order)/OrderSummary/page.tsx`:
   - السطر: `router.push('/(Screen)/PaymentMethods')`
   - المسار خطأ. الصحيح: `/PaymentMethods`

2. في `app/(Screens)/(Order)/PaymentMethods/page.tsx`:
   - يوجد رابط لـ `/OrderConfirmed` لكن هذا المسار هو في الواقع `/(Order)/OrderConfirmed`
   - أضف هذا المسار في `TabBarWrapper.tsx` ضمن قائمة `hiddenRoutes` (اسمه: `/OrderConfirmed`)

3. في `Component/AdvancedTabBar.tsx`:
   - tabs المصفوفة: تبويب "السجل" يوجه إلى `/history` وهذا صحيح
   - تبويب "الحساب" يوجه إلى `/ProfilePage` وهذا صحيح
   - تبويب "الطلبات" يوجه إلى `/orders` وهذا صحيح
   - لكن تأكد من أن صفحة `/orders` موجودة بالفعل في `app/(Screens)/orders/page.tsx`

4. في `Component/TabBarWrapper.tsx`:
   - اقرأ الملف وأضف هذه المسارات المخفية (لا يظهر فيها التاب بار):
     - `/(Order)/OrderConfirmed`
     - `/ProductDetailsPage`
     - `/(Order)/LocationPicker`

5. تأكد من تطابق router.push مع مسارات الملفات الفعلية.
   - `StoreDetails` → `/StoreDetails`
   - `Cart` → `/Cart`
   - `PaymentMethods` → `/PaymentMethods`
   - `OrderSummary` → `/(Order)/OrderSummary`
   - إلخ.

بعد التعديل، شغّل `npm run build` وتأكد من خلوه من الأخطاء.
```

---

### المهمة 1.3 — إصلاح مسارات التنقل المعطلة (جزء 2) — التوجيه الديناميكي

```
حول المسارات الثابتة للمتاجر والمنتجات إلى مسارات ديناميكية.

المطلوب:
1. أعد هيكلة `app/(Screens)/StoreDetails/` ليصبح `app/(Screens)/StoreDetails/[storeId]/page.tsx`
   - انقل محتوى `page.tsx` القديم إلى المسار الجديد
   - استخدم `useParams()` من `next/navigation` لجلب `storeId`
   - أضف `generateStaticParams` إذا كان عدد المتاجر محدوداً
   - حدث الرابط في `Restaurants/page.tsx` من `/StoreDetails` إلى `/StoreDetails/${id}`

2. أعد هيكلة `app/(Screens)/ProductDetailsPage/` ليصبح `app/(Screens)/ProductDetailsPage/[productId]/page.tsx`
   - انقل محتوى `page.tsx` القديم إلى المسار الجديد
   - استخدم `useParams()` لجلب `productId`
   - حدث الرابط من `Restaurants/page.tsx` و `StoreDetails/page.tsx`

3. أضف `generateMetadata` ديناميكي في كل صفحة:
   - `StoreDetails/[storeId]/page.tsx` → title: اسم المتجر
   - `ProductDetailsPage/[productId]/page.tsx` → title: اسم المنتج

4. استخدم `notFound()` من `next/navigation` إذا كان `storeId` أو `productId` غير موجود.

5. حدث `TabBarWrapper.tsx` — أضف `/StoreDetails/*` و `/ProductDetailsPage/*` كمسارات مخفية.

بعد التعديل، شغّل `npm run build` وتأكد من خلوه من الأخطاء.
```

---

### المهمة 1.4 — إضافة إدارة حالة السلة (Zustand)

```
أضف Zustand لإدارة حالة السلة بشكل عام عبر التطبيق.

المطلوب:
1. ثبّت Zustand:
   ```
   npm install zustand
   ```

2. أنشئ ملف `lib/store/cartStore.ts`:
   ```typescript
   import { create } from 'zustand';
   import { persist } from 'zustand/middleware';

   export interface CartItem {
     id: number;
     name: string;
     price: number;
     quantity: number;
     image: string;
     meta?: string;
     extras?: { name: string; price: number }[];
     size?: string;
   }

   interface CartStore {
     items: CartItem[];
     addItem: (item: CartItem) => void;
     removeItem: (id: number) => void;
     updateQuantity: (id: number, increment: boolean) => void;
     clearCart: () => void;
     totalItems: () => number;
     subtotal: () => number;
   }

   // استخدم persist middleware للحفظ في localStorage
   export const useCartStore = create<CartStore>()(
     persist(
       (set, get) => ({
         items: [],
         addItem: (item) => set((state) => {
           const existing = state.items.find(i => i.id === item.id);
           if (existing) {
             return {
               items: state.items.map(i =>
                 i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
               ),
             };
           }
           return { items: [...state.items, item] };
         }),
         removeItem: (id) => set((state) => ({
           items: state.items.filter(i => i.id !== id),
         })),
         updateQuantity: (id, increment) => set((state) => ({
           items: state.items.map(item =>
             item.id === id
               ? { ...item, quantity: Math.max(1, increment ? item.quantity + 1 : item.quantity - 1) }
               : item
           ),
         })),
         clearCart: () => set({ items: [] }),
         totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
         subtotal: () => get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
       }),
       { name: 'dreefree-cart' }
     )
   );
   ```

3. حدث `app/(Screens)/Cart/page.tsx`:
   - استبدل `useState` الأولي بالسلة بـ `useCartStore`
   - استخدم `useCartStore` بدلاً من `INITIAL_ITEMS`
   - وظّف `updateQuantity` من الـ store بدلاً من التعديل المحلي
   - وظّف `subtotal()` بدلاً من الحساب اليدوي

4. حدث `app/(Screens)/ProductDetailsPage/[productId]/page.tsx`:
   - أضف زر "إضافة للسلة" يستدعي `addItem` من `useCartStore`
   - اعرض عداد السلة الحالي (من `totalItems`) في الـ Header

5. أضف زر عداد السلة في `app/(Screens)/HomeScreen/page.tsx`:
   - أيقونة سلة في الـ header مع عداد من `useCartStore`

بعد التعديل، شغّل `npm run build` وتأكد من عدم وجود أخطاء.
```

---

### المهمة 1.5 — ربط ClientWrapper مع شاشة Splash

```
صلح ربط ClientWrapper في layout.tsx ليعمل مع شاشة Splash كما يجب.

المطلوب:
1. اقرأ `app/(Screens)/ClientWrapper.tsx` وافهم how it works:
   - يتحقق من `sessionStorage` key `splashShown`
   - إذا لم يُعرض الـ Splash من قبل، يعرض `SplashScreen` لمدة ثانيتين ثم يظهر الـ children

2. اقرأ `Component/SplashScreen.tsx` — تأكد من أنه يقبل props `onFinish`.

3. حدث `app/layout.tsx`:
   - لف `{children}` داخل `ClientWrapper`
   - بحيث يكون الترتيب: `TabBarWrapper > ClientWrapper > children`
   - تأكد أن `ClientWrapper` يأخذ `children` كـ prop ويعرضهم بعد انتهاء الـ Splash

4. تأكد من أن `ClientWrapper` هو `"use client"` component بالفعل.

مثال على layout.tsx بعد التعديل:
```tsx
<TabBarWrapper>
  <ClientWrapper>
    {children}
  </ClientWrapper>
</TabBarWrapper>
```

بعد التعديل، اختبر يدويًا: افتح التطبيق → شاهد Splash → بعد ثانيتين يظهر المحتوى. أعد تحميل الصفحة → لا يظهر Splash.
```

---

### المهمة 1.6 — إصلاح Animation Cleanup في LiveTrackingPage

```
صلح تسرب الذاكرة (memory leak) في شاشة التتبع المباشر.

المشكلة:
في `app/(Screens)/(Order)/LiveTrackingPage.tsx`، يتم استخدام `requestAnimationFrame` لتحديث موقع driver ولكن لم يتم إلغاؤه عند unmount المكون.

المطلوب:
1. اقرأ ملف `app/(Screens)/(Order)/LiveTrackingPage.tsx` بالكامل.

2. أضف مرجع للـ animation frame:
   ```typescript
   const animationRef = useRef<number | null>(null);
   ```

3. عند بدء الأنيميشن (useEffect):
   ```typescript
   const animate = () => {
     // ... الكود الحالي
     animationRef.current = requestAnimationFrame(animate);
   };
   animationRef.current = requestAnimationFrame(animate);
   ```

4. في `cleanup function`:
   ```typescript
   return () => {
     if (animationRef.current !== null) {
       cancelAnimationFrame(animationRef.current);
     }
   };
   ```

5. بدّل أي استدعاء مباشر لـ `requestAnimationFrame` ليستخدم `animationRef.current`.

بعد التعديل، شغّل `npm run build` وتأكد من عدم وجود أخطاء lint أو TypeScript.
```

---

### المهمة 1.7 — إضافة Error Boundaries

```
أضف Error Boundaries لحماية التطبيق من الأعطال.

المطلوب:
1. أنشئ ملف `components/ErrorBoundary.tsx`:
   - استخدم React class component (لأن Error Boundaries لا تدعم hooks)
   ```tsx
   'use client';
   import { Component, ReactNode } from 'react';

   interface Props {
     children: ReactNode;
     fallback?: ReactNode;
   }

   interface State {
     hasError: boolean;
     error?: Error;
   }

   export default class ErrorBoundary extends Component<Props, State> {
     constructor(props: Props) {
       super(props);
       this.state = { hasError: false };
     }

     static getDerivedStateFromError(error: Error): State {
       return { hasError: true, error };
     }

     componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
       console.error('ErrorBoundary caught:', error, errorInfo);
     }

     render() {
       if (this.state.hasError) {
         if (this.props.fallback) return this.props.fallback;
         return (
           <div dir="rtl" className="flex flex-col items-center justify-center min-h-screen p-4 bg-[#F8FAFC] text-center">
             <span className="material-symbols-outlined text-6xl text-red-400 mb-4">error_outline</span>
             <h1 className="text-xl font-bold text-[#151e16] mb-2">عذراً، حدث خطأ غير متوقع</h1>
             <p className="text-[#5f5e5e] mb-4">نعمل على حل المشكلة، يرجى المحاولة مرة أخرى</p>
             <button
               onClick={() => { this.setState({ hasError: false }); window.location.reload(); }}
               className="px-6 py-2 bg-[#006d34] text-white rounded-xl hover:bg-[#005226] transition-colors"
             >
               إعادة تحميل
             </button>
           </div>
         );
       }
       return this.props.children;
     }
   }
   ```

2. أنشئ ملف `components/ErrorBoundaryWrapper.tsx`:
   ```tsx
   'use client';
   import { ReactNode } from 'react';
   import ErrorBoundary from './ErrorBoundary';

   export default function ErrorBoundaryWrapper({ children }: { children: ReactNode }) {
     return <ErrorBoundary>{children}</ErrorBoundary>;
   }
   ```

3. حدث `app/layout.tsx`:
   - لف `{children}` داخل `<ErrorBoundaryWrapper>`
   - الترتيب النهائي:
     ```
     TabBarWrapper > ErrorBoundaryWrapper > ClientWrapper > children
     ```

4. أضف صفحة `app/error.tsx`:
   ```tsx
   'use client';
   export default function Error({ error, reset }: { error: Error; reset: () => void }) {
     return (
       <div dir="rtl" className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
         <h2 className="text-2xl font-bold mb-2">حدث خطأ!</h2>
         <button onClick={() => reset()} className="px-4 py-2 bg-[#006d34] text-white rounded-lg">
           حاول مرة أخرى
         </button>
       </div>
     );
   }
   ```

بعد التعديل، شغّل `npm run build` وتأكد من خلوه من الأخطاء.
```

---

## المرحلة الثانية: بنية تحتية للبيانات (Data Infrastructure)

---

### المهمة 2.1 — إنشاء طبقة API منظمة (Data Layer)

```
أنشئ طبقة API منظمة للتواصل مع الـ Backend.

المطلوب:
1. ثبّت الحزم:
   ```
   npm install @tanstack/react-query axios
   ```

2. أنشئ `lib/api/client.ts`:
   ```typescript
   import axios from 'axios';

   const apiClient = axios.create({
     baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
     headers: { 'Content-Type': 'application/json' },
     timeout: 15000,
   });

   // Interceptor للـ auth token
   apiClient.interceptors.request.use((config) => {
     if (typeof window !== 'undefined') {
       const token = localStorage.getItem('auth-token');
       if (token) config.headers.Authorization = `Bearer ${token}`;
     }
     return config;
   });

   // Interceptor للـ errors
   apiClient.interceptors.response.use(
     (response) => response,
     (error) => {
       if (error.response?.status === 401) {
         localStorage.removeItem('auth-token');
         window.location.href = '/login';
       }
       return Promise.reject(error);
     }
   );

   export default apiClient;
   ```

3. أنشئ `lib/api/endpoints.ts`:
   ```typescript
   import apiClient from './client';

   export const restaurantsApi = {
     getAll: (params?: Record<string, string>) => apiClient.get('/restaurants', { params }),
     getById: (id: string) => apiClient.get(`/restaurants/${id}`),
   };

   export const productsApi = {
     getByStore: (storeId: string) => apiClient.get(`/products?storeId=${storeId}`),
     getById: (id: string) => apiClient.get(`/products/${id}`),
   };

   export const ordersApi = {
     create: (data: any) => apiClient.post('/orders', data),
     getMyOrders: () => apiClient.get('/orders/my'),
     getById: (id: string) => apiClient.get(`/orders/${id}`),
   };

   export const authApi = {
     login: (data: { phone: string; password: string }) => apiClient.post('/auth/login', data),
     register: (data: any) => apiClient.post('/auth/register', data),
     me: () => apiClient.get('/auth/me'),
   };
   ```

4. أنشئ `lib/hooks/useQueryProvider.tsx`:
   ```tsx
   'use client';
   import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
   import { ReactNode, useState } from 'react';

   export default function QueryProvider({ children }: { children: ReactNode }) {
     const [queryClient] = useState(() => new QueryClient({
       defaultOptions: {
         queries: { staleTime: 5 * 60 * 1000, retry: 1, refetchOnWindowFocus: false },
       },
     }));
     return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
   }
   ```

5. حدث `app/layout.tsx`:
   - لف كل شيء داخل `<QueryProvider>`

6. أنشئ `lib/api/types.ts` مع جميع الأنواع (interfaces) المستخدمة في التطبيق:
   - `Restaurant`, `Product`, `Order`, `User`, `CartItem`, إلخ

بعد التعديل، شغّل `npm run build` وتأكد من خلوه من الأخطاء.
```

---

### المهمة 2.2 — إضافة Skeleton Loaders لجميع الشاشات

```
أضف Skeleton Loaders لكل شاشة رئيسية لتحسين تجربة المستخدم أثناء التحميل.

المطلوب:
1. أنشئ `components/skeletons/RestaurantsSkeleton.tsx`:
   - Grid من 6 بطاقات رمادية متحركة (shimmer effect)
   - نفس أبعاد بطاقات المطاعم الحقيقية

2. أنشئ `components/skeletons/StoreDetailsSkeleton.tsx`:
   - Cover image skeleton + logo skeleton + text skeletons
   - Grid من 4 منتجات skeleton

3. أنشئ `components/skeletons/ProductDetailsSkeleton.tsx`:
   - Image skeleton كبير
   - 3 أسطر نص skeleton
   - 3 أزرار مقاسات skeleton
   - زر إضافة للسلة skeleton

4. أنشئ `components/skeletons/OrdersSkeleton.tsx`:
   - 3 بطاقات طلبات skeleton

5. أنشئ `components/skeletons/ProfileSkeleton.tsx`:
   - Avatar skeleton + 4 بطاقات skeleton

6. أضف CSS للـ shimmer animation في `app/globals.css`:
   ```css
   @keyframes shimmer {
     0% { background-position: -200% 0; }
     100% { background-position: 200% 0; }
   }
   .skeleton {
     background: linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%);
     background-size: 200% 100%;
     animation: shimmer 1.5s ease-in-out infinite;
     border-radius: 12px;
   }
   ```

7. حدث كل شاشة لاستخدام الـ Skeleton مع `isLoading` state بشكل temporary:
   - `app/(Screens)/Restaurants/page.tsx` → `RestaurantsSkeleton`
   - `app/(Screens)/StoreDetails/[storeId]/page.tsx` → `StoreDetailsSkeleton`
   - `app/(Screens)/ProductDetailsPage/[productId]/page.tsx` → `ProductDetailsSkeleton`
   - `app/(Screens)/orders/page.tsx` → `OrdersSkeleton`
   - `app/(Screens)/ProfilePage/page.tsx` → `ProfileSkeleton`
   - استخدم `setTimeout` مؤقت لمحاكاة التحميل (أو `useQuery` `isLoading`)
   - `const [isLoading, setIsLoading] = useState(true); useEffect(() => { const t = setTimeout(() => setIsLoading(false), 1500); return () => clearTimeout(t); }, []);`

بعد التعديل، شغّل `npm run build` وتأكد من خلوه من الأخطاء.
```

---

### المهمة 2.3 — إضافة حالات الخطأ والفارغة (Empty & Error States)

```
أضف حالات الخطأ والفارغة لجميع الشاشات التي تعرض بيانات.

المطلوب:
1. أنشئ `components/EmptyState.tsx`:
   ```tsx
   'use client';
   interface EmptyStateProps {
     icon?: string;
     title: string;
     description?: string;
     actionLabel?: string;
     onAction?: () => void;
   }
   // أيقونة كبيرة + عنوان + وصف اختياري + زر اختياري
   // استخدم ألوان المشروع (bg-[#F8FAFC], text-[#5f5e5e], إلخ)
   // اتجاه RTL
   ```

2. أنشئ `components/ErrorState.tsx`:
   ```tsx
   'use client';
   interface ErrorStateProps {
     message?: string;
     onRetry?: () => void;
   }
   // أيقونة error + رسالة + زر "إعادة المحاولة"
   ```

3. حدث الشاشات التالية لتظهر EmptyState عند عدم وجود بيانات:
   - `app/(Screens)/Restaurants/page.tsx` — إذا لم يتم العثور على مطاعم
   - `app/(Screens)/StoreDetails/[storeId]/page.tsx` — إذا لم يتم العثور على المتجر
   - `app/(Screens)/orders/page.tsx` — إذا لم توجد طلبات (لكل تبويب)
   - `app/(Screens)/history/page.tsx` — إذا لم يوجد سجل (هذا موجود جزئياً)
   - `app/(Screens)/Cart/page.tsx` — إذا كانت السلة فارغة

4. أضف منطق الفلترة أيضاً في `Restaurants/page.tsx`:
   - إذا لم تظهر نتائج بعد الفلترة → EmptyState مع "لا توجد نتائج للبحث"

بعد التعديل، شغّل `npm run build` وتأكد من خلوه من الأخطاء.
```

---

### المهمة 2.4 — تحسين الـ SEO و Metadata

```
حسّن SEO التطبيق باستخدام Next.js Metadata API.

المطلوب:
1. حدث `app/layout.tsx`:
   ```tsx
   export const metadata: Metadata = {
     title: { default: 'دري فري - Dreefree', template: '%s | دري فري' },
     description: 'تطبيق توصيل الطلبات في فلسطين - طرد، هدايا، مستندات، مشتريات، مطاعم',
     keywords: ['توصيل', 'فلسطين', 'غزة', 'دري فري', 'Dreefree', 'طلب توصيل'],
     openGraph: {
       title: 'دري فري - Dreefree',
       description: 'تطبيق توصيل الطلبات في فلسطين',
       type: 'website',
       locale: 'ar_AR',
     },
     robots: { index: true, follow: true },
   };
   ```

2. أضف `generateMetadata` في `app/(Screens)/Restaurants/page.tsx`:
   ```tsx
   export const metadata: Metadata = { title: 'المطاعم والمتاجر' };
   ```

3. أضف `generateMetadata` في `app/(Screens)/StoreDetails/[storeId]/page.tsx`:
   - title ديناميكي: اسم المتجر

4. أضف `generateMetadata` في `app/(Screens)/ProductDetailsPage/[productId]/page.tsx`:
   - title ديناميكي: اسم المنتج

5. أضف `generateMetadata` في `app/(Screens)/Cart/page.tsx`:
   ```tsx
   export const metadata: Metadata = { title: 'سلة المشتريات' };
   ```

6. أضف `generateMetadata` في `app/(Screens)/orders/page.tsx`:
   ```tsx
   export const metadata: Metadata = { title: 'طلباتي' };
   ```

7. أضف `generateMetadata` في `app/(Screens)/ProfilePage/page.tsx`:
   ```tsx
   export const metadata: Metadata = { title: 'الملف الشخصي' };
   ```

ملاحظة: إذا كانت الصفحة `'use client'`، لا يمكن استخدام `generateMetadata`. في هذه الحالة، استخدم `<title>` داخل JSX أو استخدم `<Head>` من next/document.
بعد التعديل، شغّل `npm run build` وتأكد من خلوه من الأخطاء.
```

---

## المرحلة الثالثة: ميزات متقدمة (Advanced Features)

---

### المهمة 3.1 — نظام المصادقة (NextAuth.js)

```
أضف نظام مصادقة كامل باستخدام NextAuth.js.

المطلوب:
1. ثبّت:
   ```
   npm install next-auth@beta
   ```

2. أنشئ `app/api/auth/[...nextauth]/route.ts`:
   ```typescript
   import NextAuth from 'next-auth';
   import CredentialsProvider from 'next-auth/providers/credentials';

   const handler = NextAuth({
     providers: [
       CredentialsProvider({
         name: 'Credentials',
         credentials: {
           phone: { label: 'رقم الهاتف', type: 'tel' },
           password: { label: 'كلمة المرور', type: 'password' },
         },
         async authorize(credentials) {
           // اتصل بـ API حقيقي:
           // const res = await apiClient.post('/auth/login', credentials);
           // if (res.data.user) return res.data.user;
           // مؤقتاً للتجربة:
           if (credentials?.phone === '123' && credentials?.password === '123') {
             return { id: '1', name: 'مستخدم تجريبي', phone: '0599999999' };
           }
           return null;
         },
       }),
     ],
     pages: { signIn: '/login' },
     session: { strategy: 'jwt' },
     callbacks: {
       async jwt({ token, user }) { if (user) token.id = user.id; return token; },
       async session({ session, token }) { if (session.user) (session.user as any).id = token.id; return session; },
     },
   });
   export { handler as GET, handler as POST };
   ```

3. أنشئ `app/(Screens)/login/page.tsx`:
   - نموذج تسجيل دخول: رقم الهاتف + كلمة المرور
   - استخدم `signIn('credentials', { phone, password, redirect: true, callbackUrl: '/' })`
   - تصميم متوافق مع المشروع (Cairo font, ألوان المشروع)

4. أنشئ `app/(Screens)/register/page.tsx`:
   - نموذج تسجيل: الاسم، رقم الهاتف، كلمة المرور، تأكيد كلمة المرور
   - اتصل بـ API التسجيل

5. أنشئ `components/AuthGuard.tsx`:
   ```tsx
   'use client';
   import { useSession } from 'next-auth/react';
   import { useRouter } from 'next/navigation';
   import { useEffect } from 'react';

   export default function AuthGuard({ children }: { children: React.ReactNode }) {
     const { data: session, status } = useSession();
     const router = useRouter();

     useEffect(() => {
       if (status === 'unauthenticated') router.push('/login');
     }, [status, router]);

     if (status === 'loading') return <div className="skeleton min-h-screen" />;
     return session ? <>{children}</> : null;
   }
   ```

6. أنشئ `components/SessionProvider.tsx`:
   ```tsx
   'use client';
   import { SessionProvider as NextAuthSessionProvider } from 'next-auth/react';
   export default function SessionProvider({ children }: { children: React.ReactNode }) {
     return <NextAuthSessionProvider>{children}</NextAuthSessionProvider>;
   }
   ```

7. حدث `app/layout.tsx`:
   - لف كل شيء داخل `<SessionProvider>`
   - الترتيب: `SessionProvider > QueryProvider > TabBarWrapper > ErrorBoundaryWrapper > ClientWrapper > children`

8. أضف زر تسجيل الخروج في `ProfilePage/page.tsx`:
   - استخدم `signOut({ callbackUrl: '/login' })`

بعد التعديل، شغّل `npm run build` وتأكد من خلوه من الأخطاء.
```

---

### المهمة 3.2 — نظام المفضلة (Wishlist)

```
أضف نظام المفضلة باستخدام Zustand.

المطلوب:
1. أنشئ `lib/store/wishlistStore.ts`:
   ```typescript
   import { create } from 'zustand';
   import { persist } from 'zustand/middleware';

   interface WishlistItem {
     id: number;
     name: string;
     image: string;
     price: number;
     storeName: string;
   }

   interface WishlistStore {
     items: WishlistItem[];
     toggleItem: (item: WishlistItem) => void;
     isFavorite: (id: number) => boolean;
     clearWishlist: () => void;
   }

   export const useWishlistStore = create<WishlistStore>()(
     persist(
       (set, get) => ({
         items: [],
         toggleItem: (item) => set((state) => {
           const exists = state.items.find(i => i.id === item.id);
           if (exists) return { items: state.items.filter(i => i.id !== item.id) };
           return { items: [...state.items, item] };
         }),
         isFavorite: (id) => get().items.some(i => i.id === id),
         clearWishlist: () => set({ items: [] }),
       }),
       { name: 'dreefree-wishlist' }
     )
   );
   ```

2. أضف زر قلب (♥) في بطاقة المنتج:
   - `app/(Screens)/StoreDetails/[storeId]/page.tsx` — في كل منتج
   - `app/(Screens)/Restaurants/page.tsx` — أيقونة في كل متجر (اختياري)
   - استخدم `useWishlistStore` للتبديل
   - القلب الممتلئ: `favorite` (أحمر)، الفارغ: `favorite_border`

3. أضف صفحة المفضلة في `ProfilePage/page.tsx`:
   - قسم يعرض المنتجات المفضلة
   - أو أنشئ صفحة `/wishlist` جديدة

بعد التعديل، شغّل `npm run build` وتأكد من خلوه من الأخطاء.
```

---

### المهمة 3.3 — PWA (Progressive Web App)

```
حول التطبيق إلى PWA قابل للتثبيت على الأجهزة.

المطلوب:
1. ثبّت:
   ```
   npm install next-pwa
   ```

2. حدث `next.config.ts`:
   ```typescript
   import type { NextConfig } from "next";
   import withPWA from 'next-pwa';

   const nextConfig: NextConfig = withPWA({
     dest: 'public',
     register: true,
     skipWaiting: true,
     disable: process.env.NODE_ENV === 'development',
   })({
     images: {
       remotePatterns: [
         { protocol: "https", hostname: "lh3.googleusercontent.com" },
         { protocol: "https", hostname: "**.googleusercontent.com" },
       ],
     },
   });

   export default nextConfig;
   ```

3. أنشئ `public/manifest.json`:
   ```json
   {
     "name": "دري فري - Dreefree",
     "short_name": "دري فري",
     "description": "تطبيق توصيل الطلبات في فلسطين",
     "start_url": "/",
     "display": "standalone",
     "background_color": "#f3fcef",
     "theme_color": "#006d34",
     "orientation": "portrait",
     "lang": "ar",
     "dir": "rtl",
     "icons": [
       { "src": "/icons/icon-192x192.png", "sizes": "192x192", "type": "image/png" },
       { "src": "/icons/icon-512x512.png", "sizes": "512x512", "type": "image/png" },
       { "src": "/icons/icon-192x192.png", "sizes": "192x192", "type": "image/png", "purpose": "maskable" }
     ]
   }
   ```

4. أنشئ مجلد `public/icons/` وأضف أيقونات بسيطة (أو استخدم SVG inline).

5. أضف `<link rel="manifest" href="/manifest.json" />` في `app/layout.tsx` داخل `<head>`.

6. أضف `<meta name="theme-color" content="#006d34" />` في `app/layout.tsx` داخل `<head>`.

بعد التعديل، شغّل `npm run build` وتأكد من خلوه من الأخطاء.
```

---

### المهمة 3.4 — إشعارات Firebase (Push Notifications)

```
أضف إشعارات فورية باستخدام Firebase Cloud Messaging.

المطلوب:
1. ثبّت:
   ```
   npm install firebase
   ```

2. أنشئ `lib/firebase/config.ts`:
   ```typescript
   import { initializeApp, getApps } from 'firebase/app';
   import { getMessaging, getToken, onMessage } from 'firebase/messaging';

   const firebaseConfig = {
     apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
     authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
     projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
     messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
     appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
   };

   const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
   const messaging = typeof window !== 'undefined' ? getMessaging(app) : null;

   export { app, messaging, getToken, onMessage };
   ```

3. أنشئ `lib/firebase/notification.ts`:
   ```typescript
   import { messaging, getToken, onMessage } from './config';

   export async function requestNotificationPermission(): Promise<string | null> {
     if (!messaging || !('Notification' in window)) return null;
     try {
       const permission = await Notification.requestPermission();
       if (permission === 'granted') {
         const token = await getToken(messaging, {
           vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
         });
         return token;
       }
       return null;
     } catch (error) {
       console.error('FCM error:', error);
       return null;
     }
   }

   export function onMessageListener(): Promise<any> {
     return new Promise((resolve) => {
       if (!messaging) return;
       onMessage(messaging, (payload) => resolve(payload));
     });
   }
   ```

4. أضف طلب الإذن في `app/layout.tsx` أو في `ProfilePage`:
   - بعد تسجيل الدخول، اطلب `requestNotificationPermission()`
   - أرسل التوكن إلى API الخلفي لحفظه

5. أنشئ `public/firebase-messaging-sw.js` (Service Worker):
   ```javascript
   importScripts('https://www.gstatic.com/firebasejs/9.x/firebase-app-compat.js');
   importScripts('https://www.gstatic.com/firebasejs/9.x/firebase-messaging-compat.js');
   // Initialize Firebase in SW
   ```

بعد التعديل، شغّل `npm run build` وتأكد من خلوه من الأخطاء.
```

---

### المهمة 3.5 — إضافة إحصائيات في ملف المستخدم

```
أضف إحصائيات المستخدمين في حسابهم (Profile).

المطلوب:
1. حدث `app/(Screens)/ProfilePage/page.tsx`:
   - أضف قسم إحصائيات تحت الاسم:
     - عدد الطلبات الكلية
     - عدد الطلبات المكتملة
     - مجموع المصروفات
   - استخدم بيانات وهمية حالياً: `{ totalOrders: 47, completedOrders: 42, totalSpent: 1250 }`
   - صممها كبطاقات صغيرة ملونة

2. أضف زر "تعديل الملف الشخصي":
   - صفحة `/edit-profile` جديدة
   - نموذج: الاسم، رقم الهاتف، العنوان، الصورة الشخصية

3. أضف إعدادات التطبيق:
   - زر "إعدادات" في صفحة الملف
   - صفحة `/settings` مع:
     - تفعيل/إيقاف الإشعارات
     - تغيير اللغة (عربي/English)
     - الوضع الليلي (Dark Mode)

بعد التعديل، شغّل `npm run build` وتأكد من خلوه من الأخطاء.
```

---

### المهمة 3.6 — Dark Mode

```
أضف الوضع الليلي (Dark Mode) للتطبيق.

المطلوب:
1. ثبّت:
   ```
   npm install next-themes
   ```

2. أنشئ `components/ThemeProvider.tsx`:
   ```tsx
   'use client';
   import { ThemeProvider as NextThemesProvider } from 'next-themes';

   export default function ThemeProvider({ children }: { children: React.ReactNode }) {
     return (
       <NextThemesProvider attribute="class" defaultTheme="light" enableSystem={false}>
         {children}
       </NextThemesProvider>
     );
   }
   ```

3. حدث `app/layout.tsx`:
   - لف كل شيء داخل `<ThemeProvider>`
   - الترتيب: `ThemeProvider > SessionProvider > ...`

4. أضف CSS variables للـ dark mode في `app/globals.css`:
   ```css
   .dark {
     --bg-primary: #151e16;
     --bg-secondary: #1a2e1e;
     --text-primary: #f3fcef;
     --text-secondary: #dce5d9;
     --bg-card: #1e2a20;
     --border-color: #2a3e2e;
   }
   ```
   واستخدم هذه الـ variables في كل مكان بدلاً من الألوان الثابتة.

5. أضف زر تبديل الـ Dark Mode في `ProfilePage/page.tsx` أو في الهيدر:
   ```tsx
   import { useTheme } from 'next-themes';
   const { theme, setTheme } = useTheme();
   <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
     <span className="material-symbols-outlined">
       {theme === 'dark' ? 'light_mode' : 'dark_mode'}
     </span>
   </button>
   ```

6. أضف `darkMode: 'class'` في `tailwind.config.js` (موجود بالفعل).

ملاحظة: هذا تحديث كبير — ركز على تغيير الخلفيات والنصوص والبطاقات فقط. لا تغير ألوان الأزرار الأساسية (main, accent).
بعد التعديل، افتح التطبيق واختبر التبديل بين الوضعين.
```

---

### المهمة 3.7 — تحسين الـ next.config و Tailwind v4

```
حدث إعدادات Next.js و Tailwind للتوافق مع الإصدارات الحديثة.

المطلوب:
1. حدث `next.config.ts`:
   - أضف `remotePatterns` إضافية للصور:
     - `**.googleusercontent.com`
     - `**.cloudinary.com` (إذا استخدمت Cloudinary)
   - أضف `output: 'standalone'` للتحضير للنشر

2. حدث `tailwind.config.js`:
   - أضف ألواناً إضافية:
     - `success: '#2fe378'`
     - `warning: '#f59e0b'`
     - `info: '#3b82f6'`
   - أضف `fontFamily`:
     ```js
     fontFamily: {
       cairo: ['Cairo', 'system-ui', 'sans-serif'],
     }
     ```

3. حدث `app/globals.css`:
   - استخدم `@theme` بدلاً من `@import "tailwindcss"`:
     ```css
     @import "tailwindcss";
     @theme {
       --color-main: #006d34;
       --color-sub: #5f5e5e;
       --color-accent: #00d26a;
       --font-family-cairo: 'Cairo', system-ui, sans-serif;
     }
     ```
   - احتفظ بالـ CSS variables الحالية لأنها مستخدمة في الكود

بعد التعديل، شغّل `npm run build` وتأكد من خلوه من الأخطاء.
```

---

## المرحلة الرابعة: اختبارات وإطلاق (Testing & Launch)

---

### المهمة 4.1 — إعداد الاختبارات (Testing Setup)

```
جهز بيئة الاختبارات للمشروع.

المطلوب:
1. ثبّت:
   ```
   npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom @vitejs/plugin-react
   ```

2. أنشئ `vitest.config.ts`:
   ```typescript
   import { defineConfig } from 'vitest/config';
   import react from '@vitejs/plugin-react';
   import path from 'path';

   export default defineConfig({
     plugins: [react()],
     test: {
       environment: 'jsdom',
       globals: true,
       setupFiles: './lib/__tests__/setup.ts',
     },
     resolve: {
       alias: { '@': path.resolve(__dirname, '.') },
     },
   });
   ```

3. أنشئ `lib/__tests__/setup.ts`:
   ```typescript
   import '@testing-library/jest-dom';
   ```

4. أضف سكريبت الاختبارات في `package.json`:
   ```json
   "scripts": {
     "test": "vitest",
     "test:run": "vitest run"
   }
   ```

5. أنشئ أول اختبار `lib/__tests__/cartStore.test.ts`:
   ```typescript
   import { describe, it, expect, beforeEach } from 'vitest';
   import { useCartStore } from '../store/cartStore';

   describe('Cart Store', () => {
     beforeEach(() => {
       useCartStore.setState({ items: [] });
     });

     it('يضيف منتج إلى السلة', () => {
       useCartStore.getState().addItem({
         id: 1, name: 'منتج تجريبي', price: 50, quantity: 1, image: '/test.jpg'
       });
       expect(useCartStore.getState().items).toHaveLength(1);
     });

     it('يزيد الكمية عند إضافة نفس المنتج', () => {
       useCartStore.getState().addItem({
         id: 1, name: 'منتج تجريبي', price: 50, quantity: 1, image: '/test.jpg'
       });
       useCartStore.getState().addItem({
         id: 1, name: 'منتج تجريبي', price: 50, quantity: 1, image: '/test.jpg'
       });
       expect(useCartStore.getState().items[0].quantity).toBe(2);
     });

     it('يزيل منتج من السلة', () => {
       useCartStore.getState().addItem({
         id: 1, name: 'منتج تجريبي', price: 50, quantity: 1, image: '/test.jpg'
       });
       useCartStore.getState().removeItem(1);
       expect(useCartStore.getState().items).toHaveLength(0);
     });
   });
   ```

6. أنشئ اختبار لـ `lib/__tests__/wishlistStore.test.ts` (نفس النمط).

7. شغّل `npm run test:run` وتأكد من نجاح جميع الاختبارات.

بعد التعديل، شغّل `npm run build` وتأكد من خلوه من الأخطاء.
```

---

### المهمة 4.2 — تكامل الخرائط (Google Maps)

```
أضف خرائط Google Maps حقيقية في شاشات LocationPicker و PickupLocation.

المطلوب:
1. ثبّت:
   ```
   npm install @react-google-maps/api
   ```

2. أنشئ `lib/maps/GoogleMapsProvider.tsx`:
   ```tsx
   'use client';
   import { ReactNode } from 'react';
   import { LoadScript } from '@react-google-maps/api';

   const libraries: ('places')[] = ['places'];

   export default function GoogleMapsProvider({ children }: { children: ReactNode }) {
     return (
       <LoadScript
         googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}
         libraries={libraries}
         language="ar"
         region="PS"
       >
         {children}
       </LoadScript>
     );
   }
   ```

3. حدث `app/(Screens)/(Order)/LocationPicker/page.tsx`:
   - استبدل الخريطة الوهمية بـ GoogleMap حقيقي
   - أضف Marker قابل للسحب (draggable)
   - استخدم `Autocomplete` للبحث عن العناوين
   - اعرض الإحداثيات (lat, lng)

4. حدث `app/(Screens)/(Order)/PickupLocationPage.tsx`:
   - أضف GoogleMap بعرض المواقع المحفوظة
   - أضف Marker لكل موقع

5. أضف `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` في `.env.local`:
   ```
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key_here
   ```

بعد التعديل، شغّل `npm run build` وتأكد من خلوه من الأخطاء.
ملاحظة: ستحتاج إلى مفتاح Google Maps API حقيقي لاختبار هذه المهمة.
```

---

### المهمة 4.3 — تحويل Restaurants إلى بيانات API وهمية

```
جهز Restaurants للعمل مع API عن طريق إنشاء بيانات وهمية منظمة.

المطلوب:
1. أنشئ `lib/data/mockData.ts`:
   - انقل بيانات المطاعم الـ 30 من `app/(Screens)/Restaurants/page.tsx` إلى هذا الملف
   - نظمها كمصفوفة كاملة مع id فريد لكل مطعم
   - أضف لكل مطعم: id, name, image, logo, rating, deliveryFee, waitTime, categories, products
   - اجعلها قابلة للتصدير:

   ```typescript
   export interface Restaurant {
     id: string;
     name: string;
     image: string;
     logo: string;
     rating: number;
     deliveryFee: number;
     waitTime: string;
     categories: string[];
     products: Product[];
   }
   ```
   - أضف 5-10 منتجات لكل مطعم

2. أنشئ `lib/hooks/useRestaurants.ts`:
   ```typescript
   import { useQuery } from '@tanstack/react-query';
   import { restaurantsApi } from '../api/endpoints';
   import { mockRestaurants } from '../data/mockData';

   export function useRestaurants(filters?: Record<string, string>) {
     // استخدم mockData مؤقتاً لحين توفر API حقيقي
     return useQuery({
       queryKey: ['restaurants', filters],
       queryFn: async () => {
         // const { data } = await restaurantsApi.getAll(filters);
         // return data;
         return mockRestaurants;
       },
     });
   }

   export function useRestaurant(id: string) {
     return useQuery({
       queryKey: ['restaurant', id],
       queryFn: async () => {
         // const { data } = await restaurantsApi.getById(id);
         // return data;
         return mockRestaurants.find(r => r.id === id) || null;
       },
     });
   }
   ```

3. حدث `app/(Screens)/Restaurants/page.tsx`:
   - استخدم `useRestaurants()` بدلاً من البيانات الثابتة
   - أضف `isLoading` → اعرض `RestaurantsSkeleton`
   - أضف `isError` → اعرض `ErrorState`
   - أضف فلترة تعمل على الـ data (وليس UI فقط)

4. حدث `app/(Screens)/StoreDetails/[storeId]/page.tsx`:
   - استخدم `useRestaurant(storeId)` لجلب بيانات المتجر
   - اعرض المنتجات من الـ API
   - أضف حالات التحميل والخطأ

بعد التعديل، شغّل `npm run build` وتأكد من خلوه من الأخطاء.
```

---

### المهمة 4.4 — إضافة واجهة المستخدم لاستقبال المدفوعات

```
حسّن واجهة المدفوعات لتكون متكاملة.

المطلوب:
1. حدث `app/(Screens)/PaymentMethods/page.tsx`:

   أ. أضف خيارات دفع إضافية:
      - **الدفع عند الاستلام (COD)** ✅ موجود
      - **Jawwal Pay** ✅ موجود
      - **BOP (Bank of Palestine)** ✅ موجود
      - **PayPal** ✅ موجود
      - أضف **Stripe** كخيار جديد

   ب. أضف ملخص الطلب قبل تأكيد الدفع:
      - اسم المتجر
      - عدد المنتجات
      - المبلغ الإجمالي
      - رسم التوصيل

   ج. أضف Modal تأكيد:
      - بعد الضغط على "تأكيد الدفع": يظهر Modal "هل أنت متأكد من إتمام عملية الدفع؟"
      - مع أزرار "نعم، تأكيد" و "إلغاء"

   د. بعد التأكيد، انتقل إلى `/OrderConfirmed`

2. أضف عداد للوقت المتبقي لإتمام الدفع (10 دقائق):
   - إذا انتهى الوقت، أعد التوجيه إلى السلة

بعد التعديل، شغّل `npm run build` وتأكد من خلوه من الأخطاء.
```

---

### المهمة 4.5 — إنشاء `.env.local` وإعداد البيئة

```
أنشئ ملف البيئة والمتغيرات المطلوبة.

المطلوب:
1. أنشئ `.env.local`:
   ```
   # API
   NEXT_PUBLIC_API_URL=http://localhost:3001/api
   API_URL=http://localhost:3001/api

   # Auth (NextAuth)
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-super-secret-key-change-in-production

   # Firebase (اختياري للإشعارات)
   NEXT_PUBLIC_FIREBASE_API_KEY=
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
   NEXT_PUBLIC_FIREBASE_APP_ID=
   NEXT_PUBLIC_FIREBASE_VAPID_KEY=

   # Google Maps (اختياري للخرائط)
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=
   ```

2. أنشئ `.env.example` (بدون القيم الحقيقية) للمشاركة مع الفريق.

3. أضف `.env.local` إلى `.gitignore` (موجود بالفعل غالباً):
   ```
   .env.local
   .env*.local
   ```

بعد الإنشاء، شغّل `npm run build` وتأكد من خلوه من الأخطاء.
```

---

## ملخص التسلسل الصحيح للتنفيذ

```
الأسبوع 1:  1.1 → 1.2 → 1.3 → 1.4 → 1.5 → 1.6 → 1.7
الأسبوع 2:  2.1 → 2.2 → 2.3 → 2.4 → 3.7 → 4.5
الأسبوع 3:  3.1 → 3.2 → 4.1
الأسبوع 4:  3.3 → 3.4 → 3.5 → 3.6
الأسبوع 5:  4.2 → 4.3 → 4.4
الأسبوع 6:  اختبارات شاملة + نشر
```

> **تنبيه مهم:** كل برومبت مستقل — ابدأ بالمهمة 1.1 وأنهِها بالكامل قبل الانتقال للمهمة 1.2. لا تقفز بين المهام.
