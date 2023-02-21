import React, { Component, Fragment } from "react";
import {
  Button,
  Container,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Form,
  FormFeedback,
  FormGroup,
  FormText,
  Input,
  InputGroup,
  Label,
  UncontrolledDropdown,
} from "reactstrap";
import { ValidatorBoolean } from "utils/validator";

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      haveMarried: false,
      children: [],
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
        [event.target.name]: event.target.value,
      },
    });
  };

  handlePostRegister = (event) => {
    event.preventDefault();
  };

  render() {
    let { haveMarried, children, registerPayload } = this.state;

    return (
      <>
        <Container className="mb-3">
          <Form inline onSubmit={this.handlePostRegister} >
            <Label>Nama</Label>
            <Input
              id="zzz"
              name="full_name"
              value={registerPayload.full_name}
              onChange={this.handleRegister}
              placeholder="Isi nama anda"
              invalid={
                !ValidatorBoolean(registerPayload.full_name, "type:string", false)
              }
            />
            <FormFeedback id="zzz">Nama harus diisi</FormFeedback>
            <Label>Email</Label>
            <Input
              id="email"
              name="email"
              value={registerPayload.email}
              onChange={this.handleRegister}
              placeholder="Isi alamat email anda"
              invalid={
                !ValidatorBoolean(
                  registerPayload.email,
                  "type:string|regex:/^[^s@]+@[^s@]+.[^s@]+$/"
                )
              }
            />
            <FormFeedback id="email">
              Email harus diisi dan sesuai format
            </FormFeedback>
            <Label>No. KTP</Label>
            <Input
              name="identity_number"
              value={registerPayload.identity_number}
              onChange={this.handleRegister}
              placeholder="Isi No. KTP"
              invalid={
                !ValidatorBoolean(
                  registerPayload.identity_number,
                  "type:number|max:16"
                )
              }
            />
            <FormFeedback>No. KTP harus diisi dan sesuai format</FormFeedback>
            <Label>No. KK</Label>
            <Input
              name="family_card_number"
              value={registerPayload.family_card_number}
              placeholder="Isi No. KK"
              invalid={
                !ValidatorBoolean(
                  registerPayload.family_card_number,
                  "type:number|max:16"
                )
              }
            />
            <FormFeedback>Nomor KK harus diisi dan sesuai format</FormFeedback>
            <Label>Blok rumah</Label>
            <Input
              name="blok"
              value={registerPayload.blok}
              onChange={this.handleRegister}
              placeholder="Isi blok rumah anda. Contoh B5"
              invalid={
                !ValidatorBoolean(registerPayload.blok, "type:string|max:2")
              }
            />
            <FormFeedback>Isi blok rumah anda sesuai contoh</FormFeedback>
            <Label>Nomor rumah</Label>
            <Input
              name="home_number"
              value={registerPayload.home_number}
              onChange={this.handleRegister}
              placeholder="Isi nomor rumah anda. Contoh 07"
              invalid={
                !ValidatorBoolean(
                  registerPayload.home_number,
                  "type:number|max:2"
                )
              }
            />
            <FormFeedback>Isi blok rumah anda sesuai contoh</FormFeedback>
            <Label>No. HP</Label>
            <Input
              name="phone"
              value={registerPayload.phone}
              onChange={this.handleRegister}
              placeholder="Isi No. HP anda. Contoh 08183128491"
              invalid={
                !ValidatorBoolean(
                  registerPayload.family_card_number,
                  "type:number|max:13|min:10"
                )
              }
            />
            <FormFeedback>
              Isi nomor HP anda, maksimal 13 digit dan minimal 10 digit
            </FormFeedback>
            <Label>Password</Label>
            <Input
              name="password"
              value={registerPayload.password}
              onChange={this.handleRegister}
              placeholder="Isi No. HP anda"
              invalid={
                !ValidatorBoolean(
                  registerPayload.family_card_number,
                  "type:string|regex:/^(?=.*[\\d])(?=.*[!@#$%^&*])[\\w!@#$%^&*]{6,16}$/"
                )
              }
            />
            <FormFeedback>
              Password harus mengandung angka, huruf kecil dan huruf besar
            </FormFeedback>
            <Label>Konfirmasi Password</Label>
            <Input
              name="password_confirmation"
              value={registerPayload.password_confirmation}
              onChange={this.handleRegister}
              placeholder="Isi No. HP anda"
              invalid={
                !(registerPayload === registerPayload.password_confirmation)
              }
            />
            <FormFeedback>
              Password harus sama dengan password konfirmasi
            </FormFeedback>
            <hr />
            <Button type="submit" className="mt-4 w-100 btn-success">
              Submit
            </Button>
          </Form>
        </Container>
      </>
    );
  }
}

export default Register;
