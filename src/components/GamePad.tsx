import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

interface MatchParams {
  id: string;
}

function GamePad({ match }: RouteComponentProps<MatchParams>) {
  const { id } = match.params;

  return (
    <div>
      <h2>GamePad - Mobile view</h2>
      <div>{id}</div>
    </div>
  );
}

export default GamePad;
