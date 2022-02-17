import PropTypes from 'prop-types';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
//
import { Card, CardContent, Typography, Stack } from '@mui/material';
//
import MyProgress from '../MyProgress';

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

  // SHOW
  const showTechs = () => {
    if (study.teamTech.length < 6) {
      return study.teamTech.map((tech) => <div key={tech.techSeq}>{tech.techName}</div>);
    }
    return study.teamTech.slice(6).map((tech) => <div key={tech.techSeq}>{tech.techName}</div>);
  };
  // eslint-disable-next-line consistent-return
  const getStateName = () => {
    for (let i = 0; i < TEAM_STATE.length; i += 1) {
      if (TEAM_STATE[i].state === study.teamState) {
        return TEAM_STATE[i].stateName;
      }
    }
  };
  const showState = () => {
    if (study.teamState === 'RECRUIT') {
      return (
        <Typography sx={{ fontWeight: 'bold' }} color="blue">
          {getStateName()}
        </Typography>
      );
    }
    if (study.teamState === 'COMPLETED') {
      return (
        <Typography sx={{ fontWeight: 'bold' }} color="primary">
          {getStateName()}
        </Typography>
      );
    }
    return (
      <Typography sx={{ fontWeight: 'bold' }} color="red">
        {getStateName()}
      </Typography>
    );
  };
  const showMember = () => {
    if (Object.keys(study).includes('teamRecruitCnt')) {
      return (
        <Typography color="text.secondary">
          {study.teamMemberCnt}/{study.teamRecruitCnt}
        </Typography>
      );
    }
    return null;
  };
  // PAGE
  if (!study.teamTech) return <MyProgress />;
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
            <Stack
              direction={{ xs: 'column', md: 'row' }}
              spacing={3}
              sx={{ alignItems: 'center', width: '80%' }}
            >
              <Typography
                variant="h4"
                color="primary"
                noWrap
                to={`/study/${study.teamSeq}`}
                component={RouterLink}
                style={{ textDecoration: 'none' }}
                sx={{ width: '40%', textOverflow: 'ellipsis' }}
              >
                {study.teamName}
              </Typography>
              <Typography variant="subtitle1">
                <Stack
                  direction="row"
                  spacing={2}
                  sx={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
                >
                  {showTechs()}
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
              {showMember()}
              {showState()}
            </Stack>
          </Stack>
        </CardContent>
      </Card>
      <br />
    </ul>
  );
}
