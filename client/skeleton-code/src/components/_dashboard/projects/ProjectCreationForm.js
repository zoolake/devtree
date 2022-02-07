import axios from 'axios';
import * as Yup from 'yup';
import { useEffect, useState } from 'react';
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
          team_seq: null,
          team_create_time: null,
          team_update_time: null,
          team_desc: values.team_desc,
          team_end_time: null,
          team_favorite_cnt: null,
          team_manager_seq: '1', // 생성자의 seq
          team_member_cnt: null,
          team_name: values.team_name,
          team_recruit_cnt: null,
          team_start_time: null,
          team_state: '모집 중',
          team_type: 'project'
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

  // 기술테크 리스트 불러오기
  const [allTechList, setAllTech] = useState([]);
  const getTechs = async () => {
    const techUrl = '/tech';
    await axios
      .get(techUrl)
      .then((response) => {
        console.log(response, '테크 불러오기 성공');
        setAllTech(response.data.data);
        // console.log(allTechList);
      })
      .catch((error) => {
        console.log(error, '테크 불러오기 실패');
      });
  };
  // 포지션 리스트 불러오기
  const [allPositionList, setAllPosition] = useState([]);
  const getPositions = async () => {
    const positionUrl = '/position';
    await axios
      .get(positionUrl)
      .then((response) => {
        console.log(response, '포지션 불러오기 성공');
        setAllPosition(response.data.data);
        console.log(allPositionList);
      })
      .catch((error) => {
        console.log(error, '포지션 불러오기 실패');
      });
  };
  // 초기 렌더링
  useEffect(() => {
    getTechs();
    getPositions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 사용자가 추가하기
  const [techList, setTech] = useState([]);
  const [positionList, setPosition] = useState([]);
  const [positionCnt, setPositionCnt] = useState('');

  const addTech = (newTech) => {
    if (techList.includes(newTech)) {
      console.log('이미 있음');
    } else {
      setTech([...techList, newTech]);
      console.log(techList, '추가됨');
    }
  };

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
            {allTechList.map((option) => (
              <MenuItem key={option.techSeq} value={option.techName}>
                {option.techName}
              </MenuItem>
            ))}
          </TextField>

          {/* techList 아이콘 */}
          <div>
            {techList.map((tech, idx) => (
              <div key={idx}>{tech.techSeq}</div>
            ))}
          </div>

          <TextField
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
          </TextField>

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
