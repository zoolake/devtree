import * as React from 'react';
import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import jwtdecode from 'jwt-decode';
//
import { Box, MenuItem, InputLabel, Select, FormControl, Button } from '@mui/material';
//
import { joinProject } from '../../../_actions/project_actions';

ProjectJoinForm.propTypes = {
  projectPosition: PropTypes.array.isRequired
};

export default function ProjectJoinForm({ projectPosition }) {
  // STATE
  const teamSeq = useParams().id;
  const [selectedPosition, setSelectedPosition] = useState('');
  const [userSeq] = useState(jwtdecode(localStorage.getItem('user')).userSeq);

  // AXIOS
  const dispatch = useDispatch();

  // HANDLE
  const handleChange = (event) => {
    setSelectedPosition(event.target.value);
  };

  // SUBMIT
  const sendData = (event) => {
    event.preventDefault();
    const dataToSubmit = {
      userSeq: userSeq * 1,
      detailPositionName: selectedPosition
    };
    const joinPjt = async () => {
      await dispatch(joinProject({ dataToSubmit, teamSeq }))
        .then((response) => {
          console.log(response, '프로젝트 신청 성공');
        })
        .catch((error) => {
          console.log(dataToSubmit);
          console.log(error, '프로젝트 신청 실패');
        });
    };
    joinPjt();
  };

  return (
    <Box>
      <form onSubmit={sendData}>
        {/* Select Position */}
        <FormControl fullWidth>
          <InputLabel id="project-position-join">Age</InputLabel>
          <Select
            labelId="project-position-join"
            id="project-position-join"
            value={selectedPosition}
            label="join"
            onChange={handleChange}
          >
            {projectPosition.map((position, idx) => (
              <MenuItem key={idx} value={position.detailPositionName}>
                {position.detailPositionName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {/* Submit Btn */}
        <Button color="primary" variant="contained" fullWidth type="submit">
          신청
        </Button>
      </form>
    </Box>
  );
}
