import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';
import {
  // Grid,
  Button,
  Container,
  Stack,
  Typography
} from '@mui/material';
// components
import Page from '../../components/Page';
import {
  ProjectsPostsSort,
  ProjectSearch,
  ProjectList
} from '../../components/_dashboard/projects';
//
import PROJECTS from '../../_mocks_/project';

// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Oldest' }
];

// ----------------------------------------------------------------------

export default function ProjectMain() {
  return (
    <Page title="Dashboard: Projects | Minimal-UI">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Projects
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
          <ProjectSearch projects={PROJECTS} />
          <ProjectsPostsSort options={SORT_OPTIONS} />
        </Stack>

        <Container>
          <ProjectList />
        </Container>
      </Container>
    </Page>
  );
}
