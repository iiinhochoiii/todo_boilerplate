import React, { HTMLAttributes } from 'react';
import { Button } from 'components/atoms';
import * as S from './style';

interface Props extends HTMLAttributes<HTMLInputElement> {
  submit: () => void;
  value: string;
  title?: string;
}

const FormInput = (props: Props) => {
  const { title, submit } = props;
  return (
    <S.Container>
      <S.InputWrap {...props} />
      <Button onClick={() => submit()}>{title || 'Add Todo'}</Button>
    </S.Container>
  );
};

export default FormInput;
