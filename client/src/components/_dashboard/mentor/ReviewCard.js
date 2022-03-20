import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import { useState, useCallback } from 'react';
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
    <Grid item xs={0} sm={0} md={0}>
      {' '}
      <Card sx={{ position: 'relative' }}>
        <CardContent>
          <Typography gutterBottom variant="caption">
            {mentorcarrer}
          </Typography>
          <TitleStyle
            to="/"
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
        </CardContent>
      </Card>
    </Grid>
  );
}
