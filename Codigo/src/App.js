import { useEffect, useState } from "react";
import styled from "styled-components";
import { auth } from "./config/firebase.config";
import { palheta } from "./components/palheta";
import Template from "./components/template";
import CadastroHabito from "./pages/cadastroHabito";
import HomeLogado from "./pages/homeLogado";
import Home from "./pages/home";
import BarraSuperior from "./pages/BarraSuperior";
import { Modal } from "../src/components/Modal";
// const Telas = ["Home", "HomeLogado", "Cadastro de Hábitos", "Template"]

const AppDiv = styled.div`
  min-height: 100vh;
  background-color: ${() => palheta.background};
  display: grid;
  grid-template-rows: auto auto 1fr;
  box-shadow: rgb(195, 202, 208) 5px 8px 10px, rgb(195, 202, 208) -5px 8px 10px;
`;

function App() {
  const [pagina, setPagina] = useState(0);
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showModalEsqueciSenha, setShowModalEsqueciSenha] = useState(false);
  const [showModalAlterarSenha, setShowModalAlterarSenha] = useState(false);

  const [habitoCadastrado, setHabitoCadastrado] = useState(false);
  useEffect(() => {
    const unlisten = auth.onAuthStateChanged((authUser) => {
      authUser ? setUser(authUser) : setUser(null);
    });
    return () => {
      unlisten();
    };
  });

  useEffect(() => {
    user ? setPagina(1) : setPagina(0);
  }, [user]);
  console.log("user", user);

  useEffect(() => {
    if (habitoCadastrado) {
      setPagina(1);
      setHabitoCadastrado(false);
    }
  }, [habitoCadastrado]);

  return (
    <AppDiv>
      <BarraSuperior
        showModal={showModal}
        setShowModal={setShowModal}
        showModalEsqueciSenha={showModalEsqueciSenha}
        setShowModalEsqueciSenha={setShowModalEsqueciSenha}
        showModalAlterarSenha={showModalAlterarSenha}
        setShowModalAlterarSenha={setShowModalAlterarSenha}
        user={user != null ? user.uid : null}
        setPagina={setPagina}
      />
      {pagina === 0 && <Home setShowModal={setShowModal} />}
      {pagina === 1 && (
        <HomeLogado
          user={user != null ? user.uid : null}
          setPagina={setPagina}
        />
      )}
      {pagina === 2 && (
        <CadastroHabito
          user={user}
          setHabitoCadastrado={setHabitoCadastrado}
          setPagina={setPagina}
        />
      )}
      {pagina === 3 && <Template />}
    </AppDiv>
  );
}

export default App;
