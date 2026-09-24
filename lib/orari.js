const toMin = (t) => {
  const p = t.split(":");
  return parseInt(p[0]) * 60 + parseInt(p[1]);
};

// Fascia oraria di oggi: [apertura, chiusura] oppure [ap1, ch1, ap2, ch2], null se chiusa.
function scheduleOggi(oa, giorno) {
  if (!oa) return null;
  if (giorno === 0) return oa.dom || oa.lun_dom || null;
  if (giorno === 6) return oa.sab || oa.lun_sab || oa.lun_dom || null;
  return oa.lun_ven || oa.lun_sab || oa.lun_dom || null;
}

export function isAperta(farmacia) {
  const ora = new Date();
  const minuti = ora.getHours() * 60 + ora.getMinutes();
  const schedule = scheduleOggi(farmacia.orarioApertura, ora.getDay());
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
  const schedule = scheduleOggi(f.orarioApertura, new Date().getDay());
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
