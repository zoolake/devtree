import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteProject } from '../../_actions/project_actions';

export default function ProjectDelete() {
  // state
  const teamSeq = useParams().id;

  // axios
  const dispatch = useDispatch();
  const projectDelete = async () => {
    await dispatch(deleteProject(teamSeq))
      .then(() => {
        console.log('프로젝트 삭제 성공');
      })
      .catch((error) => {
        console.log(error, '프로젝트 삭제 실패');
      });
  };

  // render
  useEffect(() => {
    projectDelete();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // page
  return null;
}
