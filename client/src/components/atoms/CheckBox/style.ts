import styled, { css } from 'styled-components';
import { palette } from 'styled-tools';

interface WrapProps {
  checked?: boolean;
}

const stylesWrap = css<WrapProps>`
  ${(props) => {
    if (props.checked) {
      return css`
        background-color: ${palette('Purple')};
        border: 1px solid ${palette('Purple')};
      `;
    } else {
      return css`
        border: 1px solid ${palette('Gray')};
        background: none;
      `;
    }
  }}
`;
export const Wrap = styled.div<WrapProps>`
  ${stylesWrap};
  width: 13px;
  height: 13px;
  border-radius: 2px;
  cursor: pointer;
  display: flex;

  & > svg {
    margin: auto;
    color: ${palette('White')};
  }
`;
