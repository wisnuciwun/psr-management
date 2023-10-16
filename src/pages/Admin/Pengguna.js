import moment from "moment";
import Register from "pages/Register";
import React, { useState } from "react";
import { Button, Card, FormControl, FormGroup, FormLabel, Modal, ModalBody, ModalHeader, ProgressBar, Table } from "react-bootstrap";

const Pengguna = ({
  dataUsers = [],
  onGetDetailUser = null,
  onDeleteDataOrganization = null,
  procFileHandler = null,
  onPostDataBulkRegistration = null,
  progress = 0,
}) => {
  const [openModal, setopenModal] = useState(false)

  return (
    <Card style={{ borderRadius: "8px", padding: "10px", width: "100%" }}>
      <div className="d-flex justify-content-between">
        <p className="font-xl">Pengguna</p>
        <Button
          onClick={() => setopenModal(!openModal)}
          className="btn-yellow-admin"
        >
          Tambah Data
        </Button>
      </div>
      <FormGroup className="w-50">
        <FormLabel style={{ fontWeight: "600" }}>
          Upload Massal Via Excel
        </FormLabel>
        <div className="d-flex mb-3" style={{ gap: "8px" }}>
          <FormControl
            placeholder="Pastikan format file adalah xlsx atau xls"
            type="file"
            size="md"
            className="h-100"
            onChange={procFileHandler}
          />
          <Button
            className="btn-yellow-admin"
            type="submit"
            onClick={onPostDataBulkRegistration}
          >
            Upload
          </Button>
        </div>
        {
          progress != 0 &&
          <ProgressBar now={progress} label={`${progress}%`} />
        }
      </FormGroup>
      <div
        style={{
          overflowX: "scroll",
          maxHeight: "80vh",
          overflowY: "auto",
          maxWidth: "80vw",
        }}
        className="mt-3"
      >
        <Table
          striped
          bordered
          hover
          style={{ overflowX: "scroll" }}
        >
          <thead>
            <tr style={{ verticalAlign: "middle", textAlign: "center" }}>
              <th style={{ minWidth: "200px" }}>Nama Lengkap</th>
              <th>Alamat</th>
              <th>Appelation</th>
              <th>Golongan Darah</th>
              <th style={{ minWidth: "120px" }}>Dibuat tanggal</th>
              <th>Email</th>
              <th style={{ width: "100px" }}>Nomor HP</th>
              <th style={{ minWidth: "200px" }}>Nomor KK</th>
              <th>Tinggi</th>
              {/* <th>Nomor Rumah</th> */}
              <th style={{ minWidth: "200px" }}>Nomor KTP</th>
              <th style={{ minWidth: "200px" }}>Foto</th>
              <th style={{ minWidth: "200px" }}>Url Foto</th>
              <th>Aktif</th>
              <th style={{ minWidth: "200px" }}>Nama Ibu</th>
              <th style={{ minWidth: "200px" }}>Nama Panggilan</th>
              <th>Agama</th>
              <th>TOS</th>
              <th>Jenis Tempat Tinggal</th>
              <th>Verified</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {dataUsers.length !== 0 &&
              dataUsers.map((x, id) => {
                return (
                  <tr>
                    <td onClick={() => onGetDetailUser(x.uuid)}>
                      {x.full_name}
                    </td>
                    <td>{x.address}</td>
                    <td>{x.appellation || "Belum diisi"}</td>
                    <td>{x.blood_type || "Belum diisi"}</td>
                    <td>{moment(x.createdAt).format("DD MMM YYYY HH:MM")}</td>
                    <td>{x.email}</td>
                    <td>{x.phone}</td>
                    <td>{x.family_card_number}</td>
                    <td>{x.height}</td>
                    <td>{x.identity_number}</td>
                    <td>{x.image}</td>
                    <td>{x.image_url}</td>
                    <td>{x.is_active}</td>
                    <td>{x.mother_name}</td>
                    <td>{x.nickname}</td>
                    <td>{x.religion}</td>
                    <td>{x.tos}</td>
                    <td>{x.type}</td>
                    <td>{x.verified}</td>
                    <td>
                      <i
                        onClick={() => null}
                        className="fa fa-trash text-dark pointer"
                      ></i>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </div>
      <Modal show={openModal} onHide={setopenModal}>
        <ModalHeader closeButton>
          Tambah User (Manual)
        </ModalHeader>
        <ModalBody>
          <Register />
        </ModalBody>
      </Modal>
    </Card>
  );
};

export default Pengguna;
