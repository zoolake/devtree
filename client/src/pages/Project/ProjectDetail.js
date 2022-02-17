import React, { useState, useEffect } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import jwtdecode from 'jwt-decode';
import {
  Avatar,
  ToggleButton,
  ToggleButtonGroup,
  Button,
  Typography,
  Container,
  Stack,
  Divider,
  Grid,
  Box,
  Chip
} from '@mui/material';
//
import { getProjectDetail } from '../../_actions/project_actions';
import { changeTeamState } from '../../_actions/team_actions';
import { checkTeamMember } from '../../_actions/user_actions';
import { TechImgAvatar } from '../../utils/mockImages';

export default function ProjectDetail() {
  // STATE
  const teamSeq = useParams().id;
  const [projectDetail, setProjectDetail] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userSeq] = useState(jwtdecode(localStorage.getItem('user')).userSeq);
  const [alignment, setAlignment] = useState();
  const [belonged, setBelonged] = useState(false);
  const [isLoad, setIsLoad] = useState(false);
  const TEAM_STATE = [
    { state: 'RECRUIT', stateName: '진행 중' },
    { state: 'COMPLETED', stateName: '모집 완료됨' },
    { state: 'FINISH', stateName: '종료됨' }
  ];

  // INIT
  const dispatch = useDispatch();
  const getPjtDetail = async () => {
    setLoading(true);
    await dispatch(getProjectDetail(teamSeq))
      .then((response) => {
        const projectData = response.payload.data.data;
        setProjectDetail(projectData);
        console.log(projectData, '프로젝트 상세 조회 성공');
        return projectData.teamState;
      })
      .then((state) => {
        setAlignment(state);
      })
      .catch((error) => {
        console.log(error, '프로젝트 상세 조회 실패');
      });
    setLoading(false);
  };
  const getBelonged = async () => {
    await dispatch(checkTeamMember(teamSeq)).then((response) => {
      setBelonged(response.payload.data.data);
    });
  };

  // HANDLE
  const handleAlignment = (newAlignment) => {
    if (newAlignment.target.value !== null) {
      setAlignment(newAlignment.target.value);
      const teamSeqNum = teamSeq * 1;
      const dataToSubmit = {
        teamSeq: teamSeqNum,
        teamState: newAlignment.target.value
      };
      const changePjtState = async () => {
        await dispatch(changeTeamState(dataToSubmit))
          .then(() => {
            console.log('프로젝트 상태 수정 성공');
            setIsLoad(!isLoad);
          })
          .catch((error) => {
            console.log(error, '프로젝트 상태 수정 실패');
          });
        setLoading(false);
      };
      changePjtState();
    }
  };

  // RENDER
  useEffect(() => {
    getPjtDetail();
    getBelonged();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoad]);

  // CONDITION
  let joinBtn;
  if (belonged) {
    joinBtn = (
      <Button variant="outlined" color="primary" sx={{ fontSize: 23 }} size="large" disabled>
        소속됨
      </Button>
    );
  } else if (alignment !== 'RECRUIT') {
    joinBtn = (
      <Button
        variant="outlined"
        color="primary"
        sx={{ fontSize: 23 }}
        size="large"
        to="join"
        component={RouterLink}
        disabled
      >
        프로젝트 신청
      </Button>
    );
  } else {
    joinBtn = (
      <Button
        variant="outlined"
        color="primary"
        sx={{ fontSize: 23 }}
        size="large"
        to="join"
        component={RouterLink}
      >
        프로젝트 신청
      </Button>
    );
  }
  if (loading || projectDetail.length === 0) return null;

  // SHOW
  const showTechs = projectDetail.teamTech.map((tech) => (
    <Grid item xs={3} key={tech.techSeq}>
      <Avatar
        variant="caption"
        sx={{ border: '1px solid #efefef', width: '50px', height: '50px' }}
        src={TechImgAvatar(tech.techSeq)}
      />
    </Grid>
  ));
  // eslint-disable-next-line consistent-return
  const getStateName = () => {
    for (let i = 0; i < TEAM_STATE.length; i += 1) {
      if (TEAM_STATE[i].state === projectDetail.teamState) {
        return TEAM_STATE[i].stateName;
      }
    }
  };
  const showState = () => {
    if (projectDetail.teamState === 'RECRUIT') {
      return <Chip color="info" label={getStateName()} />;
    }
    if (projectDetail.teamState === 'COMPLETED') {
      return <Chip color="primary" label={getStateName()} />;
    }
    return <Chip color="error" label={getStateName()} />;
  };
  const showDate = (dateData) => {
    if (dateData) {
      const [left, right] = dateData.slice(0, 17).split(' ');
      const [year, month, day] = left.split('-');
      const [hour, minute] = right.split(':');
      return (
        <div>
          {year}년 {month}월 {day}일 {hour}시 {minute}분
        </div>
      );
    }
    return <div> 미정 </div>;
  };
  // PAGE
  if (projectDetail.teamManagerSeq === userSeq) {
    return (
      <Container sx={{ mt: 10 }}>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          justifyContent="space-between"
          alignItems="flex-end"
          sx={{ alignItems: { xs: 'center', md: 'end' } }}
          spacing={{ xs: 2, md: 3 }}
        >
          <Stack
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-end"
            spacing={{ xs: 2, md: 5 }}
          >
            <Typography variant="h3" sx={{ maxWidth: '55%' }}>
              {projectDetail.teamName}
            </Typography>
            <ToggleButtonGroup
              value={alignment}
              exclusive
              onChange={handleAlignment}
              size="small"
              sx={{ m: 0, minWidth: 225, maxHeight: 50 }}
            >
              {TEAM_STATE.map((state, idx) => (
                <ToggleButton
                  value={state.state}
                  color="primary"
                  key={idx}
                  sx={{ m: 0, p: 1.5, fontSize: 13, fontWeight: 'light' }}
                >
                  {state.stateName}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </Stack>
          <Stack
            direction="row"
            justifyContent={{ xs: 'center', md: 'flex-end' }}
            spacing={1}
            sx={{ minWidth: '35%' }}
          >
            <Button color="primary" to="response" component={RouterLink}>
              프로젝트 신청 목록
            </Button>
            <Button color="primary" to="update" component={RouterLink}>
              프로젝트 수정
            </Button>
            <Button color="primary" to="delete" component={RouterLink}>
              프로젝트 삭제
            </Button>
          </Stack>
          <Typography variant="h6" sx={{ minWidth: '6%' }}>
            {projectDetail.teamManagerName}
          </Typography>
        </Stack>
        <Divider sx={{ mt: 2, mb: 5 }} />
        <Grid container spacing={2}>
          <Grid item xs={7.4}>
            <Box sx={{ height: 300, p: 4, border: '2px solid white', fontSize: 23 }}>
              <Typography variant="inherit">{projectDetail.teamDesc}</Typography>
            </Box>
          </Grid>
          <Divider orientation="vertical" flexItem />
          <Grid item xs={4.5}>
            <Stack
              direction="column"
              sx={{ alignItems: { xs: 'center', md: 'end' }, fontSize: 22 }}
              spacing={4}
            >
              <Grid direction="row-reverse" container spacing={1}>
                {showTechs}
              </Grid>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="start"
                spacing={4}
                sx={{ width: '100%' }}
              >
                <div style={{ fontWeight: 'bold' }}>인원 </div>
                <Stack
                  direction="column"
                  alignItems="flex-end"
                  justifyContent="center"
                  spacing={1.5}
                  style={{ fontSize: 18 }}
                >
                  {projectDetail.teamPosition.map((pos, idx) => (
                    <div key={idx}>
                      {pos.detailPositionName}{' '}
                      <span style={{ color: '#00AB55' }}>
                        {pos.positionMemberCnt}/{pos.positionRecruitCnt}
                      </span>
                    </div>
                  ))}
                </Stack>
              </Stack>
              <Stack
                direction="row"
                justifyContent="space-between"
                spacing={4}
                sx={{ width: '100%' }}
              >
                <div style={{ fontWeight: 'bold' }}>상태 </div>
                <div>{showState()}</div>
              </Stack>
              <Stack
                direction="row"
                justifyContent="space-between"
                spacing={4}
                sx={{ width: '100%', alignItems: 'center' }}
              >
                <div style={{ fontWeight: 'bold' }}>생성 날짜 </div>
                <div style={{ fontSize: 15 }}>{showDate(projectDetail.teamCreateTime)}</div>
              </Stack>
              <Stack
                direction="row"
                justifyContent="space-between"
                spacing={4}
                sx={{ width: '100%', alignItems: 'center' }}
              >
                <div style={{ fontWeight: 'bold' }}>시작 날짜 </div>
                <div style={{ fontSize: 15 }}>{showDate(projectDetail.teamStartTime)}</div>
              </Stack>
              <Stack
                direction="row"
                justifyContent="space-between"
                spacing={4}
                sx={{ width: '100%', alignItems: 'center' }}
              >
                <div style={{ fontWeight: 'bold' }}>종료 날짜 </div>
                <div style={{ fontSize: 15 }}>{showDate(projectDetail.teamEndTime)}</div>
              </Stack>
              {joinBtn}
            </Stack>
          </Grid>
        </Grid>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 10 }}>
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        justifyContent="space-between"
        alignItems="flex-end"
        sx={{ alignItems: { xs: 'center', md: 'end' } }}
        spacing={{ xs: 2, md: 5 }}
      >
        <Stack
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-end"
          spacing={{ xs: 2, md: 5 }}
        >
          <Typography variant="h3">{projectDetail.teamName}</Typography>
        </Stack>
        <Typography variant="h6">{projectDetail.teamManagerName}</Typography>
      </Stack>
      <Divider sx={{ mt: 2, mb: 5 }} />
      <Grid container spacing={2}>
        <Grid item xs={7.4}>
          <Box sx={{ height: 300, p: 4, border: '2px solid white', fontSize: 23 }}>
            <Typography variant="inherit">{projectDetail.teamDesc}</Typography>
          </Box>
        </Grid>
        <Divider orientation="vertical" flexItem />
        <Grid item xs={4.5}>
          <Stack
            direction="column"
            sx={{ alignItems: { xs: 'center', md: 'end' }, fontSize: 22 }}
            spacing={4}
          >
            <Grid direction="row-reverse" container spacing={1}>
              {showTechs}
            </Grid>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
              sx={{ width: '100%' }}
            >
              <div style={{ fontWeight: 'bold' }}>인원 </div>
              <div>
                {projectDetail.teamPosition.map((pos, idx) => (
                  <div key={idx}>
                    {pos.detailPositionName}{' '}
                    <span style={{ color: '#00AB55' }}>
                      {pos.positionMemberCnt}/{pos.positionRecruitCnt}
                    </span>
                  </div>
                ))}
              </div>
            </Stack>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
              sx={{ width: '100%' }}
            >
              <div style={{ fontWeight: 'bold' }}>상태 </div>
              <div>{showState()}</div>
            </Stack>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
              sx={{ width: '100%', alignItems: 'center' }}
            >
              <div style={{ fontWeight: 'bold' }}>생성 날짜 </div>
              <div style={{ fontSize: 15 }}>{showDate(projectDetail.teamCreateTime)}</div>
            </Stack>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
              sx={{ width: '100%', alignItems: 'center' }}
            >
              <div style={{ fontWeight: 'bold' }}>시작 날짜 </div>
              <div style={{ fontSize: 15 }}>{showDate(projectDetail.teamStartTime)}</div>
            </Stack>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
              sx={{ width: '100%', alignItems: 'center' }}
            >
              <div style={{ fontWeight: 'bold' }}>종료 날짜 </div>
              <div style={{ fontSize: 15 }}>{showDate(projectDetail.teamEndTime)}</div>
            </Stack>
            {joinBtn}
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}
