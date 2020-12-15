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
        <Link to='/game'>
          <PopButton text='ENTER' />
        </Link>
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
      margin-bottom: 10px;
    }

    a {
      display: flex;
      text-decoration: none;
    }
  }
`;

export default Welcome;
