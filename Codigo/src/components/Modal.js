import React, { useState } from "react"
import styled from "styled-components"
import { signUp } from "../utils/utils"
import * as Template from "./template"

const Background = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
`
const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;

  width: 400px;
  height: 600px;

  z-index: 10;
  border-radius: 10px;
  color: black;
  background: #f5f5f5;

  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  justify-content: flex-start;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const ModalContent = styled.div`
  form {
    width: 400px;
    height: 590px;
    position: relative;
    align-self: flex-start;
  }

  .modal-header {
    align-self: flex-start;
    width: 100%;
    display: flex-box;
    align-items: center;
    justify-content: center;
    color: #001f3f;
  }
  .inpt {
    justify-self: center;
    display: flex-box;
    align-items: center;
    justify-content: center;
  }

  .modal-body {
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-self: center;
    justify-content: space-between;
  }
  .inpt {
    margin-left: 10px;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  input {
    border: 1px solid #f5f5f5;
    box-shadow: 2px 2px 10px #d0d0d0, -10px -10px 10px #ffffff;
    margin-left: 20px;
  }

  .modal-title {
    position: relative;
    left: 35px;
  }

    }
    .closeButton{
      color: black;
      padding: 10px;
      position: relative;
      left: 100px;
    }
  }
`


export const Modal = ({ showModal, setShowModal }) => {
  const [, setNomeCadastro] = useState("")
  const [emailCadastro, setEmailCadastro] = useState("")
  const [senhaCadastro, setSenhaCadastro] = useState("")
  // const [confirmaSenhaCadastro, setConfirmaSenhaCadastro] = useState("");
  const [, setErros] = useState("")
  return (
    <>
      {showModal ? (
        <Background>
          <ModalWrapper showModal={showModal}>
            <ModalContent>
              <div className="modal-header">
                <h3 className="modal-title">Cadastro</h3>
                <Template.Button
                  onClick={() => setShowModal(false)}
                  className="closeButton"
                >
                  X
                </Template.Button>
              </div>
              <div className="modal-body">
                <div className="nome">
                  <div className="inpt">
                    <label className="label">Nome: </label>
                    <Template.Input
                      onChange={e => setNomeCadastro(e.target.value)}
                      type="text"
                      placeholder="Nome completo"
                    ></Template.Input>
                  </div>
                </div>
                <div className="email">
                  <div className="inpt">
                    <label className="label">Email: </label>
                    <Template.Input
                      onChange={e => setEmailCadastro(e.target.value)}
                      type="email"
                      placeholder="Email"
                    ></Template.Input>
                  </div>
                </div>
                <div className="senha">
                  <div className="inpt">
                    <label className="label">Senha: </label>
                    <Template.Input
                      onChange={e => setSenhaCadastro(e.target.value)}
                      type="password"
                      placeholder="Senha"
                    ></Template.Input>
                  </div>
                </div>
                <div className="confirma-senha">
                  <div className="inpt">
                    <label className="label">
                      Confirme<br></br> a senha:{" "}
                    </label>
                    <Template.Input
                      type="password"
                      placeholder="Confirme a senha"
                      onChange={
                        e => null
                        // setConfirmaSenhaCadastro(e.target.value)
                      }
                    ></Template.Input>
                  </div>
                </div>

                <div className="btnSubmit">
                  <div className="inpt">
                    <Template.Button
                      onClick={() => {
                        signUp(emailCadastro, senhaCadastro, setErros)
                      }}
                      id="btnEnviarCadastro"
                    >
                      Enviar
                    </Template.Button>
                  </div>
                </div>
              </div>
            </ModalContent>
          </ModalWrapper>
        </Background>
      ) : null}
    </>
  )
}
