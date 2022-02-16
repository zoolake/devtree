import * as Yup from 'yup';
import { useState } from 'react';
import { Icon } from '@iconify/react';
import { Link as RouterLink } from 'react-router-dom';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import { useFormik, Form, FormikProvider } from 'formik';
import { useDispatch } from 'react-redux';
// material
import {
  Box,
  Stack,
  TextField,
  Card,
  InputAdornment,
  IconButton,
  Divider,
  CardHeader
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// utils
import { passwordUpdate } from '../../_actions/user_actions';
//

export default function PasswordUpdate() {
  const dispatch = useDispatch();
  const [formErrorMessage, setFormErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const PasswordSchema = Yup.object().shape({
    userPassword: Yup.string()
      .min(8, '비밀번호는 8자 이상이여야 합니다.')
      .max(20, '비밀번호는 20자 이하이여야 합니다.')
      .required('비밀번호는 필수 값 입니다.')
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/,
        '비밀번호는 영어, 숫자, 특수문자가 포함되어야 합니다.'
      ),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('userPassword'), null], '비밀번호가 일치하지 않습니다.')
      .required('비밀번호를 재입력해주세요')
  });
  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };
  const formik = useFormik({
    initialValues: {
      userPassword: ''
    },
    validationSchema: PasswordSchema,
    onSubmit: (values, { setSubmitting }) => {
      console.log('야호');
      setTimeout(() => {
        const dataToSubmit = {
          //     user_id: values.user_id,
          userPassword: values.userPassword
        };
        dispatch(passwordUpdate(dataToSubmit))
          .then((response) => {
            console.log('..?!');
            console.log(response);
          })
          .catch((err) => {
            console.log('실패..?!');
          });
        setSubmitting(false);
      }, 500);
    }
  });
  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;
  return (
    <Card>
      <CardHeader title="비밀번호 수정" />
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Stack spacing={3} sx={{ p: 3, pr: 10 }}>
            <Stack spacing={3}>
              <TextField
                fullWidth
                autoComplete="current-password"
                type={showPassword ? 'text' : 'password'}
                label="새 비밀번호"
                {...getFieldProps('userPassword')}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleShowPassword} edge="end">
                        <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
                error={Boolean(touched.userPassword && errors.userPassword)}
                helperText={touched.userPassword && errors.userPassword}
              />
              <TextField
                fullWidth
                autoComplete="current-password"
                type={showPassword ? 'text' : 'password'}
                label="새 비밀번호 확인"
                {...getFieldProps('confirmPassword')}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleShowPassword} edge="end">
                        <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
                error={Boolean(touched.confirmPassword && errors.confirmPassword)}
                helperText={touched.confirmPassword && errors.confirmPassword}
              />
            </Stack>
          </Stack>
        </Form>
      </FormikProvider>
      <Divider />
      <Box sx={{ p: 2, textAlign: 'right' }}>
        <LoadingButton
          size="small"
          color="inherit"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          비밀번호 수정
        </LoadingButton>
      </Box>
    </Card>
  );
}
