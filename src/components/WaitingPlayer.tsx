import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { GameMode, Player } from '~/types/game.type';

import { flexCenter } from './styles/mixin';

import QRCode from './QRCode';
import RoleList from './RoleList';
import PopButton from './PopButton';

interface WaitingPlayerProps {
  gameId: string;
  playerList: Player[];
  mode: GameMode;
  initGame: () => void;
}

function WaitingPlayer({ gameId, playerList, mode, initGame }: WaitingPlayerProps) {
  const [isReady, setIsReady] = useState<boolean>(false);

  useEffect(() => {
    setIsReady(playerList.every(player => !!player.id));
  }, [playerList]);

  return (
    <>
      <Title>Waiting for Player</Title>
      <Wrapper>
        <QRCode url={`https://${window.location.host}/gamepad/${gameId}`} />
        <div className='players'>
          <RoleList size={110} mode={mode} playerList={playerList} />
          {isReady
            ? <PopButton text='🐧GAME START🐧' onClick={initGame} />
            : <PopButton text='WAITING...' size='1.8rem' waiting />
          }
        </div>
      </Wrapper>
      <Description>Recognize QR code using mobile device</Description>
    </>
  );
}

const Title = styled.h2`
  font-size: 3rem;
  font-weight: 400;
  margin: 10px 0;
`;

const Description = styled.span`
  margin: 0 0 10px 12px;
  font-size: 1.3rem;
  color: ${({ theme }) => theme.color.gray};
`;

const Wrapper = styled.div`
  display: flex;

  .players {
    ${flexCenter}
    flex-direction: column;
    align-items: stretch;
    width: 400px;
    padding: 30px 10px;
    margin: 0 0 10px 20px;
  }
`;

export default WaitingPlayer;
