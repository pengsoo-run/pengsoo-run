import React from 'react';
import { render } from '~/setupTests';

import { GameMode, PlayerRole } from '~/types/game.type';
import { theme } from '../styles/theme';
import RoleList, { RoleListProps } from '../RoleList';

describe('<RoleList />', () => {
  const MOCK_PROPS = {
    mode: GameMode.P1,
    playerList: [{ id: null, role: PlayerRole.ALL }],
    size: 1,
    selection: false,
  } as RoleListProps;

  it('should show buttons of all roles', () => {
    const { getByText } = render(<RoleList {...MOCK_PROPS} />);

    expect(getByText(PlayerRole.L)).toBeInTheDocument();
    expect(getByText(PlayerRole.R)).toBeInTheDocument();
    expect(getByText(PlayerRole.J)).toBeInTheDocument();
  });

  it('should distinguish unconnected player by color', () => {
    const { getByText } = render(<RoleList {...MOCK_PROPS} />);

    expect(getByText(PlayerRole.L)).toHaveStyle({ 'background-color': theme.color.gray });
    expect(getByText(PlayerRole.R)).toHaveStyle({ 'background-color': theme.color.gray });
    expect(getByText(PlayerRole.J)).toHaveStyle({ 'background-color': theme.color.gray });
  });
});
