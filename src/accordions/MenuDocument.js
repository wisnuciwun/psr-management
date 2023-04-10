import NoData from "components/NoData";
import React from "react";
import { Accordion, Button, Form, Table } from "react-bootstrap";
import moment from 'moment'

function MenuDocument({ dataDocument, onOpenModal }) {
  return (
    <Accordion.Body>
      {dataDocument.length === 0 ? (
        <>
          <NoData />
          <br />
          <Button
            onClick={() => {
              onOpenModal("buat dokumen", false, "documentDataTemp");
            }}
            className="btn-primary-yellow w-100"
          >
            Tambahkan
          </Button>
        </>
      ) : (
        <>
          {dataDocument.map((v, id) => {
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
                    <td>Tipe Dokumen</td>
                    <td>:</td>
                    <td>{v?.type}</td>
                  </tr>
                  <tr>
                    <td>Nomor Dokumen</td>
                    <td>:</td>
                    <td>{v?.nomor}</td>
                  </tr>
                  <tr>
                    <td>Tanggal Terbit</td>
                    <td>:</td>
                    <td>{moment(v?.issued_date).format('DD MMM YYYY')}</td>
                  </tr>
                  <tr>
                    <td>Masa Berlaku</td>
                    <td>:</td>
                    <td>{moment(v?.validity_period).format('DD MMM YYYY')}</td>
                  </tr>
                  <tr>
                    <td>Catatan</td>
                    <td>:</td>
                    <td>{v?.note}</td>
                  </tr>
                </Table>
                {v.file.includes("jpeg") ||
                v.file.includes("png") ||
                v.file.includes("jpg") ? (
                  <img className='line-thin w-100' src={v?.file_url} style={{height: '250px', objectFit: 'contain', borderRadius: '8px'}} alt="" />
                ) : (
                  <a download={v?.file} href={v?.file_url}>
                    {v.file}
                  </a>
                )}
                <Button
                  onClick={() => {
                    onOpenModal("edit dokumen", true, null, v);
                  }}
                  className="btn-primary-yellow w-100 mt-3"
                >
                  Edit
                </Button>
                <hr className="line-thin" />
              </>
            );
          })}
          <Button
            onClick={() => {
              onOpenModal("buat dokumen", false, "documentDataTemp");
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

export default MenuDocument;
