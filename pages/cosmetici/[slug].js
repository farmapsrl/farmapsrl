import farmacie from "../../farmacie.json";
import Nav from "../../components/Nav";

export async function getStaticPaths() {
  const paths = farmacie
    .filter((f) => f.cosmetici && f.cosmetici.length > 0)
    .map((f) => ({ params: { slug: f.slug } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const farmacia = farmacie.find((f) => f.slug === params.slug);
  return { props: { farmacia } };
}

export default function CosmeticiPage({ farmacia }) {
  return (
    <div style={{ fontFamily: "'Lexend', sans-serif", width: "100%", minHeight: "100vh", background: "#f7f7f5" }}>
      <Nav />

      <div style={{ background: "#fff", borderBottom: "1px solid #eee", padding: "2.5rem 2rem" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <a href={"/" + farmacia.slug} style={{ fontSize: 13, color: "#3B6D11", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 20 }}>
            ← {farmacia.nome}
          </a>
          <div style={{ fontSize: 11, color: "#7A9E6A", textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>
            FarmaP · {farmacia.citta}
          </div>
          <h1 style={{ fontFamily: "'Lexend', sans-serif", fontSize: 36, fontWeight: 400, marginBottom: 6 }}>
            Linee cosmetiche
          </h1>
          <p style={{ fontSize: 14, color: "#888", margin: 0 }}>{farmacia.nome}</p>
        </div>
      </div>

      <div style={{ padding: "2.5rem 2rem" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          {farmacia.servizi && farmacia.servizi.length > 0 && (
            <div style={{ display: "flex", gap: 28, marginBottom: 32, borderBottom: "2px solid #eee", paddingBottom: 12 }}>
              <a href={"/" + farmacia.slug} style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 1, fontWeight: 500, color: "#aaa", textDecoration: "none", paddingBottom: 12, marginBottom: -14 }}>
                Servizi disponibili
              </a>
              <span style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 1, fontWeight: 700, color: "#3B6D11", borderBottom: "2px solid #3B6D11", paddingBottom: 12, marginBottom: -14, cursor: "default" }}>
                Linee cosmetiche
              </span>
            </div>
          )}
          <div style={{ fontSize: 11, color: "#7A9E6A", textTransform: "uppercase", letterSpacing: 1, marginBottom: 24 }}>
            I nostri brand
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 20 }}>
            {farmacia.cosmetici.map((c, i) => (
              <div
                key={i}
                style={{
                  background: "#fff",
                  border: "1px solid #eee",
                  borderRadius: 14,
                  padding: "2rem 1.5rem",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 12,
                  minHeight: 140,
                  boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
                }}
              >
                <img
                  src={c.logo}
                  alt={c.brand}
                  style={{ maxWidth: "100%", maxHeight: 70, objectFit: "contain", transform: `scale(${c.scale || 1})` }}
                  onError={(e) => { e.target.style.display = "none"; }}
                />
                <span style={{ fontSize: 13, color: "#555", fontWeight: 500, textAlign: "center" }}>{c.brand}</span>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 32, background: "#fff", border: "1px solid #eee", borderRadius: 14, padding: "1.5rem 1.75rem", display: "flex", flexDirection: "column", gap: 6 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#222" }}>Molti altri brand disponibili</div>
            <p style={{ fontSize: 14, color: "#666", lineHeight: 1.8, margin: 0 }}>
              Oltre ai marchi in evidenza, questa sede tratta un'ampia selezione di prodotti cosmetici e dermatologici di altri brand. Se non trovi ciò che cerchi, puoi richiederlo direttamente in farmacia: provvederemo all'ordine nel minor tempo possibile.
            </p>
          </div>
        </div>
      </div>

      <footer style={{ padding: "2rem", borderTop: "1px solid #eee", background: "#fff", textAlign: "center", fontSize: 12, color: "#aaa", marginTop: "2rem", display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
        <span style={{ maxWidth: 600, textAlign: "center", color: "#bbb", lineHeight: 1.6 }}>Le informazioni contenute in questo sito hanno scopo puramente informativo e non sostituiscono la consulenza medica o farmaceutica professionale. Per diagnosi e terapie rivolgiti sempre a un professionista sanitario.</span>
        <span>© {new Date().getFullYear()} Gruppo FarmaP · Tutti i diritti riservati · <a href="/note-legali" style={{ color: "#aaa", textDecoration: "underline" }}>Note legali</a> · <a href="https://www.iubenda.com/privacy-policy/71842433" target="_blank" rel="noreferrer" style={{ color: "#aaa", textDecoration: "underline" }}>Privacy Policy</a> · <a href="https://www.iubenda.com/privacy-policy/71842433/cookie-policy" target="_blank" rel="noreferrer" style={{ color: "#aaa", textDecoration: "underline" }}>Cookie Policy</a></span>
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
