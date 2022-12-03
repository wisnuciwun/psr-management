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
                                        Struktur Organisasi
                                   </NavLink>
                              </NavItem>
                              <NavItem>
                                   <NavLink>
                                        Notulensi
                                   </NavLink>
                              </NavItem>
                              <NavItem>
                                   <NavLink>
                                        Denah Rumah
                                   </NavLink>
                              </NavItem>
                              <NavItem>
                                   <NavLink>
                                        Air Swadaya
                                   </NavLink>
                              </NavItem>
                              <NavItem>
                                   <NavLink>
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