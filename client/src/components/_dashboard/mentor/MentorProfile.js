import * as Yup from 'yup';
import faker from 'faker';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import jwtdecode from 'jwt-decode';
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
import Swal from 'sweetalert2';
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
          setMentor(response.payload.data);
          console.log(response.payload.data);
        }
      })
      .catch((err) => {
        setTimeout(() => {}, 3000);
      });
    setLoading(false);
  };
  const usercheck = () => {
    const token = localStorage.getItem('user');
    console.log(index);
    console.log(localStorage.getItem('user'));
    if (!token) {
      Swal.fire({
        icon: 'error',
        title: '실패',
        text: '로그인 해주세요.'
      });
    } else if (jwtdecode(localStorage.getItem('user')).userSeq == index) {
      Swal.fire({
        icon: 'error',
        title: '실패',
        text: '본인은 신청할 수 없습니다.'
      });
    } else {
      document.location.assign(`/reservation/${index}`);
    }
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
          {mentor.mentorNickname} <h5>{}</h5>
          <h5> {mentor.mentorCareer}</h5>
        </Typography>
        <Button onClick={usercheck}>멘토링 신청하기</Button>
      </Stack>
      <CardHeader />
      <Box sx={{ p: 3 }}>
        이메일
        <TextField value={mentor.mentorEmail} fullWidth type="text" />
        소개말
        <TextField
          id="filled-textarea"
          value={mentor.mentorDesc}
          multiline
          fullWidth
          variant="filled"
        />
        <Divider />
      </Box>
    </div>
  );
}
