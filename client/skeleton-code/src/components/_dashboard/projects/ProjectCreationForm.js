import axios from 'axios';
/*
export default function ProjectListCard() {
  const createProject = async () => {
    // api 받아오기
    const url = 'http://localhost:3000/api/v1/project';
    await axios
      .post(url)
      .then((response) => {
        console.log(response, '성공');
      })
      .catch((error) => {
        console.log('실패');
      });
  };
*/

import * as Yup from 'yup';
import { useState } from 'react';
// import { Icon } from '@iconify/react';
import { useFormik, Form, FormikProvider } from 'formik';
// import eyeFill from '@iconify/icons-eva/eye-fill';
// import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
// import { useNavigate } from 'react-router-dom';
// material
import { Stack, TextField, IconButton, InputAdornment, MenuItem } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../_actions/user_actions';
// ----------------------------------------------------------------------

export default function ProjectCreationForm(props) {
  const dispatch = useDispatch();
  const RegisterSchema = Yup.object().shape({
    team_name: Yup.string()
      .required('프로젝트 제목은 필수 값 입니다.')
      .min(5, '이름은 5자 이상이여야 합니다.')
      .max(20, '이름은 20자 이하이여야 합니다.'),
    team_desc: Yup.string()
      .required('프로젝트 설명은 필수 값 입니다.')
      .min(10, '프로젝트 설명은 10자 이상이여야 합니다.')
  });

  const formik = useFormik({
    initialValues: {
      team_type: 'project',
      team_name: '',
      team_state: '모집 중',
      team_manager_seq: '', // 생성자의 seq
      team_desc: '',
      team_tech: '',
      team_position: ''
    },
    validationSchema: RegisterSchema,
    onSubmit: (values, { setSubmitting }) => {
      setTimeout(() => {
        const dataToSubmit = {
          team_type: 'project',
          team_name: values.team_name,
          team_state: '모집 중',
          team_manager_seq: '', // 생성자의 seq
          team_desc: values.team_desc,
          team_tech: values.team_tech,
          team_position: values.team_position
        };

        // post
        const createProject = async () => {
          // api 받아오기
          const url = 'http://localhost:3000/api/v1/project';
          await axios
            .post(url, {
              dataToSubmit
            })
            .then((response) => {
              console.log(response, '성공');
            })
            .catch((error) => {
              console.log('실패');
            });
        };
        // dispatch(registerUser(dataToSubmit)).then((response) => {});

        setSubmitting(false);
      }, 500);
    }
  });

  const [techList, setTech] = useState([]);
  const [positionList, setPosition] = useState([]);
  const addTech = (newTech) => {
    setTech([...techList, newTech]);
  };
  const addPosition = (newPosition) => {
    setPosition([...positionList, newPosition]);
  };

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            label="Name"
            {...getFieldProps('team_name')}
            error={Boolean(touched.team_name && errors.team_name)}
            helperText={touched.team_name && errors.team_name}
          />

          <TextField
            fullWidth
            multiline
            rows={5}
            label="desc"
            {...getFieldProps('team_desc')}
            error={Boolean(touched.team_desc && errors.team_desc)}
            helperText={touched.team_desc && errors.team_desc}
          />

          <TextField
            fullWidth
            select
            // autoComplete="techs"
            // type="email"
            label="team_tech"
            onChange={addTech}
            {...getFieldProps('team_tech')}
            error={Boolean(touched.team_tech && errors.team_tech)}
            helperText={touched.team_tech && errors.team_tech}
          >
            {techList.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            fullWidth
            select
            // autoComplete="techs"
            // type="email"
            label="team_position"
            onChange={addPosition}
            {...getFieldProps('team_position')}
            error={Boolean(touched.team_position && errors.team_position)}
            helperText={touched.team_position && errors.team_position}
          >
            {positionList.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            생성
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
