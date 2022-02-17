import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
//
import { Card, Container, Typography, CardContent } from '@mui/material';
//
import { getProject } from '../../_actions/user_actions';
import { ProjectList } from '../_dashboard/projects';
import MyProgress from '../_dashboard/MyProgress';

export default function UserProjectList() {
  // STATE
  const [myProjectList, setMyProjectList] = useState([]);
  const [loading, setLoading] = useState(false);

  // INIT
  const dispatch = useDispatch();
  const getProjectList = async () => {
    setLoading(true);
    dispatch(getProject())
      .then((response) => {
        if (response) {
          setMyProjectList(response.payload.data);
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
    getProjectList();
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
            프로젝트 내역
          </Typography>
          <ProjectList projectList={myProjectList} />
        </CardContent>
      </Card>
    </Container>
  );
}
