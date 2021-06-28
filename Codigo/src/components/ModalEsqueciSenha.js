import React from "react";
import styled from "styled-components";
import * as Template from "./template";

const ModalBackgroundAS = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  background-color: blue;
  z-index: 10;
`;

const ModalWrapperAS = styled.div`
  justify-content: flex-start;
  display: flex-box;
  flex-orientation: column;
  width: 400px;
  height: 300px;

  z-index: 20;
  border-radius: 10px;
  color: black;
  background: #f5f5f5;

  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  div {
    width: 400px;
  }
  .headerAlteraSenha {
    align-self: flex-start;
    justify-content: center;
    margin-bottom: 010px;
  }
  form {
    align-self: center;
    div {
      width: 400px;
      align-items: center;
      justify-content: center;
      margin-bottom: 10px;
    }
    .btnEnviarAS {
      padding: 10px;
      font-size: 15px;
    }
    .closeButton {
      color: black;
      padding: 10px;
      position: relative;
      left: 100px;
    }
  }
  #closeBtnAS,
  #closeBtnES {
    padding: 10px;
    color: black;
    position: absolute;
    right: 2px;
    top: -13px;
  }
`;

export const ModalES = ({
  showModalEsqueciSenha,
  setShowModalEsqueciSenha,
}) => {

  return (
    <>
      {showModalEsqueciSenha ? (
        <ModalBackgroundAS className="bgAS">
          <ModalWrapperAS
            showModalEsqueciSenha={showModalEsqueciSenha}
            className="wrapper"
          >
            <div className="headerAlteraSenha">
              <h4>Esqueci Minha Senha</h4>
              <Template.Button
                onClick={() => setShowModalEsqueciSenha(false)}
                className="closeButton"
                id="closeBtnES"
              >
                X
              </Template.Button>
            </div>

            <form>
              <div className="emailAlterarSenha">
                <Template.Label>Email: </Template.Label>
                <Template.Input
                  type="email"
                  placeholder="Email"
                ></Template.Input>
              </div>
              <div>
                <Template.Button className="btnEnviarAS">
                  Enviar
                </Template.Button>
              </div>
            </form>
          </ModalWrapperAS>
        </ModalBackgroundAS>
      ) : null}
    </>
  );
};
