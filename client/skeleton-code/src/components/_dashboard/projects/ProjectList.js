import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  // Grid,
  Container
} from '@mui/material';
// components
import Page from '../../Page';
import { ProjectListCard } from '.';
//
import PROJECTS from '../../../_mocks_/project';

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
  const getProjectList = async () => {
    // 임시 목업 받아오기
    // const pList = await setProjectList(PROJECTS);
    // api 받아오기
    const url = '/project';
    await axios
      .get(url)
      .then((response) => {
        if (response.data.data.length > 0) {
          const pList = [response.data.data];
          setProjectList(pList);
          console.log(projectList, '프로젝트 리스트 조회 성공');
        }
      })
      .catch((error) => {
        console.log(error, '프로젝트 조회 실패');
      });
  };
  useEffect(() => {
    getProjectList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      {projectList.length > 0
        ? projectList.map((project, index) => (
            <ProjectListCard key={project.id} project={project} index={index} />
          ))
        : '생성된 프로젝트가 없습니다.'}
    </Container>
  );
}
