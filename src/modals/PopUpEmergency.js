import React from "react";
import { Button, Form, FormControl, FormGroup, FormLabel, ModalBody } from "react-bootstrap";

function PopUpEmergency({ onChange, onHide, onSubmit, validate }) {
  return (
    <div>
      <ModalBody>
        <Form onSubmit={onSubmit} noValidate validated={validate}>
          <FormGroup className="mb-2 position-relative">
            <FormLabel className="mb-1">Nama</FormLabel>
            <FormControl
              type="text"
              name="old_password"
              value=""
              onChange={onChange}
              required={false}
            />
            <FormControl.Feedback type="invalid">
              Isi data terlebih dahulu
            </FormControl.Feedback>
          </FormGroup>
          <FormGroup className="mb-2 position-relative">
            <FormLabel className="mb-1">Alamat</FormLabel>
            <FormControl
              type="text"
              name="old_password"
              value=""
              onChange={onChange}
              required={false}
            />
            <FormControl.Feedback type="invalid">
              Isi data terlebih dahulu
            </FormControl.Feedback>
          </FormGroup>
          <FormGroup className="mb-2 position-relative">
            <FormLabel className="mb-1">Nomor Telepon</FormLabel>
            <FormControl
              type="text"
              name="old_password"
              value=""
              onChange={onChange}
              required={false}
            />
            <FormControl.Feedback type="invalid">
              Isi data terlebih dahulu
            </FormControl.Feedback>
          </FormGroup>
          <FormGroup className="mb-2 position-relative">
            <FormLabel className="mb-1">Tipe Keluarga</FormLabel>
            <FormControl
              type="text"
              name="old_password"
              value=""
              onChange={onChange}
              required={false}
            />
            <FormControl.Feedback type="invalid">
              Isi data terlebih dahulu
            </FormControl.Feedback>
          </FormGroup>
        </Form>
        <div style={{gap: '8px'}} className="d-flex justify-content-between mt-4">
          <Button onClick={onHide} className="btn-primary-white w-50">Cancel</Button>
          <Button type="submit" className="btn-primary-yellow w-50">Save</Button>
        </div>
      </ModalBody>
    </div>
  );
}

export default PopUpEmergency;
