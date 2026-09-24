import Head from "next/head";
import { useState } from "react";
import dynamic from "next/dynamic";
import farmacie from "../farmacie.json";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { IcoPin, IcoPhone, IcoClock } from "../components/Icone";
import { isAperta, getOrarioOggi, orarioStatico } from "../lib/orari";
import useMounted from "../lib/useMounted";

const Map = dynamic(() => import("../components/Map"), { ssr: false });

function badgeProvincia(provincia) {
  if (provincia === "Milano") return { bg: "#E6F1FB", color: "#0C447C" };
  if (provincia === "Piacenza") return { bg: "#FAEEDA", color: "#633806" };
  return { bg: "#EAF3DE", color: "#27500A" };
}

export default function Home() {
  const [cerca, setCerca] = useState("");
  const mounted = useMounted();

  const orarioDi = (f) =>
    mounted ? getOrarioOggi(f) : orarioStatico(f);

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
  const dispensariLista = filtra("dispensario");

  return (
    <>
      <Head>
        <title>Le nostre sedi | Gruppo FarmaP</title>
        <meta name="description" content="Trova la farmacia FarmaP più vicina a te. Orari, servizi e contatti di tutte le nostre sedi in Emilia-Romagna e Lombardia." />
      </Head>
      <div style={{ fontFamily: "var(--font-lexend), sans-serif", width: "100%", minHeight: "100vh", background: "#f7f7f5" }}>

        <Nav />
        <main>
          <div style={{ background: "#fff", borderBottom: "1px solid #eee", padding: "3rem 2rem" }}>
            <div style={{ maxWidth: 800, margin: "0 auto" }}>
              <div style={{ fontSize: 11, color: "#3B6D11", textTransform: "uppercase", letterSpacing: 2, marginBottom: 12 }}>Gruppo FarmaP</div>
              <h1 style={{ fontFamily: "var(--font-lexend), sans-serif", fontSize: 48, fontWeight: 400, lineHeight: 1.15, marginBottom: 16 }}>La farmacia<br />vicino a te</h1>
              <p style={{ fontSize: 16, color: "#666", lineHeight: 1.7, marginBottom: 32, maxWidth: 500 }}>Trova la sede del gruppo FarmaP più comoda per te. Professionisti al tuo servizio ogni giorno.</p>
              <div style={{ position: "relative", maxWidth: 500 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
                  <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
                <input
                  type="text"
                  placeholder="Cerca per città o nome farmacia..."
                  value={cerca}
                  onChange={(e) => setCerca(e.target.value)}
                  style={{ width: "100%", padding: "12px 20px 12px 44px", border: "1px solid #ddd", borderRadius: 8, fontSize: 15, outline: "none", boxSizing: "border-box" }}
                />
              </div>
            </div>
          </div>

          <div style={{ padding: "2.5rem 2rem" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>

              <div style={{ fontSize: 11, color: "#7A9E6A", textTransform: "uppercase", letterSpacing: 1, marginBottom: 20 }}>Le nostre farmacie</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 16, marginBottom: 48 }}>
                {farmacieLista.map((f) => {
                  const badge = badgeProvincia(f.provincia);
                  const orarioOggi = orarioDi(f);
                  return (
                    <a
                      key={f.slug}
                      href={"/" + f.slug}
                      style={{ display: "block", textDecoration: "none", color: "inherit", border: "1px solid #eee", borderTop: "3px solid #3B6D11", borderRadius: 14, padding: "1.5rem", cursor: "pointer", background: "#fff", boxShadow: "0 1px 6px rgba(0,0,0,0.05)", transition: "border-color 0.2s, box-shadow 0.2s, transform 0.2s" }}
                      onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 8px 32px rgba(59,109,17,0.15)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 1px 6px rgba(0,0,0,0.05)"; e.currentTarget.style.transform = "translateY(0)"; }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                        <div>
                          <div style={{ marginBottom: 6 }}>
                            <span style={{ fontSize: 10, background: badge.bg, color: badge.color, padding: "2px 8px", borderRadius: 20, fontWeight: 500 }}>
                              {f.provincia?.toUpperCase()}
                            </span>
                          </div>
                          <div style={{ fontFamily: "var(--font-lexend), sans-serif", fontSize: 18, marginBottom: 3 }}>{f.nome}</div>
                          <div style={{ fontSize: 13, color: "#aaa" }}>{f.citta}</div>
                        </div>
                        {mounted && (
                          <span style={{ fontSize: 11, padding: "3px 10px", borderRadius: 20, background: isAperta(f) ? "#EAF3DE" : "#f5f5f5", color: isAperta(f) ? "#3B6D11" : "#888", border: "1px solid " + (isAperta(f) ? "#C0DD97" : "#ddd"), whiteSpace: "nowrap", display: "inline-flex", alignItems: "center", gap: 5 }}>
                            <span className={isAperta(f) ? "dot-aperta" : "dot-chiusa"} />
                            {isAperta(f) ? "Aperta" : "Chiusa"}
                          </span>
                        )}
                      </div>
                      <div style={{ fontSize: 13, color: "#555", marginBottom: 8, display: "flex", alignItems: "flex-start", gap: 8 }}>
                        <IcoPin style={{ marginTop: 1 }} /><span>{f.indirizzo}</span>
                      </div>
                      <div style={{ fontSize: 13, color: "#555", marginBottom: 8, display: "flex", alignItems: "center", gap: 8 }}>
                        <IcoPhone /><span>{f.telefono}</span>
                      </div>
                      <div style={{ fontSize: 13, color: orarioOggi === "Chiusa oggi" ? "#ccc" : "#555", marginBottom: f.distributoreH24 ? 12 : 20, display: "flex", alignItems: "center", gap: 8 }}>
                        <IcoClock />
                        <span>{orarioOggi}</span>
                      </div>
                      {f.distributoreH24 && (
                        <div style={{ fontSize: 11, color: "#3B6D11", background: "#EAF3DE", border: "1px solid #C0DD97", borderRadius: 20, padding: "3px 10px", display: "inline-flex", alignItems: "center", gap: 5, marginBottom: 16 }}>
                          <IcoClock /> Distributore H24
                        </div>
                      )}
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #f0f0f0", paddingTop: 14 }}>
                        <span style={{ fontSize: 13, color: "#3B6D11", fontWeight: 500 }}>Scopri i nostri servizi</span>
                        <span style={{ fontSize: 16, color: "#3B6D11" }}>→</span>
                      </div>
                    </a>
                  );
                })}
              </div>

              {(parafarmacieLista.length > 0 || dispensariLista.length > 0) && (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 16, marginBottom: 48 }}>
                  {parafarmacieLista.map((f) => {
                    const badge = badgeProvincia(f.provincia);
                    const orarioOggi = orarioDi(f);
                    return (
                      <div key={f.slug}>
                        <div style={{ fontSize: 11, color: "#7A9E6A", textTransform: "uppercase", letterSpacing: 1, marginBottom: 12 }}>La nostra parafarmacia</div>
                        <a
                          href={"/" + f.slug}
                          style={{ display: "block", textDecoration: "none", color: "inherit", border: "1px solid #eee", borderTop: "3px solid #3B6D11", borderRadius: 14, padding: "1.5rem", cursor: "pointer", background: "#fff", boxShadow: "0 1px 6px rgba(0,0,0,0.05)", transition: "box-shadow 0.2s, transform 0.2s" }}
                          onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 8px 32px rgba(59,109,17,0.15)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
                          onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 1px 6px rgba(0,0,0,0.05)"; e.currentTarget.style.transform = "translateY(0)"; }}
                        >
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                            <div>
                              <div style={{ marginBottom: 6 }}>
                                <span style={{ fontSize: 10, background: badge.bg, color: badge.color, padding: "2px 8px", borderRadius: 20, fontWeight: 500 }}>
                                  {f.provincia?.toUpperCase()}
                                </span>
                              </div>
                              <div style={{ fontFamily: "var(--font-lexend), sans-serif", fontSize: 18, marginBottom: 3 }}>{f.nome}</div>
                              <div style={{ fontSize: 13, color: "#aaa" }}>{f.citta}</div>
                            </div>
                            {mounted && (
                              <span style={{ fontSize: 11, padding: "3px 10px", borderRadius: 20, background: isAperta(f) ? "#EAF3DE" : "#f5f5f5", color: isAperta(f) ? "#3B6D11" : "#888", border: "1px solid " + (isAperta(f) ? "#C0DD97" : "#ddd"), whiteSpace: "nowrap" }}>
                                {isAperta(f) ? "Aperta" : "Chiusa"}
                              </span>
                            )}
                          </div>
                          <div style={{ fontSize: 13, color: "#555", marginBottom: 8, display: "flex", alignItems: "flex-start", gap: 8 }}>
                            <IcoPin style={{ marginTop: 1 }} /><span>{f.indirizzo}</span>
                          </div>
                          <div style={{ fontSize: 13, color: "#555", marginBottom: 8, display: "flex", alignItems: "center", gap: 8 }}>
                            <IcoPhone /><span>{f.telefono}</span>
                          </div>
                          <div style={{ fontSize: 13, color: orarioOggi === "Chiusa oggi" ? "#ccc" : "#555", marginBottom: 20, display: "flex", alignItems: "center", gap: 8 }}>
                            <IcoClock />
                            <span>{orarioOggi}</span>
                          </div>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #f0f0f0", paddingTop: 14 }}>
                            <span style={{ fontSize: 13, color: "#3B6D11", fontWeight: 500 }}>Scopri i nostri servizi</span>
                            <span style={{ fontSize: 16, color: "#3B6D11" }}>→</span>
                          </div>
                        </a>
                      </div>
                    );
                  })}
                  {dispensariLista.map((f) => {
                    const farmaciaRef = farmacie.find((x) => x.slug === f.farmaciaDiRiferimento);
                    return (
                      <div key={f.slug}>
                        <div style={{ fontSize: 11, color: "#7A9E6A", textTransform: "uppercase", letterSpacing: 1, marginBottom: 12 }}>Il nostro dispensario</div>
                        <div
                          style={{ position: "relative", cursor: "pointer", border: "1px solid #eee", borderRadius: 14, padding: "1.5rem", background: "#fff", boxShadow: "0 1px 6px rgba(0,0,0,0.05)", transition: "box-shadow 0.2s, transform 0.2s" }}
                          onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 8px 32px rgba(59,109,17,0.15)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
                          onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 1px 6px rgba(0,0,0,0.05)"; e.currentTarget.style.transform = "translateY(0)"; }}
                        >
                          <div style={{ marginBottom: 14 }}>
                            {f.provincia && (() => { const badge = badgeProvincia(f.provincia); return <div style={{ marginBottom: 6 }}><span style={{ fontSize: 10, background: badge.bg, color: badge.color, padding: "2px 8px", borderRadius: 20, fontWeight: 500 }}>{f.provincia.toUpperCase()}</span></div>; })()}
                            <div style={{ fontFamily: "var(--font-lexend), sans-serif", fontSize: 18, marginBottom: 3 }}>
                              <a href={"/" + f.slug} style={{ color: "inherit", textDecoration: "none" }}>
                                {f.nome}
                                <span style={{ position: "absolute", top: 0, right: 0, bottom: 0, left: 0 }} />
                              </a>
                            </div>
                            <div style={{ fontSize: 13, color: "#aaa" }}>{f.citta}</div>
                          </div>
                          <div style={{ fontSize: 13, color: "#555", marginBottom: 8, display: "flex", alignItems: "flex-start", gap: 8 }}>
                            <IcoPin style={{ marginTop: 1 }} /><span>{f.indirizzo}</span>
                          </div>
                          <div style={{ fontSize: 13, color: "#555", marginBottom: 16, display: "flex", flexDirection: "column", gap: 4 }}>
                            {f.orari && f.orari.map(([giorno, ore], i) => (
                              <div key={i} style={{ display: "flex", gap: 8, alignItems: "center" }}>
                                <IcoClock />
                                <span style={{ color: "#aaa", minWidth: 140 }}>{giorno}</span>
                                <span>{ore}</span>
                              </div>
                            ))}
                            {f.notaOrari && <div style={{ fontSize: 12, color: "#3B6D11", marginTop: 4 }}>{f.notaOrari}</div>}
                          </div>
                          {farmaciaRef && (
                            <div style={{ fontSize: 12, color: "#888", borderTop: "1px solid #f0f0f0", paddingTop: 12 }}>
                              Gestito da{" "}
                              <a href={"/" + farmaciaRef.slug} style={{ position: "relative", zIndex: 1, color: "#3B6D11", textDecoration: "none", fontWeight: 500 }}>
                                {farmaciaRef.nome}
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

            </div>
          </div>

          <div style={{ padding: "0 2rem 2.5rem" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
              <div style={{ fontSize: 11, color: "#7A9E6A", textTransform: "uppercase", letterSpacing: 1, marginBottom: 20 }}>Dove siamo</div>
              <Map farmacie={farmacie} />
            </div>
          </div>

        </main>
        <Footer />

      </div>
    </>
  );
}