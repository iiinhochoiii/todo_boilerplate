import React, { HTMLAttributes } from 'react';
import { Button } from 'components/atoms';
import * as S from './style';

interface Props extends HTMLAttributes<HTMLInputElement> {
  addTodo: () => void;
  value: string;
}

const FormInput = (props: Props) => {
  const { addTodo } = props;
  return (
    <S.Container>
      <S.InputWrap {...props} />
      <Button onClick={() => addTodo()}>Add Todo</Button>
    </S.Container>
  );
};

export default FormInput;
