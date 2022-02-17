import { Link as RouterLink } from 'react-router-dom';
//
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Button, Container, Stack, Typography, Divider } from '@mui/material';
//
import { StudyList } from '../../components/_dashboard/study';

export default function StudyMain() {
  // PAGE
  return (
    <Container sx={{ mt: 10 }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h3" gutterBottom>
          스터디
        </Typography>
        <Button
          variant="contained"
          component={RouterLink}
          to="create"
          startIcon={<Icon icon={plusFill} />}
        >
          스터디 생성
        </Button>
      </Stack>
      <Divider sx={{ mt: 2, mb: 5 }} />
      <Container>
        <StudyList />
      </Container>
    </Container>
  );
}
