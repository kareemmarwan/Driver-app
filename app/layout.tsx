import type { Metadata } from "next";
import "./globals.css";
import TabBarWrapper from "../Component/TabBarWrapper";
import ClientWrapper from "./(Screens)/ClientWrapper";
import ErrorBoundaryWrapper from "../components/ErrorBoundaryWrapper";
import QueryProvider from "../lib/hooks/useQueryProvider";
export const metadata: Metadata = {
  title: "دري فري - Dreefree",
  description: "تطبيق توصيل الطلبات",
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
      </head>
      <body className="min-h-screen flex flex-col bg-[#F8FAFC]" style={{ fontFamily: "'Cairo', system-ui, -apple-system, sans-serif" }} suppressHydrationWarning={true}>

        <QueryProvider>
          <ErrorBoundaryWrapper>
            <TabBarWrapper>
              <ClientWrapper>
                {children}
              </ClientWrapper>
            </TabBarWrapper>
          </ErrorBoundaryWrapper>
        </QueryProvider>
      </body>
    </html>
  );
}
