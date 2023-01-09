import React, { Component, Fragment } from 'react'
import { Button, Container, FormGroup, FormText, Input, InputGroup, Label } from 'reactstrap'

class Register extends Component {
     constructor(props) {
          super(props)

          this.state = {
               haveMarried: false,
               children: [],
          }
     }


     handleToggle = (e) => {
          this.setState({
               [e.target.name]: !this.state[e.target.name]
          })
     }

     handleAddChildren = () => {
          let newData = [...this.state.children]
          newData.push({ name: '' })

          this.setState({
               children: newData
          })
     }

     render() {
          let { haveMarried, children } = this.state

          console.log("zzz", children)

          return (
               <>
                    <div className='mb-5'>
                         <Container>
                              <Label>Nama</Label>
                              <Input />
                              <Label>No. KTP</Label>
                              <Input />
                              <Label>No. KK</Label>
                              <Input />
                              <Label>Alamat rumah</Label>
                              <Input />
                              <Label>No. HP</Label>
                              <Input />
                              <hr />
                              <div>
                                   <FormGroup check>
                                        <Input type="checkbox" checked={haveMarried} onClick={this.handleToggle} name='haveMarried' />
                                        <Label check>
                                             Sudah berkeluarga
                                        </Label>
                                   </FormGroup>
                                   <div hidden={!haveMarried}>
                                        <br />
                                        <Label>Nama Istri</Label>
                                        <Input />
                                        {
                                             children.length != 0 &&
                                             children.map((v, id) => {
                                                  return (
                                                       <Fragment key={id}>
                                                            <Label>Anak {id + 1}</Label>
                                                            <Input value={v?.name} />
                                                       </Fragment>
                                                  )
                                             })
                                        }
                                        <Button onClick={this.handleAddChildren} className='mt-3 w-100 btn-info'>Tambah data anak</Button>
                                   </div>
                              </div>
                              <hr />
                              <FormGroup>
                                   <Label for="exampleFile">
                                        Upload KTP
                                   </Label>
                                   <Input
                                        id="exampleFile"
                                        name="file"
                                        type="file"
                                   />
                                   <FormText>
                                        Pastikan format file adalah pdf
                                   </FormText>
                              </FormGroup>
                              <FormGroup>
                                   <Label for="exampleFile">
                                        Upload KK
                                   </Label>
                                   <Input
                                        id="exampleFile"
                                        name="file"
                                        type="file"
                                   />
                                   <FormText>
                                        Pastikan format file adalah pdf
                                   </FormText>
                              </FormGroup>
                              {/* <div className='d-flex justify-content-between mt-3'>
                                   <Label>Upload KTP</Label>
                                   <Button className='btn-info'>Upload</Button>

                              </div>
                              <div className='d-flex justify-content-between mt-3'>
                                   <Label>Upload KK</Label>
                                   <Button className='btn-info'>Upload</Button>
                              </div> */}
                              <p className='font-md'>Jika file belum pdf, anda dapat kunjungi situs ini <a rel='noopener noreferrer' target='_blank' no href="https://png2pdf.com/">https://png2pdf.com/</a></p>
                              <hr />
                              <Button className='mt-4 w-100 btn-success'>Submit</Button>
                         </Container>
                    </div>
               </>
          )
     }
}

export default Register