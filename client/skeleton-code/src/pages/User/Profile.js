import { useState } from 'react';
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Grid, Card, Button, Container, Stack, Typography } from '@mui/material';
// components
import Page from '../../components/Page';
import { BlogPostCard, BlogPostsSort, BlogPostsSearch } from '../../components/_dashboard/blog';
import POSTS from '../../_mocks_/blog';
import {
  AppTasks,
  AppStudyMain,
  AppCommunityMain,
  AppMentorMain,
  AppNewsUpdate,
  AppProjectMain,
  AppOrderTimeline,
  AppCurrentVisits
} from '../../components/_dashboard/app';
import {
  Mentoring,
  MentoringReview,
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
  PasswordUpdate
} from '../../components/Profile';
// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: 'detail', label: '내 프로필' },
  { value: 'detaillist', label: '활동내역' },
  { value: 'passwordUpdate', label: '비밀번호 수정' },
  { value: 'mentordetail', label: '멘토 프로필' },
  { value: 'like', label: '즐겨찾기' }
];
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
    content: (
      <Grid item xs={12} md={6} lg={8}>
        <MentoringTime />
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
    <Page title="Dashboard: Blog | Minimal-UI">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Profile
          </Typography>
        </Stack>{' '}
        <div>
          {Tab.map((e, index) => (
            <button key={index} onClick={(e) => changeItem(index)}>
              {e.title}
            </button>
          ))}
        </div>
        <div>{currentItem.content}</div>
        {/* <Grid container spacing={3}></Grid> */}
        {/* <BlogPostsSort options={SORT_OPTIONS} /> */}
      </Container>
    </Page>
  );
}
