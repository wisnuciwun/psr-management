import React, { useState } from 'react';
import {
     Collapse,
     Navbar,
     NavbarToggler,
     NavbarBrand,
     Nav,
     NavItem,
     NavLink,
} from 'reactstrap';

function HomeNavbar(props) {
     const [collapsed, setCollapsed] = useState(true);

     const toggleNavbar = () => setCollapsed(!collapsed);

     return (
          <div>
               <Navbar color="faded" light>
                    <NavbarBrand href="/" className="me-auto">
                         <img className='img-logo' src="/assets/logo.png" alt="" />
                    </NavbarBrand>
                    <NavbarToggler onClick={toggleNavbar} className="me-2" />
                    <Collapse isOpen={!collapsed} navbar>
                         <Nav navbar>
                              {/* <NavItem>
                                   <NavLink>
                                        Tentang Kami
                                   </NavLink>
                              </NavItem> */}
                              <NavItem>
                                   <NavLink href='/'>
                                        <i style={{ width: '30px' }} className='fa fa-home'>&nbsp;</i>
                                        Beranda
                                   </NavLink>
                              </NavItem>
                              <NavItem>
                                   <NavLink href='/'>
                                        <i style={{ width: '30px' }} className='fa fa-newspaper-o'>&nbsp;</i>
                                        Berita
                                   </NavLink>
                              </NavItem>
                              <NavItem>
                                   <NavLink href='/struktur'>
                                        <i style={{ width: '30px' }} className='fa fa-users'>&nbsp;</i>
                                        Profile
                                   </NavLink>
                              </NavItem>
                              <NavItem>
                                   <NavLink href='/notulensi'>
                                        <i style={{ width: '30px' }} className='fa fa-phone'>&nbsp;</i>
                                        Kontak
                                   </NavLink>
                              </NavItem>
                              <NavItem>
                                   <NavLink href='/login'>
                                        <i style={{ width: '30px' }} className='fa fa-sign-in'>&nbsp;</i>
                                        Login/Register
                                   </NavLink>
                              </NavItem>
                         </Nav>
                    </Collapse>
               </Navbar>
          </div>
     );
}

export default HomeNavbar;