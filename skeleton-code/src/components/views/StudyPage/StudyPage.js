import React from "react";
import { FaRegFileAlt } from "react-icons/fa";

function StudyPage() {
  return (
    <>
      <div className="app">
        <FaRegFileAlt style={{ fontSize: "4rem" }} />
        <br />
        <span style={{ fontSize: "2rem" }}>Study Page!</span>
      </div>
      <div style={{ float: "right" }}></div>
    </>
  );
}

export default StudyPage;
