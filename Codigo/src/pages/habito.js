import { useEffect, useState, useRef } from "react"
import { createDoc, removeDoc, readDocsDuasCondicoes, changeDateformat } from "../utils/utils"
import * as Template from "../components/template"
import styled from "styled-components"
import firebase from "firebase/app"
require("firebase/firestore")

const HabitoLinhaStyled = styled.section`
  order: ${props => props.ordem};
`

function Habito(props) {
  const emojiRef = useRef(null)
  const [concluido, setConcluido] = useState(props.concluido)
  const [ordem, setOrdem] = useState(
    props.concluido ? props.ordem + 100 : props.ordem
  )
  const [historicoHabitoDoc, setHistoricoHabitoDoc] = useState(
    props.concluidoId
  )
  const [fetchHistorico, setFetchHistorico] = useState(false)
  const [feitoRemover, setFeitoRemover] = useState(false)
  const [valor, setValor] = useState(parseInt(props.valor))
  const [feito, setFeito] = useState(false)
  const [erros, setErros] = useState("")
  const [historicoConcluido, setHistoricoConcluido] = useState([])
  const [historicoFeito, setHistoricoFeito] = useState(false)
  const [historicoErros, setHistoricoErros] = useState("")

  useEffect(() => {
    if (emojiRef.current) emojiRef.current.innerHTML = props.emoji
  }, [emojiRef])

  useEffect(() => {
    if (fetchHistorico && historicoHabitoDoc !== "") {
      setFetchHistorico(false)

      let habitosConcluidosAtualizado = []
      props.habitosConcluidos.map(e => {
        habitosConcluidosAtualizado.push(e)
      })
      habitosConcluidosAtualizado.push({
        docId: historicoHabitoDoc,
        habito: props.habitoId,
      })
      props.setHabitosConcluidos(habitosConcluidosAtualizado)
      props.setAtualizarHabitoLinha(true)
    }
  }, [historicoHabitoDoc])

  useEffect(() => {
    if (feitoRemover) {
      let habitosConcluidosAtualizado = []
      props.habitosConcluidos.map(e => {
        if (e.docId !== historicoHabitoDoc) habitosConcluidosAtualizado.push(e)
      })
      props.setHabitosConcluidos(habitosConcluidosAtualizado)
      setFeitoRemover(false)
      props.setAtualizarHabitoLinha(true)
    }
  }, [feitoRemover])

  useEffect(() => {
    readDocsDuasCondicoes(
      "historico_habito",
      "user",
      props.user,
      "habito",
      props.habitoId,
      setHistoricoConcluido,
      setHistoricoFeito,
      setHistoricoErros
    )
  }, [feito])

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
    props.habitosConcluidos.map(e => {
      habitosConcluidosAtualizado.push(e)
      if (e.habito === props.habitoId) e.streak = count
    })
    props.setHabitosConcluidos(habitosConcluidosAtualizado)
    setHistoricoFeito(false)
  }, [historicoFeito])

  return (
    <HabitoLinhaStyled
      ordem={ordem}
      className={"Habito" + (concluido ? " HabitoConcluido" : "")}
    >
      <div className="EmojiHorario">
        <Template.Emoji ref={emojiRef} className="Emoji">
          {props.emoji}
        </Template.Emoji>
        <Template.TextoDestaque>
          <span className="Horario">
            {typeof props.horario === "string"
              ? props.horario
              : changeDateformat(props.horario)}
          </span>
        </Template.TextoDestaque>
      </div>
      <div className="NewInputs">
        <div className="CardHabito">
          <Template.TextoDestaque>
            <div className="NomeHabito">{props.nome}</div>
          </Template.TextoDestaque>
          <div className="Contador">
            <Template.TextoDestaque>
              <i
                className="fa fa-minus"
                onClick={() => setValor(valor - 1)}
              ></i>
              {valor} {props.unidade}
              <i className="fa fa-plus" onClick={() => setValor(valor + 1)}></i>
              <i
                className="fa fa-history"
                onClick={() => {
                  props.setHabitoSelecionado({
                    nome: props.nome,
                    habitoId: props.habitoId,
                    emoji: props.emoji,
                    unidade: props.unidade,
                    valor: parseInt(props.valor),
                  })
                  props.setPagina(4)
                }}
              ></i>
              <i
                onClick={() => {
                  props.setHabitoSelecionado({
                    nome: props.nome,
                    habitoId: props.habitoId,
                    ambiente: props.ambiente,
                    meta: props.meta,
                    emoji: props.emoji,
                    unidade: props.unidade,
                    periodicidade: props.periodicidade,
                    horario: props.horario,
                    recompensa: props.recompensa,
                    user: props.user,
                    docId: props.habitoId,
                  })
                  props.setIsEdit(true)
                  props.setPagina(2)
                }}
                className="fa fa-pen"
              ></i>
              <i
                onClick={() => {
                  if (window.confirm("Você deseja remover este hábito?"))
                    removeDoc(
                      "habitos",
                      props.habitoId,
                      props.setFeito,
                      setErros
                    )
                }}
                className="fa fa-trash"
              ></i>
            </Template.TextoDestaque>
          </div>
        </div>
      </div>
      <Template.Button
        className="CheckButton"
        id="btnCheck"
        disabled={fetchHistorico}
        onClick={() => {
          setConcluido(!concluido)
          setOrdem(ordem > 100 ? ordem - 100 : 100 + ordem)
          if (!concluido) {
            // props.setHabitoConcluido(props.habitoId)
            let doc = {
              data: firebase.firestore.Timestamp.fromDate(new Date()),
              habito: props.habitoId,
              quantidade: valor,
              user: props.user,
            }
            setFetchHistorico(true)
            createDoc(
              "historico_habito",
              doc,
              setFeito,
              setErros,
              setHistoricoHabitoDoc
            )
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
