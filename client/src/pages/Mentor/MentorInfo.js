import { Icon } from '@iconify/react';
import React, { useState, useEffect, useParams } from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { useDispatch } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Grid, Button, Container, Stack, Typography } from '@mui/material';
// components
import Page from '../../components/Page';

import { getMentors } from '../../_actions/mentor_actions';
import {
  MentorReviewList,
  MentorCard,
  MentorSearch,
  MentorSort
} from '../../components/_dashboard/mentor';
import { MentoringStack, MentoringTime, MentorProfile } from '../../components/Profile';

export default function MentorInfo() {
  const dispatch = useDispatch();
  const [mentorlist, setMentorList] = useState([]);

  return (
    <Page title="devtree - Mentor">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            멘토 프로필
          </Typography>
        </Stack>
        <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
          {' '}
        </Stack>
      </Container>
      <Grid container spacing={1}>
        <Grid item xs={12} md={6} lg={12}>
          <MentorProfile />
        </Grid>
        <Grid item xs={12} md={6} lg={12}>
          <MentoringTime />
        </Grid>
        <Grid item xs={12} md={6} lg={12}>
          <MentorReviewList />
        </Grid>
      </Grid>
    </Page>
  );
}
