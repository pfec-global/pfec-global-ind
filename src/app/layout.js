import { Montserrat, Yeseva_One } from "next/font/google";
import { MotionConfig } from "motion/react";
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
    <html
      lang="en"
      suppressHydrationWarning
      className={`${montserrat.variable} ${yeseva.variable} scroll-smooth antialiased`}
    >
      <body className="font-sans" suppressHydrationWarning>
        {/* Skips the movement in animations for visitors who turned on "reduce motion" on their device */}
        <MotionConfig reducedMotion="user">{children}</MotionConfig>
      </body>
    </html>
  );
}
