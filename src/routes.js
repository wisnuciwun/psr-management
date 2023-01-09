import React from 'react'

const OrganizationStructure = React.lazy(() => import('./pages/OrganizationStructure'))
const Home = React.lazy(() => import('./pages/Home'))
const Contacts = React.lazy(() => import('./pages/Contacts'))
const HouseMap = React.lazy(() => import('./pages/HouseMap'))
const MeetingHistory = React.lazy(() => import('./pages/MeetingHistory'))
const Login = React.lazy(() => import('./pages/Login'))
const Register = React.lazy(() => import('./pages/Register'))


const routes = [
  { path: '/struktur', exact: true, name: 'OrganizationStructure', element: OrganizationStructure },
  { path: '/', exact: true, name: 'Home', element: Home },
  { path: '/kontak', exact: true, name: 'OurWater', element: Contacts },
  { path: '/denah', exact: true, name: 'HouseMap', element: HouseMap },
  { path: '/notulensi', exact: true, name: 'OurWater', element: MeetingHistory },
  { path: '/login', exact: true, name: 'Login', element: Login },
  { path: '/register', exact: true, name: 'Register', element: Register },
]

export default routes
