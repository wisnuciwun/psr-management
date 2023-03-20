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
      fileCitizen: "",
      dataBanners: null,
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
    };
  }

  onGetDataBanners = () => {
    request.get("/backoffice/banners").then((res) => {
      if (res.data.code === 200) {
        this.setState({
          dataImageBanners: res.data.docs,
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

  onDeleteDataCitizen = async (value) => {};

  onHandleChangeCitizenData = (e) => {
    this.setState({
      dataTempCitizen: {
        ...this.state.dataTempCitizen,
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
        let names = ["id", "link"];
        let values = ["", ""];

        let fileObj = this.state.fileCitizen;

        ExcelRenderer(
          fileObj,
          (err, resp) => {
            if (err) {
              console.log(err);
            } else {
              for (let i = 1; i < resp.rows.length; i++) {
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
          },
          (event.target.value = ""),
          this.setState({ readyToInsert: [] })
        );
      }
    );
  };

  componentDidMount() {
    this.onGetDataBanners();
    this.onGetDataCitizens();
  }

  render() {
    let { dataTempCitizen, dataCitizens } = this.state;
    console.log("object", this.state.readyToInsert);
    return (
      <div>
        <Accordion defaultActiveKey="0">
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
            <Accordion.Body></Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="3">
            <Accordion.Header>Pengguna</Accordion.Header>
            <Accordion.Body></Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="3">
            <Accordion.Header>List Data Warga</Accordion.Header>
            <Accordion.Body>
              <FormControl
                placeholder="Pastikan format file adalah pdf"
                type="file"
                size="md"
                className="h-100"
                onChange={this.procFileHandler}
              />
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
              <div>
                <p>Input Data Warga</p>
                <Form onSubmit={this.onPostDataCitizen}>
                  <FormGroup className="mb-2">
                    <FormLabel className="mb-1">Nomor Kartu Keluarga</FormLabel>
                    <FormControl
                      className="input-no-decoration"
                      name="no_kk"
                      value={dataTempCitizen.no_kk}
                      onChange={this.onHandleChangeCitizenData}
                      required
                    />
                  </FormGroup>
                  <FormGroup className="mb-2">
                    <FormLabel className="mb-1">Nama Kepala Keluarga</FormLabel>
                    <FormControl
                      className="input-no-decoration"
                      name="nama_kepala_keluarga"
                      value={dataTempCitizen.nama_kepala_keluarga}
                      onChange={this.onHandleChangeCitizenData}
                      required
                    />
                  </FormGroup>
                  <FormGroup className="mb-2">
                    <FormLabel className="mb-1">Alamat</FormLabel>
                    <FormControl
                      className="input-no-decoration"
                      name="alamat"
                      value={dataTempCitizen.alamat}
                      onChange={this.onHandleChangeCitizenData}
                      required
                    />
                  </FormGroup>
                  <FormGroup className="mb-2">
                    <FormLabel className="mb-1">RT</FormLabel>
                    <FormControl
                      className="input-no-decoration"
                      name="rt"
                      value={dataTempCitizen.rt}
                      onChange={this.onHandleChangeCitizenData}
                      required
                    />
                  </FormGroup>
                  <FormGroup className="mb-2">
                    <FormLabel className="mb-1">RW</FormLabel>
                    <FormControl
                      className="input-no-decoration"
                      name="rw"
                      value={dataTempCitizen.rw}
                      onChange={this.onHandleChangeCitizenData}
                      required
                    />
                  </FormGroup>
                  <FormGroup className="mb-2">
                    <FormLabel className="mb-1">Kode Pos</FormLabel>
                    <FormControl
                      className="input-no-decoration"
                      name="kodepos"
                      value={dataTempCitizen.kodepos}
                      onChange={this.onHandleChangeCitizenData}
                      required
                    />
                  </FormGroup>
                  <FormGroup className="mb-2">
                    <FormLabel className="mb-1">Kelurahan</FormLabel>
                    <FormControl
                      className="input-no-decoration"
                      name="kelurahan"
                      value={dataTempCitizen.kelurahan}
                      onChange={this.onHandleChangeCitizenData}
                      required
                    />
                  </FormGroup>
                  <FormGroup className="mb-2">
                    <FormLabel className="mb-1">Kecamatan</FormLabel>
                    <FormControl
                      className="input-no-decoration"
                      name="kecamatan"
                      value={dataTempCitizen.kecamatan}
                      onChange={this.onHandleChangeCitizenData}
                      required
                    />
                  </FormGroup>
                  <FormGroup className="mb-2">
                    <FormLabel className="mb-1">Kota</FormLabel>
                    <FormControl
                      className="input-no-decoration"
                      name="kota"
                      value={dataTempCitizen.kota}
                      onChange={this.onHandleChangeCitizenData}
                      required
                    />
                  </FormGroup>
                  <FormGroup className="mb-2">
                    <FormLabel className="mb-1">Provinsi</FormLabel>
                    <FormControl
                      className="input-no-decoration"
                      name="provinsi"
                      value={dataTempCitizen.provinsi}
                      onChange={this.onHandleChangeCitizenData}
                      required
                    />
                  </FormGroup>
                  <Button className="mt-2 w-100 btn-success" type="submit">
                    Submit
                  </Button>
                </Form>
              </div>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    );
  }
}

export default Admin;
