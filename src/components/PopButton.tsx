import React from 'react';
import styled from 'styled-components';

interface PopButtonProps {
  text: string;
  size?: string;
  onClick?: (text: string) => void;
}

function PopButton({ text, size, onClick }: PopButtonProps) {
  return (
    <StyledButton
      onClick={onClick && (() => onClick(text))}
      style={{ fontSize: size }}>
      {text}
    </StyledButton>
  );
}

const StyledButton = styled.button`
  flex-grow: 1;

  margin: 5px;
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.7);
  border: 3px solid black;
  box-shadow: 0 0 0 black;
  outline: none;

  color: #14095c;
  font-family: inherit;

  transition: all 0.2s;

  &:hover {
    box-shadow: 0.5rem 0.5rem 0 black;
    transform: translate(-0.5rem, -0.5rem);
    cursor: pointer;
  }

  &:active {
    box-shadow: 0 0 0 black;
    transform: translate(0, 0);
  }
`;

PopButton.defaultProps = {
  size: '2rem',
};

export default PopButton;
