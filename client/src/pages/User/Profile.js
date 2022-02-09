import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Grid, Card, Button, Container, Stack, Typography } from '@mui/material';
// components
import Page from '../../components/Page';
import { AppNewsUpdate } from '../../components/_dashboard/app';
import {
  Mentoring,
  MentoringStack,
  MentoringTime,
  ProjectChart,
  ProjectList,
  StudyChart,
  StudyList,
  UserDelete,
  UserStack,
  MentorProfile,
  UserProfile,
  PasswordUpdate,
  MentorAuth
} from '../../components/Profile';
import { MentorReviewList } from '../../components/_dashboard/mentor';
// ----------------------------------------------------------------------
const ismentor = 'true';
const Tab = [
  {
    title: '내 프로필',
    content: (
      <Grid container spacing={1}>
        <Grid item xs={12} md={6} lg={10}>
          <UserProfile />
        </Grid>{' '}
        <Grid item xs={12} md={6} lg={10}>
          <UserStack />
        </Grid>{' '}
        <Grid item xs={12} md={6} lg={10}>
          <UserDelete />
        </Grid>{' '}
      </Grid>
    )
  },
  {
    title: '활동내역',
    content: (
      <Grid container spacing={1}>
        <Grid item xs={12} md={6} lg={12}>
          <StudyList />
        </Grid>{' '}
        <Grid item xs={12} md={6} lg={12}>
          <StudyChart />
        </Grid>
        <Grid item xs={12} md={6} lg={12}>
          <ProjectList />
        </Grid>
        <Grid item xs={12} md={6} lg={12}>
          <ProjectChart />
        </Grid>
      </Grid>
    )
  },
  {
    title: '비밀번호 수정',
    content: (
      <Grid item xs={12} md={6} lg={8}>
        <PasswordUpdate />
      </Grid>
    )
  },
  {
    title: '멘토 프로필',
    content:
      ismentor === 'true' ? (
        <Grid container spacing={1}>
          <Grid item xs={12} md={6} lg={12}>
            <MentorProfile />
          </Grid>{' '}
          <Grid item xs={12} md={6} lg={12}>
            <MentoringStack />
          </Grid>
          <Grid item xs={12} md={6} lg={12}>
            <MentoringTime />
          </Grid>
          <Grid item xs={12} md={6} lg={12}>
            <MentorReviewList />
          </Grid>
        </Grid>
      ) : (
        <Grid item xs={12} md={6} lg={8}>
          <MentorAuth />
        </Grid>
      )
  },
  {
    title: '즐겨찾기',
    content: (
      <Grid item xs={12} md={6} lg={8}>
        <AppNewsUpdate />
      </Grid>
    )
  }
];
// ----------------------------------------------------------------------
const useTab = (idx, Tabs) => {
  if (!Tabs || !Array.isArray(Tabs)) {
    return null;
  }
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [currentIdx, setCurrentIdx] = useState(idx);
  return {
    currentItem: Tabs[currentIdx],
    changeItem: setCurrentIdx
  };
};

export default function Profile() {
  const { currentItem, changeItem } = useTab(0, Tab);
  return (
    <Page title="profile">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Profile
          </Typography>
        </Stack>
        <div>
          {Tab.map((e, index) => (
            <button key={index} onClick={(e) => changeItem(index)}>
              {e.title}
            </button>
          ))}
        </div>
        <div>{currentItem.content}</div>
      </Container>
    </Page>
  );
}
