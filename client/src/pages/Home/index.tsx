import React, { useState } from 'react';
import * as S from './style';
import { FormInput } from 'components/molecules';
import { Card, Pagination } from 'components/organisms';

const HomePage = () => {
  const [page, setPage] = useState(6);
  const [total] = useState(62);

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
        <S.PageSection>
          <Pagination page={page} setPage={setPage} total={total} />
        </S.PageSection>
      </S.Container>
    </S.PageTemplate>
  );
};

export default HomePage;
