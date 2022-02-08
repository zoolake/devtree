import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Button, Container, Stack, Typography } from '@mui/material';
import Page from '../../components/Page';
import {
  ProjectsPostsSort,
  ProjectSearch,
  ProjectList
} from '../../components/_dashboard/projects';

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Oldest' }
];

export default function ProjectMain() {
  return (
    <Page title="Dashboard: Projects | Minimal-UI">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Project
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

        <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
          <ProjectSearch />
          <ProjectsPostsSort options={SORT_OPTIONS} />
        </Stack>

        <Container>
          <ProjectList />
        </Container>
      </Container>
    </Page>
  );
}
