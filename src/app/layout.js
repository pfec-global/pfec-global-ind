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
    <html
      lang="en"
      className={`${montserrat.variable} ${yeseva.variable} scroll-smooth antialiased`}
    >
      <body className="font-sans">
        {/* Skips the movement in animations for visitors who turned on "reduce motion" on their device */}
        <MotionConfig reducedMotion="user">{children}</MotionConfig>
      </body>
    </html>
  );
}
