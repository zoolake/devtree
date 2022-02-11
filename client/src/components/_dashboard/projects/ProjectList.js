import React from 'react';
import PropTypes from 'prop-types';
import { Container } from '@mui/material';
import { ProjectListCard } from '.';

ProjectList.propTypes = {
  pjtList: PropTypes.array.isRequired
};

export default function ProjectList({ pjtList }) {
  return (
    <Container>
      {pjtList.map((pjt) => (
        <ProjectListCard key={pjt.teamSeq} project={pjt} />
      ))}
    </Container>
  );
}
