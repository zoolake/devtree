import faker from 'faker';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { useDispatch } from 'react-redux';
import { formatDistance } from 'date-fns';
import { Link as RouterLink } from 'react-router-dom';
import arrowIosForwardFill from '@iconify/icons-eva/arrow-ios-forward-fill';
// material
import { Box, Stack, Link, Card, Button, Divider, Typography, CardHeader } from '@mui/material';
// utils
import { mockImgCover } from '../../../utils/mockImages';
import { getMentors, mentorTechGet } from '../../../_actions/mentor_actions';
//
import Scrollbar from '../../Scrollbar';

// ----------------------------------------------------------------------

export default function AppNewsUpdate() {
  const dispatch = useDispatch();
  const [mentorlist, setMentorList] = useState([]);

  const getMentorlist = async () => {
    dispatch(getMentors())
      .then((response) => {
        if (response) {
          console.log(response.payload.data);
          setMentorList(response.payload.data);
        }
      })
      .catch((err) => {
        setTimeout(() => {}, 3000);
      });
  };

  useEffect(() => {
    getMentorlist();
  }, []);

  return (
    <Card>
      <CardHeader title="새로운 멘토" />

      <Scrollbar>
        <Stack spacing={3} sx={{ p: 3, pr: 0 }}>
          {mentorlist.map((post) => (
            <NewsItem key={post.mentorSeq} post={post} />
          ))}
        </Stack>
      </Scrollbar>
      <Divider />
      <Box sx={{ p: 2, textAlign: 'right' }}>
        <Button
          to="/mentor"
          size="small"
          color="inherit"
          component={RouterLink}
          endIcon={<Icon icon={arrowIosForwardFill} />}
        >
          View all
        </Button>
      </Box>
    </Card>
  );
}

function NewsItem({ mentorlist }) {
  console.log(mentorlist);
  const { mentorNickname } = mentorlist;

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Box
        component="img"
        alt={mentorNickname}
        src={mentorNickname}
        sx={{ width: 48, height: 48, borderRadius: 1.5 }}
      />
      <Box sx={{ minWidth: 240 }}>
        <Link to="#" color="inherit" underline="hover" component={RouterLink}>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {mentorNickname}
          </Typography>
        </Link>
      </Box>
    </Stack>
  );
}
