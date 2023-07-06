import React from "react";
import { useRef } from "react";
import {
  Button,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  ModalBody,
} from "react-bootstrap";
import Select from "react-select";

function PopUpProfile({
  onChange,
  required,
  onHide,
  onSubmit,
  validate,
  data,
  religionOpt,
  bloodOpt,
  uploadPhoto,
}) {
  let refs = useRef();

  return (
    <div>
      <ModalBody>
        <FormLabel className="mb-1">Image Profile</FormLabel>
        <div
          className="d-flex justify-content-start mb-4"
          style={{ gap: "8px" }}
        >
          <div
            style={{
              width: "72px",
              height: "72px",
              borderRadius: "8px",
              backgroundColor: "gray",
            }}
          >
            <img src={data.image_url} style={{ width: '72px', height: '72px', objectFit: 'cover', borderRadius: '8px' }} />
          </div>
          <FormControl
            ref={refs}
            hidden
            type="file"
            size="md"
            className="h-100"
            onChange={uploadPhoto}
          />
          <div className="font-sm" style={{ color: 'gray' }}>
            <span>Format .JPG .JPEG .PNG</span>
            <br />
            <span>File Size Max. 5 MB</span>
            <br />
            <Button
              onClick={() => refs.current.click()}
              className="btn-primary-white"
            >
              Upload
            </Button>
          </div>
        </div>
        <Form onSubmit={onSubmit} noValidate validated={validate}>
          <div className="d-flex mb-3" style={{ gap: "10px" }}>
            <Form.Check
              name="appellation"
              onClick={onChange}
              value="Bapak"
              label="Bapak"
              type="radio"
              checked={data?.appellation === "Bapak"}
            />
            <Form.Check
              name="appellation"
              onClick={onChange}
              value="Ibu"
              label="Ibu"
              type="radio"
              checked={data?.appellation === "Ibu"}
            />
          </div>
          <FormGroup className="mb-3 position-relative">
            <FormLabel className="mb-1">
              Nomor Kartu Keluarga<span className="important">*</span>
            </FormLabel>
            <FormControl
              type="text"
              maxLength="16"
              name="family_card_number"
              value={data.family_card_number}
              onChange={(e) => {
                if (parseInt(e.target.value).toString() != 'NaN' || e.target.value == '') {
                  onChange(e)
                }
              }}
              required
            />
            <FormControl.Feedback type="invalid">
              Isi data terlebih dahulu
            </FormControl.Feedback>
          </FormGroup>
          <FormGroup className="mb-3 position-relative">
            <FormLabel className="mb-1">
              Nama Lengkap <span className="important">*</span>
            </FormLabel>
            <FormControl
              type="text"
              name="full_name"
              value={data.full_name}
              onChange={onChange}
              required
            />
            <FormControl.Feedback type="invalid">
              Isi data terlebih dahulu
            </FormControl.Feedback>
          </FormGroup>
          <FormGroup className="mb-3 position-relative">
            <FormLabel className="mb-1">
              Nama Panggilan <span className="important">*</span>
            </FormLabel>
            <FormControl
              type="text"
              name="nickname"
              value={data.nickname}
              onChange={onChange}
              required
            />
            <FormControl.Feedback type="invalid">
              Isi data terlebih dahulu
            </FormControl.Feedback>
          </FormGroup>
          <FormGroup className="mb-2 position-relative">
            <FormLabel className="mb-1">
              Nomor Handphone
              <span className="important">*</span>
            </FormLabel>
            <FormControl
              type="number"
              name="phone"
              value={data.phone}
              onChange={onChange}
              required
            />
            <FormControl.Feedback type="invalid">
              Isi data terlebih dahulu
            </FormControl.Feedback>
          </FormGroup>
          <FormGroup className="mb-2 position-relative">
            <FormLabel className="mb-1">
              Alamat
              <span className="important">*</span>
            </FormLabel>
            <FormControl
              type="text"
              name="address"
              value={data.address}
              onChange={onChange}
              required
            />
            <FormControl.Feedback type="invalid">
              Isi data terlebih dahulu
            </FormControl.Feedback>
          </FormGroup>
          <FormGroup className="mb-3 position-relative">
            <FormLabel className="mb-1">
              Agama <span className="important">*</span>
            </FormLabel>
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
          <FormGroup className="mb-3 position-relative">
            <FormLabel className="mb-1">
              Nama Ibu Kandung <span className="important">*</span>
            </FormLabel>
            <FormControl
              type="text"
              name="mother_name"
              value={data.mother_name}
              onChange={onChange}
              required
            />
            <FormControl.Feedback type="invalid">
              Isi data terlebih dahulu
            </FormControl.Feedback>
          </FormGroup>
          <FormGroup className="mb-3 position-relative">
            <FormLabel className="mb-1">
              Tinggi Badan <span className="important">*</span>
            </FormLabel>
            <FormControl
              type="number"
              name="height"
              value={data.height}
              onChange={onChange}
              required
            />
            <FormControl.Feedback type="invalid">
              Isi data terlebih dahulu
            </FormControl.Feedback>
          </FormGroup>
          <FormGroup className="mb-3 position-relative">
            <FormLabel className="mb-1">
              Berat Badan <span className="important">*</span>
            </FormLabel>
            <FormControl
              type="number"
              name="weight"
              value={data.weight}
              onChange={onChange}
              required
            />
            <FormControl.Feedback type="invalid">
              Isi data terlebih dahulu
            </FormControl.Feedback>
          </FormGroup>
          <FormGroup className="mb-3 position-relative">
            <FormLabel className="mb-1">
              Gol. Darah <span className="important">*</span>
            </FormLabel>
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
          <FormGroup className="mb-4 position-relative">
            <FormLabel className="mb-1">
              Email <span className="important">*</span>
            </FormLabel>
            <FormControl
              type="email"
              name="email"
              value={data.email}
              onChange={onChange}
              required={false}
            />
            <FormControl.Feedback type="invalid">
              Isi data terlebih dahulu
            </FormControl.Feedback>
          </FormGroup>
          <div
            style={{ gap: "8px" }}
            className="d-flex justify-content-between"
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

export default PopUpProfile;
