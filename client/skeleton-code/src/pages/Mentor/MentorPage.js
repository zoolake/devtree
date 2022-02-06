import { divide } from 'lodash';
import React, { useEffect, useState } from 'react';
import { withRouter, Link } from 'react-router-dom';
import MentorList from '../../components/mentor/MentorList';

export default function MentorPage() {
  const [mentors, setMentors] = useState([]);
  const getMentors = async () => {
    // ***
    // * 디테일에 갔다가 목록으로 다시 돌아오면 api 요청을 다시 보내는 문제가 있습니다.
    const json = await (await fetch(`https://61fa456931f9c20017596733.mockapi.io/mentors`)).json();
    setMentors(json);
  };
  useEffect(() => {
    getMentors();
  }, []);
  // console.log(mentors);
  return (
    <div>
      <h1>Mentor Page</h1>
      <div>
        <MentorList mentors={mentors} />
      </div>
    </div>
  );
}
