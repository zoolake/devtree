import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
//
import { Button, Typography, Container, Divider, Stack } from '@mui/material';
//
import MyProgress from '../../components/_dashboard/MyProgress';
import { getStudyResponse, answerStudyResponse } from '../../_actions/study_actions';

export default function StudyResponse() {
  // STATE
  const teamSeq = useParams().id;
  const navigate = useNavigate();
  const [studyRequest, setstudyRequest] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isLoad, setIsLoad] = useState(false);

  // AXIOS
  const dispatch = useDispatch();
  // 해당 스터디 정보 불러오기
  const getStyResponse = async () => {
    setLoading(true);
    await dispatch(getStudyResponse(teamSeq))
      .then((response) => {
        console.log(response.payload.data.data, '스터디 요청 목록 불러오기 성공');
        setstudyRequest(response.payload.data.data);
      })
      .catch((error) => {
        console.log(error, '스터디 요청 목록 불러오기 실패');
      });
    setLoading(false);
  };

  // HANDLE
  const sendGoodResponse = (event) => {
    const volunteerSeq = event.target.value * 1;
    const dataToSubmit = {
      responseType: 'ACCEPT',
      userSeq: volunteerSeq
    };
    const sendAnswer = async () => {
      await dispatch(answerStudyResponse({ teamSeq, dataToSubmit }))
        .then(() => {
          console.log('스터디 신청 응답 성공');
          setIsLoad(!isLoad);
        })
        .catch((error) => {
          console.log(error, '스터디 신청 응답 실패');
        });
    };
    sendAnswer();
    getStyResponse();
  };
  const sendBadResponse = (event) => {
    const volunteerSeq = event.target.value * 1;
    const dataToSubmit = {
      responseType: 'REJECT',
      userSeq: volunteerSeq
    };
    const sendAnswer = async () => {
      await dispatch(answerStudyResponse({ teamSeq, dataToSubmit }))
        .then(() => {
          console.log('스터디 신청 응답 성공');
          setIsLoad(!isLoad);
        })
        .catch((error) => {
          console.log(error, '스터디 신청 응답 실패');
        });
    };
    sendAnswer();
    getStyResponse();
  };
  const goBack = () => {
    navigate(`/study/${teamSeq}`);
  };

  // RENDER
  useEffect(() => {
    getStyResponse();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoad]);

  // LOADING
  if (loading) return <MyProgress />;

  // PAGE</Typography>
  if (studyRequest.length === 0)
    return (
      <Container sx={{ mt: 10 }}>
        <Stack direction="row" justifyContent="space-between">
          <h1>스터디 신청 목록</h1>
          <Button variant="outlined" sx={{ width: 100 }} onClick={goBack}>
            돌아가기
          </Button>
        </Stack>
        <Divider sx={{ mt: 2, mb: 5 }} />
        <Typography variant="h4" color="primary" sx={{ ml: 45, mt: 30 }}>
          해당 스터디에 남아있는 신청이 없습니다.
        </Typography>
      </Container>
    );
  return (
    <Container sx={{ mt: 10 }}>
      <h1>스터디 신청 목록</h1>
      <Divider sx={{ mt: 2, mb: 5 }} />
      <Stack direction="column" spacing={3}>
        {studyRequest.map((request) => (
          <Stack direction="row" key={request.userSeq} spacing={3} justifyContent="space-between">
            <Typography variant="h4">{request.userId}</Typography>
            <div>
              <Button value={request.userSeq} onClick={sendGoodResponse}>
                수락
              </Button>
              <Button value={request.userSeq} onClick={sendBadResponse}>
                거절
              </Button>
            </div>
          </Stack>
        ))}
      </Stack>
    </Container>
  );
}
