import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { Player } from '~/types/game.type';

import QRCode from './QRCode';
import PopButton from './PopButton';
import { useHistory } from 'react-router-dom';

interface WaitingPlayerProps {
  gameId: string;
  playerList: Player[];
}

function WaitingPlayer({ gameId, playerList }: WaitingPlayerProps) {
  const history = useHistory();
  const [isReady, setIsReady] = useState<boolean>(false);

  useEffect(() => {
    // for (const player of playerList) {
    //   if (!player.id) return setIsReady(false);
    // }
    setIsReady(true);
  }, [playerList]);

  const moveToGamePath = () => history.push('/game');

  return (
    <>
      <h1>Waiting for Player</h1>
      <PlayerList>
        <QRCode url={`https://${window.location.host}/gamepad/${gameId}`} />
        <div className='players'>
          {playerList.map((player, idx) => (
            <div key={player.id || idx}>{player.role}</div>
          ))}
          {isReady && <PopButton text='GAME START' onClick={moveToGamePath} />}
        </div>
      </PlayerList>
    </>
  );
}

const PlayerList = styled.div`
  display: flex;

  .players {
    display: flex;
    flex-direction: column;
    margin-left: 20px;
  }
`;

export default WaitingPlayer;
