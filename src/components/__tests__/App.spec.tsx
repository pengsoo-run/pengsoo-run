import React from 'react';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import App from '../App';

describe('<App />', () => {
  it('should be rendered each component matching assigned path', () => {
    const history = createMemoryHistory();
    history.push('/');

    const { getByText } = render(<Router history={history}><App /></Router>);
    expect(getByText('PENGSOO RUN')).toBeInTheDocument();

    history.push('/lobby');
    expect(getByText('Lobby')).toBeInTheDocument();

    history.push('/game');
    expect(getByText('Game')).toBeInTheDocument();
  });

  it('should be redirected to default router when accessed with an invalid path', () => {
    const history = createMemoryHistory();
    history.push('/invalidPath');

    const { getByText } = render(<Router history={history}><App /></Router>);
    expect(getByText('PENGSOO RUN')).toBeInTheDocument();
  });
});
