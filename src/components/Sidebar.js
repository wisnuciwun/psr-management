import React from 'react'
import { Link } from 'react-router-dom'
import './styles.css'

const Sidebar = () => {
  return (
<div style={{paddingRight: '15px', width:'220px' }}>
        <div className='bg-secondary-yellow left'>
          <ul>
            <li>
              <Link to="/admin/banner">
                Banners
              </Link>             
            </li>
            <Link to="/admin/struktur-organisasi">
              <li>Struktur Organisasi</li>
            </Link>
            <Link to="/admin/pengguna">
              <li>Pengguna</li>
            </Link>
            <Link to="/admin/list-data-warga">
              <li>List Data Warga</li>
            </Link>

          </ul>
        </div>
    </div>
  )
}

export default Sidebar