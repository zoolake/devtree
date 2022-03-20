import PropTypes from 'prop-types';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
//
import { Avatar, Card, CardContent, Typography, Stack, Chip } from '@mui/material';
import { TechImgAvatar } from '../../../utils/mockImages';
import MyProgress from '../MyProgress';

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
  const showTechs = () => {
    if (project.teamTech.length < 6) {
      return project.teamTech.map((tech) => (
        <Avatar
          key={tech.techSeq}
          variant="caption"
          sx={{ border: '1px solid #efefef', width: '50px', height: '50px' }}
          src={TechImgAvatar(tech.techSeq)}
        />
      ));
    }
    return project.teamTech
      .slice(0, 5)
      .map((tech) => (
        <Avatar
          key={tech.techSeq}
          variant="caption"
          sx={{ border: '1px solid #efefef', width: '50px', height: '50px' }}
          src={TechImgAvatar(tech.techSeq)}
        />
      ));
  };
  // eslint-disable-next-line consistent-return
  const getStateName = () => {
    for (let i = 0; i < TEAM_STATE.length; i += 1) {
      if (TEAM_STATE[i].state === project.teamState) {
        return TEAM_STATE[i].stateName;
      }
    }
  };
  const showState = () => {
    if (project.teamState === 'RECRUIT') {
      return <Chip color="info" label={getStateName()} />;
    }
    if (project.teamState === 'COMPLETED') {
      return <Chip color="primary" label={getStateName()} />;
    }
    return <Chip color="error" label={getStateName()} />;
  };

  // PAGE
  if (!project.teamTech) return <MyProgress />;
  return (
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
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={1.5}
            sx={{ alignItems: 'center', width: '80%' }}
          >
            <Typography
              variant="h4"
              color="primary"
              noWrap
              to={`${project.teamSeq}`}
              component={RouterLink}
              style={{ textDecoration: 'none' }}
              sx={{ width: '35%', textOverflow: 'ellipsis' }}
            >
              {project.teamName}
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
            <Typography
              color="text.secondary"
              variant="subtitle1"
              noWrap
              sx={{ width: '40%', textOverflow: 'ellipsis' }}
            >
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
  );
}
