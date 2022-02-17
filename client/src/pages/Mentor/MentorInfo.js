import { Icon } from '@iconify/react';
import React, { useState, useEffect, useParams } from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { useDispatch } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
// material
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Tab, Box, Grid, Button, Container, Stack, Typography } from '@mui/material';
// components
import Page from '../../components/Page';

import { getMentors } from '../../_actions/mentor_actions';
import {
  MentorReviewList,
  MentorCard,
  MentorSearch,
  MentorSort
} from '../../components/_dashboard/mentor';
import {
  MentoringStack,
  MentoringTime,
  MentorProfile,
  MentoringList
} from '../../components/Profile';

export default function MentorInfo() {
  const dispatch = useDispatch();
  const [mentorlist, setMentorList] = useState([]);
  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Page>
      {' '}
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h3" gutterBottom>
            멘토 프로필
          </Typography>
        </Stack>
      </Container>
      <Box sx={{ paddingLeft: '10%', paddingRight: '20%', width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="멘토 프로필 정보" value="1" />
              <Tab label="멘토링 가능 시간" value="2" />
              <Tab label="멘토링 신청 리스트 & 후기" value="3" />
            </TabList>
          </Box>
          <TabPanel value="1">
            {' '}
            <MentorProfile />
          </TabPanel>
          <TabPanel value="2">
            <MentoringTime />
          </TabPanel>
          <TabPanel value="3">
            <MentoringList />
            <MentorReviewList />
          </TabPanel>
        </TabContext>
      </Box>{' '}
    </Page>
  );
}
