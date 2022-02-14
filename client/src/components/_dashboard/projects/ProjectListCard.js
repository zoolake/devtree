import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

ProjectListCard.propTypes = {
  project: PropTypes.object.isRequired
};

export default function ProjectListCard({ project }) {
  // PAGE
  if (!project.teamPosition || !project.teamTech) return <div>'로딩 중'</div>;
  return (
    <ul>
      <li>
        <Link to={`${project.teamSeq}`}>
          <div>'teamManagerName': {project.teamManagerName}</div>
          <div>'teamManagerSeq': {project.teamManagerSeq}</div>
          <div>'teamMemberCnt': {project.teamMemberCnt}</div>
          <div>'teamName': {project.teamName}</div>
          <div>'teamPosition': {JSON.stringify(project.teamPosition.map((pos) => pos))}</div>
          <div>'teamRecruitCnt': {project.teamRecruitCnt}</div>
          <div>'teamSeq': {project.teamSeq}</div>
          <div>'teamState': {project.teamState}</div>
          <li>'teamTech': {JSON.stringify(project.teamTech.map((pos) => pos))}</li>
        </Link>
      </li>
      <br />
    </ul>
  );
}
