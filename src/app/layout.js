import { Montserrat, Yeseva_One } from "next/font/google";
import { MotionConfig } from "motion/react";
import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import NavbarWithCms from "@/components/NavbarWithCms";
import Footer from "@/components/Footer";
import FooterWithCms from "@/components/FooterWithCms";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

// Yeseva One only comes in one weight (400)
const yeseva = Yeseva_One({
  variable: "--font-yeseva",
  weight: "400",
  subsets: ["latin"],
});

export const metadata = {
  title: "PFEC Global | Study Abroad & Visa",
  description: "From education to visas, we've got your back.",
};

export default function RootLayout({ children }) {
  return (
    // suppressHydrationWarning: browser extensions add their own attributes to <html> and <body>,
    // which makes React report a hydration mismatch in development. It only applies to these two tags.
    // data-scroll-behavior: tells Next.js the page uses smooth scrolling (scroll-smooth below), so it jumps
    // straight to the top when changing page. Without it the new page stops short, hidden under the navbar.
    <html
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${montserrat.variable} ${yeseva.variable} scroll-smooth antialiased`}
    >
      <body className="font-sans" suppressHydrationWarning>
        {/* Skips the movement in animations for visitors who turned on "reduce motion" on their device */}
        <MotionConfig reducedMotion="user">
          {/* Navbar and Footer are shared by every page */}
          {/* The navbar shows straight away with its built-in countries, and swaps to the ones from Strapi
              as soon as they arrive - so no page has to wait for the CMS just to show its navbar. */}
          <Suspense fallback={<Navbar />}>
            <NavbarWithCms />
          </Suspense>
          <main>{children}</main>
          {/* Same as the navbar: shows straight away with the built-in lists, then swaps to the ones from Strapi */}
          <Suspense fallback={<Footer />}>
            <FooterWithCms />
          </Suspense>
        </MotionConfig>
      </body>
    </html>
  );
}
