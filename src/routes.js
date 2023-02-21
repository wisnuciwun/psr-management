import React from 'react'

const OrganizationStructure = React.lazy(() => import('./pages/OrganizationStructure'))
const Home = React.lazy(() => import('./pages/Home'))
const Contacts = React.lazy(() => import('./pages/Contacts'))
const HouseMap = React.lazy(() => import('./pages/HouseMap'))
const MeetingHistory = React.lazy(() => import('./pages/MeetingHistory'))
const Login = React.lazy(() => import('./pages/Login'))
const Register = React.lazy(() => import('./pages/Register'))
const Profile = React.lazy(() => import('./pages/Profile'))
const UnderConstruction = React.lazy(() => import('./pages/UnderConstruction'))


const routes = [
  { path: '/struktur', exact: true, name: 'OrganizationStructure', element: OrganizationStructure, protected: false },
  { path: '/', exact: true, name: 'Home', element: Home, protected: false },
  { path: '/berita', exact: true, name: 'Home', element: UnderConstruction, protected: false },
  // { path: '/kontak', exact: true, name: 'OurWater', element: Contacts },
  { path: '/denah', exact: true, name: 'HouseMap', element: HouseMap, protected: false },
  { path: '/kontak', exact: true, name: 'OurWater', element: MeetingHistory, protected: false },
  { path: '/login', exact: true, name: 'Login', element: Login, protected: false },
  { path: '/register', exact: true, name: 'Register', element: Register, protected: false },
  { path: '/profile', exact: true, name: 'Profile', element: Profile, protected: true },
]

export default routes
