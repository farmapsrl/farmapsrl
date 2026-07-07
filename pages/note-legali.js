import Head from "next/head";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

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
    <>
      <Head>
        <title>Note legali | Gruppo FarmaP</title>
        <meta name="description" content="Note legali, dati societari e informazioni sulla proprietà intellettuale del Gruppo FarmaP." />
      </Head>
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

      <Footer />
    </div>
    </>
  );
}
