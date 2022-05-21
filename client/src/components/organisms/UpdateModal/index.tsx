import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import * as S from './style';
import { FormInput } from 'components/molecules';
import { Button, Input } from 'components/atoms';

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
  updateItem: (content: string, refId?: string) => void;
  value?: string;
  refId?: string;
}

const UpdateModal = (props: Props) => {
  const { isOpen, setIsShowModalCallback, updateItem, value, refId } = props;
  const [updateContent, setUpdateContent] = useState('');
  const [refIdContent, setRefIdContent] = useState('');

  useEffect(() => {
    if (value) {
      setUpdateContent(value);
    }
    if (refId) {
      setRefIdContent(refId);
    }
  }, [value, refId]);

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
          updateItem(updateContent, refIdContent.trim());
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
