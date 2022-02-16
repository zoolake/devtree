import PropTypes from 'prop-types';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
//
import { Card, CardContent, Typography, Stack } from '@mui/material';

StudyListCard.propTypes = {
  study: PropTypes.object.isRequired
};

export default function StudyListCard({ study }) {
  // STATE
  const TEAM_STATE = [
    { state: 'RECRUIT', stateName: '모집 중' },
    { state: 'COMPLETED', stateName: '모집 완료됨' },
    { state: 'FINISH', stateName: '종료됨' }
  ];

  // FUNC
  const showTechs = study.teamTech.map((tech) => <div key={tech.techSeq}>{tech.techName}</div>);
  const getStateName = () => {
    for (let i = 0; i < TEAM_STATE.length; i += 1) {
      if (TEAM_STATE[i].state === study.teamState) {
        return TEAM_STATE[i].stateName;
      }
    }
  };
  const showState = () => {
    if (study.teamState === 'RECRUIT') {
      return <Typography color="blue">{getStateName()}</Typography>;
    }
    if (study.teamState === 'COMPLETED') {
      return <Typography color="primary">{getStateName()}</Typography>;
    }
    return <Typography color="red">{getStateName()}</Typography>;
  };

  // PAGE
  if (!study.teamTech) return <div>'로딩 중'</div>;
  return (
    <ul>
      <Card
        sx={{
          boxShadow: 5,
          borderRadius: 1,
          p: 2
        }}
        key={study.teamSeq}
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
                to={`${study.teamSeq}`}
                component={RouterLink}
                style={{ textDecoration: 'none' }}
              >
                {study.teamName}
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
                {study.teamManagerName}
              </Typography>
              <Typography color="text.secondary">
                {study.teamMemberCnt}/{study.teamRecruitCnt}
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
