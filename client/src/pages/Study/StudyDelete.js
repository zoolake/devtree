import * as React from 'react';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
//
import { Snackbar, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
//
import { deleteStudy } from '../../_actions/study_actions';

export default function StudyDelete() {
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
    navigate('/study');
  };

  // AXIOS
  const dispatch = useDispatch();
  const studyDelete = async () => {
    await dispatch(deleteStudy(teamSeq))
      .then(() => {
        setOpen(true);
        console.log('스터디 삭제 성공');
      })
      .catch((error) => {
        console.log(error, '스터디 삭제 실패');
        navigate(`/study/${teamSeq}`);
        alert('스터디를 삭제할 수 없습니다.');
      });
  };

  // RENDER
  useEffect(() => {
    studyDelete();
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
