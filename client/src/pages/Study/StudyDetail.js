import React, { useState, useEffect } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import axios from 'axios';
import { Button } from '@mui/material';

export default function StudyDetail() {
  const teamSeq = useParams();
  const [studyDetail, setStudyDetail] = useState([]);
  const [loading, setLoading] = useState(false);

  const getStudyDetail = async () => {
    const studyDetailUrl = `/v1/study/${teamSeq.id}`;
    setLoading(true);
    await axios
      .get(studyDetailUrl)
      .then((response) => {
        if (response.data.message) {
          console.log(response, response.data.message);
        } else {
          console.log(response, '스터디 상세 조회 성공');
        }
        const studyData = response.data.data;
        return studyData;
      })
      .then((data) => {
        setStudyDetail(data);
      })
      .catch((error) => {
        console.log(error, '스터디 상세 조회 실패');
      });
    setLoading(false);
  };

  useEffect(() => {
    getStudyDetail();
  }, []);

  if (loading || studyDetail.length === 0) return null;
  console.log(studyDetail);
  const studyTech = studyDetail.teamTech.map((tech, idx) => (
    <li key={idx}>
      {tech.techName} {tech.techImage}
    </li>
  ));

  return (
    <div>
      <h1>Study Detail of {studyDetail.teamSeq}</h1>
      <ul>
        <li>스터디 이름: {studyDetail.teamName}</li>
        <li>스터디 상태: {studyDetail.teamState}</li>
        <li>스터디 생성자: {studyDetail.teamManagerSeq}</li>
        <li>스터디 설명: {studyDetail.teamDesc}</li>
        <ul>
          스터디 기술 스택
          {studyTech}
        </ul>
        <li>
          인원 현황: {studyDetail.teamMemberCnt}/{studyDetail.teamRecruitCnt}
        </li>
      </ul>
      <Button variant="contained" component={RouterLink} to="update">
        스터디 수정
      </Button>
      <Button variant="contained" component={RouterLink} to="delete">
        스터디 삭제
      </Button>
    </div>
  );
}
