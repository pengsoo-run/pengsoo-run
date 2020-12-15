import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import PopButton from './PopButton';

function Welcome() {
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
        <Link to='/lobby'>
          <PopButton text='ENTER' />
        </Link>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  display: flex;

  img {
    height: 320px;
    margin: 20px;
  }

  video {
    position: absolute;
    top: 132px;
    left: 55px;
    width: 200px;
    border-radius: 20px;
  }

  .enter {
    width: 240px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    margin: 0 0 15px 40px;

    .title {
      padding-right: 10px;
      text-align: right;
      font-size: 2.6rem;
    }

    a {
      display: flex;
      text-decoration: none;
      padding-left: 20px;
    }
  }
`;

export default Welcome;
