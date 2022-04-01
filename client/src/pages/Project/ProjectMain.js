import { Link as RouterLink } from 'react-router-dom';
//
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Button, Container, Stack, Typography, Divider } from '@mui/material';
//
import { ProjectList } from '../../components/_dashboard/projects';

export default function ProjectMain() {
  // PAGE
  return (
    <Container sx={{ mt: 10 }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h3" gutterBottom>
          프로젝트
        </Typography>
        <Button
          variant="contained"
          component={RouterLink}
          to="create"
          startIcon={<Icon icon={plusFill} />}
        >
          프로젝트 생성
        </Button>
      </Stack>
      <Divider sx={{ mt: 2, mb: 5 }} />
      <Container>
        <ProjectList />
      </Container>
    </Container>
  );
}
