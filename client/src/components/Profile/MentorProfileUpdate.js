import React, { useState, useCallback, useMemo, useEffect } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { useDispatch } from 'react-redux';
// material
import {
  Stack,
  Avatar,
  Typography,
  Card,
  TextField,
  Divider,
  Paper,
  Box,
  CardHeader
} from '@mui/material';
// utils
import { detailUser, getTech } from '../../_actions/user_actions';
import { mymentorProfile } from '../../_actions/mentor_actions';
import { TierImgAvatar } from '../../utils/mockImages';
// ----------------------------------------------------------------------

const animatedComponents = makeAnimated();

export default function MentorProfileUpdate() {
  const [visible, setVisible] = useState(false);
  const [mentor, setMentor] = useState(null);
  const [tiername, setTiername] = useState([]);
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
          console.log('test');
          setMentor(response.payload.data);
          console.log(response.payload.data.mentorTechList);
          setTiername(response.payload.data.tier.tierSeq);
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

  if (loading) return <div>로딩중..</div>;
  if (!mentor) {
    return null;
  }

  return (
    <div>
      <CardHeader title="멘토 프로필 정보" />
      <Box sx={{ p: 3 }}>
        {' '}
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Card>
            <Typography style={{ color: '#303030' }} sx={{ p: 3 }} variant="h3">
              {mentor.mentorNickname} <h5>{}</h5>{' '}
              <h6 style={{ color: '#586356' }}> {mentor.mentorCareer}</h6>{' '}
              <Avatar src={TierImgAvatar(tiername)}> </Avatar>
            </Typography>{' '}
          </Card>
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
              backgroundColor: 'white',
              border: '1px solid #D3D8D2'
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
              backgroundColor: 'white',
              border: '1px solid #D3D8D2'
            }}
          >
            {mentor.mentorDesc}
          </Paper>
          <Divider />{' '}
        </Box>
      </Box>
    </div>
  );
}
