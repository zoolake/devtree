import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { Link as RouterLink } from 'react-router-dom';
import messageCircleFill from '@iconify/icons-eva/message-circle-fill';
// material
import { styled } from '@mui/material/styles';
import { orange, green, blue, purple, red } from '@mui/material/colors';
import { Box, Link, Card, Grid, Avatar, Typography, CardContent } from '@mui/material';
// utils
import { TechImgAvatar } from '../../../utils/mockImages';

const CardMediaStyle = styled('div')({
  position: 'relative',
  paddingTop: 'calc(100% * 3 / 4)'
});

const TitleStyle = styled(Link)({
  zIndex: 14,
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
  left: '50%',
  transform: 'translateX(-50%)',
  bottom: theme.spacing(0),
  vaule: 'd'
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
  console.log(mentorTechList);
  const POST_INFO = [{ text: mentorExp, icon: messageCircleFill }];
  const colours = [blue[800], green[500], orange[500], purple[800], red[800]];
  const getColour = () => colours[Math.floor(Math.random() * colours.length)];
  return (
    <Grid item xs={12} sm={6} md={3}>
      <Card sx={{ position: 'relative', backgourdcolor: 'red' }}>
        <CardMediaStyle>
          <AvatarStyle
            to={`${mentorSeq}`}
            component={RouterLink}
            alt={mentorNickname}
            src="/imsi"
            sx={{ bgcolor: getColour() }}
          />
        </CardMediaStyle>
        <CardContent>
          <Typography
            sx={{ fontSize: '15px', fontWeight: 'bold', color: '#565656' }}
            align="center"
            gutterBottom
          >
            {mentorCareer}
          </Typography>
          <TitleStyle
            align="center"
            to={`${mentorSeq}`}
            component={RouterLink}
            color="inherit"
            variant="subtitle2"
            underline="hover"
            sx={{ fontSize: '18px' }}
          >
            {mentorNickname}
          </TitleStyle>

          <InfoStyle>
            {mentorTechList.map((info, index) => (
              <Box key={index}>
                <Typography variant="caption">#{info.techName}&nbsp; </Typography>
              </Box>
            ))}
          </InfoStyle>
          <InfoStyle>
            {mentorTechList.map((info, index) => (
              <Box key={index}>
                <Avatar variant="caption" src={TechImgAvatar(info.techSeq)} />
              </Box>
            ))}
          </InfoStyle>
        </CardContent>
      </Card>
    </Grid>
  );
}
