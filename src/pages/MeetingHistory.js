import React, { Component } from 'react'
import { Button, Col, Form, FormGroup, FormText, Input, Label } from 'reactstrap'

export class MeetingHistory extends Component {
  render() {
    return (
      <div className='p-3'>
        <h5 className='mb-4'><i className="fa fa-phone" aria-hidden="true">&nbsp;&nbsp;</i>Hubungi Kami</h5>
        <Form>
          <FormGroup row>
            <Label for="exampleEmail" sm={2}>Email</Label>
            <Col sm={10}>
              <Input type="email" name="email" id="exampleEmail" placeholder="Silahkan isi email anda" />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="exampleEmail" sm={2}>Nama</Label>
            <Col sm={10}>
              <Input type="text" name="name" id="exampleEmail" placeholder="Silahkan isi nama anda" />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="exampleText" sm={2}>Pesan</Label>
            <Col sm={10}>
              <Input type="textarea" name="text" id="exampleText" placeholder='Silahkan isi pesan anda' />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col sm={2}>
            </Col>
          <Col sm={10}>
              <Button className='w-100'>Submit</Button>
          </Col>
          </FormGroup>
        </Form>
        <br />
        <h5 className='mb-4'><i className="fa fa-home" aria-hidden="true">&nbsp;&nbsp;</i>Lokasi Perumahan</h5>
        <div className='d-flex align-items-center h-100'>
          <iframe style={{ width: '100%', height: '450px', border: 0 }} src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15839.155490446004!2d107.609882!3d-7.0340834!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x9d8b41110835f69b!2sPrima%20Swarga%20Residence!5e0!3m2!1sen!2sid!4v1674440275828!5m2!1sen!2sid" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
        <br />
      </div>
    )
  }
}

export default MeetingHistory