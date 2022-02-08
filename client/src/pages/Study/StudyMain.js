import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Button, Container, Stack, Typography } from '@mui/material';
import Page from '../../components/Page';
import { StudyPostsSort, StudySearch, StudyList } from '../../components/_dashboard/study';
// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Oldest' }
];

// ----------------------------------------------------------------------

export default function StudyMain() {
  return (
    <Page title="Dashboard: Studys | Minimal-UI">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Study
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

        <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
          <StudySearch study={StudyList.studyList} />
          <StudyPostsSort options={SORT_OPTIONS} />
        </Stack>

        <Container>
          <StudyList />
        </Container>
      </Container>
    </Page>
  );
}
