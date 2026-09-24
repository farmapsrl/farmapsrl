import Head from "next/head";
import { useState } from "react";
import farmacie from "../farmacie.json";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import descrizioni, { sottoservizi, descrizioniRegionali } from "../data/descrizioni";
import { categorie, normalizza } from "../data/categorie";
import icone from "../data/icone";
import { IcoPin, IcoPhone, IcoClock, IcoMail, IcoChat, IcoX } from "../components/Icone";
import { isAperta, buildOpeningHours } from "../lib/orari";
import { SITE_URL } from "../lib/site";
import useMounted from "../lib/useMounted";

function trackEvent(eventName, params) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, params);
  }
}

export async function getStaticPaths() {
  const paths = farmacie.map((f) => ({ params: { slug: f.slug } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const farmacia = farmacie.find((f) => f.slug === params.slug);
  return { props: { farmacia } };
}

export default function PaginaFarmacia({ farmacia }) {
  const mounted = useMounted();
  const [modal, setModal] = useState(null);
  const [sottoAperto, setSottoAperto] = useState(null);
  const chiudiModal = () => { setModal(null); setSottoAperto(null); };

  const aperta = mounted ? isAperta(farmacia) : false;
  const haServizi = farmacia.servizi && farmacia.servizi.length > 0;
  const servizioCorrente = modal ? farmacia.servizi.find((s) => s.nome === modal) : null;
  const altre = modal
    ? farmacie.filter((f) => f.slug !== farmacia.slug && f.servizi && f.servizi.some((s) => s.nome === modal))
    : [];
  const waNumero = (farmacia.whatsapp || farmacia.telefono).replace(/\s+/g, "").replace("+", "");
  const nomeServizi = farmacia.servizi && farmacia.servizi.length > 0
    ? farmacia.servizi.slice(0, 3).map(s => s.nome).join(", ")
    : "farmaci e prodotti sanitari";

  const titolo = `${farmacia.nome} - ${farmacia.citta} | Gruppo FarmaP`;
  const descrizione = `${farmacia.nome} a ${farmacia.citta}. Orari, servizi e contatti. ${nomeServizi} e molto altro. Farmacia di prossimità del Gruppo FarmaP.`;

  return (
    <>
      <Head>
        <title>{titolo}</title>
        <meta name="description" content={descrizione} />
        <meta property="og:title" content={titolo} />
        <meta property="og:description" content={descrizione} />
        <meta property="og:type" content="local.business" />
        <meta name="robots" content="index, follow" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Pharmacy",
              "name": farmacia.nome,
              "address": {
                "@type": "PostalAddress",
                "streetAddress": farmacia.indirizzo.split(", ").slice(1, -1).join(", "),
                "addressLocality": farmacia.citta,
                "addressRegion": farmacia.provincia,
                "addressCountry": "IT"
              },
              "telephone": farmacia.telefono,
              "openingHours": buildOpeningHours(farmacia.orarioApertura),
              "url": `${SITE_URL}/${farmacia.slug}`
            })
          }}
        />
      </Head>

      <div style={{ fontFamily: "var(--font-lexend), sans-serif", width: "100%", minHeight: "100vh", background: "#f7f7f5" }}>

        {modal && (
          <div onClick={() => chiudiModal()} style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0,0,0,0.4)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem", boxSizing: "border-box" }}>
            <div onClick={(e) => e.stopPropagation()} style={{ background: "#fff", borderRadius: 16, padding: "2rem", maxWidth: 520, width: "100%", position: "relative", maxHeight: "90vh", overflowY: "auto" }}>
              <button onClick={() => chiudiModal()} style={{ position: "absolute", top: 16, right: 16, background: "none", border: "none", cursor: "pointer", color: "#aaa", display: "flex", alignItems: "center", padding: 4 }}><IcoX /></button>
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
                <div style={{ background: "#EAF3DE", borderRadius: 10, padding: 10, flexShrink: 0 }}>
                  {icone[modal] || icone["Misurazione Pressione Arteriosa"]}
                </div>
                <div>
                  <div style={{ fontSize: 11, color: "#3B6D11", textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>Servizio</div>
                  <h2 style={{ fontFamily: "var(--font-lexend), sans-serif", fontSize: 20, fontWeight: 400, margin: 0 }}>{modal}</h2>
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
                          <span style={{ color: "#3B6D11", fontSize: 16, display: "inline-block", transform: sottoAperto === i ? "rotate(90deg)" : "none" }}>→</span>
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
                    {((descrizioniRegionali[modal] && farmacia.regione && descrizioniRegionali[modal][farmacia.regione]) || descrizioni[modal] || "Contattaci per informazioni dettagliate su questo servizio.").split("\n\n").map((par, i) => (
                      <p key={i} style={{ marginBottom: 10 }}>{par}</p>
                    ))}
                    {servizioCorrente?.dettagli && (
                      <div style={{ marginTop: 16 }}>
                        <div style={{ fontSize: 11, color: "#7A9E6A", textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>Disponibile in questa sede</div>
                        <ul style={{ margin: 0, paddingLeft: 18, display: "flex", flexDirection: "column", gap: 6 }}>
                          {servizioCorrente.dettagli.map((d, i) => (
                            <li key={i} style={{ fontSize: 13, color: "#444" }}>{d}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
              {altre.length > 0 && (
                <div style={{ borderTop: "1px solid #eee", paddingTop: 20, marginBottom: 20 }}>
                  <div style={{ fontSize: 11, color: "#7A9E6A", textTransform: "uppercase", letterSpacing: 1, marginBottom: 12 }}>Disponibile anche in</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {altre.map((f) => (
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
              )}
              <div style={{ borderTop: "1px solid #eee", paddingTop: 14, marginBottom: 16, fontSize: 11, color: "#bbb", lineHeight: 1.6 }}>
                Le informazioni su questo servizio hanno scopo puramente informativo e non sostituiscono il parere del medico o del farmacista.
              </div>
              <div style={{ borderTop: "1px solid #eee", paddingTop: 16, display: "flex", flexDirection: "column", gap: 12 }}>
                <a href={"tel:" + farmacia.telefono} onClick={() => trackEvent("click_chiama", { farmacia: farmacia.nome, posizione: "modal" })} style={{ fontSize: 13, color: "#3B6D11", fontWeight: 500, textDecoration: "none", display: "flex", alignItems: "center", gap: 6 }}>
                  <IcoPhone /> Chiama per informazioni →
                </a>
                <a href={"https://wa.me/" + waNumero} onClick={() => trackEvent("click_whatsapp", { farmacia: farmacia.nome, posizione: "modal" })} target="_blank" rel="noreferrer" style={{ fontSize: 13, color: "#25D366", fontWeight: 500, textDecoration: "none", display: "flex", alignItems: "center", gap: 6 }}>
                  <IcoChat /> Scrivici su WhatsApp →
                </a>
                {farmacia.email && (
                  <a href={"mailto:" + farmacia.email} onClick={() => trackEvent("click_email", { farmacia: farmacia.nome, posizione: "modal" })} style={{ fontSize: 13, color: "#3B6D11", fontWeight: 500, textDecoration: "none", display: "flex", alignItems: "center", gap: 6 }}>
                    <IcoMail /> Scrivici per email →
                  </a>
                )}
              </div>
            </div>
          </div>
        )}

        <Nav />
        <main>
          <div style={{ background: "#fff", borderBottom: "1px solid #eee", padding: "2.5rem 2rem 4rem" }}>
            <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", gap: 48, alignItems: "flex-start", flexWrap: "wrap" }}>
              <div style={{ flex: 1, minWidth: 280 }}>
                <div style={{ fontSize: 11, color: "#7A9E6A", textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>FarmaP · {farmacia.citta}</div>
                <h1 style={{ fontFamily: "var(--font-lexend), sans-serif", fontSize: 52, fontWeight: 400, marginBottom: 12, lineHeight: 1.1 }}>{farmacia.nome}</h1>
                <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap", marginBottom: 20 }}>
                  <a href={"https://www.google.com/maps/search/" + encodeURIComponent(farmacia.indirizzo)} target="_blank" rel="noreferrer" style={{ fontSize: 13, color: "#888", textDecoration: "none", display: "flex", alignItems: "center", gap: 5 }}>
                    <IcoPin /> <span style={{ borderBottom: "1px solid #ddd" }}>{farmacia.indirizzo}</span>
                  </a>
                  {mounted && (
                    <span style={{ fontSize: 12, padding: "4px 12px", borderRadius: 20, background: aperta ? "#EAF3DE" : "#f5f5f5", color: aperta ? "#3B6D11" : "#888", border: "1px solid " + (aperta ? "#C0DD97" : "#ddd"), display: "inline-flex", alignItems: "center", gap: 5 }}>
                      <span className={aperta ? "dot-aperta" : "dot-chiusa"} />
                      {aperta ? "Aperta ora" : "Chiusa"}
                    </span>
                  )}
                  {farmacia.distributoreH24 && (
                    <span style={{ fontSize: 12, padding: "4px 12px", borderRadius: 20, background: "#EAF3DE", color: "#3B6D11", border: "1px solid #C0DD97", display: "inline-flex", alignItems: "center", gap: 5 }}>
                      <IcoClock /> Distributore H24
                    </span>
                  )}
                </div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 28 }}>
                  <a href={"https://www.google.com/maps/search/" + encodeURIComponent(farmacia.indirizzo)} target="_blank" rel="noreferrer" onClick={() => trackEvent("click_indicazioni", { farmacia: farmacia.nome })} style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 22px", borderRadius: 10, fontSize: 14, fontWeight: 600, textDecoration: "none", color: "#fff", background: "#3B6D11", border: "1px solid #3B6D11" }}>
                    <IcoPin size={15} /> Indicazioni
                  </a>
                  <a href={"tel:" + farmacia.telefono} onClick={() => trackEvent("click_chiama", { farmacia: farmacia.nome, posizione: "header" })} style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 20px", border: "1px solid #ddd", borderRadius: 10, fontSize: 14, fontWeight: 500, textDecoration: "none", color: "#444", background: "#fff" }}>
                    <IcoPhone size={15} /> Chiama
                  </a>
                  <a href={"https://wa.me/" + waNumero} onClick={() => trackEvent("click_whatsapp", { farmacia: farmacia.nome, posizione: "header" })} target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 20px", border: "1px solid #ddd", borderRadius: 10, fontSize: 14, fontWeight: 500, textDecoration: "none", color: "#444", background: "#fff" }}>
                    <IcoChat size={15} /> WhatsApp
                  </a>
                  {farmacia.email && (
                    <a href={"mailto:" + farmacia.email} onClick={() => trackEvent("click_email", { farmacia: farmacia.nome, posizione: "header" })} style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 20px", border: "1px solid #ddd", borderRadius: 10, fontSize: 14, fontWeight: 500, textDecoration: "none", color: "#444", background: "#fff" }}>
                      <IcoMail size={15} /> Email
                    </a>
                  )}
                  {farmacia.social && farmacia.social.facebook && (
                    <a href={farmacia.social.facebook} target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 20px", border: "1px solid #ddd", borderRadius: 10, fontSize: 14, fontWeight: 500, textDecoration: "none", color: "#444", background: "#fff" }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                      Facebook
                    </a>
                  )}
                  {farmacia.social && farmacia.social.instagram && (
                    <a href={farmacia.social.instagram} target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 20px", border: "1px solid #ddd", borderRadius: 10, fontSize: 14, fontWeight: 500, textDecoration: "none", color: "#444", background: "#fff" }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
                      </svg>
                      Instagram
                    </a>
                  )}
                </div>
              </div>
              {farmacia.orari && (
                <div style={{ flexShrink: 0 }}>
                  <div style={{ fontSize: 11, color: "#7A9E6A", textTransform: "uppercase", letterSpacing: 1, marginBottom: 12 }}>Orari</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    {farmacia.orari.map(([giorno, ore], i) => (
                      <div key={i} style={{ display: "flex", gap: 16, fontSize: 13 }}>
                        <span style={{ color: "#aaa", minWidth: 80 }}>{giorno}</span>
                        <span style={{ color: ore === "Chiusa" ? "#ccc" : "#333", fontWeight: ore === "Chiusa" ? 400 : 500 }}>{ore}</span>
                      </div>
                    ))}
                  </div>
                  {farmacia.notaOrari && (
                    <div style={{ fontSize: 12, color: "#3B6D11", marginTop: 10 }}>{farmacia.notaOrari}</div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div style={{ padding: "4rem 2rem" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
              {farmacia.cosmetici && farmacia.cosmetici.length > 0 && (
                <div style={{ display: "flex", gap: 28, marginBottom: 32, marginTop: 16, borderBottom: "2px solid #eee", paddingBottom: 12 }}>
                  {haServizi && (
                    <span style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 1, fontWeight: 700, color: "#3B6D11", borderBottom: "2px solid #3B6D11", paddingBottom: 12, marginBottom: -14, cursor: "default" }}>
                      Servizi disponibili
                    </span>
                  )}
                  <a href={"/cosmetici/" + farmacia.slug} style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 1, fontWeight: haServizi ? 500 : 700, color: haServizi ? "#aaa" : "#3B6D11", borderBottom: haServizi ? "none" : "2px solid #3B6D11", textDecoration: "none", paddingBottom: 12, marginBottom: -14, cursor: haServizi ? "pointer" : "default" }}>
                    Linee cosmetiche
                  </a>
                </div>
              )}
              {(() => {
                const dispensario = farmacie.find((f) => f.tipo === "dispensario" && f.farmaciaDiRiferimento === farmacia.slug);
                if (!dispensario) return null;
                return (
                  <div style={{ marginBottom: 48, padding: "1.5rem", background: "#EAF3DE", border: "1px solid #C0DD97", borderRadius: 14 }}>
                    <div style={{ fontSize: 11, color: "#3B6D11", textTransform: "uppercase", letterSpacing: 1, marginBottom: 12 }}>Gestiamo anche</div>
                    <div style={{ fontFamily: "var(--font-lexend), sans-serif", fontSize: 18, fontWeight: 400, marginBottom: 8, color: "#1a1a1a" }}>{dispensario.nome}</div>
                    <div style={{ fontSize: 13, color: "#555", marginBottom: 6, display: "flex", alignItems: "flex-start", gap: 8 }}>
                      <IcoPin /><span>{dispensario.indirizzo}</span>
                    </div>
                    {dispensario.telefono && dispensario.telefono !== "+39 0000 000000" && (
                      <div style={{ fontSize: 13, color: "#555", marginBottom: 6, display: "flex", alignItems: "center", gap: 8 }}>
                        <IcoPhone /><span>{dispensario.telefono}</span>
                      </div>
                    )}
                    {dispensario.orari && dispensario.orari.length > 0 && (
                      <div style={{ fontSize: 13, color: "#555", display: "flex", alignItems: "center", gap: 8 }}>
                        <IcoClock /><span>{dispensario.orari[0][1]}</span>
                      </div>
                    )}
                  </div>
                );
              })()}
              {haServizi ? (
                <div style={{ marginBottom: 48, display: "flex", flexDirection: "column", gap: 36 }}>
                  {categorie.map((cat) => {
                    const serviziFarmacia = farmacia.servizi.filter((s) =>
                      cat.servizi.includes(normalizza(s.nome))
                    );
                    if (serviziFarmacia.length === 0) return null;
                    return (
                      <div key={cat.titolo}>
                        <div style={{ fontSize: 11, color: "#7A9E6A", textTransform: "uppercase", letterSpacing: 1, marginBottom: 14 }}>{cat.titolo}</div>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 14 }}>
                          {serviziFarmacia.map((s, i) => (
                            <div
                              key={i}
                              onClick={() => { setModal(s.nome); trackEvent("click_servizio", { farmacia: farmacia.nome, servizio: s.nome }); }}
                              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#3B6D11"; e.currentTarget.style.background = "#EEF5E8"; e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(59,109,17,0.1)"; }}
                              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#eee"; e.currentTarget.style.background = "#fff"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
                              style={{ background: "#fff", border: "1px solid #eee", borderRadius: 14, padding: "1.25rem", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "flex-start", transition: "border-color 0.15s, background 0.15s, transform 0.15s, box-shadow 0.15s" }}
                            >
                              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                <div style={{ width: 36, height: 36, borderRadius: 10, background: "#EAF3DE", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                  {icone[s.nome] || icone["Misurazione Pressione Arteriosa"]}
                                </div>
                                <div style={{ fontSize: 14, fontWeight: 500, color: "#222", lineHeight: 1.4 }}>{s.nome}</div>
                              </div>
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3B6D11" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: 8, flexShrink: 0 }}><polyline points="9 18 15 12 9 6"/></svg>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div style={{ marginBottom: 48, padding: "2rem", background: "#fff", border: "1px solid #eee", borderRadius: 14, fontSize: 14, color: "#666" }}>
                  Contattaci per informazioni sui servizi disponibili.
                </div>
              )}
            </div>
          </div>

          {farmacia.email && (
            <div style={{ background: "#fff", borderTop: "1px solid #eee", padding: "3rem 2rem" }}>
              <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 24 }}>
                <div>
                  <div style={{ fontSize: 11, color: "#7A9E6A", textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>Lavora con noi</div>
                  <div style={{ fontFamily: "var(--font-lexend), sans-serif", fontSize: 22, fontWeight: 400, color: "#1a1a1a", marginBottom: 8 }}>Siamo sempre alla ricerca di nuove figure!</div>
                  <p style={{ fontSize: 14, color: "#666", lineHeight: 1.7, margin: 0, maxWidth: 480 }}>
                    Inviaci la tua candidatura e conosciamoci.
                  </p>
                </div>
                <a
                  href={"mailto:" + farmacia.email + "?subject=Candidatura%20-%20" + encodeURIComponent(farmacia.nome) + "&body=Gentile%20team%2C%0D%0A%0D%0AVi%20invio%20la%20mia%20candidatura%20spontanea.%0D%0A%0D%0AIn%20allegato%20trovate%20il%20mio%20CV.%0D%0A%0D%0ACordiali%20saluti"}
                  onClick={() => trackEvent("click_candidatura", { farmacia: farmacia.nome })}
                  style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "14px 28px", background: "#3B6D11", color: "#fff", borderRadius: 10, fontSize: 14, fontWeight: 500, textDecoration: "none", whiteSpace: "nowrap" }}
                >
                  <IcoMail size={15} /> Invia il tuo CV
                </a>
              </div>
            </div>
          )}

        </main>
        <Footer />

      </div>
    </>
  );
}