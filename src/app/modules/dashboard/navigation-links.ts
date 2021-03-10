import { NavLink } from '@shared/models/nav-link.model';
import { UserRoleType } from '@shared/constants/user-role';

export const navLinks: NavLink[] = [
  {
    label: 'Dashboard',
    path: 'system',
    icon: 'fa-home',
    permissions: [UserRoleType.ROLE_SYSTEM]
  },
  {
    label: 'Home',
    path: 'home',
    icon: 'fa-home',
    permissions: [UserRoleType.ROLE_ADMIN, UserRoleType.ROLE_USER]
  },
  {
    label: 'Live Tracking',
    path: 'live-tracking',
    icon: 'fa-location-arrow',
    permissions: [UserRoleType.ROLE_ALL]
  },
  {
    label: 'Geofence',
    path: 'geofence',
    icon: 'fa-globe',
    permissions: [UserRoleType.ROLE_USER],
  },

  {
    label: 'Model',
    path: 'system/model',
    icon: 'fas fa-hourglass-half',
    permissions: [UserRoleType.ROLE_SYSTEM]
  },

  {
    label: 'Tracker',
    path: 'system/tracker',
    icon: 'fa-map-marker-alt',
    permissions: [UserRoleType.ROLE_SYSTEM]
  },
  {
    label: 'User Role',
    path: 'system/userRole',
    icon: 'fa-user-check',
    permissions: [UserRoleType.ROLE_SYSTEM]
  },
  {
    label: 'License',
    path: 'system/license',
    icon: 'fa-address-card',
    permissions: [UserRoleType.ROLE_SYSTEM]
  },
  // {
  //   label: 'Feature',
  //   path: 'system/feature',
  //   icon: 'fa-flag-checkered',
  //   permissions: [UserRoleType.ROLE_SYSTEM]
  // },
  {
    label: 'Distributor',
    path: 'system/distributor',
    icon: 'fa-user-tie',
    permissions: [UserRoleType.ROLE_SYSTEM]
  },
  {
    label: 'Locked IP',
    path: 'system/locked-ips',
    icon: 'fa-lock',
    permissions: [UserRoleType.ROLE_SYSTEM]
  },
  {
    label: 'Tracker Management',
    path: 'tracker-management',
    icon: 'fa-map-marker-alt',
    permissions: [UserRoleType.ROLE_ADMIN]
  },
  {
    label: 'User Management',
    path: 'user-management',
    icon: 'fa-users',
    permissions: [UserRoleType.ROLE_ADMIN]
  },
  {
    label: 'Route Management',
    path: 'route',
    icon: 'fas fa-random',
    permissions: [UserRoleType.ROLE_USER]
  },

  // {
  //   label: 'Temperature Sensor',
  //   path: 'temperature-sensor',
  //   icon: 'fas fa-thermometer-half',
  //   permissions: [UserRoleType.ROLE_ADMIN]
  // },
  // {
  //   label: 'Fuel Sensor',
  //   path: 'fuel-sensor',
  //   icon: 'fas fa-flask',
  //   permissions: [UserRoleType.ROLE_ADMIN]
  // },

  // {
  //   label: 'Commodity Code',
  //   path: 'commodity-code',
  //   icon: 'fa-qrcode',
  //   permissions: [UserRoleType.ROLE_USER]
  // },
  // {
  //   label: 'Client Master',
  //   path: 'client-master',
  //   icon: 'fa-database',
  //   permissions: [UserRoleType.ROLE_USER]
  // },
  // {
  //   label: 'Order Management',
  //   path: 'order-management',
  //   icon: 'fa-shipping-fast',
  //   permissions: [UserRoleType.ROLE_USER]
  // },
  // {
  //   label: 'Driver Management',
  //   path: 'driver-management',
  //   icon: 'fas fa-truck-moving',
  //   permissions: [UserRoleType.ROLE_USER]
  // },
  // {
  //   label: 'Order Assign Board',
  //   path: 'order-assign-board',
  //   icon: 'fa-clipboard-list',
  //   permissions: [UserRoleType.ROLE_USER]
  // },
  {
    label: 'License Logs',
    path: 'license-logs',
    icon: 'fa fa-address-card',
    permissions: [UserRoleType.ROLE_ALL]
  },
  {
    label: 'Reports',
    path: 'reports',
    icon: 'fa fa-book',
    permissions: [UserRoleType.ROLE_ADMIN, UserRoleType.ROLE_USER]
  },

];
