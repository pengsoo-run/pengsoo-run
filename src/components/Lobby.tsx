import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  GameMode,
  initGame,
  startGame,
  resetGame,
  selectGame,
} from '../store/gameSlice';
import Game from './Game';

function Lobby() {
  const game = useSelector(selectGame);
  const dispatch = useDispatch();

  console.log(game.mode);

  const selectMode = (ev: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    const selected = (ev.target as HTMLInputElement).value as GameMode;
    dispatch(initGame({ id: 'uniqueid', mode: selected }));
  };

  return (
    <div>
      <h1>Lobby</h1>
      {game.mode ? (
        <div>
          <h2>Waiting Players..</h2>
          <p>QR CODE</p>
          <input
            type='button'
            onClick={() => dispatch(resetGame())}
            value='모드 선택으로 돌아가기'
          />
          <input
            type='button'
            onClick={() => dispatch(startGame())}
            value='게임 시작'
          />
          {game.isPlaying && <Game />}
        </div>
      ) : (
        <div>
          <h2>Select Mode</h2>
          <input type='button' onClick={selectMode} value='1 Player' />
          <input type='button' onClick={selectMode} value='2 Player' />
        </div>
      )}
    </div>
  );
}

export default Lobby;