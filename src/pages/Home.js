import { HomeCarousel } from "components";
import React, { Component, Fragment } from "react";
import { Card, CardBody, CardHeader, CardText, CardTitle } from "reactstrap";

export class Home extends Component {
  render() {
    return (
      <Fragment>
        <div>
          <HomeCarousel />
        </div>
        <div className="p-3">
          <h5 className="mb-3">
            <i className="fa fa-handshake-o" style={{ width: "25px" }}>
              &nbsp;&nbsp;
            </i>{" "}
            Selayang Pandang
          </h5>
          <video style={{ width: "100%" }} controls={false} autoPlay>
            <source src="assets/pengurus.mp4" type="video/mp4" />
          </video>
          <h5 className="mb-3">
            <i className="fa fa-info" style={{ width: "25px" }}>
              &nbsp;&nbsp;
            </i>{" "}
            Informasi Penting
          </h5>
          <Card className="p-0">
            <span className="text-center">
              Belum ada informasi tersedia untuk saat ini&nbsp;&nbsp;
              <i className="fa fa-frown-o" aria-hidden="true"></i>
            </span>
            {/* <CardHeader className='bg-info text-light aquas'>
                                   Pertemuan warga di Masjid
                              </CardHeader>
                              <CardBody>
                                   <CardText>
                                        Diharapkan semua warga kumpul tanggal 12 Desember 2022 di masjid untuk peresmian
                                   </CardText>

                              </CardBody>
                         </Card>
                         <Card className='mb-3'>
                              <CardHeader className='bg-info text-light aquas'>
                                   Kerja Bakti
                              </CardHeader>
                              <CardBody>
                                   <CardText>
                                       Pengurasan Toren dan pemasangan jalur pipa baru. Diharapkan semua warga kumpul di depan rumah pak Sihawhaw tanggal 10 Desember 2022
                                   </CardText>
                              </CardBody> */}
          </Card>
        </div>
      </Fragment>
    );
  }
}

export default Home;
