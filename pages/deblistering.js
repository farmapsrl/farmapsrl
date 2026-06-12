import { useState } from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import farmacie from "../farmacie.json";

const sediDeblistering = farmacie.filter((f) =>
  f.servizi && f.servizi.some((s) => s.nome === "Deblistering Farmaci")
);

const categorie = [
  {
    id: "rsa",
    label: "RSA",
    foto: null,
    processo: [
      { n: "1", titolo: "Acquisizione farmaci e prescrizioni", testo: "Vengono acquisiti i farmaci e le prescrizioni della struttura, con eventuale aggiornamento delle terapie in corso per ogni ospite." },
      { n: "2", titolo: "Preparazione della fornitura", testo: "La fornitura viene preparata e suddivisa per paziente e per eventuale nucleo di appartenenza, garantendo ordine e chiarezza nella distribuzione." },
      { n: "3", titolo: "Verifica tramite Vision", testo: "Ogni bustina viene verificata tramite il sistema Vision, che controlla la correttezza del contenuto prima della consegna." },
      { n: "4", titolo: "Consegna alla struttura", testo: "La fornitura viene consegnata alla struttura, pronta per la somministrazione da parte del personale." },
    ],
    vantaggi: [
      { titolo: "Sicurezza per il personale", testo: "Il personale opera su dosi già preparate e verificate dal farmacista, riducendo la responsabilità diretta nella manipolazione dei farmaci." },
      { titolo: "Ottimizzazione dei tempi di lavoro", testo: "La preparazione è già pronta e suddivisa per ospite: il personale risparmia tempo prezioso da dedicare alla cura diretta degli assistiti." },
      { titolo: "Tracciabilità dei farmaci utilizzati", testo: "Su ogni bustina sono riportati il lotto e la scadenza di ciascun farmaco utilizzato, garantendo piena tracciabilità delle somministrazioni e facilitando i controlli interni." },
      { titolo: "Riduzione errori e sprechi", testo: "Il confezionamento monodose elimina le ambiguità sui dosaggi e riduce le dosi inutilizzate, contenendo i costi farmaceutici della struttura." },
      { titolo: "Valorizzazione dell'operatore sanitario", testo: "Liberando il personale dalla gestione delle confezioni, si valorizza il ruolo professionale dell'operatore e si migliora la qualità dell'assistenza." },
      { titolo: "Sicurezza legale", testo: "La documentazione completa delle somministrazioni tutela la struttura in caso di verifiche ispettive o contestazioni, riducendo l'esposizione a responsabilità legali." },
    ],
  },
  {
    id: "case",
    label: "Case di accoglienza",
    foto: null,
    processo: [
      { n: "1", titolo: "Interfaccia con i medici", testo: "Il farmacista si interfaccia con i medici della struttura per acquisire le prescrizioni necessarie alla preparazione di ogni terapia e per essere aggiornato su eventuali modifiche." },
      { n: "2", titolo: "Erogazione dei farmaci", testo: "I farmaci vengono erogati direttamente in farmacia, garantendo la disponibilità di tutto il necessario per la preparazione delle terapie." },
      { n: "3", titolo: "Allestimento della terapia", testo: "Le terapie vengono allestite e suddivise per paziente, confezionando ogni dose nella bustina con indicazione di giorno e orario di somministrazione." },
      { n: "4", titolo: "Verifica tramite Vision", testo: "Ogni bustina viene controllata tramite il sistema Vision, che verifica la correttezza del contenuto prima della consegna." },
      { n: "5", titolo: "Consegna alla struttura", testo: "La fornitura completa viene consegnata alla struttura, pronta per la somministrazione da parte del personale." },
    ],
    vantaggi: [
      { titolo: "Sicurezza per il personale", testo: "Il personale opera su dosi già preparate e verificate dal farmacista, riducendo la responsabilità diretta nella manipolazione dei farmaci." },
      { titolo: "Ottimizzazione dei tempi di lavoro", testo: "La preparazione è già pronta e suddivisa per assistito: il personale risparmia tempo prezioso da dedicare alla cura diretta delle persone accolte." },
      { titolo: "Tracciabilità dei farmaci utilizzati", testo: "Su ogni bustina sono riportati il lotto e la scadenza di ciascun farmaco utilizzato, garantendo piena tracciabilità delle somministrazioni e facilitando i controlli interni." },
      { titolo: "Riduzione errori e sprechi", testo: "Il confezionamento monodose elimina le ambiguità sui dosaggi e riduce le dosi inutilizzate, contenendo i costi farmaceutici della struttura." },
      { titolo: "Valorizzazione dell'operatore sanitario", testo: "Liberando il personale dalla gestione delle confezioni, si valorizza il ruolo professionale dell'operatore e si migliora la qualità dell'assistenza." },
      { titolo: "Sicurezza legale", testo: "La documentazione completa delle somministrazioni tutela la struttura in caso di verifiche ispettive o contestazioni, riducendo l'esposizione a responsabilità legali." },
      { titolo: "Garanzia per i familiari", testo: "I familiari dei pazienti hanno la certezza che ogni somministrazione sia stata preparata e verificata da un farmacista, aumentando la fiducia nella struttura." },
    ],
  },
  {
    id: "privati",
    label: "Pazienti privati",
    foto: null,
    processo: [
      { n: "1", titolo: "Colloquio con il paziente", testo: "Il farmacista si confronta con il paziente, i suoi familiari o i curanti per raccogliere informazioni sulla terapia in corso e le esigenze specifiche." },
      { n: "2", titolo: "Colloquio con il medico", testo: "Il farmacista si interfaccia con il medico curante per acquisire le prescrizioni aggiornate e coordinarsi su dosaggi e frequenze di somministrazione." },
      { n: "3", titolo: "Preparazione dei farmaci", testo: "I farmaci vengono acquisiti in farmacia sulla base delle prescrizioni, verificando la disponibilità di tutto il necessario per la terapia." },
      { n: "4", titolo: "Allestimento della terapia", testo: "Le dosi vengono allestite e confezionate in bustine monodose con indicazione di giorno e orario, personalizzate per il paziente." },
      { n: "5", titolo: "Controllo della terapia", testo: "Ogni bustina viene verificata prima della consegna, garantendo la correttezza del contenuto e la sicurezza della terapia." },
      { n: "6", titolo: "Ritiro o consegna", testo: "Il paziente o un suo delegato può ritirare la terapia in una delle nostre farmacie oppure optare per la consegna a domicilio nei casi previsti." },
    ],
    vantaggi: [
      { titolo: "Autonomia nella gestione", testo: "Un unico blister al posto di più confezioni: il paziente sa esattamente cosa prendere e quando, senza margini di dubbio." },
      { titolo: "Aderenza alla terapia", testo: "La chiarezza visiva dei blister aumenta la regolarità nell'assunzione, migliorando l'efficacia della cura." },
      { titolo: "Meno confusione", testo: "Niente più scatole aperte, foglietti illustrativi persi o dubbi su dosi già prese. Tutto è ordinato e leggibile." },
      { titolo: "Consulenza dedicata", testo: "Il farmacista segue il paziente nel tempo, aggiornando i blister ad ogni variazione della terapia." },
      { titolo: "Risparmio di tempo", testo: "Il servizio si occupa di contattare il medico, acquisire i farmaci in farmacia e allestire la terapia: meno gestione per il paziente e per chi se ne prende cura." },
      { titolo: "Serenità per il paziente e la famiglia", testo: "Sapere che la terapia è preparata, verificata e pronta elimina l'ansia da gestione quotidiana, portando tranquillità al paziente e ai suoi familiari." },
    ],
  },
];

export default function Deblistering() {
  const [tabAttiva, setTabAttiva] = useState("rsa");
  const cat = categorie.find((c) => c.id === tabAttiva);

  return (
    <div style={{ fontFamily: "'Lexend', sans-serif", width: "100%", minHeight: "100vh", background: "#f7f7f5" }}>
      <Nav />

      <div style={{ background: "#fff", borderBottom: "1px solid #eee", padding: "4rem 2rem" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 32, flexWrap: "wrap" }}>
          <div>
            <div style={{ fontSize: 11, color: "#3B6D11", textTransform: "uppercase", letterSpacing: 2, marginBottom: 12 }}>
              Servizio
            </div>
            <h1 style={{ fontFamily: "'Lexend', sans-serif", fontSize: 48, fontWeight: 400, lineHeight: 1.15, marginBottom: 20 }}>
              Deblistering
            </h1>
            <p style={{ fontSize: 16, color: "#666", lineHeight: 1.8, maxWidth: 480, margin: 0 }}>
              Confezionamento personalizzato dei farmaci in blister monodose, pensato per semplificare la gestione della terapia quotidiana.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, flexShrink: 0 }}>
            <div style={{ fontSize: 11, color: "#7A9E6A", textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>
              Richiedi informazioni
            </div>
            <a href="mailto:info@farmaciagiardino.it" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 14, color: "#3B6D11", textDecoration: "none", fontWeight: 500 }}>
              <span>✉</span> info@farmaciagiardino.it
            </a>
            <a href="tel:+390382468934" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 14, color: "#3B6D11", textDecoration: "none", fontWeight: 500 }}>
              <span>✆</span> 0382 468934
            </a>
          </div>
        </div>
      </div>

      <div style={{ padding: "3rem 2rem" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", display: "flex", flexDirection: "column", gap: 56 }}>

          {/* A chi si rivolge */}
          <div>
            <div style={{ fontSize: 11, color: "#7A9E6A", textTransform: "uppercase", letterSpacing: 1, marginBottom: 16 }}>
              A chi si rivolge
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16 }}>
              <div style={{ background: "#fff", border: "1px solid #eee", borderRadius: 14, padding: "1.75rem", boxShadow: "0 1px 6px rgba(0,0,0,0.06)" }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#222", marginBottom: 10 }}>RSA</div>
                <p style={{ fontSize: 14, color: "#666", lineHeight: 1.8, margin: 0 }}>
                  Residenze Sanitarie Assistenziali con ospiti in politerapia complessa.
                </p>
              </div>
              <div style={{ background: "#fff", border: "1px solid #eee", borderRadius: 14, padding: "1.75rem", boxShadow: "0 1px 6px rgba(0,0,0,0.06)" }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#222", marginBottom: 10 }}>Case di accoglienza</div>
                <p style={{ fontSize: 14, color: "#666", lineHeight: 1.8, margin: 0 }}>
                  Strutture per anziani e disabili che necessitano di supporto nella gestione delle terapie.
                </p>
              </div>
              <div style={{ background: "#fff", border: "1px solid #eee", borderRadius: 14, padding: "1.75rem", boxShadow: "0 1px 6px rgba(0,0,0,0.06)" }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#222", marginBottom: 10 }}>Pazienti privati</div>
                <p style={{ fontSize: 14, color: "#666", lineHeight: 1.8, margin: 0 }}>
                  Persone che assumono più farmaci a orari diversi e vogliono semplificare la routine quotidiana.
                </p>
              </div>
            </div>
          </div>

          {/* Spiegazione */}
          <div>
            <div style={{ fontSize: 11, color: "#7A9E6A", textTransform: "uppercase", letterSpacing: 1, marginBottom: 16 }}>
              Il servizio
            </div>
            <div style={{ background: "#fff", border: "1px solid #eee", borderRadius: 14, padding: "1.75rem", display: "flex", flexDirection: "column", gap: 12 }}>
              <p style={{ fontSize: 14, color: "#444", lineHeight: 1.8, margin: 0 }}>
                Il deblistering è un servizio di confezionamento personalizzato dei farmaci: le singole dosi vengono estratte dalle confezioni originali e riposte in blister monodose riportanti giorno e orario di assunzione.
              </p>
              <p style={{ fontSize: 14, color: "#444", lineHeight: 1.8, margin: 0 }}>
                Riduce il rischio di errori nella somministrazione, alleggerisce il lavoro del personale di cura e garantisce continuità terapeutica anche nelle situazioni più complesse.
              </p>
            </div>
          </div>

          {/* Processo + Vantaggi per categoria */}
          <div>
            {/* Tab bar */}
            <div style={{ display: "flex", gap: 4, marginBottom: 24, background: "#fff", border: "1px solid #eee", borderRadius: 12, padding: 4, boxShadow: "0 1px 6px rgba(0,0,0,0.06)" }}>
              {categorie.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setTabAttiva(c.id)}
                  style={{
                    flex: 1, padding: "10px 12px", border: "none", borderRadius: 9, cursor: "pointer",
                    fontSize: 13, fontWeight: tabAttiva === c.id ? 600 : 400,
                    background: tabAttiva === c.id ? "#3B6D11" : "transparent",
                    color: tabAttiva === c.id ? "#fff" : "#666",
                    transition: "all 0.15s",
                  }}
                  onMouseEnter={(e) => { if (tabAttiva !== c.id) { e.currentTarget.style.background = "#EEF5E8"; e.currentTarget.style.color = "#3B6D11"; } }}
                  onMouseLeave={(e) => { if (tabAttiva !== c.id) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#666"; } }}
                >
                  {c.label}
                </button>
              ))}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>

              {/* Foto */}
              {cat.foto && (
                <img
                  src={cat.foto}
                  alt={cat.label}
                  style={{ width: "100%", height: 260, objectFit: "cover", borderRadius: 14, display: "block" }}
                />
              )}

              {/* Processo */}
              <div>
                <div style={{ fontSize: 11, color: "#7A9E6A", textTransform: "uppercase", letterSpacing: 1, marginBottom: 20 }}>
                  Come funziona il processo
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                  {cat.processo.map((step, i) => (
                    <div key={step.n} style={{ display: "flex", gap: 0 }}>
                      {/* Timeline column */}
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginRight: 20 }}>
                        <div style={{
                          width: 36, height: 36, borderRadius: "50%",
                          background: "#3B6D11", color: "#fff",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontFamily: "'Lexend', sans-serif", fontSize: 16, fontWeight: 400, flexShrink: 0,
                        }}>{step.n}</div>
                        {i < cat.processo.length - 1 && (
                          <div style={{ width: 1, flex: 1, background: "#e0e0e0", margin: "4px 0" }} />
                        )}
                      </div>
                      {/* Content */}
                      <div style={{ paddingBottom: i < cat.processo.length - 1 ? 24 : 0, paddingTop: 6 }}>
                        <div style={{ fontSize: 14, fontWeight: 600, color: "#222", marginBottom: 6 }}>{step.titolo}</div>
                        <p style={{ fontSize: 14, color: "#666", lineHeight: 1.8, margin: 0 }}>{step.testo}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Vantaggi */}
              <div>
                <div style={{ fontSize: 11, color: "#7A9E6A", textTransform: "uppercase", letterSpacing: 1, marginBottom: 20 }}>
                  Vantaggi
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 12 }}>
                  {cat.vantaggi.map((v) => (
                    <div
                      key={v.titolo}
                      style={{ background: "#fff", borderRadius: 14, padding: "1.5rem", borderTop: "3px solid #3B6D11", boxShadow: "0 1px 4px rgba(0,0,0,0.05)", transition: "background 0.15s" }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = "#EEF5E8"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = "#fff"; }}
                    >
                      <div style={{ fontSize: 13, fontWeight: 600, color: "#222", marginBottom: 8 }}>{v.titolo}</div>
                      <p style={{ fontSize: 13, color: "#777", lineHeight: 1.75, margin: 0 }}>{v.testo}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Attivabile in */}
          <div>
            <div style={{ fontSize: 11, color: "#7A9E6A", textTransform: "uppercase", letterSpacing: 1, marginBottom: 16 }}>
              Attivabile in
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {sediDeblistering.map((f) => (
                <a
                  key={f.slug}
                  href={"/" + f.slug}
                  style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 18px", background: "#fff", border: "1px solid #eee", borderRadius: 12, textDecoration: "none", color: "#333", fontSize: 14, transition: "background 0.15s, border-color 0.15s" }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#3B6D11"; e.currentTarget.style.background = "#EEF5E8"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#eee"; e.currentTarget.style.background = "#fff"; }}
                >
                  <div>
                    <div style={{ fontWeight: 500 }}>{f.nome}</div>
                    <div style={{ fontSize: 12, color: "#aaa", marginTop: 3 }}>{f.citta}</div>
                  </div>
                  <span style={{ color: "#3B6D11" }}>→</span>
                </a>
              ))}
            </div>
          </div>

        </div>
      </div>
      <div style={{ background: "#3B6D11", padding: "3rem 2rem", textAlign: "center" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <div style={{ fontFamily: "'Lexend', sans-serif", fontSize: 24, fontWeight: 400, color: "#fff", marginBottom: 12 }}>
            Vuoi attivare il servizio di deblistering?
          </div>
          <p style={{ fontSize: 14, color: "#C0DD97", lineHeight: 1.7, marginBottom: 24 }}>
            Contattaci per ricevere informazioni personalizzate e scoprire come il servizio può adattarsi alle esigenze della tua struttura o dei tuoi pazienti.
          </p>
          <a
           href="mailto:info@farmaciagiardino.it"
            style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "14px 32px", background: "#fff", color: "#3B6D11", borderRadius: 10, fontSize: 15, fontWeight: 600, textDecoration: "none" }}
          >
            ✉ Scrivici una mail
          </a>
        </div>
      </div>
      <Footer />
    </div>
  );
}
