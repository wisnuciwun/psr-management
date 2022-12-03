import React from 'react'

const OrganizationStructure = React.lazy(() => import('./pages/OrganizationStructure'))
const Home = React.lazy(() => import('./pages/Home'))

const routes = [
  { path: '/struktur', exact: true, name: 'OrganizationStructure', element: OrganizationStructure },
  { path: '/', exact: true, name: 'Home', element: Home },
]

export default routes
