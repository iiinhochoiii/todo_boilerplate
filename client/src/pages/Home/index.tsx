import React, { useState, useEffect } from 'react';
import * as S from './style';
import { FormInput } from 'components/molecules';
import { Card, Pagination, UpdateModal } from 'components/organisms';
import axios from 'utils/axios';
import { Posts } from 'interfaces/models/posts';

const HomePage = () => {
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [posts, setPosts] = useState<Posts[]>([]);
  const [content, setContent] = useState<string>('');

  const [isShowModal, setIsShowModal] = useState(false);
  const [selectId, setSelectId] = useState<number | null>(null);

  useEffect(() => {
    getList();
  }, [page]);

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

  const updateItemIsDone = async (
    id: number,
    isDone: boolean
  ): Promise<void> => {
    try {
      await axios.post('/posts/isDone', {
        id: id,
        isDone: isDone,
      });

      getList();
    } catch (err) {
      console.log(err);
    }
  };

  const updateItem = async (content: string): Promise<void> => {
    try {
      await axios.post('/posts/update', {
        id: selectId,
        content: content,
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
                updateItemIsDone={(id: number, isDone: boolean) =>
                  updateItemIsDone(id, isDone)
                }
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
        updateItem={(content: string) => updateItem(content)}
      />
    </S.PageTemplate>
  );
};

export default HomePage;
