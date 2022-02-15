import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import { Link as RouterLink } from 'react-router-dom';
import shareFill from '@iconify/icons-eva/share-fill';
import messageCircleFill from '@iconify/icons-eva/message-circle-fill';
// material
import { alpha, styled } from '@mui/material/styles';
import { Stack, Box, Link, Card, Grid, Avatar, Typography, CardContent } from '@mui/material';
// utils
import { fDate } from '../../../utils/formatTime';
import { fShortenNumber } from '../../../utils/formatNumber';

const CardMediaStyle = styled('div')({
  position: 'relative',
  paddingTop: 'calc(100% * 3 / 4)'
});

const TitleStyle = styled(Link)({
  height: 44,
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
  left: theme.spacing(3),
  bottom: theme.spacing(-2)
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
  console.log(post);
  console.log(index);
  const { stack, mentorname, tier, mentorcarrer } = post;
  console.log(`tier:${tier}`);
  const latestPostLarge = index === 0;
  const latestPost = index === 1 || index === 2;

  const POST_INFO = [{ text: tier, icon: messageCircleFill }];

  return (
    <Grid item xs={12} sm={6} md={3}>
      {' '}
      <Card sx={{ position: 'relative' }}>
        <CardMediaStyle>
          <div
            style={{
              zIndex: 1,
              width: 50,
              height: 50,
              position: 'absolute',
              margin: '-25px 25px 0px 0px',
              backgroundColor: 'Yellow',
              borderRadius: '50%',
              textAlign: 'right',
              verticalAlign: 'middle',
              display: 'table-cell'
            }}
          >
            안녕
          </div>
          {/* <AvatarStyle /> */}
          <CoverImgStyle alt={mentorname} src="/static/mock-images/covers/cover_1.jpg" />
        </CardMediaStyle>
        <CardContent>
          <Typography gutterBottom variant="caption">
            {mentorcarrer}
          </Typography>
          <TitleStyle
            to={`${post.id}`}
            color="inherit"
            variant="subtitle2"
            underline="hover"
            component={RouterLink}
          >
            {mentorname}
          </TitleStyle>
          <Typography gutterBottom variant="caption">
            {stack}
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
