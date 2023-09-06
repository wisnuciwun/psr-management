import { listCity, listProvince } from "constants/tempDataPersonal";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import {
  Button,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  ModalBody,
} from "react-bootstrap";
import Select from "react-select";

function PopUpAddress({
  onChange,
  required,
  onHide,
  onSubmit,
  validate,
  data,
  onAddressSame,
  show,
}) {
  const [same, setsame] = useState(false);

  useEffect(() => {
    if (
      data.address === data.current_address &&
      data.postal_code === data.current_postal_code
    ) {
      setsame(true);
    }
  }, [data]);

  useEffect(() => {
    if (same) {
      onAddressSame({
        ...data,
        current_address: data.address,
        current_postal_code: data.postal_code,
        current_province: data.province,
        current_county_town: data.county_town,
        current_district: data.district,
        current_subdistrict: data.subdistrict,
      });
    } else {
      onAddressSame({
        ...data,
        current_address: "",
        current_postal_code: "",
        current_province: "",
        current_county_town: "",
        current_district: "",
        current_subdistrict: "",
      });
    }
  }, [same]);

  const onSubmitData = (event) => {
    if (same) {
      onAddressSame(
        {
          ...data,
          current_address: data.address,
          current_postal_code: data.postal_code,
          current_province: data.province,
          current_county_town: data.county_town,
          current_district: data.district,
          current_subdistrict: data.subdistrict,
        },
        event
      );
    } else {
      onSubmit(event);
    }
  };

  return (
    <div>
      <ModalBody>
        <Form onSubmit={(e) => onSubmitData(e)} noValidate validated={validate}>
          <p className="color-primary-green">Alamat Sesuai KTP</p>
          <FormGroup className="mb-3 position-relative">
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
          <FormGroup className="mb-3 position-relative">
            <FormLabel className="mb-1">
              Kode Pos <span className="important">*</span>
            </FormLabel>
            <FormControl
              maxLength={5}
              max={5}
              type="text"
              name="postal_code"
              value={data?.postal_code}
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
          <FormGroup className="mb-3 position-relative">
            <FormLabel className="mb-1">
              Provinsi <span className="important">*</span>
            </FormLabel>
            <Select
              onChange={(v) =>
                onChange({ target: { name: "province", value: v.value } })
              }
              value={{ label: data.province, value: data.province }}
              options={listProvince.map((v) => {
                return { label: v, value: v };
              })}
              placeholder="Pilih salah satu"
            />
            {/* <FormControl
              type="text"
              name="province"
              value={data.province}
              onChange={onChange}
              required
            /> */}
            <FormControl.Feedback type="invalid">
              Isi data terlebih dahulu
            </FormControl.Feedback>
          </FormGroup>
          <FormGroup className="mb-3 position-relative">
            <FormLabel className="mb-1">
              Kabupaten/Kota <span className="important">*</span>
            </FormLabel>
            <Select
              onChange={(v) =>
                onChange({ target: { name: "county_town", value: v.value } })
              }
              value={{ label: data.county_town, value: data.county_town }}
              options={listCity[data?.province?.replace(" ", "")].map((v) => {
                return { label: v, value: v };
              })}
              placeholder="Pilih salah satu"
            />
            {/* <FormControl
              type="text"
              name="county_town"
              value={data.county_town}
              onChange={onChange}
              required
            /> */}
            <FormControl.Feedback type="invalid">
              Isi data terlebih dahulu
            </FormControl.Feedback>
          </FormGroup>
          <FormGroup className="mb-3 position-relative">
            <FormLabel className="mb-1">
              Kecamatan <span className="important">*</span>
            </FormLabel>
            <FormControl
              type="text"
              name="district"
              value={data.district}
              onChange={onChange}
              required
            />
            <FormControl.Feedback type="invalid">
              Isi data terlebih dahulu
            </FormControl.Feedback>
          </FormGroup>
          <FormGroup className="mb-3 position-relative">
            <FormLabel className="mb-1">
              Kelurahan <span className="important">*</span>
            </FormLabel>
            <FormControl
              type="text"
              name="subdistrict"
              value={data.subdistrict}
              onChange={onChange}
              required
            />
            <FormControl.Feedback type="invalid">
              Isi data terlebih dahulu
            </FormControl.Feedback>
          </FormGroup>
          <p className="color-primary-green">Alamat Sekarang</p>
          <div className="d-flex" style={{ gap: "10px" }}>
            <Form.Check
              onClick={() => setsame(false)}
              checked={!same}
              label="Tidak sama dengan KTP"
              type="radio"
            />
            <Form.Check
              onClick={() => setsame(true)}
              checked={same}
              label="Sesuai KTP"
              type="radio"
            />
          </div>
          <br />
          {!same && (
            <>
              <FormGroup className="mb-3 position-relative">
                <FormLabel className="mb-1">
                  Alamat <span className="important">*</span>
                </FormLabel>
                <FormControl
                  type="text"
                  name="current_address"
                  value={data?.current_address}
                  onChange={onChange}
                />
                <FormControl.Feedback type="invalid">
                  Isi data terlebih dahulu
                </FormControl.Feedback>
              </FormGroup>
              <FormGroup className="mb-3 position-relative">
                <FormLabel className="mb-1">
                  Kode Pos <span className="important">*</span>
                </FormLabel>
                <FormControl
                  maxLength={5}
                  type="text"
                  name="current_postal_code"
                  value={data?.current_postal_code}
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
                />
                <FormControl.Feedback type="invalid">
                  Isi data terlebih dahulu
                </FormControl.Feedback>
              </FormGroup>
              <FormGroup className="mb-3 position-relative">
                <FormLabel className="mb-1">
                  Provinsi <span className="important">*</span>
                </FormLabel>
                <Select
                  onChange={(v) =>
                    onChange({
                      target: { name: "current_province", value: v.value },
                    })
                  }
                  value={{
                    label: data.current_province,
                    value: data.current_province,
                  }}
                  options={listProvince.map((v) => {
                    return { label: v, value: v };
                  })}
                  placeholder="Pilih salah satu"
                />
                {/* <FormControl
                  type="text"
                  name="current_province"
                  value={data.current_province}
                  onChange={onChange}
                /> */}
                <FormControl.Feedback type="invalid">
                  Isi data terlebih dahulu
                </FormControl.Feedback>
              </FormGroup>
              <FormGroup className="mb-3 position-relative">
                <FormLabel className="mb-1">
                  Kabupaten/Kota <span className="important">*</span>
                </FormLabel>
                <Select
                  onChange={(v) =>
                    onChange({
                      target: { name: "current_county_town", value: v.value },
                    })
                  }
                  value={{
                    label: data.current_county_town,
                    value: data.current_county_town,
                  }}
                  options={listCity[
                    data?.current_province?.replace(" ", "") ||
                    data?.province?.replace(" ", "")
                  ].map((v) => {
                    return { label: v, value: v };
                  })}
                  placeholder="Pilih salah satu"
                />
                {/* <FormControl
                  type="text"
                  name="current_county_town"
                  value={data.current_county_town}
                  onChange={onChange}
                /> */}
                <FormControl.Feedback type="invalid">
                  Isi data terlebih dahulu
                </FormControl.Feedback>
              </FormGroup>
              <FormGroup className="mb-3 position-relative">
                <FormLabel className="mb-1">
                  Kecamatan <span className="important">*</span>
                </FormLabel>
                <FormControl
                  type="text"
                  name="current_district"
                  value={data.current_district}
                  onChange={onChange}
                />
                <FormControl.Feedback type="invalid">
                  Isi data terlebih dahulu
                </FormControl.Feedback>
              </FormGroup>
              <FormGroup className="mb-4 position-relative">
                <FormLabel className="mb-1">
                  Kelurahan <span className="important">*</span>
                </FormLabel>
                <FormControl
                  type="text"
                  name="current_subdistrict"
                  value={data.current_subdistrict}
                  onChange={onChange}
                />
                <FormControl.Feedback type="invalid">
                  Isi data terlebih dahulu
                </FormControl.Feedback>
              </FormGroup>
            </>
          )}
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

export default PopUpAddress;
