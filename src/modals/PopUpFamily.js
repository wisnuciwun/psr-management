import React from "react";
import { Button, Form, FormControl, FormGroup, FormLabel, ModalBody } from "react-bootstrap";

function PopUpFamily({ onChange, onHide, onSubmit, validate }) {
  return (
    <div>
      <ModalBody>
        <Form onSubmit={onSubmit} noValidate validated={validate}>
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
            <FormLabel className="mb-1">NIK</FormLabel>
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
            <FormLabel className="mb-1">Tempat Lahir</FormLabel>
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
            <FormLabel className="mb-1">Tanggal Lahir</FormLabel>
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
            <FormLabel className="mb-1">Jenis Kelamin</FormLabel>
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
            <FormLabel className="mb-1">Pendidikan</FormLabel>
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
            <FormLabel className="mb-1">Pekerjaan</FormLabel>
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
            <FormLabel className="mb-1">Status Perkawinan</FormLabel>
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
            <FormLabel className="mb-1">Tanggal Perkawinan</FormLabel>
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
            <FormLabel className="mb-1">
              Status Hubungan Dalam Keluarga
            </FormLabel>
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
            <FormLabel className="mb-1">Kewarganegaraan</FormLabel>
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
            <FormLabel className="mb-1">Nama Ayah</FormLabel>
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
            <FormLabel className="mb-1">Nama Ibu</FormLabel>
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

export default PopUpFamily;
