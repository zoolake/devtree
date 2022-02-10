import React, { useState, useEffect } from 'react';
import { Container } from '@mui/material';
import { ProjectListCard } from '.';

export default function ProjectList({ pjtList }) {
  return (
    <Container>
      {pjtList.map((pjt) => (
        <ProjectListCard key={pjt.teamSeq} project={pjt} />
      ))}
    </Container>
  );
}
