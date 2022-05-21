import styled from 'styled-components';
import { palette } from 'styled-tools';
import { Input } from 'components/atoms';
import { Props } from './index';
export const Container = styled.div`
  display: flex;
`;

export const InputWrap = styled(Input)<Props>`
  width: ${(props) => props.width};
  border: 1px solid ${palette('Gray')};
  height: 40px;
  min-width: 250px;
  outline: none;
  padding: 0 10px;
  margin: 0 10px 0 0;
`;
