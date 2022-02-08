// import { Icon } from '@iconify/react';
// import plusFill from '@iconify/icons-eva/plus-fill';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  // Grid,
  Container
} from '@mui/material';
// components
// import Page from '../../Page';
import { ProjectListCard } from '.';
// import PROJECTS from '../../../_mocks_/project';

// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Oldest' }
];

// ----------------------------------------------------------------------

export default function ProjectList() {
  // 조회 기능
  const [projectList, setProjectList] = useState([]);
  const [loading, setLoading] = useState(false);
  const getProjectList = async () => {
    const projectListUrl = '/project'; // http://127.26.1.146:8080/v1/project
    setLoading(true);
    await axios
      .get(projectListUrl)
      .then((response) => {
        if (response.data.data.length > 0) {
          const pList = response.data.data;
          setProjectList(pList);
          console.log(projectList, response.data.message);
        } else {
          console.log('생성할 프로젝트 없음');
        }
      })
      .catch((error) => {
        console.log(error, '프로젝트 조회 실패');
      });
    setLoading(false);
  };

  useEffect(() => {
    getProjectList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading || projectList.length === 0) {
    return <div>'생성된 프로젝트가 없습니다.'</div>;
  }

  return (
    <Container>
      {projectList.map((project, index) => (
        <ProjectListCard key={project.teamSeq} project={project} index={index} />
      ))}
    </Container>
  );
}
