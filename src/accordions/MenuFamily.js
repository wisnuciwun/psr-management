import NoData from "components/NoData";
import React from "react";
import { Accordion, Button, Table } from "react-bootstrap";
import moment from "moment";

function MenuFamily({ dataFamily, onOpenModal, onDelete }) {
  return (
    <Accordion.Body>
      {dataFamily.length === 0 || Object.keys(dataFamily).length === 0 ? (
        <>
          <NoData />
          <br />
          <Button
            onClick={() => {
              onOpenModal("buat data keluarga", false, "familyDataTemp");
            }}
            className="btn-primary-yellow w-100"
          >
            Tambahkan
          </Button>
        </>
      ) : (
        <>
          {dataFamily.map((v, id) => {
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
                    <td style={{ width: "170px" }}>Nomor Kartu Keluarga</td>
                    <td>:</td>
                    <td>{v?.identity_number}</td>
                  </tr>
                  <tr>
                    <td>NIK</td>
                    <td>:</td>
                    <td>{v?.identity_number}</td>
                  </tr>
                  <tr>
                    <td>Nama Lengkap</td>
                    <td>:</td>
                    <td>{v?.place_of_birth}</td>
                  </tr>
                  <tr>
                    <td>Nama Panggilan</td>
                    <td>:</td>
                    <td>{v?.full_name}</td>
                  </tr>
                  <tr>
                    <td>Tempat Lahir</td>
                    <td>:</td>
                    <td>{v?.nickname}</td>
                  </tr>
                  <tr>
                    <td>Tanggal Lahir</td>
                    <td>:</td>
                    <td>{moment(v?.date_of_birth).format("DD MMM YYYY")}</td>
                  </tr>
                  <tr>
                    <td>Jenis Kelamin</td>
                    <td>:</td>
                    <td>{v?.gender}</td>
                  </tr>
                  <tr>
                    <td>Agama</td>
                    <td>:</td>
                    <td>{v?.religion}</td>
                  </tr>
                  <tr>
                    <td>Pendidikan</td>
                    <td>:</td>
                    <td>{v?.education}</td>
                  </tr>
                  <tr>
                    <td>Pekerjaan</td>
                    <td>:</td>
                    <td>{v?.occupation}</td>
                  </tr>
                  <tr>
                    <td>Gol. Garah</td>
                    <td>:</td>
                    <td>{v?.blood_type}</td>
                  </tr>
                  <tr>
                    <td>Status Perkawinan</td>
                    <td>:</td>
                    <td>{v?.marital_status}</td>
                  </tr>
                  <tr>
                    <td>Tanggal Perkawinan</td>
                    <td>:</td>
                    <td>
                      {moment(v?.marital_status_date).format("DD MMM YYYY")}
                    </td>
                  </tr>
                  <tr>
                    <td>Status Hubungan Dalam Keluarga</td>
                    <td>:</td>
                    <td>{v?.relationship}</td>
                  </tr>
                  <tr>
                    <td>Kewarganegaraan</td>
                    <td>:</td>
                    <td>{v?.citizenship}</td>
                  </tr>
                  <tr>
                    <td>Nama Ayah</td>
                    <td>:</td>
                    <td>{v?.father_name}</td>
                  </tr>
                  <tr>
                    <td>Nama Ibu</td>
                    <td>:</td>
                    <td>{v?.mother_name}</td>
                  </tr>
                </Table>
                <div className="d-flex" style={{gap: '8px'}}>
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
                      onOpenModal("edit data keluarga", true, null, v);
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
              onOpenModal("buat data keluarga", false, "familyDataTemp");
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

export default MenuFamily;
