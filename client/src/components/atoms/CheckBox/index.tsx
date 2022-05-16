import React, { HTMLAttributes } from 'react';
import * as S from './style';

interface Props extends HTMLAttributes<HTMLInputElement> {
  sx?: React.CSSProperties;
}
const CheckBox = (props: Props) => {
  const { sx } = props;
  return <S.Wrap {...props} style={sx} type="checkbox" />;
};

export default CheckBox;
