import React from 'react';
import PropTypes from 'prop-types';
import { Container, Typography } from '@mui/material';
import { StudyListCard } from '.';

StudyList.propTypes = {
  studyList: PropTypes.array.isRequired
};

export default function StudyList({ studyList }) {
  // CONDITIONAL
  if (studyList.length === 0)
    return (
      <Typography variant="h3" color="primary" sx={{ mt: 30, ml: 40 }}>
        생성된 스터디가 없습니다.
      </Typography>
    );

  // PAGE
  const showEachStudy = studyList.map((study) => (
    <StudyListCard key={study.teamSeq} study={study} />
  ));
  return <Container fixed>{showEachStudy}</Container>;
}
