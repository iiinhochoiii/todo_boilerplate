import React from 'react';
import * as S from './style';
import { FormInput } from 'components/molecules';
import { Card } from 'components/organisms';

const HomePage = () => {
  return (
    <S.PageTemplate>
      <S.Container>
        <S.AddSection>
          <S.CenterContent>
            <FormInput />
          </S.CenterContent>
        </S.AddSection>
        <S.ContentSection>
          <S.CenterContent style={{ width: 'calc(100% - 100px)' }}>
            <Card />
          </S.CenterContent>
        </S.ContentSection>
      </S.Container>
    </S.PageTemplate>
  );
};

export default HomePage;
