import { BadgeNotif } from "components/BadgeNotification";
import { data_member } from "constants/tempStructure";
import React, { Component, Fragment } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { Card, Modal, ModalBody, ModalHeader } from "react-bootstrap";
import { utils } from "utils";

export class OrganizationStructure extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedData: {
        name: "",
        nickName: "",
        position: "",
        phone: "",
        email: "",
        address: "",
        img: "",
      },
      toggleModalBio: false,
    };
  }

  onHandleModalBio = () => {
    this.setState({
      toggleModalBio: !this.state.toggleModalBio,
    });
  };

  onHandleModalData(value) {
    this.setState(
      {
        selectedData: value,
      },
      () => this.onHandleModalBio()
    );
  }

  render() {
    const { selectedData, toggleModalBio } = this.state;
    let allData = utils.groupBy(data_member, "group");
    let allNames = Object.keys(allData);

    return (
      <div className={window.location.pathname === '/struktur' ? 'p-3': ''}>
        <h5 className="mb-3 text-center">Visi Misi</h5>
        <div
          style={{ textJustify: "inter-word", textAlign: "justify" }}
          className="mb-4"
        >
          <p>
            Visi :
            <br />
            Menjadi pengurus yang interaktif, responsible, agamis, humanis dan
            mempererat tali persaudaraan agar bersinergi dalam menciptakan
            inovasi-inovasi baru nantinya dapat berguna bagi masyarakat.
          </p>
          <p>
            Misi
            <br />
            <ol style={{ marginLeft: "-25px" }}>
              <li>
                Membangun kepengurusan yang profesional dan kekeluargaan,
                merangkul semua warga.
              </li>
              <li>
                Memberi fasilitas dan pengembangan minat dan bakat sesuai
                kebutuhan dan keinginan warga.
              </li>
              <li>
                Menguatkan media aspirasi dan membangun kerja sama yang
                strategis.
              </li>
              <li>
                Memberikan informasi penting melalui media informasi dan
                digitalisasi.
              </li>
              <li>
                Mengadakan kegiatan sosial bersama yang bermanfaat, turun
                langsung menjaga kebersihan lingkungan.
              </li>
              <li>
                Menyusun program kerja sesuai dengan bidang-bidang yang ada
                dalam kepengurusan sebagai salah satu penunjang kesejahteraan
                warga.
              </li>
            </ol>
          </p>
        </div>
        <div className="mb-4">
          {allNames.length != 0 &&
            allNames.map((w, id) => {
              return (
                <div
                  style={{ gap: "8px" }}
                  className="w-100 d-flex flex-wrap mb-1"
                >
                  <h5 className="mt-2 text-center w-100">{w}</h5>
                  {allData[w].map((v, idx) => {
                    return (
                      <Card
                        key={idx}
                        onClick={() => this.onHandleModalData(v)}
                        style={{
                          maxWidth: v.position === "Ketua" ? "100%" : "48.5%",
                        }}
                        className={v.position === "Ketua" ? "w-100" : "w-50"}
                      >
                        <img
                          style={{
                            height: "230px",
                            objectFit: "cover",
                          }}
                          src={v.img}
                          alt=""
                        />
                        <Card.Body className="font-md font-weight-bold text-truncate">
                          <div className="font-md text-truncate font-weight-bold">
                            {v.name}
                          </div>
                          <div className="font-sm text-truncate">
                            {v.position}
                          </div>
                          <div className="font-sm">{v.address}</div>
                        </Card.Body>
                      </Card>
                    );
                  })}
                </div>
              );
            })}
        </div>
        <div className="mb-2">
          <h5 className="mb-2 text-center">Kotak Aspirasi</h5>
          <div className="mb-2">
            Apabila anda memiliki keluhan, kritik maupun saran. Anda dapat
            menggunakan link dibawah ini untuk mengisi Kotak Aspirasi. Semua
            akan ditampung dan disampaikan langsung ke pengurus Prima Swarga
            Residence.
          </div>
          <a
            target="_blank"
            style={{ textDecoration: "none" }}
            href="https://forms.gle/L7WffCsYveH8DYaCA"
          >
            Klik disini
          </a>
        </div>
        {/* <div>
          <h5 className="mb-2 text-center">Dokumen</h5>
          <a
            style={{ textDecoration: "none" }}
            target="_blank"
            rel="noopener noreferrer"
            href="https://drive.google.com/uc?id=1ysyadaRHLxIhEA72UozPwjWx9oodWWFQ&export=download"
          >
            Unduh Dokumen SK Pengangkatan
          </a>
          <br />
          <a
            style={{ textDecoration: "none" }}
            target="_blank"
            rel="noopener noreferrer"
            href="https://drive.google.com/uc?id=1Z_LGyLbzF7WyKDPfikro75p0YvtiZXBq&export=download"
          >
            Unduh Tata Tertib
          </a>
        </div> */}
        <Modal onHide={this.onHandleModalBio} centered show={toggleModalBio}>
          <ModalHeader closeButton>Biodata lengkap</ModalHeader>
          <ModalBody className="p-3">
            <div className="d-flex justify-content-center">
              <img
                src={selectedData.img}
                style={{
                  height: "300px",
                  width: "100%",
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
                alt=""
              />
            </div>
            <br />
            <div className="font-md">Nama Lengkap</div>
            <div className="font-md font-weight-bold text-primary">
              {selectedData.name}
            </div>
            <div className="font-md">Nama Panggilan</div>
            <div className="font-md font-weight-bold text-primary">
              {selectedData.nickName}
            </div>
            <div className="font-md">Nomor HP</div>
            <div className="font-md text-success font-weight-bold">
              {selectedData.phone}
              &nbsp;&nbsp;
              <CopyToClipboard
                onCopy={() => {
                  BadgeNotif.show({
                    text: "Nomor berhasil dicopy !",
                    variant: "success",
                  });
                }}
                text={selectedData.phone}
              >
                <i className="fa fa-clone fa-sm text-dark"></i>
              </CopyToClipboard>
            </div>
            <div className="font-md">Jabatan</div>
            <div className="font-md font-weight-bold">
              {selectedData.position}
            </div>
            <div className="font-md">Email</div>
            <div className="font-md font-weight-bold">{selectedData.email}</div>
            <div className="font-md">Alamat Rumah</div>
            <div className="font-md font-weight-bold">
              {selectedData.address}
            </div>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default OrganizationStructure;
