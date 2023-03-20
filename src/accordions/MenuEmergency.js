import React from 'react'
import { Accordion, Button, Table } from 'react-bootstrap';

function MenuEmergency({dataProfile, onOpenModal}) {
return (
     <Accordion.Body>
       {/* <NoData /> */}
       <div className="d-flex justify-content-end">
         <Button
           onClick={() => {
               onOpenModal('emergency')
          }}
           className="btn-primary-yellow"
         >
           Tambahkan
         </Button>
       </div>
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
           <td></td>
         </tr>
         <tr>
           <td>Alamat</td>
           <td>:</td>
           <td></td>
         </tr>
         <tr>
           <td>Nomor Telepon</td>
           <td>:</td>
           <td></td>
         </tr>
         <tr>
           <td>Tipe Keluarga</td>
           <td>:</td>
           <td></td>
         </tr>
       </Table>
       <hr className="line-thin" />
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
           <td></td>
         </tr>
         <tr>
           <td>Alamat</td>
           <td>:</td>
           <td></td>
         </tr>
         <tr>
           <td>Nomor Telepon</td>
           <td>:</td>
           <td></td>
         </tr>
         <tr>
           <td>Tipe Keluarga</td>
           <td>:</td>
           <td></td>
         </tr>
       </Table>
     </Accordion.Body>
  )
}

export default MenuEmergency