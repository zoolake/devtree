import * as Yup from 'yup';
import faker from 'faker';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useFormik, Form, FormikProvider } from 'formik';
import { Link as RouterLink } from 'react-router-dom';
// material
import {
  TextField,
  Multiline,
  Divider,
  Box,
  Card,
  Stack,
  Text,
  Typography,
  CardHeader,
  Button,
  CardContent
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// utils
import { fDateTime } from '../../../utils/formatTime';
import { detailMentor } from '../../../_actions/mentor_actions';
// ---------------------------------------------------------------------
export default function UserProfile({ index }) {
  const [mentor, setMentor] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const userDetail = async () => {
    setMentor(null);
    setLoading(null);
    await dispatch(detailMentor(index))
      .then((response) => {
        if (response) {
          setMentor(response.payload);
          console.log(mentor.mentorname);
        }
      })
      .catch((err) => {
        setTimeout(() => {}, 3000);
      });
    setLoading(false);
  };

  useEffect(() => {
    userDetail();
  }, []);
  if (loading) return <div>로딩중..</div>;
  if (!mentor) {
    return null;
  }
  return (
    <div>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography sx={{ p: 3 }} variant="h4">
          {mentor.mentorname} <h5>{mentor.tier}</h5>
          <h5> {mentor.mentorcarrer}</h5>
        </Typography>
        <Button variant="contained" component={RouterLink} to={`/reservation/${index}`}>
          멘토링 신청하기
        </Button>
      </Stack>
      <CardHeader />
      <Box sx={{ p: 3 }}>
        이메일
        <TextField value={mentor.mentoremail} fullWidth type="text" />
        소개말
        <TextField id="filled-textarea" multiline fullWidth variant="filled" />
        <Divider />
      </Box>
    </div>
  );
}
