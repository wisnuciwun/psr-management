import moment from "moment";
import React from "react";
import { Card, Table } from "react-bootstrap";

const Pengguna = ({
  dataUsers = [],
  onGetDetailUser = null,
  onDeleteDataOrganization = null,
}) => {
  return (
    <Card style={{ borderRadius: "8px", padding: "10px", width: "100%" }}>
      <p className="font-xl">Pengguna</p>
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
              <th>Nomor Rumah</th>
              <th style={{ minWidth: "200px" }}>Nomor KTP</th>
              <th style={{ minWidth: "200px" }}>Foto</th>
              <th style={{ minWidth: "200px" }}>Url Foto</th>
              <th>Aktif</th>
              <th style={{ minWidth: "200px" }}>Nama Ibu</th>
              <th style={{ minWidth: "200px" }}>Nama Panggilan</th>
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
                        onClick={() => onDeleteDataOrganization(x.uuid)}
                        className="fa fa-trash text-dark pointer"
                      ></i>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </div>
    </Card>
  );
};

export default Pengguna;
