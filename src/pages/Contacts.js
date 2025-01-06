import React, { Component } from "react";
import {
  Button,
  Col,
  Form,
  FormGroup,
  FormText,
  FormControl,
  FormLabel,
} from "react-bootstrap";

export class Contacts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      name: "",
      bodyEmail: "",
    };
  }
  render() {
    return (
      <div className={window.location.pathname === "/kontak" ? "p-3" : ""}>
        <Form className="w-100">
          {/* <FormGroup className="mb-2" row>
            <FormLabel className="mb-1" for="exampleEmail" sm={2}>
              Email
            </FormLabel>
            <Col sm={12}>
              <FormControl
                type="email"
                name="email"
                id="exampleEmail"
                placeholder="Silahkan isi email anda"
                onChange={(e) => this.setState({ email: e.target.value })}
                value={this.state.email}
              />
            </Col>
          </FormGroup> */}
          <FormGroup className="mb-2" row>
            <FormLabel className="mb-1" for="exampleEmail" sm={2}>
              Nama
            </FormLabel>
            <Col sm={12}>
              <FormControl
                type="text"
                name="name"
                id="exampleEmail"
                placeholder="Silahkan isi nama anda"
                onChange={(e) => this.setState({ name: e.target.value })}
                value={this.state.name}
              />
            </Col>
          </FormGroup>
          <FormGroup className="mb-2" row>
            <FormLabel className="mb-1" for="exampleText" sm={2}>
              Pesan
            </FormLabel>
            <Col sm={12}>
              <FormControl
                as="textarea"
                style={{ height: "200px" }}
                name="text"
                id="exampleText"
                placeholder="Silahkan isi pesan anda"
                onChange={(e) => this.setState({ bodyEmail: e.target.value })}
                value={this.state.bodyEmail}
              />
            </Col>
          </FormGroup>
          <FormGroup className="mb-2" row>
            <Col sm={12} className="mt-3">
              <a
                href={`https://wa.me/6281320500045?text=Assalamualaikum min, saya ${this.state.name}. ${this.state.bodyEmail}`}
                target="_blank"
              >
                <Button className="w-100 btn-primary-yellow">
                  Kirim ke WA Pengurus
                </Button>
              </a>
            </Col>
          </FormGroup>
        </Form>
        <br />
        <h6 className="mb-4">Lokasi Balai Warga</h6>
        <div className="d-flex align-items-center h-100">
          <iframe
            style={{ width: "100%", height: "450px", border: 0 }}
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d989.9441042133652!2d107.61163716957196!3d-7.035543899560394!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68eb003f9ace55%3A0xf5b690e54897d59b!2sBALAI%20WARGA%20PSR!5e0!3m2!1sid!2sid!4v1736203921835!5m2!1sid!2sid"
            allowfullscreen="false"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <br />
      </div>
    );
  }
}

export default Contacts;
