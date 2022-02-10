import axios from 'axios';
import * as Yup from 'yup';
import { useEffect, useState, useMemo, useCallback } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
import Select from 'react-select';
import { useDispatch } from 'react-redux';
import makeAnimated from 'react-select/animated';
import { Stack, TextField, Box } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { createProject, getTechList, getPositionList } from '../../../_actions/project_actions';
import SelectPositionCnt from '../../team/SelectPositionCnt';

export default function ProjectCreationForm() {
  // state
  const [allTechList, setAllTech] = useState([]);
  const [allPositionList, setAllPosition] = useState([]);
  const [myTechList, setMyTech] = useState([]);
  const [myPositionList, setMyPosition] = useState([]);
  const [myPositionCnt, setMyPositionCnt] = useState([]);
  const RegisterSchema = Yup.object().shape({
    teamName: Yup.string()
      .required('프로젝트 제목은 필수 값 입니다.')
      .min(5, '이름은 5자 이상이여야 합니다.')
      .max(20, '이름은 20자 이하이여야 합니다.'),
    teamDesc: Yup.string()
      .required('프로젝트 설명은 필수 값 입니다.')
      .min(10, '프로젝트 설명은 10자 이상이여야 합니다.')
  });

  // axios
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      teamManagerSeq: '',
      teamName: '',
      teamDesc: '',
      teamState: 'RECRUIT',
      teamType: 'PROJECT',
      teamTech: [],
      teamPosition: []
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
          teamType: formik.initialValues.teamType, // STUDY, PROJECT
          teamTech: myTechList,
          teamPosition: myPositionCnt
        };
        // 프로젝트 생성 함수
        const createPjt = async () => {
          await dispatch(createProject(dataToSubmit))
            .then((response) => {
              console.log(response, '프로젝트 생성 성공');
            })
            .catch((error) => {
              console.log(dataToSubmit);
              console.log(myPositionCnt);
              console.log(error, '프로젝트 생성 실패');
            });
        };
        createPjt();
        setSubmitting(false);
      }, 500);
    }
  });

  const SetSelections = async () => {
    // 기술스택 리스트 불러오기
    await dispatch(getTechList())
      .then((response) => {
        const techData = response.payload.data.data;
        const allTechs = techData.reduce((total, data, i) => {
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
    // 포지션 리스트 불러오기
    await dispatch(getPositionList())
      .then((response) => {
        const positionData = response.payload.data.data;
        const allPos = positionData.reduce((total, data, i) => {
          total = [
            ...total,
            { value: i, label: data.detailPositionName, positionName: data.positionName }
          ];
          return total;
        }, []);
        return allPos;
      })
      .then((allPos) => {
        setAllPosition(allPos);
      })
      .catch((error) => {
        console.log(error, '포지션 불러오기 실패');
      });
  };

  // render
  useEffect(() => {
    SetSelections();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  // Selection Form
  // ---------------------------------------
  // multiselect for posiition
  const animatedComponents = makeAnimated();
  // styles that do not show 'x' for fixed options
  const styles = useMemo(
    () => ({
      multiValueRemove: (base, state) => (state.data.isFixed ? { ...base, display: 'none' } : base)
    }),
    []
  );

  // sort options with alphabet order
  const orderByLabel = useCallback((a, b) => a.label.localeCompare(b.label), []);

  // listed fixed options first and then the delete-able options
  const orderOptions = useCallback(
    (values) =>
      values
        .filter((v) => v.isFixed)
        .sort(orderByLabel)
        .concat(values.filter((v) => !v.isFixed).sort(orderByLabel)),
    [orderByLabel]
  );

  // selected values, initially it lists all options in order
  const [techValue, setTechValue] = useState(orderOptions(allTechList));
  const [positionValue, setPositionValue] = useState(orderOptions(allPositionList));

  // handle
  // handle Tech Change
  const handleTechs = useCallback(
    (inputValue, { action, removedValue }) => {
      switch (action) {
        case 'remove-value': // delete with 'x'
          setMyTech(orderOptions(myTechList.filter((tech) => tech !== removedValue)));
          return;
        case 'pop-value': {
          // delete with backspace
          if (removedValue.isFixed) {
            setMyTech(orderOptions([...inputValue, removedValue]));
          }
          return;
        }
        case 'clear': // clear button is clicked
          setMyTech(myTechList.filter((v) => v.isFixed));
          return;
        case 'select-option': {
          const newInput = inputValue.reduce((total, data, i) => {
            const ret = [
              ...total,
              {
                techSeq: data.value,
                techName: data.label
              }
            ];
            return ret;
          }, []);
          setMyTech(newInput);
          return;
        }
        default:
          setTechValue(inputValue);
      }
    },
    [myTechList, orderOptions]
  );

  // handle Position Change
  const handlePositions = useCallback(
    (inputValue, { action, removedValue }) => {
      switch (action) {
        case 'remove-value': // delete with 'x'
          setMyPosition(orderOptions(myPositionList.filter((tech) => tech !== removedValue)));
          return;
        case 'pop-value': // delete with backspace
          if (removedValue.isFixed) {
            setMyPosition(orderOptions([...inputValue, removedValue]));
            return;
          }
          break;
        case 'clear': // clear button is clicked
          setMyPosition(myPositionList.filter((v) => v.isFixed));
          return;
        case 'select-option': {
          const newInput = inputValue.reduce((total, data, i) => {
            const ret = [
              ...total,
              {
                position: {
                  detailPositionName: data.label,
                  positionName: data.positionName
                },
                positionRecruitCnt: 10
              }
            ];
            return ret;
          }, []);
          console.log(newInput);
          setMyPosition(newInput);
          return;
        }
        default:
      }
      setPositionValue(inputValue);
    },
    [myPositionList, orderOptions]
  );

  let state = {
    name: ''
  };
  const handleCallback = (childData) => {
    state = { name: childData };
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            label="Name"
            {...getFieldProps('teamName')}
            error={Boolean(touched.teamName && errors.teamName)}
            helperText={touched.teamName && errors.teamName}
          />

          <TextField
            fullWidth
            multiline
            rows={5}
            label="desc"
            {...getFieldProps('teamDesc')}
            error={Boolean(touched.teamDesc && errors.teamDesc)}
            helperText={touched.teamDesc && errors.teamDesc}
          />

          <Box sx={7}>
            <Select
              // closeMenuOnSelect={false}
              components={animatedComponents}
              isMulti
              options={allTechList}
              placeholder="기술 스택 추가"
              // // isClearable={myTechList.some((v) => !v.isFixed)} // clear button shows conditionally
              styles={styles} // styles that do not show 'x' for fixed options
              // value={addTech(value)} // selected values
              onChange={handleTechs} // handler for changes
              // // error={Boolean(touched.team_position && errors.team_position)}
              // // helperText={touched.team_position && errors.team_position}
            />
          </Box>
          {myTechList.map((tech, idx) => (
            <div key={idx}>{tech.techName}</div>
          ))}

          <Box sx={7}>
            <Select
              // closeMenuOnSelect={false}
              components={animatedComponents}
              isMulti
              options={allPositionList}
              placeholder="포지션 추가"
              // // isClearable={myTechList.some((v) => !v.isFixed)} // clear button shows conditionally
              styles={styles} // styles that do not show 'x' for fixed options
              // value={addTech(value)} // selected values
              onChange={handlePositions} // handler for changes
              // // error={Boolean(touched.team_position && errors.team_position)}
              // // helperText={touched.team_position && errors.team_position}
            />
          </Box>

          {myPositionList.map((position, idx) => (
            <div key={idx}>
              {position.position.detailPositionName}
              <SelectPositionCnt
                position={position}
                myPositionCnt={myPositionCnt}
                setMyPositionCnt={setMyPositionCnt}
                onChange={handlePositions}
                myPositionList={myPositionList}
                parentCallback={handleCallback}
              />
              {state.name}
            </div>
          ))}

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
            onChange={formik.onSubmit}
          >
            생성
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
