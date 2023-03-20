import { HomeCarousel } from "components";
import React, { Component, Fragment } from "react";
import { Card } from "react-bootstrap";

export class Home extends Component {
  render() {
    return (
      <Fragment>
        <HomeCarousel />
        <div className="p-3">
          <h4 className="mb-3">Selayang Pandang</h4>
          {/* <video style={{ width: "100%" }} controls={false} autoPlay>
            <source src="assets/pengurus.mp4" type="video/mp4" />
          </video> */}
          <h6>Berita</h6>
          <h6>Struktur Organisasi</h6>
          <h6>Kontak</h6>
        </div>
      </Fragment>
    );
  }
}

export default Home;
