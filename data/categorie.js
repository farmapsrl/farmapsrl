export const normalizza = (nome) =>
  nome.replace(/^Tamponi /, "Tampone ").replace(/^Tampone .*/, "Tampone Streptococco e Covid");

export const categorie = [
  {
    titolo: "Cuore",
    icona: "🫀",
    servizi: ["Misurazione Pressione Arteriosa", "Misurazione Saturazione Ossigeno", "Holter Cardiaco", "Holter Pressorio", "ECG"],
  },
  {
    titolo: "Analisi e test",
    icona: "🩸",
    servizi: ["Glicemia", "Profilo Lipidico Completo", "Emoglobina Glicata", "Dosaggio Vitamina D", "PSA", "TSH", "Proteina C Reattiva (PCR)", "Ferritina", "INR", "Test di Gravidanza", "Esame delle Urine", "Tampone Streptococco e Covid", "Breath Test Helicobacter Pylori", "Recaller Test", "FoodPlan"],
  },
  {
    titolo: "Prevenzione",
    icona: "🛡️",
    servizi: ["Vaccinazione Antinfluenzale", "Vaccinazione Anti-Pneumococcica", "Screening Colon-Retto"],
  },
  {
    titolo: "Servizi al cittadino",
    icona: "🏛️",
    servizi: ["Servizi CUP", "Attivazione e Assistenza SPID", "Pagamento Ticket", "Ritiro Referti esami di laboratorio", "Consegna a Domicilio"],
  },
  {
    titolo: "Gestione terapia",
    icona: "💊",
    servizi: ["Deblistering Farmaci", "Laboratorio Preparazione Galenica", "Cannabis Terapeutica"],
  },
  {
    titolo: "Specialisti in sede",
    icona: "🩺",
    servizi: ["Consulenza Nutrizionista", "Consulenza Fisioterapista"],
  },
  {
    titolo: "Altri servizi",
    icona: "⭐",
    servizi: ["Misurazione Peso Corporeo", "Noleggio Ausili e Dispositivi Medici", "Noleggio Magnetoterapia", "Foratura Lobi", "Foratura Lobi e Naso"],
  },
];