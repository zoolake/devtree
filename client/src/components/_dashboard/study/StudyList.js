import React from 'react';
import PropTypes from 'prop-types';
import { Container } from '@mui/material';
import { StudyListCard } from '.';

StudyList.propTypes = {
  studyList: PropTypes.array.isRequired
};

export default function StudyList({ studyList }) {
  // PAGE
  const showEachStudy = studyList.map((study) => (
    <StudyListCard key={study.teamSeq} study={study} />
  ));
  return <Container fixed>{showEachStudy}</Container>;
}
