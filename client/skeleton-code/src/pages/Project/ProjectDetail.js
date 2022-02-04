import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function ProjectDetail() {
  const projectId = useParams().id;
  const [project, setProject] = useState({});
  const getProject = async () => {
    // 임시 목업
    setProject(projectId);
    console.log(project);
    // api 받아오기
    /*
    const url = `http://localhost:3000/api/v1/project/${projectId}`;
    await axios
      .get(url)
      .then((response) => {
        console.log(response, '성공');
        setProject(response.data);
        console.log(project);
      })
      .catch((error) => {
        console.log('실패');
      });
    */
  };
  useEffect(() => {
    getProject();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <h1>Project Detail of {projectId}</h1>
      {/* <ul>
        <li>프로젝트 이름: {project.team_name}</li>
        <li>프로젝트 상태: {project.team_state}</li>
        <li>프로젝트 생성자: {project.team_manager_seq}</li>
        <li>프로젝트 설명: {project.team_desc}</li>
        <li>프로젝트 포지션: {project.team_position}</li>
      </ul> */}
    </div>
  );
}
