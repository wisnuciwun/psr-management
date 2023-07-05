import NoData from "components/NoData";
import React from "react";
import { Accordion, Button, Form, Table } from "react-bootstrap";

function MenuAddress({ dataAddress, onOpenModal }) {
  return (
    <Accordion.Body>
      {Object.keys(dataAddress).length === 0 ? (
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
              <td style={{ width: "120px" }}>Alamat KTP</td>
              <td>:</td>
              <td>{dataAddress?.address}</td>
            </tr>
            <tr>
              <td style={{ width: "120px" }}>Kode Pos</td>
              <td>:</td>
              <td>{dataAddress?.postal_code}</td>
            </tr>
            <tr>
              <td style={{ width: "120px" }}>Provinsi</td>
              <td>:</td>
              <td>{dataAddress?.province}</td>
            </tr>
            <tr>
              <td style={{ width: "120px" }}>Kabupaten/Kota</td>
              <td>:</td>
              <td></td>
            </tr>
            <tr>
              <td style={{ width: "120px" }}>Kecamatan</td>
              <td>:</td>
              <td>{dataAddress?.county_town}</td>
            </tr>
            <tr>
              <td style={{ width: "120px" }}>Kelurahan</td>
              <td>:</td>
              <td>{dataAddress?.district}</td>
            </tr>
          </Table>
          <hr className="line-thin" />
          <p className="color-primary-green">Alamat Sekarang</p>
          <Table
            style={{
              fontSize: "14px",
              borderSpacing: "10px",
              borderCollapse: "separate",
              paddingLeft: "0px",
            }}
          >
            <tr>
              <td style={{ width: "120px" }}>Alamat KTP</td>
              <td>:</td>
              <td>{dataAddress?.current_address}</td>
            </tr>
            <tr>
              <td style={{ width: "120px" }}>Kode Pos</td>
              <td>:</td>
              <td>{dataAddress?.current_postal_code}</td>
            </tr>
            <tr>
              <td style={{ width: "120px" }}>Provinsi</td>
              <td>:</td>
              <td>{dataAddress.current_province}</td>
            </tr>
            <tr>
              <td style={{ width: "120px" }}>Kabupaten/Kota</td>
              <td>:</td>
              <td>{dataAddress?.current_county_town}</td>
            </tr>
            <tr>
              <td style={{ width: "120px" }}>Kecamatan</td>
              <td>:</td>
              <td>{dataAddress?.current_district}</td>
            </tr>
            <tr>
              <td style={{ width: "120px" }}>Kelurahan</td>
              <td>:</td>
              <td>{dataAddress?.current_subdistrict}</td>
            </tr>
          </Table>
          <Button
            onClick={() => {
              onOpenModal("edit alamat", true, "dataAddress");
            }}
            className="btn-primary-yellow w-100"
          >
            Edit
          </Button>
          <NoData />
          <br />
          <Button
            onClick={() => {
              onOpenModal("buat alamat", false, "addressDataTemp");
            }}
            className="btn-primary-yellow w-100"
          >
            Tambah Data
          </Button>
        </>
      ) : (
        <>
          <p className="color-primary-green">Alamat Sesuai KTP</p>
          <Table
            style={{
              fontSize: "14px",
              borderSpacing: "10px",
              borderCollapse: "separate",
              paddingLeft: "0px",
            }}
          >
            <tr>
              <td style={{ width: "120px" }}>Alamat KTP</td>
              <td>:</td>
              <td>{dataAddress?.address}</td>
            </tr>
            <tr>
              <td style={{ width: "120px" }}>Kode Pos</td>
              <td>:</td>
              <td>{dataAddress?.postal_code}</td>
            </tr>
            <tr>
              <td style={{ width: "120px" }}>Provinsi</td>
              <td>:</td>
              <td>{dataAddress?.province}</td>
            </tr>
            <tr>
              <td style={{ width: "120px" }}>Kabupaten/Kota</td>
              <td>:</td>
              <td></td>
            </tr>
            <tr>
              <td style={{ width: "120px" }}>Kecamatan</td>
              <td>:</td>
              <td>{dataAddress?.county_town}</td>
            </tr>
            <tr>
              <td style={{ width: "120px" }}>Kelurahan</td>
              <td>:</td>
              <td>{dataAddress?.district}</td>
            </tr>
          </Table>
          <hr className="line-thin" />
          <p className="color-primary-green">Alamat Sekarang</p>
          <Table
            style={{
              fontSize: "14px",
              borderSpacing: "10px",
              borderCollapse: "separate",
              paddingLeft: "0px",
            }}
          >
            <tr>
              <td style={{ width: "120px" }}>Alamat KTP</td>
              <td>:</td>
              <td>{dataAddress?.current_address}</td>
            </tr>
            <tr>
              <td style={{ width: "120px" }}>Kode Pos</td>
              <td>:</td>
              <td>{dataAddress?.current_postal_code}</td>
            </tr>
            <tr>
              <td style={{ width: "120px" }}>Provinsi</td>
              <td>:</td>
              <td>{dataAddress.current_province}</td>
            </tr>
            <tr>
              <td style={{ width: "120px" }}>Kabupaten/Kota</td>
              <td>:</td>
              <td>{dataAddress?.current_county_town}</td>
            </tr>
            <tr>
              <td style={{ width: "120px" }}>Kecamatan</td>
              <td>:</td>
              <td>{dataAddress?.current_district}</td>
            </tr>
            <tr>
              <td style={{ width: "120px" }}>Kelurahan</td>
              <td>:</td>
              <td>{dataAddress?.current_subdistrict}</td>
            </tr>
          </Table>
          <Button
            onClick={() => {
              onOpenModal("edit alamat", true, "dataAddress");
            }}
            className="btn-primary-yellow w-100"
          >
            Edit
          </Button>
        </>
      )}
    </Accordion.Body>
  );
}

export default MenuAddress;
