import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

function Welcome() {
  const history = useHistory();

  return (
    <Wrapper>
      <img src='welcome/game-machine.png' alt='game-machine' />
      <video
        typeof='video/mp4'
        src='welcome/intro.mp4'
        playsInline
        autoPlay
        loop
        muted
      />
      <div className='enter'>
        <div className='title'>PENGSOO RUN</div>
        <button className='enter-button' onClick={() => history.push('/game')}>
          ENTER
        </button>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;

  img {
    height: 320px;
    margin: 20px 40px;
  }

  video {
    position: absolute;
    top: 132px;
    left: 75px;
    width: 200px;
    border-radius: 20px;
  }

  .enter {
    position: absolute;
    bottom: 30px;
    right: 30px;

    .title {
      text-align: right;
      font-size: 3rem;
    }

    .enter-button {
      padding: 0.5rem 4rem;
      background: rgba(255, 255, 255, 0.8);
      border: 3px solid black;
      box-shadow: 0 0 0 black;
      outline: none;

      color: #14095c;
      font-family: inherit;
      font-size: 2.5rem;

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
  }
`;

export default Welcome;
