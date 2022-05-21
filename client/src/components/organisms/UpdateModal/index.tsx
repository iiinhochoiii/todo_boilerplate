import React, { useEffect, useState, useContext } from 'react';
import Modal from 'react-modal';
import * as S from './style';
import { FormInput } from 'components/molecules';
import { Button, Input } from 'components/atoms';
import { AppContext } from 'contexts/posts';
import useAllList from 'pages/Home/hooks/useAllList';
import { Posts } from 'interfaces/models/posts';

const customStyles = {
  content: {
    width: '800px',
    height: '300px',
    margin: 'auto',
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.8)',
    zIndex: 500,
  },
};

interface Props {
  isOpen: boolean;
  setIsShowModalCallback: (value: boolean) => void;
  selectId: number | null;
}

const UpdateModal = (props: Props) => {
  const { posts, updateItem } = useContext(AppContext);
  const { list } = useAllList<Posts>('/posts/all');
  const { isOpen, setIsShowModalCallback, selectId } = props;
  const [updateContent, setUpdateContent] = useState('');
  const [refIdContent, setRefIdContent] = useState('');

  useEffect(() => {
    if (selectId) {
      setUpdateContent(
        posts.find((post) => post.id === selectId)?.content || ''
      );

      setRefIdContent(
        posts
          .find((post) => post.id === selectId)
          ?.refId?.map((item) => `@${item}`)
          .join(' ') || ''
      );
    }
  }, [selectId]);

  const update = () => {
    if (selectId) {
      updateItem(selectId, updateContent, list, refIdContent);
      setIsShowModalCallback(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => setIsShowModalCallback(false)}
      style={customStyles}
      ariaHideApp={false}
    >
      <S.ModalHeader>
        <S.Title>수정</S.Title>
        <Button onClick={() => setIsShowModalCallback(false)}>닫기</Button>
      </S.ModalHeader>

      <FormInput
        value={updateContent}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setUpdateContent(e.target.value)
        }
        submit={() => {
          update();
          setRefIdContent('');
        }}
        title={'Update Todo'}
        width="500px"
      />
      <S.RefContentWrap>
        <S.Title>참조 아이디</S.Title>
        <span>
          참조할 다른 Todo가 있을 경우에, 아이디를 입력 후, [Update Todo] 버튼을
          눌러주세요
        </span>
        <br />
        <Input
          value={refIdContent}
          sx={{ margin: '20px 0 0 0', minWidth: '400px' }}
          placeholder="ex) @1 @3 @15 형식으로 입력 해주세요."
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setRefIdContent(e.target.value);
          }}
        />
      </S.RefContentWrap>
    </Modal>
  );
};

export default UpdateModal;
