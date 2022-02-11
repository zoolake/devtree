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
import { MentoringDaySelect, MentoringList } from '.';

export default function MentoringTime() {
  return (
    <Card>
      <CardHeader title="멘토링 가능 시간" />
      <Box sx={{ p: 3 }}>
        <MentoringDaySelect />
      </Box>{' '}
      <Box sx={{ p: 3 }}>
        <MentoringList />
      </Box>
    </Card>
  );
}
