import { HomeCarousel } from 'components'
import React, { Component, Fragment } from 'react'
import { Card, CardBody, CardHeader, CardText, CardTitle } from 'reactstrap'

export class Home extends Component {
     render() {
          return (
               <Fragment>
                    <div>
                         <HomeCarousel />
                    </div>
                    <div className='p-3'>
                         {/* <h5>Selamat datang !</h5> */}
                         {/* <h3>Guyub kana kasaean</h3> */}
                         <h5 className='mb-4'><i className='fa fa-info-circle'>&nbsp;</i> Informasi penting</h5>
                         <Card className='mb-3'>
                              <CardHeader className='bg-info text-light'>
                                   Pertemuan warga di Masjid
                              </CardHeader>
                              <CardBody>
                                   <CardText>
                                        Diharapkan semua warga kumpul tanggal 12 Desember 2022 di masjid untuk peresmian
                                   </CardText>

                              </CardBody>
                         </Card>
                         <Card className='mb-3'>
                              <CardHeader className='bg-info text-light'>
                                   Kerja Bakti
                              </CardHeader>
                              <CardBody>
                                   <CardText>
                                       Pengurasan Toren dan pemasangan jalur pipa baru. Diharapkan semua warga kumpul di depan rumah pak Sihawhaw tanggal 10 Desember 2022
                                   </CardText>
                              </CardBody>
                         </Card>
                    </div>
               </Fragment>
          )
     }
}

export default Home