import React, { useState, useEffect } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import jwtdecode from 'jwt-decode';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
//
import { getProjectDetail } from '../../_actions/project_actions';
import { changeTeamState } from '../../_actions/team_actions';
import { checkTeamMember } from '../../_actions/user_actions';

export default function ProjectDetail() {
  // STATE
  const teamSeq = useParams().id;
  const [projectDetail, setProjectDetail] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userSeq] = useState(jwtdecode(localStorage.getItem('user')).userSeq);
  const [alignment, setAlignment] = useState();
  const [belonged, setBelonged] = useState(false);
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
        console.log('프로젝트 상세 조회 성공');
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
  const handleAlignment = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
      const teamSeqNum = teamSeq * 1;
      const dataToSubmit = {
        teamSeq: teamSeqNum,
        teamState: newAlignment
      };
      const changePjtState = async () => {
        await dispatch(changeTeamState(dataToSubmit))
          .then(() => {
            console.log('프로젝트 상태 수정 성공');
            getPjtDetail();
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
  }, []);

  // CONDITION
  let joinBtn;
  if (belonged || alignment !== 'RECRUIT') {
    joinBtn = null;
  } else {
    joinBtn = <RouterLink to="join">프로젝트 신청</RouterLink>;
  }
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
        {joinBtn}
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
