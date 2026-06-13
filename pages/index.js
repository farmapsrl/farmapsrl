import Nav from "../components/Nav";
import Footer from "../components/Footer";

const valori = [
  {
    titolo: "Relazione",
    testo: "Sappiamo il nome di chi entra. Ricordiamo le terapie, le allergie, le abitudini. È quello che rende utile una farmacia di prossimità.",
  },
  {
    titolo: "Preparazione",
    testo: "Diamo priorità al miglioramento e all'aggiornamento costante. Cerchiamo ogni giorno di dare il migliore servizio al paziente.",
  },
  {
    titolo: "Territorio",
    testo: "Ogni sede conosce il quartiere in cui si trova. Quello che offriamo nasce da lì — dalle persone che ci entrano ogni giorno.",
  },
  {
    titolo: "Stabilità",
    testo: "Lavoriamo insieme da anni. Ci conosciamo, ci fidiamo. Quella continuità si riflette nel servizio che diamo.",
  },
];

export default function ChiSiamo() {
  return (
    <div style={{ fontFamily: "'Lexend', sans-serif", width: "100%", minHeight: "100vh", background: "#f7f7f5" }}>
      <Nav />

      <div style={{ background: "#fff", padding: "4rem 2rem" }}>
        <div style={{ maxWidth: 960, margin: "0 auto", display: "flex", alignItems: "center", gap: 64 }}>
          <div style={{ flexShrink: 0 }}>
            <img src="/LogoFarmaP.png" alt="Gruppo FarmaP" style={{ height: 160, width: "auto", display: "block" }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <h1 style={{ fontFamily: "'Lexend', sans-serif", fontSize: 48, fontWeight: 400, lineHeight: 1.15, margin: 0 }}>
              La salute<br />vicino a te, ogni giorno.
            </h1>
          </div>
        </div>
      </div>

      <div style={{ padding: "3rem 2rem", background: "#f7f7f5" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div style={{ fontSize: 11, color: "#aaa", textTransform: "uppercase", letterSpacing: 1, marginBottom: 20 }}>
            Il nostro approccio
          </div>
          <p style={{ fontSize: 15, color: "#444", lineHeight: 1.9, marginBottom: 16 }}>
            Il lavoro in farmacia si costruisce giorno per giorno, nel rapporto diretto con le persone. Conoscere i clienti, seguirli nel tempo, capire le loro esigenze prima ancora che le esprimano: è questo che distingue una farmacia di prossimità da un semplice punto di distribuzione.
          </p>
          <p style={{ fontSize: 15, color: "#444", lineHeight: 1.9, marginBottom: 16 }}>
            La qualità del servizio non è un punto di arrivo, ma qualcosa su cui lavoriamo ogni giorno. Si traduce nella preparazione del personale, nella cura con cui gestiamo ogni richiesta, nella disponibilità a prendersi il tempo necessario — anche quando la farmacia è affollata.
          </p>
          <p style={{ fontSize: 15, color: "#444", lineHeight: 1.9 }}>
            Ogni sede conosce bene la propria comunità, e costruisce la propria offerta di servizi a partire da quella conoscenza. I bisogni di chi vive in un quartiere di città non sono gli stessi di chi abita in un piccolo comune: saperlo, e tenerlo in conto, è parte del nostro lavoro.
          </p>
        </div>
      </div>

      <div style={{ padding: "3rem 2rem", background: "#fff" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ fontSize: 11, color: "#aaa", textTransform: "uppercase", letterSpacing: 1, marginBottom: 32 }}>
            I nostri valori
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 32 }}>
            {valori.map((v, i) => (
              <div key={i} style={{ borderTop: "2px solid #3B6D11", paddingTop: 20 }}>
                <div style={{ fontFamily: "'Lexend', sans-serif", fontSize: 28, fontWeight: 400, color: "#1a1a1a", marginBottom: 10 }}>
                  {v.titolo}
                </div>
                <p style={{ fontSize: 14, color: "#666", lineHeight: 1.9, margin: 0 }}>
                  {v.testo}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ padding: "3rem 2rem", background: "#EAF3DE", borderTop: "1px solid #C0DD97" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontFamily: "'Lexend', sans-serif", fontSize: 28, fontWeight: 400, marginBottom: 12, color: "#1f3d08" }}>
            Trova la sede più vicina a te
          </div>
          <p style={{ fontSize: 14, color: "#4a6e2a", marginBottom: 24, lineHeight: 1.7 }}>
            Siamo presenti in più province, con orari pensati per adattarsi alle esigenze di ogni giornata.
          </p>
          <a href="/sedi" style={{ display: "inline-block", padding: "12px 32px", background: "#3B6D11", color: "#fff", borderRadius: 10, fontSize: 14, fontWeight: 500, textDecoration: "none" }}>
            Sedi →
          </a>
        </div>
      </div>

      <Footer />
    </div>
  );
}