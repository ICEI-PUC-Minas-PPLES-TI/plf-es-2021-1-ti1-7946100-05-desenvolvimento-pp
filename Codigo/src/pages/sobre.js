import styled from "styled-components"
import { palheta } from "../components/palheta"
import * as Template from "../components/template"
import FotoJoao from "../assets/Selection_107.png"
import FotoAna from "../assets/anac.jpg"
import FotoGustavoF from "../assets/gustavof.jpg"
import FotoOctavio from "../assets/octavio.png"
import FotoVitorJ from "../assets/vitorj.jpg"
import FotoVitorX from "../assets/vitorx.jpg"

let animationDelay = ""

for (let i = 0; i < 7; i++) {
  animationDelay += `div:nth-child(${3 + i}) {
    animation-delay: ${0 + i * 0.3}s;
  }`
}

const Container = styled.div`
  background-color: ${() => palheta.background};
  padding: 30px;
  min-height: calc(100vh - 97px);
  width: 100%;
  max-width: 600px;
  margin: auto;
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  box-shadow: ${() => palheta.bodyBoxShadow};
  color: ${() => palheta.text};

  span {
    font-size: 12px;
  }

  img.foto {
    width: 100px;
    border-radius: 50%;
    filter: grayscale(1) drop-shadow(2px 4px 6px black);
    margin: 0px 20px;
  }
  .componente:hover {
    .foto {
      filter: grayscale(0) drop-shadow(2px 4px 6px black);
    }
  }

  div:nth-child(even) {
    text-align: left;
    animation: 1s fadeinfotoleft 0s forwards;
    opacity: 0;
  }
  div:nth-child(odd) {
    text-align: right;
    opacity: 0;
    animation: 1s fadeinfotoright 1s forwards;
  }

  ${animationDelay}

  .componente {
    margin: 10px 0px;

    img {
      width: 100px;
      height: 100px;
      background-color: grey;
      display: inline-block;
      border-radius: 50%;
      margin: 0px 20px;
    }
  }

  @keyframes fadeinfotoleft {
    from {
      opacity: 0;
      margin-left: -50px;
    }
    to {
      opacity: 1;
      margin-left: 0px;
    }
  }

  @keyframes fadeinfotoright {
    from {
      opacity: 0;
      margin-right: -50px;
    }
    to {
      opacity: 1;
      margin-right: 0px;
    }
  }
`

function Sobre() {
  return (
    <Container>
      <Template.Header1 style={{ textAlign: "center" }}>
        GoHabit
      </Template.Header1>
      <p>
        GoHabit é um trabalho da disciplina Trabalho Interdisciplinar:
        Aplicações WEB do primeiro período da faculdade PUM-MG. Os integrantes
        do grupo que desenvolvou a aplicação:
      </p>
      <div className="componente">
        <span>acorina59@gmail.com</span> - Ana Corina
        <img className="foto" src={FotoAna} alt="Ana Corina" />
      </div>
      <div className="componente">
        <img className="foto" alt="Gustavo Ferreira" src={FotoGustavoF} />
        Gustavo Ferreira - <span>gustavoevf@gmail.com</span>
      </div>
      <div className="componente">
        <span>gustavo.cn121@gmail.com</span> - Gustavo Nogueira
        <img className="foto" alt="Gustavo Nogueira" />
      </div>
      <div className="componente">
        <img className="foto" src={FotoJoao} alt="João Ricardo Lemos" />
        João Ricardo Lemos - <span>joaoricardofl@gmail.com</span>
      </div>
      <div className="componente">
        <span>octavio.rocha@sga.pucminas.br</span> - Octávio Rocha
        <img alt="Octávio Rocha" className="foto" src={FotoOctavio} />
      </div>
      <div className="componente">
        <img alt="Vitor José Lara" className="foto" src={FotoVitorJ} />
        Vitor José Lara - <span>vitorjoselara@gmail.com</span>
      </div>
      <div className="componente">
        <span>vitor.sx97@hotmail.com</span> - Vitor Xavier
        <img alt="Vitor Xavier" className="foto" src={FotoVitorX} />
      </div>
    </Container>
  )
}

export default Sobre
