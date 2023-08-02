import { emergencyContact } from "constants/tempDataPersonal";
import React from "react";
import {
  Button,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  ModalBody,
} from "react-bootstrap";
import Select from "react-select";

function PopUpEmergency({ onChange, onHide, onSubmit, validate, data }) {
  return (
    <div>
      <ModalBody>
        <Form onSubmit={onSubmit} noValidate validated={validate}>
          <FormGroup className="mb-2 position-relative">
            <FormLabel className="mb-1">
              Nama <span className="important">*</span>
            </FormLabel>
            <FormControl
              type="text"
              name="full_name"
              value={data?.full_name}
              onChange={onChange}
              required
            />
            <FormControl.Feedback type="invalid">
              Isi data terlebih dahulu
            </FormControl.Feedback>
          </FormGroup>
          <FormGroup className="mb-2 position-relative">
            <FormLabel className="mb-1">
              Alamat <span className="important">*</span>
            </FormLabel>
            <FormControl
              type="text"
              name="address"
              value={data?.address}
              onChange={onChange}
              required
            />
            <FormControl.Feedback type="invalid">
              Isi data terlebih dahulu
            </FormControl.Feedback>
          </FormGroup>
          <FormGroup className="mb-2 position-relative">
            <FormLabel className="mb-1">
              Nomor Telepon <span className="important">*</span>
            </FormLabel>
            <FormControl
              maxLength={13}
              type="text"
              name="phone"
              value={data?.phone}
              onChange={(e) => {
                if (
                  parseInt(
                    e.target.value[e.target.value.length - 1]
                  ).toString() != "NaN" ||
                  e.target.value == ""
                ) {
                  onChange(e);
                }
              }}
              required
            />
            <FormControl.Feedback type="invalid">
              Isi data terlebih dahulu
            </FormControl.Feedback>
          </FormGroup>
          <FormGroup className="mb-2 position-relative">
            <FormLabel className="mb-1">
              Hubungan Keluarga <span className="important">*</span>
            </FormLabel>
            <Select
              onChange={(v) =>
                onChange({ target: { name: "relationship", value: v.value } })
              }
              value={{ value: data.relationship, label: data.relationship }}
              options={emergencyContact}
              placeholder="Pilih salah satu"
            />
            {/* <FormControl
              type="text"
              name="relationship"
              value={data?.relationship}
              onChange={onChange}
              required
            /> */}
            <FormControl.Feedback type="invalid">
              Isi data terlebih dahulu
            </FormControl.Feedback>
          </FormGroup>
          <div
            style={{ gap: "8px" }}
            className="d-flex justify-content-between mt-4"
          >
            <Button onClick={onHide} className="btn-primary-white w-50">
              Cancel
            </Button>
            <Button type="submit" className="btn-primary-yellow w-50">
              Save
            </Button>
          </div>
        </Form>
      </ModalBody>
    </div>
  );
}

export default PopUpEmergency;
