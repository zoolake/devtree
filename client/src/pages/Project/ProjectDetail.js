import React, { useState, useEffect } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import { getProjectDetail } from '../../_actions/project_actions';

export default function ProjectDetail() {
  // state
  const teamSeq = useParams().id;
  const [projectDetail, setProjectDetail] = useState([]);
  const [loading, setLoading] = useState(false);

  // axios
  const dispatch = useDispatch();
  const getPjtDetail = async () => {
    setLoading(true);
    await dispatch(getProjectDetail(teamSeq))
      .then((response) => {
        console.log('프로젝트 상세 조회 성공');
        const projectData = response.payload.data.data;
        setProjectDetail(projectData);
      })
      .catch((error) => {
        console.log(error, '프로젝트 상세 조회 실패');
      });
    setLoading(false);
  };

  // render
  useEffect(() => {
    getPjtDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // condition
  if (loading || projectDetail.length === 0) return null;

  // page
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
        <li>프로젝트 이름: {projectDetail.teamName}</li>
        <li>프로젝트 상태: {projectDetail.teamState}</li>
        <li>프로젝트 생성자: {projectDetail.teamManagerSeq}</li>
        <li>프로젝트 설명: {projectDetail.teamDesc}</li>
        <ul>
          프로젝트 기술 스택
          {pjtTech}
        </ul>
        <li>
          인원 현황: {projectDetail.teamMemberCnt}/{projectDetail.teamRecruitCnt}
        </li>
        <ul>
          프로젝트 포지션
          {pjtPosition}
        </ul>
      </ul>
      <Button variant="contained" component={RouterLink} to="update">
        프로젝트 수정
      </Button>
      <Button variant="contained" component={RouterLink} to="delete">
        프로젝트 삭제
      </Button>
      <Button variant="contained" to="join">
        프로젝트 신청
      </Button>
    </div>
  );
}
