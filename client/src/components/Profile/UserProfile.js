import * as Yup from 'yup';
import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import makeAnimated from 'react-select/animated';
import { useFormik, Form, FormikProvider } from 'formik';
import Select from 'react-select';
// material
import { TextField, Button, Divider, Box, Card, CardHeader } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// utils
import { detailUser, updateUser, getTech } from '../../_actions/user_actions';
import { MyProfile } from '.';
// ---------------------------------------------------------------------

const animatedComponents = makeAnimated();

export default function UserProfile() {
  const [visible, setVisible] = useState(false);
  const [users, setUsers] = useState(null);
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
    setUsers(null);
    // loading 상태를 true 로 바꿉니다.
    setLoading(true);
    await dispatch(detailUser())
      .then((response) => {
        if (response) {
          setUsers(response.payload.data.user);
          console.log(users.userId);
          const data = response.payload.data.tech;
          const all = data.reduce((total, data) => {
            total = [...total, { value: data.techSeq, label: data.techName }];
            return total;
          }, []);
          console.log(all);
          setValue(all);
        }
      })
      .catch((err) => {
        setTimeout(() => {}, 3000);
      });
    setLoading(false);
  };

  const ProfileSchema = Yup.object().shape({
    userName: Yup.string()
      .min(2, '이름은 2자 이상이여야 합니다.')
      .max(10, '이름은 10자 이하이여야 합니다.'),
    userEmail: Yup.string().email('올바르지 않은 이메일입니다.'),
    userNickname: Yup.string(),
    userDesc: Yup.string()
  });
  const formik = useFormik({
    initialValues: {
      userName: '',
      userEmail: '',
      userNickname: '',
      userDesc: ''
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
          userName: values.userName,
          userEmail: values.userEmail,
          userNickname: values.userNickname,
          userDesc: values.userDesc,
          userTech: resulttech
        };
        console.log(dataToSubmit);
        dispatch(updateUser(dataToSubmit)).then((response) => {
          if (response.payload.success) {
            window.location.reload();
            document.location.assign('/');
          }
        });
        setSubmitting(false);
      }, 500);
    }
  });

  const flag = () => {
    setVisible((e) => !e);
  };
  if (loading) return <div>로딩중..</div>;
  if (!users) {
    return <MyProfile />;
  }
  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Card
          sx={{
            '& .MuiTimelineItem-missingOppositeContent:before': {
              display: 'none'
            }
          }}
        >
          {!visible && <MyProfile />}
          {visible && (
            <div>
              <CardHeader title="회원 정보" />
              <Box sx={{ p: 3 }}>
                아이디
                <TextField
                  disabled
                  fullWidth
                  autoComplete="username"
                  type="text"
                  value={users.userId}
                />
                이름
                <TextField
                  {...getFieldProps('userName')}
                  fullWidth
                  placeholder={users.userName}
                  type="text"
                  value={formik.values.userName}
                  error={Boolean(touched.userName && errors.userName)}
                  helperText={touched.userName && errors.userName}
                />
                닉네임
                <TextField
                  {...getFieldProps('userNickname')}
                  fullWidth
                  type="text"
                  placeholder={users.userNickname}
                  error={Boolean(touched.userNickname && errors.userNickname)}
                  helperText={touched.userNickname && errors.userNickname}
                />
                이메일
                <TextField
                  {...getFieldProps('userEmail')}
                  fullWidth
                  type="text"
                  placeholder={users.userEmail}
                  error={Boolean(touched.userEmail && errors.userEmail)}
                  helperText={touched.userEmail && errors.userEmail}
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
                자기소개
                <TextField
                  {...getFieldProps('userDesc')}
                  id="filled-textarea"
                  multiline
                  fullWidth
                  variant="filled"
                  placeholder={users.userDesc}
                  error={Boolean(touched.userDesc && errors.userDesc)}
                  helperText={touched.userDesc && errors.userDesc}
                />
                <Divider />
              </Box>
            </div>
          )}
          <Box sx={{ p: 3, textAlign: 'right' }}>
            {!visible && (
              <LoadingButton size="large" color="inherit" onClick={flag} variant="contained">
                회원 수정
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
