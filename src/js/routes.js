import HomePage from '../pages/home.jsx';
import StudiesPage from '../pages/studies.jsx';
import ToolsPage from '../pages/tools.jsx';
import DevocionalDetailPage from '../pages/devocional-detail.jsx';
import NotFoundPage from '../pages/404.jsx';

var routes = [
  {
    path: '/',
    component: HomePage,
  },
  {
    path: '/studies/',
    component: StudiesPage,
  },
  {
    path: '/tools/',
    component: ToolsPage,
  },
  {
    path: '/devocional/:id/',
    component: DevocionalDetailPage,
  },
  {
    path: '(.*)',
    component: NotFoundPage,
  },
];

export default routes;