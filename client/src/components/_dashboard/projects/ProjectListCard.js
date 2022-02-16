import PropTypes from 'prop-types';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
//
import { Card, CardContent, Typography, Stack } from '@mui/material';

ProjectListCard.propTypes = {
  project: PropTypes.object.isRequired
};

export default function ProjectListCard({ project }) {
  // STATE
  const TEAM_STATE = [
    { state: 'RECRUIT', stateName: '모집 중' },
    { state: 'COMPLETED', stateName: '모집 완료됨' },
    { state: 'FINISH', stateName: '종료됨' }
  ];

  // FUNC
  const showTechs = project.teamTech.map((tech) => <div key={tech.techSeq}>{tech.techName}</div>);
  const getStateName = () => {
    for (let i = 0; i < TEAM_STATE.length; i += 1) {
      if (TEAM_STATE[i].state === project.teamState) {
        return TEAM_STATE[i].stateName;
      }
    }
  };
  const showState = () => {
    if (project.teamState === 'RECRUIT') {
      return <Typography color="blue">{getStateName()}</Typography>;
    }
    if (project.teamState === 'COMPLETED') {
      return <Typography color="primary">{getStateName()}</Typography>;
    }
    return <Typography color="red">{getStateName()}</Typography>;
  };

  // PAGE
  if (!project.teamTech) return <div>'로딩 중'</div>;
  return (
    <ul>
      <Card
        sx={{
          boxShadow: 5,
          borderRadius: 1,
          p: 2
        }}
        key={project.teamSeq}
      >
        <CardContent>
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={2}
            justifyContent="space-between"
            sx={{ alignItems: 'center' }}
          >
            <Stack direction="row" spacing={3} sx={{ alignItems: 'center' }}>
              <Typography
                variant="h4"
                color="primary"
                noWrap
                to={`${project.teamSeq}`}
                component={RouterLink}
                style={{ textDecoration: 'none' }}
              >
                {project.teamName}
              </Typography>
              <Typography variant="subtitle1">
                <Stack direction="row" spacing={2}>
                  {showTechs}
                </Stack>
              </Typography>
            </Stack>
            <Stack
              direction="row"
              spacing={2}
              justifyContent="space-between"
              sx={{ alignItems: 'center' }}
            >
              <Typography color="text.secondary" variant="subtitle1">
                {project.teamManagerName}
              </Typography>
              <Typography color="text.secondary">
                {project.teamMemberCnt}/{project.teamRecruitCnt}
              </Typography>
              {showState()}
            </Stack>
          </Stack>
        </CardContent>
      </Card>
      <br />
    </ul>
  );
}
