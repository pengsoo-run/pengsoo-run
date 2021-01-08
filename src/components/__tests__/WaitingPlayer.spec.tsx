import React from 'react';
import { fireEvent } from '@testing-library/react';
import { render } from '~/setupTests';

import { GameMode, PlayerRole } from '~/types/game.type';
import WaitingPlayer, { WaitingPlayerProps } from '../WaitingPlayer';

describe('<WaitingPlayer />', () => {
  const MOCK_PROPS = {
    gameId: '1',
    playerList: [{ id: null, role: PlayerRole.ALL }],
    mode: GameMode.P1,
    initGame: jest.fn(),
  } as WaitingPlayerProps;

  it('should disabled the button when all players are not ready', () => {
    const { getByRole } = render(<WaitingPlayer {...MOCK_PROPS} />);
    const button = getByRole('button');

    expect(button).toBeDisabled();
  });

  it('should enabled the button when all players are ready', () => {
    MOCK_PROPS.playerList[0].id = '1';

    const { getByRole } = render(<WaitingPlayer {...MOCK_PROPS} />);
    const button = getByRole('button');

    expect(button).toHaveTextContent('GAME START');
    expect(button).toBeEnabled();
  });

  it('should be invoked initGame handler when click event occurs', () => {
    const { getByRole } = render(<WaitingPlayer {...MOCK_PROPS} />);
    const button = getByRole('button');

    fireEvent.click(button);

    expect(MOCK_PROPS.initGame).toBeCalled();
  });
});
