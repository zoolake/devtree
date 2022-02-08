// import { Icon } from '@iconify/react';
// import plusFill from '@iconify/icons-eva/plus-fill';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container } from '@mui/material';
import { StudyListCard } from '.';

export default function StudyList() {
  // 조회 기능
  const [studyList, setStudyList] = useState([]);
  const [loading, setLoading] = useState(false);
  const getStudyList = async () => {
    const studyListUrl = '/study'; // http://127.26.1.146:8080/v1/study
    setLoading(true);
    await axios
      .get(studyListUrl)
      .then((response) => {
        if (response.data.data.length > 0) {
          const pList = response.data.data;
          setStudyList(pList);
          console.log(studyList, response.data.message);
        } else {
          console.log('생성할 스터디 없음');
        }
      })
      .catch((error) => {
        console.log(error, '스터디 조회 실패');
      });
    setLoading(false);
  };

  useEffect(() => {
    getStudyList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading || studyList.length === 0) {
    return <div>'생성된 스터디가 없습니다.'</div>;
  }

  return (
    <Container>
      {studyList.map((study, index) => (
        <StudyListCard key={study.teamSeq} study={study} index={index} />
      ))}
    </Container>
  );
}
