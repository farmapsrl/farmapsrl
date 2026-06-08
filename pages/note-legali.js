import Nav from "../components/Nav";

const voci = [
  { label: "Ragione sociale", valore: "FarmaP Srl" },
  { label: "P.IVA", valore: "11936690962" },
  { label: "Sede legale", valore: "Via Cesare Mangili 2, 20124 Milano" },
  { label: "Email", valore: "info@farmaciagiardino.it" },
  { label: "PEC", valore: "farmap@legalmail.it" },
  { label: "REA", valore: "MI-2631718" },
  { label: "Capitale sociale", valore: "€ 10.000,00 i.v." },
];

export default function NoteLegali() {
  return (
    <div style={{ fontFamily: "'Lexend', sans-serif", width: "100%", minHeight: "100vh", background: "#f7f7f5" }}>
      <Nav />

      <div style={{ background: "#fff", borderBottom: "1px solid #eee", padding: "3rem 2rem" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <a href="/" style={{ fontSize: 13, color: "#3B6D11", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 24 }}>
            ← Torna alla home
          </a>
          <div style={{ fontSize: 11, color: "#3B6D11", textTransform: "uppercase", letterSpacing: 2, marginBottom: 12 }}>
            Gruppo FarmaP
          </div>
          <h1 style={{ fontFamily: "'Lexend', sans-serif", fontSize: 40, fontWeight: 400, lineHeight: 1.2, marginBottom: 10 }}>
            Note legali
          </h1>
        </div>
      </div>

      <div style={{ padding: "3rem 2rem" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>

          <div style={{ background: "#fff", border: "1px solid #eee", borderRadius: 14, padding: "2rem", marginBottom: 32 }}>
            <div style={{ fontSize: 11, color: "#aaa", textTransform: "uppercase", letterSpacing: 1, marginBottom: 20 }}>
              Dati societari
            </div>
            {voci.map(({ label, valore }, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  gap: 16,
                  padding: "12px 0",
                  borderBottom: i < voci.length - 1 ? "1px solid #f5f5f5" : "none",
                }}
              >
                <span style={{ fontSize: 14, color: "#888", minWidth: 160 }}>{label}</span>
                <span style={{ fontSize: 14, color: "#222", fontWeight: 500, textAlign: "right" }}>{valore}</span>
              </div>
            ))}
          </div>

          <div style={{ background: "#fff", border: "1px solid #eee", borderRadius: 14, padding: "2rem", marginBottom: 32 }}>
            <div style={{ fontSize: 11, color: "#aaa", textTransform: "uppercase", letterSpacing: 1, marginBottom: 20 }}>
              Titolare del sito
            </div>
            <p style={{ fontSize: 14, color: "#555", lineHeight: 1.9, margin: 0 }}>
              Il presente sito è di proprietà di FarmaP Srl. I contenuti pubblicati hanno scopo puramente informativo e non costituiscono consulenza medica o farmaceutica professionale. Per diagnosi, terapie e consigli personalizzati rivolgiti sempre al tuo medico o al nostro farmacista.
            </p>
          </div>

          <div style={{ background: "#fff", border: "1px solid #eee", borderRadius: 14, padding: "2rem" }}>
            <div style={{ fontSize: 11, color: "#aaa", textTransform: "uppercase", letterSpacing: 1, marginBottom: 20 }}>
              Proprietà intellettuale
            </div>
            <p style={{ fontSize: 14, color: "#555", lineHeight: 1.9, margin: 0 }}>
              Tutti i contenuti presenti su questo sito — testi, immagini, loghi e materiali grafici — sono di proprietà di FarmaP Srl o utilizzati su licenza. È vietata la riproduzione, anche parziale, senza autorizzazione scritta.
            </p>
          </div>

        </div>
      </div>

      <footer style={{ padding: "2rem", borderTop: "1px solid #eee", background: "#fff", textAlign: "center", fontSize: 12, color: "#aaa", marginTop: "2rem", display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
        <span style={{ maxWidth: 600, textAlign: "center", color: "#bbb", lineHeight: 1.6 }}>Le informazioni contenute in questo sito hanno scopo puramente informativo e non sostituiscono la consulenza medica o farmaceutica professionale. Per diagnosi e terapie rivolgiti sempre a un professionista sanitario.</span>
        <span>© {new Date().getFullYear()} Gruppo FarmaP · Tutti i diritti riservati</span>
        <a href="https://www.linkedin.com/company/farmap-srl/" target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 6, marginTop: 10, color: "#0A66C2", textDecoration: "none", fontSize: 12, fontWeight: 500 }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
          FarmaP su LinkedIn
        </a>
      </footer>
    </div>
  );
}
