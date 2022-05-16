import React, { HTMLAttributes } from 'react';
import * as S from './style';

export interface Props extends HTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  buttonType?: string;
  sx?: React.CSSProperties;
}

const Button = (props: Props) => {
  const { children, sx } = props;

  return (
    <S.Container {...props} style={sx}>
      {children}
    </S.Container>
  );
};

export default Button;
