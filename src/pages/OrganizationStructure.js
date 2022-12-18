import { data_member } from 'constants/tempStructure'
import React, { Component, Fragment } from 'react'
import { Card, CardText, Modal, ModalBody, ModalHeader } from 'reactstrap'

export class OrganizationStructure extends Component {
     constructor(props) {
          super(props)

          this.state = {
               selectedData: {
                    name: '',
                    nickName: '',
                    position: '',
                    phone: '',
                    email: '',
                    address: '',
                    img: '',
               },
               toggleModalBio: false,
          }
     }

     onHandleModalBio = () => {
          this.setState({
               toggleModalBio: !this.state.toggleModalBio
          })
     }

     onHandleModalData(value) {
          this.setState({
               selectedData: value
          }, () => this.onHandleModalBio())
     }

     render() {
          const { selectedData, toggleModalBio } = this.state
          return (
               <Fragment>
                    <div className='w-100 p-3 d-flex flex-wrap'>
                         {
                              data_member.map((v, id) => {
                                   return (
                                        <Card key={id} onClick={() => this.onHandleModalData(v)} style={{ width: id === 0 ? '100%' : '42%', margin: '10px', borderRadius: '10px', height: '360px', cursor: 'pointer' }} body className=''>
                                             <CardText className='font-lg aquas text-truncate'>{v.name}</CardText>
                                             <img style={{ height: '230px', objectFit: 'cover', borderRadius: '10px', }} src={v.img} alt="" />
                                             <CardText className='mt-2'>
                                                  <div className='font-md text-truncate'>{v.position}</div>
                                                  <div className='font-md font-weight-bold'>{v.address}</div>
                                             </CardText>
                                        </Card>
                                   )
                              })
                         }
                    </div>
                    <Modal toggle={this.onHandleModalBio} centered isOpen={toggleModalBio}>
                         <ModalHeader toggle={this.onHandleModalBio}>Biodata lengkap</ModalHeader>
                         <ModalBody className='p-4'>
                              <div className='d-flex justify-content-center'>
                                   <img src={selectedData.img} style={{ height: '300px', width: '100%', objectFit: 'cover', borderRadius: '10px' }} alt="" />
                              </div>
                              <br />
                              <div>Nama Lengkap</div>
                              <div className='font-lg font-weight-bold text-primary'>{selectedData.name}</div>
                              <div>Nama Panggilan</div>
                              <div className='font-lg font-weight-bold text-primary'>{selectedData.nickName}</div>
                              <div>Nomor HP</div>
                              <div className='font-lg text-success font-weight-bold'>{selectedData.phone}</div>
                              <div>Jabatan</div>
                              <div className='font-lg font-weight-bold'>{selectedData.position}</div>
                              <div>Email</div>
                              <div className='font-lg font-weight-bold'>{selectedData.email}</div>
                              <div>Alamat Rumah</div>
                              <div className='font-lg font-weight-bold'>{selectedData.address}</div>
                         </ModalBody>
                    </Modal>
               </Fragment>
          )
     }
}

export default OrganizationStructure