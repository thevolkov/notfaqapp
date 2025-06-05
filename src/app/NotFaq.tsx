import './NotFaq.css';
import {Routes, Route, useLocation, useNavigate} from 'react-router-dom';
import ScrollToTop from '../shared/ui/ScrollToTop';
import {Footer} from '../shared/ui';
import {
  DashboardPage,
  ProjectListPage,
  ProjectPage,
  UserPage
} from '../pages';
import ProjectForm from '../features/ProjectForm/ProjectForm';
import BSOD from '../pages/ErrorPage/ErrorPage';
import {trackRoute} from '../shared/lib/routeCheat';
import {useEffect} from 'react';
import SecretRoom from '../pages/SecretRoom';
import type {RootState} from './store';
import {useSelector} from 'react-redux';

const routeLinks = [
  {
    path: '/',
    component: <ProjectListPage />,
    class: '',
  },
  {
    path: '/project/:id',
    component: <ProjectPage />,
    class: '',
  },
  {
    path: '/project/create',
    component: <ProjectForm />,
    class: '',
  },
  {
    path: '/project/edit/:id',
    component: <ProjectForm />,
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
  {
    path: '/666',
    component: <BSOD />,
    class: 'full-with p-0 m-0',
  },
];

export default function NotFaq() {
  const location = useLocation();
  const navigate = useNavigate();
  const noFooterRoutes = ['/666'];

  const hideFooter = noFooterRoutes.some((path) =>
    location.pathname.startsWith(path)
  );

  const theme = useSelector((state: RootState) => state.theme.theme);

  useEffect(() => {
    document.documentElement.className = theme === 'light' ? 'light-theme' : '';
  }, [theme]);

  useEffect(() => {
    const matched = trackRoute(location.pathname);
    if (matched) {
      navigate('/secret');
    }
  }, [location.pathname]);

  return (
    <>
      <ScrollToTop />
      <Routes>
        {
          routeLinks.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={
                <div className={`content ${route.class}`}>
                  {route.component}
                </div>
              }
            />
          ))
        }
        <Route
          path="/secret"
          element={
            <div className="content">
              <SecretRoom />
            </div>
          }
        />
      </Routes>
      {!hideFooter && <Footer />}
    </>
  );
}
