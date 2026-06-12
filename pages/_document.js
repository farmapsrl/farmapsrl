import { Html, Head, Main, NextScript } from "next/document";
export default function Document() {
return (
<Html lang="en">
<Head>
<meta name="color-scheme" content="light only" />
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
<link href="https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
<script type="text/javascript" src="https://embeds.iubenda.com/widgets/5911346e-57ea-4b41-84fc-510ccd28ac64.js"></script>
</Head>
<body className="antialiased">
<Main />
<NextScript />
</body>
</Html>
  );
}