import PropTypes from 'prop-types';
import axios from 'axios';
import * as Yup from 'yup';
import { useState } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
import { Stack, TextField, MenuItem } from '@mui/material';
import { LoadingButton } from '@mui/lab';

StudyUpdateForm.propTypes = {
  projects: PropTypes.array.isRequired
};

export default function StudyUpdateForm(project) {
  const RegisterSchema = Yup.object().shape({
    team_name: Yup.string()
      .required('스터디 제목은 필수 값 입니다.')
      .min(5, '이름은 5자 이상이여야 합니다.')
      .max(20, '이름은 20자 이하이여야 합니다.'),
    team_desc: Yup.string()
      .required('스터디 설명은 필수 값 입니다.')
      .min(10, '스터디 설명은 10자 이상이여야 합니다.')
  });

  const formik = useFormik({
    initialValues: {
      team_type: 'project',
      team_name: '',
      team_state: '모집 중',
      team_manager_seq: '', // 생성자의 seq
      team_desc: '',
      team_tech: ''
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
        const updateStudy = async () => {
          // api 받아오기
          const url = '/v1/project';
          await axios
            .post(url, {
              dataToSubmit
            })
            .then((response) => {
              console.log(response, '성공');
            })
            .catch((error) => {
              console.log(error, '실패');
            });
        };
        // dispatch(registerUser(dataToSubmit)).then((response) => {});

        setSubmitting(false);
      }, 500);
    }
  });

  // 기술테크 리스트 불러오기
  const [techList, setTech] = useState([]);
  const addTech = (newTech) => {
    setTech([...techList, newTech]);
  };

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            label={project.team_name}
            {...getFieldProps('team_name')}
            error={Boolean(touched.team_name && errors.team_name)}
            helperText={touched.team_name && errors.team_name}
          />

          <TextField
            fullWidth
            multiline
            rows={5}
            label={project.team_desc}
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

          {/* techList 아이콘 */}
          <div>
            {techList.map((tech, idx) => (
              <div key={idx}>{tech.tech.tech_image}</div>
            ))}
          </div>

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
