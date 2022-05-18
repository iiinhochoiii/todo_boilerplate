import React, { useState, useEffect } from 'react';
import * as S from './style';
import { FormInput } from 'components/molecules';
import { Card, Pagination } from 'components/organisms';
import axios from 'utils/axios';
import { Posts } from 'interfaces/models/posts';

const HomePage = () => {
  const [page, setPage] = useState(6);
  const [total] = useState(62);
  const [posts, setPosts] = useState<Posts[]>([]);
  const [content, setContent] = useState<string>('');

  useEffect(() => {
    getList();
  }, []);

  const getList = async (): Promise<void> => {
    try {
      const res = await axios.get('/posts');
      setPosts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const addItem = async (): Promise<void> => {
    try {
      await axios.post('/posts', { content: content });
      getList();
    } catch (err) {
      console.log(err);
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
              addTodo={() => addItem()}
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
              />
            ))}
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
