// @material-ui/icons
import Dashboard from '@material-ui/icons/Dashboard';
import DashboardPage from '../containers/Dashboard';

const dashboardRoutes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    rtlName: 'لوحة القيادة',
    icon: Dashboard,
    component: DashboardPage,
    layout: '/admin',
  },
  // {
  //   path: '/user',
  //   name: 'User Profile',
  //   rtlName: 'ملف تعريفي للمستخدم',
  //   icon: Person,
  //   component: UserProfile,
  //   layout: '/admin',
  // },
];

export default dashboardRoutes;
