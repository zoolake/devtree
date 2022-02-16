import React, { useEffect, useState } from 'react';
import { Link as RouterLink, useParams } from 'react-router-dom';
import { Grid, Card, Button, Container, Stack, Typography } from '@mui/material';
import Page from '../../components/Page';
import { MentorStack, MentorProfile, MentorReviewList } from '../../components/_dashboard/mentor';

function MentorDetail() {
  const { id } = useParams();
  const [mentor, setMentor] = useState();
  const getMentor = async () => {};
  useEffect(() => {
    getMentor();
  }, []);

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} md={6} lg={10}>
        <MentorProfile index={id} />
      </Grid>
      <Grid item xs={12} md={6} lg={10}>
        <MentorReviewList mentorId={id} />
      </Grid>
    </Grid>
  );
}
export default MentorDetail;
