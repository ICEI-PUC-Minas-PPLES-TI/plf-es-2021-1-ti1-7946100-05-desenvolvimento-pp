import { useEffect, useState, useRef } from "react"
import {
  createDoc,
  removeDoc,
  readDocsDuasCondicoes,
  changeDateformat,
} from "../utils/utils"
import * as Template from "../components/template"
import styled from "styled-components"
import { palheta } from "../components/palheta"
import firebase from "firebase/app"
require("firebase/firestore")

const HabitoLinhaStyled = styled.section`
  order: ${props => props.ordem};

  .horario-nome {
    width: calc(600px - 200px);
  }

  .fa-caret-down {
    color: ${palheta.textImportant};
    margin-right: 5px;
    cursor: pointer;
  }

  .habito-info,
  .NewInputs {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
    margin: 10px 0px 5px;
  }

  .NewInputs {
    animation: 0.7s linear 0s newinputs;
  }

  @keyframes newinputs {
    from {
      max-height: 0px;
      opacity: 0;
    }
    to {
      max-height: 20px;
      opacity: 1;
    }
  }

  @media (max-width: 600px) {
    .horario-nome {
      width: calc(100% - 100px);
    }
  }
`

function Habito({
  habitosConcluidos,
  setHabitosConcluidos,
  setAtualizarHabitoLinha,
  setHabitoSelecionado,
  setPagina,
  setIsEdit,
  setFeitoLista,
  concluidoLista,
  concluidoId,
  habitoId,
  user,
  valorLista,
  unidade,
  horario,
  nome,
  emoji,
  ordemLista,
  ambiente,
  meta,
  periodicidade,
  recompensa,
  setHabitoConcluido,
}) {
  const emojiRef = useRef(null)
  const [concluido, setConcluido] = useState(concluidoLista)
  const [ordem, setOrdem] = useState(
    concluidoLista ? ordemLista + 100 : ordemLista
  )
  const [historicoHabitoDoc, setHistoricoHabitoDoc] = useState(concluidoId)
  const [fetchHistorico, setFetchHistorico] = useState(false)
  const [feitoRemover, setFeitoRemover] = useState(false)
  const [valor, setValor] = useState(parseInt(valorLista))
  const [feito, setFeito] = useState(false)
  const [, setErros] = useState("")
  const [historicoConcluido, setHistoricoConcluido] = useState([])
  const [historicoFeito, setHistoricoFeito] = useState(false)
  const [, setHistoricoErros] = useState("")
  const [mostrarMaisOpcoes, setMostrarMaisOpcoes] = useState(false)

  useEffect(() => setConcluido(concluidoLista), [concluidoLista])
  useEffect(() => setHistoricoHabitoDoc(concluidoId),[concluidoId])

  useEffect(() => {
    if (emojiRef.current) emojiRef.current.innerHTML = emoji
  }, [emojiRef, emoji])

  useEffect(() => {
    if (fetchHistorico && historicoHabitoDoc !== "") {
      setFetchHistorico(false)

      let habitosConcluidosAtualizado = []
      habitosConcluidos.forEach(e => {
        habitosConcluidosAtualizado.push(e)
      })
      habitosConcluidosAtualizado.push({
        docId: historicoHabitoDoc,
        habito: habitoId,
      })
      setHabitosConcluidos(habitosConcluidosAtualizado)
      setAtualizarHabitoLinha(true)
    }
  }, [
    historicoHabitoDoc,
    habitoId,
    habitosConcluidos,
    fetchHistorico,
    setAtualizarHabitoLinha,
    setHabitosConcluidos,
  ])

  useEffect(() => {
    if (feitoRemover) {
      let habitosConcluidosAtualizado = []
      habitosConcluidos.forEach(e => {
        if (e.docId !== historicoHabitoDoc) habitosConcluidosAtualizado.push(e)
      })
      setHabitosConcluidos(habitosConcluidosAtualizado)
      setFeitoRemover(false)
      setAtualizarHabitoLinha(true)
    }
  }, [
    feitoRemover,
    habitosConcluidos,
    historicoConcluido,
    setAtualizarHabitoLinha,
    setHabitosConcluidos,
    historicoHabitoDoc,
  ])

  useEffect(() => {
    readDocsDuasCondicoes(
      "historico_habito",
      "user",
      user,
      "habito",
      habitoId,
      setHistoricoConcluido,
      setHistoricoFeito,
      setHistoricoErros
    )
  }, [feito, user, habitoId])

  useEffect(() => {
    let inicio = new Date().setHours(0, 0, 0, 0)
    let flag = true
    let historicoConcluidoOrdenado = historicoConcluido.sort(
      (a, b) => b.data.seconds - a.data.seconds
    )
    let count = 0,
      i = 0

    while (flag) {
      if (
        historicoConcluidoOrdenado.length > 0 &&
        historicoConcluidoOrdenado[i].data.toDate() < inicio + 86400000 &&
        historicoConcluidoOrdenado[i].data.toDate() > inicio
      ) {
        count++
        inicio -= 86400000
        i++
        if (i === historicoConcluidoOrdenado.length) flag = false
      } else {
        flag = false
      }
    }
    let habitosConcluidosAtualizado = []
    habitosConcluidos.forEach(e => {
      habitosConcluidosAtualizado.push(e)
      if (e.habito === habitoId) e.streak = count
    })
    setHabitosConcluidos(habitosConcluidosAtualizado)
    setHistoricoFeito(false)
  }, [historicoFeito, setHabitosConcluidos, historicoConcluido, habitoId])

  return (
    <HabitoLinhaStyled
      ordem={ordem}
      className={"Habito" + (concluido ? " HabitoConcluido" : "")}
    >
      <Template.Emoji ref={emojiRef} className="Emoji">
        {emoji}
      </Template.Emoji>

      <Template.TextoDestaque className="horario-nome">
        <div>
          <div className="habito-info">
            <span className="Horario">
              {typeof horario === "string"
                ? horario
                : changeDateformat(horario)}
            </span>
            <span className="NomeHabito">{nome}</span>
            <i
              className="fas fa-caret-down"
              onClick={() => setMostrarMaisOpcoes(!mostrarMaisOpcoes)}
            />
          </div>
          {mostrarMaisOpcoes && (
            <div className="NewInputs">
              <i
                className="fa fa-minus"
                onClick={() => setValor(valor - 1)}
              ></i>
              {valor} {unidade}
              <i className="fa fa-plus" onClick={() => setValor(valor + 1)}></i>
              <i
                className="fa fa-history"
                onClick={() => {
                  setHabitoSelecionado({
                    nome: nome,
                    habitoId: habitoId,
                    emoji: emoji,
                    unidade: unidade,
                    valor: parseInt(valorLista),
                  })
                  setPagina(4)
                }}
              ></i>
              <i
                onClick={() => {
                  setHabitoSelecionado({
                    nome: nome,
                    habitoId: habitoId,
                    ambiente: ambiente,
                    meta: meta,
                    emoji: emoji,
                    unidade: unidade,
                    periodicidade: periodicidade,
                    horario: horario,
                    recompensa: recompensa,
                    user: user,
                    docId: habitoId,
                  })
                  setIsEdit(true)
                  setPagina(2)
                }}
                className="fa fa-pen"
              ></i>
              <i
                onClick={() => {
                  if (window.confirm("Voc?? deseja remover este h??bito?"))
                    removeDoc("habitos", habitoId, setFeitoLista, setErros)
                }}
                className="fa fa-trash"
              ></i>
            </div>
          )}
        </div>
      </Template.TextoDestaque>
      <Template.Button
        className="CheckButton"
        id="btnCheck"
        disabled={fetchHistorico}
        onClick={() => {
          setConcluido(!concluido)
          setOrdem(ordem > 100 ? ordem - 100 : 100 + ordem)
          if (!concluido) {
            // setHabitoConcluido(habitoId)
            let doc = {
              data: firebase.firestore.Timestamp.fromDate(new Date()),
              habito: habitoId,
              quantidade: valor,
              user: user,
            }
            setFetchHistorico(true)
            createDoc(
              "historico_habito",
              doc,
              setFeito,
              setErros,
              setHistoricoHabitoDoc
            )
            setHabitoConcluido(true)
          } else {
            removeDoc(
              "historico_habito",
              historicoHabitoDoc,
              setFeitoRemover,
              setErros
            )
          }
        }}
      >
        <i className="fa fa-check" style={{ fontSize: "24px" }}></i>
      </Template.Button>
    </HabitoLinhaStyled>
  )
}

export default Habito
