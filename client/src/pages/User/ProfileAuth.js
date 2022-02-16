import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { Grid, Card, Container, Stack, Typography } from '@mui/material';
import jwtdecode from 'jwt-decode';
// components
import Page from '../../components/Page';
import { AppNewsUpdate } from '../../components/_dashboard/app';
import {
  MentoringStack,
  MentoringTime,
  ProjectChart,
  ProjectList,
  StudyChart,
  StudyList,
  UserStack,
  MentorProfile,
  UserProfile,
  PasswordUpdate,
  MentorAuth,
  AlarmList,
  MenteeMentoringList
} from '../../components/Profile';
import { MentorReviewList } from '../../components/_dashboard/mentor';

// ----------------------------------------------------------------------
const usersq = localStorage.getItem('user') ? jwtdecode(localStorage.getItem('user')).userRole : 0;
const ismentor = 'true';
const Tab = [
  {
    title: '내 프로필'
  },
  {
    title: '활동내역',
    content: (
      <Grid container spacing={1}>
        <Grid item xs={12} md={6} lg={12}>
          <StudyList />
        </Grid>
        <Grid item xs={12} md={6} lg={12}>
          <StudyChart />
        </Grid>
        <Grid item xs={12} md={6} lg={12}>
          <ProjectList />
        </Grid>
        <Grid item xs={12} md={6} lg={12}>
          <ProjectChart />
        </Grid>
        <Grid item xs={12} md={6} lg={12}>
          <MenteeMentoringList />
        </Grid>
      </Grid>
    )
  },
  {
    title: '멘토 프로필',
    content: 'd'
  },
  {
    title: '알림함'
  }
];

export default function Profile() {
  return (
    <Page>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            내 프로필
          </Typography>
        </Stack>{' '}
        <ButtonGroup
          color="success"
          variant="contained"
          aria-label="outlined primary button group"
          sx={{ ShadowRoot: 30, border: ' 1px solid white' }}
        >
          <Button
            variant="contained"
            component={RouterLink}
            to="/profile/menu"
            sx={{ color: 'white', background: 'linear-gradient(to right, #B0DAB9, #b0dab9)' }}
          >
            내 정보
          </Button>
          <Button
            variant="contained"
            component={RouterLink}
            to="/profile/study"
            sx={{ color: 'white', background: 'linear-gradient(to right, #B0DAB9, #b0dab9)' }}
          >
            스터디
          </Button>
          <Button
            variant="contained"
            component={RouterLink}
            to="/profile/project"
            sx={{ color: 'white', background: 'linear-gradient(to right, #B0DAB9,#B0DAB1)' }}
          >
            프로젝트
          </Button>
          <Button
            variant="contained"
            component={RouterLink}
            to="/profile/mentoring"
            sx={{ color: 'white', background: 'linear-gradient(to right, #B0DAB9, #b0dab9)' }}
          >
            멘토링
          </Button>
          <Button
            variant="contained"
            component={RouterLink}
            to="/profile/auth"
            sx={{ color: 'white', background: 'linear-gradient(to right, #B0DAB9, #b0dab9)' }}
          >
            멘토인증
          </Button>
          <Button
            variant="contained"
            component={RouterLink}
            to="/profile/alarm"
            sx={{ color: 'white', background: 'linear-gradient(to right, #B0DAB9, #b0dab9)' }}
          >
            알람
          </Button>
        </ButtonGroup>
        <div>
          ismentor === 'true' ? (
          <Grid container spacing={1}>
            <Grid item xs={12} md={6} lg={12}>
              <MentorProfile />
            </Grid>
            <Grid item xs={12} md={6} lg={12}>
              <MentoringTime />
            </Grid>
            <Grid item xs={12} md={6} lg={12}>
              <MentorReviewList mentorId={usersq} />
            </Grid>
          </Grid>
          ) : (
          <Grid item xs={12} md={6} lg={8}>
            <MentorAuth />
          </Grid>
          )
        </div>
      </Container>
    </Page>
  );
}
