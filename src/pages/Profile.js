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
} from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
// import {
//   Button,
//   Container,
//   DropdownItem,
//   DropdownMenu,
//   DropdownToggle,
//   FormText,
//   Input,
//   Label,
//   UncontrolledDropdown,
// } from "reactstrap";

import { getCookie, removeCookie } from "tiny-cookie";
import request from "utils/request";
import { ValidatorBoolean } from "utils/validator";
import Form from "react-bootstrap/Form";
import Select from "react-select";
class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      validated: false,
      haveMarried: false,
      children: [],
      dataProfile: {},
      modalProfileOpen: false,
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
      houseType
    } = this.state;
    const options = [
      { value: "owner", label: "Milik Pribadi" },
      { value: "contract", label: "Kontrak" },
    ];

    return (
      <>
        <Container>
          <div className="d-flex justify-content-end">
            <Button
              onClick={() => {
                this.setState({ modalProfileOpen: !modalProfileOpen });
              }}
              className="btn-dark"
            >
              Edit Profile
            </Button>
          </div>
          <br />
          <FormGroup className="mb-2">
            <FormLabel className="mb-1">Nama</FormLabel>
            <FormControl
              disabled
              placeholder="Isi nama anda"
              value={dataProfile.full_name}
            />
          </FormGroup>
          <FormGroup className="mb-2">
            <FormLabel className="mb-1">Email</FormLabel>
            <FormControl
              disabled
              placeholder="Isi alamat email anda"
              value={dataProfile.email}
            />
          </FormGroup>
          <FormGroup className="mb-2">
            <FormLabel className="mb-1">No. KTP</FormLabel>
            <FormControl
              disabled
              placeholder="Isi No. KTP"
              value={dataProfile.identity_number}
            />
          </FormGroup>
          <FormGroup className="mb-2">
            <FormLabel className="mb-1">No. KK</FormLabel>
            <FormControl
              disabled
              placeholder="Isi No. KK"
              value={dataProfile.family_card_number}
            />
          </FormGroup>
          <FormGroup className="mb-2">
            <FormLabel className="mb-1">Alamat rumah</FormLabel>
            <FormControl
              placeholder="Isi Blok dan No. Rumah anda (contoh: B5-21)"
              value={dataProfile.blok + "-" + dataProfile.home_number}
              disabled
            />
          </FormGroup>
          <FormGroup className="mb-2">
            <FormLabel className="mb-1">No. HP</FormLabel>
            <FormControl
              placeholder="Isi No. HP anda"
              value={dataProfile.phone}
              disabled
            />
          </FormGroup>
          <hr />
          <Form>
            <Form.Check
              type="switch"
              checked={haveMarried}
              onClick={this.handleToggle}
              name="haveMarried"
              label="Sudah berkeluarga"
            />
          </Form>
          <div hidden={!haveMarried}>
            <div>
              {children.length != 0 &&
                children.map((v, id) => {
                  return (
                    <div
                      key={id}
                      className="d-flex mb-2"
                      style={{ gap: "10px" }}
                    >
                      <FormControl
                        onChange={(e) => this.handleChangeChildren(id, e)}
                        value={v.name}
                        style={{ height: "40px" }}
                        name="name"
                        type="text"
                        className="w-75"
                      />
                      <Dropdown>
                        <Dropdown.Toggle variant="dark" id="dropdown-basic">
                          {v.relationship ? v.relationship : "Hubungan"}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item
                            onClick={() =>
                              this.handleChangeChildren(id, {
                                target: {
                                  name: "relationship",
                                  value: "Istri",
                                },
                              })
                            }
                          >
                            Istri
                          </Dropdown.Item>
                          <Dropdown.Item
                            name="relationship"
                            onClick={() =>
                              this.handleChangeChildren(id, {
                                target: {
                                  name: "relationship",
                                  value: "Suami",
                                },
                              })
                            }
                          >
                            Suami
                          </Dropdown.Item>
                          <Dropdown.Item
                            name="relationship"
                            onClick={() =>
                              this.handleChangeChildren(id, {
                                target: {
                                  name: "relationship",
                                  value: "Anak 1",
                                },
                              })
                            }
                          >
                            Anak 1
                          </Dropdown.Item>
                          <Dropdown.Item
                            name="relationship"
                            onClick={() =>
                              this.handleChangeChildren(id, {
                                target: {
                                  name: "relationship",
                                  value: "Anak 2",
                                },
                              })
                            }
                          >
                            Anak 2
                          </Dropdown.Item>
                          <Dropdown.Item
                            name="relationship"
                            onClick={() =>
                              this.handleChangeChildren(id, {
                                target: {
                                  name: "relationship",
                                  value: "Anak 3",
                                },
                              })
                            }
                          >
                            Anak 3
                          </Dropdown.Item>
                          <Dropdown.Item
                            name="relationship"
                            onClick={() =>
                              this.handleChangeChildren(id, {
                                target: {
                                  name: "relationship",
                                  value: "Lainnya",
                                },
                              })
                            }
                          >
                            Lainnya
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  );
                })}
            </div>
            <Button
              hidden={!haveMarried}
              onClick={this.handleAddChildren}
              className="mt-3 w-100 btn-info"
            >
              Tambah data
            </Button>
          </div>
          <hr />
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Upload KTP</Form.Label>
            <Form.Control
              placeholder="Pastikan format file adalah pdf"
              type="file"
              size="md"
              className="h-100"
            />
          </Form.Group>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Upload KK</Form.Label>
            <Form.Control
              placeholder="Pastikan format file adalah pdf"
              type="file"
              size="md"
              className="h-100"
            />
          </Form.Group>
          <p className="font-md">
            Jika file belum pdf, anda dapat kunjungi situs ini{" "}
            <a
              rel="noopener noreferrer"
              target="_blank"
              no
              href="https://png2pdf.com/"
            >
              https://png2pdf.com/
            </a>
          </p>
          <hr />
          <Button className="mt-4 w-100 btn-success">Update Data</Button>
          <Link to={"/forgetpassword"}>
            <Button className="mt-2 w-100 btn-info">Reset Password</Button>
          </Link>
          <Button onClick={this.handleLogout} className="mt-2 w-100 btn-danger">
            Logout
          </Button>
        </Container>
        <Modal
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
                <Select
                  onChange={this.handleSelectHouseType}
                  value={options.filter(v => v.value == profileDataPayload.type)}
                  options={options}
                  placeholder='Pilih salah satu'
                />
                <FormControl.Feedback type="invalid">
                  No. KTP harus diisi dan sesuai format
                </FormControl.Feedback>
              </FormGroup>
              <FormGroup className="mb-2">
                <FormLabel className="mb-1">No. KTP</FormLabel>
                <FormControl
                  placeholder="Isi No. KTP"
                  value={profileDataPayload.identity_number}
                  onChange={this.onHandleChangeProfileData}
                  name="identity_number"
                  required
                  isInvalid={
                    !ValidatorBoolean({
                      value: profileDataPayload.identity_number,
                      rule: "type:string|max:16",
                    }) && validated
                  }
                />
              </FormGroup>
              <FormGroup className="mb-2">
                <FormLabel className="mb-1">No. KK</FormLabel>
                <FormControl
                  placeholder="Isi No. KK"
                  value={profileDataPayload.family_card_number}
                  onChange={this.onHandleChangeProfileData}
                  name="family_card_number"
                  required
                  isInvalid={
                    !ValidatorBoolean({
                      value: profileDataPayload.family_card_number,
                      rule: "type:string|max:16",
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
                  placeholder="Isi No. HP anda"
                  value={profileDataPayload.phone}
                  name="phone"
                  onChange={this.onHandleChangeProfileData}
                  isInvalid={
                    !ValidatorBoolean({
                      value: profileDataPayload.phone,
                      rule: "type:string|max:3",
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
        </Modal>
      </>
    );
  }
}

function mapStateToProps(state) {
  return state;
}
export default connect(mapStateToProps)(Profile);
