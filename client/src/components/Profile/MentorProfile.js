import * as Yup from 'yup';
import faker from 'faker';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useFormik, Form, FormikProvider } from 'formik';
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
import { detailUser, updateUser } from '../../_actions/user_actions';
import { MentorProfileUpdate } from '.';
// ---------------------------------------------------------------------

export default function MentorProfile() {
  const [visible, setVisible] = useState(false);
  const [mentor, setMentor] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const userDetail = async () => {
    setMentor(null);
    // loading 상태를 true 로 바꿉니다.
    setLoading(true);
    await dispatch(detailUser())
      .then((response) => {
        if (response) {
          setMentor(response.payload.data.user);
          console.log(mentor.userId);
        }
      })
      .catch((err) => {
        setTimeout(() => {}, 3000);
      });
    setLoading(false);
  };

  const ProfileSchema = Yup.object().shape({
    mentor_nickname: Yup.string(),
    mentor_email: Yup.string().email('올바르지 않은 이메일입니다.'),
    mentor_career: Yup.string(),
    mentor_desc: Yup.string()
  });
  const formik = useFormik({
    initialValues: {
      mentor_nickname: '',
      mentor_career: '',
      mentor_email: '',
      mentor_desc: ''
    },
    validationSchema: ProfileSchema,
    onSubmit: (values, { setSubmitting }) => {
      setTimeout(() => {
        const dataToSubmit = {
          mentor_nickname: values.mentor_nickname,
          mentor_career: values.mentor_career,
          mentor_email: values.mentor_email,
          mentor_desc: values.mentor_desc
        };
        console.log(dataToSubmit);
        dispatch(updateUser(dataToSubmit)).then((response) => {
          if (response.payload.success) {
            window.location.reload();
            document.location.assign('/');
          }
        });
        setSubmitting(false);
      }, 500);
    }
  });
  useEffect(() => {
    userDetail();
  }, []);

  const flag = () => {
    setVisible((e) => !e);
  };
  if (loading) return <div>로딩중..</div>;
  if (!mentor) {
    return <MentorProfileUpdate />;
  }
  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      {' '}
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Card
          sx={{
            '& .MuiTimelineItem-missingOppositeContent:before': {
              display: 'none'
            }
          }}
        >
          {!visible && <MentorProfileUpdate />}
          {visible && (
            <div>
              <CardHeader title="멘토 프로필 정보 수정" />
              <Box sx={{ p: 3 }}>
                멘토 닉네임
                <TextField
                  {...getFieldProps('mentor_nickname')}
                  disabled={!visible}
                  fullWidth
                  type="text"
                />
                멘토 커리어
                <TextField
                  {...getFieldProps('mentor_career')}
                  disabled={!visible}
                  fullWidth
                  autoComplete="username"
                  type="text"
                />
                멘토 이메일
                <TextField
                  {...getFieldProps('mentor_email')}
                  disabled={!visible}
                  fullWidth
                  autoComplete="username"
                  type="text"
                  error={Boolean(touched.mentor_email && errors.mentor_email)}
                  helperText={touched.mentor_email && errors.mentor_email}
                />
                멘토 자기소개
                <TextField
                  {...getFieldProps('mentor_desc')}
                  id="filled-textarea"
                  disabled={!visible}
                  multiline
                  fullWidth
                  variant="filled"
                />
              </Box>
            </div>
          )}
          <Box sx={{ p: 3, textAlign: 'right' }}>
            {!visible && (
              <LoadingButton size="large" color="inherit" onClick={flag} variant="contained">
                정보 수정
              </LoadingButton>
            )}
            {visible && (
              <>
                <LoadingButton size="large" color="inherit" onClick={flag} variant="contained">
                  취소
                </LoadingButton>
                <LoadingButton
                  loading={isSubmitting}
                  size="large"
                  color="inherit"
                  type="submit"
                  variant="contained"
                >
                  수정하기
                </LoadingButton>
              </>
            )}
          </Box>
        </Card>
      </Form>
    </FormikProvider>
  );
}
