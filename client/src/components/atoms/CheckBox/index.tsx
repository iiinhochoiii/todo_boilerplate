import React, { useState } from 'react';
import * as S from './style';
import { FaCheck } from 'react-icons/fa';

interface Props {
  sx?: React.CSSProperties;
  checked: boolean;
  onClick: (isDone: boolean) => void;
}
const CheckBox = (props: Props) => {
  const { sx, checked, onClick } = props;
  const [isChecked, setIsChecked] = useState(checked);

  return (
    <S.Wrap
      {...props}
      style={sx}
      onClick={(e) => {
        onClick(!isChecked);
        setIsChecked(!isChecked);
      }}
      checked={isChecked}
    >
      {isChecked && <FaCheck size={'0.55rem'} />}
    </S.Wrap>
  );
};

export default CheckBox;
