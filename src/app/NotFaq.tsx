import './NotFaq.css';
import {Routes, Route} from 'react-router-dom';
import ProjectsListPage from '../pages/ProjectsListPage';
import ProjectPage from '../pages/ProjectPage';
import UserPage from '../pages/UserPage';
import DashboardPage from '../pages/DashboardPage';
import Footer from '../shared/ui/Footer';

const routeLinks = [
  {
    path: '/',
    component: <ProjectsListPage />,
    class: '',
  },
  {
    path: '/project/:id',
    component: <ProjectPage />,
    class: '',
  },
  {
    path: '/user',
    component: <UserPage />,
    class: '',
  },
  {
    path: '/dashboard',
    component: <DashboardPage />,
    class: 'dashboard-wrapper',
  },
];

export default function NotFaq() {
  return (
    <>
      <Routes>
        {
          routeLinks.map((route) => (
            <Route
              path={route.path}
              element={
                <div className={`content ${route.class}`}>
                  {route.component}
                </div>
              }
            />
          ))
        }
      </Routes>
      <Footer />
    </>
  );
}
