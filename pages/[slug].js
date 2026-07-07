import Head from "next/head";
import { useState, useEffect } from "react";
import farmacie from "../farmacie.json";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import descrizioni, { sottoservizi, descrizioniRegionali } from "../data/descrizioni";
import { categorie, normalizza } from "../data/categorie";
import icone from "../data/icone";

const IcoPin = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
  </svg>
);
const IcoPhone = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.77a16 16 0 0 0 6.29 6.29l1.56-1.56a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);
const IcoClock = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
);
const IcoMail = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
  </svg>
);
const IcoChat = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  </svg>
);
const IcoX = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

function buildOpeningHours(oa) {
  if (!oa) return [];
  const dayMap = { lun_ven: "Mo-Fr", lun_sab: "Mo-Sa", lun_dom: "Mo-Su", sab: "Sa", dom: "Su" };
  const result = [];
  for (const [key, times] of Object.entries(oa)) {
    if (!times || !dayMap[key]) continue;
    const days = dayMap[key];
    if (times.length === 2) result.push(`${days} ${times[0]}-${times[1]}`);
    else if (times.length === 4) {
      result.push(`${days} ${times[0]}-${times[1]}`);
      result.push(`${days} ${times[2]}-${times[3]}`);
    }
  }
  return result;
}

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
    const p = t.split(":");
    return parseInt(p[0]) * 60 + parseInt(p[1]);
  };
  if (schedule.length === 2) return minuti >= toMin(schedule[0]) && minuti < toMin(schedule[1]);
  if (schedule.length === 4) {
    return (minuti >= toMin(schedule[0]) && minuti < toMin(schedule[1])) ||
           (minuti >= toMin(schedule[2]) && minuti < toMin(schedule[3]));
  }
  return false;
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
  const [mounted, setMounted] = useState(false);
  const [modal, setModal] = useState(null);
  const [sottoAperto, setSottoAperto] = useState(null);
  const chiudiModal = () => { setModal(null); setSottoAperto(null); };
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  const aperta = isAperta(farmacia);
  const haServizi = farmacia.servizi && farmacia.servizi.length > 0;
  const servizioCorrente = modal ? farmacia.servizi.find((s) => s.nome === modal) : null;
  const altre = modal
    ? farmacie.filter((f) => f.slug !== farmacia.slug && f.servizi && f.servizi.some((s) => s.nome === modal))
    : [];
  const waNumero = farmacia.telefono.replace(/\s+/g, "").replace("+", "");

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
              "url": `https://farmap.it/farmacie/${farmacia.slug}`
            })
          }}
        />
      </Head>

      <div style={{ fontFamily: "'Lexend', sans-serif", width: "100%", minHeight: "100vh", background: "#f7f7f5" }}>

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
                <a href={"tel:" + farmacia.telefono} style={{ fontSize: 13, color: "#3B6D11", fontWeight: 500, textDecoration: "none", display: "flex", alignItems: "center", gap: 6 }}>
                  <IcoPhone /> Chiama per informazioni →
                </a>
                <a href={"https://wa.me/" + waNumero} target="_blank" rel="noreferrer" style={{ fontSize: 13, color: "#25D366", fontWeight: 500, textDecoration: "none", display: "flex", alignItems: "center", gap: 6 }}>
                  <IcoChat /> Scrivici su WhatsApp →
                </a>
                {farmacia.email && (
                  <a href={"mailto:" + farmacia.email} style={{ fontSize: 13, color: "#3B6D11", fontWeight: 500, textDecoration: "none", display: "flex", alignItems: "center", gap: 6 }}>
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
              <h1 style={{ fontFamily: "'Lexend', sans-serif", fontSize: 52, fontWeight: 400, marginBottom: 12, lineHeight: 1.1 }}>{farmacia.nome}</h1>
              <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap", marginBottom: 20 }}>
                <a href={"https://www.google.com/maps/search/" + encodeURIComponent(farmacia.indirizzo)} target="_blank" rel="noreferrer" style={{ fontSize: 13, color: "#888", textDecoration: "none", display: "flex", alignItems: "center", gap: 5 }}>
                  <IcoPin /> <span style={{ borderBottom: "1px solid #ddd" }}>{farmacia.indirizzo}</span>
                </a>
                <span style={{ fontSize: 12, padding: "4px 12px", borderRadius: 20, background: aperta ? "#EAF3DE" : "#f5f5f5", color: aperta ? "#3B6D11" : "#888", border: "1px solid " + (aperta ? "#C0DD97" : "#ddd"), display: "inline-flex", alignItems: "center", gap: 5 }}>
                  <span className={aperta ? "dot-aperta" : "dot-chiusa"} />
                  {aperta ? "Aperta ora" : "Chiusa"}
                </span>
                {farmacia.distributoreH24 && (
                  <span style={{ fontSize: 12, padding: "4px 12px", borderRadius: 20, background: "#EAF3DE", color: "#3B6D11", border: "1px solid #C0DD97", display: "inline-flex", alignItems: "center", gap: 5 }}>
                    <IcoClock /> Distributore H24
                  </span>
                )}
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 28 }}>
                <a href={"https://www.google.com/maps/search/" + encodeURIComponent(farmacia.indirizzo)} target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 22px", borderRadius: 10, fontSize: 14, fontWeight: 600, textDecoration: "none", color: "#fff", background: "#3B6D11", border: "1px solid #3B6D11" }}>
                  <IcoPin size={15} /> Indicazioni
                </a>
                <a href={"tel:" + farmacia.telefono} style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 20px", border: "1px solid #ddd", borderRadius: 10, fontSize: 14, fontWeight: 500, textDecoration: "none", color: "#444", background: "#fff" }}>
                  <IcoPhone size={15} /> Chiama
                </a>
                <a href={"https://wa.me/" + waNumero} target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 20px", border: "1px solid #ddd", borderRadius: 10, fontSize: 14, fontWeight: 500, textDecoration: "none", color: "#444", background: "#fff" }}>
                  <IcoChat size={15} /> WhatsApp
                </a>
                {farmacia.email && (
                  <a href={"mailto:" + farmacia.email} style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 20px", border: "1px solid #ddd", borderRadius: 10, fontSize: 14, fontWeight: 500, textDecoration: "none", color: "#444", background: "#fff" }}>
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
                  <div style={{ fontFamily: "'Lexend', sans-serif", fontSize: 18, fontWeight: 400, marginBottom: 8, color: "#1a1a1a" }}>{dispensario.nome}</div>
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
                            onClick={() => setModal(s.nome)}
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
                <div style={{ fontFamily: "'Lexend', sans-serif", fontSize: 22, fontWeight: 400, color: "#1a1a1a", marginBottom: 8 }}>Siamo sempre alla ricerca di nuove figure!</div>
                <p style={{ fontSize: 14, color: "#666", lineHeight: 1.7, margin: 0, maxWidth: 480 }}>
                   Inviaci la tua candidatura e conosciamoci.
                </p>
              </div>
              
                <a href={"mailto:" + farmacia.email + "?subject=Candidatura%20-%20" + encodeURIComponent(farmacia.nome) + "&body=Gentile%20team%2C%0D%0A%0D%0AVi%20invio%20la%20mia%20candidatura%20spontanea.%0D%0A%0D%0AIn%20allegato%20trovate%20il%20mio%20CV.%0D%0A%0D%0ACordiali%20saluti"}
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