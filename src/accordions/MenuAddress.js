import React from "react";
import { Accordion, Button, Form, Table } from "react-bootstrap";

function MenuAddress({ dataProfile, onOpenModal }) {
  return (
    <Accordion.Body>
      {/* <NoData /> */}
      <div className="d-flex justify-content-end">
        <Button
          onClick={() => {
               onOpenModal('address')
          }}
          className="btn-primary-yellow"
        >
          Tambahkan
        </Button>
      </div>
      <p style={{ color: "#2BD059" }}>Alamat Sesuai KTP</p>
      <Table
        style={{
          fontSize: "14px",
          borderSpacing: "10px",
          borderCollapse: "separate",
          paddingLeft: "0px",
        }}
      >
        <tr>
          <td style={{ width: "170px" }}>Alamat KTP</td>
          <td>:</td>
          <td></td>
        </tr>
        <tr>
          <td style={{ width: "170px" }}>Kode Pos</td>
          <td>:</td>
          <td></td>
        </tr>
        <tr>
          <td style={{ width: "170px" }}>Provinsi</td>
          <td>:</td>
          <td></td>
        </tr>
        <tr>
          <td style={{ width: "170px" }}>Kabupaten/Kotad</td>
          <td>:</td>
          <td></td>
        </tr>
        <tr>
          <td style={{ width: "170px" }}>Kecamatan</td>
          <td>:</td>
          <td></td>
        </tr>
        <tr>
          <td style={{ width: "170px" }}>Kelurahan</td>
          <td>:</td>
          <td></td>
        </tr>
      </Table>
      <hr className="line-thin" />
      <p style={{ color: "#2BD059" }}>Alamat Sekarang</p>
      <div className="d-flex" style={{ gap: "10px" }}>
        <Form.Check label="Tidak sama dengan KTP" type="radio" />
        <Form.Check label="Sesuai KTP" type="radio" />
      </div>
      <Table
        style={{
          fontSize: "14px",
          borderSpacing: "10px",
          borderCollapse: "separate",
          paddingLeft: "0px",
        }}
      >
        <tr>
          <td style={{ width: "170px" }}>Alamat KTP</td>
          <td>:</td>
          <td></td>
        </tr>
        <tr>
          <td style={{ width: "170px" }}>Kode Pos</td>
          <td>:</td>
          <td></td>
        </tr>
        <tr>
          <td style={{ width: "170px" }}>Provinsi</td>
          <td>:</td>
          <td></td>
        </tr>
        <tr>
          <td style={{ width: "170px" }}>Kabupaten/Kotad</td>
          <td>:</td>
          <td></td>
        </tr>
        <tr>
          <td style={{ width: "170px" }}>Kecamatan</td>
          <td>:</td>
          <td></td>
        </tr>
        <tr>
          <td style={{ width: "170px" }}>Kelurahan</td>
          <td>:</td>
          <td></td>
        </tr>
      </Table>
      <Button className="btn-primary-yellow w-100">Edit</Button>
    </Accordion.Body>
  );
}

export default MenuAddress;
