import faker from 'faker';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
// material
import { TextField, Divider, Box, CardHeader } from '@mui/material';
// utils
import { detailUser } from '../../_actions/user_actions';
// ----------------------------------------------------------------------

export default function MyProfile() {
  const [visible, setVisible] = useState(false);
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const userDetail = async () => {
    setUsers(null);
    // loading 상태를 true 로 바꿉니다.
    setLoading(true);
    await dispatch(detailUser())
      .then((response) => {
        if (response) {
          console.log('test');
          setUsers(response.payload.data.user);
        }
      })
      .catch((err) => {
        setTimeout(() => {}, 3000);
      });
    setLoading(false);
  };

  useEffect(() => {
    userDetail();
  }, []);

  const flag = () => {
    setVisible((e) => !e);
  };
  if (loading) return <div>로딩중..</div>;
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
