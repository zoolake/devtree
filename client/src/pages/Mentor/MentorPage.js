import { Icon } from '@iconify/react';
import React, { useState, useEffect } from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { useDispatch } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Grid, Button, Container, Stack, Typography } from '@mui/material';
// components
import Page from '../../components/Page';

import { getMentors } from '../../_actions/mentor_actions';
import { MentorCard, MentorSearch, MentorSort } from '../../components/_dashboard/mentor';
import POSTS from '../../_mocks_/mentor';

// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Oldest' }
];

export default function Mentor() {
  const dispatch = useDispatch();
  const [mentorlist, setMentorList] = useState([]);
  const getMentorlist = async () => {
    dispatch(getMentors())
      .then((response) => {
        if (response) {
          console.log(response.payload.data.content);
          setMentorList(response.payload.data.content);
        }
      })
      .catch((err) => {
        setTimeout(() => {}, 3000);
      });
  };
  useEffect(() => {
    getMentorlist();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Page title="devtree - Mentor">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Mentor
          </Typography>
        </Stack>
        <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
          <MentorSearch posts={mentorlist} />
          <MentorSort options={SORT_OPTIONS} />
        </Stack>
        <Grid container spacing={3}>
          {mentorlist.map((post, index) => (
            <MentorCard key={post.mentorSeq} post={post} index={index} />
          ))}
        </Grid>
      </Container>
    </Page>
  );
}
