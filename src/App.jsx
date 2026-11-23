import "./App.css"
import { sistema, servers, avvisi } from "./dati"
import { contaPerStato, cpuMedia, piuLento, trovaServer } from "./calcoli"
import Intestazione from "./Intestazione"
import Riepilogo from "./Riepilogo"
import GrigliaServer from "./GrigliaServer"
import ServerInEvidenza from "./ServerInEvidenza"
import Avvisi from "./Avvisi"

function App() {
  // Tutti i calcoli stanno qui: i figli ricevono solo numeri e dati pronti.
  const totale = servers.length
  const ok = contaPerStato(servers, "ok")
  const attenzione = contaPerStato(servers, "attenzione")
  const critici = contaPerStato(servers, "critico")
  const offline = contaPerStato(servers, "offline")
  const online = totale - offline   // online = tutti tranne gli offline

  const cercato = "db-01"
  const serverCercato = trovaServer(servers, cercato)

  return (
    <div className="pannello">
      <Intestazione
        nome={sistema.nome}
        aggiornato={sistema.aggiornato}
        online={online}
        totale={totale}
      />
      <Riepilogo
        ok={ok}
        attenzione={attenzione}
        critici={critici}
        offline={offline}
        mediaCpu={cpuMedia(servers)}
        lento={piuLento(servers)}
      />
      <GrigliaServer servers={servers} />
      <ServerInEvidenza cercato={cercato} server={serverCercato} />
      <Avvisi elenco={avvisi} />
    </div>
  )
}

export default App

/*
  DOMANDE DELLA SFIDA "BLACKOUT"

  1) Con sette server nella griglia si vedrebbero ancora solo sei schede: GrigliaServer
     scrive a mano servers[0]...servers[5], quindi il settimo non viene mai disegnato
     (anche se il riepilogo lo conta). Con cinque server servers[5] vale undefined e
     SchedaServer prova a leggere le proprietà di undefined: la pagina diventa bianca
     con un errore in console. Il problema si risolve con map(), settimana 8.

  2) Ha funzionato l'idea della settimana 7 che i componenti sono funzioni che ricevono
     dati tramite props e restituiscono l'interfaccia: i dati scendono da App ai figli
     (flusso unidirezionale) e i figli si limitano a disegnare quello che ricevono.
     Cambiando i dati cambia tutto ciò che ne dipende, senza toccare i componenti.
*/