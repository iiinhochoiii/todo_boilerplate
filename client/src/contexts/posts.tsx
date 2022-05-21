import React, { createContext, useState } from 'react';
import { Posts, searchPost } from 'interfaces/models/posts';
import { PostsContext } from 'interfaces/contexts/Posts';
import axios from 'utils/axios';
import { getIdByUniq } from 'utils/getIdByUniq';

export const AppContext = createContext<PostsContext>({
  posts: [],
  getList: () => null,
  addItem: () => null,
  removeItem: () => null,
  updateItemIsDone: () => null,
  updateItem: () => null,
  total: 0,
  page: 1,
  setPage: () => null,
});

interface Props {
  children: React.ReactNode;
}

const PostsStore = (props: Props) => {
  const { children } = props;

  const [posts, setPosts] = useState<Posts[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);

  const getList = async (
    page?: number,
    searchData?: searchPost
  ): Promise<void> => {
    try {
      const res = await axios.get('/posts', {
        params: {
          page: page,
          ...(searchData?.content && { content: searchData?.content }),
          ...(searchData?.isDone && { isDone: searchData?.isDone === 'true' }),
          ...(searchData?.startAt &&
            searchData?.endAt && {
              startAt: searchData?.startAt,
              endAt: searchData?.endAt,
            }),
        },
      });
      setPosts(res.data.rows);
      setTotal(res.data.total);
    } catch (err) {
      console.log(err);
    }
  };

  const addItem = async (content?: string): Promise<void> => {
    if (content) {
      try {
        await axios.post('/posts', { content: content });
        getList(1);
      } catch (err) {
        console.log(err);
      }
    } else {
      alert('추가할 내용을 입력해주세요.');
    }
  };

  const removeItem = async (id: number): Promise<void> => {
    if (id) {
      if (window.confirm('정말 삭제 하시겠습니까?')) {
        try {
          await axios.delete(`/posts/${id}`);
          getList(page);
        } catch (err) {
          console.log(err);
        }
      }
    } else {
      alert('id가 없습니다.');
    }
  };

  const updateItemIsDone = async (id: number): Promise<void> => {
    try {
      const res = await axios.post('/posts/isDone', {
        id: id,
      });

      if (!res.data.status) {
        alert(res.data.msg);
      }
      getList(page);
    } catch (err) {
      console.log(err);
    }
  };

  const updateItem = async (
    id: number,
    content: string,
    list: Posts[],
    refId?: string
  ): Promise<void> => {
    try {
      const refIdList = getIdByUniq(refId) || [];

      const filterList = refIdList.filter((item) => {
        const findItem = list.find((f) => f.id === item);
        return findItem && findItem.id;
      });

      await axios.post('/posts/update', {
        id: id,
        content: content,
        ...(filterList.length > 0 && {
          refId: JSON.stringify(filterList),
        }),
      });

      getList(page);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AppContext.Provider
      value={{
        posts,
        getList,
        addItem,
        removeItem,
        updateItemIsDone,
        updateItem,
        total,
        page,
        setPage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default PostsStore;
