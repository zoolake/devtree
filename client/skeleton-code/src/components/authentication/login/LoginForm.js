import * as Yup from 'yup';
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { Cookies } from 'react-cookie';
// material
import {
  Link,
  Stack,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { loginUser } from '../../../_actions/user_actions';
// ----------------------------------------------------------------------

export default function LoginForm() {
  axios.defaults.withCredentials = true;
  const cookies = new Cookies();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formErrorMessage, setFormErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const LoginSchema = Yup.object().shape({
    user_id: Yup.string()
      .matches(/^[a-zA-Z0-9]*$/, 'ID는 영문자, 숫자만 가능합니다.')
      .min(6, 'ID는 6자 이상이여야 합니다.')
      .max(16, 'ID는 16자 이하이여야 합니다.')
      .required('아이디를 입력해주세요.'),
    user_password: Yup.string()
      .min(6, '최소 6자 이상 입력해주세요')
      .required('비밀번호를 입력해주세요.')
  });

  const formik = useFormik({
    initialValues: {
      user_id: '',
      user_password: '',
      remember: true
    },
    validationSchema: LoginSchema,
    onSubmit: (values, { setSubmitting }) => {
      setTimeout(() => {
        const dataToSubmit = {
          user_id: values.user_id,
          user_password: values.user_password
        };
        dispatch(loginUser(dataToSubmit))
          .then((response) => {
            if (response) {
              console.log('뀨?');
              window.location.reload();
              document.location.assign('/');
            } else {
              setFormErrorMessage('아이디 또는 비밀번호를 확인해주세요.');
            }
          })
          .catch((err) => {
            setFormErrorMessage('아이디 또는 비밀번호를 확인해주세요.');
            setTimeout(() => {
              setFormErrorMessage('');
            }, 3000);
          });
        setSubmitting(false);
      }, 500);
    }
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            autoComplete="username"
            type="text"
            label="ID"
            {...getFieldProps('user_id')}
            error={Boolean(touched.user_id && errors.user_id)}
            helperText={touched.user_id && errors.user_id}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            {...getFieldProps('user_password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.user_password && errors.user_password)}
            helperText={touched.user_password && errors.user_password}
          />
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
          <FormControlLabel
            control={<Checkbox {...getFieldProps('remember')} checked={values.remember} />}
            label="Remember me"
          />

          <Link component={RouterLink} variant="subtitle2" to="#">
            Forgot password?
          </Link>
        </Stack>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Login
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}
