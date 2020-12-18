import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { flexCenter } from './styles/mixin';
import PopButton from './PopButton';

interface ErrorBoxProps {
  message: string;
}

function ErrorBox({ message }: ErrorBoxProps) {
  return (
    <Wrapper>
      <h1>Oops..!😲 {message}</h1>
      <Link to='/'>
        <PopButton text='HOME' size='2rem' />
      </Link>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 99;
  width: 100%;
  height: 100%;
  ${flexCenter}
  flex-direction: column;
  background-color: ${({ theme }) => theme.color.yellow};
  opacity: 0.9;

  h1 {
    font-size: 8vmin;
    margin-bottom: 20px;
    color: ${({ theme }) => theme.color.sub};
  }
`;

export default ErrorBox;
