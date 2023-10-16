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
import "../../pages/styles.css";
import { ExcelRenderer } from "react-excel-renderer";
import { Link, useLocation } from "react-router-dom";
import Banner from "./Banner";
import StrukOr from "./StrukOr";
import Pengguna from "./Pengguna";
import ListDataWarga from "./ListDataWarga";
import Register from "./Register";
import "../../fontawesome/css/font-awesome.min.css";
import { BadgeNotif } from "components/BadgeNotification";
import Resizer from "react-image-file-resizer";

export class Admin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      readyToInsert: [],
      modalDetaiUser: false,
      modalStrukturOr: false,
      citizensTotalPage: 1,
      structureTotalPage: 1,
      fileCitizen: "",
      fileUser: "",
      progressUser: 0,
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
      dataOrganizationChange: false,
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
    request.get("/ext/banners").then((res) => {
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
        if (localStorage.getItem('page') == undefined) {
          localStorage.setItem('page', 1)
        }
        this.setState({
          dataCitizens: res.data.docs,
          citizensTotalPage: res.data.pages
        });
      }
    });
  };

  onCitizenPagination = (page) => {
    request.get("/backoffice/citizens", { page: page }).then((res) => {
      localStorage.setItem('page', page + 1)
      if (res.data.code === 200) {
        if (localStorage.getItem(page) == undefined) {
          localStorage.setItem('page', 1)
        }
        this.setState({
          dataCitizens: res.data.docs,
          citizensTotalPage: res.data.pages
        });
      }
    });
  };

  onStructurePagination = (page) => {
    request.get("/backoffice/organizations", { page: page }).then((res) => {
      localStorage.setItem('page-structure', page + 1)
      if (res.data.code === 200) {
        if (localStorage.getItem(page) == undefined) {
          localStorage.setItem('page-structure', 1)
        }
        this.setState({
          dataOrganization: res.data.docs,
          structureTotalPage: res.data.pages
        });
      }
    });
  };

  onChangeDataBanners = (e) => {
    this.setState({
      dataBanners: e.target.files[0],
    });
  };

  resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        300,
        500,
        "JPEG",
        70,
        0,
        (uri) => {
          resolve(uri)
        },
        "file"
      );
    })

  onPutDataOrganization = (uuid) => {
    request.get(`/backoffice/organizations/${uuid}`).then((res) => {
      if (res.data.code == 200 || res.data.code == 201) {
        this.setState({
          dataTempOrganization: res.data.docs,
          modalStrukturOr: true,
          dataOrganizationChange: true
        })
      }
    })

  };

  onChangeUploadImgOrganization = (e) => {
    this.resizeFile(e.target.files[0]).then(v => {
      this.setState({
        dataTempOrganization: {
          ...this.state.dataTempOrganization,
          img: v,
        },
      });
    })

  };

  onPostDataCitizen = (e) => {
    e.preventDefault();

    request
      .post("/backoffice/citizens", this.state.dataTempCitizen)
      .then((res) => {
        if (res.data.code == 201) {
          BadgeNotif.show({
            text: "Data berhasil ditambahkan!",
            variant: "success",
            position: "top",
          });
          this.setState({
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
          });
          setTimeout(() => {
            this.onGetDataCitizens();
          }, 4000);
        }
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
        "https://barayapi.router.my.id/api/v1/backoffice/banners",
        formData
      )
      .then((res) => {
        if (res.data.code == 201) {
          BadgeNotif.show({
            position: "top",
            text: "Berhasil upload gambar banner!",
            variant: "warning",
          });

          this.setState(
            {
              dataBanners: null,
            },
            () =>
              setTimeout(() => {
                this.onGetDataBanners();
              }, 4000)
          );
        }
      })
      .catch((err) => {
        BadgeNotif.show({
          position: "top",
          text: err.response.data.docs[0].message,
          variant: "warning",
        });
      });
  };

  onDeleteDataBanners = async (value) => {
    await request.delete("/backoffice/banners", { uuid: value }).then((res) => {
      if (res.data.code == 200) {
        BadgeNotif.show({
          text: "Gambar banner berhasil dihapus",
          position: "top",
          variant: "success",
        });
        setTimeout(() => {
          this.onGetDataBanners();
        }, 4000);
      }
    });
  };

  onDeleteDataOrganization = async (value) => {
    await request
      .delete("/backoffice/organizations", { uuid: value })
      .then((res) => {
        if (res.data.code == 200) {
          BadgeNotif.show({
            position: "top",
            variant: "success",
            text: "Data berhasil dihapus",
          });

          setTimeout(() => {
            this.onGetDataStructure();
          }, 4000);
        }
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
        let values = [
          "",
          "",
          "",
          "01",
          "01",
          "40379",
          "Wargaluyu",
          "Arjasari",
          "Jawa Barat",
          "Kabupaten Bandung",
        ];

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
                    if (resp.rows[i][z] != undefined) {
                      values[z] = resp.rows[i][z];
                    }
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

  onPostDataBulkRegistration = async () => {
    await Promise.all(this.state.readyToInsert.map(async (v, id) => {
      await request
        .post("/auth", {
          ...v,
          address: `${v.blok} ${v.home_number}`,
          phone: parseInt(v.phone),
        })
        .then((res) => {
          if (res.response != undefined) {
            if (res.response.data.code === 404 || res.response.data.code != 201) {
              BadgeNotif.show({ delay: 5000, text: res.response.data.message });
              window.location.reload()
            }
          } else if (res.data.code == 201) {
            if (id + 1 == this.state.readyToInsert.length) {
              BadgeNotif.show({ delay: 5000, text: 'Berhasil registrasi user, silahkan verifikasi email' });
              this.setState({
                progressUser: 0,
                readyToInsert: []
              })
            } else {
              this.setState({
                progressUser: (id + 1 / this.state.readyToInsert.length) * 100
              })
            }
          }
        });;
    }));
    // this.state.readyToInsert.map((v, id) => {
    //   setTimeout(() => {
    //     request
    //       .post("/auth", {
    //         ...v,
    //         address: `${v.blok} ${v.home_number}`,
    //         phone: parseInt(v.phone),
    //       })
    //       .then((res) => {
    //         if (res.response != undefined) {
    //           if (res.response.data.code === 404 || res.response.data.code != 201) {
    //             BadgeNotif.show({ delay: 5000, text: res.response.data.message });
    //             window.location.reload()
    //           }
    //         } else if (res.data.code == 201) {
    //           if (id + 1 == this.state.readyToInsert.length) {
    //             BadgeNotif.show({ delay: 5000, text: 'Berhasil registrasi user, silahkan verifikasi email' });
    //             this.setState({
    //               progressUser: 0,
    //               readyToInsert: []
    //             })
    //           } else {
    //             this.setState({
    //               progressUser: (id + 1 / this.state.readyToInsert.length) * 100
    //             })
    //           }
    //         }
    //       });
    //   }, 4000);
    // })
  }


  procRegisHandler = (event) => {
    this.setState(
      {
        fileUser: event.target.files[0],
      },
      () => {
        let names = [
          "family_card_number",
          "full_name",
          "address",
          "email",
          "phone",
          "identity_number",
          "type",
          "blok",
          "home_number",
          "password",
          "password_confirmation",
          "tos",
        ];
        let values = [
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "hanyasementara",
          "hanyasementara",
          "true"
        ];

        let fileObj = this.state.fileUser;

        ExcelRenderer(
          fileObj,
          (err, resp) => {
            if (err) {
              console.log(err);
            } else {
              for (let i = 1; i < resp.rows.length; i++) {
                if (resp.rows[i].length != 0) {
                  for (let z = 0; z < names.length; z++) {
                    if (resp.rows[i][z] != undefined) {
                      values[z] = resp.rows[i][z];
                    }
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
          structureTotalPage: res.data.pages
        });
      }
    });
  };

  onPostDataStructure = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    let token = getCookie("token");
    let url = this.state.dataOrganizationChange ? "/" : "https://barayapi.router.my.id/api/v1/backoffice/organizations"

    if (this.state.dataTempOrganization.img) {
      formData.append(
        "image",
        this.state.dataTempOrganization.img,
        this.state.dataTempOrganization.img.name
      );

      Object.keys(this.state.dataTempOrganization).map((v) => {
        if (v != "img") {
          formData.append(v, this.state.dataTempOrganization[v]);
        }
      });
    }

    axios.defaults.headers.Authorization = `Bearer ${token}`;
    await axios
      .post(
        "https://barayapi.router.my.id/api/v1/backoffice/organizations",
        formData
      )
      .then((res) => {
        if (res.data.code == 201) {
          BadgeNotif.show({
            position: "top",
            variant: "success",
            text: "Data berhasil ditambah",
          });

          this.setState({
            modalStrukturOr: false,
            dataOrganizationChange: false,
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

          setTimeout(() => {
            this.onGetDataStructure();
          }, 4000);
        }
      });

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
    }, 4000);
  };

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
      <div style={{ padding: "15px", width: "100%", overflow: 'hidden' }}>
        <div>
          {(() => {
            switch (window.location.href.split("/")[4]) {
              case "banner":
                return (
                  <Banner
                    dataImageBanners={this.state.dataImageBanners}
                    onDeleteDataBanners={this.onDeleteDataBanners}
                    onChangeDataBanners={this.onChangeDataBanners}
                    onPostDataBanners={this.onPostDataBanners}
                    file={this.state.dataBanners}
                  />
                );

              case "struktur-organisasi":
                return (
                  <StrukOr
                    openModal={this.state.modalStrukturOr}
                    toggleModal={() => {
                      this.setState({
                        modalStrukturOr: !this.state.modalStrukturOr,
                      });
                    }}
                    dataOrganization={this.state.dataOrganization}
                    onDeleteDataOrganization={this.onDeleteDataOrganization}
                    onPostDataStructure={this.onPostDataStructure}
                    dataTempOrganization={dataTempOrganization}
                    onChangeUploadImgOrganization={
                      this.onChangeUploadImgOrganization
                    }
                    onHandleChangeOrganizationData={
                      this.onHandleChangeOrganizationData
                    }
                    onPutDataOrganization={this.onPutDataOrganization}
                    totalPage={this.state.structureTotalPage}
                    onStructurePagination={this.onStructurePagination}
                  />
                );

              case "pengguna":
                return (
                  <Pengguna
                    dataUsers={this.state.dataUsers}
                    onGetDetailUser={this.onGetDetailUser}
                    onDeleteDataOrganization={this.onDeleteDataOrganization}
                    procFileHandler={this.procRegisHandler}
                    onPostDataBulkRegistration={this.onPostDataBulkRegistration}
                    progress={this.state.progressUser}
                  />
                );

              case "list-data-warga":
                return (
                  <ListDataWarga
                    dataCitizens={this.state.dataCitizens}
                    procFileHandler={this.procFileHandler}
                    onPostDataBulkCitizen={this.onPostDataBulkCitizen}
                    onPostDataCitizen={this.onPostDataCitizen}
                    dataTempCitizen={this.state.dataTempCitizen}
                    onHandleChangeCitizenData={this.onHandleChangeCitizenData}
                    onCitizenPagination={this.onCitizenPagination}
                    totalPage={this.state.citizensTotalPage}
                  />
                );

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
