import { Icon } from '@iconify/react';
import React, { useState, useEffect } from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { useDispatch } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
// material
import { Avatar, Card, Divider, Grid, Button, Container, Stack, Typography } from '@mui/material';
// components
import Page from '../../components/Page';

import { getTech } from '../../_actions/user_actions';
import { getMentors, mentorTechGet } from '../../_actions/mentor_actions';
import { MentorCard, MentorSearch, MentorSort } from '../../components/_dashboard/mentor';
import POSTS from '../../_mocks_/mentor';
import { TechImgAvatar } from '../../utils/mockImages';

// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Oldest' }
];

export default function Mentor() {
  const dispatch = useDispatch();
  const [mentorlist, setMentorList] = useState([]);
  const [techlist, setTechlist] = useState([]);

  const getTechlist = () => {
    dispatch(getTech())
      .then((response) => {
        if (response) {
          setTechlist(response.payload);
          console.log(response);
          console.log(response.payload);
          console.log(response.payload.techSeq);
        }
      })
      .catch((err) => {
        setTimeout(() => {}, 3000);
      });
  };

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
  const test = () => {
    const dataToSubmit = {
      mentorTechSeq: [1, 2]
    };
    dispatch(mentorTechGet(dataToSubmit))
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

  const techSearch = (id) => {
    console.log(id);
    const dataToSubmit = {
      mentorTechSeq: [id]
    };
    dispatch(mentorTechGet(dataToSubmit))
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
    getTechlist();
  }, []);

  return (
    <Container sx={{ mt: 10 }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h3" gutterBottom>
          멘토 목록
        </Typography>
        <Button
          onClick={getMentorlist}
          id="all"
          sx={{
            width: '10%',
            marginTop: '10px',
            background: 'linear-gradient(to right, #dad299, #b0dab9)',
            color: 'white'
          }}
        >
          ALL
        </Button>
      </Stack>
      <Divider sx={{ mt: 5, mb: 5 }} />
      <Container>
        <Card sx={{ mb: 8 }}>
          <ScrollMenu>
            <Stack direction="row" spacing={3}>
              {techlist.map((info, index) => (
                <Avatar
                  key={index}
                  onClick={() => {
                    techSearch(info.techSeq);
                  }}
                  id={info.techSeq}
                  src={TechImgAvatar(info.techSeq)}
                  sx={{ width: 70, height: 80 }}
                  alt={info.techName}
                  style={{ cursor: 'pointer' }}
                />
              ))}
            </Stack>
          </ScrollMenu>
        </Card>
        <Grid container spacing={3}>
          {mentorlist.map((post, index) => (
            <MentorCard key={post.mentorSeq} post={post} index={index} />
          ))}
        </Grid>
      </Container>
    </Container>
  );
}
