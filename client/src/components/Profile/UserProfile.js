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
import { MyProfile } from '.';
// ---------------------------------------------------------------------

export default function UserProfile() {
  const [visible, setVisible] = useState(false);
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const userDetail = async () => {
    setUsers(null);
    // loading 상태를 true 로 바꿉니다.
    setLoading(true);
    await dispatch(detailUser())
      .then((response) => {
        if (response) {
          setUsers(response.payload.data.user);
          console.log(users.userId);
        }
      })
      .catch((err) => {
        setTimeout(() => {}, 3000);
      });
    setLoading(false);
  };

  const ProfileSchema = Yup.object().shape({
    userName: Yup.string()
      .required('이름은 필수 값 입니다.')
      .min(2, '이름은 2자 이상이여야 합니다.')
      .max(10, '이름은 10자 이하이여야 합니다.'),
    userEmail: Yup.string()
      .email('올바르지 않은 이메일입니다.')
      .required('이메일은 필수 값 입니다.'),
    userNickname: Yup.string(),
    userDesc: Yup.string()
  });
  const formik = useFormik({
    initialValues: {
      userName: '',
      userEmail: '',
      userNickname: '',
      userDesc: ''
    },
    validationSchema: ProfileSchema,
    onSubmit: (values, { setSubmitting }) => {
      setTimeout(() => {
        const dataToSubmit = {
          userName: values.userName,
          userEmail: values.userEmail,
          userNickname: values.userNickname,
          userDesc: values.userDesc
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
  if (!users) {
    return <MyProfile />;
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
          {!visible && <MyProfile />}
          {visible && (
            <div>
              <CardHeader title="회원 정보" />
              <Box sx={{ p: 3 }}>
                아이디
                <TextField
                  disabled
                  fullWidth
                  autoComplete="username"
                  type="text"
                  value={users.userId}
                />
                이름
                <TextField
                  {...getFieldProps('userName')}
                  fullWidth
                  type="text"
                  error={Boolean(touched.userName && errors.userName)}
                  helperText={touched.userName && errors.userName}
                />
                닉네임
                <TextField
                  {...getFieldProps('userNickname')}
                  fullWidth
                  type="text"
                  error={Boolean(touched.userNickname && errors.userNickname)}
                  helperText={touched.userNickname && errors.userNickname}
                />
                이메일
                <TextField
                  {...getFieldProps('userEmail')}
                  fullWidth
                  type="text"
                  error={Boolean(touched.userEmail && errors.userEmail)}
                  helperText={touched.userEmail && errors.userEmail}
                />
                자기소개
                <TextField
                  {...getFieldProps('userDesc')}
                  id="filled-textarea"
                  multiline
                  fullWidth
                  variant="filled"
                  error={Boolean(touched.userDesc && errors.userDesc)}
                  helperText={touched.userDesc && errors.userDesc}
                />
                <Divider />
              </Box>
            </div>
          )}
          <Box sx={{ p: 3, textAlign: 'right' }}>
            {!visible && (
              <LoadingButton size="large" color="inherit" onClick={flag} variant="contained">
                회원 수정
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
