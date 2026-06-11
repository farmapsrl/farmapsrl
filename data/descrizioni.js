const descrizioni = {
  "Misurazione Pressione Arteriosa": "Il controllo della pressione arteriosa è un gesto semplice ma essenziale per la prevenzione cardiovascolare. \n\nPuoi misurare la pressione gratuitamente e senza appuntamento in qualsiasi momento durante l'orario di apertura.",
  "Misurazione Peso Corporeo": "Tutte le nostre sedi sono dotate di bilancia professionale per la misurazione del peso corporeo.\n\nServizio gratuito e senza appuntamento durante tutto l'orario di apertura.",
  "Misurazione Saturazione Ossigeno": "La saturazione dell'ossigeno nel sangue è un indicatore importante della funzione respiratoria e cardiaca. La misurazione avviene in pochi secondi con un saturimetro da dito, in modo completamente non invasivo.\n\nServizio gratuito e senza appuntamento durante tutto l'orario di apertura.",
  "Holter Cardiaco": "L'Holter cardiaco registra l'attività del cuore per 24 o 48 ore durante le normali attività quotidiane. Fondamentale per individuare aritmie, palpitazioni e anomalie del ritmo.\n\nIl dispositivo è piccolo e dotato di 5 elettrodi, è comodo e adatto per essere portato nelle attività quotidiane.\n\nSi tratta di un servizio su prenotazione, refertato da un cardiologo specialista. \n\n Tale esame può essere effettuato in convenzione con il SSN per i pazienti aventi diritto, dando al cittadino la possibilità di farlo non dovendosi recare in ospedale, ma in prossimità della propria abitazione e, soprattutto, con poca attesa.",
  "Holter Pressorio": "L'Holter pressorio misura automaticamente la pressione arteriosa ogni 15-30 minuti nell'arco di 24 ore. È il metodo più accurato per diagnosticare l'ipertensione e valutare l'efficacia di una terapia farmacologica.\n\nSi tratta di un servizio su prenotazione, refertato da un cardiologo ed effettuabile gratuitamente con esenzione per patologia cardiaca.",
  "ECG": "L'elettrocardiogramma registra l'attività elettrica del cuore in pochi minuti. Esame fondamentale per una veloce valutazione del ritmo cardiaco e per il rilascio del certificato medico-sportivo non agonistico.\n\nPuoi effettuare un ECG senza appuntamento in orario di apertura, refertato da un cardiologo in giornata.",
  "Glicemia": "Misurazione rapida del livello di zucchero nel sangue tramite un piccolo prelievo capillare. Risultato disponibile in pochi secondi.\n\nPuoi effettuare la misurazione senza appuntamento negli orari di apertura.\n\nÈ consigliato il digiuno per un risultato attendibile.",
  "Profilo Lipidico Completo": "Misurazione di colesterolo totale, HDL, LDL e trigliceridi con un unico prelievo capillare.\n\nFondamentale per valutare il rischio cardiovascolare e per il rilascio del certificato medico-sportivo non agonistico.\n\nÈ consigliato il digiuno per un risultato attendibile.",
  "Emoglobina Glicata": "Esame che misura la media dei valori di glicemia degli ultimi 2-3 mesi.\n\nFondamentale per il monitoraggio del diabete e per valutare l'efficacia della terapia in corso. \n\n Puoi effettuare il test senza prenotazione in orario di apertura",
  "Tampone Streptococco e Covid": "Test rapidi con risposta in 15 minuti con rilascio di referto.\n\nUtile per distinguere infezioni batteriche da virali ed evitare l'uso non necessario di antibiotici.",
  "Breath Test Helicobacter Pylori": "Test del respiro non invasivo per rilevare la presenza di Helicobacter Pylori, batterio responsabile di gastrite e ulcera peptica.\n\nSemplice, veloce e affidabile.",
  "Vaccinazione Anti-Pneumococcica": "Vaccinazione anti-pneumococcica eseguita direttamente in farmacia da personale qualificato.\n\nGratuita per le categorie protette secondo la normativa regionale.",
  "Vaccinazione Antinfluenzale": "Vaccinazioni eseguite direttamente in farmacia da personale qualificato.\n\nGratuito per le categorie protette secondo la normativa regionale.",
  "Recaller Test": "Test non invasivo tramite prelievo capillare per individuare possibili intolleranze alimentari.\n\nAnalizza la risposta dell'organismo a centinaia di alimenti, fornendo un report dettagliato con indicazioni personalizzate.\n\nUtile in caso di gonfiore, stanchezza cronica o disturbi digestivi.",
  "Foratura Lobi": "Eseguita con strumenti sterili monouso e orecchini certificati in acciaio chirurgico.\n\nForniamo le istruzioni per la cura post-foratura. Adatta anche ai bambini con consenso del genitore.",
  "Foratura Lobi e Naso": "Servizio professionale eseguito con strumenti sterili monouso.\n\nOrecchini e piercing certificati in acciaio chirurgico. Forniamo le istruzioni per la cura post-foratura.\n\nAdatto anche ai bambini con consenso del genitore.",
  "Noleggio Ausili e Dispositivi Medici": "Ideale per periodi di convalescenza o esigenze temporanee.",
  "Servizi CUP": "Evita la fila e l'attesa agli sportelli.",
  "Consegna a Domicilio": "Farmaci da banco, prodotti parafarmaceutici e articoli sanitari consegnati direttamente a casa tua.\n\n Disponibile nell'area urbana.",
  "Deblistering Farmaci": "Servizio di confezionamento personalizzato dei farmaci in blister monodose.\n\nIdeale per pazienti anziani o con politerapia complessa. \n\n I farmacisti supportano anche nella gestione delle prescrizioni e nei contatti con il medico",
  "Attivazione e Assistenza SPID": "Attivazione dello SPID direttamente in farmacia in pochi minuti.\n\nSenza code agli uffici pubblici. \n\n Il servizio è gratuito e il paziente può recarsi in farmacia in caso di necessità di assistenza post rilascio (es. cambio/recupero password o cambio di documenti d'identità).\n\n Porta con te documento d'identità e codice fiscale.",
  "Pagamento Ticket": "Paga il ticket sanitario direttamente in farmacia sia in contanti che con bancomat portando il bollettino PagoPA.\n\nRapido e comodo, senza doverti recare agli sportelli.",
  "Ritiro Referti esami di laboratorio": "Ritira i referti dei tuoi esami di laboratorio direttamente in farmacia con il foglio rilasciato dal centro analisi.",
  "Cabina Estetica": "Servizio di consulenza e trattamento estetico professionale.\n\nContattaci per conoscere i trattamenti disponibili e prenotare il tuo appuntamento.",
  "Dosaggio Vitamina D": "La vitamina D è fondamentale per la salute delle ossa, il sistema immunitario e il benessere generale. La sua carenza è molto diffusa, spesso senza sintomi evidenti.\n\nIl test viene effettuato tramite un semplice prelievo capillare. Contattaci per informazioni su prenotazione e modalità.",
  "Laboratorio Preparazione Galenica": "Il laboratorio galenico della farmacia consente la preparazione di farmaci personalizzati su prescrizione medica, nei dosaggi e nelle forme farmaceutiche più adatte alle esigenze del singolo paziente.\n\nUn servizio prezioso per chi necessita di formulazioni non disponibili in commercio, per pazienti pediatrici o per terapie particolari.\n\nContattaci per informazioni e tempi di preparazione.",
  "FoodPlan": "FoodPlan combina l'analisi della sensibilità alimentare a 92 alimenti, la reattività al glutine, il test di predisposizione genetica all'intolleranza al lattosio e il test dell'interleuchina 6 per valutare il grado di infiammazione.",
  "Screening Colon-Retto": "Lo screening del colon retto è un esame preventivo fondamentale per la diagnosi precoce del tumore del colon-retto, uno dei più frequenti nella popolazione adulta.\n\nLa diagnosi precoce aumenta significativamente le possibilità di guarigione.",
  "Consulenza Nutrizionista": "La farmacia ospita un nutrizionista professionista per consulenze personalizzate su alimentazione, peso corporeo e stili di vita.\n\nPer prenotare un appuntamento contatta direttamente la farmacia.",
"Consulenza Fisioterapista": "La farmacia ospita un fisioterapista professionista per consulenze e trattamenti riabilitativi.\n\nPer prenotare un appuntamento contatta direttamente la farmacia.",
};

export const descrizioniRegionali = {
  "Screening Colon-Retto": {
    "Lombardia": "Lo screening del colon retto è un esame preventivo fondamentale per la diagnosi precoce del tumore del colon-retto, uno dei più frequenti nella popolazione adulta.\n\nIn Lombardia, i cittadini nelle fasce d'età previste ricevono una lettera di invito dalla Regione. Dopo aver ricevuto la lettera, è possibile ritirare il kit per la raccolta del campione direttamente in farmacia. Il campione viene raccolto a domicilio e riconsegnato in farmacia.\n\nLa diagnosi precoce aumenta significativamente le possibilità di guarigione.",
    "Emilia-Romagna": "Lo screening del colon retto è un esame preventivo fondamentale per la diagnosi precoce del tumore del colon-retto, uno dei più frequenti nella popolazione adulta.\n\nIn Emilia-Romagna, i cittadini nelle fasce d'età previste dal programma regionale possono ritirare direttamente la provetta in farmacia presentando il proprio codice fiscale, senza attendere alcuna lettera di invito.\n\nLa diagnosi precoce aumenta significativamente le possibilità di guarigione.",
  },
};

export const sottoservizi = {
  "Screening Colon-Retto": [
    {
      nome: "Regione Lombardia",
      descrizione: "I cittadini nelle fasce d'età previste ricevono una lettera di invito dalla Regione. Dopo aver ricevuto la lettera, è possibile ritirare il kit per la raccolta del campione direttamente in farmacia. Il campione viene raccolto a domicilio e riconsegnato in farmacia.",
    },
    {
      nome: "Regione Emilia-Romagna",
      descrizione: "I cittadini nelle fasce d'età previste possono ritirare direttamente la provetta in farmacia presentando il proprio codice fiscale, senza attendere alcuna lettera di invito. Il campione viene raccolto a domicilio e riconsegnato in farmacia.",
    },
  ],
  "Servizi CUP": [
    {
      nome: "Prenotazione visite ed esami SSN",
      descrizione: "Prenotazione di visite ed esami presso le strutture pubbliche con prescrizione elettronica.", 
    },
    {
      nome: "Disdetta e spostamento appuntamenti",
      descrizione: "Disdetta e spostamento di appuntamenti già programmati presso strutture pubbliche.", 
    },
    {
      nome: "Inserimento e rinnovo esenzioni autocertificate",
      descrizione: "Inserimento e rinnovo di esenzioni che necessitano di autocertificazione da parte del cittadino. \n\n Esenzioni: E30, E40, E02, E02F, E12.",
    },
    {
      nome: "Cambio medico di base o pediatra di libera scelta",
      descrizione: "Cambio medico di base o pediatra di libera scelta per cittadini residenti nella regione. \n\n In caso di impossibilità alla registrazione, il farmacista provvede all'indirizzamento del paziente.", 
    },
  ],
};

export default descrizioni;
