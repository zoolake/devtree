import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';

import Login from './pages/User/Login';
import Register from './pages/User/Register';
import MainPage from './pages/Main/MainPage';
import Products from './pages/Products';

// USER PROFILE
import Profile from './pages/User/Profile';
import ProfileAlarm from './pages/User/ProfileAlarm';
import ProfileAuth from './pages/User/ProfileAuth';
import ProfileProject from './pages/User/ProfileProject';
import ProfileStudy from './pages/User/ProfileStudy';
import ProfileMentoring from './pages/User/ProfileMentoring';
// PROJECT
import ProjectMain from './pages/Project/ProjectMain';
import ProjectDetail from './pages/Project/ProjectDetail';
import ProjectCreate from './pages/Project/ProjectCreate';
import ProjectUpdate from './pages/Project/ProjectUpdate';
import ProjectDelete from './pages/Project/ProjectDelete';
import ProjectJoin from './pages/Project/ProjectJoin';
import ProjectResponse from './pages/Project/ProjectResponse';
// STUDY
import Study from './pages/Study/StudyMain';
import StudyDetail from './pages/Study/StudyDetail';
import StudyCreate from './pages/Study/StudyCreate';
import StudyUpdate from './pages/Study/StudyUpdate';
import StudyDelete from './pages/Study/StudyDelete';
import StudyResponse from './pages/Study/StudyResponse';

import Home from './pages/Home/Home';
import Blog from './pages/Blog';
import Ranking from './pages/Ranking';
import MentorPage from './pages/Mentor/MentorPage';
import MentorDetail from './pages/Mentor/MentorDetail';
import MentoringReservation from './pages/Mentor/MentoringReservation';
import MentorInfo from './pages/Mentor/MentorInfo';
import SessionPage from './pages/Session/SessionPage';
// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/mentor',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/mentor" replace /> },
        { path: '', element: <MentorPage /> },
        {
          path: ':id',
          element: <MentorDetail />
        }
      ]
    },
    {
      path: '/reservation',
      element: <DashboardLayout />,
      children: [
        {
          path: ':id',
          element: <MentoringReservation />
        }
      ]
    },
    {
      path: '/mentorprofile',
      element: <DashboardLayout />,
      children: [
        {
          path: ':id',
          element: <MentorInfo />
        }
      ]
    },
    {
      path: '/MainPage',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/MainPage/app" replace /> },
        { path: 'app', element: <MainPage /> },
        { path: 'ranking', element: <Ranking /> },
        { path: 'products', element: <Products /> },
        { path: 'blog', element: <Blog /> }
      ]
    },
    {
      path: '/project',
      element: <DashboardLayout />,
      children: [
        { path: '', element: <ProjectMain /> },
        { path: ':id', element: <ProjectDetail /> },
        { path: 'create', element: <ProjectCreate /> },
        { path: ':id/update', element: <ProjectUpdate /> },
        { path: ':id/delete', element: <ProjectDelete /> },
        { path: ':id/join', element: <ProjectJoin /> },
        { path: ':id/response', element: <ProjectResponse /> },
        { path: 'mentor', element: <Navigate to="/mentor" /> }
      ]
    },
    {
      path: '/study',
      element: <DashboardLayout />,
      children: [
        { path: '', element: <Study /> },
        { path: ':id', element: <StudyDetail /> },
        { path: 'create', element: <StudyCreate /> },
        { path: ':id/update', element: <StudyUpdate /> },
        { path: ':id/delete', element: <StudyDelete /> },
        { path: ':id/response', element: <StudyResponse /> },
        { path: 'mentor', element: <Navigate to="/mentor" /> }
        // { path: 'mentor/:id', element: <MentorDetail /> },
        // { path: 'mentor', element: <MentorPage /> }
      ]
    },
    {
      path: '/profile',
      element: <DashboardLayout />,
      children: [
        {
          path: 'menu',
          element: <Profile />
        },
        { path: 'study', element: <ProfileStudy /> },
        { path: 'project', element: <ProfileProject /> },
        { path: 'mentoring', element: <ProfileMentoring /> },
        { path: 'auth', element: <ProfileAuth /> },
        { path: 'alarm', element: <ProfileAlarm /> }
      ]
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '/', element: <Navigate to="/landing" /> }
      ]
    },
    {
      path: '/landing',
      element: <Home />
    },
    {
      path: '/',
      element: <SessionPage />,
      children: [
        {
          path: 'session',
          element: <SessionPage />,
          children: [{ path: ':id', element: <SessionPage /> }]
        }
      ]
    }
  ]);
}
