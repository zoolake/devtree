import * as Yup from 'yup';
import React, { useCallback, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useFormik, Form, FormikProvider } from 'formik';

import { Stack, TextField, Box } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import makeAnimated from 'react-select/animated';
import Select from 'react-select';

import { getTechList, updateProject } from '../../../_actions/project_actions';

ProjectUpdateForm.propTypes = {
  projectDetail: PropTypes.object.isRequired
};

export default function ProjectUpdateForm({ projectDetail }) {
  // state
  const [allTechList, setAllTech] = useState([]); // 전체 기술스택 리스트
  const [myTechList, setMyTech] = useState(projectDetail.teamTech); // 내 기술스택 리스트
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
  const getTechs = async () => {
    await dispatch(getTechList())
      .then((response) => {
        const techData = response.payload.data.data;
        const allTechs = techData.reduce((total, data) => {
          total = [...total, { value: data.techSeq, label: data.techName }];
          return total;
        }, []);
        return allTechs;
      })
      .then((allTechs) => {
        setAllTech(allTechs);
      })
      .catch((error) => {
        console.log(error, '테크 불러오기 실패');
      });
  };

  // sorting

  // form handling
  const formik = useFormik({
    initialValues: projectDetail,
    validationSchema: RegisterSchema,
    onSubmit: (values, { setSubmitting }) => {
      console.log('hi');
      setTimeout(() => {
        // 프로젝트 수정 요청 데이터
        const dataToSubmit = {
          teamManagerSeq: 1,
          teamName: values.teamName,
          teamDesc: values.teamDesc,
          teamState: formik.initialValues.teamState, // RECRUIT, COMPLETED, FINISH
          teamType: formik.initialValues.teamType, // STUDY, PROJECT
          teamTech: myTechList.map((eachTech) => eachTech.value),
          teamPosition: projectDetail.teamPosition
        };
        // 프로젝트 수정 요청
        const updatePjt = async () => {
          await dispatch(updateProject(dataToSubmit))
            .then((response) => {
              console.log(response, '프로젝트 수정 성공');
            })
            .catch((error) => {
              console.log('dataToSubmit', dataToSubmit);
              console.log(error, '프로젝트 수정 실패');
            });
        };
        updatePjt();
        setSubmitting(false);
      }, 500);
    }
  });
  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;
  const eachTech = () => {
    myTechList.map((tech) => tech.techName);
  };

  // tech handling
  const handleTechs = useCallback(
    (inputValue, { action, removedValue }) => {
      switch (action) {
        case 'remove-value': // delete with 'x'
          setMyTech(myTechList.filter((tech) => tech !== removedValue));
          return;
        case 'pop-value': {
          // delete with backspace
          if (removedValue.isFixed) {
            setMyTech([...inputValue, removedValue]);
          }
          return;
        }
        case 'clear': // clear button is clicked
          setMyTech(myTechList.filter((v) => v.isFixed));
          return;
        case 'select-option': {
          setMyTech(inputValue);
          break;
        }
        default:
      }
    },
    [myTechList]
  );

  // render
  const animatedComponents = makeAnimated();
  useEffect(() => {
    getTechs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // page
  const showMyTechs = myTechList.map((tech, i) => <li key={i}>{tech.label}</li>);

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate>
        <Stack spacing={3}>
          <TextField
            fullWidth
            label="Name"
            {...getFieldProps('teamName')}
            defaultValue={projectDetail.teamName}
            error={Boolean(touched.teamName && errors.teamName)}
            helperText={touched.teamName && errors.teamName}
          />
          <TextField
            fullWidth
            label="Desc"
            {...getFieldProps('teamDesc')}
            defaultValue={projectDetail.teamDesc}
            error={Boolean(touched.teamName && errors.teamName)}
            helperText={touched.teamName && errors.teamName}
          />
          <Box sx={7}>
            <Select
              components={animatedComponents}
              isMulti
              options={allTechList}
              placeholder="기술 스택 추가"
              onChange={handleTechs}
              // value={projectDetail.teamTech}
              defaultValue={eachTech()}
            />
          </Box>
          <ul>{showMyTechs}</ul>

          <LoadingButton
            size="small"
            type="submit"
            variant="contained"
            loading={isSubmitting}
            onChange={formik.onSubmit}
          >
            수정
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
