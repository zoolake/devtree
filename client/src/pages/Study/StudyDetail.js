import React, { useState, useEffect } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import jwtdecode from 'jwt-decode';
import { ToggleButton, ToggleButtonGroup, Button } from '@mui/material';
//
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
//
import { getStudyDetail, joinStudy } from '../../_actions/study_actions';
import { changeTeamState } from '../../_actions/team_actions';
import { checkTeamMember } from '../../_actions/user_actions';

export default function StudyDetail() {
  // STATE
  const teamSeq = useParams().id;
  const [studyDetail, setStudyDetail] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userSeq] = useState(jwtdecode(localStorage.getItem('user')).userSeq);
  const [alignment, setAlignment] = useState();
  const [belonged, setBelonged] = useState(false);
  const TEAM_STATE = [
    { state: 'RECRUIT', stateName: '진행 중' },
    { state: 'COMPLETED', stateName: '모집 완료됨' },
    { state: 'FINISH', stateName: '종료됨' }
  ];

  // INIT
  const dispatch = useDispatch();
  const makeStudyDetail = async () => {
    setLoading(true);
    await dispatch(getStudyDetail(teamSeq))
      .then((response) => {
        const studyData = response.payload.data.data;
        setStudyDetail(studyData);
        console.log('스터디 상세 조회 성공');
        return studyData.teamState;
      })
      .then((state) => {
        setAlignment(state);
      })
      .catch((error) => {
        console.log(error, '스터디 상세 조회 실패');
      });
    setLoading(false);
  };
  const getBelonged = async () => {
    await dispatch(checkTeamMember(teamSeq)).then((response) => {
      setBelonged(response.payload.data.data);
    });
  };

  // HANDLE
  const handleAlignment = (newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
      const teamSeqNum = teamSeq * 1;
      const dataToSubmit = {
        teamSeq: teamSeqNum,
        teamState: newAlignment
      };
      const changeStudyState = async () => {
        await dispatch(changeTeamState(dataToSubmit))
          .then(() => {
            console.log('스터디 상태 수정 성공');
            makeStudyDetail();
          })
          .catch((error) => {
            console.log(error, '스터디 상태 수정 실패');
          });
        setLoading(false);
      };
      changeStudyState();
    }
  };

  // RENDER
  useEffect(() => {
    makeStudyDetail();
    getBelonged();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // CONDITION
  let joinBtn;
  if (belonged || alignment !== 'RECRUIT') {
    joinBtn = null;
  } else {
    joinBtn = <RouterLink to="join">스터디 신청</RouterLink>;
  }
  if (loading || studyDetail.length === 0) return null;

  // MODAL
  const MySwal = withReactContent(Swal);
  const clickJoinBtn = () => {
    MySwal.fire({
      title: `${studyDetail.teamName}`,
      text: '해당 스터디에 신청하시겠습니까?',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: '취소',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '신청'
    }).then((result) => {
      if (result.isConfirmed) {
        const joinData = { userSeq };
        dispatch(joinStudy({ teamSeq, joinData }))
          .then(() => {
            console.log('스터디 신청 성공');
          })
          .catch((error) => {
            console.log(error, '스터디 신청 실패');
          });
      }
    });
  };
  // const JoinStudyConfirm = Swal.fire({
  //   title: 'Are you sure?',
  //   text: "You won't be able to revert this!",
  //   icon: 'warning',
  //   showCancelButton: true,
  //   confirmButtonColor: '#3085d6',
  //   cancelButtonColor: '#d33',
  //   confirmButtonText: 'Yes, delete it!'
  // }).then((result) => {
  //   if (result.isConfirmed) {
  //     Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
  //   }
  // });

  // PAGE
  if (studyDetail.teamManagerSeq === userSeq) {
    return (
      <div>
        <h1>Study Detail of {studyDetail.teamSeq}</h1>
        <ToggleButtonGroup value={alignment} exclusive onChange={handleAlignment}>
          {TEAM_STATE.map((state, idx) => (
            <ToggleButton value={state.state} key={idx}>
              {state.stateName}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
        <ul>
          <li>teamCreateTime: {studyDetail.teamCreateTime}</li>
          <li>teamDesc: {studyDetail.teamDesc}</li>
          <li>teamEndTime: {studyDetail.teamEndTime}</li>
          <li>teamManagerName: {studyDetail.teamManagerName}</li>
          <li>teamManagerSeq: {studyDetail.teamManagerSeq}</li>
          <li>teamMemberCnt: {studyDetail.teamMemberCnt}</li>
          <li>teamRecruitCnt: {studyDetail.teamRecruitCnt}</li>
          <li>teamStartTime: {studyDetail.teamStartTime}</li>
          <li>teamState: {studyDetail.teamState}</li>
          <li>teamTech: {JSON.stringify(studyDetail.teamTech.map((pos) => pos))}</li>
          <li>teamType: {studyDetail.teamType}</li>
          <li>teamUpdateTime: {studyDetail.teamUpdateTime}</li>
        </ul>
        <RouterLink to="update">스터디 수정</RouterLink>
        <RouterLink to="delete">스터디 삭제</RouterLink>
        {joinBtn}
        <RouterLink to="response">스터디 신청 목록</RouterLink>
      </div>
    );
  }

  return (
    <div>
      <h1>Study Detail of {studyDetail.teamSeq}</h1>
      <ul>
        <li>teamName: {studyDetail.teamName}</li>
        <li>teamCreateTime: {studyDetail.teamCreateTime}</li>
        <li>teamDesc: {studyDetail.teamDesc}</li>
        <li>teamEndTime: {studyDetail.teamEndTime}</li>
        <li>teamManagerName: {studyDetail.teamManagerName}</li>
        <li>teamManagerSeq: {studyDetail.teamManagerSeq}</li>
        <li>teamMemberCnt: {studyDetail.teamMemberCnt}</li>
        <li>teamRecruitCnt: {studyDetail.teamRecruitCnt}</li>
        <li>teamStartTime: {studyDetail.teamStartTime}</li>
        <li>teamState: {studyDetail.teamState}</li>
        <li>teamTech: {JSON.stringify(studyDetail.teamTech.map((pos) => pos))}</li>
        <li>teamType: {studyDetail.teamType}</li>
        <li>teamUpdateTime: {studyDetail.teamUpdateTime}</li>
      </ul>
      <Button onClick={clickJoinBtn}>스터디 신청</Button>
      {/* Swal.fire(<p>스터디 신청</p>)<RouterLink to="join">스터디 신청</RouterLink> */}
    </div>
  );
}
