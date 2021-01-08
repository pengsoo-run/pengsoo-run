import React from 'react';
import { render } from '~/setupTests';

import Welcome from '../Welcome';

describe('<Welcome />', () => {
  it('should be able to play the intro video', () => {
    const playStub = jest
      .spyOn(window.HTMLMediaElement.prototype, 'play')
      .mockImplementation(async () => {});
    const { container } = render(<Welcome />);

    container.querySelector('video')?.play();

    expect(playStub).toHaveBeenCalled();
    playStub.mockRestore();
  });

  it('should show welcome image', () => {
    const { getByAltText } = render(<Welcome />);
    const gameMachineImg = getByAltText('game-machine');

    expect(gameMachineImg).toBeInTheDocument();
  });

  it('should show a button to go lobby', () => {
    const { getByText } = render(<Welcome />);
    const buttonLink = getByText('ENTER').closest('a');

    expect(buttonLink).not.toEqual(null);
    expect((buttonLink as HTMLAnchorElement).getAttribute('href')).toEqual('/lobby');
  });
});
