import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
//
import { Container, Typography } from '@mui/material';
//
import { getProjectList } from '../../../_actions/project_actions';
import { ProjectListCard } from '.';
import MyProgress from '../MyProgress';

export default function ProjectList() {
  // STATE
  const [pjtList, setPjtList] = useState([]);
  const [loading, setLoading] = useState(false);

  // INIT
  const dispatch = useDispatch();
  const getPjtList = async () => {
    setLoading(true);
    dispatch(getProjectList())
      .then((response) => {
        if (response.payload.data.data.length > 0) {
          const pjtData = response.payload.data.data;
          pjtData.sort((a, b) => parseFloat(b.teamSeq) - parseFloat(a.teamSeq));
          setPjtList(pjtData);
        } else {
          setPjtList(false);
        }
      })
      .catch((err) => {
        setTimeout(() => {}, 3000);
        console.log(err, '프로젝트 리스트 받아오기 실패');
      });
    setLoading(false);
  };

  // RENDER
  useEffect(() => {
    getPjtList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // CONDITIONAL PAGE
  const showEachPjt = () => {
    if (loading) {
      return <MyProgress />;
    }
    if (!pjtList) {
      return (
        <Typography variant="h3" sx={{ mt: '10%', ml: '30%' }}>
          <span style={{ color: '#00AB55' }}>프로젝트</span>가 없습니다.
        </Typography>
      );
    }
    return pjtList.map((pjt) => <ProjectListCard key={pjt.teamSeq} project={pjt} />);
  };
  return <Container fixed>{showEachPjt()}</Container>;
}
