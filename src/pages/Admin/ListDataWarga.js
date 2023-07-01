import React from 'react'
import { Button, Card, Form, FormControl, FormGroup, FormLabel, Table } from 'react-bootstrap'

const ListDataWarga = ({dataCitizens = [], procFileHandler = null, onPostDataBulkCitizen = null, onPostDataCitizen = null, dataTempCitizen = null, onHandleChangeCitizenData = null }) => {
  return (
    <Card>
      <FormGroup>
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
                  <Button type="submit" onClick={onPostDataBulkCitizen}>
                    Upload
                  </Button>
                </div>
              </FormGroup>
              <div style={{ overflowX: "scroll" }}>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Nomor Kartu Keluarga</th>
                      <th>Nama Kepala Keluarga</th>
                      <th>Alamat</th>
                      <th>RT</th>
                      <th>RW</th>
                      <th>Kode Pos</th>
                      <th>Kelurahan</th>
                      <th>Kecamatan</th>
                      <th>Kota</th>
                      <th>Provinsi</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataCitizens.length !== 0 &&
                      dataCitizens.map((x, id) => {
                        return (
                          <tr>
                            <td>{x.no_kk}</td>
                            <td>{x.nama_kepala_keluarga}</td>
                            <td>{x.alamat}</td>
                            <td>{x.rt}</td>
                            <td>{x.rw}</td>
                            <td>{x.kodepos}</td>
                            <td>{x.kelurahan}</td>
                            <td>{x.kecamatan}</td>
                            <td>{x.kota}</td>
                            <td>{x.provinsi}</td>
                            <td>
                              {" "}
                              <i className="fa fa-trash text-dark pointer"></i>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </Table>
              </div>
              <div className="mt-3">
                <p className="mb-1" style={{ fontWeight: "600" }}>
                  Input Data Warga Manual
                </p>
                <Form onSubmit={onPostDataCitizen}>
                  {Object.keys(dataTempCitizen).map((x) => {
                    return (
                      <FormGroup className="mb-2">
                        <FormLabel className="mb-1">{x}</FormLabel>
                        <FormControl
                          className="input-no-decoration"
                          name={x}
                          value={dataTempCitizen[`${x}`]}
                          onChange={onHandleChangeCitizenData}
                          required
                        />
                      </FormGroup>
                    );
                  })}
                  <Button className="mt-2 w-100 btn-success" type="submit">
                    Submit
                  </Button>
                </Form>
              </div>
    </Card>
  )
}

export default ListDataWarga