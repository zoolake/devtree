import * as Yup from 'yup';
import React, { useState, useCallback, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import jwtdecode from 'jwt-decode';
import makeAnimated from 'react-select/animated';
import { useDispatch } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import Grid from '@mui/material/Grid';
// material
import {
  Avatar,
  TextField,
  Multiline,
  Divider,
  Box,
  Item,
  Card,
  Stack,
  Text,
  Typography,
  CardHeader,
  Button,
  CardContent,
  Paper
} from '@mui/material';
import Swal from 'sweetalert2';
import { LoadingButton } from '@mui/lab';
import { TierImgAvatar } from '../../../utils/mockImages';
// utils
import { fDateTime } from '../../../utils/formatTime';
import { getTech } from '../../../_actions/user_actions';
import { detailMentor } from '../../../_actions/mentor_actions';
// ---------------------------------------------------------------------

const animatedComponents = makeAnimated();
export default function UserProfile({ index }) {
  const [mentor, setMentor] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tiername, setTiername] = useState([]);
  const [techname, setTechname] = useState([]);
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
    setLoading(null);
    await dispatch(detailMentor(index))
      .then((response) => {
        if (response) {
          setMentor(response.payload.data);
          console.log(response.payload.data.mentorTechList);
          setTiername(response.payload.data.tier.tierSeq);
          setTechname(response.payload.data.mentorTechList.techSeq);
          const data = response.payload.data.mentorTechList;
          const all = data.reduce((total, data) => {
            total = [...total, { value: data.techSeq, label: data.techName }];
            return total;
          }, []);
          setValue(all);
        }
      })
      .catch((err) => {
        setTimeout(() => {}, 3000);
      });
    setLoading(false);
  };

  const usercheck = () => {
    const token = localStorage.getItem('user');
    console.log(index);
    console.log(localStorage.getItem('user'));
    if (!token) {
      Swal.fire({
        icon: 'error',
        title: '실패',
        text: '로그인 해주세요.'
      });
    } else if (jwtdecode(localStorage.getItem('user')).userSeq == index) {
      Swal.fire({
        icon: 'error',
        title: '실패',
        text: '본인은 신청할 수 없습니다.'
      });
    } else {
      document.location.assign(`/reservation/${index}`);
    }
  };

  if (loading) return <div>로딩중..</div>;
  if (!mentor) {
    return null;
  }

  return (
    <div style={{ color: '#90998e' }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Card>
          <Typography style={{ color: '#303030' }} sx={{ p: 3 }} variant="h3">
            {mentor.mentorNickname} <h5>{}</h5>{' '}
            <h6 style={{ color: '#586356' }}> {mentor.mentorCareer}</h6>{' '}
            <Avatar src={TierImgAvatar(tiername)}> </Avatar>
          </Typography>{' '}
        </Card>
        <Button
          onClick={usercheck}
          sx={{
            background: 'linear-gradient(to right, #dad299, #b0dab9)',
            boxShadow: 20,
            color: 'white'
          }}
        >
          멘토링 신청하기
        </Button>
      </Stack>

      <Box sx={{ p: 3 }}>
        <CardHeader title="멘토링 기술 스택" />
        <Select
          isDisabled
          isMulti // show multiple options
          components={animatedComponents} // animate builtin components
          isClearable={value.some((v) => !v.isFixed)} // clear button shows conditionally
          styles={styles} // styles that do not show 'x' for fixed options
          options={opti} // all options
          value={value} // selected values
          onChange={handleChange} // handler for changes
        />
      </Box>

      <Box sx={{ p: 3 }}>
        <CardHeader title="이메일" />
        <Paper
          fullWidth
          sx={{
            padding: '8px',
            height: '40px',
            backgroundColor: 'white'
          }}
        >
          {mentor.mentorEmail}
        </Paper>
        <CardHeader title="멘토소개" />
        <Paper
          fullWidth
          sx={{
            padding: '8px',
            height: '100px',
            backgroundColor: 'white'
          }}
        >
          {mentor.mentorDesc}
        </Paper>

        <Divider />
      </Box>
    </div>
  );
}
