import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
//
import { Card, Container, Typography, CardContent } from '@mui/material';
//
import { getStudy } from '../../_actions/user_actions';
import { StudyList } from '../_dashboard/study';
import MyProgress from '../_dashboard/MyProgress';

export default function UserStudyList() {
  // STATE
  const [myStudyList, setMyStudyList] = useState([]);
  const [loading, setLoading] = useState(false);

  // INIT
  const dispatch = useDispatch();
  const getStudyList = async () => {
    setLoading(true);
    dispatch(getStudy())
      .then((response) => {
        if (response) {
          setMyStudyList(response.payload.data);
        }
      })
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        setTimeout(() => {}, 3000);
      });
  };

  // RENDER
  useEffect(() => {
    getStudyList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // CONDITIONAL
  if (loading) return <MyProgress />;

  // PAGE
  return (
    <Container>
      <Card sx={{ minWidth: 275, minHeight: 250 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14, mb: 5 }} color="primary" gutterBottom>
            스터디 내역
          </Typography>
          <StudyList studyList={myStudyList} />
        </CardContent>
      </Card>
    </Container>
  );
}
