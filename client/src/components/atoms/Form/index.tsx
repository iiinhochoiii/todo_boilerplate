import React, { HTMLAttributes } from 'react';
import * as S from './style';

interface Props extends HTMLAttributes<HTMLFormElement> {
  children?: React.ReactNode;
  sx?: React.CSSProperties;
}

const Form = (props: Props) => {
  const { children, sx } = props;

  return (
    <S.Container {...props} style={sx}>
      {children}
    </S.Container>
  );
};

export default Form;
