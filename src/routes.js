import React from 'react'

const OrganizationStructure = React.lazy(() => import('./pages/OrganizationStructure'))
const Home = React.lazy(() => import('./pages/Home'))
const OurWater = React.lazy(() => import('./pages/OurWater'))

const routes = [
  { path: '/struktur', exact: true, name: 'OrganizationStructure', element: OrganizationStructure },
  { path: '/airswadaya', exact: true, name: 'OurWater', element: OurWater },
  { path: '/', exact: true, name: 'Home', element: Home },
]

export default routes
