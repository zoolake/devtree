import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Login from './pages/User/Login';
import Register from './pages/User/Register';
import MainPage from './pages/Main/MainPage';
import Products from './pages/Products';
import Project from './pages/Project/ProjectMain';
import ProjectDetail from './pages/Project/ProjectDetail';
import ProjectCreate from './pages/Project/ProjectCreate';
import Blog from './pages/Blog';
import User from './pages/User';
// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/MainPage',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/MainPage/app" replace /> },
        { path: 'app', element: <MainPage /> },
        { path: 'user', element: <User /> },
        { path: 'products', element: <Products /> },
        { path: 'blog', element: <Blog /> }
      ]
    },
    {
      path: '/project',
      element: <DashboardLayout />,
      children: [
        { path: '', element: <Project /> },
        { path: ':id', element: <ProjectDetail /> },
        { path: 'create', element: <ProjectCreate /> }
      ]
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '/', element: <Navigate to="/MainPage/app" /> }
      ]
    }
  ]);
}
