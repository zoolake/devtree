import React, { useState, useCallback, useMemo, useEffect } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { useDispatch } from 'react-redux';
// material
import { TextField, Divider, Box, CardHeader } from '@mui/material';
// utils
import { detailUser, getTech } from '../../_actions/user_actions';
import { mymentorProfile } from '../../_actions/mentor_actions';
// ----------------------------------------------------------------------

const animatedComponents = makeAnimated();

export default function MentorProfileUpdate() {
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
        내 티어
        <TextField disabled={!visible} fullWidth type="text" value={mentor.tier.tierName} />
        내 경험치
        <TextField disabled={!visible} fullWidth type="text" value={mentor.tier.tierName} />
        멘토 닉네임
        <TextField disabled={!visible} fullWidth type="text" value={mentor.mentorNickname} />
        멘토 커리어
        <TextField disabled={!visible} fullWidth type="text" value={mentor.mentorCareer} />
        멘토 이메일
        <TextField
          disabled={!visible}
          fullWidth
          autoComplete="username"
          type="text"
          value={mentor.mentorEmail}
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
        멘토 자기소개
        <TextField
          id="filled-textarea"
          disabled={!visible}
          multiline
          fullWidth
          variant="filled"
          value={mentor.mentorDesc}
        />
        <Divider />
      </Box>
    </div>
  );
}
