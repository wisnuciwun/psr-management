import React from 'react'
import { Card, Table } from 'react-bootstrap';

const Pengguna = ({dataUsers = [], onGetDetailUser = null, onDeleteDataOrganization = null, }) => {
  return (
    <Card>
      <div style={{ overflowX: "scroll" }}>     
        <Table
                  striped
                  bordered
                  hover
                  className="table-fixed"
                  style={{ overflowX: "scroll", width: "500px" }}
                >
                  <thead>
                    <tr >
                      <th className="col-xs-3">Nama Lengkap</th>
                      <th>Alamat</th>
                      <th>Appelation</th>
                      <th>Blok</th>
                      <th>Golongan Darah</th>
                      <th>Dibuat tanggal</th>
                      <th>Email</th>
                      <th>Nomor HP</th>
                      <th>Nomor KK</th>
                      <th>Tinggi</th>
                      <th>Nomor Rumah</th>
                      <th>Nomor KTP</th>
                      <th>Foto</th>
                      <th>Url Foto</th>
                      <th>Aktif</th>
                      <th>Nama Ibu</th>
                      <th>Nama Panggilan</th>
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
                            <td>{x.appellation}</td>
                            <td>{x.blok}</td>
                            <td>{x.position}</td>
                            <td>{x.blood_type}</td>
                            <td>{x.createdAt}</td>
                            <td>{x.email}</td>
                            <td>{x.family_card_number}</td>
                            <td>{x.height}</td>
                            <td>{x.home_number}</td>
                            <td>{x.identity_number}</td>
                            <td>{x.image}</td>
                            <td

                            >
                              {x.image_url}
                            </td>
                            <td>{x.is_active}</td>
                            <td>{x.mother_name}</td>
                            <td>{x.nickname}</td>
                            <td>{x.religion}</td>
                            <td>{x.tos}</td>
                            <td>{x.type}</td>
                            <td>{x.verified}</td>
                            <td>
                              {" "}
                              <i
                                onClick={() =>
                                 onDeleteDataOrganization(x.uuid)
                                }
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
  )
}

export default Pengguna