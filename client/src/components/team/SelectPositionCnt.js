import PropTypes from 'prop-types';
import { TextField } from '@mui/material';
import { useState } from 'react';

SelectPositionCnt.propTypes = {
  position: PropTypes.object.isRequired,
  parentCallback: PropTypes.func.isRequired
};

export default function SelectPositionCnt({ position, parentCallback }) {
  // state
  const [positionCnt, setPositionCnt] = useState(0);

  // handle
  const handleValue = (event) => {
    setPositionCnt(event.target.valueAsNumber);
    if (isNaN(event.target.valueAsNumber)) {
      console.log('Nan!!!');
      const sendData = [{ position, cnt: 0 }];
      parentCallback(sendData);
    } else {
      const sendData = [{ position, cnt: event.target.valueAsNumber }];
      parentCallback(sendData);
    }
  };

  // page
  if (isNaN(positionCnt))
    return (
      <div>
        <TextField
          id="outlined-number"
          label="Number"
          type="number"
          value={positionCnt}
          onChange={handleValue}
          // InputLabelProps={{
          //   shrink: true
          // }}
        />
        {position.position.detailPositionName}
        {0}
      </div>
    );

  return (
    <div>
      <TextField
        id="outlined-number"
        label="Number"
        type="number"
        value={positionCnt}
        onChange={handleValue}
        // InputLabelProps={{
        //   shrink: true
        // }}
      />
      {position.position.detailPositionName}
      {positionCnt}
    </div>
  );
}
