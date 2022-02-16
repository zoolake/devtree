import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
//
import { Button, Typography, Container, Divider } from '@mui/material';
//
import MyProgress from '../../components/_dashboard/MyProgress';
import { ProjectResponseForm } from '../../components/_dashboard/projects';
import { getProjectResponse } from '../../_actions/project_actions';

export default function ProjectResponse() {
  // STATE
  const teamSeq = useParams().id;
  const [projectRequest, setprojectRequest] = useState([]);
  const [loading, setLoading] = useState(false);

  // AXIOS
  const dispatch = useDispatch();
  // 해당 프로젝트 정보 불러오기
  const getPjtResponse = async () => {
    setLoading(true);
    await dispatch(getProjectResponse(teamSeq))
      .then((response) => {
        console.log(response.payload.data.data, '프로젝트 요청 목록 불러오기 성공');
        setprojectRequest(response.payload.data.data);
      })
      .catch((error) => {
        console.log(error, '프로젝트 요청 목록 불러오기 실패');
      });
    setLoading(false);
  };

  // RENDER
  useEffect(() => {
    getPjtResponse();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // LOADING
  if (loading) return <div>로딩 중</div>;

  // PAGE
  if (projectRequest.length === 0) return <div>요청이 없음</div>;
  return (
    <div>
      <h1>프로젝트 신청 목록</h1>
      {projectRequest.map((request) => (
        <div key={request.userSeq}>
          <ProjectResponseForm volunteer={request} />
        </div>
      ))}
    </div>
  );
}
