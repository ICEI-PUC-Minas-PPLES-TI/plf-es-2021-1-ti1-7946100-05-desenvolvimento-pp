import { useEffect, useState } from "react"
import styled from "styled-components"
import { auth } from "./config/firebase.config"
import { palheta } from "./components/palheta"
import Template from "./components/template"
import CadastroHabito from "./pages/cadastroHabito"
import ListaDehabitos from "./pages/listaDeHabitos"
import Home from "./pages/home"
import BarraSuperior from "./pages/BarraSuperior"
import HistoricoHabitos from "./pages/historicoHabito"
import LoadingPage from "./pages/loadingPage"
import Acompanhamento from "../src/pages/acompanhamento"
import Sobre from '../src/pages/sobre'

const AppDiv = styled.div`
  min-height: 100vh;
  background-color: ${() => palheta.background};
  display: grid;
  grid-template-rows: auto auto 1fr;
  box-shadow: rgb(195, 202, 208) 5px 8px 10px, rgb(195, 202, 208) -5px 8px 10px;
`

function App() {
  const [pagina, setPagina] = useState(0)
  const [user, setUser] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [showModalEsqueciSenha, setShowModalEsqueciSenha] = useState(false)
  const [showModalAlterarSenha, setShowModalAlterarSenha] = useState(false)
  const [habitoSelecionado, setHabitoSelecionado] = useState(null)
  const [isEdit, setIsEdit] = useState(false)
  const [habitoCadastrado, setHabitoCadastrado] = useState(false)
  const [habitoConcluido, setHabitoConcluido] = useState(false)
  const [habitos, setHabitos] = useState([])

  useEffect(() => {
    const unlisten = auth.onAuthStateChanged(authUser => {
      authUser ? setUser(authUser) : setUser(null)
    })
    return () => {
      unlisten()
    }
  })

  useEffect(() => setHabitoConcluido(false), [habitoConcluido])
  useEffect(() => setHabitoCadastrado(false), [habitoConcluido])

  useEffect(() => {
    user ? setPagina(1) : setPagina(0)
  }, [user])

  useEffect(() => {
    if (habitoCadastrado) {
      setPagina(1)
      setHabitoCadastrado(false)
    }
  }, [habitoCadastrado])

  return (
    <AppDiv>
      <LoadingPage />
      <BarraSuperior
        showModal={showModal}
        setShowModal={setShowModal}
        showModalEsqueciSenha={showModalEsqueciSenha}
        setShowModalEsqueciSenha={setShowModalEsqueciSenha}
        showModalAlterarSenha={showModalAlterarSenha}
        setShowModalAlterarSenha={setShowModalAlterarSenha}
        user={user != null ? user.uid : null}
        setPagina={setPagina}
        habitoConcluido={habitoConcluido}
        habitoCadastrado={habitoCadastrado}
        habitos={habitos}
      />
      {pagina === 0 && <Home setShowModal={setShowModal} />}
      {pagina === 1 && (
        <ListaDehabitos
          user={user != null ? user.uid : null}
          setPagina={setPagina}
          setHabitoSelecionado={setHabitoSelecionado}
          setIsEdit={setIsEdit}
          habitoConcluido={habitoConcluido}
          setHabitoConcluido={setHabitoConcluido}
          habitos={habitos}
          setHabitos={setHabitos}
        />
      )}
      {pagina === 2 && (
        <CadastroHabito
          user={user}
          setHabitoCadastrado={setHabitoCadastrado}
          setPagina={setPagina}
          edit={habitoSelecionado}
          isEdit={isEdit}
        />
      )}
      {pagina === 3 && <Template />}
      {pagina === 4 && (
        <HistoricoHabitos
          user={user != null ? user.uid : null}
          habito={habitoSelecionado}
          habitos={habitos}
          setPagina={setPagina}
        />
      )}
      {pagina === 5 && (
        <Acompanhamento
          user={user != null ? user.uid : null}
          setPagina={setPagina}
        />
      )}
      {pagina === 6 && <Sobre />}
    </AppDiv>
  )
}

export default App
