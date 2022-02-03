import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { withRouter, Link } from 'react-router-dom';
import MentorListCard from './MentorListCard';

export default function MentorList({ mentors }) {
  return (
    <Grid container spacing={3}>
      {mentors.map((mentor) => (
        <Grid key={mentor.mentor_seq} item xs={12} sm={6} md={3}>
          <MentorListCard mentor={mentor} />
        </Grid>
      ))}
    </Grid>
  );
}
