import React, { forwardRef } from "react";
import {
  Button,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  ModalBody,
} from "react-bootstrap";
import Select from "react-select";
import moment from "moment";
import DatePicker from "react-datepicker";

function PopUpFamily({
  onChange,
  onHide,
  onSubmit,
  validate,
  data,
  religionOpt,
  bloodOpt,
  genderOpt,
  citizenOpt,
}) {
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
            <FormLabel className="mb-1">Nomor Kartu Keluarga</FormLabel>
            <FormControl
              type="number"
              name="identity_number"
              value={data?.identity_number}
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
              type="number"
              name="identity_number"
              value={data?.identity_number}
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
              name="full_name"
              value={data?.full_name}
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
              name="nickname"
              value={data?.nickname}
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
              name="place_of_birth"
              value={data?.place_of_birth}
              onChange={onChange}
              required={false}
            />
            <FormControl.Feedback type="invalid">
              Isi data terlebih dahulu
            </FormControl.Feedback>
          </FormGroup>
          <FormGroup className="mb-2 position-relative">
            <FormLabel className="mb-1">Tanggal Lahir</FormLabel>
            <DatePicker
              customInput={<CustomInput />}
              value={data?.date_of_birth}
              onChange={(e) =>
                onChange({
                  target: {
                    name: "date_of_birth",
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
            <FormLabel className="mb-1">Jenis Kelamin</FormLabel>
            <Select
              onChange={(v) =>
                onChange({ target: { name: "gender", value: v.value } })
              }
              value={genderOpt.find((x) => x.value === data.gender)}
              options={genderOpt}
              placeholder="Pilih salah satu"
            />
            <FormControl.Feedback type="invalid">
              Isi data terlebih dahulu
            </FormControl.Feedback>
          </FormGroup>
          <FormGroup className="mb-2 position-relative">
            <FormLabel className="mb-1">Agama</FormLabel>
            <Select
              onChange={(v) =>
                onChange({ target: { name: "religion", value: v.value } })
              }
              value={{ value: data.religion, label: data.religion }}
              options={religionOpt}
              placeholder="Pilih salah satu"
            />
            <FormControl.Feedback type="invalid">
              Isi data terlebih dahulu
            </FormControl.Feedback>
          </FormGroup>
          <FormGroup className="mb-2 position-relative">
            <FormLabel className="mb-1">Pendidikan</FormLabel>
            <FormControl
              type="text"
              name="education"
              value={data?.education}
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
              name="occupation"
              value={data?.occupation}
              onChange={onChange}
              required={false}
            />
            <FormControl.Feedback type="invalid">
              Isi data terlebih dahulu
            </FormControl.Feedback>
          </FormGroup>
          <FormGroup className="mb-2 position-relative">
            <FormLabel className="mb-1">Gol. Darah</FormLabel>
            <Select
              onChange={(v) =>
                onChange({ target: { name: "blood_type", value: v.value } })
              }
              value={{ label: data.blood_type, value: data.blood_type }}
              options={bloodOpt}
              placeholder="Pilih salah satu"
            />
            <FormControl.Feedback type="invalid">
              Isi data terlebih dahulu
            </FormControl.Feedback>
          </FormGroup>
          <FormGroup className="mb-2 position-relative">
            <FormLabel className="mb-1">Status Perkawinan</FormLabel>
            <FormControl
              type="text"
              name="marital_status"
              value={data?.marital_status}
              onChange={onChange}
              required={false}
            />
            <FormControl.Feedback type="invalid">
              Isi data terlebih dahulu
            </FormControl.Feedback>
          </FormGroup>
          <FormGroup className="mb-2 position-relative">
            <FormLabel className="mb-1">Tanggal Perkawinan</FormLabel>
            <DatePicker
              customInput={<CustomInput />}
              value={data?.marital_status_date}
              onChange={(e) =>
                onChange({
                  target: {
                    name: "marital_status_date",
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
            <FormLabel className="mb-1">
              Status Hubungan Dalam Keluarga
            </FormLabel>
            <FormControl
              type="text"
              name="relationship"
              value={data?.relationship}
              onChange={onChange}
              required={false}
            />
            <FormControl.Feedback type="invalid">
              Isi data terlebih dahulu
            </FormControl.Feedback>
          </FormGroup>
          <FormGroup className="mb-2 position-relative">
            <FormLabel className="mb-1">Kewarganegaraan</FormLabel>
            <Select
              onChange={(v) =>
                onChange({ target: { name: "citizenship", value: v.value } })
              }
              value={citizenOpt.find((x) => x.value === data?.citizenship)}
              options={citizenOpt}
              placeholder="Pilih salah satu"
            />
            <FormControl.Feedback type="invalid">
              Isi data terlebih dahulu
            </FormControl.Feedback>
          </FormGroup>
          <FormGroup className="mb-2 position-relative">
            <FormLabel className="mb-1">Nama Ayah</FormLabel>
            <FormControl
              type="text"
              name="father_name"
              value={data?.father_name}
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
              name="mother_name"
              value={data?.mother_name}
              onChange={onChange}
              required={false}
            />
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

export default PopUpFamily;
