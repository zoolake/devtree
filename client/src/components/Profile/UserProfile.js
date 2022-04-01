import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
//
import { Container, Button, Card, Box } from '@mui/material';
//
import { GetUserProfile, UpdateUserProfileForm } from '.';
import { detailUser } from '../../_actions/user_actions';
import MyProgress from '../_dashboard/MyProgress';

export default function UserProfile() {
  // STATE
  const [isUpdate, setIsUpdate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userDetail, setUserDetail] = useState('');
  const [myTechs, setMyTechs] = useState([]);

  // INIT
  const dispatch = useDispatch();
  const getUserDetail = async () => {
    setLoading(true);
    await dispatch(detailUser())
      .then((response) => {
        if (response) {
          setUserDetail(response.payload.data.user);
          const techData = response.payload.data.tech;
          if (techData.length !== 0) {
            const myTech = techData.reduce((total, tech) => {
              total = [...total, { value: tech.techSeq, label: tech.techName }];
              return total;
            }, []);
            setMyTechs(myTech);
          }
        }
      })
      .catch(() => {
        setTimeout(() => {}, 3000);
      });
    setLoading(false);
  };

  // RENDER
  useEffect(() => {
    getUserDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // HANDLE
  const handleChange = () => {
    setIsUpdate(!isUpdate);
  };

  // CONDITIONAL
  if (loading) return <MyProgress />;

  if (!isUpdate)
    return (
      <Container>
        <Card sx={{ minWidth: 275 }}>
          <GetUserProfile userDetail={userDetail} myTechs={myTechs} />
          <Box textAlign="right">
            <Button variant="contained" onClick={handleChange} sx={{ m: 3 }} size="large">
              수정하기
            </Button>
          </Box>
        </Card>
      </Container>
    );
  return (
    <Container>
      <Card sx={{ minWidth: 275 }}>
        <UpdateUserProfileForm
          setIsUpdate={setIsUpdate}
          isUpdate={isUpdate}
          userDetail={userDetail}
          myTechs={myTechs}
          getUserDetail={getUserDetail}
        />
      </Card>
    </Container>
  );
}
