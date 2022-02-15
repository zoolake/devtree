import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { Link as RouterLink } from 'react-router-dom';
import messageCircleFill from '@iconify/icons-eva/message-circle-fill';
// material
import { styled } from '@mui/material/styles';
import { Box, Link, Card, Grid, Avatar, Typography, CardContent } from '@mui/material';
// utils

const CardMediaStyle = styled('div')({
  position: 'relative',
  paddingTop: 'calc(100% * 3 / 4)'
});

const TitleStyle = styled(Link)({
  height: 20,
  overflow: 'hidden',
  WebkitLineClamp: 2,
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical'
});

const AvatarStyle = styled(Avatar)(({ theme }) => ({
  zIndex: 14,
  width: 100,
  height: 100,
  position: 'absolute',
  left: theme.spacing(10),
  bottom: theme.spacing(0)
}));

const InfoStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'flex-end',
  marginTop: theme.spacing(3),
  color: theme.palette.text.disabled
}));

const CoverImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
});

// ----------------------------------------------------------------------

MentorCard.propTypes = {
  post: PropTypes.object.isRequired,
  index: PropTypes.number
};

export default function MentorCard({ post, index }) {
  console.log('post', post);
  console.log(index);
  const { mentorSeq, mentorCareer, mentorNickname, mentorExp, mentorTechList } = post;
  console.log(`tier:${mentorExp}`);
  console.log(`${mentorTechList}`);
  const POST_INFO = [{ text: mentorExp, icon: messageCircleFill }];

  return (
    <Grid item xs={12} sm={6} md={3}>
      {' '}
      <Card sx={{ position: 'relative', backgourdcolor: 'red' }}>
        <CardMediaStyle>
          <AvatarStyle />
        </CardMediaStyle>
        <CardContent>
          <Typography align="center" gutterBottom>
            {mentorCareer}
          </Typography>
          <TitleStyle
            align="center"
            to={`${mentorSeq}`}
            color="inherit"
            variant="subtitle2"
            underline="hover"
            component={RouterLink}
          >
            {mentorNickname}
          </TitleStyle>
          <Typography align="center" gutterBottom variant="caption">
            {mentorTechList}
          </Typography>
          <InfoStyle>
            {POST_INFO.map((info, index) => (
              <Box key={index}>
                <Box component={Icon} icon={info.icon} />
                <Typography variant="caption">{info.text}</Typography>
              </Box>
            ))}
          </InfoStyle>
        </CardContent>
      </Card>
    </Grid>
  );
}
