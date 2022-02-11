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
import { MentoringDaySelect } from '.';

export default function MentoringTime() {
  useEffect(() => {}, []);

  return (
    <Card>
      <CardHeader title="멘토링 가능 시간" />
      <Box sx={{ p: 3 }}>
        <MentoringDaySelect />
      </Box>
    </Card>
  );
}
