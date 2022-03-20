import { Link as RouterLink } from 'react-router-dom';
//
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { Container, Stack, Typography, Divider, Box } from '@mui/material';
//
import { ProjectChart, UserProjectList } from '../../components/Profile';

export default function ProfileProject() {
  return (
    <Container sx={{ mt: 8 }}>
      <Typography variant="h3" sx={{ mb: 5 }}>
        내 프로필
      </Typography>
      <Divider />
      <Stack direction="column" spacing={5} alignItems="center">
        <Box>
          <ButtonGroup
            variant="outlined"
            aria-label="large outlined button group"
            sx={{ height: 60 }}
          >
            <Button component={RouterLink} to="/profile/menu" sx={{ width: 190, fontSize: 20 }}>
              내 정보
            </Button>
            <Button component={RouterLink} to="/profile/study" sx={{ width: 190, fontSize: 20 }}>
              스터디
            </Button>
            <Button
              component={RouterLink}
              to="/profile/project"
              sx={{ width: 190, fontSize: 20 }}
              variant="contained"
            >
              프로젝트
            </Button>
            <Button
              component={RouterLink}
              to="/profile/mentoring"
              sx={{ width: 190, fontSize: 20 }}
            >
              멘토링
            </Button>
            <Button component={RouterLink} to="/profile/auth" sx={{ width: 190, fontSize: 20 }}>
              멘토인증
            </Button>
            <Button component={RouterLink} to="/profile/alarm" sx={{ width: 190, fontSize: 20 }}>
              알림
            </Button>
          </ButtonGroup>
        </Box>
        <Box sx={{ width: '80%' }}>
          <Stack direction="column" spacing={4}>
            <ProjectChart />
            <UserProjectList />
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
}
