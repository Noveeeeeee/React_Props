import "./App.css"
import { sistema, servers, avvisi } from "./dati"
import { contaPerStato, cpuMedia, piuLento, trovaServer } from "./calcoli"
import Intestazione from "./Intestazione"
import Riepilogo from "./Riepilogo"
import GrigliaServer from "./GrigliaServer"
import ServerInEvidenza from "./ServerInEvidenza"
import Avvisi from "./Avvisi"

function App() {
  
  const totale = servers.length
  const ok = contaPerStato(servers, "ok")
  const attenzione = contaPerStato(servers, "attenzione")
  const critici = contaPerStato(servers, "critico")
  const offline = contaPerStato(servers, "offline")
  const online = totale - offline 

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
