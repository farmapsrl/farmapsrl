import { Html, Head, Main, NextScript } from "next/document";
export default function Document() {
return (
<Html lang="it">
<Head>
<meta name="color-scheme" content="light only" />
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
</Head>
<body className="antialiased">
<Main />
<NextScript />
</body>
</Html>
  );
}