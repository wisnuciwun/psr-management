import { BadgeNotif } from "components/BadgeNotification";
import { getLoginData } from "config/redux/rootAction";
import React, { Component } from "react";
import {
  FormControl,
  FormGroup,
  FormLabel,
  Button,
  Container,
  Dropdown,
  FormText,
  Modal,
  ModalHeader,
  ModalBody,
  Table,
  Accordion,
  Badge,
} from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getCookie, removeCookie } from "tiny-cookie";
import request from "utils/request";
import { ValidatorBoolean } from "utils/validator";
import Form from "react-bootstrap/Form";
import Select from "react-select";
import NoData from "components/NoData";
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
class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      validated: false,
      haveMarried: false,
      children: [],
      dataProfile: {},
      modalProfileOpen: false,
      modalProfileHeader: "",
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
      houseType: "",
    };
  }

  handleToggle = (e) => {
    this.setState({
      [e.target.name]: !this.state[e.target.name],
    });
  };

  handleAddChildren = () => {
    let newData = [...this.state.children];
    newData.push({ name: "", relationship: "" });

    this.setState({
      children: newData,
    });
  };

  handleChangeChildren = (key, event) => {
    let g = [...this.state.children];
    let selectedChild = g[key];
    selectedChild[event.target.name] = event.target.value;
  };

  handleLogout = () => {
    let { dispatch } = this.props;
    dispatch(getLoginData({}));
    removeCookie("token");
    this.props.navigate("/");
  };

  onHandleUpdateData = () => {};

  onHandleChangeProfileData = (event) => {
    this.setState({
      profileDataPayload: {
        ...this.state.profileDataPayload,
        [event.target.name]: event.target.value,
      },
    });
  };

  handlePutDataProfile = (event) => {
    let { dispatch } = this.props;
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();

    if (form.checkValidity()) {
      this.setState({
        validated: false,
      });

      request
        .put("/auth", {
          ...this.state.profileDataPayload,
          address: `${this.state.profileDataPayload.blok} ${this.state.profileDataPayload.home_number}`,
          phone: parseInt(this.state.profileDataPayload.phone),
        })
        .then((res) => {
          if (res?.data?.code === 201 || res?.data?.code === 200) {
            BadgeNotif.show({
              text: "Data berhasil diubah",
              variant: "success",
            });

            setTimeout(() => {
              request.get("/auth/info").then((res) => {
                this.setState({
                  dataProfile: res.data.docs,
                  profileDataPayload: res.data.docs,
                  modalProfileOpen: false,
                });
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

  handleSelectHouseType = (value) => {
    this.setState({
      houseType: value,
      profileDataPayload: {
        ...this.state.registerPayload,
        type: value.value,
      },
    });
  };

  handleOpenModal = (typeModal) => {
    this.setState({
      modalProfileOpen: !this.state.modalProfileOpen,
      modalProfileHeader: typeModal,
    });
  };

  componentDidMount() {
    request.get("/auth/info").then((res) => {
      this.setState({
        dataProfile: res.data.docs,
        profileDataPayload: res.data.docs,
      });
    });
  }

  render() {
    let {
      haveMarried,
      children,
      dataProfile,
      modalProfileOpen,
      profileDataPayload,
      validated,
      houseType,
    } = this.state;
    const options = [
      { value: "owner", label: "Milik Pribadi" },
      { value: "contract", label: "Kontrak" },
    ];

    console.log("zzz", this.props);

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
            <Accordion.Item eventKey="profile">
              <Accordion.Header>Profile</Accordion.Header>
              <MenuProfile onOpenModal={this.handleOpenModal} />
            </Accordion.Item>
            <Accordion.Item
              className="mt-2 border-top-collapse"
              eventKey="alamat"
            >
              <Accordion.Header>Alamat</Accordion.Header>
              <MenuAddress onOpenModal={this.handleOpenModal} />
            </Accordion.Item>
            <Accordion.Item
              className="mt-2 border-top-collapse"
              eventKey="keluarga"
            >
              <Accordion.Header>Data Keluarga</Accordion.Header>
              <MenuFamily onOpenModal={this.handleOpenModal} />
            </Accordion.Item>
            <Accordion.Item
              className="mt-2 border-top-collapse"
              eventKey="darurat"
            >
              <Accordion.Header>Kontak Darurat</Accordion.Header>
              <MenuEmergency onOpenModal={this.handleOpenModal} />
            </Accordion.Item>
            <Accordion.Item
              className="mt-2 border-top-collapse"
              eventKey="dokumen"
            >
              <Accordion.Header>Dokumen</Accordion.Header>
              <MenuDocument onOpenModal={this.handleOpenModal} />
            </Accordion.Item>
            <Accordion.Item
              className="mt-2 border-top-collapse"
              eventKey="iuran"
            >
              <Accordion.Header>Data Iuran</Accordion.Header>
              <Accordion.Body>
                {/* <NoData /> */}

                <Dropdown drop="down">
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
                      // as={customButtonToggle}
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
                </div>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          <hr className="line-thin" />
          <Link to={"/forgetpassword"}>
            <Button className="mt-2 w-100 btn-info">Reset Password</Button>
          </Link>
          <Button onClick={this.handleLogout} className="mt-2 w-100 btn-danger">
            Logout
          </Button>
        </Container>
        {/* <Modal
          centered
          show={modalProfileOpen}
          onHide={() => {
            this.setState({
              modalProfileOpen: false,
            });
          }}
        >
          <ModalHeader closeButton>Ubah Data Profile</ModalHeader>
          <ModalBody>
            <Form
              onSubmit={this.handlePutDataProfile}
              validated={validated}
              noValidate
            >
              <FormGroup className="mb-2">
                <FormLabel className="mb-1">Nama</FormLabel>
                <FormControl
                  className="input-no-decoration"
                  placeholder="Isi nama anda"
                  value={profileDataPayload.full_name}
                  onChange={this.onHandleChangeProfileData}
                  name="full_name"
                  required
                  isInvalid={
                    !ValidatorBoolean({
                      value: profileDataPayload.full_name,
                      rule: "type:string",
                    }) && validated
                  }
                />
                <FormControl.Feedback type="invalid">
                  Nama harus diisi
                </FormControl.Feedback>
              </FormGroup>
              <FormGroup className="mb-2">
                <FormLabel className="mb-1">Status Kepemilikan Rumah</FormLabel>
                <br />
                <FormControl
                  hidden
                  className="input-no-decoration"
                  name="full_name"
                  value={options.filter(
                    (v) => v.value == profileDataPayload.type
                  )}
                  placeholder="Isi nama anda"
                  required
                  isInvalid={
                    !ValidatorBoolean({
                      value: options.filter(
                        (v) => v.value == profileDataPayload.type
                      ),
                      rule: "type:string",
                    }) && validated
                  }
                />
                <Select
                  onChange={this.handleSelectHouseType}
                  value={options.filter(
                    (v) => v.value == profileDataPayload.type
                  )}
                  options={options}
                  placeholder="Pilih salah satu"
                />
                <FormControl.Feedback type="invalid">
                  Isi status kepemilikan rumah
                </FormControl.Feedback>
              </FormGroup>
              <FormGroup className="mb-2">
                <FormLabel className="mb-1">No. KTP</FormLabel>
                <FormControl
                  maxLength={16}
                  className="input-no-decoration"
                  placeholder="Isi No. KTP"
                  value={profileDataPayload.identity_number}
                  onChange={this.onHandleChangeProfileData}
                  name="identity_number"
                  required
                  isInvalid={
                    !ValidatorBoolean({
                      value: profileDataPayload.identity_number,
                      rule: "type:string|min:16",
                    }) && validated
                  }
                />
              </FormGroup>
              <FormGroup className="mb-2">
                <FormLabel className="mb-1">No. KK</FormLabel>
                <FormControl
                  className="input-no-decoration"
                  placeholder="Isi No. KK"
                  maxLength={16}
                  value={profileDataPayload.family_card_number}
                  onChange={this.onHandleChangeProfileData}
                  name="family_card_number"
                  required
                  isInvalid={
                    !ValidatorBoolean({
                      value: profileDataPayload.family_card_number,
                      rule: "type:string|min:16",
                    }) && validated
                  }
                />
                <FormControl.Feedback type="invalid">
                  Nomor KK harus diisi dan sesuai format
                </FormControl.Feedback>
              </FormGroup>
              <FormGroup className="mb-2">
                <FormLabel className="mb-1">Blok rumah</FormLabel>
                <FormControl
                  className="input-no-decoration"
                  name="blok"
                  value={profileDataPayload.blok}
                  onChange={this.onHandleChangeProfileData}
                  placeholder="Isi blok rumah anda. Contoh: B5"
                  required
                  isInvalid={
                    !ValidatorBoolean({
                      value: profileDataPayload.blok,
                      rule: "type:string|max:3",
                    }) && validated
                  }
                />
                <FormControl.Feedback type="invalid">
                  Isi blok rumah anda sesuai contoh
                </FormControl.Feedback>
              </FormGroup>
              <FormGroup className="mb-2">
                <FormLabel className="mb-1">Nomor rumah</FormLabel>
                <FormControl
                  className="input-no-decoration"
                  name="home_number"
                  value={profileDataPayload.home_number}
                  onChange={this.onHandleChangeProfileData}
                  placeholder="Isi nomor rumah anda. Contoh: 07"
                  required
                  isInvalid={
                    !ValidatorBoolean({
                      value: profileDataPayload.home_number,
                      rule: "type:number|max:2",
                    }) && validated
                  }
                />
                <FormControl.Feedback type="invalid">
                  Isi nomor rumah anda sesuai contoh
                </FormControl.Feedback>
              </FormGroup>
              <FormGroup className="mb-2">
                <FormLabel className="mb-1">No. HP</FormLabel>
                <FormControl
                  className="input-no-decoration"
                  placeholder="Isi No. HP anda"
                  value={profileDataPayload.phone}
                  name="phone"
                  maxLength={13}
                  onChange={this.onHandleChangeProfileData}
                  isInvalid={
                    !ValidatorBoolean({
                      value: profileDataPayload.phone,
                      rule: "type:string|min:10",
                    }) && validated
                  }
                />
                <FormControl.Feedback type="invalid">
                  Isi nomor HP anda, maksimal 13 digit dan minimal 10 digit
                </FormControl.Feedback>
              </FormGroup>
              <Button className="btn-success w-100 mt-2" type="submit">
                Ubah Data
              </Button>
            </Form>
          </ModalBody>
        </Modal> */}
        <Modal
          show={this.state.modalProfileOpen}
          onHide={() => this.setState({ modalProfileOpen: false })}
        >
          <ModalHeader>
            {utils.toSentenceCase(this.state.modalProfileHeader)}
          </ModalHeader>
          {(() => {
            switch (this.state.modalProfileHeader) {
              case "profile":
                return (
                  <PopUpProfile
                    onSubmit={() => null}
                    onHide={() => this.setState({ modalProfileOpen: false })}
                  />
                );
              case "address":
                return (
                  <PopUpAddress
                    onSubmit={() => null}
                    onHide={() => this.setState({ modalProfileOpen: false })}
                  />
                );
              case "document":
                return (
                  <PopUpDocument
                    onSubmit={() => null}
                    onHide={() => this.setState({ modalProfileOpen: false })}
                  />
                );
              case "emergency":
                return (
                  <PopUpEmergency
                    onSubmit={() => null}
                    onHide={() => this.setState({ modalProfileOpen: false })}
                  />
                );
              case "family":
                return (
                  <PopUpFamily
                    onSubmit={() => null}
                    onHide={() => this.setState({ modalProfileOpen: false })}
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
