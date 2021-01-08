import { css } from 'styled-components';

import { theme } from './theme';

export const flexCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const redSet = css`
  background: ${theme.color.red};
  color: ${theme.color.sub};
  border: 3px solid ${theme.color.darkred};
  box-shadow: 0px 12px 0px ${theme.color.darkred};
  text-shadow: 1px 1px 1px ${theme.color.darkred};
`;

export const orangeSet = css`
  background: ${theme.color.orange};
  color: ${theme.color.sub};
  border: 3px solid ${theme.color.darkorange};
  box-shadow: 0px 12px 0px ${theme.color.darkorange};
  text-shadow: 1px 1px 1px ${theme.color.darkorange};
`;
