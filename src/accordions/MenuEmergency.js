import NoData from "components/NoData";
import React from "react";
import { Accordion, Button, Table } from "react-bootstrap";

function MenuEmergency({ dataEmergency, onOpenModal, onDelete }) {
  return (
    <Accordion.Body>
      {dataEmergency.length === 0 || Object.keys(dataEmergency).length === 0 ? (
        <>
          <NoData />
          <br />
          <Button
            onClick={() => {
              onOpenModal("buat kontak darurat", false, "emergencyDataTemp");
            }}
            className="btn-primary-yellow w-100"
          >
            Tambahkan
          </Button>
        </>
      ) : (
        <>
          {dataEmergency.map((v, id) => {
            return (
              <>
                <Table
                  style={{
                    fontSize: "14px",
                    borderSpacing: "10px",
                    borderCollapse: "separate",
                    paddingLeft: "0px",
                  }}
                >
                  <tr>
                    <td>Nama</td>
                    <td>:</td>
                    <td>{v?.full_name}</td>
                  </tr>
                  <tr>
                    <td>Alamat</td>
                    <td>:</td>
                    <td>{v?.address}</td>
                  </tr>
                  <tr>
                    <td>Nomor Telepon</td>
                    <td>:</td>
                    <td>{v?.phone}</td>
                  </tr>
                  <tr>
                    <td>Hubungan Keluarga</td>
                    <td>:</td>
                    <td>{v?.relationship}</td>
                  </tr>
                </Table>
                <div className="d-flex" style={{ gap: '8px' }}>
                  <Button
                    onClick={() => {
                      onDelete(v.uuid);
                    }}
                    className="btn-primary-red w-50"
                  >
                    Hapus
                  </Button>
                  <Button
                    onClick={() => {
                      onOpenModal("edit kontak darurat", true, null, v);
                    }}
                    className="btn-primary-yellow w-50"
                  >
                    Edit
                  </Button>
                </div>
                <hr className="line-thin" />
              </>
            );
          })}
          <Button
            onClick={() => {
              onOpenModal("buat kontak darurat", false, "emergencyDataTemp");
            }}
            className="btn-primary-yellow w-100"
          >
            Tambahkan
          </Button>
        </>
      )}
    </Accordion.Body>
  );
}

export default MenuEmergency;
