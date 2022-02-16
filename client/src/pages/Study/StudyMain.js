import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { Button, Container, Stack, Typography } from '@mui/material';
import Page from '../../components/Page';
import { StudyList } from '../../components/_dashboard/study';
import { getStudyList } from '../../_actions/study_actions';

export default function StudyMain() {
  // state
  const [studyList, setStudyList] = useState([]);
  const [loading, setLoading] = useState(false);

  // axios
  const dispatch = useDispatch();
  const getPjtList = async () => {
    setLoading(true);
    await dispatch(getStudyList())
      .then((response) => {
        const studyData = response.payload.data.data;
        if (studyData.length > 0) {
          setStudyList(studyData);
          console.log('스터디 받아오기 성공');
        } else {
          console.log('받아올 스터디 없음');
        }
      })
      .catch((error) => {
        console.log(error, '스터디 받아오기 실패');
      });
    setLoading(false);
  };

  // render
  useEffect(() => {
    getPjtList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // condition
  if (loading) {
    return <div>'로딩 중'</div>;
  }

  // page
  return (
    <Page>
      <Container sx={{ mt: 10 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={10}>
          <Typography variant="h3" gutterBottom>
            스터디
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="create"
            startIcon={<Icon icon={plusFill} />}
          >
            스터디 생성
          </Button>
        </Stack>
        <Container>
          <StudyList studyList={studyList} />
        </Container>
      </Container>
    </Page>
  );
}
