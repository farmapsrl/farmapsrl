import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";
import { Lexend } from "next/font/google";

const lexend = Lexend({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-lexend",
});

export default function App({ Component, pageProps }) {
  return (
    <div className={lexend.variable} style={{ fontFamily: "var(--font-lexend), sans-serif" }}>
      <Component {...pageProps} />
      <Analytics />
      <Script
        src="https://embeds.iubenda.com/widgets/5911346e-57ea-4b41-84fc-510ccd28ac64.js"
        strategy="lazyOnload"
      />
    </div>
  );
}
