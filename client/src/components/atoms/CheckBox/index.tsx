import React, { useState, useEffect } from 'react';
import * as S from './style';
import { FaCheck } from 'react-icons/fa';

interface Props {
  sx?: React.CSSProperties;
  checked: boolean;
  onClick: () => void;
}
const CheckBox = (props: Props) => {
  const { sx, checked } = props;
  const [isChecked, setIsChecked] = useState(checked);

  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  return (
    <S.Wrap {...props} style={sx} checked={isChecked}>
      {isChecked && <FaCheck size={'0.55rem'} />}
    </S.Wrap>
  );
};

export default CheckBox;
