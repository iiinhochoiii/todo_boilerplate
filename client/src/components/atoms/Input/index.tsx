import React, { HTMLAttributes } from 'react';
import * as S from './style';

interface Props extends HTMLAttributes<HTMLInputElement> {
  children?: React.ReactNode;
  sx?: React.CSSProperties;
}

const Input = (props: Props) => {
  const { children, sx } = props;

  return (
    <S.Container {...props} style={sx}>
      {children}
    </S.Container>
  );
};

export default Input;
