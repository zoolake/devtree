import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import shareFill from '@iconify/icons-eva/share-fill';
import messageCircleFill from '@iconify/icons-eva/message-circle-fill';
import { useDispatch } from 'react-redux';
// material
import { alpha, styled } from '@mui/material/styles';
import { Stack, Box, Link, Card, Grid, Avatar, Typography, CardContent } from '@mui/material';
// utils
import { fDate } from '../../../utils/formatTime';
import { fShortenNumber } from '../../../utils/formatNumber';
import { PossibleTime } from '.';
import { getSchedule, getTeams } from '../../../_actions/mentor_actions';

const TitleStyle = styled(Link)({
  height: 44,
  overflow: 'hidden',
  WebkitLineClamp: 2,
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical'
});

export default function WeekdayReserv({ week, day, date }) {
  const dispatch = useDispatch();
  const [teams, setTeams] = useState([]);
  const [times, setTime] = useState([]);

  console.log(week);
  console.log(day);
  console.log(date);

  const getTime = async () => {
    const dataToSubmit = {
      mentor_time: date
    };
    await dispatch(getSchedule(dataToSubmit))
      .then((response) => {
        if (response) {
          console.log('test');
        }
      })
      .catch((err) => {
        setTimeout(() => {}, 3000);
      });
  };

  const getTeam = async () => {
    const dataToSubmit = {
      mentor_time: date
    };
    await dispatch(getTeams(dataToSubmit))
      .then((response) => {
        if (response) {
          console.log('test');
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
          <TitleStyle
            to="#"
            color="inherit"
            variant="subtitle2"
            underline="hover"
            component={RouterLink}
          >
            가능한 시간이 없습니다.
          </TitleStyle>
        </CardContent>
      </Card>{' '}
      <Card sx={{ minWidth: 275 }}>
        <CardContent>멘토링 할 스터디 / 프로젝트 </CardContent>
        <CardContent>
          <TitleStyle
            to="#"
            color="inherit"
            variant="subtitle2"
            underline="hover"
            component={RouterLink}
          >
            선택 가능한 [스터디 / 프로젝트]가 없습니다.
          </TitleStyle>
        </CardContent>
      </Card>
    </Grid>
  );
}
