import React, { useEffect, useState } from "react";
import { withRouter, Link } from "react-router-dom";

function MentorList({mentor_seq, name}) {

  return (
    <h2>
      <Link to={`/mentor/${mentor_seq}`}>{name}</Link>
    </h2>
  )
};

export default MentorList;

