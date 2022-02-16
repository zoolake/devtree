import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
// material
import { Divider, Box, CardHeader, Button } from '@mui/material';
// utils
import { setMentor } from '../../_actions/mentor_actions';

// ----------------------------------------------------------------------

export default function MyProfile() {
  const [visible, setVisible] = useState(false);
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const setmentor = async () => {
    await dispatch(setMentor())
      .then((response) => {
        if (response) {
          setUsers(response.payload);
        }
      })
      .catch((err) => {
        setTimeout(() => {}, 3000);
      });
    setLoading(false);
  };

  const mentortest = () => {
    setmentor();
  };
  return (
    <div>
      <CardHeader title="멘토를 인증해주세요" />
      <Box sx={{ p: 3 }}>
        <Button onClick={mentortest}>TEST :멘토 되기</Button>
        <Divider />
      </Box>
    </div>
  );
}
