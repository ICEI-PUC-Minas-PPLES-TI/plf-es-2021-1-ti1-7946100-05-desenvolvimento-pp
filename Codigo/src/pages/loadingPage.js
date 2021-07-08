import styled from 'styled-components';
import Logo from '../components/logo';
import { palheta } from '../components/palheta';
import { useEffect, useState } from 'react';

const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 100;
  background-color: ${() => palheta.background};
  animation: 1s linear 4s entrance_logo both;

  .inside-div {
    position: absolute;
    top: calc(50% - 100px);
    left: calc(50% - 100px);
  }

  @keyframes entrance_logo {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
      display: none;
    }
  }
`;

function LoadingPage() {
  const [showDiv, setShowDiv] = useState(true);
  useEffect(() => setTimeout(() => setShowDiv(false), 5000), []);
  return showDiv ? (
    <Container>
      <div className="inside-div">
        <Logo animated={true}/>
      </div>
    </Container>
  ) : null;
}

export default LoadingPage;
