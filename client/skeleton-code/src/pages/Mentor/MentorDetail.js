import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

function MentorDetail() {
  const { id } = useParams();
  const getMentor = async () => {
    const json = await (
      await fetch(`https://61fa456931f9c20017596733.mockapi.io/mentors/${id}`)
    ).json();
    console.log(json);
  };
  useEffect(() => {
    getMentor();
  }, []);

  return <h1>{id}</h1>;
}
export default MentorDetail;
