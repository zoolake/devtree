import React, { useEffect, useState } from "react";
import { withRouter, Link } from "react-router-dom";
import MentorList from "./MentorList";

function MentorPage() {
  const [mentors, setMentors] = useState([]);
  const getMentors = async () => {
    const json = await (
      await fetch(
        `https://61fa456931f9c20017596733.mockapi.io/mentors`
      )
    ).json();
    setMentors(json)
  }
  useEffect(() => {
    getMentors();
  }, []);
  console.log(mentors);
  return (
    <div>
      <h1>Mentor Page</h1>
      <div>
        {mentors.map((mentor) => (
          <MentorList
            key={mentor.mentor_seq}
            mentor_seq={mentor.mentor_seq}
            name={mentor.user_name}
          />
        ))}
      </div>
    </div>
  )
};

export default withRouter(MentorPage);
