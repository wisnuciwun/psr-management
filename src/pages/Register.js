import { REGEX_PASSWORD_VALIDATOR, REGEX_EMAIL } from "constants/Constants";
import React, { Component, Fragment } from "react";
// import {
//   Button,
//   Container,
//   Dropdown,
//   DropdownItem,
//   DropdownMenu,
//   DropdownToggle,
//   FormFeedback,
//   FormText,
//   Input,
//   InputGroup,
//   Label,
//   UncontrolledDropdown,
// } from "reactstrap";
import { ValidatorBoolean } from "../utils/validator";
import {
  Container,
  Button,
  // Form,
  FormControl,
  FormGroup,
  FormLabel,
  FormSelect,
  // FormSelect,
} from "react-bootstrap";
import { connect } from "react-redux";
import Form from "react-bootstrap/Form";
import Select from "react-select";
import { getLoginData } from "config/redux/rootAction";
import request from "utils/request";
import { BadgeNotif } from "components/BadgeNotification";

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      validated: false,
      haveMarried: false,
      children: [],
      houseType: "",
      registerPayload: {
        full_name: "",
        email: "",
        password: "",
        password_confirmation: "",
        phone: "",
        address: "",
        identity_number: "",
        family_card_number: "",
        tos: true,
        type: "",
        blok: "",
        home_number: "",
      },
    };
  }

  handleRegister = (event) => {
    this.setState({
      registerPayload: {
        ...this.state.registerPayload,
        [event.target.name]:
          event.target.name === "blok"
            ? event.target.value.toUpperCase()
            : event.target.value,
      },
    });
  };

  handleSelectHouseType = (value) => {
    this.setState({
      houseType: value,
      registerPayload: {
        ...this.state.registerPayload,
        type: value.value,
      },
    });
  };

  handlePostRegister = (event) => {
    let { dispatch } = this.props;
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();

    if (form.checkValidity()) {
      this.setState({
        validated: false,
      });

      request
        .post("/auth", {
          ...this.state.registerPayload,
          address: `${this.state.registerPayload.blok} ${this.state.registerPayload.home_number}`,
          phone: parseInt(this.state.registerPayload.phone),
        })
        .then((res) => {
          if (res?.data?.code === 201) {
            request
              .post("/auth/login", {
                email: res.data.docs.email,
                password: this.state.registerPayload.password,
                // res.data.docs.email
              })
              .then((res) => {
                if (res.data.code === 200) {
                  dispatch(getLoginData(res.data.docs));
                  this.props.navigate("/");
                }
              })
              .catch((error) => {});
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

  render() {
    let { haveMarried, children, registerPayload, validated, houseType } =
      this.state;
    const options = [
      { value: "", label: "Pilih salah satu" },
      { value: "owner", label: "Milik Pribadi" },
      { value: "contract", label: "Kontrak" },
    ];
    return (
      <>
        <Container className="mb-3">
          <Form
            noValidate
            validated={validated}
            onSubmit={this.handlePostRegister}
          >
            <FormGroup className="mb-2">
              <FormLabel className="mb-1">Nama</FormLabel>
              <FormControl
                name="full_name"
                value={registerPayload.full_name}
                onChange={this.handleRegister}
                placeholder="Isi nama anda"
                required
                isInvalid={
                  !ValidatorBoolean({
                    value: registerPayload.full_name,
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
                value={houseType}
                options={options}
              />
              <FormControl.Feedback type="invalid">
                No. KTP harus diisi dan sesuai format
              </FormControl.Feedback>
            </FormGroup>
            <FormGroup className="mb-2">
              <FormLabel className="mb-1">Email</FormLabel>
              <FormControl
                id="email"
                name="email"
                value={registerPayload.email}
                onChange={this.handleRegister}
                placeholder="Isi alamat email anda"
                required
                isInvalid={
                  !ValidatorBoolean({
                    value: registerPayload.email,
                    rule: `type:string|regex:${REGEX_EMAIL}`,
                  }) && validated
                }
              />
              <FormControl.Feedback type="invalid" id="email">
                Email harus diisi dan sesuai format
              </FormControl.Feedback>
            </FormGroup>
            <FormGroup className="mb-2">
              <FormLabel className="mb-1">No. KTP</FormLabel>
              <FormControl
                name="identity_number"
                value={registerPayload.identity_number}
                onChange={this.handleRegister}
                required
                placeholder="Isi No. KTP"
                isInvalid={
                  !ValidatorBoolean({
                    value: registerPayload.identity_number,
                    rule: "type:number|max:16",
                  }) && validated
                }
              />
              <FormControl.Feedback type="invalid">
                No. KTP harus diisi dan sesuai format
              </FormControl.Feedback>
            </FormGroup>
            <FormGroup className="mb-2">
              <FormLabel className="mb-1">No. KK</FormLabel>
              <FormControl
                name="family_card_number"
                value={registerPayload.family_card_number}
                onChange={this.handleRegister}
                placeholder="Isi No. KK"
                required
                isInvalid={
                  !ValidatorBoolean({
                    value: registerPayload.family_card_number,
                    rule: "type:number|max:16",
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
                value={registerPayload.blok}
                onChange={this.handleRegister}
                placeholder="Isi blok rumah anda. Contoh: B5"
                required
                isInvalid={
                  !ValidatorBoolean({
                    value: registerPayload.blok,
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
                value={registerPayload.home_number}
                onChange={this.handleRegister}
                placeholder="Isi nomor rumah anda. Contoh: 07"
                required
                isInvalid={
                  !ValidatorBoolean({
                    value: registerPayload.home_number,
                    rule: "type:number|max:2",
                  }) && validated
                }
              />
              <FormControl.Feedback type="invalid">
                Isi blok rumah anda sesuai contoh
              </FormControl.Feedback>
            </FormGroup>
            <FormGroup className="mb-2">
              <FormLabel className="mb-1">No. HP</FormLabel>
              <FormControl
                name="phone"
                value={registerPayload.phone}
                onChange={this.handleRegister}
                placeholder="Isi No. HP anda. Contoh 08183128491"
                required
                isInvalid={
                  !ValidatorBoolean({
                    value: registerPayload.family_card_number,
                    rule: "type:number|max:13|min:10",
                  }) && validated
                }
              />
              <FormControl.Feedback type="invalid">
                Isi nomor HP anda, maksimal 13 digit dan minimal 10 digit
              </FormControl.Feedback>
            </FormGroup>
            <FormGroup className="mb-2">
              <FormLabel className="mb-1">Password</FormLabel>
              <FormControl
                name="password"
                value={registerPayload.password}
                onChange={this.handleRegister}
                placeholder="Ketik password anda"
                required
                isInvalid={
                  !ValidatorBoolean({
                    value: registerPayload.family_card_number,
                    rule: `type:string|regex:${REGEX_PASSWORD_VALIDATOR}`,
                  }) && validated
                }
              />
              <FormControl.Feedback type="invalid">
                Password harus mengandung angka, huruf kecil dan huruf besar
              </FormControl.Feedback>
            </FormGroup>
            <FormGroup className="mb-2">
              <FormLabel className="mb-1">Konfirmasi Password</FormLabel>
              <FormControl
                name="password_confirmation"
                value={registerPayload.password_confirmation}
                onChange={this.handleRegister}
                placeholder="Ketik ulang password anda"
                required
                isInvalid={
                  registerPayload === registerPayload.password_confirmation &&
                  validated
                }
              />
              <FormControl.Feedback type="invalid">
                Password harus sama dengan password konfirmasi
              </FormControl.Feedback>
            </FormGroup>
            <hr />
            <Button
              onClick={this.handlePostRegister}
              className="mt-2 w-100 btn-success"
            >
              Submit
            </Button>
          </Form>
        </Container>
      </>
    );
  }
}

function mapStateToProps(state) {
  return state;
}
export default connect(mapStateToProps)(Register);
