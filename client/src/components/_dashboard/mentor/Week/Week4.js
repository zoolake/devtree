import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import { useEffect, useState } from 'react';
import { Link as RouterLink, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
// material
import { alpha, styled } from '@mui/material/styles';
import {
  FormLabel,
  RadioGroup,
  FormControl,
  FormControlLabel,
  Radio,
  Checkbox,
  Stack,
  Box,
  Link,
  Card,
  Grid,
  Avatar,
  Typography,
  CardContent,
  Button,
  TextField
} from '@mui/material';
// utils

import { fDate } from '../../../../utils/formatTime';
import { fShortenNumber } from '../../../../utils/formatNumber';
import { getSchedule, getTeams, submitMentoring } from '../../../../_actions/mentor_actions';

const TitleStyle = styled(Link)({
  height: 44,
  overflow: 'hidden',
  WebkitLineClamp: 2,
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical'
});

export default function Week4({ week, day, date }) {
  console.log(date, 'date');
  const { id } = useParams();
  const dispatch = useDispatch();
  const [teams, setTeams] = useState([]);
  const [times, setTime] = useState([]);
  const [text, setText] = useState('');
  const [selectedHour, setSelectedTime] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
    console.log(event.target.value);
  };

  const MySwal = withReactContent(Swal);
  const handleTeamChange = (event) => {
    setSelectedTeam(event.target.value);
    console.log(event.target.value);
  };
  const getTime = async () => {
    const dataToSubmit = {
      mentorDate: date,
      mentorSeq: id
    };
    await dispatch(getSchedule(dataToSubmit))
      .then((response) => {
        if (response) {
          console.log(response.payload.data);
          setTime(response.payload.data);
        }
      })
      .catch((err) => {
        console.log(err);
        setTimeout(() => {}, 3000);
      });
  };
  const submit = async () => {
    const dataToSubmit = {
      mentorSeq: id,
      selectedTime: selectedHour,
      selectedDate: date,
      teamSeq: selectedTeam,
      applyComment: text
    };
    console.log(dataToSubmit);
    await dispatch(submitMentoring(dataToSubmit))
      .then((response) => {
        if (response) {
          Swal.fire('완료', '멘토링이 신청되었습니다.', 'success').then(() => {
            document.location.assign('/Mainpage/app');
          });
        }
      })
      .catch((err) => {
        setTimeout(() => {
          Swal.fire({
            icon: 'error',
            title: '실패',
            text: '멘토링 신청에 실패하였습니다.'
          });
        }, 3000);
      });
  };

  const getTeam = async () => {
    await dispatch(getTeams())
      .then((response) => {
        if (response) {
          console.log(response);
          setTeams(response.payload.data);
        }
      })
      .catch((err) => {
        setTimeout(() => {}, 3000);
      });
  };

  const onChange = (e) => {
    setText(e.target.value);
  };

  useEffect(() => {
    getTime();
    getTeam();
  }, []);
  return (
    <Grid item xs={0} sm={0} md={0}>
      <CardContent sx={{ fontSize: '20px', fontWeight: 'bold' }}>{day}일 예약 일정</CardContent>
      <CardContent sx={{ border: '1px solid #C2DABC', borderRadius: '30px' }}>
        {!times && <CardContent>가능한 시간이 없습니다.</CardContent>}
        {times && (
          <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label" sx={{ color: '#8fa38a' }}>
              시간 선택
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              {times.map((post, index) => (
                // eslint-disable-next-line react/jsx-key
                <FormControlLabel
                  control={<Radio onChange={handleTimeChange} />}
                  value={post}
                  label={post}
                />
              ))}
            </RadioGroup>
          </FormControl>
        )}
      </CardContent>

      <CardContent sx={{ fontSize: '20px', fontWeight: 'bold' }}>
        멘토링 할 스터디 / 프로젝트
      </CardContent>
      <CardContent sx={{ border: '1px solid #C2DABC', borderRadius: '30px' }}>
        {!teams && <CardContent>멘토링을 신청할 수 있는 팀이 없습니다.</CardContent>}
        {teams && (
          <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label" sx={{ color: '#8fa38a' }}>
              팀 선택
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              {teams.map((post, index) => (
                // eslint-disable-next-line react/jsx-key
                <FormControlLabel
                  control={<Radio onChange={handleTeamChange} />}
                  value={post.teamSeq}
                  label={post.teamName}
                />
              ))}
            </RadioGroup>
          </FormControl>
        )}
      </CardContent>

      {selectedTeam && selectedHour && (
        <div>
          <TextField
            label="신청 메세지"
            onChange={onChange}
            value={text}
            variant="filled"
            color="success"
            sx={{ padding: '10px', width: '80%' }}
          />
          <Button
            sx={{
              width: '20%',
              marginTop: '10px',
              height: '57px',
              background: 'linear-gradient(to right, #dad299, #b0dab9)',
              color: 'white'
            }}
            onClick={submit}
          >
            신청하기
          </Button>
        </div>
      )}
    </Grid>
  );
}
