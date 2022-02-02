import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import Auth from "../hoc/auth";
// pages for this product
import LandingPage from "./views/LandingPage/LandingPage.js";
import LoginPage from "./views/LoginPage/LoginPage.js";
import RegisterPage from "./views/RegisterPage/RegisterPage.js";
import ChatPage from "./views/ChatPage/ChatPage";
import CommunityPage from "./views/CommunityPage/CommunityPage";
import ProjectPage from "./views/ProjectPage/ProjectPage";
import MentorPage from "./views/MentorPage/MentorPage";
import MentorDetail from "./views/MentorPage/MentorDetail";
import StudyPage from "./views/StudyPage/StudyPage";
import NavBar from "./views/NavBar/NavBar";
import Footer from "./views/Footer/Footer";

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NavBar />
      <div
        className="content_wrapper"
        style={{ paddingTop: "75px", minHeight: "calc(100vh - 80px)" }}
      >
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route exact path="/study" component={Auth(StudyPage, null)} />
          <Route exact path="/project" component={Auth(ProjectPage, null)} />
          <Route exact path="/mentor" component={Auth(MentorPage, null)} />
          <Route exact path="/mentor/:id" component={Auth(MentorDetail, null)}>
            <MentorDetail/>
          </Route>
          <Route
            exact
            path="/community"
            component={Auth(CommunityPage, null)}
          />
          <Route exact path="/project" component={Auth(ProjectPage, null)} />
          <Route exact path="/chat" component={Auth(ChatPage, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
        </Switch>
      </div>
      <Footer />
    </Suspense>
  );
}

export default App;
