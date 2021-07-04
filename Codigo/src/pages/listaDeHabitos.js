import { useEffect, useState, useRef } from "react"
import styled from "styled-components"
import { palheta } from "../components/palheta"
import * as Template from "../components/template"
import Habito from "./habito"
import {
  readDocsUmaCondicao,
  readDocsDuasCondicoesData,
  getHourMinuteFromString,
  getHourAndMinuteFromFirebaseDate,
} from "../utils/utils"

let animationDelay = ""

for (let i = 0; i < 15; i++) {
  animationDelay += `
  .Habito.HabitoConcluido:nth-child(${i + 1}) {
    animation-delay: ${0 + i * 0.2}s;
  }
  .Habito:not(.HabitoConcluido):nth-child(${i + 1}) {
    animation-delay: ${0 + i * 0.2}s;
  }
  `
}

export const BodyPage = styled.div`
  ${props =>
    props.terminouAnimacao
      ? `
      min-height: calc(100vh - 115px);
      height: 100%;`
      : `
      height: 10px;
      overflow: hidden;`}
  background-color: ${palheta.background};
  padding: 10px 30px 5px;
  max-width: 600px;

  margin: auto;
  box-shadow: ${palheta.bodyBoxShadow};

  @keyframes fadeinTop {
    from {
      opacity: 0;
      margin-right: -50px;
    }
    to {
      opacity: 1;
      margin-right: 0px;
    }
  }

  @keyframes fadeinTopConcluido {
    from {
      opacity: 0;
      margin-right: -50px;
    }
    to {
      opacity: 0.3;
      margin-right: 0px;
    }
  }

  main {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
  }

  .Habitos {
    display: flex;
    flex-direction: column;
    margin-top: 10px;
  }

  ${animationDelay}

  .Habito {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 35px;
    animation: 1s fadeinTop 0s forwards;
    opacity: 0;
  }

  .Habito.HabitoConcluido {
    animation: 1s fadeinTopConcluido 0s forwards;
  }

  .HabitoConcluido {
    opacity: 0;
    transition-duration: 0.5s;
    .CheckButton {
      box-shadow: 2px 2px 5px #c3cad0, -2px -2px 5px #ffffff;
    }
  }

  .EmojiHorario {
    margin-bottom: -10px;
    display: flex;
    align-items: center;
  }

  .Emoji {
    margin-left: 0px;
  }

  .Horario {
    font-size: 20px;
    font-weight: normal;
  }

  .NomeHabito {
    font-size: 24px;
    text-align: center;
    margin-bottom: 8px;
  }

  .Contador {
    margin-top: 12px;
  }

  .fa {
    margin: 0 10px;
    cursor: pointer;
  }

  .CheckButton {
    height: 32px;
    width: 32px;
    margin: 0;
    margin-left: 10px;
    padding: 4px;
  }

  .CheckButton .fa {
    margin: 0px;
  }

  .Headers {
    margin-top: 20px;
    text-align: center;
  }

  .End {
    margin: 30px;
  }

  .ProgressoCard {
    padding: 24px;
    padding-bottom: 32px;
  }

  .ProgressoTitulo {
    color: ${palheta.text};
    padding-bottom: 4px;
    text-align: right;
    font-size: 20px;
  }

  .Progresso {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .EmojisConcluidos {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 16px;
    flex-wrap: wrap;
  }

  .EmojiStreak {
    background: ${palheta.background};
    box-shadow: ${palheta.boxDropShadow};
    border-radius: 25px;
    width: 80px;
    height: 42px;
    margin: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 3px 3px 3px 5px;
    font-size: 20px;
    color: ${palheta.text};
  }

  .EmojiConcluido {
    margin-right: 4px;
  }

  .FireStreak {
    margin-left: 4px;
    font-size: 14px;
    font-weight: bold;
  }

  .Submit {
    display: flex;
    justify-content: space-between;
    margin: 15px 0px 15px;
  }

  h2,
  button {
    margin: 0px;
  }

  @media (max-width: 440px) {
    padding: 20px;

    .EmojiHorario {
      display: grid;
      place-items: center;
    }

    .Emoji {
      margin-right: 5px;
    }

    .fa {
      margin: 0 8px;
    }

    .CheckButton {
      margin-right: 0px;
      margin-left: 4px;
    }
  }
`

function EmojiOnBar({ emoji, streak }) {
  const emojiRef = useRef(null)

  useEffect(() => {
    if (emojiRef.current) emojiRef.current.innerHTML = emoji
  }, [emojiRef, emoji])

  return (
    <div className="EmojiStreak">
      <div className="EmojiConcluido" ref={emojiRef}>
        {emoji}
      </div>
      <span className="FireStreak">
        {streak > 0 ? streak : 1} <i className="fas fa-fire-alt "></i>
      </span>
    </div>
  )
}

function EmojiList(props) {
  return props.habitos.map((e, i) => (
    <EmojiOnBar key={i} emoji={e.emoji} streak={e.streak ?? 0} />
  ))
}

function atualizarHabitosComConcluidos(
  habitos,
  habitosConcluidos,
  setHabitos,
  setCarregarHabitos
) {
  let habitosAtualizados = []
  let habitoFoiConcluido

  habitos.forEach(f => {
    habitoFoiConcluido = false
    habitosConcluidos.forEach(e => {
      if (f.docId === e.habito && !habitoFoiConcluido) {
        habitoFoiConcluido = true
        if (e.streak > 0) {
          habitosAtualizados.push({
            ...f,
            concluido: true,
            quantidade: e.quantidade,
            concluidoId: e.docId,
            streak: e.streak,
          })
        } else {
          habitosAtualizados.push({
            ...f,
            concluido: true,
            quantidade: e.quantidade,
            concluidoId: e.docId,
          })
        }
      }
    })
    if (!habitoFoiConcluido) {
      if (f.concluido) f.concluido = false
      habitosAtualizados.push(f)
    }
  })
  setHabitos(habitosAtualizados)
  setCarregarHabitos(true)
}

function ListaDehabitos({
  user,
  setPagina,
  setHabitoSelecionado,
  setIsEdit,
  habitoConcluido,
  setHabitoConcluido,
  habitos,
  setHabitos,
  terminouAnimacao,
}) {
  const [feitoLerHabito, setFeitoLerHabitos] = useState(false)
  const [feitoLerHistorico, setFeitoLerHistorico] = useState(false)
  const [carregarHabitos, setCarregarHabitos] = useState(false)
  const [, setErros] = useState([])
  const [habitosConcluidos, setHabitosConcluidos] = useState([])
  const [atualizarHabitoLinha, setAtualizarHabitoLinha] = useState(false)
  const [, setFeito] = useState(false)
  const [feitoremover, setFeitoremover] = useState(false)
  const [hoje] = useState(
    new Date()
      .toLocaleDateString("pt-BR", {
        weekday: "short",
        month: "short",
        day: "2-digit",
      })
      .replace(".", "")
  )

  useEffect(() => {
    readDocsUmaCondicao(
      "habitos",
      "user",
      user,
      setHabitos,
      setFeitoLerHabitos,
      setErros
    )

    let dateA = new Date()

    let data = new Date(
      dateA.getFullYear(),
      dateA.getMonth(),
      dateA.getDate(),
      0,
      0,
      0
    )

    readDocsDuasCondicoesData(
      "historico_habito",
      "user",
      user,
      "data",
      data,
      setHabitosConcluidos,
      setFeitoLerHistorico,
      setErros
    )
  }, [user])

  useEffect(() => {
    if (feitoLerHabito && feitoLerHistorico) {
      atualizarHabitosComConcluidos(
        habitos,
        habitosConcluidos,
        setHabitos,
        setCarregarHabitos
      )
    }
  }, [feitoLerHistorico, feitoLerHabito])

  useEffect(() => {
    atualizarHabitosComConcluidos(
      habitos,
      habitosConcluidos,
      setHabitos,
      setCarregarHabitos
    )
    if (atualizarHabitoLinha) {
      setAtualizarHabitoLinha(false)
    }
  }, [atualizarHabitoLinha, JSON.stringify(habitosConcluidos)])

  useEffect(() => {
    if (feitoremover) {
      readDocsUmaCondicao(
        "habitos",
        "user",
        user,
        setHabitos,
        setFeito,
        setErros
      )
      setFeitoremover(false)
    }
  }, [feitoremover, user])

  return (
    <BodyPage className="container" terminouAnimacao={terminouAnimacao}>
      <main>
        <section>
          <Template.Header1 className="Headers">
            Hábitos de Hoje
          </Template.Header1>

          <div className="Submit">
            <Template.Header2 style={{ paddingTop: "12px" }}>
              {hoje.toString()}
            </Template.Header2>
            <Template.Button
              className="Button"
              onClick={() => {
                setIsEdit(false)
                setPagina(2)
              }}
            >
              + Criar hábito
            </Template.Button>
          </div>
        </section>
        {!carregarHabitos && (
          <Template.Body style={{ textAlign: "center" }}>
            <div className="text-center">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          </Template.Body>
        )}

        {carregarHabitos && habitos.length === 0 && (
          <Template.Body style={{ textAlign: "center" }}>
            Ainda não tem nenhum hábito cadastrado 🙄
          </Template.Body>
        )}

        {carregarHabitos && habitos.length > 0 && (
          <div className="Habitos">
            {habitos
              .sort((a, b) =>
                (typeof a["horario"] === "string"
                  ? getHourMinuteFromString(a["horario"])
                  : getHourAndMinuteFromFirebaseDate(
                      a["horário"] ?? a["horario"]
                    )) <
                (typeof b["horario"] === "string"
                  ? getHourMinuteFromString(b["horario"])
                  : getHourAndMinuteFromFirebaseDate(
                      b["horário"] ?? b["horario"]
                    ))
                  ? -1
                  : +1
              )
              .map((e, i) => (
                <Habito
                  habitosConcluidos={habitosConcluidos}
                  setHabitosConcluidos={setHabitosConcluidos}
                  setAtualizarHabitoLinha={setAtualizarHabitoLinha}
                  setHabitoSelecionado={setHabitoSelecionado}
                  setPagina={setPagina}
                  setIsEdit={setIsEdit}
                  setFeitoLista={setFeitoremover}
                  concluidoLista={e.concluido ?? false}
                  concluidoId={e.concluidoId ?? ""}
                  habitoId={e.docId}
                  user={user}
                  key={i}
                  valorLista={e.meta}
                  unidade={e.unidade}
                  horario={e["horario"] ?? e["horário"]}
                  nome={e.nome}
                  emoji={e.emoji}
                  ordemLista={i + 1}
                  ambiente={e.ambiente}
                  meta={e.meta}
                  periodicidade={e.periodicidade}
                  recompensa={e.recompensa}
                  setHabitoConcluido={setHabitoConcluido}
                />
              ))}
          </div>
        )}

        <section className="End">
          {carregarHabitos && habitos.length > 0 && (
            <div className="ProgressoCard">
              {/* <h3 className="ProgressoDia"></h3> */}
              <h4 className="ProgressoTitulo">
                {Math.round((habitosConcluidos.length / habitos.length) * 100)}{" "}
                % Completo
              </h4>
              <div className="Progresso">
                <Template.BarraDeProgressoVazia>
                  <Template.BarraDeProgressoCompleta
                    //Alterar parâmetro de progresso da Barra
                    valor={(habitosConcluidos.length / habitos.length) * 100}
                  ></Template.BarraDeProgressoCompleta>
                </Template.BarraDeProgressoVazia>
              </div>
              <div className="EmojisConcluidos">
                <EmojiList habitos={habitos.filter(e => e.concluido)} />
              </div>
            </div>
          )}
        </section>
      </main>
    </BodyPage>
  )
}

export default ListaDehabitos
