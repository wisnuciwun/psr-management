import { BadgeNotif } from "components/BadgeNotification";
import React, { Component } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { Card, Modal, ModalBody, ModalHeader } from "react-bootstrap";
import { utils } from "utils";
import request from "utils/request";

class OrganizationStructure extends Component {
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
      data_member: []
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

  onGetDataStructure = async () => {
    await request.get("/ext/organizations").then((res) => {
      if (res.data.code === 200) {
        this.setState({
          data_member: res.data.docs,
        });
      }
    });
  };

  componentDidMount = () => {
    this.onGetDataStructure()
  }

  render() {
    const { selectedData, toggleModalBio } = this.state;
    let allData = this.state.data_member.length != 0 ? utils.groupBy(this.state.data_member, "group") : [];
    let allNames = allData.length != 0 ? Object.keys(allData) : [];

    return (
      <div className={window.location.pathname === "/struktur" ? "p-3" : ""}>
        <h5 className="mb-3 text-center">Visi Misi</h5>
        <div
          style={{ textJustify: "inter-word", textAlign: "justify" }}
          className="mb-4"
        >
          <p>
            Visi :
            <br />
            Terwujudnya Masyarakat Lingkungan Prima Swarga Residence Desa Wargaluyu yang Bermartabat, Agamis, Kreatif, Sauyunan dan Digitalis.
          </p>
          <p>
            Misi :
            <br />
            <ol style={{ marginLeft: "-25px" }}>
              <li style={{ margin: '0', padding: '0.2em' }}>
                Membangun Kualitas Sumber Daya Manusia dibidang Pendidikan, Kesehatan dan Keagamaan melalui Digitalisasi.
              </li>
              <li style={{ margin: '0', padding: '0.2em' }}>
                Meningkatkan Pelayanan Publik dan Membangun Pelayanan Kebutuhan Administrasi Berbasis Informasi dan Teknologi (IT).
              </li>
              <li style={{ margin: '0', padding: '0.2em' }}>
                Perbaikan Tata Kelola Organisasi dan Pemulihan Keseimbangan Lingkungan yang berkelanjutan Berlandaskan Sauyunan dan Kerukunan Hidup Bertetangga.
              </li>
              <li style={{ margin: '0', padding: '0.2em' }}>
                Menggali dan Menumbuhkembangkan Potensi Masyarakat serta Melestarikan Budaya Tradisional dan Kearifan Lokal.
              </li>
              <li style={{ margin: '0', padding: '0.2em' }}>
                Memelihara Ketersediaan dan Kualitas Infrastruktur serta Keterpaduan Pemanfaatan Tata Ruang Wilayah Prima Swarga Residence.
              </li>
              <li style={{ margin: '0', padding: '0.2em' }}>
                Meningkatkan Partisipasi Sektor Swasta dan Pemberdayaan Ekonomi Kerakyatan yang berdaya saing.
              </li>
              <li style={{ margin: '0', padding: '0.2em' }}>
                Membangun dan Meningkatkan hubungan Kemasyarakatan dengan Nilai Gotong Royong dan Kepedulian Sosial.
              </li>
            </ol>
          </p>
        </div>
        <div className="mb-4">
          {allNames.length != 0 &&
            allNames.map((w, id) => {
              return (
                <div className="mb-1 mt-3">
                  <h5 className="mt-2 text-center w-100">{w}</h5>
                  <div
                    className="d-flex"
                    style={{ overflowX: "scroll", gap: "8px" }}
                  >
                    {allData[w].map((v, idx) => {
                      return (
                        <Card
                          key={idx}
                          onClick={() => this.onHandleModalData(v)}
                          style={{ minWidth: "50%" }}
                        >
                          <img
                            style={{
                              height: "230px",
                              objectFit: "cover",
                            }}
                            src={v.image_url}
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
        <div className="d-flex justify-content-center">
          <Modal backdropClassName="custom-backdrop" onHide={this.onHandleModalBio} centered show={toggleModalBio}>
            <ModalHeader className="font-lg font-weight-bold" closeButton>Biodata lengkap</ModalHeader>
            <ModalBody className="p-3">
              <div className="d-flex justify-content-center">
                <img
                  src={selectedData.image_url}
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
              <div className="font-md font-weight-bold">
                {selectedData.name}
              </div>
              <div className="font-md">Nama Panggilan</div>
              <div className="font-md font-weight-bold">
                {selectedData.nickName}
              </div>
              <div className="font-md">Nomor HP</div>
              <div className="font-md text-primary font-weight-bold">
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
              <div className="font-md font-weight-bold">
                {selectedData.email}
              </div>
              <div className="font-md">Alamat Rumah</div>
              <div className="font-md font-weight-bold">
                {selectedData.address}
              </div>
            </ModalBody>
          </Modal>
        </div>
      </div>
    );
  }
}

export default OrganizationStructure;
