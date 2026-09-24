const toMin = (t) => {
  const p = t.split(":");
  return parseInt(p[0]) * 60 + parseInt(p[1]);
};

const GIORNI = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
const formatoRoma = new Intl.DateTimeFormat("en-US", {
  timeZone: "Europe/Rome",
  weekday: "short",
  hour: "numeric",
  minute: "numeric",
  hourCycle: "h23",
});

// Giorno della settimana (0 = domenica) e minuti dalla mezzanotte, ora italiana.
function oraItaliana() {
  const p = Object.fromEntries(formatoRoma.formatToParts(new Date()).map((x) => [x.type, x.value]));
  return { giorno: GIORNI[p.weekday], minuti: parseInt(p.hour) * 60 + parseInt(p.minute) };
}

// Fascia oraria di oggi: [apertura, chiusura] oppure [ap1, ch1, ap2, ch2], null se chiusa.
function scheduleOggi(oa, giorno) {
  if (!oa) return null;
  if (giorno === 0) return oa.dom || oa.lun_dom || null;
  if (giorno === 6) return oa.sab || oa.lun_sab || oa.lun_dom || null;
  return oa.lun_ven || oa.lun_sab || oa.lun_dom || null;
}

export function isAperta(farmacia) {
  const { giorno, minuti } = oraItaliana();
  const schedule = scheduleOggi(farmacia.orarioApertura, giorno);
  if (!schedule) return false;
  if (schedule.length === 2) return minuti >= toMin(schedule[0]) && minuti < toMin(schedule[1]);
  if (schedule.length === 4) {
    return (minuti >= toMin(schedule[0]) && minuti < toMin(schedule[1])) ||
           (minuti >= toMin(schedule[2]) && minuti < toMin(schedule[3]));
  }
  return false;
}

// Primo orario testuale di farmacie.json: usato al build e come fallback.
export function orarioStatico(f) {
  return f.orari && f.orari[0] ? f.orari[0][1] : "";
}

export function getOrarioOggi(f) {
  if (!f.orarioApertura) return orarioStatico(f);
  const schedule = scheduleOggi(f.orarioApertura, oraItaliana().giorno);
  if (!schedule) return "Chiusa oggi";
  if (schedule.length === 2) return `${schedule[0]}–${schedule[1]}`;
  if (schedule.length === 4) return `${schedule[0]}–${schedule[1]} / ${schedule[2]}–${schedule[3]}`;
  return orarioStatico(f);
}

export function buildOpeningHours(oa) {
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
