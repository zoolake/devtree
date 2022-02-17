import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
//
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Button, Container, Stack, Typography, Divider } from '@mui/material';
//
import { ProjectList } from '../../components/_dashboard/projects';
import MyProgress from '../../components/_dashboard/MyProgress';
import { getProjectList } from '../../_actions/project_actions';

export default function ProjectMain() {
  // STATE
  const [projectList, setProjectList] = useState([]);
  const [loading, setLoading] = useState(false);

  // INIT
  const dispatch = useDispatch();
  const getPjtList = async () => {
    setLoading(true);
    await dispatch(getProjectList())
      .then((response) => {
        const pjtData = response.payload.data.data;
        if (pjtData.length > 0) {
          setProjectList(pjtData);
          console.log('프로젝트 받아오기 성공');
        } else {
          console.log('받아올 프로젝트 없음');
        }
      })
      .catch((error) => {
        console.log(error, '프로젝트 받아오기 실패');
      });
    setLoading(false);
  };

  // RENDER
  useEffect(() => {
    getPjtList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // CONDITION
  if (loading) {
    return <MyProgress />;
  }

  // PAGE
  return (
    <Container sx={{ mt: 10 }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h3" gutterBottom>
          프로젝트
        </Typography>
        <Button
          variant="contained"
          component={RouterLink}
          to="create"
          startIcon={<Icon icon={plusFill} />}
        >
          프로젝트 생성
        </Button>
      </Stack>
      <Divider sx={{ mt: 2, mb: 5 }} />
      <Container>
        <ProjectList pjtList={projectList} />
      </Container>
    </Container>
  );
}
