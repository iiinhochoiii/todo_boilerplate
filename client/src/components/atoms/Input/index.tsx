import React, { HTMLAttributes } from 'react';
import * as S from './style';

interface Props extends HTMLAttributes<HTMLInputElement> {
  sx?: React.CSSProperties;
  value: string;
}

const Input = (props: Props) => {
  const { sx } = props;

  return <S.Container {...props} style={sx} />;
};

export default Input;
