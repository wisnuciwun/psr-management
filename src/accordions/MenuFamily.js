import React from "react";
import { Accordion, Button, Table } from "react-bootstrap";

function MenuFamily({ dataProfile, onOpenModal }) {
  return (
    <Accordion.Body>
      {/* <NoData /> */}
      <div className="d-flex justify-content-end">
        <Button
         onClick={() => {
          onOpenModal('family')
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
          <td style={{ width: "170px" }}>Nomor Kartu Keluarga</td>
          <td>:</td>
          <td></td>
        </tr>
        <tr>
          <td>NIK</td>
          <td>:</td>
          <td></td>
        </tr>
        <tr>
          <td>Nama Lengkap</td>
          <td>:</td>
          <td></td>
        </tr>
        <tr>
          <td>Nama Panggilan</td>
          <td>:</td>
          <td></td>
        </tr>
        <tr>
          <td>Tempat Lahir</td>
          <td>:</td>
          <td></td>
        </tr>
        <tr>
          <td>Tanggal Lahir</td>
          <td>:</td>
          <td></td>
        </tr>
        <tr>
          <td>Jenis Kelamin</td>
          <td>:</td>
          <td></td>
        </tr>
        <tr>
          <td>Agama</td>
          <td>:</td>
          <td></td>
        </tr>
        <tr>
          <td>Pendidikan</td>
          <td>:</td>
          <td></td>
        </tr>
        <tr>
          <td>Pekerjaan</td>
          <td>:</td>
          <td></td>
        </tr>
        <tr>
          <td>Gol. Garah</td>
          <td>:</td>
          <td></td>
        </tr>
        <tr>
          <td>Status Perkawinan</td>
          <td>:</td>
          <td></td>
        </tr>
        <tr>
          <td>Tanggal Perkawinan</td>
          <td>:</td>
          <td></td>
        </tr>
        <tr>
          <td>Status Hubungan Dalam Keluarga</td>
          <td>:</td>
          <td></td>
        </tr>
        <tr>
          <td>Kewarganegaraan</td>
          <td>:</td>
          <td></td>
        </tr>
        <tr>
          <td>Nama Ayah</td>
          <td>:</td>
          <td></td>
        </tr>
        <tr>
          <td>Nama Ibu</td>
          <td>:</td>
          <td></td>
        </tr>
      </Table>
      <Button className="btn-primary-yellow w-100">Edit</Button>
    </Accordion.Body>
  );
}

export default MenuFamily;
