import Head from "next/head";
import { useState } from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import farmacie from "../farmacie.json";
import descrizioni, { sottoservizi } from "../data/descrizioni";
import { categorie, normalizza } from "../data/categorie";
import icone, { iconeCategoria } from "../data/icone";

export default function Servizi() {
  const [modal, setModal] = useState(null);
  const [sottoAperto, setSottoAperto] = useState(null);

  const chiudiModal = () => { setModal(null); setSottoAperto(null); };

  const farmaciePer = (nomeServizio) =>
    farmacie.filter((f) =>
      f.servizi.some((s) => normalizza(s.nome) === nomeServizio)
    );

  return (
    <>
      <Head>
        <title>Servizi | Gruppo FarmaP</title>
        <meta name="description" content="Scopri tutti i servizi offerti dalle farmacie del Gruppo FarmaP: analisi, esami, vaccinazioni, servizi al cittadino e molto altro." />
      </Head>
      <div style={{ fontFamily: "'Lexend', sans-serif", width: "100%", minHeight: "100vh", background: "#f7f7f5" }}>

      {modal && (
        <div onClick={() => chiudiModal()} style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0,0,0,0.4)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem", boxSizing: "border-box" }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: "#fff", borderRadius: 16, padding: "2rem", maxWidth: 520, width: "100%", position: "relative", maxHeight: "90vh", overflowY: "auto" }}>
            <button onClick={() => chiudiModal()} style={{ position: "absolute", top: 16, right: 16, background: "none", border: "none", cursor: "pointer", color: "#aaa", display: "flex", alignItems: "center", padding: 4 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
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
            La farmacia è il primo punto di contatto con il sistema sanitario. Ci impegniamo a rendere accessibili esami, analisi e prestazioni che spesso richiedono lunghe attese o spostamenti — vicino a casa, senza appuntamento.
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

      <Footer />
    </div>
    </>
  );
}