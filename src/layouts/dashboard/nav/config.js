// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'Dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Clients',
    path: '/dashboard/client',
    icon: icon('ic_client'),
    role: 'clients',
  },
  {
    title: 'Delivery Agents',
    path: '/dashboard/livreur',
    icon: icon('ic_livreur'),
    role: 'livreurs',
  },
  {
    title: 'Administrators',
    path: '/dashboard/admin',
    icon: icon('ic_admin'),
    role: 'administrateurs',
  },
  {
    title: 'Roles',
    path: '/dashboard/role',
    icon: icon('ic_role'),
    role: 'administrateurs',
  },
  {
    title: 'Pickups',
    path: '/dashboard/pickup',
    icon: icon('ic_pickup'),
    role: 'envois',
  },
  {
    title: 'Shipments',
    path: '/dashboard/shipment',
    icon: icon('ic_livreur'),
    role: 'envois',
  },
  {
    title: 'Parameters',
    path: '/dashboard/parameter',
    icon: icon('ic_parameter'),
    role: 'parameters',
  },
  // {
  //   title: 'login',
  //   path: '/login',
  //   icon: icon('ic_lock'),
  // },
  {
    title: 'Wilaya Fees',
    path: '/dashboard/wilayafee',
    icon: icon('ic_role'),
    role: 'tarifs',
  },
];

export default navConfig;
