import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import { useState, useCallback, useEffect } from 'react';
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

// ----------------------------------------------------------------------

export default function ReviewCard({ post, index }) {
  console.log(post);
  console.log(index);
  const { userName, comment } = post;
  const [name, setUserName] = useState([]);

  const setAnonymous = (name) => {
    // setUserName(`${name.substring(0, 1)}****님`);
    setUserName(name);
  };

  useEffect(() => {
    console.log(userName);
    setAnonymous(userName);
  }, [name]);

  return (
    <Grid item xs={0} sm={0} md={0}>
      <Card
        sx={{
          position: 'relative',
          boxShadow: 16,
          bgcolor: '#ededed',
          marginTop: '30px',
          marginBottom: '30px',
          marginLeft: '20px',
          marginRight: '20px'
        }}
      >
        <CardContent>
          <Typography gutterBottom variant="caption">
            {name}
          </Typography>
          <TitleStyle color="inherit" variant="subtitle2" underline="hover">
            {comment}
          </TitleStyle>
        </CardContent>
      </Card>
    </Grid>
  );
}
