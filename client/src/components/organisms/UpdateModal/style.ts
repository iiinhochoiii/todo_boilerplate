import styled from 'styled-components';
import { palette } from 'styled-tools';

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 0 30px 0;
  padding: 0 0 10px 0;
  border-bottom: 1px solid ${palette('Gray')};
`;

export const Title = styled.p`
  margin: auto 0;
  font-size: 18px;
  font-weight: 900;
`;

export const RefContentWrap = styled.div`
  margin: 30px 0 0 0;

  & > span {
    font-size: 13px;
    margin: 10px 0;
    font-weight: 300;
  }
`;

export const InputWrap = styled.input`
  margin: 10px 0 0 0;
  outline: none;
`;
