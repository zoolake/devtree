import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
//
import { Container } from '@mui/material';
//
import { StudyUpdateForm } from '../../components/_dashboard/study';
import { getStudyDetail } from '../../_actions/study_actions';

export default function StudyUpdate() {
  // STATE
  const teamSeq = useParams().id;
  const [studyDetail, setStudyDetail] = useState([]);
  const [loading, setLoading] = useState(false);

  // AXIOS
  const dispatch = useDispatch();
  // 해당 스터디 정보 불러오기
  const makeStudyDetail = async () => {
    setLoading(true);
    await dispatch(getStudyDetail(teamSeq))
      .then((response) => {
        console.log('스터디 상세 정보 불러오기 성공');
        setStudyDetail(response.payload.data.data);
      })
      .catch((error) => {
        console.log(error, '스터디 상세 정보 불러오기 실패');
      });
    setLoading(false);
  };

  // RENDER
  useEffect(() => {
    makeStudyDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // PAGE
  if (loading || studyDetail.length === 0) return <div>로딩 중</div>;
  return (
    <Container sx={{ mt: 10 }}>
      <h1>스터디 수정</h1>
      <StudyUpdateForm studyDetail={studyDetail} />
    </Container>
  );
}
