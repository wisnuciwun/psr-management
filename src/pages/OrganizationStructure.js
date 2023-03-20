import { BadgeNotif } from "components/BadgeNotification";
import { data_member } from "constants/tempStructure";
import React, { Component, Fragment } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { Card, Modal, ModalBody, ModalHeader } from "react-bootstrap";
import groupBy from "utils/groupBy";

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
    let allData = groupBy(data_member, "group");
    let allNames = Object.keys(allData);

    return (
      <div className="p-3">
        <h5 className="mb-3">
          <i className="fa fa-shield" aria-hidden="true">
            &nbsp;&nbsp;
          </i>{" "}
          Visi Misi
        </h5>
        <div
          style={{ textJustify: "inter-word", textAlign: "justify" }}
          className="mb-4"
        >
          {/* <p className='font-weight-bold text-center'>PERATURAN DAN TATA TERTIB GRUP WHATSAPP INFO BARAYA SWARGA</p> */}
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
        <h5 className="mb-2">
          <i className="fa fa-users" aria-hidden="true">
            &nbsp;&nbsp;
          </i>{" "}
          Struktur Organisasi
        </h5>
        <div>
          {allNames.length != 0 &&
            allNames.map((w, id) => {
              return (
                <div className="w-100 d-flex flex-wrap mb-3">
                  <h5 className="mt-2 text-center w-100">{w}</h5>
                  {allData[w].map((v, idx) => {
                    return (
                      <Card
                        key={idx}
                        onClick={() => this.onHandleModalData(v)}
                        style={{
                          width: v.position === "Ketua" ? "100%" : "42%",
                          margin: "10px",
                          borderRadius: "10px",
                          height: "360px",
                          cursor: "pointer",
                          maxWidth: v.position === "Ketua" ? "100%" : "42%",
                        }}
                        body
                        className=""
                      >
                        <Card.Body className="font-lg aquas text-truncate">
                          {v.name}
                        </Card.Body>
                        <img
                          style={{
                            height: "230px",
                            objectFit: "cover",
                            borderRadius: "10px",
                          }}
                          src={v.img}
                          alt=""
                        />
                        <Card.Body className="mt-2">
                          <div className="font-md text-truncate">
                            {v.position}
                          </div>
                          <div className="font-md font-weight-bold">
                            {v.address}
                          </div>
                        </Card.Body>
                      </Card>
                    );
                  })}
                </div>
              );
            })}
        </div>
        <div>
          <h5 className="mb-2">
            <i className="fa fa-file-text" aria-hidden="true">
              &nbsp;&nbsp;
            </i>{" "}
            Dokumen
          </h5>
          <li>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://drive.google.com/uc?id=1ysyadaRHLxIhEA72UozPwjWx9oodWWFQ&export=download"
            >
              Unduh Dokumen SK Pengangkatan
            </a>
          </li>
          <li>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://drive.google.com/uc?id=1Z_LGyLbzF7WyKDPfikro75p0YvtiZXBq&export=download"
            >
              Unduh Tata Tertib
            </a>
          </li>
        </div>
        <Modal toggle={this.onHandleModalBio} centered isOpen={toggleModalBio}>
          <ModalHeader toggle={this.onHandleModalBio}>
            Biodata lengkap
          </ModalHeader>
          <ModalBody className="p-4">
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
            <div>Nama Lengkap</div>
            <div className="font-lg font-weight-bold text-primary">
              {selectedData.name}
            </div>
            <div>Nama Panggilan</div>
            <div className="font-lg font-weight-bold text-primary">
              {selectedData.nickName}
            </div>
            <div>Nomor HP</div>
            <div className="font-lg text-success font-weight-bold">
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
            <div>Jabatan</div>
            <div className="font-lg font-weight-bold">
              {selectedData.position}
            </div>
            <div>Email</div>
            <div className="font-lg font-weight-bold">{selectedData.email}</div>
            <div>Alamat Rumah</div>
            <div className="font-lg font-weight-bold">
              {selectedData.address}
            </div>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default OrganizationStructure;
