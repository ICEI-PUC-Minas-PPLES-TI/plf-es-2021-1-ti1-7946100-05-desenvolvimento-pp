import { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { palheta } from '../components/palheta';
import * as Template from '../components/template';
import {
  readDocsUmaCondicao,
  createDoc,
  removeDoc,
  readDocsDuasCondicoesData,
  readDocsDuasCondicoes,
} from '../utils/utils';
import firebase from 'firebase/app';
require('firebase/firestore');

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

    .End {
    }
  }
`;

export const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
`;

// Passar habito Concluido pro último lugar da lista:
const HabitoLinhaStyled = styled.section`
  order: ${(props) => props.ordem};
`;

const changeDateformat = (data) => {
  let hour = data?.toDate().getHours() ?? 0;
  hour = hour < 10 ? '0' + hour : hour;
  let minute = data?.toDate().getMinutes() ?? 0;
  minute = minute < 10 ? '0' + minute : minute;
  return hour + ':' + minute;
};

const getHourAndMinuteFromFirebaseDate = (data) => {
  let hourInMinutes = (data?.toDate()?.getHours() ?? 0) * 60;
  let minute = data?.toDate()?.getMinutes() ?? 0;
  return hourInMinutes + minute;
};

const getHourMinuteFromString = (hour) => {
  let hourInMinutes = Number(hour.substring(0, 2)) * 60;
  let minute = Number(hour.substring(3, 5));
  return hourInMinutes + minute;
};

function HabitoLinha(props) {
  const emojiRef = useRef(null);
  const [concluido, setConcluido] = useState(props.concluido);
  // Passar habito Concluido pro último lugar da lista:

  const [ordem, setOrdem] = useState(
    props.concluido ? props.ordem + 100 : props.ordem
  );
  const [historicoHabitoDoc, setHistoricoHabitoDoc] = useState(
    props.concluidoId
  );
  const [fetchHistorico, setFetchHistorico] = useState(false);
  const [feitoRemover, setFeitoRemover] = useState(false);
  const [valor, setValor] = useState(parseInt(props.valor));
  const [feito, setFeito] = useState(false);
  const [erros, setErros] = useState('');
  const [historicoConcluido, setHistoricoConcluido] = useState([]);
  const [historicoFeito, setHistoricoFeito] = useState(false);
  const [historicoErros, setHistoricoErros] = useState('');

  useEffect(() => {
    if (emojiRef.current) emojiRef.current.innerHTML = props.emoji;
  }, [emojiRef]);

  useEffect(() => {
    if (fetchHistorico && historicoHabitoDoc !== '') {
      setFetchHistorico(false);

      let habitosConcluidosAtualizado = [];
      props.habitosConcluidos.map((e) => {
        habitosConcluidosAtualizado.push(e);
      });
      habitosConcluidosAtualizado.push({
        docId: historicoHabitoDoc,
        habito: props.habitoId,
      });
      props.setHabitosConcluidos(habitosConcluidosAtualizado);
      props.setAtualizarHabitoLinha(true);
    }
  }, [historicoHabitoDoc]);

  useEffect(() => {
    if (feitoRemover) {
      let habitosConcluidosAtualizado = [];
      props.habitosConcluidos.map((e) => {
        if (e.docId !== historicoHabitoDoc) habitosConcluidosAtualizado.push(e);
      });
      props.setHabitosConcluidos(habitosConcluidosAtualizado);
      setFeitoRemover(false);
      props.setAtualizarHabitoLinha(true);
    }
  }, [feitoRemover]);

  useEffect(() => {
    readDocsDuasCondicoes(
      'historico_habito',
      'user',
      props.user,
      'habito',
      props.habitoId,
      setHistoricoConcluido,
      setHistoricoFeito,
      setHistoricoErros
    );
  }, [feito]);

  useEffect(() => {
    let inicio = new Date().setHours(0, 0, 0, 0);
    let flag = true;
    let historicoConcluidoOrdenado = historicoConcluido.sort(
      (a, b) => b.data.seconds - a.data.seconds
    );
    let count = 0,
      i = 0;

    while (flag) {
      if (
        historicoConcluidoOrdenado.length > 0 &&
        historicoConcluidoOrdenado[i].data.toDate() < inicio + 86400000 &&
        historicoConcluidoOrdenado[i].data.toDate() > inicio
      ) {
        count++;
        inicio -= 86400000;
        i++;
        if (i === historicoConcluidoOrdenado.length) flag = false;
      } else {
        flag = false;
      }
    }
    let habitosConcluidosAtualizado = [];
    props.habitosConcluidos.map((e) => {
      habitosConcluidosAtualizado.push(e);
      if (e.habito === props.habitoId) e.streak = count;
    });
    props.setHabitosConcluidos(habitosConcluidosAtualizado);
    setHistoricoFeito(false);
  }, [historicoFeito]);

  return (
    <HabitoLinhaStyled
      ordem={ordem}
      // Fazer Efeito de Transparência:
      className={'Habito' + (concluido ? ' HabitoConcluido' : '')}
    >
      <div className="EmojiHorario">
        <Template.Emoji ref={emojiRef} className="Emoji">
          {props.emoji}
        </Template.Emoji>
        <Template.TextoDestaque>
          <span className="Horario">
            {typeof props.horario === 'string'
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
                  });
                  props.setPagina(4);
                }}
              ></i>
              <i
                onClick={() => {
                  if (window.confirm('Você deseja remover este hábito?'))
                    removeDoc(
                      'habitos',
                      props.habitoId,
                      props.setFeito,
                      setErros
                    );
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
          setConcluido(!concluido);
          setOrdem(ordem > 100 ? ordem - 100 : 100 + ordem);
          if (!concluido) {
            // props.setHabitoConcluido(props.habitoId)
            let doc = {
              data: firebase.firestore.Timestamp.fromDate(new Date()),
              habito: props.habitoId,
              quantidade: valor,
              user: props.user,
            };
            setFetchHistorico(true);
            createDoc(
              'historico_habito',
              doc,
              setFeito,
              setErros,
              setHistoricoHabitoDoc
            );
          } else {
            removeDoc(
              'historico_habito',
              historicoHabitoDoc,
              setFeitoRemover,
              setErros
            );
          }
        }}
      >
        <i className="fa fa-check" style={{ fontSize: '24px' }}></i>
      </Template.Button>
    </HabitoLinhaStyled>
  );
}

function EmojiOnBar(props) {
  const emojiRef = useRef(null);
  useEffect(() => {
    if (emojiRef.current) emojiRef.current.innerHTML = props.emoji;
  }, [emojiRef, props.emoji]);
  console.log(props.emoji, props.streak);
  return (
    <div className="EmojiStreak">
      <div className="EmojiConcluido" ref={emojiRef} key={props.key}>
        {props.emoji}
      </div>
      <span className="FireStreak">
        {props.streak > 0 && props.streak} <i className="fas fa-fire-alt "></i>
      </span>
    </div>
  );
}

function EmojiList(props) {
  return props.habitos.map((e, i) => (
    <EmojiOnBar key={i} emoji={e.emoji} streak={e.streak ?? 0} />
  ));
}

function HomeLogado(props) {
  const [feitoLerHabito, setFeitoLerHabitos] = useState(false);
  const [feitoLerHistorico, setFeitoLerHistorico] = useState(false);
  const [carregarHabitos, setCarregarHabitos] = useState(false);
  const [, setErros] = useState([]);
  const [habitosConcluidos, setHabitosConcluidos] = useState([]);
  const [habitos, setHabitos] = useState([]);
  const [atualizarHabitoLinha, setAtualizarHabitoLinha] = useState(false);
  const [feito, setFeito] = useState(false);
  const [feitoremover, setFeitoremover] = useState(false);

  function atualizarHabitosComCocluidos() {
    let habitosAtualizados = [];
    let habitoFoiConcluido;
    habitos.map((f) => {
      habitoFoiConcluido = false;
      habitosConcluidos.map((e) => {
        if (f.docId === e.habito && !habitoFoiConcluido) {
          habitoFoiConcluido = true;
          if (e.streak > 0) {
            habitosAtualizados.push({
              ...f,
              concluido: true,
              quantidade: e.quantidade,
              concluidoId: e.docId,
              streak: e.streak,
            });
          } else {
            habitosAtualizados.push({
              ...f,
              concluido: true,
              quantidade: e.quantidade,
              concluidoId: e.docId,
            });
          }
        }
      });
      if (!habitoFoiConcluido) {
        let atualizarHabito = f;
        if (f.concluido) f.concluido = false;
        habitosAtualizados.push(f);
      }
    });
    setHabitos(habitosAtualizados);
    setCarregarHabitos(true);
  }

  useEffect(() => {
    readDocsUmaCondicao(
      'habitos',
      'user',
      props.user,
      setHabitos,
      setFeitoLerHabitos,
      setErros
    );

    let dateA = new Date();

    let data = new Date(
      dateA.getFullYear(),
      dateA.getMonth(),
      dateA.getDate(),
      0,
      0,
      0
    );

    readDocsDuasCondicoesData(
      'historico_habito',
      'user',
      props.user,
      'data',
      data,
      setHabitosConcluidos,
      setFeitoLerHistorico,
      setErros
    );
  }, []);

  useEffect(() => {
    if (feitoLerHabito && feitoLerHistorico) {
      atualizarHabitosComCocluidos();
    }
  }, [habitosConcluidos, feitoLerHistorico, feitoLerHabito]);

  useEffect(() => {
    if (atualizarHabitoLinha) {
      atualizarHabitosComCocluidos();
      setAtualizarHabitoLinha(false);
    }
  }, [atualizarHabitoLinha]);

  useEffect(() => {
    if (feitoremover) {
      readDocsUmaCondicao(
        'habitos',
        'user',
        props.user,
        setHabitos,
        setFeito,
        setErros
      );
      setFeitoremover(false);
    }
  }, [feitoremover]);
  return (
    <BodyPage className="container">
      <main>
        <Template.Header1 className="Headers">Hábitos de Hoje</Template.Header1>

        {!carregarHabitos && (
          <Template.Body style={{ textAlign: 'center' }}>
            <div class="text-center">
              <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
          </Template.Body>
        )}

        {carregarHabitos && habitos.length === 0 && (
          <Template.Body style={{ textAlign: 'center' }}>
            Ainda não tem nenhum hábito cadastrado 🙄
          </Template.Body>
        )}

        {carregarHabitos && habitos.length > 0 && (
          <div className="Habitos">
            {habitos
              .sort((a, b) =>
                (typeof a['horario'] === 'string'
                  ? getHourMinuteFromString(a['horario'])
                  : getHourAndMinuteFromFirebaseDate(
                      a['horário'] ?? a['horario']
                    )) <
                (typeof b['horario'] === 'string'
                  ? getHourMinuteFromString(b['horario'])
                  : getHourAndMinuteFromFirebaseDate(
                      b['horário'] ?? b['horario']
                    ))
                  ? -1
                  : +1
              )
              .map((e, i) => (
                <HabitoLinha
                  habitosConcluidos={habitosConcluidos}
                  setHabitosConcluidos={setHabitosConcluidos}
                  setAtualizarHabitoLinha={setAtualizarHabitoLinha}
                  setHabitoSelecionado={props.setHabitoSelecionado}
                  setPagina={props.setPagina}
                  setFeito={setFeitoremover}
                  concluido={e.concluido ?? false}
                  concluidoId={e.concluidoId ?? ''}
                  habitoId={e.docId}
                  user={props.user}
                  key={i}
                  valor={e.meta}
                  unidade={e.unidade}
                  horario={e['horario'] ?? e['horário']}
                  nome={e.nome}
                  emoji={e.emoji}
                  ordem={i + 1}
                />
              ))}
          </div>
        )}

        <section className="End">
          {carregarHabitos && habitos.length > 0 && (
            <div className="ProgressoCard">
              <h3 className="ProgressoDia"></h3>
              <h4 className="ProgressoTitulo">
                {Math.round((habitosConcluidos.length / habitos.length) * 100)}{' '}
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
                <EmojiList habitos={habitos.filter((e) => e.concluido)} />
              </div>
            </div>
          )}
          <div className="Submit">
            <Template.Button
              className="Button"
              onClick={() => props.setPagina(2)}
            >
              Adicionar Hábito
            </Template.Button>
            <Template.Link>Acompanhamento</Template.Link>
            <Template.Link>Mais Informações</Template.Link>
          </div>
        </section>
      </main>
    </BodyPage>
  );
}

export default HomeLogado;
