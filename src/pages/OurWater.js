import React, { Component } from 'react'
import { Container, Table } from 'reactstrap'
// import GoogleDocsViewer from 'react-google-docs-viewer'

export class OurWater extends Component {
     render() {
          return (
               <Container style={{overflowX: 'auto'}}>
                    {/* <GoogleDocsViewer
                    fileUrl='https://docs.google.com/spreadsheets/d/1aAAVPVeaawAjf3IkmkcQKcRITHGV17o-QCMq0aczuq0/edit#gid=0'
                    /> */}
                    <Table className='w-100'>
                         <thead>
                              <tr>
                                   <th></th>
                                   <th>Nama</th>
                                   <th>Status</th>
                                   <th>Tunggakan</th>
                              </tr>
                         </thead>
                         <tbody>
                              <tr>
                                   <th scope="row">1</th>
                                   <td>Mark</td>
                                   <td>Otto</td>
                                   <td>@mdo</td>
                              </tr>
                              <tr>
                                   <th scope="row">2</th>
                                   <td>Jacob</td>
                                   <td>Thornton</td>
                                   <td>@fat</td>
                              </tr>
                              <tr>
                                   <th scope="row">3</th>
                                   <td>Larry</td>
                                   <td>the Bird</td>
                                   <td>@twitter</td>
                              </tr>
                         </tbody>
                    </Table>
               </Container>
          )
     }
}

export default OurWater