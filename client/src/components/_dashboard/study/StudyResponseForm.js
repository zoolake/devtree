import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
//
import { Button } from '@mui/material';
// //
import { answerStudyResponse } from '../../../_actions/study_actions';

StudyResponseForm.propTypes = {
  volunteer: PropTypes.object.isRequired
};

export default function StudyResponseForm({ volunteer }) {
  console.log(volunteer);
  // STATE
  const teamSeq = useParams().id;

  // INIT
  const dispatch = useDispatch();

  // HANDLE
  const sendResponse = (event) => {
    const answer = event.target.value;
    const dataToSubmit = {
      responseType: answer
    };
    const sendAnswer = async () => {
      await dispatch(answerStudyResponse({ teamSeq, dataToSubmit }))
        .then((response) => {
          console.log(response.payload.data.data, '스터디 신청 응답 성공');
        })
        .catch((error) => {
          console.log(error, '스터디 신청 응답 실패');
        });
    };
    sendAnswer();
  };

  // PAGE
  return (
    <div>
      <div>{volunteer.userId}의 신청</div>
      <Button value="ACCEPT" onClick={sendResponse}>
        수락
      </Button>
      <Button value="REJECT" onClick={sendResponse}>
        거절
      </Button>
    </div>
  );
}
