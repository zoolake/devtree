import React, { useState, useCallback, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import makeAnimated from 'react-select/animated';
import Select from 'react-select';
import { useDispatch } from 'react-redux';
//
import { Box, Button, TextField, Divider, CardHeader } from '@mui/material';
//
import { detailUser, getTech } from '../../_actions/user_actions';
import MyProgress from '../_dashboard/MyProgress';

const animatedComponents = makeAnimated();

export default function MyProfile() {
  const [visible, setVisible] = useState(false);
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(false);
  const [opti, setOptions] = useState([]);
  const dispatch = useDispatch();
  const techGet = () => {
    dispatch(getTech())
      .then((response) => {
        const data = response.payload;
        const all = data.reduce((total, data) => {
          total = [...total, { value: data.techSeq, label: data.techName }];
          return total;
        }, []);
        setOptions(all);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
  const [value, setValue] = useState(orderOptions(opti));

  useEffect(() => {
    userDetail();
    techGet();
    // setValue([{ value: 1, label: 'Java' }]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {}, [value]);

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
          const data = response.payload.data.tech;
          const all = data.reduce((total, data) => {
            total = [...total, { value: data.techSeq, label: data.techName }];
            return total;
          }, []);
          setValue(all);
          setUsers(response.payload.data.user);
        }
      })
      .catch(() => {
        setTimeout(() => {}, 3000);
      });
    setLoading(false);
  };

  const flag = () => {
    setVisible((e) => !e);
  };
  if (loading) return <MyProgress />;
  if (!users) {
    return null;
  }

  return (
    <div>
      <CardHeader title="회원 정보" />
      <Box sx={{ p: 3 }}>
        아이디
        <TextField disabled fullWidth autoComplete="username" type="text" value={users.userId} />
        이름
        <TextField disabled={!visible} fullWidth type="text" value={users.userName} />
        닉네임
        <TextField disabled={!visible} fullWidth type="text" value={users.userNickname} />
        이메일
        <TextField
          disabled={!visible}
          fullWidth
          autoComplete="username"
          type="text"
          value={users.userEmail}
        />
        <CardHeader title="관심있는 기술 스택" />
        <div>
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
        </div>
        자기소개
        <TextField
          id="filled-textarea"
          disabled={!visible}
          multiline
          fullWidth
          variant="filled"
          value={users.userDesc}
        />
        <Divider />
      </Box>
    </div>
  );
}
