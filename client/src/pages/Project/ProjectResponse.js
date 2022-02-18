import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
//
import { Button, Typography, Container, Divider, Stack } from '@mui/material';
//
import MyProgress from '../../components/_dashboard/MyProgress';
import { ProjectResponseForm } from '../../components/_dashboard/projects';
import { getProjectResponse } from '../../_actions/project_actions';

export default function ProjectResponse() {
  // STATE
  const teamSeq = useParams().id;
  const navigate = useNavigate();
  const [projectRequest, setprojectRequest] = useState([]);
  const [loading, setLoading] = useState(false);

  // AXIOS
  const dispatch = useDispatch();
  // 해당 프로젝트 정보 불러오기
  const getPjtResponse = async () => {
    setLoading(true);
    await dispatch(getProjectResponse(teamSeq))
      .then((response) => {
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

  // HANDLE
  const goBack = () => {
    navigate(`/project/${teamSeq}`);
  };

  // LOADING
  if (loading) return <MyProgress />;

  // PAGE
  if (projectRequest.length === 0)
    return (
      <Container sx={{ mt: 10 }}>
        <Stack direction="row" justifyContent="space-between">
          <h1>프로젝트 신청 목록</h1>
          <Button variant="outlined" sx={{ width: 100 }} onClick={goBack}>
            돌아가기
          </Button>
        </Stack>
        <Divider sx={{ mt: 2, mb: 5 }} />
        <Typography variant="h4" color="primary" sx={{ ml: 45, mt: 30 }}>
          해당 프로젝트에 남아있는 신청이 없습니다.
        </Typography>
      </Container>
    );
  return (
    <Container sx={{ mt: 10 }}>
      <Stack direction="row" justifyContent="space-between">
        <h1>프로젝트 신청 목록</h1>
        <Button variant="outlined" sx={{ width: 100 }} onClick={goBack}>
          돌아가기
        </Button>
      </Stack>
      <Divider sx={{ mt: 2, mb: 5 }} />
      <Stack direction="column" spacing={3}>
        {projectRequest.map((request) => (
          <div key={request.userSeq}>
            <ProjectResponseForm volunteer={request} getPjtResponse={getPjtResponse} />
          </div>
        ))}
      </Stack>
    </Container>
  );
}
