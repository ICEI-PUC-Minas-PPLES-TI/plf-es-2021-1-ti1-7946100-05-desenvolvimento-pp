import React, { useState, useEffect, useRef } from "react"
import * as Template from "../components/template"
import styled from "styled-components"
import { login, logout } from "../utils/utils"
import { palheta } from "../components/palheta"
import { Modal } from "../components/Modal"
import { ModalAS } from "../components/ModalAlterarSenha"
import { ModalES } from "../components/ModalEsqueciSenha"
import Logo from "../components/logo"
import LogoCheck from "../components/logoCheck"
import LogoListing from "../components/logoListing2"

const Navbar = styled.nav`
  padding: 20px;
  ${props =>
    props.pagina !== 0
      ? `max-width: 600px;`
      : `
  box-shadow: 0 0.125rem 0.25rem rgb(0 0 0 / 8%) !important;
  z-index: 10;
  `}
  width: 100%;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background: ${() => palheta.background};
  box-shadow: ${() => palheta.bodyBoxShadow};

  padding-bottom: 5px;
  .Logo {
    height: 72px;
    width: 72px;
    object-fit: cover;
    margin-left: 16px;
    cursor: pointer;
  }
  .link-header {
    padding: 0px 0px;
  }
  .input-header {
    max-width: 100px;
  }
  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    a {
      margin: 5px;
    }
  }

  svg {
    margin-left: 7px;
    cursor: pointer;
  }

  .dropdown-navegacao {
    height: auto;
    padding: 10px 15px;
    z-index: 5;
    background: ${() => palheta.background};
    top: 91px;
    border-radius: 4px;
    position: absolute;
    margin-left: -95px;
    box-shadow: ${() => palheta.boxDropShadow};

    ul {
      list-style-type: none;
      padding: 0px;
      margin: 0px;
      color: ${() => palheta.text};

      li {
        cursor: pointer;
        padding: 3px 0px;
      }

      li:hover {
        filter: opacity(0.6);
      }
    }
  }
`

const opcoes = ["Esqueci a senha", "Alterar minha senha"]

function useOutsideAlerter(ref, setOpen) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) setOpen(false)
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [ref, setOpen])
}

function BarraSuperior(props) {
  const [erros, setErros] = useState("")
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [mmo, setmmo] = useState("")
  const [animacaoConcluido, setAnimacaoConcluido] = useState(false)
  const [animacaoCadastrdado, setAnimacaoCadastrado] = useState(false)
  const [openNavegacao, setOpenNavegacao] = useState(false)
  const wrapperRef = useRef(null)
  useOutsideAlerter(wrapperRef, setOpenNavegacao)

  useEffect(() => {
    if (props.habitoConcluido) {
      setAnimacaoConcluido(true)
      setTimeout(() => setAnimacaoConcluido(false), 1500)
    }
  }, [props.habitoConcluido])

  useEffect(() => {
    if (props.habitoCadastrado) {
      setAnimacaoCadastrado(true)
      setTimeout(() => setAnimacaoCadastrado(false), 1700)
    }
  }, [props.habitoCadastrado])

  const menuMaisOpcoes = mmo => {
    if (mmo === "Alterar minha senha") {
      props.setShowModalAlterarSenha(prev => !prev)

      setmmo("")
    }
    if (mmo === "Esqueci a senha") {
      props.setShowModalEsqueciSenha(prev => !prev)

      setmmo("")
    }
  }

  const openModal = () => props.setShowModal(prev => !prev)

  useEffect(() => {
    if (erros !== "") {
      let erros2
      if (erros === "Password should be at least 6 characters")
        erros2 = "A senha deve conter no m??nimo 6 caracteres"
      if (erros === "The email address is already in use by another account.")
        erros2 = "Email j?? cadastrado."
      if (erros === "The email address is badly formatted.")
        erros2 = "Formato de email inv??lido."
      if (
        erros ===
        "There is no user record corresponding to this identifier. The user may have been deleted."
      )
        erros2 = "Email n??o cadastrado."
      if (
        erros ===
        "The password is invalid or the user does not have a password."
      )
        erros2 = "Senha inv??lida."
      if (
        erros ===
        "Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later."
      )
        erros2 =
          "Sua conta foi temporariamente desabilitada devido a diversas tentativas falhas de login."

      alert(erros2)
    }
  }, [erros])

  const navegacao = pagina => {
    props.setPagina(pagina)
    setOpenNavegacao(false)
  }

  useEffect(() => {
    setEmail('')
    setSenha('')
  },[props.user])

  return (
    <Navbar pagina={props.pagina}>
      {!animacaoConcluido && !animacaoCadastrdado && (
        <Logo
          size={72}
          animated={false}
          onClick={() => (props.user ? props.setPagina(1) : props.setPagina(0))}
        />
      )}
      {animacaoConcluido && <LogoCheck size={72} />}
      {animacaoCadastrdado && <LogoListing size={72} />}
      {!props.user && (
        <div>
          <Template.Input
            className={"input-header"}
            placeholder="email"
            type="email"
            onChange={e => setEmail(e.target.value)}
          />
          <Template.Input
            className={"input-header"}
            placeholder="senha"
            type="password"
            onChange={e => setSenha(e.target.value)}
          />
          <Template.Link
            onClick={() => login(email, senha, setErros)}
            className={"link-header"}
          >
            Login
          </Template.Link>
          <Template.Link onClick={openModal}>Cadastrar</Template.Link>
          <Modal
            showModal={props.showModal}
            setShowModal={props.setShowModal}
          />

          <ModalES
            showModalEsqueciSenha={props.showModalEsqueciSenha}
            setShowModalEsqueciSenha={props.setShowModalEsqueciSenha}
          />

          <ModalAS
            showModalAlterarSenha={props.showModalAlterarSenha}
            setShowModalAlterarSenha={props.setShowModalAlterarSenha}
          />

          <div className="dropdown" id="div-dropdown-opcoesLogin">
            <Template.Link
              id="dropdownOpcoesLogin"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              ?
            </Template.Link>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              {opcoes.map((e, i) => (
                <li key={i}>
                  <button
                    className="dropdown-item"
                    onClick={() => {
                      setmmo(e)
                      menuMaisOpcoes(mmo)
                    }}
                  >
                    {e}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      {props.user && (
        <>
          <div>
            <Template.Button onClick={() => setOpenNavegacao(!openNavegacao)}>
              <i className="fas fa-bars" />
            </Template.Button>
            {openNavegacao && (
              <div ref={wrapperRef} className="dropdown-navegacao">
                <ul>
                  <li onClick={() => navegacao(1)}>H??bitos</li>
                  {props.habitos.length > 0 && (
                    <li onClick={() => navegacao(4)}>Historico</li>
                  )}
                  <li onClick={() => navegacao(5)}>Acompanhamento</li>
                  {/* <li>Mais Informa????es</li> */}
                  <li onClick={() => navegacao(6)}>Sobre</li>
                  {/*<li onClick={() => navegacao(3)}>Template</li>*/}
                  <li
                    onClick={() => {
                      logout()
                      setOpenNavegacao(false)
                    }}
                  >
                    Sair
                  </li>
                </ul>
              </div>
            )}
          </div>
        </>
      )}
    </Navbar>
  )
}
export default BarraSuperior
