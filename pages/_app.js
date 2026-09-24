import { Analytics } from "@vercel/analytics/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Lexend } from "next/font/google";
import { SITE_URL } from "../lib/site";

const lexend = Lexend({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-lexend",
});

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const path = router.asPath.split(/[?#]/)[0];
  const hasCanonical = router.pathname !== "/404" && router.pathname !== "/_error";

  return (
    <div className={lexend.variable} style={{ fontFamily: "var(--font-lexend), sans-serif" }}>
      {hasCanonical && (
        <Head>
          <link rel="canonical" href={SITE_URL + (path === "/" ? "/" : path.replace(/\/$/, ""))} />
        </Head>
      )}
      <Component {...pageProps} />
      <Analytics />
    </div>
  );
}
