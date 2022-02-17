import * as React from 'react';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
//
import { Snackbar, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
//
import { deleteProject } from '../../_actions/project_actions';

export default function ProjectDelete() {
  // STATE
  const teamSeq = useParams().id;
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  // HANDLE
  const handleClose = (reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
    navigate('/project');
  };

  // AXIOS
  const dispatch = useDispatch();
  const projectDelete = async () => {
    await dispatch(deleteProject(teamSeq))
      .then(() => {
        setOpen(true);
        console.log('프로젝트 삭제 성공');
      })
      .catch((error) => {
        console.log(error, '프로젝트 삭제 실패');
        navigate(`/project/${teamSeq}`);
        alert('프로젝트를 삭제할 수 없습니다.');
      });
  };

  // RENDER
  useEffect(() => {
    projectDelete();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // PAGE
  const action = (
    <>
      <IconButton size="small" aria-label="close" color="primary" onClick={handleClose}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="프로젝트가 삭제되었습니다."
        action={action}
      />
    </div>
  );
}
