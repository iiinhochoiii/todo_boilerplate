import React, { useState, useEffect, useContext } from 'react';
import * as S from './style';
import { FormInput } from 'components/molecules';
import {
  Card,
  Pagination,
  UpdateModal,
  SearchForm,
} from 'components/organisms';
import { searchPost } from 'interfaces/models/posts';
import { AppContext } from 'contexts/posts';

const HomePage = () => {
  const { posts, getList, total, addItem, page, setPage } =
    useContext(AppContext);
  const [content, setContent] = useState<string>('');
  const [searchData, setSearchData] = useState<searchPost>({});
  const [isShowModal, setIsShowModal] = useState(false);
  const [selectId, setSelectId] = useState<number | null>(null);

  useEffect(() => {
    getList(page, searchData);
  }, [page]);

  const openModalId = (id: number) => {
    setSelectId(id);
    setIsShowModal(true);
  };

  const search = (searchData?: searchPost) => {
    if (searchData) {
      getList(1, searchData);
      setPage(1);
    }
  };

  return (
    <S.PageTemplate>
      <S.Container>
        <S.Section>
          <SearchForm
            searchData={searchData}
            setSearchData={setSearchData}
            search={(searchData?: searchPost) => search(searchData)}
          />
        </S.Section>

        <S.Section>
          <S.CenterContent>
            <FormInput
              value={content}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setContent(e.target.value)
              }
              submit={() => {
                addItem(content);
                setContent('');
              }}
            />
          </S.CenterContent>
        </S.Section>
        <S.Section>
          <S.CenterContent style={{ width: 'calc(100% - 100px)' }}>
            {posts.map((post) => (
              <Card
                key={post.id}
                post={post}
                openModalId={(id: number) => openModalId(id)}
              />
            ))}
          </S.CenterContent>
        </S.Section>
        <S.Section>
          <Pagination page={page} setPage={setPage} total={total} />
        </S.Section>
      </S.Container>

      <UpdateModal
        isOpen={isShowModal}
        setIsShowModalCallback={(value: boolean) => setIsShowModal(value)}
        selectId={selectId}
      />
    </S.PageTemplate>
  );
};

export default HomePage;
