import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ProjectUpdateForm } from '../../components/_dashboard/projects';
import { getProjectDetail } from '../../_actions/project_actions';

export default function ProjectUpdate() {
  // state
  const teamSeq = useParams().id;
  const [projectDetail, setProjectDetail] = useState([]);
  const [loading, setLoading] = useState(false);

  // axios
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

  // render
  useEffect(() => {
    getPjtDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // page
  if (loading || projectDetail.length === 0) return <div>로딩 중</div>;
  return (
    <div>
      <h1>Project Update</h1>
      <ProjectUpdateForm projectDetail={projectDetail} />
    </div>
  );
}
