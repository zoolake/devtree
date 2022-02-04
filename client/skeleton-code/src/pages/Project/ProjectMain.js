import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';
import {
  // Grid,
  Button,
  Container,
  Stack,
  Typography
} from '@mui/material';
// components
import Page from '../../components/Page';
import {
  ProjectListCard,
  ProjectsPostsSort,
  ProjectSearch
} from '../../components/_dashboard/projects';
//
import PROJECTS from '../../_mocks_/project';

// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Oldest' }
];

// ----------------------------------------------------------------------

export default function ProjectMain() {
  // 조회 기능
  const [projectList, setProjectList] = useState([]);
  const getProjectList = async () => {
    // 임시 목업 받아오기
    const pList = await setProjectList(PROJECTS);
    // api 받아오기
    /*
    const url = 'http://localhost:3000/api/v1/project';
    await axios
      .get(url)
      .then((response) => {
        console.log(response, '성공');
        const pList = response.data;
        setProjectList(pList);
        console.log(projectList);
      })
      .catch((error) => {
        console.log('실패');
      });
    */
  };
  useEffect(() => {
    getProjectList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Page title="Dashboard: Projects | Minimal-UI">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Projects {/* 제목 */}
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="#"
            startIcon={<Icon icon={plusFill} />}
          >
            프로젝트 생성 {/* 버튼 */}
          </Button>
        </Stack>

        <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
          <ProjectSearch projects={PROJECTS} />
          <ProjectsPostsSort options={SORT_OPTIONS} />
        </Stack>

        <Container>
          {PROJECTS.map((project, index) => (
            <ProjectListCard key={project.id} project={project} index={index} />
          ))}
        </Container>
      </Container>
    </Page>
  );
}
