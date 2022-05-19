import React from 'react';
import * as S from './style';
import { CheckBox } from 'components/atoms';
import { Posts } from 'interfaces/models/posts';
import dayjs from 'dayjs';

interface Props {
  post: Posts;
  removeItem: (id: number) => void;
  updateItemIsDone: (id: number, isDone: boolean) => void;
  openModalId: (id: number) => void;
}

const Card = (props: Props) => {
  const { post, removeItem, updateItemIsDone, openModalId } = props;

  return (
    <S.Container>
      <S.LeftContent>
        <CheckBox
          checked={Boolean(post.isDone)}
          onClick={(isDone: boolean) => updateItemIsDone(post.id, isDone)}
        />
      </S.LeftContent>
      <S.MainContent onClick={() => openModalId(post.id)}>
        <S.Title isDone={!!post.isDone}>{post.content}</S.Title>
        {post?.refId && (
          <S.Text className="ref" isDone={!!post.isDone}>
            {post.refId.join(',')}
          </S.Text>
        )}
        <S.Text className="date" isDone={!!post.isDone}>
          생성일: {dayjs(post.createdAt).format('YYYY-MM-DD')}
        </S.Text>
        {post?.updatedAt && (
          <S.Text className="date" isDone={!!post.isDone}>
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
