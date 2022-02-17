import { Link as RouterLink } from 'react-router-dom';
import jwtdecode from 'jwt-decode';
//
import {
  Grid,
  Button,
  Container,
  Stack,
  Typography,
  ButtonGroup,
  Box,
  Divider
} from '@mui/material';
import { MentorReviewList } from '../../components/_dashboard/mentor';
//
import {
  MentoringTime,
  ProjectChart,
  ProjectList,
  StudyChart,
  StudyList,
  MentorProfile,
  UserProfile,
  MentorAuth,
  AlarmList,
  MenteeMentoringList
} from '../../components/Profile';

export default function Profile() {
  // STATE
  const usersq = localStorage.getItem('user') ? jwtdecode(localStorage.getItem('user')).userSeq : 0;
  const ismentor = 'true';
  const myTab = [
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
      content:
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
    },
    {
      title: '알림함',
      content: (
        <Grid item xs={12} md={6} lg={8}>
          <AlarmList />
        </Grid>
      )
    }
  ];

  return (
    <Container sx={{ mt: 8 }}>
      <Typography variant="h3" sx={{ mb: 5 }} gutterBottom>
        내 프로필
      </Typography>
      <Divider sx={{ mt: 2, mb: 5 }} />
      <Stack direction="column" spacing={5} alignItems="center">
        <Box>
          <ButtonGroup
            variant="outlined"
            aria-label="large outlined button group"
            sx={{ height: 60 }}
          >
            <Button component={RouterLink} to="/profile/menu" sx={{ width: 120, fontSize: 20 }}>
              내 정보
            </Button>
            <Button component={RouterLink} to="/profile/study" sx={{ width: 120, fontSize: 20 }}>
              스터디
            </Button>
            <Button component={RouterLink} to="/profile/project" sx={{ width: 120, fontSize: 20 }}>
              프로젝트
            </Button>
            <Button
              component={RouterLink}
              to="/profile/mentoring"
              sx={{ width: 120, fontSize: 20 }}
            >
              멘토링
            </Button>
            <Button component={RouterLink} to="/profile/auth" sx={{ width: 120, fontSize: 20 }}>
              멘토인증
            </Button>
            <Button component={RouterLink} to="/profile/alarm" sx={{ width: 120, fontSize: 20 }}>
              알람
            </Button>
          </ButtonGroup>
        </Box>
        <Box sx={{ width: '70%' }}>
          <UserProfile />
        </Box>
      </Stack>
    </Container>
  );
}
