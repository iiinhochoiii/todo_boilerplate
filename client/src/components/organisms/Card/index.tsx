import React from 'react';
import * as S from './style';
import { CheckBox } from 'components/atoms';

const Card = () => {
  const refId = [1, 2, 3].map((item) => `@${String(item)}`);

  return (
    <S.Container>
      <S.LeftContent>
        <CheckBox />
      </S.LeftContent>
      <S.MainContent>
        <S.Title>안녕하세요. Card 영역입니다.</S.Title>
        <S.Text className="ref">{refId.join(' ')}</S.Text>
        <S.Text className="date">생성일: 2022-05-17 12:30:00</S.Text>
        <S.Text className="date">생성일: 2022-05-17 12:30:00</S.Text>
      </S.MainContent>
      <S.RightContent>
        <S.RemoveButton>X</S.RemoveButton>
      </S.RightContent>
    </S.Container>
  );
};

export default Card;
