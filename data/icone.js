const S = ({ children }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
    stroke="#3B6D11" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    {children}
  </svg>
);

export const iconeCategoria = {
  "Cuore": <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3B6D11" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"/></svg>,
  "Analisi e test": <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3B6D11" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2c-5.33 7.33-8 11.67-8 14a8 8 0 0 0 16 0c0-2.33-2.67-6.67-8-14z"/></svg>,
  "Prevenzione": <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3B6D11" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  "Servizi al cittadino": <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3B6D11" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  "Gestione terapia": <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3B6D11" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="9" width="20" height="6" rx="3"/><line x1="12" y1="9" x2="12" y2="15"/></svg>,
  "Specialisti in sede": <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3B6D11" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  "Altri servizi": <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3B6D11" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></svg>,
};

export const icone = {
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
  "Cannabis Terapeutica": <S><path d="M12 2c-2 4-5 6-5 10a5 5 0 0 0 10 0c0-4-3-6-5-10z"/><line x1="12" y1="12" x2="12" y2="22"/></S>,
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
  "Cabina Estetica": <S><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></S>,
};

export default icone;
