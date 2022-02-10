import { Button, TextField } from '@mui/material';
import { useState } from 'react';

export default function SelectPositionCnt({
  position,
  myPositionCnt,
  setMyPositionCnt,
  myPositionList,
  parentCallback
}) {
  // state
  const [thisPositionCnt, setThisPositionCnt] = useState();

  // handle
  const handleValue = (event) => {
    setThisPositionCnt(event.target.valueAsNumber);
    console.log(thisPositionCnt);
  };

  function Submitting(event) {
    event.preventDefault();
    console.log('!!!!!', event);
    parentCallback(thisPositionCnt);
    // console.log('onSubmit', position);
    // setMyPositionCnt([
    //   ...myPositionCnt,
    //   {
    //     position: {
    //       detailPositionName: position.position.detailPositionName,
    //       positionName: position.position.positionName
    //     },
    //     positionRecruitCnt: thisPositionCnt
    //   }
    // ]);
  }
  // setMyPositionCnt([...myPositionCnt, { position: value }]);

  // page
  return (
    <form onSubmit={Submitting}>
      <TextField
        id="outlined-number"
        label="Number"
        type="number"
        value={thisPositionCnt}
        onChange={handleValue}
        // InputLabelProps={{
        //   shrink: true
        // }}
      />
      <Button type="submit">확정</Button>
    </form>
  );
}
