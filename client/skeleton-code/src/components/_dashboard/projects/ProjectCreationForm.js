import axios from 'axios';
import * as Yup from 'yup';
import { useEffect, useState, useMemo, useCallback } from 'react';
// import { Icon } from '@iconify/react';
import { useFormik, Form, FormikProvider } from 'formik';
// import eyeFill from '@iconify/icons-eva/eye-fill';
// import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
// import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import {
  Stack,
  TextField,
  // IconButton,
  // InputAdornment,
  MenuItem,
  Box,
  // Card,
  // Typography,
  CardHeader
  // CardContent
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// import { useDispatch } from 'react-redux';
// import { registerUser } from '../../../_actions/user_actions';
// ----------------------------------------------------------------------

export default function ProjectCreationForm() {
  // const dispatch = useDispatch();

  const RegisterSchema = Yup.object().shape({
    teamName: Yup.string()
      .required('프로젝트 제목은 필수 값 입니다.')
      .min(5, '이름은 5자 이상이여야 합니다.')
      .max(20, '이름은 20자 이하이여야 합니다.'),
    teamDesc: Yup.string()
      .required('프로젝트 설명은 필수 값 입니다.')
      .min(10, '프로젝트 설명은 10자 이상이여야 합니다.')
  });

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
        const dataToSubmit = {
          teamManagerSeq: 1,
          teamName: values.teamName,
          teamDesc: values.teamDesc,
          teamState: formik.initialValues.teamState, // RECRUIT, COMPLETED, FINISH
          teamType: formik.initialValues.teamType, // STUDY, PROJECT
          teamTech: techList,
          teamPosition: positionList
        };

        const createProject = async () => {
          const createUrl = '/project'; // http://127.26.1.146:8080/v1/project
          await axios
            .post(createUrl, dataToSubmit)
            .then((response) => {
              console.log(response, '프로젝트 생성 성공');
            })
            .catch((error) => {
              console.log(error, '프로젝트 생성 실패');
              console.log(dataToSubmit);
            });
        };
        // dispatch(registerUser(dataToSubmit)).then((response) => {});
        createProject();

        setSubmitting(false);
      }, 500);
    }
  });

  const [loading, setLoading] = useState(false);
  const [allTechList, setAllTech] = useState([]);
  const [allPositionList, setAllPosition] = useState([]);

  const SetSelections = async () => {
    // 기술테크, 포지션 리스트 불러오기
    const techUrl = '/tech'; // http://127.26.1.146:8080/v1/tech
    const positionUrl = '/position'; // http://127.26.1.146:8080/v1/position
    await axios
      .get(techUrl)
      .then((response) => {
        console.log(response.data.message);
        return response.data.data;
      })
      .then((dataList) => {
        const allTechs = dataList.reduce((total, data, i) => {
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
    await axios
      .get(positionUrl)
      .then((response) => {
        console.log(response.data.message);
        return response.data.data;
      })
      .then((dataList) => {
        const allPos = dataList.reduce((total, data, i) => {
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

  // 초기 렌더링
  useEffect(() => {
    SetSelections();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 사용자가 추가하기
  const [techList, setTech] = useState([]);
  const [positionList, setPosition] = useState([]);
  const [positionCnt, setPositionCnt] = useState('');

  // MemberCntList는 포지션별 멤버 수
  const MemberCntList = [...Array(10).keys()].map((key) => key + 1);

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

  // handler for Tech changes
  const handleTechs = useCallback(
    (inputValue, { action, removedValue }) => {
      switch (action) {
        case 'remove-value': // delete with 'x'
          setTech(orderOptions(techList.filter((tech) => tech !== removedValue)));
          return;

        case 'pop-value': {
          // delete with backspace
          if (removedValue.isFixed) {
            setTech(orderOptions([...inputValue, removedValue]));
          }
          return;
        }

        case 'clear': // clear button is clicked
          setTech(techList.filter((v) => v.isFixed));
          return;

        case 'select-option': {
          const newInput = inputValue.reduce((total, data, i) => {
            const ret = [...total, data.value];
            return ret;
          }, []);
          setTech(newInput);
          return;
        }

        default:
          setTechValue(inputValue);
      }
    },
    [techList, orderOptions]
  );

  // handler for Position changes
  const handlePositions = useCallback(
    (inputValue, { action, removedValue }) => {
      switch (action) {
        case 'remove-value': // delete with 'x'
          setPosition(orderOptions(positionList.filter((tech) => tech !== removedValue)));
          return;
        case 'pop-value': // delete with backspace
          if (removedValue.isFixed) {
            setPosition(orderOptions([...inputValue, removedValue]));
            return;
          }
          break;
        case 'clear': // clear button is clicked
          setPosition(positionList.filter((v) => v.isFixed));
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
          setPosition(newInput);
          return;
        }
        default:
      }
      setPositionValue(inputValue);
    },
    [positionList, orderOptions]
  );

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
              // // isClearable={techList.some((v) => !v.isFixed)} // clear button shows conditionally
              styles={styles} // styles that do not show 'x' for fixed options
              // value={addTech(value)} // selected values
              onChange={handleTechs} // handler for changes
              // // error={Boolean(touched.team_position && errors.team_position)}
              // // helperText={touched.team_position && errors.team_position}
            />
          </Box>

          <Box sx={7}>
            <Select
              // closeMenuOnSelect={false}
              components={animatedComponents}
              isMulti
              options={allPositionList}
              placeholder="포지션 추가"
              // // isClearable={techList.some((v) => !v.isFixed)} // clear button shows conditionally
              styles={styles} // styles that do not show 'x' for fixed options
              // value={addTech(value)} // selected values
              onChange={handlePositions} // handler for changes
              // // error={Boolean(touched.team_position && errors.team_position)}
              // // helperText={touched.team_position && errors.team_position}
            />
          </Box>

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
