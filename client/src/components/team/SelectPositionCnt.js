import PropTypes from 'prop-types';
import { useState, useCallback } from 'react';
import { FormControl, InputLabel, NativeSelect, Button } from '@mui/material';

SelectPositionCnt.propTypes = {
  pos: PropTypes.object.isRequired
};

export default function SelectPositionCnt(props) {
  // console.log(props);
  // STATE
  const MEMBER_SELECT = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const [selectedPositionCnt, setselectedPositionCnt] = useState('');
  const [cleared, setCleared] = useState(false);

  // HANDLE
  const handleChange = (e) => {
    setselectedPositionCnt(e.target.value);
  };
  const getData = useCallback(() => {
    props.onSetCnt(selectedPositionCnt, props.pos);
    setCleared(true);
  });

  // CONDITIONAL
  if (!cleared) {
    return (
      <FormControl>
        <InputLabel htmlFor="select-position-cnt" />
        <NativeSelect
          label="select-position-cnt"
          defaultValue={selectedPositionCnt}
          value={selectedPositionCnt}
          onChange={handleChange}
        >
          {MEMBER_SELECT.map((month, idx) => (
            <option key={idx} value={month}>
              {month}
            </option>
          ))}
        </NativeSelect>
        <Button onClick={getData}>확정</Button>
      </FormControl>
    );
  }
  return (
    <FormControl disabled>
      <InputLabel htmlFor="select-position-cnt" />
      <NativeSelect
        label="select-position-cnt"
        defaultValue={selectedPositionCnt}
        value={selectedPositionCnt}
        onChange={handleChange}
      >
        {MEMBER_SELECT.map((month, idx) => (
          <option key={idx} value={month}>
            {month}
          </option>
        ))}
      </NativeSelect>
    </FormControl>
  );

  // PAGE
}
