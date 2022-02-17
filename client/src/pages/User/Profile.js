import { Link as RouterLink } from 'react-router-dom';
//
import { Button, Container, Stack, Typography, ButtonGroup, Box, Divider } from '@mui/material';
//
import { UserProfile } from '../../components/Profile';

export default function Profile() {
  // PAGE
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
            <Button
              component={RouterLink}
              to="/profile/menu"
              sx={{ width: 190, fontSize: 20 }}
              variant="contained"
            >
              내 정보
            </Button>
            <Button component={RouterLink} to="/profile/study" sx={{ width: 190, fontSize: 20 }}>
              스터디
            </Button>
            <Button component={RouterLink} to="/profile/project" sx={{ width: 190, fontSize: 20 }}>
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
        <Box sx={{ width: '70%' }}>
          <UserProfile />
        </Box>
      </Stack>
    </Container>
  );
}
