import React from 'react'

const OrganizationStructure = React.lazy(() => import('./pages/OrganizationStructure'))
const Home = React.lazy(() => import('./pages/Home'))
const Contacts = React.lazy(() => import('./pages/Contacts'))
const HouseMap = React.lazy(() => import('./pages/HouseMap'))
const MeetingHistory = React.lazy(() => import('./pages/MeetingHistory'))

const routes = [
  { path: '/struktur', exact: true, name: 'OrganizationStructure', element: OrganizationStructure },
  { path: '/', exact: true, name: 'Home', element: Home },
  { path: '/kontak', exact: true, name: 'OurWater', element: Contacts },
  { path: '/denah', exact: true, name: 'OurWater', element: HouseMap },
  { path: '/notulensi', exact: true, name: 'OurWater', element: MeetingHistory },
]

export default routes
