import React from 'react';

const UploadLead = React.lazy(() => import('./views/Pages/UploadLead'));
const Deals = React.lazy(() => import('./views/Deals'));
const Charts = React.lazy(() => import('./views/Charts'));
const Dashboard = React.lazy(() => import('./views/Dashboard'));
const Users = React.lazy(() => import('./views/Users/Users'));
const User = React.lazy(() => import('./views/Users/User'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/deals', exact: true, name: 'Deals', component: Deals },
  { path: '/charts', name: 'Charts', component: Charts },
  { path: '/uploadlead', exact: true, name: 'UploadLead', component: UploadLead },
  { path: '/users', exact: true,  name: 'Users', component: Users },
  { path: '/users/:id', exact: true, name: 'User Details', component: User },
];

export default routes;
