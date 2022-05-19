import React, { useState, useEffect } from 'react';
import * as S from './style';

interface Props {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  total: number;
}

const Pagination = (props: Props) => {
  const { page, setPage, total } = props;
  const [pageArr, setPageArr] = useState<number[]>([]);
  const [lastPageNum, setLastPageNum] = useState(0);

  useEffect(() => {
    if (total > 0) {
      const pageNavSize = 5;
      const pageSize = 10; // 한 페이지당 나오는 content 갯수

      const startPage = Math.ceil(page / pageNavSize - 1) * pageNavSize + 1;

      // const endPage = Math.ceil(page / pageNavSize) * pageNavSize;

      setLastPageNum(Math.ceil(total / pageSize) - 1);
      setPageArr(
        Array.from({ length: pageNavSize }, (_, i) => i + startPage).filter(
          (i) => i <= Math.ceil(total / pageSize)
        )
      );
    }
  }, [total, page]);

  return (
    <S.Container>
      <S.ArrowButton
        content={'<'}
        onClick={() => {
          if (page > 1) {
            setPage((page) => page - 1);
          }
        }}
      />
      {pageArr.map((item) => (
        <S.PageButton
          key={item}
          isPaging={item === page}
          onClick={() => setPage(item)}
        >
          {item}
        </S.PageButton>
      ))}
      <S.ArrowButton
        content={'>'}
        onClick={() => {
          if (page < lastPageNum) {
            setPage((page) => page + 1);
          }
        }}
      />
    </S.Container>
  );
};

export default Pagination;
