import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

StudyListCard.propTypes = {
  study: PropTypes.object.isRequired
};

export default function StudyListCard({ study }) {
  // PAGE
  if (!study.teamTech) return <div>'로딩 중'</div>;
  return (
    <ul>
      <li>
        <Link to={`${study.teamSeq}`}>
          <div>'teamManagerName': {study.teamManagerName}</div>
          <div>'teamManagerSeq': {study.teamManagerSeq}</div>
          <div>'teamMemberCnt': {study.teamMemberCnt}</div>
          <div>'teamName': {study.teamName}</div>
          <div>'teamRecruitCnt': {study.teamRecruitCnt}</div>
          <div>'teamSeq': {study.teamSeq}</div>
          <div>'teamState': {study.teamState}</div>
          <li>'teamTech': {JSON.stringify(study.teamTech.map((pos) => pos))}</li>
        </Link>
      </li>
      <br />
    </ul>
  );
}
