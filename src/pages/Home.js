import { HomeCarousel } from "components";
import React, { Component, Fragment } from "react";
import { Button, Card, NavLink } from "react-bootstrap";
import OrganizationStructure from "./OrganizationStructure";
import Contacts from "./Contacts";

class Home extends Component {
  render() {
    return (
      <Fragment>
        <HomeCarousel />
        <div className="p-3">
          <h4 >Selayang Pandang</h4>
          <p>Selamat datang di website Baraya Swarga</p>
          {/* <video style={{ width: "100%" }} controls={false} autoPlay>
            <source src="assets/pengurus.mp4" type="video/mp4" />
          </video> */}
          <br />
          <NavLink>
            <h4>Berita</h4>
            {/* <Card className="p-0">
              <Card.Body>
                <p>23 Mar 2023</p>
                <img src="/assets/sample.png" alt="" />
                <p>
                  TPK BarayaSwarga mengikuti orientasi dalam percepatan
                  penurunan stunting
                </p>
                <div
                  className="d-flex justify-content-space-between"
                  style={{ gap: "10px" }}
                >
                  <Button className="w-50 btn-light">
                    <span className="color-primary-yellow">
                      <i className="fa fa-search">&nbsp;&nbsp;</i>
                      Baca
                    </span>
                  </Button>
                  <Button className="w-50 btn-light">
                    <span className="color-primary-yellow">
                      <i className="fa fa-sign-in">&nbsp;&nbsp;</i>
                      Selengkapnya
                    </span>
                  </Button>
                </div>
              </Card.Body>
            </Card> */}
          </NavLink>
          <div>Belum ada berita yang dapat ditampilkan.</div>
          <br />
          <NavLink>
            <h4>Struktur Organisasi</h4>
          </NavLink>
          <br />
          <OrganizationStructure />
          <br />
          <NavLink>
            <h4 className="mb-3">Hubungi Kami</h4>
          </NavLink>
          <Contacts />
        </div>
      </Fragment>
    );
  }
}

export default Home;
