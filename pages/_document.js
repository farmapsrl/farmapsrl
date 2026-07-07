import { Html, Head, Main, NextScript } from "next/document";
export default function Document() {
return (
<Html lang="it">
<Head>
<meta name="color-scheme" content="light only" />
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
<style dangerouslySetInnerHTML={{__html: `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #fff; color: #171717; font-family: 'Lexend', sans-serif; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
  @keyframes pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(0.85); } }
  .dot-aperta { width: 7px; height: 7px; border-radius: 50%; background: #3B6D11; display: inline-block; flex-shrink: 0; animation: pulse 2s ease-in-out infinite; }
  .dot-chiusa { width: 7px; height: 7px; border-radius: 50%; background: #bbb; display: inline-block; flex-shrink: 0; }
  input[type="text"]:focus { border-color: #3B6D11 !important; outline: none !important; box-shadow: 0 0 0 3px rgba(59,109,17,0.1) !important; }
  @media (max-width: 768px) {
    h1 { font-size: 32px !important; line-height: 1.2 !important; }
    h2 { font-size: 22px !important; }
    div[style*="padding: 4rem"] { padding: 2rem 1rem !important; }
    div[style*="padding: 3rem"] { padding: 1.5rem 1rem !important; }
    div[style*="padding: 2.5rem"] { padding: 1.5rem 1rem !important; }
    nav { flex-wrap: wrap; gap: 8px; padding: 0.75rem 1rem !important; font-size: 13px; }
    div[style*="minmax(280px"] { grid-template-columns: 1fr !important; }
    div[style*="minmax(240px"] { grid-template-columns: 1fr !important; }
    div[style*="minmax(220px"] { grid-template-columns: 1fr !important; }
    div[style*="minmax(200px"] { grid-template-columns: 1fr !important; }
    div[style*="display: flex"][style*="gap: 48px"] { flex-direction: column !important; gap: 24px !important; }
    div[style*="flexWrap: wrap"] { gap: 8px !important; }
    div[style*="fontSize: 52"] { font-size: 32px !important; }
    .leaflet-container { height: 300px !important; }
    footer { padding: 1.5rem 1rem !important; font-size: 11px !important; }
    input[type="text"] { max-width: 100% !important; width: 100% !important; }
  }
  @media (max-width: 1024px) and (min-width: 769px) {
    div[style*="minmax(280px"] { grid-template-columns: repeat(2, 1fr) !important; }
    div[style*="minmax(240px"] { grid-template-columns: repeat(2, 1fr) !important; }
  }
`}} />
</Head>
<body className="antialiased">
<Main />
<NextScript />
</body>
</Html>
  );
}