import styled from 'styled-components';
import { palette } from 'styled-tools';

export const Container = styled.button`
  height: 40px;
  min-width: 100px;
  border-radius: 5px;
  font-size: 16px;
  background-color: ${palette('SkyBlue')};
  color: ${'White'};
`;
