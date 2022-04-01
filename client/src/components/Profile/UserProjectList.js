import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
//
import { Card, Container, Typography, CardContent } from '@mui/material';
//
import { getProject } from '../../_actions/user_actions';
import { ProjectListCard } from '../_dashboard/projects';
import MyProgress from '../_dashboard/MyProgress';

export default function UserProjectList() {
  // STATE
  const [myProjectList, setMyProjectList] = useState([]);
  const [loading, setLoading] = useState(false);

  // INIT
  const dispatch = useDispatch();
  const getMyPjtList = async () => {
    setLoading(true);
    dispatch(getProject())
      .then((response) => {
        if (response.payload.data.length > 0) {
          setMyProjectList(response.payload.data);
        } else {
          setMyProjectList(false);
        }
      })
      .catch((err) => {
        setTimeout(() => {}, 3000);
        console.log(err, '나의 프로젝트 받아오기 실패');
      });
    setLoading(false);
  };

  // RENDER
  useEffect(() => {
    getMyPjtList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // CONDITIONAL PAGE
  const showEachPjt = () => {
    if (loading) {
      return <MyProgress />;
    }
    if (!myProjectList) {
      return (
        <Typography variant="h3" sx={{ mt: '10%', ml: '30%' }}>
          <span style={{ color: '#00AB55' }}>프로젝트</span>가 없습니다.
        </Typography>
      );
    }
    return myProjectList.map((pjt) => <ProjectListCard key={pjt.teamSeq} project={pjt} />);
  };
  return (
    <Container fixed>
      <Card sx={{ minWidth: 275, minHeight: 250 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14, mb: 5 }} color="primary" gutterBottom>
            프로젝트 내역
          </Typography>
          {showEachPjt()}
        </CardContent>
      </Card>
    </Container>
  );
}
