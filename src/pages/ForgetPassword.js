import { BadgeNotif } from "components/BadgeNotification";
import { REGEX_PASSWORD_VALIDATOR } from "constants/Constants";
import React, { Component } from "react";
import {
  Button,
  Container,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
} from "react-bootstrap";
import request from "utils/request";
import { ValidatorBoolean } from "utils/validator";

class ForgetPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hideOldPassword: true,
      hideNewPassword: true,
      hideConfirmPassword: true,
      validated: false,
      resetPasswordPayload: {
        old_password: "",
        password: "",
        password_confirmation: "",
      },
    };
  }

  onHandleChangePassword = (event) => {
    this.setState({
      resetPasswordPayload: {
        ...this.state.resetPasswordPayload,
        [event.target.name]: event.target.value,
      },
    });
  };

  onHandleSubmitPassword = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();

    if (form.checkValidity()) {
      this.setState({
        validated: false,
      });

      request
        .put("/auth/update_password", this.state.resetPasswordPayload)
        .then((res) => {
          if (res.data?.code === 200) {
            BadgeNotif.show({
              text: "Password berhasil diubah",
              delay: 3000,
              variant: "success",
            });
            setTimeout(() => {
              this.props.navigate("/");
            }, 3100);
          } else {
            BadgeNotif.show({
              text: res.response.data.message || "Terjadi kesalahan",
              delay: 3000,
            });
          }
        });
    } else {
      this.setState({
        validated: true,
      });
    }
  };

  render() {
    let {
      resetPasswordPayload,
      validated,
      hideConfirmPassword,
      hideNewPassword,
      hideOldPassword,
    } = this.state;
    return (
      <>
        <div
          className="d-flex align-items-center h-100"
          style={{ minHeight: "70vh" }}
        >
          <Container>
            <Form
              onSubmit={this.onHandleSubmitPassword}
              noValidate
              validated={validated}
            >
              <FormGroup className="position-relative">
                <FormLabel>Password Lama</FormLabel>
                <FormControl
                  type={hideOldPassword ? "password" : "text"}
                  name="old_password"
                  value={resetPasswordPayload.old_password}
                  onChange={this.onHandleChangePassword}
                  required
                  isInvalid={
                    !ValidatorBoolean({
                      value: resetPasswordPayload.old_password,
                      rule: "type:string",
                    }) && validated
                  }
                />
                <i
                  onClick={() =>
                    this.setState({
                      hideOldPassword: !hideOldPassword,
                    })
                  }
                  className={`fa-regular  ${
                    hideOldPassword ? "fa-eye" : "fa-eye-slash"
                  } fa-lg cursor-pointer btn-password fa icon-suffix`}
                ></i>
                <FormControl.Feedback type="invalid">
                  Silahkan password lama anda terlebih dahulu
                </FormControl.Feedback>
              </FormGroup>
              <FormGroup className="position-relative">
                <FormLabel>Password Baru</FormLabel>
                <FormControl
                  type={hideNewPassword ? "password" : "text"}
                  name="password"
                  value={resetPasswordPayload.password}
                  onChange={this.onHandleChangePassword}
                  required
                  isInvalid={
                    !ValidatorBoolean({
                      value: resetPasswordPayload.password,
                      rule: `type:string|${REGEX_PASSWORD_VALIDATOR}`,
                    }) && validated
                  }
                />
                <i
                  onClick={() =>
                    this.setState({
                      hideNewPassword: !hideNewPassword,
                    })
                  }
                  className={`fa-regular  ${
                    hideNewPassword ? "fa-eye" : "fa-eye-slash"
                  } fa-lg cursor-pointer btn-password fa icon-suffix`}
                ></i>
                <FormControl.Feedback type="invalid">
                  Silahkan password baru anda terlebih dahulu
                </FormControl.Feedback>
              </FormGroup>
              <FormGroup className="position-relative">
                <FormLabel>Konfirmasi Password Baru</FormLabel>
                <FormControl
                  type={hideConfirmPassword ? "password" : "text"}
                  name="password_confirmation"
                  value={resetPasswordPayload.password_confirmation}
                  onChange={this.onHandleChangePassword}
                  required
                  isInvalid={
                    resetPasswordPayload.password !==
                      resetPasswordPayload.password_confirmation && validated
                  }
                />
                <i
                  onClick={() =>
                    this.setState({
                      hideConfirmPassword: !hideConfirmPassword,
                    })
                  }
                  className={`fa-regular  ${
                    hideConfirmPassword ? "fa-eye" : "fa-eye-slash"
                  } fa-lg cursor-pointer btn-password fa icon-suffix`}
                ></i>
                <FormControl.Feedback type="invalid">
                  Ketik ulang password baru anda
                </FormControl.Feedback>
              </FormGroup>
              <Button type="submit" className="w-100 mt-4 btn-success">
                Submit
              </Button>
            </Form>
          </Container>
        </div>
      </>
    );
  }
}

export default ForgetPassword;
