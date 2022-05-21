import React, { HTMLAttributes } from 'react';
import { Button } from 'components/atoms';
import * as S from './style';

export interface Props extends HTMLAttributes<HTMLInputElement> {
  submit: () => void;
  value: string;
  title?: string;
  width?: string;
}

const FormInput = (props: Props) => {
  const { title, submit, width } = props;
  return (
    <S.Container>
      <S.InputWrap {...props} width={width} />
      <Button onClick={() => submit()}>{title || 'Add Todo'}</Button>
    </S.Container>
  );
};

export default FormInput;
