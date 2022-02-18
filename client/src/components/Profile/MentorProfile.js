import * as Yup from 'yup';
import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import makeAnimated from 'react-select/animated';
import Select from 'react-select';
import Swal from 'sweetalert2';
import { useFormik, Form, FormikProvider } from 'formik';
// material
import { TextField, Box, Card, CardHeader } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// utils
import { detailUser, updateUser, getTech } from '../../_actions/user_actions';
import { mymentorProfile, updateMentor } from '../../_actions/mentor_actions';

import { MentorProfileUpdate } from '.';

// ---------------------------------------------------------------------

const animatedComponents = makeAnimated();

export default function MentorProfile() {
  const [visible, setVisible] = useState(false);
  const [mentor, setMentor] = useState(null);
  const [loading, setLoading] = useState(false);
  const [opti, setOptions] = useState([]);
  const dispatch = useDispatch();

  const techGet = () => {
    dispatch(getTech())
      .then((response) => {
        const data = response.payload;
        console.log(data);
        const all = data.reduce((total, data) => {
          total = [...total, { value: data.techSeq, label: data.techName }];
          return total;
        }, []);
        console.log(all);
        setOptions(all);
      })
      .catch((err) => {
        console.log('에러');
        console.log(err);
      });
  };

  const styles = useMemo(
    () => ({
      multiValueRemove: (base, state) => (state.data.isFixed ? { ...base, display: 'none' } : base)
    }),
    []
  );

  const orderByLabel = useCallback((a, b) => a.label.localeCompare(b.label), []);

  const orderOptions = useCallback(
    (values) =>
      values
        .filter((v) => v.isFixed)
        .sort(orderByLabel)
        .concat(values.filter((v) => !v.isFixed).sort(orderByLabel)),
    [orderByLabel]
  );

  const [value, setValue] = useState(orderOptions(opti));

  useEffect(() => {
    userDetail();
    techGet();
    // setValue([{ value: 1, label: 'Java' }]);
  }, []);

  useEffect(() => {
    console.log(value);
  }, [value]);

  const handleChange = useCallback(
    (inputValue, { action, removedValue }) => {
      switch (action) {
        case 'remove-value': // delete with 'x'
        case 'pop-value': // delete with backspace
          if (removedValue.isFixed) {
            setValue(orderOptions([...inputValue, removedValue]));
            return;
          }
          break;
        case 'clear': // clear button is clicked
          setValue(opti.filter((v) => v.isFixed));
          return;
        default:
      }
      setValue(inputValue);
    },
    [opti, orderOptions]
  );

  const userDetail = async () => {
    setMentor(null);
    // loading 상태를 true 로 바꿉니다.
    setLoading(true);
    await dispatch(mymentorProfile())
      .then((response) => {
        if (response) {
          console.log('멘토프로필');
          setMentor(response.payload.data);
          console.log(response.payload.data);
          const data = response.payload.data.mentorTechList;
          const all = data.reduce((total, data) => {
            total = [...total, { value: data.techSeq, label: data.techName }];
            return total;
          }, []);
          setValue(all);
        }
      })
      .catch((err) => {
        console.log('멘토프로필 에러');
        console.log(err);
        setTimeout(() => {}, 3000);
      });
    setLoading(false);
  };

  const ProfileSchema = Yup.object().shape({
    mentorNickname: Yup.string(),
    mentorEmail: Yup.string().email('올바르지 않은 이메일입니다.'),
    mentorCareer: Yup.string(),
    mentorDesc: Yup.string()
  });
  const formik = useFormik({
    initialValues: {
      mentorNickname: '',
      mentorCareer: '',
      mentorEmail: '',
      mentorDesc: ''
    },
    validationSchema: ProfileSchema,
    onSubmit: (values, { setSubmitting }) => {
      const resulttech = [];
      value.forEach((item) => {
        resulttech.push(item.value);
      });
      console.log(resulttech);
      setTimeout(() => {
        const dataToSubmit = {
          mentorNickName: values.mentorNickname,
          mentorCareer: values.mentorCareer,
          mentorEmail: values.mentorEmail,
          mentorDesc: values.mentorDesc,
          mentorTech: resulttech
        };
        console.log(dataToSubmit);
        dispatch(updateMentor(dataToSubmit)).then((response) => {
          Swal.fire('완료', '변경 이 완료되었습니다.', 'success').then(window.location.reload());
        });
        setSubmitting(false);
      }, 500);
    }
  });
  useEffect(() => {
    userDetail();
  }, []);

  const flag = () => {
    setVisible((e) => !e);
  };
  if (loading) return <div>로딩중..</div>;
  if (!mentor) {
    return <MentorProfileUpdate />;
  }
  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      {' '}
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Card
          sx={{
            '& .MuiTimelineItem-missingOppositeContent:before': {
              display: 'none'
            }
          }}
        >
          {!visible && <MentorProfileUpdate />}
          {visible && (
            <div>
              <CardHeader title="멘토 프로필 정보 수정" />
              <Box sx={{ p: 3 }}>
                멘토 닉네임
                <TextField
                  {...getFieldProps('mentorNickname')}
                  disabled={!visible}
                  placeholder={mentor.mentorNickname}
                  fullWidth
                  type="text"
                />
                멘토 커리어
                <TextField
                  {...getFieldProps('mentorCareer')}
                  disabled={!visible}
                  placeholder={mentor.mentorCareer}
                  fullWidth
                  autoComplete="username"
                  type="text"
                />
                멘토 이메일
                <TextField
                  {...getFieldProps('mentorEmail')}
                  disabled={!visible}
                  fullWidth
                  placeholder={mentor.mentorEmail}
                  autoComplete="username"
                  type="text"
                  error={Boolean(touched.mentorEmail && errors.mentorEmail)}
                  helperText={touched.mentorEmail && errors.mentorEmail}
                />
                <CardHeader title="관심있는 기술 스택" />
                <div>
                  <Select
                    isMulti // show multiple options
                    components={animatedComponents} // animate builtin components
                    isClearable={value.some((v) => !v.isFixed)} // clear button shows conditionally
                    styles={styles} // styles that do not show 'x' for fixed options
                    options={opti} // all options
                    value={value} // selected values
                    onChange={handleChange} // handler for changes
                  />
                </div>
                멘토 자기소개
                <TextField
                  {...getFieldProps('mentorDesc')}
                  id="filled-textarea"
                  disabled={!visible}
                  multiline
                  fullWidth
                  variant="filled"
                  placeholder={mentor.mentorDesc}
                />
              </Box>
            </div>
          )}
          <Box sx={{ p: 3, textAlign: 'right' }}>
            {!visible && (
              <LoadingButton size="large" color="inherit" onClick={flag} variant="contained">
                정보 수정
              </LoadingButton>
            )}
            {visible && (
              <>
                <LoadingButton size="large" color="inherit" onClick={flag} variant="contained">
                  취소
                </LoadingButton>
                <LoadingButton
                  loading={isSubmitting}
                  size="large"
                  color="inherit"
                  type="submit"
                  variant="contained"
                >
                  수정하기
                </LoadingButton>
              </>
            )}
          </Box>
        </Card>
      </Form>
    </FormikProvider>
  );
}
