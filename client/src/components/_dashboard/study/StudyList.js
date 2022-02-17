import React from 'react';
import PropTypes from 'prop-types';
import { Container, Typography } from '@mui/material';
import { StudyListCard } from '.';

StudyList.propTypes = {
  studyList: PropTypes.array.isRequired
};

export default function StudyList({ studyList }) {
  // CONDITIONAL
  if (!studyList)
    return (
      <Container>
        <Typography variant="h3" color="primary" sx={{ mt: '10%', ml: '20%' }}>
          참가한 스터디가 없습니다.
        </Typography>
      </Container>
    );

  // PAGE
  const showEachStudy = studyList.map((study) => (
    <StudyListCard key={study.teamSeq} study={study} />
  ));
  return <Container fixed>{showEachStudy}</Container>;
}
