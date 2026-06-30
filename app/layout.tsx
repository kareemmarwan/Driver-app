import type { Metadata } from "next";
import "./globals.css";
import TabBarWrapper from "../Component/TabBarWrapper";
import ClientWrapper from "./(Screens)/ClientWrapper";
import ErrorBoundaryWrapper from "../components/ErrorBoundaryWrapper";
import QueryProvider from "../lib/hooks/useQueryProvider";
import SessionProvider from "../components/SessionProvider";
import ThemeProvider from "../components/ThemeProvider";
import PWARegister from "../components/PWARegister";
import NotificationRequest from "../components/NotificationRequest";
export const metadata: Metadata = {
  title: {
    default: 'دري فري - Dreefree',
    template: '%s | دري فري',
  },
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="ar" className="antialiased" dir="rtl">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@200;300;400;500;600;700;800;900&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:FILL@0..1"
        />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#EF2B2D" />
      </head>
      <body className="min-h-screen flex flex-col bg-background" style={{ fontFamily: "'Cairo', system-ui, -apple-system, sans-serif" }} suppressHydrationWarning={true}>

        <PWARegister />
        <ThemeProvider>
        <SessionProvider>
          <NotificationRequest />
          <QueryProvider>
            <ErrorBoundaryWrapper>
              <TabBarWrapper>
                <ClientWrapper>
                  {children}
                </ClientWrapper>
              </TabBarWrapper>
            </ErrorBoundaryWrapper>
          </QueryProvider>
        </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
