import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//

import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import DashboardAppPage from './pages/DashboardAppPage';
import CreateClient from './pages/Client/Create';
import UpdateClient from './pages/Client/Update';
import ListClient from './pages/Client/List';
import CreateAdmin from './pages/Admin/Create';
import UpdateAdmin from './pages/Admin/Update';
import ListAdmin from './pages/Admin/List';
import CreateLivreur from './pages/Delivery Agent/Create';
import UpdateLivreur from './pages/Delivery Agent/Update';
import ListLivreur from './pages/Delivery Agent/List';
import ListPickup from './pages/Pickup/List';
import CreatePickup from './pages/Pickup/Create';
import UpdatePickup from './pages/Pickup/Update';
import ListRole from './pages/Role/List';
import CreateRole from './pages/Role/Create';
import UpdateRole from './pages/Role/Update';
import ListShipment from './pages/Shipment/List';
import CreateShipment from './pages/Shipment/Create';
import UpdateShipment from './pages/Shipment/Update';
import ListWilayaFee from './pages/WilayaFee/List';
import ImpressionModel from './pages/PDF/ImpressionModel';
import ImpressionManyModel from './pages/PDF/ImpressionManyModel';
import Parameter from './pages/Parameter/Parameter';

// ----------------------------------------------------------------------

export default function Router() {
  const routes = [
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        {
          path: 'client',
          children: [
            { path: '', element: <ListClient /> },
            { path: 'create', element: <CreateClient /> },
            { path: 'update/:_id', element: <UpdateClient /> },
          ],
        },
        {
          path: 'admin',
          children: [
            { path: '', element: <ListAdmin /> },
            { path: 'create', element: <CreateAdmin /> },
            { path: 'update', element: <UpdateAdmin /> },
          ],
        },
        {
          path: 'livreur',
          children: [
            { path: '', element: <ListLivreur /> },
            { path: 'create', element: <CreateLivreur /> },
            { path: 'update', element: <UpdateLivreur /> },
          ],
        },
        {
          path: 'shipment',
          children: [
            { path: '', element: <ListShipment /> },
            { path: 'create', element: <CreateShipment /> },
            { path: 'update', element: <UpdateShipment /> },
          ],
        },
        {
          path: 'role',
          children: [
            { path: '', element: <ListRole /> },
            { path: 'create', element: <CreateRole /> },
            { path: 'update', element: <UpdateRole /> },
          ],
        },
        {
          path: 'pickup',
          children: [
            { path: '', element: <ListPickup /> },
            { path: 'create', element: <CreatePickup /> },
            { path: 'update', element: <UpdatePickup /> },
          ],
        },
        {
          path: 'wilayafee',
          children: [{ path: '', element: <ListWilayaFee /> }],
        },
        {
          path: 'parameter',
          element: <Parameter />,
        },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
  ];

  const root = [
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/login" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    { path: 'impression/:id', element: <ImpressionModel /> },
    { path: 'impression/many', element: <ImpressionManyModel /> },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ];

  root.push(...routes);

  const useRoot = useRoutes(root);
  return useRoot;
}
