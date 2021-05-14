import styled from "styled-components";
import { palheta } from "../components/palheta";
import * as Template from "../components/template";
import graficoExemplo from "../assets/graficoExemplo.svg";

export const BodyPage = styled.div`
  background-color: ${() => palheta.background};
  padding: 20px;
  padding-left: 32px;
  min-height: 100%;
  max-width: 600px;
  margin: auto;
  box-shadow: ${() => palheta.bodyBoxShadow};

  .BlocoConteudo {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px 0px 30px;
    flex-wrap: wrap;
  }

  .Button {
    margin: 10px;
    padding: 5px;
  }

  .TextoDestaque {
    margin: 10px;
  }

  .ImgCard {
    height: 80px;
    width: auto;
    object-fit: fill;
  }

  .Link {
    display: grid;
    place-items: center;
  }
`;

export const Navbar = styled.nav`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 40px;
  justify-content: center;
  align-items: center;
`;

export const Img = styled.img`
  object-fit: cover;
  height: 100px;
  width: auto;
`;

function Home(props) {
  // const [erros, setErros] = useState("");

  return (
    <BodyPage className="container">
      <main>
        <Template.Header1 style={{ textAlign: "center" }}>
          Como funciona?
        </Template.Header1>
        <Template.Header2>1 - Cadastre um hábito</Template.Header2>

        <Template.Body>
          Cadastre hábitos pequenos, que se tornarão em precessos, e vão
          construir uma nova identidade
        </Template.Body>
        <div className="BlocoConteudo">
          <Template.Emoji>🏃🏻‍♂️</Template.Emoji>
          <div className="TextoDestaque">
            <Template.TextoDestaque>Correr</Template.TextoDestaque>
          </div>
        </div>
        <Template.Header2>2 - Acompanhe os hábitos</Template.Header2>
        <Template.Body>
          Veja uma lista atualizada diariamente com os hábitos a serem feitos
        </Template.Body>
        <div className="BlocoConteudo">
          <div className="TextoDestaque">
            <Template.TextoDestaque>
              Correr 5km 2 vezes por semana
            </Template.TextoDestaque>
          </div>
          <div className="TextoDestaque">
            <Template.TextoDestaque>
              Ler 10 páginas por dia
            </Template.TextoDestaque>
          </div>
        </div>
        <Template.Header2>3 - Veja o seu progresso</Template.Header2>
        <Template.Body>
          Tenha o seu desenvolvimento registrado e acessível a qualquer momento
        </Template.Body>
        <div className="BlocoConteudo">
          <Template.Card style={{ marginTop: "20px" }}>
            <img alt="Exemplo" className="ImgCard" src={graficoExemplo} />
          </Template.Card>
        </div>
        <div className="BlocoConteudo">
          <Template.Button onClick={() => props.setShowModal(true)}>
            Quero me Cadastrar!
          </Template.Button>
        </div>
        <div className="Link">
          <Template.Link onClick={() => props.setPagina(3)}>
            Template
          </Template.Link>
        </div>
      </main>
    </BodyPage>
  );
}

export default Home;
