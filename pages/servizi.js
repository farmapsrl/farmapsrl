import { useState } from "react";
import Nav from "../components/Nav";
import farmacie from "../farmacie.json";
import descrizioni, { sottoservizi } from "../data/descrizioni";
import { categorie, normalizza } from "../data/categorie";

const S = ({ children }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
    stroke="#3B6D11" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    {children}
  </svg>
);

const iconeCategoria = {
  "Cuore": <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3B6D11" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"/></svg>,
  "Analisi e test": <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3B6D11" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2c-5.33 7.33-8 11.67-8 14a8 8 0 0 0 16 0c0-2.33-2.67-6.67-8-14z"/></svg>,
  "Prevenzione": <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3B6D11" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  "Servizi al cittadino": <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3B6D11" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  "Gestione terapia": <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3B6D11" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="9" width="20" height="6" rx="3"/><line x1="12" y1="9" x2="12" y2="15"/></svg>,
  "Specialisti in sede": <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3B6D11" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  "Altri servizi": <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3B6D11" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></svg>,
};

const icone = {
  "Misurazione Pressione Arteriosa": <S><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"/><polyline points="9 12 11 14 15 10"/></S>,
  "Misurazione Peso Corporeo": <S><rect x="3" y="6" width="18" height="14" rx="2"/><path d="M8 6V4a4 4 0 0 1 8 0v2"/><line x1="12" y1="11" x2="12" y2="15"/><line x1="10" y1="13" x2="14" y2="13"/></S>,
  "Misurazione Saturazione Ossigeno": <S><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/><path d="M8 12h8"/><path d="M12 8v8"/></S>,
  "Holter Cardiaco": <S><polyline points="2 12 5 12 7 6 9 18 11 10 13 14 15 12 22 12"/></S>,
  "Holter Pressorio": <S><circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 16 14"/></S>,
  "ECG": <S><polyline points="2 12 5 12 7 6 9 18 11 10 13 14 15 12 22 12"/></S>,
  "Glicemia": <S><path d="M12 2c-5.33 7.33-8 11.67-8 14a8 8 0 0 0 16 0c0-2.33-2.67-6.67-8-14z"/></S>,
  "Profilo Lipidico Completo": <S><path d="M9 3h6"/><path d="M8 3v12a4 4 0 0 0 8 0V3"/><line x1="8" y1="9" x2="16" y2="9"/></S>,
  "Emoglobina Glicata": <S><path d="M5.64 17A9 9 0 0 1 12 3a9 9 0 0 1 6.36 14"/><line x1="12" y1="12" x2="14.5" y2="7"/><circle cx="12" cy="12" r="2"/></S>,
  "Tampone Streptococco e Covid": <S><line x1="12" y1="2" x2="12" y2="14"/><line x1="9" y1="2" x2="15" y2="2"/><circle cx="12" cy="18" r="3"/></S>,
  "Breath Test Helicobacter Pylori": <S><path d="M4 12c0-3 2-5 5-4s3 5 6 5 5-2 5-5"/><path d="M4 12c0 3 2 5 5 4s3-5 6-5 5 2 5 5"/></S>,
  "Vaccinazione Anti-Pneumococcica": <S><path d="M19 3l2 2-9.5 9.5-4-4z"/><path d="M5 15L3 21l6-2z"/><line x1="10.5" y1="13.5" x2="13.5" y2="10.5"/></S>,
  "Vaccinazione Antinfluenzale": <S><path d="M19 3l2 2-9.5 9.5-4-4z"/><path d="M5 15L3 21l6-2z"/><line x1="10.5" y1="13.5" x2="13.5" y2="10.5"/></S>,
  "Dosaggio Vitamina D": <S><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></S>,
  "Laboratorio Preparazione Galenica": <S><path d="M9 3h6v8l3 9H6l3-9V3z"/><line x1="9" y1="3" x2="15" y2="3"/><path d="M6 20h12"/></S>,
  "Recaller Test": <S><circle cx="10" cy="10" r="7"/><line x1="21" y1="21" x2="15.65" y2="15.65"/><path d="M8 10a2 2 0 0 1 4 0"/></S>,
  "FoodPlan": <S><circle cx="10" cy="10" r="7"/><line x1="21" y1="21" x2="15.65" y2="15.65"/></S>,
  "Foratura Lobi": <S><path d="M6 12a6 6 0 0 1 12 0c0 4-3 7-4 8a2 2 0 0 1-4 0"/><circle cx="15" cy="14" r="1" fill="#3B6D11" stroke="none"/></S>,
  "Foratura Lobi e Naso": <S><path d="M6 12a6 6 0 0 1 12 0c0 4-3 7-4 8a2 2 0 0 1-4 0"/><circle cx="15" cy="14" r="1" fill="#3B6D11" stroke="none"/></S>,
  "Noleggio Ausili e Dispositivi Medici": <S><circle cx="12" cy="5" r="2"/><path d="M9 9l-3 11"/><path d="M9 9h5l2 6"/><circle cx="7" cy="20" r="2"/><circle cx="16" cy="20" r="2"/><line x1="14" y1="15" x2="19" y2="15"/></S>,
  "Noleggio Magnetoterapia": <S><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4"/></S>,
  "Servizi CUP": <S><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><polyline points="9 15 11 17 15 13"/></S>,
  "Consegna a Domicilio": <S><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></S>,
  "Deblistering Farmaci": <S><rect x="2" y="9" width="20" height="6" rx="3"/><line x1="12" y1="9" x2="12" y2="15"/><circle cx="7" cy="12" r="1" fill="#3B6D11" stroke="none"/></S>,
  "Attivazione e Assistenza SPID": <S><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></S>,
  "Pagamento Ticket": <S><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/><line x1="6" y1="15" x2="10" y2="15"/></S>,
  "Ritiro Referti esami di laboratorio": <S><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><polyline points="8 13 12 17 16 13"/><line x1="12" y1="11" x2="12" y2="17"/></S>,
  "Screening Colon-Retto": <S><circle cx="12" cy="17" r="4"/><line x1="12" y1="13" x2="12" y2="5"/><line x1="9" y1="5" x2="15" y2="5"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="3" y1="22" x2="21" y2="22"/></S>,
  "Consulenza Nutrizionista": <S><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></S>,
  "Consulenza Fisioterapista": <S><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></S>,
  "PSA": <S><path d="M12 2c-5.33 7.33-8 11.67-8 14a8 8 0 0 0 16 0c0-2.33-2.67-6.67-8-14z"/></S>,
  "TSH": <S><path d="M12 2c-5.33 7.33-8 11.67-8 14a8 8 0 0 0 16 0c0-2.33-2.67-6.67-8-14z"/></S>,
  "Proteina C Reattiva (PCR)": <S><path d="M12 2c-5.33 7.33-8 11.67-8 14a8 8 0 0 0 16 0c0-2.33-2.67-6.67-8-14z"/></S>,
  "Ferritina": <S><path d="M12 2c-5.33 7.33-8 11.67-8 14a8 8 0 0 0 16 0c0-2.33-2.67-6.67-8-14z"/></S>,
  "INR": <S><path d="M12 2c-5.33 7.33-8 11.67-8 14a8 8 0 0 0 16 0c0-2.33-2.67-6.67-8-14z"/></S>,
  "Test di Gravidanza": <S><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></S>,
  "Esame delle Urine": <S><path d="M9 3h6v8l3 9H6l3-9V3z"/><line x1="9" y1="3" x2="15" y2="3"/></S>,
};

export default function Servizi() {
  const [modal, setModal] = useState(null);
  const [sottoAperto, setSottoAperto] = useState(null);

  const chiudiModal = () => { setModal(null); setSottoAperto(null); };

  const farmaciePer = (nomeServizio) =>
    farmacie.filter((f) =>
      f.servizi.some((s) => normalizza(s.nome) === nomeServizio)
    );

  return (
    <div style={{ fontFamily: "'Lexend', sans-serif", width: "100%", minHeight: "100vh", background: "#f7f7f5" }}>

      {modal && (
        <div onClick={() => chiudiModal()} style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0,0,0,0.4)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem", boxSizing: "border-box" }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: "#fff", borderRadius: 16, padding: "2rem", maxWidth: 520, width: "100%", position: "relative", maxHeight: "90vh", overflowY: "auto" }}>
            <button onClick={() => chiudiModal()} style={{ position: "absolute", top: 16, right: 16, background: "none", border: "none", fontSize: 20, cursor: "pointer", color: "#aaa" }}>✕</button>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
              <div style={{ background: "#EAF3DE", borderRadius: 10, padding: 10, flexShrink: 0 }}>
                {icone[modal] || icone["Misurazione Pressione Arteriosa"]}
              </div>
              <div>
                <div style={{ fontSize: 11, color: "#3B6D11", textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>Servizio</div>
                <h2 style={{ fontFamily: "'Lexend', sans-serif", fontSize: 20, fontWeight: 400, margin: 0 }}>{modal}</h2>
              </div>
            </div>
            <div style={{ marginBottom: 24 }}>
              {sottoservizi[modal] ? (
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {descrizioni[modal] && (
                    <div style={{ fontSize: 14, color: "#555", lineHeight: 1.8, marginBottom: 12 }}>
                      {descrizioni[modal].split("\n\n").map((par, i) => (
                        <p key={i} style={{ marginBottom: 8 }}>{par}</p>
                      ))}
                    </div>
                  )}
                  {sottoservizi[modal].map((s, i) => (
                    <div key={i}>
                      <button
                        onClick={() => setSottoAperto(sottoAperto === i ? null : i)}
                        style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", border: "1px solid", borderColor: sottoAperto === i ? "#3B6D11" : "#eee", borderRadius: 10, background: sottoAperto === i ? "#EAF3DE" : "#fff", cursor: "pointer", textAlign: "left", fontSize: 14, fontWeight: 500, color: "#333" }}
                      >
                        {s.nome}
                        <span style={{ color: "#3B6D11", fontSize: 16, transition: "transform 0.2s", display: "inline-block", transform: sottoAperto === i ? "rotate(90deg)" : "none" }}>→</span>
                      </button>
                      {sottoAperto === i && (
                        <div style={{ padding: "12px 16px", fontSize: 13, color: "#555", lineHeight: 1.8, borderLeft: "2px solid #C0DD97", marginLeft: 8, marginTop: 4 }}>
                          {s.descrizione || "Descrizione non ancora disponibile."}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ fontSize: 14, color: "#555", lineHeight: 1.8 }}>
                  {(descrizioni[modal] || "Contattaci per informazioni dettagliate su questo servizio.").split("\n\n").map((par, i) => (
                    <p key={i} style={{ marginBottom: 10 }}>{par}</p>
                  ))}
                </div>
              )}
            </div>
            <div style={{ borderTop: "1px solid #eee", paddingTop: 14, marginBottom: 16, fontSize: 11, color: "#bbb", lineHeight: 1.6 }}>
              Le informazioni su questo servizio hanno scopo puramente informativo e non sostituiscono il parere del medico o del farmacista.
            </div>
            <div style={{ borderTop: "1px solid #eee", paddingTop: 16 }}>
              <div style={{ fontSize: 11, color: "#7A9E6A", textTransform: "uppercase", letterSpacing: 1, marginBottom: 12 }}>Disponibile in</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {farmaciePer(modal).map((f) => (
                  <a key={f.slug} href={"/" + f.slug} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 14px", border: "1px solid #eee", borderRadius: 10, textDecoration: "none", color: "#333", fontSize: 13 }}>
                    <div>
                      <div style={{ fontWeight: 500 }}>{f.nome}</div>
                      <div style={{ fontSize: 11, color: "#aaa", marginTop: 2 }}>{f.citta}</div>
                    </div>
                    <span style={{ color: "#3B6D11" }}>→</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <Nav />

      <div style={{ background: "#fff", borderBottom: "1px solid #eee", padding: "3rem 2rem" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div style={{ fontSize: 11, color: "#3B6D11", textTransform: "uppercase", letterSpacing: 2, marginBottom: 12 }}>Gruppo FarmaP</div>
          <h1 style={{ fontFamily: "'Lexend', sans-serif", fontSize: 48, fontWeight: 400, lineHeight: 1.15, marginBottom: 16 }}>I nostri servizi</h1>
          <p style={{ fontSize: 16, color: "#666", lineHeight: 1.8, maxWidth: 500 }}>
            Oltre alla dispensazione dei farmaci, le nostre sedi offrono una serie di servizi sanitari e pratici. Clicca su un servizio per scoprire dove è disponibile.
          </p>
        </div>
      </div>

      <div style={{ padding: "2.5rem 2rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", flexDirection: "column", gap: 16 }}>
          {categorie.map((cat, catIndex) => {
            const numSediPerServizio = (nome) =>
              farmacie.filter((f) => f.servizi.some((s) => normalizza(s.nome) === nome)).length;
            const sfondo = catIndex % 2 === 0 ? "#fff" : "#F4FAF0";
            const bordo = catIndex % 2 === 0 ? "1px solid #eee" : "1px solid #C0DD97";
            return (
              <div key={cat.titolo} style={{ background: sfondo, borderRadius: 16, padding: "1.5rem", border: bordo }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
                  <div style={{ width: 36, height: 36, background: "#EAF3DE", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {iconeCategoria[cat.titolo] || iconeCategoria["Altri servizi"]}
                  </div>
                  <div style={{ fontSize: 16, fontWeight: 500, color: "#1a1a1a" }}>{cat.titolo}</div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 10 }}>
                  {cat.servizi.map((nome) => {
                    const nSedi = numSediPerServizio(nome);
                    return (
                      <div
                        key={nome}
                        onClick={() => setModal(nome)}
                        style={{ background: "#fff", border: "1px solid #eee", borderRadius: 12, padding: "1rem", cursor: "pointer", display: "flex", alignItems: "center", gap: 12, transition: "border-color 0.2s, box-shadow 0.2s, transform 0.2s" }}
                        onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#3B6D11"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(59,109,17,0.12)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#eee"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "translateY(0)"; }}
                      >
                        <div style={{ background: "#EAF3DE", borderRadius: 10, padding: 8, flexShrink: 0 }}>
                          {icone[nome] || icone["Misurazione Pressione Arteriosa"]}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: 13, fontWeight: 500, color: "#222", lineHeight: 1.3, marginBottom: 6 }}>{nome}</div>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <span style={{ fontSize: 11, background: "#EAF3DE", color: "#27500A", padding: "2px 8px", borderRadius: 20 }}>
                              {nSedi} {nSedi === 1 ? "sede" : "sedi"}
                            </span>
                            <span style={{ fontSize: 12, color: "#3B6D11", fontWeight: 500 }}>→</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
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