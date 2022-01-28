import React from "react";
import { FaCommentAlt } from "react-icons/fa";

function CommunityPage() {
  return (
    <>
      <div className="app">
        <FaCommentAlt style={{ fontSize: "4rem" }} />
        <br />
        <span style={{ fontSize: "2rem" }}>Community Page!</span>
      </div>
      <div style={{ float: "right" }}></div>
    </>
  );
}

export default CommunityPage;
