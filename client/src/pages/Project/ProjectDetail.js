import React, { useState, useEffect } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getProjectDetail } from '../../_actions/project_actions';

export default function ProjectDetail() {
  // STATE
  const teamSeq = useParams().id;
  const [projectDetail, setProjectDetail] = useState([]);
  const [loading, setLoading] = useState(false);

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

  // RENDER
  useEffect(() => {
    getPjtDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // CONDITION
  if (loading || projectDetail.length === 0) return null;

  // PAGE
  const pjtTech = projectDetail.teamTech.map((tech, idx) => (
    <li key={idx}>
      {tech.techName} {tech.techImage}
    </li>
  ));
  const pjtPosition = projectDetail.teamPosition.map((position, idx) => (
    <li key={idx}>
      {position.detailPositionName} {position.positionMemberCnt}/{position.positionRecruitCnt}
    </li>
  ));

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
      <RouterLink to="update">프로젝트 수정</RouterLink>
      <RouterLink to="delete">프로젝트 삭제</RouterLink>
      <RouterLink to="join">프로젝트 신청</RouterLink>
    </div>
  );
}
