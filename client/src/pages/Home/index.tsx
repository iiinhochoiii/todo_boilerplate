import React, { useState, useEffect } from 'react';
import * as S from './style';
import { FormInput } from 'components/molecules';
import { Card, Pagination, UpdateModal } from 'components/organisms';
import axios from 'utils/axios';
import { Posts } from 'interfaces/models/posts';
import { getIdByUniq } from 'utils/getIdByUniq';

const HomePage = () => {
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [posts, setPosts] = useState<Posts[]>([]);
  const [content, setContent] = useState<string>('');

  const [isShowModal, setIsShowModal] = useState(false);
  const [selectId, setSelectId] = useState<number | null>(null);
  const [allItems, setAllItems] = useState<Posts[]>([]);

  useEffect(() => {
    getAllList();
  }, []);

  useEffect(() => {
    getList();
  }, [page]);

  const getAllList = async (): Promise<void> => {
    try {
      const res = await axios.get('/posts/all');
      setAllItems(res.data.rows);
    } catch (err) {
      console.log(err);
    }
  };

  const getList = async (): Promise<void> => {
    try {
      const res = await axios.get('/posts', {
        params: {
          page: page,
        },
      });
      setPosts(res.data.rows);
      setTotal(res.data.total);
    } catch (err) {
      console.log(err);
    }
  };

  const addItem = async (): Promise<void> => {
    if (content) {
      try {
        await axios.post('/posts', { content: content });
        setContent('');
        getList();
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
          getList();
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
      getList();
    } catch (err) {
      console.log(err);
    }
  };

  const updateItem = async (content: string, refId?: string): Promise<void> => {
    try {
      const refIdList = getIdByUniq(refId) || [];

      const filterList = refIdList.filter((item) => {
        const findItem = allItems.find((f) => f.id === item);
        return findItem && findItem.id;
      });

      await axios.post('/posts/update', {
        id: selectId,
        content: content,
        ...(filterList.length > 0 && {
          refId: JSON.stringify(filterList),
        }),
      });

      getList();
      setSelectId(null);
      setIsShowModal(false);
    } catch (err) {
      console.log(err);
    }
  };

  const openModalId = (id: number) => {
    setSelectId(id);
    setIsShowModal(true);
  };

  return (
    <S.PageTemplate>
      <S.Container>
        <S.AddSection>
          <S.CenterContent>
            <FormInput
              value={content}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setContent(e.target.value)
              }
              submit={() => addItem()}
            />
          </S.CenterContent>
        </S.AddSection>
        <S.ContentSection>
          <S.CenterContent style={{ width: 'calc(100% - 100px)' }}>
            {posts.map((post) => (
              <Card
                key={post.id}
                post={post}
                removeItem={(id: number) => removeItem(id)}
                updateItemIsDone={(id: number) => updateItemIsDone(id)}
                openModalId={(id: number) => openModalId(id)}
              />
            ))}
          </S.CenterContent>
        </S.ContentSection>
        <S.PageSection>
          <Pagination page={page} setPage={setPage} total={total} />
        </S.PageSection>
      </S.Container>

      <UpdateModal
        isOpen={isShowModal}
        setIsShowModalCallback={(value: boolean) => setIsShowModal(value)}
        updateItem={(content: string, refId?: string) =>
          updateItem(content, refId)
        }
        value={posts.find((post) => post.id === selectId)?.content}
        refId={posts
          .find((post) => post.id === selectId)
          ?.refId?.map((item) => `@${item}`)
          .join(', ')}
      />
    </S.PageTemplate>
  );
};

export default HomePage;
