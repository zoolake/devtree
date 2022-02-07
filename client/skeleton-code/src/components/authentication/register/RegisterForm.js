import * as Yup from 'yup';
import { useState } from 'react';
import { Icon } from '@iconify/react';
import { useFormik, Form, FormikProvider } from 'formik';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
// import { useNavigate } from 'react-router-dom';
// material
import { Stack, TextField, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../_actions/user_actions';
// ----------------------------------------------------------------------

export default function RegisterForm(props) {
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const RegisterSchema = Yup.object().shape({
    checkId: Yup.boolean(),
    user_id: Yup.string()
      .required('ID는 필수 값 입니다.')
      .when('checkId', {
        is: true,
        then: Yup.string().test({
          message: () => `이미 존재하는 아이디 입니다.`,
          test: async (values) => {
            if (values) {
              try {
                const response = await fetch(
                  `https://61f649b22e1d7e0017fd6d42.mockapi.io/register/${values}`
                );
                console.log(response);
                if (response.ok) {
                  console.log('이미 있음');
                  return false;
                }
              } catch (error) {
                console.log(error);
              }
            }
          }
        })
      }),
    user_name: Yup.string(),
    user_email: Yup.string()
      .email('올바르지 않은 이메일입니다.')
      .required('이메일은 필수 값 입니다.'),
    user_password: Yup.string()
      .min(8, '비밀번호는 8자 이상이여야 합니다.')
      .max(20, '비밀번호는 20자 이하이여야 합니다.')
      .required('비밀번호는 필수 값 입니다.')
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/,
        '비밀번호는 영어, 숫자, 특수문자가 포함되어야 합니다.'
      ),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('user_password'), null], '비밀번호가 일치하지 않습니다.')
      .required('비밀번호를 재입력해주세요')
  });

  const formik = useFormik({
    initialValues: {
      user_id: '',
      user_name: '',
      user_email: '',
      user_password: '',
      confirmPassword: '',
      checkId: true
    },
    validationSchema: RegisterSchema,
    onSubmit: (values, { setSubmitting }) => {
      setTimeout(() => {
        const dataToSubmit = {
          user_id: values.users_id,
          user_email: values.user_email,
          user_password: values.user_password,
          user_name: values.user_name
        };

        dispatch(registerUser(dataToSubmit)).then((response) => {
          if (response.payload.success) {
            props.history.push('/login');
          }
          // else {
          //   //test용
          //   alert('회원가입에 실패하였습니다.');
          //   props.history.push('/login');
          // }
        });

        setSubmitting(false);
      }, 500);
    }
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            label="ID"
            {...getFieldProps('user_id')}
            error={Boolean(touched.user_id && errors.user_id)}
            helperText={touched.user_id && errors.user_id}
          />

          <TextField
            fullWidth
            label="Name"
            {...getFieldProps('user_name')}
            error={Boolean(touched.user_name && errors.user_name)}
            helperText={touched.user_name && errors.user_name}
          />

          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Email address"
            {...getFieldProps('user_email')}
            error={Boolean(touched.user_email && errors.user_email)}
            helperText={touched.user_email && errors.user_email}
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
                  <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.user_password && errors.user_password)}
            helperText={touched.user_password && errors.user_password}
          />
          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Password check"
            {...getFieldProps('confirmPassword')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.confirmPassword && errors.confirmPassword)}
            helperText={touched.confirmPassword && errors.confirmPassword}
          />
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Register
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
