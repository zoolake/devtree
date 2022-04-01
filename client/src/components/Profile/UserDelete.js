import { useDispatch } from 'react-redux';
// material
import { Box, Card, CardHeader } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// utils

import { deleteUser } from '../../_actions/user_actions';
// ---------------------------------------------------------------------
export default function UserDelete() {
  const dispatch = useDispatch();
  const userdeleteFunc = () => {
    dispatch(deleteUser()).then((response) => {
      if (response.payload.success) {
        window.location.reload();
        document.location.assign('/');
      }
    });
  };
  return (
    <Card
      sx={{
        '& .MuiTimelineItem-missingOppositeContent:before': {
          display: 'none'
        }
      }}
    >
      <CardHeader title="회원 탈퇴" />
      <Box sx={{ p: 3, textAlign: 'right' }}>
        정말 탈퇴하시겠습니까?
        <LoadingButton
          onClick={userdeleteFunc}
          size="large"
          color="inherit"
          type="submit"
          variant="contained"
        >
          회원 탈퇴
        </LoadingButton>
      </Box>
    </Card>
  );
}
