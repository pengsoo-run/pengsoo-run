import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

function Welcome() {
  const history = useHistory();

  return (
    <Container>
      <img src='welcome/game-machine.png' alt='game-machine' />
      <button className='btn' onClick={() => history.push('/game')}>
        ENTER
      </button>
      <video
        typeof='video/mp4'
        src='welcome/intro.mp4'
        playsInline
        autoPlay
        muted
      />
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  height: 85%;
  width: 800px;

  img,
  video,
  .btn {
    position: absolute;
    left: 0;
    right: 0;
    margin: 0 auto;
  }

  img {
    height: 100%;
  }

  video {
    top: 30vh;
    height: 30vh;
    border-radius: 20px;
  }

  .btn {
    z-index: 1;
    top: 50vh;
    padding: 0.5rem 4rem;
    background: rgba(255, 255, 255, 0.9);
    border: 3px solid black;
    box-shadow: 0 0 0 black;
    outline: none;

    color: inherit;
    font-family: inherit;
    font-size: 3rem;

    transition: all 0.2s;

    &:hover {
      box-shadow: 0.4rem 0.4rem 0 black;
      transform: translate(-0.4rem, -0.4rem);
      cursor: pointer;
    }

    &:active {
      box-shadow: 0 0 0 black;
      transform: translate(0, 0);
    }
  }
`;

export default Welcome;
