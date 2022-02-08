import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function ProjectDelete() {
  const teamSeq = useParams();
  const projectDelete = async () => {
    const url = `/project/${teamSeq.id}`; // http://127.26.1.146:8080/v1/project/${teamSeq.id}
    await axios
      .delete(url)
      .then((response) => {
        if (response.data.message) {
          console.log(response, response.data.message);
        } else {
          console.log(response, '프로젝트 삭제 성공');
        }
      })
      .catch((error) => {
        console.log(error, '프로젝트 삭제 실패');
      });
  };

  useEffect(() => {
    projectDelete();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
