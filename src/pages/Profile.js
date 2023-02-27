import { getLoginData } from "config/redux/rootAction";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  Button,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  FormGroup,
  FormText,
  Input,
  Label,
  UncontrolledDropdown,
} from "reactstrap";
import { getCookie, removeCookie } from "tiny-cookie";
import request from "utils/request";

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      haveMarried: false,
      children: [],
      dataProfile: {},
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

  componentDidMount() {
    request.get("/auth/info").then((res) => {
      this.setState({
        dataProfile: res.data.docs,
      });
    });
  }

  render() {
    let { haveMarried, children, dataProfile } = this.state;

    return (
      <>
        <Container>
          <Label>Nama</Label>
          <Input
            disabled
            placeholder="Isi nama anda"
            value={dataProfile.full_name}
          />
          <Label>Email</Label>
          <Input
            disabled
            placeholder="Isi alamat email anda"
            value={dataProfile.email}
          />
          <Label>No. KTP</Label>
          <Input
            disabled
            placeholder="Isi No. KTP"
            value={dataProfile.identity_number}
          />
          <Label>No. KK</Label>
          <Input
            disabled
            placeholder="Isi No. KK"
            value={dataProfile.family_card_number}
          />
          <Label>Alamat rumah</Label>
          <Input
            placeholder="Isi Blok dan No. Rumah anda (contoh: B5-21)"
            value={dataProfile.blok + "-" + dataProfile.home_number}
          />
          <Label>No. HP</Label>
          <Input placeholder="Isi No. HP anda" value={dataProfile.phone} />
          <hr />
          <FormGroup check>
            <Input
              type="checkbox"
              checked={haveMarried}
              onClick={this.handleToggle}
              name="haveMarried"
            />
            <Label check>Sudah berkeluarga</Label>
          </FormGroup>
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
                      <Input
                        onChange={(e) => this.handleChangeChildren(id, e)}
                        value={v.name}
                        style={{ height: "40px" }}
                        name="name"
                        type="text"
                      />
                      <UncontrolledDropdown>
                        <DropdownToggle>
                          <Button
                            className="d-flex align-items-center"
                            style={{ height: "25px" }}
                          >
                            <span>
                              {v.relationship ? v.relationship : "Hubungan"}
                              &nbsp;
                            </span>
                            <i
                              className="fa fa-chevron-down"
                              aria-hidden="true"
                            ></i>
                          </Button>
                        </DropdownToggle>
                        <DropdownMenu>
                          <DropdownItem
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
                          </DropdownItem>
                          <DropdownItem
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
                          </DropdownItem>
                          <DropdownItem
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
                          </DropdownItem>
                          <DropdownItem
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
                          </DropdownItem>
                          <DropdownItem
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
                          </DropdownItem>
                          <DropdownItem
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
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
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
          <FormGroup>
            <Label for="exampleFile">Upload KTP</Label>
            <Input id="exampleFile" name="file" type="file" />
            <FormText>Pastikan format file adalah pdf</FormText>
          </FormGroup>
          <FormGroup>
            <Label for="exampleFile">Upload KK</Label>
            <Input id="exampleFile" name="file" type="file" />
            <FormText>Pastikan format file adalah pdf</FormText>
          </FormGroup>
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
          <Link to={'/forgetpassword'}>
            <Button className="mt-2 w-100 btn-info">
              Reset Password
            </Button>
          </Link>
          <Button onClick={this.handleLogout} className="mt-2 w-100 btn-danger">
            Logout
          </Button>
        </Container>
      </>
    );
  }
}

function mapStateToProps(state) {
  return state;
}
export default connect(mapStateToProps)(Profile);
