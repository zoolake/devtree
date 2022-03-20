import faker from 'faker';
import PropTypes from 'prop-types';
import { Link as RouterLink, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import makeAnimated from 'react-select/animated';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import AsyncCreatableSelect from 'react-select/creatable';
import {
  Grid,
  Box,
  Button,
  Container,
  Stack,
  Card,
  Typography,
  CardHeader,
  CardContent
} from '@mui/material';
import styled from 'styled-components';
import { ReviewCard, MentorSearch, MentorSort } from '.';
// utils
import POSTS from '../../../_mocks_/mentor';
import { getReview } from '../../../_actions/mentor_actions';

// ----------------------------------------------------------------------

export default function MentorReviewList(data) {
  const dispatch = useDispatch();
  const [reviews, setReviews] = useState([]);
  console.log('id?');
  console.log({ data });
  console.log('id?');
  const getReviews = async () => {
    const dataToSubmit = {
      mentorSeq: data.mentorId
    };
    await dispatch(getReview(dataToSubmit))
      .then((response) => {
        if (response) {
          console.log(response.payload.data.mentoringReviewList);
          setReviews(response.payload.data.mentoringReviewList);
        }
      })
      .catch((err) => {
        setTimeout(() => {}, 3000);
      });
  };
  useEffect(() => {
    getReviews();
  }, []);
  return (
    <Box>
      <Container className="container">
        <CardHeader style={{ color: '#919191' }} title="멘토링 리뷰" />
        <ScrollMenu>
          {' '}
          {reviews.map((post, index) => (
            <ReviewCard key={post.id} post={post} index={index} />
          ))}
        </ScrollMenu>
      </Container>
    </Box>
  );
}
