import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
//
// import { StudyJoinForm } from '../../components/_dashboard/study';
import { getStudyDetail } from '../../_actions/study_actions';

export default function StudyJoin() {
  // state
  const teamSeq = useParams().id;
  const [studyDetail, setStudyDetail] = useState([]);
  const [loading, setLoading] = useState(false);

  // axios
  const dispatch = useDispatch();
  // 해당 스터디 정보 불러오기
  const getStyDetail = async () => {
    setLoading(true);
    await dispatch(getStudyDetail(teamSeq))
      .then((response) => {
        console.log(response.payload.data.data);
        setStudyDetail(response.payload.data.data);
      })
      .catch((error) => {
        console.log(error, '스터디 상세 정보 불러오기 실패');
      });
    setLoading(false);
  };

  // RENDER
  useEffect(() => {
    getStyDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // PAGE
  if (loading || studyDetail.length === 0) return <div>로딩 중</div>;
  return (
    <div>
      <h1>스터디 신청</h1>
      {/* <StudyJoinForm studyPosition={studyDetail.teamPosition} /> */}
    </div>
  );
}
