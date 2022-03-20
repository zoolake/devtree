import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function StudyDelete() {
  const teamSeq = useParams();
  console.log(teamSeq.id);
  const studyDelete = async () => {
    const url = `/v1/study/${teamSeq.id}`;
    await axios
      .delete(url)
      .then((response) => {
        if (response.data.message) {
          console.log(response, response.data.message);
        } else {
          console.log(response, '스터디 삭제 성공');
        }
      })
      .catch((error) => {
        console.log(error, '스터디 삭제 실패');
      });
  };

  useEffect(() => {
    studyDelete();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
