import React from "react";
import {
     Button,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  ModalBody,
} from "react-bootstrap";

function PopUpProfile({ onChange, required }) {
  return (
    <div>
      <ModalBody>
        <Form>
          <FormGroup className="mb-2 position-relative">
            <FormLabel className="mb-1">Nomor Kartu Keluarga</FormLabel>
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
            <FormLabel className="mb-1">Nama Lengkap</FormLabel>
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
            <FormLabel className="mb-1">Konfirmasi Password</FormLabel>
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
            <FormLabel className="mb-1">Nama Panggilan</FormLabel>
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
            <FormLabel className="mb-1">Agama</FormLabel>
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
            <FormLabel className="mb-1">Nama Ibu Kandung</FormLabel>
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
            <FormLabel className="mb-1">Tinggi Badan</FormLabel>
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
            <FormLabel className="mb-1">Berat Badan</FormLabel>
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
            <FormLabel className="mb-1">Gol. Darah</FormLabel>
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
            <FormLabel className="mb-1">Email</FormLabel>
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
        <div
          style={{ gap: "8px" }}
          className="d-flex justify-content-between mt-4"
        >
          <Button className="btn-primary-white w-50">Cancel</Button>
          <Button className="btn-primary-yellow w-50">Save</Button>
        </div>
      </ModalBody>
    </div>
  );
}

export default PopUpProfile;
