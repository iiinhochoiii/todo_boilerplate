import styled, { css } from 'styled-components';
import { palette } from 'styled-tools';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  margin: 30px auto;
`;

const buttonStyles = css`
  border: 1px solid ${palette('SkyBlue')};
  border-radius: 5px;
  padding: 5px 10px;
  margin: 0px 10px;
  font-size: 14px;
  font-weight: 700;
  background: none;
`;

interface ArrowButtonProps {
  content?: string;
}

export const ArrowButton = styled.button<ArrowButtonProps>`
  ${buttonStyles};
  background: none;

  &:before {
    content: ${(props) => `'${props.content}'`};
    font-weight: 700;
  }
`;

interface PageButtonProps {
  isPaging?: boolean;
}

const pageButtonStyles = css<PageButtonProps>`
  ${(props) => {
    if (props.isPaging) {
      return css`
        background-color: ${palette('SkyBlue')};
        color: ${palette('White')};
      `;
    }
  }}
`;

export const PageButton = styled.button<PageButtonProps>`
  ${buttonStyles};
  ${pageButtonStyles};
`;
