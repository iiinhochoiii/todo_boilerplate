import React, { useState } from 'react';
import Modal from 'react-modal';
import { FormInput } from 'components/molecules';

const customStyles = {
  content: {
    width: '800px',
    height: '400px',
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
  updateItem: (content: string) => void;
}

const UpdateModal = (props: Props) => {
  const { isOpen, setIsShowModalCallback, updateItem } = props;
  const [updateContent, setUpdateContent] = useState('');

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => setIsShowModalCallback(false)}
      style={customStyles}
      ariaHideApp={false}
    >
      <FormInput
        value={updateContent}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setUpdateContent(e.target.value)
        }
        submit={() => {
          updateItem(updateContent);
        }}
        title={'Update Todo'}
      />
    </Modal>
  );
};

export default UpdateModal;
