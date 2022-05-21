import styled from 'styled-components';
import { palette } from 'styled-tools';

export const Container = styled.div`
  margin: 30px auto;
  display: flex;
`;

export const Box = styled.div`
  & > label {
    font-size: 12px;
  }
`;

export const SelectBox = styled.select`
  width: 100px;
  height: 42px;
  border: 1px solid ${palette('Gray')};
  margin: 0 10px 0 0;
`;

export const DateBox = styled.input`
  width: 150px;
  height: 42px;
  border: 1px solid ${palette('Gray')};
`;
