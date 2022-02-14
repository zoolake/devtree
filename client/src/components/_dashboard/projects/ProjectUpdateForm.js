import * as Yup from 'yup';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useFormik, Form, FormikProvider } from 'formik';

import { Stack, TextField, InputLabel, MenuItem, Select } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import { getTechList, updateProject, getPositionList } from '../../../_actions/project_actions';

ProjectUpdateForm.propTypes = {
  projectDetail: PropTypes.object.isRequired
};

export default function ProjectUpdateForm({ projectDetail }) {
  // state
  // 기술스택
  const [allTechList, setAllTech] = useState([]); // 전체 기술스택 리스트
  const [allTechOption, setAllTechOption] = useState([]); // 전체 기술스택 옵션(only 이름)
  const [myTechList, setMyTech] = useState([]); // 내 기술스택 리스트(only Seq)
  const [myTechOption, setMyTechOption] = useState([]); // 내 기술스택 옵션(only 이름)
  // 포지션
  const [allPositionList, setAllPosition] = useState([]);
  const [allPositionOption, setAllPositionOption] = useState([]);
  const [myPositionList, setMyPosition] = useState([]);
  const [myPositionOption, setMyPositionOption] = useState([]);

  const [selected, setSelected] = useState(''); // 각 선택되는 옵션
  const RegisterSchema = Yup.object().shape({
    team_name: Yup.string()
      .required('프로젝트 제목은 필수 값 입니다.')
      .min(5, '이름은 5자 이상이여야 합니다.')
      .max(20, '이름은 20자 이하이여야 합니다.'),
    team_desc: Yup.string()
      .required('프로젝트 설명은 필수 값 입니다.')
      .min(10, '프로젝트 설명은 10자 이상이여야 합니다.')
  });
  const teamSeq = useParams().id;

  // initialization
  const dispatch = useDispatch();
  // 기술스택 불러오기
  const getTechs = async () => {
    await dispatch(getTechList())
      .then((response) => {
        const techData = response.payload.data.data;
        setAllTech(techData);
        return techData;
      })
      .then((techData) => {
        const techOptions = techData.map((tech) => tech.techName);
        setAllTechOption(techOptions);
      })
      .catch((error) => {
        console.log(error, '테크 불러오기 실패');
      });
  };
  // 내 기술스택 불러오기
  const getMyTechs = setMyTech(projectDetail.teamTech.map((tech) => tech.techSeq));
  const getMyTechOption = setMyTechOption(projectDetail.teamTech.map((tech) => tech.techname));
  // 포지션 리스트 불러오기
  const getPosition = async () => {
    await dispatch(getPositionList())
      .then((response) => {
        const positionData = response.payload.data.data;
        setAllPosition(positionData);
        return positionData;
      })
      .then((positionData) => {
        const positionOptions = positionData.map((position) => position.positionName);
        setAllPositionOption(positionOptions);
      })
      .catch((error) => {
        console.log(error, '포지션 불러오기 실패');
      });
  };

  // form handling
  const formik = useFormik({
    initialValues: projectDetail,
    validationSchema: RegisterSchema,
    onSubmit: (values, { setSubmitting }) => {
      setTimeout(() => {
        // 프로젝트 수정 요청 데이터
        const dataToSubmit = {
          teamManagerSeq: 1,
          teamName: values.teamName,
          teamDesc: values.teamDesc,
          teamState: formik.initialValues.teamState, // RECRUIT, COMPLETED, FINISH
          teamType: formik.initialValues.teamType, // STUDY, PROJECT
          teamTech: myTechList,
          teamPosition: myPositionList
        };
        // 프로젝트 수정 요청
        const updatePjt = async () => {
          console.log('hi');
          await dispatch(updateProject(teamSeq, dataToSubmit))
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

  // tech handling
  const handleTechChange = (event) => {
    setMyTechOption([...myTechOption, event.target.value]);
    setMyTech([
      ...myTechList,
      allTechList.find((it) => it.techName === event.target.value).techSeq
    ]);
  };
  // position handling
  const handlePositionChange = (event) => {
    setMyPositionOption([...myPositionOption, event.target.value]);
    setMyPosition([
      ...myPositionList,
      allPositionList.find((it) => it.positionName === event.target.value).positionSeq
    ]);
  };

  // const handleTechs = useCallback((inputValue, { action, removedValue }) => {
  //   console.log(action);
  //   switch (action) {
  //     case 'remove-value': // delete with 'x'
  //       setMyTech(myTechList.filter((tech) => tech !== removedValue));
  //       return;
  //     case 'pop-value': {
  //       // delete with backspace
  //       if (removedValue.isFixed) {
  //         setMyTech([...inputValue, removedValue]);
  //       }
  //       return;
  //     }
  //     case 'clear': // clear button is clicked
  //       setMyTech(myTechList.filter((v) => v.isFixed));
  //       return;
  //     case 'select-option': {
  //       setMyTech(inputValue);
  //       break;
  //     }
  //     default:
  //   }
  // });

  // render
  useEffect(() => {
    getTechs();
    getMyTechs();
    getMyTechOption();
    getPosition();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // page
  const showMyTech = myTechOption.map((tech) => <li>{tech}</li>);
  const showMyPosition = myPositionOption.map((position) => <li>{position}</li>);

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
          <InputLabel id="select-myTech-label">기술 스택</InputLabel>
          <Select
            labelId="select-myTech-label"
            id="select-myTech"
            value={selected}
            label="myTech"
            onChange={handleTechChange}
          >
            {allTechOption.map((thisTech) => (
              <MenuItem key={thisTech} value={thisTech}>
                {thisTech}
              </MenuItem>
            ))}
          </Select>
          <ul>{showMyTech}</ul>

          <Select
            labelId="select-myPosition-label"
            id="select-myPositionh"
            value={selected}
            label="myPosition"
            onChange={handlePositionChange}
          >
            {allPositionOption.map((thisPosition) => (
              <MenuItem key={thisPosition} value={thisPosition}>
                {thisPosition}
              </MenuItem>
            ))}
          </Select>
          <ul>{showMyPosition}</ul>

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
