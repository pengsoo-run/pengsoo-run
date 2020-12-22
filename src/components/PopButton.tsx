import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

interface PopButtonProps {
  text: string;
  size: string;
  waiting: boolean;
  children?: React.ReactNode;
  onClick?: (text: string) => void;
}

function PopButton({ text, size, waiting, children, onClick }: PopButtonProps) {
  const [typingText, setTypingText] = useState<string>('');

  useEffect(() => {
    if (!waiting) return;

    let num = 0;
    const sliceText = () => {
      setTypingText(`${text.slice(0, num)}_`);
      num = num == text.length ? 0 : ++num;
    };

    const intervalId = setInterval(sliceText, 300);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <StyledButton
      onClick={onClick && (() => onClick(text))}
      size={size}
      disabled={waiting}>
      {children}
      {waiting ? typingText : text}
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
    background-color: ${({ theme }) => theme.color.main};
    color: ${({ theme }) => theme.color.sub};
    opacity: 0.8;
    transform: none;

    &:hover {
      color: ${({ theme }) => theme.color.sub};
      box-shadow: none;
      cursor: wait;
    }
  }
`;

PopButton.defaultProps = {
  size: '2.4rem',
  waiting: false,
};

export default PopButton;
