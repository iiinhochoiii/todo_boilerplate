import React from 'react';
import { Button, Input } from 'components/atoms';
import * as S from './style';
import { searchPost } from 'interfaces/models/posts';

interface Props {
  search: (searchData?: searchPost) => void;
  searchData: searchPost;
  setSearchData: React.Dispatch<React.SetStateAction<searchPost>>;
}

const SearchForm = (props: Props) => {
  const { search, searchData, setSearchData } = props;

  const onClickHandler = () => {
    if (searchData.startAt && !searchData.endAt) {
      alert('종료일이 설정되어있지 않습니다.');
    } else if (!searchData.startAt && searchData.endAt) {
      alert('시작일이 설정되어있지 않습니다.');
    } else {
      search(searchData);
    }
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchData({
      ...searchData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <S.Container>
      <S.Box>
        <label>content</label>
        <br />
        <Input
          name="content"
          value={searchData?.content || ''}
          placeholder="검색 하실 Todo Content를 입력해주세요"
          onChange={onChangeHandler}
          sx={{ width: '300px', margin: '0 10px 0 0' }}
        />
      </S.Box>
      <S.Box>
        <label>완료 여부</label>
        <br />
        <S.SelectBox
          name="isDone"
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            setSearchData({
              ...searchData,
              [e.target.name]: e.target.value,
            });
          }}
        >
          <option value="">전체</option>
          <option value="true">완료</option>
          <option value="false">미완료</option>
        </S.SelectBox>
      </S.Box>
      <S.Box style={{ margin: '0 10px 0 0' }}>
        <label>시작일</label>
        <br />
        <S.DateBox
          type="date"
          name="startAt"
          value={searchData?.startAt}
          onChange={onChangeHandler}
        />
      </S.Box>

      <S.Box style={{ margin: '0 10px' }}>
        <label>종료일</label>
        <br />
        <S.DateBox
          type="date"
          name="endAt"
          value={searchData?.endAt}
          onChange={onChangeHandler}
        />
      </S.Box>
      <Button onClick={onClickHandler} sx={{ margin: 'auto 0 0 0' }}>
        검색
      </Button>
    </S.Container>
  );
};

export default SearchForm;
