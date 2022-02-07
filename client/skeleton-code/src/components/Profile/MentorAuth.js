import faker from 'faker';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
// material
import {
  TextField,
  Multiline,
  Divider,
  Box,
  Card,
  Typography,
  CardHeader,
  CardContent
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// utils
import { fDateTime } from '../../utils/formatTime';
import { detailUser } from '../../_actions/user_actions';

// ---------------------------------------------------------------------

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
          setUsers(response.payload);
          console.log(users.userId);
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
      <CardHeader title="멘토를 인증해주세요" />
      <Box sx={{ p: 3 }}>
        이름
        <TextField disabled={!visible} fullWidth type="text" value={users.userName} />
        멘토 인증하는 내용
        <Divider />
      </Box>
    </div>
  );
}
