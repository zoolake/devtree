import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
//
import { Container } from '@mui/material';
//
import MyProgress from '../../components/_dashboard/MyProgress';
import { ProjectUpdateForm } from '../../components/_dashboard/projects';
import { getProjectDetail } from '../../_actions/project_actions';

export default function ProjectUpdate() {
  // STATE
  const teamSeq = useParams().id;
  const [projectDetail, setProjectDetail] = useState([]);
  const [loading, setLoading] = useState(false);

  // AXIOS
  const dispatch = useDispatch();
  // 해당 프로젝트 정보 불러오기
  const getPjtDetail = async () => {
    setLoading(true);
    await dispatch(getProjectDetail(teamSeq))
      .then((response) => {
        console.log('프로젝트 상세 정보 불러오기 성공');
        setProjectDetail(response.payload.data.data);
      })
      .catch((error) => {
        console.log(error, '프로젝트 상세 정보 불러오기 실패');
      });
    setLoading(false);
  };

  // RENDER
  useEffect(() => {
    getPjtDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // PAGE
  if (loading || projectDetail.length === 0) return <MyProgress />;
  return (
    <Container sx={{ mt: 10 }}>
      <h1>프로젝트 수정</h1>
      <ProjectUpdateForm projectDetail={projectDetail} />
    </Container>
  );
}
