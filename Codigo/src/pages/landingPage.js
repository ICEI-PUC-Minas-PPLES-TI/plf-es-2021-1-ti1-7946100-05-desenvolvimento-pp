import GoogleSoon from "../assets/img/Google-Play-Coming-Soon.png"
import AppSoon from "../assets/img/app-store-coming-soon.png"
import ExemploHome from "../assets/img/ExemploHome.jpeg"
import ExemploHome2 from "../assets/img/ExemploHome2.jpeg"
import AcompHabito from "../assets/img/printFuncionalidades/AcompanhamentoHabitosMobile.png"
import styled from "styled-components"
import { useEffect } from "react"

const Container = styled.div`
  ${props =>
    props.terminouAnimacao
      ? `
      min-height: calc(100vh - 115px);
      height: 100%;
      `
      : `
      height: 10px;
      overflow: hidden;`}
`

function LandingPage(props) {
  useEffect(() => {
    var head = document.getElementsByTagName("HEAD")[0]
    var link = document.createElement("link")
    link.rel = "stylesheet"
    link.type = "text/css"
    link.id = "landing-page-css"
    link.href = "css/styles.css"
    head.appendChild(link)

    return () => document.getElementById("landing-page-css").remove()
  }, [])

  return (
    <Container terminouAnimacao={props.terminouAnimacao}>
      <header className="masthead">
        <div className="container px-5">
          <div className="row gx-5 align-items-center">
            <div className="col-lg-6">
              {/* <!-- Mashead text and app badges--> */}
              <div className="mb-5 mb-lg-0 text-center text-lg-start">
                <h1
                  className="display-1 lh-1 mb-3"
                  style={{ fontSize: "36px" }}
                >
                  Construa Hábitos de Ouro, Desenvolva o seu potencial
                </h1>
                <p className="lead fw-normal text-muted mb-5">
                  Desenvolva seu potencial com hábitos saudáveis todos os dias!
                </p>
                <div className="d-flex flex-column flex-lg-row align-items-center">
                  <a className="me-lg-3 mb-4 mb-lg-0" href="#!">
                    <img className="app-badge" src={GoogleSoon} alt="..." />
                  </a>
                  <a href="#!">
                    <img className="app-badge" src={AppSoon} alt="..." />
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              {/* <!-- Masthead device mockup feature--> */}
              <div className="masthead-device-mockup">
                <svg
                  className="circle"
                  viewBox="0 0 100 100"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient
                      id="circleGradient"
                      gradientTransform="rotate(45)"
                    >
                      <stop className="gradient-start-color" offset="0%"></stop>
                      <stop className="gradient-end-color" offset="100%"></stop>
                    </linearGradient>
                  </defs>
                  <circle cx="50" cy="50" r="50"></circle>
                </svg>
                <svg
                  className="shape-1 d-none d-sm-block"
                  viewBox="0 0 240.83 240.83"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="-32.54"
                    y="78.39"
                    width="305.92"
                    height="84.05"
                    rx="42.03"
                    transform="translate(120.42 -49.88) rotate(45)"
                  ></rect>
                  <rect
                    x="-32.54"
                    y="78.39"
                    width="305.92"
                    height="84.05"
                    rx="42.03"
                    transform="translate(-49.88 120.42) rotate(-45)"
                  ></rect>
                </svg>
                <svg
                  className="shape-2 d-none d-sm-block"
                  viewBox="0 0 100 100"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="50" cy="50" r="50"></circle>
                </svg>
                <div className="device-wrapper">
                  <div
                    className="device"
                    data-device="iPhoneX"
                    data-orientation="portrait"
                    data-color="black"
                  >
                    <div className="screen bg-black">
                      <img
                        style={{ maxWidth: "100%", height: "100%" }}
                        src={ExemploHome2}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      {/* <!-- Quote/testimonial aside--> */}
      <aside className=" text-center bg-gradient-primary-to-secondary">
        <div className="container px-5">
          <div className="row gx-5 justify-content-center">
            <div className="col-xl-8">
              <div className="h2 fs-1 text-white mb-4">
                <q>
                  Daqui a 20 anos você estará mais decepcionado pelas coisas que
                  você não fez do que pelas que fez. Então jogue fora as
                  amarras, navegue para longe do seu porto seguro, agarre o
                  vento em suas velas. Explore, sonhe, descubra
                </q>
                <br />
                <br /> - Mark Twain.
              </div>
            </div>
          </div>
        </div>
      </aside>
      {/* <!-- App features section--> */}
      <section id="features">
        <div className="container px-5">
          <div className="row gx-5 align-items-center">
            <div className="col-lg-8 order-lg-1 mb-5 mb-lg-0">
              <div className="container-fluid px-5">
                <div className="row gx-5">
                  <div className="col-md-6 mb-5">
                    {/* <!-- Feature item--> */}
                    <div className="text-center">
                      <i className="bi-plus-circle icon-feature text-gradient d-block mb-3"></i>
                      <h3 className="font-alt">Cadastre seus Hábitos</h3>
                      <p className="text-muted mb-0">
                        Cadastre seus hábitos e frequência com que devem ser
                        cumpridos! 📖✍️
                      </p>
                    </div>
                  </div>
                  <div className="col-md-6 mb-5">
                    {/* <!-- Feature item--> */}
                    <div className="text-center">
                      <i className="bi-battery-half icon-feature text-gradient d-block mb-3"></i>
                      <h3 className="font-alt">
                        Visualize o seu Progresso diário
                      </h3>
                      <p className="text-muted mb-0">
                        Ao completar uma atividade marque no aplicativo e tenha
                        em mãos seu progresso diário! ✅✅
                      </p>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-5 mb-md-0">
                    {/* <!-- Feature item--> */}
                    <div className="text-center">
                      <i className="bi-clock-history icon-feature text-gradient d-block mb-3"></i>
                      <h3 className="font-alt">Acompanhe o seu Histórico</h3>
                      <p className="text-muted mb-0">
                        {" "}
                        Acompanhe o histórico das suas atividades e visualize o
                        seu progresso! 🕗💪
                      </p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    {/* <!-- Feature item--> */}
                    <div className="text-center">
                      <i className="bi-check-square icon-feature text-gradient d-block mb-3"></i>
                      <h3 className="font-alt">Mantenha seus Streaks</h3>
                      <p className="text-muted mb-0">
                        Realize suas atividades sem faltar e ganhe pontos de
                        streak 🔥🔥
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 order-lg-0">
              {/* <!-- Features section device mockup--> */}
              <div className="features-device-mockup">
                <svg
                  className="circle"
                  viewBox="0 0 100 100"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient
                      id="circleGradient"
                      gradientTransform="rotate(45)"
                    >
                      <stop className="gradient-start-color" offset="0%"></stop>
                      <stop className="gradient-end-color" offset="100%"></stop>
                    </linearGradient>
                  </defs>
                  <circle cx="50" cy="50" r="50"></circle>
                </svg>
                <svg
                  id="x-ico"
                  className="shape-1 d-none d-sm-block"
                  viewBox="0 0 240.83 240.83"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="-32.54"
                    y="78.39"
                    width="305.92"
                    height="84.05"
                    rx="42.03"
                    transform="translate(120.42 -49.88) rotate(45)"
                  ></rect>
                  <rect
                    x="-32.54"
                    y="78.39"
                    width="305.92"
                    height="84.05"
                    rx="42.03"
                    transform="translate(-49.88 120.42) rotate(-45)"
                  ></rect>
                </svg>
                <svg
                  id="circle-ico"
                  className="shape-2 d-none d-sm-block"
                  viewBox="0 0 100 100"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="50" cy="50" r="50"></circle>
                </svg>
                <div className="device-wrapper">
                  <div
                    id="device-features"
                    className="device"
                    data-device="iPhoneX"
                    data-orientation="portrait"
                    data-color="black"
                  >
                    <div className="screen bg-black">
                      {/* <!-- PUT CONTENTS HERE:-->
                                    <!-- * * This can be a video, image, or just about anything else.-->
                                    <!-- * * Set the max width of your media to 100% and the height to-->
                                    <!-- * * 100% like the demo example below.--> */}
                      <img
                        style={{ maxWidth: "100%", height: "100%" }}
                        src={ExemploHome}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- Basic features section--> */}
      <section className="bg-light">
        <div className="container px-5">
          <div className="row gx-5 align-items-center justify-content-center justify-content-lg-between">
            <div className="col-12 col-lg-5">
              <h2 className="display-4 lh-1 mb-4">
                Diga-me os seus hábitos e eu te direi quem és
              </h2>
              <p className="lead fw-normal text-muted mb-5 mb-lg-0">
                Acompanhe sua rotina com gráficos simples e informativos
              </p>
            </div>
            <div className="col-sm-8 col-md-6">
              <div className="px-5 px-sm-0">
                <div className="device-wrapper">
                  <div
                    id="device-features"
                    className="device"
                    data-device="iPhoneX"
                    data-orientation="portrait"
                    data-color="black"
                  >
                    <div className="screen bg-black">
                      {/* <!-- PUT CONTENTS HERE:-->
                                <!-- * * This can be a video, image, or just about anything else.-->
                                <!-- * * Set the max width of your media to 100% and the height to-->
                                <!-- * * 100% like the demo example below.--> */}
                      <img
                        style={{ maxWidth: "100%", height: "100%" }}
                        src={AcompHabito}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- Call to action section--> */}
      <section className="cta">
        <div className="cta-content">
          <div className="container px-5">
            <h2 className="text-white display-1 lh-1 mb-4">
              Pare de procastinar
              <br />
              Comece a melhorar.
            </h2>
            <div onClick={() => props.setShowModal(true)}>
              <a
                className="btn btn-outline-light py-3 px-4 rounded-pill"
                href="#"
              >
                Cadastre-se gratuitamente
              </a>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- App badge section--> */}
      <section className="bg-gradient-primary-to-secondary" id="download">
        <div className="container px-5">
          <h2 className="text-center text-white font-alt mb-4">
            Envie pra gente o seu feedback!
          </h2>
          <div className="d-flex flex-column flex-lg-row align-items-center justify-content-center">
            <button
              className="btn btn-primary rounded-pill px-3 mb-2 mb-lg-0"
              data-bs-toggle="modal"
              data-bs-target="#feedbackModal"
            >
              <span className="d-flex align-items-center">
                <i className="bi-chat-text-fill me-2"></i>
                <span className="small">Enviar Feedback</span>
              </span>
            </button>
          </div>
        </div>
      </section>
      {/* <!-- Footer--> */}
      <footer className="bg-black text-center py-5">
        <div className="container px-5">
          <div className="text-white-50 small">
            <div className="mb-2">
              &copy; GoHabit. Todos Direitos Reservados.
            </div>
            <a href="#!">Privacy</a>
            <span className="mx-1">&middot;</span>
            <a href="#!">Terms</a>
            <span className="mx-1">&middot;</span>
            <a href="#!">FAQ</a>
          </div>
        </div>
      </footer>
      {/* <!-- Feedback Modal--> */}
      <div
        className="modal fade"
        id="feedbackModal"
        tabIndex="-1"
        aria-labelledby="feedbackModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header bg-gradient-primary-to-secondary p-4">
              <h5
                className="modal-title font-alt text-white"
                id="feedbackModalLabel"
              >
                Enviar feedback
              </h5>
              <button
                className="btn-close btn-close-white"
                type="button"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body border-0 p-4">
              <form id="contactForm" data-sb-form-api-token="API_TOKEN">
                {/* <!-- Name input--> */}
                <div className="form-floating mb-3">
                  <input
                    className="form-control"
                    id="name"
                    type="text"
                    placeholder="Digite o seu nome"
                    data-sb-validations="required"
                  />
                  <label htmlFor="name">Nome completo</label>
                  <div
                    className="invalid-feedback"
                    data-sb-feedback="name:required"
                  >
                    É necessário um nome.
                  </div>
                </div>
                {/* <!-- Email address input--> */}
                <div className="form-floating mb-3">
                  <input
                    className="form-control"
                    id="email"
                    type="email"
                    placeholder="nome@email.com"
                    data-sb-validations="required,email"
                  />
                  <label htmlFor="email">Endereço de email</label>
                  <div
                    className="invalid-feedback"
                    data-sb-feedback="email:required"
                  >
                    É necessário um email.
                  </div>
                  <div
                    className="invalid-feedback"
                    data-sb-feedback="email:email"
                  >
                    Email inválido.
                  </div>
                </div>
                {/* <!-- Phone number input--> */}
                <div className="form-floating mb-3">
                  <input
                    className="form-control"
                    id="phone"
                    type="tel"
                    placeholder="(31) 99876-5432"
                    data-sb-validations="required"
                  />
                  <label htmlFor="phone">Nº de Telefone</label>
                  <div
                    className="invalid-feedback"
                    data-sb-feedback="phone:required"
                  >
                    É necessário um número de telefone.
                  </div>
                </div>
                {/* <!-- Message input--> */}
                <div className="form-floating mb-3">
                  <textarea
                    className="form-control"
                    id="message"
                    type="text"
                    placeholder="Escreva sua mensagem aqui..."
                    style={{ height: "10rem" }}
                    data-sb-validations="required"
                  ></textarea>
                  <label htmlFor="message">Mensagem</label>
                  <div
                    className="invalid-feedback"
                    data-sb-feedback="message:required"
                  >
                    É necessário uma mensagem
                  </div>
                </div>
                {/* <!-- Submit success message-->
                        <!---->
                        <!-- This is what your users will see when the form-->
                        <!-- has successfully submitted--> */}
                <div className="d-none" id="submitSuccessMessage">
                  <div className="text-center mb-3">
                    <div className="fw-bolder">
                      Obrigado! Já recebemos o seu feedback!
                    </div>
                    <br />
                  </div>
                </div>

                <div className="d-none" id="submitErrorMessage">
                  <div className="text-center text-danger mb-3">
                    Erro ao enviar sua mensagem!
                  </div>
                </div>
                <div className="d-grid">
                  <button
                    className="btn btn-primary rounded-pill btn-lg disabled"
                    id="submitButton"
                    type="submit"
                  >
                    Enviar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default LandingPage
