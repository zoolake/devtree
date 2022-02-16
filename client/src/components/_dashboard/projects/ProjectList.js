import React from 'react';
import PropTypes from 'prop-types';
import { Container, Typography } from '@mui/material';
import { ProjectListCard } from '.';

ProjectList.propTypes = {
  pjtList: PropTypes.array.isRequired
};

export default function ProjectList({ pjtList }) {
  // CONDITIONAL
  if (pjtList.length === 0)
    return (
      <Typography variant="h3" color="primary" sx={{ mt: 30, ml: 40 }}>
        생성된 프로젝트가 없습니다.
      </Typography>
    );

  // PAGE
  const showEachPjt = pjtList.map((pjt) => <ProjectListCard key={pjt.teamSeq} project={pjt} />);
  return <Container fixed>{showEachPjt}</Container>;
}
