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


export const BodyPage = styled.div`
  background-color: ${() => palheta.background};
  padding: 30px;
  min-height: calc(100vh - 96px);
  max-width: 600px;
  height: 100%;
  margin: auto;
  box-shadow: ${() => palheta.bodyBoxShadow};

  main {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
  }

  .Habitos {
    display: flex;
    flex-direction: column;
  }

  .Habito {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 30px;
    margin-bottom: 30px;
  }
  //Concluir Hábito -> Deixar transparente
  .HabitoConcluido {
    opacity: 0.3;
    transition-duration: 0.5s;
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

  .NewInputs {
    margin: 5px;
    display: flex;
    flex-direction: row;
  }

  .NomeHabito {
    font-size: 24px;
    text-align: center;
    margin-bottom: 8px;
  }

  .CardHabito {
    margin: 2px;
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
    color: ${() => palheta.text};
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
  }

  .EmojiStreak {
    background: ${() => palheta.background};
    box-shadow: ${() => palheta.boxDropShadow};
    border-radius: 25px;
    width: 80px;
    height: 42px;
    margin: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 3px 3px 3px 5px;
    font-size: 20px;
    color: ${() => palheta.text};
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
    display: grid;
    place-items: center;
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

function EmojiOnBar(props) {
  const emojiRef = useRef(null)
  useEffect(() => {
    if (emojiRef.current) emojiRef.current.innerHTML = props.emoji
  }, [emojiRef, props.emoji])
  console.log(props.emoji, props.streak)
  return (
    <div className="EmojiStreak">
      <div className="EmojiConcluido" ref={emojiRef} key={props.key}>
        {props.emoji}
      </div>
      <span className="FireStreak">
        {props.streak > 0 && props.streak} <i className="fas fa-fire-alt "></i>
      </span>
    </div>
  )
}

function EmojiList(props) {
  return props.habitos.map((e, i) => (
    <EmojiOnBar key={i} emoji={e.emoji} streak={e.streak ?? 0} />
  ))
}

function ListaDehabitos(props) {
  const [feitoLerHabito, setFeitoLerHabitos] = useState(false)
  const [feitoLerHistorico, setFeitoLerHistorico] = useState(false)
  const [carregarHabitos, setCarregarHabitos] = useState(false)
  const [, setErros] = useState([])
  const [habitosConcluidos, setHabitosConcluidos] = useState([])
  const [habitos, setHabitos] = useState([])
  const [atualizarHabitoLinha, setAtualizarHabitoLinha] = useState(false)
  const [feito, setFeito] = useState(false)
  const [feitoremover, setFeitoremover] = useState(false)

  function atualizarHabitosComCocluidos() {
    let habitosAtualizados = []
    let habitoFoiConcluido
    habitos.map(f => {
      habitoFoiConcluido = false
      habitosConcluidos.map(e => {
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
        let atualizarHabito = f
        if (f.concluido) f.concluido = false
        habitosAtualizados.push(f)
      }
    })
    setHabitos(habitosAtualizados)
    setCarregarHabitos(true)
  }

  useEffect(() => {
    readDocsUmaCondicao(
      "habitos",
      "user",
      props.user,
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
      props.user,
      "data",
      data,
      setHabitosConcluidos,
      setFeitoLerHistorico,
      setErros
    )
  }, [])

  useEffect(() => {
    if (feitoLerHabito && feitoLerHistorico) {
      atualizarHabitosComCocluidos()
    }
  }, [habitosConcluidos, feitoLerHistorico, feitoLerHabito])

  useEffect(() => {
    if (atualizarHabitoLinha) {
      atualizarHabitosComCocluidos()
      setAtualizarHabitoLinha(false)
    }
  }, [atualizarHabitoLinha])

  useEffect(() => {
    if (feitoremover) {
      readDocsUmaCondicao(
        "habitos",
        "user",
        props.user,
        setHabitos,
        setFeito,
        setErros
      )
      setFeitoremover(false)
    }
  }, [feitoremover])
  return (
    <BodyPage className="container">
      <main>
        <Template.Header1 className="Headers">Hábitos de Hoje</Template.Header1>

        {!carregarHabitos && (
          <Template.Body style={{ textAlign: "center" }}>
            <div class="text-center">
              <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
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
                  setHabitoSelecionado={props.setHabitoSelecionado}
                  setPagina={props.setPagina}
                  setIsEdit={props.setIsEdit}
                  setFeito={setFeitoremover}
                  concluido={e.concluido ?? false}
                  concluidoId={e.concluidoId ?? ""}
                  habitoId={e.docId}
                  user={props.user}
                  key={i}
                  valor={e.meta}
                  unidade={e.unidade}
                  horario={e["horario"] ?? e["horário"]}
                  nome={e.nome}
                  emoji={e.emoji}
                  ordem={i + 1}
                  ambiente={e.ambiente}
                  meta={e.meta}
                  periodicidade={e.periodicidade}
                  recompensa={e.recompensa}
                />
              ))}
          </div>
        )}

        <section className="End">
          {carregarHabitos && habitos.length > 0 && (
            <div className="ProgressoCard">
              <h3 className="ProgressoDia"></h3>
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
          <div className="Submit">
            <Template.Button
              className="Button"
              onClick={() => {
                props.setIsEdit(false)
                props.setPagina(2)
              }}
            >
              Adicionar Hábito
            </Template.Button>
          </div>
        </section>
      </main>
    </BodyPage>
  )
}

export default ListaDehabitos
