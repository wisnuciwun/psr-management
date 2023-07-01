import axios from "axios";
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
import '../../pages/styles.css'
import { ExcelRenderer } from "react-excel-renderer";
import { Link, useLocation } from "react-router-dom";
import Banner from "./Banner";
import StrukOr from "./StrukOr";
import Pengguna from "./Pengguna";
import ListDataWarga from "./ListDataWarga";

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

  onDeleteDataCitizen = async (value) => { };

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
      <div style={{ padding: '15px' }}>
      <div className="bg-secondary-yellow">
        {(() => { 
            switch (window.location.href.split('/')[4]) {
              case 'banner':
                return (
                  <Banner dataImageBanners={this.state.dataImageBanners}
                  onDeleteDataBanners={this.onDeleteDataBanners}
                  onChangeDataBanners={this.onChangeDataBanners}
                  onPostDataBanners={this.onPostDataBanners}
                  />
                );
              
              case 'struktur-organisasi':
                return (
                  <StrukOr
                  dataOrganization={this.state.dataOrganization}
                  onDeleteDataOrganization={this.onDeleteDataOrganization}
                  onPostDataStructure={this.onPostDataStructure} 
                  dataTempOrganization={dataTempOrganization}
                  onChangeUploadImgOrganization={this.onChangeUploadImgOrganization}
                  onHandleChangeOrganizationData={this.onHandleChangeOrganizationData}
                  />
                );

              case 'pengguna' :
                return (
                  <Pengguna
                  dataUsers={this.state.dataUsers}
                  onGetDetailUser={this.onGetDetailUser}
                  onDeleteDataOrganization={this.onDeleteDataOrganization}
                  />
                );

              case 'list-data-warga' :
                return (
                  <ListDataWarga
                  dataCitizens={this.state.dataCitizens}
                  procFileHandler={this.procFileHandler}
                  onPostDataBulkCitizen={this.onPostDataBulkCitizen}
                  onPostDataCitizen={this.onPostDataCitizen}
                  dataTempCitizen={this.state.dataTempCitizen}
                  onHandleChangeCitizenData={this.onHandleChangeCitizenData}
                  />
                )
            
              default:
                break;
            }
           
        })()}
       
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
      </div>
    );
  }
}

export default Admin;
