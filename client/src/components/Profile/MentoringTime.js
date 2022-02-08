import faker from 'faker';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
// material
import {
  TextField,
  Multiline,
  Divider,
  Box,
  Card,
  Typography,
  CardHeader,
  CardContent
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// utils
import { fDateTime } from '../../utils/formatTime';
import { detailUser } from '../../_actions/user_actions';

// -
export default function MentoringReview() {
  useEffect(() => {}, []);

  return (
    <Card>
      <CardHeader title="멘토링 가능 시간" />
      <Box sx={{ p: 3 }}>
        멘토링 가능 시간
        <Divider />
      </Box>
    </Card>
  );
}
