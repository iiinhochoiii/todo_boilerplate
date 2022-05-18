import React from 'react';
import * as S from './style';
import { CheckBox } from 'components/atoms';
import { Posts } from 'interfaces/models/posts';
import dayjs from 'dayjs';

interface Props {
  post: Posts;
  removeItem: (id: number) => void;
}

const Card = (props: Props) => {
  const { post, removeItem } = props;

  return (
    <S.Container>
      <S.LeftContent>
        <CheckBox />
      </S.LeftContent>
      <S.MainContent>
        <S.Title>{post.content}</S.Title>
        {post?.refId && <S.Text className="ref">{post.refId.join(',')}</S.Text>}
        <S.Text className="date">
          생성일: {dayjs(post.createdAt).format('YYYY-MM-DD')}
        </S.Text>
        {post?.updatedAt && (
          <S.Text className="date">
            최종 변경일: {dayjs(post.updatedAt).format('YYYY-MM-DD')}
          </S.Text>
        )}
      </S.MainContent>
      <S.RightContent>
        <S.RemoveButton onClick={() => removeItem(post.id)}>X</S.RemoveButton>
      </S.RightContent>
    </S.Container>
  );
};

export default Card;
