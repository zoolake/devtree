import PropTypes from 'prop-types';
//
import { Divider, Grid, Box, CardContent, Typography, Stack } from '@mui/material';

GetUserProfile.propTypes = {
  userDetail: PropTypes.object.isRequired,
  myTechs: PropTypes.array.isRequired
};

export default function GetUserProfile({ userDetail, myTechs }) {
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

  // CONDITIONAL
  // if (!userDetail) {
  //   return <MyProfile />;
  // }
  const showMyTechs = () => {
    if (myTechs.length > 0)
      return (
        <Stack direction="row" spacing={2}>
          {myTechs.map((tech) => (
            <Typography key={tech.value}>
              # <span style={{ color: '#00AB55' }}>{tech.label}</span>
            </Typography>
          ))}
        </Stack>
      );
    return (
      <Typography variant="subtitle1" color="primary">
        등록된 관심 기술 스택 없음
      </Typography>
    );
  };

  return (
    <CardContent>
      <Typography sx={{ fontSize: 14 }} color="primary" gutterBottom>
        회원정보
      </Typography>
      <Grid container spacing={1}>
        <Grid item xs={5.8}>
          <Stack direction="column" spacing={3}>
            <Stack direction="row" sx={{ width: '90%' }} justifyContent="flex-start" spacing={3}>
              <Typography variant="h5" component="div" sx={{ width: '40%' }}>
                아이디
              </Typography>
              <Typography variant="h5" color="primary">
                {userDetail.userId}
              </Typography>
            </Stack>
            <Stack direction="row" sx={{ width: '90%' }} justifyContent="flex-start" spacing={3}>
              <Typography variant="h5" component="div" sx={{ width: '40%' }}>
                이름
              </Typography>
              <Typography variant="h5" color="primary">
                {userDetail.userName}
              </Typography>
            </Stack>
            <Stack direction="row" sx={{ width: '90%' }} justifyContent="flex-start" spacing={3}>
              <Typography variant="h5" component="div" sx={{ width: '40%' }}>
                닉네임
              </Typography>
              <Typography variant="h5" color="primary">
                {userDetail.userNickname}
              </Typography>
            </Stack>
          </Stack>
        </Grid>
        <Grid item xs={5.8}>
          <Stack direction="column" spacing={3}>
            <Stack direction="row" sx={{ width: '90%' }} justifyContent="flex-start" spacing={3}>
              <Typography variant="h5" component="div" sx={{ width: '40%' }}>
                이메일
              </Typography>
              <Typography variant="h6" color="primary">
                {userDetail.userEmail}
              </Typography>
            </Stack>
            <Stack direction="row" sx={{ width: '90%' }} justifyContent="flex-start" spacing={3}>
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
          <Box sx={{ p: 2, border: '1px solid #00AB55', borderRadius: 2, height: 100 }}>
            <Typography variant="subtitle2">{userDetail.userDesc}</Typography>
          </Box>
        </Grid>
      </Grid>
      <Divider sx={{ my: 4 }} />
      <Typography variant="h5" sx={{ mb: 3 }}>
        관심 기술 스택
      </Typography>
      {showMyTechs()}
    </CardContent>
  );
}
