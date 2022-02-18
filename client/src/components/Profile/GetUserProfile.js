import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import makeAnimated from 'react-select/animated';
//
import { Divider, Grid, Box, CardContent, Typography, Stack } from '@mui/material';
//
import { detailUser, getTech } from '../../_actions/user_actions';
import MyProgress from '../_dashboard/MyProgress';
import { MyProfile } from '.';

export default function GetUserProfile() {
  // STATE
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(false);
  const [opti, setOptions] = useState([]);
  const [value, setValue] = useState([]);
  const dispatch = useDispatch();

  // INIT
  const userDetail = async () => {
    setLoading(true);
    await dispatch(detailUser())
      .then((response) => {
        if (response) {
          setUsers(response.payload.data.user);
          const data = response.payload.data.tech;
          const all = data.reduce((total, data) => {
            total = [...total, { value: data.techSeq, label: data.techName }];
            return total;
          }, []);
          setValue(all);
        }
      })
      .catch(() => {
        setTimeout(() => {}, 3000);
      });
    setLoading(false);
  };
  const techGet = () => {
    dispatch(getTech())
      .then((response) => {
        const data = response.payload;
        const all = data.reduce((total, data) => {
          total = [...total, { value: data.techSeq, label: data.techName }];
          return total;
        }, []);
        setOptions(all);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // RENDER
  useEffect(() => {
    userDetail();
    techGet();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // HANDLE
  const isMentor = () => {
    if (users.userRole === 'USER') {
      return (
        <Typography variant="h5" component="div">
          일반
        </Typography>
      );
    }
    return (
      <Typography variant="h5" component="div">
        멘토
      </Typography>
    );
  };

  // CONDITIONAL
  if (loading) return <MyProgress />;
  if (!users) {
    return <MyProfile />;
  }

  return (
    <CardContent>
      <Typography sx={{ fontSize: 14 }} color="primary" gutterBottom>
        회원정보
      </Typography>
      <Grid container spacing={1}>
        <Grid item xs={5.8}>
          <Stack direction="column" spacing={3}>
            <Stack direction="row" sx={{ width: '90%' }} justifyContent="flex-start" spacing={3}>
              <Typography variant="h5" component="div" sx={{ width: '40%' }}>
                아이디
              </Typography>
              <Typography variant="h5" color="primary">
                {users.userId}
              </Typography>
            </Stack>
            <Stack direction="row" sx={{ width: '90%' }} justifyContent="flex-start" spacing={3}>
              <Typography variant="h5" component="div" sx={{ width: '40%' }}>
                이름
              </Typography>
              <Typography variant="h5" color="primary">
                {users.userName}
              </Typography>
            </Stack>
            <Stack direction="row" sx={{ width: '90%' }} justifyContent="flex-start" spacing={3}>
              <Typography variant="h5" component="div" sx={{ width: '40%' }}>
                닉네임
              </Typography>
              <Typography variant="h5" color="primary">
                {users.userNickname}
              </Typography>
            </Stack>
          </Stack>
        </Grid>
        <Grid item xs={5.8}>
          <Stack direction="column" spacing={3}>
            <Stack direction="row" sx={{ width: '90%' }} justifyContent="flex-start" spacing={3}>
              <Typography variant="h5" component="div" sx={{ width: '40%' }}>
                이메일
              </Typography>
              <Typography variant="h6" color="primary">
                {users.userEmail}
              </Typography>
            </Stack>
            <Stack direction="row" sx={{ width: '90%' }} justifyContent="flex-start" spacing={3}>
              <Typography variant="h5" component="div" sx={{ width: '40%' }}>
                멘토 여부
              </Typography>
              <Typography variant="h5" color="primary">
                {isMentor()}
              </Typography>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
      <Divider sx={{ my: 4 }} />
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <Typography variant="h5" sx={{ mb: 3 }}>
            소개
          </Typography>
        </Grid>
        <Grid item xs={9}>
          <Box sx={{ p: 2, border: '1px solid #00AB55', borderRadius: 2, height: 100 }}>
            <Typography variant="subtitle2">{users.userDesc}</Typography>
          </Box>
        </Grid>
      </Grid>
      <Divider sx={{ my: 4 }} />
      <Typography variant="h5" sx={{ mb: 3 }}>
        관심 기술 스택
      </Typography>
      <Stack direction="row" spacing={2}>
        {value.map((tech) => (
          <Typography key={tech.value}>
            # <span style={{ color: '#00AB55' }}>{tech.label}</span>
          </Typography>
        ))}
      </Stack>
    </CardContent>
  );
}
