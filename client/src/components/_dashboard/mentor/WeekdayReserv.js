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
  Button
} from '@mui/material';
// utils

import { fDate } from '../../../utils/formatTime';
import { fShortenNumber } from '../../../utils/formatNumber';
import { PossibleTime } from '.';
import { getSchedule, getTeams, submitMentoring } from '../../../_actions/mentor_actions';

const TitleStyle = styled(Link)({
  height: 44,
  overflow: 'hidden',
  WebkitLineClamp: 2,
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical'
});

export default function WeekdayReserv({ week, day, date }) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [teams, setTeams] = useState([]);
  const [times, setTime] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
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
          console.log('나오나요');
          console.log(response.payload.data);
          setTime(response.payload.data);
        }
      })
      .catch((err) => {
        console.log(err);
        console.log('안나오네요');
        setTimeout(() => {}, 3000);
      });
  };
  const submit = async () => {
    console.log('신청하기');
    const dataToSubmit = {
      mentorSeq: id,
      mentorDate: selectedTime,
      teamSeq: selectedTeam
    };
    await dispatch(getSchedule(dataToSubmit))
      .then((response) => {
        if (response) {
          Swal.fire('Good job!', 'You clicked the button!', 'success').then(() => {
            document.location.assign('/');
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

  useEffect(() => {
    getTime();
    getTeam();
  }, []);
  return (
    <Grid item xs={0} sm={0} md={0}>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>{day}일 예약 일정</CardContent>
        <CardContent>
          {!times && <CardContent>가능한 시간이 없습니다.</CardContent>}
          {times && (
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">시간 선택</FormLabel>
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
      </Card>{' '}
      <Card sx={{ minWidth: 275 }}>
        <CardContent>멘토링 할 스터디 / 프로젝트 </CardContent>
        <CardContent>
          {!teams && <CardContent>멘토링을 신청할 수 있는 팀이 없습니다.</CardContent>}
          {teams && (
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">팀 선택</FormLabel>
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
      </Card>
      {selectedTeam && selectedTime && <Button onClick={submit}>신청하기</Button>}
    </Grid>
  );
}
