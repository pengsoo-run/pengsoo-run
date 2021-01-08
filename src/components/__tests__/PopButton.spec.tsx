import React from 'react';
import { fireEvent } from '@testing-library/react';
import { render } from '~/setupTests';

import PopButton from '../PopButton';

describe('<PopButton />', () => {
  const MOCK_TEXT = 'test-text';

  it('should show message received as prop', () => {
    const { getByText } = render(<PopButton text={MOCK_TEXT} />);

    expect(getByText(MOCK_TEXT)).toBeInTheDocument();
  });

  it('should be disabled when waiting option is true', () => {
    const { getByRole } = render(<PopButton text={MOCK_TEXT} waiting />);
    const waitingButton = getByRole('button');

    expect(waitingButton).toBeDisabled();
  });

  it('should be invoked handler each time click event occurs', () => {
    const onClick = jest.fn();
    const { getByText } = render(<PopButton text={MOCK_TEXT} onClick={onClick} />);
    const button = getByText(MOCK_TEXT);

    fireEvent.click(button);
    fireEvent.click(button);

    expect(onClick).toBeCalledTimes(2);

    fireEvent.click(button);
    fireEvent.click(button);

    expect(onClick).toBeCalledTimes(4);
  });
});
