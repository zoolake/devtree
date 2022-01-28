import React from "react";
import { FaProjectDiagram } from "react-icons/fa";

function ProjectPage() {
  return (
    <>
      <div className="app">
        <FaProjectDiagram style={{ fontSize: "4rem" }} />
        <br />
        <span style={{ fontSize: "2rem" }}>Project Page!</span>
      </div>
      <div style={{ float: "right" }}></div>
    </>
  );
}

export default ProjectPage;
