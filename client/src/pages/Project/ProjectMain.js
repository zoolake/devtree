import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { Button, Container, Stack, Typography } from '@mui/material';
import Page from '../../components/Page';
import {
  ProjectsPostsSort,
  ProjectSearch,
  ProjectListCard
} from '../../components/_dashboard/projects';
import { getProjectList } from '../../_actions/project_actions';

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Oldest' }
];

export default function ProjectMain() {
  // state
  const [projectList, setProjectList] = useState(['hi']);
  const [loading, setLoading] = useState(false);
  const [filterKeyword, setFilterKeyword] = useState(null);

  // axios
  const dispatch = useDispatch();
  const getPjtList = async () => {
    setLoading(true);
    await dispatch(getProjectList())
      .then((response) => {
        const pjtData = response.payload.data.data;
        if (pjtData.length > 0) {
          setProjectList(pjtData);
          console.log('프로젝트 생성 성공');
        } else {
          console.log('생성할 프로젝트 없음');
        }
      })
      .catch((error) => {
        console.log(error, '프로젝트 조회 실패');
      });
    setLoading(false);
  };

  // render
  useEffect(() => {
    getPjtList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // condition
  if (projectList.length === 0) {
    return <div>'생성된 프로젝트가 없습니다.'</div>;
  }
  if (loading) {
    return <div>'로딩 중'</div>;
  }

  // page
  return (
    <Page title="Dashboard: Projects | Minimal-UI">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Project
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

        <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
          <ProjectSearch pjtList={projectList} setFilterKeyword={setFilterKeyword} />
          <ProjectsPostsSort options={SORT_OPTIONS} />
        </Stack>

        <Container>
          {projectList.map((pjt) => (
            <ProjectListCard key={pjt.teamSeq} project={pjt} filterKeyword={filterKeyword} />
          ))}
        </Container>
      </Container>
    </Page>
  );
}
