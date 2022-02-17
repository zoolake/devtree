// material
import { Card, Paper, Button, Link, Box, Grid, Container, Typography } from '@mui/material';
// components
import { Link as RouterLink } from 'react-router-dom';
import { useRef, useState } from 'react';

import Page from '../../components/Page';
import {
  AppTasks,
  AppStudyMain,
  AppRankMain,
  AppMentorMain,
  AppNewsUpdate,
  AppNewsUpdate2,
  AppProjectMain,
  AppOrderTimeline,
  AppCurrentVisits,
  SliderBanner
} from '../../components/_dashboard/app';

// ----------------------------------------------------------------------

export default function MainPage() {
  return (
    <Page title="devtree">
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          <SliderBanner />
          <Grid item xs={12} sm={6} md={3}>
            <Link underline="none" component={RouterLink} to="/project/">
              <AppProjectMain />
            </Link>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Link underline="none" component={RouterLink} to="/study/">
              <AppStudyMain />
            </Link>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Link underline="none" component={RouterLink} to="/study/">
              <AppMentorMain />
            </Link>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Link underline="none" component={RouterLink} to="/study/">
              <AppRankMain />
            </Link>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <AppNewsUpdate />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline />
          </Grid>{' '}
          <Grid item xs={12} md={6} lg={4}>
            <AppNewsUpdate />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
