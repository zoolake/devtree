import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
//
import { Button } from '@mui/material';
// //
import { answerProjectResponse } from '../../../_actions/project_actions';

ProjectResponseForm.propTypes = {
  volunteer: PropTypes.object.isRequired
};

export default function ProjectResponseForm({ volunteer }) {
  // STATE
  const teamSeq = useParams().id;

  // INIT
  const dispatch = useDispatch();

  // HANDLE
  const sendResponse = (event) => {
    const answer = event.target.value;
    const dataToSubmit = {
      detailPositionName: volunteer.detailPositionName,
      responseType: answer
    };
    const sendAnswer = async () => {
      await dispatch(answerProjectResponse({ teamSeq, dataToSubmit }))
        .then((response) => {
          console.log(response.payload.data.data, '프로젝트 신청 응답 성공');
        })
        .catch((error) => {
          console.log(error, '프로젝트 신청 응답 실패');
        });
    };
    sendAnswer();
  };

  // PAGE
  return (
    <div>
      <div>
        {volunteer.userSeq}번 {volunteer.userId}가 {volunteer.detailPositionName}에 지원함
      </div>
      <Button value="ACCEPT" onClick={sendResponse}>
        수락
      </Button>
      <Button value="REJECT" onClick={sendResponse}>
        거절
      </Button>
    </div>
  );
}
