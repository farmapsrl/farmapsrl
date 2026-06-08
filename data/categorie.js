export const normalizza = (nome) =>
  nome.replace(/^Tamponi /, "Tampone ").replace(/^Tampone .*/, "Tampone Streptococco e Covid");

export const categorie = [
  {
    titolo: "Cuore",
    servizi: ["Misurazione Pressione Arteriosa", "Misurazione Saturazione Ossigeno", "Holter Cardiaco", "Holter Pressorio", "ECG"],
  },
  {
    titolo: "Analisi e test",
    servizi: ["Glicemia", "Profilo Lipidico Completo", "Emoglobina Glicata", "Dosaggio Vitamina D", "Tampone Streptococco e Covid", "Breath Test Helicobacter Pylori", "Recaller Test"],
  },
  {
    titolo: "Prevenzione",
    servizi: ["Vaccinazione Antinfluenzale", "Vaccinazione Anti-Pneumococcica", "Screening Colon-Retto"],
  },
  {
    titolo: "Servizi al cittadino",
    servizi: ["Servizi CUP", "Attivazione SPID", "Attivazione e Assistenza SPID", "Pagamento Ticket", "Ritiro Referti", "Ritiro Referti esami di laboratorio", "Consegna a Domicilio"],
  },
  {
    titolo: "Gestione terapia",
    servizi: ["Deblistering Farmaci", "Laboratorio Preparazione Galenica"],
  },
  {
    titolo: "Altri servizi",
    servizi: ["Misurazione Peso Corporeo", "Noleggio Ausili e Dispositivi Medici", "Foratura Lobi", "Foratura Lobi e Naso"],
  },
];
