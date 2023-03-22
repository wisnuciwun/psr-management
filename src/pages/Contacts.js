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
      <div className="p-3">
        <h5 className="mb-4">
          <i className="fa fa-lightbulb-o" aria-hidden="true">
            &nbsp;&nbsp;
          </i>
          Kotak Aspirasi
        </h5>
        <div className="d-block">
          <p>
            Apabila anda memiliki keluhan, kritik maupun saran. Anda dapat
            menggunakan link dibawah ini untuk mengisi Kotak Aspirasi. Semua
            akan ditampung dan disampaikan langsung ke pengurus Prima Swarga
            Residence.
          </p>
          <a
            rel="noopener noreferrer"
            href="https://docs.google.com/forms/d/1-BepTEfgVStMcAw8NSd7OHAqihVfQZdcl1vEmta6Huk/viewform?edit_requested=true"
            target="_blank"
          >
            Klik disini
          </a>
        </div>
        <br />
        <h5 className="mb-4">
          <i className="fa fa-phone" aria-hidden="true">
            &nbsp;&nbsp;
          </i>
          Hubungi Kami
        </h5>
        <Form>
          <FormGroup className="mb-2" row>
            <FormLabel className="mb-1" for="exampleEmail" sm={2}>
              Email
            </FormLabel>
            <Col sm={10}>
              <FormControl
                type="email"
                name="email"
                id="exampleEmail"
                placeholder="Silahkan isi email anda"
                onChange={(e) => this.setState({ email: e.target.value })}
                value={this.state.email}
              />
            </Col>
          </FormGroup>
          <FormGroup className="mb-2" row>
            <FormLabel className="mb-1" for="exampleEmail" sm={2}>
              Nama
            </FormLabel>
            <Col sm={10}>
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
            <Col sm={10}>
              <FormControl
                as='textarea'
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
            <Col sm={2}></Col>
            <Col sm={10} className="mt-3">
              <a
                href={`mailto:primaswargaresidence@gmail.com?&subject=Pesan dari - ${this.state.name}&body=${this.state.bodyEmail}`}
              >
                <Button className="w-100">Submit</Button>
              </a>
            </Col>
          </FormGroup>
        </Form>
        <br />
        <h5 className="mb-4">
          <i className="fa fa-home" aria-hidden="true">
            &nbsp;&nbsp;
          </i>
          Lokasi Perumahan
        </h5>
        <div className="d-flex align-items-center h-100">
          <iframe
            style={{ width: "100%", height: "450px", border: 0 }}
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15839.155490446004!2d107.609882!3d-7.0340834!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x9d8b41110835f69b!2sPrima%20Swarga%20Residence!5e0!3m2!1sen!2sid!4v1674440275828!5m2!1sen!2sid"
            allowfullscreen=""
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
