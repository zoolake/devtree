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
  project: PropTypes.object.isRequired,
  index: PropTypes.number
};

export default function ProjectListCard({ project, index }) {
  return (
    <div>
      <TitleStyle
        to={`${project.teamSeq}`}
        color="inherit"
        variant="subtitle2"
        underline="hover"
        component={RouterLink}
      >
        {index}) 프로젝트 이름: {project.teamName}
      </TitleStyle>
      <p>{project.teamDesc}</p>
      <br />
    </div>
  );
}
