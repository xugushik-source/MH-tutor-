import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { I18nProvider } from "@/i18n/provider";
import { getDictionary, defaultLocale } from "@/i18n";
import { siteConfig } from "@/config/site";
import { SplashScreen } from "@/components/splash/SplashScreen";
import { IntroProvider } from "@/components/splash/IntroProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BookingModalProvider } from "@/components/booking/BookingModalContext";
import { BookingModal } from "@/components/booking/BookingModal";
import { TutorFilterProvider } from "@/components/sections/TutorFilterContext";
import { MobileStickyCta } from "@/components/layout/MobileStickyCta";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s — ${siteConfig.shortName}`,
  },
  description: siteConfig.description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const dict = getDictionary(defaultLocale);

  return (
    <html
      lang={defaultLocale}
      className={`${playfair.variable} ${inter.variable}`}
    >
      <body className="min-h-full flex flex-col bg-cream text-espresso antialiased">
        <I18nProvider locale={defaultLocale} dict={dict}>
          <IntroProvider>
            <BookingModalProvider>
              <TutorFilterProvider>
                <SplashScreen />
                <Header />
                <main className="flex-1 pb-20 lg:pb-0">{children}</main>
                <Footer />
                <MobileStickyCta />
                <BookingModal />
              </TutorFilterProvider>
            </BookingModalProvider>
          </IntroProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
