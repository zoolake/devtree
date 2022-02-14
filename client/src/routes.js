import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Home from './pages/Home/Home';
import Login from './pages/User/Login';
import Register from './pages/User/Register';
import MainPage from './pages/Main/MainPage';
import Products from './pages/Products';
import Profile from './pages/User/Profile';
// project
import ProjectMain from './pages/Project/ProjectMain';
import ProjectDetail from './pages/Project/ProjectDetail';
import ProjectCreate from './pages/Project/ProjectCreate';
import ProjectUpdate from './pages/Project/ProjectUpdate';
import ProjectDelete from './pages/Project/ProjectDelete';
// study
import Study from './pages/Study/StudyMain';
import StudyDetail from './pages/Study/StudyDetail';
import StudyCreate from './pages/Study/StudyCreate';
import StudyUpdate from './pages/Study/StudyUpdate';
import StudyDelete from './pages/Study/StudyDelete';

import Blog from './pages/Blog';
import Ranking from './pages/Ranking';
import MentorPage from './pages/Mentor/MentorPage';
import MentorDetail from './pages/Mentor/MentorDetail';
import MentoringReservation from './pages/Mentor/MentoringReservation';
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
      path: '/MainPage',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/MainPage/app" replace /> },
        { path: 'app', element: <MainPage /> },
        { path: 'ranking', element: <Ranking /> },
        { path: 'products', element: <Products /> },
        { path: 'blog', element: <Blog /> },
        { path: 'profile', element: <Profile /> }
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
        { path: 'mentor', element: <Navigate to="/mentor" /> }
        // { path: 'mentor/:id', element: <MentorDetail /> },
        // { path: 'mentor', element: <MentorPage /> }
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
        { path: 'mentor', element: <Navigate to="/mentor" /> }
        // { path: 'mentor/:id', element: <MentorDetail /> },
        // { path: 'mentor', element: <MentorPage /> }
      ]
    },
    // {
    //   path: '/',
    //   element: <LogoOnlyLayout />,
    //   children: [
    //     { path: 'login', element: <Login /> },
    //     { path: 'register', element: <Register /> },
    //     { path: '/', element: <Navigate to="/MainPage/app" /> }
    //   ]
    // },
    {
      path: '/',
      element: <Home />
    }
  ]);
}
