import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Link } from '@mui/material';

const TitleStyle = styled(Link)({
  height: 44,
  overflow: 'hidden',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical'
});

StudyListCard.propTypes = {
  study: PropTypes.object.isRequired,
  index: PropTypes.number
};

export default function StudyListCard({ study, index }) {
  return (
    <div>
      <TitleStyle
        to={`${study.teamSeq}`}
        color="inherit"
        variant="subtitle2"
        underline="hover"
        component={RouterLink}
      >
        {index}) 스터디 이름: {study.teamName}
      </TitleStyle>
      <p>{study.teamDesc}</p>
      <br />
    </div>
  );
}
