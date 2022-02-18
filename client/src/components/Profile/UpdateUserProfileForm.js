import PropTypes from 'prop-types';
import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import makeAnimated from 'react-select/animated';
import Select from 'react-select';
//
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
import {
  TextField,
  Divider,
  Box,
  Grid,
  CardContent,
  Typography,
  Stack,
  Button
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
//
import { updateUser, getTech } from '../../_actions/user_actions';
import MyProgress from '../_dashboard/MyProgress';
import { MyProfile } from '.';

const animatedComponents = makeAnimated();

UpdateUserProfileForm.propTypes = {
  setIsUpdate: PropTypes.func.isRequired,
  isUpdate: PropTypes.bool,
  userDetail: PropTypes.object.isRequired,
  myTechs: PropTypes.array.isRequired,
  getUserDetail: PropTypes.func
};

export default function UpdateUserProfileForm({
  setIsUpdate,
  isUpdate,
  userDetail,
  myTechs,
  getUserDetail
}) {
  const [loading, setLoading] = useState(false);
  const [techOption, setTechOption] = useState([]);
  const dispatch = useDispatch();

  // INIT
  const getAllTech = () => {
    setLoading(true);
    dispatch(getTech())
      .then((response) => {
        const techData = response.payload;
        const allTechs = techData.reduce((total, tech) => {
          total = [...total, { value: tech.techSeq, label: tech.techName }];
          return total;
        }, []);
        setTechOption(allTechs);
      })
      .catch((err) => {
        console.log(err);
      });
    setLoading(false);
  };

  // FORM
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
  const [myTech, setMyTech] = useState(orderOptions(techOption)); // myTechs

  const ProfileSchema = Yup.object().shape({
    userName: Yup.string()
      .min(2, '이름은 2자 이상이여야 합니다.')
      .max(10, '이름은 10자 이하이여야 합니다.'),
    userEmail: Yup.string().email('올바르지 않은 이메일입니다.'),
    userNickname: Yup.string(),
    userDesc: Yup.string().nullable()
  });
  const formik = useFormik({
    initialValues: {
      userName: userDetail.userName,
      userEmail: userDetail.userEmail,
      userNickname: userDetail.userNickname,
      userDesc: userDetail.userDesc
    },
    validationSchema: ProfileSchema,
    onSubmit: (values, { setSubmitting }) => {
      setLoading(true);
      const resulttech = [];
      myTech.forEach((item) => {
        resulttech.push(item.value);
      });
      setTimeout(() => {
        const dataToSubmit = {
          userName: values.userName,
          userEmail: values.userEmail,
          userNickname: values.userNickname,
          userDesc: values.userDesc,
          userTech: resulttech
        };
        dispatch(updateUser(dataToSubmit))
          .then((response) => {
            if (response.payload.success) {
              window.location.reload();
              document.location.assign('/');
            }
          })
          .then(() => {
            setSubmitting(false);
            getUserDetail();
            setIsUpdate(!isUpdate);
          });
      }, 1000);
      setLoading(false);
    }
  });
  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  // RENDER
  useEffect(() => {
    getAllTech();
    setMyTech(myTechs);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // HANDLE
  const isMentor = () => {
    if (userDetail.userRole === 'USER') {
      return (
        <Typography variant="h5" component="div">
          일반
        </Typography>
      );
    }
    return (
      <Typography variant="h5" component="div">
        멘토
      </Typography>
    );
  };
  const handleBtn = () => {
    setIsUpdate(!isUpdate);
  };
  const handleChange = useCallback(
    (inputValue, { action, removedValue }) => {
      switch (action) {
        case 'remove-value': // delete with 'x'
        case 'pop-value': // delete with backspace
          if (removedValue.isFixed) {
            setMyTech(orderOptions([...inputValue, removedValue]));
            return;
          }
          break;
        case 'clear': // clear button is clicked
          setMyTech(techOption.filter((v) => v.isFixed));
          return;
        default:
      }
      setMyTech(inputValue);
    },
    [techOption, orderOptions]
  );

  // CONDITIONAL
  if (loading) return <MyProgress />;
  if (!userDetail) {
    return <MyProfile />;
  }

  // PAGE
  return (
    <CardContent>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Typography sx={{ fontSize: 14 }} color="primary" gutterBottom>
            회원정보 수정
          </Typography>
          <Grid container spacing={1}>
            <Grid item xs={5.8}>
              <Stack direction="column" spacing={3}>
                <Stack
                  direction="row"
                  sx={{ width: '90%' }}
                  justifyContent="flex-start"
                  spacing={3}
                >
                  <Typography variant="h5" component="div" sx={{ width: '40%' }}>
                    아이디
                  </Typography>
                  <Typography variant="h5" color="primary">
                    {userDetail.userId}
                  </Typography>
                </Stack>
                <Stack
                  direction="row"
                  sx={{ width: '90%' }}
                  justifyContent="flex-start"
                  spacing={3}
                >
                  <Typography variant="h5" component="div" sx={{ width: '40%' }}>
                    이름
                  </Typography>
                  <TextField
                    {...getFieldProps('userName')}
                    variant="standard"
                    defaultValue={userDetail.userName}
                    type="text"
                    value={formik.values.userName}
                    error={Boolean(touched.userName && errors.userName)}
                    helperText={touched.userName && errors.userName}
                  />
                </Stack>
                <Stack
                  direction="row"
                  sx={{ width: '90%' }}
                  justifyContent="flex-start"
                  spacing={3}
                >
                  <Typography variant="h5" component="div" sx={{ width: '40%' }}>
                    닉네임
                  </Typography>
                  <TextField
                    {...getFieldProps('userNickname')}
                    type="text"
                    variant="standard"
                    value={formik.values.userNickname}
                    error={Boolean(touched.userNickname && errors.userNickname)}
                    helperText={touched.userNickname && errors.userNickname}
                  />
                </Stack>
              </Stack>
            </Grid>
            <Grid item xs={5.8}>
              <Stack direction="column" spacing={3}>
                <Stack
                  direction="row"
                  sx={{ width: '90%' }}
                  justifyContent="flex-start"
                  spacing={3}
                >
                  <Typography variant="h5" component="div" sx={{ width: '40%' }}>
                    이메일
                  </Typography>
                  <TextField
                    {...getFieldProps('userEmail')}
                    variant="standard"
                    type="email"
                    defaultValue={userDetail.userEmail}
                    error={Boolean(touched.userEmail && errors.userEmail)}
                    helperText={touched.userEmail && errors.userEmail}
                  />
                </Stack>
                <Stack
                  direction="row"
                  sx={{ width: '90%' }}
                  justifyContent="flex-start"
                  spacing={3}
                >
                  <Typography variant="h5" component="div" sx={{ width: '40%' }}>
                    멘토 여부
                  </Typography>
                  <Typography variant="h5" color="primary">
                    {isMentor()}
                  </Typography>
                </Stack>
              </Stack>
            </Grid>
          </Grid>
          <Divider sx={{ my: 4 }} />
          <Grid container spacing={2}>
            <Grid item xs={2}>
              <Typography variant="h5" sx={{ mb: 3 }}>
                소개
              </Typography>
            </Grid>
            <Grid item xs={9}>
              <Box sx={{ p: 1, height: 100 }}>
                <TextField
                  {...getFieldProps('userDesc')}
                  id="filled-textarea"
                  multiline
                  fullWidth
                  rows={3}
                  defaultValue={userDetail.userDesc}
                  error={Boolean(touched.userDesc && errors.userDesc)}
                  helperText={touched.userDesc && errors.userDesc}
                />
              </Box>
            </Grid>
          </Grid>
          <Divider sx={{ my: 4 }} />
          <Typography variant="h5" sx={{ mb: 3 }}>
            관심 기술 스택
          </Typography>
          <Select
            isMulti // show multiple options
            components={animatedComponents} // animate builtin components
            isClearable={myTech.some((v) => !v.isFixed)} // clear button shows conditionally
            styles={styles} // styles that do not show 'x' for fixed options
            options={techOption} // all options
            value={myTech} // selected values
            onChange={handleChange} // handler for changes
          />
          <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
            {myTech.map((tech) => (
              <Typography key={tech.value}>
                # <span style={{ color: '#00AB55' }}>{tech.label}</span>
              </Typography>
            ))}
          </Stack>
          <Box sx={{ p: 3, textAlign: 'right' }}>
            <LoadingButton
              loading={isSubmitting}
              size="large"
              color="primary"
              type="submit"
              variant="contained"
            >
              수정 완료
            </LoadingButton>
            <Button
              variant="contained"
              onClick={handleBtn}
              sx={{ m: 3, width: 107.19 }}
              size="large"
              color="inherit"
            >
              취소
            </Button>
          </Box>
        </Form>
      </FormikProvider>
    </CardContent>
  );
}
