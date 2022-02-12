import { useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';
// material
import { TextField, Divider, Box, CardHeader } from '@mui/material';
// utils
import { detailUser } from '../../_actions/user_actions';
// ----------------------------------------------------------------------

export default function MentorProfileUpdate() {
  const [visible, setVisible] = useState(false);
  const [mentor, setMentor] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const userDetail = async () => {
    setMentor(null);
    // loading 상태를 true 로 바꿉니다.
    setLoading(true);
    await dispatch(detailUser())
      .then((response) => {
        if (response) {
          console.log('test');
          setMentor(response.payload.data.user);
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

  if (loading) return <div>로딩중..</div>;
  if (!mentor) {
    return null;
  }

  return (
    <div>
      <CardHeader title="멘토 프로필 정보" />
      <Box sx={{ p: 3 }}>
        내 경험치
        <TextField disabled={!visible} fullWidth type="text" value={mentor.mentorTier} />
        내 티어
        <TextField disabled={!visible} fullWidth type="text" value={mentor.mentorTier} />
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
