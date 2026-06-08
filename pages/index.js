import Nav from "../components/Nav";

const valori = [
  {
    titolo: "Relazione",
    testo:
      "Sappiamo il nome di chi entra. Ricordiamo le terapie, le allergie, le abitudini. È quello che rende utile una farmacia di prossimità.",
  },
  {
    titolo: "Preparazione",
    testo:
      "Diamo priorità al miglioramento e all'aggiornamento costante. Cerchiamo ogni giorno di dare il migliore servizio al paziente.",
  },
  {
    titolo: "Territorio",
    testo:
      "Ogni sede conosce il quartiere in cui si trova. Quello che offriamo nasce da lì — dalle persone che ci entrano ogni giorno.",
  },
  {
    titolo: "Stabilità",
    testo:
      "Lavoriamo insieme da anni. Ci conosciamo, ci fidiamo. Quella continuità si riflette nel servizio che diamo.",
  },
];


export default function ChiSiamo() {
  return (
    <div
      style={{
        fontFamily: "'Lexend', sans-serif",
        width: "100%",
        minHeight: "100vh",
        background: "#f7f7f5",
      }}
    >
      <Nav />

      {/* Hero */}
      <div
        style={{
          background: "#fff",
          padding: "4rem 2rem",
        }}
      >
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div
            style={{
              fontSize: 11,
              color: "#3B6D11",
              textTransform: "uppercase",
              letterSpacing: 2,
              marginBottom: 12,
            }}
          >
            Gruppo FarmaP
          </div>
          <h1
            style={{
              fontFamily: "'Lexend', sans-serif",
              fontSize: 48,
              fontWeight: 400,
              lineHeight: 1.15,
              marginBottom: 20,
            }}
          >
            La salute
            <br />
            vicino a te, ogni giorno.
          </h1>
          <p
            style={{
              fontSize: 16,
              color: "#666",
              lineHeight: 1.8,
              maxWidth: 540,
            }}
          >
          </p>
        </div>
      </div>


      {/* Filosofia */}
      <div style={{ padding: "3rem 2rem", background: "#f7f7f5" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div
            style={{
              fontSize: 11,
              color: "#aaa",
              textTransform: "uppercase",
              letterSpacing: 1,
              marginBottom: 20,
            }}
          >
            Il nostro approccio
          </div>
          <p
            style={{
              fontSize: 15,
              color: "#444",
              lineHeight: 1.9,
              marginBottom: 16,
            }}
          >
            Il lavoro in farmacia si costruisce giorno per giorno, nel rapporto
            diretto con le persone. Conoscere i clienti, seguirli nel tempo,
            capire le loro esigenze prima ancora che le esprimano: è questo che
            distingue una farmacia di prossimità da un semplice punto di
            distribuzione.
          </p>
          <p
            style={{
              fontSize: 15,
              color: "#444",
              lineHeight: 1.9,
              marginBottom: 16,
            }}
          >
            La qualità del servizio non è un punto di arrivo, ma qualcosa su
            cui lavoriamo ogni giorno. Si traduce nella preparazione del
            personale, nella cura con cui gestiamo ogni richiesta, nella
            disponibilità a prendersi il tempo necessario — anche quando la
            farmacia è affollata.
          </p>
          <p style={{ fontSize: 15, color: "#444", lineHeight: 1.9 }}>
            Ogni sede conosce bene la propria comunità, e costruisce la propria
            offerta di servizi a partire da quella conoscenza. I bisogni di chi
            vive in un quartiere di città non sono gli stessi di chi abita in
            un piccolo comune: saperlo, e tenerlo in conto, è parte del nostro
            lavoro.
          </p>
        </div>
      </div>

      {/* Valori */}
      <div style={{ padding: "3rem 2rem", background: "#fff" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div
            style={{
              fontSize: 11,
              color: "#aaa",
              textTransform: "uppercase",
              letterSpacing: 1,
              marginBottom: 24,
            }}
          >
            I nostri valori
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: 16,
            }}
          >
            {valori.map((v, i) => (
              <div
                key={i}
                style={{
                  background: "#fff",
                  borderLeft: "4px solid #3B6D11",
                  borderRadius: 4,
                  padding: "1.5rem",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
                }}
              >
                <div
                  style={{
                    fontSize: 11,
                    color: "#3B6D11",
                    textTransform: "uppercase",
                    letterSpacing: 1,
                    marginBottom: 10,
                  }}
                >
                  0{i + 1}
                </div>
                <div
                  style={{
                    fontFamily: "'Lexend', sans-serif",
                    fontSize: 22,
                    marginBottom: 12,
                    color: "#1a1a1a",
                  }}
                >
                  {v.titolo}
                </div>
                <p style={{ fontSize: 13, color: "#555", lineHeight: 1.9, margin: 0 }}>
                  {v.testo}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div
        style={{
          padding: "3rem 2rem",
          background: "#EAF3DE",
          borderTop: "1px solid #C0DD97",
        }}
      >
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <div
            style={{
              fontFamily: "'Lexend', sans-serif",
              fontSize: 28,
              fontWeight: 400,
              marginBottom: 12,
              color: "#1f3d08",
            }}
          >
            Trova la sede più vicina a te
          </div>
          <p
            style={{
              fontSize: 14,
              color: "#4a6e2a",
              marginBottom: 24,
              lineHeight: 1.7,
            }}
          >
            Siamo presenti in più province, con orari pensati per adattarsi
            alle esigenze di ogni giornata.
          </p>
          <a
            href="/sedi"
            style={{
              display: "inline-block",
              padding: "12px 32px",
              background: "#3B6D11",
              color: "#fff",
              borderRadius: 10,
              fontSize: 14,
              fontWeight: 500,
              textDecoration: "none",
            }}
          >
            Sedi →
          </a>
        </div>
      </div>

      <footer
        style={{
          padding: "2rem",
          borderTop: "1px solid #eee",
          background: "#fff",
          textAlign: "center",
          fontSize: 12,
          color: "#aaa",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
        }}
      >
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
