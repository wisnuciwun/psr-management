import { BadgeNotif } from "components/BadgeNotification";
import { getLoginData } from "config/redux/rootAction";
import React, { Component } from "react";
import {
  Button,
  Container,
  Dropdown,
  Modal,
  ModalHeader,
  Accordion,
  Badge,
} from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getCookie, removeCookie } from "tiny-cookie";
import request from "utils/request";
import { ValidatorBoolean } from "utils/validator";
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import PopUpProfile from "modals/PopUpProfile";
import PopUpAddress from "modals/PopUpAddress";
import PopUpDocument from "modals/PopUpDocument";
import PopUpEmergency from "modals/PopUpEmergency";
import PopUpFamily from "modals/PopUpFamily";
import MenuProfile from "accordions/MenuProfile";
import MenuAddress from "accordions/MenuAddress";
import MenuEmergency from "accordions/MenuEmergency";
import MenuDocument from "accordions/MenuDocument";
import MenuFamily from "accordions/MenuFamily";
import { utils } from "utils";
import NoData from "components/NoData";
class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataProfile: {},
      dataFamily: [],
      dataAddress: {},
      dataEmergency: [],
      dataDocument: [],
      validated: false,
      profileDataPayload: {
        full_name: "",
        phone: "",
        address: "",
        identity_number: "",
        family_card_number: "",
        type: "",
        blok: "",
        home_number: "",
      },
      documentDataTemp: {
        file: "",
        type: "",
        nomor: "",
        issued_date: "",
        validity_period: "",
        note: "",
      },
      emergencyDataTemp: {
        full_name: "",
        address: "",
        phone: "",
        relationship: "",
      },
      profileDataTemp: {
        full_name: "",
        phone: "",
        address: "",
        identity_number: 0,
        family_card_number: 0,
        type: "",
        blok: "",
        home_number: "",
        appellation: "",
        nickname: "",
        religion: "",
        mother_name: "",
        height: "",
        weight: "",
        blood_type: "",
      },
      addressDataTemp: {
        address: "",
        postal_code: "",
        province: "",
        county_town: "",
        district: "",
        subdistrict: "",
        current_address: "",
        current_postal_code: "",
        current_province: "",
        current_county_town: "",
        current_district: "",
        current_subdistrict: "",
      },
      familyDataTemp: {
        full_name: "",
        relationship: "",
        identity_number: "",
        nickname: "",
        place_of_birth: "",
        date_of_birth: "",
        gender: "",
        religion: "",
        education: "",
        occupation: "",
        blood_type: "",
        marital_status: "",
        marital_status_date: "",
        citizenship: "",
        father_name: "",
        mother_name: "",
      },
      editedData: {},
      changeData: false,
      modalOpen: false,
      modalProfileHeader: "",
    };
  }

  handleModal = (typeModal, edit = false, data = null, dataArray) => {
    this.setState({
      modalOpen: true,
      modalProfileHeader: typeModal,
      changeData: edit,
      editedData:
        data != null && dataArray === undefined
          ? this.state[`${data}`]
          : dataArray,
    });
  };

  handleAddressSame = (data, event) => {
    this.setState(
      {
        editedData: data,
      },
      () => {
        if (event) {
          this.handlePostAddress(event);
        }
      }
    );
  };

  handleEditingData = (e) => {
    this.setState({
      editedData: {
        ...this.state.editedData,
        [e.target.name]: e.target.value,
      },
    });
  };

  handleLogout = () => {
    let { dispatch } = this.props;
    dispatch(getLoginData({}));
    removeCookie("token");
    this.props.navigate("/");
  };

  handleGetAddress = () => {
    request.get("/auth/addresses").then((res) => {
      if (
        (res.data.code == 200 || res.data.code == 201) &&
        res !== undefined &&
        res.data.docs !== null
      ) {
        this.setState({
          dataAddress: res.data.docs,
        });
      }
    });
  };

  handlePostAddress = (event) => {
    event.preventDefault();
    event.stopPropagation();

    request.post("/auth/addresses", this.state.editedData).then((res) => {
      if (res.data?.code === 200) {
        BadgeNotif.show({
          text: "Alamat berhasil diubah",
          variant: "success",
        });

        this.setState({
          modalOpen: false,
        });
        setTimeout(() => {
          this.handleGetAddress();
        }, 100);
      } else {
        BadgeNotif.show({ delay: 5000, text: res.response.data.message });
      }
    });
  };

  handleGetProfile = () => {
    request.get("/auth/info").then((res) => {
      if (res.data.code === 200) {
        this.setState({
          dataProfile: res.data.docs,
        });
      }
    });
  };

  handlePutDataProfile = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();

    if (form.checkValidity()) {
      this.setState({
        validated: false,
      });

      request
        .put("/auth", {
          ...this.state.editedData,
          phone: parseInt(this.state.editedData.phone),
          address: `${this.state.editedData.blok}-${this.state.editedData.home_number}`,
        })
        .then((res) => {
          if (res?.data?.code === 201 || res?.data?.code === 200) {
            BadgeNotif.show({
              text: "Profile berhasil diubah",
              variant: "success",
            });

            setTimeout(() => {
              request.get("/auth/info").then((res) => {
                this.setState({
                  modalOpen: false,
                });
                setTimeout(() => {
                  this.handleGetProfile();
                }, 100);
              });
            }, 1000);
          } else {
            BadgeNotif.show({ delay: 5000, text: res.response.data.message });
          }
        });
    } else {
      this.setState({
        validated: true,
      });
    }
  };

  handleDeleteDataFamily = (value) => {
    request.delete(`/auth/families/${value}`).then((res) => {
      if (res.data.code === 200) {
        BadgeNotif.show({
          text: "Data keluarga berhasil dihapus",
          variant: "success",
        });

        setTimeout(() => {
          this.handleGetDataFamily();
        }, 100);
      } else {
        BadgeNotif.show({ delay: 5000, text: res.response.data.message });
      }
    });
  };

  handleGetDataFamily = () => {
    request.get("/auth/families").then((res) => {
      if (res.data.code === 200 && res.data.docs.length != 0) {
        this.setState({
          dataFamily: res.data.docs,
        });
      }
    });
  };

  handlePostFamily = (event) => {
    event.preventDefault();
    event.stopPropagation();

    request.post("/auth/families", this.state.editedData).then((res) => {
      if (res.data?.code === 200) {
        BadgeNotif.show({
          text: "Data keluarga berhasil diubah",
          variant: "success",
        });

        this.setState({
          modalOpen: false,
        });
        setTimeout(() => {
          this.handleGetDataFamily();
        }, 100);
      } else {
        BadgeNotif.show({ delay: 5000, text: res.response.data.message });
      }
    });
  };

  handleDeleteEmergency = (value) => {
    request.delete(`/auth/emergency_contacts/${value}`).then((res) => {
      if (res.data.code === 200) {
        BadgeNotif.show({
          text: "Data Emergency berhasil dihapus",
          variant: "success",
        });

        setTimeout(() => {
          this.handleGetEmergency();
        }, 5000);
      } else {
        BadgeNotif.show({ delay: 5000, text: res.response.data.message });
      }
    });
  };

  handleGetEmergency = () => {
    request.get("/auth/emergency_contacts").then((res) => {
      if (res.data.code === 200 && res.data.docs.length !== 0) {
        this.setState({
          dataEmergency: res.data.docs,
        });
      }
    });
  };

  postDataEmergency = (event) => {
    event.preventDefault();
    // event.stopPropagation();

    request
      .post("/auth/emergency_contacts", this.state.editedData)
      .then((res) => {
        if (res.data?.code === 200) {
          BadgeNotif.show({
            text: "Data kontak darurat berhasil diubah",
            variant: "success",
          });

          this.setState({
            modalOpen: false,
          });
          setTimeout(() => {
            this.handleGetEmergency();
          }, 100);
        } else {
          BadgeNotif.show({ delay: 5000, text: res.response.data.message });
        }
      });
  };

  handleDeleteDocument = (value) => {
    request.delete(`/auth/documents/${value}`).then((res) => {
      if (res.data.code === 200) {
        BadgeNotif.show({
          text: "Document berhasil dihapus",
          variant: "success",
        });

        setTimeout(() => {
          this.handleGetDocument();
        }, 100);
      } else {
        BadgeNotif.show({ delay: 5000, text: res.response.data.message });
      }
    });
  };

  handleGetDocument = () => {
    request.get("/auth/documents").then((res) => {
      if (res.data.code === 200 && res.data.docs.length !== 0) {
        this.setState({
          dataDocument: res.data.docs,
        });
      }
    });
  };

  handlePostDocument = (event) => {
    event.preventDefault();
    event.stopPropagation();
    let formData = new FormData();
    let dt = this.state.editedData;

    formData.append("file", dt.file, dt.file.name);
    formData.append("issued_date", dt.issued_date);
    formData.append("nomor", parseInt(dt.nomor));
    formData.append("note", dt.note);
    formData.append("type", dt.type);
    formData.append("validity_period", dt.validity_period);

    request
      .post("/auth/documents", formData, {
        "Content-Type": "multipart/form-data",
      })
      .then((res) => {
        if (res.data.code === 200) {
          BadgeNotif.show({
            text: "Profile berhasil diubah",
            variant: "success",
          });

          this.setState({
            modalOpen: false,
          });
          setTimeout(() => {
            this.handleGetDocument();
          }, 100);
        } else {
          BadgeNotif.show({ delay: 5000, text: res.response.data.message });
        }
      });
  };

  onUploadPhoto = (val) => {
    let formData = new FormData();
    formData.append("image", val.target.files[0], val.target.files[0].name);
    request
      .put("/auth/update_profile_picture", formData, {
        "Content-Type": "multipart/form-data",
      })
      .then((res) => {
        if (res.data.code == 200) {
          this.setState({
            dataProfile: {
              ...this.state.editedData,
              image_url: URL.createObjectURL(val.target.files[0]),
            },
          });
        }
      });
  };

  componentDidMount() {
    this.handleGetAddress();
    this.handleGetDataFamily();
    this.handleGetProfile();
    this.handleGetEmergency();
    this.handleGetDocument();
  }

  render() {
    let { dataProfile, dataAddress, dataFamily, dataEmergency, dataDocument } =
      this.state;

    const options = [
      { value: "owner", label: "Milik Pribadi" },
      { value: "contract", label: "Kontrak" },
    ];

    const religionOpt = [
      { value: "Islam", label: "Islam" },
      { value: "Konghucu", label: "Konghucu" },
      { value: "Kristen", label: "Kristen" },
      { value: "Katolik", label: "Katolik" },
      { value: "Hindu", label: "Hindu" },
      { value: "Budha", label: "Budha" },
    ];

    const bloodOpt = [
      { value: "A", label: "A" },
      { value: "B", label: "B" },
      { value: "AB", label: "AB" },
      { value: "0", label: "0" },
    ];

    const genderOpt = [
      { value: "l", label: "Laki-laki" },
      { value: "p", label: "Perempuan" },
    ];

    const citizenOpt = [
      { label: "Warga Negara Indonesia", value: "wni" },
      { label: "Warga Negara Asing", value: "wna" },
    ];

    const role = this.props.userbasedata?.user_role?.role?.name;

    const customButtonToggle = React.forwardRef(
      ({ children, onClick }, ref) => (
        <Button
          variant="light"
          className="btn-primary-light w-50"
          href=""
          ref={ref}
          onClick={(e) => {
            e.preventDefault();
            onClick(e);
          }}
        >
          <span
            style={{
              color: "#666666",
              display: "inline",
              display: "flex",
              gap: "7px",
              alignItems: "center",
              width: "100%",
            }}
          >
            <i className="fa fa-calendar"></i>
            <span>2023</span>
          </span>
          <i className="fa fa-chevron-down text-dark"></i>
        </Button>
      )
    );

    return (
      <>
        <Container>
          <Accordion>
            <Accordion.Item eventKey="edit profile">
              <Accordion.Header>Profile</Accordion.Header>
              <MenuProfile
                dataProfile={dataProfile}
                onOpenModal={this.handleModal}
              />
            </Accordion.Item>
            <Accordion.Item
              className="mt-2 border-top-collapse"
              eventKey="alamat"
            >
              <Accordion.Header>Alamat</Accordion.Header>
              <MenuAddress
                dataAddress={dataAddress}
                onOpenModal={this.handleModal}
              />
            </Accordion.Item>
            <Accordion.Item
              className="mt-2 border-top-collapse"
              eventKey="keluarga"
            >
              <Accordion.Header>Data Keluarga</Accordion.Header>
              <MenuFamily
                dataFamily={dataFamily}
                kk={dataProfile.family_card_number}
                onOpenModal={this.handleModal}
                onDelete={this.handleDeleteDataFamily}
              />
            </Accordion.Item>
            <Accordion.Item
              className="mt-2 border-top-collapse"
              eventKey="darurat"
            >
              <Accordion.Header>Kontak Darurat</Accordion.Header>
              <MenuEmergency
                dataEmergency={dataEmergency}
                onOpenModal={this.handleModal}
                onDelete={this.handleDeleteEmergency}
              />
            </Accordion.Item>
            <Accordion.Item
              className="mt-2 border-top-collapse"
              eventKey="dokumen"
            >
              <Accordion.Header>Dokumen</Accordion.Header>
              <MenuDocument
                dataDocument={dataDocument}
                onOpenModal={this.handleModal}
                onDelete={this.handleDeleteDocument}
              />
            </Accordion.Item>
            <Accordion.Item
              className="mt-2 border-top-collapse"
              eventKey="iuran"
            >
              <Accordion.Header>Data Iuran</Accordion.Header>
              <Accordion.Body>
                <NoData />

                {/* <Dropdown drop="down">
                  <div
                    style={{ gap: "8px" }}
                    className="d-flex justify-content-between"
                  >
                    <Dropdown.Toggle
                      style={{
                        borderRadius: "64px",
                        backgroundColor: "inherit",
                        width: "50%",
                        height: "35px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                      variant="secondary"
                    >
                      <span
                        style={{
                          color: "#666666",
                          display: "flex",
                          gap: "7px",
                          alignItems: "center",
                          width: "100%",
                        }}
                      >
                        <i className="fa fa-calendar"></i>
                        <span>2023</span>
                      </span>
                      <i className="fa fa-chevron-down text-dark"></i>
                    </Dropdown.Toggle>
                    <Button className="btn-primary-yellow w-50">Bayar</Button>
                  </div>
                  <DropdownMenu style={{ marginLeft: "-70px" }}>
                    <DropdownItem>2023</DropdownItem>
                    <DropdownItem>2022</DropdownItem>
                    <DropdownItem>2021</DropdownItem>
                    <DropdownItem>2020</DropdownItem>
                  </DropdownMenu>
                </Dropdown>

                <Badge className="w-100 mt-2 mb-2" bg="warning">
                  Pembayaran iuran maksimal tanggal 15 setiap bulannya
                </Badge>
                <div style={{ border: "0.5px solid gray" }} className="w-50">
                  <div
                    style={{ border: "0.5px solid gray" }}
                    className="text-center"
                  >
                    Januari
                  </div>
                  <div style={{ height: "50px" }}>&nbsp;</div>
                  <table>
                    <tr>
                      <td style={{ width: "50px" }}>Tgl</td>
                      <td>:</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>Paraf</td>
                      <td>:</td>
                      <td></td>
                    </tr>
                  </table>
                </div> */}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          <hr className="line-thin" />
          {/* <Button onClick={this.handleLogout} className="mt-2 w-100 btn-danger">
            Logout
          </Button> */}
          <Link to={"/forgetpassword"}>
            <Button
              className=" w-100 btn-primary-yellow"
              style={{ color: "white" }}
            >
              Reset Password
            </Button>
          </Link>
          <Link to="/admin/banner" style={{ textDecoration: "none" }}>
            <Button
              className="mt-2 w-100 btn-secondary"
              hidden={role === "Superadmin" ? false : true}
            >
              Admin Page
            </Button>
          </Link>
        </Container>
        <Modal
          centered
          show={this.state.modalOpen}
          onHide={() => this.setState({ modalOpen: false })}
        >
          <ModalHeader
            style={{ border: "none" }}
            className="font-lg font-weight-bold"
            closeButton
          >
            {utils.toSentenceCase(this.state.modalProfileHeader)}
          </ModalHeader>
          {(() => {
            switch (this.state.modalProfileHeader) {
              case "edit profile":
                return (
                  <PopUpProfile
                    data={this.state.editedData}
                    onSubmit={this.handlePutDataProfile}
                    onHide={() => this.setState({ modalOpen: false })}
                    onChange={this.handleEditingData}
                    religionOpt={religionOpt}
                    bloodOpt={bloodOpt}
                    uploadPhoto={this.onUploadPhoto}
                    validate={this.state.validated}
                  />
                );
              case "buat alamat":
              case "edit alamat":
                return (
                  <PopUpAddress
                    show={this.state.modalOpen}
                    onAddressSame={this.handleAddressSame}
                    onSubmit={this.handlePostAddress}
                    onChange={this.handleEditingData}
                    onHide={() => this.setState({ modalOpen: false })}
                    data={this.state.editedData}
                    validate={this.state.validated}
                  />
                );
              case "buat dokumen":
              case "edit dokumen":
                return (
                  <PopUpDocument
                    onSubmit={this.handlePostDocument}
                    onChange={this.handleEditingData}
                    onHide={() => this.setState({ modalOpen: false })}
                    data={this.state.editedData}
                    validate={this.state.validated}
                  />
                );
              case "buat kontak darurat":
              case "edit kontak darurat":
                return (
                  <PopUpEmergency
                    onSubmit={this.postDataEmergency}
                    onChange={this.handleEditingData}
                    onHide={() => this.setState({ modalOpen: false })}
                    data={this.state.editedData}
                    validate={this.state.validated}
                  />
                );
              case "buat data keluarga":
              case "edit data keluarga":
                return (
                  <PopUpFamily
                    onSubmit={this.handlePostFamily}
                    onChange={this.handleEditingData}
                    onHide={() => this.setState({ modalOpen: false })}
                    data={this.state.editedData}
                    religionOpt={religionOpt}
                    bloodOpt={bloodOpt}
                    genderOpt={genderOpt}
                    citizenOpt={citizenOpt}
                    kk={dataProfile.family_card_number}
                    validate={this.state.validated}
                  />
                );
              default:
                return null;
            }
          })()}
        </Modal>
      </>
    );
  }
}

function mapStateToProps(state) {
  return state;
}
export default connect(mapStateToProps)(Profile);
