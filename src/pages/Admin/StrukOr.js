import React, { useState } from "react";
import {
  Button,
  Card,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
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
}) => {
  const [openModal, setopenModal] = useState(false)

  return (
    <Card style={{ borderRadius: "8px", padding: "10px", width: "100%" }}>
      <div className="d-flex justify-content-between">
        <p className="font-xl">Struktur Organisasi</p>
        <Button onClick={() => setopenModal(!openModal)} className="btn-yellow-admin">Tambah Data</Button>
      </div>
      <div
        style={{
          overflowX: "scroll",
          maxHeight: "80vh",
          overflowY: "auto",
          maxWidth: "80vw",
        }}
      >
        <Table striped bordered hover className="mt-3" style={{width: '100%'}}>
          <thead className="scrollme">
            <tr>
              <th>Nama</th>
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
                  <tr>
                    <td>{x.name}</td>
                    <td>{x.nickname}</td>
                    <td>{x.address}</td>
                    <td>{x.position}</td>
                    <td>{x.img}</td>
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
        <Modal show={openModal} onHide={() => setopenModal(false)}>
          <Modal.Header>Tambah Data Organisasi</Modal.Header>
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
