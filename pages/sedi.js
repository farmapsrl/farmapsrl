import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import farmacie from "../farmacie.json";
import Nav from "../components/Nav";

const Map = dynamic(() => import("../components/Map"), { ssr: false });

function isAperta(farmacia) {
  const ora = new Date();
  const giorno = ora.getDay();
  const minuti = ora.getHours() * 60 + ora.getMinutes();
  const oa = farmacia.orarioApertura;
  if (!oa) return false;

  let schedule = null;
  if (giorno === 0) schedule = oa.dom || oa.lun_dom || null;
  else if (giorno === 6) schedule = oa.sab || oa.lun_sab || oa.lun_dom || null;
  else schedule = oa.lun_ven || oa.lun_sab || oa.lun_dom || null;

  if (!schedule) return false;

  const toMin = (t) => {
    const parti = t.split(":");
    return parseInt(parti[0]) * 60 + parseInt(parti[1]);
  };

  if (schedule.length === 2) {
    return minuti >= toMin(schedule[0]) && minuti < toMin(schedule[1]);
  }
  if (schedule.length === 4) {
    return (minuti >= toMin(schedule[0]) && minuti < toMin(schedule[1])) ||
           (minuti >= toMin(schedule[2]) && minuti < toMin(schedule[3]));
  }
  return false;
}

export default function Home() {
  const [cerca, setCerca] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  const filtra = (tipo) =>
    farmacie.filter(
      (f) =>
        f.tipo === tipo &&
        (f.nome.toLowerCase().includes(cerca.toLowerCase()) ||
          f.citta.toLowerCase().includes(cerca.toLowerCase()) ||
          f.indirizzo.toLowerCase().includes(cerca.toLowerCase()) ||
          (f.provincia && f.provincia.toLowerCase().includes(cerca.toLowerCase())))
    );

  const farmacieLista = filtra("farmacia");
  const parafarmacieLista = filtra("parafarmacia");

  return (
    <div style={{ fontFamily: "'Lexend', sans-serif", width: "100%", minHeight: "100vh", background: "#f7f7f5" }}>

      <Nav />

      <div style={{ background: "#fff", borderBottom: "1px solid #eee", padding: "3rem 2rem" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div style={{ fontSize: 11, color: "#3B6D11", textTransform: "uppercase", letterSpacing: 2, marginBottom: 12 }}>Gruppo FarmaP</div>
          <h1 style={{ fontFamily: "'Lexend', sans-serif", fontSize: 48, fontWeight: 400, lineHeight: 1.15, marginBottom: 16 }}>La farmacia<br />vicino a te</h1>
          <p style={{ fontSize: 16, color: "#666", lineHeight: 1.7, marginBottom: 32, maxWidth: 500 }}>Trova la sede del gruppo FarmaP più comoda per te. Professionisti al tuo servizio ogni giorno.</p>
          <input
            type="text"
            placeholder="Cerca per città o nome farmacia..."
            value={cerca}
            onChange={(e) => setCerca(e.target.value)}
            style={{ width: "100%", maxWidth: 500, padding: "12px 20px", border: "1px solid #ddd", borderRadius: 8, fontSize: 15, outline: "none", boxSizing: "border-box" }}
          />
        </div>
      </div>

      <div style={{ padding: "2.5rem 2rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>

          <div style={{ fontSize: 11, color: "#7A9E6A", textTransform: "uppercase", letterSpacing: 1, marginBottom: 20 }}>Le nostre farmacie</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16, marginBottom: 48 }}>
            {farmacieLista.map((f) => (
              <div
                key={f.slug}
                onClick={() => { window.location.href = "/" + f.slug; }}
                style={{ border: "1px solid #eee", borderRadius: 14, padding: "1.5rem", cursor: "pointer", background: "#fff", boxShadow: "0 1px 6px rgba(0,0,0,0.05)" }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#3B6D11"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.06)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#eee"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                  <div>
                    <div style={{ fontFamily: "'Lexend', sans-serif", fontSize: 18, marginBottom: 3 }}>{f.nome}</div>
                    <div style={{ fontSize: 13, color: "#aaa" }}>{f.citta}</div>
                  </div>
                  <span style={{ fontSize: 11, padding: "3px 10px", borderRadius: 20, background: isAperta(f) ? "#EAF3DE" : "#f5f5f5", color: isAperta(f) ? "#3B6D11" : "#888", border: "1px solid " + (isAperta(f) ? "#C0DD97" : "#ddd"), whiteSpace: "nowrap" }}>
                    {isAperta(f) ? "Aperta" : "Chiusa"}
                  </span>
                </div>
                <div style={{ fontSize: 13, color: "#555", marginBottom: 8, display: "flex", alignItems: "flex-start", gap: 8 }}>
                  <span>📍</span><span>{f.indirizzo}</span>
                </div>
                <div style={{ fontSize: 13, color: "#555", marginBottom: 8, display: "flex", alignItems: "center", gap: 8 }}>
                  <span>📞</span><span>{f.telefono}</span>
                </div>
                <div style={{ fontSize: 13, color: "#555", marginBottom: f.distributoreH24 ? 12 : 20, display: "flex", alignItems: "center", gap: 8 }}>
                  <span>🕐</span>
                  <span>{f.orari && f.orari[0] ? f.orari[0][1] : ""}</span>
                </div>
                {f.distributoreH24 && (
                  <div style={{ fontSize: 11, color: "#3B6D11", background: "#EAF3DE", border: "1px solid #C0DD97", borderRadius: 20, padding: "3px 10px", display: "inline-block", marginBottom: 16 }}>
                    🕐 Distributore H24
                  </div>
                )}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #f0f0f0", paddingTop: 14 }}>
                  <span style={{ fontSize: 13, color: "#3B6D11", fontWeight: 500 }}>Scopri i nostri servizi</span>
                  <span style={{ fontSize: 16, color: "#3B6D11" }}>→</span>
                </div>
              </div>
            ))}
          </div>

          {parafarmacieLista.length > 0 && (
            <>
              <div style={{ fontSize: 11, color: "#7A9E6A", textTransform: "uppercase", letterSpacing: 1, marginBottom: 20 }}>La nostra parafarmacia</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
                {parafarmacieLista.map((f) => (
                  <div
                    key={f.slug}
                    onClick={() => { window.location.href = "/" + f.slug; }}
                    style={{ border: "1px solid #eee", borderRadius: 14, padding: "1.5rem", cursor: "pointer", background: "#fff", boxShadow: "0 1px 6px rgba(0,0,0,0.05)" }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#3B6D11"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.06)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#eee"; e.currentTarget.style.boxShadow = "none"; }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                      <div>
                        <div style={{ fontFamily: "'Lexend', sans-serif", fontSize: 18, marginBottom: 3 }}>{f.nome}</div>
                        <div style={{ fontSize: 13, color: "#aaa" }}>{f.citta}</div>
                      </div>
                      <span style={{ fontSize: 11, padding: "3px 10px", borderRadius: 20, background: isAperta(f) ? "#EAF3DE" : "#f5f5f5", color: isAperta(f) ? "#3B6D11" : "#888", border: "1px solid " + (isAperta(f) ? "#C0DD97" : "#ddd"), whiteSpace: "nowrap" }}>
                        {isAperta(f) ? "Aperta" : "Chiusa"}
                      </span>
                    </div>
                    <div style={{ fontSize: 13, color: "#555", marginBottom: 8, display: "flex", alignItems: "flex-start", gap: 8 }}>
                      <span>📍</span><span>{f.indirizzo}</span>
                    </div>
                    <div style={{ fontSize: 13, color: "#555", marginBottom: 8, display: "flex", alignItems: "center", gap: 8 }}>
                      <span>📞</span><span>{f.telefono}</span>
                    </div>
                    <div style={{ fontSize: 13, color: "#555", marginBottom: 20, display: "flex", alignItems: "center", gap: 8 }}>
                      <span>🕐</span>
                      <span>{f.orari && f.orari[0] ? f.orari[0][1] : ""}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #f0f0f0", paddingTop: 14 }}>
                      <span style={{ fontSize: 13, color: "#3B6D11", fontWeight: 500 }}>Scopri i nostri servizi</span>
                      <span style={{ fontSize: 16, color: "#3B6D11" }}>→</span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

        </div>
      </div>

      <div style={{ padding: "0 2rem 2.5rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ fontSize: 11, color: "#7A9E6A", textTransform: "uppercase", letterSpacing: 1, marginBottom: 20 }}>Dove siamo</div>
          <Map farmacie={farmacie} />
        </div>
      </div>

      <footer style={{ padding: "2rem", borderTop: "1px solid #eee", background: "#fff", textAlign: "center", fontSize: 12, color: "#aaa", marginTop: "2rem", display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
        <span style={{ maxWidth: 600, textAlign: "center", color: "#bbb", lineHeight: 1.6 }}>Le informazioni contenute in questo sito hanno scopo puramente informativo e non sostituiscono la consulenza medica o farmaceutica professionale. Per diagnosi e terapie rivolgiti sempre a un professionista sanitario.</span>
        <span>© {new Date().getFullYear()} Gruppo FarmaP · Tutti i diritti riservati · <a href="/note-legali" style={{ color: "#aaa", textDecoration: "underline" }}>Note legali</a> · <a href="https://www.iubenda.com/privacy-policy/71842433" target="_blank" rel="noreferrer" style={{ color: "#aaa", textDecoration: "underline" }}>Privacy Policy</a> · <a href="https://www.iubenda.com/privacy-policy/71842433/cookie-policy" target="_blank" rel="noreferrer" style={{ color: "#aaa", textDecoration: "underline" }}>Cookie Policy</a></span>
        <a href="https://www.linkedin.com/company/farmap-srl/" target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "#0A66C2", textDecoration: "none", fontSize: 12, fontWeight: 500 }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
          FarmaP su LinkedIn
        </a>
      </footer>

    </div>
  );
}