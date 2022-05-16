import React from 'react';
import { Button } from 'components/atoms';
import * as S from './style';

const FormInput = () => {
  return (
    <S.Container>
      <S.InputWrap />
      <Button>Add Todo</Button>
    </S.Container>
  );
};

export default FormInput;
