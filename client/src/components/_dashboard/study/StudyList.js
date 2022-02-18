import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
//
import { Container, Typography } from '@mui/material';
//
import { StudyListCard } from '.';
import { getStudyList } from '../../../_actions/study_actions';
import MyProgress from '../MyProgress';

export default function StudyList() {
  // STATE
  const [studyList, setStudyList] = useState([]);
  const [loading, setLoading] = useState(false);

  // AXIOS
  const dispatch = useDispatch();
  const getStyList = async () => {
    setLoading(true);
    await dispatch(getStudyList())
      .then((response) => {
        if (response.payload.data.data.length > 0) {
          const styData = response.payload.data.data;
          styData.sort((a, b) => parseFloat(b.teamSeq) - parseFloat(a.teamSeq));
          setStudyList(styData);
        } else {
          setStudyList(false);
        }
      })
      .catch((error) => {
        setTimeout(() => {}, 3000);
        console.log(error, '스터디 받아오기 실패');
      });
    setLoading(false);
  };

  // RENDER
  useEffect(() => {
    getStyList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // CONDITIONAL PAGE
  const showEachStudy = () => {
    if (loading) {
      return <MyProgress />;
    }
    if (!studyList) {
      return (
        <Typography variant="h3" sx={{ mt: '10%', ml: '30%' }}>
          <span style={{ color: '#00AB55' }}>스터디</span>가 없습니다.
        </Typography>
      );
    }
    return studyList.map((sty) => <StudyListCard key={sty.teamSeq} study={sty} />);
  };
  return <Container fixed>{showEachStudy()}</Container>;
}
