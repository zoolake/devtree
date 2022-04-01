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
import { registerUser, idcheckUser } from '../../../_actions/user_actions';
// ----------------------------------------------------------------------

export default function RegisterForm(props) {
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const RegisterSchema = Yup.object().shape({
    checkId: Yup.boolean(),
    userId: Yup.string()
      .required('ID는 필수 값 입니다.')
      .when('checkId', {
        is: true,
        then: Yup.string().test({
          message: () => '이미 존재하는 아이디 입니다.',
          test: async (values) => {
            if (values) {
              try {
                const response = await fetch('/v1/user/idcheck', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({ userId: values })
                });
                console.log(response);
                if (response.ok) {
                  return true;
                }
                return false;
              } catch (error) {
                console.log(error);
              }
            }
          }
        })
      }),
    userName: Yup.string()
      .min(2, '이름은 2자 이상이여야 합니다.')
      .max(10, '이름은 10자 이하이여야 합니다.'),
    userEmail: Yup.string()
      .email('올바르지 않은 이메일입니다.')
      .required('이메일은 필수 값 입니다.'),
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

  const formik = useFormik({
    initialValues: {
      userId: '',
      userName: '',
      userEmail: '',
      userPassword: '',
      confirmPassword: '',
      checkId: true
    },
    validationSchema: RegisterSchema,
    onSubmit: (values, { setSubmitting }) => {
      setTimeout(() => {
        const dataToSubmit = {
          userId: values.userId,
          userEmail: values.userEmail,
          userPassword: values.userPassword,
          userName: values.userName
        };

        dispatch(registerUser(dataToSubmit)).then((response) => {
          if (response.payload.message === 'Success') {
            document.location.assign('/login');
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
            {...getFieldProps('userId')}
            error={Boolean(touched.userId && errors.userId)}
            helperText={touched.userId && errors.userId}
          />

          <TextField
            fullWidth
            label="Name"
            {...getFieldProps('userName')}
            error={Boolean(touched.userName && errors.userName)}
            helperText={touched.userName && errors.userName}
          />

          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Email address"
            {...getFieldProps('userEmail')}
            error={Boolean(touched.userEmail && errors.userEmail)}
            helperText={touched.userEmail && errors.userEmail}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            {...getFieldProps('userPassword')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
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
