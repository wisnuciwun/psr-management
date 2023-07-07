import React, { useState } from "react";
import {
  Button,
  Card,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  FormSelect,
  Modal,
  Table,
} from "react-bootstrap";

const StrukOr = ({
  dataOrganization = [],
  onDeleteDataOrganization = null,
  onPostDataStructure = null,
  dataTempOrganization = null,
  onChangeUploadImgOrganization = null,
  onHandleChangeOrganizationData = null,
  toggleModal = null,
  openModal = false,
}) => {
  const dataPosition = [
    "Ketua",
    "Wakil Ketua",
    "Sekretaris",
    "Koordinator Blok 1 (A-B)",
    "Koordinator Blok 2 (C-D)",
    "Koordinator Blok 3 (E-F)",
    "Koordinator Blok 4 (G-H)",
    "Koordinator Blok 5 (I-J)",
    "Koordinator Keagamaan",
    "Hubungan Masyarakat",
    "Hubungan Masyarakat",
    "Perencanaan dan Pengembangan Masyarakat",
    "Keamanan, Ketertiban dan Kebersihan",
    "Media dan Teknologi Informasi",
    "Keagamaan, Kesehatan, dan Kesejahteraan sosial",
  ];

  const dataGroup = [
    "Pengurus Inti",
    "Struktural",
    "Fungsional (Badan Kelengkapan)",
  ];

  const dataOrder = [0, 1, 2];

  return (
    <Card style={{ borderRadius: "8px", padding: "10px", width: "100%" }}>
      <div className="d-flex justify-content-between">
        <p className="font-xl">Struktur Organisasi</p>
        <Button onClick={() => toggleModal()} className="btn-yellow-admin">
          Tambah Data
        </Button>
      </div>
      <div
        style={{
          overflowX: "scroll",
          maxHeight: "80vh",
          overflowY: "auto",
          maxWidth: "80vw",
        }}
      >
        <Table
          striped
          bordered
          hover
          className="mt-3"
          style={{ overflowX: "scroll" }}
        >
          <thead className="scrollme">
            <tr>
              <th style={{minWidth: '150px'}}>Nama</th>
              <th>Nama Panggilan</th>
              <th>Alamat</th>
              <th>Posisi</th>
              <th>Foto</th>
              <th>Email</th>
              <th>Nomor HP</th>
              <th>Grup</th>
              <th>Order</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {dataOrganization.length !== 0 &&
              dataOrganization.map((x, id) => {
                return (
                  <tr key={id}>
                    <td>{x.name}</td>
                    <td>{x.nickname}</td>
                    <td>{x.address}</td>
                    <td>{x.position}</td>
                    <td className="d-flex justify-content-center align-items-center">
                      <img style={{width: '50px', height: '50px', objectFit: 'contain'}} src={x.image_url} alt="" />
                    </td>
                    <td>{x.email}</td>
                    <td>{x.phone}</td>
                    <td>{x.group}</td>
                    <td>{x.order}</td>
                    <td>
                      {" "}
                      <i
                        onClick={() => onDeleteDataOrganization(x.uuid)}
                        className="fa fa-trash text-dark pointer"
                      ></i>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
        <Modal show={openModal} onHide={() => toggleModal()}>
          <Modal.Header closeButton>Tambah Data Organisasi</Modal.Header>
          <Modal.Body>
            <Form onSubmit={onPostDataStructure}>
              {Object.keys(dataTempOrganization).map((v) => {
                if (v === "img") {
                  return (
                    <FormGroup controlId="formFile" className="mb-3">
                      <FormLabel>{v}</FormLabel>
                      <FormControl
                        placeholder="Pastikan format file adalah pdf"
                        type="file"
                        size="md"
                        className="h-100"
                        onChange={onChangeUploadImgOrganization}
                      />
                    </FormGroup>
                  );
                } else if (v == "position" || v == "group" || v == "order") {
                  return (
                    <>
                      <FormLabel>{v}</FormLabel>
                      <FormSelect className="mb-2">
                        <option value="">Pilih salah satu</option>
                        {(() => {
                          let result = <option></option>;
                          switch (v) {
                            case "position":
                              result = dataPosition.map((v) => (
                                <option>{v}</option>
                              ));
                              break;
                            case "group":
                              result = dataGroup.map((v) => (
                                <option>{v}</option>
                              ));
                              break;
                            case "order":
                              result = dataOrder.map((v) => (
                                <option>{v}</option>
                              ));
                              break;

                            default:
                              break;
                          }
                          return result;
                        })()}
                      </FormSelect>
                    </>
                  );
                } else {
                  return (
                    <>
                      <FormGroup className="mb-2">
                        <FormLabel className="mb-1">{v}</FormLabel>
                        <FormControl
                          className="input-no-decoration"
                          name={`${v}`}
                          value={dataTempOrganization[v]}
                          onChange={onHandleChangeOrganizationData}
                          required
                        />
                      </FormGroup>
                    </>
                  );
                }
              })}
              <Button className="mt-2 w-100 btn-primary-yellow" type="submit">
                Submit
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    </Card>
  );
};

export default StrukOr;
