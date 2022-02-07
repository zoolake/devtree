import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

ProjectDelete.propTypes = {
  project: PropTypes.array.isRequired
};

export default function ProjectDelete(project) {
  const projectDelete = async () => {
    const url = `http://localhost:3000/api/v1/project/${project.id}`;
    await axios
      .delete(url)
      .then((response) => {
        console.log(response, '성공');
      })
      .catch((error) => {
        console.log(error, '실패');
      });
  };

  useEffect(() => {
    projectDelete();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
