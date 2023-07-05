import React, { Component } from "react";
import { Link, Navigate } from "react-router-dom";
import { Button, Container, FormGroup } from "react-bootstrap";
import request from "../utils/request";
import { connect } from "react-redux";
import { getLoginData } from "config/redux/rootAction";
import { Form, FormControl, FormLabel } from "react-bootstrap";
import { REGEX_EMAIL } from "constants/Constants";
import { ValidatorBoolean } from "../utils/validator";
import { BadgeNotif } from "components/BadgeNotification";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      validated: false,
      hidePassword: true,
      loginPayload: {
        email: "",
        password: "",
      },
    };
  }

  onHandleLogin = (event) => {
    let { dispatch } = this.props;
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();

    if (form.checkValidity()) {
      this.setState({
        validated: false,
      });
      request.post("/auth/login", this.state.loginPayload).then((res) => {
        if (res.data?.code === 200) {
          dispatch(getLoginData(res.data.docs));
          this.props.navigate("/");
        } else {
          BadgeNotif.show({
            text: res.response.data.message || "Terjadi kesalahan",
            variant: "warning",
          });
        }
      });
    } else {
      this.setState({
        validated: true,
      });
    }
  };

  onHandleChangeUser = (event) => {
    this.setState({
      loginPayload: {
        ...this.state.loginPayload,
        [event.target.name]: event.target.value,
      },
    });
  };

  render() {
    const { loginPayload, validated, hidePassword } = this.state;

    return (
      <>
        <div
          className="d-flex align-items-center h-100"
          style={{ minHeight: "85vh" }}
        >
          <Container>
            <Form
              noValidate
              validated={validated}
              onSubmit={this.onHandleLogin}
            >
              <div className="text-center">
                <h3>Welcome Back!</h3>
                <p>login to enter dashboard</p>
                <img src="/assets/logo2.png" style={{ width: "97px" }} alt="" />
              </div>
              <FormGroup className="mt-4">
                <FormLabel className="mb-1">Email</FormLabel>
                <FormControl
                  className="input-no-decoration"
                  onChange={this.onHandleChangeUser}
                  name="email"
                  value={loginPayload.email}
                  isInvalid={
                    !ValidatorBoolean({
                      value: loginPayload.email,
                      rule: `type:string|regex:${REGEX_EMAIL}`,
                    }) && validated
                  }
                  required
                />
                <FormControl.Feedback type="invalid">
                  Silahkan input email anda terlebih dahulu
                </FormControl.Feedback>
              </FormGroup>
              <FormGroup className="position-relative mt-4">
                <FormLabel className="mb-1">Password</FormLabel>
                <FormControl
                  className="input-no-decoration"
                  type={hidePassword ? "password" : "text"}
                  onChange={this.onHandleChangeUser}
                  name="password"
                  value={loginPayload.password}
                  isInvalid={
                    ValidatorBoolean({
                      value: loginPayload.password,
                      rule: "type:string",
                    }) && validated
                  }
                  required
                />
                <FormControl.Feedback type="invalid">
                  Silahkan input password anda terlebih dahulu
                </FormControl.Feedback>
              </FormGroup>
              <br />
              <Button type="submit" className="w-100 mt-4 btn-primary-yellow">
                Login
              </Button>
            </Form>
            {/* <p className="text-center mt-2">
              Belum punya akun?{" "}
              <Link to={"/register"} className="pointer color-primary-yellow">
                Register
              </Link>
            </p> */}
          </Container>
        </div>
      </>
    );
  }
}

function mapStateToProps(state) {
  return state;
}
export default connect(mapStateToProps)(Login);
