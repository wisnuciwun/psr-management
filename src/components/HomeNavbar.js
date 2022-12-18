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
                                   <NavLink href='/struktur'>
                                        <i  style={{width: '30px'}} className='fa fa-sitemap'>&nbsp;</i>
                                        Struktur Organisasi
                                   </NavLink>
                              </NavItem>
                              <NavItem>
                                   <NavLink href='/notulensi'>
                                        <i style={{width: '30px'}} className='fa fa-file-text'>&nbsp;</i>
                                        Notulensi
                                   </NavLink>
                              </NavItem>
                              <NavItem>
                                   <NavLink href='/denah'>
                                        <i style={{width: '30px'}} className='fa fa-map'>&nbsp;</i>
                                        Denah Rumah
                                   </NavLink>
                              </NavItem>
                              <NavItem>
                                   <NavLink href='/kontak'>
                                        <i style={{width: '30px'}} className='fa fa-phone'>&nbsp;</i>
                                        Kontak Penting
                                   </NavLink>
                              </NavItem>
                         </Nav>
                    </Collapse>
               </Navbar>
          </div>
     );
}

export default HomeNavbar;