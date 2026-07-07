export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid #eee", background: "#fff", padding: "2.5rem 2rem", marginTop: "2rem" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 24 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <span style={{ fontSize: 12, color: "#3B6D11", fontWeight: 600, letterSpacing: 0.5 }}>Gruppo FarmaP</span>
          <span style={{ fontSize: 11, color: "#767676", lineHeight: 1.7, maxWidth: 480 }}>
            Le informazioni contenute in questo sito hanno scopo puramente informativo e non sostituiscono la consulenza medica o farmaceutica professionale. Per diagnosi e terapie rivolgiti sempre a un professionista sanitario.
          </span>
          <span style={{ fontSize: 11, color: "#767676", marginTop: 4 }}>
            © {new Date().getFullYear()} Gruppo FarmaP · Tutti i diritti riservati
          </span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, alignItems: "flex-end" }}>
          <a href="https://www.linkedin.com/company/farmap-srl/" target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "#0A66C2", textDecoration: "none", fontSize: 12, fontWeight: 500 }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            LinkedIn
          </a>
          <div style={{ display: "flex", gap: 16, fontSize: 11 }}>
            <a href="/note-legali" style={{ color: "#767676", textDecoration: "none" }}>Note legali</a>
            <a href="https://www.iubenda.com/privacy-policy/71842433" target="_blank" rel="noreferrer" style={{ color: "#767676", textDecoration: "none" }}>Privacy Policy</a>
            <a href="https://www.iubenda.com/privacy-policy/71842433/cookie-policy" target="_blank" rel="noreferrer" style={{ color: "#767676", textDecoration: "none" }}>Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
