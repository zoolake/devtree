import React from "react";
import { FaCommentAlt } from "react-icons/fa";

function CommunitySectionRow() {
  return (
    <div style={{
      display:'flex',
      width:'100%',
      backgroundColor:'beige',
      borderRadius:10,
      flexDirection:'row',
      justifyContent:'space-between',
      fontSize:16,
      padding:'10px 20px',
      margin:'10px 0px',
    }}>
      <div>기술스택</div>
      <div>제목</div>
      <div>조회 수</div>
      <div>작성자</div>
      <div>작성일자</div>
      <div>좋아요 수</div>
    </div>
  )
}

function CommunitySection() {
  return (
    <div style={{
      width:'600px',
      backgroundColor:'tomato',
      borderRadius:10,
      padding:'10px 20px',
    }}>
      <CommunitySectionRow />
      <CommunitySectionRow />
      <CommunitySectionRow />
      <CommunitySectionRow />
      <CommunitySectionRow />
    </div>
  )
}

function CommunityPage() {
  return (
    <div style={{
      width:'1000px'
    }}>
      <CommunitySection />
      {/* <div className="app">
        <FaCommentAlt style={{ fontSize: "4rem" }} />
        <br />
        <span style={{ fontSize: "2rem" }}>Community Page!</span>
      </div> */}
    </div>
  );
}

export default CommunityPage;
