// material
import { Link, Box, Grid, Container, Typography } from '@mui/material';
// components
import { Link as RouterLink } from 'react-router-dom';
import Page from '../../components/Page';
import {
  AppTasks,
  AppStudyMain,
  AppCommunityMain,
  AppMentorMain,
  AppNewsUpdate,
  AppProjectMain,
  AppOrderTimeline,
  AppCurrentVisits
} from '../../components/_dashboard/app';

// ----------------------------------------------------------------------

export default function MainPage() {
  return (
    <Page title="Dashboard | Minimal-UI">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Welcome to DevTree</Typography>
        </Box>
        <Grid container spacing={3}>
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
            <AppMentorMain />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppCommunityMain />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline />
          </Grid>
          <Grid item xs={12} md={6} lg={8}>
            <AppTasks />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
