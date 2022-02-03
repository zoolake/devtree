import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Link } from '@mui/material';

// ----------------------------------------------------------------------

const TitleStyle = styled(Link)({
  height: 44,
  overflow: 'hidden',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical'
});

// ----------------------------------------------------------------------

ProjectListCard.propTypes = {
  post: PropTypes.object.isRequired,
  index: PropTypes.number
};

export default function ProjectListCard({ post, index }) {
  return (
    <div>
      <TitleStyle
        to={`/${post.id}`}
        color="inherit"
        variant="subtitle2"
        underline="hover"
        component={RouterLink}
      >
        {index}) 프로젝트 이름: {post.team_name}
      </TitleStyle>
      <p>{post.team_desc}</p>
      <br />
    </div>
  );
}
