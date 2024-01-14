import { getLoginData } from "config/redux/rootAction";
import React, { useEffect, useState } from "react";
import {
  Collapse,
  Container,
  Navbar,
  // NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Offcanvas,
  NavDropdown,
  Form,
  Button,
  Dropdown,
  OverlayTrigger,
  Popover,
  Card,
} from "react-bootstrap";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";
import { connect, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { getCookie, removeCookie } from "tiny-cookie";

function HomeNavbar(props) {
  const [collapsed, setCollapsed] = useState(true);
  const dispatch = useDispatch();
  const isLogin = getCookie("token");
  const pagePosition = window.location.pathname;
  let expand = false;
  let navigate = useNavigate();
  const role = props.userbasedata?.user_role?.role?.name;

  const handleLogout = () => {
    dispatch(getLoginData({}));
    removeCookie("token");
    navigate("/");
  };

  const toggleNavbar = () => setCollapsed(!collapsed);

  return (
    <div>
      <Navbar
        key={expand}
        expand={expand}
        className="mb-3 bg-secondary-yellow pb-3 pt-2"
      >
        <Container fluid>
          <Navbar.Toggle
            style={{ border: "none" }}
            className="no-outline"
            aria-controls={`offcanvasNavbar-expand-${expand}`}
          />
          <div className="d-flex align-items-center" style={{ gap: "10px" }}>
            <OverlayTrigger
              trigger="click"
              key="news-notification"
              placement="bottom"
              overlay={
                <Popover className="mt-4" id="news-notification">
                  <Popover.Header as="h3">Notifikasi</Popover.Header>
                  <Popover.Body>
                    <p>Belum ada notifikasi saat ini</p>
                    {/* <Card className="mb-2">
                      <Card.Body>
                        Undangan untuk menghadiri peresmian masjid
                      </Card.Body>
                    </Card>
                    <Card className="mb-2">
                      <Card.Body className="w-100" style={{ width: "200px" }}>
                        Anda belum membayar iuran bulan ini
                      </Card.Body>
                    </Card> */}
                  </Popover.Body>
                </Popover>
              }
            >
              <i className="fa fa-bell-o fa-lg"></i>
            </OverlayTrigger>
            {isLogin ? (
              <div>
                <Dropdown drop="down">
                  <Dropdown.Toggle
                    style={{
                      borderRadius: "64px",
                      width: "86px",
                      backgroundColor: "inherit",
                    }}
                    variant="secondary"
                  >
                    <span
                      style={{
                        borderRadius: "50%",
                        width: "25px",
                        height: "25px",
                        backgroundColor: `#${Math.floor(
                          Math.random() * 16777215
                        ).toString(16)}`,
                        display: "inline-block",
                      }}
                    >
                      {Object.keys(props.userbasedata).length != 0 ? props.userbasedata?.full_name[0].toUpperCase() : ''}
                    </span>
                  </Dropdown.Toggle>
                  <DropdownMenu style={{ marginLeft: "-70px" }}>
                    <DropdownItem
                      onClick={() =>
                        navigate(
                          role === "Superadmin" ? "/admin/banner" : "/profile"
                        )
                      }
                    >
                      {role === "Superadmin" ? "Admin Page" : "Profile"}
                    </DropdownItem>
                    {isLogin !== null ? (
                      <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
                    ) : (
                      <DropdownItem onClick={() => navigate("/")}>
                        Login/Register
                      </DropdownItem>
                    )}
                  </DropdownMenu>
                </Dropdown>
              </div>
            ) : (
              <Link
                to="/login"
                style={{ textDecoration: "none", color: "black" }}
              >
                <div
                  className="bg-light pl-3 pr-3 pb-1 pt-1"
                  style={{
                    borderRadius: "25px",
                    width: "90px",
                    textAlign: "center",
                  }}
                >
                  <i
                    style={{ color: "#FEC439" }}
                    className="fa fa-user-o fa-lg"
                  ></i>
                  <span style={{ color: "#FEC439" }}>
                    &nbsp;&nbsp;&nbsp;Login
                  </span>
                </div>
              </Link>
            )}
          </div>
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-${expand}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
            placement="start"
            className="bg-primary-green"
            style={{ color: "white" }}
          >
            <Offcanvas.Header
              className="d-flex justify-content-end"
              closeButton
            ></Offcanvas.Header>
            <div className="d-flex justify-content-center mb-3">
              <img src="/assets/logo3.png" style={{ width: "100px" }} alt="" />
            </div>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link
                  href="/"
                  className={`${pagePosition === "/" && "bg-selected-menu"
                    } d-flex align-items-center p-2`}
                >
                  <i style={{ width: "35px" }} className="fa fa-home fa-lg">
                    &nbsp;
                  </i>
                  <span className="font-lg">Beranda</span>
                </Nav.Link>
                {/* {isLogin != null && (
                  <Nav.Link
                    href="/penduduk"
                    className={`${
                      pagePosition === "/penduduk" && "bg-selected-menu"
                    } d-flex align-items-center p-2`}
                  >
                    <i style={{ width: "35px" }} className="fa fa-search fa-lg">
                      &nbsp;
                    </i>
                    <span className="font-lg">Pencarian Penduduk</span>
                  </Nav.Link>
                )} */}
                {/* <Nav.Link
                  href="/berita"
                  className={`${pagePosition === "/berita" && "bg-selected-menu"
                    } d-flex align-items-center p-2`}
                >
                  <i
                    style={{ width: "35px" }}
                    className="fa fa-newspaper-o fa-lg"
                  >
                    &nbsp;
                  </i>
                  <span className="font-lg">Berita</span>
                </Nav.Link> */}
                <Nav.Link
                  href="/struktur"
                  className={`${pagePosition === "/struktur" && "bg-selected-menu"
                    } d-flex align-items-center p-2`}
                >
                  <i style={{ width: "35px" }} className="fa fa-users fa-lg">
                    &nbsp;
                  </i>
                  <span className="font-lg">Struktur Organisasi</span>
                </Nav.Link>
                <Nav.Link
                  href="/kontak"
                  className={`${pagePosition === "/kontak" && "bg-selected-menu"
                    } d-flex align-items-center p-2`}
                >
                  <i style={{ width: "35px" }} className="fa fa-phone fa-lg">
                    &nbsp;
                  </i>
                  <span className="font-lg">Kontak</span>
                </Nav.Link>
                {isLogin !== null ? (
                  <Nav.Link
                    href="/profile"
                    className={`${pagePosition === "/profile" && "bg-selected-menu"
                      } d-flex align-items-center p-2`}
                  >
                    <i
                      style={{ width: "35px" }}
                      className="fa fa-user fa-lg"
                      aria-hidden="true"
                    >
                      &nbsp;
                    </i>
                    <span className="font-lg">Profile</span>
                  </Nav.Link>
                ) : (
                  <Nav.Link
                    href="/login"
                    className={`${pagePosition === "/login" && "bg-selected-menu"
                      } d-flex align-items-center p-2`}
                  >
                    <i
                      style={{ width: "35px" }}
                      className="fa fa-sign-in fa-lg"
                    >
                      &nbsp;
                    </i>
                    <span className="font-lg">Login/Register</span>
                  </Nav.Link>
                )}
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </div>
  );
}

// export default HomeNavbar;
function mapStateToProps(state) {
  return state;
}
export default connect(mapStateToProps)(HomeNavbar);
