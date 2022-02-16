import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteStudy } from '../../_actions/study_actions';

export default function StudyDelete() {
  // state
  const teamSeq = useParams().id;

  // axios
  const dispatch = useDispatch();
  const studyDelete = async () => {
    await dispatch(deleteStudy(teamSeq))
      .then(() => {
        console.log('스터디 삭제 성공');
      })
      .catch((error) => {
        console.log(error, '스터디 삭제 실패');
      });
  };

  // render
  useEffect(() => {
    studyDelete();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // page
  return null;
}
