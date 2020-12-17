import React from 'react';
import styled from 'styled-components';

interface PopButtonProps {
  text: string;
  size: string;
  disable: boolean;
  children?: React.ReactNode;
  onClick?: (text: string) => void;
}

function PopButton({ text, size, disable, children, onClick }: PopButtonProps) {
  return (
    <StyledButton
      onClick={onClick && (() => onClick(text))}
      size={size}
      disabled={disable}>
      {children}
      {text}
    </StyledButton>
  );
}

const StyledButton = styled.button<{ size: string }>`
  width: 100%;
  margin: 5px;
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.7);
  border: 3px solid black;
  box-shadow: 0 0 0 black;
  outline: none;
  user-select: none;

  color: ${({ theme }) => theme.color.darkblue};
  font-family: inherit;
  font-size: ${({ size }) => size};

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

  &:disabled {
    &:hover {
      box-shadow: none;
      transform: none;
      cursor: wait;
    }
  }
`;

PopButton.defaultProps = {
  size: '2.4rem',
  disable: false,
};

export default PopButton;
