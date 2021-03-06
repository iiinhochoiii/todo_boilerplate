import styled, { css } from 'styled-components';
import { palette } from 'styled-tools';

export const Container = styled.article`
  display: flex;
  border: 1px solid ${palette('Gray')};
  width: calc(100% - 100px);
  padding: 15px 5px;
  border-radius: 5px;
  margin: 0 auto 15px auto;
`;

export const LeftContent = styled.div`
  width: 5%;
  margin: auto 0;
`;

export const MainContent = styled.div`
  width: 90%;
  cursor: pointer;
`;

export const RightContent = styled.div`
  margin: auto 0 auto auto;
`;

export const RemoveButton = styled.button`
  background: none;
  cursor: pointer;
  color: ${palette('LightPink')};
  font-size: 22px;
`;

interface TextProps {
  isDone?: boolean;
}

const stylesLineThrough = css<TextProps>`
  ${(props) => {
    if (props.isDone) {
      return css`
        text-decoration-line: line-through;
      `;
    }
  }}
`;

export const Title = styled.p<TextProps>`
  ${stylesLineThrough};
  margin: 0;
  font-size: 20px;
  font-weight: 700;
`;

export const Text = styled.p<TextProps>`
  ${stylesLineThrough};
  margin: 5px 0 0 0;
  &.ref {
    font-size: 16px;
    font-weight: 700;
  }

  &.date {
    font-size: 13px;
    font-weight: 300;
  }
`;
