import * as React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import jwtdecode from 'jwt-decode';
//
import { Container, MenuItem, InputLabel, Select, FormControl, Button, Box } from '@mui/material';
//
import { joinProject } from '../../../_actions/project_actions';

ProjectJoinForm.propTypes = {
  projectPosition: PropTypes.array.isRequired
};

export default function ProjectJoinForm({ projectPosition }) {
  console.log(projectPosition);
  // STATE
  const teamSeq = useParams().id;
  const navigate = useNavigate();
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
          navigate(`/project/${teamSeq}`);
        })
        .catch((error) => {
          console.log(dataToSubmit);
          console.log(error, '프로젝트 신청 실패');
        });
    };
    joinPjt();
  };

  return (
    <Container sx={{ mt: 10 }}>
      <form onSubmit={sendData}>
        {/* Select Position */}
        <FormControl sx={{ width: '100%' }}>
          <InputLabel id="select-team-recruit-cnt">포지션 선택</InputLabel>
          <Select
            labelId="select-team-recruit-cnt"
            label="teamRecruitCnt"
            value={selectedPosition}
            onChange={handleChange}
          >
            {projectPosition.map((pos, idx) => (
              <MenuItem key={idx} value={pos.detailPositionName}>
                {pos.detailPositionName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {/* <FormControl>
          <InputLabel id="project-position-join">포지션 선택</InputLabel>
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
        </FormControl> */}
        {/* Submit Btn */}
        <Box sx={{ textAlign: 'right' }}>
          <Button color="primary" variant="contained" type="submit" sx={{ mt: 10, width: 100 }}>
            신청
          </Button>
        </Box>
      </form>
    </Container>
  );
}
