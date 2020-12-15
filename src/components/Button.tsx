import React from 'react';
import styled from 'styled-components';

type ButtonProps = {
  text: string;
  onClick: (text: string) => void;
};

function Button({ text, onClick }: ButtonProps) {
  const handleClick = () => onClick(text);

  return <StyledButton onClick={handleClick}>{text}</StyledButton>;
}

const StyledButton = styled.button`
  flex-grow: 1;
  margin: 20px;

  font-family: inherit;
  font-size: 2rem;

  background-color: rgba(255, 255, 255, 0.7);
  outline: none;
  border: 0;

  transform: translateZ(0);
  transition: transform 0.25s ease-out;

  &:hover {
    transform: scale(1.05);
    cursor: pointer;
  }
`;

export default Button;
