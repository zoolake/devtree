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
  const sendGoodResponse = (event) => {
    const volunteerSeq = event.target.value * 1;
    const dataToSubmit = {
      detailPositionName: volunteer.detailPositionName,
      responseType: 'ACCEPT',
      userSeq: volunteerSeq
    };
    const sendAnswer = async () => {
      await dispatch(answerProjectResponse({ teamSeq, dataToSubmit }))
        .then(() => {
          console.log('프로젝트 신청 응답 성공');
        })
        .catch((error) => {
          console.log(error, '프로젝트 신청 응답 실패');
        });
    };
    sendAnswer();
  };
  const sendBadResponse = (event) => {
    const volunteerSeq = event.target.value * 1;
    const dataToSubmit = {
      detailPositionName: volunteer.detailPositionName,
      responseType: 'REJECT',
      userSeq: volunteerSeq
    };
    const sendAnswer = async () => {
      await dispatch(answerProjectResponse({ teamSeq, dataToSubmit }))
        .then(() => {
          console.log('프로젝트 신청 응답 성공');
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
      <Button value={volunteer.userSeq} onClick={sendGoodResponse}>
        수락
      </Button>
      <Button value={volunteer.userSeq} onClick={sendBadResponse}>
        거절
      </Button>
    </div>
  );
}
