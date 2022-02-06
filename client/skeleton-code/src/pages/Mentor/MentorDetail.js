import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function MentorDetail() {
  const { id } = useParams();
  const [mentor, setMentor] = useState();
  const getMentor = async () => {
    const json = await (
      await fetch(`https://61fa456931f9c20017596733.mockapi.io/mentors/${id}`)
    ).json();
    // console.log(json);
    setMentor(json);
  };
  useEffect(() => {
    getMentor();
  }, []);

  console.log(mentor);

  return (
    <div>
      <h1>{mentor.user_name}</h1>
      <h2>{mentor.mentor_seq}</h2>
    </div>
  );
}
export default MentorDetail;
