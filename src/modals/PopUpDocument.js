import React, { forwardRef } from "react";
import {
  Button,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  ModalBody,
} from "react-bootstrap";
import DatePicker from "react-datepicker";
import moment from "moment";

function PopUpDocument({ onChange, onHide, onSubmit, validate, data }) {
  const onChangeFile = (e) => {
    onChange({
      target: {
        value: e.target.files[0],
        name: "file",
      },
    });
  };

  const CustomInput = forwardRef(({ value, onClick }, ref) => (
    <FormControl
      value={moment(value).format("DD-MM-YYYY")}
      ref={ref}
      onClick={onClick}
    />
  ));

  return (
    <div>
      <ModalBody>
        <Form onSubmit={onSubmit} noValidate validated={validate}>
          <FormGroup className="mb-2 position-relative">
            <FormLabel className="mb-1">Tipe Dokumen</FormLabel>
            <FormControl
              type="text"
              name="type"
              value={data?.type}
              onChange={onChange}
              required={false}
            />
            <FormControl.Feedback type="invalid">
              Isi data terlebih dahulu
            </FormControl.Feedback>
          </FormGroup>
          <FormGroup className="mb-2 position-relative">
            <FormLabel className="mb-1">Nomor Dokumen</FormLabel>
            <FormControl
              type="text"
              name="nomor"
              value={data?.nomor}
              onChange={onChange}
              required={false}
            />
            <FormControl.Feedback type="invalid">
              Isi data terlebih dahulu
            </FormControl.Feedback>
          </FormGroup>
          <FormGroup className="mb-2 position-relative">
            <FormLabel className="mb-1">Tanggal Terbit</FormLabel>
            <DatePicker
              customInput={<CustomInput />}
              value={data?.issued_date}
              onChange={(e) =>
                onChange({
                  target: {
                    name: "issued_date",
                    value: moment(e).format("YYYY-MM-DD"),
                  },
                })
              }
            />
            <FormControl.Feedback type="invalid">
              Isi data terlebih dahulu
            </FormControl.Feedback>
          </FormGroup>
          <FormGroup className="mb-2 position-relative">
            <FormLabel className="mb-1">Masa Berlaku</FormLabel>
            <DatePicker
              customInput={<CustomInput />}
              value={data?.validity_period}
              onChange={(e) =>
                onChange({
                  target: {
                    name: "validity_period",
                    value: moment(e).format("YYYY-MM-DD"),
                  },
                })
              }
            />
            <FormControl.Feedback type="invalid">
              Isi data terlebih dahulu
            </FormControl.Feedback>
          </FormGroup>
          <FormGroup className="mb-2 position-relative">
            <FormLabel className="mb-1">Catatan</FormLabel>
            <FormControl
              type="text"
              name="note"
              value={data?.note}
              onChange={onChange}
              required={false}
            />
            <FormControl.Feedback type="invalid">
              Isi data terlebih dahulu
            </FormControl.Feedback>
          </FormGroup>
          <Form.Label>Upload File</Form.Label>
          <Form.Control
            placeholder="Pastikan format file adalah pdf"
            type="file"
            size="md"
            className="h-100"
            onChange={onChangeFile}
          />
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

export default PopUpDocument;
