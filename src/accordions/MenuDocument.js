import React from "react";
import { Accordion, Button, Form, Table } from "react-bootstrap";

function MenuDocument({ dataProfile, onOpenModal }) {
  return (
    <Accordion.Body>
      {/* <NoData /> */}
      <div className="d-flex justify-content-end">
        <Button
          onClick={() => {
               onOpenModal('document')
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
          <td>Tipe Dokumen</td>
          <td>:</td>
          <td></td>
        </tr>
        <tr>
          <td>Nomor Dokumen</td>
          <td>:</td>
          <td></td>
        </tr>
        <tr>
          <td>Tanggal Terbit</td>
          <td>:</td>
          <td></td>
        </tr>
        <tr>
          <td>Masa Berlaku</td>
          <td>:</td>
          <td></td>
        </tr>
        <tr>
          <td>Catatan</td>
          <td>:</td>
          <td></td>
        </tr>
      </Table>
      <Form.Label>Upload File</Form.Label>
      <Form.Control
        placeholder="Pastikan format file adalah pdf"
        type="file"
        size="md"
        className="h-100"
      />
      <hr className="line-thin" />
      <Table
        style={{
          fontSize: "14px",
          borderSpacing: "10px",
          borderCollapse: "separate",
          paddingLeft: "0px",
        }}
      >
        <tr>
          <td>Tipe Dokumen</td>
          <td>:</td>
          <td></td>
        </tr>
        <tr>
          <td>Nomor Dokumen</td>
          <td>:</td>
          <td></td>
        </tr>
        <tr>
          <td>Tanggal Terbit</td>
          <td>:</td>
          <td></td>
        </tr>
        <tr>
          <td>Masa Berlaku</td>
          <td>:</td>
          <td></td>
        </tr>
        <tr>
          <td>Catatan</td>
          <td>:</td>
          <td></td>
        </tr>
      </Table>
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Upload File</Form.Label>
        <Form.Control
          placeholder="Pastikan format file adalah pdf"
          type="file"
          size="md"
          className="h-100"
        />
      </Form.Group>
    </Accordion.Body>
  );
}

export default MenuDocument;
