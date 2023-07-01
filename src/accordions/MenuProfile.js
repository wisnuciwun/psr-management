import React from "react";
import { Accordion, Button, Table } from "react-bootstrap";

function MenuProfile({ dataProfile, onOpenModal }) {
  return (
    <Accordion.Body className="p-3">
      <Table
        style={{
          fontSize: "14px",
          borderSpacing: "10px",
          borderCollapse: "separate",
          paddingLeft: "0px",
        }}
      >
        {/* <tr>
          <td style={{ width: "170px" }}>Nomor Kartu Keluarga</td>
          <td>:</td>
          <td>{dataProfile?.family_card_number}</td>
        </tr> */}
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
          <td>{dataProfile?.religion}</td>
        </tr>
        <tr>
          <td>Nama Ibu Kandung</td>
          <td>:</td>
          <td>{dataProfile?.mother_name}</td>
        </tr>
        <tr>
          <td>Tinggi Badan</td>
          <td>:</td>
          <td>{dataProfile?.height} cm</td>
        </tr>
        <tr>
          <td>Berat Badan</td>
          <td>:</td>
          <td>{dataProfile?.weight} kg</td>
        </tr>
        <tr>
          <td>Gol. Garah</td>
          <td>:</td>
          <td>{dataProfile?.blood_type}</td>
        </tr>
        <tr>
          <td>Nomor Telepon</td>
          <td>:</td>
          <td>{dataProfile?.phone}</td>
        </tr>
        {/* <tr>
          <td>Email</td>
          <td>:</td>
          <td>{dataProfile?.email}</td>
        </tr> */}
      </Table>
      <Button onClick={() => {
        onOpenModal("edit profile", true, "dataProfile");
      }} className="btn-primary-yellow w-100">Edit</Button>
    </Accordion.Body>
  );
}

export default MenuProfile;
