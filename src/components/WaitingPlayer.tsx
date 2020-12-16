import React from 'react';
import styled from 'styled-components';

import QRCode from './QRCode';

interface WaitingPlayerProps {
  gameId: string;
}

function WaitingPlayer({ gameId }: WaitingPlayerProps) {
  return (
    <>
      <h1>Waiting for Player</h1>
      <PlayerList>
        <QRCode url={`https://${window.location.host}/gamepad/${gameId}`} />
        <div className='players'>
          <h1>선수명단</h1>
        </div>
      </PlayerList>
    </>
  );
}

const PlayerList = styled.div`
  display: flex;

  .players {
    margin-left: 20px;
    border: 2px solid red;
  }
`;

export default WaitingPlayer;
