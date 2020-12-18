import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { GameMode, Player } from '~/types/game.type';
import { flexCenter } from './styles/mixin';

import QRCode from './QRCode';
import PopButton from './PopButton';
import RoleList from './RoleList';

interface WaitingPlayerProps {
  gameId: string;
  playerList: Player[];
  mode: GameMode;
  startGame: () => void;
}

function WaitingPlayer({ gameId, playerList, mode, startGame }: WaitingPlayerProps) {
  const [isReady, setIsReady] = useState<boolean>(false);

  useEffect(() => {
    for (const player of playerList) {
      if (!player.id) return setIsReady(false);
    }

    setIsReady(true);
  }, [playerList]);

  return (
    <>
      <h1>Waiting for Player</h1>
      <Wrapper>
        <QRCode url={`https://${window.location.host}/gamepad/${gameId}`} />
        <div className='players'>
          <RoleList size={110} mode={mode} playerList={playerList} />
          {isReady ? (
            <PopButton text='🐧GAME START🐧' onClick={startGame} />
          ) : (
            <PopButton text='Waiting...' size='1.8rem' waiting />
          )}
        </div>
      </Wrapper>
    </>
  );
}

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
