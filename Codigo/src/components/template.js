import styled from 'styled-components';
import Icon from './logo'
import Icon2 from './logoListing'
import Icon3 from './logoListing2'
import Icon4 from './logoCheck'
import { palheta } from './palheta';

export const Header1 = styled.h1`
  margin-bottom: 20px;
  margin-top: 20px;
  font-family: Work Sans;
  font-style: normal;
  font-weight: bold;
  font-size: 34px;
  line-height: 40px;
  letter-spacing: -0.02em;
  text-align: center;

  color: ${() => palheta.text};
`;

export const Header2 = styled.h2`
  margin-top: 20px;
  margin-bottom: 20px;

  font-family: Work Sans;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 23px;
  letter-spacing: -0.02em;

  color: ${() => palheta.text};
`;

export const Header3 = styled.h3``;

export const Body = styled.div`
  font-family: Work Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 13px;
  line-height: 15px;
  letter-spacing: -0.02em;
  color: ${() => palheta.text};
`;

const BodyDiv = styled.div`
  background-color: ${() => palheta.background};
  box-shadow: ${() => palheta.bodyBoxShadow};
  margin: auto;
  max-width: 600px;
  height: 100%;
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));

  .Header1,
  .colors-parte {
    grid-column: 1 / 5;
  }
  .Tipography {
    text-align: center;
    grid-column: 1 / 3;
  }
  .Components {
    grid-column: 3 / 5;
  }
  .PrimeiraParte .Label-Logo-Progress {
  }
  .Inputs {
    display: flex;
  }
  .Logo-Emoji {
    display: flex;
    align-items: center;
  }
  .Colors div {
    margin-right: 40px;
    margin-bottom: 40px;
    display: inline-block;
  }
`;

export const Link = styled.a`
  font-family: Work Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 13px;
  line-height: 15px;
  letter-spacing: -0.02em;
  text-decoration-line: underline;
  cursor: pointer;

  margin: 10px;

  color: ${() => palheta.text};
`;

export const Button = styled.button`
  /* Background */
  background: ${() => palheta.background};
  box-shadow: ${() => palheta.boxDropShadow};
  border-radius: 5px;
  border: none;

  margin: 20px;
  padding: 16px;
  max-width: 400px;

  /* Body */
  font-family: Work Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 15px;
  letter-spacing: -0.02em;

  /* Text - Important */
  color: ${() => palheta.textImportant};
  :active {
    box-shadow: 2px 2px 5px #c3cad0, -2px -2px 5px #ffffff;
  }
`;

export const Emoji = styled.div`
  background: ${() => palheta.background};
  box-shadow: ${() => palheta.boxDropShadow};
  border-radius: 15px;
  width: 36px;
  height: 36px;
  margin: 10px;
  display: grid;
  place-items: center;
  padding: 3px 3px 3px 5px;
  font-size: 20px;
`;

export const Card = styled.div`
  min-width: 100px;
  min-height: 100px;
  /* Background */
  background: ${() => palheta.background};

  /* Drop shadow (dark) */

  box-shadow: 5px 5px 10px #c3cad0, -5px -5px 10px #ffffff;
  border-radius: 10px;

  /* Text Styles */
  font-family: Work Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 13px;
  line-height: 15px;
  letter-spacing: -0.02em;
  color: ${() => palheta.text};
`;

export const Label = styled.label`
  font-family: Work Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 13px;
  line-height: 15px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  letter-spacing: -0.02em;

  color: rgba(0, 0, 0, 0.65);
`;

export const Input = styled.input`
  margin: 10px;
  padding: 5px 10px;

  max-width: 200px;
  min-width: 50px;

  background: ${() => palheta.background};
  box-shadow: ${() => palheta.boxInnerShadow};

  border-radius: 5px;
  /* Body */
  font-family: arial, sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 13px;
  line-height: 15px;
  letter-spacing: -0.02em;
  border: none;

  color: ${() => palheta.text};

  -webkit-appearance: none;
`;

const TextoDestaqueDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 10px;
`;

export const Linha = styled.div`
  height: 1px;
  max-width: 400px;
  min-width: 60px;
  margin-top: 4px;
  border: 0.1px solid ${() => palheta.background};
  /*   box-shadow: 10px 10px 20px #626262, -10px -10px 20px #ffffff;
 */
  filter: drop-shadow(1px 4px 6px black);
`;

export function TextoDestaque(props) {
  return (
    <TextoDestaqueDiv {...props}>
      <Body
        style={{
          margin: '0px',
          padding: '0 8px',
          fontSize: '16px',
          fontWeight: '500',
        }}
      >
        {props.children}
      </Body>
      <Linha />
    </TextoDestaqueDiv>
  );
}

export function NewInputs(props) {
  return (
    <div style={{ margin: '10px', maxWidth: '180px' }}>
      <input
        style={{
          margin: '0px 10px -12px 0px',
          maxWidth: '180px',
          width: '100%',
          paddingLeft: '8px',
          border: 'none',
          background: palheta.background,
          color: palheta.text,
        }}
        {...props}
      />
      <Linha />
    </div>
  );
}

export const Logo = styled.h1`
  font-family: Work Sans;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 28px;
  margin: 0px;
  text-decoration: underline;
  color: ${(props) => palheta.logo};
  text-shadow: -2px -2px 3px #ffff6a, 2px 2px 3px #776a22;
`;

export const BarraDeProgressoVazia = styled.div`
  max-width: 440px;
  width: 100%;
  min-width: 120px;
  height: 30px;

  /* Rectangle 17 */
  background: linear-gradient(90deg, #afaaaa);
  /* Drop shadow (dark) */

  box-shadow: ${() => palheta.boxDropShadow};
  border-radius: 5px;
`;

export const BarraDeProgressoCompleta = styled.div`
  max-width: 440px;
  width: ${(props) => props.valor}%;
  height: 30px;

  /* Rectangle 17 */
  background: ${() => palheta.textImportant};

  box-shadow: ${() => palheta.boxDropShadow};
  border-radius: 5px;

  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition: width 0.5s;
`;

const Quadrado2 = styled.div`
  /* Rectangle 18 */

  width: 80px;
  height: 80px;

  /* Dark shadow */

  background: ${(props) => props.color};
  border: 1px solid #000000;
  box-sizing: border-box;
  border-radius: 10px;
`;

function Template() {
  return (
    <BodyDiv className="container">
      <Header1 className="Header1">Template</Header1>
      <div className="Tipography">
        <Header2>Tipography</Header2>
        <Header1>Header 1</Header1>
        <Header2>Header 2</Header2>
        <Body>Body - Lore ipsum</Body>
        <Link>link</Link>
      </div>
      <div className="Components">
        <Header2>Components</Header2>
        <Button>button</Button>
        <Card>
          <h3>Card Style</h3>
        </Card>
        <Label>Label</Label>
        <div className="Inputs">
          <Input
            placeholder="input"
            style={{ marginLeft: '0px', width: '120px' }}
          />
          <TextoDestaque>Correr</TextoDestaque>
        </div>
        <div className="Logo-Emoji">
          <Logo>GoHabit</Logo>
          <Emoji style={{ margin: '20px' }}>😉</Emoji>
        </div>
        <NewInputs placeholder="Input Alternativo" />
        <BarraDeProgressoVazia>
          <BarraDeProgressoCompleta valor={72} />
        </BarraDeProgressoVazia>
        <Icon size={72}/>
        <Icon2 size={72}/>
        <Icon3 size={72}/>
        <Icon4 size={72}/>
      </div>
      <div className="colors-parte">
        <Header2>Colors</Header2>
        <div className="Colors">
          <Quadrado2 color={palheta.background} />
          <Quadrado2 color={palheta.darkShadow} />
          <Quadrado2 color={palheta.lightShadow} />
          <Quadrado2 color={palheta.textImportant} />
          <Quadrado2 color={palheta.logo} />
          <Quadrado2 color={palheta.text} />
        </div>
      </div>
    </BodyDiv>
  );
}

export default Template;
