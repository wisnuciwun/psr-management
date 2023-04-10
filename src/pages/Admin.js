import axios, { Axios } from "axios";
import React, { Component } from "react";
import {
  Accordion,
  Button,
  Card,
  Col,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Modal,
  ModalBody,
  Row,
  Table,
} from "react-bootstrap";
import { getCookie } from "tiny-cookie";
import request from "utils/request";
import "bootstrap/dist/css/bootstrap.min.css";
import { ExcelRenderer } from "react-excel-renderer";

export class Admin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      readyToInsert: [],
      modalDetaiUser: false,
      fileCitizen: "",
      dataBanners: null,
      dataTempOrganization: {
        name: "",
        nickname: "",
        address: "",
        position: "",
        img: "",
        email: "",
        phone: "",
        group: "",
        order: 0,
      },
      dataTempCitizen: {
        no_kk: null,
        nama_kepala_keluarga: null,
        alamat: null,
        rt: null,
        rw: null,
        kodepos: null,
        kelurahan: null,
        kecamatan: null,
        kota: null,
        provinsi: null,
      },
      dataImageBanners: [],
      dataCitizens: [],
      dataOrganization: [],
      dataUsers: [],
      detailUser: {},
    };
  }

  onGetDetailUser = (value) => {
    request.get(`/backoffice/users/${value}`).then((res) => {
      if (res.data.code === 200) {
        this.setState({
          modalDetaiUser: true,
          detailUser: res.data.docs,
        });
      }
    });
  };

  onGetDataBanners = () => {
    request.get("/backoffice/banners").then((res) => {
      if (res.data.code === 200) {
        this.setState({
          dataImageBanners: res.data.docs,
        });
      }
    });
  };

  onGetDataUsers = () => {
    request.get("/backoffice/users").then((res) => {
      if (res.data.code === 200) {
        this.setState({
          dataUsers: res.data.docs,
        });
      }
    });
  };

  onGetDataCitizens = () => {
    request.get("/backoffice/citizens").then((res) => {
      if (res.data.code === 200) {
        this.setState({
          dataCitizens: res.data.docs,
        });
      }
    });
  };

  onChangeDataBanners = (e) => {
    this.setState({
      dataBanners: e.target.files[0],
    });
  };

  onChangeUploadImgOrganization = (e) => {
    this.setState({
      dataTempOrganization: {
        ...this.state.dataTempOrganization,
        img: e.target.files[0],
      },
    });
  };

  onPostDataCitizen = (e) => {
    e.preventDefault();
    e.stopPropagation();

    request
      .post("/backoffice/citizens", this.state.dataTempCitizen)
      .then(() => {
        setTimeout(() => {
          this.onGetDataCitizens();
        }, 500);
      });
  };

  onPostDataBulkCitizen = (e) => {
    request
      .post("/backoffice/citizens/batch", {
        citizens: this.state.readyToInsert,
      })
      .then(() => {
        setTimeout(() => {
          this.onGetDataCitizens();
          this.setState({
            readyToInsert: [],
          });
        }, 500);
      });
  };

  onPostDataBanners = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    let token = getCookie("token");
    const formData = new FormData();

    formData.append(
      "image",
      this.state.dataBanners,
      this.state.dataBanners.name
    );

    axios.defaults.headers.Authorization = `Bearer ${token}`;
    await axios
      .post(
        "https://api-dev.barayaswarga.com/api/v1/backoffice/banners",
        formData
      )
      .then(() => {
        setTimeout(() => {
          this.onGetDataBanners();
          this.setState({
            dataBanners: null,
          });
        }, 500);
      });
  };

  onDeleteDataBanners = async (value) => {
    await request.delete("/backoffice/banners", { uuid: value }).then(() => {
      setTimeout(() => {
        this.onGetDataBanners();
      }, 500);
    });
  };

  onDeleteDataOrganization = async (value) => {
    await request
      .delete("/backoffice/organizations", { uuid: value })
      .then(() => {
        setTimeout(() => {
          this.onGetDataStructure();
        }, 500);
      });
  };

  onDeleteDataCitizen = async (value) => {};

  onHandleChangeCitizenData = (e) => {
    this.setState({
      dataTempCitizen: {
        ...this.state.dataTempCitizen,
        [e.target.name]: e.target.value,
      },
    });
  };

  onHandleChangeOrganizationData = (e) => {
    this.setState({
      dataTempOrganization: {
        ...this.state.dataTempOrganization,
        [e.target.name]: e.target.value,
      },
    });
  };

  procFileHandler = (event) => {
    this.setState(
      {
        fileCitizen: event.target.files[0],
      },
      () => {
        let names = [
          "no_kk",
          "nama_kepala_keluarga",
          "alamat",
          "rt",
          "rw",
          "kodepos",
          "kelurahan",
          "kecamatan",
          "provinsi",
          "kota",
        ];
        let values = ["", "", "", "", "", "", "", "", "", ""];

        let fileObj = this.state.fileCitizen;

        ExcelRenderer(
          fileObj,
          (err, resp) => {
            if (err) {
              console.log(err);
            } else {
              for (let i = 1; i < resp.rows.length; i++) {
                if (resp.rows[i].length != 0) {
                  for (let z = 0; z < names.length; z++) {
                    values[z] = resp.rows[i][z];
                  }
                  let jsonEntries = new Map();
                  jsonEntries.set(names, values);
                  let temp = Object.assign(
                    ...names.map((k, i) => ({ [k]: values[i] }))
                  );

                  this.setState((state) => {
                    const readyToInsert = [...state.readyToInsert, temp];
                    temp = Object.assign(...names.map((k, i) => ({ [k]: "" })));
                    return { readyToInsert, temp };
                  });
                }
              }
            }
          },
          (event.target.value = ""),
          this.setState({ readyToInsert: [] })
        );
      }
    );
  };

  onGetDataStructure = () => {
    request.get("/backoffice/organizations").then((res) => {
      if (res.data.code === 200) {
        this.setState({
          dataOrganization: res.data.docs,
        });
      }
    });
  };

  onPostDataStructure = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const formData = new FormData();
    let token = getCookie("token");

    formData.append(
      "img",
      this.state.dataTempOrganization.img,
      this.state.dataTempOrganization.img.name
    );

    axios.defaults.headers.Authorization = `Bearer ${token}`;
    await axios
      .post(
        "https://api-dev.barayaswarga.com/api/v1/backoffice/organizations",
        this.state.dataTempOrganization
      )
      .then(() => {
        setTimeout(() => {
          this.onGetDataBanners();
          this.setState({
            dataBanners: null,
          });
        }, 500);
      });

    request
      .post("/backoffice/organizations", this.state.dataTempOrganization)
      .then(() => {
        setTimeout(() => {
          this.onGetDataCitizens();
          this.setState({
            dataTempOrganization: {
              name: "",
              nickname: "",
              address: "",
              position: "",
              img: "",
              email: "",
              phone: "",
              group: "",
              order: 0,
            },
          });
        }, 500);
      });
  };

  // address: "B3 04";
  // appellation: null;
  // blok: "B3";
  // blood_type: null;
  // createdAt: "2023-02-23T05:43:31.000Z";
  // email: "darmajati.rangga@gmail.com";
  // family_card_number: "7378884777166";
  // full_name: "Test warga 2";
  // height: null;
  // home_number: "04";
  // id: 6;
  // identity_number: "3209487727001";
  // image: null;
  // image_url: null;
  // is_active: true;
  // mother_name: null;
  // nickname: null;
  // phone: "628537376611";
  // religion: null;
  // tos: true;
  // type: "contract";
  // updatedAt: "2023-02-24T08:02:28.000Z";
  // uuid: "e72cb7b5-17c1-4e5a-bf3b-6991ec5b9e04";
  // verified: true;
  // weight: null;

  componentDidMount() {
    this.onGetDataBanners();
    this.onGetDataCitizens();
    this.onGetDataStructure();
    this.onGetDataUsers();
  }

  render() {
    let {
      dataTempCitizen,
      dataCitizens,
      dataTempOrganization,
      dataOrganization,
      dataUsers,
      detailUser,
      modalDetaiUser,
    } = this.state;

    return (
      <div style={{paddingLeft: '15px', paddingRight: '15px', paddingBottom: '15px'}}>
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Banners</Accordion.Header>
            <Accordion.Body>
              <div>
                <p>List Gambar Banner</p>
                <div
                  className="d-flex"
                  style={{ gap: "8px", overflowX: "scroll" }}
                >
                  {this.state.dataImageBanners.length != 0 &&
                    this.state.dataImageBanners.map((x) => {
                      return (
                        <Card
                          onClick={() => this.onDeleteDataBanners(x.uuid)}
                          className="d-flex justify-content-center align-items-center"
                          style={{
                            cursor: "pointer",
                            height: "100px",
                            width: "120px",
                          }}
                        >
                          <img className="w-100" src={x.image_url} alt="" />
                          <div
                            className="position-absolute bg-light d-flex justify-content-center align-items-center"
                            style={{
                              borderRadius: "50%",
                              height: "25px",
                              width: "25px",
                              opacity: "80%",
                            }}
                          >
                            <i className="fa fa-trash text-dark"></i>
                          </div>
                        </Card>
                      );
                    })}
                </div>
              </div>
              <br />
              <div>
                <FormGroup
                  onSubmit={this.onPostDataBanners}
                  controlId="formFile"
                  className="mb-3"
                >
                  <FormLabel>Upload Foto Banner</FormLabel>
                  <div className="d-flex" style={{ gap: "8px" }}>
                    <FormControl
                      placeholder="Pastikan format file adalah pdf"
                      type="file"
                      size="md"
                      className="h-100"
                      onChange={this.onChangeDataBanners}
                    />
                    <Button type="submit" onClick={this.onPostDataBanners}>
                      Upload
                    </Button>
                  </div>
                </FormGroup>
              </div>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Struktur Organisasi</Accordion.Header>
            <Accordion.Body>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Nama</th>
                    <th>Nama Panggilan</th>
                    <th>Alamat</th>
                    <th>Posisi</th>
                    <th>Foto</th>
                    <th>Email</th>
                    <th>Nomor HP</th>
                    <th>Grup</th>
                    <th>Order</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {dataOrganization.length != 0 &&
                    dataOrganization.map((x, id) => {
                      return (
                        <tr>
                          <td>{x.name}</td>
                          <td>{x.nickname}</td>
                          <td>{x.address}</td>
                          <td>{x.position}</td>
                          <td>{x.img}</td>
                          <td>{x.email}</td>
                          <td>{x.phone}</td>
                          <td>{x.group}</td>
                          <td>{x.order}</td>
                          <td>
                            {" "}
                            <i
                              onClick={() =>
                                this.onDeleteDataOrganization(x.uuid)
                              }
                              className="fa fa-trash text-dark pointer"
                            ></i>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </Table>
              <Form onSubmit={this.onPostDataStructure}>
                {Object.keys(dataTempOrganization).map((v) => {
                  if (v === "img") {
                    return (
                      <FormGroup controlId="formFile" className="mb-3">
                        <FormLabel>{v}</FormLabel>
                        <FormControl
                          placeholder="Pastikan format file adalah pdf"
                          type="file"
                          size="md"
                          className="h-100"
                          onChange={this.onChangeUploadImgOrganization}
                        />
                      </FormGroup>
                    );
                  } else {
                    return (
                      <>
                        <FormGroup className="mb-2">
                          <FormLabel className="mb-1">{v}</FormLabel>
                          <FormControl
                            className="input-no-decoration"
                            name={`${v}`}
                            value={dataTempOrganization[v]}
                            onChange={this.onHandleChangeOrganizationData}
                            required
                          />
                        </FormGroup>
                      </>
                    );
                  }
                })}
                <Button className="mt-2 w-100 btn-primary-yellow" type="submit">
                  Submit
                </Button>
              </Form>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="3">
            <Accordion.Header>Pengguna</Accordion.Header>
            <Accordion.Body>
              <div style={{ overflowX: "scroll" }}>
                <Table
                  striped
                  bordered
                  hover
                  style={{ overflowX: "scroll", width: "500px" }}
                >
                  <thead>
                    <tr>
                      <th>Nama Lengkap</th>
                      <th>Alamat</th>
                      <th>Appelation</th>
                      <th>Blok</th>
                      <th>Golongan Darah</th>
                      <th>Dibuat tanggal</th>
                      <th>Email</th>
                      <th>Nomor HP</th>
                      <th>Nomor KK</th>
                      <th>Tinggi</th>
                      <th>Nomor Rumah</th>
                      <th>Nomor KTP</th>
                      <th>Foto</th>
                      <th>Url Foto</th>
                      <th>Aktif</th>
                      <th>Nama Ibu</th>
                      <th>Nama Panggilan</th>
                      <th>TOS</th>
                      <th>Jenis Tempat Tinggal</th>
                      <th>Verified</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataUsers.length != 0 &&
                      dataUsers.map((x, id) => {
                        return (
                          <tr>
                            <td onClick={() => this.onGetDetailUser(x.uuid)}>
                              {x.full_name}
                            </td>
                            <td>{x.address}</td>
                            <td>{x.appellation}</td>
                            <td>{x.blok}</td>
                            <td>{x.position}</td>
                            <td>{x.blood_type}</td>
                            <td>{x.createdAt}</td>
                            <td>{x.email}</td>
                            <td>{x.family_card_number}</td>
                            <td>{x.height}</td>
                            <td>{x.home_number}</td>
                            <td>{x.identity_number}</td>
                            <td>{x.image}</td>
                            <td
                             
                            >
                              {x.image_url}
                            </td>
                            <td>{x.is_active}</td>
                            <td>{x.mother_name}</td>
                            <td>{x.nickname}</td>
                            <td>{x.religion}</td>
                            <td>{x.tos}</td>
                            <td>{x.type}</td>
                            <td>{x.verified}</td>
                            <td>
                              {" "}
                              <i
                                onClick={() =>
                                  this.onDeleteDataOrganization(x.uuid)
                                }
                                className="fa fa-trash text-dark pointer"
                              ></i>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </Table>
              </div>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="4">
            <Accordion.Header>List Data Warga</Accordion.Header>
            <Accordion.Body>
              <FormGroup>
                <FormLabel style={{ fontWeight: "600" }}>
                  Upload Massal Via Excel
                </FormLabel>
                <div className="d-flex mb-3" style={{ gap: "8px" }}>
                  <FormControl
                    placeholder="Pastikan format file adalah xlsx atau xls"
                    type="file"
                    size="md"
                    className="h-100"
                    onChange={this.procFileHandler}
                  />
                  <Button type="submit" onClick={this.onPostDataBulkCitizen}>
                    Upload
                  </Button>
                </div>
              </FormGroup>
              <div style={{ overflowX: "scroll" }}>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Nomor Kartu Keluarga</th>
                      <th>Nama Kepala Keluarga</th>
                      <th>Alamat</th>
                      <th>RT</th>
                      <th>RW</th>
                      <th>Kode Pos</th>
                      <th>Kelurahan</th>
                      <th>Kecamatan</th>
                      <th>Kota</th>
                      <th>Provinsi</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataCitizens.length != 0 &&
                      dataCitizens.map((x, id) => {
                        return (
                          <tr>
                            <td>{x.no_kk}</td>
                            <td>{x.nama_kepala_keluarga}</td>
                            <td>{x.alamat}</td>
                            <td>{x.rt}</td>
                            <td>{x.rw}</td>
                            <td>{x.kodepos}</td>
                            <td>{x.kelurahan}</td>
                            <td>{x.kecamatan}</td>
                            <td>{x.kota}</td>
                            <td>{x.provinsi}</td>
                            <td>
                              {" "}
                              <i className="fa fa-trash text-dark pointer"></i>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </Table>
              </div>
              <div className="mt-3">
                <p className="mb-1" style={{ fontWeight: "600" }}>
                  Input Data Warga Manual
                </p>
                <Form onSubmit={this.onPostDataCitizen}>
                  {Object.keys(dataTempCitizen).map((x) => {
                    return (
                      <FormGroup className="mb-2">
                        <FormLabel className="mb-1">{x}</FormLabel>
                        <FormControl
                          className="input-no-decoration"
                          name={x}
                          value={dataTempCitizen[`${x}`]}
                          onChange={this.onHandleChangeCitizenData}
                          required
                        />
                      </FormGroup>
                    );
                  })}
                  <Button className="mt-2 w-100 btn-success" type="submit">
                    Submit
                  </Button>
                </Form>
              </div>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        <Modal
          show={modalDetaiUser}
          onHide={() =>
            this.setState({
              modalDetaiUser: false,
            })
          }
        >
          <ModalBody>
            <Row>
              <Col>
                {Object.keys(detailUser).map((x) => {
                  return <div>{x}</div>;
                })}
              </Col>
              <Col>
                {Object.values(detailUser).map((x) => {
                  return <div>{`${x}` || ""}</div>;
                })}
              </Col>
            </Row>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default Admin;
