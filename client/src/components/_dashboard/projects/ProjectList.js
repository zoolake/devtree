import React from 'react';
import PropTypes from 'prop-types';
import { Container } from '@mui/material';
import { ProjectListCard } from '.';

ProjectList.propTypes = {
  pjtList: PropTypes.array.isRequired
};

export default function ProjectList({ pjtList }) {
  // PAGE
  const showEachPjt = pjtList.map((pjt) => <ProjectListCard key={pjt.teamSeq} project={pjt} />);
  return <Container fixed>{showEachPjt}</Container>;
}
