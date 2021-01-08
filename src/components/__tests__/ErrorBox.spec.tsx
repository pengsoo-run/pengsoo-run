import React from 'react';
import { render } from '~/setupTests';

import ErrorBox from '../ErrorBox';

describe('<ErrorBox />', () => {
  const MOCK_MESSAGE = 'test-message';

  it('should show message received as prop', () => {
    const { getByText } = render(<ErrorBox message={MOCK_MESSAGE} />);

    expect(getByText(MOCK_MESSAGE, { exact: false })).toBeInTheDocument();
  });

  it('should show a button to go home', () => {
    const { getByText } = render(<ErrorBox message={MOCK_MESSAGE} />);
    const buttonLink = getByText('HOME').closest('a');

    expect(buttonLink).not.toEqual(null);
    expect((buttonLink as HTMLAnchorElement).getAttribute('href')).toEqual('/');
  });
});
