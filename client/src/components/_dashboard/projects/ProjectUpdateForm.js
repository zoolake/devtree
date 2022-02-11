import axios from 'axios';
import * as Yup from 'yup';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import { Stack, TextField, MenuItem } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { getProjectDetail } from '../../../_actions/project_actions';

export default function ProjectUpdateForm() {
  // state
  const teamSeq = useParams().id;
  const [projectDetail, setProjectDetail] = useState([]);
  const [loading, setLoading] = useState(false);
  const RegisterSchema = Yup.object().shape({
    team_name: Yup.string()
      .required('프로젝트 제목은 필수 값 입니다.')
      .min(5, '이름은 5자 이상이여야 합니다.')
      .max(20, '이름은 20자 이하이여야 합니다.'),
    team_desc: Yup.string()
      .required('프로젝트 설명은 필수 값 입니다.')
      .min(10, '프로젝트 설명은 10자 이상이여야 합니다.')
  });

  // axios
  const dispatch = useDispatch();
  // 해당 프로젝트 정보 불러오기
  const getPjtDetail = async () => {
    setLoading(true);
    await dispatch(getProjectDetail(teamSeq))
      .then((response) => {
        console.log('프로젝트 상세 조회 성공');
        const projectData = response.payload.data.data;
        setProjectDetail(projectData);
        return projectData;
      })
      .then(() => {
        console.log(projectDetail);
      })
      .catch((error) => {
        console.log(error, '프로젝트 상세 조회 실패');
      });
    setLoading(false);
  };
  // form handling
  const formik = useFormik({
    initialValues: {
      teamManagerSeq: projectDetail.teamManagerSeq,
      teamName: projectDetail.teamName,
      teamDesc: projectDetail.teamDesc,
      teamState: projectDetail.teamState,
      teamType: projectDetail.teamType,
      teamTech: projectDetail.teamTech,
      teamPosition: projectDetail.teamPosition
    },
    validationSchema: RegisterSchema,
    onSubmit: (values, { setSubmitting }) => {
      setTimeout(() => {
        // 프로젝트 생성시 요청할 데이터
        const dataToSubmit = {
          teamManagerSeq: 1,
          teamName: values.teamName,
          teamDesc: values.teamDesc,
          teamState: formik.initialValues.teamState, // RECRUIT, COMPLETED, FINISH
          teamType: formik.initialValues.teamType // STUDY, PROJECT
          // teamTech: myTechList,
          // teamPosition: myPositionCnt
        };
        setSubmitting(false);
      }, 500);
    }
  });
  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  // render
  useEffect(() => {
    getPjtDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // page
  if (loading || projectDetail.length === 0 || formik.initialValues.teamName === undefined) {
    console.log(formik.initialValues.teamName);
    return <div>'로딩 중입니다'</div>;
  }
  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate>
        <Stack spacing={3}>
          <TextField
            fullWidth
            label="Name"
            {...getFieldProps('teamName')}
            // error={Boolean(touched.teamName && errors.teamName)}
            // helperText={touched.teamName && errors.teamName}
          />
        </Stack>
      </Form>
    </FormikProvider>
  );
}
