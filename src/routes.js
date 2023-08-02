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
const ForgetPassword = React.lazy(() => import('./pages/ForgetPassword'))
const NewsInformation = React.lazy(() => import('./pages/News/NewsInformation'))
const DetailNews = React.lazy(() => import('./pages/News/DetailNews'));

const AdminPage = React.lazy(() => import('./pages/Admin/Admin'));
const AdminBannerPage = React.lazy(() => import('./pages/Admin/Banner'));
const AdminListDataWarga = React.lazy(() => import('./pages/Admin/ListDataWarga'));
const AdminStrukOr = React.lazy(() => import('./pages/Admin/StrukOr'));
const AdminPengguna = React.lazy(() => import('./pages/Admin/Pengguna'));

const routes = [
  { path: '/struktur', exact: true, name: 'OrganizationStructure', element: OrganizationStructure, protected: false },
  { path: '/', exact: true, name: 'Home', element: Home, protected: false },
  // { path: '/berita', exact: true, name: 'Home', element: UnderConstruction, protected: false },
  { path: '/berita', exact: true, name: 'Home', element: NewsInformation, protected: false },
  { path: '/berita/:id', exact: true, name: 'Home', element: DetailNews, protected: false },
  // { path: '/kontak', exact: true, name: 'OurWater', element: Contacts },
  { path: '/penduduk', exact: true, name: 'House Map', element: HouseMap, protected: true },
  { path: '/kontak', exact: true, name: 'Kontak', element: Contacts, protected: false },
  { path: '/login', exact: true, name: 'Login', element: Login, protected: false },
  { path: '/register', exact: true, name: 'Register', element: Register, protected: false },
  { path: '/profile', exact: true, name: 'Profile', element: Profile, protected: true },
  { path: '/forgetpassword', exact: true, name: 'Lupa Password', element: ForgetPassword, protected: true },
  { path: '/admin/:pages', exact: true, name: 'Admin Page', element: AdminPage, protected: true },
  // { path: '/admin/banner', exact: true, name: 'Admin Page', element: AdminBannerPage, protected: false },
  // { path: '/admin/pengguna', exact: true, name: 'Admin Page', element: AdminPengguna, protected: false },
  // { path: '/admin/struktur-organisasi', exact: true, name: 'Admin Page', element: AdminStrukOr, protected: false },
  // { path: '/admin/list-data-warga', exact: true, name: 'Admin Page', element: AdminListDataWarga, protected: false },
]

export default routes
