import { SplashScreen } from "@/components/splash/SplashScreen";
import { IntroProvider } from "@/components/splash/IntroProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BookingModalProvider } from "@/components/booking/BookingModalContext";
import { BookingModal } from "@/components/booking/BookingModal";
import { TutorFilterProvider } from "@/components/sections/TutorFilterContext";
import { MobileStickyCta } from "@/components/layout/MobileStickyCta";

export default function MarketingLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
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
  );
}
