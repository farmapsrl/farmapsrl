import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";
import { useEffect } from "react";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600;700&display=optional";
    document.head.appendChild(link);
  }, []);

  return (
    <>
      <Component {...pageProps} />
      <Analytics />
      <Script
        src="https://embeds.iubenda.com/widgets/5911346e-57ea-4b41-84fc-510ccd28ac64.js"
        strategy="lazyOnload"
      />
    </>
  );
}