import React, { Component } from "react";
import { Link, Navigate } from "react-router-dom";
import { Button, Container, Form, FormFeedback, Input, Label } from "reactstrap";
import request from "../utils/request";
import { connect } from "react-redux";
import { getLoginData } from "config/redux/rootAction";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
     invalidInput: false,
      loginPayload: {
        email: "",
        password: "",
      },
    };
  }

  onHandleLogin = (event) => {
     console.log("fff", event);
     event.preventDefault()
    let { dispatch } = this.props;
    request.post("/auth/login", this.state.loginPayload).then((res) => {
      if (res.data.code === 200) {
        dispatch(getLoginData(res.data.docs));
        this.props.navigate("/");
      }
    });
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
    const { loginPayload } = this.state;
    return (
      <>
        <div
          className="d-flex align-items-center h-100"
          style={{ minHeight: "70vh" }}
        >
          <Container>
            <Form onSubmit={this.onHandleLogin} noValidate>
              <Label>Username</Label>
              <Input
                onChange={this.onHandleChangeUser}
                name="email"
                value={loginPayload.email}
                invalid={true}
              />
              <FormFeedback>ok</FormFeedback>
              <Label>Password</Label>
              <Input
                onChange={this.onHandleChangeUser}
                name="password"
                value={loginPayload.password}
              />
              <Button type="submit" className="w-100 mt-4">
                Login
              </Button>
            </Form>
            <p className="text-center mt-2">
              Belum punya akun?{" "}
              <Link to={"/register"} className="pointer">
                Register
              </Link>
            </p>
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
