import React, { useState, useEffect } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import jwtdecode from 'jwt-decode';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
//
import { getProjectDetail, changeProjectState } from '../../_actions/project_actions';

export default function ProjectDetail() {
  // STATE
  const teamSeq = useParams().id;
  const [projectDetail, setProjectDetail] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userSeq] = useState(jwtdecode(localStorage.getItem('user')).userSeq);
  const [alignment, setAlignment] = React.useState('left');
  const TEAM_STATE = [
    { state: 'RECRUIT', stateName: '진행 중' },
    { state: 'COMPLETED', stateName: '모집 완료됨' },
    { state: 'FINISH', stateName: '종료됨' }
  ];

  // AXIOS
  const dispatch = useDispatch();
  const getPjtDetail = async () => {
    setLoading(true);
    await dispatch(getProjectDetail(teamSeq))
      .then((response) => {
        console.log('프로젝트 상세 조회 성공');
        const projectData = response.payload.data.data;
        console.log(response.payload.data.data);
        setProjectDetail(projectData);
      })
      .catch((error) => {
        console.log(error, '프로젝트 상세 조회 실패');
      });
    setLoading(false);
  };

  // HANDLE
  const handleAlignment = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
      const teamSeqNum = teamSeq * 1;
      const dataToSubmit = {
        teamSeq: teamSeqNum,
        teamState: alignment
      };
      const changePjtState = async () => {
        await dispatch(changeProjectState(dataToSubmit))
          .then(() => {
            console.log('프로젝트 상태 수정 성공');
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // CONDITION
  if (loading || projectDetail.length === 0) return null;

  // PAGE
  if (projectDetail.teamManagerSeq === userSeq) {
    return (
      <div>
        <h1>Project Detail of {projectDetail.teamSeq}</h1>
        <ToggleButtonGroup value={alignment} exclusive onChange={handleAlignment}>
          {TEAM_STATE.map((state, idx) => (
            <ToggleButton value={state.state} key={idx}>
              {state.stateName}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
        <ul>
          <li>teamCreateTime: {projectDetail.teamCreateTime}</li>
          <li>teamDesc: {projectDetail.teamDesc}</li>
          <li>teamEndTime: {projectDetail.teamEndTime}</li>
          <li>teamManagerName: {projectDetail.teamManagerName}</li>
          <li>teamManagerSeq: {projectDetail.teamManagerSeq}</li>
          <li>teamMemberCnt: {projectDetail.teamMemberCnt}</li>
          <li>teamPosition: {JSON.stringify(projectDetail.teamPosition.map((pos) => pos))}</li>
          <li>teamRecruitCnt: {projectDetail.teamRecruitCnt}</li>
          <li>teamStartTime: {projectDetail.teamStartTime}</li>
          <li>teamState: {projectDetail.teamState}</li>
          <li>teamTech: {JSON.stringify(projectDetail.teamTech.map((pos) => pos))}</li>
          <li>teamType: {projectDetail.teamType}</li>
          <li>teamUpdateTime: {projectDetail.teamUpdateTime}</li>
        </ul>
        <RouterLink to="update">프로젝트 수정</RouterLink>
        <RouterLink to="delete">프로젝트 삭제</RouterLink>
        <RouterLink to="join">프로젝트 신청</RouterLink>
        <RouterLink to="response">프로젝트 신청 목록</RouterLink>
      </div>
    );
  }

  return (
    <div>
      <h1>Project Detail of {projectDetail.teamSeq}</h1>
      <ul>
        <li>teamCreateTime: {projectDetail.teamCreateTime}</li>
        <li>teamDesc: {projectDetail.teamDesc}</li>
        <li>teamEndTime: {projectDetail.teamEndTime}</li>
        <li>teamManagerName: {projectDetail.teamManagerName}</li>
        <li>teamManagerSeq: {projectDetail.teamManagerSeq}</li>
        <li>teamMemberCnt: {projectDetail.teamMemberCnt}</li>
        <li>teamPosition: {JSON.stringify(projectDetail.teamPosition.map((pos) => pos))}</li>
        <li>teamRecruitCnt: {projectDetail.teamRecruitCnt}</li>
        <li>teamStartTime: {projectDetail.teamStartTime}</li>
        <li>teamState: {projectDetail.teamState}</li>
        <li>teamTech: {JSON.stringify(projectDetail.teamTech.map((pos) => pos))}</li>
        <li>teamType: {projectDetail.teamType}</li>
        <li>teamUpdateTime: {projectDetail.teamUpdateTime}</li>
      </ul>
      <RouterLink to="join">프로젝트 신청</RouterLink>
    </div>
  );
}
