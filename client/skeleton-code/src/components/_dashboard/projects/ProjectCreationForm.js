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
          team_desc: values.team_desc,
          team_end_time: '2010-10-10 10:10:10',
          team_favorite_cnt: 0, // 즐겨찾기 수
          team_manager_seq: 1, // 생성자의 seq
          team_member_cnt: 1,
          team_name: values.team_name,
          team_recruit_cnt: 10,
          team_start_time: '2010-10-10 10:10:10',
          team_state: 'RECRUIT', // RECRUIT, COMPLETED, FINISH
          team_type: 'PROJECT' // STUDY, PROJECT
          // team_tech: values.team_tech,
          // team_position: values.team_position
          // team_position: '1'
        };

        // post
        const createProject = async () => {
          const createUrl = '/project';
          await axios
            .post(createUrl, {
              dataToSubmit
            })
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
    const techUrl = '/tech';
    const positionUrl = 'https://620113cafdf509001724980b.mockapi.io/api/v1/position';
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

  const addPosition = (newPosition) => {
    if (positionList.includes(newPosition)) {
      console.log('이미 있음');
    } else {
      setPosition([...positionList, newPosition]);
      console.log(positionList, '추가됨');
    }
  };

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
  const [value, setValue] = useState(orderOptions(allTechList));

  // handler for changes
  const handleTechs = useCallback(
    (inputValue, { action, removedValue }) => {
      switch (action) {
        case 'remove-value': // delete with 'x'
          setTech(orderOptions(techList.filter((tech) => tech !== removedValue)));
          return;
        case 'pop-value': // delete with backspace
          if (removedValue.isFixed) {
            setTech(orderOptions([...inputValue, removedValue]));
            return;
          }
          break;
        case 'clear': // clear button is clicked
          setTech(techList.filter((v) => v.isFixed));
          return;
        case 'select-option':
          setTech(inputValue);
          return;
        default:
      }
      setValue(inputValue);
    },
    [techList, orderOptions],
    console.log(techList)
  );

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
              isMulti // show multiple options
              components={animatedComponents} // animate builtin components
              isClearable={positionList.some((v) => !v.isFixed)} // clear button shows conditionally
              styles={styles} // styles that do not show 'x' for fixed options
              options={SetSelections.allPositionList} // all options
              value={positionList} // selected values
              onChange={addPosition} // handler for changes
              placeholder="포지션 추가"
              // error={Boolean(touched.team_position && errors.team_position)}
              // helperText={touched.team_position && errors.team_position}
            />
          </Box>

          {/* <TextField
            // fullWidth
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
          </TextField> */}

          {/* added poistions */}
          <div>
            {positionList.map((position, idx) => (
              <div key={idx}>
                {position}
                {position.position_recruit_cnt}
                {position.position_member_cnt}
                <TextField
                  // fullWidth
                  select
                  // autoComplete="techs"
                  // type="email"
                  label="team_position_recruit_cnt"
                  onChange={setPositionCnt}
                  {...getFieldProps('team_position_recruit_cnt')}
                  error={Boolean(
                    touched.team_position_recruit_cnt && errors.team_position_recruit_cnt
                  )}
                  helperText={touched.team_position_recruit_cnt && errors.team_position_recruit_cnt}
                >
                  {MemberCntList.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <LoadingButton
                  size="small"
                  type="submit"
                  variant="contained"
                  loading={isSubmitting}
                >
                  생성
                </LoadingButton>
              </div>
            ))}
          </div>

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
