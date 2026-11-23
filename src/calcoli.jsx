export const SOGLIE = { attenzione: 70, critico: 90 }

export function statoServer(server) {
  return !server.online
    ? "offline"
    : server.cpu >= SOGLIE.critico
      ? "critico"
      : server.cpu >= SOGLIE.attenzione
        ? "attenzione"
        : "ok"
}

export function contaPerStato(servers, stato) {
  return servers.filter(s => statoServer(s) === stato).length
}

export function cpuMedia(servers) {
  const accesi = servers.filter(s => s.online)
  if (accesi.length === 0) return null
  const somma = accesi.reduce((tot, s) => tot + s.cpu, 0)
  return somma / accesi.length
}

export function piuLento(servers) {
  return servers
    .filter(s => s.online)
    .reduce((lento, s) => (lento === null || s.latenza > lento.latenza ? s : lento), null)
}

export function trovaServer(servers, nome) {
  return servers.find(s => s.nome === nome)
}