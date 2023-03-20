import React from "react";
import { Accordion, Button, Table } from "react-bootstrap";

function MenuProfile({ dataProfile, onOpenModal }) {
  return (
    <Accordion.Body className="p-3">
      <div className="d-flex justify-content-end">
        <Button
          onClick={() => {
               onOpenModal('profile')
          }}
          className="btn-primary-yellow"
        >
          Tambahkan
        </Button>
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
          <td style={{ width: "170px" }}>Nomor Kartu Keluarga*</td>
          <td>:</td>
          <td>{dataProfile?.family_card_number}</td>
        </tr>
        <tr>
          <td>Nama Lengkap</td>
          <td>:</td>
          <td>{dataProfile?.full_name}</td>
        </tr>
        <tr>
          <td>Nama Panggilan</td>
          <td>:</td>
          <td>{dataProfile?.full_name}</td>
        </tr>
        <tr>
          <td>Agama</td>
          <td>:</td>
          <td>{dataProfile?.religon}</td>
        </tr>
        <tr>
          <td>Nama Ibu Kandung</td>
          <td>:</td>
          <td>{dataProfile?.mother_name}</td>
        </tr>
        <tr>
          <td>Agama</td>
          <td>:</td>
          <td>{dataProfile?.religon}</td>
        </tr>
        <tr>
          <td>Tinggi Badan</td>
          <td>:</td>
          <td>{dataProfile?.body_height}</td>
        </tr>
        <tr>
          <td>Berat Badan</td>
          <td>:</td>
          <td>{dataProfile?.body_weight}</td>
        </tr>
        <tr>
          <td>Gol. Garah</td>
          <td>:</td>
          <td>{dataProfile?.body_blood}</td>
        </tr>
        <tr>
          <td>Nomor Telepon</td>
          <td>:</td>
          <td>{dataProfile?.phone}</td>
        </tr>
        <tr>
          <td>Email</td>
          <td>:</td>
          <td>{dataProfile?.email_address}</td>
        </tr>
      </Table>
      <Button className="btn-primary-yellow w-100">Edit</Button>
    </Accordion.Body>
  );
}

export default MenuProfile;
